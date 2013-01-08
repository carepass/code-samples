#imports
from flask import Flask
from flask.ext.oauth import OAuth
from config import *

__author__ = 'ferron'

app = Flask(__name__)
app.secret_key = SECRET_KEY
oauth = OAuth()

carepass = oauth.remote_app('carepass',
                          base_url=BASE_URL,
                          authorize_url=OAUTH_ENDPOINT+'/authorize',
                          request_token_url=None,
                          request_token_params={'scope': SCOPE,
                                                'response_type': 'code'},
                          access_token_url=OAUTH_ENDPOINT + '/token',
                          access_token_method='POST',
                          access_token_params={'grant_type': 'authorization_code'},
                          consumer_key=CLIENT_ID,
                          consumer_secret=CLIENT_SECRET)