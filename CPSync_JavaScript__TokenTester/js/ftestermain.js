/*jslint nomen : true*/
/*jslint bitwise : true*/
/*jslint browser : true*/
/*jslint devel : true*/
/*global $, log4javascript, */

// global environment values
var log, config, request = {
    method: "POST",
    grant_type: "authorization_code",
    response_type: "code",
    dataType: "json"
};

/**
 * This function configures the logger
 * @returns {undefined}
 */
function setupLogging() {
    "use strict";
    log = log4javascript.getLogger("main");
    var appender = new log4javascript.InPageAppender();
    log.addAppender(appender);
    log.debug("This is a debugging message from the log4javascript in-page page");
}

/**
 * The following function checks if a <K,V> pair exists in localStorage, if the value is found
 * it is overwritten, if not the entry is added
 * @param {String} key
 * @param {String} value - data to be associated with key in localStorage
 * @returns {void}
 */
function setValue(key, value) {
    "use strict";
    log.info("setting repo - name ", key, " to ", value);
    localStorage.setItem(key, value);
}

/**
 * The following function returns an item for a specified key from html5 localStorage
 * @see http://www.w3.org/TR/webstorage/#dom-storage-getitem for more info
 * @param {String} name
 * @returns {String} if found and null if not found
 */
function getValue(name) {
    "use strict";
    var result = localStorage.getItem(name);
    return (result === null) ? null : result;
}

/**
 * Clears all environment settings and restores default
 * @returns {void}
 */
function clearEnv() {
    "use strict";
    // clear everything from localStorage then invoke a page refresh
    localStorage.clear();
    window.location = "";
}


/**
 * The following function fetches a specified parameter from a url
 * @param {String} name - parameter name
 * @returns {String} - associated parameter value or empty string if not found
 */
function getParameterByName(name)
{
    log.info("get ", name, " parameter");
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.search);
    log.info(name, " is " + results);
    if (results === null) {
        return "";
    }
    else {
        return decodeURIComponent(results[1].replace(/\+/g, " "));
    }
}

/**
 * The following function checks user current setting (from the input box) with the
 * the environment setting to determine if a change has been made
 * @param {Object} settings
 * @return {Boolean} true if and only if both clientId and scope matches
 */
function equalCreds(settings) {
    "use strict";
    var iClientId = $("#clientid").val(),
        iClientSecret = $("#clientsecret").val(),
        iScope = $("#scope").val();
    return settings.clientId === iClientId &&
        settings.scope === iScope &&
        settings.clientSecret === iClientSecret;
}

function sanitize() {
    "use strict";
    var sScope = $("#scope").val(),
        aScope = [],
        result;
    if (sScope.length > 0) {
        // TODO : // edge case here is that a comma or space isn't used to delimit the string
        if (/,/.test(sScope)) {
            aScope = sScope.split(',');
        } else {
            aScope = sScope.split(' ');
        }
        result = [];
        $.each(aScope, function (idx, val) {
           result.push($.trim(val)); 
        });
        
        console.log('sanitizing >>', result.join(','));
        $("#scope").val(result.join(','));
    }   
}

/**
 * Retrieve current environment configuration
 * @returns {String}
 */
function getEnvironment() {
    "use strict";
    log.info("getting environment");
    return getValue('env');
}

/**
 * The following function sets the environment configuration (if null)
 * Returning the newly set configuration
 * @returns {String|jQuery|getValue.result}
 */
function setEnvironment() {
    "use strict";
    var env = getEnvironment('env');
    log.info("environment is ", env);
    if (env === null) {
        env = $('#optEnviron').val();
        setValue('env', env);
    }
    return env;
}

/**
 * The following function compares the default configuration with the saved (if any)
 * If changes are detected the saved configuration is updated.
 * NB: Changes are tracked using an MD5 hash of the users current configuration. if the current hash
 * and the hash of the config does not match the configuration is "dirty" and needs to be updated
 * @param {Object} config - default configuration
 * @returns {Object}
 */
function updateAndFetchConfig(config) {
    "use strict";
    var conf = getValue('config'),
        sConf = JSON.stringify(config),
        hash,
        nhash;
    if (conf === null) {
        setValue('config', sConf);
        setValue('hash', $.md5(sConf));
        return config;
    } else {
        hash = getValue('hash');
        nhash = $.md5(sConf);
        if (hash === nhash) {
            log.info('config synchronized');
            return JSON.parse(conf);
        } else {
            log.info('updated detected. updating persisted configuration');
            setValue('config', sConf);
            setValue('hash', $.md5(sConf));
            return config;
        }
    }
}

