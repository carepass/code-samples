# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_carepass_oauth_session',
  :secret      => '6bedfc994bbf006086789c28ae8d38264b31401f594f2d2e7f3b8b26263b959de215bf27a7e5ef2dce9e65a3fdd3238c59dda75c8feed2af34a034fc9223d0fb'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
