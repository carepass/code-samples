# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_carepass_oauth2_session',
  :secret      => '55a51e7e368eaa7fbd3c528673d61246adfe7137a6d00bcd7ef9256e15c887c3c4711966951dd121f33c6ccd52e47c05805a3840381438558b55cb828589fda9'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
