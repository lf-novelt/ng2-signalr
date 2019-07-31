/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
'use strict';
import jQueryShim from './jQueryShim';
/* jquery.signalR.core.js */
/*global window:false */
/*!
 * ASP.NET SignalR JavaScript Library v2.2.1
 * http://signalr.net/
 *
 * Copyright (c) .NET Foundation. All rights reserved.
 * Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
 *
 */
/// <reference path="Scripts/jquery-1.6.4.js" />
/// <reference path="jquery.signalR.version.js" />
((/**
 * @param {?} $
 * @param {?} window
 * @param {?} undefined
 * @return {?}
 */
function ($, window, undefined) {
    /** @type {?} */
    var resources = {
        nojQuery: "jQuery was not found. Please ensure jQuery is referenced before the SignalR client JavaScript file.",
        noTransportOnInit: "No transport could be initialized successfully. Try specifying a different transport or none at all for auto initialization.",
        errorOnNegotiate: "Error during negotiation request.",
        stoppedWhileLoading: "The connection was stopped during page load.",
        stoppedWhileNegotiating: "The connection was stopped during the negotiate request.",
        errorParsingNegotiateResponse: "Error parsing negotiate response.",
        errorDuringStartRequest: "Error during start request. Stopping the connection.",
        stoppedDuringStartRequest: "The connection was stopped during the start request.",
        errorParsingStartResponse: "Error parsing start response: '{0}'. Stopping the connection.",
        invalidStartResponse: "Invalid start response: '{0}'. Stopping the connection.",
        protocolIncompatible: "You are using a version of the client that isn't compatible with the server. Client version {0}, server version {1}.",
        sendFailed: "Send failed.",
        parseFailed: "Failed at parsing response: {0}",
        longPollFailed: "Long polling request failed.",
        eventSourceFailedToConnect: "EventSource failed to connect.",
        eventSourceError: "Error raised by EventSource",
        webSocketClosed: "WebSocket closed.",
        pingServerFailedInvalidResponse: "Invalid ping response when pinging server: '{0}'.",
        pingServerFailed: "Failed to ping server.",
        pingServerFailedStatusCode: "Failed to ping server.  Server responded with status code {0}, stopping the connection.",
        pingServerFailedParse: "Failed to parse ping server response, stopping the connection.",
        noConnectionTransport: "Connection is in an invalid state, there is no transport active.",
        webSocketsInvalidState: "The Web Socket transport is in an invalid state, transitioning into reconnecting.",
        reconnectTimeout: "Couldn't reconnect within the configured timeout of {0} ms, disconnecting.",
        reconnectWindowTimeout: "The client has been inactive since {0} and it has exceeded the inactivity timeout of {1} ms. Stopping the connection."
    };
    /** @type {?} */
    var signalR;
    /** @type {?} */
    var _connection;
    /** @type {?} */
    var _pageLoaded = (window.document.readyState === "complete");
    /** @type {?} */
    var _pageWindow = $(window);
    /** @type {?} */
    var _negotiateAbortText = "__Negotiate Aborted__";
    /** @type {?} */
    var events = {
        onStart: "onStart",
        onStarting: "onStarting",
        onReceived: "onReceived",
        onError: "onError",
        onConnectionSlow: "onConnectionSlow",
        onReconnecting: "onReconnecting",
        onReconnect: "onReconnect",
        onStateChanged: "onStateChanged",
        onDisconnect: "onDisconnect"
    };
    /** @type {?} */
    var ajaxDefaults = {
        processData: true,
        timeout: null,
        async: true,
        global: false,
        cache: false
    };
    /** @type {?} */
    var log = (/**
     * @param {?} msg
     * @param {?} logging
     * @return {?}
     */
    function (msg, logging) {
        if (logging === false) {
            return;
        }
        /** @type {?} */
        var m;
        if (typeof (window.console) === "undefined") {
            return;
        }
        m = "[" + new Date().toTimeString() + "] SignalR: " + msg;
        if (window.console.debug) {
            window.console.debug(m);
        }
        else if (window.console.log) {
            window.console.log(m);
        }
    });
    /** @type {?} */
    var changeState = (/**
     * @param {?} connection
     * @param {?} expectedState
     * @param {?} newState
     * @return {?}
     */
    function (connection, expectedState, newState) {
        if (expectedState === connection.state) {
            connection.state = newState;
            $(connection).triggerHandler(events.onStateChanged, [{ oldState: expectedState, newState: newState }]);
            return true;
        }
        return false;
    });
    /** @type {?} */
    var isDisconnecting = (/**
     * @param {?} connection
     * @return {?}
     */
    function (connection) {
        return connection.state === signalR.connectionState.disconnected;
    });
    /** @type {?} */
    var supportsKeepAlive = (/**
     * @param {?} connection
     * @return {?}
     */
    function (connection) {
        return connection._.keepAliveData.activated &&
            connection.transport.supportsKeepAlive(connection);
    });
    /** @type {?} */
    var configureStopReconnectingTimeout = (/**
     * @param {?} connection
     * @return {?}
     */
    function (connection) {
        /** @type {?} */
        var stopReconnectingTimeout;
        /** @type {?} */
        var onReconnectTimeout;
        // Check if this connection has already been configured to stop reconnecting after a specified timeout.
        // Without this check if a connection is stopped then started events will be bound multiple times.
        if (!connection._.configuredStopReconnectingTimeout) {
            onReconnectTimeout = (/**
             * @param {?} connection
             * @return {?}
             */
            function (connection) {
                /** @type {?} */
                var message = signalR._.format(signalR.resources.reconnectTimeout, connection.disconnectTimeout);
                connection.log(message);
                $(connection).triggerHandler(events.onError, [signalR._.error(message, /* source */ "TimeoutException")]);
                connection.stop(/* async */ false, /* notifyServer */ false);
            });
            connection.reconnecting((/**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var connection = this;
                // Guard against state changing in a previous user defined even handler
                if (connection.state === signalR.connectionState.reconnecting) {
                    stopReconnectingTimeout = window.setTimeout((/**
                     * @return {?}
                     */
                    function () { onReconnectTimeout(connection); }), connection.disconnectTimeout);
                }
            }));
            connection.stateChanged((/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                if (data.oldState === signalR.connectionState.reconnecting) {
                    // Clear the pending reconnect timeout check
                    window.clearTimeout(stopReconnectingTimeout);
                }
            }));
            connection._.configuredStopReconnectingTimeout = true;
        }
    });
    signalR = (/**
     * @param {?} url
     * @param {?} qs
     * @param {?} logging
     * @return {?}
     */
    function (url, qs, logging) {
        /// <summary>Creates a new SignalR connection for the given url</summary>
        /// <param name="url" type="String">The URL of the long polling endpoint</param>
        /// <param name="qs" type="Object">
        ///     [Optional] Custom querystring parameters to add to the connection URL.
        ///     If an object, every non-function member will be added to the querystring.
        ///     If a string, it's added to the QS as specified.
        /// </param>
        /// <param name="logging" type="Boolean">
        ///     [Optional] A flag indicating whether connection logging is enabled to the browser
        ///     console/log. Defaults to false.
        /// </param>
        return new signalR.fn.init(url, qs, logging);
    });
    signalR._ = {
        defaultContentType: "application/x-www-form-urlencoded; charset=UTF-8",
        ieVersion: ((/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var version;
            /** @type {?} */
            var matches;
            if (window.navigator.appName === 'Microsoft Internet Explorer') {
                // Check if the user agent has the pattern "MSIE (one or more numbers).(one or more numbers)";
                matches = /MSIE ([0-9]+\.[0-9]+)/.exec(window.navigator.userAgent);
                if (matches) {
                    version = parseFloat(matches[1]);
                }
            }
            // undefined value means not IE
            return version;
        }))(),
        error: (/**
         * @param {?} message
         * @param {?} source
         * @param {?} context
         * @return {?}
         */
        function (message, source, context) {
            /** @type {?} */
            var e = (/** @type {?} */ (new Error(message)));
            e.source = source;
            if (typeof context !== "undefined") {
                e.context = context;
            }
            return e;
        }),
        transportError: (/**
         * @param {?} message
         * @param {?} transport
         * @param {?} source
         * @param {?} context
         * @return {?}
         */
        function (message, transport, source, context) {
            /** @type {?} */
            var e = this.error(message, source, context);
            e.transport = transport ? transport.name : undefined;
            return e;
        }),
        format: (/**
         * @return {?}
         */
        function () {
            /// <summary>Usage: format("Hi {0}, you are {1}!", "Foo", 100) </summary>
            /** @type {?} */
            var s = arguments[0];
            for (var i = 0; i < arguments.length - 1; i++) {
                s = s.replace("{" + i + "}", arguments[i + 1]);
            }
            return s;
        }),
        firefoxMajorVersion: (/**
         * @param {?} userAgent
         * @return {?}
         */
        function (userAgent) {
            // Firefox user agents: http://useragentstring.com/pages/Firefox/
            /** @type {?} */
            var matches = userAgent.match(/Firefox\/(\d+)/);
            if (!matches || !matches.length || matches.length < 2) {
                return 0;
            }
            return parseInt(matches[1], 10 /* radix */);
        }),
        configurePingInterval: (/**
         * @param {?} connection
         * @return {?}
         */
        function (connection) {
            /** @type {?} */
            var config = connection._.config;
            /** @type {?} */
            var onFail = (/**
             * @param {?} error
             * @return {?}
             */
            function (error) {
                $(connection).triggerHandler(events.onError, [error]);
            });
            if (config && !connection._.pingIntervalId && config.pingInterval) {
                connection._.pingIntervalId = window.setInterval((/**
                 * @return {?}
                 */
                function () {
                    signalR.transports._logic.pingServer(connection).fail(onFail);
                }), config.pingInterval);
            }
        })
    };
    signalR.events = events;
    signalR.resources = resources;
    signalR.ajaxDefaults = ajaxDefaults;
    signalR.changeState = changeState;
    signalR.isDisconnecting = isDisconnecting;
    signalR.connectionState = {
        connecting: 0,
        connected: 1,
        reconnecting: 2,
        disconnected: 4
    };
    signalR.hub = {
        start: (/**
         * @return {?}
         */
        function () {
            // This will get replaced with the real hub connection start method when hubs is referenced correctly
            throw new Error("SignalR: Error loading hubs. Ensure your hubs reference is correct, e.g. <script src='/signalr/js'></script>.");
        })
    };
    // .on() was added in version 1.7.0, .load() was removed in version 3.0.0 so we fallback to .load() if .on() does
    // not exist to not break existing applications
    if (typeof _pageWindow.on == "function") {
        _pageWindow.on("load", (/**
         * @return {?}
         */
        function () { _pageLoaded = true; }));
    }
    else {
        _pageWindow.load((/**
         * @return {?}
         */
        function () { _pageLoaded = true; }));
    }
    /**
     * @param {?} requestedTransport
     * @param {?} connection
     * @return {?}
     */
    function validateTransport(requestedTransport, connection) {
        /// <summary>Validates the requested transport by cross checking it with the pre-defined signalR.transports</summary>
        /// <param name="requestedTransport" type="Object">The designated transports that the user has specified.</param>
        /// <param name="connection" type="signalR">The connection that will be using the requested transports.  Used for logging purposes.</param>
        /// <returns type="Object" />
        if ($.isArray(requestedTransport)) {
            // Go through transport array and remove an "invalid" tranports
            for (var i = requestedTransport.length - 1; i >= 0; i--) {
                /** @type {?} */
                var transport = requestedTransport[i];
                if ($.type(transport) !== "string" || !signalR.transports[transport]) {
                    connection.log("Invalid transport: " + transport + ", removing it from the transports list.");
                    requestedTransport.splice(i, 1);
                }
            }
            // Verify we still have transports left, if we dont then we have invalid transports
            if (requestedTransport.length === 0) {
                connection.log("No transports remain within the specified transport array.");
                requestedTransport = null;
            }
        }
        else if (!signalR.transports[requestedTransport] && requestedTransport !== "auto") {
            connection.log("Invalid transport: " + requestedTransport.toString() + ".");
            requestedTransport = null;
        }
        else if (requestedTransport === "auto" && signalR._.ieVersion <= 8) {
            // If we're doing an auto transport and we're IE8 then force longPolling, #1764
            return ["longPolling"];
        }
        return requestedTransport;
    }
    /**
     * @param {?} protocol
     * @return {?}
     */
    function getDefaultPort(protocol) {
        if (protocol === "http:") {
            return 80;
        }
        else if (protocol === "https:") {
            return 443;
        }
    }
    /**
     * @param {?} protocol
     * @param {?} url
     * @return {?}
     */
    function addDefaultPort(protocol, url) {
        // Remove ports  from url.  We have to check if there's a / or end of line
        // following the port in order to avoid removing ports such as 8080.
        if (url.match(/:\d+$/)) {
            return url;
        }
        else {
            return url + ":" + getDefaultPort(protocol);
        }
    }
    /**
     * @param {?} connection
     * @param {?} drainCallback
     * @return {?}
     */
    function ConnectingMessageBuffer(connection, drainCallback) {
        /** @type {?} */
        var that = this;
        /** @type {?} */
        var buffer = [];
        that.tryBuffer = (/**
         * @param {?} message
         * @return {?}
         */
        function (message) {
            if (connection.state === $.signalR.connectionState.connecting) {
                buffer.push(message);
                return true;
            }
            return false;
        });
        that.drain = (/**
         * @return {?}
         */
        function () {
            // Ensure that the connection is connected when we drain (do not want to drain while a connection is not active)
            if (connection.state === $.signalR.connectionState.connected) {
                while (buffer.length > 0) {
                    drainCallback(buffer.shift());
                }
            }
        });
        that.clear = (/**
         * @return {?}
         */
        function () {
            buffer = [];
        });
    }
    signalR.fn = signalR.prototype = {
        init: (/**
         * @param {?} url
         * @param {?} qs
         * @param {?} logging
         * @return {?}
         */
        function (url, qs, logging) {
            /** @type {?} */
            var $connection = $(this);
            this.url = url;
            this.qs = qs;
            this.lastError = null;
            this._ = {
                keepAliveData: {},
                connectingMessageBuffer: new ConnectingMessageBuffer(this, (/**
                 * @param {?} message
                 * @return {?}
                 */
                function (message) {
                    $connection.triggerHandler(events.onReceived, [message]);
                })),
                lastMessageAt: new Date().getTime(),
                lastActiveAt: new Date().getTime(),
                beatInterval: 5000,
                // Default value, will only be overridden if keep alive is enabled,
                beatHandle: null,
                totalTransportConnectTimeout: 0 // This will be the sum of the TransportConnectTimeout sent in response to negotiate and connection.transportConnectTimeout
            };
            if (typeof (logging) === "boolean") {
                this.logging = logging;
            }
        }),
        _parseResponse: (/**
         * @param {?} response
         * @return {?}
         */
        function (response) {
            /** @type {?} */
            var that = this;
            if (!response) {
                return response;
            }
            else if (typeof response === "string") {
                return that.json.parse(response);
            }
            else {
                return response;
            }
        }),
        _originalJson: JSON,
        json: JSON,
        isCrossDomain: (/**
         * @param {?} url
         * @param {?} against
         * @return {?}
         */
        function (url, against) {
            /// <summary>Checks if url is cross domain</summary>
            /// <param name="url" type="String">The base URL</param>
            /// <param name="against" type="Object">
            ///     An optional argument to compare the URL against, if not specified it will be set to window.location.
            ///     If specified it must contain a protocol and a host property.
            /// </param>
            /** @type {?} */
            var link;
            url = $.trim(url);
            against = against || window.location;
            if (url.indexOf("http") !== 0) {
                return false;
            }
            // Create an anchor tag.
            link = window.document.createElement("a");
            link.href = url;
            // When checking for cross domain we have to special case port 80 because the window.location will remove the
            return link.protocol + addDefaultPort(link.protocol, link.host) !== against.protocol + addDefaultPort(against.protocol, against.host);
        }),
        ajaxDataType: "text",
        contentType: "application/json; charset=UTF-8",
        logging: false,
        state: signalR.connectionState.disconnected,
        clientProtocol: "1.5",
        reconnectDelay: 2000,
        transportConnectTimeout: 0,
        disconnectTimeout: 30000,
        // This should be set by the server in response to the negotiate request (30s default)
        reconnectWindow: 30000,
        // This should be set by the server in response to the negotiate request
        keepAliveWarnAt: 2 / 3,
        // Warn user of slow connection if we breach the X% mark of the keep alive timeout
        start: (/**
         * @param {?} options
         * @param {?} callback
         * @return {?}
         */
        function (options, callback) {
            /// <summary>Starts the connection</summary>
            /// <param name="options" type="Object">Options map</param>
            /// <param name="callback" type="Function">A callback function to execute when the connection has started</param>
            /** @type {?} */
            var connection = this;
            /** @type {?} */
            var config = (/** @type {?} */ ({
                pingInterval: 300000,
                waitForPageLoad: true,
                transport: "auto",
                jsonp: false,
                callback: undefined
            }));
            /** @type {?} */
            var initialize;
            /** @type {?} */
            var deferred = connection._deferral || $.Deferred();
            /** @type {?} */
            var // Check to see if there is a pre-existing deferral that's being built on, if so we want to keep using it
            parser = window.document.createElement("a");
            connection.lastError = null;
            // Persist the deferral so that if start is called multiple times the same deferral is used.
            connection._deferral = deferred;
            if (!connection.json) {
                // no JSON!
                throw new Error("SignalR: No JSON parser found. Please ensure json2.js is referenced before the SignalR.js file if you need to support clients without native JSON parsing support, e.g. IE<8.");
            }
            if ($.type(options) === "function") {
                // Support calling with single callback parameter
                callback = options;
            }
            else if ($.type(options) === "object") {
                $.extend(config, options);
                if ($.type(config.callback) === "function") {
                    callback = config.callback;
                }
            }
            config.transport = validateTransport(config.transport, connection);
            // If the transport is invalid throw an error and abort start
            if (!config.transport) {
                throw new Error("SignalR: Invalid transport(s) specified, aborting start.");
            }
            connection._.config = config;
            // Check to see if start is being called prior to page load
            // If waitForPageLoad is true we then want to re-direct function call to the window load event
            if (!_pageLoaded && config.waitForPageLoad === true) {
                connection._.deferredStartHandler = (/**
                 * @return {?}
                 */
                function () {
                    connection.start(options, callback);
                });
                _pageWindow.bind("load", connection._.deferredStartHandler);
                return deferred.promise();
            }
            // If we're already connecting just return the same deferral as the original connection start
            if (connection.state === signalR.connectionState.connecting) {
                return deferred.promise();
            }
            else if (changeState(connection, signalR.connectionState.disconnected, signalR.connectionState.connecting) === false) {
                // We're not connecting so try and transition into connecting.
                // If we fail to transition then we're either in connected or reconnecting.
                deferred.resolve(connection);
                return deferred.promise();
            }
            configureStopReconnectingTimeout(connection);
            // Resolve the full url
            parser.href = connection.url;
            if (!parser.protocol || parser.protocol === ":") {
                connection.protocol = window.document.location.protocol;
                connection.host = parser.host || window.document.location.host;
            }
            else {
                connection.protocol = parser.protocol;
                connection.host = parser.host;
            }
            connection.baseUrl = connection.protocol + "//" + connection.host;
            // Set the websocket protocol
            connection.wsProtocol = connection.protocol === "https:" ? "wss://" : "ws://";
            // If jsonp with no/auto transport is specified, then set the transport to long polling
            // since that is the only transport for which jsonp really makes sense.
            // Some developers might actually choose to specify jsonp for same origin requests
            // as demonstrated by Issue #623.
            if (config.transport === "auto" && config.jsonp === true) {
                config.transport = "longPolling";
            }
            // If the url is protocol relative, prepend the current windows protocol to the url.
            if (connection.url.indexOf("//") === 0) {
                connection.url = window.location.protocol + connection.url;
                connection.log("Protocol relative URL detected, normalizing it to '" + connection.url + "'.");
            }
            if (this.isCrossDomain(connection.url)) {
                connection.log("Auto detected cross domain url.");
                if (config.transport === "auto") {
                    // TODO: Support XDM with foreverFrame
                    config.transport = ["webSockets", "serverSentEvents", "longPolling"];
                }
                if (typeof (config.withCredentials) === "undefined") {
                    config.withCredentials = true;
                }
                // Determine if jsonp is the only choice for negotiation, ajaxSend and ajaxAbort.
                // i.e. if the browser doesn't supports CORS
                // If it is, ignore any preference to the contrary, and switch to jsonp.
                if (!config.jsonp) {
                    config.jsonp = !$.support.cors;
                    if (config.jsonp) {
                        connection.log("Using jsonp because this browser doesn't support CORS.");
                    }
                }
                connection.contentType = signalR._.defaultContentType;
            }
            connection.withCredentials = config.withCredentials;
            connection.ajaxDataType = config.jsonp ? "jsonp" : "text";
            $(connection).bind(events.onStart, (/**
             * @param {?} e
             * @param {?} data
             * @return {?}
             */
            function (e, data) {
                if ($.type(callback) === "function") {
                    callback.call(connection);
                }
                deferred.resolve(connection);
            }));
            connection._.initHandler = signalR.transports._logic.initHandler(connection);
            initialize = (/**
             * @param {?} transports
             * @param {?} index
             * @return {?}
             */
            function (transports, index) {
                /** @type {?} */
                var noTransportError = signalR._.error(resources.noTransportOnInit);
                index = index || 0;
                if (index >= transports.length) {
                    if (index === 0) {
                        connection.log("No transports supported by the server were selected.");
                    }
                    else if (index === 1) {
                        connection.log("No fallback transports were selected.");
                    }
                    else {
                        connection.log("Fallback transports exhausted.");
                    }
                    // No transport initialized successfully
                    $(connection).triggerHandler(events.onError, [noTransportError]);
                    deferred.reject(noTransportError);
                    // Stop the connection if it has connected and move it into the disconnected state
                    connection.stop();
                    return;
                }
                // The connection was aborted
                if (connection.state === signalR.connectionState.disconnected) {
                    return;
                }
                /** @type {?} */
                var transportName = transports[index];
                /** @type {?} */
                var transport = signalR.transports[transportName];
                /** @type {?} */
                var onFallback = (/**
                 * @return {?}
                 */
                function () {
                    initialize(transports, index + 1);
                });
                connection.transport = transport;
                try {
                    connection._.initHandler.start(transport, (/**
                     * @return {?}
                     */
                    function () {
                        // success
                        // Firefox 11+ doesn't allow sync XHR withCredentials: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#withCredentials
                        /** @type {?} */
                        var isFirefox11OrGreater = signalR._.firefoxMajorVersion(window.navigator.userAgent) >= 11;
                        /** @type {?} */
                        var asyncAbort = !!connection.withCredentials && isFirefox11OrGreater;
                        connection.log("The start request succeeded. Transitioning to the connected state.");
                        if (supportsKeepAlive(connection)) {
                            signalR.transports._logic.monitorKeepAlive(connection);
                        }
                        signalR.transports._logic.startHeartbeat(connection);
                        // Used to ensure low activity clients maintain their authentication.
                        // Must be configured once a transport has been decided to perform valid ping requests.
                        signalR._.configurePingInterval(connection);
                        if (!changeState(connection, signalR.connectionState.connecting, signalR.connectionState.connected)) {
                            connection.log("WARNING! The connection was not in the connecting state.");
                        }
                        // Drain any incoming buffered messages (messages that came in prior to connect)
                        connection._.connectingMessageBuffer.drain();
                        $(connection).triggerHandler(events.onStart);
                        // wire the stop handler for when the user leaves the page
                        _pageWindow.bind("unload", (/**
                         * @return {?}
                         */
                        function () {
                            connection.log("Window unloading, stopping the connection.");
                            connection.stop(asyncAbort);
                        }));
                        if (isFirefox11OrGreater) {
                            // Firefox does not fire cross-domain XHRs in the normal unload handler on tab close.
                            // #2400
                            _pageWindow.bind("beforeunload", (/**
                             * @return {?}
                             */
                            function () {
                                // If connection.stop() runs runs in beforeunload and fails, it will also fail
                                // in unload unless connection.stop() runs after a timeout.
                                window.setTimeout((/**
                                 * @return {?}
                                 */
                                function () {
                                    connection.stop(asyncAbort);
                                }), 0);
                            }));
                        }
                    }), onFallback);
                }
                catch (error) {
                    connection.log(transport.name + " transport threw '" + error.message + "' when attempting to start.");
                    onFallback();
                }
            });
            /** @type {?} */
            var url = connection.url + "/negotiate";
            /** @type {?} */
            var onFailed = (/**
             * @param {?} error
             * @param {?} connection
             * @return {?}
             */
            function (error, connection) {
                /** @type {?} */
                var err = signalR._.error(resources.errorOnNegotiate, error, connection._.negotiateRequest);
                $(connection).triggerHandler(events.onError, err);
                deferred.reject(err);
                // Stop the connection if negotiate failed
                connection.stop();
            });
            $(connection).triggerHandler(events.onStarting);
            url = signalR.transports._logic.prepareQueryString(connection, url);
            connection.log("Negotiating with '" + url + "'.");
            // Save the ajax negotiate request object so we can abort it if stop is called while the request is in flight.
            connection._.negotiateRequest = signalR.transports._logic.ajax(connection, {
                url: url,
                error: (/**
                 * @param {?} error
                 * @param {?} statusText
                 * @return {?}
                 */
                function (error, statusText) {
                    // We don't want to cause any errors if we're aborting our own negotiate request.
                    if (statusText !== _negotiateAbortText) {
                        onFailed(error, connection);
                    }
                    else {
                        // This rejection will noop if the deferred has already been resolved or rejected.
                        deferred.reject(signalR._.error(resources.stoppedWhileNegotiating, null /* error */, connection._.negotiateRequest));
                    }
                }),
                success: (/**
                 * @param {?} result
                 * @return {?}
                 */
                function (result) {
                    /** @type {?} */
                    var res;
                    /** @type {?} */
                    var keepAliveData;
                    /** @type {?} */
                    var protocolError;
                    /** @type {?} */
                    var transports = [];
                    /** @type {?} */
                    var supportedTransports = [];
                    try {
                        res = connection._parseResponse(result);
                    }
                    catch (error) {
                        onFailed(signalR._.error(resources.errorParsingNegotiateResponse, error), connection);
                        return;
                    }
                    keepAliveData = connection._.keepAliveData;
                    connection.appRelativeUrl = res.Url;
                    connection.id = res.ConnectionId;
                    connection.token = res.ConnectionToken;
                    connection.webSocketServerUrl = res.WebSocketServerUrl;
                    // The long poll timeout is the ConnectionTimeout plus 10 seconds
                    connection._.pollTimeout = res.ConnectionTimeout * 1000 + 10000; // in ms
                    // Once the server has labeled the PersistentConnection as Disconnected, we should stop attempting to reconnect
                    // after res.DisconnectTimeout seconds.
                    connection.disconnectTimeout = res.DisconnectTimeout * 1000; // in ms
                    // Add the TransportConnectTimeout from the response to the transportConnectTimeout from the client to calculate the total timeout
                    connection._.totalTransportConnectTimeout = connection.transportConnectTimeout + res.TransportConnectTimeout * 1000;
                    // If we have a keep alive
                    if (res.KeepAliveTimeout) {
                        // Register the keep alive data as activated
                        keepAliveData.activated = true;
                        // Timeout to designate when to force the connection into reconnecting converted to milliseconds
                        keepAliveData.timeout = res.KeepAliveTimeout * 1000;
                        // Timeout to designate when to warn the developer that the connection may be dead or is not responding.
                        keepAliveData.timeoutWarning = keepAliveData.timeout * connection.keepAliveWarnAt;
                        // Instantiate the frequency in which we check the keep alive.  It must be short in order to not miss/pick up any changes
                        connection._.beatInterval = (keepAliveData.timeout - keepAliveData.timeoutWarning) / 3;
                    }
                    else {
                        keepAliveData.activated = false;
                    }
                    connection.reconnectWindow = connection.disconnectTimeout + (keepAliveData.timeout || 0);
                    if (!res.ProtocolVersion || res.ProtocolVersion !== connection.clientProtocol) {
                        protocolError = signalR._.error(signalR._.format(resources.protocolIncompatible, connection.clientProtocol, res.ProtocolVersion));
                        $(connection).triggerHandler(events.onError, [protocolError]);
                        deferred.reject(protocolError);
                        return;
                    }
                    $.each(signalR.transports, (/**
                     * @param {?} key
                     * @return {?}
                     */
                    function (key) {
                        if ((key.indexOf("_") === 0) || (key === "webSockets" && !res.TryWebSockets)) {
                            return true;
                        }
                        supportedTransports.push(key);
                    }));
                    if ($.isArray(config.transport)) {
                        $.each(config.transport, (/**
                         * @param {?} _
                         * @param {?} transport
                         * @return {?}
                         */
                        function (_, transport) {
                            if ($.inArray(transport, supportedTransports) >= 0) {
                                transports.push(transport);
                            }
                        }));
                    }
                    else if (config.transport === "auto") {
                        transports = supportedTransports;
                    }
                    else if ($.inArray(config.transport, supportedTransports) >= 0) {
                        transports.push(config.transport);
                    }
                    initialize(transports);
                })
            });
            return deferred.promise();
        }),
        starting: (/**
         * @param {?} callback
         * @return {?}
         */
        function (callback) {
            /// <summary>Adds a callback that will be invoked before anything is sent over the connection</summary>
            /// <param name="callback" type="Function">A callback function to execute before the connection is fully instantiated.</param>
            /// <returns type="signalR" />
            /** @type {?} */
            var connection = this;
            $(connection).bind(events.onStarting, (/**
             * @param {?} e
             * @param {?} data
             * @return {?}
             */
            function (e, data) {
                callback.call(connection);
            }));
            return connection;
        }),
        send: (/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            /// <summary>Sends data over the connection</summary>
            /// <param name="data" type="String">The data to send over the connection</param>
            /// <returns type="signalR" />
            /** @type {?} */
            var connection = this;
            if (connection.state === signalR.connectionState.disconnected) {
                // Connection hasn't been started yet
                throw new Error("SignalR: Connection must be started before data can be sent. Call .start() before .send()");
            }
            if (connection.state === signalR.connectionState.connecting) {
                // Connection hasn't been started yet
                throw new Error("SignalR: Connection has not been fully initialized. Use .start().done() or .start().fail() to run logic after the connection has started.");
            }
            connection.transport.send(connection, data);
            // REVIEW: Should we return deferred here?
            return connection;
        }),
        received: (/**
         * @param {?} callback
         * @return {?}
         */
        function (callback) {
            /// <summary>Adds a callback that will be invoked after anything is received over the connection</summary>
            /// <param name="callback" type="Function">A callback function to execute when any data is received on the connection</param>
            /// <returns type="signalR" />
            /** @type {?} */
            var connection = this;
            $(connection).bind(events.onReceived, (/**
             * @param {?} e
             * @param {?} data
             * @return {?}
             */
            function (e, data) {
                callback.call(connection, data);
            }));
            return connection;
        }),
        stateChanged: (/**
         * @param {?} callback
         * @return {?}
         */
        function (callback) {
            /// <summary>Adds a callback that will be invoked when the connection state changes</summary>
            /// <param name="callback" type="Function">A callback function to execute when the connection state changes</param>
            /// <returns type="signalR" />
            /** @type {?} */
            var connection = this;
            $(connection).bind(events.onStateChanged, (/**
             * @param {?} e
             * @param {?} data
             * @return {?}
             */
            function (e, data) {
                callback.call(connection, data);
            }));
            return connection;
        }),
        error: (/**
         * @param {?} callback
         * @return {?}
         */
        function (callback) {
            /// <summary>Adds a callback that will be invoked after an error occurs with the connection</summary>
            /// <param name="callback" type="Function">A callback function to execute when an error occurs on the connection</param>
            /// <returns type="signalR" />
            /** @type {?} */
            var connection = this;
            $(connection).bind(events.onError, (/**
             * @param {?} e
             * @param {?} errorData
             * @param {?} sendData
             * @return {?}
             */
            function (e, errorData, sendData) {
                connection.lastError = errorData;
                // In practice 'errorData' is the SignalR built error object.
                // In practice 'sendData' is undefined for all error events except those triggered by
                // 'ajaxSend' and 'webSockets.send'.'sendData' is the original send payload.
                callback.call(connection, errorData, sendData);
            }));
            return connection;
        }),
        disconnected: (/**
         * @param {?} callback
         * @return {?}
         */
        function (callback) {
            /// <summary>Adds a callback that will be invoked when the client disconnects</summary>
            /// <param name="callback" type="Function">A callback function to execute when the connection is broken</param>
            /// <returns type="signalR" />
            /** @type {?} */
            var connection = this;
            $(connection).bind(events.onDisconnect, (/**
             * @param {?} e
             * @param {?} data
             * @return {?}
             */
            function (e, data) {
                callback.call(connection);
            }));
            return connection;
        }),
        connectionSlow: (/**
         * @param {?} callback
         * @return {?}
         */
        function (callback) {
            /// <summary>Adds a callback that will be invoked when the client detects a slow connection</summary>
            /// <param name="callback" type="Function">A callback function to execute when the connection is slow</param>
            /// <returns type="signalR" />
            /** @type {?} */
            var connection = this;
            $(connection).bind(events.onConnectionSlow, (/**
             * @param {?} e
             * @param {?} data
             * @return {?}
             */
            function (e, data) {
                callback.call(connection);
            }));
            return connection;
        }),
        reconnecting: (/**
         * @param {?} callback
         * @return {?}
         */
        function (callback) {
            /// <summary>Adds a callback that will be invoked when the underlying transport begins reconnecting</summary>
            /// <param name="callback" type="Function">A callback function to execute when the connection enters a reconnecting state</param>
            /// <returns type="signalR" />
            /** @type {?} */
            var connection = this;
            $(connection).bind(events.onReconnecting, (/**
             * @param {?} e
             * @param {?} data
             * @return {?}
             */
            function (e, data) {
                callback.call(connection);
            }));
            return connection;
        }),
        reconnected: (/**
         * @param {?} callback
         * @return {?}
         */
        function (callback) {
            /// <summary>Adds a callback that will be invoked when the underlying transport reconnects</summary>
            /// <param name="callback" type="Function">A callback function to execute when the connection is restored</param>
            /// <returns type="signalR" />
            /** @type {?} */
            var connection = this;
            $(connection).bind(events.onReconnect, (/**
             * @param {?} e
             * @param {?} data
             * @return {?}
             */
            function (e, data) {
                callback.call(connection);
            }));
            return connection;
        }),
        stop: (/**
         * @param {?} async
         * @param {?} notifyServer
         * @return {?}
         */
        function (async, notifyServer) {
            /// <summary>Stops listening</summary>
            /// <param name="async" type="Boolean">Whether or not to asynchronously abort the connection</param>
            /// <param name="notifyServer" type="Boolean">Whether we want to notify the server that we are aborting the connection</param>
            /// <returns type="signalR" />
            /** @type {?} */
            var connection = this;
            /** @type {?} */
            var 
            // Save deferral because this is always cleaned up
            deferral = connection._deferral;
            // Verify that we've bound a load event.
            if (connection._.deferredStartHandler) {
                // Unbind the event.
                _pageWindow.unbind("load", connection._.deferredStartHandler);
            }
            // Always clean up private non-timeout based state.
            delete connection._.config;
            delete connection._.deferredStartHandler;
            // This needs to be checked despite the connection state because a connection start can be deferred until page load.
            // If we've deferred the start due to a page load we need to unbind the "onLoad" -> start event.
            if (!_pageLoaded && (!connection._.config || connection._.config.waitForPageLoad === true)) {
                connection.log("Stopping connection prior to negotiate.");
                // If we have a deferral we should reject it
                if (deferral) {
                    deferral.reject(signalR._.error(resources.stoppedWhileLoading));
                }
                // Short-circuit because the start has not been fully started.
                return;
            }
            if (connection.state === signalR.connectionState.disconnected) {
                return;
            }
            connection.log("Stopping connection.");
            // Clear this no matter what
            window.clearTimeout(connection._.beatHandle);
            window.clearInterval(connection._.pingIntervalId);
            if (connection.transport) {
                connection.transport.stop(connection);
                if (notifyServer !== false) {
                    connection.transport.abort(connection, async);
                }
                if (supportsKeepAlive(connection)) {
                    signalR.transports._logic.stopMonitoringKeepAlive(connection);
                }
                connection.transport = null;
            }
            if (connection._.negotiateRequest) {
                // If the negotiation request has already completed this will noop.
                connection._.negotiateRequest.abort(_negotiateAbortText);
                delete connection._.negotiateRequest;
            }
            // Ensure that initHandler.stop() is called before connection._deferral is deleted
            if (connection._.initHandler) {
                connection._.initHandler.stop();
            }
            delete connection._deferral;
            delete connection.messageId;
            delete connection.groupsToken;
            delete connection.id;
            delete connection._.pingIntervalId;
            delete connection._.lastMessageAt;
            delete connection._.lastActiveAt;
            // Clear out our message buffer
            connection._.connectingMessageBuffer.clear();
            // Trigger the disconnect event
            changeState(connection, connection.state, signalR.connectionState.disconnected);
            $(connection).triggerHandler(events.onDisconnect);
            return connection;
        }),
        log: (/**
         * @param {?} msg
         * @return {?}
         */
        function (msg) {
            log(msg, this.logging);
        })
    };
    signalR.fn.init.prototype = signalR.fn;
    signalR.noConflict = (/**
     * @return {?}
     */
    function () {
        /// <summary>Reinstates the original value of $.connection and returns the signalR object for manual assignment</summary>
        /// <returns type="signalR" />
        if ($.connection === signalR) {
            $.connection = _connection;
        }
        return signalR;
    });
    if ($.connection) {
        _connection = $.connection;
    }
    $.connection = $.signalR = signalR;
})(jQueryShim, window));
/* jquery.signalR.transports.common.js */
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
/*global window:false */
/// <reference path="jquery.signalR.core.js" />
((/**
 * @param {?} $
 * @param {?} window
 * @param {?} undefined
 * @return {?}
 */
function ($, window, undefined) {
    /** @type {?} */
    var signalR = $.signalR;
    /** @type {?} */
    var events = $.signalR.events;
    /** @type {?} */
    var changeState = $.signalR.changeState;
    /** @type {?} */
    var startAbortText = "__Start Aborted__";
    /** @type {?} */
    var transportLogic;
    signalR.transports = {};
    /**
     * @param {?} connection
     * @return {?}
     */
    function beat(connection) {
        if (connection._.keepAliveData.monitoring) {
            checkIfAlive(connection);
        }
        // Ensure that we successfully marked active before continuing the heartbeat.
        if (transportLogic.markActive(connection)) {
            connection._.beatHandle = window.setTimeout((/**
             * @return {?}
             */
            function () {
                beat(connection);
            }), connection._.beatInterval);
        }
    }
    /**
     * @param {?} connection
     * @return {?}
     */
    function checkIfAlive(connection) {
        /** @type {?} */
        var keepAliveData = connection._.keepAliveData;
        /** @type {?} */
        var timeElapsed;
        // Only check if we're connected
        if (connection.state === signalR.connectionState.connected) {
            timeElapsed = new Date().getTime() - connection._.lastMessageAt;
            // Check if the keep alive has completely timed out
            if (timeElapsed >= keepAliveData.timeout) {
                connection.log("Keep alive timed out.  Notifying transport that connection has been lost.");
                // Notify transport that the connection has been lost
                connection.transport.lostConnection(connection);
            }
            else if (timeElapsed >= keepAliveData.timeoutWarning) {
                // This is to assure that the user only gets a single warning
                if (!keepAliveData.userNotified) {
                    connection.log("Keep alive has been missed, connection may be dead/slow.");
                    $(connection).triggerHandler(events.onConnectionSlow);
                    keepAliveData.userNotified = true;
                }
            }
            else {
                keepAliveData.userNotified = false;
            }
        }
    }
    /**
     * @param {?} connection
     * @param {?} path
     * @return {?}
     */
    function getAjaxUrl(connection, path) {
        /** @type {?} */
        var url = connection.url + path;
        if (connection.transport) {
            url += "?transport=" + connection.transport.name;
        }
        return transportLogic.prepareQueryString(connection, url);
    }
    /**
     * @param {?} connection
     * @return {?}
     */
    function InitHandler(connection) {
        this.connection = connection;
        this.startRequested = false;
        this.startCompleted = false;
        this.connectionStopped = false;
    }
    InitHandler.prototype = {
        start: (/**
         * @param {?} transport
         * @param {?} onSuccess
         * @param {?} onFallback
         * @return {?}
         */
        function (transport, onSuccess, onFallback) {
            /** @type {?} */
            var that = this;
            /** @type {?} */
            var connection = that.connection;
            /** @type {?} */
            var failCalled = false;
            if (that.startRequested || that.connectionStopped) {
                connection.log("WARNING! " + transport.name + " transport cannot be started. Initialization ongoing or completed.");
                return;
            }
            connection.log(transport.name + " transport starting.");
            transport.start(connection, (/**
             * @return {?}
             */
            function () {
                if (!failCalled) {
                    that.initReceived(transport, onSuccess);
                }
            }), (/**
             * @param {?} error
             * @return {?}
             */
            function (error) {
                // Don't allow the same transport to cause onFallback to be called twice
                if (!failCalled) {
                    failCalled = true;
                    that.transportFailed(transport, error, onFallback);
                }
                // Returns true if the transport should stop;
                // false if it should attempt to reconnect
                return !that.startCompleted || that.connectionStopped;
            }));
            that.transportTimeoutHandle = window.setTimeout((/**
             * @return {?}
             */
            function () {
                if (!failCalled) {
                    failCalled = true;
                    connection.log(transport.name + " transport timed out when trying to connect.");
                    that.transportFailed(transport, undefined, onFallback);
                }
            }), connection._.totalTransportConnectTimeout);
        }),
        stop: (/**
         * @return {?}
         */
        function () {
            this.connectionStopped = true;
            window.clearTimeout(this.transportTimeoutHandle);
            signalR.transports._logic.tryAbortStartRequest(this.connection);
        }),
        initReceived: (/**
         * @param {?} transport
         * @param {?} onSuccess
         * @return {?}
         */
        function (transport, onSuccess) {
            /** @type {?} */
            var that = this;
            /** @type {?} */
            var connection = that.connection;
            if (that.startRequested) {
                connection.log("WARNING! The client received multiple init messages.");
                return;
            }
            if (that.connectionStopped) {
                return;
            }
            that.startRequested = true;
            window.clearTimeout(that.transportTimeoutHandle);
            connection.log(transport.name + " transport connected. Initiating start request.");
            signalR.transports._logic.ajaxStart(connection, (/**
             * @return {?}
             */
            function () {
                that.startCompleted = true;
                onSuccess();
            }));
        }),
        transportFailed: (/**
         * @param {?} transport
         * @param {?} error
         * @param {?} onFallback
         * @return {?}
         */
        function (transport, error, onFallback) {
            /** @type {?} */
            var connection = this.connection;
            /** @type {?} */
            var deferred = connection._deferral;
            /** @type {?} */
            var wrappedError;
            if (this.connectionStopped) {
                return;
            }
            window.clearTimeout(this.transportTimeoutHandle);
            if (!this.startRequested) {
                transport.stop(connection);
                connection.log(transport.name + " transport failed to connect. Attempting to fall back.");
                onFallback();
            }
            else if (!this.startCompleted) {
                // Do not attempt to fall back if a start request is ongoing during a transport failure.
                // Instead, trigger an error and stop the connection.
                wrappedError = signalR._.error(signalR.resources.errorDuringStartRequest, error);
                connection.log(transport.name + " transport failed during the start request. Stopping the connection.");
                $(connection).triggerHandler(events.onError, [wrappedError]);
                if (deferred) {
                    deferred.reject(wrappedError);
                }
                connection.stop();
            }
            else {
                // The start request has completed, but the connection has not stopped.
                // No need to do anything here. The transport should attempt its normal reconnect logic.
            }
        })
    };
    transportLogic = signalR.transports._logic = {
        ajax: (/**
         * @param {?} connection
         * @param {?} options
         * @return {?}
         */
        function (connection, options) {
            return $.ajax($.extend(/*deep copy*/ true, {}, $.signalR.ajaxDefaults, {
                type: "GET",
                data: {},
                xhrFields: { withCredentials: connection.withCredentials },
                contentType: connection.contentType,
                dataType: connection.ajaxDataType
            }, options));
        }),
        pingServer: (/**
         * @param {?} connection
         * @return {?}
         */
        function (connection) {
            /// <summary>Pings the server</summary>
            /// <param name="connection" type="signalr">Connection associated with the server ping</param>
            /// <returns type="signalR" />
            /** @type {?} */
            var url;
            /** @type {?} */
            var xhr;
            /** @type {?} */
            var deferral = $.Deferred();
            if (connection.transport) {
                url = connection.url + "/ping";
                url = transportLogic.addQs(url, connection.qs);
                xhr = transportLogic.ajax(connection, {
                    url: url,
                    success: (/**
                     * @param {?} result
                     * @return {?}
                     */
                    function (result) {
                        /** @type {?} */
                        var data;
                        try {
                            data = connection._parseResponse(result);
                        }
                        catch (error) {
                            deferral.reject(signalR._.transportError(signalR.resources.pingServerFailedParse, connection.transport, error, xhr));
                            connection.stop();
                            return;
                        }
                        if (data.Response === "pong") {
                            deferral.resolve();
                        }
                        else {
                            deferral.reject(signalR._.transportError(signalR._.format(signalR.resources.pingServerFailedInvalidResponse, result), connection.transport, null /* error */, xhr));
                        }
                    }),
                    error: (/**
                     * @param {?} error
                     * @return {?}
                     */
                    function (error) {
                        if (error.status === 401 || error.status === 403) {
                            deferral.reject(signalR._.transportError(signalR._.format(signalR.resources.pingServerFailedStatusCode, error.status), connection.transport, error, xhr));
                            connection.stop();
                        }
                        else {
                            deferral.reject(signalR._.transportError(signalR.resources.pingServerFailed, connection.transport, error, xhr));
                        }
                    })
                });
            }
            else {
                deferral.reject(signalR._.transportError(signalR.resources.noConnectionTransport, connection.transport));
            }
            return deferral.promise();
        }),
        prepareQueryString: (/**
         * @param {?} connection
         * @param {?} url
         * @return {?}
         */
        function (connection, url) {
            /** @type {?} */
            var preparedUrl;
            // Use addQs to start since it handles the ?/& prefix for us
            preparedUrl = transportLogic.addQs(url, "clientProtocol=" + connection.clientProtocol);
            // Add the user-specified query string params if any
            preparedUrl = transportLogic.addQs(preparedUrl, connection.qs);
            if (connection.token) {
                preparedUrl += "&connectionToken=" + encodeURIComponent(connection.token);
            }
            if (connection.data) {
                preparedUrl += "&connectionData=" + encodeURIComponent(connection.data);
            }
            return preparedUrl;
        }),
        addQs: (/**
         * @param {?} url
         * @param {?} qs
         * @return {?}
         */
        function (url, qs) {
            /** @type {?} */
            var appender = url.indexOf("?") !== -1 ? "&" : "?";
            /** @type {?} */
            var firstChar;
            if (!qs) {
                return url;
            }
            if (typeof (qs) === "object") {
                return url + appender + $.param(qs);
            }
            if (typeof (qs) === "string") {
                firstChar = qs.charAt(0);
                if (firstChar === "?" || firstChar === "&") {
                    appender = "";
                }
                return url + appender + qs;
            }
            throw new Error("Query string property must be either a string or object.");
        }),
        // BUG #2953: The url needs to be same otherwise it will cause a memory leak
        getUrl: (/**
         * @param {?} connection
         * @param {?} transport
         * @param {?} reconnecting
         * @param {?} poll
         * @param {?} ajaxPost
         * @return {?}
         */
        function (connection, transport, reconnecting, poll, ajaxPost) {
            /// <summary>Gets the url for making a GET based connect request</summary>
            /** @type {?} */
            var baseUrl = transport === "webSockets" ? "" : connection.baseUrl;
            /** @type {?} */
            var url = baseUrl + connection.appRelativeUrl;
            /** @type {?} */
            var qs = "transport=" + transport;
            if (!ajaxPost && connection.groupsToken) {
                qs += "&groupsToken=" + encodeURIComponent(connection.groupsToken);
            }
            if (!reconnecting) {
                url += "/connect";
            }
            else {
                if (poll) {
                    // longPolling transport specific
                    url += "/poll";
                }
                else {
                    url += "/reconnect";
                }
                if (!ajaxPost && connection.messageId) {
                    qs += "&messageId=" + encodeURIComponent(connection.messageId);
                }
            }
            url += "?" + qs;
            url = transportLogic.prepareQueryString(connection, url);
            if (!ajaxPost) {
                url += "&tid=" + Math.floor(Math.random() * 11);
            }
            return url;
        }),
        maximizePersistentResponse: (/**
         * @param {?} minPersistentResponse
         * @return {?}
         */
        function (minPersistentResponse) {
            return {
                MessageId: minPersistentResponse.C,
                Messages: minPersistentResponse.M,
                Initialized: typeof (minPersistentResponse.S) !== "undefined" ? true : false,
                ShouldReconnect: typeof (minPersistentResponse.T) !== "undefined" ? true : false,
                LongPollDelay: minPersistentResponse.L,
                GroupsToken: minPersistentResponse.G
            };
        }),
        updateGroups: (/**
         * @param {?} connection
         * @param {?} groupsToken
         * @return {?}
         */
        function (connection, groupsToken) {
            if (groupsToken) {
                connection.groupsToken = groupsToken;
            }
        }),
        stringifySend: (/**
         * @param {?} connection
         * @param {?} message
         * @return {?}
         */
        function (connection, message) {
            if (typeof (message) === "string" || typeof (message) === "undefined" || message === null) {
                return message;
            }
            return connection.json.stringify(message);
        }),
        ajaxSend: (/**
         * @param {?} connection
         * @param {?} data
         * @return {?}
         */
        function (connection, data) {
            /** @type {?} */
            var payload = transportLogic.stringifySend(connection, data);
            /** @type {?} */
            var url = getAjaxUrl(connection, "/send");
            /** @type {?} */
            var xhr;
            /** @type {?} */
            var onFail = (/**
             * @param {?} error
             * @param {?} connection
             * @return {?}
             */
            function (error, connection) {
                $(connection).triggerHandler(events.onError, [signalR._.transportError(signalR.resources.sendFailed, connection.transport, error, xhr), data]);
            });
            xhr = transportLogic.ajax(connection, {
                url: url,
                type: connection.ajaxDataType === "jsonp" ? "GET" : "POST",
                contentType: signalR._.defaultContentType,
                data: {
                    data: payload
                },
                success: (/**
                 * @param {?} result
                 * @return {?}
                 */
                function (result) {
                    /** @type {?} */
                    var res;
                    if (result) {
                        try {
                            res = connection._parseResponse(result);
                        }
                        catch (error) {
                            onFail(error, connection);
                            connection.stop();
                            return;
                        }
                        transportLogic.triggerReceived(connection, res);
                    }
                }),
                error: (/**
                 * @param {?} error
                 * @param {?} textStatus
                 * @return {?}
                 */
                function (error, textStatus) {
                    if (textStatus === "abort" || textStatus === "parsererror") {
                        // The parsererror happens for sends that don't return any data, and hence
                        // don't write the jsonp callback to the response. This is harder to fix on the server
                        // so just hack around it on the client for now.
                        return;
                    }
                    onFail(error, connection);
                })
            });
            return xhr;
        }),
        ajaxAbort: (/**
         * @param {?} connection
         * @param {?} async
         * @return {?}
         */
        function (connection, async) {
            if (typeof (connection.transport) === "undefined") {
                return;
            }
            // Async by default unless explicitly overidden
            async = typeof async === "undefined" ? true : async;
            /** @type {?} */
            var url = getAjaxUrl(connection, "/abort");
            transportLogic.ajax(connection, {
                url: url,
                async: async,
                timeout: 1000,
                type: "POST"
            });
            connection.log("Fired ajax abort async = " + async + ".");
        }),
        ajaxStart: (/**
         * @param {?} connection
         * @param {?} onSuccess
         * @return {?}
         */
        function (connection, onSuccess) {
            /** @type {?} */
            var rejectDeferred = (/**
             * @param {?} error
             * @return {?}
             */
            function (error) {
                /** @type {?} */
                var deferred = connection._deferral;
                if (deferred) {
                    deferred.reject(error);
                }
            });
            /** @type {?} */
            var triggerStartError = (/**
             * @param {?} error
             * @return {?}
             */
            function (error) {
                connection.log("The start request failed. Stopping the connection.");
                $(connection).triggerHandler(events.onError, [error]);
                rejectDeferred(error);
                connection.stop();
            });
            connection._.startRequest = transportLogic.ajax(connection, {
                url: getAjaxUrl(connection, "/start"),
                success: (/**
                 * @param {?} result
                 * @param {?} statusText
                 * @param {?} xhr
                 * @return {?}
                 */
                function (result, statusText, xhr) {
                    /** @type {?} */
                    var data;
                    try {
                        data = connection._parseResponse(result);
                    }
                    catch (error) {
                        triggerStartError(signalR._.error(signalR._.format(signalR.resources.errorParsingStartResponse, result), error, xhr));
                        return;
                    }
                    if (data.Response === "started") {
                        onSuccess();
                    }
                    else {
                        triggerStartError(signalR._.error(signalR._.format(signalR.resources.invalidStartResponse, result), null /* error */, xhr));
                    }
                }),
                error: (/**
                 * @param {?} xhr
                 * @param {?} statusText
                 * @param {?} error
                 * @return {?}
                 */
                function (xhr, statusText, error) {
                    if (statusText !== startAbortText) {
                        triggerStartError(signalR._.error(signalR.resources.errorDuringStartRequest, error, xhr));
                    }
                    else {
                        // Stop has been called, no need to trigger the error handler
                        // or stop the connection again with onStartError
                        connection.log("The start request aborted because connection.stop() was called.");
                        rejectDeferred(signalR._.error(signalR.resources.stoppedDuringStartRequest, null /* error */, xhr));
                    }
                })
            });
        }),
        tryAbortStartRequest: (/**
         * @param {?} connection
         * @return {?}
         */
        function (connection) {
            if (connection._.startRequest) {
                // If the start request has already completed this will noop.
                connection._.startRequest.abort(startAbortText);
                delete connection._.startRequest;
            }
        }),
        tryInitialize: (/**
         * @param {?} connection
         * @param {?} persistentResponse
         * @param {?} onInitialized
         * @return {?}
         */
        function (connection, persistentResponse, onInitialized) {
            if (persistentResponse.Initialized && onInitialized) {
                onInitialized();
            }
            else if (persistentResponse.Initialized) {
                connection.log("WARNING! The client received an init message after reconnecting.");
            }
        }),
        triggerReceived: (/**
         * @param {?} connection
         * @param {?} data
         * @return {?}
         */
        function (connection, data) {
            if (!connection._.connectingMessageBuffer.tryBuffer(data)) {
                $(connection).triggerHandler(events.onReceived, [data]);
            }
        }),
        processMessages: (/**
         * @param {?} connection
         * @param {?} minData
         * @param {?} onInitialized
         * @return {?}
         */
        function (connection, minData, onInitialized) {
            /** @type {?} */
            var data;
            // Update the last message time stamp
            transportLogic.markLastMessage(connection);
            if (minData) {
                data = transportLogic.maximizePersistentResponse(minData);
                transportLogic.updateGroups(connection, data.GroupsToken);
                if (data.MessageId) {
                    connection.messageId = data.MessageId;
                }
                if (data.Messages) {
                    $.each(data.Messages, (/**
                     * @param {?} index
                     * @param {?} message
                     * @return {?}
                     */
                    function (index, message) {
                        transportLogic.triggerReceived(connection, message);
                    }));
                    transportLogic.tryInitialize(connection, data, onInitialized);
                }
            }
        }),
        monitorKeepAlive: (/**
         * @param {?} connection
         * @return {?}
         */
        function (connection) {
            /** @type {?} */
            var keepAliveData = connection._.keepAliveData;
            // If we haven't initiated the keep alive timeouts then we need to
            if (!keepAliveData.monitoring) {
                keepAliveData.monitoring = true;
                transportLogic.markLastMessage(connection);
                // Save the function so we can unbind it on stop
                connection._.keepAliveData.reconnectKeepAliveUpdate = (/**
                 * @return {?}
                 */
                function () {
                    // Mark a new message so that keep alive doesn't time out connections
                    transportLogic.markLastMessage(connection);
                });
                // Update Keep alive on reconnect
                $(connection).bind(events.onReconnect, connection._.keepAliveData.reconnectKeepAliveUpdate);
                connection.log("Now monitoring keep alive with a warning timeout of " + keepAliveData.timeoutWarning + ", keep alive timeout of " + keepAliveData.timeout + " and disconnecting timeout of " + connection.disconnectTimeout);
            }
            else {
                connection.log("Tried to monitor keep alive but it's already being monitored.");
            }
        }),
        stopMonitoringKeepAlive: (/**
         * @param {?} connection
         * @return {?}
         */
        function (connection) {
            /** @type {?} */
            var keepAliveData = connection._.keepAliveData;
            // Only attempt to stop the keep alive monitoring if its being monitored
            if (keepAliveData.monitoring) {
                // Stop monitoring
                keepAliveData.monitoring = false;
                // Remove the updateKeepAlive function from the reconnect event
                $(connection).unbind(events.onReconnect, connection._.keepAliveData.reconnectKeepAliveUpdate);
                // Clear all the keep alive data
                connection._.keepAliveData = {};
                connection.log("Stopping the monitoring of the keep alive.");
            }
        }),
        startHeartbeat: (/**
         * @param {?} connection
         * @return {?}
         */
        function (connection) {
            connection._.lastActiveAt = new Date().getTime();
            beat(connection);
        }),
        markLastMessage: (/**
         * @param {?} connection
         * @return {?}
         */
        function (connection) {
            connection._.lastMessageAt = new Date().getTime();
        }),
        markActive: (/**
         * @param {?} connection
         * @return {?}
         */
        function (connection) {
            if (transportLogic.verifyLastActive(connection)) {
                connection._.lastActiveAt = new Date().getTime();
                return true;
            }
            return false;
        }),
        isConnectedOrReconnecting: (/**
         * @param {?} connection
         * @return {?}
         */
        function (connection) {
            return connection.state === signalR.connectionState.connected ||
                connection.state === signalR.connectionState.reconnecting;
        }),
        ensureReconnectingState: (/**
         * @param {?} connection
         * @return {?}
         */
        function (connection) {
            if (changeState(connection, signalR.connectionState.connected, signalR.connectionState.reconnecting) === true) {
                $(connection).triggerHandler(events.onReconnecting);
            }
            return connection.state === signalR.connectionState.reconnecting;
        }),
        clearReconnectTimeout: (/**
         * @param {?} connection
         * @return {?}
         */
        function (connection) {
            if (connection && connection._.reconnectTimeout) {
                window.clearTimeout(connection._.reconnectTimeout);
                delete connection._.reconnectTimeout;
            }
        }),
        verifyLastActive: (/**
         * @param {?} connection
         * @return {?}
         */
        function (connection) {
            if (new Date().getTime() - connection._.lastActiveAt >= connection.reconnectWindow) {
                /** @type {?} */
                var message = signalR._.format(signalR.resources.reconnectWindowTimeout, new Date(connection._.lastActiveAt), connection.reconnectWindow);
                connection.log(message);
                $(connection).triggerHandler(events.onError, [signalR._.error(message, /* source */ "TimeoutException")]);
                connection.stop(/* async */ false, /* notifyServer */ false);
                return false;
            }
            return true;
        }),
        reconnect: (/**
         * @param {?} connection
         * @param {?} transportName
         * @return {?}
         */
        function (connection, transportName) {
            /** @type {?} */
            var transport = signalR.transports[transportName];
            // We should only set a reconnectTimeout if we are currently connected
            // and a reconnectTimeout isn't already set.
            if (transportLogic.isConnectedOrReconnecting(connection) && !connection._.reconnectTimeout) {
                // Need to verify before the setTimeout occurs because an application sleep could occur during the setTimeout duration.
                if (!transportLogic.verifyLastActive(connection)) {
                    return;
                }
                connection._.reconnectTimeout = window.setTimeout((/**
                 * @return {?}
                 */
                function () {
                    if (!transportLogic.verifyLastActive(connection)) {
                        return;
                    }
                    transport.stop(connection);
                    if (transportLogic.ensureReconnectingState(connection)) {
                        connection.log(transportName + " reconnecting.");
                        transport.start(connection);
                    }
                }), connection.reconnectDelay);
            }
        }),
        handleParseFailure: (/**
         * @param {?} connection
         * @param {?} result
         * @param {?} error
         * @param {?} onFailed
         * @param {?} context
         * @return {?}
         */
        function (connection, result, error, onFailed, context) {
            /** @type {?} */
            var wrappedError = signalR._.transportError(signalR._.format(signalR.resources.parseFailed, result), connection.transport, error, context);
            // If we're in the initialization phase trigger onFailed, otherwise stop the connection.
            if (onFailed && onFailed(wrappedError)) {
                connection.log("Failed to parse server response while attempting to connect.");
            }
            else {
                $(connection).triggerHandler(events.onError, [wrappedError]);
                connection.stop();
            }
        }),
        initHandler: (/**
         * @param {?} connection
         * @return {?}
         */
        function (connection) {
            return new InitHandler(connection);
        }),
        foreverFrame: {
            count: 0,
            connections: {}
        }
    };
})(jQueryShim, window));
/* jquery.signalR.transports.webSockets.js */
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
/*global window:false */
/// <reference path="jquery.signalR.transports.common.js" />
((/**
 * @param {?} $
 * @param {?} window
 * @param {?} undefined
 * @return {?}
 */
function ($, window, undefined) {
    /** @type {?} */
    var signalR = $.signalR;
    /** @type {?} */
    var events = $.signalR.events;
    /** @type {?} */
    var changeState = $.signalR.changeState;
    /** @type {?} */
    var transportLogic = signalR.transports._logic;
    signalR.transports.webSockets = {
        name: "webSockets",
        supportsKeepAlive: (/**
         * @return {?}
         */
        function () {
            return true;
        }),
        send: (/**
         * @param {?} connection
         * @param {?} data
         * @return {?}
         */
        function (connection, data) {
            /** @type {?} */
            var payload = transportLogic.stringifySend(connection, data);
            try {
                connection.socket.send(payload);
            }
            catch (ex) {
                $(connection).triggerHandler(events.onError, [signalR._.transportError(signalR.resources.webSocketsInvalidState, connection.transport, ex, connection.socket),
                    data]);
            }
        }),
        start: (/**
         * @param {?} connection
         * @param {?} onSuccess
         * @param {?} onFailed
         * @return {?}
         */
        function (connection, onSuccess, onFailed) {
            /** @type {?} */
            var url;
            /** @type {?} */
            var opened = false;
            /** @type {?} */
            var that = this;
            /** @type {?} */
            var reconnecting = !onSuccess;
            /** @type {?} */
            var $connection = $(connection);
            if (!((/** @type {?} */ (window))).WebSocket) {
                onFailed();
                return;
            }
            if (!connection.socket) {
                if (connection.webSocketServerUrl) {
                    url = connection.webSocketServerUrl;
                }
                else {
                    url = connection.wsProtocol + connection.host;
                }
                url += transportLogic.getUrl(connection, this.name, reconnecting);
                connection.log("Connecting to websocket endpoint '" + url + "'.");
                connection.socket = new WebSocket(url);
                connection.socket.onopen = (/**
                 * @return {?}
                 */
                function () {
                    opened = true;
                    connection.log("Websocket opened.");
                    transportLogic.clearReconnectTimeout(connection);
                    if (changeState(connection, signalR.connectionState.reconnecting, signalR.connectionState.connected) === true) {
                        $connection.triggerHandler(events.onReconnect);
                    }
                });
                connection.socket.onclose = (/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) {
                    /** @type {?} */
                    var error;
                    // Only handle a socket close if the close is from the current socket.
                    // Sometimes on disconnect the server will push down an onclose event
                    // to an expired socket.
                    if (this === connection.socket) {
                        if (opened && typeof event.wasClean !== "undefined" && event.wasClean === false) {
                            // Ideally this would use the websocket.onerror handler (rather than checking wasClean in onclose) but
                            // I found in some circumstances Chrome won't call onerror. This implementation seems to work on all browsers.
                            error = signalR._.transportError(signalR.resources.webSocketClosed, connection.transport, event);
                            connection.log("Unclean disconnect from websocket: " + (event.reason || "[no reason given]."));
                        }
                        else {
                            connection.log("Websocket closed.");
                        }
                        if (!onFailed || !onFailed(error)) {
                            if (error) {
                                $(connection).triggerHandler(events.onError, [error]);
                            }
                            that.reconnect(connection);
                        }
                    }
                });
                connection.socket.onmessage = (/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) {
                    /** @type {?} */
                    var data;
                    try {
                        data = connection._parseResponse(event.data);
                    }
                    catch (error) {
                        transportLogic.handleParseFailure(connection, event.data, error, onFailed, event);
                        return;
                    }
                    if (data) {
                        // data.M is PersistentResponse.Messages
                        if ($.isEmptyObject(data) || data.M) {
                            transportLogic.processMessages(connection, data, onSuccess);
                        }
                        else {
                            // For websockets we need to trigger onReceived
                            // for callbacks to outgoing hub calls.
                            transportLogic.triggerReceived(connection, data);
                        }
                    }
                });
            }
        }),
        reconnect: (/**
         * @param {?} connection
         * @return {?}
         */
        function (connection) {
            transportLogic.reconnect(connection, this.name);
        }),
        lostConnection: (/**
         * @param {?} connection
         * @return {?}
         */
        function (connection) {
            this.reconnect(connection);
        }),
        stop: (/**
         * @param {?} connection
         * @return {?}
         */
        function (connection) {
            // Don't trigger a reconnect after stopping
            transportLogic.clearReconnectTimeout(connection);
            if (connection.socket) {
                connection.log("Closing the Websocket.");
                connection.socket.close();
                connection.socket = null;
            }
        }),
        abort: (/**
         * @param {?} connection
         * @param {?} async
         * @return {?}
         */
        function (connection, async) {
            transportLogic.ajaxAbort(connection, async);
        })
    };
})(jQueryShim, window));
/* jquery.signalR.transports.serverSentEvents.js */
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
/*global window:false */
/// <reference path="jquery.signalR.transports.common.js" />
((/**
 * @param {?} $
 * @param {?} window
 * @param {?} undefined
 * @return {?}
 */
function ($, window, undefined) {
    /** @type {?} */
    var signalR = $.signalR;
    /** @type {?} */
    var events = $.signalR.events;
    /** @type {?} */
    var changeState = $.signalR.changeState;
    /** @type {?} */
    var transportLogic = signalR.transports._logic;
    /** @type {?} */
    var clearReconnectAttemptTimeout = (/**
     * @param {?} connection
     * @return {?}
     */
    function (connection) {
        window.clearTimeout(connection._.reconnectAttemptTimeoutHandle);
        delete connection._.reconnectAttemptTimeoutHandle;
    });
    signalR.transports.serverSentEvents = {
        name: "serverSentEvents",
        supportsKeepAlive: (/**
         * @return {?}
         */
        function () {
            return true;
        }),
        timeOut: 3000,
        start: (/**
         * @param {?} connection
         * @param {?} onSuccess
         * @param {?} onFailed
         * @return {?}
         */
        function (connection, onSuccess, onFailed) {
            /** @type {?} */
            var that = this;
            /** @type {?} */
            var opened = false;
            /** @type {?} */
            var $connection = $(connection);
            /** @type {?} */
            var reconnecting = !onSuccess;
            /** @type {?} */
            var url;
            if (connection.eventSource) {
                connection.log("The connection already has an event source. Stopping it.");
                connection.stop();
            }
            if (!((/** @type {?} */ (window))).EventSource) {
                if (onFailed) {
                    connection.log("This browser doesn't support SSE.");
                    onFailed();
                }
                return;
            }
            url = transportLogic.getUrl(connection, this.name, reconnecting);
            try {
                connection.log("Attempting to connect to SSE endpoint '" + url + "'.");
                connection.eventSource = new EventSource(url, { withCredentials: connection.withCredentials });
            }
            catch (e) {
                connection.log("EventSource failed trying to connect with error " + e.Message + ".");
                if (onFailed) {
                    // The connection failed, call the failed callback
                    onFailed();
                }
                else {
                    $connection.triggerHandler(events.onError, [signalR._.transportError(signalR.resources.eventSourceFailedToConnect, connection.transport, e)]);
                    if (reconnecting) {
                        // If we were reconnecting, rather than doing initial connect, then try reconnect again
                        that.reconnect(connection);
                    }
                }
                return;
            }
            if (reconnecting) {
                connection._.reconnectAttemptTimeoutHandle = window.setTimeout((/**
                 * @return {?}
                 */
                function () {
                    if (opened === false) {
                        // If we're reconnecting and the event source is attempting to connect,
                        // don't keep retrying. This causes duplicate connections to spawn.
                        if (connection.eventSource.readyState !== EventSource.OPEN) {
                            // If we were reconnecting, rather than doing initial connect, then try reconnect again
                            that.reconnect(connection);
                        }
                    }
                }), that.timeOut);
            }
            connection.eventSource.addEventListener("open", (/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                connection.log("EventSource connected.");
                clearReconnectAttemptTimeout(connection);
                transportLogic.clearReconnectTimeout(connection);
                if (opened === false) {
                    opened = true;
                    if (changeState(connection, signalR.connectionState.reconnecting, signalR.connectionState.connected) === true) {
                        $connection.triggerHandler(events.onReconnect);
                    }
                }
            }), false);
            connection.eventSource.addEventListener("message", (/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                /** @type {?} */
                var res;
                // process messages
                if (e.data === "initialized") {
                    return;
                }
                try {
                    res = connection._parseResponse(e.data);
                }
                catch (error) {
                    transportLogic.handleParseFailure(connection, e.data, error, onFailed, e);
                    return;
                }
                transportLogic.processMessages(connection, res, onSuccess);
            }), false);
            connection.eventSource.addEventListener("error", (/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                /** @type {?} */
                var error = signalR._.transportError(signalR.resources.eventSourceError, connection.transport, e);
                // Only handle an error if the error is from the current Event Source.
                // Sometimes on disconnect the server will push down an error event
                // to an expired Event Source.
                if (this !== connection.eventSource) {
                    return;
                }
                if (onFailed && onFailed(error)) {
                    return;
                }
                connection.log("EventSource readyState: " + connection.eventSource.readyState + ".");
                if (e.eventPhase === EventSource.CLOSED) {
                    // We don't use the EventSource's native reconnect function as it
                    // doesn't allow us to change the URL when reconnecting. We need
                    // to change the URL to not include the /connect suffix, and pass
                    // the last message id we received.
                    connection.log("EventSource reconnecting due to the server connection ending.");
                    that.reconnect(connection);
                }
                else {
                    // connection error
                    connection.log("EventSource error.");
                    $connection.triggerHandler(events.onError, [error]);
                }
            }), false);
        }),
        reconnect: (/**
         * @param {?} connection
         * @return {?}
         */
        function (connection) {
            transportLogic.reconnect(connection, this.name);
        }),
        lostConnection: (/**
         * @param {?} connection
         * @return {?}
         */
        function (connection) {
            this.reconnect(connection);
        }),
        send: (/**
         * @param {?} connection
         * @param {?} data
         * @return {?}
         */
        function (connection, data) {
            transportLogic.ajaxSend(connection, data);
        }),
        stop: (/**
         * @param {?} connection
         * @return {?}
         */
        function (connection) {
            // Don't trigger a reconnect after stopping
            clearReconnectAttemptTimeout(connection);
            transportLogic.clearReconnectTimeout(connection);
            if (connection && connection.eventSource) {
                connection.log("EventSource calling close().");
                connection.eventSource.close();
                connection.eventSource = null;
                delete connection.eventSource;
            }
        }),
        abort: (/**
         * @param {?} connection
         * @param {?} async
         * @return {?}
         */
        function (connection, async) {
            transportLogic.ajaxAbort(connection, async);
        })
    };
})(jQueryShim, window));
/* jquery.signalR.transports.foreverFrame.js */
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
/*global window:false */
/// <reference path="jquery.signalR.transports.common.js" />
((/**
 * @param {?} $
 * @param {?} window
 * @param {?} undefined
 * @return {?}
 */
function ($, window, undefined) {
    /** @type {?} */
    var signalR = $.signalR;
    /** @type {?} */
    var events = $.signalR.events;
    /** @type {?} */
    var changeState = $.signalR.changeState;
    /** @type {?} */
    var transportLogic = signalR.transports._logic;
    /** @type {?} */
    var createFrame = (/**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var frame = window.document.createElement("iframe");
        frame.setAttribute("style", "position:absolute;top:0;left:0;width:0;height:0;visibility:hidden;");
        return frame;
    });
    /** @type {?} */
    var 
    // Used to prevent infinite loading icon spins in older versions of ie
    // We build this object inside a closure so we don't pollute the rest of
    // the foreverFrame transport with unnecessary functions/utilities.
    loadPreventer = ((/**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var loadingFixIntervalId = null;
        /** @type {?} */
        var loadingFixInterval = 1000;
        /** @type {?} */
        var attachedTo = 0;
        return {
            prevent: (/**
             * @return {?}
             */
            function () {
                // Prevent additional iframe removal procedures from newer browsers
                if (signalR._.ieVersion <= 8) {
                    // We only ever want to set the interval one time, so on the first attachedTo
                    if (attachedTo === 0) {
                        // Create and destroy iframe every 3 seconds to prevent loading icon, super hacky
                        loadingFixIntervalId = window.setInterval((/**
                         * @return {?}
                         */
                        function () {
                            /** @type {?} */
                            var tempFrame = createFrame();
                            window.document.body.appendChild(tempFrame);
                            window.document.body.removeChild(tempFrame);
                            tempFrame = null;
                        }), loadingFixInterval);
                    }
                    attachedTo++;
                }
            }),
            cancel: (/**
             * @return {?}
             */
            function () {
                // Only clear the interval if there's only one more object that the loadPreventer is attachedTo
                if (attachedTo === 1) {
                    window.clearInterval(loadingFixIntervalId);
                }
                if (attachedTo > 0) {
                    attachedTo--;
                }
            })
        };
    }))();
    signalR.transports.foreverFrame = {
        name: "foreverFrame",
        supportsKeepAlive: (/**
         * @return {?}
         */
        function () {
            return true;
        }),
        // Added as a value here so we can create tests to verify functionality
        iframeClearThreshold: 50,
        start: (/**
         * @param {?} connection
         * @param {?} onSuccess
         * @param {?} onFailed
         * @return {?}
         */
        function (connection, onSuccess, onFailed) {
            /** @type {?} */
            var that = this;
            /** @type {?} */
            var frameId = (transportLogic.foreverFrame.count += 1);
            /** @type {?} */
            var url;
            /** @type {?} */
            var frame = createFrame();
            /** @type {?} */
            var frameLoadHandler = (/**
             * @return {?}
             */
            function () {
                connection.log("Forever frame iframe finished loading and is no longer receiving messages.");
                if (!onFailed || !onFailed()) {
                    that.reconnect(connection);
                }
            });
            if (((/** @type {?} */ (window))).EventSource) {
                // If the browser supports SSE, don't use Forever Frame
                if (onFailed) {
                    connection.log("Forever Frame is not supported by SignalR on browsers with SSE support.");
                    onFailed();
                }
                return;
            }
            frame.setAttribute("data-signalr-connection-id", connection.id);
            // Start preventing loading icon
            // This will only perform work if the loadPreventer is not attached to another connection.
            loadPreventer.prevent();
            // Build the url
            url = transportLogic.getUrl(connection, this.name);
            url += "&frameId=" + frameId;
            // add frame to the document prior to setting URL to avoid caching issues.
            window.document.documentElement.appendChild(frame);
            connection.log("Binding to iframe's load event.");
            if (frame.addEventListener) {
                frame.addEventListener("load", frameLoadHandler, false);
            }
            frame.src = url;
            transportLogic.foreverFrame.connections[frameId] = connection;
            connection.frame = frame;
            connection.frameId = frameId;
            if (onSuccess) {
                connection.onSuccess = (/**
                 * @return {?}
                 */
                function () {
                    connection.log("Iframe transport started.");
                    onSuccess();
                });
            }
        }),
        reconnect: (/**
         * @param {?} connection
         * @return {?}
         */
        function (connection) {
            /** @type {?} */
            var that = this;
            // Need to verify connection state and verify before the setTimeout occurs because an application sleep could occur during the setTimeout duration.
            if (transportLogic.isConnectedOrReconnecting(connection) && transportLogic.verifyLastActive(connection)) {
                window.setTimeout((/**
                 * @return {?}
                 */
                function () {
                    // Verify that we're ok to reconnect.
                    if (!transportLogic.verifyLastActive(connection)) {
                        return;
                    }
                    if (connection.frame && transportLogic.ensureReconnectingState(connection)) {
                        /** @type {?} */
                        var frame = connection.frame;
                        /** @type {?} */
                        var src = transportLogic.getUrl(connection, that.name, true) + "&frameId=" + connection.frameId;
                        connection.log("Updating iframe src to '" + src + "'.");
                        frame.src = src;
                    }
                }), connection.reconnectDelay);
            }
        }),
        lostConnection: (/**
         * @param {?} connection
         * @return {?}
         */
        function (connection) {
            this.reconnect(connection);
        }),
        send: (/**
         * @param {?} connection
         * @param {?} data
         * @return {?}
         */
        function (connection, data) {
            transportLogic.ajaxSend(connection, data);
        }),
        receive: (/**
         * @param {?} connection
         * @param {?} data
         * @return {?}
         */
        function (connection, data) {
            /** @type {?} */
            var cw;
            /** @type {?} */
            var body;
            /** @type {?} */
            var response;
            if (connection.json !== connection._originalJson) {
                // If there's a custom JSON parser configured then serialize the object
                // using the original (browser) JSON parser and then deserialize it using
                // the custom parser (connection._parseResponse does that). This is so we
                // can easily send the response from the server as "raw" JSON but still
                // support custom JSON deserialization in the browser.
                data = connection._originalJson.stringify(data);
            }
            response = connection._parseResponse(data);
            transportLogic.processMessages(connection, response, connection.onSuccess);
            // Protect against connection stopping from a callback trigger within the processMessages above.
            if (connection.state === $.signalR.connectionState.connected) {
                // Delete the script & div elements
                connection.frameMessageCount = (connection.frameMessageCount || 0) + 1;
                if (connection.frameMessageCount > signalR.transports.foreverFrame.iframeClearThreshold) {
                    connection.frameMessageCount = 0;
                    cw = connection.frame.contentWindow || connection.frame.contentDocument;
                    if (cw && cw.document && cw.document.body) {
                        body = cw.document.body;
                        // Remove all the child elements from the iframe's body to conserver memory
                        while (body.firstChild) {
                            body.removeChild(body.firstChild);
                        }
                    }
                }
            }
        }),
        stop: (/**
         * @param {?} connection
         * @return {?}
         */
        function (connection) {
            /** @type {?} */
            var cw = null;
            // Stop attempting to prevent loading icon
            loadPreventer.cancel();
            if (connection.frame) {
                if (connection.frame.stop) {
                    connection.frame.stop();
                }
                else {
                    try {
                        cw = connection.frame.contentWindow || connection.frame.contentDocument;
                        if (cw.document && cw.document.execCommand) {
                            cw.document.execCommand("Stop");
                        }
                    }
                    catch (e) {
                        connection.log("Error occurred when stopping foreverFrame transport. Message = " + e.message + ".");
                    }
                }
                // Ensure the iframe is where we left it
                if (connection.frame.parentNode === window.document.body) {
                    window.document.body.removeChild(connection.frame);
                }
                delete transportLogic.foreverFrame.connections[connection.frameId];
                connection.frame = null;
                connection.frameId = null;
                delete connection.frame;
                delete connection.frameId;
                delete connection.onSuccess;
                delete connection.frameMessageCount;
                connection.log("Stopping forever frame.");
            }
        }),
        abort: (/**
         * @param {?} connection
         * @param {?} async
         * @return {?}
         */
        function (connection, async) {
            transportLogic.ajaxAbort(connection, async);
        }),
        getConnection: (/**
         * @param {?} id
         * @return {?}
         */
        function (id) {
            return transportLogic.foreverFrame.connections[id];
        }),
        started: (/**
         * @param {?} connection
         * @return {?}
         */
        function (connection) {
            if (changeState(connection, signalR.connectionState.reconnecting, signalR.connectionState.connected) === true) {
                $(connection).triggerHandler(events.onReconnect);
            }
        })
    };
})(jQueryShim, window));
/* jquery.signalR.transports.longPolling.js */
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
/*global window:false */
/// <reference path="jquery.signalR.transports.common.js" />
((/**
 * @param {?} $
 * @param {?} window
 * @param {?} undefined
 * @return {?}
 */
function ($, window, undefined) {
    /** @type {?} */
    var signalR = $.signalR;
    /** @type {?} */
    var events = $.signalR.events;
    /** @type {?} */
    var changeState = $.signalR.changeState;
    /** @type {?} */
    var isDisconnecting = $.signalR.isDisconnecting;
    /** @type {?} */
    var transportLogic = signalR.transports._logic;
    signalR.transports.longPolling = {
        name: "longPolling",
        supportsKeepAlive: (/**
         * @return {?}
         */
        function () {
            return false;
        }),
        reconnectDelay: 3000,
        start: (/**
         * @param {?} connection
         * @param {?} onSuccess
         * @param {?} onFailed
         * @return {?}
         */
        function (connection, onSuccess, onFailed) {
            /// <summary>Starts the long polling connection</summary>
            /// <param name="connection" type="signalR">The SignalR connection to start</param>
            /** @type {?} */
            var that = this;
            /** @type {?} */
            var fireConnect = (/**
             * @return {?}
             */
            function () {
                fireConnect = $.noop;
                connection.log("LongPolling connected.");
                if (onSuccess) {
                    onSuccess();
                }
                else {
                    connection.log("WARNING! The client received an init message after reconnecting.");
                }
            });
            /** @type {?} */
            var tryFailConnect = (/**
             * @param {?} error
             * @return {?}
             */
            function (error) {
                if (onFailed(error)) {
                    connection.log("LongPolling failed to connect.");
                    return true;
                }
                return false;
            });
            /** @type {?} */
            var privateData = connection._;
            /** @type {?} */
            var reconnectErrors = 0;
            /** @type {?} */
            var fireReconnected = (/**
             * @param {?} instance
             * @return {?}
             */
            function (instance) {
                window.clearTimeout(privateData.reconnectTimeoutId);
                privateData.reconnectTimeoutId = null;
                if (changeState(instance, signalR.connectionState.reconnecting, signalR.connectionState.connected) === true) {
                    // Successfully reconnected!
                    instance.log("Raising the reconnect event");
                    $(instance).triggerHandler(events.onReconnect);
                }
            });
            /** @type {?} */
            var 
            // 1 hour
            maxFireReconnectedTimeout = 3600000;
            if (connection.pollXhr) {
                connection.log("Polling xhr requests already exists, aborting.");
                connection.stop();
            }
            connection.messageId = null;
            privateData.reconnectTimeoutId = null;
            privateData.pollTimeoutId = window.setTimeout((/**
             * @return {?}
             */
            function () {
                ((/**
                 * @param {?} instance
                 * @param {?} raiseReconnect
                 * @return {?}
                 */
                function poll(instance, raiseReconnect) {
                    /** @type {?} */
                    var messageId = instance.messageId;
                    /** @type {?} */
                    var connect = (messageId === null);
                    /** @type {?} */
                    var reconnecting = !connect;
                    /** @type {?} */
                    var polling = !raiseReconnect;
                    /** @type {?} */
                    var url = transportLogic.getUrl(instance, that.name, reconnecting, polling, true /* use Post for longPolling */);
                    /** @type {?} */
                    var postData = (/** @type {?} */ ({}));
                    if (instance.messageId) {
                        postData.messageId = instance.messageId;
                    }
                    if (instance.groupsToken) {
                        postData.groupsToken = instance.groupsToken;
                    }
                    // If we've disconnected during the time we've tried to re-instantiate the poll then stop.
                    if (isDisconnecting(instance) === true) {
                        return;
                    }
                    connection.log("Opening long polling request to '" + url + "'.");
                    instance.pollXhr = transportLogic.ajax(connection, {
                        xhrFields: {
                            onprogress: (/**
                             * @return {?}
                             */
                            function () {
                                transportLogic.markLastMessage(connection);
                            })
                        },
                        url: url,
                        type: "POST",
                        contentType: signalR._.defaultContentType,
                        data: postData,
                        timeout: connection._.pollTimeout,
                        success: (/**
                         * @param {?} result
                         * @return {?}
                         */
                        function (result) {
                            /** @type {?} */
                            var minData;
                            /** @type {?} */
                            var delay = 0;
                            /** @type {?} */
                            var data;
                            /** @type {?} */
                            var shouldReconnect;
                            connection.log("Long poll complete.");
                            // Reset our reconnect errors so if we transition into a reconnecting state again we trigger
                            // reconnected quickly
                            reconnectErrors = 0;
                            try {
                                // Remove any keep-alives from the beginning of the result
                                minData = connection._parseResponse(result);
                            }
                            catch (error) {
                                transportLogic.handleParseFailure(instance, result, error, tryFailConnect, instance.pollXhr);
                                return;
                            }
                            // If there's currently a timeout to trigger reconnect, fire it now before processing messages
                            if (privateData.reconnectTimeoutId !== null) {
                                fireReconnected(instance);
                            }
                            if (minData) {
                                data = transportLogic.maximizePersistentResponse(minData);
                            }
                            transportLogic.processMessages(instance, minData, fireConnect);
                            if (data &&
                                $.type(data.LongPollDelay) === "number") {
                                delay = data.LongPollDelay;
                            }
                            if (isDisconnecting(instance) === true) {
                                return;
                            }
                            shouldReconnect = data && data.ShouldReconnect;
                            if (shouldReconnect) {
                                // Transition into the reconnecting state
                                // If this fails then that means that the user transitioned the connection into a invalid state in processMessages.
                                if (!transportLogic.ensureReconnectingState(instance)) {
                                    return;
                                }
                            }
                            // We never want to pass a raiseReconnect flag after a successful poll.  This is handled via the error function
                            if (delay > 0) {
                                privateData.pollTimeoutId = window.setTimeout((/**
                                 * @return {?}
                                 */
                                function () {
                                    poll(instance, shouldReconnect);
                                }), delay);
                            }
                            else {
                                poll(instance, shouldReconnect);
                            }
                        }),
                        error: (/**
                         * @param {?} data
                         * @param {?} textStatus
                         * @return {?}
                         */
                        function (data, textStatus) {
                            /** @type {?} */
                            var error = signalR._.transportError(signalR.resources.longPollFailed, connection.transport, data, instance.pollXhr);
                            // Stop trying to trigger reconnect, connection is in an error state
                            // If we're not in the reconnect state this will noop
                            window.clearTimeout(privateData.reconnectTimeoutId);
                            privateData.reconnectTimeoutId = null;
                            if (textStatus === "abort") {
                                connection.log("Aborted xhr request.");
                                return;
                            }
                            if (!tryFailConnect(error)) {
                                // Increment our reconnect errors, we assume all errors to be reconnect errors
                                // In the case that it's our first error this will cause Reconnect to be fired
                                // after 1 second due to reconnectErrors being = 1.
                                reconnectErrors++;
                                if (connection.state !== signalR.connectionState.reconnecting) {
                                    connection.log("An error occurred using longPolling. Status = " + textStatus + ".  Response = " + data.responseText + ".");
                                    $(instance).triggerHandler(events.onError, [error]);
                                }
                                // We check the state here to verify that we're not in an invalid state prior to verifying Reconnect.
                                // If we're not in connected or reconnecting then the next ensureReconnectingState check will fail and will return.
                                // Therefore we don't want to change that failure code path.
                                if ((connection.state === signalR.connectionState.connected ||
                                    connection.state === signalR.connectionState.reconnecting) &&
                                    !transportLogic.verifyLastActive(connection)) {
                                    return;
                                }
                                // Transition into the reconnecting state
                                // If this fails then that means that the user transitioned the connection into the disconnected or connecting state within the above error handler trigger.
                                if (!transportLogic.ensureReconnectingState(instance)) {
                                    return;
                                }
                                // Call poll with the raiseReconnect flag as true after the reconnect delay
                                privateData.pollTimeoutId = window.setTimeout((/**
                                 * @return {?}
                                 */
                                function () {
                                    poll(instance, true);
                                }), that.reconnectDelay);
                            }
                        })
                    });
                    // This will only ever pass after an error has occurred via the poll ajax procedure.
                    if (reconnecting && raiseReconnect === true) {
                        // We wait to reconnect depending on how many times we've failed to reconnect.
                        // This is essentially a heuristic that will exponentially increase in wait time before
                        // triggering reconnected.  This depends on the "error" handler of Poll to cancel this
                        // timeout if it triggers before the Reconnected event fires.
                        // The Math.min at the end is to ensure that the reconnect timeout does not overflow.
                        privateData.reconnectTimeoutId = window.setTimeout((/**
                         * @return {?}
                         */
                        function () { fireReconnected(instance); }), Math.min(1000 * (Math.pow(2, reconnectErrors) - 1), maxFireReconnectedTimeout));
                    }
                })(connection));
            }), 250); // Have to delay initial poll so Chrome doesn't show loader spinner in tab
        }),
        lostConnection: (/**
         * @param {?} connection
         * @return {?}
         */
        function (connection) {
            if (connection.pollXhr) {
                connection.pollXhr.abort("lostConnection");
            }
        }),
        send: (/**
         * @param {?} connection
         * @param {?} data
         * @return {?}
         */
        function (connection, data) {
            transportLogic.ajaxSend(connection, data);
        }),
        stop: (/**
         * @param {?} connection
         * @return {?}
         */
        function (connection) {
            /// <summary>Stops the long polling connection</summary>
            /// <param name="connection" type="signalR">The SignalR connection to stop</param>
            window.clearTimeout(connection._.pollTimeoutId);
            window.clearTimeout(connection._.reconnectTimeoutId);
            delete connection._.pollTimeoutId;
            delete connection._.reconnectTimeoutId;
            if (connection.pollXhr) {
                connection.pollXhr.abort();
                connection.pollXhr = null;
                delete connection.pollXhr;
            }
        }),
        abort: (/**
         * @param {?} connection
         * @param {?} async
         * @return {?}
         */
        function (connection, async) {
            transportLogic.ajaxAbort(connection, async);
        })
    };
})(jQueryShim, window));
/* jquery.signalR.hubs.js */
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
/*global window:false */
/// <reference path="jquery.signalR.core.js" />
((/**
 * @param {?} $
 * @param {?} window
 * @param {?} undefined
 * @return {?}
 */
function ($, window, undefined) {
    /** @type {?} */
    var eventNamespace = ".hubProxy";
    /** @type {?} */
    var signalR = $.signalR;
    /**
     * @param {?} event
     * @return {?}
     */
    function makeEventName(event) {
        return event + eventNamespace;
    }
    // Equivalent to Array.prototype.map
    /**
     * @param {?} arr
     * @param {?} fun
     * @param {?=} thisp
     * @return {?}
     */
    function map(arr, fun, thisp) {
        /** @type {?} */
        var i;
        /** @type {?} */
        var length = arr.length;
        /** @type {?} */
        var result = [];
        for (i = 0; i < length; i += 1) {
            if (arr.hasOwnProperty(i)) {
                result[i] = fun.call(thisp, arr[i], i, arr);
            }
        }
        return result;
    }
    /**
     * @param {?} a
     * @return {?}
     */
    function getArgValue(a) {
        return $.isFunction(a) ? null : ($.type(a) === "undefined" ? null : a);
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    function hasMembers(obj) {
        for (var key in obj) {
            // If we have any properties in our callback map then we have callbacks and can exit the loop via return
            if (obj.hasOwnProperty(key)) {
                return true;
            }
        }
        return false;
    }
    /**
     * @param {?} connection
     * @param {?} error
     * @return {?}
     */
    function clearInvocationCallbacks(connection, error) {
        /// <param name="connection" type="hubConnection" />
        /** @type {?} */
        var callbacks = connection._.invocationCallbacks;
        /** @type {?} */
        var callback;
        if (hasMembers(callbacks)) {
            connection.log("Clearing hub invocation callbacks with error: " + error + ".");
        }
        // Reset the callback cache now as we have a local var referencing it
        connection._.invocationCallbackId = 0;
        delete connection._.invocationCallbacks;
        connection._.invocationCallbacks = {};
        // Loop over the callbacks and invoke them.
        // We do this using a local var reference and *after* we've cleared the cache
        // so that if a fail callback itself tries to invoke another method we don't
        // end up with its callback in the list we're looping over.
        for (var callbackId in callbacks) {
            callback = callbacks[callbackId];
            callback.method.call(callback.scope, { E: error });
        }
    }
    // hubProxy
    /**
     * @param {?} hubConnection
     * @param {?} hubName
     * @return {?}
     */
    function hubProxy(hubConnection, hubName) {
        /// <summary>
        ///     Creates a new proxy object for the given hub connection that can be used to invoke
        ///     methods on server hubs and handle client method invocation requests from the server.
        /// </summary>
        return new hubProxy.fn.init(hubConnection, hubName);
    }
    hubProxy.fn = hubProxy.prototype = {
        init: (/**
         * @param {?} connection
         * @param {?} hubName
         * @return {?}
         */
        function (connection, hubName) {
            this.state = {};
            this.connection = connection;
            this.hubName = hubName;
            this._ = {
                callbackMap: {}
            };
        }),
        constructor: hubProxy,
        hasSubscriptions: (/**
         * @return {?}
         */
        function () {
            return hasMembers(this._.callbackMap);
        }),
        on: (/**
         * @param {?} eventName
         * @param {?} callback
         * @return {?}
         */
        function (eventName, callback) {
            /// <summary>Wires up a callback to be invoked when a invocation request is received from the server hub.</summary>
            /// <param name="eventName" type="String">The name of the hub event to register the callback for.</param>
            /// <param name="callback" type="Function">The callback to be invoked.</param>
            /** @type {?} */
            var that = this;
            /** @type {?} */
            var callbackMap = that._.callbackMap;
            // Normalize the event name to lowercase
            eventName = eventName.toLowerCase();
            // If there is not an event registered for this callback yet we want to create its event space in the callback map.
            if (!callbackMap[eventName]) {
                callbackMap[eventName] = {};
            }
            // Map the callback to our encompassed function
            callbackMap[eventName][callback] = (/**
             * @param {?} e
             * @param {?} data
             * @return {?}
             */
            function (e, data) {
                callback.apply(that, data);
            });
            $(that).bind(makeEventName(eventName), callbackMap[eventName][callback]);
            return that;
        }),
        off: (/**
         * @param {?} eventName
         * @param {?} callback
         * @return {?}
         */
        function (eventName, callback) {
            /// <summary>Removes the callback invocation request from the server hub for the given event name.</summary>
            /// <param name="eventName" type="String">The name of the hub event to unregister the callback for.</param>
            /// <param name="callback" type="Function">The callback to be invoked.</param>
            /** @type {?} */
            var that = this;
            /** @type {?} */
            var callbackMap = that._.callbackMap;
            /** @type {?} */
            var callbackSpace;
            // Normalize the event name to lowercase
            eventName = eventName.toLowerCase();
            callbackSpace = callbackMap[eventName];
            // Verify that there is an event space to unbind
            if (callbackSpace) {
                // Only unbind if there's an event bound with eventName and a callback with the specified callback
                if (callbackSpace[callback]) {
                    $(that).unbind(makeEventName(eventName), callbackSpace[callback]);
                    // Remove the callback from the callback map
                    delete callbackSpace[callback];
                    // Check if there are any members left on the event, if not we need to destroy it.
                    if (!hasMembers(callbackSpace)) {
                        delete callbackMap[eventName];
                    }
                }
                else if (!callback) { // Check if we're removing the whole event and we didn't error because of an invalid callback
                    $(that).unbind(makeEventName(eventName));
                    delete callbackMap[eventName];
                }
            }
            return that;
        }),
        invoke: (/**
         * @param {?} methodName
         * @return {?}
         */
        function (methodName) {
            /// <summary>Invokes a server hub method with the given arguments.</summary>
            /// <param name="methodName" type="String">The name of the server hub method.</param>
            /// <summary>Invokes a server hub method with the given arguments.</summary>
            /// <param name="methodName" type="String">The name of the server hub method.</param>
            /** @type {?} */
            var that = this;
            /** @type {?} */
            var connection = that.connection;
            /** @type {?} */
            var args = $.makeArray(arguments).slice(1);
            /** @type {?} */
            var argValues = map(args, getArgValue);
            /** @type {?} */
            var data = { H: that.hubName, M: methodName, A: argValues, I: connection._.invocationCallbackId, S: null };
            /** @type {?} */
            var d = $.Deferred();
            /** @type {?} */
            var callback = (/**
             * @param {?} minResult
             * @return {?}
             */
            function (minResult) {
                /** @type {?} */
                var result = that._maximizeHubResponse(minResult);
                /** @type {?} */
                var source;
                /** @type {?} */
                var error;
                // Update the hub state
                $.extend(that.state, result.State);
                if (result.Progress) {
                    if (d.notifyWith) {
                        // Progress is only supported in jQuery 1.7+
                        d.notifyWith(that, [result.Progress.Data]);
                    }
                    else if (!connection._.progressjQueryVersionLogged) {
                        connection.log("A hub method invocation progress update was received but the version of jQuery in use (" + $.prototype.jquery + ") does not support progress updates. Upgrade to jQuery 1.7+ to receive progress notifications.");
                        connection._.progressjQueryVersionLogged = true;
                    }
                }
                else if (result.Error) {
                    // Server hub method threw an exception, log it & reject the deferred
                    if (result.StackTrace) {
                        connection.log(result.Error + "\n" + result.StackTrace + ".");
                    }
                    // result.ErrorData is only set if a HubException was thrown
                    source = result.IsHubException ? "HubException" : "Exception";
                    error = signalR._.error(result.Error, source);
                    error.data = result.ErrorData;
                    connection.log(that.hubName + "." + methodName + " failed to execute. Error: " + error.message);
                    d.rejectWith(that, [error]);
                }
                else {
                    // Server invocation succeeded, resolve the deferred
                    connection.log("Invoked " + that.hubName + "." + methodName);
                    d.resolveWith(that, [result.Result]);
                }
            });
            connection._.invocationCallbacks[connection._.invocationCallbackId.toString()] = { scope: that, method: callback };
            connection._.invocationCallbackId += 1;
            if (!$.isEmptyObject(that.state)) {
                data.S = that.state;
            }
            connection.log("Invoking " + that.hubName + "." + methodName);
            connection.send(data);
            return d.promise();
        }),
        _maximizeHubResponse: (/**
         * @param {?} minHubResponse
         * @return {?}
         */
        function (minHubResponse) {
            return {
                State: minHubResponse.S,
                Result: minHubResponse.R,
                Progress: minHubResponse.P ? {
                    Id: minHubResponse.P.I,
                    Data: minHubResponse.P.D
                } : null,
                Id: minHubResponse.I,
                IsHubException: minHubResponse.H,
                Error: minHubResponse.E,
                StackTrace: minHubResponse.T,
                ErrorData: minHubResponse.D
            };
        })
    };
    hubProxy.fn.init.prototype = hubProxy.fn;
    // hubConnection
    /**
     * @param {?} url
     * @param {?} options
     * @return {?}
     */
    function hubConnection(url, options) {
        /// <summary>Creates a new hub connection.</summary>
        /// <param name="url" type="String">[Optional] The hub route url, defaults to "/signalr".</param>
        /// <param name="options" type="Object">[Optional] Settings to use when creating the hubConnection.</param>
        /** @type {?} */
        var settings = {
            qs: null,
            logging: false,
            useDefaultPath: true
        };
        $.extend(settings, options);
        if (!url || settings.useDefaultPath) {
            url = (url || "") + "/signalr";
        }
        return new hubConnection.fn.init(url, settings);
    }
    hubConnection.fn = hubConnection.prototype = $.connection();
    hubConnection.fn.init = (/**
     * @param {?} url
     * @param {?} options
     * @return {?}
     */
    function (url, options) {
        /** @type {?} */
        var settings = {
            qs: null,
            logging: false,
            useDefaultPath: true
        };
        /** @type {?} */
        var connection = this;
        $.extend(settings, options);
        // Call the base constructor
        $.signalR.fn.init.call(connection, url, settings.qs, settings.logging);
        // Object to store hub proxies for this connection
        connection.proxies = {};
        connection._.invocationCallbackId = 0;
        connection._.invocationCallbacks = {};
        // Wire up the received handler
        connection.received((/**
         * @param {?} minData
         * @return {?}
         */
        function (minData) {
            /** @type {?} */
            var data;
            /** @type {?} */
            var proxy;
            /** @type {?} */
            var dataCallbackId;
            /** @type {?} */
            var callback;
            /** @type {?} */
            var hubName;
            /** @type {?} */
            var eventName;
            if (!minData) {
                return;
            }
            // We have to handle progress updates first in order to ensure old clients that receive
            // progress updates enter the return value branch and then no-op when they can't find
            // the callback in the map (because the minData.I value will not be a valid callback ID)
            if (typeof (minData.P) !== "undefined") {
                // Process progress notification
                dataCallbackId = minData.P.I.toString();
                callback = connection._.invocationCallbacks[dataCallbackId];
                if (callback) {
                    callback.method.call(callback.scope, minData);
                }
            }
            else if (typeof (minData.I) !== "undefined") {
                // We received the return value from a server method invocation, look up callback by id and call it
                dataCallbackId = minData.I.toString();
                callback = connection._.invocationCallbacks[dataCallbackId];
                if (callback) {
                    // Delete the callback from the proxy
                    connection._.invocationCallbacks[dataCallbackId] = null;
                    delete connection._.invocationCallbacks[dataCallbackId];
                    // Invoke the callback
                    callback.method.call(callback.scope, minData);
                }
            }
            else {
                data = this._maximizeClientHubInvocation(minData);
                // We received a client invocation request, i.e. broadcast from server hub
                connection.log("Triggering client hub event '" + data.Method + "' on hub '" + data.Hub + "'.");
                // Normalize the names to lowercase
                hubName = data.Hub.toLowerCase();
                eventName = data.Method.toLowerCase();
                // Trigger the local invocation event
                proxy = this.proxies[hubName];
                // Update the hub state
                $.extend(proxy.state, data.State);
                $(proxy).triggerHandler(makeEventName(eventName), [data.Args]);
            }
        }));
        connection.error((/**
         * @param {?} errData
         * @param {?} origData
         * @return {?}
         */
        function (errData, origData) {
            /** @type {?} */
            var callbackId;
            /** @type {?} */
            var callback;
            if (!origData) {
                // No original data passed so this is not a send error
                return;
            }
            callbackId = origData.I;
            callback = connection._.invocationCallbacks[callbackId];
            // Verify that there is a callback bound (could have been cleared)
            if (callback) {
                // Delete the callback
                connection._.invocationCallbacks[callbackId] = null;
                delete connection._.invocationCallbacks[callbackId];
                // Invoke the callback with an error to reject the promise
                callback.method.call(callback.scope, { E: errData });
            }
        }));
        connection.reconnecting((/**
         * @return {?}
         */
        function () {
            if (connection.transport && connection.transport.name === "webSockets") {
                clearInvocationCallbacks(connection, "Connection started reconnecting before invocation result was received.");
            }
        }));
        connection.disconnected((/**
         * @return {?}
         */
        function () {
            clearInvocationCallbacks(connection, "Connection was disconnected before invocation result was received.");
        }));
    });
    hubConnection.fn._maximizeClientHubInvocation = (/**
     * @param {?} minClientHubInvocation
     * @return {?}
     */
    function (minClientHubInvocation) {
        return {
            Hub: minClientHubInvocation.H,
            Method: minClientHubInvocation.M,
            Args: minClientHubInvocation.A,
            State: minClientHubInvocation.S
        };
    });
    hubConnection.fn._registerSubscribedHubs = (/**
     * @return {?}
     */
    function () {
        /// <summary>
        ///     Sets the starting event to loop through the known hubs and register any new hubs
        ///     that have been added to the proxy.
        /// </summary>
        /** @type {?} */
        var connection = this;
        if (!connection._subscribedToHubs) {
            connection._subscribedToHubs = true;
            connection.starting((/**
             * @return {?}
             */
            function () {
                // Set the connection's data object with all the hub proxies with active subscriptions.
                // These proxies will receive notifications from the server.
                /** @type {?} */
                var subscribedHubs = [];
                $.each(connection.proxies, (/**
                 * @param {?} key
                 * @return {?}
                 */
                function (key) {
                    if (this.hasSubscriptions()) {
                        subscribedHubs.push({ name: key });
                        connection.log("Client subscribed to hub '" + key + "'.");
                    }
                }));
                if (subscribedHubs.length === 0) {
                    connection.log("No hubs have been subscribed to.  The client will not receive data from hubs.  To fix, declare at least one client side function prior to connection start for each hub you wish to subscribe to.");
                }
                connection.data = connection.json.stringify(subscribedHubs);
            }));
        }
    });
    hubConnection.fn.createHubProxy = (/**
     * @param {?} hubName
     * @return {?}
     */
    function (hubName) {
        /// <summary>
        ///     Creates a new proxy object for the given hub connection that can be used to invoke
        ///     methods on server hubs and handle client method invocation requests from the server.
        /// </summary>
        /// <param name="hubName" type="String">
        ///     The name of the hub on the server to create the proxy for.
        /// </param>
        // Normalize the name to lowercase
        hubName = hubName.toLowerCase();
        /** @type {?} */
        var proxy = this.proxies[hubName];
        if (!proxy) {
            proxy = hubProxy(this, hubName);
            this.proxies[hubName] = proxy;
        }
        this._registerSubscribedHubs();
        return proxy;
    });
    hubConnection.fn.init.prototype = hubConnection.fn;
    $.hubConnection = hubConnection;
})(jQueryShim, window));
/* jquery.signalR.version.js */
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
/*global window:false */
/// <reference path="jquery.signalR.core.js" />
((/**
 * @param {?} $
 * @param {?} undefined
 * @return {?}
 */
function ($, undefined) {
    $.signalR.version = "2.2.1";
})(jQueryShim));
/** @type {?} */
export const hubConnection = jQueryShim.hubConnection;
/** @type {?} */
export const signalR = jQueryShim.signalR;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmFsUi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1zaWduYWxyLyIsInNvdXJjZXMiOlsibGliL3NpZ25hbHItbm8tanF1ZXJ5L3NpZ25hbFIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLFlBQVksQ0FBQztBQUViLE9BQU8sVUFBVSxNQUFNLGNBQWMsQ0FBQzs7Ozs7Ozs7Ozs7OztBQWV0QyxDQUFDOzs7Ozs7QUFBQSxVQUFVLENBQUMsRUFBRSxNQUFNLEVBQUUsU0FBUzs7UUFFdkIsU0FBUyxHQUFHO1FBQ1osUUFBUSxFQUFFLHFHQUFxRztRQUMvRyxpQkFBaUIsRUFBRSw4SEFBOEg7UUFDakosZ0JBQWdCLEVBQUUsbUNBQW1DO1FBQ3JELG1CQUFtQixFQUFFLDhDQUE4QztRQUNuRSx1QkFBdUIsRUFBRSwwREFBMEQ7UUFDbkYsNkJBQTZCLEVBQUUsbUNBQW1DO1FBQ2xFLHVCQUF1QixFQUFFLHNEQUFzRDtRQUMvRSx5QkFBeUIsRUFBRSxzREFBc0Q7UUFDakYseUJBQXlCLEVBQUUsK0RBQStEO1FBQzFGLG9CQUFvQixFQUFFLHlEQUF5RDtRQUMvRSxvQkFBb0IsRUFBRSxzSEFBc0g7UUFDNUksVUFBVSxFQUFFLGNBQWM7UUFDMUIsV0FBVyxFQUFFLGlDQUFpQztRQUM5QyxjQUFjLEVBQUUsOEJBQThCO1FBQzlDLDBCQUEwQixFQUFFLGdDQUFnQztRQUM1RCxnQkFBZ0IsRUFBRSw2QkFBNkI7UUFDL0MsZUFBZSxFQUFFLG1CQUFtQjtRQUNwQywrQkFBK0IsRUFBRSxtREFBbUQ7UUFDcEYsZ0JBQWdCLEVBQUUsd0JBQXdCO1FBQzFDLDBCQUEwQixFQUFFLHlGQUF5RjtRQUNySCxxQkFBcUIsRUFBRSxnRUFBZ0U7UUFDdkYscUJBQXFCLEVBQUUsa0VBQWtFO1FBQ3pGLHNCQUFzQixFQUFFLG1GQUFtRjtRQUMzRyxnQkFBZ0IsRUFBRSw0RUFBNEU7UUFDOUYsc0JBQXNCLEVBQUUsdUhBQXVIO0tBQ2xKOztRQUNHLE9BQU87O1FBQ1As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QUFrRTtRQUNsRSxZQUFZO1FBRVosa0NBQWtDO1FBQ2xDLE9BQU8sR0FBRyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7O1lBRTVCLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztRQUNqQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1IsS0FBSyxHQUFHLFFBQVEsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxLQUFLLENBQUM7U0FDakM7UUFFRCxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztRQUUvQixPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDLENBQUEsQ0FBQztJQUVGLGFBQWEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxhQUFhLENBQUMsRUFBRSxDQUFDO0lBRW5ELENBQUMsQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO0FBRXBDLENBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQzs7Ozs7O0FBUXZCLENBQUM7Ozs7O0FBQUEsVUFBVSxDQUFDLEVBQUUsU0FBUztJQUNuQixDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7QUFDaEMsQ0FBQyxFQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7O0FBRWYsTUFBTSxPQUFPLGFBQWEsR0FBRyxVQUFVLENBQUMsYUFBYTs7QUFDckQsTUFBTSxPQUFPLE9BQU8sR0FBRyxVQUFVLENBQUMsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCBqUXVlcnlTaGltIGZyb20gJy4valF1ZXJ5U2hpbSc7XHJcblxyXG4vKiBqcXVlcnkuc2lnbmFsUi5jb3JlLmpzICovXHJcbi8qZ2xvYmFsIHdpbmRvdzpmYWxzZSAqL1xyXG4vKiFcclxuICogQVNQLk5FVCBTaWduYWxSIEphdmFTY3JpcHQgTGlicmFyeSB2Mi4yLjFcclxuICogaHR0cDovL3NpZ25hbHIubmV0L1xyXG4gKlxyXG4gKiBDb3B5cmlnaHQgKGMpIC5ORVQgRm91bmRhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqL1xyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIlNjcmlwdHMvanF1ZXJ5LTEuNi40LmpzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cImpxdWVyeS5zaWduYWxSLnZlcnNpb24uanNcIiAvPlxyXG4oZnVuY3Rpb24gKCQsIHdpbmRvdywgdW5kZWZpbmVkKSB7XHJcblxyXG4gICAgdmFyIHJlc291cmNlcyA9IHtcclxuICAgICAgICBub2pRdWVyeTogXCJqUXVlcnkgd2FzIG5vdCBmb3VuZC4gUGxlYXNlIGVuc3VyZSBqUXVlcnkgaXMgcmVmZXJlbmNlZCBiZWZvcmUgdGhlIFNpZ25hbFIgY2xpZW50IEphdmFTY3JpcHQgZmlsZS5cIixcclxuICAgICAgICBub1RyYW5zcG9ydE9uSW5pdDogXCJObyB0cmFuc3BvcnQgY291bGQgYmUgaW5pdGlhbGl6ZWQgc3VjY2Vzc2Z1bGx5LiBUcnkgc3BlY2lmeWluZyBhIGRpZmZlcmVudCB0cmFuc3BvcnQgb3Igbm9uZSBhdCBhbGwgZm9yIGF1dG8gaW5pdGlhbGl6YXRpb24uXCIsXHJcbiAgICAgICAgZXJyb3JPbk5lZ290aWF0ZTogXCJFcnJvciBkdXJpbmcgbmVnb3RpYXRpb24gcmVxdWVzdC5cIixcclxuICAgICAgICBzdG9wcGVkV2hpbGVMb2FkaW5nOiBcIlRoZSBjb25uZWN0aW9uIHdhcyBzdG9wcGVkIGR1cmluZyBwYWdlIGxvYWQuXCIsXHJcbiAgICAgICAgc3RvcHBlZFdoaWxlTmVnb3RpYXRpbmc6IFwiVGhlIGNvbm5lY3Rpb24gd2FzIHN0b3BwZWQgZHVyaW5nIHRoZSBuZWdvdGlhdGUgcmVxdWVzdC5cIixcclxuICAgICAgICBlcnJvclBhcnNpbmdOZWdvdGlhdGVSZXNwb25zZTogXCJFcnJvciBwYXJzaW5nIG5lZ290aWF0ZSByZXNwb25zZS5cIixcclxuICAgICAgICBlcnJvckR1cmluZ1N0YXJ0UmVxdWVzdDogXCJFcnJvciBkdXJpbmcgc3RhcnQgcmVxdWVzdC4gU3RvcHBpbmcgdGhlIGNvbm5lY3Rpb24uXCIsXHJcbiAgICAgICAgc3RvcHBlZER1cmluZ1N0YXJ0UmVxdWVzdDogXCJUaGUgY29ubmVjdGlvbiB3YXMgc3RvcHBlZCBkdXJpbmcgdGhlIHN0YXJ0IHJlcXVlc3QuXCIsXHJcbiAgICAgICAgZXJyb3JQYXJzaW5nU3RhcnRSZXNwb25zZTogXCJFcnJvciBwYXJzaW5nIHN0YXJ0IHJlc3BvbnNlOiAnezB9Jy4gU3RvcHBpbmcgdGhlIGNvbm5lY3Rpb24uXCIsXHJcbiAgICAgICAgaW52YWxpZFN0YXJ0UmVzcG9uc2U6IFwiSW52YWxpZCBzdGFydCByZXNwb25zZTogJ3swfScuIFN0b3BwaW5nIHRoZSBjb25uZWN0aW9uLlwiLFxyXG4gICAgICAgIHByb3RvY29sSW5jb21wYXRpYmxlOiBcIllvdSBhcmUgdXNpbmcgYSB2ZXJzaW9uIG9mIHRoZSBjbGllbnQgdGhhdCBpc24ndCBjb21wYXRpYmxlIHdpdGggdGhlIHNlcnZlci4gQ2xpZW50IHZlcnNpb24gezB9LCBzZXJ2ZXIgdmVyc2lvbiB7MX0uXCIsXHJcbiAgICAgICAgc2VuZEZhaWxlZDogXCJTZW5kIGZhaWxlZC5cIixcclxuICAgICAgICBwYXJzZUZhaWxlZDogXCJGYWlsZWQgYXQgcGFyc2luZyByZXNwb25zZTogezB9XCIsXHJcbiAgICAgICAgbG9uZ1BvbGxGYWlsZWQ6IFwiTG9uZyBwb2xsaW5nIHJlcXVlc3QgZmFpbGVkLlwiLFxyXG4gICAgICAgIGV2ZW50U291cmNlRmFpbGVkVG9Db25uZWN0OiBcIkV2ZW50U291cmNlIGZhaWxlZCB0byBjb25uZWN0LlwiLFxyXG4gICAgICAgIGV2ZW50U291cmNlRXJyb3I6IFwiRXJyb3IgcmFpc2VkIGJ5IEV2ZW50U291cmNlXCIsXHJcbiAgICAgICAgd2ViU29ja2V0Q2xvc2VkOiBcIldlYlNvY2tldCBjbG9zZWQuXCIsXHJcbiAgICAgICAgcGluZ1NlcnZlckZhaWxlZEludmFsaWRSZXNwb25zZTogXCJJbnZhbGlkIHBpbmcgcmVzcG9uc2Ugd2hlbiBwaW5naW5nIHNlcnZlcjogJ3swfScuXCIsXHJcbiAgICAgICAgcGluZ1NlcnZlckZhaWxlZDogXCJGYWlsZWQgdG8gcGluZyBzZXJ2ZXIuXCIsXHJcbiAgICAgICAgcGluZ1NlcnZlckZhaWxlZFN0YXR1c0NvZGU6IFwiRmFpbGVkIHRvIHBpbmcgc2VydmVyLiAgU2VydmVyIHJlc3BvbmRlZCB3aXRoIHN0YXR1cyBjb2RlIHswfSwgc3RvcHBpbmcgdGhlIGNvbm5lY3Rpb24uXCIsXHJcbiAgICAgICAgcGluZ1NlcnZlckZhaWxlZFBhcnNlOiBcIkZhaWxlZCB0byBwYXJzZSBwaW5nIHNlcnZlciByZXNwb25zZSwgc3RvcHBpbmcgdGhlIGNvbm5lY3Rpb24uXCIsXHJcbiAgICAgICAgbm9Db25uZWN0aW9uVHJhbnNwb3J0OiBcIkNvbm5lY3Rpb24gaXMgaW4gYW4gaW52YWxpZCBzdGF0ZSwgdGhlcmUgaXMgbm8gdHJhbnNwb3J0IGFjdGl2ZS5cIixcclxuICAgICAgICB3ZWJTb2NrZXRzSW52YWxpZFN0YXRlOiBcIlRoZSBXZWIgU29ja2V0IHRyYW5zcG9ydCBpcyBpbiBhbiBpbnZhbGlkIHN0YXRlLCB0cmFuc2l0aW9uaW5nIGludG8gcmVjb25uZWN0aW5nLlwiLFxyXG4gICAgICAgIHJlY29ubmVjdFRpbWVvdXQ6IFwiQ291bGRuJ3QgcmVjb25uZWN0IHdpdGhpbiB0aGUgY29uZmlndXJlZCB0aW1lb3V0IG9mIHswfSBtcywgZGlzY29ubmVjdGluZy5cIixcclxuICAgICAgICByZWNvbm5lY3RXaW5kb3dUaW1lb3V0OiBcIlRoZSBjbGllbnQgaGFzIGJlZW4gaW5hY3RpdmUgc2luY2UgezB9IGFuZCBpdCBoYXMgZXhjZWVkZWQgdGhlIGluYWN0aXZpdHkgdGltZW91dCBvZiB7MX0gbXMuIFN0b3BwaW5nIHRoZSBjb25uZWN0aW9uLlwiXHJcbiAgICB9O1xyXG4gICAgdmFyIHNpZ25hbFIsXHJcbiAgICAgICAgX2Nvbm5lY3Rpb24sXHJcbiAgICAgICAgX3BhZ2VMb2FkZWQgPSAod2luZG93LmRvY3VtZW50LnJlYWR5U3RhdGUgPT09IFwiY29tcGxldGVcIiksXHJcbiAgICAgICAgX3BhZ2VXaW5kb3cgPSAkKHdpbmRvdyksXHJcbiAgICAgICAgX25lZ290aWF0ZUFib3J0VGV4dCA9IFwiX19OZWdvdGlhdGUgQWJvcnRlZF9fXCIsXHJcbiAgICAgICAgZXZlbnRzID0ge1xyXG4gICAgICAgICAgICBvblN0YXJ0OiBcIm9uU3RhcnRcIixcclxuICAgICAgICAgICAgb25TdGFydGluZzogXCJvblN0YXJ0aW5nXCIsXHJcbiAgICAgICAgICAgIG9uUmVjZWl2ZWQ6IFwib25SZWNlaXZlZFwiLFxyXG4gICAgICAgICAgICBvbkVycm9yOiBcIm9uRXJyb3JcIixcclxuICAgICAgICAgICAgb25Db25uZWN0aW9uU2xvdzogXCJvbkNvbm5lY3Rpb25TbG93XCIsXHJcbiAgICAgICAgICAgIG9uUmVjb25uZWN0aW5nOiBcIm9uUmVjb25uZWN0aW5nXCIsXHJcbiAgICAgICAgICAgIG9uUmVjb25uZWN0OiBcIm9uUmVjb25uZWN0XCIsXHJcbiAgICAgICAgICAgIG9uU3RhdGVDaGFuZ2VkOiBcIm9uU3RhdGVDaGFuZ2VkXCIsXHJcbiAgICAgICAgICAgIG9uRGlzY29ubmVjdDogXCJvbkRpc2Nvbm5lY3RcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYWpheERlZmF1bHRzID0ge1xyXG4gICAgICAgICAgICBwcm9jZXNzRGF0YTogdHJ1ZSxcclxuICAgICAgICAgICAgdGltZW91dDogbnVsbCxcclxuICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgIGdsb2JhbDogZmFsc2UsXHJcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbG9nID0gZnVuY3Rpb24gKG1zZywgbG9nZ2luZykge1xyXG4gICAgICAgICAgICBpZiAobG9nZ2luZyA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgbTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiAod2luZG93LmNvbnNvbGUpID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbSA9IFwiW1wiICsgbmV3IERhdGUoKS50b1RpbWVTdHJpbmcoKSArIFwiXSBTaWduYWxSOiBcIiArIG1zZztcclxuICAgICAgICAgICAgaWYgKHdpbmRvdy5jb25zb2xlLmRlYnVnKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuY29uc29sZS5kZWJ1ZyhtKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh3aW5kb3cuY29uc29sZS5sb2cpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5jb25zb2xlLmxvZyhtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNoYW5nZVN0YXRlID0gZnVuY3Rpb24gKGNvbm5lY3Rpb24sIGV4cGVjdGVkU3RhdGUsIG5ld1N0YXRlKSB7XHJcbiAgICAgICAgICAgIGlmIChleHBlY3RlZFN0YXRlID09PSBjb25uZWN0aW9uLnN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnN0YXRlID0gbmV3U3RhdGU7XHJcblxyXG4gICAgICAgICAgICAgICAgJChjb25uZWN0aW9uKS50cmlnZ2VySGFuZGxlcihldmVudHMub25TdGF0ZUNoYW5nZWQsIFt7IG9sZFN0YXRlOiBleHBlY3RlZFN0YXRlLCBuZXdTdGF0ZTogbmV3U3RhdGUgfV0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBpc0Rpc2Nvbm5lY3RpbmcgPSBmdW5jdGlvbiAoY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gY29ubmVjdGlvbi5zdGF0ZSA9PT0gc2lnbmFsUi5jb25uZWN0aW9uU3RhdGUuZGlzY29ubmVjdGVkO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHN1cHBvcnRzS2VlcEFsaXZlID0gZnVuY3Rpb24gKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNvbm5lY3Rpb24uXy5rZWVwQWxpdmVEYXRhLmFjdGl2YXRlZCAmJlxyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi50cmFuc3BvcnQuc3VwcG9ydHNLZWVwQWxpdmUoY29ubmVjdGlvbik7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY29uZmlndXJlU3RvcFJlY29ubmVjdGluZ1RpbWVvdXQgPSBmdW5jdGlvbiAoY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICB2YXIgc3RvcFJlY29ubmVjdGluZ1RpbWVvdXQsXHJcbiAgICAgICAgICAgICAgICBvblJlY29ubmVjdFRpbWVvdXQ7XHJcblxyXG4gICAgICAgICAgICAvLyBDaGVjayBpZiB0aGlzIGNvbm5lY3Rpb24gaGFzIGFscmVhZHkgYmVlbiBjb25maWd1cmVkIHRvIHN0b3AgcmVjb25uZWN0aW5nIGFmdGVyIGEgc3BlY2lmaWVkIHRpbWVvdXQuXHJcbiAgICAgICAgICAgIC8vIFdpdGhvdXQgdGhpcyBjaGVjayBpZiBhIGNvbm5lY3Rpb24gaXMgc3RvcHBlZCB0aGVuIHN0YXJ0ZWQgZXZlbnRzIHdpbGwgYmUgYm91bmQgbXVsdGlwbGUgdGltZXMuXHJcbiAgICAgICAgICAgIGlmICghY29ubmVjdGlvbi5fLmNvbmZpZ3VyZWRTdG9wUmVjb25uZWN0aW5nVGltZW91dCkge1xyXG4gICAgICAgICAgICAgICAgb25SZWNvbm5lY3RUaW1lb3V0ID0gZnVuY3Rpb24gKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IHNpZ25hbFIuXy5mb3JtYXQoc2lnbmFsUi5yZXNvdXJjZXMucmVjb25uZWN0VGltZW91dCwgY29ubmVjdGlvbi5kaXNjb25uZWN0VGltZW91dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5sb2cobWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChjb25uZWN0aW9uKS50cmlnZ2VySGFuZGxlcihldmVudHMub25FcnJvciwgW3NpZ25hbFIuXy5lcnJvcihtZXNzYWdlLCAvKiBzb3VyY2UgKi8gXCJUaW1lb3V0RXhjZXB0aW9uXCIpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5zdG9wKC8qIGFzeW5jICovIGZhbHNlLCAvKiBub3RpZnlTZXJ2ZXIgKi8gZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnJlY29ubmVjdGluZyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbm5lY3Rpb24gPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBHdWFyZCBhZ2FpbnN0IHN0YXRlIGNoYW5naW5nIGluIGEgcHJldmlvdXMgdXNlciBkZWZpbmVkIGV2ZW4gaGFuZGxlclxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb25uZWN0aW9uLnN0YXRlID09PSBzaWduYWxSLmNvbm5lY3Rpb25TdGF0ZS5yZWNvbm5lY3RpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RvcFJlY29ubmVjdGluZ1RpbWVvdXQgPSB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7IG9uUmVjb25uZWN0VGltZW91dChjb25uZWN0aW9uKTsgfSwgY29ubmVjdGlvbi5kaXNjb25uZWN0VGltZW91dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5zdGF0ZUNoYW5nZWQoZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5vbGRTdGF0ZSA9PT0gc2lnbmFsUi5jb25uZWN0aW9uU3RhdGUucmVjb25uZWN0aW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIENsZWFyIHRoZSBwZW5kaW5nIHJlY29ubmVjdCB0aW1lb3V0IGNoZWNrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQoc3RvcFJlY29ubmVjdGluZ1RpbWVvdXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uXy5jb25maWd1cmVkU3RvcFJlY29ubmVjdGluZ1RpbWVvdXQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICBzaWduYWxSID0gZnVuY3Rpb24gKHVybCwgcXMsIGxvZ2dpbmcpIHtcclxuICAgICAgICAvLy8gPHN1bW1hcnk+Q3JlYXRlcyBhIG5ldyBTaWduYWxSIGNvbm5lY3Rpb24gZm9yIHRoZSBnaXZlbiB1cmw8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidXJsXCIgdHlwZT1cIlN0cmluZ1wiPlRoZSBVUkwgb2YgdGhlIGxvbmcgcG9sbGluZyBlbmRwb2ludDwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwicXNcIiB0eXBlPVwiT2JqZWN0XCI+XHJcbiAgICAgICAgLy8vICAgICBbT3B0aW9uYWxdIEN1c3RvbSBxdWVyeXN0cmluZyBwYXJhbWV0ZXJzIHRvIGFkZCB0byB0aGUgY29ubmVjdGlvbiBVUkwuXHJcbiAgICAgICAgLy8vICAgICBJZiBhbiBvYmplY3QsIGV2ZXJ5IG5vbi1mdW5jdGlvbiBtZW1iZXIgd2lsbCBiZSBhZGRlZCB0byB0aGUgcXVlcnlzdHJpbmcuXHJcbiAgICAgICAgLy8vICAgICBJZiBhIHN0cmluZywgaXQncyBhZGRlZCB0byB0aGUgUVMgYXMgc3BlY2lmaWVkLlxyXG4gICAgICAgIC8vLyA8L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImxvZ2dpbmdcIiB0eXBlPVwiQm9vbGVhblwiPlxyXG4gICAgICAgIC8vLyAgICAgW09wdGlvbmFsXSBBIGZsYWcgaW5kaWNhdGluZyB3aGV0aGVyIGNvbm5lY3Rpb24gbG9nZ2luZyBpcyBlbmFibGVkIHRvIHRoZSBicm93c2VyXHJcbiAgICAgICAgLy8vICAgICBjb25zb2xlL2xvZy4gRGVmYXVsdHMgdG8gZmFsc2UuXHJcbiAgICAgICAgLy8vIDwvcGFyYW0+XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgc2lnbmFsUi5mbi5pbml0KHVybCwgcXMsIGxvZ2dpbmcpO1xyXG4gICAgfTtcclxuXHJcbiAgICBzaWduYWxSLl8gPSB7XHJcbiAgICAgICAgZGVmYXVsdENvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDsgY2hhcnNldD1VVEYtOFwiLFxyXG5cclxuICAgICAgICBpZVZlcnNpb246IChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciB2ZXJzaW9uLFxyXG4gICAgICAgICAgICAgICAgbWF0Y2hlcztcclxuXHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cubmF2aWdhdG9yLmFwcE5hbWUgPT09ICdNaWNyb3NvZnQgSW50ZXJuZXQgRXhwbG9yZXInKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBDaGVjayBpZiB0aGUgdXNlciBhZ2VudCBoYXMgdGhlIHBhdHRlcm4gXCJNU0lFIChvbmUgb3IgbW9yZSBudW1iZXJzKS4ob25lIG9yIG1vcmUgbnVtYmVycylcIjtcclxuICAgICAgICAgICAgICAgIG1hdGNoZXMgPSAvTVNJRSAoWzAtOV0rXFwuWzAtOV0rKS8uZXhlYyh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICB2ZXJzaW9uID0gcGFyc2VGbG9hdChtYXRjaGVzWzFdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gdW5kZWZpbmVkIHZhbHVlIG1lYW5zIG5vdCBJRVxyXG4gICAgICAgICAgICByZXR1cm4gdmVyc2lvbjtcclxuICAgICAgICB9KSgpLFxyXG5cclxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKG1lc3NhZ2UsIHNvdXJjZSwgY29udGV4dCkge1xyXG4gICAgICAgICAgICB2YXIgZSA9IG5ldyBFcnJvcihtZXNzYWdlKSBhcyBhbnk7XHJcbiAgICAgICAgICAgIGUuc291cmNlID0gc291cmNlO1xyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBjb250ZXh0ICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgICAgICBlLmNvbnRleHQgPSBjb250ZXh0O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB0cmFuc3BvcnRFcnJvcjogZnVuY3Rpb24gKG1lc3NhZ2UsIHRyYW5zcG9ydCwgc291cmNlLCBjb250ZXh0KSB7XHJcbiAgICAgICAgICAgIHZhciBlID0gdGhpcy5lcnJvcihtZXNzYWdlLCBzb3VyY2UsIGNvbnRleHQpO1xyXG4gICAgICAgICAgICBlLnRyYW5zcG9ydCA9IHRyYW5zcG9ydCA/IHRyYW5zcG9ydC5uYW1lIDogdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICByZXR1cm4gZTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBmb3JtYXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8vIDxzdW1tYXJ5PlVzYWdlOiBmb3JtYXQoXCJIaSB7MH0sIHlvdSBhcmUgezF9IVwiLCBcIkZvb1wiLCAxMDApIDwvc3VtbWFyeT5cclxuICAgICAgICAgICAgdmFyIHMgPSBhcmd1bWVudHNbMF07XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aCAtIDE7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgcyA9IHMucmVwbGFjZShcIntcIiArIGkgKyBcIn1cIiwgYXJndW1lbnRzW2kgKyAxXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHM7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZmlyZWZveE1ham9yVmVyc2lvbjogZnVuY3Rpb24gKHVzZXJBZ2VudCkge1xyXG4gICAgICAgICAgICAvLyBGaXJlZm94IHVzZXIgYWdlbnRzOiBodHRwOi8vdXNlcmFnZW50c3RyaW5nLmNvbS9wYWdlcy9GaXJlZm94L1xyXG4gICAgICAgICAgICB2YXIgbWF0Y2hlcyA9IHVzZXJBZ2VudC5tYXRjaCgvRmlyZWZveFxcLyhcXGQrKS8pO1xyXG4gICAgICAgICAgICBpZiAoIW1hdGNoZXMgfHwgIW1hdGNoZXMubGVuZ3RoIHx8IG1hdGNoZXMubGVuZ3RoIDwgMikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KG1hdGNoZXNbMV0sIDEwIC8qIHJhZGl4ICovKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjb25maWd1cmVQaW5nSW50ZXJ2YWw6IGZ1bmN0aW9uIChjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIHZhciBjb25maWcgPSBjb25uZWN0aW9uLl8uY29uZmlnLFxyXG4gICAgICAgICAgICAgICAgb25GYWlsID0gZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJChjb25uZWN0aW9uKS50cmlnZ2VySGFuZGxlcihldmVudHMub25FcnJvciwgW2Vycm9yXSk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgaWYgKGNvbmZpZyAmJiAhY29ubmVjdGlvbi5fLnBpbmdJbnRlcnZhbElkICYmIGNvbmZpZy5waW5nSW50ZXJ2YWwpIHtcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uXy5waW5nSW50ZXJ2YWxJZCA9IHdpbmRvdy5zZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2lnbmFsUi50cmFuc3BvcnRzLl9sb2dpYy5waW5nU2VydmVyKGNvbm5lY3Rpb24pLmZhaWwob25GYWlsKTtcclxuICAgICAgICAgICAgICAgIH0sIGNvbmZpZy5waW5nSW50ZXJ2YWwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBzaWduYWxSLmV2ZW50cyA9IGV2ZW50cztcclxuXHJcbiAgICBzaWduYWxSLnJlc291cmNlcyA9IHJlc291cmNlcztcclxuXHJcbiAgICBzaWduYWxSLmFqYXhEZWZhdWx0cyA9IGFqYXhEZWZhdWx0cztcclxuXHJcbiAgICBzaWduYWxSLmNoYW5nZVN0YXRlID0gY2hhbmdlU3RhdGU7XHJcblxyXG4gICAgc2lnbmFsUi5pc0Rpc2Nvbm5lY3RpbmcgPSBpc0Rpc2Nvbm5lY3Rpbmc7XHJcblxyXG4gICAgc2lnbmFsUi5jb25uZWN0aW9uU3RhdGUgPSB7XHJcbiAgICAgICAgY29ubmVjdGluZzogMCxcclxuICAgICAgICBjb25uZWN0ZWQ6IDEsXHJcbiAgICAgICAgcmVjb25uZWN0aW5nOiAyLFxyXG4gICAgICAgIGRpc2Nvbm5lY3RlZDogNFxyXG4gICAgfTtcclxuXHJcbiAgICBzaWduYWxSLmh1YiA9IHtcclxuICAgICAgICBzdGFydDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyBUaGlzIHdpbGwgZ2V0IHJlcGxhY2VkIHdpdGggdGhlIHJlYWwgaHViIGNvbm5lY3Rpb24gc3RhcnQgbWV0aG9kIHdoZW4gaHVicyBpcyByZWZlcmVuY2VkIGNvcnJlY3RseVxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJTaWduYWxSOiBFcnJvciBsb2FkaW5nIGh1YnMuIEVuc3VyZSB5b3VyIGh1YnMgcmVmZXJlbmNlIGlzIGNvcnJlY3QsIGUuZy4gPHNjcmlwdCBzcmM9Jy9zaWduYWxyL2pzJz48L3NjcmlwdD4uXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLy8gLm9uKCkgd2FzIGFkZGVkIGluIHZlcnNpb24gMS43LjAsIC5sb2FkKCkgd2FzIHJlbW92ZWQgaW4gdmVyc2lvbiAzLjAuMCBzbyB3ZSBmYWxsYmFjayB0byAubG9hZCgpIGlmIC5vbigpIGRvZXNcclxuICAgIC8vIG5vdCBleGlzdCB0byBub3QgYnJlYWsgZXhpc3RpbmcgYXBwbGljYXRpb25zXHJcbiAgICBpZiAodHlwZW9mIF9wYWdlV2luZG93Lm9uID09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgIF9wYWdlV2luZG93Lm9uKFwibG9hZFwiLCBmdW5jdGlvbiAoKSB7IF9wYWdlTG9hZGVkID0gdHJ1ZTsgfSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBfcGFnZVdpbmRvdy5sb2FkKGZ1bmN0aW9uICgpIHsgX3BhZ2VMb2FkZWQgPSB0cnVlOyB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZVRyYW5zcG9ydChyZXF1ZXN0ZWRUcmFuc3BvcnQsIGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAvLy8gPHN1bW1hcnk+VmFsaWRhdGVzIHRoZSByZXF1ZXN0ZWQgdHJhbnNwb3J0IGJ5IGNyb3NzIGNoZWNraW5nIGl0IHdpdGggdGhlIHByZS1kZWZpbmVkIHNpZ25hbFIudHJhbnNwb3J0czwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJyZXF1ZXN0ZWRUcmFuc3BvcnRcIiB0eXBlPVwiT2JqZWN0XCI+VGhlIGRlc2lnbmF0ZWQgdHJhbnNwb3J0cyB0aGF0IHRoZSB1c2VyIGhhcyBzcGVjaWZpZWQuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJjb25uZWN0aW9uXCIgdHlwZT1cInNpZ25hbFJcIj5UaGUgY29ubmVjdGlvbiB0aGF0IHdpbGwgYmUgdXNpbmcgdGhlIHJlcXVlc3RlZCB0cmFuc3BvcnRzLiAgVXNlZCBmb3IgbG9nZ2luZyBwdXJwb3Nlcy48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cmV0dXJucyB0eXBlPVwiT2JqZWN0XCIgLz5cclxuXHJcbiAgICAgICAgaWYgKCQuaXNBcnJheShyZXF1ZXN0ZWRUcmFuc3BvcnQpKSB7XHJcbiAgICAgICAgICAgIC8vIEdvIHRocm91Z2ggdHJhbnNwb3J0IGFycmF5IGFuZCByZW1vdmUgYW4gXCJpbnZhbGlkXCIgdHJhbnBvcnRzXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSByZXF1ZXN0ZWRUcmFuc3BvcnQubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgICAgIHZhciB0cmFuc3BvcnQgPSByZXF1ZXN0ZWRUcmFuc3BvcnRbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAoJC50eXBlKHRyYW5zcG9ydCkgIT09IFwic3RyaW5nXCIgfHwgIXNpZ25hbFIudHJhbnNwb3J0c1t0cmFuc3BvcnRdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5sb2coXCJJbnZhbGlkIHRyYW5zcG9ydDogXCIgKyB0cmFuc3BvcnQgKyBcIiwgcmVtb3ZpbmcgaXQgZnJvbSB0aGUgdHJhbnNwb3J0cyBsaXN0LlwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0ZWRUcmFuc3BvcnQuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBWZXJpZnkgd2Ugc3RpbGwgaGF2ZSB0cmFuc3BvcnRzIGxlZnQsIGlmIHdlIGRvbnQgdGhlbiB3ZSBoYXZlIGludmFsaWQgdHJhbnNwb3J0c1xyXG4gICAgICAgICAgICBpZiAocmVxdWVzdGVkVHJhbnNwb3J0Lmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5sb2coXCJObyB0cmFuc3BvcnRzIHJlbWFpbiB3aXRoaW4gdGhlIHNwZWNpZmllZCB0cmFuc3BvcnQgYXJyYXkuXCIpO1xyXG4gICAgICAgICAgICAgICAgcmVxdWVzdGVkVHJhbnNwb3J0ID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoIXNpZ25hbFIudHJhbnNwb3J0c1tyZXF1ZXN0ZWRUcmFuc3BvcnRdICYmIHJlcXVlc3RlZFRyYW5zcG9ydCAhPT0gXCJhdXRvXCIpIHtcclxuICAgICAgICAgICAgY29ubmVjdGlvbi5sb2coXCJJbnZhbGlkIHRyYW5zcG9ydDogXCIgKyByZXF1ZXN0ZWRUcmFuc3BvcnQudG9TdHJpbmcoKSArIFwiLlwiKTtcclxuICAgICAgICAgICAgcmVxdWVzdGVkVHJhbnNwb3J0ID0gbnVsbDtcclxuICAgICAgICB9IGVsc2UgaWYgKHJlcXVlc3RlZFRyYW5zcG9ydCA9PT0gXCJhdXRvXCIgJiYgc2lnbmFsUi5fLmllVmVyc2lvbiA8PSA4KSB7XHJcbiAgICAgICAgICAgIC8vIElmIHdlJ3JlIGRvaW5nIGFuIGF1dG8gdHJhbnNwb3J0IGFuZCB3ZSdyZSBJRTggdGhlbiBmb3JjZSBsb25nUG9sbGluZywgIzE3NjRcclxuICAgICAgICAgICAgcmV0dXJuIFtcImxvbmdQb2xsaW5nXCJdO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZXF1ZXN0ZWRUcmFuc3BvcnQ7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0RGVmYXVsdFBvcnQocHJvdG9jb2wpIHtcclxuICAgICAgICBpZiAocHJvdG9jb2wgPT09IFwiaHR0cDpcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gODA7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwcm90b2NvbCA9PT0gXCJodHRwczpcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gNDQzO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhZGREZWZhdWx0UG9ydChwcm90b2NvbCwgdXJsKSB7XHJcbiAgICAgICAgLy8gUmVtb3ZlIHBvcnRzICBmcm9tIHVybC4gIFdlIGhhdmUgdG8gY2hlY2sgaWYgdGhlcmUncyBhIC8gb3IgZW5kIG9mIGxpbmVcclxuICAgICAgICAvLyBmb2xsb3dpbmcgdGhlIHBvcnQgaW4gb3JkZXIgdG8gYXZvaWQgcmVtb3ZpbmcgcG9ydHMgc3VjaCBhcyA4MDgwLlxyXG4gICAgICAgIGlmICh1cmwubWF0Y2goLzpcXGQrJC8pKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1cmw7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVybCArIFwiOlwiICsgZ2V0RGVmYXVsdFBvcnQocHJvdG9jb2wpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBDb25uZWN0aW5nTWVzc2FnZUJ1ZmZlcihjb25uZWN0aW9uLCBkcmFpbkNhbGxiYWNrKSB7XHJcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzLFxyXG4gICAgICAgICAgICBidWZmZXIgPSBbXTtcclxuXHJcbiAgICAgICAgdGhhdC50cnlCdWZmZXIgPSBmdW5jdGlvbiAobWVzc2FnZSkge1xyXG4gICAgICAgICAgICBpZiAoY29ubmVjdGlvbi5zdGF0ZSA9PT0gJC5zaWduYWxSLmNvbm5lY3Rpb25TdGF0ZS5jb25uZWN0aW5nKSB7XHJcbiAgICAgICAgICAgICAgICBidWZmZXIucHVzaChtZXNzYWdlKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoYXQuZHJhaW4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vIEVuc3VyZSB0aGF0IHRoZSBjb25uZWN0aW9uIGlzIGNvbm5lY3RlZCB3aGVuIHdlIGRyYWluIChkbyBub3Qgd2FudCB0byBkcmFpbiB3aGlsZSBhIGNvbm5lY3Rpb24gaXMgbm90IGFjdGl2ZSlcclxuICAgICAgICAgICAgaWYgKGNvbm5lY3Rpb24uc3RhdGUgPT09ICQuc2lnbmFsUi5jb25uZWN0aW9uU3RhdGUuY29ubmVjdGVkKSB7XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAoYnVmZmVyLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBkcmFpbkNhbGxiYWNrKGJ1ZmZlci5zaGlmdCgpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoYXQuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGJ1ZmZlciA9IFtdO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgc2lnbmFsUi5mbiA9IHNpZ25hbFIucHJvdG90eXBlID0ge1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICh1cmwsIHFzLCBsb2dnaW5nKSB7XHJcbiAgICAgICAgICAgIHZhciAkY29ubmVjdGlvbiA9ICQodGhpcyk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnVybCA9IHVybDtcclxuICAgICAgICAgICAgdGhpcy5xcyA9IHFzO1xyXG4gICAgICAgICAgICB0aGlzLmxhc3RFcnJvciA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuXyA9IHtcclxuICAgICAgICAgICAgICAgIGtlZXBBbGl2ZURhdGE6IHt9LFxyXG4gICAgICAgICAgICAgICAgY29ubmVjdGluZ01lc3NhZ2VCdWZmZXI6IG5ldyBDb25uZWN0aW5nTWVzc2FnZUJ1ZmZlcih0aGlzLCBmdW5jdGlvbiAobWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICRjb25uZWN0aW9uLnRyaWdnZXJIYW5kbGVyKGV2ZW50cy5vblJlY2VpdmVkLCBbbWVzc2FnZV0pO1xyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBsYXN0TWVzc2FnZUF0OiBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcclxuICAgICAgICAgICAgICAgIGxhc3RBY3RpdmVBdDogbmV3IERhdGUoKS5nZXRUaW1lKCksXHJcbiAgICAgICAgICAgICAgICBiZWF0SW50ZXJ2YWw6IDUwMDAsIC8vIERlZmF1bHQgdmFsdWUsIHdpbGwgb25seSBiZSBvdmVycmlkZGVuIGlmIGtlZXAgYWxpdmUgaXMgZW5hYmxlZCxcclxuICAgICAgICAgICAgICAgIGJlYXRIYW5kbGU6IG51bGwsXHJcbiAgICAgICAgICAgICAgICB0b3RhbFRyYW5zcG9ydENvbm5lY3RUaW1lb3V0OiAwIC8vIFRoaXMgd2lsbCBiZSB0aGUgc3VtIG9mIHRoZSBUcmFuc3BvcnRDb25uZWN0VGltZW91dCBzZW50IGluIHJlc3BvbnNlIHRvIG5lZ290aWF0ZSBhbmQgY29ubmVjdGlvbi50cmFuc3BvcnRDb25uZWN0VGltZW91dFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIChsb2dnaW5nKSA9PT0gXCJib29sZWFuXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9nZ2luZyA9IGxvZ2dpbmc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBfcGFyc2VSZXNwb25zZTogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGlmICghcmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcmVzcG9uc2UgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGF0Lmpzb24ucGFyc2UocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgX29yaWdpbmFsSnNvbjogSlNPTixcclxuXHJcbiAgICAgICAganNvbjogSlNPTixcclxuXHJcbiAgICAgICAgaXNDcm9zc0RvbWFpbjogZnVuY3Rpb24gKHVybCwgYWdhaW5zdCkge1xyXG4gICAgICAgICAgICAvLy8gPHN1bW1hcnk+Q2hlY2tzIGlmIHVybCBpcyBjcm9zcyBkb21haW48L3N1bW1hcnk+XHJcbiAgICAgICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInVybFwiIHR5cGU9XCJTdHJpbmdcIj5UaGUgYmFzZSBVUkw8L3BhcmFtPlxyXG4gICAgICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJhZ2FpbnN0XCIgdHlwZT1cIk9iamVjdFwiPlxyXG4gICAgICAgICAgICAvLy8gICAgIEFuIG9wdGlvbmFsIGFyZ3VtZW50IHRvIGNvbXBhcmUgdGhlIFVSTCBhZ2FpbnN0LCBpZiBub3Qgc3BlY2lmaWVkIGl0IHdpbGwgYmUgc2V0IHRvIHdpbmRvdy5sb2NhdGlvbi5cclxuICAgICAgICAgICAgLy8vICAgICBJZiBzcGVjaWZpZWQgaXQgbXVzdCBjb250YWluIGEgcHJvdG9jb2wgYW5kIGEgaG9zdCBwcm9wZXJ0eS5cclxuICAgICAgICAgICAgLy8vIDwvcGFyYW0+XHJcbiAgICAgICAgICAgIHZhciBsaW5rO1xyXG5cclxuICAgICAgICAgICAgdXJsID0gJC50cmltKHVybCk7XHJcblxyXG4gICAgICAgICAgICBhZ2FpbnN0ID0gYWdhaW5zdCB8fCB3aW5kb3cubG9jYXRpb247XHJcblxyXG4gICAgICAgICAgICBpZiAodXJsLmluZGV4T2YoXCJodHRwXCIpICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBhbiBhbmNob3IgdGFnLlxyXG4gICAgICAgICAgICBsaW5rID0gd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xyXG4gICAgICAgICAgICBsaW5rLmhyZWYgPSB1cmw7XHJcblxyXG4gICAgICAgICAgICAvLyBXaGVuIGNoZWNraW5nIGZvciBjcm9zcyBkb21haW4gd2UgaGF2ZSB0byBzcGVjaWFsIGNhc2UgcG9ydCA4MCBiZWNhdXNlIHRoZSB3aW5kb3cubG9jYXRpb24gd2lsbCByZW1vdmUgdGhlXHJcbiAgICAgICAgICAgIHJldHVybiBsaW5rLnByb3RvY29sICsgYWRkRGVmYXVsdFBvcnQobGluay5wcm90b2NvbCwgbGluay5ob3N0KSAhPT0gYWdhaW5zdC5wcm90b2NvbCArIGFkZERlZmF1bHRQb3J0KGFnYWluc3QucHJvdG9jb2wsIGFnYWluc3QuaG9zdCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYWpheERhdGFUeXBlOiBcInRleHRcIixcclxuXHJcbiAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD1VVEYtOFwiLFxyXG5cclxuICAgICAgICBsb2dnaW5nOiBmYWxzZSxcclxuXHJcbiAgICAgICAgc3RhdGU6IHNpZ25hbFIuY29ubmVjdGlvblN0YXRlLmRpc2Nvbm5lY3RlZCxcclxuXHJcbiAgICAgICAgY2xpZW50UHJvdG9jb2w6IFwiMS41XCIsXHJcblxyXG4gICAgICAgIHJlY29ubmVjdERlbGF5OiAyMDAwLFxyXG5cclxuICAgICAgICB0cmFuc3BvcnRDb25uZWN0VGltZW91dDogMCxcclxuXHJcbiAgICAgICAgZGlzY29ubmVjdFRpbWVvdXQ6IDMwMDAwLCAvLyBUaGlzIHNob3VsZCBiZSBzZXQgYnkgdGhlIHNlcnZlciBpbiByZXNwb25zZSB0byB0aGUgbmVnb3RpYXRlIHJlcXVlc3QgKDMwcyBkZWZhdWx0KVxyXG5cclxuICAgICAgICByZWNvbm5lY3RXaW5kb3c6IDMwMDAwLCAvLyBUaGlzIHNob3VsZCBiZSBzZXQgYnkgdGhlIHNlcnZlciBpbiByZXNwb25zZSB0byB0aGUgbmVnb3RpYXRlIHJlcXVlc3RcclxuXHJcbiAgICAgICAga2VlcEFsaXZlV2FybkF0OiAyIC8gMywgLy8gV2FybiB1c2VyIG9mIHNsb3cgY29ubmVjdGlvbiBpZiB3ZSBicmVhY2ggdGhlIFglIG1hcmsgb2YgdGhlIGtlZXAgYWxpdmUgdGltZW91dFxyXG5cclxuICAgICAgICBzdGFydDogZnVuY3Rpb24gKG9wdGlvbnMsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIC8vLyA8c3VtbWFyeT5TdGFydHMgdGhlIGNvbm5lY3Rpb248L3N1bW1hcnk+XHJcbiAgICAgICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cIm9wdGlvbnNcIiB0eXBlPVwiT2JqZWN0XCI+T3B0aW9ucyBtYXA8L3BhcmFtPlxyXG4gICAgICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJjYWxsYmFja1wiIHR5cGU9XCJGdW5jdGlvblwiPkEgY2FsbGJhY2sgZnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBjb25uZWN0aW9uIGhhcyBzdGFydGVkPC9wYXJhbT5cclxuICAgICAgICAgICAgdmFyIGNvbm5lY3Rpb24gPSB0aGlzLFxyXG4gICAgICAgICAgICAgICAgY29uZmlnID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHBpbmdJbnRlcnZhbDogMzAwMDAwLFxyXG4gICAgICAgICAgICAgICAgICAgIHdhaXRGb3JQYWdlTG9hZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnQ6IFwiYXV0b1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGpzb25wOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICB9IGFzIGFueSxcclxuICAgICAgICAgICAgICAgIGluaXRpYWxpemUsXHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZCA9IGNvbm5lY3Rpb24uX2RlZmVycmFsIHx8ICQuRGVmZXJyZWQoKSwgLy8gQ2hlY2sgdG8gc2VlIGlmIHRoZXJlIGlzIGEgcHJlLWV4aXN0aW5nIGRlZmVycmFsIHRoYXQncyBiZWluZyBidWlsdCBvbiwgaWYgc28gd2Ugd2FudCB0byBrZWVwIHVzaW5nIGl0XHJcbiAgICAgICAgICAgICAgICBwYXJzZXIgPSB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XHJcblxyXG4gICAgICAgICAgICBjb25uZWN0aW9uLmxhc3RFcnJvciA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICAvLyBQZXJzaXN0IHRoZSBkZWZlcnJhbCBzbyB0aGF0IGlmIHN0YXJ0IGlzIGNhbGxlZCBtdWx0aXBsZSB0aW1lcyB0aGUgc2FtZSBkZWZlcnJhbCBpcyB1c2VkLlxyXG4gICAgICAgICAgICBjb25uZWN0aW9uLl9kZWZlcnJhbCA9IGRlZmVycmVkO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFjb25uZWN0aW9uLmpzb24pIHtcclxuICAgICAgICAgICAgICAgIC8vIG5vIEpTT04hXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJTaWduYWxSOiBObyBKU09OIHBhcnNlciBmb3VuZC4gUGxlYXNlIGVuc3VyZSBqc29uMi5qcyBpcyByZWZlcmVuY2VkIGJlZm9yZSB0aGUgU2lnbmFsUi5qcyBmaWxlIGlmIHlvdSBuZWVkIHRvIHN1cHBvcnQgY2xpZW50cyB3aXRob3V0IG5hdGl2ZSBKU09OIHBhcnNpbmcgc3VwcG9ydCwgZS5nLiBJRTw4LlwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCQudHlwZShvcHRpb25zKSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBTdXBwb3J0IGNhbGxpbmcgd2l0aCBzaW5nbGUgY2FsbGJhY2sgcGFyYW1ldGVyXHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayA9IG9wdGlvbnM7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoJC50eXBlKG9wdGlvbnMpID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAkLmV4dGVuZChjb25maWcsIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCQudHlwZShjb25maWcuY2FsbGJhY2spID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayA9IGNvbmZpZy5jYWxsYmFjaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uZmlnLnRyYW5zcG9ydCA9IHZhbGlkYXRlVHJhbnNwb3J0KGNvbmZpZy50cmFuc3BvcnQsIGNvbm5lY3Rpb24pO1xyXG5cclxuICAgICAgICAgICAgLy8gSWYgdGhlIHRyYW5zcG9ydCBpcyBpbnZhbGlkIHRocm93IGFuIGVycm9yIGFuZCBhYm9ydCBzdGFydFxyXG4gICAgICAgICAgICBpZiAoIWNvbmZpZy50cmFuc3BvcnQpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlNpZ25hbFI6IEludmFsaWQgdHJhbnNwb3J0KHMpIHNwZWNpZmllZCwgYWJvcnRpbmcgc3RhcnQuXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25uZWN0aW9uLl8uY29uZmlnID0gY29uZmlnO1xyXG5cclxuICAgICAgICAgICAgLy8gQ2hlY2sgdG8gc2VlIGlmIHN0YXJ0IGlzIGJlaW5nIGNhbGxlZCBwcmlvciB0byBwYWdlIGxvYWRcclxuICAgICAgICAgICAgLy8gSWYgd2FpdEZvclBhZ2VMb2FkIGlzIHRydWUgd2UgdGhlbiB3YW50IHRvIHJlLWRpcmVjdCBmdW5jdGlvbiBjYWxsIHRvIHRoZSB3aW5kb3cgbG9hZCBldmVudFxyXG4gICAgICAgICAgICBpZiAoIV9wYWdlTG9hZGVkICYmIGNvbmZpZy53YWl0Rm9yUGFnZUxvYWQgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uXy5kZWZlcnJlZFN0YXJ0SGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnN0YXJ0KG9wdGlvbnMsIGNhbGxiYWNrKTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBfcGFnZVdpbmRvdy5iaW5kKFwibG9hZFwiLCBjb25uZWN0aW9uLl8uZGVmZXJyZWRTdGFydEhhbmRsZXIpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIElmIHdlJ3JlIGFscmVhZHkgY29ubmVjdGluZyBqdXN0IHJldHVybiB0aGUgc2FtZSBkZWZlcnJhbCBhcyB0aGUgb3JpZ2luYWwgY29ubmVjdGlvbiBzdGFydFxyXG4gICAgICAgICAgICBpZiAoY29ubmVjdGlvbi5zdGF0ZSA9PT0gc2lnbmFsUi5jb25uZWN0aW9uU3RhdGUuY29ubmVjdGluZykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjaGFuZ2VTdGF0ZShjb25uZWN0aW9uLFxyXG4gICAgICAgICAgICAgICAgc2lnbmFsUi5jb25uZWN0aW9uU3RhdGUuZGlzY29ubmVjdGVkLFxyXG4gICAgICAgICAgICAgICAgc2lnbmFsUi5jb25uZWN0aW9uU3RhdGUuY29ubmVjdGluZykgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBXZSdyZSBub3QgY29ubmVjdGluZyBzbyB0cnkgYW5kIHRyYW5zaXRpb24gaW50byBjb25uZWN0aW5nLlxyXG4gICAgICAgICAgICAgICAgLy8gSWYgd2UgZmFpbCB0byB0cmFuc2l0aW9uIHRoZW4gd2UncmUgZWl0aGVyIGluIGNvbm5lY3RlZCBvciByZWNvbm5lY3RpbmcuXHJcblxyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShjb25uZWN0aW9uKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbmZpZ3VyZVN0b3BSZWNvbm5lY3RpbmdUaW1lb3V0KGNvbm5lY3Rpb24pO1xyXG5cclxuICAgICAgICAgICAgLy8gUmVzb2x2ZSB0aGUgZnVsbCB1cmxcclxuICAgICAgICAgICAgcGFyc2VyLmhyZWYgPSBjb25uZWN0aW9uLnVybDtcclxuICAgICAgICAgICAgaWYgKCFwYXJzZXIucHJvdG9jb2wgfHwgcGFyc2VyLnByb3RvY29sID09PSBcIjpcIikge1xyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5wcm90b2NvbCA9IHdpbmRvdy5kb2N1bWVudC5sb2NhdGlvbi5wcm90b2NvbDtcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uaG9zdCA9IHBhcnNlci5ob3N0IHx8IHdpbmRvdy5kb2N1bWVudC5sb2NhdGlvbi5ob3N0O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5wcm90b2NvbCA9IHBhcnNlci5wcm90b2NvbDtcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uaG9zdCA9IHBhcnNlci5ob3N0O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25uZWN0aW9uLmJhc2VVcmwgPSBjb25uZWN0aW9uLnByb3RvY29sICsgXCIvL1wiICsgY29ubmVjdGlvbi5ob3N0O1xyXG5cclxuICAgICAgICAgICAgLy8gU2V0IHRoZSB3ZWJzb2NrZXQgcHJvdG9jb2xcclxuICAgICAgICAgICAgY29ubmVjdGlvbi53c1Byb3RvY29sID0gY29ubmVjdGlvbi5wcm90b2NvbCA9PT0gXCJodHRwczpcIiA/IFwid3NzOi8vXCIgOiBcIndzOi8vXCI7XHJcblxyXG4gICAgICAgICAgICAvLyBJZiBqc29ucCB3aXRoIG5vL2F1dG8gdHJhbnNwb3J0IGlzIHNwZWNpZmllZCwgdGhlbiBzZXQgdGhlIHRyYW5zcG9ydCB0byBsb25nIHBvbGxpbmdcclxuICAgICAgICAgICAgLy8gc2luY2UgdGhhdCBpcyB0aGUgb25seSB0cmFuc3BvcnQgZm9yIHdoaWNoIGpzb25wIHJlYWxseSBtYWtlcyBzZW5zZS5cclxuICAgICAgICAgICAgLy8gU29tZSBkZXZlbG9wZXJzIG1pZ2h0IGFjdHVhbGx5IGNob29zZSB0byBzcGVjaWZ5IGpzb25wIGZvciBzYW1lIG9yaWdpbiByZXF1ZXN0c1xyXG4gICAgICAgICAgICAvLyBhcyBkZW1vbnN0cmF0ZWQgYnkgSXNzdWUgIzYyMy5cclxuICAgICAgICAgICAgaWYgKGNvbmZpZy50cmFuc3BvcnQgPT09IFwiYXV0b1wiICYmIGNvbmZpZy5qc29ucCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgY29uZmlnLnRyYW5zcG9ydCA9IFwibG9uZ1BvbGxpbmdcIjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gSWYgdGhlIHVybCBpcyBwcm90b2NvbCByZWxhdGl2ZSwgcHJlcGVuZCB0aGUgY3VycmVudCB3aW5kb3dzIHByb3RvY29sIHRvIHRoZSB1cmwuXHJcbiAgICAgICAgICAgIGlmIChjb25uZWN0aW9uLnVybC5pbmRleE9mKFwiLy9cIikgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24udXJsID0gd2luZG93LmxvY2F0aW9uLnByb3RvY29sICsgY29ubmVjdGlvbi51cmw7XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmxvZyhcIlByb3RvY29sIHJlbGF0aXZlIFVSTCBkZXRlY3RlZCwgbm9ybWFsaXppbmcgaXQgdG8gJ1wiICsgY29ubmVjdGlvbi51cmwgKyBcIicuXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5pc0Nyb3NzRG9tYWluKGNvbm5lY3Rpb24udXJsKSkge1xyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5sb2coXCJBdXRvIGRldGVjdGVkIGNyb3NzIGRvbWFpbiB1cmwuXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjb25maWcudHJhbnNwb3J0ID09PSBcImF1dG9cIikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IFN1cHBvcnQgWERNIHdpdGggZm9yZXZlckZyYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnLnRyYW5zcG9ydCA9IFtcIndlYlNvY2tldHNcIiwgXCJzZXJ2ZXJTZW50RXZlbnRzXCIsIFwibG9uZ1BvbGxpbmdcIl07XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiAoY29uZmlnLndpdGhDcmVkZW50aWFscykgPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25maWcud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBEZXRlcm1pbmUgaWYganNvbnAgaXMgdGhlIG9ubHkgY2hvaWNlIGZvciBuZWdvdGlhdGlvbiwgYWpheFNlbmQgYW5kIGFqYXhBYm9ydC5cclxuICAgICAgICAgICAgICAgIC8vIGkuZS4gaWYgdGhlIGJyb3dzZXIgZG9lc24ndCBzdXBwb3J0cyBDT1JTXHJcbiAgICAgICAgICAgICAgICAvLyBJZiBpdCBpcywgaWdub3JlIGFueSBwcmVmZXJlbmNlIHRvIHRoZSBjb250cmFyeSwgYW5kIHN3aXRjaCB0byBqc29ucC5cclxuICAgICAgICAgICAgICAgIGlmICghY29uZmlnLmpzb25wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnLmpzb25wID0gISQuc3VwcG9ydC5jb3JzO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoY29uZmlnLmpzb25wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKFwiVXNpbmcganNvbnAgYmVjYXVzZSB0aGlzIGJyb3dzZXIgZG9lc24ndCBzdXBwb3J0IENPUlMuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmNvbnRlbnRUeXBlID0gc2lnbmFsUi5fLmRlZmF1bHRDb250ZW50VHlwZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29ubmVjdGlvbi53aXRoQ3JlZGVudGlhbHMgPSBjb25maWcud2l0aENyZWRlbnRpYWxzO1xyXG5cclxuICAgICAgICAgICAgY29ubmVjdGlvbi5hamF4RGF0YVR5cGUgPSBjb25maWcuanNvbnAgPyBcImpzb25wXCIgOiBcInRleHRcIjtcclxuXHJcbiAgICAgICAgICAgICQoY29ubmVjdGlvbikuYmluZChldmVudHMub25TdGFydCwgZnVuY3Rpb24gKGUsIGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmICgkLnR5cGUoY2FsbGJhY2spID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKGNvbm5lY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShjb25uZWN0aW9uKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjb25uZWN0aW9uLl8uaW5pdEhhbmRsZXIgPSBzaWduYWxSLnRyYW5zcG9ydHMuX2xvZ2ljLmluaXRIYW5kbGVyKGNvbm5lY3Rpb24pO1xyXG5cclxuICAgICAgICAgICAgaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uICh0cmFuc3BvcnRzLCBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG5vVHJhbnNwb3J0RXJyb3IgPSBzaWduYWxSLl8uZXJyb3IocmVzb3VyY2VzLm5vVHJhbnNwb3J0T25Jbml0KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpbmRleCA9IGluZGV4IHx8IDA7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPj0gdHJhbnNwb3J0cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5sb2coXCJObyB0cmFuc3BvcnRzIHN1cHBvcnRlZCBieSB0aGUgc2VydmVyIHdlcmUgc2VsZWN0ZWQuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaW5kZXggPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5sb2coXCJObyBmYWxsYmFjayB0cmFuc3BvcnRzIHdlcmUgc2VsZWN0ZWQuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKFwiRmFsbGJhY2sgdHJhbnNwb3J0cyBleGhhdXN0ZWQuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gTm8gdHJhbnNwb3J0IGluaXRpYWxpemVkIHN1Y2Nlc3NmdWxseVxyXG4gICAgICAgICAgICAgICAgICAgICQoY29ubmVjdGlvbikudHJpZ2dlckhhbmRsZXIoZXZlbnRzLm9uRXJyb3IsIFtub1RyYW5zcG9ydEVycm9yXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KG5vVHJhbnNwb3J0RXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFN0b3AgdGhlIGNvbm5lY3Rpb24gaWYgaXQgaGFzIGNvbm5lY3RlZCBhbmQgbW92ZSBpdCBpbnRvIHRoZSBkaXNjb25uZWN0ZWQgc3RhdGVcclxuICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnN0b3AoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gVGhlIGNvbm5lY3Rpb24gd2FzIGFib3J0ZWRcclxuICAgICAgICAgICAgICAgIGlmIChjb25uZWN0aW9uLnN0YXRlID09PSBzaWduYWxSLmNvbm5lY3Rpb25TdGF0ZS5kaXNjb25uZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHRyYW5zcG9ydE5hbWUgPSB0cmFuc3BvcnRzW2luZGV4XSxcclxuICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnQgPSBzaWduYWxSLnRyYW5zcG9ydHNbdHJhbnNwb3J0TmFtZV0sXHJcbiAgICAgICAgICAgICAgICAgICAgb25GYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbGl6ZSh0cmFuc3BvcnRzLCBpbmRleCArIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi50cmFuc3BvcnQgPSB0cmFuc3BvcnQ7XHJcblxyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLl8uaW5pdEhhbmRsZXIuc3RhcnQodHJhbnNwb3J0LCBmdW5jdGlvbiAoKSB7IC8vIHN1Y2Nlc3NcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRmlyZWZveCAxMSsgZG9lc24ndCBhbGxvdyBzeW5jIFhIUiB3aXRoQ3JlZGVudGlhbHM6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9YTUxIdHRwUmVxdWVzdCN3aXRoQ3JlZGVudGlhbHNcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlzRmlyZWZveDExT3JHcmVhdGVyID0gc2lnbmFsUi5fLmZpcmVmb3hNYWpvclZlcnNpb24od2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQpID49IDExLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXN5bmNBYm9ydCA9ICEhY29ubmVjdGlvbi53aXRoQ3JlZGVudGlhbHMgJiYgaXNGaXJlZm94MTFPckdyZWF0ZXI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmxvZyhcIlRoZSBzdGFydCByZXF1ZXN0IHN1Y2NlZWRlZC4gVHJhbnNpdGlvbmluZyB0byB0aGUgY29ubmVjdGVkIHN0YXRlLlwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdXBwb3J0c0tlZXBBbGl2ZShjb25uZWN0aW9uKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2lnbmFsUi50cmFuc3BvcnRzLl9sb2dpYy5tb25pdG9yS2VlcEFsaXZlKGNvbm5lY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaWduYWxSLnRyYW5zcG9ydHMuX2xvZ2ljLnN0YXJ0SGVhcnRiZWF0KGNvbm5lY3Rpb24pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVXNlZCB0byBlbnN1cmUgbG93IGFjdGl2aXR5IGNsaWVudHMgbWFpbnRhaW4gdGhlaXIgYXV0aGVudGljYXRpb24uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE11c3QgYmUgY29uZmlndXJlZCBvbmNlIGEgdHJhbnNwb3J0IGhhcyBiZWVuIGRlY2lkZWQgdG8gcGVyZm9ybSB2YWxpZCBwaW5nIHJlcXVlc3RzLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaWduYWxSLl8uY29uZmlndXJlUGluZ0ludGVydmFsKGNvbm5lY3Rpb24pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjaGFuZ2VTdGF0ZShjb25uZWN0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2lnbmFsUi5jb25uZWN0aW9uU3RhdGUuY29ubmVjdGluZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25hbFIuY29ubmVjdGlvblN0YXRlLmNvbm5lY3RlZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKFwiV0FSTklORyEgVGhlIGNvbm5lY3Rpb24gd2FzIG5vdCBpbiB0aGUgY29ubmVjdGluZyBzdGF0ZS5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIERyYWluIGFueSBpbmNvbWluZyBidWZmZXJlZCBtZXNzYWdlcyAobWVzc2FnZXMgdGhhdCBjYW1lIGluIHByaW9yIHRvIGNvbm5lY3QpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uXy5jb25uZWN0aW5nTWVzc2FnZUJ1ZmZlci5kcmFpbigpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJChjb25uZWN0aW9uKS50cmlnZ2VySGFuZGxlcihldmVudHMub25TdGFydCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB3aXJlIHRoZSBzdG9wIGhhbmRsZXIgZm9yIHdoZW4gdGhlIHVzZXIgbGVhdmVzIHRoZSBwYWdlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9wYWdlV2luZG93LmJpbmQoXCJ1bmxvYWRcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5sb2coXCJXaW5kb3cgdW5sb2FkaW5nLCBzdG9wcGluZyB0aGUgY29ubmVjdGlvbi5cIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5zdG9wKGFzeW5jQWJvcnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0ZpcmVmb3gxMU9yR3JlYXRlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRmlyZWZveCBkb2VzIG5vdCBmaXJlIGNyb3NzLWRvbWFpbiBYSFJzIGluIHRoZSBub3JtYWwgdW5sb2FkIGhhbmRsZXIgb24gdGFiIGNsb3NlLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gIzI0MDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9wYWdlV2luZG93LmJpbmQoXCJiZWZvcmV1bmxvYWRcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIGNvbm5lY3Rpb24uc3RvcCgpIHJ1bnMgcnVucyBpbiBiZWZvcmV1bmxvYWQgYW5kIGZhaWxzLCBpdCB3aWxsIGFsc28gZmFpbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGluIHVubG9hZCB1bmxlc3MgY29ubmVjdGlvbi5zdG9wKCkgcnVucyBhZnRlciBhIHRpbWVvdXQuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnN0b3AoYXN5bmNBYm9ydCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sIG9uRmFsbGJhY2spO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5sb2codHJhbnNwb3J0Lm5hbWUgKyBcIiB0cmFuc3BvcnQgdGhyZXcgJ1wiICsgZXJyb3IubWVzc2FnZSArIFwiJyB3aGVuIGF0dGVtcHRpbmcgdG8gc3RhcnQuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIG9uRmFsbGJhY2soKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHZhciB1cmwgPSBjb25uZWN0aW9uLnVybCArIFwiL25lZ290aWF0ZVwiLFxyXG4gICAgICAgICAgICAgICAgb25GYWlsZWQgPSBmdW5jdGlvbiAoZXJyb3IsIGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZXJyID0gc2lnbmFsUi5fLmVycm9yKHJlc291cmNlcy5lcnJvck9uTmVnb3RpYXRlLCBlcnJvciwgY29ubmVjdGlvbi5fLm5lZ290aWF0ZVJlcXVlc3QpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKGNvbm5lY3Rpb24pLnRyaWdnZXJIYW5kbGVyKGV2ZW50cy5vbkVycm9yLCBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFN0b3AgdGhlIGNvbm5lY3Rpb24gaWYgbmVnb3RpYXRlIGZhaWxlZFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uc3RvcCgpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICQoY29ubmVjdGlvbikudHJpZ2dlckhhbmRsZXIoZXZlbnRzLm9uU3RhcnRpbmcpO1xyXG5cclxuICAgICAgICAgICAgdXJsID0gc2lnbmFsUi50cmFuc3BvcnRzLl9sb2dpYy5wcmVwYXJlUXVlcnlTdHJpbmcoY29ubmVjdGlvbiwgdXJsKTtcclxuXHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKFwiTmVnb3RpYXRpbmcgd2l0aCAnXCIgKyB1cmwgKyBcIicuXCIpO1xyXG5cclxuICAgICAgICAgICAgLy8gU2F2ZSB0aGUgYWpheCBuZWdvdGlhdGUgcmVxdWVzdCBvYmplY3Qgc28gd2UgY2FuIGFib3J0IGl0IGlmIHN0b3AgaXMgY2FsbGVkIHdoaWxlIHRoZSByZXF1ZXN0IGlzIGluIGZsaWdodC5cclxuICAgICAgICAgICAgY29ubmVjdGlvbi5fLm5lZ290aWF0ZVJlcXVlc3QgPSBzaWduYWxSLnRyYW5zcG9ydHMuX2xvZ2ljLmFqYXgoY29ubmVjdGlvbiwge1xyXG4gICAgICAgICAgICAgICAgdXJsOiB1cmwsXHJcbiAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGVycm9yLCBzdGF0dXNUZXh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gV2UgZG9uJ3Qgd2FudCB0byBjYXVzZSBhbnkgZXJyb3JzIGlmIHdlJ3JlIGFib3J0aW5nIG91ciBvd24gbmVnb3RpYXRlIHJlcXVlc3QuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXR1c1RleHQgIT09IF9uZWdvdGlhdGVBYm9ydFRleHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25GYWlsZWQoZXJyb3IsIGNvbm5lY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoaXMgcmVqZWN0aW9uIHdpbGwgbm9vcCBpZiB0aGUgZGVmZXJyZWQgaGFzIGFscmVhZHkgYmVlbiByZXNvbHZlZCBvciByZWplY3RlZC5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHNpZ25hbFIuXy5lcnJvcihyZXNvdXJjZXMuc3RvcHBlZFdoaWxlTmVnb3RpYXRpbmcsIG51bGwgLyogZXJyb3IgKi8sIGNvbm5lY3Rpb24uXy5uZWdvdGlhdGVSZXF1ZXN0KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZWVwQWxpdmVEYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm90b2NvbEVycm9yLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnRzID0gW10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1cHBvcnRlZFRyYW5zcG9ydHMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzID0gY29ubmVjdGlvbi5fcGFyc2VSZXNwb25zZShyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uRmFpbGVkKHNpZ25hbFIuXy5lcnJvcihyZXNvdXJjZXMuZXJyb3JQYXJzaW5nTmVnb3RpYXRlUmVzcG9uc2UsIGVycm9yKSwgY29ubmVjdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGtlZXBBbGl2ZURhdGEgPSBjb25uZWN0aW9uLl8ua2VlcEFsaXZlRGF0YTtcclxuICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmFwcFJlbGF0aXZlVXJsID0gcmVzLlVybDtcclxuICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmlkID0gcmVzLkNvbm5lY3Rpb25JZDtcclxuICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnRva2VuID0gcmVzLkNvbm5lY3Rpb25Ub2tlbjtcclxuICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLndlYlNvY2tldFNlcnZlclVybCA9IHJlcy5XZWJTb2NrZXRTZXJ2ZXJVcmw7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRoZSBsb25nIHBvbGwgdGltZW91dCBpcyB0aGUgQ29ubmVjdGlvblRpbWVvdXQgcGx1cyAxMCBzZWNvbmRzXHJcbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5fLnBvbGxUaW1lb3V0ID0gcmVzLkNvbm5lY3Rpb25UaW1lb3V0ICogMTAwMCArIDEwMDAwOyAvLyBpbiBtc1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBPbmNlIHRoZSBzZXJ2ZXIgaGFzIGxhYmVsZWQgdGhlIFBlcnNpc3RlbnRDb25uZWN0aW9uIGFzIERpc2Nvbm5lY3RlZCwgd2Ugc2hvdWxkIHN0b3AgYXR0ZW1wdGluZyB0byByZWNvbm5lY3RcclxuICAgICAgICAgICAgICAgICAgICAvLyBhZnRlciByZXMuRGlzY29ubmVjdFRpbWVvdXQgc2Vjb25kcy5cclxuICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmRpc2Nvbm5lY3RUaW1lb3V0ID0gcmVzLkRpc2Nvbm5lY3RUaW1lb3V0ICogMTAwMDsgLy8gaW4gbXNcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQWRkIHRoZSBUcmFuc3BvcnRDb25uZWN0VGltZW91dCBmcm9tIHRoZSByZXNwb25zZSB0byB0aGUgdHJhbnNwb3J0Q29ubmVjdFRpbWVvdXQgZnJvbSB0aGUgY2xpZW50IHRvIGNhbGN1bGF0ZSB0aGUgdG90YWwgdGltZW91dFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uXy50b3RhbFRyYW5zcG9ydENvbm5lY3RUaW1lb3V0ID0gY29ubmVjdGlvbi50cmFuc3BvcnRDb25uZWN0VGltZW91dCArIHJlcy5UcmFuc3BvcnRDb25uZWN0VGltZW91dCAqIDEwMDA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIElmIHdlIGhhdmUgYSBrZWVwIGFsaXZlXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5LZWVwQWxpdmVUaW1lb3V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlZ2lzdGVyIHRoZSBrZWVwIGFsaXZlIGRhdGEgYXMgYWN0aXZhdGVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtlZXBBbGl2ZURhdGEuYWN0aXZhdGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRpbWVvdXQgdG8gZGVzaWduYXRlIHdoZW4gdG8gZm9yY2UgdGhlIGNvbm5lY3Rpb24gaW50byByZWNvbm5lY3RpbmcgY29udmVydGVkIHRvIG1pbGxpc2Vjb25kc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZWVwQWxpdmVEYXRhLnRpbWVvdXQgPSByZXMuS2VlcEFsaXZlVGltZW91dCAqIDEwMDA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUaW1lb3V0IHRvIGRlc2lnbmF0ZSB3aGVuIHRvIHdhcm4gdGhlIGRldmVsb3BlciB0aGF0IHRoZSBjb25uZWN0aW9uIG1heSBiZSBkZWFkIG9yIGlzIG5vdCByZXNwb25kaW5nLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZWVwQWxpdmVEYXRhLnRpbWVvdXRXYXJuaW5nID0ga2VlcEFsaXZlRGF0YS50aW1lb3V0ICogY29ubmVjdGlvbi5rZWVwQWxpdmVXYXJuQXQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBJbnN0YW50aWF0ZSB0aGUgZnJlcXVlbmN5IGluIHdoaWNoIHdlIGNoZWNrIHRoZSBrZWVwIGFsaXZlLiAgSXQgbXVzdCBiZSBzaG9ydCBpbiBvcmRlciB0byBub3QgbWlzcy9waWNrIHVwIGFueSBjaGFuZ2VzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uXy5iZWF0SW50ZXJ2YWwgPSAoa2VlcEFsaXZlRGF0YS50aW1lb3V0IC0ga2VlcEFsaXZlRGF0YS50aW1lb3V0V2FybmluZykgLyAzO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtlZXBBbGl2ZURhdGEuYWN0aXZhdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnJlY29ubmVjdFdpbmRvdyA9IGNvbm5lY3Rpb24uZGlzY29ubmVjdFRpbWVvdXQgKyAoa2VlcEFsaXZlRGF0YS50aW1lb3V0IHx8IDApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXJlcy5Qcm90b2NvbFZlcnNpb24gfHwgcmVzLlByb3RvY29sVmVyc2lvbiAhPT0gY29ubmVjdGlvbi5jbGllbnRQcm90b2NvbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm90b2NvbEVycm9yID0gc2lnbmFsUi5fLmVycm9yKHNpZ25hbFIuXy5mb3JtYXQocmVzb3VyY2VzLnByb3RvY29sSW5jb21wYXRpYmxlLCBjb25uZWN0aW9uLmNsaWVudFByb3RvY29sLCByZXMuUHJvdG9jb2xWZXJzaW9uKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoY29ubmVjdGlvbikudHJpZ2dlckhhbmRsZXIoZXZlbnRzLm9uRXJyb3IsIFtwcm90b2NvbEVycm9yXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChwcm90b2NvbEVycm9yKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQuZWFjaChzaWduYWxSLnRyYW5zcG9ydHMsIGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChrZXkuaW5kZXhPZihcIl9cIikgPT09IDApIHx8IChrZXkgPT09IFwid2ViU29ja2V0c1wiICYmICFyZXMuVHJ5V2ViU29ja2V0cykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1cHBvcnRlZFRyYW5zcG9ydHMucHVzaChrZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoJC5pc0FycmF5KGNvbmZpZy50cmFuc3BvcnQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQuZWFjaChjb25maWcudHJhbnNwb3J0LCBmdW5jdGlvbiAoXywgdHJhbnNwb3J0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJC5pbkFycmF5KHRyYW5zcG9ydCwgc3VwcG9ydGVkVHJhbnNwb3J0cykgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zcG9ydHMucHVzaCh0cmFuc3BvcnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvbmZpZy50cmFuc3BvcnQgPT09IFwiYXV0b1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zcG9ydHMgPSBzdXBwb3J0ZWRUcmFuc3BvcnRzO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoJC5pbkFycmF5KGNvbmZpZy50cmFuc3BvcnQsIHN1cHBvcnRlZFRyYW5zcG9ydHMpID49IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNwb3J0cy5wdXNoKGNvbmZpZy50cmFuc3BvcnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbGl6ZSh0cmFuc3BvcnRzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHN0YXJ0aW5nOiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgLy8vIDxzdW1tYXJ5PkFkZHMgYSBjYWxsYmFjayB0aGF0IHdpbGwgYmUgaW52b2tlZCBiZWZvcmUgYW55dGhpbmcgaXMgc2VudCBvdmVyIHRoZSBjb25uZWN0aW9uPC9zdW1tYXJ5PlxyXG4gICAgICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJjYWxsYmFja1wiIHR5cGU9XCJGdW5jdGlvblwiPkEgY2FsbGJhY2sgZnVuY3Rpb24gdG8gZXhlY3V0ZSBiZWZvcmUgdGhlIGNvbm5lY3Rpb24gaXMgZnVsbHkgaW5zdGFudGlhdGVkLjwvcGFyYW0+XHJcbiAgICAgICAgICAgIC8vLyA8cmV0dXJucyB0eXBlPVwic2lnbmFsUlwiIC8+XHJcbiAgICAgICAgICAgIHZhciBjb25uZWN0aW9uID0gdGhpcztcclxuICAgICAgICAgICAgJChjb25uZWN0aW9uKS5iaW5kKGV2ZW50cy5vblN0YXJ0aW5nLCBmdW5jdGlvbiAoZSwgZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbChjb25uZWN0aW9uKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBjb25uZWN0aW9uO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNlbmQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIC8vLyA8c3VtbWFyeT5TZW5kcyBkYXRhIG92ZXIgdGhlIGNvbm5lY3Rpb248L3N1bW1hcnk+XHJcbiAgICAgICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImRhdGFcIiB0eXBlPVwiU3RyaW5nXCI+VGhlIGRhdGEgdG8gc2VuZCBvdmVyIHRoZSBjb25uZWN0aW9uPC9wYXJhbT5cclxuICAgICAgICAgICAgLy8vIDxyZXR1cm5zIHR5cGU9XCJzaWduYWxSXCIgLz5cclxuICAgICAgICAgICAgdmFyIGNvbm5lY3Rpb24gPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNvbm5lY3Rpb24uc3RhdGUgPT09IHNpZ25hbFIuY29ubmVjdGlvblN0YXRlLmRpc2Nvbm5lY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgLy8gQ29ubmVjdGlvbiBoYXNuJ3QgYmVlbiBzdGFydGVkIHlldFxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU2lnbmFsUjogQ29ubmVjdGlvbiBtdXN0IGJlIHN0YXJ0ZWQgYmVmb3JlIGRhdGEgY2FuIGJlIHNlbnQuIENhbGwgLnN0YXJ0KCkgYmVmb3JlIC5zZW5kKClcIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChjb25uZWN0aW9uLnN0YXRlID09PSBzaWduYWxSLmNvbm5lY3Rpb25TdGF0ZS5jb25uZWN0aW5nKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBDb25uZWN0aW9uIGhhc24ndCBiZWVuIHN0YXJ0ZWQgeWV0XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJTaWduYWxSOiBDb25uZWN0aW9uIGhhcyBub3QgYmVlbiBmdWxseSBpbml0aWFsaXplZC4gVXNlIC5zdGFydCgpLmRvbmUoKSBvciAuc3RhcnQoKS5mYWlsKCkgdG8gcnVuIGxvZ2ljIGFmdGVyIHRoZSBjb25uZWN0aW9uIGhhcyBzdGFydGVkLlwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29ubmVjdGlvbi50cmFuc3BvcnQuc2VuZChjb25uZWN0aW9uLCBkYXRhKTtcclxuICAgICAgICAgICAgLy8gUkVWSUVXOiBTaG91bGQgd2UgcmV0dXJuIGRlZmVycmVkIGhlcmU/XHJcbiAgICAgICAgICAgIHJldHVybiBjb25uZWN0aW9uO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHJlY2VpdmVkOiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgLy8vIDxzdW1tYXJ5PkFkZHMgYSBjYWxsYmFjayB0aGF0IHdpbGwgYmUgaW52b2tlZCBhZnRlciBhbnl0aGluZyBpcyByZWNlaXZlZCBvdmVyIHRoZSBjb25uZWN0aW9uPC9zdW1tYXJ5PlxyXG4gICAgICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJjYWxsYmFja1wiIHR5cGU9XCJGdW5jdGlvblwiPkEgY2FsbGJhY2sgZnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIGFueSBkYXRhIGlzIHJlY2VpdmVkIG9uIHRoZSBjb25uZWN0aW9uPC9wYXJhbT5cclxuICAgICAgICAgICAgLy8vIDxyZXR1cm5zIHR5cGU9XCJzaWduYWxSXCIgLz5cclxuICAgICAgICAgICAgdmFyIGNvbm5lY3Rpb24gPSB0aGlzO1xyXG4gICAgICAgICAgICAkKGNvbm5lY3Rpb24pLmJpbmQoZXZlbnRzLm9uUmVjZWl2ZWQsIGZ1bmN0aW9uIChlLCBkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKGNvbm5lY3Rpb24sIGRhdGEpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIGNvbm5lY3Rpb247XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc3RhdGVDaGFuZ2VkOiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgLy8vIDxzdW1tYXJ5PkFkZHMgYSBjYWxsYmFjayB0aGF0IHdpbGwgYmUgaW52b2tlZCB3aGVuIHRoZSBjb25uZWN0aW9uIHN0YXRlIGNoYW5nZXM8L3N1bW1hcnk+XHJcbiAgICAgICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImNhbGxiYWNrXCIgdHlwZT1cIkZ1bmN0aW9uXCI+QSBjYWxsYmFjayBmdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGNvbm5lY3Rpb24gc3RhdGUgY2hhbmdlczwvcGFyYW0+XHJcbiAgICAgICAgICAgIC8vLyA8cmV0dXJucyB0eXBlPVwic2lnbmFsUlwiIC8+XHJcbiAgICAgICAgICAgIHZhciBjb25uZWN0aW9uID0gdGhpcztcclxuICAgICAgICAgICAgJChjb25uZWN0aW9uKS5iaW5kKGV2ZW50cy5vblN0YXRlQ2hhbmdlZCwgZnVuY3Rpb24gKGUsIGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoY29ubmVjdGlvbiwgZGF0YSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gY29ubmVjdGlvbjtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIC8vLyA8c3VtbWFyeT5BZGRzIGEgY2FsbGJhY2sgdGhhdCB3aWxsIGJlIGludm9rZWQgYWZ0ZXIgYW4gZXJyb3Igb2NjdXJzIHdpdGggdGhlIGNvbm5lY3Rpb248L3N1bW1hcnk+XHJcbiAgICAgICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImNhbGxiYWNrXCIgdHlwZT1cIkZ1bmN0aW9uXCI+QSBjYWxsYmFjayBmdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gYW4gZXJyb3Igb2NjdXJzIG9uIHRoZSBjb25uZWN0aW9uPC9wYXJhbT5cclxuICAgICAgICAgICAgLy8vIDxyZXR1cm5zIHR5cGU9XCJzaWduYWxSXCIgLz5cclxuICAgICAgICAgICAgdmFyIGNvbm5lY3Rpb24gPSB0aGlzO1xyXG4gICAgICAgICAgICAkKGNvbm5lY3Rpb24pLmJpbmQoZXZlbnRzLm9uRXJyb3IsIGZ1bmN0aW9uIChlLCBlcnJvckRhdGEsIHNlbmREYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmxhc3RFcnJvciA9IGVycm9yRGF0YTtcclxuICAgICAgICAgICAgICAgIC8vIEluIHByYWN0aWNlICdlcnJvckRhdGEnIGlzIHRoZSBTaWduYWxSIGJ1aWx0IGVycm9yIG9iamVjdC5cclxuICAgICAgICAgICAgICAgIC8vIEluIHByYWN0aWNlICdzZW5kRGF0YScgaXMgdW5kZWZpbmVkIGZvciBhbGwgZXJyb3IgZXZlbnRzIGV4Y2VwdCB0aG9zZSB0cmlnZ2VyZWQgYnlcclxuICAgICAgICAgICAgICAgIC8vICdhamF4U2VuZCcgYW5kICd3ZWJTb2NrZXRzLnNlbmQnLidzZW5kRGF0YScgaXMgdGhlIG9yaWdpbmFsIHNlbmQgcGF5bG9hZC5cclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoY29ubmVjdGlvbiwgZXJyb3JEYXRhLCBzZW5kRGF0YSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gY29ubmVjdGlvbjtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBkaXNjb25uZWN0ZWQ6IGZ1bmN0aW9uIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAvLy8gPHN1bW1hcnk+QWRkcyBhIGNhbGxiYWNrIHRoYXQgd2lsbCBiZSBpbnZva2VkIHdoZW4gdGhlIGNsaWVudCBkaXNjb25uZWN0czwvc3VtbWFyeT5cclxuICAgICAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiY2FsbGJhY2tcIiB0eXBlPVwiRnVuY3Rpb25cIj5BIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgY29ubmVjdGlvbiBpcyBicm9rZW48L3BhcmFtPlxyXG4gICAgICAgICAgICAvLy8gPHJldHVybnMgdHlwZT1cInNpZ25hbFJcIiAvPlxyXG4gICAgICAgICAgICB2YXIgY29ubmVjdGlvbiA9IHRoaXM7XHJcbiAgICAgICAgICAgICQoY29ubmVjdGlvbikuYmluZChldmVudHMub25EaXNjb25uZWN0LCBmdW5jdGlvbiAoZSwgZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbChjb25uZWN0aW9uKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBjb25uZWN0aW9uO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNvbm5lY3Rpb25TbG93OiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgLy8vIDxzdW1tYXJ5PkFkZHMgYSBjYWxsYmFjayB0aGF0IHdpbGwgYmUgaW52b2tlZCB3aGVuIHRoZSBjbGllbnQgZGV0ZWN0cyBhIHNsb3cgY29ubmVjdGlvbjwvc3VtbWFyeT5cclxuICAgICAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiY2FsbGJhY2tcIiB0eXBlPVwiRnVuY3Rpb25cIj5BIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgY29ubmVjdGlvbiBpcyBzbG93PC9wYXJhbT5cclxuICAgICAgICAgICAgLy8vIDxyZXR1cm5zIHR5cGU9XCJzaWduYWxSXCIgLz5cclxuICAgICAgICAgICAgdmFyIGNvbm5lY3Rpb24gPSB0aGlzO1xyXG4gICAgICAgICAgICAkKGNvbm5lY3Rpb24pLmJpbmQoZXZlbnRzLm9uQ29ubmVjdGlvblNsb3csIGZ1bmN0aW9uIChlLCBkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKGNvbm5lY3Rpb24pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBjb25uZWN0aW9uO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHJlY29ubmVjdGluZzogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIC8vLyA8c3VtbWFyeT5BZGRzIGEgY2FsbGJhY2sgdGhhdCB3aWxsIGJlIGludm9rZWQgd2hlbiB0aGUgdW5kZXJseWluZyB0cmFuc3BvcnQgYmVnaW5zIHJlY29ubmVjdGluZzwvc3VtbWFyeT5cclxuICAgICAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiY2FsbGJhY2tcIiB0eXBlPVwiRnVuY3Rpb25cIj5BIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgY29ubmVjdGlvbiBlbnRlcnMgYSByZWNvbm5lY3Rpbmcgc3RhdGU8L3BhcmFtPlxyXG4gICAgICAgICAgICAvLy8gPHJldHVybnMgdHlwZT1cInNpZ25hbFJcIiAvPlxyXG4gICAgICAgICAgICB2YXIgY29ubmVjdGlvbiA9IHRoaXM7XHJcbiAgICAgICAgICAgICQoY29ubmVjdGlvbikuYmluZChldmVudHMub25SZWNvbm5lY3RpbmcsIGZ1bmN0aW9uIChlLCBkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKGNvbm5lY3Rpb24pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIGNvbm5lY3Rpb247XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcmVjb25uZWN0ZWQ6IGZ1bmN0aW9uIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAvLy8gPHN1bW1hcnk+QWRkcyBhIGNhbGxiYWNrIHRoYXQgd2lsbCBiZSBpbnZva2VkIHdoZW4gdGhlIHVuZGVybHlpbmcgdHJhbnNwb3J0IHJlY29ubmVjdHM8L3N1bW1hcnk+XHJcbiAgICAgICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImNhbGxiYWNrXCIgdHlwZT1cIkZ1bmN0aW9uXCI+QSBjYWxsYmFjayBmdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGNvbm5lY3Rpb24gaXMgcmVzdG9yZWQ8L3BhcmFtPlxyXG4gICAgICAgICAgICAvLy8gPHJldHVybnMgdHlwZT1cInNpZ25hbFJcIiAvPlxyXG4gICAgICAgICAgICB2YXIgY29ubmVjdGlvbiA9IHRoaXM7XHJcbiAgICAgICAgICAgICQoY29ubmVjdGlvbikuYmluZChldmVudHMub25SZWNvbm5lY3QsIGZ1bmN0aW9uIChlLCBkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKGNvbm5lY3Rpb24pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIGNvbm5lY3Rpb247XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc3RvcDogZnVuY3Rpb24gKGFzeW5jLCBub3RpZnlTZXJ2ZXIpIHtcclxuICAgICAgICAgICAgLy8vIDxzdW1tYXJ5PlN0b3BzIGxpc3RlbmluZzwvc3VtbWFyeT5cclxuICAgICAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiYXN5bmNcIiB0eXBlPVwiQm9vbGVhblwiPldoZXRoZXIgb3Igbm90IHRvIGFzeW5jaHJvbm91c2x5IGFib3J0IHRoZSBjb25uZWN0aW9uPC9wYXJhbT5cclxuICAgICAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwibm90aWZ5U2VydmVyXCIgdHlwZT1cIkJvb2xlYW5cIj5XaGV0aGVyIHdlIHdhbnQgdG8gbm90aWZ5IHRoZSBzZXJ2ZXIgdGhhdCB3ZSBhcmUgYWJvcnRpbmcgdGhlIGNvbm5lY3Rpb248L3BhcmFtPlxyXG4gICAgICAgICAgICAvLy8gPHJldHVybnMgdHlwZT1cInNpZ25hbFJcIiAvPlxyXG4gICAgICAgICAgICB2YXIgY29ubmVjdGlvbiA9IHRoaXMsXHJcbiAgICAgICAgICAgICAgICAvLyBTYXZlIGRlZmVycmFsIGJlY2F1c2UgdGhpcyBpcyBhbHdheXMgY2xlYW5lZCB1cFxyXG4gICAgICAgICAgICAgICAgZGVmZXJyYWwgPSBjb25uZWN0aW9uLl9kZWZlcnJhbDtcclxuXHJcbiAgICAgICAgICAgIC8vIFZlcmlmeSB0aGF0IHdlJ3ZlIGJvdW5kIGEgbG9hZCBldmVudC5cclxuICAgICAgICAgICAgaWYgKGNvbm5lY3Rpb24uXy5kZWZlcnJlZFN0YXJ0SGFuZGxlcikge1xyXG4gICAgICAgICAgICAgICAgLy8gVW5iaW5kIHRoZSBldmVudC5cclxuICAgICAgICAgICAgICAgIF9wYWdlV2luZG93LnVuYmluZChcImxvYWRcIiwgY29ubmVjdGlvbi5fLmRlZmVycmVkU3RhcnRIYW5kbGVyKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gQWx3YXlzIGNsZWFuIHVwIHByaXZhdGUgbm9uLXRpbWVvdXQgYmFzZWQgc3RhdGUuXHJcbiAgICAgICAgICAgIGRlbGV0ZSBjb25uZWN0aW9uLl8uY29uZmlnO1xyXG4gICAgICAgICAgICBkZWxldGUgY29ubmVjdGlvbi5fLmRlZmVycmVkU3RhcnRIYW5kbGVyO1xyXG5cclxuICAgICAgICAgICAgLy8gVGhpcyBuZWVkcyB0byBiZSBjaGVja2VkIGRlc3BpdGUgdGhlIGNvbm5lY3Rpb24gc3RhdGUgYmVjYXVzZSBhIGNvbm5lY3Rpb24gc3RhcnQgY2FuIGJlIGRlZmVycmVkIHVudGlsIHBhZ2UgbG9hZC5cclxuICAgICAgICAgICAgLy8gSWYgd2UndmUgZGVmZXJyZWQgdGhlIHN0YXJ0IGR1ZSB0byBhIHBhZ2UgbG9hZCB3ZSBuZWVkIHRvIHVuYmluZCB0aGUgXCJvbkxvYWRcIiAtPiBzdGFydCBldmVudC5cclxuICAgICAgICAgICAgaWYgKCFfcGFnZUxvYWRlZCAmJiAoIWNvbm5lY3Rpb24uXy5jb25maWcgfHwgY29ubmVjdGlvbi5fLmNvbmZpZy53YWl0Rm9yUGFnZUxvYWQgPT09IHRydWUpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmxvZyhcIlN0b3BwaW5nIGNvbm5lY3Rpb24gcHJpb3IgdG8gbmVnb3RpYXRlLlwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBJZiB3ZSBoYXZlIGEgZGVmZXJyYWwgd2Ugc2hvdWxkIHJlamVjdCBpdFxyXG4gICAgICAgICAgICAgICAgaWYgKGRlZmVycmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyYWwucmVqZWN0KHNpZ25hbFIuXy5lcnJvcihyZXNvdXJjZXMuc3RvcHBlZFdoaWxlTG9hZGluZykpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFNob3J0LWNpcmN1aXQgYmVjYXVzZSB0aGUgc3RhcnQgaGFzIG5vdCBiZWVuIGZ1bGx5IHN0YXJ0ZWQuXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChjb25uZWN0aW9uLnN0YXRlID09PSBzaWduYWxSLmNvbm5lY3Rpb25TdGF0ZS5kaXNjb25uZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29ubmVjdGlvbi5sb2coXCJTdG9wcGluZyBjb25uZWN0aW9uLlwiKTtcclxuXHJcbiAgICAgICAgICAgIC8vIENsZWFyIHRoaXMgbm8gbWF0dGVyIHdoYXRcclxuICAgICAgICAgICAgd2luZG93LmNsZWFyVGltZW91dChjb25uZWN0aW9uLl8uYmVhdEhhbmRsZSk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5jbGVhckludGVydmFsKGNvbm5lY3Rpb24uXy5waW5nSW50ZXJ2YWxJZCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoY29ubmVjdGlvbi50cmFuc3BvcnQpIHtcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24udHJhbnNwb3J0LnN0b3AoY29ubmVjdGlvbik7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG5vdGlmeVNlcnZlciAhPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnRyYW5zcG9ydC5hYm9ydChjb25uZWN0aW9uLCBhc3luYyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHN1cHBvcnRzS2VlcEFsaXZlKGNvbm5lY3Rpb24pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2lnbmFsUi50cmFuc3BvcnRzLl9sb2dpYy5zdG9wTW9uaXRvcmluZ0tlZXBBbGl2ZShjb25uZWN0aW9uKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnRyYW5zcG9ydCA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChjb25uZWN0aW9uLl8ubmVnb3RpYXRlUmVxdWVzdCkge1xyXG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIG5lZ290aWF0aW9uIHJlcXVlc3QgaGFzIGFscmVhZHkgY29tcGxldGVkIHRoaXMgd2lsbCBub29wLlxyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5fLm5lZ290aWF0ZVJlcXVlc3QuYWJvcnQoX25lZ290aWF0ZUFib3J0VGV4dCk7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgY29ubmVjdGlvbi5fLm5lZ290aWF0ZVJlcXVlc3Q7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEVuc3VyZSB0aGF0IGluaXRIYW5kbGVyLnN0b3AoKSBpcyBjYWxsZWQgYmVmb3JlIGNvbm5lY3Rpb24uX2RlZmVycmFsIGlzIGRlbGV0ZWRcclxuICAgICAgICAgICAgaWYgKGNvbm5lY3Rpb24uXy5pbml0SGFuZGxlcikge1xyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5fLmluaXRIYW5kbGVyLnN0b3AoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZGVsZXRlIGNvbm5lY3Rpb24uX2RlZmVycmFsO1xyXG4gICAgICAgICAgICBkZWxldGUgY29ubmVjdGlvbi5tZXNzYWdlSWQ7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBjb25uZWN0aW9uLmdyb3Vwc1Rva2VuO1xyXG4gICAgICAgICAgICBkZWxldGUgY29ubmVjdGlvbi5pZDtcclxuICAgICAgICAgICAgZGVsZXRlIGNvbm5lY3Rpb24uXy5waW5nSW50ZXJ2YWxJZDtcclxuICAgICAgICAgICAgZGVsZXRlIGNvbm5lY3Rpb24uXy5sYXN0TWVzc2FnZUF0O1xyXG4gICAgICAgICAgICBkZWxldGUgY29ubmVjdGlvbi5fLmxhc3RBY3RpdmVBdDtcclxuXHJcbiAgICAgICAgICAgIC8vIENsZWFyIG91dCBvdXIgbWVzc2FnZSBidWZmZXJcclxuICAgICAgICAgICAgY29ubmVjdGlvbi5fLmNvbm5lY3RpbmdNZXNzYWdlQnVmZmVyLmNsZWFyKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBUcmlnZ2VyIHRoZSBkaXNjb25uZWN0IGV2ZW50XHJcbiAgICAgICAgICAgIGNoYW5nZVN0YXRlKGNvbm5lY3Rpb24sIGNvbm5lY3Rpb24uc3RhdGUsIHNpZ25hbFIuY29ubmVjdGlvblN0YXRlLmRpc2Nvbm5lY3RlZCk7XHJcbiAgICAgICAgICAgICQoY29ubmVjdGlvbikudHJpZ2dlckhhbmRsZXIoZXZlbnRzLm9uRGlzY29ubmVjdCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gY29ubmVjdGlvbjtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBsb2c6IGZ1bmN0aW9uIChtc2cpIHtcclxuICAgICAgICAgICAgbG9nKG1zZywgdGhpcy5sb2dnaW5nKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHNpZ25hbFIuZm4uaW5pdC5wcm90b3R5cGUgPSBzaWduYWxSLmZuO1xyXG5cclxuICAgIHNpZ25hbFIubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLy8gPHN1bW1hcnk+UmVpbnN0YXRlcyB0aGUgb3JpZ2luYWwgdmFsdWUgb2YgJC5jb25uZWN0aW9uIGFuZCByZXR1cm5zIHRoZSBzaWduYWxSIG9iamVjdCBmb3IgbWFudWFsIGFzc2lnbm1lbnQ8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zIHR5cGU9XCJzaWduYWxSXCIgLz5cclxuICAgICAgICBpZiAoJC5jb25uZWN0aW9uID09PSBzaWduYWxSKSB7XHJcbiAgICAgICAgICAgICQuY29ubmVjdGlvbiA9IF9jb25uZWN0aW9uO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2lnbmFsUjtcclxuICAgIH07XHJcblxyXG4gICAgaWYgKCQuY29ubmVjdGlvbikge1xyXG4gICAgICAgIF9jb25uZWN0aW9uID0gJC5jb25uZWN0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgICQuY29ubmVjdGlvbiA9ICQuc2lnbmFsUiA9IHNpZ25hbFI7XHJcblxyXG59KGpRdWVyeVNoaW0sIHdpbmRvdykpO1xyXG4vKiBqcXVlcnkuc2lnbmFsUi50cmFuc3BvcnRzLmNvbW1vbi5qcyAqL1xyXG4vLyBDb3B5cmlnaHQgKGMpIC5ORVQgRm91bmRhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXHJcblxyXG4vKmdsb2JhbCB3aW5kb3c6ZmFsc2UgKi9cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cImpxdWVyeS5zaWduYWxSLmNvcmUuanNcIiAvPlxyXG5cclxuKGZ1bmN0aW9uICgkLCB3aW5kb3csIHVuZGVmaW5lZCkge1xyXG5cclxuICAgIHZhciBzaWduYWxSID0gJC5zaWduYWxSLFxyXG4gICAgICAgIGV2ZW50cyA9ICQuc2lnbmFsUi5ldmVudHMsXHJcbiAgICAgICAgY2hhbmdlU3RhdGUgPSAkLnNpZ25hbFIuY2hhbmdlU3RhdGUsXHJcbiAgICAgICAgc3RhcnRBYm9ydFRleHQgPSBcIl9fU3RhcnQgQWJvcnRlZF9fXCIsXHJcbiAgICAgICAgdHJhbnNwb3J0TG9naWM7XHJcblxyXG4gICAgc2lnbmFsUi50cmFuc3BvcnRzID0ge307XHJcblxyXG4gICAgZnVuY3Rpb24gYmVhdChjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgaWYgKGNvbm5lY3Rpb24uXy5rZWVwQWxpdmVEYXRhLm1vbml0b3JpbmcpIHtcclxuICAgICAgICAgICAgY2hlY2tJZkFsaXZlKGNvbm5lY3Rpb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gRW5zdXJlIHRoYXQgd2Ugc3VjY2Vzc2Z1bGx5IG1hcmtlZCBhY3RpdmUgYmVmb3JlIGNvbnRpbnVpbmcgdGhlIGhlYXJ0YmVhdC5cclxuICAgICAgICBpZiAodHJhbnNwb3J0TG9naWMubWFya0FjdGl2ZShjb25uZWN0aW9uKSkge1xyXG4gICAgICAgICAgICBjb25uZWN0aW9uLl8uYmVhdEhhbmRsZSA9IHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGJlYXQoY29ubmVjdGlvbik7XHJcbiAgICAgICAgICAgIH0sIGNvbm5lY3Rpb24uXy5iZWF0SW50ZXJ2YWwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjaGVja0lmQWxpdmUoY29ubmVjdGlvbikge1xyXG4gICAgICAgIHZhciBrZWVwQWxpdmVEYXRhID0gY29ubmVjdGlvbi5fLmtlZXBBbGl2ZURhdGEsXHJcbiAgICAgICAgICAgIHRpbWVFbGFwc2VkO1xyXG5cclxuICAgICAgICAvLyBPbmx5IGNoZWNrIGlmIHdlJ3JlIGNvbm5lY3RlZFxyXG4gICAgICAgIGlmIChjb25uZWN0aW9uLnN0YXRlID09PSBzaWduYWxSLmNvbm5lY3Rpb25TdGF0ZS5jb25uZWN0ZWQpIHtcclxuICAgICAgICAgICAgdGltZUVsYXBzZWQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIGNvbm5lY3Rpb24uXy5sYXN0TWVzc2FnZUF0O1xyXG5cclxuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIGtlZXAgYWxpdmUgaGFzIGNvbXBsZXRlbHkgdGltZWQgb3V0XHJcbiAgICAgICAgICAgIGlmICh0aW1lRWxhcHNlZCA+PSBrZWVwQWxpdmVEYXRhLnRpbWVvdXQpIHtcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKFwiS2VlcCBhbGl2ZSB0aW1lZCBvdXQuICBOb3RpZnlpbmcgdHJhbnNwb3J0IHRoYXQgY29ubmVjdGlvbiBoYXMgYmVlbiBsb3N0LlwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBOb3RpZnkgdHJhbnNwb3J0IHRoYXQgdGhlIGNvbm5lY3Rpb24gaGFzIGJlZW4gbG9zdFxyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi50cmFuc3BvcnQubG9zdENvbm5lY3Rpb24oY29ubmVjdGlvbik7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGltZUVsYXBzZWQgPj0ga2VlcEFsaXZlRGF0YS50aW1lb3V0V2FybmluZykge1xyXG4gICAgICAgICAgICAgICAgLy8gVGhpcyBpcyB0byBhc3N1cmUgdGhhdCB0aGUgdXNlciBvbmx5IGdldHMgYSBzaW5nbGUgd2FybmluZ1xyXG4gICAgICAgICAgICAgICAgaWYgKCFrZWVwQWxpdmVEYXRhLnVzZXJOb3RpZmllZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKFwiS2VlcCBhbGl2ZSBoYXMgYmVlbiBtaXNzZWQsIGNvbm5lY3Rpb24gbWF5IGJlIGRlYWQvc2xvdy5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgJChjb25uZWN0aW9uKS50cmlnZ2VySGFuZGxlcihldmVudHMub25Db25uZWN0aW9uU2xvdyk7XHJcbiAgICAgICAgICAgICAgICAgICAga2VlcEFsaXZlRGF0YS51c2VyTm90aWZpZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAga2VlcEFsaXZlRGF0YS51c2VyTm90aWZpZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRBamF4VXJsKGNvbm5lY3Rpb24sIHBhdGgpIHtcclxuICAgICAgICB2YXIgdXJsID0gY29ubmVjdGlvbi51cmwgKyBwYXRoO1xyXG5cclxuICAgICAgICBpZiAoY29ubmVjdGlvbi50cmFuc3BvcnQpIHtcclxuICAgICAgICAgICAgdXJsICs9IFwiP3RyYW5zcG9ydD1cIiArIGNvbm5lY3Rpb24udHJhbnNwb3J0Lm5hbWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdHJhbnNwb3J0TG9naWMucHJlcGFyZVF1ZXJ5U3RyaW5nKGNvbm5lY3Rpb24sIHVybCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gSW5pdEhhbmRsZXIoY29ubmVjdGlvbikge1xyXG4gICAgICAgIHRoaXMuY29ubmVjdGlvbiA9IGNvbm5lY3Rpb247XHJcblxyXG4gICAgICAgIHRoaXMuc3RhcnRSZXF1ZXN0ZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnN0YXJ0Q29tcGxldGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uU3RvcHBlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIEluaXRIYW5kbGVyLnByb3RvdHlwZSA9IHtcclxuICAgICAgICBzdGFydDogZnVuY3Rpb24gKHRyYW5zcG9ydCwgb25TdWNjZXNzLCBvbkZhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcyxcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24gPSB0aGF0LmNvbm5lY3Rpb24sXHJcbiAgICAgICAgICAgICAgICBmYWlsQ2FsbGVkID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhhdC5zdGFydFJlcXVlc3RlZCB8fCB0aGF0LmNvbm5lY3Rpb25TdG9wcGVkKSB7XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmxvZyhcIldBUk5JTkchIFwiICsgdHJhbnNwb3J0Lm5hbWUgKyBcIiB0cmFuc3BvcnQgY2Fubm90IGJlIHN0YXJ0ZWQuIEluaXRpYWxpemF0aW9uIG9uZ29pbmcgb3IgY29tcGxldGVkLlwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29ubmVjdGlvbi5sb2codHJhbnNwb3J0Lm5hbWUgKyBcIiB0cmFuc3BvcnQgc3RhcnRpbmcuXCIpO1xyXG5cclxuICAgICAgICAgICAgdHJhbnNwb3J0LnN0YXJ0KGNvbm5lY3Rpb24sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICghZmFpbENhbGxlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuaW5pdFJlY2VpdmVkKHRyYW5zcG9ydCwgb25TdWNjZXNzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBEb24ndCBhbGxvdyB0aGUgc2FtZSB0cmFuc3BvcnQgdG8gY2F1c2Ugb25GYWxsYmFjayB0byBiZSBjYWxsZWQgdHdpY2VcclxuICAgICAgICAgICAgICAgIGlmICghZmFpbENhbGxlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZhaWxDYWxsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQudHJhbnNwb3J0RmFpbGVkKHRyYW5zcG9ydCwgZXJyb3IsIG9uRmFsbGJhY2spO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFJldHVybnMgdHJ1ZSBpZiB0aGUgdHJhbnNwb3J0IHNob3VsZCBzdG9wO1xyXG4gICAgICAgICAgICAgICAgLy8gZmFsc2UgaWYgaXQgc2hvdWxkIGF0dGVtcHQgdG8gcmVjb25uZWN0XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gIXRoYXQuc3RhcnRDb21wbGV0ZWQgfHwgdGhhdC5jb25uZWN0aW9uU3RvcHBlZDtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGF0LnRyYW5zcG9ydFRpbWVvdXRIYW5kbGUgPSB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWZhaWxDYWxsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBmYWlsQ2FsbGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmxvZyh0cmFuc3BvcnQubmFtZSArIFwiIHRyYW5zcG9ydCB0aW1lZCBvdXQgd2hlbiB0cnlpbmcgdG8gY29ubmVjdC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50cmFuc3BvcnRGYWlsZWQodHJhbnNwb3J0LCB1bmRlZmluZWQsIG9uRmFsbGJhY2spO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBjb25uZWN0aW9uLl8udG90YWxUcmFuc3BvcnRDb25uZWN0VGltZW91dCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc3RvcDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25TdG9wcGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgd2luZG93LmNsZWFyVGltZW91dCh0aGlzLnRyYW5zcG9ydFRpbWVvdXRIYW5kbGUpO1xyXG4gICAgICAgICAgICBzaWduYWxSLnRyYW5zcG9ydHMuX2xvZ2ljLnRyeUFib3J0U3RhcnRSZXF1ZXN0KHRoaXMuY29ubmVjdGlvbik7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaW5pdFJlY2VpdmVkOiBmdW5jdGlvbiAodHJhbnNwb3J0LCBvblN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzLFxyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbiA9IHRoYXQuY29ubmVjdGlvbjtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGF0LnN0YXJ0UmVxdWVzdGVkKSB7XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmxvZyhcIldBUk5JTkchIFRoZSBjbGllbnQgcmVjZWl2ZWQgbXVsdGlwbGUgaW5pdCBtZXNzYWdlcy5cIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGF0LmNvbm5lY3Rpb25TdG9wcGVkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoYXQuc3RhcnRSZXF1ZXN0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHRoYXQudHJhbnNwb3J0VGltZW91dEhhbmRsZSk7XHJcblxyXG4gICAgICAgICAgICBjb25uZWN0aW9uLmxvZyh0cmFuc3BvcnQubmFtZSArIFwiIHRyYW5zcG9ydCBjb25uZWN0ZWQuIEluaXRpYXRpbmcgc3RhcnQgcmVxdWVzdC5cIik7XHJcbiAgICAgICAgICAgIHNpZ25hbFIudHJhbnNwb3J0cy5fbG9naWMuYWpheFN0YXJ0KGNvbm5lY3Rpb24sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuc3RhcnRDb21wbGV0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgb25TdWNjZXNzKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHRyYW5zcG9ydEZhaWxlZDogZnVuY3Rpb24gKHRyYW5zcG9ydCwgZXJyb3IsIG9uRmFsbGJhY2spIHtcclxuICAgICAgICAgICAgdmFyIGNvbm5lY3Rpb24gPSB0aGlzLmNvbm5lY3Rpb24sXHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZCA9IGNvbm5lY3Rpb24uX2RlZmVycmFsLFxyXG4gICAgICAgICAgICAgICAgd3JhcHBlZEVycm9yO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuY29ubmVjdGlvblN0b3BwZWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgd2luZG93LmNsZWFyVGltZW91dCh0aGlzLnRyYW5zcG9ydFRpbWVvdXRIYW5kbGUpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCF0aGlzLnN0YXJ0UmVxdWVzdGVkKSB7XHJcbiAgICAgICAgICAgICAgICB0cmFuc3BvcnQuc3RvcChjb25uZWN0aW9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmxvZyh0cmFuc3BvcnQubmFtZSArIFwiIHRyYW5zcG9ydCBmYWlsZWQgdG8gY29ubmVjdC4gQXR0ZW1wdGluZyB0byBmYWxsIGJhY2suXCIpO1xyXG4gICAgICAgICAgICAgICAgb25GYWxsYmFjaygpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLnN0YXJ0Q29tcGxldGVkKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBEbyBub3QgYXR0ZW1wdCB0byBmYWxsIGJhY2sgaWYgYSBzdGFydCByZXF1ZXN0IGlzIG9uZ29pbmcgZHVyaW5nIGEgdHJhbnNwb3J0IGZhaWx1cmUuXHJcbiAgICAgICAgICAgICAgICAvLyBJbnN0ZWFkLCB0cmlnZ2VyIGFuIGVycm9yIGFuZCBzdG9wIHRoZSBjb25uZWN0aW9uLlxyXG4gICAgICAgICAgICAgICAgd3JhcHBlZEVycm9yID0gc2lnbmFsUi5fLmVycm9yKHNpZ25hbFIucmVzb3VyY2VzLmVycm9yRHVyaW5nU3RhcnRSZXF1ZXN0LCBlcnJvcik7XHJcblxyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5sb2codHJhbnNwb3J0Lm5hbWUgKyBcIiB0cmFuc3BvcnQgZmFpbGVkIGR1cmluZyB0aGUgc3RhcnQgcmVxdWVzdC4gU3RvcHBpbmcgdGhlIGNvbm5lY3Rpb24uXCIpO1xyXG4gICAgICAgICAgICAgICAgJChjb25uZWN0aW9uKS50cmlnZ2VySGFuZGxlcihldmVudHMub25FcnJvciwgW3dyYXBwZWRFcnJvcl0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRlZmVycmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHdyYXBwZWRFcnJvcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5zdG9wKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBUaGUgc3RhcnQgcmVxdWVzdCBoYXMgY29tcGxldGVkLCBidXQgdGhlIGNvbm5lY3Rpb24gaGFzIG5vdCBzdG9wcGVkLlxyXG4gICAgICAgICAgICAgICAgLy8gTm8gbmVlZCB0byBkbyBhbnl0aGluZyBoZXJlLiBUaGUgdHJhbnNwb3J0IHNob3VsZCBhdHRlbXB0IGl0cyBub3JtYWwgcmVjb25uZWN0IGxvZ2ljLlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB0cmFuc3BvcnRMb2dpYyA9IHNpZ25hbFIudHJhbnNwb3J0cy5fbG9naWMgPSB7XHJcbiAgICAgICAgYWpheDogZnVuY3Rpb24gKGNvbm5lY3Rpb24sIG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgcmV0dXJuICQuYWpheChcclxuICAgICAgICAgICAgICAgICQuZXh0ZW5kKC8qZGVlcCBjb3B5Ki8gdHJ1ZSwge30sICQuc2lnbmFsUi5hamF4RGVmYXVsdHMsIHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHt9LFxyXG4gICAgICAgICAgICAgICAgICAgIHhockZpZWxkczogeyB3aXRoQ3JlZGVudGlhbHM6IGNvbm5lY3Rpb24ud2l0aENyZWRlbnRpYWxzIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudFR5cGU6IGNvbm5lY3Rpb24uY29udGVudFR5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGU6IGNvbm5lY3Rpb24uYWpheERhdGFUeXBlXHJcbiAgICAgICAgICAgICAgICB9LCBvcHRpb25zKSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcGluZ1NlcnZlcjogZnVuY3Rpb24gKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgLy8vIDxzdW1tYXJ5PlBpbmdzIHRoZSBzZXJ2ZXI8L3N1bW1hcnk+XHJcbiAgICAgICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImNvbm5lY3Rpb25cIiB0eXBlPVwic2lnbmFsclwiPkNvbm5lY3Rpb24gYXNzb2NpYXRlZCB3aXRoIHRoZSBzZXJ2ZXIgcGluZzwvcGFyYW0+XHJcbiAgICAgICAgICAgIC8vLyA8cmV0dXJucyB0eXBlPVwic2lnbmFsUlwiIC8+XHJcbiAgICAgICAgICAgIHZhciB1cmwsXHJcbiAgICAgICAgICAgICAgICB4aHIsXHJcbiAgICAgICAgICAgICAgICBkZWZlcnJhbCA9ICQuRGVmZXJyZWQoKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjb25uZWN0aW9uLnRyYW5zcG9ydCkge1xyXG4gICAgICAgICAgICAgICAgdXJsID0gY29ubmVjdGlvbi51cmwgKyBcIi9waW5nXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgdXJsID0gdHJhbnNwb3J0TG9naWMuYWRkUXModXJsLCBjb25uZWN0aW9uLnFzKTtcclxuXHJcbiAgICAgICAgICAgICAgICB4aHIgPSB0cmFuc3BvcnRMb2dpYy5hamF4KGNvbm5lY3Rpb24sIHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6IHVybCxcclxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYXRhO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEgPSBjb25uZWN0aW9uLl9wYXJzZVJlc3BvbnNlKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJhbC5yZWplY3QoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2lnbmFsUi5fLnRyYW5zcG9ydEVycm9yKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaWduYWxSLnJlc291cmNlcy5waW5nU2VydmVyRmFpbGVkUGFyc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24udHJhbnNwb3J0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeGhyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uc3RvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5SZXNwb25zZSA9PT0gXCJwb25nXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmFsLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmFsLnJlamVjdChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaWduYWxSLl8udHJhbnNwb3J0RXJyb3IoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25hbFIuXy5mb3JtYXQoc2lnbmFsUi5yZXNvdXJjZXMucGluZ1NlcnZlckZhaWxlZEludmFsaWRSZXNwb25zZSwgcmVzdWx0KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi50cmFuc3BvcnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGwgLyogZXJyb3IgKi8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhoclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yLnN0YXR1cyA9PT0gNDAxIHx8IGVycm9yLnN0YXR1cyA9PT0gNDAzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJhbC5yZWplY3QoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2lnbmFsUi5fLnRyYW5zcG9ydEVycm9yKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaWduYWxSLl8uZm9ybWF0KHNpZ25hbFIucmVzb3VyY2VzLnBpbmdTZXJ2ZXJGYWlsZWRTdGF0dXNDb2RlLCBlcnJvci5zdGF0dXMpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnRyYW5zcG9ydCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhoclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnN0b3AoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmFsLnJlamVjdChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaWduYWxSLl8udHJhbnNwb3J0RXJyb3IoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25hbFIucmVzb3VyY2VzLnBpbmdTZXJ2ZXJGYWlsZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24udHJhbnNwb3J0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeGhyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyYWwucmVqZWN0KFxyXG4gICAgICAgICAgICAgICAgICAgIHNpZ25hbFIuXy50cmFuc3BvcnRFcnJvcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2lnbmFsUi5yZXNvdXJjZXMubm9Db25uZWN0aW9uVHJhbnNwb3J0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnRyYW5zcG9ydFxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJhbC5wcm9taXNlKCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcHJlcGFyZVF1ZXJ5U3RyaW5nOiBmdW5jdGlvbiAoY29ubmVjdGlvbiwgdXJsKSB7XHJcbiAgICAgICAgICAgIHZhciBwcmVwYXJlZFVybDtcclxuXHJcbiAgICAgICAgICAgIC8vIFVzZSBhZGRRcyB0byBzdGFydCBzaW5jZSBpdCBoYW5kbGVzIHRoZSA/LyYgcHJlZml4IGZvciB1c1xyXG4gICAgICAgICAgICBwcmVwYXJlZFVybCA9IHRyYW5zcG9ydExvZ2ljLmFkZFFzKHVybCwgXCJjbGllbnRQcm90b2NvbD1cIiArIGNvbm5lY3Rpb24uY2xpZW50UHJvdG9jb2wpO1xyXG5cclxuICAgICAgICAgICAgLy8gQWRkIHRoZSB1c2VyLXNwZWNpZmllZCBxdWVyeSBzdHJpbmcgcGFyYW1zIGlmIGFueVxyXG4gICAgICAgICAgICBwcmVwYXJlZFVybCA9IHRyYW5zcG9ydExvZ2ljLmFkZFFzKHByZXBhcmVkVXJsLCBjb25uZWN0aW9uLnFzKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjb25uZWN0aW9uLnRva2VuKSB7XHJcbiAgICAgICAgICAgICAgICBwcmVwYXJlZFVybCArPSBcIiZjb25uZWN0aW9uVG9rZW49XCIgKyBlbmNvZGVVUklDb21wb25lbnQoY29ubmVjdGlvbi50b2tlbik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChjb25uZWN0aW9uLmRhdGEpIHtcclxuICAgICAgICAgICAgICAgIHByZXBhcmVkVXJsICs9IFwiJmNvbm5lY3Rpb25EYXRhPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KGNvbm5lY3Rpb24uZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBwcmVwYXJlZFVybDtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBhZGRRczogZnVuY3Rpb24gKHVybCwgcXMpIHtcclxuICAgICAgICAgICAgdmFyIGFwcGVuZGVyID0gdXJsLmluZGV4T2YoXCI/XCIpICE9PSAtMSA/IFwiJlwiIDogXCI/XCIsXHJcbiAgICAgICAgICAgICAgICBmaXJzdENoYXI7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXFzKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdXJsO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIChxcykgPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB1cmwgKyBhcHBlbmRlciArICQucGFyYW0ocXMpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIChxcykgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgIGZpcnN0Q2hhciA9IHFzLmNoYXJBdCgwKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZmlyc3RDaGFyID09PSBcIj9cIiB8fCBmaXJzdENoYXIgPT09IFwiJlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXBwZW5kZXIgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB1cmwgKyBhcHBlbmRlciArIHFzO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJRdWVyeSBzdHJpbmcgcHJvcGVydHkgbXVzdCBiZSBlaXRoZXIgYSBzdHJpbmcgb3Igb2JqZWN0LlwiKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvLyBCVUcgIzI5NTM6IFRoZSB1cmwgbmVlZHMgdG8gYmUgc2FtZSBvdGhlcndpc2UgaXQgd2lsbCBjYXVzZSBhIG1lbW9yeSBsZWFrXHJcbiAgICAgICAgZ2V0VXJsOiBmdW5jdGlvbiAoY29ubmVjdGlvbiwgdHJhbnNwb3J0LCByZWNvbm5lY3RpbmcsIHBvbGwsIGFqYXhQb3N0KSB7XHJcbiAgICAgICAgICAgIC8vLyA8c3VtbWFyeT5HZXRzIHRoZSB1cmwgZm9yIG1ha2luZyBhIEdFVCBiYXNlZCBjb25uZWN0IHJlcXVlc3Q8L3N1bW1hcnk+XHJcbiAgICAgICAgICAgIHZhciBiYXNlVXJsID0gdHJhbnNwb3J0ID09PSBcIndlYlNvY2tldHNcIiA/IFwiXCIgOiBjb25uZWN0aW9uLmJhc2VVcmwsXHJcbiAgICAgICAgICAgICAgICB1cmwgPSBiYXNlVXJsICsgY29ubmVjdGlvbi5hcHBSZWxhdGl2ZVVybCxcclxuICAgICAgICAgICAgICAgIHFzID0gXCJ0cmFuc3BvcnQ9XCIgKyB0cmFuc3BvcnQ7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWFqYXhQb3N0ICYmIGNvbm5lY3Rpb24uZ3JvdXBzVG9rZW4pIHtcclxuICAgICAgICAgICAgICAgIHFzICs9IFwiJmdyb3Vwc1Rva2VuPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KGNvbm5lY3Rpb24uZ3JvdXBzVG9rZW4pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIXJlY29ubmVjdGluZykge1xyXG4gICAgICAgICAgICAgICAgdXJsICs9IFwiL2Nvbm5lY3RcIjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChwb2xsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbG9uZ1BvbGxpbmcgdHJhbnNwb3J0IHNwZWNpZmljXHJcbiAgICAgICAgICAgICAgICAgICAgdXJsICs9IFwiL3BvbGxcIjtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsICs9IFwiL3JlY29ubmVjdFwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICghYWpheFBvc3QgJiYgY29ubmVjdGlvbi5tZXNzYWdlSWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBxcyArPSBcIiZtZXNzYWdlSWQ9XCIgKyBlbmNvZGVVUklDb21wb25lbnQoY29ubmVjdGlvbi5tZXNzYWdlSWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHVybCArPSBcIj9cIiArIHFzO1xyXG4gICAgICAgICAgICB1cmwgPSB0cmFuc3BvcnRMb2dpYy5wcmVwYXJlUXVlcnlTdHJpbmcoY29ubmVjdGlvbiwgdXJsKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghYWpheFBvc3QpIHtcclxuICAgICAgICAgICAgICAgIHVybCArPSBcIiZ0aWQ9XCIgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB1cmw7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgbWF4aW1pemVQZXJzaXN0ZW50UmVzcG9uc2U6IGZ1bmN0aW9uIChtaW5QZXJzaXN0ZW50UmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIE1lc3NhZ2VJZDogbWluUGVyc2lzdGVudFJlc3BvbnNlLkMsXHJcbiAgICAgICAgICAgICAgICBNZXNzYWdlczogbWluUGVyc2lzdGVudFJlc3BvbnNlLk0sXHJcbiAgICAgICAgICAgICAgICBJbml0aWFsaXplZDogdHlwZW9mIChtaW5QZXJzaXN0ZW50UmVzcG9uc2UuUykgIT09IFwidW5kZWZpbmVkXCIgPyB0cnVlIDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBTaG91bGRSZWNvbm5lY3Q6IHR5cGVvZiAobWluUGVyc2lzdGVudFJlc3BvbnNlLlQpICE9PSBcInVuZGVmaW5lZFwiID8gdHJ1ZSA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgTG9uZ1BvbGxEZWxheTogbWluUGVyc2lzdGVudFJlc3BvbnNlLkwsXHJcbiAgICAgICAgICAgICAgICBHcm91cHNUb2tlbjogbWluUGVyc2lzdGVudFJlc3BvbnNlLkdcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB1cGRhdGVHcm91cHM6IGZ1bmN0aW9uIChjb25uZWN0aW9uLCBncm91cHNUb2tlbikge1xyXG4gICAgICAgICAgICBpZiAoZ3JvdXBzVG9rZW4pIHtcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uZ3JvdXBzVG9rZW4gPSBncm91cHNUb2tlbjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHN0cmluZ2lmeVNlbmQ6IGZ1bmN0aW9uIChjb25uZWN0aW9uLCBtZXNzYWdlKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgKG1lc3NhZ2UpID09PSBcInN0cmluZ1wiIHx8IHR5cGVvZiAobWVzc2FnZSkgPT09IFwidW5kZWZpbmVkXCIgfHwgbWVzc2FnZSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGNvbm5lY3Rpb24uanNvbi5zdHJpbmdpZnkobWVzc2FnZSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYWpheFNlbmQ6IGZ1bmN0aW9uIChjb25uZWN0aW9uLCBkYXRhKSB7XHJcbiAgICAgICAgICAgIHZhciBwYXlsb2FkID0gdHJhbnNwb3J0TG9naWMuc3RyaW5naWZ5U2VuZChjb25uZWN0aW9uLCBkYXRhKSxcclxuICAgICAgICAgICAgICAgIHVybCA9IGdldEFqYXhVcmwoY29ubmVjdGlvbiwgXCIvc2VuZFwiKSxcclxuICAgICAgICAgICAgICAgIHhocixcclxuICAgICAgICAgICAgICAgIG9uRmFpbCA9IGZ1bmN0aW9uIChlcnJvciwgY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICQoY29ubmVjdGlvbikudHJpZ2dlckhhbmRsZXIoZXZlbnRzLm9uRXJyb3IsIFtzaWduYWxSLl8udHJhbnNwb3J0RXJyb3Ioc2lnbmFsUi5yZXNvdXJjZXMuc2VuZEZhaWxlZCwgY29ubmVjdGlvbi50cmFuc3BvcnQsIGVycm9yLCB4aHIpLCBkYXRhXSk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgICAgIHhociA9IHRyYW5zcG9ydExvZ2ljLmFqYXgoY29ubmVjdGlvbiwge1xyXG4gICAgICAgICAgICAgICAgdXJsOiB1cmwsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBjb25uZWN0aW9uLmFqYXhEYXRhVHlwZSA9PT0gXCJqc29ucFwiID8gXCJHRVRcIiA6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgY29udGVudFR5cGU6IHNpZ25hbFIuXy5kZWZhdWx0Q29udGVudFR5cGUsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogcGF5bG9hZFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVzO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMgPSBjb25uZWN0aW9uLl9wYXJzZVJlc3BvbnNlKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkZhaWwoZXJyb3IsIGNvbm5lY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5zdG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zcG9ydExvZ2ljLnRyaWdnZXJSZWNlaXZlZChjb25uZWN0aW9uLCByZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGVycm9yLCB0ZXh0U3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRleHRTdGF0dXMgPT09IFwiYWJvcnRcIiB8fCB0ZXh0U3RhdHVzID09PSBcInBhcnNlcmVycm9yXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhlIHBhcnNlcmVycm9yIGhhcHBlbnMgZm9yIHNlbmRzIHRoYXQgZG9uJ3QgcmV0dXJuIGFueSBkYXRhLCBhbmQgaGVuY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZG9uJ3Qgd3JpdGUgdGhlIGpzb25wIGNhbGxiYWNrIHRvIHRoZSByZXNwb25zZS4gVGhpcyBpcyBoYXJkZXIgdG8gZml4IG9uIHRoZSBzZXJ2ZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc28ganVzdCBoYWNrIGFyb3VuZCBpdCBvbiB0aGUgY2xpZW50IGZvciBub3cuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG9uRmFpbChlcnJvciwgY29ubmVjdGlvbik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHhocjtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBhamF4QWJvcnQ6IGZ1bmN0aW9uIChjb25uZWN0aW9uLCBhc3luYykge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIChjb25uZWN0aW9uLnRyYW5zcG9ydCkgPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gQXN5bmMgYnkgZGVmYXVsdCB1bmxlc3MgZXhwbGljaXRseSBvdmVyaWRkZW5cclxuICAgICAgICAgICAgYXN5bmMgPSB0eXBlb2YgYXN5bmMgPT09IFwidW5kZWZpbmVkXCIgPyB0cnVlIDogYXN5bmM7XHJcblxyXG4gICAgICAgICAgICB2YXIgdXJsID0gZ2V0QWpheFVybChjb25uZWN0aW9uLCBcIi9hYm9ydFwiKTtcclxuXHJcbiAgICAgICAgICAgIHRyYW5zcG9ydExvZ2ljLmFqYXgoY29ubmVjdGlvbiwge1xyXG4gICAgICAgICAgICAgICAgdXJsOiB1cmwsXHJcbiAgICAgICAgICAgICAgICBhc3luYzogYXN5bmMsXHJcbiAgICAgICAgICAgICAgICB0aW1lb3V0OiAxMDAwLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCJcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjb25uZWN0aW9uLmxvZyhcIkZpcmVkIGFqYXggYWJvcnQgYXN5bmMgPSBcIiArIGFzeW5jICsgXCIuXCIpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGFqYXhTdGFydDogZnVuY3Rpb24gKGNvbm5lY3Rpb24sIG9uU3VjY2Vzcykge1xyXG4gICAgICAgICAgICB2YXIgcmVqZWN0RGVmZXJyZWQgPSBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9IGNvbm5lY3Rpb24uX2RlZmVycmFsO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRlZmVycmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KGVycm9yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHRyaWdnZXJTdGFydEVycm9yID0gZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5sb2coXCJUaGUgc3RhcnQgcmVxdWVzdCBmYWlsZWQuIFN0b3BwaW5nIHRoZSBjb25uZWN0aW9uLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAkKGNvbm5lY3Rpb24pLnRyaWdnZXJIYW5kbGVyKGV2ZW50cy5vbkVycm9yLCBbZXJyb3JdKTtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3REZWZlcnJlZChlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5zdG9wKCk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgY29ubmVjdGlvbi5fLnN0YXJ0UmVxdWVzdCA9IHRyYW5zcG9ydExvZ2ljLmFqYXgoY29ubmVjdGlvbiwge1xyXG4gICAgICAgICAgICAgICAgdXJsOiBnZXRBamF4VXJsKGNvbm5lY3Rpb24sIFwiL3N0YXJ0XCIpLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3VsdCwgc3RhdHVzVGV4dCwgeGhyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGE7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEgPSBjb25uZWN0aW9uLl9wYXJzZVJlc3BvbnNlKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJpZ2dlclN0YXJ0RXJyb3Ioc2lnbmFsUi5fLmVycm9yKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2lnbmFsUi5fLmZvcm1hdChzaWduYWxSLnJlc291cmNlcy5lcnJvclBhcnNpbmdTdGFydFJlc3BvbnNlLCByZXN1bHQpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IsIHhocikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5SZXNwb25zZSA9PT0gXCJzdGFydGVkXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25TdWNjZXNzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJpZ2dlclN0YXJ0RXJyb3Ioc2lnbmFsUi5fLmVycm9yKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2lnbmFsUi5fLmZvcm1hdChzaWduYWxSLnJlc291cmNlcy5pbnZhbGlkU3RhcnRSZXNwb25zZSwgcmVzdWx0KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGwgLyogZXJyb3IgKi8sIHhocikpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKHhociwgc3RhdHVzVGV4dCwgZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdHVzVGV4dCAhPT0gc3RhcnRBYm9ydFRleHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJpZ2dlclN0YXJ0RXJyb3Ioc2lnbmFsUi5fLmVycm9yKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2lnbmFsUi5yZXNvdXJjZXMuZXJyb3JEdXJpbmdTdGFydFJlcXVlc3QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvciwgeGhyKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU3RvcCBoYXMgYmVlbiBjYWxsZWQsIG5vIG5lZWQgdG8gdHJpZ2dlciB0aGUgZXJyb3IgaGFuZGxlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBvciBzdG9wIHRoZSBjb25uZWN0aW9uIGFnYWluIHdpdGggb25TdGFydEVycm9yXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKFwiVGhlIHN0YXJ0IHJlcXVlc3QgYWJvcnRlZCBiZWNhdXNlIGNvbm5lY3Rpb24uc3RvcCgpIHdhcyBjYWxsZWQuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3REZWZlcnJlZChzaWduYWxSLl8uZXJyb3IoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaWduYWxSLnJlc291cmNlcy5zdG9wcGVkRHVyaW5nU3RhcnRSZXF1ZXN0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCAvKiBlcnJvciAqLywgeGhyKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB0cnlBYm9ydFN0YXJ0UmVxdWVzdDogZnVuY3Rpb24gKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgaWYgKGNvbm5lY3Rpb24uXy5zdGFydFJlcXVlc3QpIHtcclxuICAgICAgICAgICAgICAgIC8vIElmIHRoZSBzdGFydCByZXF1ZXN0IGhhcyBhbHJlYWR5IGNvbXBsZXRlZCB0aGlzIHdpbGwgbm9vcC5cclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uXy5zdGFydFJlcXVlc3QuYWJvcnQoc3RhcnRBYm9ydFRleHQpO1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIGNvbm5lY3Rpb24uXy5zdGFydFJlcXVlc3Q7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB0cnlJbml0aWFsaXplOiBmdW5jdGlvbiAoY29ubmVjdGlvbiwgcGVyc2lzdGVudFJlc3BvbnNlLCBvbkluaXRpYWxpemVkKSB7XHJcbiAgICAgICAgICAgIGlmIChwZXJzaXN0ZW50UmVzcG9uc2UuSW5pdGlhbGl6ZWQgJiYgb25Jbml0aWFsaXplZCkge1xyXG4gICAgICAgICAgICAgICAgb25Jbml0aWFsaXplZCgpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBlcnNpc3RlbnRSZXNwb25zZS5Jbml0aWFsaXplZCkge1xyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5sb2coXCJXQVJOSU5HISBUaGUgY2xpZW50IHJlY2VpdmVkIGFuIGluaXQgbWVzc2FnZSBhZnRlciByZWNvbm5lY3RpbmcuXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHRyaWdnZXJSZWNlaXZlZDogZnVuY3Rpb24gKGNvbm5lY3Rpb24sIGRhdGEpIHtcclxuICAgICAgICAgICAgaWYgKCFjb25uZWN0aW9uLl8uY29ubmVjdGluZ01lc3NhZ2VCdWZmZXIudHJ5QnVmZmVyKGRhdGEpKSB7XHJcbiAgICAgICAgICAgICAgICAkKGNvbm5lY3Rpb24pLnRyaWdnZXJIYW5kbGVyKGV2ZW50cy5vblJlY2VpdmVkLCBbZGF0YV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcHJvY2Vzc01lc3NhZ2VzOiBmdW5jdGlvbiAoY29ubmVjdGlvbiwgbWluRGF0YSwgb25Jbml0aWFsaXplZCkge1xyXG4gICAgICAgICAgICB2YXIgZGF0YTtcclxuXHJcbiAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgbGFzdCBtZXNzYWdlIHRpbWUgc3RhbXBcclxuICAgICAgICAgICAgdHJhbnNwb3J0TG9naWMubWFya0xhc3RNZXNzYWdlKGNvbm5lY3Rpb24pO1xyXG5cclxuICAgICAgICAgICAgaWYgKG1pbkRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGRhdGEgPSB0cmFuc3BvcnRMb2dpYy5tYXhpbWl6ZVBlcnNpc3RlbnRSZXNwb25zZShtaW5EYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0cmFuc3BvcnRMb2dpYy51cGRhdGVHcm91cHMoY29ubmVjdGlvbiwgZGF0YS5Hcm91cHNUb2tlbik7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuTWVzc2FnZUlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5tZXNzYWdlSWQgPSBkYXRhLk1lc3NhZ2VJZDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5NZXNzYWdlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICQuZWFjaChkYXRhLk1lc3NhZ2VzLCBmdW5jdGlvbiAoaW5kZXgsIG1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNwb3J0TG9naWMudHJpZ2dlclJlY2VpdmVkKGNvbm5lY3Rpb24sIG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnRMb2dpYy50cnlJbml0aWFsaXplKGNvbm5lY3Rpb24sIGRhdGEsIG9uSW5pdGlhbGl6ZWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgbW9uaXRvcktlZXBBbGl2ZTogZnVuY3Rpb24gKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgdmFyIGtlZXBBbGl2ZURhdGEgPSBjb25uZWN0aW9uLl8ua2VlcEFsaXZlRGF0YTtcclxuXHJcbiAgICAgICAgICAgIC8vIElmIHdlIGhhdmVuJ3QgaW5pdGlhdGVkIHRoZSBrZWVwIGFsaXZlIHRpbWVvdXRzIHRoZW4gd2UgbmVlZCB0b1xyXG4gICAgICAgICAgICBpZiAoIWtlZXBBbGl2ZURhdGEubW9uaXRvcmluZykge1xyXG4gICAgICAgICAgICAgICAga2VlcEFsaXZlRGF0YS5tb25pdG9yaW5nID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICB0cmFuc3BvcnRMb2dpYy5tYXJrTGFzdE1lc3NhZ2UoY29ubmVjdGlvbik7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gU2F2ZSB0aGUgZnVuY3Rpb24gc28gd2UgY2FuIHVuYmluZCBpdCBvbiBzdG9wXHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLl8ua2VlcEFsaXZlRGF0YS5yZWNvbm5lY3RLZWVwQWxpdmVVcGRhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gTWFyayBhIG5ldyBtZXNzYWdlIHNvIHRoYXQga2VlcCBhbGl2ZSBkb2Vzbid0IHRpbWUgb3V0IGNvbm5lY3Rpb25zXHJcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNwb3J0TG9naWMubWFya0xhc3RNZXNzYWdlKGNvbm5lY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgS2VlcCBhbGl2ZSBvbiByZWNvbm5lY3RcclxuICAgICAgICAgICAgICAgICQoY29ubmVjdGlvbikuYmluZChldmVudHMub25SZWNvbm5lY3QsIGNvbm5lY3Rpb24uXy5rZWVwQWxpdmVEYXRhLnJlY29ubmVjdEtlZXBBbGl2ZVVwZGF0ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5sb2coXCJOb3cgbW9uaXRvcmluZyBrZWVwIGFsaXZlIHdpdGggYSB3YXJuaW5nIHRpbWVvdXQgb2YgXCIgKyBrZWVwQWxpdmVEYXRhLnRpbWVvdXRXYXJuaW5nICsgXCIsIGtlZXAgYWxpdmUgdGltZW91dCBvZiBcIiArIGtlZXBBbGl2ZURhdGEudGltZW91dCArIFwiIGFuZCBkaXNjb25uZWN0aW5nIHRpbWVvdXQgb2YgXCIgKyBjb25uZWN0aW9uLmRpc2Nvbm5lY3RUaW1lb3V0KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKFwiVHJpZWQgdG8gbW9uaXRvciBrZWVwIGFsaXZlIGJ1dCBpdCdzIGFscmVhZHkgYmVpbmcgbW9uaXRvcmVkLlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHN0b3BNb25pdG9yaW5nS2VlcEFsaXZlOiBmdW5jdGlvbiAoY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICB2YXIga2VlcEFsaXZlRGF0YSA9IGNvbm5lY3Rpb24uXy5rZWVwQWxpdmVEYXRhO1xyXG5cclxuICAgICAgICAgICAgLy8gT25seSBhdHRlbXB0IHRvIHN0b3AgdGhlIGtlZXAgYWxpdmUgbW9uaXRvcmluZyBpZiBpdHMgYmVpbmcgbW9uaXRvcmVkXHJcbiAgICAgICAgICAgIGlmIChrZWVwQWxpdmVEYXRhLm1vbml0b3JpbmcpIHtcclxuICAgICAgICAgICAgICAgIC8vIFN0b3AgbW9uaXRvcmluZ1xyXG4gICAgICAgICAgICAgICAga2VlcEFsaXZlRGF0YS5tb25pdG9yaW5nID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHRoZSB1cGRhdGVLZWVwQWxpdmUgZnVuY3Rpb24gZnJvbSB0aGUgcmVjb25uZWN0IGV2ZW50XHJcbiAgICAgICAgICAgICAgICAkKGNvbm5lY3Rpb24pLnVuYmluZChldmVudHMub25SZWNvbm5lY3QsIGNvbm5lY3Rpb24uXy5rZWVwQWxpdmVEYXRhLnJlY29ubmVjdEtlZXBBbGl2ZVVwZGF0ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQ2xlYXIgYWxsIHRoZSBrZWVwIGFsaXZlIGRhdGFcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uXy5rZWVwQWxpdmVEYXRhID0ge307XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmxvZyhcIlN0b3BwaW5nIHRoZSBtb25pdG9yaW5nIG9mIHRoZSBrZWVwIGFsaXZlLlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHN0YXJ0SGVhcnRiZWF0OiBmdW5jdGlvbiAoY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICBjb25uZWN0aW9uLl8ubGFzdEFjdGl2ZUF0ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgICAgIGJlYXQoY29ubmVjdGlvbik7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgbWFya0xhc3RNZXNzYWdlOiBmdW5jdGlvbiAoY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICBjb25uZWN0aW9uLl8ubGFzdE1lc3NhZ2VBdCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG1hcmtBY3RpdmU6IGZ1bmN0aW9uIChjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIGlmICh0cmFuc3BvcnRMb2dpYy52ZXJpZnlMYXN0QWN0aXZlKGNvbm5lY3Rpb24pKSB7XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLl8ubGFzdEFjdGl2ZUF0ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGlzQ29ubmVjdGVkT3JSZWNvbm5lY3Rpbmc6IGZ1bmN0aW9uIChjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjb25uZWN0aW9uLnN0YXRlID09PSBzaWduYWxSLmNvbm5lY3Rpb25TdGF0ZS5jb25uZWN0ZWQgfHxcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uc3RhdGUgPT09IHNpZ25hbFIuY29ubmVjdGlvblN0YXRlLnJlY29ubmVjdGluZztcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBlbnN1cmVSZWNvbm5lY3RpbmdTdGF0ZTogZnVuY3Rpb24gKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgaWYgKGNoYW5nZVN0YXRlKGNvbm5lY3Rpb24sXHJcbiAgICAgICAgICAgICAgICBzaWduYWxSLmNvbm5lY3Rpb25TdGF0ZS5jb25uZWN0ZWQsXHJcbiAgICAgICAgICAgICAgICBzaWduYWxSLmNvbm5lY3Rpb25TdGF0ZS5yZWNvbm5lY3RpbmcpID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAkKGNvbm5lY3Rpb24pLnRyaWdnZXJIYW5kbGVyKGV2ZW50cy5vblJlY29ubmVjdGluZyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGNvbm5lY3Rpb24uc3RhdGUgPT09IHNpZ25hbFIuY29ubmVjdGlvblN0YXRlLnJlY29ubmVjdGluZztcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjbGVhclJlY29ubmVjdFRpbWVvdXQ6IGZ1bmN0aW9uIChjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIGlmIChjb25uZWN0aW9uICYmIGNvbm5lY3Rpb24uXy5yZWNvbm5lY3RUaW1lb3V0KSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KGNvbm5lY3Rpb24uXy5yZWNvbm5lY3RUaW1lb3V0KTtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBjb25uZWN0aW9uLl8ucmVjb25uZWN0VGltZW91dDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHZlcmlmeUxhc3RBY3RpdmU6IGZ1bmN0aW9uIChjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIGlmIChuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIGNvbm5lY3Rpb24uXy5sYXN0QWN0aXZlQXQgPj0gY29ubmVjdGlvbi5yZWNvbm5lY3RXaW5kb3cpIHtcclxuICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gc2lnbmFsUi5fLmZvcm1hdChzaWduYWxSLnJlc291cmNlcy5yZWNvbm5lY3RXaW5kb3dUaW1lb3V0LCBuZXcgRGF0ZShjb25uZWN0aW9uLl8ubGFzdEFjdGl2ZUF0KSwgY29ubmVjdGlvbi5yZWNvbm5lY3RXaW5kb3cpO1xyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5sb2cobWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAkKGNvbm5lY3Rpb24pLnRyaWdnZXJIYW5kbGVyKGV2ZW50cy5vbkVycm9yLCBbc2lnbmFsUi5fLmVycm9yKG1lc3NhZ2UsIC8qIHNvdXJjZSAqLyBcIlRpbWVvdXRFeGNlcHRpb25cIildKTtcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uc3RvcCgvKiBhc3luYyAqLyBmYWxzZSwgLyogbm90aWZ5U2VydmVyICovIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcmVjb25uZWN0OiBmdW5jdGlvbiAoY29ubmVjdGlvbiwgdHJhbnNwb3J0TmFtZSkge1xyXG4gICAgICAgICAgICB2YXIgdHJhbnNwb3J0ID0gc2lnbmFsUi50cmFuc3BvcnRzW3RyYW5zcG9ydE5hbWVdO1xyXG5cclxuICAgICAgICAgICAgLy8gV2Ugc2hvdWxkIG9ubHkgc2V0IGEgcmVjb25uZWN0VGltZW91dCBpZiB3ZSBhcmUgY3VycmVudGx5IGNvbm5lY3RlZFxyXG4gICAgICAgICAgICAvLyBhbmQgYSByZWNvbm5lY3RUaW1lb3V0IGlzbid0IGFscmVhZHkgc2V0LlxyXG4gICAgICAgICAgICBpZiAodHJhbnNwb3J0TG9naWMuaXNDb25uZWN0ZWRPclJlY29ubmVjdGluZyhjb25uZWN0aW9uKSAmJiAhY29ubmVjdGlvbi5fLnJlY29ubmVjdFRpbWVvdXQpIHtcclxuICAgICAgICAgICAgICAgIC8vIE5lZWQgdG8gdmVyaWZ5IGJlZm9yZSB0aGUgc2V0VGltZW91dCBvY2N1cnMgYmVjYXVzZSBhbiBhcHBsaWNhdGlvbiBzbGVlcCBjb3VsZCBvY2N1ciBkdXJpbmcgdGhlIHNldFRpbWVvdXQgZHVyYXRpb24uXHJcbiAgICAgICAgICAgICAgICBpZiAoIXRyYW5zcG9ydExvZ2ljLnZlcmlmeUxhc3RBY3RpdmUoY29ubmVjdGlvbikpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5fLnJlY29ubmVjdFRpbWVvdXQgPSB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0cmFuc3BvcnRMb2dpYy52ZXJpZnlMYXN0QWN0aXZlKGNvbm5lY3Rpb24pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zcG9ydC5zdG9wKGNvbm5lY3Rpb24pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodHJhbnNwb3J0TG9naWMuZW5zdXJlUmVjb25uZWN0aW5nU3RhdGUoY29ubmVjdGlvbikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5sb2codHJhbnNwb3J0TmFtZSArIFwiIHJlY29ubmVjdGluZy5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zcG9ydC5zdGFydChjb25uZWN0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LCBjb25uZWN0aW9uLnJlY29ubmVjdERlbGF5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGhhbmRsZVBhcnNlRmFpbHVyZTogZnVuY3Rpb24gKGNvbm5lY3Rpb24sIHJlc3VsdCwgZXJyb3IsIG9uRmFpbGVkLCBjb250ZXh0KSB7XHJcbiAgICAgICAgICAgIHZhciB3cmFwcGVkRXJyb3IgPSBzaWduYWxSLl8udHJhbnNwb3J0RXJyb3IoXHJcbiAgICAgICAgICAgICAgICBzaWduYWxSLl8uZm9ybWF0KHNpZ25hbFIucmVzb3VyY2VzLnBhcnNlRmFpbGVkLCByZXN1bHQpLFxyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi50cmFuc3BvcnQsXHJcbiAgICAgICAgICAgICAgICBlcnJvcixcclxuICAgICAgICAgICAgICAgIGNvbnRleHQpO1xyXG5cclxuICAgICAgICAgICAgLy8gSWYgd2UncmUgaW4gdGhlIGluaXRpYWxpemF0aW9uIHBoYXNlIHRyaWdnZXIgb25GYWlsZWQsIG90aGVyd2lzZSBzdG9wIHRoZSBjb25uZWN0aW9uLlxyXG4gICAgICAgICAgICBpZiAob25GYWlsZWQgJiYgb25GYWlsZWQod3JhcHBlZEVycm9yKSkge1xyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5sb2coXCJGYWlsZWQgdG8gcGFyc2Ugc2VydmVyIHJlc3BvbnNlIHdoaWxlIGF0dGVtcHRpbmcgdG8gY29ubmVjdC5cIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkKGNvbm5lY3Rpb24pLnRyaWdnZXJIYW5kbGVyKGV2ZW50cy5vbkVycm9yLCBbd3JhcHBlZEVycm9yXSk7XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnN0b3AoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGluaXRIYW5kbGVyOiBmdW5jdGlvbiAoY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEluaXRIYW5kbGVyKGNvbm5lY3Rpb24pO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGZvcmV2ZXJGcmFtZToge1xyXG4gICAgICAgICAgICBjb3VudDogMCxcclxuICAgICAgICAgICAgY29ubmVjdGlvbnM6IHt9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbn0oalF1ZXJ5U2hpbSwgd2luZG93KSk7XHJcbi8qIGpxdWVyeS5zaWduYWxSLnRyYW5zcG9ydHMud2ViU29ja2V0cy5qcyAqL1xyXG4vLyBDb3B5cmlnaHQgKGMpIC5ORVQgRm91bmRhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXHJcblxyXG5cclxuLypnbG9iYWwgd2luZG93OmZhbHNlICovXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJqcXVlcnkuc2lnbmFsUi50cmFuc3BvcnRzLmNvbW1vbi5qc1wiIC8+XHJcblxyXG4oZnVuY3Rpb24gKCQsIHdpbmRvdywgdW5kZWZpbmVkKSB7XHJcblxyXG4gICAgdmFyIHNpZ25hbFIgPSAkLnNpZ25hbFIsXHJcbiAgICAgICAgZXZlbnRzID0gJC5zaWduYWxSLmV2ZW50cyxcclxuICAgICAgICBjaGFuZ2VTdGF0ZSA9ICQuc2lnbmFsUi5jaGFuZ2VTdGF0ZSxcclxuICAgICAgICB0cmFuc3BvcnRMb2dpYyA9IHNpZ25hbFIudHJhbnNwb3J0cy5fbG9naWM7XHJcblxyXG4gICAgc2lnbmFsUi50cmFuc3BvcnRzLndlYlNvY2tldHMgPSB7XHJcbiAgICAgICAgbmFtZTogXCJ3ZWJTb2NrZXRzXCIsXHJcblxyXG4gICAgICAgIHN1cHBvcnRzS2VlcEFsaXZlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNlbmQ6IGZ1bmN0aW9uIChjb25uZWN0aW9uLCBkYXRhKSB7XHJcbiAgICAgICAgICAgIHZhciBwYXlsb2FkID0gdHJhbnNwb3J0TG9naWMuc3RyaW5naWZ5U2VuZChjb25uZWN0aW9uLCBkYXRhKTtcclxuXHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnNvY2tldC5zZW5kKHBheWxvYWQpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChleCkge1xyXG4gICAgICAgICAgICAgICAgJChjb25uZWN0aW9uKS50cmlnZ2VySGFuZGxlcihldmVudHMub25FcnJvcixcclxuICAgICAgICAgICAgICAgICAgICBbc2lnbmFsUi5fLnRyYW5zcG9ydEVycm9yKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaWduYWxSLnJlc291cmNlcy53ZWJTb2NrZXRzSW52YWxpZFN0YXRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnRyYW5zcG9ydCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uc29ja2V0XHJcbiAgICAgICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc3RhcnQ6IGZ1bmN0aW9uIChjb25uZWN0aW9uLCBvblN1Y2Nlc3MsIG9uRmFpbGVkKSB7XHJcbiAgICAgICAgICAgIHZhciB1cmwsXHJcbiAgICAgICAgICAgICAgICBvcGVuZWQgPSBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHRoYXQgPSB0aGlzLFxyXG4gICAgICAgICAgICAgICAgcmVjb25uZWN0aW5nID0gIW9uU3VjY2VzcyxcclxuICAgICAgICAgICAgICAgICRjb25uZWN0aW9uID0gJChjb25uZWN0aW9uKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghKHdpbmRvdyBhcyBhbnkpLldlYlNvY2tldCkge1xyXG4gICAgICAgICAgICAgICAgb25GYWlsZWQoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCFjb25uZWN0aW9uLnNvY2tldCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbm5lY3Rpb24ud2ViU29ja2V0U2VydmVyVXJsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsID0gY29ubmVjdGlvbi53ZWJTb2NrZXRTZXJ2ZXJVcmw7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHVybCA9IGNvbm5lY3Rpb24ud3NQcm90b2NvbCArIGNvbm5lY3Rpb24uaG9zdDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB1cmwgKz0gdHJhbnNwb3J0TG9naWMuZ2V0VXJsKGNvbm5lY3Rpb24sIHRoaXMubmFtZSwgcmVjb25uZWN0aW5nKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmxvZyhcIkNvbm5lY3RpbmcgdG8gd2Vic29ja2V0IGVuZHBvaW50ICdcIiArIHVybCArIFwiJy5cIik7XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnNvY2tldCA9IG5ldyBXZWJTb2NrZXQodXJsKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnNvY2tldC5vbm9wZW4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3BlbmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmxvZyhcIldlYnNvY2tldCBvcGVuZWQuXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnRMb2dpYy5jbGVhclJlY29ubmVjdFRpbWVvdXQoY29ubmVjdGlvbik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGFuZ2VTdGF0ZShjb25uZWN0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaWduYWxSLmNvbm5lY3Rpb25TdGF0ZS5yZWNvbm5lY3RpbmcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25hbFIuY29ubmVjdGlvblN0YXRlLmNvbm5lY3RlZCkgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGNvbm5lY3Rpb24udHJpZ2dlckhhbmRsZXIoZXZlbnRzLm9uUmVjb25uZWN0KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uc29ja2V0Lm9uY2xvc2UgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZXJyb3I7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIE9ubHkgaGFuZGxlIGEgc29ja2V0IGNsb3NlIGlmIHRoZSBjbG9zZSBpcyBmcm9tIHRoZSBjdXJyZW50IHNvY2tldC5cclxuICAgICAgICAgICAgICAgICAgICAvLyBTb21ldGltZXMgb24gZGlzY29ubmVjdCB0aGUgc2VydmVyIHdpbGwgcHVzaCBkb3duIGFuIG9uY2xvc2UgZXZlbnRcclxuICAgICAgICAgICAgICAgICAgICAvLyB0byBhbiBleHBpcmVkIHNvY2tldC5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMgPT09IGNvbm5lY3Rpb24uc29ja2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcGVuZWQgJiYgdHlwZW9mIGV2ZW50Lndhc0NsZWFuICE9PSBcInVuZGVmaW5lZFwiICYmIGV2ZW50Lndhc0NsZWFuID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWRlYWxseSB0aGlzIHdvdWxkIHVzZSB0aGUgd2Vic29ja2V0Lm9uZXJyb3IgaGFuZGxlciAocmF0aGVyIHRoYW4gY2hlY2tpbmcgd2FzQ2xlYW4gaW4gb25jbG9zZSkgYnV0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJIGZvdW5kIGluIHNvbWUgY2lyY3Vtc3RhbmNlcyBDaHJvbWUgd29uJ3QgY2FsbCBvbmVycm9yLiBUaGlzIGltcGxlbWVudGF0aW9uIHNlZW1zIHRvIHdvcmsgb24gYWxsIGJyb3dzZXJzLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IgPSBzaWduYWxSLl8udHJhbnNwb3J0RXJyb3IoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2lnbmFsUi5yZXNvdXJjZXMud2ViU29ja2V0Q2xvc2VkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24udHJhbnNwb3J0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmxvZyhcIlVuY2xlYW4gZGlzY29ubmVjdCBmcm9tIHdlYnNvY2tldDogXCIgKyAoZXZlbnQucmVhc29uIHx8IFwiW25vIHJlYXNvbiBnaXZlbl0uXCIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKFwiV2Vic29ja2V0IGNsb3NlZC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghb25GYWlsZWQgfHwgIW9uRmFpbGVkKGVycm9yKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChjb25uZWN0aW9uKS50cmlnZ2VySGFuZGxlcihldmVudHMub25FcnJvciwgW2Vycm9yXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yZWNvbm5lY3QoY29ubmVjdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uc29ja2V0Lm9ubWVzc2FnZSA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXRhO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0gY29ubmVjdGlvbi5fcGFyc2VSZXNwb25zZShldmVudC5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zcG9ydExvZ2ljLmhhbmRsZVBhcnNlRmFpbHVyZShjb25uZWN0aW9uLCBldmVudC5kYXRhLCBlcnJvciwgb25GYWlsZWQsIGV2ZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZGF0YS5NIGlzIFBlcnNpc3RlbnRSZXNwb25zZS5NZXNzYWdlc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJC5pc0VtcHR5T2JqZWN0KGRhdGEpIHx8IGRhdGEuTSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNwb3J0TG9naWMucHJvY2Vzc01lc3NhZ2VzKGNvbm5lY3Rpb24sIGRhdGEsIG9uU3VjY2Vzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBGb3Igd2Vic29ja2V0cyB3ZSBuZWVkIHRvIHRyaWdnZXIgb25SZWNlaXZlZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZm9yIGNhbGxiYWNrcyB0byBvdXRnb2luZyBodWIgY2FsbHMuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnRMb2dpYy50cmlnZ2VyUmVjZWl2ZWQoY29ubmVjdGlvbiwgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcmVjb25uZWN0OiBmdW5jdGlvbiAoY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICB0cmFuc3BvcnRMb2dpYy5yZWNvbm5lY3QoY29ubmVjdGlvbiwgdGhpcy5uYW1lKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBsb3N0Q29ubmVjdGlvbjogZnVuY3Rpb24gKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgdGhpcy5yZWNvbm5lY3QoY29ubmVjdGlvbik7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc3RvcDogZnVuY3Rpb24gKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgLy8gRG9uJ3QgdHJpZ2dlciBhIHJlY29ubmVjdCBhZnRlciBzdG9wcGluZ1xyXG4gICAgICAgICAgICB0cmFuc3BvcnRMb2dpYy5jbGVhclJlY29ubmVjdFRpbWVvdXQoY29ubmVjdGlvbik7XHJcblxyXG4gICAgICAgICAgICBpZiAoY29ubmVjdGlvbi5zb2NrZXQpIHtcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKFwiQ2xvc2luZyB0aGUgV2Vic29ja2V0LlwiKTtcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uc29ja2V0LmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnNvY2tldCA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBhYm9ydDogZnVuY3Rpb24gKGNvbm5lY3Rpb24sIGFzeW5jKSB7XHJcbiAgICAgICAgICAgIHRyYW5zcG9ydExvZ2ljLmFqYXhBYm9ydChjb25uZWN0aW9uLCBhc3luYyk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbn0oalF1ZXJ5U2hpbSwgd2luZG93KSk7XHJcbi8qIGpxdWVyeS5zaWduYWxSLnRyYW5zcG9ydHMuc2VydmVyU2VudEV2ZW50cy5qcyAqL1xyXG4vLyBDb3B5cmlnaHQgKGMpIC5ORVQgRm91bmRhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXHJcblxyXG5cclxuLypnbG9iYWwgd2luZG93OmZhbHNlICovXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJqcXVlcnkuc2lnbmFsUi50cmFuc3BvcnRzLmNvbW1vbi5qc1wiIC8+XHJcblxyXG4oZnVuY3Rpb24gKCQsIHdpbmRvdywgdW5kZWZpbmVkKSB7XHJcblxyXG4gICAgdmFyIHNpZ25hbFIgPSAkLnNpZ25hbFIsXHJcbiAgICAgICAgZXZlbnRzID0gJC5zaWduYWxSLmV2ZW50cyxcclxuICAgICAgICBjaGFuZ2VTdGF0ZSA9ICQuc2lnbmFsUi5jaGFuZ2VTdGF0ZSxcclxuICAgICAgICB0cmFuc3BvcnRMb2dpYyA9IHNpZ25hbFIudHJhbnNwb3J0cy5fbG9naWMsXHJcbiAgICAgICAgY2xlYXJSZWNvbm5lY3RBdHRlbXB0VGltZW91dCA9IGZ1bmN0aW9uIChjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQoY29ubmVjdGlvbi5fLnJlY29ubmVjdEF0dGVtcHRUaW1lb3V0SGFuZGxlKTtcclxuICAgICAgICAgICAgZGVsZXRlIGNvbm5lY3Rpb24uXy5yZWNvbm5lY3RBdHRlbXB0VGltZW91dEhhbmRsZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgIHNpZ25hbFIudHJhbnNwb3J0cy5zZXJ2ZXJTZW50RXZlbnRzID0ge1xyXG4gICAgICAgIG5hbWU6IFwic2VydmVyU2VudEV2ZW50c1wiLFxyXG5cclxuICAgICAgICBzdXBwb3J0c0tlZXBBbGl2ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB0aW1lT3V0OiAzMDAwLFxyXG5cclxuICAgICAgICBzdGFydDogZnVuY3Rpb24gKGNvbm5lY3Rpb24sIG9uU3VjY2Vzcywgb25GYWlsZWQpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzLFxyXG4gICAgICAgICAgICAgICAgb3BlbmVkID0gZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAkY29ubmVjdGlvbiA9ICQoY29ubmVjdGlvbiksXHJcbiAgICAgICAgICAgICAgICByZWNvbm5lY3RpbmcgPSAhb25TdWNjZXNzLFxyXG4gICAgICAgICAgICAgICAgdXJsO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNvbm5lY3Rpb24uZXZlbnRTb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKFwiVGhlIGNvbm5lY3Rpb24gYWxyZWFkeSBoYXMgYW4gZXZlbnQgc291cmNlLiBTdG9wcGluZyBpdC5cIik7XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnN0b3AoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCEod2luZG93IGFzIGFueSkuRXZlbnRTb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgIGlmIChvbkZhaWxlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKFwiVGhpcyBicm93c2VyIGRvZXNuJ3Qgc3VwcG9ydCBTU0UuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIG9uRmFpbGVkKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHVybCA9IHRyYW5zcG9ydExvZ2ljLmdldFVybChjb25uZWN0aW9uLCB0aGlzLm5hbWUsIHJlY29ubmVjdGluZyk7XHJcblxyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5sb2coXCJBdHRlbXB0aW5nIHRvIGNvbm5lY3QgdG8gU1NFIGVuZHBvaW50ICdcIiArIHVybCArIFwiJy5cIik7XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmV2ZW50U291cmNlID0gbmV3IEV2ZW50U291cmNlKHVybCwgeyB3aXRoQ3JlZGVudGlhbHM6IGNvbm5lY3Rpb24ud2l0aENyZWRlbnRpYWxzIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmxvZyhcIkV2ZW50U291cmNlIGZhaWxlZCB0cnlpbmcgdG8gY29ubmVjdCB3aXRoIGVycm9yIFwiICsgZS5NZXNzYWdlICsgXCIuXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG9uRmFpbGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVGhlIGNvbm5lY3Rpb24gZmFpbGVkLCBjYWxsIHRoZSBmYWlsZWQgY2FsbGJhY2tcclxuICAgICAgICAgICAgICAgICAgICBvbkZhaWxlZCgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkY29ubmVjdGlvbi50cmlnZ2VySGFuZGxlcihldmVudHMub25FcnJvciwgW3NpZ25hbFIuXy50cmFuc3BvcnRFcnJvcihzaWduYWxSLnJlc291cmNlcy5ldmVudFNvdXJjZUZhaWxlZFRvQ29ubmVjdCwgY29ubmVjdGlvbi50cmFuc3BvcnQsIGUpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlY29ubmVjdGluZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBJZiB3ZSB3ZXJlIHJlY29ubmVjdGluZywgcmF0aGVyIHRoYW4gZG9pbmcgaW5pdGlhbCBjb25uZWN0LCB0aGVuIHRyeSByZWNvbm5lY3QgYWdhaW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yZWNvbm5lY3QoY29ubmVjdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAocmVjb25uZWN0aW5nKSB7XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLl8ucmVjb25uZWN0QXR0ZW1wdFRpbWVvdXRIYW5kbGUgPSB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wZW5lZCA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgd2UncmUgcmVjb25uZWN0aW5nIGFuZCB0aGUgZXZlbnQgc291cmNlIGlzIGF0dGVtcHRpbmcgdG8gY29ubmVjdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZG9uJ3Qga2VlcCByZXRyeWluZy4gVGhpcyBjYXVzZXMgZHVwbGljYXRlIGNvbm5lY3Rpb25zIHRvIHNwYXduLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29ubmVjdGlvbi5ldmVudFNvdXJjZS5yZWFkeVN0YXRlICE9PSBFdmVudFNvdXJjZS5PUEVOKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJZiB3ZSB3ZXJlIHJlY29ubmVjdGluZywgcmF0aGVyIHRoYW4gZG9pbmcgaW5pdGlhbCBjb25uZWN0LCB0aGVuIHRyeSByZWNvbm5lY3QgYWdhaW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucmVjb25uZWN0KGNvbm5lY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnRpbWVPdXQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25uZWN0aW9uLmV2ZW50U291cmNlLmFkZEV2ZW50TGlzdGVuZXIoXCJvcGVuXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmxvZyhcIkV2ZW50U291cmNlIGNvbm5lY3RlZC5cIik7XHJcblxyXG4gICAgICAgICAgICAgICAgY2xlYXJSZWNvbm5lY3RBdHRlbXB0VGltZW91dChjb25uZWN0aW9uKTtcclxuICAgICAgICAgICAgICAgIHRyYW5zcG9ydExvZ2ljLmNsZWFyUmVjb25uZWN0VGltZW91dChjb25uZWN0aW9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAob3BlbmVkID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5lZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGFuZ2VTdGF0ZShjb25uZWN0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaWduYWxSLmNvbm5lY3Rpb25TdGF0ZS5yZWNvbm5lY3RpbmcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25hbFIuY29ubmVjdGlvblN0YXRlLmNvbm5lY3RlZCkgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGNvbm5lY3Rpb24udHJpZ2dlckhhbmRsZXIoZXZlbnRzLm9uUmVjb25uZWN0KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24uZXZlbnRTb3VyY2UuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIHZhciByZXM7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gcHJvY2VzcyBtZXNzYWdlc1xyXG4gICAgICAgICAgICAgICAgaWYgKGUuZGF0YSA9PT0gXCJpbml0aWFsaXplZFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzID0gY29ubmVjdGlvbi5fcGFyc2VSZXNwb25zZShlLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNwb3J0TG9naWMuaGFuZGxlUGFyc2VGYWlsdXJlKGNvbm5lY3Rpb24sIGUuZGF0YSwgZXJyb3IsIG9uRmFpbGVkLCBlKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdHJhbnNwb3J0TG9naWMucHJvY2Vzc01lc3NhZ2VzKGNvbm5lY3Rpb24sIHJlcywgb25TdWNjZXNzKTtcclxuICAgICAgICAgICAgfSwgZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgY29ubmVjdGlvbi5ldmVudFNvdXJjZS5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIHZhciBlcnJvciA9IHNpZ25hbFIuXy50cmFuc3BvcnRFcnJvcihcclxuICAgICAgICAgICAgICAgICAgICBzaWduYWxSLnJlc291cmNlcy5ldmVudFNvdXJjZUVycm9yLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24udHJhbnNwb3J0LFxyXG4gICAgICAgICAgICAgICAgICAgIGUpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIE9ubHkgaGFuZGxlIGFuIGVycm9yIGlmIHRoZSBlcnJvciBpcyBmcm9tIHRoZSBjdXJyZW50IEV2ZW50IFNvdXJjZS5cclxuICAgICAgICAgICAgICAgIC8vIFNvbWV0aW1lcyBvbiBkaXNjb25uZWN0IHRoZSBzZXJ2ZXIgd2lsbCBwdXNoIGRvd24gYW4gZXJyb3IgZXZlbnRcclxuICAgICAgICAgICAgICAgIC8vIHRvIGFuIGV4cGlyZWQgRXZlbnQgU291cmNlLlxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMgIT09IGNvbm5lY3Rpb24uZXZlbnRTb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG9uRmFpbGVkICYmIG9uRmFpbGVkKGVycm9yKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmxvZyhcIkV2ZW50U291cmNlIHJlYWR5U3RhdGU6IFwiICsgY29ubmVjdGlvbi5ldmVudFNvdXJjZS5yZWFkeVN0YXRlICsgXCIuXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChlLmV2ZW50UGhhc2UgPT09IEV2ZW50U291cmNlLkNMT1NFRCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFdlIGRvbid0IHVzZSB0aGUgRXZlbnRTb3VyY2UncyBuYXRpdmUgcmVjb25uZWN0IGZ1bmN0aW9uIGFzIGl0XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZG9lc24ndCBhbGxvdyB1cyB0byBjaGFuZ2UgdGhlIFVSTCB3aGVuIHJlY29ubmVjdGluZy4gV2UgbmVlZFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRvIGNoYW5nZSB0aGUgVVJMIHRvIG5vdCBpbmNsdWRlIHRoZSAvY29ubmVjdCBzdWZmaXgsIGFuZCBwYXNzXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhlIGxhc3QgbWVzc2FnZSBpZCB3ZSByZWNlaXZlZC5cclxuICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmxvZyhcIkV2ZW50U291cmNlIHJlY29ubmVjdGluZyBkdWUgdG8gdGhlIHNlcnZlciBjb25uZWN0aW9uIGVuZGluZy5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5yZWNvbm5lY3QoY29ubmVjdGlvbik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbm5lY3Rpb24gZXJyb3JcclxuICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmxvZyhcIkV2ZW50U291cmNlIGVycm9yLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAkY29ubmVjdGlvbi50cmlnZ2VySGFuZGxlcihldmVudHMub25FcnJvciwgW2Vycm9yXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIGZhbHNlKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICByZWNvbm5lY3Q6IGZ1bmN0aW9uIChjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIHRyYW5zcG9ydExvZ2ljLnJlY29ubmVjdChjb25uZWN0aW9uLCB0aGlzLm5hbWUpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGxvc3RDb25uZWN0aW9uOiBmdW5jdGlvbiAoY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICB0aGlzLnJlY29ubmVjdChjb25uZWN0aW9uKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzZW5kOiBmdW5jdGlvbiAoY29ubmVjdGlvbiwgZGF0YSkge1xyXG4gICAgICAgICAgICB0cmFuc3BvcnRMb2dpYy5hamF4U2VuZChjb25uZWN0aW9uLCBkYXRhKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzdG9wOiBmdW5jdGlvbiAoY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICAvLyBEb24ndCB0cmlnZ2VyIGEgcmVjb25uZWN0IGFmdGVyIHN0b3BwaW5nXHJcbiAgICAgICAgICAgIGNsZWFyUmVjb25uZWN0QXR0ZW1wdFRpbWVvdXQoY29ubmVjdGlvbik7XHJcbiAgICAgICAgICAgIHRyYW5zcG9ydExvZ2ljLmNsZWFyUmVjb25uZWN0VGltZW91dChjb25uZWN0aW9uKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjb25uZWN0aW9uICYmIGNvbm5lY3Rpb24uZXZlbnRTb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKFwiRXZlbnRTb3VyY2UgY2FsbGluZyBjbG9zZSgpLlwiKTtcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uZXZlbnRTb3VyY2UuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uZXZlbnRTb3VyY2UgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIGNvbm5lY3Rpb24uZXZlbnRTb3VyY2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBhYm9ydDogZnVuY3Rpb24gKGNvbm5lY3Rpb24sIGFzeW5jKSB7XHJcbiAgICAgICAgICAgIHRyYW5zcG9ydExvZ2ljLmFqYXhBYm9ydChjb25uZWN0aW9uLCBhc3luYyk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbn0oalF1ZXJ5U2hpbSwgd2luZG93KSk7XHJcbi8qIGpxdWVyeS5zaWduYWxSLnRyYW5zcG9ydHMuZm9yZXZlckZyYW1lLmpzICovXHJcbi8vIENvcHlyaWdodCAoYykgLk5FVCBGb3VuZGF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxuXHJcblxyXG4vKmdsb2JhbCB3aW5kb3c6ZmFsc2UgKi9cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cImpxdWVyeS5zaWduYWxSLnRyYW5zcG9ydHMuY29tbW9uLmpzXCIgLz5cclxuXHJcbihmdW5jdGlvbiAoJCwgd2luZG93LCB1bmRlZmluZWQpIHtcclxuXHJcbiAgICB2YXIgc2lnbmFsUiA9ICQuc2lnbmFsUixcclxuICAgICAgICBldmVudHMgPSAkLnNpZ25hbFIuZXZlbnRzLFxyXG4gICAgICAgIGNoYW5nZVN0YXRlID0gJC5zaWduYWxSLmNoYW5nZVN0YXRlLFxyXG4gICAgICAgIHRyYW5zcG9ydExvZ2ljID0gc2lnbmFsUi50cmFuc3BvcnRzLl9sb2dpYyxcclxuICAgICAgICBjcmVhdGVGcmFtZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGZyYW1lID0gd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpZnJhbWVcIik7XHJcbiAgICAgICAgICAgIGZyYW1lLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwicG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDowO3dpZHRoOjA7aGVpZ2h0OjA7dmlzaWJpbGl0eTpoaWRkZW47XCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gZnJhbWU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvLyBVc2VkIHRvIHByZXZlbnQgaW5maW5pdGUgbG9hZGluZyBpY29uIHNwaW5zIGluIG9sZGVyIHZlcnNpb25zIG9mIGllXHJcbiAgICAgICAgLy8gV2UgYnVpbGQgdGhpcyBvYmplY3QgaW5zaWRlIGEgY2xvc3VyZSBzbyB3ZSBkb24ndCBwb2xsdXRlIHRoZSByZXN0IG9mXHJcbiAgICAgICAgLy8gdGhlIGZvcmV2ZXJGcmFtZSB0cmFuc3BvcnQgd2l0aCB1bm5lY2Vzc2FyeSBmdW5jdGlvbnMvdXRpbGl0aWVzLlxyXG4gICAgICAgIGxvYWRQcmV2ZW50ZXIgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgbG9hZGluZ0ZpeEludGVydmFsSWQgPSBudWxsLFxyXG4gICAgICAgICAgICAgICAgbG9hZGluZ0ZpeEludGVydmFsID0gMTAwMCxcclxuICAgICAgICAgICAgICAgIGF0dGFjaGVkVG8gPSAwO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHByZXZlbnQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBQcmV2ZW50IGFkZGl0aW9uYWwgaWZyYW1lIHJlbW92YWwgcHJvY2VkdXJlcyBmcm9tIG5ld2VyIGJyb3dzZXJzXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNpZ25hbFIuXy5pZVZlcnNpb24gPD0gOCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBXZSBvbmx5IGV2ZXIgd2FudCB0byBzZXQgdGhlIGludGVydmFsIG9uZSB0aW1lLCBzbyBvbiB0aGUgZmlyc3QgYXR0YWNoZWRUb1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXR0YWNoZWRUbyA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ3JlYXRlIGFuZCBkZXN0cm95IGlmcmFtZSBldmVyeSAzIHNlY29uZHMgdG8gcHJldmVudCBsb2FkaW5nIGljb24sIHN1cGVyIGhhY2t5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FkaW5nRml4SW50ZXJ2YWxJZCA9IHdpbmRvdy5zZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRlbXBGcmFtZSA9IGNyZWF0ZUZyYW1lKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRlbXBGcmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGVtcEZyYW1lKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcEZyYW1lID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGxvYWRpbmdGaXhJbnRlcnZhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dGFjaGVkVG8rKztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgY2FuY2VsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gT25seSBjbGVhciB0aGUgaW50ZXJ2YWwgaWYgdGhlcmUncyBvbmx5IG9uZSBtb3JlIG9iamVjdCB0aGF0IHRoZSBsb2FkUHJldmVudGVyIGlzIGF0dGFjaGVkVG9cclxuICAgICAgICAgICAgICAgICAgICBpZiAoYXR0YWNoZWRUbyA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuY2xlYXJJbnRlcnZhbChsb2FkaW5nRml4SW50ZXJ2YWxJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoYXR0YWNoZWRUbyA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXR0YWNoZWRUby0tO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KSgpO1xyXG5cclxuICAgIHNpZ25hbFIudHJhbnNwb3J0cy5mb3JldmVyRnJhbWUgPSB7XHJcbiAgICAgICAgbmFtZTogXCJmb3JldmVyRnJhbWVcIixcclxuXHJcbiAgICAgICAgc3VwcG9ydHNLZWVwQWxpdmU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy8gQWRkZWQgYXMgYSB2YWx1ZSBoZXJlIHNvIHdlIGNhbiBjcmVhdGUgdGVzdHMgdG8gdmVyaWZ5IGZ1bmN0aW9uYWxpdHlcclxuICAgICAgICBpZnJhbWVDbGVhclRocmVzaG9sZDogNTAsXHJcblxyXG4gICAgICAgIHN0YXJ0OiBmdW5jdGlvbiAoY29ubmVjdGlvbiwgb25TdWNjZXNzLCBvbkZhaWxlZCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXMsXHJcbiAgICAgICAgICAgICAgICBmcmFtZUlkID0gKHRyYW5zcG9ydExvZ2ljLmZvcmV2ZXJGcmFtZS5jb3VudCArPSAxKSxcclxuICAgICAgICAgICAgICAgIHVybCxcclxuICAgICAgICAgICAgICAgIGZyYW1lID0gY3JlYXRlRnJhbWUoKSxcclxuICAgICAgICAgICAgICAgIGZyYW1lTG9hZEhhbmRsZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5sb2coXCJGb3JldmVyIGZyYW1lIGlmcmFtZSBmaW5pc2hlZCBsb2FkaW5nIGFuZCBpcyBubyBsb25nZXIgcmVjZWl2aW5nIG1lc3NhZ2VzLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIW9uRmFpbGVkIHx8ICFvbkZhaWxlZCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucmVjb25uZWN0KGNvbm5lY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBpZiAoKHdpbmRvdyBhcyBhbnkpLkV2ZW50U291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgYnJvd3NlciBzdXBwb3J0cyBTU0UsIGRvbid0IHVzZSBGb3JldmVyIEZyYW1lXHJcbiAgICAgICAgICAgICAgICBpZiAob25GYWlsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmxvZyhcIkZvcmV2ZXIgRnJhbWUgaXMgbm90IHN1cHBvcnRlZCBieSBTaWduYWxSIG9uIGJyb3dzZXJzIHdpdGggU1NFIHN1cHBvcnQuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIG9uRmFpbGVkKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZyYW1lLnNldEF0dHJpYnV0ZShcImRhdGEtc2lnbmFsci1jb25uZWN0aW9uLWlkXCIsIGNvbm5lY3Rpb24uaWQpO1xyXG5cclxuICAgICAgICAgICAgLy8gU3RhcnQgcHJldmVudGluZyBsb2FkaW5nIGljb25cclxuICAgICAgICAgICAgLy8gVGhpcyB3aWxsIG9ubHkgcGVyZm9ybSB3b3JrIGlmIHRoZSBsb2FkUHJldmVudGVyIGlzIG5vdCBhdHRhY2hlZCB0byBhbm90aGVyIGNvbm5lY3Rpb24uXHJcbiAgICAgICAgICAgIGxvYWRQcmV2ZW50ZXIucHJldmVudCgpO1xyXG5cclxuICAgICAgICAgICAgLy8gQnVpbGQgdGhlIHVybFxyXG4gICAgICAgICAgICB1cmwgPSB0cmFuc3BvcnRMb2dpYy5nZXRVcmwoY29ubmVjdGlvbiwgdGhpcy5uYW1lKTtcclxuICAgICAgICAgICAgdXJsICs9IFwiJmZyYW1lSWQ9XCIgKyBmcmFtZUlkO1xyXG5cclxuICAgICAgICAgICAgLy8gYWRkIGZyYW1lIHRvIHRoZSBkb2N1bWVudCBwcmlvciB0byBzZXR0aW5nIFVSTCB0byBhdm9pZCBjYWNoaW5nIGlzc3Vlcy5cclxuICAgICAgICAgICAgd2luZG93LmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hcHBlbmRDaGlsZChmcmFtZSk7XHJcblxyXG4gICAgICAgICAgICBjb25uZWN0aW9uLmxvZyhcIkJpbmRpbmcgdG8gaWZyYW1lJ3MgbG9hZCBldmVudC5cIik7XHJcblxyXG4gICAgICAgICAgICBpZiAoZnJhbWUuYWRkRXZlbnRMaXN0ZW5lcikge1xyXG4gICAgICAgICAgICAgICAgZnJhbWUuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgZnJhbWVMb2FkSGFuZGxlciwgZmFsc2UpO1xyXG4gICAgICAgICAgICB9IFxyXG5cclxuICAgICAgICAgICAgZnJhbWUuc3JjID0gdXJsO1xyXG4gICAgICAgICAgICB0cmFuc3BvcnRMb2dpYy5mb3JldmVyRnJhbWUuY29ubmVjdGlvbnNbZnJhbWVJZF0gPSBjb25uZWN0aW9uO1xyXG5cclxuICAgICAgICAgICAgY29ubmVjdGlvbi5mcmFtZSA9IGZyYW1lO1xyXG4gICAgICAgICAgICBjb25uZWN0aW9uLmZyYW1lSWQgPSBmcmFtZUlkO1xyXG5cclxuICAgICAgICAgICAgaWYgKG9uU3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5vblN1Y2Nlc3MgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5sb2coXCJJZnJhbWUgdHJhbnNwb3J0IHN0YXJ0ZWQuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIG9uU3VjY2VzcygpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHJlY29ubmVjdDogZnVuY3Rpb24gKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gTmVlZCB0byB2ZXJpZnkgY29ubmVjdGlvbiBzdGF0ZSBhbmQgdmVyaWZ5IGJlZm9yZSB0aGUgc2V0VGltZW91dCBvY2N1cnMgYmVjYXVzZSBhbiBhcHBsaWNhdGlvbiBzbGVlcCBjb3VsZCBvY2N1ciBkdXJpbmcgdGhlIHNldFRpbWVvdXQgZHVyYXRpb24uXHJcbiAgICAgICAgICAgIGlmICh0cmFuc3BvcnRMb2dpYy5pc0Nvbm5lY3RlZE9yUmVjb25uZWN0aW5nKGNvbm5lY3Rpb24pICYmIHRyYW5zcG9ydExvZ2ljLnZlcmlmeUxhc3RBY3RpdmUoY29ubmVjdGlvbikpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBWZXJpZnkgdGhhdCB3ZSdyZSBvayB0byByZWNvbm5lY3QuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0cmFuc3BvcnRMb2dpYy52ZXJpZnlMYXN0QWN0aXZlKGNvbm5lY3Rpb24pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb25uZWN0aW9uLmZyYW1lICYmIHRyYW5zcG9ydExvZ2ljLmVuc3VyZVJlY29ubmVjdGluZ1N0YXRlKGNvbm5lY3Rpb24pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmcmFtZSA9IGNvbm5lY3Rpb24uZnJhbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmMgPSB0cmFuc3BvcnRMb2dpYy5nZXRVcmwoY29ubmVjdGlvbiwgdGhhdC5uYW1lLCB0cnVlKSArIFwiJmZyYW1lSWQ9XCIgKyBjb25uZWN0aW9uLmZyYW1lSWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKFwiVXBkYXRpbmcgaWZyYW1lIHNyYyB0byAnXCIgKyBzcmMgKyBcIicuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmcmFtZS5zcmMgPSBzcmM7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgY29ubmVjdGlvbi5yZWNvbm5lY3REZWxheSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBsb3N0Q29ubmVjdGlvbjogZnVuY3Rpb24gKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgdGhpcy5yZWNvbm5lY3QoY29ubmVjdGlvbik7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2VuZDogZnVuY3Rpb24gKGNvbm5lY3Rpb24sIGRhdGEpIHtcclxuICAgICAgICAgICAgdHJhbnNwb3J0TG9naWMuYWpheFNlbmQoY29ubmVjdGlvbiwgZGF0YSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcmVjZWl2ZTogZnVuY3Rpb24gKGNvbm5lY3Rpb24sIGRhdGEpIHtcclxuICAgICAgICAgICAgdmFyIGN3LFxyXG4gICAgICAgICAgICAgICAgYm9keSxcclxuICAgICAgICAgICAgICAgIHJlc3BvbnNlO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNvbm5lY3Rpb24uanNvbiAhPT0gY29ubmVjdGlvbi5fb3JpZ2luYWxKc29uKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGVyZSdzIGEgY3VzdG9tIEpTT04gcGFyc2VyIGNvbmZpZ3VyZWQgdGhlbiBzZXJpYWxpemUgdGhlIG9iamVjdFxyXG4gICAgICAgICAgICAgICAgLy8gdXNpbmcgdGhlIG9yaWdpbmFsIChicm93c2VyKSBKU09OIHBhcnNlciBhbmQgdGhlbiBkZXNlcmlhbGl6ZSBpdCB1c2luZ1xyXG4gICAgICAgICAgICAgICAgLy8gdGhlIGN1c3RvbSBwYXJzZXIgKGNvbm5lY3Rpb24uX3BhcnNlUmVzcG9uc2UgZG9lcyB0aGF0KS4gVGhpcyBpcyBzbyB3ZVxyXG4gICAgICAgICAgICAgICAgLy8gY2FuIGVhc2lseSBzZW5kIHRoZSByZXNwb25zZSBmcm9tIHRoZSBzZXJ2ZXIgYXMgXCJyYXdcIiBKU09OIGJ1dCBzdGlsbFxyXG4gICAgICAgICAgICAgICAgLy8gc3VwcG9ydCBjdXN0b20gSlNPTiBkZXNlcmlhbGl6YXRpb24gaW4gdGhlIGJyb3dzZXIuXHJcbiAgICAgICAgICAgICAgICBkYXRhID0gY29ubmVjdGlvbi5fb3JpZ2luYWxKc29uLnN0cmluZ2lmeShkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmVzcG9uc2UgPSBjb25uZWN0aW9uLl9wYXJzZVJlc3BvbnNlKGRhdGEpO1xyXG5cclxuICAgICAgICAgICAgdHJhbnNwb3J0TG9naWMucHJvY2Vzc01lc3NhZ2VzKGNvbm5lY3Rpb24sIHJlc3BvbnNlLCBjb25uZWN0aW9uLm9uU3VjY2Vzcyk7XHJcblxyXG4gICAgICAgICAgICAvLyBQcm90ZWN0IGFnYWluc3QgY29ubmVjdGlvbiBzdG9wcGluZyBmcm9tIGEgY2FsbGJhY2sgdHJpZ2dlciB3aXRoaW4gdGhlIHByb2Nlc3NNZXNzYWdlcyBhYm92ZS5cclxuICAgICAgICAgICAgaWYgKGNvbm5lY3Rpb24uc3RhdGUgPT09ICQuc2lnbmFsUi5jb25uZWN0aW9uU3RhdGUuY29ubmVjdGVkKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBEZWxldGUgdGhlIHNjcmlwdCAmIGRpdiBlbGVtZW50c1xyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5mcmFtZU1lc3NhZ2VDb3VudCA9IChjb25uZWN0aW9uLmZyYW1lTWVzc2FnZUNvdW50IHx8IDApICsgMTtcclxuICAgICAgICAgICAgICAgIGlmIChjb25uZWN0aW9uLmZyYW1lTWVzc2FnZUNvdW50ID4gc2lnbmFsUi50cmFuc3BvcnRzLmZvcmV2ZXJGcmFtZS5pZnJhbWVDbGVhclRocmVzaG9sZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uZnJhbWVNZXNzYWdlQ291bnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGN3ID0gY29ubmVjdGlvbi5mcmFtZS5jb250ZW50V2luZG93IHx8IGNvbm5lY3Rpb24uZnJhbWUuY29udGVudERvY3VtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjdyAmJiBjdy5kb2N1bWVudCAmJiBjdy5kb2N1bWVudC5ib2R5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvZHkgPSBjdy5kb2N1bWVudC5ib2R5O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVtb3ZlIGFsbCB0aGUgY2hpbGQgZWxlbWVudHMgZnJvbSB0aGUgaWZyYW1lJ3MgYm9keSB0byBjb25zZXJ2ZXIgbWVtb3J5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlIChib2R5LmZpcnN0Q2hpbGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvZHkucmVtb3ZlQ2hpbGQoYm9keS5maXJzdENoaWxkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHN0b3A6IGZ1bmN0aW9uIChjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIHZhciBjdyA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICAvLyBTdG9wIGF0dGVtcHRpbmcgdG8gcHJldmVudCBsb2FkaW5nIGljb25cclxuICAgICAgICAgICAgbG9hZFByZXZlbnRlci5jYW5jZWwoKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjb25uZWN0aW9uLmZyYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29ubmVjdGlvbi5mcmFtZS5zdG9wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5mcmFtZS5zdG9wKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN3ID0gY29ubmVjdGlvbi5mcmFtZS5jb250ZW50V2luZG93IHx8IGNvbm5lY3Rpb24uZnJhbWUuY29udGVudERvY3VtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3cuZG9jdW1lbnQgJiYgY3cuZG9jdW1lbnQuZXhlY0NvbW1hbmQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN3LmRvY3VtZW50LmV4ZWNDb21tYW5kKFwiU3RvcFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmxvZyhcIkVycm9yIG9jY3VycmVkIHdoZW4gc3RvcHBpbmcgZm9yZXZlckZyYW1lIHRyYW5zcG9ydC4gTWVzc2FnZSA9IFwiICsgZS5tZXNzYWdlICsgXCIuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBFbnN1cmUgdGhlIGlmcmFtZSBpcyB3aGVyZSB3ZSBsZWZ0IGl0XHJcbiAgICAgICAgICAgICAgICBpZiAoY29ubmVjdGlvbi5mcmFtZS5wYXJlbnROb2RlID09PSB3aW5kb3cuZG9jdW1lbnQuYm9keSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5kb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGNvbm5lY3Rpb24uZnJhbWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGRlbGV0ZSB0cmFuc3BvcnRMb2dpYy5mb3JldmVyRnJhbWUuY29ubmVjdGlvbnNbY29ubmVjdGlvbi5mcmFtZUlkXTtcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uZnJhbWUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5mcmFtZUlkID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBjb25uZWN0aW9uLmZyYW1lO1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIGNvbm5lY3Rpb24uZnJhbWVJZDtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBjb25uZWN0aW9uLm9uU3VjY2VzcztcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBjb25uZWN0aW9uLmZyYW1lTWVzc2FnZUNvdW50O1xyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5sb2coXCJTdG9wcGluZyBmb3JldmVyIGZyYW1lLlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGFib3J0OiBmdW5jdGlvbiAoY29ubmVjdGlvbiwgYXN5bmMpIHtcclxuICAgICAgICAgICAgdHJhbnNwb3J0TG9naWMuYWpheEFib3J0KGNvbm5lY3Rpb24sIGFzeW5jKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBnZXRDb25uZWN0aW9uOiBmdW5jdGlvbiAoaWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRyYW5zcG9ydExvZ2ljLmZvcmV2ZXJGcmFtZS5jb25uZWN0aW9uc1tpZF07XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc3RhcnRlZDogZnVuY3Rpb24gKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgaWYgKGNoYW5nZVN0YXRlKGNvbm5lY3Rpb24sXHJcbiAgICAgICAgICAgICAgICBzaWduYWxSLmNvbm5lY3Rpb25TdGF0ZS5yZWNvbm5lY3RpbmcsXHJcbiAgICAgICAgICAgICAgICBzaWduYWxSLmNvbm5lY3Rpb25TdGF0ZS5jb25uZWN0ZWQpID09PSB0cnVlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJChjb25uZWN0aW9uKS50cmlnZ2VySGFuZGxlcihldmVudHMub25SZWNvbm5lY3QpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbn0oalF1ZXJ5U2hpbSwgd2luZG93KSk7XHJcbi8qIGpxdWVyeS5zaWduYWxSLnRyYW5zcG9ydHMubG9uZ1BvbGxpbmcuanMgKi9cclxuLy8gQ29weXJpZ2h0IChjKSAuTkVUIEZvdW5kYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxyXG5cclxuXHJcbi8qZ2xvYmFsIHdpbmRvdzpmYWxzZSAqL1xyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwianF1ZXJ5LnNpZ25hbFIudHJhbnNwb3J0cy5jb21tb24uanNcIiAvPlxyXG5cclxuKGZ1bmN0aW9uICgkLCB3aW5kb3csIHVuZGVmaW5lZCkge1xyXG5cclxuICAgIHZhciBzaWduYWxSID0gJC5zaWduYWxSLFxyXG4gICAgICAgIGV2ZW50cyA9ICQuc2lnbmFsUi5ldmVudHMsXHJcbiAgICAgICAgY2hhbmdlU3RhdGUgPSAkLnNpZ25hbFIuY2hhbmdlU3RhdGUsXHJcbiAgICAgICAgaXNEaXNjb25uZWN0aW5nID0gJC5zaWduYWxSLmlzRGlzY29ubmVjdGluZyxcclxuICAgICAgICB0cmFuc3BvcnRMb2dpYyA9IHNpZ25hbFIudHJhbnNwb3J0cy5fbG9naWM7XHJcblxyXG4gICAgc2lnbmFsUi50cmFuc3BvcnRzLmxvbmdQb2xsaW5nID0ge1xyXG4gICAgICAgIG5hbWU6IFwibG9uZ1BvbGxpbmdcIixcclxuXHJcbiAgICAgICAgc3VwcG9ydHNLZWVwQWxpdmU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHJlY29ubmVjdERlbGF5OiAzMDAwLFxyXG5cclxuICAgICAgICBzdGFydDogZnVuY3Rpb24gKGNvbm5lY3Rpb24sIG9uU3VjY2Vzcywgb25GYWlsZWQpIHtcclxuICAgICAgICAgICAgLy8vIDxzdW1tYXJ5PlN0YXJ0cyB0aGUgbG9uZyBwb2xsaW5nIGNvbm5lY3Rpb248L3N1bW1hcnk+XHJcbiAgICAgICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImNvbm5lY3Rpb25cIiB0eXBlPVwic2lnbmFsUlwiPlRoZSBTaWduYWxSIGNvbm5lY3Rpb24gdG8gc3RhcnQ8L3BhcmFtPlxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXMsXHJcbiAgICAgICAgICAgICAgICBmaXJlQ29ubmVjdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBmaXJlQ29ubmVjdCA9ICQubm9vcDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5sb2coXCJMb25nUG9sbGluZyBjb25uZWN0ZWQuXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAob25TdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uU3VjY2VzcygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKFwiV0FSTklORyEgVGhlIGNsaWVudCByZWNlaXZlZCBhbiBpbml0IG1lc3NhZ2UgYWZ0ZXIgcmVjb25uZWN0aW5nLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgdHJ5RmFpbENvbm5lY3QgPSBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob25GYWlsZWQoZXJyb3IpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKFwiTG9uZ1BvbGxpbmcgZmFpbGVkIHRvIGNvbm5lY3QuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlRGF0YSA9IGNvbm5lY3Rpb24uXyxcclxuICAgICAgICAgICAgICAgIHJlY29ubmVjdEVycm9ycyA9IDAsXHJcbiAgICAgICAgICAgICAgICBmaXJlUmVjb25uZWN0ZWQgPSBmdW5jdGlvbiAoaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHByaXZhdGVEYXRhLnJlY29ubmVjdFRpbWVvdXRJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJpdmF0ZURhdGEucmVjb25uZWN0VGltZW91dElkID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoYW5nZVN0YXRlKGluc3RhbmNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaWduYWxSLmNvbm5lY3Rpb25TdGF0ZS5yZWNvbm5lY3RpbmcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25hbFIuY29ubmVjdGlvblN0YXRlLmNvbm5lY3RlZCkgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU3VjY2Vzc2Z1bGx5IHJlY29ubmVjdGVkIVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZS5sb2coXCJSYWlzaW5nIHRoZSByZWNvbm5lY3QgZXZlbnRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoaW5zdGFuY2UpLnRyaWdnZXJIYW5kbGVyKGV2ZW50cy5vblJlY29ubmVjdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIC8vIDEgaG91clxyXG4gICAgICAgICAgICAgICAgbWF4RmlyZVJlY29ubmVjdGVkVGltZW91dCA9IDM2MDAwMDA7XHJcblxyXG4gICAgICAgICAgICBpZiAoY29ubmVjdGlvbi5wb2xsWGhyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmxvZyhcIlBvbGxpbmcgeGhyIHJlcXVlc3RzIGFscmVhZHkgZXhpc3RzLCBhYm9ydGluZy5cIik7XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnN0b3AoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29ubmVjdGlvbi5tZXNzYWdlSWQgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgcHJpdmF0ZURhdGEucmVjb25uZWN0VGltZW91dElkID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIHByaXZhdGVEYXRhLnBvbGxUaW1lb3V0SWQgPSB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAoZnVuY3Rpb24gcG9sbChpbnN0YW5jZSwgcmFpc2VSZWNvbm5lY3QpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZUlkID0gaW5zdGFuY2UubWVzc2FnZUlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0ID0gKG1lc3NhZ2VJZCA9PT0gbnVsbCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlY29ubmVjdGluZyA9ICFjb25uZWN0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb2xsaW5nID0gIXJhaXNlUmVjb25uZWN0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmwgPSB0cmFuc3BvcnRMb2dpYy5nZXRVcmwoaW5zdGFuY2UsIHRoYXQubmFtZSwgcmVjb25uZWN0aW5nLCBwb2xsaW5nLCB0cnVlIC8qIHVzZSBQb3N0IGZvciBsb25nUG9sbGluZyAqLyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc3REYXRhID0ge30gYXMgYW55O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5zdGFuY2UubWVzc2FnZUlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc3REYXRhLm1lc3NhZ2VJZCA9IGluc3RhbmNlLm1lc3NhZ2VJZDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnN0YW5jZS5ncm91cHNUb2tlbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3N0RGF0YS5ncm91cHNUb2tlbiA9IGluc3RhbmNlLmdyb3Vwc1Rva2VuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgd2UndmUgZGlzY29ubmVjdGVkIGR1cmluZyB0aGUgdGltZSB3ZSd2ZSB0cmllZCB0byByZS1pbnN0YW50aWF0ZSB0aGUgcG9sbCB0aGVuIHN0b3AuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzRGlzY29ubmVjdGluZyhpbnN0YW5jZSkgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5sb2coXCJPcGVuaW5nIGxvbmcgcG9sbGluZyByZXF1ZXN0IHRvICdcIiArIHVybCArIFwiJy5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2UucG9sbFhociA9IHRyYW5zcG9ydExvZ2ljLmFqYXgoY29ubmVjdGlvbiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB4aHJGaWVsZHM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9ucHJvZ3Jlc3M6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnRMb2dpYy5tYXJrTGFzdE1lc3NhZ2UoY29ubmVjdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogdXJsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudFR5cGU6IHNpZ25hbFIuXy5kZWZhdWx0Q29udGVudFR5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHBvc3REYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lb3V0OiBjb25uZWN0aW9uLl8ucG9sbFRpbWVvdXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtaW5EYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGF5ID0gMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3VsZFJlY29ubmVjdDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmxvZyhcIkxvbmcgcG9sbCBjb21wbGV0ZS5cIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVzZXQgb3VyIHJlY29ubmVjdCBlcnJvcnMgc28gaWYgd2UgdHJhbnNpdGlvbiBpbnRvIGEgcmVjb25uZWN0aW5nIHN0YXRlIGFnYWluIHdlIHRyaWdnZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJlY29ubmVjdGVkIHF1aWNrbHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlY29ubmVjdEVycm9ycyA9IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBSZW1vdmUgYW55IGtlZXAtYWxpdmVzIGZyb20gdGhlIGJlZ2lubmluZyBvZiB0aGUgcmVzdWx0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluRGF0YSA9IGNvbm5lY3Rpb24uX3BhcnNlUmVzcG9uc2UocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zcG9ydExvZ2ljLmhhbmRsZVBhcnNlRmFpbHVyZShpbnN0YW5jZSwgcmVzdWx0LCBlcnJvciwgdHJ5RmFpbENvbm5lY3QsIGluc3RhbmNlLnBvbGxYaHIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJZiB0aGVyZSdzIGN1cnJlbnRseSBhIHRpbWVvdXQgdG8gdHJpZ2dlciByZWNvbm5lY3QsIGZpcmUgaXQgbm93IGJlZm9yZSBwcm9jZXNzaW5nIG1lc3NhZ2VzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJpdmF0ZURhdGEucmVjb25uZWN0VGltZW91dElkICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyZVJlY29ubmVjdGVkKGluc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobWluRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEgPSB0cmFuc3BvcnRMb2dpYy5tYXhpbWl6ZVBlcnNpc3RlbnRSZXNwb25zZShtaW5EYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnRMb2dpYy5wcm9jZXNzTWVzc2FnZXMoaW5zdGFuY2UsIG1pbkRhdGEsIGZpcmVDb25uZWN0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQudHlwZShkYXRhLkxvbmdQb2xsRGVsYXkpID09PSBcIm51bWJlclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsYXkgPSBkYXRhLkxvbmdQb2xsRGVsYXk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzRGlzY29ubmVjdGluZyhpbnN0YW5jZSkgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvdWxkUmVjb25uZWN0ID0gZGF0YSAmJiBkYXRhLlNob3VsZFJlY29ubmVjdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzaG91bGRSZWNvbm5lY3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUcmFuc2l0aW9uIGludG8gdGhlIHJlY29ubmVjdGluZyBzdGF0ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHRoaXMgZmFpbHMgdGhlbiB0aGF0IG1lYW5zIHRoYXQgdGhlIHVzZXIgdHJhbnNpdGlvbmVkIHRoZSBjb25uZWN0aW9uIGludG8gYSBpbnZhbGlkIHN0YXRlIGluIHByb2Nlc3NNZXNzYWdlcy5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRyYW5zcG9ydExvZ2ljLmVuc3VyZVJlY29ubmVjdGluZ1N0YXRlKGluc3RhbmNlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdlIG5ldmVyIHdhbnQgdG8gcGFzcyBhIHJhaXNlUmVjb25uZWN0IGZsYWcgYWZ0ZXIgYSBzdWNjZXNzZnVsIHBvbGwuICBUaGlzIGlzIGhhbmRsZWQgdmlhIHRoZSBlcnJvciBmdW5jdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlbGF5ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaXZhdGVEYXRhLnBvbGxUaW1lb3V0SWQgPSB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvbGwoaW5zdGFuY2UsIHNob3VsZFJlY29ubmVjdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZGVsYXkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2xsKGluc3RhbmNlLCBzaG91bGRSZWNvbm5lY3QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChkYXRhLCB0ZXh0U3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSBzaWduYWxSLl8udHJhbnNwb3J0RXJyb3Ioc2lnbmFsUi5yZXNvdXJjZXMubG9uZ1BvbGxGYWlsZWQsIGNvbm5lY3Rpb24udHJhbnNwb3J0LCBkYXRhLCBpbnN0YW5jZS5wb2xsWGhyKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBTdG9wIHRyeWluZyB0byB0cmlnZ2VyIHJlY29ubmVjdCwgY29ubmVjdGlvbiBpcyBpbiBhbiBlcnJvciBzdGF0ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgd2UncmUgbm90IGluIHRoZSByZWNvbm5lY3Qgc3RhdGUgdGhpcyB3aWxsIG5vb3BcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQocHJpdmF0ZURhdGEucmVjb25uZWN0VGltZW91dElkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaXZhdGVEYXRhLnJlY29ubmVjdFRpbWVvdXRJZCA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRleHRTdGF0dXMgPT09IFwiYWJvcnRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKFwiQWJvcnRlZCB4aHIgcmVxdWVzdC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdHJ5RmFpbENvbm5lY3QoZXJyb3IpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEluY3JlbWVudCBvdXIgcmVjb25uZWN0IGVycm9ycywgd2UgYXNzdW1lIGFsbCBlcnJvcnMgdG8gYmUgcmVjb25uZWN0IGVycm9yc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEluIHRoZSBjYXNlIHRoYXQgaXQncyBvdXIgZmlyc3QgZXJyb3IgdGhpcyB3aWxsIGNhdXNlIFJlY29ubmVjdCB0byBiZSBmaXJlZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFmdGVyIDEgc2Vjb25kIGR1ZSB0byByZWNvbm5lY3RFcnJvcnMgYmVpbmcgPSAxLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlY29ubmVjdEVycm9ycysrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29ubmVjdGlvbi5zdGF0ZSAhPT0gc2lnbmFsUi5jb25uZWN0aW9uU3RhdGUucmVjb25uZWN0aW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKFwiQW4gZXJyb3Igb2NjdXJyZWQgdXNpbmcgbG9uZ1BvbGxpbmcuIFN0YXR1cyA9IFwiICsgdGV4dFN0YXR1cyArIFwiLiAgUmVzcG9uc2UgPSBcIiArIGRhdGEucmVzcG9uc2VUZXh0ICsgXCIuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKGluc3RhbmNlKS50cmlnZ2VySGFuZGxlcihldmVudHMub25FcnJvciwgW2Vycm9yXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBXZSBjaGVjayB0aGUgc3RhdGUgaGVyZSB0byB2ZXJpZnkgdGhhdCB3ZSdyZSBub3QgaW4gYW4gaW52YWxpZCBzdGF0ZSBwcmlvciB0byB2ZXJpZnlpbmcgUmVjb25uZWN0LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHdlJ3JlIG5vdCBpbiBjb25uZWN0ZWQgb3IgcmVjb25uZWN0aW5nIHRoZW4gdGhlIG5leHQgZW5zdXJlUmVjb25uZWN0aW5nU3RhdGUgY2hlY2sgd2lsbCBmYWlsIGFuZCB3aWxsIHJldHVybi5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGVyZWZvcmUgd2UgZG9uJ3Qgd2FudCB0byBjaGFuZ2UgdGhhdCBmYWlsdXJlIGNvZGUgcGF0aC5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKGNvbm5lY3Rpb24uc3RhdGUgPT09IHNpZ25hbFIuY29ubmVjdGlvblN0YXRlLmNvbm5lY3RlZCB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnN0YXRlID09PSBzaWduYWxSLmNvbm5lY3Rpb25TdGF0ZS5yZWNvbm5lY3RpbmcpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICF0cmFuc3BvcnRMb2dpYy52ZXJpZnlMYXN0QWN0aXZlKGNvbm5lY3Rpb24pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRyYW5zaXRpb24gaW50byB0aGUgcmVjb25uZWN0aW5nIHN0YXRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhpcyBmYWlscyB0aGVuIHRoYXQgbWVhbnMgdGhhdCB0aGUgdXNlciB0cmFuc2l0aW9uZWQgdGhlIGNvbm5lY3Rpb24gaW50byB0aGUgZGlzY29ubmVjdGVkIG9yIGNvbm5lY3Rpbmcgc3RhdGUgd2l0aGluIHRoZSBhYm92ZSBlcnJvciBoYW5kbGVyIHRyaWdnZXIuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0cmFuc3BvcnRMb2dpYy5lbnN1cmVSZWNvbm5lY3RpbmdTdGF0ZShpbnN0YW5jZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ2FsbCBwb2xsIHdpdGggdGhlIHJhaXNlUmVjb25uZWN0IGZsYWcgYXMgdHJ1ZSBhZnRlciB0aGUgcmVjb25uZWN0IGRlbGF5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpdmF0ZURhdGEucG9sbFRpbWVvdXRJZCA9IHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9sbChpbnN0YW5jZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgdGhhdC5yZWNvbm5lY3REZWxheSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVGhpcyB3aWxsIG9ubHkgZXZlciBwYXNzIGFmdGVyIGFuIGVycm9yIGhhcyBvY2N1cnJlZCB2aWEgdGhlIHBvbGwgYWpheCBwcm9jZWR1cmUuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlY29ubmVjdGluZyAmJiByYWlzZVJlY29ubmVjdCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBXZSB3YWl0IHRvIHJlY29ubmVjdCBkZXBlbmRpbmcgb24gaG93IG1hbnkgdGltZXMgd2UndmUgZmFpbGVkIHRvIHJlY29ubmVjdC5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhpcyBpcyBlc3NlbnRpYWxseSBhIGhldXJpc3RpYyB0aGF0IHdpbGwgZXhwb25lbnRpYWxseSBpbmNyZWFzZSBpbiB3YWl0IHRpbWUgYmVmb3JlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRyaWdnZXJpbmcgcmVjb25uZWN0ZWQuICBUaGlzIGRlcGVuZHMgb24gdGhlIFwiZXJyb3JcIiBoYW5kbGVyIG9mIFBvbGwgdG8gY2FuY2VsIHRoaXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGltZW91dCBpZiBpdCB0cmlnZ2VycyBiZWZvcmUgdGhlIFJlY29ubmVjdGVkIGV2ZW50IGZpcmVzLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGUgTWF0aC5taW4gYXQgdGhlIGVuZCBpcyB0byBlbnN1cmUgdGhhdCB0aGUgcmVjb25uZWN0IHRpbWVvdXQgZG9lcyBub3Qgb3ZlcmZsb3cuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaXZhdGVEYXRhLnJlY29ubmVjdFRpbWVvdXRJZCA9IHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsgZmlyZVJlY29ubmVjdGVkKGluc3RhbmNlKTsgfSwgTWF0aC5taW4oMTAwMCAqIChNYXRoLnBvdygyLCByZWNvbm5lY3RFcnJvcnMpIC0gMSksIG1heEZpcmVSZWNvbm5lY3RlZFRpbWVvdXQpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KGNvbm5lY3Rpb24pKTtcclxuICAgICAgICAgICAgfSwgMjUwKTsgLy8gSGF2ZSB0byBkZWxheSBpbml0aWFsIHBvbGwgc28gQ2hyb21lIGRvZXNuJ3Qgc2hvdyBsb2FkZXIgc3Bpbm5lciBpbiB0YWJcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBsb3N0Q29ubmVjdGlvbjogZnVuY3Rpb24gKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgaWYgKGNvbm5lY3Rpb24ucG9sbFhocikge1xyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5wb2xsWGhyLmFib3J0KFwibG9zdENvbm5lY3Rpb25cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzZW5kOiBmdW5jdGlvbiAoY29ubmVjdGlvbiwgZGF0YSkge1xyXG4gICAgICAgICAgICB0cmFuc3BvcnRMb2dpYy5hamF4U2VuZChjb25uZWN0aW9uLCBkYXRhKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzdG9wOiBmdW5jdGlvbiAoY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICAvLy8gPHN1bW1hcnk+U3RvcHMgdGhlIGxvbmcgcG9sbGluZyBjb25uZWN0aW9uPC9zdW1tYXJ5PlxyXG4gICAgICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJjb25uZWN0aW9uXCIgdHlwZT1cInNpZ25hbFJcIj5UaGUgU2lnbmFsUiBjb25uZWN0aW9uIHRvIHN0b3A8L3BhcmFtPlxyXG5cclxuICAgICAgICAgICAgd2luZG93LmNsZWFyVGltZW91dChjb25uZWN0aW9uLl8ucG9sbFRpbWVvdXRJZCk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQoY29ubmVjdGlvbi5fLnJlY29ubmVjdFRpbWVvdXRJZCk7XHJcblxyXG4gICAgICAgICAgICBkZWxldGUgY29ubmVjdGlvbi5fLnBvbGxUaW1lb3V0SWQ7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBjb25uZWN0aW9uLl8ucmVjb25uZWN0VGltZW91dElkO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNvbm5lY3Rpb24ucG9sbFhocikge1xyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5wb2xsWGhyLmFib3J0KCk7XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnBvbGxYaHIgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIGNvbm5lY3Rpb24ucG9sbFhocjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGFib3J0OiBmdW5jdGlvbiAoY29ubmVjdGlvbiwgYXN5bmMpIHtcclxuICAgICAgICAgICAgdHJhbnNwb3J0TG9naWMuYWpheEFib3J0KGNvbm5lY3Rpb24sIGFzeW5jKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxufShqUXVlcnlTaGltLCB3aW5kb3cpKTtcclxuLyoganF1ZXJ5LnNpZ25hbFIuaHVicy5qcyAqL1xyXG4vLyBDb3B5cmlnaHQgKGMpIC5ORVQgRm91bmRhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXHJcblxyXG4vKmdsb2JhbCB3aW5kb3c6ZmFsc2UgKi9cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cImpxdWVyeS5zaWduYWxSLmNvcmUuanNcIiAvPlxyXG5cclxuKGZ1bmN0aW9uICgkLCB3aW5kb3csIHVuZGVmaW5lZCkge1xyXG5cclxuICAgIHZhciBldmVudE5hbWVzcGFjZSA9IFwiLmh1YlByb3h5XCIsXHJcbiAgICAgICAgc2lnbmFsUiA9ICQuc2lnbmFsUjtcclxuXHJcbiAgICBmdW5jdGlvbiBtYWtlRXZlbnROYW1lKGV2ZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIGV2ZW50ICsgZXZlbnROYW1lc3BhY2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRXF1aXZhbGVudCB0byBBcnJheS5wcm90b3R5cGUubWFwXHJcbiAgICBmdW5jdGlvbiBtYXAoYXJyLCBmdW4sIHRoaXNwPykge1xyXG4gICAgICAgIHZhciBpLFxyXG4gICAgICAgICAgICBsZW5ndGggPSBhcnIubGVuZ3RoLFxyXG4gICAgICAgICAgICByZXN1bHQgPSBbXTtcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcclxuICAgICAgICAgICAgaWYgKGFyci5oYXNPd25Qcm9wZXJ0eShpKSkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0W2ldID0gZnVuLmNhbGwodGhpc3AsIGFycltpXSwgaSwgYXJyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldEFyZ1ZhbHVlKGEpIHtcclxuICAgICAgICByZXR1cm4gJC5pc0Z1bmN0aW9uKGEpID8gbnVsbCA6ICgkLnR5cGUoYSkgPT09IFwidW5kZWZpbmVkXCIgPyBudWxsIDogYSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaGFzTWVtYmVycyhvYmopIHtcclxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XHJcbiAgICAgICAgICAgIC8vIElmIHdlIGhhdmUgYW55IHByb3BlcnRpZXMgaW4gb3VyIGNhbGxiYWNrIG1hcCB0aGVuIHdlIGhhdmUgY2FsbGJhY2tzIGFuZCBjYW4gZXhpdCB0aGUgbG9vcCB2aWEgcmV0dXJuXHJcbiAgICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjbGVhckludm9jYXRpb25DYWxsYmFja3MoY29ubmVjdGlvbiwgZXJyb3IpIHtcclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJjb25uZWN0aW9uXCIgdHlwZT1cImh1YkNvbm5lY3Rpb25cIiAvPlxyXG4gICAgICAgIHZhciBjYWxsYmFja3MgPSBjb25uZWN0aW9uLl8uaW52b2NhdGlvbkNhbGxiYWNrcyxcclxuICAgICAgICAgICAgY2FsbGJhY2s7XHJcblxyXG4gICAgICAgIGlmIChoYXNNZW1iZXJzKGNhbGxiYWNrcykpIHtcclxuICAgICAgICAgICAgY29ubmVjdGlvbi5sb2coXCJDbGVhcmluZyBodWIgaW52b2NhdGlvbiBjYWxsYmFja3Mgd2l0aCBlcnJvcjogXCIgKyBlcnJvciArIFwiLlwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJlc2V0IHRoZSBjYWxsYmFjayBjYWNoZSBub3cgYXMgd2UgaGF2ZSBhIGxvY2FsIHZhciByZWZlcmVuY2luZyBpdFxyXG4gICAgICAgIGNvbm5lY3Rpb24uXy5pbnZvY2F0aW9uQ2FsbGJhY2tJZCA9IDA7XHJcbiAgICAgICAgZGVsZXRlIGNvbm5lY3Rpb24uXy5pbnZvY2F0aW9uQ2FsbGJhY2tzO1xyXG4gICAgICAgIGNvbm5lY3Rpb24uXy5pbnZvY2F0aW9uQ2FsbGJhY2tzID0ge307XHJcblxyXG4gICAgICAgIC8vIExvb3Agb3ZlciB0aGUgY2FsbGJhY2tzIGFuZCBpbnZva2UgdGhlbS5cclxuICAgICAgICAvLyBXZSBkbyB0aGlzIHVzaW5nIGEgbG9jYWwgdmFyIHJlZmVyZW5jZSBhbmQgKmFmdGVyKiB3ZSd2ZSBjbGVhcmVkIHRoZSBjYWNoZVxyXG4gICAgICAgIC8vIHNvIHRoYXQgaWYgYSBmYWlsIGNhbGxiYWNrIGl0c2VsZiB0cmllcyB0byBpbnZva2UgYW5vdGhlciBtZXRob2Qgd2UgZG9uJ3RcclxuICAgICAgICAvLyBlbmQgdXAgd2l0aCBpdHMgY2FsbGJhY2sgaW4gdGhlIGxpc3Qgd2UncmUgbG9vcGluZyBvdmVyLlxyXG4gICAgICAgIGZvciAodmFyIGNhbGxiYWNrSWQgaW4gY2FsbGJhY2tzKSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrID0gY2FsbGJhY2tzW2NhbGxiYWNrSWRdO1xyXG4gICAgICAgICAgICBjYWxsYmFjay5tZXRob2QuY2FsbChjYWxsYmFjay5zY29wZSwgeyBFOiBlcnJvciB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gaHViUHJveHlcclxuICAgIGZ1bmN0aW9uIGh1YlByb3h5KGh1YkNvbm5lY3Rpb24sIGh1Yk5hbWUpIHtcclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vICAgICBDcmVhdGVzIGEgbmV3IHByb3h5IG9iamVjdCBmb3IgdGhlIGdpdmVuIGh1YiBjb25uZWN0aW9uIHRoYXQgY2FuIGJlIHVzZWQgdG8gaW52b2tlXHJcbiAgICAgICAgLy8vICAgICBtZXRob2RzIG9uIHNlcnZlciBodWJzIGFuZCBoYW5kbGUgY2xpZW50IG1ldGhvZCBpbnZvY2F0aW9uIHJlcXVlc3RzIGZyb20gdGhlIHNlcnZlci5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHJldHVybiBuZXcgaHViUHJveHkuZm4uaW5pdChodWJDb25uZWN0aW9uLCBodWJOYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBodWJQcm94eS5mbiA9IGh1YlByb3h5LnByb3RvdHlwZSA9IHtcclxuICAgICAgICBpbml0OiBmdW5jdGlvbiAoY29ubmVjdGlvbiwgaHViTmFtZSkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlID0ge307XHJcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvbiA9IGNvbm5lY3Rpb247XHJcbiAgICAgICAgICAgIHRoaXMuaHViTmFtZSA9IGh1Yk5hbWU7XHJcbiAgICAgICAgICAgIHRoaXMuXyA9IHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrTWFwOiB7fVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yOiBodWJQcm94eSxcclxuXHJcbiAgICAgICAgaGFzU3Vic2NyaXB0aW9uczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gaGFzTWVtYmVycyh0aGlzLl8uY2FsbGJhY2tNYXApO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG9uOiBmdW5jdGlvbiAoZXZlbnROYW1lLCBjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAvLy8gPHN1bW1hcnk+V2lyZXMgdXAgYSBjYWxsYmFjayB0byBiZSBpbnZva2VkIHdoZW4gYSBpbnZvY2F0aW9uIHJlcXVlc3QgaXMgcmVjZWl2ZWQgZnJvbSB0aGUgc2VydmVyIGh1Yi48L3N1bW1hcnk+XHJcbiAgICAgICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImV2ZW50TmFtZVwiIHR5cGU9XCJTdHJpbmdcIj5UaGUgbmFtZSBvZiB0aGUgaHViIGV2ZW50IHRvIHJlZ2lzdGVyIHRoZSBjYWxsYmFjayBmb3IuPC9wYXJhbT5cclxuICAgICAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiY2FsbGJhY2tcIiB0eXBlPVwiRnVuY3Rpb25cIj5UaGUgY2FsbGJhY2sgdG8gYmUgaW52b2tlZC48L3BhcmFtPlxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXMsXHJcbiAgICAgICAgICAgICAgICBjYWxsYmFja01hcCA9IHRoYXQuXy5jYWxsYmFja01hcDtcclxuXHJcbiAgICAgICAgICAgIC8vIE5vcm1hbGl6ZSB0aGUgZXZlbnQgbmFtZSB0byBsb3dlcmNhc2VcclxuICAgICAgICAgICAgZXZlbnROYW1lID0gZXZlbnROYW1lLnRvTG93ZXJDYXNlKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBJZiB0aGVyZSBpcyBub3QgYW4gZXZlbnQgcmVnaXN0ZXJlZCBmb3IgdGhpcyBjYWxsYmFjayB5ZXQgd2Ugd2FudCB0byBjcmVhdGUgaXRzIGV2ZW50IHNwYWNlIGluIHRoZSBjYWxsYmFjayBtYXAuXHJcbiAgICAgICAgICAgIGlmICghY2FsbGJhY2tNYXBbZXZlbnROYW1lXSkge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2tNYXBbZXZlbnROYW1lXSA9IHt9O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBNYXAgdGhlIGNhbGxiYWNrIHRvIG91ciBlbmNvbXBhc3NlZCBmdW5jdGlvblxyXG4gICAgICAgICAgICBjYWxsYmFja01hcFtldmVudE5hbWVdW2NhbGxiYWNrXSA9IGZ1bmN0aW9uIChlLCBkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjay5hcHBseSh0aGF0LCBkYXRhKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICQodGhhdCkuYmluZChtYWtlRXZlbnROYW1lKGV2ZW50TmFtZSksIGNhbGxiYWNrTWFwW2V2ZW50TmFtZV1bY2FsbGJhY2tdKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGF0O1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG9mZjogZnVuY3Rpb24gKGV2ZW50TmFtZSwgY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgLy8vIDxzdW1tYXJ5PlJlbW92ZXMgdGhlIGNhbGxiYWNrIGludm9jYXRpb24gcmVxdWVzdCBmcm9tIHRoZSBzZXJ2ZXIgaHViIGZvciB0aGUgZ2l2ZW4gZXZlbnQgbmFtZS48L3N1bW1hcnk+XHJcbiAgICAgICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImV2ZW50TmFtZVwiIHR5cGU9XCJTdHJpbmdcIj5UaGUgbmFtZSBvZiB0aGUgaHViIGV2ZW50IHRvIHVucmVnaXN0ZXIgdGhlIGNhbGxiYWNrIGZvci48L3BhcmFtPlxyXG4gICAgICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJjYWxsYmFja1wiIHR5cGU9XCJGdW5jdGlvblwiPlRoZSBjYWxsYmFjayB0byBiZSBpbnZva2VkLjwvcGFyYW0+XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcyxcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrTWFwID0gdGhhdC5fLmNhbGxiYWNrTWFwLFxyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2tTcGFjZTtcclxuXHJcbiAgICAgICAgICAgIC8vIE5vcm1hbGl6ZSB0aGUgZXZlbnQgbmFtZSB0byBsb3dlcmNhc2VcclxuICAgICAgICAgICAgZXZlbnROYW1lID0gZXZlbnROYW1lLnRvTG93ZXJDYXNlKCk7XHJcblxyXG4gICAgICAgICAgICBjYWxsYmFja1NwYWNlID0gY2FsbGJhY2tNYXBbZXZlbnROYW1lXTtcclxuXHJcbiAgICAgICAgICAgIC8vIFZlcmlmeSB0aGF0IHRoZXJlIGlzIGFuIGV2ZW50IHNwYWNlIHRvIHVuYmluZFxyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2tTcGFjZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gT25seSB1bmJpbmQgaWYgdGhlcmUncyBhbiBldmVudCBib3VuZCB3aXRoIGV2ZW50TmFtZSBhbmQgYSBjYWxsYmFjayB3aXRoIHRoZSBzcGVjaWZpZWQgY2FsbGJhY2tcclxuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFja1NwYWNlW2NhbGxiYWNrXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhhdCkudW5iaW5kKG1ha2VFdmVudE5hbWUoZXZlbnROYW1lKSwgY2FsbGJhY2tTcGFjZVtjYWxsYmFja10pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBSZW1vdmUgdGhlIGNhbGxiYWNrIGZyb20gdGhlIGNhbGxiYWNrIG1hcFxyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBjYWxsYmFja1NwYWNlW2NhbGxiYWNrXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgdGhlcmUgYXJlIGFueSBtZW1iZXJzIGxlZnQgb24gdGhlIGV2ZW50LCBpZiBub3Qgd2UgbmVlZCB0byBkZXN0cm95IGl0LlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghaGFzTWVtYmVycyhjYWxsYmFja1NwYWNlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgY2FsbGJhY2tNYXBbZXZlbnROYW1lXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFjYWxsYmFjaykgeyAvLyBDaGVjayBpZiB3ZSdyZSByZW1vdmluZyB0aGUgd2hvbGUgZXZlbnQgYW5kIHdlIGRpZG4ndCBlcnJvciBiZWNhdXNlIG9mIGFuIGludmFsaWQgY2FsbGJhY2tcclxuICAgICAgICAgICAgICAgICAgICAkKHRoYXQpLnVuYmluZChtYWtlRXZlbnROYW1lKGV2ZW50TmFtZSkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgY2FsbGJhY2tNYXBbZXZlbnROYW1lXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRoYXQ7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaW52b2tlOiBmdW5jdGlvbiAobWV0aG9kTmFtZSkge1xyXG4gICAgICAgICAgICAvLy8gPHN1bW1hcnk+SW52b2tlcyBhIHNlcnZlciBodWIgbWV0aG9kIHdpdGggdGhlIGdpdmVuIGFyZ3VtZW50cy48L3N1bW1hcnk+XHJcbiAgICAgICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cIm1ldGhvZE5hbWVcIiB0eXBlPVwiU3RyaW5nXCI+VGhlIG5hbWUgb2YgdGhlIHNlcnZlciBodWIgbWV0aG9kLjwvcGFyYW0+XHJcblxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXMsXHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uID0gdGhhdC5jb25uZWN0aW9uLFxyXG4gICAgICAgICAgICAgICAgYXJncyA9ICQubWFrZUFycmF5KGFyZ3VtZW50cykuc2xpY2UoMSksXHJcbiAgICAgICAgICAgICAgICBhcmdWYWx1ZXMgPSBtYXAoYXJncywgZ2V0QXJnVmFsdWUpLFxyXG4gICAgICAgICAgICAgICAgZGF0YSA9IHsgSDogdGhhdC5odWJOYW1lLCBNOiBtZXRob2ROYW1lLCBBOiBhcmdWYWx1ZXMsIEk6IGNvbm5lY3Rpb24uXy5pbnZvY2F0aW9uQ2FsbGJhY2tJZCwgUzpudWxsIH0sXHJcbiAgICAgICAgICAgICAgICBkID0gJC5EZWZlcnJlZCgpLFxyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgPSBmdW5jdGlvbiAobWluUmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHRoYXQuX21heGltaXplSHViUmVzcG9uc2UobWluUmVzdWx0KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVXBkYXRlIHRoZSBodWIgc3RhdGVcclxuICAgICAgICAgICAgICAgICAgICAkLmV4dGVuZCh0aGF0LnN0YXRlLCByZXN1bHQuU3RhdGUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LlByb2dyZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkLm5vdGlmeVdpdGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFByb2dyZXNzIGlzIG9ubHkgc3VwcG9ydGVkIGluIGpRdWVyeSAxLjcrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkLm5vdGlmeVdpdGgodGhhdCwgW3Jlc3VsdC5Qcm9ncmVzcy5EYXRhXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIWNvbm5lY3Rpb24uXy5wcm9ncmVzc2pRdWVyeVZlcnNpb25Mb2dnZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKFwiQSBodWIgbWV0aG9kIGludm9jYXRpb24gcHJvZ3Jlc3MgdXBkYXRlIHdhcyByZWNlaXZlZCBidXQgdGhlIHZlcnNpb24gb2YgalF1ZXJ5IGluIHVzZSAoXCIgKyAkLnByb3RvdHlwZS5qcXVlcnkgKyBcIikgZG9lcyBub3Qgc3VwcG9ydCBwcm9ncmVzcyB1cGRhdGVzLiBVcGdyYWRlIHRvIGpRdWVyeSAxLjcrIHRvIHJlY2VpdmUgcHJvZ3Jlc3Mgbm90aWZpY2F0aW9ucy5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLl8ucHJvZ3Jlc3NqUXVlcnlWZXJzaW9uTG9nZ2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzdWx0LkVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNlcnZlciBodWIgbWV0aG9kIHRocmV3IGFuIGV4Y2VwdGlvbiwgbG9nIGl0ICYgcmVqZWN0IHRoZSBkZWZlcnJlZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LlN0YWNrVHJhY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKHJlc3VsdC5FcnJvciArIFwiXFxuXCIgKyByZXN1bHQuU3RhY2tUcmFjZSArIFwiLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmVzdWx0LkVycm9yRGF0YSBpcyBvbmx5IHNldCBpZiBhIEh1YkV4Y2VwdGlvbiB3YXMgdGhyb3duXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZSA9IHJlc3VsdC5Jc0h1YkV4Y2VwdGlvbiA/IFwiSHViRXhjZXB0aW9uXCIgOiBcIkV4Y2VwdGlvblwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvciA9IHNpZ25hbFIuXy5lcnJvcihyZXN1bHQuRXJyb3IsIHNvdXJjZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yLmRhdGEgPSByZXN1bHQuRXJyb3JEYXRhO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5sb2codGhhdC5odWJOYW1lICsgXCIuXCIgKyBtZXRob2ROYW1lICsgXCIgZmFpbGVkIHRvIGV4ZWN1dGUuIEVycm9yOiBcIiArIGVycm9yLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkLnJlamVjdFdpdGgodGhhdCwgW2Vycm9yXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2VydmVyIGludm9jYXRpb24gc3VjY2VlZGVkLCByZXNvbHZlIHRoZSBkZWZlcnJlZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmxvZyhcIkludm9rZWQgXCIgKyB0aGF0Lmh1Yk5hbWUgKyBcIi5cIiArIG1ldGhvZE5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkLnJlc29sdmVXaXRoKHRoYXQsIFtyZXN1bHQuUmVzdWx0XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24uXy5pbnZvY2F0aW9uQ2FsbGJhY2tzW2Nvbm5lY3Rpb24uXy5pbnZvY2F0aW9uQ2FsbGJhY2tJZC50b1N0cmluZygpXSA9IHsgc2NvcGU6IHRoYXQsIG1ldGhvZDogY2FsbGJhY2sgfTtcclxuICAgICAgICAgICAgY29ubmVjdGlvbi5fLmludm9jYXRpb25DYWxsYmFja0lkICs9IDE7XHJcblxyXG4gICAgICAgICAgICBpZiAoISQuaXNFbXB0eU9iamVjdCh0aGF0LnN0YXRlKSkge1xyXG4gICAgICAgICAgICAgICAgZGF0YS5TID0gdGhhdC5zdGF0ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29ubmVjdGlvbi5sb2coXCJJbnZva2luZyBcIiArIHRoYXQuaHViTmFtZSArIFwiLlwiICsgbWV0aG9kTmFtZSk7XHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24uc2VuZChkYXRhKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkLnByb21pc2UoKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBfbWF4aW1pemVIdWJSZXNwb25zZTogZnVuY3Rpb24gKG1pbkh1YlJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBTdGF0ZTogbWluSHViUmVzcG9uc2UuUyxcclxuICAgICAgICAgICAgICAgIFJlc3VsdDogbWluSHViUmVzcG9uc2UuUixcclxuICAgICAgICAgICAgICAgIFByb2dyZXNzOiBtaW5IdWJSZXNwb25zZS5QID8ge1xyXG4gICAgICAgICAgICAgICAgICAgIElkOiBtaW5IdWJSZXNwb25zZS5QLkksXHJcbiAgICAgICAgICAgICAgICAgICAgRGF0YTogbWluSHViUmVzcG9uc2UuUC5EXHJcbiAgICAgICAgICAgICAgICB9IDogbnVsbCxcclxuICAgICAgICAgICAgICAgIElkOiBtaW5IdWJSZXNwb25zZS5JLFxyXG4gICAgICAgICAgICAgICAgSXNIdWJFeGNlcHRpb246IG1pbkh1YlJlc3BvbnNlLkgsXHJcbiAgICAgICAgICAgICAgICBFcnJvcjogbWluSHViUmVzcG9uc2UuRSxcclxuICAgICAgICAgICAgICAgIFN0YWNrVHJhY2U6IG1pbkh1YlJlc3BvbnNlLlQsXHJcbiAgICAgICAgICAgICAgICBFcnJvckRhdGE6IG1pbkh1YlJlc3BvbnNlLkRcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGh1YlByb3h5LmZuLmluaXQucHJvdG90eXBlID0gaHViUHJveHkuZm47XHJcblxyXG4gICAgLy8gaHViQ29ubmVjdGlvblxyXG4gICAgZnVuY3Rpb24gaHViQ29ubmVjdGlvbih1cmwsIG9wdGlvbnMpIHtcclxuICAgICAgICAvLy8gPHN1bW1hcnk+Q3JlYXRlcyBhIG5ldyBodWIgY29ubmVjdGlvbi48L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidXJsXCIgdHlwZT1cIlN0cmluZ1wiPltPcHRpb25hbF0gVGhlIGh1YiByb3V0ZSB1cmwsIGRlZmF1bHRzIHRvIFwiL3NpZ25hbHJcIi48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cIm9wdGlvbnNcIiB0eXBlPVwiT2JqZWN0XCI+W09wdGlvbmFsXSBTZXR0aW5ncyB0byB1c2Ugd2hlbiBjcmVhdGluZyB0aGUgaHViQ29ubmVjdGlvbi48L3BhcmFtPlxyXG4gICAgICAgIHZhciBzZXR0aW5ncyA9IHtcclxuICAgICAgICAgICAgcXM6IG51bGwsXHJcbiAgICAgICAgICAgIGxvZ2dpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICB1c2VEZWZhdWx0UGF0aDogdHJ1ZVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICQuZXh0ZW5kKHNldHRpbmdzLCBvcHRpb25zKTtcclxuXHJcbiAgICAgICAgaWYgKCF1cmwgfHwgc2V0dGluZ3MudXNlRGVmYXVsdFBhdGgpIHtcclxuICAgICAgICAgICAgdXJsID0gKHVybCB8fCBcIlwiKSArIFwiL3NpZ25hbHJcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBodWJDb25uZWN0aW9uLmZuLmluaXQodXJsLCBzZXR0aW5ncyk7XHJcbiAgICB9XHJcblxyXG4gICAgaHViQ29ubmVjdGlvbi5mbiA9IGh1YkNvbm5lY3Rpb24ucHJvdG90eXBlID0gJC5jb25uZWN0aW9uKCk7XHJcblxyXG4gICAgaHViQ29ubmVjdGlvbi5mbi5pbml0ID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xyXG4gICAgICAgIHZhciBzZXR0aW5ncyA9IHtcclxuICAgICAgICAgICAgcXM6IG51bGwsXHJcbiAgICAgICAgICAgIGxvZ2dpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICB1c2VEZWZhdWx0UGF0aDogdHJ1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24gPSB0aGlzO1xyXG5cclxuICAgICAgICAkLmV4dGVuZChzZXR0aW5ncywgb3B0aW9ucyk7XHJcblxyXG4gICAgICAgIC8vIENhbGwgdGhlIGJhc2UgY29uc3RydWN0b3JcclxuICAgICAgICAkLnNpZ25hbFIuZm4uaW5pdC5jYWxsKGNvbm5lY3Rpb24sIHVybCwgc2V0dGluZ3MucXMsIHNldHRpbmdzLmxvZ2dpbmcpO1xyXG5cclxuICAgICAgICAvLyBPYmplY3QgdG8gc3RvcmUgaHViIHByb3hpZXMgZm9yIHRoaXMgY29ubmVjdGlvblxyXG4gICAgICAgIGNvbm5lY3Rpb24ucHJveGllcyA9IHt9O1xyXG5cclxuICAgICAgICBjb25uZWN0aW9uLl8uaW52b2NhdGlvbkNhbGxiYWNrSWQgPSAwO1xyXG4gICAgICAgIGNvbm5lY3Rpb24uXy5pbnZvY2F0aW9uQ2FsbGJhY2tzID0ge307XHJcblxyXG4gICAgICAgIC8vIFdpcmUgdXAgdGhlIHJlY2VpdmVkIGhhbmRsZXJcclxuICAgICAgICBjb25uZWN0aW9uLnJlY2VpdmVkKGZ1bmN0aW9uIChtaW5EYXRhKSB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhLCBwcm94eSwgZGF0YUNhbGxiYWNrSWQsIGNhbGxiYWNrLCBodWJOYW1lLCBldmVudE5hbWU7XHJcbiAgICAgICAgICAgIGlmICghbWluRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBXZSBoYXZlIHRvIGhhbmRsZSBwcm9ncmVzcyB1cGRhdGVzIGZpcnN0IGluIG9yZGVyIHRvIGVuc3VyZSBvbGQgY2xpZW50cyB0aGF0IHJlY2VpdmVcclxuICAgICAgICAgICAgLy8gcHJvZ3Jlc3MgdXBkYXRlcyBlbnRlciB0aGUgcmV0dXJuIHZhbHVlIGJyYW5jaCBhbmQgdGhlbiBuby1vcCB3aGVuIHRoZXkgY2FuJ3QgZmluZFxyXG4gICAgICAgICAgICAvLyB0aGUgY2FsbGJhY2sgaW4gdGhlIG1hcCAoYmVjYXVzZSB0aGUgbWluRGF0YS5JIHZhbHVlIHdpbGwgbm90IGJlIGEgdmFsaWQgY2FsbGJhY2sgSUQpXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgKG1pbkRhdGEuUCkgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgIC8vIFByb2Nlc3MgcHJvZ3Jlc3Mgbm90aWZpY2F0aW9uXHJcbiAgICAgICAgICAgICAgICBkYXRhQ2FsbGJhY2tJZCA9IG1pbkRhdGEuUC5JLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayA9IGNvbm5lY3Rpb24uXy5pbnZvY2F0aW9uQ2FsbGJhY2tzW2RhdGFDYWxsYmFja0lkXTtcclxuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrLm1ldGhvZC5jYWxsKGNhbGxiYWNrLnNjb3BlLCBtaW5EYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgKG1pbkRhdGEuSSkgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgIC8vIFdlIHJlY2VpdmVkIHRoZSByZXR1cm4gdmFsdWUgZnJvbSBhIHNlcnZlciBtZXRob2QgaW52b2NhdGlvbiwgbG9vayB1cCBjYWxsYmFjayBieSBpZCBhbmQgY2FsbCBpdFxyXG4gICAgICAgICAgICAgICAgZGF0YUNhbGxiYWNrSWQgPSBtaW5EYXRhLkkudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrID0gY29ubmVjdGlvbi5fLmludm9jYXRpb25DYWxsYmFja3NbZGF0YUNhbGxiYWNrSWRdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gRGVsZXRlIHRoZSBjYWxsYmFjayBmcm9tIHRoZSBwcm94eVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uXy5pbnZvY2F0aW9uQ2FsbGJhY2tzW2RhdGFDYWxsYmFja0lkXSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGNvbm5lY3Rpb24uXy5pbnZvY2F0aW9uQ2FsbGJhY2tzW2RhdGFDYWxsYmFja0lkXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gSW52b2tlIHRoZSBjYWxsYmFja1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrLm1ldGhvZC5jYWxsKGNhbGxiYWNrLnNjb3BlLCBtaW5EYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGRhdGEgPSB0aGlzLl9tYXhpbWl6ZUNsaWVudEh1Ykludm9jYXRpb24obWluRGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gV2UgcmVjZWl2ZWQgYSBjbGllbnQgaW52b2NhdGlvbiByZXF1ZXN0LCBpLmUuIGJyb2FkY2FzdCBmcm9tIHNlcnZlciBodWJcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKFwiVHJpZ2dlcmluZyBjbGllbnQgaHViIGV2ZW50ICdcIiArIGRhdGEuTWV0aG9kICsgXCInIG9uIGh1YiAnXCIgKyBkYXRhLkh1YiArIFwiJy5cIik7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gTm9ybWFsaXplIHRoZSBuYW1lcyB0byBsb3dlcmNhc2VcclxuICAgICAgICAgICAgICAgIGh1Yk5hbWUgPSBkYXRhLkh1Yi50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICAgICAgZXZlbnROYW1lID0gZGF0YS5NZXRob2QudG9Mb3dlckNhc2UoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBUcmlnZ2VyIHRoZSBsb2NhbCBpbnZvY2F0aW9uIGV2ZW50XHJcbiAgICAgICAgICAgICAgICBwcm94eSA9IHRoaXMucHJveGllc1todWJOYW1lXTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgdGhlIGh1YiBzdGF0ZVxyXG4gICAgICAgICAgICAgICAgJC5leHRlbmQocHJveHkuc3RhdGUsIGRhdGEuU3RhdGUpO1xyXG4gICAgICAgICAgICAgICAgJChwcm94eSkudHJpZ2dlckhhbmRsZXIobWFrZUV2ZW50TmFtZShldmVudE5hbWUpLCBbZGF0YS5BcmdzXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29ubmVjdGlvbi5lcnJvcihmdW5jdGlvbiAoZXJyRGF0YSwgb3JpZ0RhdGEpIHtcclxuICAgICAgICAgICAgdmFyIGNhbGxiYWNrSWQsIGNhbGxiYWNrO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFvcmlnRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgLy8gTm8gb3JpZ2luYWwgZGF0YSBwYXNzZWQgc28gdGhpcyBpcyBub3QgYSBzZW5kIGVycm9yXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNhbGxiYWNrSWQgPSBvcmlnRGF0YS5JO1xyXG4gICAgICAgICAgICBjYWxsYmFjayA9IGNvbm5lY3Rpb24uXy5pbnZvY2F0aW9uQ2FsbGJhY2tzW2NhbGxiYWNrSWRdO1xyXG5cclxuICAgICAgICAgICAgLy8gVmVyaWZ5IHRoYXQgdGhlcmUgaXMgYSBjYWxsYmFjayBib3VuZCAoY291bGQgaGF2ZSBiZWVuIGNsZWFyZWQpXHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgLy8gRGVsZXRlIHRoZSBjYWxsYmFja1xyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5fLmludm9jYXRpb25DYWxsYmFja3NbY2FsbGJhY2tJZF0gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIGNvbm5lY3Rpb24uXy5pbnZvY2F0aW9uQ2FsbGJhY2tzW2NhbGxiYWNrSWRdO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEludm9rZSB0aGUgY2FsbGJhY2sgd2l0aCBhbiBlcnJvciB0byByZWplY3QgdGhlIHByb21pc2VcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrLm1ldGhvZC5jYWxsKGNhbGxiYWNrLnNjb3BlLCB7IEU6IGVyckRhdGEgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29ubmVjdGlvbi5yZWNvbm5lY3RpbmcoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoY29ubmVjdGlvbi50cmFuc3BvcnQgJiYgY29ubmVjdGlvbi50cmFuc3BvcnQubmFtZSA9PT0gXCJ3ZWJTb2NrZXRzXCIpIHtcclxuICAgICAgICAgICAgICAgIGNsZWFySW52b2NhdGlvbkNhbGxiYWNrcyhjb25uZWN0aW9uLCBcIkNvbm5lY3Rpb24gc3RhcnRlZCByZWNvbm5lY3RpbmcgYmVmb3JlIGludm9jYXRpb24gcmVzdWx0IHdhcyByZWNlaXZlZC5cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29ubmVjdGlvbi5kaXNjb25uZWN0ZWQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjbGVhckludm9jYXRpb25DYWxsYmFja3MoY29ubmVjdGlvbiwgXCJDb25uZWN0aW9uIHdhcyBkaXNjb25uZWN0ZWQgYmVmb3JlIGludm9jYXRpb24gcmVzdWx0IHdhcyByZWNlaXZlZC5cIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGh1YkNvbm5lY3Rpb24uZm4uX21heGltaXplQ2xpZW50SHViSW52b2NhdGlvbiA9IGZ1bmN0aW9uIChtaW5DbGllbnRIdWJJbnZvY2F0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgSHViOiBtaW5DbGllbnRIdWJJbnZvY2F0aW9uLkgsXHJcbiAgICAgICAgICAgIE1ldGhvZDogbWluQ2xpZW50SHViSW52b2NhdGlvbi5NLFxyXG4gICAgICAgICAgICBBcmdzOiBtaW5DbGllbnRIdWJJbnZvY2F0aW9uLkEsXHJcbiAgICAgICAgICAgIFN0YXRlOiBtaW5DbGllbnRIdWJJbnZvY2F0aW9uLlNcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuXHJcbiAgICBodWJDb25uZWN0aW9uLmZuLl9yZWdpc3RlclN1YnNjcmliZWRIdWJzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gICAgIFNldHMgdGhlIHN0YXJ0aW5nIGV2ZW50IHRvIGxvb3AgdGhyb3VnaCB0aGUga25vd24gaHVicyBhbmQgcmVnaXN0ZXIgYW55IG5ldyBodWJzXHJcbiAgICAgICAgLy8vICAgICB0aGF0IGhhdmUgYmVlbiBhZGRlZCB0byB0aGUgcHJveHkuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICB2YXIgY29ubmVjdGlvbiA9IHRoaXM7XHJcblxyXG4gICAgICAgIGlmICghY29ubmVjdGlvbi5fc3Vic2NyaWJlZFRvSHVicykge1xyXG4gICAgICAgICAgICBjb25uZWN0aW9uLl9zdWJzY3JpYmVkVG9IdWJzID0gdHJ1ZTtcclxuICAgICAgICAgICAgY29ubmVjdGlvbi5zdGFydGluZyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBTZXQgdGhlIGNvbm5lY3Rpb24ncyBkYXRhIG9iamVjdCB3aXRoIGFsbCB0aGUgaHViIHByb3hpZXMgd2l0aCBhY3RpdmUgc3Vic2NyaXB0aW9ucy5cclxuICAgICAgICAgICAgICAgIC8vIFRoZXNlIHByb3hpZXMgd2lsbCByZWNlaXZlIG5vdGlmaWNhdGlvbnMgZnJvbSB0aGUgc2VydmVyLlxyXG4gICAgICAgICAgICAgICAgdmFyIHN1YnNjcmliZWRIdWJzID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgJC5lYWNoKGNvbm5lY3Rpb24ucHJveGllcywgZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmhhc1N1YnNjcmlwdGlvbnMoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVkSHVicy5wdXNoKHsgbmFtZToga2V5IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmxvZyhcIkNsaWVudCBzdWJzY3JpYmVkIHRvIGh1YiAnXCIgKyBrZXkgKyBcIicuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzdWJzY3JpYmVkSHVicy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmxvZyhcIk5vIGh1YnMgaGF2ZSBiZWVuIHN1YnNjcmliZWQgdG8uICBUaGUgY2xpZW50IHdpbGwgbm90IHJlY2VpdmUgZGF0YSBmcm9tIGh1YnMuICBUbyBmaXgsIGRlY2xhcmUgYXQgbGVhc3Qgb25lIGNsaWVudCBzaWRlIGZ1bmN0aW9uIHByaW9yIHRvIGNvbm5lY3Rpb24gc3RhcnQgZm9yIGVhY2ggaHViIHlvdSB3aXNoIHRvIHN1YnNjcmliZSB0by5cIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5kYXRhID0gY29ubmVjdGlvbi5qc29uLnN0cmluZ2lmeShzdWJzY3JpYmVkSHVicyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgaHViQ29ubmVjdGlvbi5mbi5jcmVhdGVIdWJQcm94eSA9IGZ1bmN0aW9uIChodWJOYW1lKSB7XHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyAgICAgQ3JlYXRlcyBhIG5ldyBwcm94eSBvYmplY3QgZm9yIHRoZSBnaXZlbiBodWIgY29ubmVjdGlvbiB0aGF0IGNhbiBiZSB1c2VkIHRvIGludm9rZVxyXG4gICAgICAgIC8vLyAgICAgbWV0aG9kcyBvbiBzZXJ2ZXIgaHVicyBhbmQgaGFuZGxlIGNsaWVudCBtZXRob2QgaW52b2NhdGlvbiByZXF1ZXN0cyBmcm9tIHRoZSBzZXJ2ZXIuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJodWJOYW1lXCIgdHlwZT1cIlN0cmluZ1wiPlxyXG4gICAgICAgIC8vLyAgICAgVGhlIG5hbWUgb2YgdGhlIGh1YiBvbiB0aGUgc2VydmVyIHRvIGNyZWF0ZSB0aGUgcHJveHkgZm9yLlxyXG4gICAgICAgIC8vLyA8L3BhcmFtPlxyXG5cclxuICAgICAgICAvLyBOb3JtYWxpemUgdGhlIG5hbWUgdG8gbG93ZXJjYXNlXHJcbiAgICAgICAgaHViTmFtZSA9IGh1Yk5hbWUudG9Mb3dlckNhc2UoKTtcclxuXHJcbiAgICAgICAgdmFyIHByb3h5ID0gdGhpcy5wcm94aWVzW2h1Yk5hbWVdO1xyXG4gICAgICAgIGlmICghcHJveHkpIHtcclxuICAgICAgICAgICAgcHJveHkgPSBodWJQcm94eSh0aGlzLCBodWJOYW1lKTtcclxuICAgICAgICAgICAgdGhpcy5wcm94aWVzW2h1Yk5hbWVdID0gcHJveHk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9yZWdpc3RlclN1YnNjcmliZWRIdWJzKCk7XHJcblxyXG4gICAgICAgIHJldHVybiBwcm94eTtcclxuICAgIH07XHJcblxyXG4gICAgaHViQ29ubmVjdGlvbi5mbi5pbml0LnByb3RvdHlwZSA9IGh1YkNvbm5lY3Rpb24uZm47XHJcblxyXG4gICAgJC5odWJDb25uZWN0aW9uID0gaHViQ29ubmVjdGlvbjtcclxuXHJcbn0oalF1ZXJ5U2hpbSwgd2luZG93KSk7XHJcbi8qIGpxdWVyeS5zaWduYWxSLnZlcnNpb24uanMgKi9cclxuLy8gQ29weXJpZ2h0IChjKSAuTkVUIEZvdW5kYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxyXG5cclxuXHJcbi8qZ2xvYmFsIHdpbmRvdzpmYWxzZSAqL1xyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwianF1ZXJ5LnNpZ25hbFIuY29yZS5qc1wiIC8+XHJcbihmdW5jdGlvbiAoJCwgdW5kZWZpbmVkKSB7XHJcbiAgICAkLnNpZ25hbFIudmVyc2lvbiA9IFwiMi4yLjFcIjtcclxufShqUXVlcnlTaGltKSk7XHJcblxyXG5leHBvcnQgY29uc3QgaHViQ29ubmVjdGlvbiA9IGpRdWVyeVNoaW0uaHViQ29ubmVjdGlvbjtcclxuZXhwb3J0IGNvbnN0IHNpZ25hbFIgPSBqUXVlcnlTaGltLnNpZ25hbFI7XHJcbiJdfQ==