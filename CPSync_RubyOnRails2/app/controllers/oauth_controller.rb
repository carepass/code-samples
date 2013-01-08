class OauthController < ApplicationController

  def index
  end

  CLIENT_ID = 'msxq7yak8m883hvkfpwb3c3f'
  CLIENT_SECRET = 'NHzzbcv3FwvkPHaSM8KvXumk'
  REDIRECT_URL = 'http://127.0.0.1:3000/oauth/authorized'
  OAUTH_ENDPOINT = 'https://www.carepass.com/carepass/oauth'
  RESPONSE_TYPE = 'code'
  SCOPE = 'IDENTITY,FAMILY,INSURANCE,LIFESTYLE,ACTIVITY,APPOINTMENT,FITNESS'
  GRANT_TYPE = 'authorization_code'

  def login
    auth_endpoint = '/authorize'
    redirect_to "#{OAUTH_ENDPOINT}#{auth_endpoint}?response_type="+
        "#{RESPONSE_TYPE}&client_id=#{CLIENT_ID}&scope=#{SCOPE}&redirect_uri=#{REDIRECT_URL}"
  end


  def authorized
    token_url = '/token'
    tokenEndpoint = OAUTH_ENDPOINT+token_url

    payload = {
        'response_type' => RESPONSE_TYPE,
        'client_id' => CLIENT_ID,
        'grant_type' => GRANT_TYPE,
        RESPONSE_TYPE => params[:code],
        'client_secret' => CLIENT_SECRET,
        'redirect_uri' => REDIRECT_URL
    }

    parsed_json = OauthHelper.post(tokenEndpoint, payload)

    if parsed_json['access_token']
      session[:access_token] = parsed_json['access_token']
      redirect_to :action => 'getdata'
    end
  end

  def getdata
    api = 'users/currentUser'
    endpoint = "https://api.carepass.com/user-directory-api/#{api}"
    headers = {
        'Authorization' => "Bearer #{session[:access_token]}"
    }
    parsed_json = OauthHelper.get(endpoint, headers)
    @user = parsed_json if parsed_json['id']

  end

  def logout
    session[:access_token] = nil
    redirect_to :action => 'index'
  end

end
