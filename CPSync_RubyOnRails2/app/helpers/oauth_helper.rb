module OauthHelper
  require 'rubygems'
  require 'httparty'

  def self.get(endpoint, headers)
    resp = HTTParty.get(endpoint, :headers => headers)
    return ActiveSupport::JSON.decode(resp.body)
  end

  def self.post(endpoint, payload)
    resp = HTTParty.post(endpoint, :body => payload)
    return ActiveSupport::JSON.decode(resp.body)
  end

end
