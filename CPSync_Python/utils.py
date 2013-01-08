from werkzeug.contrib.cache import SimpleCache

cache = SimpleCache()


def cacheToken(clientId=None, key=None, obj=None):
    """
        Simple function for caching a user's access token
        time : log-time , default := 90 days
    """
    rv = cache.get(clientId)
    if rv is None:
        rv = obj(key)
        if hasattr(rv, 'error') is None:
            cache.set(clientId, rv, timeout=rv['expires_in'])
    return rv


def deleteToken(clientId=None):
    """
        Remove token from cache
    """
    cache.delete(clientId)