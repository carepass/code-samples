from flask import request, session, redirect, url_for, render_template
from requests import RequestException
import requests
from app import *
from utils import cacheToken, deleteToken

__author__ = 'ferron'


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/result')
def result():
    access_token = session.get('access_token')

    if CLIENT_ID == 'ADD_CLIENT_ID' or CLIENT_SECRET == 'ADD_CLIENT_SECRET':
        # check to ensure that client_id and secret is not set to the default
        return redirect(url_for('configure'))

    if access_token is None:
        return redirect(url_for('login'))

    headers = {'Authorization': 'Bearer {0}'.format(access_token)}

    try:
        r = requests.get(USER_ENDPOINT.format(BIO_API), headers=headers)
        user = r.json()
        print user
        if user.get('id') is not None:
            return render_template('result.html', user=user)
        else:
            return render_template('error.html', token=None)
    except RequestException, e:
        session.pop('access_token',  None)
        deleteToken(CLIENT_ID)
        return redirect(url_for('index'))


@app.route('/configure')
def configure():
    return render_template('configure.html')


@app.route('/error')
def error():
    return render_template('error.html')


@app.route('/login')
def login():
    callback = url_for('authorized', _external=True)
    print request.url
    return carepass.authorize(callback=callback)


@app.route('/logout')
def logout():
    session.pop('access_token',  None)
    deleteToken(CLIENT_ID)
    return redirect(url_for('index'))


@app.route(REDIRECT_URI)
def authorized():
    """
        An absolute URI to which the authorization server will redirect
        the user-agent to when the end-user authorization step is
        completed.  The authorization server SHOULD require the client
        to pre-register their redirection URI.
    """
    print request.args.get('code')

    authCode = request.args.get('code')
    result = cacheToken(CLIENT_ID, authCode, exchange)

    if result.get('access_token') is not None:
        session['access_token'] = result.get('access_token')
        print session['access_token']
        return redirect(url_for('result'))
    else:
        print result['error']
        return redirect(url_for('error'))


def exchange(authCode=None):
    """
        exchange the authorization code for the access token
        authCode :- authorization code
    """
    payload = {'response_type': RESPONSE_TYPE,
               'client_id': CLIENT_ID,
               'grant_type': GRANT_TYPE,
               'code': authCode,
               'client_secret': CLIENT_SECRET,
               'redirect_uri': url_for('authorized', _external=True)}
    print payload
    r = requests.post(carepass.access_token_url, params=payload)
    return r.json()


@carepass.tokengetter
def get_access_token():
    return session.get('access_token')