/**
 * The following function updates the values for a particular environment
 * @returns {undefined}
 */
function updateEnvValues() {
    "use strict";
    var env = getEnvironment(),
        conf = updateAndFetchConfig(config),
        sConf;
    conf[env].clientId = $("#clientid").val();
    conf[env].clientSecret = $("#clientsecret").val();
    conf[env].scope = $("#scope").val();
    // submit the updated configuration
    sConf = JSON.stringify(conf);
    setValue('config', sConf);
}


/**
 * The following function returns the default environment configuration object
 * @returns {Object}
 */
function getEnvironmentPresets() {
    "use strict";
    return {
        local: {
            tokenUrl: "http://localhost:8080/carepass/oauth/token",
            authUrl: "http://localhost:8080/carepass/oauth/authorize",
            clientId: "7upp3and7ftgpnt7wc46rder",
            clientSecret: "W7KbQDs2TfNFGWRPSBfPQdeC",
            scope: "IDENTITY,FITNESS,FEED,GOAL, BODYMEASUREMENT, BODYMEASUREMENTFULL",
            redirectUrl: "https://developer.carepass.com/ftokentester"
        },
        qa: {
            tokenUrl: "https://qawww.carepass.com/carepass/oauth/token",
            authUrl: "https://qawww.carepass.com/carepass/oauth/authorize",
            clientId: "a4cwuzmyudeahj6jq4y94bub",
            clientSecret: "wTbgkKkQSuuP7UCafkh2x3mb",
            scope: "IDENTITY,FITNESS,FEED,GOAL",
            redirectUrl: "https://developer.carepass.com/ftokentester"
        },
        qa2: {
            tokenUrl: "https://qa2www.carepass.com/carepass/oauth/token",
            authUrl: "https://qa2www.carepass.com/carepass/oauth/authorize",
            clientId: "a4cwuzmyudeahj6jq4y94bub",
            clientSecret: "wTbgkKkQSuuP7UCafkh2x3mb",
            scope: "IDENTITY,FITNESS,FEED,GOAL",
            redirectUrl: "https://developer.carepass.com/ftokentester"
        },
        qa3: {
            tokenUrl: "https://qa2www.carepass.com/carepass3/oauth/token",
            authUrl: "https://qa2www.carepass.com/carepass3/oauth/authorize",
            clientId: "a4cwuzmyudeahj6jq4y94bub",
            clientSecret: "wTbgkKkQSuuP7UCafkh2x3mb",
            scope: "IDENTITY,FITNESS,FEED,GOAL",
            redirectUrl: "https://developer.carepass.com/ftokentester"
        },
        qa4: {
            tokenUrl: "https://qa2www.carepass.com/carepass4/oauth/token",
            authUrl: "https://qa2www.carepass.com/carepass4/oauth/authorize",
            clientId: "a4cwuzmyudeahj6jq4y94bub",
            clientSecret: "wTbgkKkQSuuP7UCafkh2x3mb",
            scope: "IDENTITY,FITNESS,FEED,GOAL",
            redirectUrl: "https://developer.carepass.com/ftokentester"
        },
        qa5: {
            tokenUrl: "https://qa2www.carepass.com/carepass5/oauth/token",
            authUrl: "https://qa2www.carepass.com/carepass5/oauth/authorize",
            clientId: "a4cwuzmyudeahj6jq4y94bub",
            clientSecret: "wTbgkKkQSuuP7UCafkh2x3mb",
            scope: "IDENTITY,FITNESS,FEED,GOAL",
            redirectUrl: "https://developer.carepass.com/ftokentester"
        },
        qa6: {
            tokenUrl: "https://qa2www.carepass.com/carepass6/oauth/token",
            authUrl: "https://qa2www.carepass.com/carepass6/oauth/authorize",
            clientId: "a4cwuzmyudeahj6jq4y94bub",
            clientSecret: "wTbgkKkQSuuP7UCafkh2x3mb",
            scope: "IDENTITY,FITNESS,FEED,GOAL",
            redirectUrl: "https://developer.carepass.com/ftokentester"
        },
        qa7: {
            tokenUrl: "https://qa2www.carepass.com/carepass7/oauth/token",
            authUrl: "https://qa2www.carepass.com/carepass7/oauth/authorize",
            clientId: "a4cwuzmyudeahj6jq4y94bub",
            clientSecret: "wTbgkKkQSuuP7UCafkh2x3mb",
            scope: "IDENTITY,FITNESS,FEED,GOAL",
            redirectUrl: "https://developer.carepass.com/ftokentester"
        },
        prod: {
            tokenUrl: "https://www.carepass.com/carepass/oauth/token",
            authUrl: "https://www.carepass.com/carepass/oauth/authorize",
            clientId: "zs72vaadu2za3q232xzwa3ua",
            clientSecret: "776S2uwgk8YwvkQuXz9ADMy5",
            scope: "IDENTITY,FITNESS,FEED,GOAL",
            redirectUrl: "https://developer.carepass.com/ftokentester"
        }
    };
}

