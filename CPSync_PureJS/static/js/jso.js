/*
 jslint bitwise: true
 */

(function (exp, $) {
    "use strict";
	var config = {},
		default_lifetime = 3600,
		options = {
			"debug": false
		},
		api_redirect,
		Api_default_storage,
		api_storage,
        utility = {},
        jso_authrequest,
        jso_fetchtoken,
        jso_savetoken,
		internalStates = [];

	/*
	 * ------ SECTION: Utilities
	 */

	/*
	 * Returns a random string used for state
	 */
    $.extend(utility, {
        uuid : function () {
            var mask = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
            return (function (mask) {
                return mask.replace(/[xy]/g, function (c) {
                    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
            }(mask));
        },
        log : function (msg) {
            if (!options.debug) {
                return;
            }
            if (!exp.console) {
                return;
            }
            if (!exp.console.log) {
                return;
            }
            // console.log("LOG(), Arguments", arguments, msg)
            if (arguments.length > 1) {
                exp.console.log(arguments);
            } else {
                exp.console.log(msg);
            }
        },
        /**
         * Set the global options.
         */
        setOptions : function (opts) {
            var k;
            if (!opts) {
                return;
            }
            for (k in opts) {
                if (opts.hasOwnProperty(k)) {
                    options[k] = opts[k];
                }
            }
            this.log("Options is set to ", options);
        },

        /*
         * Takes an URL as input and a params object.
         * Each property in the params is added to the url as query string parameters
         */
        encodeURL : function (url, params) {
            var res = url, k, i = 0, firstSeparator = (url.indexOf("?") === -1) ? '?' : '&';
            for (k in params) {
                if (params.hasOwnProperty(k)) {
                    res += (i === 0 ? firstSeparator : '&') + encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);
                    i += 1;
                }
            }
            return res;
        },
        epoch : function () {
            return Math.round(new Date().getTime() / 1000.0);
        },
        parseQueryString : function (qs) {
			if(arguments.length==0) {
				qs = exp.location.href;
			}
            var e,
                a = /\+/g,  // Regex for replacing addition symbol with a space
                r = /([\w]+)=?([\w]*)/g,
                d = function (s) { return decodeURIComponent(s.replace(a, " ")); },
                urlParams = {};

            while ((e = r.exec(qs)) !== null) {
                urlParams[d(e[1])] = d(e[2]);
            }

            return urlParams;
        }
    });

    // expose utility so that it can be tested
    exp.jasmine = exp.jasmine || {};
    exp.jasmine.test = {};
    $.extend(exp.jasmine.test, utility);

	/* 
	 * Redirects the user to a specific URL
	 */
	api_redirect = function (url) {
		exp.location = url;
	};

	Api_default_storage = function () {
		utility.log("Constructor");
	};
    /**
		saveState stores an object with an Identifier.
		Ancient browsers should use the localStorage pollyfill
		In the state object, we put the request object, plus these parameters:
		  * restoreHash
		  * providerID
		  * scopes

	 */
	Api_default_storage.prototype.saveState =  function (state, obj) {
		exp.localStorage.setItem("state-" + state, JSON.stringify(obj));
        this.logState(state);
	};

	/**
	 * getStage()  returns the state object, but also removes it.
	 * @type {Object}
	 */
	Api_default_storage.prototype.getState = function (state) {
		// utility.log("getState (" + state+ ")");
		var obj = JSON.parse(exp.localStorage.getItem("state-" + state));
		exp.localStorage.removeItem("state-" + state);
        this.cleanState(state);
		return obj;
	};

    Api_default_storage.prototype.logState = function (state) {
        var key = "states-man", obj = exp.localStorage.getItem(key);
        if (obj !== null) {
            obj = JSON.parse(obj);
        } else {
            obj = {
                states : []
            };
        }
        obj.states.push(state);
        exp.localStorage.setItem(key, JSON.stringify(obj));
    };

    Api_default_storage.prototype.wipeState = function () {
        var key = "states-man", obj = exp.localStorage.getItem(key), i, len;

        if (obj !== null) {
            obj = JSON.parse(obj);
            len = obj.states.length;
            for (i = 0; i < len; i += 1) {
                exp.localStorage.removeItem(obj.states[i]);
            }
        }
        exp.localStorage.removeItem(key);
    };

    Api_default_storage.prototype.cleanState = function (state) {
        var key = "states-man", obj = exp.localStorage.getItem(key);
        if (obj !== null) {
            obj = JSON.parse(obj);
            obj.states.splice(this.stateIndx(state), 1);
            exp.localStorage.setItem(key, JSON.stringify(obj));
        }
    };

    Api_default_storage.prototype.stateIndx = function (state) {
        var key = "states-man", obj = exp.localStorage.getItem(key), i, len;
        if (obj !== null) {
            obj = JSON.parse(obj);
            len = obj.states.length;
            for (i = 0; i < len; i += 1) {
                if (obj.states[i] === state) {
                    return i;
                }
            }
        }
        return -1;
    };

    Api_default_storage.prototype.savePreference = function (providerId, state) {
        exp.localStorage.setItem("pref-" + providerId, state);
    };

    Api_default_storage.prototype.getPreference = function (providerId) {
        var obj = exp.localStorage.getItem("pref-" + providerId);
        exp.localStorage.removeItem("pref-" + providerId);
        return obj;
    };

    /*
     * Checks if a token, has includes a specific scope.
     * If token has no scope at all, false is returned.
     */
	Api_default_storage.prototype.hasScope = function (token, scope) {
		var i;

		if (!token.scopes) {
            return false;
        }
		for (i = 0; i < token.scopes.length; i += 1) {
			if (token.scopes[i] === scope) {
                return true;
            }
		}
		return false;
	};

	/*
	 * Takes an array of tokens, and removes the ones that
	 * are expired, and the ones that do not meet a scopes requirement.
	 */
	Api_default_storage.prototype.filterTokens = function (tokens, scopes) {
		var i, j, result = [], now = utility.epoch(), usethis;

		if (!scopes) {
            scopes = [];
        }

		for (i = 0; i < tokens.length; i += 1) {
			usethis = true;

			// Filter out expired tokens. Tokens that is expired in 1 second from now.
			if (tokens[i].expires && tokens[i].expires < (now + 1)) {
                usethis = false;
            }

			// Filter out this token if not all scope requirements are met
			for (j = 0; j < scopes.length; j += 1) {
				if (!api_storage.hasScope(tokens[i], scopes[j])) {
                    usethis = false;
                }
			}

			if (usethis) {
                result.push(tokens[i]);
            }
		}
		return result;
	};

	/*
	 * saveTokens() stores a list of tokens for a provider.

		Usually the tokens stored are a plain Access token plus:
		  * expires : time that the token expires
		  * providerID: the provider of the access token?
		  * scopes: an array with the scopes (not string)
	 */
	Api_default_storage.prototype.saveTokens = function (provider, tokens) {
		exp.localStorage.setItem("tokens-" + provider, JSON.stringify(tokens));
	};

	Api_default_storage.prototype.getTokens = function (provider) {
		var tokens = JSON.parse(exp.localStorage.getItem("tokens-" + provider));
		if (!tokens) {
            tokens = [];
        }

		utility.log("Token received", tokens);
		return tokens;
	};

	Api_default_storage.prototype.wipeTokens = function (provider) {
		exp.localStorage.removeItem("tokens-" + provider);
	};

	/*
	 * Save a single token for a provider.
	 * This also cleans up expired tokens for the same provider.
	 */
	Api_default_storage.prototype.saveToken = function (provider, token) {
		var tokens = this.getTokens(provider);
		tokens = api_storage.filterTokens(tokens);
		tokens.push(token);
		this.saveTokens(provider, tokens);
	};

	/*
	 * Get a token if exists for a provider with a set of scopes.
	 * The scopes parameter is OPTIONAL.
	 */
	Api_default_storage.prototype.getToken = function (provider, scopes) {
		var tokens = this.getTokens(provider);
		tokens = api_storage.filterTokens(tokens, scopes);
		// ensure that the latest token is taken
		return tokens.length > 0 ? tokens[tokens.length-1] : null;
	};

	api_storage = new Api_default_storage();

	/**
	 * Check if the hash contains an access token. 
	 * And if it do, extract the state, compare with
	 * config, and store the access token for later use.
	 *
	 * The url parameter is optional. Used with phonegap and
	 * childbrowser when the jso context is not receiving the response,
	 * instead the response is received on a child browser.
	 */
	exp.jso_checkfortoken = function (providerID, url, callback) {
		var atoken,
			h = exp.location.hash,
			now = utility.epoch(),
			state,
			co;

		utility.log("jso_checkfortoken(" + providerID + ")");

		// If a url is provided 
		if (url) {
			// utility.log('Hah, I got the url and it ' + url);
			if (url.indexOf('#') === -1) {
                return;
            }
			h = url.substring(url.indexOf('#'));
			// utility.log('Hah, I got the hash and it is ' +  h);
		}

		/*
		 * Start with checking if there is a token in the hash
		 */
		if (h.length < 2) {
            return;
        }
		if (h.indexOf("access_token") === -1) {
            return;
        }
		h = h.substring(1);
		atoken = utility.parseQueryString(h);

		if (atoken.state) {
			state = api_storage.getState(atoken.state);
		} else {
			if (!providerID) {
                throw "Could not get [state] and no default providerid is provided.";
            }
			state = {providerID: providerID};
		}

		if (!state) {
            throw "Could not retrieve state";
        }
		if (!state.providerID) {
            throw "Could not get providerid from state";
        }
		if (!config[state.providerID]) {
            throw "Could not retrieve config for this provider.";
        }
		co = config[state.providerID];

		/**
		 * If state was not provided, and default provider contains a scope parameter
		 * we assume this is the one requested...
		 */
		if (!atoken.state && co.scope) {
			state.scopes = co.scope;
			utility.log("Setting state: ", state);
		}
		utility.log("Checking atoken ", atoken, " and co ", co);

		/*
		 * Decide when this token should expire.
		 * Priority fallback:
		 * 1. Access token expires_in
		 * 2. Life time in config (may be false = permanent...)
		 * 3. Specific permanent scope.
		 * 4. Default library lifetime:
		 */
		if (atoken.expires_in) {
			atoken.expires = now + parseInt(atoken.expires_in, 10);
		} else if (co.default_lifetime === false) {
			// Token is permanent.
            utility.log('token is permanent');
		} else if (co.default_lifetime) {
			atoken.expires = now + co.default_lifetime;
		} else if (co.permanent_scope) {
			if (!api_storage.hasScope(atoken, co.permanent_scope)) {
				atoken.expires = now + default_lifetime;
			}
		} else {
			atoken.expires = now + default_lifetime;
		}

		/*
		 * Handle scopes for this token
		 */
		if (atoken.scope) {
			atoken.scopes = atoken.scope.split(" ");
		} else if (state.scopes) {
			atoken.scopes = state.scopes;
		}

		api_storage.saveToken(state.providerID, atoken);

		if (state.restoreHash) {
			exp.location.hash = state.restoreHash;
		} else {
			exp.location.hash = '';
		}

		utility.log(atoken);

		if (internalStates[atoken.state] && typeof internalStates[atoken.state] === 'function') {
			internalStates[atoken.state]();
			delete internalStates[atoken.state];
		}


		if (typeof callback === 'function') {
			callback();
		}
	};

	/*
	 * A config object contains:
	 */
	jso_authrequest = function (providerid, scopes, callback) {

		var state, request = {}, authurl, co;

		if (!config[providerid]) {
            throw "Could not find configuration for provider " + providerid;
        }
		co = config[providerid];

		utility.log("About to send an authorization request to [" + providerid + "]. Config:");
		utility.log(co);

		state = utility.uuid();

		if (callback && typeof callback === 'function') {
			internalStates[state] = callback;
		}

        if (co.response_type) {
            request.response_type = co.response_type;
        } else {
            request.response_type = "token";
        }

        if (co.client_id) {
            request.client_id = co.client_id;
        }

        if (scopes) {
            request.scope = scopes.join(" ");
        }

        if (co.redirect_uri) {
            request.redirect_uri = co.redirect_uri;
        }
        
        authurl = utility.encodeURL(co.authorization, request);

		// We'd like to cache the hash for not loosing Application state. 
		// With the implicit grant flow, the hash will be replaced with the access
		// token when we return after authorization.
		if (exp.location.hash) {
			request.restoreHash = exp.location.hash;
		}
		request.providerID = providerid;
		if (scopes) {
			request.scopes = scopes;
		}
        if (co.client_secret) {
            request.client_secret = co.client_secret;
        }
        if (co.token) {
            request.token = co.token.split(" ");
        }

		utility.log("Saving state [" + state + "]");
		utility.log(JSON.parse(JSON.stringify(request)));

		api_storage.saveState(state, request);

        // authorization grant type
        if (request.response_type === 'code') {
            api_storage.savePreference(providerid, state);
        }

		api_redirect(authurl);
	};

    /**
     * Implements authorization code oauth flow
     * http://tools.ietf.org/html/rfc6749#section-1.3.1
     * @param providerid - provider id
     * @param state - state
     * @param callback - callback functionality
     */
    jso_fetchtoken = function (providerid, state, callback) {

        var request = {}, authurl, co, code;

        request = api_storage.getState(state);

        if (callback && typeof callback === 'function') {
            internalStates[state] = callback;
        }

        code = utility.parseQueryString().code;
        if (code === undefined) {
            return;
        }

        $.ajax({
            type : 'POST',
            url : request.token,
            data : {
                client_id : request.client_id,
                grant_type : 'authorization_code',
                code : code,
                client_secret : request.client_secret,
                redirect_uri : request.redirect_uri
            },
            success : function (data) {
                callback(providerid, data);
            },
            error : function (jqXHR, textStatus, errorThrown) {
                utility.log('error(jqXHR, textStatus, errorThrown)');
                utility.log(jqXHR);
                utility.log(textStatus);
                utility.log(errorThrown);

                if (jqXHR.status === 401) {

                    utility.log("Invalid authorization code");
                }
            }
        });

    };

    jso_savetoken = function (providerId, data) {
        var atoken = {}, now = utility.epoch();

        if (data.access_token) {
            atoken.access_token = data.access_token;
        }

        if (data.expires_in) {
            atoken.expires = now + parseInt(data.expires_in, 10);
        }

        if (data.scope) {
            atoken.scopes = data.scope.split(" ");
        }

        if (data.token_type) {
            atoken.type = data.token_type;
        }

        api_storage.saveToken(providerId, atoken);
        api_storage.wipeState();
    };

	exp.jso_ensureTokens = function (ensure, callback) {
		var providerid, scopes, token, state;
		for (providerid in ensure) {
            if (ensure.hasOwnProperty(providerid)) {
                scopes = undefined;
                if (ensure[providerid]) {
                    scopes = ensure[providerid];
                }
                token = api_storage.getToken(providerid, scopes);
                utility.log("Ensure token for provider [" + providerid + "] ");
                utility.log(token);

                state = api_storage.getPreference(providerid);

				// added functionality to check that a authorization code is present in the url
				// e.g http://127.0.0.1:5000/?code=79ny2dqvem9wq26k62x84y2p
				// For more info on the auth response code param :- http://tools.ietf.org/html/rfc6749#page-26
                if (state !== null && token === null && utility.parseQueryString().code !== undefined) {
                    jso_fetchtoken(providerid, state, jso_savetoken);
                    return;
                }

                if (token === null) {
                    jso_authrequest(providerid, scopes);
                }
            }
		}
        if (callback !== undefined) {
            callback();
        }
		return true;
	};

    /**
     * implements the Resource Owner Password Credentials authorization flow
     * http://tools.ietf.org/html/rfc6749#section-1.3.3
     * @param providerid - providerid
     * @param callback - optional callback function
     */
    exp.jso_getPasswordToken = function (providerid, callback) {

        var provider = config[providerid], aToken;
        aToken = api_storage.getToken(providerid, config.scope);
        if (aToken !== null) {
            callback();
            return;
        }

        $.ajax({
            type : 'POST',
            url : provider.token,
            data : {
                username : provider.username,
                password : provider.password,
                client_id : provider.client_id,
                client_secret : provider.client_secret,
                grant_type : 'password',
                scope : provider.scope.join(" ")
            },
            success : function (data) {
                jso_savetoken(providerid,  data);
                callback();
            },
            error : function (jqXHR, textStatus, errorThrown) {
                utility.log('error(jqXHR, textStatus, errorThrown)');
                utility.log(jqXHR);
                utility.log(textStatus);
                utility.log(errorThrown);

                if (jqXHR.status === 401) {

                    utility.log("Invalid authorization code");
                }
            }
        });

        if (callback !== undefined) {
            callback();
        }
    };

	exp.jso_findDefaultEntry = function (c) {
		var k, i = 0;

		if (!c) {
            return;
        }
		utility.log("c", c);
		for (k in c) {
            if (c.hasOwnProperty(k)) {
                i += 1;
                if (c[k].isDefault && c[k].isDefault === true) {
                    return k;
                }
            }
		}
		if (i === 1) {
            return k;
        }
	};

	exp.jso_configure = function (c, opts) {
		config = c;
		utility.setOptions(opts);
		try {

			var def = exp.jso_findDefaultEntry(c);
			utility.log("jso_configure() about to check for token for this entry", def);
			exp.jso_checkfortoken(def);

		} catch (e) {
			utility.log("Error when retrieving token from hash: " + e);
			exp.location.hash = "";
		}
	};

	exp.jso_dump = function () {
		var key;
		for (key in config) {
            if (config.hasOwnProperty(key)) {
                utility.log("=====> Processing provider [" + key + "]");
                utility.log("=] Config");
                utility.log(config[key]);
                utility.log("=] Tokens");
                utility.log(api_storage.getTokens(key));
            }
		}
	};

	exp.jso_wipe = function () {
		var key;
		utility.log("jso_wipe()");
		for (key in config) {
            if (config.hasOwnProperty(key)) {
                utility.log("Wipping tokens for " + key);
                api_storage.wipeTokens(key);
            }
		}
	};

	exp.jso_getToken = function (providerid, scopes) {
		var token = api_storage.getToken(providerid, scopes);
		if (!token) {
            return null;
        }
		if (!token.access_token) {
            return null;
        }
		return token.access_token;
	};

	exp.jso_registerRedirectHandler = function (callback) {
		api_redirect = callback;
	};

	exp.jso_registerStorageHandler = function (object) {
		api_storage = object;
	};


	/*
	 * From now on, we only perform tasks that require jQuery.
	 * Like adding the $.oajax function.
	 */
	if ($ === 'undefined') {
        return;
    }

	$.oajax = function (settings) {
		var allowia,
			scopes,
			token,
			providerid,
			co,
            errorOverridden,
            performAjax;
		providerid = settings.jso_provider;
		allowia = settings.jso_allowia || false;
		scopes = settings.jso_scopes;
		token = api_storage.getToken(providerid, scopes);
		co = config[providerid];

		errorOverridden = settings.error || null;

		performAjax = function () {
			// utility.log("Perform ajax!");

			if (!token) {
                throw "Could not perform AJAX call because no valid tokens was found.";
            }

			if (co.presenttoken && co.presenttoken === "qs") {
				if (!settings.data) {
                    settings.data = {};
                }
				settings.data.access_token = token.access_token;
			} else {
				if (!settings.headers) {
                    settings.headers = {};
                }
				settings.headers.Authorization = "Bearer " + token.access_token;
			}
			$.ajax(settings);
		};

		settings.error = function (jqXHR, textStatus, errorThrown) {
			utility.log('error(jqXHR, textStatus, errorThrown)');
			utility.log(jqXHR);
			utility.log(textStatus);
			utility.log(errorThrown);

			if (jqXHR.status === 401) {

				utility.log("Token expired. About to delete this token");
				utility.log(token);
				api_storage.wipeTokens(providerid);

			}
			if (errorOverridden && typeof errorOverridden === 'function') {
				errorOverridden(jqXHR, textStatus, errorThrown);
			}
		};

		if (!token) {
			if (allowia) {
				utility.log("Perform authrequest");
				jso_authrequest(providerid, scopes, function () {
					token = api_storage.getToken(providerid, scopes);
					performAjax();
				});
			} else {
				throw "Could not perform AJAX call because no valid tokens was found.";
			}
		}
		performAjax();
	};


}(window, window.jQuery));
