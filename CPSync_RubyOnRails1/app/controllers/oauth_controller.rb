class OauthController < ApplicationController

  before_filter :create_client, :only => [:login, :authorized, :getdata]

  REDIRECT_URL = 'http://127.0.0.1:3000/oauth/authorized'
  SCOPE = 'IDENTITY,FAMILY,INSURANCE,LIFESTYLE,ACTIVITY,APPOINTMENT,FITNESS'

  def login
    redirect_to @client.auth_code.authorize_url(:redirect_uri => REDIRECT_URL,
                                                       :scope => SCOPE)
  end

  def index
  end

  def authorized
    token = @client.auth_code.get_token(params[:code],
                                       :redirect_uri => REDIRECT_URL,
                                        :response_type => 'code')


    session[:access_token] = token.token
    session[:access_opts] = token.params
    redirect_to :action => 'getdata'
  end

  def getdata
    token = OAuth2::AccessToken.new(@client, session[:access_token] , session[:access_opts])
    resp = token.get('https://api.carepass.com/user-directory-api/users/currentUser', :headers => token.headers)
    parsed_json = ActiveSupport::JSON.decode(resp.body)   # parse response and convert to JSON
    @user = parsed_json if parsed_json['id']
  end

  def logout
    session[:access_token] = nil
    redirect_to :action => 'index'
  end

  protected
  CLIENT_ID = 'msxq7yak8m883hvkfpwb3c3f'
  CLIENT_SECRET = 'NHzzbcv3FwvkPHaSM8KvXumk'

  def create_client
    require 'oauth2'
    @client = OAuth2::Client.new(CLIENT_ID, CLIENT_SECRET,
                                :site => 'https://www.carepass.com',
                                :authorize_url => '/carepass/oauth/authorize',
                                :token_url => '/carepass/oauth/token')
  end

end