function startOAuthHandshake() {
    "use strict";
    log.info("stating oauth handshake...");

    var setting = updateAndFetchConfig(config)[getEnvironment()],
        bUpdated,
        authorizationUrlWithArguments;

    // Feature add : August 19th 2013
    // The following feature allows for automatic saving of env values
    // if changes were detected upon clicking the start OAuth button

    // check if the input box values has been updated
    bUpdated = equalCreds(setting);
    if (!bUpdated) {
        // if the values were updated, updated the localStorage environment values
        // and reload the settings
        updateEnvValues();
        setting = updateAndFetchConfig(config)[getEnvironment()];
    }

    // build the the authorization url
    authorizationUrlWithArguments = setting.authUrl + '?' + $.param({
        response_type: 'code',
        client_id: setting.clientId,
        scope: setting.scope,
        redirect_uri: setting.redirectUrl
    });
    window.location = authorizationUrlWithArguments;
}

/**
 * The following function performs a POST request to the /oauth/token endpoint
 * to exchange the authorization code for a valid access token
 * @param {String} code - authorization code
 * @returns {void}
 */
function getAccessToken(code) {
    "use strict";
    var debug_mode = false,
        setting;
    if (code === 'undefined' || code === null) {
        code = $("#auth_code").val().trim();
        if (code !== "") {
            debug_mode = true;
        }
    }

    if (code !== "" || debug_mode) {
        setting = updateAndFetchConfig(config)[getEnvironment()];

        $.ajax({
            type: request.method,
            url: setting.tokenUrl,
            dataType: request.dataType,
            data: {
                response_type: request.response_type,
                client_id: setting.clientId,
                grant_type: request.grant_type,
                code: code,
                client_secret: setting.clientSecret,
                redirect_uri: setting.redirectUrl
            },
            success: function (data) {
                // might think about externalizing the success.error callbacks
                // so that they appear has handlers that can be injected into $.ajax
                log.info(JSON.stringify(data));
                if (data.access_token !== undefined) {
                    $('#token').val(data.access_token);

                    if (debug_mode) {
                        $("#token_display").text(JSON.stringify(data));
                    }
                }
            },
            error: function (data) {
                //Something went wrong, log it!
                log.error(JSON.stringify(data));

                if (debug_mode) {
                    $("#token_display").text(JSON.stringify(data));
                }
            }
        });
    } else {
        $("#token_display").text("Error: Authorization Code is missing");
    }
}

function completeOAuth() {
    "use strict";
    log.info("2nd leg of oauth handshake...");
    var code = getParameterByName('code');
    if (code !== null && code.length > 1) {
        log.info("sending parameters to complete 2nd part of oauth handshake ... ");
        getAccessToken(code);
    } else {
        log.info("2nd leg of oauth handshake was not needed.");
    }
}

/**
 * The following function load the values on the page from the environment
 * configuration variables
 * @returns {void}
 */
function loadPageValues() {
    "use strict";
    config = config || getEnvironmentPresets();
    var env = setEnvironment(),
        record = updateAndFetchConfig(config)[env];

    $("#clientid").val(record.clientId);
    $("#clientsecret").val(record.clientSecret);
    $("#scope").val(record.scope);
    $("#optEnviron").val(env);

}

/**
 * Responsible for the loading and initialization of the page and environment values
 * @returns {void}
 */
function loadPage() {
    "use strict";
    log.info("loading html");
    setEnvironment();
    loadPageValues();
}

/**
 * Change environment configuration to drop-down option and update page values
 * @returns {void}
 */
function changeEnvironment() {
    "use strict";
    var env = $('#optEnviron').val();
    log.info("environment is ", env);
    setValue('env', env);
    loadPageValues();
}



/**
 * Initialization/App bootstrap functionality
 * @returns {undefined}
 */
$(function () {
    "use strict";
    setupLogging();
    loadPage();
    completeOAuth();
});
