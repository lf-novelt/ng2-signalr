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
    if (typeof ($) !== "function") {
        // no jQuery!
        throw new Error(resources.nojQuery);
    }
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
export var hubConnection = jQueryShim.hubConnection;
/** @type {?} */
export var signalR = jQueryShim.signalR;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmFsUi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1zaWduYWxyLyIsInNvdXJjZXMiOlsibGliL3NpZ25hbHItbm8tanF1ZXJ5L3NpZ25hbFIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLFlBQVksQ0FBQztBQUViLE9BQU8sVUFBVSxNQUFNLGNBQWMsQ0FBQzs7Ozs7Ozs7Ozs7OztBQWV0QyxDQUFDOzs7Ozs7QUFBQSxVQUFVLENBQUMsRUFBRSxNQUFNLEVBQUUsU0FBUzs7UUFFdkIsU0FBUyxHQUFHO1FBQ1osUUFBUSxFQUFFLHFHQUFxRztRQUMvRyxpQkFBaUIsRUFBRSw4SEFBOEg7UUFDakosZ0JBQWdCLEVBQUUsbUNBQW1DO1FBQ3JELG1CQUFtQixFQUFFLDhDQUE4QztRQUNuRSx1QkFBdUIsRUFBRSwwREFBMEQ7UUFDbkYsNkJBQTZCLEVBQUUsbUNBQW1DO1FBQ2xFLHVCQUF1QixFQUFFLHNEQUFzRDtRQUMvRSx5QkFBeUIsRUFBRSxzREFBc0Q7UUFDakYseUJBQXlCLEVBQUUsK0RBQStEO1FBQzFGLG9CQUFvQixFQUFFLHlEQUF5RDtRQUMvRSxvQkFBb0IsRUFBRSxzSEFBc0g7UUFDNUksVUFBVSxFQUFFLGNBQWM7UUFDMUIsV0FBVyxFQUFFLGlDQUFpQztRQUM5QyxjQUFjLEVBQUUsOEJBQThCO1FBQzlDLDBCQUEwQixFQUFFLGdDQUFnQztRQUM1RCxnQkFBZ0IsRUFBRSw2QkFBNkI7UUFDL0MsZUFBZSxFQUFFLG1CQUFtQjtRQUNwQywrQkFBK0IsRUFBRSxtREFBbUQ7UUFDcEYsZ0JBQWdCLEVBQUUsd0JBQXdCO1FBQzFDLDBCQUEwQixFQUFFLHlGQUF5RjtRQUNySCxxQkFBcUIsRUFBRSxnRUFBZ0U7UUFDdkYscUJBQXFCLEVBQUUsa0VBQWtFO1FBQ3pGLHNCQUFzQixFQUFFLG1GQUFtRjtRQUMzRyxnQkFBZ0IsRUFBRSw0RUFBNEU7UUFDOUYsc0JBQXNCLEVBQUUsdUhBQXVIO0tBQ2xKO0lBRUQsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssVUFBVSxFQUFFO1FBQzNCLGFBQWE7UUFDYixNQUFNLElBQUksS0FBSyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUN2Qzs7UUFFRyxPQUFPOztRQUNQLFdBQVc7O1FBQ1gsV0FBVyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEtBQUssVUFBVSxDQUFDOztRQUN6RCxXQUFXLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQzs7UUFDdkIsbUJBQW1CLEdBQUcsdUJBQXVCOztRQUM3QyxNQUFNLEdBQUc7UUFDTCxPQUFPLEVBQUUsU0FBUztRQUNsQixVQUFVLEVBQUUsWUFBWTtRQUN4QixVQUFVLEVBQUUsWUFBWTtRQUN4QixPQUFPLEVBQUUsU0FBUztRQUNsQixnQkFBZ0IsRUFBRSxrQkFBa0I7UUFDcEMsY0FBYyxFQUFFLGdCQUFnQjtRQUNoQyxXQUFXLEVBQUUsYUFBYTtRQUMxQixjQUFjLEVBQUUsZ0JBQWdCO1FBQ2hDLFlBQVksRUFBRSxjQUFjO0tBQy9COztRQUNELFlBQVksR0FBRztRQUNYLFdBQVcsRUFBRSxJQUFJO1FBQ2pCLE9BQU8sRUFBRSxJQUFJO1FBQ2IsS0FBSyxFQUFFLElBQUk7UUFDWCxNQUFNLEVBQUUsS0FBSztRQUNiLEtBQUssRUFBRSxLQUFLO0tBQ2Y7O1FBQ0QsR0FBRzs7Ozs7SUFBRyxVQUFVLEdBQUcsRUFBRSxPQUFPO1FBQ3hCLElBQUksT0FBTyxLQUFLLEtBQUssRUFBRTtZQUNuQixPQUFPO1NBQ1Y7O1lBQ0csQ0FBQztRQUNMLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxXQUFXLEVBQUU7WUFDekMsT0FBTztTQUNWO1FBQ0QsQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLFlBQVksRUFBRSxHQUFHLGFBQWEsR0FBRyxHQUFHLENBQUM7UUFDMUQsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRTtZQUN0QixNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMzQjthQUFNLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUU7WUFDM0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDekI7SUFDTCxDQUFDLENBQUE7O1FBRUQsV0FBVzs7Ozs7O0lBQUcsVUFBVSxVQUFVLEVBQUUsYUFBYSxFQUFFLFFBQVE7UUFDdkQsSUFBSSxhQUFhLEtBQUssVUFBVSxDQUFDLEtBQUssRUFBRTtZQUNwQyxVQUFVLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQztZQUU1QixDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN2RyxPQUFPLElBQUksQ0FBQztTQUNmO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQyxDQUFBOztRQUVELGVBQWU7Ozs7SUFBRyxVQUFVLFVBQVU7UUFDbEMsT0FBTyxVQUFVLENBQUMsS0FBSyxLQUFLLE9BQU8sQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDO0lBQ3JFLENBQUMsQ0FBQTs7UUFFRCxpQkFBaUI7Ozs7SUFBRyxVQUFVLFVBQVU7UUFDcEMsT0FBTyxVQUFVLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxTQUFTO1lBQ3ZDLFVBQVUsQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDM0QsQ0FBQyxDQUFBOztRQUVELGdDQUFnQzs7OztJQUFHLFVBQVUsVUFBVTs7WUFDL0MsdUJBQXVCOztZQUN2QixrQkFBa0I7UUFFdEIsdUdBQXVHO1FBQ3ZHLGtHQUFrRztRQUNsRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxpQ0FBaUMsRUFBRTtZQUNqRCxrQkFBa0I7Ozs7WUFBRyxVQUFVLFVBQVU7O29CQUNqQyxPQUFPLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBRSxVQUFVLENBQUMsaUJBQWlCLENBQUM7Z0JBQ2hHLFVBQVUsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3hCLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNqRSxDQUFDLENBQUEsQ0FBQztZQUVGLFVBQVUsQ0FBQyxZQUFZOzs7WUFBQzs7b0JBQ2hCLFVBQVUsR0FBRyxJQUFJO2dCQUVyQix1RUFBdUU7Z0JBQ3ZFLElBQUksVUFBVSxDQUFDLEtBQUssS0FBSyxPQUFPLENBQUMsZUFBZSxDQUFDLFlBQVksRUFBRTtvQkFDM0QsdUJBQXVCLEdBQUcsTUFBTSxDQUFDLFVBQVU7OztvQkFBQyxjQUFjLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFFLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2lCQUM5SDtZQUNMLENBQUMsRUFBQyxDQUFDO1lBRUgsVUFBVSxDQUFDLFlBQVk7Ozs7WUFBQyxVQUFVLElBQUk7Z0JBQ2xDLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxPQUFPLENBQUMsZUFBZSxDQUFDLFlBQVksRUFBRTtvQkFDeEQsNENBQTRDO29CQUM1QyxNQUFNLENBQUMsWUFBWSxDQUFDLHVCQUF1QixDQUFDLENBQUM7aUJBQ2hEO1lBQ0wsQ0FBQyxFQUFDLENBQUM7WUFFSCxVQUFVLENBQUMsQ0FBQyxDQUFDLGlDQUFpQyxHQUFHLElBQUksQ0FBQztTQUN6RDtJQUNMLENBQUMsQ0FBQTtJQUVMLE9BQU87Ozs7OztJQUFHLFVBQVUsR0FBRyxFQUFFLEVBQUUsRUFBRSxPQUFPO1FBQ2hDLHlFQUF5RTtRQUN6RSxnRkFBZ0Y7UUFDaEYsbUNBQW1DO1FBQ25DLDhFQUE4RTtRQUM5RSxpRkFBaUY7UUFDakYsdURBQXVEO1FBQ3ZELFlBQVk7UUFDWix5Q0FBeUM7UUFDekMseUZBQXlGO1FBQ3pGLHVDQUF1QztRQUN2QyxZQUFZO1FBRVosT0FBTyxJQUFJLE9BQU8sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDakQsQ0FBQyxDQUFBLENBQUM7SUFFRixPQUFPLENBQUMsQ0FBQyxHQUFHO1FBQ1Isa0JBQWtCLEVBQUUsa0RBQWtEO1FBRXRFLFNBQVMsRUFBRTs7O1FBQUM7O2dCQUNKLE9BQU87O2dCQUNQLE9BQU87WUFFWCxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxLQUFLLDZCQUE2QixFQUFFO2dCQUM1RCw4RkFBOEY7Z0JBQzlGLE9BQU8sR0FBRyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFFbkUsSUFBSSxPQUFPLEVBQUU7b0JBQ1QsT0FBTyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDcEM7YUFDSjtZQUVELCtCQUErQjtZQUMvQixPQUFPLE9BQU8sQ0FBQztRQUNuQixDQUFDLEVBQUMsRUFBRTtRQUVKLEtBQUs7Ozs7OztRQUFFLFVBQVUsT0FBTyxFQUFFLE1BQU0sRUFBRSxPQUFPOztnQkFDakMsQ0FBQyxHQUFHLG1CQUFBLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFPO1lBQ2pDLENBQUMsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1lBRWxCLElBQUksT0FBTyxPQUFPLEtBQUssV0FBVyxFQUFFO2dCQUNoQyxDQUFDLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQzthQUN2QjtZQUVELE9BQU8sQ0FBQyxDQUFDO1FBQ2IsQ0FBQyxDQUFBO1FBRUQsY0FBYzs7Ozs7OztRQUFFLFVBQVUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsT0FBTzs7Z0JBQ3JELENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDO1lBQzVDLENBQUMsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7WUFDckQsT0FBTyxDQUFDLENBQUM7UUFDYixDQUFDLENBQUE7UUFFRCxNQUFNOzs7UUFBRTs7O2dCQUVBLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDM0MsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2xEO1lBQ0QsT0FBTyxDQUFDLENBQUM7UUFDYixDQUFDLENBQUE7UUFFRCxtQkFBbUI7Ozs7UUFBRSxVQUFVLFNBQVM7OztnQkFFaEMsT0FBTyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUM7WUFDL0MsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ25ELE9BQU8sQ0FBQyxDQUFDO2FBQ1o7WUFDRCxPQUFPLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2hELENBQUMsQ0FBQTtRQUVELHFCQUFxQjs7OztRQUFFLFVBQVUsVUFBVTs7Z0JBQ25DLE1BQU0sR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLE1BQU07O2dCQUM1QixNQUFNOzs7O1lBQUcsVUFBVSxLQUFLO2dCQUNwQixDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzFELENBQUMsQ0FBQTtZQUVMLElBQUksTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxjQUFjLElBQUksTUFBTSxDQUFDLFlBQVksRUFBRTtnQkFDL0QsVUFBVSxDQUFDLENBQUMsQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDLFdBQVc7OztnQkFBQztvQkFDN0MsT0FBTyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDbEUsQ0FBQyxHQUFFLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUMzQjtRQUNMLENBQUMsQ0FBQTtLQUNKLENBQUM7SUFFRixPQUFPLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUV4QixPQUFPLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUU5QixPQUFPLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztJQUVwQyxPQUFPLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztJQUVsQyxPQUFPLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztJQUUxQyxPQUFPLENBQUMsZUFBZSxHQUFHO1FBQ3RCLFVBQVUsRUFBRSxDQUFDO1FBQ2IsU0FBUyxFQUFFLENBQUM7UUFDWixZQUFZLEVBQUUsQ0FBQztRQUNmLFlBQVksRUFBRSxDQUFDO0tBQ2xCLENBQUM7SUFFRixPQUFPLENBQUMsR0FBRyxHQUFHO1FBQ1YsS0FBSzs7O1FBQUU7WUFDSCxxR0FBcUc7WUFDckcsTUFBTSxJQUFJLEtBQUssQ0FBQywrR0FBK0csQ0FBQyxDQUFDO1FBQ3JJLENBQUMsQ0FBQTtLQUNKLENBQUM7SUFFRixpSEFBaUg7SUFDakgsK0NBQStDO0lBQy9DLElBQUksT0FBTyxXQUFXLENBQUMsRUFBRSxJQUFJLFVBQVUsRUFBRTtRQUNyQyxXQUFXLENBQUMsRUFBRSxDQUFDLE1BQU07OztRQUFFLGNBQWMsV0FBVyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDO0tBQy9EO1NBQ0k7UUFDRCxXQUFXLENBQUMsSUFBSTs7O1FBQUMsY0FBYyxXQUFXLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUM7S0FDekQ7Ozs7OztJQUVELFNBQVMsaUJBQWlCLENBQUMsa0JBQWtCLEVBQUUsVUFBVTtRQUNyRCxxSEFBcUg7UUFDckgsaUhBQWlIO1FBQ2pILDJJQUEySTtRQUMzSSw2QkFBNkI7UUFFN0IsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLEVBQUU7WUFDL0IsK0RBQStEO1lBQy9ELEtBQUssSUFBSSxDQUFDLEdBQUcsa0JBQWtCLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFOztvQkFDakQsU0FBUyxHQUFHLGtCQUFrQixDQUFDLENBQUMsQ0FBQztnQkFDckMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLFFBQVEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEVBQUU7b0JBQ2xFLFVBQVUsQ0FBQyxHQUFHLENBQUMscUJBQXFCLEdBQUcsU0FBUyxHQUFHLHlDQUF5QyxDQUFDLENBQUM7b0JBQzlGLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7aUJBQ25DO2FBQ0o7WUFFRCxtRkFBbUY7WUFDbkYsSUFBSSxrQkFBa0IsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO2dCQUNqQyxVQUFVLENBQUMsR0FBRyxDQUFDLDREQUE0RCxDQUFDLENBQUM7Z0JBQzdFLGtCQUFrQixHQUFHLElBQUksQ0FBQzthQUM3QjtTQUNKO2FBQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsa0JBQWtCLENBQUMsSUFBSSxrQkFBa0IsS0FBSyxNQUFNLEVBQUU7WUFDakYsVUFBVSxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsR0FBRyxrQkFBa0IsQ0FBQyxRQUFRLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUM1RSxrQkFBa0IsR0FBRyxJQUFJLENBQUM7U0FDN0I7YUFBTSxJQUFJLGtCQUFrQixLQUFLLE1BQU0sSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLFNBQVMsSUFBSSxDQUFDLEVBQUU7WUFDbEUsK0VBQStFO1lBQy9FLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUUxQjtRQUVELE9BQU8sa0JBQWtCLENBQUM7SUFDOUIsQ0FBQzs7Ozs7SUFFRCxTQUFTLGNBQWMsQ0FBQyxRQUFRO1FBQzVCLElBQUksUUFBUSxLQUFLLE9BQU8sRUFBRTtZQUN0QixPQUFPLEVBQUUsQ0FBQztTQUNiO2FBQU0sSUFBSSxRQUFRLEtBQUssUUFBUSxFQUFFO1lBQzlCLE9BQU8sR0FBRyxDQUFDO1NBQ2Q7SUFDTCxDQUFDOzs7Ozs7SUFFRCxTQUFTLGNBQWMsQ0FBQyxRQUFRLEVBQUUsR0FBRztRQUNqQywwRUFBMEU7UUFDMUUsb0VBQW9FO1FBQ3BFLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUNwQixPQUFPLEdBQUcsQ0FBQztTQUNkO2FBQU07WUFDSCxPQUFPLEdBQUcsR0FBRyxHQUFHLEdBQUcsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQy9DO0lBQ0wsQ0FBQzs7Ozs7O0lBRUQsU0FBUyx1QkFBdUIsQ0FBQyxVQUFVLEVBQUUsYUFBYTs7WUFDbEQsSUFBSSxHQUFHLElBQUk7O1lBQ1gsTUFBTSxHQUFHLEVBQUU7UUFFZixJQUFJLENBQUMsU0FBUzs7OztRQUFHLFVBQVUsT0FBTztZQUM5QixJQUFJLFVBQVUsQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsVUFBVSxFQUFFO2dCQUMzRCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUVyQixPQUFPLElBQUksQ0FBQzthQUNmO1lBRUQsT0FBTyxLQUFLLENBQUM7UUFDakIsQ0FBQyxDQUFBLENBQUM7UUFFRixJQUFJLENBQUMsS0FBSzs7O1FBQUc7WUFDVCxnSEFBZ0g7WUFDaEgsSUFBSSxVQUFVLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLFNBQVMsRUFBRTtnQkFDMUQsT0FBTyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQkFDdEIsYUFBYSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO2lCQUNqQzthQUNKO1FBQ0wsQ0FBQyxDQUFBLENBQUM7UUFFRixJQUFJLENBQUMsS0FBSzs7O1FBQUc7WUFDVCxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLENBQUMsQ0FBQSxDQUFDO0lBQ04sQ0FBQztJQUVELE9BQU8sQ0FBQyxFQUFFLEdBQUcsT0FBTyxDQUFDLFNBQVMsR0FBRztRQUM3QixJQUFJOzs7Ozs7UUFBRSxVQUFVLEdBQUcsRUFBRSxFQUFFLEVBQUUsT0FBTzs7Z0JBQ3hCLFdBQVcsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBRXpCLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQ2YsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7WUFDYixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztZQUN0QixJQUFJLENBQUMsQ0FBQyxHQUFHO2dCQUNMLGFBQWEsRUFBRSxFQUFFO2dCQUNqQix1QkFBdUIsRUFBRSxJQUFJLHVCQUF1QixDQUFDLElBQUk7Ozs7Z0JBQUUsVUFBVSxPQUFPO29CQUN4RSxXQUFXLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUM3RCxDQUFDLEVBQUM7Z0JBQ0YsYUFBYSxFQUFFLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFO2dCQUNuQyxZQUFZLEVBQUUsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUU7Z0JBQ2xDLFlBQVksRUFBRSxJQUFJOztnQkFDbEIsVUFBVSxFQUFFLElBQUk7Z0JBQ2hCLDRCQUE0QixFQUFFLENBQUMsQ0FBQywySEFBMkg7YUFDOUosQ0FBQztZQUNGLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLFNBQVMsRUFBRTtnQkFDaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7YUFDMUI7UUFDTCxDQUFDLENBQUE7UUFFRCxjQUFjOzs7O1FBQUUsVUFBVSxRQUFROztnQkFDMUIsSUFBSSxHQUFHLElBQUk7WUFFZixJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNYLE9BQU8sUUFBUSxDQUFDO2FBQ25CO2lCQUFNLElBQUksT0FBTyxRQUFRLEtBQUssUUFBUSxFQUFFO2dCQUNyQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ3BDO2lCQUFNO2dCQUNILE9BQU8sUUFBUSxDQUFDO2FBQ25CO1FBQ0wsQ0FBQyxDQUFBO1FBRUQsYUFBYSxFQUFFLElBQUk7UUFFbkIsSUFBSSxFQUFFLElBQUk7UUFFVixhQUFhOzs7OztRQUFFLFVBQVUsR0FBRyxFQUFFLE9BQU87Ozs7Ozs7O2dCQU83QixJQUFJO1lBRVIsR0FBRyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFbEIsT0FBTyxHQUFHLE9BQU8sSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDO1lBRXJDLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQzNCLE9BQU8sS0FBSyxDQUFDO2FBQ2hCO1lBRUQsd0JBQXdCO1lBQ3hCLElBQUksR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMxQyxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztZQUVoQiw2R0FBNkc7WUFDN0csT0FBTyxJQUFJLENBQUMsUUFBUSxHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxPQUFPLENBQUMsUUFBUSxHQUFHLGNBQWMsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxSSxDQUFDLENBQUE7UUFFRCxZQUFZLEVBQUUsTUFBTTtRQUVwQixXQUFXLEVBQUUsaUNBQWlDO1FBRTlDLE9BQU8sRUFBRSxLQUFLO1FBRWQsS0FBSyxFQUFFLE9BQU8sQ0FBQyxlQUFlLENBQUMsWUFBWTtRQUUzQyxjQUFjLEVBQUUsS0FBSztRQUVyQixjQUFjLEVBQUUsSUFBSTtRQUVwQix1QkFBdUIsRUFBRSxDQUFDO1FBRTFCLGlCQUFpQixFQUFFLEtBQUs7O1FBRXhCLGVBQWUsRUFBRSxLQUFLOztRQUV0QixlQUFlLEVBQUUsQ0FBQyxHQUFHLENBQUM7O1FBRXRCLEtBQUs7Ozs7O1FBQUUsVUFBVSxPQUFPLEVBQUUsUUFBUTs7Ozs7Z0JBSTFCLFVBQVUsR0FBRyxJQUFJOztnQkFDakIsTUFBTSxHQUFHLG1CQUFBO2dCQUNMLFlBQVksRUFBRSxNQUFNO2dCQUNwQixlQUFlLEVBQUUsSUFBSTtnQkFDckIsU0FBUyxFQUFFLE1BQU07Z0JBQ2pCLEtBQUssRUFBRSxLQUFLO2dCQUNaLFFBQVEsRUFBRSxTQUFTO2FBQ3RCLEVBQU87O2dCQUNSLFVBQVU7O2dCQUNWLFFBQVEsR0FBRyxVQUFVLENBQUMsU0FBUyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUU7O2dCQUFFLHlHQUF5RztZQUMxSixNQUFNLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDO1lBRS9DLFVBQVUsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBRTVCLDRGQUE0RjtZQUM1RixVQUFVLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztZQUVoQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRTtnQkFDbEIsV0FBVztnQkFDWCxNQUFNLElBQUksS0FBSyxDQUFDLCtLQUErSyxDQUFDLENBQUM7YUFDcE07WUFFRCxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssVUFBVSxFQUFFO2dCQUNoQyxpREFBaUQ7Z0JBQ2pELFFBQVEsR0FBRyxPQUFPLENBQUM7YUFDdEI7aUJBQU0sSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLFFBQVEsRUFBRTtnQkFDckMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssVUFBVSxFQUFFO29CQUN4QyxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztpQkFDOUI7YUFDSjtZQUVELE1BQU0sQ0FBQyxTQUFTLEdBQUcsaUJBQWlCLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUVuRSw2REFBNkQ7WUFDN0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUU7Z0JBQ25CLE1BQU0sSUFBSSxLQUFLLENBQUMsMERBQTBELENBQUMsQ0FBQzthQUMvRTtZQUVELFVBQVUsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztZQUU3QiwyREFBMkQ7WUFDM0QsOEZBQThGO1lBQzlGLElBQUksQ0FBQyxXQUFXLElBQUksTUFBTSxDQUFDLGVBQWUsS0FBSyxJQUFJLEVBQUU7Z0JBQ2pELFVBQVUsQ0FBQyxDQUFDLENBQUMsb0JBQW9COzs7Z0JBQUc7b0JBQ2hDLFVBQVUsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUN4QyxDQUFDLENBQUEsQ0FBQztnQkFDRixXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUM7Z0JBRTVELE9BQU8sUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQzdCO1lBRUQsNkZBQTZGO1lBQzdGLElBQUksVUFBVSxDQUFDLEtBQUssS0FBSyxPQUFPLENBQUMsZUFBZSxDQUFDLFVBQVUsRUFBRTtnQkFDekQsT0FBTyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDN0I7aUJBQU0sSUFBSSxXQUFXLENBQUMsVUFBVSxFQUM3QixPQUFPLENBQUMsZUFBZSxDQUFDLFlBQVksRUFDcEMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsS0FBSyxLQUFLLEVBQUU7Z0JBQy9DLDhEQUE4RDtnQkFDOUQsMkVBQTJFO2dCQUUzRSxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUM3QixPQUFPLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUM3QjtZQUVELGdDQUFnQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRTdDLHVCQUF1QjtZQUN2QixNQUFNLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUM7WUFDN0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLElBQUksTUFBTSxDQUFDLFFBQVEsS0FBSyxHQUFHLEVBQUU7Z0JBQzdDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO2dCQUN4RCxVQUFVLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO2FBQ2xFO2lCQUFNO2dCQUNILFVBQVUsQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztnQkFDdEMsVUFBVSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO2FBQ2pDO1lBRUQsVUFBVSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUMsUUFBUSxHQUFHLElBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDO1lBRWxFLDZCQUE2QjtZQUM3QixVQUFVLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxRQUFRLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUU5RSx1RkFBdUY7WUFDdkYsdUVBQXVFO1lBQ3ZFLGtGQUFrRjtZQUNsRixpQ0FBaUM7WUFDakMsSUFBSSxNQUFNLENBQUMsU0FBUyxLQUFLLE1BQU0sSUFBSSxNQUFNLENBQUMsS0FBSyxLQUFLLElBQUksRUFBRTtnQkFDdEQsTUFBTSxDQUFDLFNBQVMsR0FBRyxhQUFhLENBQUM7YUFDcEM7WUFFRCxvRkFBb0Y7WUFDcEYsSUFBSSxVQUFVLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ3BDLFVBQVUsQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQztnQkFDM0QsVUFBVSxDQUFDLEdBQUcsQ0FBQyxxREFBcUQsR0FBRyxVQUFVLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDO2FBQ2pHO1lBRUQsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDcEMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO2dCQUVsRCxJQUFJLE1BQU0sQ0FBQyxTQUFTLEtBQUssTUFBTSxFQUFFO29CQUM3QixzQ0FBc0M7b0JBQ3RDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsQ0FBQyxZQUFZLEVBQUUsa0JBQWtCLEVBQUUsYUFBYSxDQUFDLENBQUM7aUJBQ3hFO2dCQUVELElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsS0FBSyxXQUFXLEVBQUU7b0JBQ2pELE1BQU0sQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO2lCQUNqQztnQkFFRCxpRkFBaUY7Z0JBQ2pGLDRDQUE0QztnQkFDNUMsd0VBQXdFO2dCQUN4RSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRTtvQkFDZixNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7b0JBRS9CLElBQUksTUFBTSxDQUFDLEtBQUssRUFBRTt3QkFDZCxVQUFVLENBQUMsR0FBRyxDQUFDLHdEQUF3RCxDQUFDLENBQUM7cUJBQzVFO2lCQUNKO2dCQUVELFVBQVUsQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQzthQUN6RDtZQUVELFVBQVUsQ0FBQyxlQUFlLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQztZQUVwRCxVQUFVLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1lBRTFELENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU87Ozs7O1lBQUUsVUFBVSxDQUFDLEVBQUUsSUFBSTtnQkFDaEQsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLFVBQVUsRUFBRTtvQkFDakMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztpQkFDN0I7Z0JBQ0QsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNqQyxDQUFDLEVBQUMsQ0FBQztZQUVILFVBQVUsQ0FBQyxDQUFDLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUU3RSxVQUFVOzs7OztZQUFHLFVBQVUsVUFBVSxFQUFFLEtBQUs7O29CQUNoQyxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUM7Z0JBRW5FLEtBQUssR0FBRyxLQUFLLElBQUksQ0FBQyxDQUFDO2dCQUNuQixJQUFJLEtBQUssSUFBSSxVQUFVLENBQUMsTUFBTSxFQUFFO29CQUM1QixJQUFJLEtBQUssS0FBSyxDQUFDLEVBQUU7d0JBQ2IsVUFBVSxDQUFDLEdBQUcsQ0FBQyxzREFBc0QsQ0FBQyxDQUFDO3FCQUMxRTt5QkFBTSxJQUFJLEtBQUssS0FBSyxDQUFDLEVBQUU7d0JBQ3BCLFVBQVUsQ0FBQyxHQUFHLENBQUMsdUNBQXVDLENBQUMsQ0FBQztxQkFDM0Q7eUJBQU07d0JBQ0gsVUFBVSxDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO3FCQUNwRDtvQkFFRCx3Q0FBd0M7b0JBQ3hDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztvQkFDakUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO29CQUNsQyxrRkFBa0Y7b0JBQ2xGLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDbEIsT0FBTztpQkFDVjtnQkFFRCw2QkFBNkI7Z0JBQzdCLElBQUksVUFBVSxDQUFDLEtBQUssS0FBSyxPQUFPLENBQUMsZUFBZSxDQUFDLFlBQVksRUFBRTtvQkFDM0QsT0FBTztpQkFDVjs7b0JBRUcsYUFBYSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUM7O29CQUNqQyxTQUFTLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUM7O29CQUM3QyxVQUFVOzs7Z0JBQUc7b0JBQ1QsVUFBVSxDQUFDLFVBQVUsRUFBRSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RDLENBQUMsQ0FBQTtnQkFFTCxVQUFVLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztnQkFFakMsSUFBSTtvQkFDQSxVQUFVLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsU0FBUzs7O29CQUFFOzs7OzRCQUVsQyxvQkFBb0IsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRTs7NEJBQ3RGLFVBQVUsR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDLGVBQWUsSUFBSSxvQkFBb0I7d0JBRXJFLFVBQVUsQ0FBQyxHQUFHLENBQUMsb0VBQW9FLENBQUMsQ0FBQzt3QkFFckYsSUFBSSxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsRUFBRTs0QkFDL0IsT0FBTyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUM7eUJBQzFEO3dCQUVELE9BQU8sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQzt3QkFFckQscUVBQXFFO3dCQUNyRSx1RkFBdUY7d0JBQ3ZGLE9BQU8sQ0FBQyxDQUFDLENBQUMscUJBQXFCLENBQUMsVUFBVSxDQUFDLENBQUM7d0JBRTVDLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUN2QixPQUFPLENBQUMsZUFBZSxDQUFDLFVBQVUsRUFDbEMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsRUFBRTs0QkFDcEMsVUFBVSxDQUFDLEdBQUcsQ0FBQywwREFBMEQsQ0FBQyxDQUFDO3lCQUM5RTt3QkFFRCxnRkFBZ0Y7d0JBQ2hGLFVBQVUsQ0FBQyxDQUFDLENBQUMsdUJBQXVCLENBQUMsS0FBSyxFQUFFLENBQUM7d0JBRTdDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO3dCQUU3QywwREFBMEQ7d0JBQzFELFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUTs7O3dCQUFFOzRCQUN2QixVQUFVLENBQUMsR0FBRyxDQUFDLDRDQUE0QyxDQUFDLENBQUM7NEJBRTdELFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7d0JBQ2hDLENBQUMsRUFBQyxDQUFDO3dCQUVILElBQUksb0JBQW9CLEVBQUU7NEJBQ3RCLHFGQUFxRjs0QkFDckYsUUFBUTs0QkFDUixXQUFXLENBQUMsSUFBSSxDQUFDLGNBQWM7Ozs0QkFBRTtnQ0FDN0IsOEVBQThFO2dDQUM5RSwyREFBMkQ7Z0NBQzNELE1BQU0sQ0FBQyxVQUFVOzs7Z0NBQUM7b0NBQ2QsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztnQ0FDaEMsQ0FBQyxHQUFFLENBQUMsQ0FBQyxDQUFDOzRCQUNWLENBQUMsRUFBQyxDQUFDO3lCQUNOO29CQUNMLENBQUMsR0FBRSxVQUFVLENBQUMsQ0FBQztpQkFDbEI7Z0JBQ0QsT0FBTyxLQUFLLEVBQUU7b0JBQ1YsVUFBVSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLG9CQUFvQixHQUFHLEtBQUssQ0FBQyxPQUFPLEdBQUcsNkJBQTZCLENBQUMsQ0FBQztvQkFDdEcsVUFBVSxFQUFFLENBQUM7aUJBQ2hCO1lBQ0wsQ0FBQyxDQUFBLENBQUM7O2dCQUVFLEdBQUcsR0FBRyxVQUFVLENBQUMsR0FBRyxHQUFHLFlBQVk7O2dCQUNuQyxRQUFROzs7OztZQUFHLFVBQVUsS0FBSyxFQUFFLFVBQVU7O29CQUM5QixHQUFHLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLGdCQUFnQixFQUFFLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDO2dCQUUzRixDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQ2xELFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3JCLDBDQUEwQztnQkFDMUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3RCLENBQUMsQ0FBQTtZQUVMLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRWhELEdBQUcsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFFcEUsVUFBVSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFFbEQsOEdBQThHO1lBQzlHLFVBQVUsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDdkUsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsS0FBSzs7Ozs7Z0JBQUUsVUFBVSxLQUFLLEVBQUUsVUFBVTtvQkFDOUIsaUZBQWlGO29CQUNqRixJQUFJLFVBQVUsS0FBSyxtQkFBbUIsRUFBRTt3QkFDcEMsUUFBUSxDQUFDLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQztxQkFDL0I7eUJBQU07d0JBQ0gsa0ZBQWtGO3dCQUNsRixRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyx1QkFBdUIsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO3FCQUN4SDtnQkFDTCxDQUFDLENBQUE7Z0JBQ0QsT0FBTzs7OztnQkFBRSxVQUFVLE1BQU07O3dCQUNqQixHQUFHOzt3QkFDSCxhQUFhOzt3QkFDYixhQUFhOzt3QkFDYixVQUFVLEdBQUcsRUFBRTs7d0JBQ2YsbUJBQW1CLEdBQUcsRUFBRTtvQkFFNUIsSUFBSTt3QkFDQSxHQUFHLEdBQUcsVUFBVSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztxQkFDM0M7b0JBQUMsT0FBTyxLQUFLLEVBQUU7d0JBQ1osUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyw2QkFBNkIsRUFBRSxLQUFLLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQzt3QkFDdEYsT0FBTztxQkFDVjtvQkFFRCxhQUFhLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUM7b0JBQzNDLFVBQVUsQ0FBQyxjQUFjLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztvQkFDcEMsVUFBVSxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsWUFBWSxDQUFDO29CQUNqQyxVQUFVLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxlQUFlLENBQUM7b0JBQ3ZDLFVBQVUsQ0FBQyxrQkFBa0IsR0FBRyxHQUFHLENBQUMsa0JBQWtCLENBQUM7b0JBRXZELGlFQUFpRTtvQkFDakUsVUFBVSxDQUFDLENBQUMsQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDLGlCQUFpQixHQUFHLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxRQUFRO29CQUV6RSwrR0FBK0c7b0JBQy9HLHVDQUF1QztvQkFDdkMsVUFBVSxDQUFDLGlCQUFpQixHQUFHLEdBQUcsQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsQ0FBQyxRQUFRO29CQUVyRSxrSUFBa0k7b0JBQ2xJLFVBQVUsQ0FBQyxDQUFDLENBQUMsNEJBQTRCLEdBQUcsVUFBVSxDQUFDLHVCQUF1QixHQUFHLEdBQUcsQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLENBQUM7b0JBRXBILDBCQUEwQjtvQkFDMUIsSUFBSSxHQUFHLENBQUMsZ0JBQWdCLEVBQUU7d0JBQ3RCLDRDQUE0Qzt3QkFDNUMsYUFBYSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7d0JBRS9CLGdHQUFnRzt3QkFDaEcsYUFBYSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO3dCQUVwRCx3R0FBd0c7d0JBQ3hHLGFBQWEsQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUMsZUFBZSxDQUFDO3dCQUVsRix5SEFBeUg7d0JBQ3pILFVBQVUsQ0FBQyxDQUFDLENBQUMsWUFBWSxHQUFHLENBQUMsYUFBYSxDQUFDLE9BQU8sR0FBRyxhQUFhLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3FCQUMxRjt5QkFBTTt3QkFDSCxhQUFhLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztxQkFDbkM7b0JBRUQsVUFBVSxDQUFDLGVBQWUsR0FBRyxVQUFVLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxhQUFhLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUV6RixJQUFJLENBQUMsR0FBRyxDQUFDLGVBQWUsSUFBSSxHQUFHLENBQUMsZUFBZSxLQUFLLFVBQVUsQ0FBQyxjQUFjLEVBQUU7d0JBQzNFLGFBQWEsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsb0JBQW9CLEVBQUUsVUFBVSxDQUFDLGNBQWMsRUFBRSxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQzt3QkFDbEksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQzt3QkFDOUQsUUFBUSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQzt3QkFFL0IsT0FBTztxQkFDVjtvQkFFRCxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVOzs7O29CQUFFLFVBQVUsR0FBRzt3QkFDcEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssWUFBWSxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxFQUFFOzRCQUMxRSxPQUFPLElBQUksQ0FBQzt5QkFDZjt3QkFDRCxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2xDLENBQUMsRUFBQyxDQUFDO29CQUVILElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQUU7d0JBQzdCLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVM7Ozs7O3dCQUFFLFVBQVUsQ0FBQyxFQUFFLFNBQVM7NEJBQzNDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0NBQ2hELFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7NkJBQzlCO3dCQUNMLENBQUMsRUFBQyxDQUFDO3FCQUNOO3lCQUFNLElBQUksTUFBTSxDQUFDLFNBQVMsS0FBSyxNQUFNLEVBQUU7d0JBQ3BDLFVBQVUsR0FBRyxtQkFBbUIsQ0FBQztxQkFDcEM7eUJBQU0sSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEVBQUU7d0JBQzlELFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO3FCQUNyQztvQkFFRCxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQzNCLENBQUMsQ0FBQTthQUNKLENBQUMsQ0FBQztZQUVILE9BQU8sUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzlCLENBQUMsQ0FBQTtRQUVELFFBQVE7Ozs7UUFBRSxVQUFVLFFBQVE7Ozs7O2dCQUlwQixVQUFVLEdBQUcsSUFBSTtZQUNyQixDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVOzs7OztZQUFFLFVBQVUsQ0FBQyxFQUFFLElBQUk7Z0JBQ25ELFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDOUIsQ0FBQyxFQUFDLENBQUM7WUFDSCxPQUFPLFVBQVUsQ0FBQztRQUN0QixDQUFDLENBQUE7UUFFRCxJQUFJOzs7O1FBQUUsVUFBVSxJQUFJOzs7OztnQkFJWixVQUFVLEdBQUcsSUFBSTtZQUVyQixJQUFJLFVBQVUsQ0FBQyxLQUFLLEtBQUssT0FBTyxDQUFDLGVBQWUsQ0FBQyxZQUFZLEVBQUU7Z0JBQzNELHFDQUFxQztnQkFDckMsTUFBTSxJQUFJLEtBQUssQ0FBQywyRkFBMkYsQ0FBQyxDQUFDO2FBQ2hIO1lBRUQsSUFBSSxVQUFVLENBQUMsS0FBSyxLQUFLLE9BQU8sQ0FBQyxlQUFlLENBQUMsVUFBVSxFQUFFO2dCQUN6RCxxQ0FBcUM7Z0JBQ3JDLE1BQU0sSUFBSSxLQUFLLENBQUMsMklBQTJJLENBQUMsQ0FBQzthQUNoSztZQUVELFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUM1QywwQ0FBMEM7WUFDMUMsT0FBTyxVQUFVLENBQUM7UUFDdEIsQ0FBQyxDQUFBO1FBRUQsUUFBUTs7OztRQUFFLFVBQVUsUUFBUTs7Ozs7Z0JBSXBCLFVBQVUsR0FBRyxJQUFJO1lBQ3JCLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVU7Ozs7O1lBQUUsVUFBVSxDQUFDLEVBQUUsSUFBSTtnQkFDbkQsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxFQUFDLENBQUM7WUFDSCxPQUFPLFVBQVUsQ0FBQztRQUN0QixDQUFDLENBQUE7UUFFRCxZQUFZOzs7O1FBQUUsVUFBVSxRQUFROzs7OztnQkFJeEIsVUFBVSxHQUFHLElBQUk7WUFDckIsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYzs7Ozs7WUFBRSxVQUFVLENBQUMsRUFBRSxJQUFJO2dCQUN2RCxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNwQyxDQUFDLEVBQUMsQ0FBQztZQUNILE9BQU8sVUFBVSxDQUFDO1FBQ3RCLENBQUMsQ0FBQTtRQUVELEtBQUs7Ozs7UUFBRSxVQUFVLFFBQVE7Ozs7O2dCQUlqQixVQUFVLEdBQUcsSUFBSTtZQUNyQixDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPOzs7Ozs7WUFBRSxVQUFVLENBQUMsRUFBRSxTQUFTLEVBQUUsUUFBUTtnQkFDL0QsVUFBVSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7Z0JBQ2pDLDZEQUE2RDtnQkFDN0QscUZBQXFGO2dCQUNyRiw0RUFBNEU7Z0JBQzVFLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUNuRCxDQUFDLEVBQUMsQ0FBQztZQUNILE9BQU8sVUFBVSxDQUFDO1FBQ3RCLENBQUMsQ0FBQTtRQUVELFlBQVk7Ozs7UUFBRSxVQUFVLFFBQVE7Ozs7O2dCQUl4QixVQUFVLEdBQUcsSUFBSTtZQUNyQixDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZOzs7OztZQUFFLFVBQVUsQ0FBQyxFQUFFLElBQUk7Z0JBQ3JELFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDOUIsQ0FBQyxFQUFDLENBQUM7WUFDSCxPQUFPLFVBQVUsQ0FBQztRQUN0QixDQUFDLENBQUE7UUFFRCxjQUFjOzs7O1FBQUUsVUFBVSxRQUFROzs7OztnQkFJMUIsVUFBVSxHQUFHLElBQUk7WUFDckIsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCOzs7OztZQUFFLFVBQVUsQ0FBQyxFQUFFLElBQUk7Z0JBQ3pELFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDOUIsQ0FBQyxFQUFDLENBQUM7WUFFSCxPQUFPLFVBQVUsQ0FBQztRQUN0QixDQUFDLENBQUE7UUFFRCxZQUFZOzs7O1FBQUUsVUFBVSxRQUFROzs7OztnQkFJeEIsVUFBVSxHQUFHLElBQUk7WUFDckIsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYzs7Ozs7WUFBRSxVQUFVLENBQUMsRUFBRSxJQUFJO2dCQUN2RCxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzlCLENBQUMsRUFBQyxDQUFDO1lBQ0gsT0FBTyxVQUFVLENBQUM7UUFDdEIsQ0FBQyxDQUFBO1FBRUQsV0FBVzs7OztRQUFFLFVBQVUsUUFBUTs7Ozs7Z0JBSXZCLFVBQVUsR0FBRyxJQUFJO1lBQ3JCLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVc7Ozs7O1lBQUUsVUFBVSxDQUFDLEVBQUUsSUFBSTtnQkFDcEQsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUM5QixDQUFDLEVBQUMsQ0FBQztZQUNILE9BQU8sVUFBVSxDQUFDO1FBQ3RCLENBQUMsQ0FBQTtRQUVELElBQUk7Ozs7O1FBQUUsVUFBVSxLQUFLLEVBQUUsWUFBWTs7Ozs7O2dCQUszQixVQUFVLEdBQUcsSUFBSTs7O1lBQ2pCLGtEQUFrRDtZQUNsRCxRQUFRLEdBQUcsVUFBVSxDQUFDLFNBQVM7WUFFbkMsd0NBQXdDO1lBQ3hDLElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQyxvQkFBb0IsRUFBRTtnQkFDbkMsb0JBQW9CO2dCQUNwQixXQUFXLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUM7YUFDakU7WUFFRCxtREFBbUQ7WUFDbkQsT0FBTyxVQUFVLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztZQUMzQixPQUFPLFVBQVUsQ0FBQyxDQUFDLENBQUMsb0JBQW9CLENBQUM7WUFFekMsb0hBQW9IO1lBQ3BILGdHQUFnRztZQUNoRyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLE1BQU0sSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxlQUFlLEtBQUssSUFBSSxDQUFDLEVBQUU7Z0JBQ3hGLFVBQVUsQ0FBQyxHQUFHLENBQUMseUNBQXlDLENBQUMsQ0FBQztnQkFFMUQsNENBQTRDO2dCQUM1QyxJQUFJLFFBQVEsRUFBRTtvQkFDVixRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7aUJBQ25FO2dCQUVELDhEQUE4RDtnQkFDOUQsT0FBTzthQUNWO1lBRUQsSUFBSSxVQUFVLENBQUMsS0FBSyxLQUFLLE9BQU8sQ0FBQyxlQUFlLENBQUMsWUFBWSxFQUFFO2dCQUMzRCxPQUFPO2FBQ1Y7WUFFRCxVQUFVLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUM7WUFFdkMsNEJBQTRCO1lBQzVCLE1BQU0sQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUM3QyxNQUFNLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUM7WUFFbEQsSUFBSSxVQUFVLENBQUMsU0FBUyxFQUFFO2dCQUN0QixVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFFdEMsSUFBSSxZQUFZLEtBQUssS0FBSyxFQUFFO29CQUN4QixVQUFVLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7aUJBQ2pEO2dCQUVELElBQUksaUJBQWlCLENBQUMsVUFBVSxDQUFDLEVBQUU7b0JBQy9CLE9BQU8sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLHVCQUF1QixDQUFDLFVBQVUsQ0FBQyxDQUFDO2lCQUNqRTtnQkFFRCxVQUFVLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQzthQUMvQjtZQUVELElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRTtnQkFDL0IsbUVBQW1FO2dCQUNuRSxVQUFVLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2dCQUN6RCxPQUFPLFVBQVUsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUM7YUFDeEM7WUFFRCxrRkFBa0Y7WUFDbEYsSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRTtnQkFDMUIsVUFBVSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDbkM7WUFFRCxPQUFPLFVBQVUsQ0FBQyxTQUFTLENBQUM7WUFDNUIsT0FBTyxVQUFVLENBQUMsU0FBUyxDQUFDO1lBQzVCLE9BQU8sVUFBVSxDQUFDLFdBQVcsQ0FBQztZQUM5QixPQUFPLFVBQVUsQ0FBQyxFQUFFLENBQUM7WUFDckIsT0FBTyxVQUFVLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQztZQUNuQyxPQUFPLFVBQVUsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDO1lBQ2xDLE9BQU8sVUFBVSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUM7WUFFakMsK0JBQStCO1lBQy9CLFVBQVUsQ0FBQyxDQUFDLENBQUMsdUJBQXVCLENBQUMsS0FBSyxFQUFFLENBQUM7WUFFN0MsK0JBQStCO1lBQy9CLFdBQVcsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ2hGLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBRWxELE9BQU8sVUFBVSxDQUFDO1FBQ3RCLENBQUMsQ0FBQTtRQUVELEdBQUc7Ozs7UUFBRSxVQUFVLEdBQUc7WUFDZCxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMzQixDQUFDLENBQUE7S0FDSixDQUFDO0lBRUYsT0FBTyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxFQUFFLENBQUM7SUFFdkMsT0FBTyxDQUFDLFVBQVU7OztJQUFHO1FBQ2pCLHlIQUF5SDtRQUN6SCw4QkFBOEI7UUFDOUIsSUFBSSxDQUFDLENBQUMsVUFBVSxLQUFLLE9BQU8sRUFBRTtZQUMxQixDQUFDLENBQUMsVUFBVSxHQUFHLFdBQVcsQ0FBQztTQUM5QjtRQUNELE9BQU8sT0FBTyxDQUFDO0lBQ25CLENBQUMsQ0FBQSxDQUFDO0lBRUYsSUFBSSxDQUFDLENBQUMsVUFBVSxFQUFFO1FBQ2QsV0FBVyxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUM7S0FDOUI7SUFFRCxDQUFDLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0FBRXZDLENBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQzs7Ozs7O0FBUXZCLENBQUM7Ozs7OztBQUFBLFVBQVUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxTQUFTOztRQUV2QixPQUFPLEdBQUcsQ0FBQyxDQUFDLE9BQU87O1FBQ25CLE1BQU0sR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU07O1FBQ3pCLFdBQVcsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVc7O1FBQ25DLGNBQWMsR0FBRyxtQkFBbUI7O1FBQ3BDLGNBQWM7SUFFbEIsT0FBTyxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7Ozs7O0lBRXhCLFNBQVMsSUFBSSxDQUFDLFVBQVU7UUFDcEIsSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUU7WUFDdkMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQzVCO1FBRUQsNkVBQTZFO1FBQzdFLElBQUksY0FBYyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUN2QyxVQUFVLENBQUMsQ0FBQyxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsVUFBVTs7O1lBQUM7Z0JBQ3hDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNyQixDQUFDLEdBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNqQztJQUNMLENBQUM7Ozs7O0lBRUQsU0FBUyxZQUFZLENBQUMsVUFBVTs7WUFDeEIsYUFBYSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsYUFBYTs7WUFDMUMsV0FBVztRQUVmLGdDQUFnQztRQUNoQyxJQUFJLFVBQVUsQ0FBQyxLQUFLLEtBQUssT0FBTyxDQUFDLGVBQWUsQ0FBQyxTQUFTLEVBQUU7WUFDeEQsV0FBVyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUM7WUFFaEUsbURBQW1EO1lBQ25ELElBQUksV0FBVyxJQUFJLGFBQWEsQ0FBQyxPQUFPLEVBQUU7Z0JBQ3RDLFVBQVUsQ0FBQyxHQUFHLENBQUMsMkVBQTJFLENBQUMsQ0FBQztnQkFFNUYscURBQXFEO2dCQUNyRCxVQUFVLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUNuRDtpQkFBTSxJQUFJLFdBQVcsSUFBSSxhQUFhLENBQUMsY0FBYyxFQUFFO2dCQUNwRCw2REFBNkQ7Z0JBQzdELElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFO29CQUM3QixVQUFVLENBQUMsR0FBRyxDQUFDLDBEQUEwRCxDQUFDLENBQUM7b0JBQzNFLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7b0JBQ3RELGFBQWEsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO2lCQUNyQzthQUNKO2lCQUFNO2dCQUNILGFBQWEsQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO2FBQ3RDO1NBQ0o7SUFDTCxDQUFDOzs7Ozs7SUFFRCxTQUFTLFVBQVUsQ0FBQyxVQUFVLEVBQUUsSUFBSTs7WUFDNUIsR0FBRyxHQUFHLFVBQVUsQ0FBQyxHQUFHLEdBQUcsSUFBSTtRQUUvQixJQUFJLFVBQVUsQ0FBQyxTQUFTLEVBQUU7WUFDdEIsR0FBRyxJQUFJLGFBQWEsR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztTQUNwRDtRQUVELE9BQU8sY0FBYyxDQUFDLGtCQUFrQixDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUM5RCxDQUFDOzs7OztJQUVELFNBQVMsV0FBVyxDQUFDLFVBQVU7UUFDM0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFFN0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7UUFDNUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7UUFDNUIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztJQUNuQyxDQUFDO0lBRUQsV0FBVyxDQUFDLFNBQVMsR0FBRztRQUNwQixLQUFLOzs7Ozs7UUFBRSxVQUFVLFNBQVMsRUFBRSxTQUFTLEVBQUUsVUFBVTs7Z0JBQ3pDLElBQUksR0FBRyxJQUFJOztnQkFDWCxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVU7O2dCQUM1QixVQUFVLEdBQUcsS0FBSztZQUV0QixJQUFJLElBQUksQ0FBQyxjQUFjLElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFO2dCQUMvQyxVQUFVLENBQUMsR0FBRyxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUMsSUFBSSxHQUFHLG9FQUFvRSxDQUFDLENBQUM7Z0JBQ3BILE9BQU87YUFDVjtZQUVELFVBQVUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxzQkFBc0IsQ0FBQyxDQUFDO1lBRXhELFNBQVMsQ0FBQyxLQUFLLENBQUMsVUFBVTs7O1lBQUU7Z0JBQ3hCLElBQUksQ0FBQyxVQUFVLEVBQUU7b0JBQ2IsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7aUJBQzNDO1lBQ0wsQ0FBQzs7OztZQUFFLFVBQVUsS0FBSztnQkFDZCx3RUFBd0U7Z0JBQ3hFLElBQUksQ0FBQyxVQUFVLEVBQUU7b0JBQ2IsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFDbEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLFVBQVUsQ0FBQyxDQUFDO2lCQUN0RDtnQkFFRCw2Q0FBNkM7Z0JBQzdDLDBDQUEwQztnQkFDMUMsT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDO1lBQzFELENBQUMsRUFBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLHNCQUFzQixHQUFHLE1BQU0sQ0FBQyxVQUFVOzs7WUFBQztnQkFDNUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtvQkFDYixVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUNsQixVQUFVLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsOENBQThDLENBQUMsQ0FBQztvQkFDaEYsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDO2lCQUMxRDtZQUNMLENBQUMsR0FBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLDRCQUE0QixDQUFDLENBQUM7UUFDbEQsQ0FBQyxDQUFBO1FBRUQsSUFBSTs7O1FBQUU7WUFDRixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO1lBQzlCLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7WUFDakQsT0FBTyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3BFLENBQUMsQ0FBQTtRQUVELFlBQVk7Ozs7O1FBQUUsVUFBVSxTQUFTLEVBQUUsU0FBUzs7Z0JBQ3BDLElBQUksR0FBRyxJQUFJOztnQkFDWCxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVU7WUFFaEMsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFO2dCQUNyQixVQUFVLENBQUMsR0FBRyxDQUFDLHNEQUFzRCxDQUFDLENBQUM7Z0JBQ3ZFLE9BQU87YUFDVjtZQUVELElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFO2dCQUN4QixPQUFPO2FBQ1Y7WUFFRCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztZQUMzQixNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1lBRWpELFVBQVUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxpREFBaUQsQ0FBQyxDQUFDO1lBQ25GLE9BQU8sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFVOzs7WUFBRTtnQkFDNUMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7Z0JBQzNCLFNBQVMsRUFBRSxDQUFDO1lBQ2hCLENBQUMsRUFBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFBO1FBRUQsZUFBZTs7Ozs7O1FBQUUsVUFBVSxTQUFTLEVBQUUsS0FBSyxFQUFFLFVBQVU7O2dCQUMvQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVU7O2dCQUM1QixRQUFRLEdBQUcsVUFBVSxDQUFDLFNBQVM7O2dCQUMvQixZQUFZO1lBRWhCLElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFO2dCQUN4QixPQUFPO2FBQ1Y7WUFFRCxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1lBRWpELElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFO2dCQUN0QixTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUUzQixVQUFVLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsd0RBQXdELENBQUMsQ0FBQztnQkFDMUYsVUFBVSxFQUFFLENBQUM7YUFDaEI7aUJBQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUU7Z0JBQzdCLHdGQUF3RjtnQkFDeEYscURBQXFEO2dCQUNyRCxZQUFZLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyx1QkFBdUIsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFFakYsVUFBVSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLHNFQUFzRSxDQUFDLENBQUM7Z0JBQ3hHLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7Z0JBQzdELElBQUksUUFBUSxFQUFFO29CQUNWLFFBQVEsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7aUJBQ2pDO2dCQUVELFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNyQjtpQkFBTTtnQkFDSCx1RUFBdUU7Z0JBQ3ZFLHdGQUF3RjthQUMzRjtRQUNMLENBQUMsQ0FBQTtLQUNKLENBQUM7SUFFRixjQUFjLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUc7UUFDekMsSUFBSTs7Ozs7UUFBRSxVQUFVLFVBQVUsRUFBRSxPQUFPO1lBQy9CLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FDVCxDQUFDLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFO2dCQUNyRCxJQUFJLEVBQUUsS0FBSztnQkFDWCxJQUFJLEVBQUUsRUFBRTtnQkFDUixTQUFTLEVBQUUsRUFBRSxlQUFlLEVBQUUsVUFBVSxDQUFDLGVBQWUsRUFBRTtnQkFDMUQsV0FBVyxFQUFFLFVBQVUsQ0FBQyxXQUFXO2dCQUNuQyxRQUFRLEVBQUUsVUFBVSxDQUFDLFlBQVk7YUFDcEMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ3JCLENBQUMsQ0FBQTtRQUVELFVBQVU7Ozs7UUFBRSxVQUFVLFVBQVU7Ozs7O2dCQUl4QixHQUFHOztnQkFDSCxHQUFHOztnQkFDSCxRQUFRLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRTtZQUUzQixJQUFJLFVBQVUsQ0FBQyxTQUFTLEVBQUU7Z0JBQ3RCLEdBQUcsR0FBRyxVQUFVLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQztnQkFFL0IsR0FBRyxHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFFL0MsR0FBRyxHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO29CQUNsQyxHQUFHLEVBQUUsR0FBRztvQkFDUixPQUFPOzs7O29CQUFFLFVBQVUsTUFBTTs7NEJBQ2pCLElBQUk7d0JBRVIsSUFBSTs0QkFDQSxJQUFJLEdBQUcsVUFBVSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQzt5QkFDNUM7d0JBQ0QsT0FBTyxLQUFLLEVBQUU7NEJBQ1YsUUFBUSxDQUFDLE1BQU0sQ0FDWCxPQUFPLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FDcEIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsRUFDdkMsVUFBVSxDQUFDLFNBQVMsRUFDcEIsS0FBSyxFQUNMLEdBQUcsQ0FDTixDQUNKLENBQUM7NEJBQ0YsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDOzRCQUNsQixPQUFPO3lCQUNWO3dCQUVELElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxNQUFNLEVBQUU7NEJBQzFCLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQzt5QkFDdEI7NkJBQ0k7NEJBQ0QsUUFBUSxDQUFDLE1BQU0sQ0FDWCxPQUFPLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FDcEIsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQywrQkFBK0IsRUFBRSxNQUFNLENBQUMsRUFDM0UsVUFBVSxDQUFDLFNBQVMsRUFDcEIsSUFBSSxDQUFDLFdBQVcsRUFDaEIsR0FBRyxDQUNOLENBQ0osQ0FBQzt5QkFDTDtvQkFDTCxDQUFDLENBQUE7b0JBQ0QsS0FBSzs7OztvQkFBRSxVQUFVLEtBQUs7d0JBQ2xCLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7NEJBQzlDLFFBQVEsQ0FBQyxNQUFNLENBQ1gsT0FBTyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQ3BCLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsMEJBQTBCLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUM1RSxVQUFVLENBQUMsU0FBUyxFQUNwQixLQUFLLEVBQ0wsR0FBRyxDQUNOLENBQ0osQ0FBQzs0QkFDRixVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7eUJBQ3JCOzZCQUNJOzRCQUNELFFBQVEsQ0FBQyxNQUFNLENBQ1gsT0FBTyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQ3BCLE9BQU8sQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLEVBQ2xDLFVBQVUsQ0FBQyxTQUFTLEVBQ3BCLEtBQUssRUFDTCxHQUFHLENBQ04sQ0FDSixDQUFDO3lCQUNMO29CQUNMLENBQUMsQ0FBQTtpQkFDSixDQUFDLENBQUM7YUFDTjtpQkFDSTtnQkFDRCxRQUFRLENBQUMsTUFBTSxDQUNYLE9BQU8sQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUNwQixPQUFPLENBQUMsU0FBUyxDQUFDLHFCQUFxQixFQUN2QyxVQUFVLENBQUMsU0FBUyxDQUN2QixDQUNKLENBQUM7YUFDTDtZQUVELE9BQU8sUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzlCLENBQUMsQ0FBQTtRQUVELGtCQUFrQjs7Ozs7UUFBRSxVQUFVLFVBQVUsRUFBRSxHQUFHOztnQkFDckMsV0FBVztZQUVmLDREQUE0RDtZQUM1RCxXQUFXLEdBQUcsY0FBYyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsaUJBQWlCLEdBQUcsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBRXZGLG9EQUFvRDtZQUNwRCxXQUFXLEdBQUcsY0FBYyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBRS9ELElBQUksVUFBVSxDQUFDLEtBQUssRUFBRTtnQkFDbEIsV0FBVyxJQUFJLG1CQUFtQixHQUFHLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUM3RTtZQUVELElBQUksVUFBVSxDQUFDLElBQUksRUFBRTtnQkFDakIsV0FBVyxJQUFJLGtCQUFrQixHQUFHLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUMzRTtZQUVELE9BQU8sV0FBVyxDQUFDO1FBQ3ZCLENBQUMsQ0FBQTtRQUVELEtBQUs7Ozs7O1FBQUUsVUFBVSxHQUFHLEVBQUUsRUFBRTs7Z0JBQ2hCLFFBQVEsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUc7O2dCQUM5QyxTQUFTO1lBRWIsSUFBSSxDQUFDLEVBQUUsRUFBRTtnQkFDTCxPQUFPLEdBQUcsQ0FBQzthQUNkO1lBRUQsSUFBSSxPQUFPLENBQUMsRUFBRSxDQUFDLEtBQUssUUFBUSxFQUFFO2dCQUMxQixPQUFPLEdBQUcsR0FBRyxRQUFRLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUN2QztZQUVELElBQUksT0FBTyxDQUFDLEVBQUUsQ0FBQyxLQUFLLFFBQVEsRUFBRTtnQkFDMUIsU0FBUyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRXpCLElBQUksU0FBUyxLQUFLLEdBQUcsSUFBSSxTQUFTLEtBQUssR0FBRyxFQUFFO29CQUN4QyxRQUFRLEdBQUcsRUFBRSxDQUFDO2lCQUNqQjtnQkFFRCxPQUFPLEdBQUcsR0FBRyxRQUFRLEdBQUcsRUFBRSxDQUFDO2FBQzlCO1lBRUQsTUFBTSxJQUFJLEtBQUssQ0FBQywwREFBMEQsQ0FBQyxDQUFDO1FBQ2hGLENBQUMsQ0FBQTs7UUFHRCxNQUFNOzs7Ozs7OztRQUFFLFVBQVUsVUFBVSxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLFFBQVE7OztnQkFFN0QsT0FBTyxHQUFHLFNBQVMsS0FBSyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLE9BQU87O2dCQUM5RCxHQUFHLEdBQUcsT0FBTyxHQUFHLFVBQVUsQ0FBQyxjQUFjOztnQkFDekMsRUFBRSxHQUFHLFlBQVksR0FBRyxTQUFTO1lBRWpDLElBQUksQ0FBQyxRQUFRLElBQUksVUFBVSxDQUFDLFdBQVcsRUFBRTtnQkFDckMsRUFBRSxJQUFJLGVBQWUsR0FBRyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7YUFDdEU7WUFFRCxJQUFJLENBQUMsWUFBWSxFQUFFO2dCQUNmLEdBQUcsSUFBSSxVQUFVLENBQUM7YUFDckI7aUJBQU07Z0JBQ0gsSUFBSSxJQUFJLEVBQUU7b0JBQ04saUNBQWlDO29CQUNqQyxHQUFHLElBQUksT0FBTyxDQUFDO2lCQUNsQjtxQkFBTTtvQkFDSCxHQUFHLElBQUksWUFBWSxDQUFDO2lCQUN2QjtnQkFFRCxJQUFJLENBQUMsUUFBUSxJQUFJLFVBQVUsQ0FBQyxTQUFTLEVBQUU7b0JBQ25DLEVBQUUsSUFBSSxhQUFhLEdBQUcsa0JBQWtCLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2lCQUNsRTthQUNKO1lBQ0QsR0FBRyxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7WUFDaEIsR0FBRyxHQUFHLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFFekQsSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDWCxHQUFHLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO2FBQ25EO1lBRUQsT0FBTyxHQUFHLENBQUM7UUFDZixDQUFDLENBQUE7UUFFRCwwQkFBMEI7Ozs7UUFBRSxVQUFVLHFCQUFxQjtZQUN2RCxPQUFPO2dCQUNILFNBQVMsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO2dCQUNsQyxRQUFRLEVBQUUscUJBQXFCLENBQUMsQ0FBQztnQkFDakMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSztnQkFDNUUsZUFBZSxFQUFFLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSztnQkFDaEYsYUFBYSxFQUFFLHFCQUFxQixDQUFDLENBQUM7Z0JBQ3RDLFdBQVcsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO2FBQ3ZDLENBQUM7UUFDTixDQUFDLENBQUE7UUFFRCxZQUFZOzs7OztRQUFFLFVBQVUsVUFBVSxFQUFFLFdBQVc7WUFDM0MsSUFBSSxXQUFXLEVBQUU7Z0JBQ2IsVUFBVSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7YUFDeEM7UUFDTCxDQUFDLENBQUE7UUFFRCxhQUFhOzs7OztRQUFFLFVBQVUsVUFBVSxFQUFFLE9BQU87WUFDeEMsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssUUFBUSxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxXQUFXLElBQUksT0FBTyxLQUFLLElBQUksRUFBRTtnQkFDdkYsT0FBTyxPQUFPLENBQUM7YUFDbEI7WUFDRCxPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzlDLENBQUMsQ0FBQTtRQUVELFFBQVE7Ozs7O1FBQUUsVUFBVSxVQUFVLEVBQUUsSUFBSTs7Z0JBQzVCLE9BQU8sR0FBRyxjQUFjLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUM7O2dCQUN4RCxHQUFHLEdBQUcsVUFBVSxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUM7O2dCQUNyQyxHQUFHOztnQkFDSCxNQUFNOzs7OztZQUFHLFVBQVUsS0FBSyxFQUFFLFVBQVU7Z0JBQ2hDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDbkosQ0FBQyxDQUFBO1lBR0wsR0FBRyxHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO2dCQUNsQyxHQUFHLEVBQUUsR0FBRztnQkFDUixJQUFJLEVBQUUsVUFBVSxDQUFDLFlBQVksS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsTUFBTTtnQkFDMUQsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsa0JBQWtCO2dCQUN6QyxJQUFJLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLE9BQU87aUJBQ2hCO2dCQUNELE9BQU87Ozs7Z0JBQUUsVUFBVSxNQUFNOzt3QkFDakIsR0FBRztvQkFFUCxJQUFJLE1BQU0sRUFBRTt3QkFDUixJQUFJOzRCQUNBLEdBQUcsR0FBRyxVQUFVLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO3lCQUMzQzt3QkFDRCxPQUFPLEtBQUssRUFBRTs0QkFDVixNQUFNLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxDQUFDOzRCQUMxQixVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7NEJBQ2xCLE9BQU87eUJBQ1Y7d0JBRUQsY0FBYyxDQUFDLGVBQWUsQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUM7cUJBQ25EO2dCQUNMLENBQUMsQ0FBQTtnQkFDRCxLQUFLOzs7OztnQkFBRSxVQUFVLEtBQUssRUFBRSxVQUFVO29CQUM5QixJQUFJLFVBQVUsS0FBSyxPQUFPLElBQUksVUFBVSxLQUFLLGFBQWEsRUFBRTt3QkFDeEQsMEVBQTBFO3dCQUMxRSxzRkFBc0Y7d0JBQ3RGLGdEQUFnRDt3QkFDaEQsT0FBTztxQkFDVjtvQkFFRCxNQUFNLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUM5QixDQUFDLENBQUE7YUFDSixDQUFDLENBQUM7WUFFSCxPQUFPLEdBQUcsQ0FBQztRQUNmLENBQUMsQ0FBQTtRQUVELFNBQVM7Ozs7O1FBQUUsVUFBVSxVQUFVLEVBQUUsS0FBSztZQUNsQyxJQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEtBQUssV0FBVyxFQUFFO2dCQUMvQyxPQUFPO2FBQ1Y7WUFFRCwrQ0FBK0M7WUFDL0MsS0FBSyxHQUFHLE9BQU8sS0FBSyxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7O2dCQUVoRCxHQUFHLEdBQUcsVUFBVSxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUM7WUFFMUMsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQzVCLEdBQUcsRUFBRSxHQUFHO2dCQUNSLEtBQUssRUFBRSxLQUFLO2dCQUNaLE9BQU8sRUFBRSxJQUFJO2dCQUNiLElBQUksRUFBRSxNQUFNO2FBQ2YsQ0FBQyxDQUFDO1lBRUgsVUFBVSxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsR0FBRyxLQUFLLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDOUQsQ0FBQyxDQUFBO1FBRUQsU0FBUzs7Ozs7UUFBRSxVQUFVLFVBQVUsRUFBRSxTQUFTOztnQkFDbEMsY0FBYzs7OztZQUFHLFVBQVUsS0FBSzs7b0JBQzVCLFFBQVEsR0FBRyxVQUFVLENBQUMsU0FBUztnQkFDbkMsSUFBSSxRQUFRLEVBQUU7b0JBQ1YsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDMUI7WUFDTCxDQUFDLENBQUE7O2dCQUNHLGlCQUFpQjs7OztZQUFHLFVBQVUsS0FBSztnQkFDL0IsVUFBVSxDQUFDLEdBQUcsQ0FBQyxvREFBb0QsQ0FBQyxDQUFDO2dCQUNyRSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUN0RCxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3RCLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN0QixDQUFDLENBQUE7WUFFTCxVQUFVLENBQUMsQ0FBQyxDQUFDLFlBQVksR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDeEQsR0FBRyxFQUFFLFVBQVUsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDO2dCQUNyQyxPQUFPOzs7Ozs7Z0JBQUUsVUFBVSxNQUFNLEVBQUUsVUFBVSxFQUFFLEdBQUc7O3dCQUNsQyxJQUFJO29CQUVSLElBQUk7d0JBQ0EsSUFBSSxHQUFHLFVBQVUsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7cUJBQzVDO29CQUFDLE9BQU8sS0FBSyxFQUFFO3dCQUNaLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUM3QixPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLHlCQUF5QixFQUFFLE1BQU0sQ0FBQyxFQUNyRSxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQzt3QkFDakIsT0FBTztxQkFDVjtvQkFFRCxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssU0FBUyxFQUFFO3dCQUM3QixTQUFTLEVBQUUsQ0FBQztxQkFDZjt5QkFBTTt3QkFDSCxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FDN0IsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsRUFBRSxNQUFNLENBQUMsRUFDaEUsSUFBSSxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO3FCQUMvQjtnQkFDTCxDQUFDLENBQUE7Z0JBQ0QsS0FBSzs7Ozs7O2dCQUFFLFVBQVUsR0FBRyxFQUFFLFVBQVUsRUFBRSxLQUFLO29CQUNuQyxJQUFJLFVBQVUsS0FBSyxjQUFjLEVBQUU7d0JBQy9CLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUM3QixPQUFPLENBQUMsU0FBUyxDQUFDLHVCQUF1QixFQUN6QyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztxQkFDcEI7eUJBQU07d0JBQ0gsNkRBQTZEO3dCQUM3RCxpREFBaUQ7d0JBQ2pELFVBQVUsQ0FBQyxHQUFHLENBQUMsaUVBQWlFLENBQUMsQ0FBQzt3QkFDbEYsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUMxQixPQUFPLENBQUMsU0FBUyxDQUFDLHlCQUF5QixFQUMzQyxJQUFJLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7cUJBQy9CO2dCQUNMLENBQUMsQ0FBQTthQUNKLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQTtRQUVELG9CQUFvQjs7OztRQUFFLFVBQVUsVUFBVTtZQUN0QyxJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUMsWUFBWSxFQUFFO2dCQUMzQiw2REFBNkQ7Z0JBQzdELFVBQVUsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDaEQsT0FBTyxVQUFVLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQzthQUNwQztRQUNMLENBQUMsQ0FBQTtRQUVELGFBQWE7Ozs7OztRQUFFLFVBQVUsVUFBVSxFQUFFLGtCQUFrQixFQUFFLGFBQWE7WUFDbEUsSUFBSSxrQkFBa0IsQ0FBQyxXQUFXLElBQUksYUFBYSxFQUFFO2dCQUNqRCxhQUFhLEVBQUUsQ0FBQzthQUNuQjtpQkFBTSxJQUFJLGtCQUFrQixDQUFDLFdBQVcsRUFBRTtnQkFDdkMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxrRUFBa0UsQ0FBQyxDQUFDO2FBQ3RGO1FBRUwsQ0FBQyxDQUFBO1FBRUQsZUFBZTs7Ozs7UUFBRSxVQUFVLFVBQVUsRUFBRSxJQUFJO1lBQ3ZDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDdkQsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUMzRDtRQUNMLENBQUMsQ0FBQTtRQUVELGVBQWU7Ozs7OztRQUFFLFVBQVUsVUFBVSxFQUFFLE9BQU8sRUFBRSxhQUFhOztnQkFDckQsSUFBSTtZQUVSLHFDQUFxQztZQUNyQyxjQUFjLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRTNDLElBQUksT0FBTyxFQUFFO2dCQUNULElBQUksR0FBRyxjQUFjLENBQUMsMEJBQTBCLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBRTFELGNBQWMsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFFMUQsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO29CQUNoQixVQUFVLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7aUJBQ3pDO2dCQUVELElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtvQkFDZixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFROzs7OztvQkFBRSxVQUFVLEtBQUssRUFBRSxPQUFPO3dCQUMxQyxjQUFjLENBQUMsZUFBZSxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztvQkFDeEQsQ0FBQyxFQUFDLENBQUM7b0JBRUgsY0FBYyxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxDQUFDO2lCQUNqRTthQUNKO1FBQ0wsQ0FBQyxDQUFBO1FBRUQsZ0JBQWdCOzs7O1FBQUUsVUFBVSxVQUFVOztnQkFDOUIsYUFBYSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsYUFBYTtZQUU5QyxrRUFBa0U7WUFDbEUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUU7Z0JBQzNCLGFBQWEsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO2dCQUVoQyxjQUFjLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUUzQyxnREFBZ0Q7Z0JBQ2hELFVBQVUsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLHdCQUF3Qjs7O2dCQUFHO29CQUNsRCxxRUFBcUU7b0JBQ3JFLGNBQWMsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQy9DLENBQUMsQ0FBQSxDQUFDO2dCQUVGLGlDQUFpQztnQkFDakMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLHdCQUF3QixDQUFDLENBQUM7Z0JBRTVGLFVBQVUsQ0FBQyxHQUFHLENBQUMsc0RBQXNELEdBQUcsYUFBYSxDQUFDLGNBQWMsR0FBRywwQkFBMEIsR0FBRyxhQUFhLENBQUMsT0FBTyxHQUFHLGdDQUFnQyxHQUFHLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2FBQ2hPO2lCQUFNO2dCQUNILFVBQVUsQ0FBQyxHQUFHLENBQUMsK0RBQStELENBQUMsQ0FBQzthQUNuRjtRQUNMLENBQUMsQ0FBQTtRQUVELHVCQUF1Qjs7OztRQUFFLFVBQVUsVUFBVTs7Z0JBQ3JDLGFBQWEsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLGFBQWE7WUFFOUMsd0VBQXdFO1lBQ3hFLElBQUksYUFBYSxDQUFDLFVBQVUsRUFBRTtnQkFDMUIsa0JBQWtCO2dCQUNsQixhQUFhLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztnQkFFakMsK0RBQStEO2dCQUMvRCxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsd0JBQXdCLENBQUMsQ0FBQztnQkFFOUYsZ0NBQWdDO2dCQUNoQyxVQUFVLENBQUMsQ0FBQyxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7Z0JBQ2hDLFVBQVUsQ0FBQyxHQUFHLENBQUMsNENBQTRDLENBQUMsQ0FBQzthQUNoRTtRQUNMLENBQUMsQ0FBQTtRQUVELGNBQWM7Ozs7UUFBRSxVQUFVLFVBQVU7WUFDaEMsVUFBVSxDQUFDLENBQUMsQ0FBQyxZQUFZLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNqRCxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDckIsQ0FBQyxDQUFBO1FBRUQsZUFBZTs7OztRQUFFLFVBQVUsVUFBVTtZQUNqQyxVQUFVLENBQUMsQ0FBQyxDQUFDLGFBQWEsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3RELENBQUMsQ0FBQTtRQUVELFVBQVU7Ozs7UUFBRSxVQUFVLFVBQVU7WUFDNUIsSUFBSSxjQUFjLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLEVBQUU7Z0JBQzdDLFVBQVUsQ0FBQyxDQUFDLENBQUMsWUFBWSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ2pELE9BQU8sSUFBSSxDQUFDO2FBQ2Y7WUFFRCxPQUFPLEtBQUssQ0FBQztRQUNqQixDQUFDLENBQUE7UUFFRCx5QkFBeUI7Ozs7UUFBRSxVQUFVLFVBQVU7WUFDM0MsT0FBTyxVQUFVLENBQUMsS0FBSyxLQUFLLE9BQU8sQ0FBQyxlQUFlLENBQUMsU0FBUztnQkFDekQsVUFBVSxDQUFDLEtBQUssS0FBSyxPQUFPLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQztRQUNsRSxDQUFDLENBQUE7UUFFRCx1QkFBdUI7Ozs7UUFBRSxVQUFVLFVBQVU7WUFDekMsSUFBSSxXQUFXLENBQUMsVUFBVSxFQUN0QixPQUFPLENBQUMsZUFBZSxDQUFDLFNBQVMsRUFDakMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsS0FBSyxJQUFJLEVBQUU7Z0JBQ2hELENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2FBQ3ZEO1lBQ0QsT0FBTyxVQUFVLENBQUMsS0FBSyxLQUFLLE9BQU8sQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDO1FBQ3JFLENBQUMsQ0FBQTtRQUVELHFCQUFxQjs7OztRQUFFLFVBQVUsVUFBVTtZQUN2QyxJQUFJLFVBQVUsSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixFQUFFO2dCQUM3QyxNQUFNLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztnQkFDbkQsT0FBTyxVQUFVLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDO2FBQ3hDO1FBQ0wsQ0FBQyxDQUFBO1FBRUQsZ0JBQWdCOzs7O1FBQUUsVUFBVSxVQUFVO1lBQ2xDLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLFlBQVksSUFBSSxVQUFVLENBQUMsZUFBZSxFQUFFOztvQkFDNUUsT0FBTyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsc0JBQXNCLEVBQUUsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxVQUFVLENBQUMsZUFBZSxDQUFDO2dCQUN6SSxVQUFVLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUN4QixDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMxRyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzdELE9BQU8sS0FBSyxDQUFDO2FBQ2hCO1lBRUQsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQyxDQUFBO1FBRUQsU0FBUzs7Ozs7UUFBRSxVQUFVLFVBQVUsRUFBRSxhQUFhOztnQkFDdEMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDO1lBRWpELHNFQUFzRTtZQUN0RSw0Q0FBNEM7WUFDNUMsSUFBSSxjQUFjLENBQUMseUJBQXlCLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixFQUFFO2dCQUN4Rix1SEFBdUg7Z0JBQ3ZILElBQUksQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLEVBQUU7b0JBQzlDLE9BQU87aUJBQ1Y7Z0JBRUQsVUFBVSxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsVUFBVTs7O2dCQUFDO29CQUM5QyxJQUFJLENBQUMsY0FBYyxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxFQUFFO3dCQUM5QyxPQUFPO3FCQUNWO29CQUVELFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBRTNCLElBQUksY0FBYyxDQUFDLHVCQUF1QixDQUFDLFVBQVUsQ0FBQyxFQUFFO3dCQUNwRCxVQUFVLENBQUMsR0FBRyxDQUFDLGFBQWEsR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDO3dCQUNqRCxTQUFTLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO3FCQUMvQjtnQkFDTCxDQUFDLEdBQUUsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2FBQ2pDO1FBQ0wsQ0FBQyxDQUFBO1FBRUQsa0JBQWtCOzs7Ozs7OztRQUFFLFVBQVUsVUFBVSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLE9BQU87O2dCQUNsRSxZQUFZLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQ3ZDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxFQUN2RCxVQUFVLENBQUMsU0FBUyxFQUNwQixLQUFLLEVBQ0wsT0FBTyxDQUFDO1lBRVosd0ZBQXdGO1lBQ3hGLElBQUksUUFBUSxJQUFJLFFBQVEsQ0FBQyxZQUFZLENBQUMsRUFBRTtnQkFDcEMsVUFBVSxDQUFDLEdBQUcsQ0FBQyw4REFBOEQsQ0FBQyxDQUFDO2FBQ2xGO2lCQUFNO2dCQUNILENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7Z0JBQzdELFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNyQjtRQUNMLENBQUMsQ0FBQTtRQUVELFdBQVc7Ozs7UUFBRSxVQUFVLFVBQVU7WUFDN0IsT0FBTyxJQUFJLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN2QyxDQUFDLENBQUE7UUFFRCxZQUFZLEVBQUU7WUFDVixLQUFLLEVBQUUsQ0FBQztZQUNSLFdBQVcsRUFBRSxFQUFFO1NBQ2xCO0tBQ0osQ0FBQztBQUVOLENBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQzs7Ozs7O0FBU3ZCLENBQUM7Ozs7OztBQUFBLFVBQVUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxTQUFTOztRQUV2QixPQUFPLEdBQUcsQ0FBQyxDQUFDLE9BQU87O1FBQ25CLE1BQU0sR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU07O1FBQ3pCLFdBQVcsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVc7O1FBQ25DLGNBQWMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLE1BQU07SUFFOUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxVQUFVLEdBQUc7UUFDNUIsSUFBSSxFQUFFLFlBQVk7UUFFbEIsaUJBQWlCOzs7UUFBRTtZQUNmLE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUMsQ0FBQTtRQUVELElBQUk7Ozs7O1FBQUUsVUFBVSxVQUFVLEVBQUUsSUFBSTs7Z0JBQ3hCLE9BQU8sR0FBRyxjQUFjLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUM7WUFFNUQsSUFBSTtnQkFDQSxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNuQztZQUFDLE9BQU8sRUFBRSxFQUFFO2dCQUNULENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFDdkMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FDckIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxzQkFBc0IsRUFDeEMsVUFBVSxDQUFDLFNBQVMsRUFDcEIsRUFBRSxFQUNGLFVBQVUsQ0FBQyxNQUFNLENBQ3BCO29CQUNHLElBQUksQ0FBQyxDQUFDLENBQUM7YUFDbEI7UUFDTCxDQUFDLENBQUE7UUFFRCxLQUFLOzs7Ozs7UUFBRSxVQUFVLFVBQVUsRUFBRSxTQUFTLEVBQUUsUUFBUTs7Z0JBQ3hDLEdBQUc7O2dCQUNILE1BQU0sR0FBRyxLQUFLOztnQkFDZCxJQUFJLEdBQUcsSUFBSTs7Z0JBQ1gsWUFBWSxHQUFHLENBQUMsU0FBUzs7Z0JBQ3pCLFdBQVcsR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDO1lBRS9CLElBQUksQ0FBQyxDQUFDLG1CQUFBLE1BQU0sRUFBTyxDQUFDLENBQUMsU0FBUyxFQUFFO2dCQUM1QixRQUFRLEVBQUUsQ0FBQztnQkFDWCxPQUFPO2FBQ1Y7WUFFRCxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRTtnQkFDcEIsSUFBSSxVQUFVLENBQUMsa0JBQWtCLEVBQUU7b0JBQy9CLEdBQUcsR0FBRyxVQUFVLENBQUMsa0JBQWtCLENBQUM7aUJBQ3ZDO3FCQUFNO29CQUNILEdBQUcsR0FBRyxVQUFVLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUM7aUJBQ2pEO2dCQUVELEdBQUcsSUFBSSxjQUFjLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDO2dCQUVsRSxVQUFVLENBQUMsR0FBRyxDQUFDLG9DQUFvQyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQztnQkFDbEUsVUFBVSxDQUFDLE1BQU0sR0FBRyxJQUFJLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFFdkMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxNQUFNOzs7Z0JBQUc7b0JBQ3ZCLE1BQU0sR0FBRyxJQUFJLENBQUM7b0JBQ2QsVUFBVSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO29CQUVwQyxjQUFjLENBQUMscUJBQXFCLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBRWpELElBQUksV0FBVyxDQUFDLFVBQVUsRUFDdEIsT0FBTyxDQUFDLGVBQWUsQ0FBQyxZQUFZLEVBQ3BDLE9BQU8sQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLEtBQUssSUFBSSxFQUFFO3dCQUM3QyxXQUFXLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztxQkFDbEQ7Z0JBQ0wsQ0FBQyxDQUFBLENBQUM7Z0JBRUYsVUFBVSxDQUFDLE1BQU0sQ0FBQyxPQUFPOzs7O2dCQUFHLFVBQVUsS0FBSzs7d0JBQ25DLEtBQUs7b0JBRVQsc0VBQXNFO29CQUN0RSxxRUFBcUU7b0JBQ3JFLHdCQUF3QjtvQkFFeEIsSUFBSSxJQUFJLEtBQUssVUFBVSxDQUFDLE1BQU0sRUFBRTt3QkFDNUIsSUFBSSxNQUFNLElBQUksT0FBTyxLQUFLLENBQUMsUUFBUSxLQUFLLFdBQVcsSUFBSSxLQUFLLENBQUMsUUFBUSxLQUFLLEtBQUssRUFBRTs0QkFDN0Usc0dBQXNHOzRCQUN0Ryw4R0FBOEc7NEJBQzlHLEtBQUssR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FDNUIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxlQUFlLEVBQ2pDLFVBQVUsQ0FBQyxTQUFTLEVBQ3BCLEtBQUssQ0FBQyxDQUFDOzRCQUVYLFVBQVUsQ0FBQyxHQUFHLENBQUMscUNBQXFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLG9CQUFvQixDQUFDLENBQUMsQ0FBQzt5QkFDbEc7NkJBQU07NEJBQ0gsVUFBVSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO3lCQUN2Qzt3QkFFRCxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFOzRCQUMvQixJQUFJLEtBQUssRUFBRTtnQ0FDUCxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDOzZCQUN6RDs0QkFFRCxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO3lCQUM5QjtxQkFDSjtnQkFDTCxDQUFDLENBQUEsQ0FBQztnQkFFRixVQUFVLENBQUMsTUFBTSxDQUFDLFNBQVM7Ozs7Z0JBQUcsVUFBVSxLQUFLOzt3QkFDckMsSUFBSTtvQkFFUixJQUFJO3dCQUNBLElBQUksR0FBRyxVQUFVLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztxQkFDaEQ7b0JBQ0QsT0FBTyxLQUFLLEVBQUU7d0JBQ1YsY0FBYyxDQUFDLGtCQUFrQixDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7d0JBQ2xGLE9BQU87cUJBQ1Y7b0JBRUQsSUFBSSxJQUFJLEVBQUU7d0JBQ04sd0NBQXdDO3dCQUN4QyxJQUFJLENBQUMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRTs0QkFDakMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO3lCQUMvRDs2QkFBTTs0QkFDSCwrQ0FBK0M7NEJBQy9DLHVDQUF1Qzs0QkFDdkMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7eUJBQ3BEO3FCQUNKO2dCQUNMLENBQUMsQ0FBQSxDQUFDO2FBQ0w7UUFDTCxDQUFDLENBQUE7UUFFRCxTQUFTOzs7O1FBQUUsVUFBVSxVQUFVO1lBQzNCLGNBQWMsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwRCxDQUFDLENBQUE7UUFFRCxjQUFjOzs7O1FBQUUsVUFBVSxVQUFVO1lBQ2hDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0IsQ0FBQyxDQUFBO1FBRUQsSUFBSTs7OztRQUFFLFVBQVUsVUFBVTtZQUN0QiwyQ0FBMkM7WUFDM0MsY0FBYyxDQUFDLHFCQUFxQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRWpELElBQUksVUFBVSxDQUFDLE1BQU0sRUFBRTtnQkFDbkIsVUFBVSxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO2dCQUN6QyxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUMxQixVQUFVLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQzthQUM1QjtRQUNMLENBQUMsQ0FBQTtRQUVELEtBQUs7Ozs7O1FBQUUsVUFBVSxVQUFVLEVBQUUsS0FBSztZQUM5QixjQUFjLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNoRCxDQUFDLENBQUE7S0FDSixDQUFDO0FBRU4sQ0FBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDOzs7Ozs7QUFTdkIsQ0FBQzs7Ozs7O0FBQUEsVUFBVSxDQUFDLEVBQUUsTUFBTSxFQUFFLFNBQVM7O1FBRXZCLE9BQU8sR0FBRyxDQUFDLENBQUMsT0FBTzs7UUFDbkIsTUFBTSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTTs7UUFDekIsV0FBVyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVzs7UUFDbkMsY0FBYyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsTUFBTTs7UUFDMUMsNEJBQTRCOzs7O0lBQUcsVUFBVSxVQUFVO1FBQy9DLE1BQU0sQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1FBQ2hFLE9BQU8sVUFBVSxDQUFDLENBQUMsQ0FBQyw2QkFBNkIsQ0FBQztJQUN0RCxDQUFDLENBQUE7SUFFTCxPQUFPLENBQUMsVUFBVSxDQUFDLGdCQUFnQixHQUFHO1FBQ2xDLElBQUksRUFBRSxrQkFBa0I7UUFFeEIsaUJBQWlCOzs7UUFBRTtZQUNmLE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUMsQ0FBQTtRQUVELE9BQU8sRUFBRSxJQUFJO1FBRWIsS0FBSzs7Ozs7O1FBQUUsVUFBVSxVQUFVLEVBQUUsU0FBUyxFQUFFLFFBQVE7O2dCQUN4QyxJQUFJLEdBQUcsSUFBSTs7Z0JBQ1gsTUFBTSxHQUFHLEtBQUs7O2dCQUNkLFdBQVcsR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDOztnQkFDM0IsWUFBWSxHQUFHLENBQUMsU0FBUzs7Z0JBQ3pCLEdBQUc7WUFFUCxJQUFJLFVBQVUsQ0FBQyxXQUFXLEVBQUU7Z0JBQ3hCLFVBQVUsQ0FBQyxHQUFHLENBQUMsMERBQTBELENBQUMsQ0FBQztnQkFDM0UsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ3JCO1lBRUQsSUFBSSxDQUFDLENBQUMsbUJBQUEsTUFBTSxFQUFPLENBQUMsQ0FBQyxXQUFXLEVBQUU7Z0JBQzlCLElBQUksUUFBUSxFQUFFO29CQUNWLFVBQVUsQ0FBQyxHQUFHLENBQUMsbUNBQW1DLENBQUMsQ0FBQztvQkFDcEQsUUFBUSxFQUFFLENBQUM7aUJBQ2Q7Z0JBQ0QsT0FBTzthQUNWO1lBRUQsR0FBRyxHQUFHLGNBQWMsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFFakUsSUFBSTtnQkFDQSxVQUFVLENBQUMsR0FBRyxDQUFDLHlDQUF5QyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQztnQkFDdkUsVUFBVSxDQUFDLFdBQVcsR0FBRyxJQUFJLFdBQVcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxlQUFlLEVBQUUsVUFBVSxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUM7YUFDbEc7WUFDRCxPQUFPLENBQUMsRUFBRTtnQkFDTixVQUFVLENBQUMsR0FBRyxDQUFDLGtEQUFrRCxHQUFHLENBQUMsQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLENBQUM7Z0JBQ3JGLElBQUksUUFBUSxFQUFFO29CQUNWLGtEQUFrRDtvQkFDbEQsUUFBUSxFQUFFLENBQUM7aUJBQ2Q7cUJBQU07b0JBQ0gsV0FBVyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQywwQkFBMEIsRUFBRSxVQUFVLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDOUksSUFBSSxZQUFZLEVBQUU7d0JBQ2QsdUZBQXVGO3dCQUN2RixJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO3FCQUM5QjtpQkFDSjtnQkFDRCxPQUFPO2FBQ1Y7WUFFRCxJQUFJLFlBQVksRUFBRTtnQkFDZCxVQUFVLENBQUMsQ0FBQyxDQUFDLDZCQUE2QixHQUFHLE1BQU0sQ0FBQyxVQUFVOzs7Z0JBQUM7b0JBQzNELElBQUksTUFBTSxLQUFLLEtBQUssRUFBRTt3QkFDbEIsdUVBQXVFO3dCQUN2RSxtRUFBbUU7d0JBQ25FLElBQUksVUFBVSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEtBQUssV0FBVyxDQUFDLElBQUksRUFBRTs0QkFDeEQsdUZBQXVGOzRCQUN2RixJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO3lCQUM5QjtxQkFDSjtnQkFDTCxDQUFDLEdBQ0csSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3JCO1lBRUQsVUFBVSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNOzs7O1lBQUUsVUFBVSxDQUFDO2dCQUN2RCxVQUFVLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUM7Z0JBRXpDLDRCQUE0QixDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUN6QyxjQUFjLENBQUMscUJBQXFCLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBRWpELElBQUksTUFBTSxLQUFLLEtBQUssRUFBRTtvQkFDbEIsTUFBTSxHQUFHLElBQUksQ0FBQztvQkFFZCxJQUFJLFdBQVcsQ0FBQyxVQUFVLEVBQ3RCLE9BQU8sQ0FBQyxlQUFlLENBQUMsWUFBWSxFQUNwQyxPQUFPLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxLQUFLLElBQUksRUFBRTt3QkFDN0MsV0FBVyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7cUJBQ2xEO2lCQUNKO1lBQ0wsQ0FBQyxHQUFFLEtBQUssQ0FBQyxDQUFDO1lBRVYsVUFBVSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTOzs7O1lBQUUsVUFBVSxDQUFDOztvQkFDdEQsR0FBRztnQkFFUCxtQkFBbUI7Z0JBQ25CLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxhQUFhLEVBQUU7b0JBQzFCLE9BQU87aUJBQ1Y7Z0JBRUQsSUFBSTtvQkFDQSxHQUFHLEdBQUcsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQzNDO2dCQUNELE9BQU8sS0FBSyxFQUFFO29CQUNWLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUMxRSxPQUFPO2lCQUNWO2dCQUVELGNBQWMsQ0FBQyxlQUFlLENBQUMsVUFBVSxFQUFFLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUMvRCxDQUFDLEdBQUUsS0FBSyxDQUFDLENBQUM7WUFFVixVQUFVLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLE9BQU87Ozs7WUFBRSxVQUFVLENBQUM7O29CQUNwRCxLQUFLLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQ2hDLE9BQU8sQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLEVBQ2xDLFVBQVUsQ0FBQyxTQUFTLEVBQ3BCLENBQUMsQ0FBQztnQkFFTixzRUFBc0U7Z0JBQ3RFLG1FQUFtRTtnQkFDbkUsOEJBQThCO2dCQUM5QixJQUFJLElBQUksS0FBSyxVQUFVLENBQUMsV0FBVyxFQUFFO29CQUNqQyxPQUFPO2lCQUNWO2dCQUVELElBQUksUUFBUSxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtvQkFDN0IsT0FBTztpQkFDVjtnQkFFRCxVQUFVLENBQUMsR0FBRyxDQUFDLDBCQUEwQixHQUFHLFVBQVUsQ0FBQyxXQUFXLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQyxDQUFDO2dCQUVyRixJQUFJLENBQUMsQ0FBQyxVQUFVLEtBQUssV0FBVyxDQUFDLE1BQU0sRUFBRTtvQkFDckMsaUVBQWlFO29CQUNqRSxnRUFBZ0U7b0JBQ2hFLGlFQUFpRTtvQkFDakUsbUNBQW1DO29CQUNuQyxVQUFVLENBQUMsR0FBRyxDQUFDLCtEQUErRCxDQUFDLENBQUM7b0JBQ2hGLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7aUJBQzlCO3FCQUFNO29CQUNILG1CQUFtQjtvQkFDbkIsVUFBVSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO29CQUNyQyxXQUFXLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2lCQUN2RDtZQUNMLENBQUMsR0FBRSxLQUFLLENBQUMsQ0FBQztRQUNkLENBQUMsQ0FBQTtRQUVELFNBQVM7Ozs7UUFBRSxVQUFVLFVBQVU7WUFDM0IsY0FBYyxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BELENBQUMsQ0FBQTtRQUVELGNBQWM7Ozs7UUFBRSxVQUFVLFVBQVU7WUFDaEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvQixDQUFDLENBQUE7UUFFRCxJQUFJOzs7OztRQUFFLFVBQVUsVUFBVSxFQUFFLElBQUk7WUFDNUIsY0FBYyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDOUMsQ0FBQyxDQUFBO1FBRUQsSUFBSTs7OztRQUFFLFVBQVUsVUFBVTtZQUN0QiwyQ0FBMkM7WUFDM0MsNEJBQTRCLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDekMsY0FBYyxDQUFDLHFCQUFxQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRWpELElBQUksVUFBVSxJQUFJLFVBQVUsQ0FBQyxXQUFXLEVBQUU7Z0JBQ3RDLFVBQVUsQ0FBQyxHQUFHLENBQUMsOEJBQThCLENBQUMsQ0FBQztnQkFDL0MsVUFBVSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDL0IsVUFBVSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7Z0JBQzlCLE9BQU8sVUFBVSxDQUFDLFdBQVcsQ0FBQzthQUNqQztRQUNMLENBQUMsQ0FBQTtRQUVELEtBQUs7Ozs7O1FBQUUsVUFBVSxVQUFVLEVBQUUsS0FBSztZQUM5QixjQUFjLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNoRCxDQUFDLENBQUE7S0FDSixDQUFDO0FBRU4sQ0FBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDOzs7Ozs7QUFTdkIsQ0FBQzs7Ozs7O0FBQUEsVUFBVSxDQUFDLEVBQUUsTUFBTSxFQUFFLFNBQVM7O1FBRXZCLE9BQU8sR0FBRyxDQUFDLENBQUMsT0FBTzs7UUFDbkIsTUFBTSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTTs7UUFDekIsV0FBVyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVzs7UUFDbkMsY0FBYyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsTUFBTTs7UUFDMUMsV0FBVzs7O0lBQUc7O1lBQ04sS0FBSyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQztRQUNuRCxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxvRUFBb0UsQ0FBQyxDQUFDO1FBQ2xHLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUMsQ0FBQTs7O0lBQ0Qsc0VBQXNFO0lBQ3RFLHdFQUF3RTtJQUN4RSxtRUFBbUU7SUFDbkUsYUFBYSxHQUFHOzs7SUFBQzs7WUFDVCxvQkFBb0IsR0FBRyxJQUFJOztZQUMzQixrQkFBa0IsR0FBRyxJQUFJOztZQUN6QixVQUFVLEdBQUcsQ0FBQztRQUVsQixPQUFPO1lBQ0gsT0FBTzs7O1lBQUU7Z0JBQ0wsbUVBQW1FO2dCQUNuRSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsU0FBUyxJQUFJLENBQUMsRUFBRTtvQkFDMUIsNkVBQTZFO29CQUM3RSxJQUFJLFVBQVUsS0FBSyxDQUFDLEVBQUU7d0JBQ2xCLGlGQUFpRjt3QkFDakYsb0JBQW9CLEdBQUcsTUFBTSxDQUFDLFdBQVc7Ozt3QkFBQzs7Z0NBQ2xDLFNBQVMsR0FBRyxXQUFXLEVBQUU7NEJBRTdCLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQzs0QkFDNUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDOzRCQUU1QyxTQUFTLEdBQUcsSUFBSSxDQUFDO3dCQUNyQixDQUFDLEdBQUUsa0JBQWtCLENBQUMsQ0FBQztxQkFDMUI7b0JBRUQsVUFBVSxFQUFFLENBQUM7aUJBQ2hCO1lBQ0wsQ0FBQyxDQUFBO1lBQ0QsTUFBTTs7O1lBQUU7Z0JBQ0osK0ZBQStGO2dCQUMvRixJQUFJLFVBQVUsS0FBSyxDQUFDLEVBQUU7b0JBQ2xCLE1BQU0sQ0FBQyxhQUFhLENBQUMsb0JBQW9CLENBQUMsQ0FBQztpQkFDOUM7Z0JBRUQsSUFBSSxVQUFVLEdBQUcsQ0FBQyxFQUFFO29CQUNoQixVQUFVLEVBQUUsQ0FBQztpQkFDaEI7WUFDTCxDQUFDLENBQUE7U0FDSixDQUFDO0lBQ04sQ0FBQyxFQUFDLEVBQUU7SUFFUixPQUFPLENBQUMsVUFBVSxDQUFDLFlBQVksR0FBRztRQUM5QixJQUFJLEVBQUUsY0FBYztRQUVwQixpQkFBaUI7OztRQUFFO1lBQ2YsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQyxDQUFBOztRQUdELG9CQUFvQixFQUFFLEVBQUU7UUFFeEIsS0FBSzs7Ozs7O1FBQUUsVUFBVSxVQUFVLEVBQUUsU0FBUyxFQUFFLFFBQVE7O2dCQUN4QyxJQUFJLEdBQUcsSUFBSTs7Z0JBQ1gsT0FBTyxHQUFHLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDOztnQkFDbEQsR0FBRzs7Z0JBQ0gsS0FBSyxHQUFHLFdBQVcsRUFBRTs7Z0JBQ3JCLGdCQUFnQjs7O1lBQUc7Z0JBQ2YsVUFBVSxDQUFDLEdBQUcsQ0FBQyw0RUFBNEUsQ0FBQyxDQUFDO2dCQUM3RixJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUU7b0JBQzFCLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7aUJBQzlCO1lBQ0wsQ0FBQyxDQUFBO1lBRUwsSUFBSSxDQUFDLG1CQUFBLE1BQU0sRUFBTyxDQUFDLENBQUMsV0FBVyxFQUFFO2dCQUM3Qix1REFBdUQ7Z0JBQ3ZELElBQUksUUFBUSxFQUFFO29CQUNWLFVBQVUsQ0FBQyxHQUFHLENBQUMseUVBQXlFLENBQUMsQ0FBQztvQkFDMUYsUUFBUSxFQUFFLENBQUM7aUJBQ2Q7Z0JBQ0QsT0FBTzthQUNWO1lBRUQsS0FBSyxDQUFDLFlBQVksQ0FBQyw0QkFBNEIsRUFBRSxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7WUFFaEUsZ0NBQWdDO1lBQ2hDLDBGQUEwRjtZQUMxRixhQUFhLENBQUMsT0FBTyxFQUFFLENBQUM7WUFFeEIsZ0JBQWdCO1lBQ2hCLEdBQUcsR0FBRyxjQUFjLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbkQsR0FBRyxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUM7WUFFN0IsMEVBQTBFO1lBQzFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUVuRCxVQUFVLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7WUFFbEQsSUFBSSxLQUFLLENBQUMsZ0JBQWdCLEVBQUU7Z0JBQ3hCLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDM0Q7WUFFRCxLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztZQUNoQixjQUFjLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsR0FBRyxVQUFVLENBQUM7WUFFOUQsVUFBVSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDekIsVUFBVSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7WUFFN0IsSUFBSSxTQUFTLEVBQUU7Z0JBQ1gsVUFBVSxDQUFDLFNBQVM7OztnQkFBRztvQkFDbkIsVUFBVSxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO29CQUM1QyxTQUFTLEVBQUUsQ0FBQztnQkFDaEIsQ0FBQyxDQUFBLENBQUM7YUFDTDtRQUNMLENBQUMsQ0FBQTtRQUVELFNBQVM7Ozs7UUFBRSxVQUFVLFVBQVU7O2dCQUN2QixJQUFJLEdBQUcsSUFBSTtZQUVmLG1KQUFtSjtZQUNuSixJQUFJLGNBQWMsQ0FBQyx5QkFBeUIsQ0FBQyxVQUFVLENBQUMsSUFBSSxjQUFjLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLEVBQUU7Z0JBQ3JHLE1BQU0sQ0FBQyxVQUFVOzs7Z0JBQUM7b0JBQ2QscUNBQXFDO29CQUNyQyxJQUFJLENBQUMsY0FBYyxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxFQUFFO3dCQUM5QyxPQUFPO3FCQUNWO29CQUVELElBQUksVUFBVSxDQUFDLEtBQUssSUFBSSxjQUFjLENBQUMsdUJBQXVCLENBQUMsVUFBVSxDQUFDLEVBQUU7OzRCQUNwRSxLQUFLLEdBQUcsVUFBVSxDQUFDLEtBQUs7OzRCQUN4QixHQUFHLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxXQUFXLEdBQUcsVUFBVSxDQUFDLE9BQU87d0JBQy9GLFVBQVUsQ0FBQyxHQUFHLENBQUMsMEJBQTBCLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDO3dCQUN4RCxLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztxQkFDbkI7Z0JBQ0wsQ0FBQyxHQUFFLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQzthQUNqQztRQUNMLENBQUMsQ0FBQTtRQUVELGNBQWM7Ozs7UUFBRSxVQUFVLFVBQVU7WUFDaEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvQixDQUFDLENBQUE7UUFFRCxJQUFJOzs7OztRQUFFLFVBQVUsVUFBVSxFQUFFLElBQUk7WUFDNUIsY0FBYyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDOUMsQ0FBQyxDQUFBO1FBRUQsT0FBTzs7Ozs7UUFBRSxVQUFVLFVBQVUsRUFBRSxJQUFJOztnQkFDM0IsRUFBRTs7Z0JBQ0YsSUFBSTs7Z0JBQ0osUUFBUTtZQUVaLElBQUksVUFBVSxDQUFDLElBQUksS0FBSyxVQUFVLENBQUMsYUFBYSxFQUFFO2dCQUM5Qyx1RUFBdUU7Z0JBQ3ZFLHlFQUF5RTtnQkFDekUseUVBQXlFO2dCQUN6RSx1RUFBdUU7Z0JBQ3ZFLHNEQUFzRDtnQkFDdEQsSUFBSSxHQUFHLFVBQVUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ25EO1lBRUQsUUFBUSxHQUFHLFVBQVUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFM0MsY0FBYyxDQUFDLGVBQWUsQ0FBQyxVQUFVLEVBQUUsUUFBUSxFQUFFLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUUzRSxnR0FBZ0c7WUFDaEcsSUFBSSxVQUFVLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLFNBQVMsRUFBRTtnQkFDMUQsbUNBQW1DO2dCQUNuQyxVQUFVLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxVQUFVLENBQUMsaUJBQWlCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN2RSxJQUFJLFVBQVUsQ0FBQyxpQkFBaUIsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxvQkFBb0IsRUFBRTtvQkFDckYsVUFBVSxDQUFDLGlCQUFpQixHQUFHLENBQUMsQ0FBQztvQkFDakMsRUFBRSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsYUFBYSxJQUFJLFVBQVUsQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDO29CQUN4RSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFO3dCQUN2QyxJQUFJLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7d0JBRXhCLDJFQUEyRTt3QkFDM0UsT0FBTyxJQUFJLENBQUMsVUFBVSxFQUFFOzRCQUNwQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzt5QkFDckM7cUJBQ0o7aUJBQ0o7YUFDSjtRQUNMLENBQUMsQ0FBQTtRQUVELElBQUk7Ozs7UUFBRSxVQUFVLFVBQVU7O2dCQUNsQixFQUFFLEdBQUcsSUFBSTtZQUViLDBDQUEwQztZQUMxQyxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUM7WUFFdkIsSUFBSSxVQUFVLENBQUMsS0FBSyxFQUFFO2dCQUNsQixJQUFJLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFO29CQUN2QixVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO2lCQUMzQjtxQkFBTTtvQkFDSCxJQUFJO3dCQUNBLEVBQUUsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLGFBQWEsSUFBSSxVQUFVLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQzt3QkFDeEUsSUFBSSxFQUFFLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFOzRCQUN4QyxFQUFFLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQzt5QkFDbkM7cUJBQ0o7b0JBQ0QsT0FBTyxDQUFDLEVBQUU7d0JBQ04sVUFBVSxDQUFDLEdBQUcsQ0FBQyxpRUFBaUUsR0FBRyxDQUFDLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxDQUFDO3FCQUN2RztpQkFDSjtnQkFFRCx3Q0FBd0M7Z0JBQ3hDLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxVQUFVLEtBQUssTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUU7b0JBQ3RELE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ3REO2dCQUVELE9BQU8sY0FBYyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNuRSxVQUFVLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztnQkFDeEIsVUFBVSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7Z0JBQzFCLE9BQU8sVUFBVSxDQUFDLEtBQUssQ0FBQztnQkFDeEIsT0FBTyxVQUFVLENBQUMsT0FBTyxDQUFDO2dCQUMxQixPQUFPLFVBQVUsQ0FBQyxTQUFTLENBQUM7Z0JBQzVCLE9BQU8sVUFBVSxDQUFDLGlCQUFpQixDQUFDO2dCQUNwQyxVQUFVLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQUM7YUFDN0M7UUFDTCxDQUFDLENBQUE7UUFFRCxLQUFLOzs7OztRQUFFLFVBQVUsVUFBVSxFQUFFLEtBQUs7WUFDOUIsY0FBYyxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDaEQsQ0FBQyxDQUFBO1FBRUQsYUFBYTs7OztRQUFFLFVBQVUsRUFBRTtZQUN2QixPQUFPLGNBQWMsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZELENBQUMsQ0FBQTtRQUVELE9BQU87Ozs7UUFBRSxVQUFVLFVBQVU7WUFDekIsSUFBSSxXQUFXLENBQUMsVUFBVSxFQUN0QixPQUFPLENBQUMsZUFBZSxDQUFDLFlBQVksRUFDcEMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsS0FBSyxJQUFJLEVBQUU7Z0JBRTdDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQ3BEO1FBQ0wsQ0FBQyxDQUFBO0tBQ0osQ0FBQztBQUVOLENBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQzs7Ozs7O0FBU3ZCLENBQUM7Ozs7OztBQUFBLFVBQVUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxTQUFTOztRQUV2QixPQUFPLEdBQUcsQ0FBQyxDQUFDLE9BQU87O1FBQ25CLE1BQU0sR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU07O1FBQ3pCLFdBQVcsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVc7O1FBQ25DLGVBQWUsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLGVBQWU7O1FBQzNDLGNBQWMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLE1BQU07SUFFOUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxXQUFXLEdBQUc7UUFDN0IsSUFBSSxFQUFFLGFBQWE7UUFFbkIsaUJBQWlCOzs7UUFBRTtZQUNmLE9BQU8sS0FBSyxDQUFDO1FBQ2pCLENBQUMsQ0FBQTtRQUVELGNBQWMsRUFBRSxJQUFJO1FBRXBCLEtBQUs7Ozs7OztRQUFFLFVBQVUsVUFBVSxFQUFFLFNBQVMsRUFBRSxRQUFROzs7O2dCQUd4QyxJQUFJLEdBQUcsSUFBSTs7Z0JBQ1gsV0FBVzs7O1lBQUc7Z0JBQ1YsV0FBVyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBRXJCLFVBQVUsQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FBQztnQkFFekMsSUFBSSxTQUFTLEVBQUU7b0JBQ1gsU0FBUyxFQUFFLENBQUM7aUJBQ2Y7cUJBQU07b0JBQ0gsVUFBVSxDQUFDLEdBQUcsQ0FBQyxrRUFBa0UsQ0FBQyxDQUFDO2lCQUN0RjtZQUNMLENBQUMsQ0FBQTs7Z0JBQ0QsY0FBYzs7OztZQUFHLFVBQVUsS0FBSztnQkFDNUIsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQ2pCLFVBQVUsQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztvQkFDakQsT0FBTyxJQUFJLENBQUM7aUJBQ2Y7Z0JBRUQsT0FBTyxLQUFLLENBQUM7WUFDakIsQ0FBQyxDQUFBOztnQkFDRCxXQUFXLEdBQUcsVUFBVSxDQUFDLENBQUM7O2dCQUMxQixlQUFlLEdBQUcsQ0FBQzs7Z0JBQ25CLGVBQWU7Ozs7WUFBRyxVQUFVLFFBQVE7Z0JBQ2hDLE1BQU0sQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLENBQUM7Z0JBQ3BELFdBQVcsQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7Z0JBRXRDLElBQUksV0FBVyxDQUFDLFFBQVEsRUFDcEIsT0FBTyxDQUFDLGVBQWUsQ0FBQyxZQUFZLEVBQ3BDLE9BQU8sQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLEtBQUssSUFBSSxFQUFFO29CQUM3Qyw0QkFBNEI7b0JBQzVCLFFBQVEsQ0FBQyxHQUFHLENBQUMsNkJBQTZCLENBQUMsQ0FBQztvQkFDNUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7aUJBQ2xEO1lBQ0wsQ0FBQyxDQUFBOzs7WUFDRCxTQUFTO1lBQ1QseUJBQXlCLEdBQUcsT0FBTztZQUV2QyxJQUFJLFVBQVUsQ0FBQyxPQUFPLEVBQUU7Z0JBQ3BCLFVBQVUsQ0FBQyxHQUFHLENBQUMsZ0RBQWdELENBQUMsQ0FBQztnQkFDakUsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ3JCO1lBRUQsVUFBVSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFFNUIsV0FBVyxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQztZQUV0QyxXQUFXLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQyxVQUFVOzs7WUFBQztnQkFDMUMsQ0FBQzs7Ozs7Z0JBQUEsU0FBUyxJQUFJLENBQUMsUUFBUSxFQUFFLGNBQWM7O3dCQUMvQixTQUFTLEdBQUcsUUFBUSxDQUFDLFNBQVM7O3dCQUM5QixPQUFPLEdBQUcsQ0FBQyxTQUFTLEtBQUssSUFBSSxDQUFDOzt3QkFDOUIsWUFBWSxHQUFHLENBQUMsT0FBTzs7d0JBQ3ZCLE9BQU8sR0FBRyxDQUFDLGNBQWM7O3dCQUN6QixHQUFHLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxZQUFZLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyw4QkFBOEIsQ0FBQzs7d0JBQzVHLFFBQVEsR0FBRyxtQkFBQSxFQUFFLEVBQU87b0JBRXhCLElBQUksUUFBUSxDQUFDLFNBQVMsRUFBRTt3QkFDcEIsUUFBUSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDO3FCQUMzQztvQkFFRCxJQUFJLFFBQVEsQ0FBQyxXQUFXLEVBQUU7d0JBQ3RCLFFBQVEsQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQztxQkFDL0M7b0JBRUQsMEZBQTBGO29CQUMxRixJQUFJLGVBQWUsQ0FBQyxRQUFRLENBQUMsS0FBSyxJQUFJLEVBQUU7d0JBQ3BDLE9BQU87cUJBQ1Y7b0JBRUQsVUFBVSxDQUFDLEdBQUcsQ0FBQyxtQ0FBbUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUM7b0JBQ2pFLFFBQVEsQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7d0JBQy9DLFNBQVMsRUFBRTs0QkFDUCxVQUFVOzs7NEJBQUU7Z0NBQ1IsY0FBYyxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQzs0QkFDL0MsQ0FBQyxDQUFBO3lCQUNKO3dCQUNELEdBQUcsRUFBRSxHQUFHO3dCQUNSLElBQUksRUFBRSxNQUFNO3dCQUNaLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLGtCQUFrQjt3QkFDekMsSUFBSSxFQUFFLFFBQVE7d0JBQ2QsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsV0FBVzt3QkFDakMsT0FBTzs7Ozt3QkFBRSxVQUFVLE1BQU07O2dDQUNqQixPQUFPOztnQ0FDUCxLQUFLLEdBQUcsQ0FBQzs7Z0NBQ1QsSUFBSTs7Z0NBQ0osZUFBZTs0QkFFbkIsVUFBVSxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDOzRCQUV0Qyw0RkFBNEY7NEJBQzVGLHNCQUFzQjs0QkFDdEIsZUFBZSxHQUFHLENBQUMsQ0FBQzs0QkFFcEIsSUFBSTtnQ0FDQSwwREFBMEQ7Z0NBQzFELE9BQU8sR0FBRyxVQUFVLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDOzZCQUMvQzs0QkFDRCxPQUFPLEtBQUssRUFBRTtnQ0FDVixjQUFjLENBQUMsa0JBQWtCLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQ0FDN0YsT0FBTzs2QkFDVjs0QkFFRCw4RkFBOEY7NEJBQzlGLElBQUksV0FBVyxDQUFDLGtCQUFrQixLQUFLLElBQUksRUFBRTtnQ0FDekMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzZCQUM3Qjs0QkFFRCxJQUFJLE9BQU8sRUFBRTtnQ0FDVCxJQUFJLEdBQUcsY0FBYyxDQUFDLDBCQUEwQixDQUFDLE9BQU8sQ0FBQyxDQUFDOzZCQUM3RDs0QkFFRCxjQUFjLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUM7NEJBRS9ELElBQUksSUFBSTtnQ0FDSixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxRQUFRLEVBQUU7Z0NBQ3pDLEtBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDOzZCQUM5Qjs0QkFFRCxJQUFJLGVBQWUsQ0FBQyxRQUFRLENBQUMsS0FBSyxJQUFJLEVBQUU7Z0NBQ3BDLE9BQU87NkJBQ1Y7NEJBRUQsZUFBZSxHQUFHLElBQUksSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDOzRCQUMvQyxJQUFJLGVBQWUsRUFBRTtnQ0FDakIseUNBQXlDO2dDQUN6QyxtSEFBbUg7Z0NBQ25ILElBQUksQ0FBQyxjQUFjLENBQUMsdUJBQXVCLENBQUMsUUFBUSxDQUFDLEVBQUU7b0NBQ25ELE9BQU87aUNBQ1Y7NkJBQ0o7NEJBRUQsK0dBQStHOzRCQUMvRyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUU7Z0NBQ1gsV0FBVyxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsVUFBVTs7O2dDQUFDO29DQUMxQyxJQUFJLENBQUMsUUFBUSxFQUFFLGVBQWUsQ0FBQyxDQUFDO2dDQUNwQyxDQUFDLEdBQUUsS0FBSyxDQUFDLENBQUM7NkJBQ2I7aUNBQU07Z0NBQ0gsSUFBSSxDQUFDLFFBQVEsRUFBRSxlQUFlLENBQUMsQ0FBQzs2QkFDbkM7d0JBQ0wsQ0FBQyxDQUFBO3dCQUVELEtBQUs7Ozs7O3dCQUFFLFVBQVUsSUFBSSxFQUFFLFVBQVU7O2dDQUN6QixLQUFLLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxjQUFjLEVBQUUsVUFBVSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLE9BQU8sQ0FBQzs0QkFFcEgsb0VBQW9FOzRCQUNwRSxxREFBcUQ7NEJBQ3JELE1BQU0sQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLENBQUM7NEJBQ3BELFdBQVcsQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7NEJBRXRDLElBQUksVUFBVSxLQUFLLE9BQU8sRUFBRTtnQ0FDeEIsVUFBVSxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO2dDQUN2QyxPQUFPOzZCQUNWOzRCQUVELElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0NBRXhCLDhFQUE4RTtnQ0FDOUUsOEVBQThFO2dDQUM5RSxtREFBbUQ7Z0NBQ25ELGVBQWUsRUFBRSxDQUFDO2dDQUVsQixJQUFJLFVBQVUsQ0FBQyxLQUFLLEtBQUssT0FBTyxDQUFDLGVBQWUsQ0FBQyxZQUFZLEVBQUU7b0NBQzNELFVBQVUsQ0FBQyxHQUFHLENBQUMsZ0RBQWdELEdBQUcsVUFBVSxHQUFHLGdCQUFnQixHQUFHLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDLENBQUM7b0NBQzNILENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7aUNBQ3ZEO2dDQUVELHFHQUFxRztnQ0FDckcsbUhBQW1IO2dDQUNuSCw0REFBNEQ7Z0NBQzVELElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxLQUFLLE9BQU8sQ0FBQyxlQUFlLENBQUMsU0FBUztvQ0FDdkQsVUFBVSxDQUFDLEtBQUssS0FBSyxPQUFPLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQztvQ0FDMUQsQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLEVBQUU7b0NBQzlDLE9BQU87aUNBQ1Y7Z0NBRUQseUNBQXlDO2dDQUN6Qyw0SkFBNEo7Z0NBQzVKLElBQUksQ0FBQyxjQUFjLENBQUMsdUJBQXVCLENBQUMsUUFBUSxDQUFDLEVBQUU7b0NBQ25ELE9BQU87aUNBQ1Y7Z0NBRUQsMkVBQTJFO2dDQUMzRSxXQUFXLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQyxVQUFVOzs7Z0NBQUM7b0NBQzFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0NBQ3pCLENBQUMsR0FBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7NkJBQzNCO3dCQUNMLENBQUMsQ0FBQTtxQkFDSixDQUFDLENBQUM7b0JBRUgsb0ZBQW9GO29CQUNwRixJQUFJLFlBQVksSUFBSSxjQUFjLEtBQUssSUFBSSxFQUFFO3dCQUN6Qyw4RUFBOEU7d0JBQzlFLHVGQUF1Rjt3QkFDdkYsc0ZBQXNGO3dCQUN0Riw2REFBNkQ7d0JBQzdELHFGQUFxRjt3QkFDckYsV0FBVyxDQUFDLGtCQUFrQixHQUFHLE1BQU0sQ0FBQyxVQUFVOzs7d0JBQUMsY0FBYyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSx5QkFBeUIsQ0FBQyxDQUFDLENBQUM7cUJBQ2xMO2dCQUNMLENBQUMsRUFBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ25CLENBQUMsR0FBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLDBFQUEwRTtRQUN2RixDQUFDLENBQUE7UUFFRCxjQUFjOzs7O1FBQUUsVUFBVSxVQUFVO1lBQ2hDLElBQUksVUFBVSxDQUFDLE9BQU8sRUFBRTtnQkFDcEIsVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzthQUM5QztRQUNMLENBQUMsQ0FBQTtRQUVELElBQUk7Ozs7O1FBQUUsVUFBVSxVQUFVLEVBQUUsSUFBSTtZQUM1QixjQUFjLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM5QyxDQUFDLENBQUE7UUFFRCxJQUFJOzs7O1FBQUUsVUFBVSxVQUFVO1lBQ3RCLHdEQUF3RDtZQUN4RCxrRkFBa0Y7WUFFbEYsTUFBTSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ2hELE1BQU0sQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBRXJELE9BQU8sVUFBVSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUM7WUFDbEMsT0FBTyxVQUFVLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDO1lBRXZDLElBQUksVUFBVSxDQUFDLE9BQU8sRUFBRTtnQkFDcEIsVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDM0IsVUFBVSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7Z0JBQzFCLE9BQU8sVUFBVSxDQUFDLE9BQU8sQ0FBQzthQUM3QjtRQUNMLENBQUMsQ0FBQTtRQUVELEtBQUs7Ozs7O1FBQUUsVUFBVSxVQUFVLEVBQUUsS0FBSztZQUM5QixjQUFjLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNoRCxDQUFDLENBQUE7S0FDSixDQUFDO0FBRU4sQ0FBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDOzs7Ozs7QUFRdkIsQ0FBQzs7Ozs7O0FBQUEsVUFBVSxDQUFDLEVBQUUsTUFBTSxFQUFFLFNBQVM7O1FBRXZCLGNBQWMsR0FBRyxXQUFXOztRQUM1QixPQUFPLEdBQUcsQ0FBQyxDQUFDLE9BQU87Ozs7O0lBRXZCLFNBQVMsYUFBYSxDQUFDLEtBQUs7UUFDeEIsT0FBTyxLQUFLLEdBQUcsY0FBYyxDQUFDO0lBQ2xDLENBQUM7Ozs7Ozs7O0lBR0QsU0FBUyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxLQUFNOztZQUNyQixDQUFDOztZQUNELE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTTs7WUFDbkIsTUFBTSxHQUFHLEVBQUU7UUFDZixLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzVCLElBQUksR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDdkIsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7YUFDL0M7U0FDSjtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7Ozs7O0lBRUQsU0FBUyxXQUFXLENBQUMsQ0FBQztRQUNsQixPQUFPLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMzRSxDQUFDOzs7OztJQUVELFNBQVMsVUFBVSxDQUFDLEdBQUc7UUFDbkIsS0FBSyxJQUFJLEdBQUcsSUFBSSxHQUFHLEVBQUU7WUFDakIsd0dBQXdHO1lBQ3hHLElBQUksR0FBRyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDekIsT0FBTyxJQUFJLENBQUM7YUFDZjtTQUNKO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQzs7Ozs7O0lBRUQsU0FBUyx3QkFBd0IsQ0FBQyxVQUFVLEVBQUUsS0FBSzs7O1lBRTNDLFNBQVMsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLG1CQUFtQjs7WUFDNUMsUUFBUTtRQUVaLElBQUksVUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ3ZCLFVBQVUsQ0FBQyxHQUFHLENBQUMsZ0RBQWdELEdBQUcsS0FBSyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1NBQ2xGO1FBRUQscUVBQXFFO1FBQ3JFLFVBQVUsQ0FBQyxDQUFDLENBQUMsb0JBQW9CLEdBQUcsQ0FBQyxDQUFDO1FBQ3RDLE9BQU8sVUFBVSxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQztRQUN4QyxVQUFVLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixHQUFHLEVBQUUsQ0FBQztRQUV0QywyQ0FBMkM7UUFDM0MsNkVBQTZFO1FBQzdFLDRFQUE0RTtRQUM1RSwyREFBMkQ7UUFDM0QsS0FBSyxJQUFJLFVBQVUsSUFBSSxTQUFTLEVBQUU7WUFDOUIsUUFBUSxHQUFHLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNqQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7U0FDdEQ7SUFDTCxDQUFDOzs7Ozs7O0lBR0QsU0FBUyxRQUFRLENBQUMsYUFBYSxFQUFFLE9BQU87UUFDcEMsYUFBYTtRQUNiLDBGQUEwRjtRQUMxRiw0RkFBNEY7UUFDNUYsY0FBYztRQUNkLE9BQU8sSUFBSSxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVELFFBQVEsQ0FBQyxFQUFFLEdBQUcsUUFBUSxDQUFDLFNBQVMsR0FBRztRQUMvQixJQUFJOzs7OztRQUFFLFVBQVUsVUFBVSxFQUFFLE9BQU87WUFDL0IsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7WUFDaEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7WUFDN0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7WUFDdkIsSUFBSSxDQUFDLENBQUMsR0FBRztnQkFDTCxXQUFXLEVBQUUsRUFBRTthQUNsQixDQUFDO1FBQ04sQ0FBQyxDQUFBO1FBRUQsV0FBVyxFQUFFLFFBQVE7UUFFckIsZ0JBQWdCOzs7UUFBRTtZQUNkLE9BQU8sVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDMUMsQ0FBQyxDQUFBO1FBRUQsRUFBRTs7Ozs7UUFBRSxVQUFVLFNBQVMsRUFBRSxRQUFROzs7OztnQkFJekIsSUFBSSxHQUFHLElBQUk7O2dCQUNYLFdBQVcsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLFdBQVc7WUFFcEMsd0NBQXdDO1lBQ3hDLFNBQVMsR0FBRyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUM7WUFFcEMsbUhBQW1IO1lBQ25ILElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLEVBQUU7Z0JBQ3pCLFdBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUM7YUFDL0I7WUFFRCwrQ0FBK0M7WUFDL0MsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFFBQVEsQ0FBQzs7Ozs7WUFBRyxVQUFVLENBQUMsRUFBRSxJQUFJO2dCQUNoRCxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUMvQixDQUFDLENBQUEsQ0FBQztZQUVGLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBRXpFLE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUMsQ0FBQTtRQUVELEdBQUc7Ozs7O1FBQUUsVUFBVSxTQUFTLEVBQUUsUUFBUTs7Ozs7Z0JBSTFCLElBQUksR0FBRyxJQUFJOztnQkFDWCxXQUFXLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXOztnQkFDaEMsYUFBYTtZQUVqQix3Q0FBd0M7WUFDeEMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUVwQyxhQUFhLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRXZDLGdEQUFnRDtZQUNoRCxJQUFJLGFBQWEsRUFBRTtnQkFDZixrR0FBa0c7Z0JBQ2xHLElBQUksYUFBYSxDQUFDLFFBQVEsQ0FBQyxFQUFFO29CQUN6QixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsRUFBRSxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFFbEUsNENBQTRDO29CQUM1QyxPQUFPLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFFL0Isa0ZBQWtGO29CQUNsRixJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxFQUFFO3dCQUM1QixPQUFPLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztxQkFDakM7aUJBQ0o7cUJBQU0sSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLDZGQUE2RjtvQkFDakgsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztvQkFFekMsT0FBTyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7aUJBQ2pDO2FBQ0o7WUFFRCxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDLENBQUE7UUFFRCxNQUFNOzs7O1FBQUUsVUFBVSxVQUFVO1lBQ3hCLDRFQUE0RTtZQUM1RSxxRkFBcUY7Ozs7Z0JBRWpGLElBQUksR0FBRyxJQUFJOztnQkFDWCxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVU7O2dCQUM1QixJQUFJLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDOztnQkFDdEMsU0FBUyxHQUFHLEdBQUcsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDOztnQkFDbEMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLG9CQUFvQixFQUFFLENBQUMsRUFBQyxJQUFJLEVBQUU7O2dCQUNyRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRTs7Z0JBQ2hCLFFBQVE7Ozs7WUFBRyxVQUFVLFNBQVM7O29CQUN0QixNQUFNLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFNBQVMsQ0FBQzs7b0JBQzdDLE1BQU07O29CQUNOLEtBQUs7Z0JBRVQsdUJBQXVCO2dCQUN2QixDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUVuQyxJQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUU7b0JBQ2pCLElBQUksQ0FBQyxDQUFDLFVBQVUsRUFBRTt3QkFDZCw0Q0FBNEM7d0JBQzVDLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO3FCQUM5Qzt5QkFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQywyQkFBMkIsRUFBRTt3QkFDbEQsVUFBVSxDQUFDLEdBQUcsQ0FBQyx5RkFBeUYsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxnR0FBZ0csQ0FBQyxDQUFDO3dCQUNsTyxVQUFVLENBQUMsQ0FBQyxDQUFDLDJCQUEyQixHQUFHLElBQUksQ0FBQztxQkFDbkQ7aUJBQ0o7cUJBQU0sSUFBSSxNQUFNLENBQUMsS0FBSyxFQUFFO29CQUNyQixxRUFBcUU7b0JBQ3JFLElBQUksTUFBTSxDQUFDLFVBQVUsRUFBRTt3QkFDbkIsVUFBVSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksR0FBRyxNQUFNLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQyxDQUFDO3FCQUNqRTtvQkFFRCw0REFBNEQ7b0JBQzVELE1BQU0sR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQztvQkFDOUQsS0FBSyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7b0JBQzlDLEtBQUssQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztvQkFFOUIsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsR0FBRyxVQUFVLEdBQUcsNkJBQTZCLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUNoRyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7aUJBQy9CO3FCQUFNO29CQUNILG9EQUFvRDtvQkFDcEQsVUFBVSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLEdBQUcsVUFBVSxDQUFDLENBQUM7b0JBQzdELENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7aUJBQ3hDO1lBQ0wsQ0FBQyxDQUFBO1lBRUwsVUFBVSxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsQ0FBQztZQUNuSCxVQUFVLENBQUMsQ0FBQyxDQUFDLG9CQUFvQixJQUFJLENBQUMsQ0FBQztZQUV2QyxJQUFJLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQzlCLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQzthQUN2QjtZQUVELFVBQVUsQ0FBQyxHQUFHLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxHQUFHLFVBQVUsQ0FBQyxDQUFDO1lBQzlELFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFdEIsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDdkIsQ0FBQyxDQUFBO1FBRUQsb0JBQW9COzs7O1FBQUUsVUFBVSxjQUFjO1lBQzFDLE9BQU87Z0JBQ0gsS0FBSyxFQUFFLGNBQWMsQ0FBQyxDQUFDO2dCQUN2QixNQUFNLEVBQUUsY0FBYyxDQUFDLENBQUM7Z0JBQ3hCLFFBQVEsRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDekIsRUFBRSxFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdEIsSUFBSSxFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDM0IsQ0FBQyxDQUFDLENBQUMsSUFBSTtnQkFDUixFQUFFLEVBQUUsY0FBYyxDQUFDLENBQUM7Z0JBQ3BCLGNBQWMsRUFBRSxjQUFjLENBQUMsQ0FBQztnQkFDaEMsS0FBSyxFQUFFLGNBQWMsQ0FBQyxDQUFDO2dCQUN2QixVQUFVLEVBQUUsY0FBYyxDQUFDLENBQUM7Z0JBQzVCLFNBQVMsRUFBRSxjQUFjLENBQUMsQ0FBQzthQUM5QixDQUFDO1FBQ04sQ0FBQyxDQUFBO0tBQ0osQ0FBQztJQUVGLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsRUFBRSxDQUFDOzs7Ozs7O0lBR3pDLFNBQVMsYUFBYSxDQUFDLEdBQUcsRUFBRSxPQUFPOzs7OztZQUkzQixRQUFRLEdBQUc7WUFDWCxFQUFFLEVBQUUsSUFBSTtZQUNSLE9BQU8sRUFBRSxLQUFLO1lBQ2QsY0FBYyxFQUFFLElBQUk7U0FDdkI7UUFFRCxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUU1QixJQUFJLENBQUMsR0FBRyxJQUFJLFFBQVEsQ0FBQyxjQUFjLEVBQUU7WUFDakMsR0FBRyxHQUFHLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQztTQUNsQztRQUNELE9BQU8sSUFBSSxhQUFhLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVELGFBQWEsQ0FBQyxFQUFFLEdBQUcsYUFBYSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7SUFFNUQsYUFBYSxDQUFDLEVBQUUsQ0FBQyxJQUFJOzs7OztJQUFHLFVBQVUsR0FBRyxFQUFFLE9BQU87O1lBQ3RDLFFBQVEsR0FBRztZQUNYLEVBQUUsRUFBRSxJQUFJO1lBQ1IsT0FBTyxFQUFFLEtBQUs7WUFDZCxjQUFjLEVBQUUsSUFBSTtTQUN2Qjs7WUFDRyxVQUFVLEdBQUcsSUFBSTtRQUVyQixDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUU1Qiw0QkFBNEI7UUFDNUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsR0FBRyxFQUFFLFFBQVEsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRXZFLGtEQUFrRDtRQUNsRCxVQUFVLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUV4QixVQUFVLENBQUMsQ0FBQyxDQUFDLG9CQUFvQixHQUFHLENBQUMsQ0FBQztRQUN0QyxVQUFVLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixHQUFHLEVBQUUsQ0FBQztRQUV0QywrQkFBK0I7UUFDL0IsVUFBVSxDQUFDLFFBQVE7Ozs7UUFBQyxVQUFVLE9BQU87O2dCQUM3QixJQUFJOztnQkFBRSxLQUFLOztnQkFBRSxjQUFjOztnQkFBRSxRQUFROztnQkFBRSxPQUFPOztnQkFBRSxTQUFTO1lBQzdELElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ1YsT0FBTzthQUNWO1lBRUQsdUZBQXVGO1lBQ3ZGLHFGQUFxRjtZQUNyRix3RkFBd0Y7WUFDeEYsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLFdBQVcsRUFBRTtnQkFDcEMsZ0NBQWdDO2dCQUNoQyxjQUFjLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ3hDLFFBQVEsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUM1RCxJQUFJLFFBQVEsRUFBRTtvQkFDVixRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2lCQUNqRDthQUNKO2lCQUFNLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxXQUFXLEVBQUU7Z0JBQzNDLG1HQUFtRztnQkFDbkcsY0FBYyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ3RDLFFBQVEsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUM1RCxJQUFJLFFBQVEsRUFBRTtvQkFDVixxQ0FBcUM7b0JBQ3JDLFVBQVUsQ0FBQyxDQUFDLENBQUMsbUJBQW1CLENBQUMsY0FBYyxDQUFDLEdBQUcsSUFBSSxDQUFDO29CQUN4RCxPQUFPLFVBQVUsQ0FBQyxDQUFDLENBQUMsbUJBQW1CLENBQUMsY0FBYyxDQUFDLENBQUM7b0JBRXhELHNCQUFzQjtvQkFDdEIsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztpQkFDakQ7YUFDSjtpQkFBTTtnQkFDSCxJQUFJLEdBQUcsSUFBSSxDQUFDLDRCQUE0QixDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUVsRCwwRUFBMEU7Z0JBQzFFLFVBQVUsQ0FBQyxHQUFHLENBQUMsK0JBQStCLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxZQUFZLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQztnQkFFL0YsbUNBQW1DO2dCQUNuQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDakMsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBRXRDLHFDQUFxQztnQkFDckMsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBRTlCLHVCQUF1QjtnQkFDdkIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbEMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUNsRTtRQUNMLENBQUMsRUFBQyxDQUFDO1FBRUgsVUFBVSxDQUFDLEtBQUs7Ozs7O1FBQUMsVUFBVSxPQUFPLEVBQUUsUUFBUTs7Z0JBQ3BDLFVBQVU7O2dCQUFFLFFBQVE7WUFFeEIsSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDWCxzREFBc0Q7Z0JBQ3RELE9BQU87YUFDVjtZQUVELFVBQVUsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLFFBQVEsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRXhELGtFQUFrRTtZQUNsRSxJQUFJLFFBQVEsRUFBRTtnQkFDVixzQkFBc0I7Z0JBQ3RCLFVBQVUsQ0FBQyxDQUFDLENBQUMsbUJBQW1CLENBQUMsVUFBVSxDQUFDLEdBQUcsSUFBSSxDQUFDO2dCQUNwRCxPQUFPLFVBQVUsQ0FBQyxDQUFDLENBQUMsbUJBQW1CLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBRXBELDBEQUEwRDtnQkFDMUQsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO2FBQ3hEO1FBQ0wsQ0FBQyxFQUFDLENBQUM7UUFFSCxVQUFVLENBQUMsWUFBWTs7O1FBQUM7WUFDcEIsSUFBSSxVQUFVLENBQUMsU0FBUyxJQUFJLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxLQUFLLFlBQVksRUFBRTtnQkFDcEUsd0JBQXdCLENBQUMsVUFBVSxFQUFFLHdFQUF3RSxDQUFDLENBQUM7YUFDbEg7UUFDTCxDQUFDLEVBQUMsQ0FBQztRQUVILFVBQVUsQ0FBQyxZQUFZOzs7UUFBQztZQUNwQix3QkFBd0IsQ0FBQyxVQUFVLEVBQUUsb0VBQW9FLENBQUMsQ0FBQztRQUMvRyxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQSxDQUFDO0lBRUYsYUFBYSxDQUFDLEVBQUUsQ0FBQyw0QkFBNEI7Ozs7SUFBRyxVQUFVLHNCQUFzQjtRQUM1RSxPQUFPO1lBQ0gsR0FBRyxFQUFFLHNCQUFzQixDQUFDLENBQUM7WUFDN0IsTUFBTSxFQUFFLHNCQUFzQixDQUFDLENBQUM7WUFDaEMsSUFBSSxFQUFFLHNCQUFzQixDQUFDLENBQUM7WUFDOUIsS0FBSyxFQUFFLHNCQUFzQixDQUFDLENBQUM7U0FDbEMsQ0FBQztJQUNOLENBQUMsQ0FBQSxDQUFDO0lBRUYsYUFBYSxDQUFDLEVBQUUsQ0FBQyx1QkFBdUI7OztJQUFHOzs7Ozs7WUFLbkMsVUFBVSxHQUFHLElBQUk7UUFFckIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsRUFBRTtZQUMvQixVQUFVLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO1lBQ3BDLFVBQVUsQ0FBQyxRQUFROzs7WUFBQzs7OztvQkFHWixjQUFjLEdBQUcsRUFBRTtnQkFFdkIsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTzs7OztnQkFBRSxVQUFVLEdBQUc7b0JBQ3BDLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFLEVBQUU7d0JBQ3pCLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQzt3QkFDbkMsVUFBVSxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUM7cUJBQzdEO2dCQUNMLENBQUMsRUFBQyxDQUFDO2dCQUVILElBQUksY0FBYyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7b0JBQzdCLFVBQVUsQ0FBQyxHQUFHLENBQUMsbU1BQW1NLENBQUMsQ0FBQztpQkFDdk47Z0JBRUQsVUFBVSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUNoRSxDQUFDLEVBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQyxDQUFBLENBQUM7SUFFRixhQUFhLENBQUMsRUFBRSxDQUFDLGNBQWM7Ozs7SUFBRyxVQUFVLE9BQU87UUFDL0MsYUFBYTtRQUNiLDBGQUEwRjtRQUMxRiw0RkFBNEY7UUFDNUYsY0FBYztRQUNkLHdDQUF3QztRQUN4QyxrRUFBa0U7UUFDbEUsWUFBWTtRQUVaLGtDQUFrQztRQUNsQyxPQUFPLEdBQUcsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDOztZQUU1QixLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFDakMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNSLEtBQUssR0FBRyxRQUFRLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsS0FBSyxDQUFDO1NBQ2pDO1FBRUQsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7UUFFL0IsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQyxDQUFBLENBQUM7SUFFRixhQUFhLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsYUFBYSxDQUFDLEVBQUUsQ0FBQztJQUVuRCxDQUFDLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztBQUVwQyxDQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7Ozs7OztBQVF2QixDQUFDOzs7OztBQUFBLFVBQVUsQ0FBQyxFQUFFLFNBQVM7SUFDbkIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0FBQ2hDLENBQUMsRUFBQyxVQUFVLENBQUMsQ0FBQyxDQUFDOztBQUVmLE1BQU0sS0FBTyxhQUFhLEdBQUcsVUFBVSxDQUFDLGFBQWE7O0FBQ3JELE1BQU0sS0FBTyxPQUFPLEdBQUcsVUFBVSxDQUFDLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgalF1ZXJ5U2hpbSBmcm9tICcuL2pRdWVyeVNoaW0nO1xyXG5cclxuLyoganF1ZXJ5LnNpZ25hbFIuY29yZS5qcyAqL1xyXG4vKmdsb2JhbCB3aW5kb3c6ZmFsc2UgKi9cclxuLyohXHJcbiAqIEFTUC5ORVQgU2lnbmFsUiBKYXZhU2NyaXB0IExpYnJhcnkgdjIuMi4xXHJcbiAqIGh0dHA6Ly9zaWduYWxyLm5ldC9cclxuICpcclxuICogQ29weXJpZ2h0IChjKSAuTkVUIEZvdW5kYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKi9cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJTY3JpcHRzL2pxdWVyeS0xLjYuNC5qc1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJqcXVlcnkuc2lnbmFsUi52ZXJzaW9uLmpzXCIgLz5cclxuKGZ1bmN0aW9uICgkLCB3aW5kb3csIHVuZGVmaW5lZCkge1xyXG5cclxuICAgIHZhciByZXNvdXJjZXMgPSB7XHJcbiAgICAgICAgbm9qUXVlcnk6IFwialF1ZXJ5IHdhcyBub3QgZm91bmQuIFBsZWFzZSBlbnN1cmUgalF1ZXJ5IGlzIHJlZmVyZW5jZWQgYmVmb3JlIHRoZSBTaWduYWxSIGNsaWVudCBKYXZhU2NyaXB0IGZpbGUuXCIsXHJcbiAgICAgICAgbm9UcmFuc3BvcnRPbkluaXQ6IFwiTm8gdHJhbnNwb3J0IGNvdWxkIGJlIGluaXRpYWxpemVkIHN1Y2Nlc3NmdWxseS4gVHJ5IHNwZWNpZnlpbmcgYSBkaWZmZXJlbnQgdHJhbnNwb3J0IG9yIG5vbmUgYXQgYWxsIGZvciBhdXRvIGluaXRpYWxpemF0aW9uLlwiLFxyXG4gICAgICAgIGVycm9yT25OZWdvdGlhdGU6IFwiRXJyb3IgZHVyaW5nIG5lZ290aWF0aW9uIHJlcXVlc3QuXCIsXHJcbiAgICAgICAgc3RvcHBlZFdoaWxlTG9hZGluZzogXCJUaGUgY29ubmVjdGlvbiB3YXMgc3RvcHBlZCBkdXJpbmcgcGFnZSBsb2FkLlwiLFxyXG4gICAgICAgIHN0b3BwZWRXaGlsZU5lZ290aWF0aW5nOiBcIlRoZSBjb25uZWN0aW9uIHdhcyBzdG9wcGVkIGR1cmluZyB0aGUgbmVnb3RpYXRlIHJlcXVlc3QuXCIsXHJcbiAgICAgICAgZXJyb3JQYXJzaW5nTmVnb3RpYXRlUmVzcG9uc2U6IFwiRXJyb3IgcGFyc2luZyBuZWdvdGlhdGUgcmVzcG9uc2UuXCIsXHJcbiAgICAgICAgZXJyb3JEdXJpbmdTdGFydFJlcXVlc3Q6IFwiRXJyb3IgZHVyaW5nIHN0YXJ0IHJlcXVlc3QuIFN0b3BwaW5nIHRoZSBjb25uZWN0aW9uLlwiLFxyXG4gICAgICAgIHN0b3BwZWREdXJpbmdTdGFydFJlcXVlc3Q6IFwiVGhlIGNvbm5lY3Rpb24gd2FzIHN0b3BwZWQgZHVyaW5nIHRoZSBzdGFydCByZXF1ZXN0LlwiLFxyXG4gICAgICAgIGVycm9yUGFyc2luZ1N0YXJ0UmVzcG9uc2U6IFwiRXJyb3IgcGFyc2luZyBzdGFydCByZXNwb25zZTogJ3swfScuIFN0b3BwaW5nIHRoZSBjb25uZWN0aW9uLlwiLFxyXG4gICAgICAgIGludmFsaWRTdGFydFJlc3BvbnNlOiBcIkludmFsaWQgc3RhcnQgcmVzcG9uc2U6ICd7MH0nLiBTdG9wcGluZyB0aGUgY29ubmVjdGlvbi5cIixcclxuICAgICAgICBwcm90b2NvbEluY29tcGF0aWJsZTogXCJZb3UgYXJlIHVzaW5nIGEgdmVyc2lvbiBvZiB0aGUgY2xpZW50IHRoYXQgaXNuJ3QgY29tcGF0aWJsZSB3aXRoIHRoZSBzZXJ2ZXIuIENsaWVudCB2ZXJzaW9uIHswfSwgc2VydmVyIHZlcnNpb24gezF9LlwiLFxyXG4gICAgICAgIHNlbmRGYWlsZWQ6IFwiU2VuZCBmYWlsZWQuXCIsXHJcbiAgICAgICAgcGFyc2VGYWlsZWQ6IFwiRmFpbGVkIGF0IHBhcnNpbmcgcmVzcG9uc2U6IHswfVwiLFxyXG4gICAgICAgIGxvbmdQb2xsRmFpbGVkOiBcIkxvbmcgcG9sbGluZyByZXF1ZXN0IGZhaWxlZC5cIixcclxuICAgICAgICBldmVudFNvdXJjZUZhaWxlZFRvQ29ubmVjdDogXCJFdmVudFNvdXJjZSBmYWlsZWQgdG8gY29ubmVjdC5cIixcclxuICAgICAgICBldmVudFNvdXJjZUVycm9yOiBcIkVycm9yIHJhaXNlZCBieSBFdmVudFNvdXJjZVwiLFxyXG4gICAgICAgIHdlYlNvY2tldENsb3NlZDogXCJXZWJTb2NrZXQgY2xvc2VkLlwiLFxyXG4gICAgICAgIHBpbmdTZXJ2ZXJGYWlsZWRJbnZhbGlkUmVzcG9uc2U6IFwiSW52YWxpZCBwaW5nIHJlc3BvbnNlIHdoZW4gcGluZ2luZyBzZXJ2ZXI6ICd7MH0nLlwiLFxyXG4gICAgICAgIHBpbmdTZXJ2ZXJGYWlsZWQ6IFwiRmFpbGVkIHRvIHBpbmcgc2VydmVyLlwiLFxyXG4gICAgICAgIHBpbmdTZXJ2ZXJGYWlsZWRTdGF0dXNDb2RlOiBcIkZhaWxlZCB0byBwaW5nIHNlcnZlci4gIFNlcnZlciByZXNwb25kZWQgd2l0aCBzdGF0dXMgY29kZSB7MH0sIHN0b3BwaW5nIHRoZSBjb25uZWN0aW9uLlwiLFxyXG4gICAgICAgIHBpbmdTZXJ2ZXJGYWlsZWRQYXJzZTogXCJGYWlsZWQgdG8gcGFyc2UgcGluZyBzZXJ2ZXIgcmVzcG9uc2UsIHN0b3BwaW5nIHRoZSBjb25uZWN0aW9uLlwiLFxyXG4gICAgICAgIG5vQ29ubmVjdGlvblRyYW5zcG9ydDogXCJDb25uZWN0aW9uIGlzIGluIGFuIGludmFsaWQgc3RhdGUsIHRoZXJlIGlzIG5vIHRyYW5zcG9ydCBhY3RpdmUuXCIsXHJcbiAgICAgICAgd2ViU29ja2V0c0ludmFsaWRTdGF0ZTogXCJUaGUgV2ViIFNvY2tldCB0cmFuc3BvcnQgaXMgaW4gYW4gaW52YWxpZCBzdGF0ZSwgdHJhbnNpdGlvbmluZyBpbnRvIHJlY29ubmVjdGluZy5cIixcclxuICAgICAgICByZWNvbm5lY3RUaW1lb3V0OiBcIkNvdWxkbid0IHJlY29ubmVjdCB3aXRoaW4gdGhlIGNvbmZpZ3VyZWQgdGltZW91dCBvZiB7MH0gbXMsIGRpc2Nvbm5lY3RpbmcuXCIsXHJcbiAgICAgICAgcmVjb25uZWN0V2luZG93VGltZW91dDogXCJUaGUgY2xpZW50IGhhcyBiZWVuIGluYWN0aXZlIHNpbmNlIHswfSBhbmQgaXQgaGFzIGV4Y2VlZGVkIHRoZSBpbmFjdGl2aXR5IHRpbWVvdXQgb2YgezF9IG1zLiBTdG9wcGluZyB0aGUgY29ubmVjdGlvbi5cIlxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAodHlwZW9mICgkKSAhPT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgLy8gbm8galF1ZXJ5IVxyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihyZXNvdXJjZXMubm9qUXVlcnkpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBzaWduYWxSLFxyXG4gICAgICAgIF9jb25uZWN0aW9uLFxyXG4gICAgICAgIF9wYWdlTG9hZGVkID0gKHdpbmRvdy5kb2N1bWVudC5yZWFkeVN0YXRlID09PSBcImNvbXBsZXRlXCIpLFxyXG4gICAgICAgIF9wYWdlV2luZG93ID0gJCh3aW5kb3cpLFxyXG4gICAgICAgIF9uZWdvdGlhdGVBYm9ydFRleHQgPSBcIl9fTmVnb3RpYXRlIEFib3J0ZWRfX1wiLFxyXG4gICAgICAgIGV2ZW50cyA9IHtcclxuICAgICAgICAgICAgb25TdGFydDogXCJvblN0YXJ0XCIsXHJcbiAgICAgICAgICAgIG9uU3RhcnRpbmc6IFwib25TdGFydGluZ1wiLFxyXG4gICAgICAgICAgICBvblJlY2VpdmVkOiBcIm9uUmVjZWl2ZWRcIixcclxuICAgICAgICAgICAgb25FcnJvcjogXCJvbkVycm9yXCIsXHJcbiAgICAgICAgICAgIG9uQ29ubmVjdGlvblNsb3c6IFwib25Db25uZWN0aW9uU2xvd1wiLFxyXG4gICAgICAgICAgICBvblJlY29ubmVjdGluZzogXCJvblJlY29ubmVjdGluZ1wiLFxyXG4gICAgICAgICAgICBvblJlY29ubmVjdDogXCJvblJlY29ubmVjdFwiLFxyXG4gICAgICAgICAgICBvblN0YXRlQ2hhbmdlZDogXCJvblN0YXRlQ2hhbmdlZFwiLFxyXG4gICAgICAgICAgICBvbkRpc2Nvbm5lY3Q6IFwib25EaXNjb25uZWN0XCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFqYXhEZWZhdWx0cyA9IHtcclxuICAgICAgICAgICAgcHJvY2Vzc0RhdGE6IHRydWUsXHJcbiAgICAgICAgICAgIHRpbWVvdXQ6IG51bGwsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICBnbG9iYWw6IGZhbHNlLFxyXG4gICAgICAgICAgICBjYWNoZTogZmFsc2VcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxvZyA9IGZ1bmN0aW9uIChtc2csIGxvZ2dpbmcpIHtcclxuICAgICAgICAgICAgaWYgKGxvZ2dpbmcgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIG07XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgKHdpbmRvdy5jb25zb2xlKSA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG0gPSBcIltcIiArIG5ldyBEYXRlKCkudG9UaW1lU3RyaW5nKCkgKyBcIl0gU2lnbmFsUjogXCIgKyBtc2c7XHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cuY29uc29sZS5kZWJ1Zykge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmNvbnNvbGUuZGVidWcobSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAod2luZG93LmNvbnNvbGUubG9nKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuY29uc29sZS5sb2cobSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjaGFuZ2VTdGF0ZSA9IGZ1bmN0aW9uIChjb25uZWN0aW9uLCBleHBlY3RlZFN0YXRlLCBuZXdTdGF0ZSkge1xyXG4gICAgICAgICAgICBpZiAoZXhwZWN0ZWRTdGF0ZSA9PT0gY29ubmVjdGlvbi5zdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5zdGF0ZSA9IG5ld1N0YXRlO1xyXG5cclxuICAgICAgICAgICAgICAgICQoY29ubmVjdGlvbikudHJpZ2dlckhhbmRsZXIoZXZlbnRzLm9uU3RhdGVDaGFuZ2VkLCBbeyBvbGRTdGF0ZTogZXhwZWN0ZWRTdGF0ZSwgbmV3U3RhdGU6IG5ld1N0YXRlIH1dKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaXNEaXNjb25uZWN0aW5nID0gZnVuY3Rpb24gKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNvbm5lY3Rpb24uc3RhdGUgPT09IHNpZ25hbFIuY29ubmVjdGlvblN0YXRlLmRpc2Nvbm5lY3RlZDtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzdXBwb3J0c0tlZXBBbGl2ZSA9IGZ1bmN0aW9uIChjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjb25uZWN0aW9uLl8ua2VlcEFsaXZlRGF0YS5hY3RpdmF0ZWQgJiZcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24udHJhbnNwb3J0LnN1cHBvcnRzS2VlcEFsaXZlKGNvbm5lY3Rpb24pO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNvbmZpZ3VyZVN0b3BSZWNvbm5lY3RpbmdUaW1lb3V0ID0gZnVuY3Rpb24gKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgdmFyIHN0b3BSZWNvbm5lY3RpbmdUaW1lb3V0LFxyXG4gICAgICAgICAgICAgICAgb25SZWNvbm5lY3RUaW1lb3V0O1xyXG5cclxuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgdGhpcyBjb25uZWN0aW9uIGhhcyBhbHJlYWR5IGJlZW4gY29uZmlndXJlZCB0byBzdG9wIHJlY29ubmVjdGluZyBhZnRlciBhIHNwZWNpZmllZCB0aW1lb3V0LlxyXG4gICAgICAgICAgICAvLyBXaXRob3V0IHRoaXMgY2hlY2sgaWYgYSBjb25uZWN0aW9uIGlzIHN0b3BwZWQgdGhlbiBzdGFydGVkIGV2ZW50cyB3aWxsIGJlIGJvdW5kIG11bHRpcGxlIHRpbWVzLlxyXG4gICAgICAgICAgICBpZiAoIWNvbm5lY3Rpb24uXy5jb25maWd1cmVkU3RvcFJlY29ubmVjdGluZ1RpbWVvdXQpIHtcclxuICAgICAgICAgICAgICAgIG9uUmVjb25uZWN0VGltZW91dCA9IGZ1bmN0aW9uIChjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBzaWduYWxSLl8uZm9ybWF0KHNpZ25hbFIucmVzb3VyY2VzLnJlY29ubmVjdFRpbWVvdXQsIGNvbm5lY3Rpb24uZGlzY29ubmVjdFRpbWVvdXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoY29ubmVjdGlvbikudHJpZ2dlckhhbmRsZXIoZXZlbnRzLm9uRXJyb3IsIFtzaWduYWxSLl8uZXJyb3IobWVzc2FnZSwgLyogc291cmNlICovIFwiVGltZW91dEV4Y2VwdGlvblwiKV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uc3RvcCgvKiBhc3luYyAqLyBmYWxzZSwgLyogbm90aWZ5U2VydmVyICovIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5yZWNvbm5lY3RpbmcoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjb25uZWN0aW9uID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gR3VhcmQgYWdhaW5zdCBzdGF0ZSBjaGFuZ2luZyBpbiBhIHByZXZpb3VzIHVzZXIgZGVmaW5lZCBldmVuIGhhbmRsZXJcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY29ubmVjdGlvbi5zdGF0ZSA9PT0gc2lnbmFsUi5jb25uZWN0aW9uU3RhdGUucmVjb25uZWN0aW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0b3BSZWNvbm5lY3RpbmdUaW1lb3V0ID0gd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyBvblJlY29ubmVjdFRpbWVvdXQoY29ubmVjdGlvbik7IH0sIGNvbm5lY3Rpb24uZGlzY29ubmVjdFRpbWVvdXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uc3RhdGVDaGFuZ2VkKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEub2xkU3RhdGUgPT09IHNpZ25hbFIuY29ubmVjdGlvblN0YXRlLnJlY29ubmVjdGluZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBDbGVhciB0aGUgcGVuZGluZyByZWNvbm5lY3QgdGltZW91dCBjaGVja1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHN0b3BSZWNvbm5lY3RpbmdUaW1lb3V0KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLl8uY29uZmlndXJlZFN0b3BSZWNvbm5lY3RpbmdUaW1lb3V0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgc2lnbmFsUiA9IGZ1bmN0aW9uICh1cmwsIHFzLCBsb2dnaW5nKSB7XHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PkNyZWF0ZXMgYSBuZXcgU2lnbmFsUiBjb25uZWN0aW9uIGZvciB0aGUgZ2l2ZW4gdXJsPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInVybFwiIHR5cGU9XCJTdHJpbmdcIj5UaGUgVVJMIG9mIHRoZSBsb25nIHBvbGxpbmcgZW5kcG9pbnQ8L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInFzXCIgdHlwZT1cIk9iamVjdFwiPlxyXG4gICAgICAgIC8vLyAgICAgW09wdGlvbmFsXSBDdXN0b20gcXVlcnlzdHJpbmcgcGFyYW1ldGVycyB0byBhZGQgdG8gdGhlIGNvbm5lY3Rpb24gVVJMLlxyXG4gICAgICAgIC8vLyAgICAgSWYgYW4gb2JqZWN0LCBldmVyeSBub24tZnVuY3Rpb24gbWVtYmVyIHdpbGwgYmUgYWRkZWQgdG8gdGhlIHF1ZXJ5c3RyaW5nLlxyXG4gICAgICAgIC8vLyAgICAgSWYgYSBzdHJpbmcsIGl0J3MgYWRkZWQgdG8gdGhlIFFTIGFzIHNwZWNpZmllZC5cclxuICAgICAgICAvLy8gPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJsb2dnaW5nXCIgdHlwZT1cIkJvb2xlYW5cIj5cclxuICAgICAgICAvLy8gICAgIFtPcHRpb25hbF0gQSBmbGFnIGluZGljYXRpbmcgd2hldGhlciBjb25uZWN0aW9uIGxvZ2dpbmcgaXMgZW5hYmxlZCB0byB0aGUgYnJvd3NlclxyXG4gICAgICAgIC8vLyAgICAgY29uc29sZS9sb2cuIERlZmF1bHRzIHRvIGZhbHNlLlxyXG4gICAgICAgIC8vLyA8L3BhcmFtPlxyXG5cclxuICAgICAgICByZXR1cm4gbmV3IHNpZ25hbFIuZm4uaW5pdCh1cmwsIHFzLCBsb2dnaW5nKTtcclxuICAgIH07XHJcblxyXG4gICAgc2lnbmFsUi5fID0ge1xyXG4gICAgICAgIGRlZmF1bHRDb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7IGNoYXJzZXQ9VVRGLThcIixcclxuXHJcbiAgICAgICAgaWVWZXJzaW9uOiAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgdmVyc2lvbixcclxuICAgICAgICAgICAgICAgIG1hdGNoZXM7XHJcblxyXG4gICAgICAgICAgICBpZiAod2luZG93Lm5hdmlnYXRvci5hcHBOYW1lID09PSAnTWljcm9zb2Z0IEludGVybmV0IEV4cGxvcmVyJykge1xyXG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIHVzZXIgYWdlbnQgaGFzIHRoZSBwYXR0ZXJuIFwiTVNJRSAob25lIG9yIG1vcmUgbnVtYmVycykuKG9uZSBvciBtb3JlIG51bWJlcnMpXCI7XHJcbiAgICAgICAgICAgICAgICBtYXRjaGVzID0gL01TSUUgKFswLTldK1xcLlswLTldKykvLmV4ZWMod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChtYXRjaGVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmVyc2lvbiA9IHBhcnNlRmxvYXQobWF0Y2hlc1sxXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIHVuZGVmaW5lZCB2YWx1ZSBtZWFucyBub3QgSUVcclxuICAgICAgICAgICAgcmV0dXJuIHZlcnNpb247XHJcbiAgICAgICAgfSkoKSxcclxuXHJcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChtZXNzYWdlLCBzb3VyY2UsIGNvbnRleHQpIHtcclxuICAgICAgICAgICAgdmFyIGUgPSBuZXcgRXJyb3IobWVzc2FnZSkgYXMgYW55O1xyXG4gICAgICAgICAgICBlLnNvdXJjZSA9IHNvdXJjZTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgY29udGV4dCAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAgICAgZS5jb250ZXh0ID0gY29udGV4dDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGU7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdHJhbnNwb3J0RXJyb3I6IGZ1bmN0aW9uIChtZXNzYWdlLCB0cmFuc3BvcnQsIHNvdXJjZSwgY29udGV4dCkge1xyXG4gICAgICAgICAgICB2YXIgZSA9IHRoaXMuZXJyb3IobWVzc2FnZSwgc291cmNlLCBjb250ZXh0KTtcclxuICAgICAgICAgICAgZS50cmFuc3BvcnQgPSB0cmFuc3BvcnQgPyB0cmFuc3BvcnQubmFtZSA6IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgcmV0dXJuIGU7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZm9ybWF0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vLyA8c3VtbWFyeT5Vc2FnZTogZm9ybWF0KFwiSGkgezB9LCB5b3UgYXJlIHsxfSFcIiwgXCJGb29cIiwgMTAwKSA8L3N1bW1hcnk+XHJcbiAgICAgICAgICAgIHZhciBzID0gYXJndW1lbnRzWzBdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGggLSAxOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHMgPSBzLnJlcGxhY2UoXCJ7XCIgKyBpICsgXCJ9XCIsIGFyZ3VtZW50c1tpICsgMV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBzO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGZpcmVmb3hNYWpvclZlcnNpb246IGZ1bmN0aW9uICh1c2VyQWdlbnQpIHtcclxuICAgICAgICAgICAgLy8gRmlyZWZveCB1c2VyIGFnZW50czogaHR0cDovL3VzZXJhZ2VudHN0cmluZy5jb20vcGFnZXMvRmlyZWZveC9cclxuICAgICAgICAgICAgdmFyIG1hdGNoZXMgPSB1c2VyQWdlbnQubWF0Y2goL0ZpcmVmb3hcXC8oXFxkKykvKTtcclxuICAgICAgICAgICAgaWYgKCFtYXRjaGVzIHx8ICFtYXRjaGVzLmxlbmd0aCB8fCBtYXRjaGVzLmxlbmd0aCA8IDIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBwYXJzZUludChtYXRjaGVzWzFdLCAxMCAvKiByYWRpeCAqLyk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY29uZmlndXJlUGluZ0ludGVydmFsOiBmdW5jdGlvbiAoY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICB2YXIgY29uZmlnID0gY29ubmVjdGlvbi5fLmNvbmZpZyxcclxuICAgICAgICAgICAgICAgIG9uRmFpbCA9IGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICQoY29ubmVjdGlvbikudHJpZ2dlckhhbmRsZXIoZXZlbnRzLm9uRXJyb3IsIFtlcnJvcl0pO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjb25maWcgJiYgIWNvbm5lY3Rpb24uXy5waW5nSW50ZXJ2YWxJZCAmJiBjb25maWcucGluZ0ludGVydmFsKSB7XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLl8ucGluZ0ludGVydmFsSWQgPSB3aW5kb3cuc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNpZ25hbFIudHJhbnNwb3J0cy5fbG9naWMucGluZ1NlcnZlcihjb25uZWN0aW9uKS5mYWlsKG9uRmFpbCk7XHJcbiAgICAgICAgICAgICAgICB9LCBjb25maWcucGluZ0ludGVydmFsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgc2lnbmFsUi5ldmVudHMgPSBldmVudHM7XHJcblxyXG4gICAgc2lnbmFsUi5yZXNvdXJjZXMgPSByZXNvdXJjZXM7XHJcblxyXG4gICAgc2lnbmFsUi5hamF4RGVmYXVsdHMgPSBhamF4RGVmYXVsdHM7XHJcblxyXG4gICAgc2lnbmFsUi5jaGFuZ2VTdGF0ZSA9IGNoYW5nZVN0YXRlO1xyXG5cclxuICAgIHNpZ25hbFIuaXNEaXNjb25uZWN0aW5nID0gaXNEaXNjb25uZWN0aW5nO1xyXG5cclxuICAgIHNpZ25hbFIuY29ubmVjdGlvblN0YXRlID0ge1xyXG4gICAgICAgIGNvbm5lY3Rpbmc6IDAsXHJcbiAgICAgICAgY29ubmVjdGVkOiAxLFxyXG4gICAgICAgIHJlY29ubmVjdGluZzogMixcclxuICAgICAgICBkaXNjb25uZWN0ZWQ6IDRcclxuICAgIH07XHJcblxyXG4gICAgc2lnbmFsUi5odWIgPSB7XHJcbiAgICAgICAgc3RhcnQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8gVGhpcyB3aWxsIGdldCByZXBsYWNlZCB3aXRoIHRoZSByZWFsIGh1YiBjb25uZWN0aW9uIHN0YXJ0IG1ldGhvZCB3aGVuIGh1YnMgaXMgcmVmZXJlbmNlZCBjb3JyZWN0bHlcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU2lnbmFsUjogRXJyb3IgbG9hZGluZyBodWJzLiBFbnN1cmUgeW91ciBodWJzIHJlZmVyZW5jZSBpcyBjb3JyZWN0LCBlLmcuIDxzY3JpcHQgc3JjPScvc2lnbmFsci9qcyc+PC9zY3JpcHQ+LlwiKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIC5vbigpIHdhcyBhZGRlZCBpbiB2ZXJzaW9uIDEuNy4wLCAubG9hZCgpIHdhcyByZW1vdmVkIGluIHZlcnNpb24gMy4wLjAgc28gd2UgZmFsbGJhY2sgdG8gLmxvYWQoKSBpZiAub24oKSBkb2VzXHJcbiAgICAvLyBub3QgZXhpc3QgdG8gbm90IGJyZWFrIGV4aXN0aW5nIGFwcGxpY2F0aW9uc1xyXG4gICAgaWYgKHR5cGVvZiBfcGFnZVdpbmRvdy5vbiA9PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICBfcGFnZVdpbmRvdy5vbihcImxvYWRcIiwgZnVuY3Rpb24gKCkgeyBfcGFnZUxvYWRlZCA9IHRydWU7IH0pO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgX3BhZ2VXaW5kb3cubG9hZChmdW5jdGlvbiAoKSB7IF9wYWdlTG9hZGVkID0gdHJ1ZTsgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdmFsaWRhdGVUcmFuc3BvcnQocmVxdWVzdGVkVHJhbnNwb3J0LCBjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlZhbGlkYXRlcyB0aGUgcmVxdWVzdGVkIHRyYW5zcG9ydCBieSBjcm9zcyBjaGVja2luZyBpdCB3aXRoIHRoZSBwcmUtZGVmaW5lZCBzaWduYWxSLnRyYW5zcG9ydHM8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwicmVxdWVzdGVkVHJhbnNwb3J0XCIgdHlwZT1cIk9iamVjdFwiPlRoZSBkZXNpZ25hdGVkIHRyYW5zcG9ydHMgdGhhdCB0aGUgdXNlciBoYXMgc3BlY2lmaWVkLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiY29ubmVjdGlvblwiIHR5cGU9XCJzaWduYWxSXCI+VGhlIGNvbm5lY3Rpb24gdGhhdCB3aWxsIGJlIHVzaW5nIHRoZSByZXF1ZXN0ZWQgdHJhbnNwb3J0cy4gIFVzZWQgZm9yIGxvZ2dpbmcgcHVycG9zZXMuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnMgdHlwZT1cIk9iamVjdFwiIC8+XHJcblxyXG4gICAgICAgIGlmICgkLmlzQXJyYXkocmVxdWVzdGVkVHJhbnNwb3J0KSkge1xyXG4gICAgICAgICAgICAvLyBHbyB0aHJvdWdoIHRyYW5zcG9ydCBhcnJheSBhbmQgcmVtb3ZlIGFuIFwiaW52YWxpZFwiIHRyYW5wb3J0c1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gcmVxdWVzdGVkVHJhbnNwb3J0Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdHJhbnNwb3J0ID0gcmVxdWVzdGVkVHJhbnNwb3J0W2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKCQudHlwZSh0cmFuc3BvcnQpICE9PSBcInN0cmluZ1wiIHx8ICFzaWduYWxSLnRyYW5zcG9ydHNbdHJhbnNwb3J0XSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKFwiSW52YWxpZCB0cmFuc3BvcnQ6IFwiICsgdHJhbnNwb3J0ICsgXCIsIHJlbW92aW5nIGl0IGZyb20gdGhlIHRyYW5zcG9ydHMgbGlzdC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdGVkVHJhbnNwb3J0LnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gVmVyaWZ5IHdlIHN0aWxsIGhhdmUgdHJhbnNwb3J0cyBsZWZ0LCBpZiB3ZSBkb250IHRoZW4gd2UgaGF2ZSBpbnZhbGlkIHRyYW5zcG9ydHNcclxuICAgICAgICAgICAgaWYgKHJlcXVlc3RlZFRyYW5zcG9ydC5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKFwiTm8gdHJhbnNwb3J0cyByZW1haW4gd2l0aGluIHRoZSBzcGVjaWZpZWQgdHJhbnNwb3J0IGFycmF5LlwiKTtcclxuICAgICAgICAgICAgICAgIHJlcXVlc3RlZFRyYW5zcG9ydCA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKCFzaWduYWxSLnRyYW5zcG9ydHNbcmVxdWVzdGVkVHJhbnNwb3J0XSAmJiByZXF1ZXN0ZWRUcmFuc3BvcnQgIT09IFwiYXV0b1wiKSB7XHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKFwiSW52YWxpZCB0cmFuc3BvcnQ6IFwiICsgcmVxdWVzdGVkVHJhbnNwb3J0LnRvU3RyaW5nKCkgKyBcIi5cIik7XHJcbiAgICAgICAgICAgIHJlcXVlc3RlZFRyYW5zcG9ydCA9IG51bGw7XHJcbiAgICAgICAgfSBlbHNlIGlmIChyZXF1ZXN0ZWRUcmFuc3BvcnQgPT09IFwiYXV0b1wiICYmIHNpZ25hbFIuXy5pZVZlcnNpb24gPD0gOCkge1xyXG4gICAgICAgICAgICAvLyBJZiB3ZSdyZSBkb2luZyBhbiBhdXRvIHRyYW5zcG9ydCBhbmQgd2UncmUgSUU4IHRoZW4gZm9yY2UgbG9uZ1BvbGxpbmcsICMxNzY0XHJcbiAgICAgICAgICAgIHJldHVybiBbXCJsb25nUG9sbGluZ1wiXTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcmVxdWVzdGVkVHJhbnNwb3J0O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldERlZmF1bHRQb3J0KHByb3RvY29sKSB7XHJcbiAgICAgICAgaWYgKHByb3RvY29sID09PSBcImh0dHA6XCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDgwO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocHJvdG9jb2wgPT09IFwiaHR0cHM6XCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDQ0MztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkRGVmYXVsdFBvcnQocHJvdG9jb2wsIHVybCkge1xyXG4gICAgICAgIC8vIFJlbW92ZSBwb3J0cyAgZnJvbSB1cmwuICBXZSBoYXZlIHRvIGNoZWNrIGlmIHRoZXJlJ3MgYSAvIG9yIGVuZCBvZiBsaW5lXHJcbiAgICAgICAgLy8gZm9sbG93aW5nIHRoZSBwb3J0IGluIG9yZGVyIHRvIGF2b2lkIHJlbW92aW5nIHBvcnRzIHN1Y2ggYXMgODA4MC5cclxuICAgICAgICBpZiAodXJsLm1hdGNoKC86XFxkKyQvKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdXJsO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1cmwgKyBcIjpcIiArIGdldERlZmF1bHRQb3J0KHByb3RvY29sKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gQ29ubmVjdGluZ01lc3NhZ2VCdWZmZXIoY29ubmVjdGlvbiwgZHJhaW5DYWxsYmFjaykge1xyXG4gICAgICAgIHZhciB0aGF0ID0gdGhpcyxcclxuICAgICAgICAgICAgYnVmZmVyID0gW107XHJcblxyXG4gICAgICAgIHRoYXQudHJ5QnVmZmVyID0gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgaWYgKGNvbm5lY3Rpb24uc3RhdGUgPT09ICQuc2lnbmFsUi5jb25uZWN0aW9uU3RhdGUuY29ubmVjdGluZykge1xyXG4gICAgICAgICAgICAgICAgYnVmZmVyLnB1c2gobWVzc2FnZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGF0LmRyYWluID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyBFbnN1cmUgdGhhdCB0aGUgY29ubmVjdGlvbiBpcyBjb25uZWN0ZWQgd2hlbiB3ZSBkcmFpbiAoZG8gbm90IHdhbnQgdG8gZHJhaW4gd2hpbGUgYSBjb25uZWN0aW9uIGlzIG5vdCBhY3RpdmUpXHJcbiAgICAgICAgICAgIGlmIChjb25uZWN0aW9uLnN0YXRlID09PSAkLnNpZ25hbFIuY29ubmVjdGlvblN0YXRlLmNvbm5lY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgd2hpbGUgKGJ1ZmZlci5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZHJhaW5DYWxsYmFjayhidWZmZXIuc2hpZnQoKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGF0LmNsZWFyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBidWZmZXIgPSBbXTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHNpZ25hbFIuZm4gPSBzaWduYWxSLnByb3RvdHlwZSA9IHtcclxuICAgICAgICBpbml0OiBmdW5jdGlvbiAodXJsLCBxcywgbG9nZ2luZykge1xyXG4gICAgICAgICAgICB2YXIgJGNvbm5lY3Rpb24gPSAkKHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy51cmwgPSB1cmw7XHJcbiAgICAgICAgICAgIHRoaXMucXMgPSBxcztcclxuICAgICAgICAgICAgdGhpcy5sYXN0RXJyb3IgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLl8gPSB7XHJcbiAgICAgICAgICAgICAgICBrZWVwQWxpdmVEYXRhOiB7fSxcclxuICAgICAgICAgICAgICAgIGNvbm5lY3RpbmdNZXNzYWdlQnVmZmVyOiBuZXcgQ29ubmVjdGluZ01lc3NhZ2VCdWZmZXIodGhpcywgZnVuY3Rpb24gKG1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAkY29ubmVjdGlvbi50cmlnZ2VySGFuZGxlcihldmVudHMub25SZWNlaXZlZCwgW21lc3NhZ2VdKTtcclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgbGFzdE1lc3NhZ2VBdDogbmV3IERhdGUoKS5nZXRUaW1lKCksXHJcbiAgICAgICAgICAgICAgICBsYXN0QWN0aXZlQXQ6IG5ldyBEYXRlKCkuZ2V0VGltZSgpLFxyXG4gICAgICAgICAgICAgICAgYmVhdEludGVydmFsOiA1MDAwLCAvLyBEZWZhdWx0IHZhbHVlLCB3aWxsIG9ubHkgYmUgb3ZlcnJpZGRlbiBpZiBrZWVwIGFsaXZlIGlzIGVuYWJsZWQsXHJcbiAgICAgICAgICAgICAgICBiZWF0SGFuZGxlOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgdG90YWxUcmFuc3BvcnRDb25uZWN0VGltZW91dDogMCAvLyBUaGlzIHdpbGwgYmUgdGhlIHN1bSBvZiB0aGUgVHJhbnNwb3J0Q29ubmVjdFRpbWVvdXQgc2VudCBpbiByZXNwb25zZSB0byBuZWdvdGlhdGUgYW5kIGNvbm5lY3Rpb24udHJhbnNwb3J0Q29ubmVjdFRpbWVvdXRcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiAobG9nZ2luZykgPT09IFwiYm9vbGVhblwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2dpbmcgPSBsb2dnaW5nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgX3BhcnNlUmVzcG9uc2U6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHJlc3BvbnNlID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5qc29uLnBhcnNlKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIF9vcmlnaW5hbEpzb246IEpTT04sXHJcblxyXG4gICAgICAgIGpzb246IEpTT04sXHJcblxyXG4gICAgICAgIGlzQ3Jvc3NEb21haW46IGZ1bmN0aW9uICh1cmwsIGFnYWluc3QpIHtcclxuICAgICAgICAgICAgLy8vIDxzdW1tYXJ5PkNoZWNrcyBpZiB1cmwgaXMgY3Jvc3MgZG9tYWluPC9zdW1tYXJ5PlxyXG4gICAgICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ1cmxcIiB0eXBlPVwiU3RyaW5nXCI+VGhlIGJhc2UgVVJMPC9wYXJhbT5cclxuICAgICAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiYWdhaW5zdFwiIHR5cGU9XCJPYmplY3RcIj5cclxuICAgICAgICAgICAgLy8vICAgICBBbiBvcHRpb25hbCBhcmd1bWVudCB0byBjb21wYXJlIHRoZSBVUkwgYWdhaW5zdCwgaWYgbm90IHNwZWNpZmllZCBpdCB3aWxsIGJlIHNldCB0byB3aW5kb3cubG9jYXRpb24uXHJcbiAgICAgICAgICAgIC8vLyAgICAgSWYgc3BlY2lmaWVkIGl0IG11c3QgY29udGFpbiBhIHByb3RvY29sIGFuZCBhIGhvc3QgcHJvcGVydHkuXHJcbiAgICAgICAgICAgIC8vLyA8L3BhcmFtPlxyXG4gICAgICAgICAgICB2YXIgbGluaztcclxuXHJcbiAgICAgICAgICAgIHVybCA9ICQudHJpbSh1cmwpO1xyXG5cclxuICAgICAgICAgICAgYWdhaW5zdCA9IGFnYWluc3QgfHwgd2luZG93LmxvY2F0aW9uO1xyXG5cclxuICAgICAgICAgICAgaWYgKHVybC5pbmRleE9mKFwiaHR0cFwiKSAhPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBDcmVhdGUgYW4gYW5jaG9yIHRhZy5cclxuICAgICAgICAgICAgbGluayA9IHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcclxuICAgICAgICAgICAgbGluay5ocmVmID0gdXJsO1xyXG5cclxuICAgICAgICAgICAgLy8gV2hlbiBjaGVja2luZyBmb3IgY3Jvc3MgZG9tYWluIHdlIGhhdmUgdG8gc3BlY2lhbCBjYXNlIHBvcnQgODAgYmVjYXVzZSB0aGUgd2luZG93LmxvY2F0aW9uIHdpbGwgcmVtb3ZlIHRoZVxyXG4gICAgICAgICAgICByZXR1cm4gbGluay5wcm90b2NvbCArIGFkZERlZmF1bHRQb3J0KGxpbmsucHJvdG9jb2wsIGxpbmsuaG9zdCkgIT09IGFnYWluc3QucHJvdG9jb2wgKyBhZGREZWZhdWx0UG9ydChhZ2FpbnN0LnByb3RvY29sLCBhZ2FpbnN0Lmhvc3QpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGFqYXhEYXRhVHlwZTogXCJ0ZXh0XCIsXHJcblxyXG4gICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9VVRGLThcIixcclxuXHJcbiAgICAgICAgbG9nZ2luZzogZmFsc2UsXHJcblxyXG4gICAgICAgIHN0YXRlOiBzaWduYWxSLmNvbm5lY3Rpb25TdGF0ZS5kaXNjb25uZWN0ZWQsXHJcblxyXG4gICAgICAgIGNsaWVudFByb3RvY29sOiBcIjEuNVwiLFxyXG5cclxuICAgICAgICByZWNvbm5lY3REZWxheTogMjAwMCxcclxuXHJcbiAgICAgICAgdHJhbnNwb3J0Q29ubmVjdFRpbWVvdXQ6IDAsXHJcblxyXG4gICAgICAgIGRpc2Nvbm5lY3RUaW1lb3V0OiAzMDAwMCwgLy8gVGhpcyBzaG91bGQgYmUgc2V0IGJ5IHRoZSBzZXJ2ZXIgaW4gcmVzcG9uc2UgdG8gdGhlIG5lZ290aWF0ZSByZXF1ZXN0ICgzMHMgZGVmYXVsdClcclxuXHJcbiAgICAgICAgcmVjb25uZWN0V2luZG93OiAzMDAwMCwgLy8gVGhpcyBzaG91bGQgYmUgc2V0IGJ5IHRoZSBzZXJ2ZXIgaW4gcmVzcG9uc2UgdG8gdGhlIG5lZ290aWF0ZSByZXF1ZXN0XHJcblxyXG4gICAgICAgIGtlZXBBbGl2ZVdhcm5BdDogMiAvIDMsIC8vIFdhcm4gdXNlciBvZiBzbG93IGNvbm5lY3Rpb24gaWYgd2UgYnJlYWNoIHRoZSBYJSBtYXJrIG9mIHRoZSBrZWVwIGFsaXZlIHRpbWVvdXRcclxuXHJcbiAgICAgICAgc3RhcnQ6IGZ1bmN0aW9uIChvcHRpb25zLCBjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAvLy8gPHN1bW1hcnk+U3RhcnRzIHRoZSBjb25uZWN0aW9uPC9zdW1tYXJ5PlxyXG4gICAgICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJvcHRpb25zXCIgdHlwZT1cIk9iamVjdFwiPk9wdGlvbnMgbWFwPC9wYXJhbT5cclxuICAgICAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiY2FsbGJhY2tcIiB0eXBlPVwiRnVuY3Rpb25cIj5BIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgY29ubmVjdGlvbiBoYXMgc3RhcnRlZDwvcGFyYW0+XHJcbiAgICAgICAgICAgIHZhciBjb25uZWN0aW9uID0gdGhpcyxcclxuICAgICAgICAgICAgICAgIGNvbmZpZyA9IHtcclxuICAgICAgICAgICAgICAgICAgICBwaW5nSW50ZXJ2YWw6IDMwMDAwMCxcclxuICAgICAgICAgICAgICAgICAgICB3YWl0Rm9yUGFnZUxvYWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNwb3J0OiBcImF1dG9cIixcclxuICAgICAgICAgICAgICAgICAgICBqc29ucDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgfSBhcyBhbnksXHJcbiAgICAgICAgICAgICAgICBpbml0aWFsaXplLFxyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQgPSBjb25uZWN0aW9uLl9kZWZlcnJhbCB8fCAkLkRlZmVycmVkKCksIC8vIENoZWNrIHRvIHNlZSBpZiB0aGVyZSBpcyBhIHByZS1leGlzdGluZyBkZWZlcnJhbCB0aGF0J3MgYmVpbmcgYnVpbHQgb24sIGlmIHNvIHdlIHdhbnQgdG8ga2VlcCB1c2luZyBpdFxyXG4gICAgICAgICAgICAgICAgcGFyc2VyID0gd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xyXG5cclxuICAgICAgICAgICAgY29ubmVjdGlvbi5sYXN0RXJyb3IgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgLy8gUGVyc2lzdCB0aGUgZGVmZXJyYWwgc28gdGhhdCBpZiBzdGFydCBpcyBjYWxsZWQgbXVsdGlwbGUgdGltZXMgdGhlIHNhbWUgZGVmZXJyYWwgaXMgdXNlZC5cclxuICAgICAgICAgICAgY29ubmVjdGlvbi5fZGVmZXJyYWwgPSBkZWZlcnJlZDtcclxuXHJcbiAgICAgICAgICAgIGlmICghY29ubmVjdGlvbi5qc29uKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBubyBKU09OIVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU2lnbmFsUjogTm8gSlNPTiBwYXJzZXIgZm91bmQuIFBsZWFzZSBlbnN1cmUganNvbjIuanMgaXMgcmVmZXJlbmNlZCBiZWZvcmUgdGhlIFNpZ25hbFIuanMgZmlsZSBpZiB5b3UgbmVlZCB0byBzdXBwb3J0IGNsaWVudHMgd2l0aG91dCBuYXRpdmUgSlNPTiBwYXJzaW5nIHN1cHBvcnQsIGUuZy4gSUU8OC5cIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICgkLnR5cGUob3B0aW9ucykgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgICAgICAgLy8gU3VwcG9ydCBjYWxsaW5nIHdpdGggc2luZ2xlIGNhbGxiYWNrIHBhcmFtZXRlclxyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgPSBvcHRpb25zO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCQudHlwZShvcHRpb25zKSA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgJC5leHRlbmQoY29uZmlnLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgICAgIGlmICgkLnR5cGUoY29uZmlnLmNhbGxiYWNrKSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sgPSBjb25maWcuY2FsbGJhY2s7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbmZpZy50cmFuc3BvcnQgPSB2YWxpZGF0ZVRyYW5zcG9ydChjb25maWcudHJhbnNwb3J0LCBjb25uZWN0aW9uKTtcclxuXHJcbiAgICAgICAgICAgIC8vIElmIHRoZSB0cmFuc3BvcnQgaXMgaW52YWxpZCB0aHJvdyBhbiBlcnJvciBhbmQgYWJvcnQgc3RhcnRcclxuICAgICAgICAgICAgaWYgKCFjb25maWcudHJhbnNwb3J0KSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJTaWduYWxSOiBJbnZhbGlkIHRyYW5zcG9ydChzKSBzcGVjaWZpZWQsIGFib3J0aW5nIHN0YXJ0LlwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29ubmVjdGlvbi5fLmNvbmZpZyA9IGNvbmZpZztcclxuXHJcbiAgICAgICAgICAgIC8vIENoZWNrIHRvIHNlZSBpZiBzdGFydCBpcyBiZWluZyBjYWxsZWQgcHJpb3IgdG8gcGFnZSBsb2FkXHJcbiAgICAgICAgICAgIC8vIElmIHdhaXRGb3JQYWdlTG9hZCBpcyB0cnVlIHdlIHRoZW4gd2FudCB0byByZS1kaXJlY3QgZnVuY3Rpb24gY2FsbCB0byB0aGUgd2luZG93IGxvYWQgZXZlbnRcclxuICAgICAgICAgICAgaWYgKCFfcGFnZUxvYWRlZCAmJiBjb25maWcud2FpdEZvclBhZ2VMb2FkID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLl8uZGVmZXJyZWRTdGFydEhhbmRsZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5zdGFydChvcHRpb25zLCBjYWxsYmFjayk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgX3BhZ2VXaW5kb3cuYmluZChcImxvYWRcIiwgY29ubmVjdGlvbi5fLmRlZmVycmVkU3RhcnRIYW5kbGVyKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBJZiB3ZSdyZSBhbHJlYWR5IGNvbm5lY3RpbmcganVzdCByZXR1cm4gdGhlIHNhbWUgZGVmZXJyYWwgYXMgdGhlIG9yaWdpbmFsIGNvbm5lY3Rpb24gc3RhcnRcclxuICAgICAgICAgICAgaWYgKGNvbm5lY3Rpb24uc3RhdGUgPT09IHNpZ25hbFIuY29ubmVjdGlvblN0YXRlLmNvbm5lY3RpbmcpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2hhbmdlU3RhdGUoY29ubmVjdGlvbixcclxuICAgICAgICAgICAgICAgIHNpZ25hbFIuY29ubmVjdGlvblN0YXRlLmRpc2Nvbm5lY3RlZCxcclxuICAgICAgICAgICAgICAgIHNpZ25hbFIuY29ubmVjdGlvblN0YXRlLmNvbm5lY3RpbmcpID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gV2UncmUgbm90IGNvbm5lY3Rpbmcgc28gdHJ5IGFuZCB0cmFuc2l0aW9uIGludG8gY29ubmVjdGluZy5cclxuICAgICAgICAgICAgICAgIC8vIElmIHdlIGZhaWwgdG8gdHJhbnNpdGlvbiB0aGVuIHdlJ3JlIGVpdGhlciBpbiBjb25uZWN0ZWQgb3IgcmVjb25uZWN0aW5nLlxyXG5cclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoY29ubmVjdGlvbik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25maWd1cmVTdG9wUmVjb25uZWN0aW5nVGltZW91dChjb25uZWN0aW9uKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFJlc29sdmUgdGhlIGZ1bGwgdXJsXHJcbiAgICAgICAgICAgIHBhcnNlci5ocmVmID0gY29ubmVjdGlvbi51cmw7XHJcbiAgICAgICAgICAgIGlmICghcGFyc2VyLnByb3RvY29sIHx8IHBhcnNlci5wcm90b2NvbCA9PT0gXCI6XCIpIHtcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ucHJvdG9jb2wgPSB3aW5kb3cuZG9jdW1lbnQubG9jYXRpb24ucHJvdG9jb2w7XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmhvc3QgPSBwYXJzZXIuaG9zdCB8fCB3aW5kb3cuZG9jdW1lbnQubG9jYXRpb24uaG9zdDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ucHJvdG9jb2wgPSBwYXJzZXIucHJvdG9jb2w7XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmhvc3QgPSBwYXJzZXIuaG9zdDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29ubmVjdGlvbi5iYXNlVXJsID0gY29ubmVjdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIGNvbm5lY3Rpb24uaG9zdDtcclxuXHJcbiAgICAgICAgICAgIC8vIFNldCB0aGUgd2Vic29ja2V0IHByb3RvY29sXHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ud3NQcm90b2NvbCA9IGNvbm5lY3Rpb24ucHJvdG9jb2wgPT09IFwiaHR0cHM6XCIgPyBcIndzczovL1wiIDogXCJ3czovL1wiO1xyXG5cclxuICAgICAgICAgICAgLy8gSWYganNvbnAgd2l0aCBuby9hdXRvIHRyYW5zcG9ydCBpcyBzcGVjaWZpZWQsIHRoZW4gc2V0IHRoZSB0cmFuc3BvcnQgdG8gbG9uZyBwb2xsaW5nXHJcbiAgICAgICAgICAgIC8vIHNpbmNlIHRoYXQgaXMgdGhlIG9ubHkgdHJhbnNwb3J0IGZvciB3aGljaCBqc29ucCByZWFsbHkgbWFrZXMgc2Vuc2UuXHJcbiAgICAgICAgICAgIC8vIFNvbWUgZGV2ZWxvcGVycyBtaWdodCBhY3R1YWxseSBjaG9vc2UgdG8gc3BlY2lmeSBqc29ucCBmb3Igc2FtZSBvcmlnaW4gcmVxdWVzdHNcclxuICAgICAgICAgICAgLy8gYXMgZGVtb25zdHJhdGVkIGJ5IElzc3VlICM2MjMuXHJcbiAgICAgICAgICAgIGlmIChjb25maWcudHJhbnNwb3J0ID09PSBcImF1dG9cIiAmJiBjb25maWcuanNvbnAgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIGNvbmZpZy50cmFuc3BvcnQgPSBcImxvbmdQb2xsaW5nXCI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIElmIHRoZSB1cmwgaXMgcHJvdG9jb2wgcmVsYXRpdmUsIHByZXBlbmQgdGhlIGN1cnJlbnQgd2luZG93cyBwcm90b2NvbCB0byB0aGUgdXJsLlxyXG4gICAgICAgICAgICBpZiAoY29ubmVjdGlvbi51cmwuaW5kZXhPZihcIi8vXCIpID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnVybCA9IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCArIGNvbm5lY3Rpb24udXJsO1xyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5sb2coXCJQcm90b2NvbCByZWxhdGl2ZSBVUkwgZGV0ZWN0ZWQsIG5vcm1hbGl6aW5nIGl0IHRvICdcIiArIGNvbm5lY3Rpb24udXJsICsgXCInLlwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNDcm9zc0RvbWFpbihjb25uZWN0aW9uLnVybCkpIHtcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKFwiQXV0byBkZXRlY3RlZCBjcm9zcyBkb21haW4gdXJsLlwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY29uZmlnLnRyYW5zcG9ydCA9PT0gXCJhdXRvXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBTdXBwb3J0IFhETSB3aXRoIGZvcmV2ZXJGcmFtZVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZy50cmFuc3BvcnQgPSBbXCJ3ZWJTb2NrZXRzXCIsIFwic2VydmVyU2VudEV2ZW50c1wiLCBcImxvbmdQb2xsaW5nXCJdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMpID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnLndpdGhDcmVkZW50aWFscyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gRGV0ZXJtaW5lIGlmIGpzb25wIGlzIHRoZSBvbmx5IGNob2ljZSBmb3IgbmVnb3RpYXRpb24sIGFqYXhTZW5kIGFuZCBhamF4QWJvcnQuXHJcbiAgICAgICAgICAgICAgICAvLyBpLmUuIGlmIHRoZSBicm93c2VyIGRvZXNuJ3Qgc3VwcG9ydHMgQ09SU1xyXG4gICAgICAgICAgICAgICAgLy8gSWYgaXQgaXMsIGlnbm9yZSBhbnkgcHJlZmVyZW5jZSB0byB0aGUgY29udHJhcnksIGFuZCBzd2l0Y2ggdG8ganNvbnAuXHJcbiAgICAgICAgICAgICAgICBpZiAoIWNvbmZpZy5qc29ucCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZy5qc29ucCA9ICEkLnN1cHBvcnQuY29ycztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbmZpZy5qc29ucCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmxvZyhcIlVzaW5nIGpzb25wIGJlY2F1c2UgdGhpcyBicm93c2VyIGRvZXNuJ3Qgc3VwcG9ydCBDT1JTLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5jb250ZW50VHlwZSA9IHNpZ25hbFIuXy5kZWZhdWx0Q29udGVudFR5cGU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ud2l0aENyZWRlbnRpYWxzID0gY29uZmlnLndpdGhDcmVkZW50aWFscztcclxuXHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24uYWpheERhdGFUeXBlID0gY29uZmlnLmpzb25wID8gXCJqc29ucFwiIDogXCJ0ZXh0XCI7XHJcblxyXG4gICAgICAgICAgICAkKGNvbm5lY3Rpb24pLmJpbmQoZXZlbnRzLm9uU3RhcnQsIGZ1bmN0aW9uIChlLCBkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJC50eXBlKGNhbGxiYWNrKSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbChjb25uZWN0aW9uKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoY29ubmVjdGlvbik7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgY29ubmVjdGlvbi5fLmluaXRIYW5kbGVyID0gc2lnbmFsUi50cmFuc3BvcnRzLl9sb2dpYy5pbml0SGFuZGxlcihjb25uZWN0aW9uKTtcclxuXHJcbiAgICAgICAgICAgIGluaXRpYWxpemUgPSBmdW5jdGlvbiAodHJhbnNwb3J0cywgaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBub1RyYW5zcG9ydEVycm9yID0gc2lnbmFsUi5fLmVycm9yKHJlc291cmNlcy5ub1RyYW5zcG9ydE9uSW5pdCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaW5kZXggPSBpbmRleCB8fCAwO1xyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID49IHRyYW5zcG9ydHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKFwiTm8gdHJhbnNwb3J0cyBzdXBwb3J0ZWQgYnkgdGhlIHNlcnZlciB3ZXJlIHNlbGVjdGVkLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGluZGV4ID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKFwiTm8gZmFsbGJhY2sgdHJhbnNwb3J0cyB3ZXJlIHNlbGVjdGVkLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmxvZyhcIkZhbGxiYWNrIHRyYW5zcG9ydHMgZXhoYXVzdGVkLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIE5vIHRyYW5zcG9ydCBpbml0aWFsaXplZCBzdWNjZXNzZnVsbHlcclxuICAgICAgICAgICAgICAgICAgICAkKGNvbm5lY3Rpb24pLnRyaWdnZXJIYW5kbGVyKGV2ZW50cy5vbkVycm9yLCBbbm9UcmFuc3BvcnRFcnJvcl0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChub1RyYW5zcG9ydEVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBTdG9wIHRoZSBjb25uZWN0aW9uIGlmIGl0IGhhcyBjb25uZWN0ZWQgYW5kIG1vdmUgaXQgaW50byB0aGUgZGlzY29ubmVjdGVkIHN0YXRlXHJcbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5zdG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFRoZSBjb25uZWN0aW9uIHdhcyBhYm9ydGVkXHJcbiAgICAgICAgICAgICAgICBpZiAoY29ubmVjdGlvbi5zdGF0ZSA9PT0gc2lnbmFsUi5jb25uZWN0aW9uU3RhdGUuZGlzY29ubmVjdGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHZhciB0cmFuc3BvcnROYW1lID0gdHJhbnNwb3J0c1tpbmRleF0sXHJcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNwb3J0ID0gc2lnbmFsUi50cmFuc3BvcnRzW3RyYW5zcG9ydE5hbWVdLFxyXG4gICAgICAgICAgICAgICAgICAgIG9uRmFsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxpemUodHJhbnNwb3J0cywgaW5kZXggKyAxKTtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24udHJhbnNwb3J0ID0gdHJhbnNwb3J0O1xyXG5cclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5fLmluaXRIYW5kbGVyLnN0YXJ0KHRyYW5zcG9ydCwgZnVuY3Rpb24gKCkgeyAvLyBzdWNjZXNzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZpcmVmb3ggMTErIGRvZXNuJ3QgYWxsb3cgc3luYyBYSFIgd2l0aENyZWRlbnRpYWxzOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvWE1MSHR0cFJlcXVlc3Qjd2l0aENyZWRlbnRpYWxzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpc0ZpcmVmb3gxMU9yR3JlYXRlciA9IHNpZ25hbFIuXy5maXJlZm94TWFqb3JWZXJzaW9uKHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50KSA+PSAxMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzeW5jQWJvcnQgPSAhIWNvbm5lY3Rpb24ud2l0aENyZWRlbnRpYWxzICYmIGlzRmlyZWZveDExT3JHcmVhdGVyO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5sb2coXCJUaGUgc3RhcnQgcmVxdWVzdCBzdWNjZWVkZWQuIFRyYW5zaXRpb25pbmcgdG8gdGhlIGNvbm5lY3RlZCBzdGF0ZS5cIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3VwcG9ydHNLZWVwQWxpdmUoY29ubmVjdGlvbikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25hbFIudHJhbnNwb3J0cy5fbG9naWMubW9uaXRvcktlZXBBbGl2ZShjb25uZWN0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2lnbmFsUi50cmFuc3BvcnRzLl9sb2dpYy5zdGFydEhlYXJ0YmVhdChjb25uZWN0aW9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFVzZWQgdG8gZW5zdXJlIGxvdyBhY3Rpdml0eSBjbGllbnRzIG1haW50YWluIHRoZWlyIGF1dGhlbnRpY2F0aW9uLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBNdXN0IGJlIGNvbmZpZ3VyZWQgb25jZSBhIHRyYW5zcG9ydCBoYXMgYmVlbiBkZWNpZGVkIHRvIHBlcmZvcm0gdmFsaWQgcGluZyByZXF1ZXN0cy5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2lnbmFsUi5fLmNvbmZpZ3VyZVBpbmdJbnRlcnZhbChjb25uZWN0aW9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY2hhbmdlU3RhdGUoY29ubmVjdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25hbFIuY29ubmVjdGlvblN0YXRlLmNvbm5lY3RpbmcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaWduYWxSLmNvbm5lY3Rpb25TdGF0ZS5jb25uZWN0ZWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmxvZyhcIldBUk5JTkchIFRoZSBjb25uZWN0aW9uIHdhcyBub3QgaW4gdGhlIGNvbm5lY3Rpbmcgc3RhdGUuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBEcmFpbiBhbnkgaW5jb21pbmcgYnVmZmVyZWQgbWVzc2FnZXMgKG1lc3NhZ2VzIHRoYXQgY2FtZSBpbiBwcmlvciB0byBjb25uZWN0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLl8uY29ubmVjdGluZ01lc3NhZ2VCdWZmZXIuZHJhaW4oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoY29ubmVjdGlvbikudHJpZ2dlckhhbmRsZXIoZXZlbnRzLm9uU3RhcnQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gd2lyZSB0aGUgc3RvcCBoYW5kbGVyIGZvciB3aGVuIHRoZSB1c2VyIGxlYXZlcyB0aGUgcGFnZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfcGFnZVdpbmRvdy5iaW5kKFwidW5sb2FkXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKFwiV2luZG93IHVubG9hZGluZywgc3RvcHBpbmcgdGhlIGNvbm5lY3Rpb24uXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uc3RvcChhc3luY0Fib3J0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNGaXJlZm94MTFPckdyZWF0ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZpcmVmb3ggZG9lcyBub3QgZmlyZSBjcm9zcy1kb21haW4gWEhScyBpbiB0aGUgbm9ybWFsIHVubG9hZCBoYW5kbGVyIG9uIHRhYiBjbG9zZS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICMyNDAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcGFnZVdpbmRvdy5iaW5kKFwiYmVmb3JldW5sb2FkXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJZiBjb25uZWN0aW9uLnN0b3AoKSBydW5zIHJ1bnMgaW4gYmVmb3JldW5sb2FkIGFuZCBmYWlscywgaXQgd2lsbCBhbHNvIGZhaWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpbiB1bmxvYWQgdW5sZXNzIGNvbm5lY3Rpb24uc3RvcCgpIHJ1bnMgYWZ0ZXIgYSB0aW1lb3V0LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5zdG9wKGFzeW5jQWJvcnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LCBvbkZhbGxiYWNrKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKHRyYW5zcG9ydC5uYW1lICsgXCIgdHJhbnNwb3J0IHRocmV3ICdcIiArIGVycm9yLm1lc3NhZ2UgKyBcIicgd2hlbiBhdHRlbXB0aW5nIHRvIHN0YXJ0LlwiKTtcclxuICAgICAgICAgICAgICAgICAgICBvbkZhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgdXJsID0gY29ubmVjdGlvbi51cmwgKyBcIi9uZWdvdGlhdGVcIixcclxuICAgICAgICAgICAgICAgIG9uRmFpbGVkID0gZnVuY3Rpb24gKGVycm9yLCBjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVyciA9IHNpZ25hbFIuXy5lcnJvcihyZXNvdXJjZXMuZXJyb3JPbk5lZ290aWF0ZSwgZXJyb3IsIGNvbm5lY3Rpb24uXy5uZWdvdGlhdGVSZXF1ZXN0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJChjb25uZWN0aW9uKS50cmlnZ2VySGFuZGxlcihldmVudHMub25FcnJvciwgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBTdG9wIHRoZSBjb25uZWN0aW9uIGlmIG5lZ290aWF0ZSBmYWlsZWRcclxuICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnN0b3AoKTtcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAkKGNvbm5lY3Rpb24pLnRyaWdnZXJIYW5kbGVyKGV2ZW50cy5vblN0YXJ0aW5nKTtcclxuXHJcbiAgICAgICAgICAgIHVybCA9IHNpZ25hbFIudHJhbnNwb3J0cy5fbG9naWMucHJlcGFyZVF1ZXJ5U3RyaW5nKGNvbm5lY3Rpb24sIHVybCk7XHJcblxyXG4gICAgICAgICAgICBjb25uZWN0aW9uLmxvZyhcIk5lZ290aWF0aW5nIHdpdGggJ1wiICsgdXJsICsgXCInLlwiKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFNhdmUgdGhlIGFqYXggbmVnb3RpYXRlIHJlcXVlc3Qgb2JqZWN0IHNvIHdlIGNhbiBhYm9ydCBpdCBpZiBzdG9wIGlzIGNhbGxlZCB3aGlsZSB0aGUgcmVxdWVzdCBpcyBpbiBmbGlnaHQuXHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24uXy5uZWdvdGlhdGVSZXF1ZXN0ID0gc2lnbmFsUi50cmFuc3BvcnRzLl9sb2dpYy5hamF4KGNvbm5lY3Rpb24sIHtcclxuICAgICAgICAgICAgICAgIHVybDogdXJsLFxyXG4gICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChlcnJvciwgc3RhdHVzVGV4dCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFdlIGRvbid0IHdhbnQgdG8gY2F1c2UgYW55IGVycm9ycyBpZiB3ZSdyZSBhYm9ydGluZyBvdXIgb3duIG5lZ290aWF0ZSByZXF1ZXN0LlxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGF0dXNUZXh0ICE9PSBfbmVnb3RpYXRlQWJvcnRUZXh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uRmFpbGVkKGVycm9yLCBjb25uZWN0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGlzIHJlamVjdGlvbiB3aWxsIG5vb3AgaWYgdGhlIGRlZmVycmVkIGhhcyBhbHJlYWR5IGJlZW4gcmVzb2x2ZWQgb3IgcmVqZWN0ZWQuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChzaWduYWxSLl8uZXJyb3IocmVzb3VyY2VzLnN0b3BwZWRXaGlsZU5lZ290aWF0aW5nLCBudWxsIC8qIGVycm9yICovLCBjb25uZWN0aW9uLl8ubmVnb3RpYXRlUmVxdWVzdCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAga2VlcEFsaXZlRGF0YSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvdG9jb2xFcnJvcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNwb3J0cyA9IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdXBwb3J0ZWRUcmFuc3BvcnRzID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcyA9IGNvbm5lY3Rpb24uX3BhcnNlUmVzcG9uc2UocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkZhaWxlZChzaWduYWxSLl8uZXJyb3IocmVzb3VyY2VzLmVycm9yUGFyc2luZ05lZ290aWF0ZVJlc3BvbnNlLCBlcnJvciksIGNvbm5lY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBrZWVwQWxpdmVEYXRhID0gY29ubmVjdGlvbi5fLmtlZXBBbGl2ZURhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5hcHBSZWxhdGl2ZVVybCA9IHJlcy5Vcmw7XHJcbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5pZCA9IHJlcy5Db25uZWN0aW9uSWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi50b2tlbiA9IHJlcy5Db25uZWN0aW9uVG9rZW47XHJcbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi53ZWJTb2NrZXRTZXJ2ZXJVcmwgPSByZXMuV2ViU29ja2V0U2VydmVyVXJsO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBUaGUgbG9uZyBwb2xsIHRpbWVvdXQgaXMgdGhlIENvbm5lY3Rpb25UaW1lb3V0IHBsdXMgMTAgc2Vjb25kc1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uXy5wb2xsVGltZW91dCA9IHJlcy5Db25uZWN0aW9uVGltZW91dCAqIDEwMDAgKyAxMDAwMDsgLy8gaW4gbXNcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gT25jZSB0aGUgc2VydmVyIGhhcyBsYWJlbGVkIHRoZSBQZXJzaXN0ZW50Q29ubmVjdGlvbiBhcyBEaXNjb25uZWN0ZWQsIHdlIHNob3VsZCBzdG9wIGF0dGVtcHRpbmcgdG8gcmVjb25uZWN0XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYWZ0ZXIgcmVzLkRpc2Nvbm5lY3RUaW1lb3V0IHNlY29uZHMuXHJcbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5kaXNjb25uZWN0VGltZW91dCA9IHJlcy5EaXNjb25uZWN0VGltZW91dCAqIDEwMDA7IC8vIGluIG1zXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIEFkZCB0aGUgVHJhbnNwb3J0Q29ubmVjdFRpbWVvdXQgZnJvbSB0aGUgcmVzcG9uc2UgdG8gdGhlIHRyYW5zcG9ydENvbm5lY3RUaW1lb3V0IGZyb20gdGhlIGNsaWVudCB0byBjYWxjdWxhdGUgdGhlIHRvdGFsIHRpbWVvdXRcclxuICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLl8udG90YWxUcmFuc3BvcnRDb25uZWN0VGltZW91dCA9IGNvbm5lY3Rpb24udHJhbnNwb3J0Q29ubmVjdFRpbWVvdXQgKyByZXMuVHJhbnNwb3J0Q29ubmVjdFRpbWVvdXQgKiAxMDAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBJZiB3ZSBoYXZlIGEga2VlcCBhbGl2ZVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMuS2VlcEFsaXZlVGltZW91dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBSZWdpc3RlciB0aGUga2VlcCBhbGl2ZSBkYXRhIGFzIGFjdGl2YXRlZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZWVwQWxpdmVEYXRhLmFjdGl2YXRlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUaW1lb3V0IHRvIGRlc2lnbmF0ZSB3aGVuIHRvIGZvcmNlIHRoZSBjb25uZWN0aW9uIGludG8gcmVjb25uZWN0aW5nIGNvbnZlcnRlZCB0byBtaWxsaXNlY29uZHNcclxuICAgICAgICAgICAgICAgICAgICAgICAga2VlcEFsaXZlRGF0YS50aW1lb3V0ID0gcmVzLktlZXBBbGl2ZVRpbWVvdXQgKiAxMDAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGltZW91dCB0byBkZXNpZ25hdGUgd2hlbiB0byB3YXJuIHRoZSBkZXZlbG9wZXIgdGhhdCB0aGUgY29ubmVjdGlvbiBtYXkgYmUgZGVhZCBvciBpcyBub3QgcmVzcG9uZGluZy5cclxuICAgICAgICAgICAgICAgICAgICAgICAga2VlcEFsaXZlRGF0YS50aW1lb3V0V2FybmluZyA9IGtlZXBBbGl2ZURhdGEudGltZW91dCAqIGNvbm5lY3Rpb24ua2VlcEFsaXZlV2FybkF0O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSW5zdGFudGlhdGUgdGhlIGZyZXF1ZW5jeSBpbiB3aGljaCB3ZSBjaGVjayB0aGUga2VlcCBhbGl2ZS4gIEl0IG11c3QgYmUgc2hvcnQgaW4gb3JkZXIgdG8gbm90IG1pc3MvcGljayB1cCBhbnkgY2hhbmdlc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLl8uYmVhdEludGVydmFsID0gKGtlZXBBbGl2ZURhdGEudGltZW91dCAtIGtlZXBBbGl2ZURhdGEudGltZW91dFdhcm5pbmcpIC8gMztcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZWVwQWxpdmVEYXRhLmFjdGl2YXRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5yZWNvbm5lY3RXaW5kb3cgPSBjb25uZWN0aW9uLmRpc2Nvbm5lY3RUaW1lb3V0ICsgKGtlZXBBbGl2ZURhdGEudGltZW91dCB8fCAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXMuUHJvdG9jb2xWZXJzaW9uIHx8IHJlcy5Qcm90b2NvbFZlcnNpb24gIT09IGNvbm5lY3Rpb24uY2xpZW50UHJvdG9jb2wpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvdG9jb2xFcnJvciA9IHNpZ25hbFIuXy5lcnJvcihzaWduYWxSLl8uZm9ybWF0KHJlc291cmNlcy5wcm90b2NvbEluY29tcGF0aWJsZSwgY29ubmVjdGlvbi5jbGllbnRQcm90b2NvbCwgcmVzLlByb3RvY29sVmVyc2lvbikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKGNvbm5lY3Rpb24pLnRyaWdnZXJIYW5kbGVyKGV2ZW50cy5vbkVycm9yLCBbcHJvdG9jb2xFcnJvcl0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QocHJvdG9jb2xFcnJvcik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAkLmVhY2goc2lnbmFsUi50cmFuc3BvcnRzLCBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoa2V5LmluZGV4T2YoXCJfXCIpID09PSAwKSB8fCAoa2V5ID09PSBcIndlYlNvY2tldHNcIiAmJiAhcmVzLlRyeVdlYlNvY2tldHMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdXBwb3J0ZWRUcmFuc3BvcnRzLnB1c2goa2V5KTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQuaXNBcnJheShjb25maWcudHJhbnNwb3J0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkLmVhY2goY29uZmlnLnRyYW5zcG9ydCwgZnVuY3Rpb24gKF8sIHRyYW5zcG9ydCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQuaW5BcnJheSh0cmFuc3BvcnQsIHN1cHBvcnRlZFRyYW5zcG9ydHMpID49IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnRzLnB1c2godHJhbnNwb3J0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjb25maWcudHJhbnNwb3J0ID09PSBcImF1dG9cIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnRzID0gc3VwcG9ydGVkVHJhbnNwb3J0cztcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCQuaW5BcnJheShjb25maWcudHJhbnNwb3J0LCBzdXBwb3J0ZWRUcmFuc3BvcnRzKSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zcG9ydHMucHVzaChjb25maWcudHJhbnNwb3J0KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxpemUodHJhbnNwb3J0cyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzdGFydGluZzogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIC8vLyA8c3VtbWFyeT5BZGRzIGEgY2FsbGJhY2sgdGhhdCB3aWxsIGJlIGludm9rZWQgYmVmb3JlIGFueXRoaW5nIGlzIHNlbnQgb3ZlciB0aGUgY29ubmVjdGlvbjwvc3VtbWFyeT5cclxuICAgICAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiY2FsbGJhY2tcIiB0eXBlPVwiRnVuY3Rpb25cIj5BIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgYmVmb3JlIHRoZSBjb25uZWN0aW9uIGlzIGZ1bGx5IGluc3RhbnRpYXRlZC48L3BhcmFtPlxyXG4gICAgICAgICAgICAvLy8gPHJldHVybnMgdHlwZT1cInNpZ25hbFJcIiAvPlxyXG4gICAgICAgICAgICB2YXIgY29ubmVjdGlvbiA9IHRoaXM7XHJcbiAgICAgICAgICAgICQoY29ubmVjdGlvbikuYmluZChldmVudHMub25TdGFydGluZywgZnVuY3Rpb24gKGUsIGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoY29ubmVjdGlvbik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gY29ubmVjdGlvbjtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzZW5kOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAvLy8gPHN1bW1hcnk+U2VuZHMgZGF0YSBvdmVyIHRoZSBjb25uZWN0aW9uPC9zdW1tYXJ5PlxyXG4gICAgICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJkYXRhXCIgdHlwZT1cIlN0cmluZ1wiPlRoZSBkYXRhIHRvIHNlbmQgb3ZlciB0aGUgY29ubmVjdGlvbjwvcGFyYW0+XHJcbiAgICAgICAgICAgIC8vLyA8cmV0dXJucyB0eXBlPVwic2lnbmFsUlwiIC8+XHJcbiAgICAgICAgICAgIHZhciBjb25uZWN0aW9uID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGlmIChjb25uZWN0aW9uLnN0YXRlID09PSBzaWduYWxSLmNvbm5lY3Rpb25TdGF0ZS5kaXNjb25uZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgIC8vIENvbm5lY3Rpb24gaGFzbid0IGJlZW4gc3RhcnRlZCB5ZXRcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlNpZ25hbFI6IENvbm5lY3Rpb24gbXVzdCBiZSBzdGFydGVkIGJlZm9yZSBkYXRhIGNhbiBiZSBzZW50LiBDYWxsIC5zdGFydCgpIGJlZm9yZSAuc2VuZCgpXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoY29ubmVjdGlvbi5zdGF0ZSA9PT0gc2lnbmFsUi5jb25uZWN0aW9uU3RhdGUuY29ubmVjdGluZykge1xyXG4gICAgICAgICAgICAgICAgLy8gQ29ubmVjdGlvbiBoYXNuJ3QgYmVlbiBzdGFydGVkIHlldFxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU2lnbmFsUjogQ29ubmVjdGlvbiBoYXMgbm90IGJlZW4gZnVsbHkgaW5pdGlhbGl6ZWQuIFVzZSAuc3RhcnQoKS5kb25lKCkgb3IgLnN0YXJ0KCkuZmFpbCgpIHRvIHJ1biBsb2dpYyBhZnRlciB0aGUgY29ubmVjdGlvbiBoYXMgc3RhcnRlZC5cIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24udHJhbnNwb3J0LnNlbmQoY29ubmVjdGlvbiwgZGF0YSk7XHJcbiAgICAgICAgICAgIC8vIFJFVklFVzogU2hvdWxkIHdlIHJldHVybiBkZWZlcnJlZCBoZXJlP1xyXG4gICAgICAgICAgICByZXR1cm4gY29ubmVjdGlvbjtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICByZWNlaXZlZDogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIC8vLyA8c3VtbWFyeT5BZGRzIGEgY2FsbGJhY2sgdGhhdCB3aWxsIGJlIGludm9rZWQgYWZ0ZXIgYW55dGhpbmcgaXMgcmVjZWl2ZWQgb3ZlciB0aGUgY29ubmVjdGlvbjwvc3VtbWFyeT5cclxuICAgICAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiY2FsbGJhY2tcIiB0eXBlPVwiRnVuY3Rpb25cIj5BIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiBhbnkgZGF0YSBpcyByZWNlaXZlZCBvbiB0aGUgY29ubmVjdGlvbjwvcGFyYW0+XHJcbiAgICAgICAgICAgIC8vLyA8cmV0dXJucyB0eXBlPVwic2lnbmFsUlwiIC8+XHJcbiAgICAgICAgICAgIHZhciBjb25uZWN0aW9uID0gdGhpcztcclxuICAgICAgICAgICAgJChjb25uZWN0aW9uKS5iaW5kKGV2ZW50cy5vblJlY2VpdmVkLCBmdW5jdGlvbiAoZSwgZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbChjb25uZWN0aW9uLCBkYXRhKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBjb25uZWN0aW9uO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHN0YXRlQ2hhbmdlZDogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIC8vLyA8c3VtbWFyeT5BZGRzIGEgY2FsbGJhY2sgdGhhdCB3aWxsIGJlIGludm9rZWQgd2hlbiB0aGUgY29ubmVjdGlvbiBzdGF0ZSBjaGFuZ2VzPC9zdW1tYXJ5PlxyXG4gICAgICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJjYWxsYmFja1wiIHR5cGU9XCJGdW5jdGlvblwiPkEgY2FsbGJhY2sgZnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBjb25uZWN0aW9uIHN0YXRlIGNoYW5nZXM8L3BhcmFtPlxyXG4gICAgICAgICAgICAvLy8gPHJldHVybnMgdHlwZT1cInNpZ25hbFJcIiAvPlxyXG4gICAgICAgICAgICB2YXIgY29ubmVjdGlvbiA9IHRoaXM7XHJcbiAgICAgICAgICAgICQoY29ubmVjdGlvbikuYmluZChldmVudHMub25TdGF0ZUNoYW5nZWQsIGZ1bmN0aW9uIChlLCBkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKGNvbm5lY3Rpb24sIGRhdGEpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIGNvbm5lY3Rpb247XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAvLy8gPHN1bW1hcnk+QWRkcyBhIGNhbGxiYWNrIHRoYXQgd2lsbCBiZSBpbnZva2VkIGFmdGVyIGFuIGVycm9yIG9jY3VycyB3aXRoIHRoZSBjb25uZWN0aW9uPC9zdW1tYXJ5PlxyXG4gICAgICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJjYWxsYmFja1wiIHR5cGU9XCJGdW5jdGlvblwiPkEgY2FsbGJhY2sgZnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIGFuIGVycm9yIG9jY3VycyBvbiB0aGUgY29ubmVjdGlvbjwvcGFyYW0+XHJcbiAgICAgICAgICAgIC8vLyA8cmV0dXJucyB0eXBlPVwic2lnbmFsUlwiIC8+XHJcbiAgICAgICAgICAgIHZhciBjb25uZWN0aW9uID0gdGhpcztcclxuICAgICAgICAgICAgJChjb25uZWN0aW9uKS5iaW5kKGV2ZW50cy5vbkVycm9yLCBmdW5jdGlvbiAoZSwgZXJyb3JEYXRhLCBzZW5kRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5sYXN0RXJyb3IgPSBlcnJvckRhdGE7XHJcbiAgICAgICAgICAgICAgICAvLyBJbiBwcmFjdGljZSAnZXJyb3JEYXRhJyBpcyB0aGUgU2lnbmFsUiBidWlsdCBlcnJvciBvYmplY3QuXHJcbiAgICAgICAgICAgICAgICAvLyBJbiBwcmFjdGljZSAnc2VuZERhdGEnIGlzIHVuZGVmaW5lZCBmb3IgYWxsIGVycm9yIGV2ZW50cyBleGNlcHQgdGhvc2UgdHJpZ2dlcmVkIGJ5XHJcbiAgICAgICAgICAgICAgICAvLyAnYWpheFNlbmQnIGFuZCAnd2ViU29ja2V0cy5zZW5kJy4nc2VuZERhdGEnIGlzIHRoZSBvcmlnaW5hbCBzZW5kIHBheWxvYWQuXHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKGNvbm5lY3Rpb24sIGVycm9yRGF0YSwgc2VuZERhdGEpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIGNvbm5lY3Rpb247XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZGlzY29ubmVjdGVkOiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgLy8vIDxzdW1tYXJ5PkFkZHMgYSBjYWxsYmFjayB0aGF0IHdpbGwgYmUgaW52b2tlZCB3aGVuIHRoZSBjbGllbnQgZGlzY29ubmVjdHM8L3N1bW1hcnk+XHJcbiAgICAgICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImNhbGxiYWNrXCIgdHlwZT1cIkZ1bmN0aW9uXCI+QSBjYWxsYmFjayBmdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGNvbm5lY3Rpb24gaXMgYnJva2VuPC9wYXJhbT5cclxuICAgICAgICAgICAgLy8vIDxyZXR1cm5zIHR5cGU9XCJzaWduYWxSXCIgLz5cclxuICAgICAgICAgICAgdmFyIGNvbm5lY3Rpb24gPSB0aGlzO1xyXG4gICAgICAgICAgICAkKGNvbm5lY3Rpb24pLmJpbmQoZXZlbnRzLm9uRGlzY29ubmVjdCwgZnVuY3Rpb24gKGUsIGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoY29ubmVjdGlvbik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gY29ubmVjdGlvbjtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjb25uZWN0aW9uU2xvdzogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIC8vLyA8c3VtbWFyeT5BZGRzIGEgY2FsbGJhY2sgdGhhdCB3aWxsIGJlIGludm9rZWQgd2hlbiB0aGUgY2xpZW50IGRldGVjdHMgYSBzbG93IGNvbm5lY3Rpb248L3N1bW1hcnk+XHJcbiAgICAgICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImNhbGxiYWNrXCIgdHlwZT1cIkZ1bmN0aW9uXCI+QSBjYWxsYmFjayBmdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGNvbm5lY3Rpb24gaXMgc2xvdzwvcGFyYW0+XHJcbiAgICAgICAgICAgIC8vLyA8cmV0dXJucyB0eXBlPVwic2lnbmFsUlwiIC8+XHJcbiAgICAgICAgICAgIHZhciBjb25uZWN0aW9uID0gdGhpcztcclxuICAgICAgICAgICAgJChjb25uZWN0aW9uKS5iaW5kKGV2ZW50cy5vbkNvbm5lY3Rpb25TbG93LCBmdW5jdGlvbiAoZSwgZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbChjb25uZWN0aW9uKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gY29ubmVjdGlvbjtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICByZWNvbm5lY3Rpbmc6IGZ1bmN0aW9uIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAvLy8gPHN1bW1hcnk+QWRkcyBhIGNhbGxiYWNrIHRoYXQgd2lsbCBiZSBpbnZva2VkIHdoZW4gdGhlIHVuZGVybHlpbmcgdHJhbnNwb3J0IGJlZ2lucyByZWNvbm5lY3Rpbmc8L3N1bW1hcnk+XHJcbiAgICAgICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImNhbGxiYWNrXCIgdHlwZT1cIkZ1bmN0aW9uXCI+QSBjYWxsYmFjayBmdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGNvbm5lY3Rpb24gZW50ZXJzIGEgcmVjb25uZWN0aW5nIHN0YXRlPC9wYXJhbT5cclxuICAgICAgICAgICAgLy8vIDxyZXR1cm5zIHR5cGU9XCJzaWduYWxSXCIgLz5cclxuICAgICAgICAgICAgdmFyIGNvbm5lY3Rpb24gPSB0aGlzO1xyXG4gICAgICAgICAgICAkKGNvbm5lY3Rpb24pLmJpbmQoZXZlbnRzLm9uUmVjb25uZWN0aW5nLCBmdW5jdGlvbiAoZSwgZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbChjb25uZWN0aW9uKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBjb25uZWN0aW9uO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHJlY29ubmVjdGVkOiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgLy8vIDxzdW1tYXJ5PkFkZHMgYSBjYWxsYmFjayB0aGF0IHdpbGwgYmUgaW52b2tlZCB3aGVuIHRoZSB1bmRlcmx5aW5nIHRyYW5zcG9ydCByZWNvbm5lY3RzPC9zdW1tYXJ5PlxyXG4gICAgICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJjYWxsYmFja1wiIHR5cGU9XCJGdW5jdGlvblwiPkEgY2FsbGJhY2sgZnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBjb25uZWN0aW9uIGlzIHJlc3RvcmVkPC9wYXJhbT5cclxuICAgICAgICAgICAgLy8vIDxyZXR1cm5zIHR5cGU9XCJzaWduYWxSXCIgLz5cclxuICAgICAgICAgICAgdmFyIGNvbm5lY3Rpb24gPSB0aGlzO1xyXG4gICAgICAgICAgICAkKGNvbm5lY3Rpb24pLmJpbmQoZXZlbnRzLm9uUmVjb25uZWN0LCBmdW5jdGlvbiAoZSwgZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbChjb25uZWN0aW9uKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBjb25uZWN0aW9uO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHN0b3A6IGZ1bmN0aW9uIChhc3luYywgbm90aWZ5U2VydmVyKSB7XHJcbiAgICAgICAgICAgIC8vLyA8c3VtbWFyeT5TdG9wcyBsaXN0ZW5pbmc8L3N1bW1hcnk+XHJcbiAgICAgICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImFzeW5jXCIgdHlwZT1cIkJvb2xlYW5cIj5XaGV0aGVyIG9yIG5vdCB0byBhc3luY2hyb25vdXNseSBhYm9ydCB0aGUgY29ubmVjdGlvbjwvcGFyYW0+XHJcbiAgICAgICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cIm5vdGlmeVNlcnZlclwiIHR5cGU9XCJCb29sZWFuXCI+V2hldGhlciB3ZSB3YW50IHRvIG5vdGlmeSB0aGUgc2VydmVyIHRoYXQgd2UgYXJlIGFib3J0aW5nIHRoZSBjb25uZWN0aW9uPC9wYXJhbT5cclxuICAgICAgICAgICAgLy8vIDxyZXR1cm5zIHR5cGU9XCJzaWduYWxSXCIgLz5cclxuICAgICAgICAgICAgdmFyIGNvbm5lY3Rpb24gPSB0aGlzLFxyXG4gICAgICAgICAgICAgICAgLy8gU2F2ZSBkZWZlcnJhbCBiZWNhdXNlIHRoaXMgaXMgYWx3YXlzIGNsZWFuZWQgdXBcclxuICAgICAgICAgICAgICAgIGRlZmVycmFsID0gY29ubmVjdGlvbi5fZGVmZXJyYWw7XHJcblxyXG4gICAgICAgICAgICAvLyBWZXJpZnkgdGhhdCB3ZSd2ZSBib3VuZCBhIGxvYWQgZXZlbnQuXHJcbiAgICAgICAgICAgIGlmIChjb25uZWN0aW9uLl8uZGVmZXJyZWRTdGFydEhhbmRsZXIpIHtcclxuICAgICAgICAgICAgICAgIC8vIFVuYmluZCB0aGUgZXZlbnQuXHJcbiAgICAgICAgICAgICAgICBfcGFnZVdpbmRvdy51bmJpbmQoXCJsb2FkXCIsIGNvbm5lY3Rpb24uXy5kZWZlcnJlZFN0YXJ0SGFuZGxlcik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEFsd2F5cyBjbGVhbiB1cCBwcml2YXRlIG5vbi10aW1lb3V0IGJhc2VkIHN0YXRlLlxyXG4gICAgICAgICAgICBkZWxldGUgY29ubmVjdGlvbi5fLmNvbmZpZztcclxuICAgICAgICAgICAgZGVsZXRlIGNvbm5lY3Rpb24uXy5kZWZlcnJlZFN0YXJ0SGFuZGxlcjtcclxuXHJcbiAgICAgICAgICAgIC8vIFRoaXMgbmVlZHMgdG8gYmUgY2hlY2tlZCBkZXNwaXRlIHRoZSBjb25uZWN0aW9uIHN0YXRlIGJlY2F1c2UgYSBjb25uZWN0aW9uIHN0YXJ0IGNhbiBiZSBkZWZlcnJlZCB1bnRpbCBwYWdlIGxvYWQuXHJcbiAgICAgICAgICAgIC8vIElmIHdlJ3ZlIGRlZmVycmVkIHRoZSBzdGFydCBkdWUgdG8gYSBwYWdlIGxvYWQgd2UgbmVlZCB0byB1bmJpbmQgdGhlIFwib25Mb2FkXCIgLT4gc3RhcnQgZXZlbnQuXHJcbiAgICAgICAgICAgIGlmICghX3BhZ2VMb2FkZWQgJiYgKCFjb25uZWN0aW9uLl8uY29uZmlnIHx8IGNvbm5lY3Rpb24uXy5jb25maWcud2FpdEZvclBhZ2VMb2FkID09PSB0cnVlKSkge1xyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5sb2coXCJTdG9wcGluZyBjb25uZWN0aW9uIHByaW9yIHRvIG5lZ290aWF0ZS5cIik7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gSWYgd2UgaGF2ZSBhIGRlZmVycmFsIHdlIHNob3VsZCByZWplY3QgaXRcclxuICAgICAgICAgICAgICAgIGlmIChkZWZlcnJhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmFsLnJlamVjdChzaWduYWxSLl8uZXJyb3IocmVzb3VyY2VzLnN0b3BwZWRXaGlsZUxvYWRpbmcpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBTaG9ydC1jaXJjdWl0IGJlY2F1c2UgdGhlIHN0YXJ0IGhhcyBub3QgYmVlbiBmdWxseSBzdGFydGVkLlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoY29ubmVjdGlvbi5zdGF0ZSA9PT0gc2lnbmFsUi5jb25uZWN0aW9uU3RhdGUuZGlzY29ubmVjdGVkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKFwiU3RvcHBpbmcgY29ubmVjdGlvbi5cIik7XHJcblxyXG4gICAgICAgICAgICAvLyBDbGVhciB0aGlzIG5vIG1hdHRlciB3aGF0XHJcbiAgICAgICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQoY29ubmVjdGlvbi5fLmJlYXRIYW5kbGUpO1xyXG4gICAgICAgICAgICB3aW5kb3cuY2xlYXJJbnRlcnZhbChjb25uZWN0aW9uLl8ucGluZ0ludGVydmFsSWQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNvbm5lY3Rpb24udHJhbnNwb3J0KSB7XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnRyYW5zcG9ydC5zdG9wKGNvbm5lY3Rpb24pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChub3RpZnlTZXJ2ZXIgIT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi50cmFuc3BvcnQuYWJvcnQoY29ubmVjdGlvbiwgYXN5bmMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzdXBwb3J0c0tlZXBBbGl2ZShjb25uZWN0aW9uKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNpZ25hbFIudHJhbnNwb3J0cy5fbG9naWMuc3RvcE1vbml0b3JpbmdLZWVwQWxpdmUoY29ubmVjdGlvbik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi50cmFuc3BvcnQgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoY29ubmVjdGlvbi5fLm5lZ290aWF0ZVJlcXVlc3QpIHtcclxuICAgICAgICAgICAgICAgIC8vIElmIHRoZSBuZWdvdGlhdGlvbiByZXF1ZXN0IGhhcyBhbHJlYWR5IGNvbXBsZXRlZCB0aGlzIHdpbGwgbm9vcC5cclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uXy5uZWdvdGlhdGVSZXF1ZXN0LmFib3J0KF9uZWdvdGlhdGVBYm9ydFRleHQpO1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIGNvbm5lY3Rpb24uXy5uZWdvdGlhdGVSZXF1ZXN0O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBFbnN1cmUgdGhhdCBpbml0SGFuZGxlci5zdG9wKCkgaXMgY2FsbGVkIGJlZm9yZSBjb25uZWN0aW9uLl9kZWZlcnJhbCBpcyBkZWxldGVkXHJcbiAgICAgICAgICAgIGlmIChjb25uZWN0aW9uLl8uaW5pdEhhbmRsZXIpIHtcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uXy5pbml0SGFuZGxlci5zdG9wKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRlbGV0ZSBjb25uZWN0aW9uLl9kZWZlcnJhbDtcclxuICAgICAgICAgICAgZGVsZXRlIGNvbm5lY3Rpb24ubWVzc2FnZUlkO1xyXG4gICAgICAgICAgICBkZWxldGUgY29ubmVjdGlvbi5ncm91cHNUb2tlbjtcclxuICAgICAgICAgICAgZGVsZXRlIGNvbm5lY3Rpb24uaWQ7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBjb25uZWN0aW9uLl8ucGluZ0ludGVydmFsSWQ7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBjb25uZWN0aW9uLl8ubGFzdE1lc3NhZ2VBdDtcclxuICAgICAgICAgICAgZGVsZXRlIGNvbm5lY3Rpb24uXy5sYXN0QWN0aXZlQXQ7XHJcblxyXG4gICAgICAgICAgICAvLyBDbGVhciBvdXQgb3VyIG1lc3NhZ2UgYnVmZmVyXHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24uXy5jb25uZWN0aW5nTWVzc2FnZUJ1ZmZlci5jbGVhcigpO1xyXG5cclxuICAgICAgICAgICAgLy8gVHJpZ2dlciB0aGUgZGlzY29ubmVjdCBldmVudFxyXG4gICAgICAgICAgICBjaGFuZ2VTdGF0ZShjb25uZWN0aW9uLCBjb25uZWN0aW9uLnN0YXRlLCBzaWduYWxSLmNvbm5lY3Rpb25TdGF0ZS5kaXNjb25uZWN0ZWQpO1xyXG4gICAgICAgICAgICAkKGNvbm5lY3Rpb24pLnRyaWdnZXJIYW5kbGVyKGV2ZW50cy5vbkRpc2Nvbm5lY3QpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGNvbm5lY3Rpb247XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgbG9nOiBmdW5jdGlvbiAobXNnKSB7XHJcbiAgICAgICAgICAgIGxvZyhtc2csIHRoaXMubG9nZ2luZyk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBzaWduYWxSLmZuLmluaXQucHJvdG90eXBlID0gc2lnbmFsUi5mbjtcclxuXHJcbiAgICBzaWduYWxSLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlJlaW5zdGF0ZXMgdGhlIG9yaWdpbmFsIHZhbHVlIG9mICQuY29ubmVjdGlvbiBhbmQgcmV0dXJucyB0aGUgc2lnbmFsUiBvYmplY3QgZm9yIG1hbnVhbCBhc3NpZ25tZW50PC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cmV0dXJucyB0eXBlPVwic2lnbmFsUlwiIC8+XHJcbiAgICAgICAgaWYgKCQuY29ubmVjdGlvbiA9PT0gc2lnbmFsUikge1xyXG4gICAgICAgICAgICAkLmNvbm5lY3Rpb24gPSBfY29ubmVjdGlvbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNpZ25hbFI7XHJcbiAgICB9O1xyXG5cclxuICAgIGlmICgkLmNvbm5lY3Rpb24pIHtcclxuICAgICAgICBfY29ubmVjdGlvbiA9ICQuY29ubmVjdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICAkLmNvbm5lY3Rpb24gPSAkLnNpZ25hbFIgPSBzaWduYWxSO1xyXG5cclxufShqUXVlcnlTaGltLCB3aW5kb3cpKTtcclxuLyoganF1ZXJ5LnNpZ25hbFIudHJhbnNwb3J0cy5jb21tb24uanMgKi9cclxuLy8gQ29weXJpZ2h0IChjKSAuTkVUIEZvdW5kYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxyXG5cclxuLypnbG9iYWwgd2luZG93OmZhbHNlICovXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJqcXVlcnkuc2lnbmFsUi5jb3JlLmpzXCIgLz5cclxuXHJcbihmdW5jdGlvbiAoJCwgd2luZG93LCB1bmRlZmluZWQpIHtcclxuXHJcbiAgICB2YXIgc2lnbmFsUiA9ICQuc2lnbmFsUixcclxuICAgICAgICBldmVudHMgPSAkLnNpZ25hbFIuZXZlbnRzLFxyXG4gICAgICAgIGNoYW5nZVN0YXRlID0gJC5zaWduYWxSLmNoYW5nZVN0YXRlLFxyXG4gICAgICAgIHN0YXJ0QWJvcnRUZXh0ID0gXCJfX1N0YXJ0IEFib3J0ZWRfX1wiLFxyXG4gICAgICAgIHRyYW5zcG9ydExvZ2ljO1xyXG5cclxuICAgIHNpZ25hbFIudHJhbnNwb3J0cyA9IHt9O1xyXG5cclxuICAgIGZ1bmN0aW9uIGJlYXQoY29ubmVjdGlvbikge1xyXG4gICAgICAgIGlmIChjb25uZWN0aW9uLl8ua2VlcEFsaXZlRGF0YS5tb25pdG9yaW5nKSB7XHJcbiAgICAgICAgICAgIGNoZWNrSWZBbGl2ZShjb25uZWN0aW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEVuc3VyZSB0aGF0IHdlIHN1Y2Nlc3NmdWxseSBtYXJrZWQgYWN0aXZlIGJlZm9yZSBjb250aW51aW5nIHRoZSBoZWFydGJlYXQuXHJcbiAgICAgICAgaWYgKHRyYW5zcG9ydExvZ2ljLm1hcmtBY3RpdmUoY29ubmVjdGlvbikpIHtcclxuICAgICAgICAgICAgY29ubmVjdGlvbi5fLmJlYXRIYW5kbGUgPSB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBiZWF0KGNvbm5lY3Rpb24pO1xyXG4gICAgICAgICAgICB9LCBjb25uZWN0aW9uLl8uYmVhdEludGVydmFsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2hlY2tJZkFsaXZlKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICB2YXIga2VlcEFsaXZlRGF0YSA9IGNvbm5lY3Rpb24uXy5rZWVwQWxpdmVEYXRhLFxyXG4gICAgICAgICAgICB0aW1lRWxhcHNlZDtcclxuXHJcbiAgICAgICAgLy8gT25seSBjaGVjayBpZiB3ZSdyZSBjb25uZWN0ZWRcclxuICAgICAgICBpZiAoY29ubmVjdGlvbi5zdGF0ZSA9PT0gc2lnbmFsUi5jb25uZWN0aW9uU3RhdGUuY29ubmVjdGVkKSB7XHJcbiAgICAgICAgICAgIHRpbWVFbGFwc2VkID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgLSBjb25uZWN0aW9uLl8ubGFzdE1lc3NhZ2VBdDtcclxuXHJcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIHRoZSBrZWVwIGFsaXZlIGhhcyBjb21wbGV0ZWx5IHRpbWVkIG91dFxyXG4gICAgICAgICAgICBpZiAodGltZUVsYXBzZWQgPj0ga2VlcEFsaXZlRGF0YS50aW1lb3V0KSB7XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmxvZyhcIktlZXAgYWxpdmUgdGltZWQgb3V0LiAgTm90aWZ5aW5nIHRyYW5zcG9ydCB0aGF0IGNvbm5lY3Rpb24gaGFzIGJlZW4gbG9zdC5cIik7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gTm90aWZ5IHRyYW5zcG9ydCB0aGF0IHRoZSBjb25uZWN0aW9uIGhhcyBiZWVuIGxvc3RcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24udHJhbnNwb3J0Lmxvc3RDb25uZWN0aW9uKGNvbm5lY3Rpb24pO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRpbWVFbGFwc2VkID49IGtlZXBBbGl2ZURhdGEudGltZW91dFdhcm5pbmcpIHtcclxuICAgICAgICAgICAgICAgIC8vIFRoaXMgaXMgdG8gYXNzdXJlIHRoYXQgdGhlIHVzZXIgb25seSBnZXRzIGEgc2luZ2xlIHdhcm5pbmdcclxuICAgICAgICAgICAgICAgIGlmICgha2VlcEFsaXZlRGF0YS51c2VyTm90aWZpZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmxvZyhcIktlZXAgYWxpdmUgaGFzIGJlZW4gbWlzc2VkLCBjb25uZWN0aW9uIG1heSBiZSBkZWFkL3Nsb3cuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoY29ubmVjdGlvbikudHJpZ2dlckhhbmRsZXIoZXZlbnRzLm9uQ29ubmVjdGlvblNsb3cpO1xyXG4gICAgICAgICAgICAgICAgICAgIGtlZXBBbGl2ZURhdGEudXNlck5vdGlmaWVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGtlZXBBbGl2ZURhdGEudXNlck5vdGlmaWVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0QWpheFVybChjb25uZWN0aW9uLCBwYXRoKSB7XHJcbiAgICAgICAgdmFyIHVybCA9IGNvbm5lY3Rpb24udXJsICsgcGF0aDtcclxuXHJcbiAgICAgICAgaWYgKGNvbm5lY3Rpb24udHJhbnNwb3J0KSB7XHJcbiAgICAgICAgICAgIHVybCArPSBcIj90cmFuc3BvcnQ9XCIgKyBjb25uZWN0aW9uLnRyYW5zcG9ydC5uYW1lO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRyYW5zcG9ydExvZ2ljLnByZXBhcmVRdWVyeVN0cmluZyhjb25uZWN0aW9uLCB1cmwpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIEluaXRIYW5kbGVyKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICB0aGlzLmNvbm5lY3Rpb24gPSBjb25uZWN0aW9uO1xyXG5cclxuICAgICAgICB0aGlzLnN0YXJ0UmVxdWVzdGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zdGFydENvbXBsZXRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY29ubmVjdGlvblN0b3BwZWQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBJbml0SGFuZGxlci5wcm90b3R5cGUgPSB7XHJcbiAgICAgICAgc3RhcnQ6IGZ1bmN0aW9uICh0cmFuc3BvcnQsIG9uU3VjY2Vzcywgb25GYWxsYmFjaykge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXMsXHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uID0gdGhhdC5jb25uZWN0aW9uLFxyXG4gICAgICAgICAgICAgICAgZmFpbENhbGxlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoYXQuc3RhcnRSZXF1ZXN0ZWQgfHwgdGhhdC5jb25uZWN0aW9uU3RvcHBlZCkge1xyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5sb2coXCJXQVJOSU5HISBcIiArIHRyYW5zcG9ydC5uYW1lICsgXCIgdHJhbnNwb3J0IGNhbm5vdCBiZSBzdGFydGVkLiBJbml0aWFsaXphdGlvbiBvbmdvaW5nIG9yIGNvbXBsZXRlZC5cIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKHRyYW5zcG9ydC5uYW1lICsgXCIgdHJhbnNwb3J0IHN0YXJ0aW5nLlwiKTtcclxuXHJcbiAgICAgICAgICAgIHRyYW5zcG9ydC5zdGFydChjb25uZWN0aW9uLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWZhaWxDYWxsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmluaXRSZWNlaXZlZCh0cmFuc3BvcnQsIG9uU3VjY2Vzcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgLy8gRG9uJ3QgYWxsb3cgdGhlIHNhbWUgdHJhbnNwb3J0IHRvIGNhdXNlIG9uRmFsbGJhY2sgdG8gYmUgY2FsbGVkIHR3aWNlXHJcbiAgICAgICAgICAgICAgICBpZiAoIWZhaWxDYWxsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBmYWlsQ2FsbGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnRyYW5zcG9ydEZhaWxlZCh0cmFuc3BvcnQsIGVycm9yLCBvbkZhbGxiYWNrKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBSZXR1cm5zIHRydWUgaWYgdGhlIHRyYW5zcG9ydCBzaG91bGQgc3RvcDtcclxuICAgICAgICAgICAgICAgIC8vIGZhbHNlIGlmIGl0IHNob3VsZCBhdHRlbXB0IHRvIHJlY29ubmVjdFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICF0aGF0LnN0YXJ0Q29tcGxldGVkIHx8IHRoYXQuY29ubmVjdGlvblN0b3BwZWQ7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhhdC50cmFuc3BvcnRUaW1lb3V0SGFuZGxlID0gd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFmYWlsQ2FsbGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmFpbENhbGxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5sb2codHJhbnNwb3J0Lm5hbWUgKyBcIiB0cmFuc3BvcnQgdGltZWQgb3V0IHdoZW4gdHJ5aW5nIHRvIGNvbm5lY3QuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQudHJhbnNwb3J0RmFpbGVkKHRyYW5zcG9ydCwgdW5kZWZpbmVkLCBvbkZhbGxiYWNrKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgY29ubmVjdGlvbi5fLnRvdGFsVHJhbnNwb3J0Q29ubmVjdFRpbWVvdXQpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHN0b3A6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uU3RvcHBlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy50cmFuc3BvcnRUaW1lb3V0SGFuZGxlKTtcclxuICAgICAgICAgICAgc2lnbmFsUi50cmFuc3BvcnRzLl9sb2dpYy50cnlBYm9ydFN0YXJ0UmVxdWVzdCh0aGlzLmNvbm5lY3Rpb24pO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGluaXRSZWNlaXZlZDogZnVuY3Rpb24gKHRyYW5zcG9ydCwgb25TdWNjZXNzKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcyxcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24gPSB0aGF0LmNvbm5lY3Rpb247XHJcblxyXG4gICAgICAgICAgICBpZiAodGhhdC5zdGFydFJlcXVlc3RlZCkge1xyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5sb2coXCJXQVJOSU5HISBUaGUgY2xpZW50IHJlY2VpdmVkIG11bHRpcGxlIGluaXQgbWVzc2FnZXMuXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhhdC5jb25uZWN0aW9uU3RvcHBlZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGF0LnN0YXJ0UmVxdWVzdGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgd2luZG93LmNsZWFyVGltZW91dCh0aGF0LnRyYW5zcG9ydFRpbWVvdXRIYW5kbGUpO1xyXG5cclxuICAgICAgICAgICAgY29ubmVjdGlvbi5sb2codHJhbnNwb3J0Lm5hbWUgKyBcIiB0cmFuc3BvcnQgY29ubmVjdGVkLiBJbml0aWF0aW5nIHN0YXJ0IHJlcXVlc3QuXCIpO1xyXG4gICAgICAgICAgICBzaWduYWxSLnRyYW5zcG9ydHMuX2xvZ2ljLmFqYXhTdGFydChjb25uZWN0aW9uLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnN0YXJ0Q29tcGxldGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIG9uU3VjY2VzcygpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB0cmFuc3BvcnRGYWlsZWQ6IGZ1bmN0aW9uICh0cmFuc3BvcnQsIGVycm9yLCBvbkZhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHZhciBjb25uZWN0aW9uID0gdGhpcy5jb25uZWN0aW9uLFxyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQgPSBjb25uZWN0aW9uLl9kZWZlcnJhbCxcclxuICAgICAgICAgICAgICAgIHdyYXBwZWRFcnJvcjtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbm5lY3Rpb25TdG9wcGVkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy50cmFuc3BvcnRUaW1lb3V0SGFuZGxlKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5zdGFydFJlcXVlc3RlZCkge1xyXG4gICAgICAgICAgICAgICAgdHJhbnNwb3J0LnN0b3AoY29ubmVjdGlvbik7XHJcblxyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5sb2codHJhbnNwb3J0Lm5hbWUgKyBcIiB0cmFuc3BvcnQgZmFpbGVkIHRvIGNvbm5lY3QuIEF0dGVtcHRpbmcgdG8gZmFsbCBiYWNrLlwiKTtcclxuICAgICAgICAgICAgICAgIG9uRmFsbGJhY2soKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICghdGhpcy5zdGFydENvbXBsZXRlZCkge1xyXG4gICAgICAgICAgICAgICAgLy8gRG8gbm90IGF0dGVtcHQgdG8gZmFsbCBiYWNrIGlmIGEgc3RhcnQgcmVxdWVzdCBpcyBvbmdvaW5nIGR1cmluZyBhIHRyYW5zcG9ydCBmYWlsdXJlLlxyXG4gICAgICAgICAgICAgICAgLy8gSW5zdGVhZCwgdHJpZ2dlciBhbiBlcnJvciBhbmQgc3RvcCB0aGUgY29ubmVjdGlvbi5cclxuICAgICAgICAgICAgICAgIHdyYXBwZWRFcnJvciA9IHNpZ25hbFIuXy5lcnJvcihzaWduYWxSLnJlc291cmNlcy5lcnJvckR1cmluZ1N0YXJ0UmVxdWVzdCwgZXJyb3IpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKHRyYW5zcG9ydC5uYW1lICsgXCIgdHJhbnNwb3J0IGZhaWxlZCBkdXJpbmcgdGhlIHN0YXJ0IHJlcXVlc3QuIFN0b3BwaW5nIHRoZSBjb25uZWN0aW9uLlwiKTtcclxuICAgICAgICAgICAgICAgICQoY29ubmVjdGlvbikudHJpZ2dlckhhbmRsZXIoZXZlbnRzLm9uRXJyb3IsIFt3cmFwcGVkRXJyb3JdKTtcclxuICAgICAgICAgICAgICAgIGlmIChkZWZlcnJlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh3cmFwcGVkRXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uc3RvcCgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gVGhlIHN0YXJ0IHJlcXVlc3QgaGFzIGNvbXBsZXRlZCwgYnV0IHRoZSBjb25uZWN0aW9uIGhhcyBub3Qgc3RvcHBlZC5cclxuICAgICAgICAgICAgICAgIC8vIE5vIG5lZWQgdG8gZG8gYW55dGhpbmcgaGVyZS4gVGhlIHRyYW5zcG9ydCBzaG91bGQgYXR0ZW1wdCBpdHMgbm9ybWFsIHJlY29ubmVjdCBsb2dpYy5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdHJhbnNwb3J0TG9naWMgPSBzaWduYWxSLnRyYW5zcG9ydHMuX2xvZ2ljID0ge1xyXG4gICAgICAgIGFqYXg6IGZ1bmN0aW9uIChjb25uZWN0aW9uLCBvcHRpb25zKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkLmFqYXgoXHJcbiAgICAgICAgICAgICAgICAkLmV4dGVuZCgvKmRlZXAgY29weSovIHRydWUsIHt9LCAkLnNpZ25hbFIuYWpheERlZmF1bHRzLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7fSxcclxuICAgICAgICAgICAgICAgICAgICB4aHJGaWVsZHM6IHsgd2l0aENyZWRlbnRpYWxzOiBjb25uZWN0aW9uLndpdGhDcmVkZW50aWFscyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBjb25uZWN0aW9uLmNvbnRlbnRUeXBlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlOiBjb25uZWN0aW9uLmFqYXhEYXRhVHlwZVxyXG4gICAgICAgICAgICAgICAgfSwgb3B0aW9ucykpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHBpbmdTZXJ2ZXI6IGZ1bmN0aW9uIChjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIC8vLyA8c3VtbWFyeT5QaW5ncyB0aGUgc2VydmVyPC9zdW1tYXJ5PlxyXG4gICAgICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJjb25uZWN0aW9uXCIgdHlwZT1cInNpZ25hbHJcIj5Db25uZWN0aW9uIGFzc29jaWF0ZWQgd2l0aCB0aGUgc2VydmVyIHBpbmc8L3BhcmFtPlxyXG4gICAgICAgICAgICAvLy8gPHJldHVybnMgdHlwZT1cInNpZ25hbFJcIiAvPlxyXG4gICAgICAgICAgICB2YXIgdXJsLFxyXG4gICAgICAgICAgICAgICAgeGhyLFxyXG4gICAgICAgICAgICAgICAgZGVmZXJyYWwgPSAkLkRlZmVycmVkKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoY29ubmVjdGlvbi50cmFuc3BvcnQpIHtcclxuICAgICAgICAgICAgICAgIHVybCA9IGNvbm5lY3Rpb24udXJsICsgXCIvcGluZ1wiO1xyXG5cclxuICAgICAgICAgICAgICAgIHVybCA9IHRyYW5zcG9ydExvZ2ljLmFkZFFzKHVybCwgY29ubmVjdGlvbi5xcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgeGhyID0gdHJhbnNwb3J0TG9naWMuYWpheChjb25uZWN0aW9uLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiB1cmwsXHJcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0gY29ubmVjdGlvbi5fcGFyc2VSZXNwb25zZShyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJyYWwucmVqZWN0KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25hbFIuXy50cmFuc3BvcnRFcnJvcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2lnbmFsUi5yZXNvdXJjZXMucGluZ1NlcnZlckZhaWxlZFBhcnNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnRyYW5zcG9ydCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhoclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnN0b3AoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuUmVzcG9uc2UgPT09IFwicG9uZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJhbC5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJhbC5yZWplY3QoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2lnbmFsUi5fLnRyYW5zcG9ydEVycm9yKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaWduYWxSLl8uZm9ybWF0KHNpZ25hbFIucmVzb3VyY2VzLnBpbmdTZXJ2ZXJGYWlsZWRJbnZhbGlkUmVzcG9uc2UsIHJlc3VsdCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24udHJhbnNwb3J0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsIC8qIGVycm9yICovLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4aHJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnJvci5zdGF0dXMgPT09IDQwMSB8fCBlcnJvci5zdGF0dXMgPT09IDQwMykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJyYWwucmVqZWN0KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25hbFIuXy50cmFuc3BvcnRFcnJvcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2lnbmFsUi5fLmZvcm1hdChzaWduYWxSLnJlc291cmNlcy5waW5nU2VydmVyRmFpbGVkU3RhdHVzQ29kZSwgZXJyb3Iuc3RhdHVzKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi50cmFuc3BvcnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4aHJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5zdG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJhbC5yZWplY3QoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2lnbmFsUi5fLnRyYW5zcG9ydEVycm9yKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaWduYWxSLnJlc291cmNlcy5waW5nU2VydmVyRmFpbGVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnRyYW5zcG9ydCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhoclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmFsLnJlamVjdChcclxuICAgICAgICAgICAgICAgICAgICBzaWduYWxSLl8udHJhbnNwb3J0RXJyb3IoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25hbFIucmVzb3VyY2VzLm5vQ29ubmVjdGlvblRyYW5zcG9ydCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi50cmFuc3BvcnRcclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyYWwucHJvbWlzZSgpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHByZXBhcmVRdWVyeVN0cmluZzogZnVuY3Rpb24gKGNvbm5lY3Rpb24sIHVybCkge1xyXG4gICAgICAgICAgICB2YXIgcHJlcGFyZWRVcmw7XHJcblxyXG4gICAgICAgICAgICAvLyBVc2UgYWRkUXMgdG8gc3RhcnQgc2luY2UgaXQgaGFuZGxlcyB0aGUgPy8mIHByZWZpeCBmb3IgdXNcclxuICAgICAgICAgICAgcHJlcGFyZWRVcmwgPSB0cmFuc3BvcnRMb2dpYy5hZGRRcyh1cmwsIFwiY2xpZW50UHJvdG9jb2w9XCIgKyBjb25uZWN0aW9uLmNsaWVudFByb3RvY29sKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEFkZCB0aGUgdXNlci1zcGVjaWZpZWQgcXVlcnkgc3RyaW5nIHBhcmFtcyBpZiBhbnlcclxuICAgICAgICAgICAgcHJlcGFyZWRVcmwgPSB0cmFuc3BvcnRMb2dpYy5hZGRRcyhwcmVwYXJlZFVybCwgY29ubmVjdGlvbi5xcyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoY29ubmVjdGlvbi50b2tlbikge1xyXG4gICAgICAgICAgICAgICAgcHJlcGFyZWRVcmwgKz0gXCImY29ubmVjdGlvblRva2VuPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KGNvbm5lY3Rpb24udG9rZW4pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoY29ubmVjdGlvbi5kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBwcmVwYXJlZFVybCArPSBcIiZjb25uZWN0aW9uRGF0YT1cIiArIGVuY29kZVVSSUNvbXBvbmVudChjb25uZWN0aW9uLmRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcHJlcGFyZWRVcmw7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYWRkUXM6IGZ1bmN0aW9uICh1cmwsIHFzKSB7XHJcbiAgICAgICAgICAgIHZhciBhcHBlbmRlciA9IHVybC5pbmRleE9mKFwiP1wiKSAhPT0gLTEgPyBcIiZcIiA6IFwiP1wiLFxyXG4gICAgICAgICAgICAgICAgZmlyc3RDaGFyO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFxcykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVybDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiAocXMpID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdXJsICsgYXBwZW5kZXIgKyAkLnBhcmFtKHFzKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiAocXMpID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICBmaXJzdENoYXIgPSBxcy5jaGFyQXQoMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGZpcnN0Q2hhciA9PT0gXCI/XCIgfHwgZmlyc3RDaGFyID09PSBcIiZcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGFwcGVuZGVyID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdXJsICsgYXBwZW5kZXIgKyBxcztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUXVlcnkgc3RyaW5nIHByb3BlcnR5IG11c3QgYmUgZWl0aGVyIGEgc3RyaW5nIG9yIG9iamVjdC5cIik7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy8gQlVHICMyOTUzOiBUaGUgdXJsIG5lZWRzIHRvIGJlIHNhbWUgb3RoZXJ3aXNlIGl0IHdpbGwgY2F1c2UgYSBtZW1vcnkgbGVha1xyXG4gICAgICAgIGdldFVybDogZnVuY3Rpb24gKGNvbm5lY3Rpb24sIHRyYW5zcG9ydCwgcmVjb25uZWN0aW5nLCBwb2xsLCBhamF4UG9zdCkge1xyXG4gICAgICAgICAgICAvLy8gPHN1bW1hcnk+R2V0cyB0aGUgdXJsIGZvciBtYWtpbmcgYSBHRVQgYmFzZWQgY29ubmVjdCByZXF1ZXN0PC9zdW1tYXJ5PlxyXG4gICAgICAgICAgICB2YXIgYmFzZVVybCA9IHRyYW5zcG9ydCA9PT0gXCJ3ZWJTb2NrZXRzXCIgPyBcIlwiIDogY29ubmVjdGlvbi5iYXNlVXJsLFxyXG4gICAgICAgICAgICAgICAgdXJsID0gYmFzZVVybCArIGNvbm5lY3Rpb24uYXBwUmVsYXRpdmVVcmwsXHJcbiAgICAgICAgICAgICAgICBxcyA9IFwidHJhbnNwb3J0PVwiICsgdHJhbnNwb3J0O1xyXG5cclxuICAgICAgICAgICAgaWYgKCFhamF4UG9zdCAmJiBjb25uZWN0aW9uLmdyb3Vwc1Rva2VuKSB7XHJcbiAgICAgICAgICAgICAgICBxcyArPSBcIiZncm91cHNUb2tlbj1cIiArIGVuY29kZVVSSUNvbXBvbmVudChjb25uZWN0aW9uLmdyb3Vwc1Rva2VuKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCFyZWNvbm5lY3RpbmcpIHtcclxuICAgICAgICAgICAgICAgIHVybCArPSBcIi9jb25uZWN0XCI7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocG9sbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGxvbmdQb2xsaW5nIHRyYW5zcG9ydCBzcGVjaWZpY1xyXG4gICAgICAgICAgICAgICAgICAgIHVybCArPSBcIi9wb2xsXCI7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHVybCArPSBcIi9yZWNvbm5lY3RcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIWFqYXhQb3N0ICYmIGNvbm5lY3Rpb24ubWVzc2FnZUlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcXMgKz0gXCImbWVzc2FnZUlkPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KGNvbm5lY3Rpb24ubWVzc2FnZUlkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB1cmwgKz0gXCI/XCIgKyBxcztcclxuICAgICAgICAgICAgdXJsID0gdHJhbnNwb3J0TG9naWMucHJlcGFyZVF1ZXJ5U3RyaW5nKGNvbm5lY3Rpb24sIHVybCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWFqYXhQb3N0KSB7XHJcbiAgICAgICAgICAgICAgICB1cmwgKz0gXCImdGlkPVwiICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTEpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdXJsO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG1heGltaXplUGVyc2lzdGVudFJlc3BvbnNlOiBmdW5jdGlvbiAobWluUGVyc2lzdGVudFJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBNZXNzYWdlSWQ6IG1pblBlcnNpc3RlbnRSZXNwb25zZS5DLFxyXG4gICAgICAgICAgICAgICAgTWVzc2FnZXM6IG1pblBlcnNpc3RlbnRSZXNwb25zZS5NLFxyXG4gICAgICAgICAgICAgICAgSW5pdGlhbGl6ZWQ6IHR5cGVvZiAobWluUGVyc2lzdGVudFJlc3BvbnNlLlMpICE9PSBcInVuZGVmaW5lZFwiID8gdHJ1ZSA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgU2hvdWxkUmVjb25uZWN0OiB0eXBlb2YgKG1pblBlcnNpc3RlbnRSZXNwb25zZS5UKSAhPT0gXCJ1bmRlZmluZWRcIiA/IHRydWUgOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIExvbmdQb2xsRGVsYXk6IG1pblBlcnNpc3RlbnRSZXNwb25zZS5MLFxyXG4gICAgICAgICAgICAgICAgR3JvdXBzVG9rZW46IG1pblBlcnNpc3RlbnRSZXNwb25zZS5HXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdXBkYXRlR3JvdXBzOiBmdW5jdGlvbiAoY29ubmVjdGlvbiwgZ3JvdXBzVG9rZW4pIHtcclxuICAgICAgICAgICAgaWYgKGdyb3Vwc1Rva2VuKSB7XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmdyb3Vwc1Rva2VuID0gZ3JvdXBzVG9rZW47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzdHJpbmdpZnlTZW5kOiBmdW5jdGlvbiAoY29ubmVjdGlvbiwgbWVzc2FnZSkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIChtZXNzYWdlKSA9PT0gXCJzdHJpbmdcIiB8fCB0eXBlb2YgKG1lc3NhZ2UpID09PSBcInVuZGVmaW5lZFwiIHx8IG1lc3NhZ2UgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBtZXNzYWdlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBjb25uZWN0aW9uLmpzb24uc3RyaW5naWZ5KG1lc3NhZ2UpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGFqYXhTZW5kOiBmdW5jdGlvbiAoY29ubmVjdGlvbiwgZGF0YSkge1xyXG4gICAgICAgICAgICB2YXIgcGF5bG9hZCA9IHRyYW5zcG9ydExvZ2ljLnN0cmluZ2lmeVNlbmQoY29ubmVjdGlvbiwgZGF0YSksXHJcbiAgICAgICAgICAgICAgICB1cmwgPSBnZXRBamF4VXJsKGNvbm5lY3Rpb24sIFwiL3NlbmRcIiksXHJcbiAgICAgICAgICAgICAgICB4aHIsXHJcbiAgICAgICAgICAgICAgICBvbkZhaWwgPSBmdW5jdGlvbiAoZXJyb3IsIGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAkKGNvbm5lY3Rpb24pLnRyaWdnZXJIYW5kbGVyKGV2ZW50cy5vbkVycm9yLCBbc2lnbmFsUi5fLnRyYW5zcG9ydEVycm9yKHNpZ25hbFIucmVzb3VyY2VzLnNlbmRGYWlsZWQsIGNvbm5lY3Rpb24udHJhbnNwb3J0LCBlcnJvciwgeGhyKSwgZGF0YV0pO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcblxyXG4gICAgICAgICAgICB4aHIgPSB0cmFuc3BvcnRMb2dpYy5hamF4KGNvbm5lY3Rpb24sIHtcclxuICAgICAgICAgICAgICAgIHVybDogdXJsLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogY29ubmVjdGlvbi5hamF4RGF0YVR5cGUgPT09IFwianNvbnBcIiA/IFwiR0VUXCIgOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBzaWduYWxSLl8uZGVmYXVsdENvbnRlbnRUeXBlLFxyXG4gICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHBheWxvYWRcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlcztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzID0gY29ubmVjdGlvbi5fcGFyc2VSZXNwb25zZShyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25GYWlsKGVycm9yLCBjb25uZWN0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uc3RvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnRMb2dpYy50cmlnZ2VyUmVjZWl2ZWQoY29ubmVjdGlvbiwgcmVzKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChlcnJvciwgdGV4dFN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ZXh0U3RhdHVzID09PSBcImFib3J0XCIgfHwgdGV4dFN0YXR1cyA9PT0gXCJwYXJzZXJlcnJvclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoZSBwYXJzZXJlcnJvciBoYXBwZW5zIGZvciBzZW5kcyB0aGF0IGRvbid0IHJldHVybiBhbnkgZGF0YSwgYW5kIGhlbmNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRvbid0IHdyaXRlIHRoZSBqc29ucCBjYWxsYmFjayB0byB0aGUgcmVzcG9uc2UuIFRoaXMgaXMgaGFyZGVyIHRvIGZpeCBvbiB0aGUgc2VydmVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNvIGp1c3QgaGFjayBhcm91bmQgaXQgb24gdGhlIGNsaWVudCBmb3Igbm93LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBvbkZhaWwoZXJyb3IsIGNvbm5lY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB4aHI7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYWpheEFib3J0OiBmdW5jdGlvbiAoY29ubmVjdGlvbiwgYXN5bmMpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiAoY29ubmVjdGlvbi50cmFuc3BvcnQpID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEFzeW5jIGJ5IGRlZmF1bHQgdW5sZXNzIGV4cGxpY2l0bHkgb3ZlcmlkZGVuXHJcbiAgICAgICAgICAgIGFzeW5jID0gdHlwZW9mIGFzeW5jID09PSBcInVuZGVmaW5lZFwiID8gdHJ1ZSA6IGFzeW5jO1xyXG5cclxuICAgICAgICAgICAgdmFyIHVybCA9IGdldEFqYXhVcmwoY29ubmVjdGlvbiwgXCIvYWJvcnRcIik7XHJcblxyXG4gICAgICAgICAgICB0cmFuc3BvcnRMb2dpYy5hamF4KGNvbm5lY3Rpb24sIHtcclxuICAgICAgICAgICAgICAgIHVybDogdXJsLFxyXG4gICAgICAgICAgICAgICAgYXN5bmM6IGFzeW5jLFxyXG4gICAgICAgICAgICAgICAgdGltZW91dDogMTAwMCxcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgY29ubmVjdGlvbi5sb2coXCJGaXJlZCBhamF4IGFib3J0IGFzeW5jID0gXCIgKyBhc3luYyArIFwiLlwiKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBhamF4U3RhcnQ6IGZ1bmN0aW9uIChjb25uZWN0aW9uLCBvblN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgdmFyIHJlamVjdERlZmVycmVkID0gZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSBjb25uZWN0aW9uLl9kZWZlcnJhbDtcclxuICAgICAgICAgICAgICAgIGlmIChkZWZlcnJlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChlcnJvcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB0cmlnZ2VyU3RhcnRFcnJvciA9IGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKFwiVGhlIHN0YXJ0IHJlcXVlc3QgZmFpbGVkLiBTdG9wcGluZyB0aGUgY29ubmVjdGlvbi5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgJChjb25uZWN0aW9uKS50cmlnZ2VySGFuZGxlcihldmVudHMub25FcnJvciwgW2Vycm9yXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0RGVmZXJyZWQoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uc3RvcCgpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24uXy5zdGFydFJlcXVlc3QgPSB0cmFuc3BvcnRMb2dpYy5hamF4KGNvbm5lY3Rpb24sIHtcclxuICAgICAgICAgICAgICAgIHVybDogZ2V0QWpheFVybChjb25uZWN0aW9uLCBcIi9zdGFydFwiKSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXN1bHQsIHN0YXR1c1RleHQsIHhocikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXRhO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0gY29ubmVjdGlvbi5fcGFyc2VSZXNwb25zZShyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyaWdnZXJTdGFydEVycm9yKHNpZ25hbFIuXy5lcnJvcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25hbFIuXy5mb3JtYXQoc2lnbmFsUi5yZXNvdXJjZXMuZXJyb3JQYXJzaW5nU3RhcnRSZXNwb25zZSwgcmVzdWx0KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yLCB4aHIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuUmVzcG9uc2UgPT09IFwic3RhcnRlZFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uU3VjY2VzcygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyaWdnZXJTdGFydEVycm9yKHNpZ25hbFIuXy5lcnJvcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25hbFIuXy5mb3JtYXQoc2lnbmFsUi5yZXNvdXJjZXMuaW52YWxpZFN0YXJ0UmVzcG9uc2UsIHJlc3VsdCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsIC8qIGVycm9yICovLCB4aHIpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uICh4aHIsIHN0YXR1c1RleHQsIGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXR1c1RleHQgIT09IHN0YXJ0QWJvcnRUZXh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyaWdnZXJTdGFydEVycm9yKHNpZ25hbFIuXy5lcnJvcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25hbFIucmVzb3VyY2VzLmVycm9yRHVyaW5nU3RhcnRSZXF1ZXN0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IsIHhocikpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFN0b3AgaGFzIGJlZW4gY2FsbGVkLCBubyBuZWVkIHRvIHRyaWdnZXIgdGhlIGVycm9yIGhhbmRsZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gb3Igc3RvcCB0aGUgY29ubmVjdGlvbiBhZ2FpbiB3aXRoIG9uU3RhcnRFcnJvclxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmxvZyhcIlRoZSBzdGFydCByZXF1ZXN0IGFib3J0ZWQgYmVjYXVzZSBjb25uZWN0aW9uLnN0b3AoKSB3YXMgY2FsbGVkLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0RGVmZXJyZWQoc2lnbmFsUi5fLmVycm9yKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2lnbmFsUi5yZXNvdXJjZXMuc3RvcHBlZER1cmluZ1N0YXJ0UmVxdWVzdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGwgLyogZXJyb3IgKi8sIHhocikpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdHJ5QWJvcnRTdGFydFJlcXVlc3Q6IGZ1bmN0aW9uIChjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIGlmIChjb25uZWN0aW9uLl8uc3RhcnRSZXF1ZXN0KSB7XHJcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgc3RhcnQgcmVxdWVzdCBoYXMgYWxyZWFkeSBjb21wbGV0ZWQgdGhpcyB3aWxsIG5vb3AuXHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLl8uc3RhcnRSZXF1ZXN0LmFib3J0KHN0YXJ0QWJvcnRUZXh0KTtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBjb25uZWN0aW9uLl8uc3RhcnRSZXF1ZXN0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdHJ5SW5pdGlhbGl6ZTogZnVuY3Rpb24gKGNvbm5lY3Rpb24sIHBlcnNpc3RlbnRSZXNwb25zZSwgb25Jbml0aWFsaXplZCkge1xyXG4gICAgICAgICAgICBpZiAocGVyc2lzdGVudFJlc3BvbnNlLkluaXRpYWxpemVkICYmIG9uSW5pdGlhbGl6ZWQpIHtcclxuICAgICAgICAgICAgICAgIG9uSW5pdGlhbGl6ZWQoKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChwZXJzaXN0ZW50UmVzcG9uc2UuSW5pdGlhbGl6ZWQpIHtcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKFwiV0FSTklORyEgVGhlIGNsaWVudCByZWNlaXZlZCBhbiBpbml0IG1lc3NhZ2UgYWZ0ZXIgcmVjb25uZWN0aW5nLlwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB0cmlnZ2VyUmVjZWl2ZWQ6IGZ1bmN0aW9uIChjb25uZWN0aW9uLCBkYXRhKSB7XHJcbiAgICAgICAgICAgIGlmICghY29ubmVjdGlvbi5fLmNvbm5lY3RpbmdNZXNzYWdlQnVmZmVyLnRyeUJ1ZmZlcihkYXRhKSkge1xyXG4gICAgICAgICAgICAgICAgJChjb25uZWN0aW9uKS50cmlnZ2VySGFuZGxlcihldmVudHMub25SZWNlaXZlZCwgW2RhdGFdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHByb2Nlc3NNZXNzYWdlczogZnVuY3Rpb24gKGNvbm5lY3Rpb24sIG1pbkRhdGEsIG9uSW5pdGlhbGl6ZWQpIHtcclxuICAgICAgICAgICAgdmFyIGRhdGE7XHJcblxyXG4gICAgICAgICAgICAvLyBVcGRhdGUgdGhlIGxhc3QgbWVzc2FnZSB0aW1lIHN0YW1wXHJcbiAgICAgICAgICAgIHRyYW5zcG9ydExvZ2ljLm1hcmtMYXN0TWVzc2FnZShjb25uZWN0aW9uKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChtaW5EYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhID0gdHJhbnNwb3J0TG9naWMubWF4aW1pemVQZXJzaXN0ZW50UmVzcG9uc2UobWluRGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdHJhbnNwb3J0TG9naWMudXBkYXRlR3JvdXBzKGNvbm5lY3Rpb24sIGRhdGEuR3JvdXBzVG9rZW4pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLk1lc3NhZ2VJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ubWVzc2FnZUlkID0gZGF0YS5NZXNzYWdlSWQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuTWVzc2FnZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAkLmVhY2goZGF0YS5NZXNzYWdlcywgZnVuY3Rpb24gKGluZGV4LCBtZXNzYWdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zcG9ydExvZ2ljLnRyaWdnZXJSZWNlaXZlZChjb25uZWN0aW9uLCBtZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNwb3J0TG9naWMudHJ5SW5pdGlhbGl6ZShjb25uZWN0aW9uLCBkYXRhLCBvbkluaXRpYWxpemVkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG1vbml0b3JLZWVwQWxpdmU6IGZ1bmN0aW9uIChjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIHZhciBrZWVwQWxpdmVEYXRhID0gY29ubmVjdGlvbi5fLmtlZXBBbGl2ZURhdGE7XHJcblxyXG4gICAgICAgICAgICAvLyBJZiB3ZSBoYXZlbid0IGluaXRpYXRlZCB0aGUga2VlcCBhbGl2ZSB0aW1lb3V0cyB0aGVuIHdlIG5lZWQgdG9cclxuICAgICAgICAgICAgaWYgKCFrZWVwQWxpdmVEYXRhLm1vbml0b3JpbmcpIHtcclxuICAgICAgICAgICAgICAgIGtlZXBBbGl2ZURhdGEubW9uaXRvcmluZyA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgdHJhbnNwb3J0TG9naWMubWFya0xhc3RNZXNzYWdlKGNvbm5lY3Rpb24pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFNhdmUgdGhlIGZ1bmN0aW9uIHNvIHdlIGNhbiB1bmJpbmQgaXQgb24gc3RvcFxyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5fLmtlZXBBbGl2ZURhdGEucmVjb25uZWN0S2VlcEFsaXZlVXBkYXRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIE1hcmsgYSBuZXcgbWVzc2FnZSBzbyB0aGF0IGtlZXAgYWxpdmUgZG9lc24ndCB0aW1lIG91dCBjb25uZWN0aW9uc1xyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zcG9ydExvZ2ljLm1hcmtMYXN0TWVzc2FnZShjb25uZWN0aW9uKTtcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gVXBkYXRlIEtlZXAgYWxpdmUgb24gcmVjb25uZWN0XHJcbiAgICAgICAgICAgICAgICAkKGNvbm5lY3Rpb24pLmJpbmQoZXZlbnRzLm9uUmVjb25uZWN0LCBjb25uZWN0aW9uLl8ua2VlcEFsaXZlRGF0YS5yZWNvbm5lY3RLZWVwQWxpdmVVcGRhdGUpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKFwiTm93IG1vbml0b3Jpbmcga2VlcCBhbGl2ZSB3aXRoIGEgd2FybmluZyB0aW1lb3V0IG9mIFwiICsga2VlcEFsaXZlRGF0YS50aW1lb3V0V2FybmluZyArIFwiLCBrZWVwIGFsaXZlIHRpbWVvdXQgb2YgXCIgKyBrZWVwQWxpdmVEYXRhLnRpbWVvdXQgKyBcIiBhbmQgZGlzY29ubmVjdGluZyB0aW1lb3V0IG9mIFwiICsgY29ubmVjdGlvbi5kaXNjb25uZWN0VGltZW91dCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmxvZyhcIlRyaWVkIHRvIG1vbml0b3Iga2VlcCBhbGl2ZSBidXQgaXQncyBhbHJlYWR5IGJlaW5nIG1vbml0b3JlZC5cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzdG9wTW9uaXRvcmluZ0tlZXBBbGl2ZTogZnVuY3Rpb24gKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgdmFyIGtlZXBBbGl2ZURhdGEgPSBjb25uZWN0aW9uLl8ua2VlcEFsaXZlRGF0YTtcclxuXHJcbiAgICAgICAgICAgIC8vIE9ubHkgYXR0ZW1wdCB0byBzdG9wIHRoZSBrZWVwIGFsaXZlIG1vbml0b3JpbmcgaWYgaXRzIGJlaW5nIG1vbml0b3JlZFxyXG4gICAgICAgICAgICBpZiAoa2VlcEFsaXZlRGF0YS5tb25pdG9yaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBTdG9wIG1vbml0b3JpbmdcclxuICAgICAgICAgICAgICAgIGtlZXBBbGl2ZURhdGEubW9uaXRvcmluZyA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgdXBkYXRlS2VlcEFsaXZlIGZ1bmN0aW9uIGZyb20gdGhlIHJlY29ubmVjdCBldmVudFxyXG4gICAgICAgICAgICAgICAgJChjb25uZWN0aW9uKS51bmJpbmQoZXZlbnRzLm9uUmVjb25uZWN0LCBjb25uZWN0aW9uLl8ua2VlcEFsaXZlRGF0YS5yZWNvbm5lY3RLZWVwQWxpdmVVcGRhdGUpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIENsZWFyIGFsbCB0aGUga2VlcCBhbGl2ZSBkYXRhXHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLl8ua2VlcEFsaXZlRGF0YSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5sb2coXCJTdG9wcGluZyB0aGUgbW9uaXRvcmluZyBvZiB0aGUga2VlcCBhbGl2ZS5cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzdGFydEhlYXJ0YmVhdDogZnVuY3Rpb24gKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgY29ubmVjdGlvbi5fLmxhc3RBY3RpdmVBdCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgICAgICBiZWF0KGNvbm5lY3Rpb24pO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG1hcmtMYXN0TWVzc2FnZTogZnVuY3Rpb24gKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgY29ubmVjdGlvbi5fLmxhc3RNZXNzYWdlQXQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBtYXJrQWN0aXZlOiBmdW5jdGlvbiAoY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICBpZiAodHJhbnNwb3J0TG9naWMudmVyaWZ5TGFzdEFjdGl2ZShjb25uZWN0aW9uKSkge1xyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5fLmxhc3RBY3RpdmVBdCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBpc0Nvbm5lY3RlZE9yUmVjb25uZWN0aW5nOiBmdW5jdGlvbiAoY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gY29ubmVjdGlvbi5zdGF0ZSA9PT0gc2lnbmFsUi5jb25uZWN0aW9uU3RhdGUuY29ubmVjdGVkIHx8XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnN0YXRlID09PSBzaWduYWxSLmNvbm5lY3Rpb25TdGF0ZS5yZWNvbm5lY3Rpbmc7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZW5zdXJlUmVjb25uZWN0aW5nU3RhdGU6IGZ1bmN0aW9uIChjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIGlmIChjaGFuZ2VTdGF0ZShjb25uZWN0aW9uLFxyXG4gICAgICAgICAgICAgICAgc2lnbmFsUi5jb25uZWN0aW9uU3RhdGUuY29ubmVjdGVkLFxyXG4gICAgICAgICAgICAgICAgc2lnbmFsUi5jb25uZWN0aW9uU3RhdGUucmVjb25uZWN0aW5nKSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgJChjb25uZWN0aW9uKS50cmlnZ2VySGFuZGxlcihldmVudHMub25SZWNvbm5lY3RpbmcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBjb25uZWN0aW9uLnN0YXRlID09PSBzaWduYWxSLmNvbm5lY3Rpb25TdGF0ZS5yZWNvbm5lY3Rpbmc7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY2xlYXJSZWNvbm5lY3RUaW1lb3V0OiBmdW5jdGlvbiAoY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICBpZiAoY29ubmVjdGlvbiAmJiBjb25uZWN0aW9uLl8ucmVjb25uZWN0VGltZW91dCkge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmNsZWFyVGltZW91dChjb25uZWN0aW9uLl8ucmVjb25uZWN0VGltZW91dCk7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgY29ubmVjdGlvbi5fLnJlY29ubmVjdFRpbWVvdXQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB2ZXJpZnlMYXN0QWN0aXZlOiBmdW5jdGlvbiAoY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICBpZiAobmV3IERhdGUoKS5nZXRUaW1lKCkgLSBjb25uZWN0aW9uLl8ubGFzdEFjdGl2ZUF0ID49IGNvbm5lY3Rpb24ucmVjb25uZWN0V2luZG93KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IHNpZ25hbFIuXy5mb3JtYXQoc2lnbmFsUi5yZXNvdXJjZXMucmVjb25uZWN0V2luZG93VGltZW91dCwgbmV3IERhdGUoY29ubmVjdGlvbi5fLmxhc3RBY3RpdmVBdCksIGNvbm5lY3Rpb24ucmVjb25uZWN0V2luZG93KTtcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgJChjb25uZWN0aW9uKS50cmlnZ2VySGFuZGxlcihldmVudHMub25FcnJvciwgW3NpZ25hbFIuXy5lcnJvcihtZXNzYWdlLCAvKiBzb3VyY2UgKi8gXCJUaW1lb3V0RXhjZXB0aW9uXCIpXSk7XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnN0b3AoLyogYXN5bmMgKi8gZmFsc2UsIC8qIG5vdGlmeVNlcnZlciAqLyBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHJlY29ubmVjdDogZnVuY3Rpb24gKGNvbm5lY3Rpb24sIHRyYW5zcG9ydE5hbWUpIHtcclxuICAgICAgICAgICAgdmFyIHRyYW5zcG9ydCA9IHNpZ25hbFIudHJhbnNwb3J0c1t0cmFuc3BvcnROYW1lXTtcclxuXHJcbiAgICAgICAgICAgIC8vIFdlIHNob3VsZCBvbmx5IHNldCBhIHJlY29ubmVjdFRpbWVvdXQgaWYgd2UgYXJlIGN1cnJlbnRseSBjb25uZWN0ZWRcclxuICAgICAgICAgICAgLy8gYW5kIGEgcmVjb25uZWN0VGltZW91dCBpc24ndCBhbHJlYWR5IHNldC5cclxuICAgICAgICAgICAgaWYgKHRyYW5zcG9ydExvZ2ljLmlzQ29ubmVjdGVkT3JSZWNvbm5lY3RpbmcoY29ubmVjdGlvbikgJiYgIWNvbm5lY3Rpb24uXy5yZWNvbm5lY3RUaW1lb3V0KSB7XHJcbiAgICAgICAgICAgICAgICAvLyBOZWVkIHRvIHZlcmlmeSBiZWZvcmUgdGhlIHNldFRpbWVvdXQgb2NjdXJzIGJlY2F1c2UgYW4gYXBwbGljYXRpb24gc2xlZXAgY291bGQgb2NjdXIgZHVyaW5nIHRoZSBzZXRUaW1lb3V0IGR1cmF0aW9uLlxyXG4gICAgICAgICAgICAgICAgaWYgKCF0cmFuc3BvcnRMb2dpYy52ZXJpZnlMYXN0QWN0aXZlKGNvbm5lY3Rpb24pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uXy5yZWNvbm5lY3RUaW1lb3V0ID0gd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdHJhbnNwb3J0TG9naWMudmVyaWZ5TGFzdEFjdGl2ZShjb25uZWN0aW9uKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnQuc3RvcChjb25uZWN0aW9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRyYW5zcG9ydExvZ2ljLmVuc3VyZVJlY29ubmVjdGluZ1N0YXRlKGNvbm5lY3Rpb24pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKHRyYW5zcG9ydE5hbWUgKyBcIiByZWNvbm5lY3RpbmcuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnQuc3RhcnQoY29ubmVjdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgY29ubmVjdGlvbi5yZWNvbm5lY3REZWxheSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBoYW5kbGVQYXJzZUZhaWx1cmU6IGZ1bmN0aW9uIChjb25uZWN0aW9uLCByZXN1bHQsIGVycm9yLCBvbkZhaWxlZCwgY29udGV4dCkge1xyXG4gICAgICAgICAgICB2YXIgd3JhcHBlZEVycm9yID0gc2lnbmFsUi5fLnRyYW5zcG9ydEVycm9yKFxyXG4gICAgICAgICAgICAgICAgc2lnbmFsUi5fLmZvcm1hdChzaWduYWxSLnJlc291cmNlcy5wYXJzZUZhaWxlZCwgcmVzdWx0KSxcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24udHJhbnNwb3J0LFxyXG4gICAgICAgICAgICAgICAgZXJyb3IsXHJcbiAgICAgICAgICAgICAgICBjb250ZXh0KTtcclxuXHJcbiAgICAgICAgICAgIC8vIElmIHdlJ3JlIGluIHRoZSBpbml0aWFsaXphdGlvbiBwaGFzZSB0cmlnZ2VyIG9uRmFpbGVkLCBvdGhlcndpc2Ugc3RvcCB0aGUgY29ubmVjdGlvbi5cclxuICAgICAgICAgICAgaWYgKG9uRmFpbGVkICYmIG9uRmFpbGVkKHdyYXBwZWRFcnJvcikpIHtcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKFwiRmFpbGVkIHRvIHBhcnNlIHNlcnZlciByZXNwb25zZSB3aGlsZSBhdHRlbXB0aW5nIHRvIGNvbm5lY3QuXCIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJChjb25uZWN0aW9uKS50cmlnZ2VySGFuZGxlcihldmVudHMub25FcnJvciwgW3dyYXBwZWRFcnJvcl0pO1xyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5zdG9wKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBpbml0SGFuZGxlcjogZnVuY3Rpb24gKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBJbml0SGFuZGxlcihjb25uZWN0aW9uKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBmb3JldmVyRnJhbWU6IHtcclxuICAgICAgICAgICAgY291bnQ6IDAsXHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb25zOiB7fVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG59KGpRdWVyeVNoaW0sIHdpbmRvdykpO1xyXG4vKiBqcXVlcnkuc2lnbmFsUi50cmFuc3BvcnRzLndlYlNvY2tldHMuanMgKi9cclxuLy8gQ29weXJpZ2h0IChjKSAuTkVUIEZvdW5kYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxyXG5cclxuXHJcbi8qZ2xvYmFsIHdpbmRvdzpmYWxzZSAqL1xyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwianF1ZXJ5LnNpZ25hbFIudHJhbnNwb3J0cy5jb21tb24uanNcIiAvPlxyXG5cclxuKGZ1bmN0aW9uICgkLCB3aW5kb3csIHVuZGVmaW5lZCkge1xyXG5cclxuICAgIHZhciBzaWduYWxSID0gJC5zaWduYWxSLFxyXG4gICAgICAgIGV2ZW50cyA9ICQuc2lnbmFsUi5ldmVudHMsXHJcbiAgICAgICAgY2hhbmdlU3RhdGUgPSAkLnNpZ25hbFIuY2hhbmdlU3RhdGUsXHJcbiAgICAgICAgdHJhbnNwb3J0TG9naWMgPSBzaWduYWxSLnRyYW5zcG9ydHMuX2xvZ2ljO1xyXG5cclxuICAgIHNpZ25hbFIudHJhbnNwb3J0cy53ZWJTb2NrZXRzID0ge1xyXG4gICAgICAgIG5hbWU6IFwid2ViU29ja2V0c1wiLFxyXG5cclxuICAgICAgICBzdXBwb3J0c0tlZXBBbGl2ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzZW5kOiBmdW5jdGlvbiAoY29ubmVjdGlvbiwgZGF0YSkge1xyXG4gICAgICAgICAgICB2YXIgcGF5bG9hZCA9IHRyYW5zcG9ydExvZ2ljLnN0cmluZ2lmeVNlbmQoY29ubmVjdGlvbiwgZGF0YSk7XHJcblxyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5zb2NrZXQuc2VuZChwYXlsb2FkKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZXgpIHtcclxuICAgICAgICAgICAgICAgICQoY29ubmVjdGlvbikudHJpZ2dlckhhbmRsZXIoZXZlbnRzLm9uRXJyb3IsXHJcbiAgICAgICAgICAgICAgICAgICAgW3NpZ25hbFIuXy50cmFuc3BvcnRFcnJvcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2lnbmFsUi5yZXNvdXJjZXMud2ViU29ja2V0c0ludmFsaWRTdGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi50cmFuc3BvcnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnNvY2tldFxyXG4gICAgICAgICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHN0YXJ0OiBmdW5jdGlvbiAoY29ubmVjdGlvbiwgb25TdWNjZXNzLCBvbkZhaWxlZCkge1xyXG4gICAgICAgICAgICB2YXIgdXJsLFxyXG4gICAgICAgICAgICAgICAgb3BlbmVkID0gZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB0aGF0ID0gdGhpcyxcclxuICAgICAgICAgICAgICAgIHJlY29ubmVjdGluZyA9ICFvblN1Y2Nlc3MsXHJcbiAgICAgICAgICAgICAgICAkY29ubmVjdGlvbiA9ICQoY29ubmVjdGlvbik7XHJcblxyXG4gICAgICAgICAgICBpZiAoISh3aW5kb3cgYXMgYW55KS5XZWJTb2NrZXQpIHtcclxuICAgICAgICAgICAgICAgIG9uRmFpbGVkKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICghY29ubmVjdGlvbi5zb2NrZXQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChjb25uZWN0aW9uLndlYlNvY2tldFNlcnZlclVybCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVybCA9IGNvbm5lY3Rpb24ud2ViU29ja2V0U2VydmVyVXJsO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1cmwgPSBjb25uZWN0aW9uLndzUHJvdG9jb2wgKyBjb25uZWN0aW9uLmhvc3Q7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdXJsICs9IHRyYW5zcG9ydExvZ2ljLmdldFVybChjb25uZWN0aW9uLCB0aGlzLm5hbWUsIHJlY29ubmVjdGluZyk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5sb2coXCJDb25uZWN0aW5nIHRvIHdlYnNvY2tldCBlbmRwb2ludCAnXCIgKyB1cmwgKyBcIicuXCIpO1xyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5zb2NrZXQgPSBuZXcgV2ViU29ja2V0KHVybCk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5zb2NrZXQub25vcGVuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5lZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5sb2coXCJXZWJzb2NrZXQgb3BlbmVkLlwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNwb3J0TG9naWMuY2xlYXJSZWNvbm5lY3RUaW1lb3V0KGNvbm5lY3Rpb24pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2hhbmdlU3RhdGUoY29ubmVjdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2lnbmFsUi5jb25uZWN0aW9uU3RhdGUucmVjb25uZWN0aW5nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaWduYWxSLmNvbm5lY3Rpb25TdGF0ZS5jb25uZWN0ZWQpID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRjb25uZWN0aW9uLnRyaWdnZXJIYW5kbGVyKGV2ZW50cy5vblJlY29ubmVjdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnNvY2tldC5vbmNsb3NlID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVycm9yO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBPbmx5IGhhbmRsZSBhIHNvY2tldCBjbG9zZSBpZiB0aGUgY2xvc2UgaXMgZnJvbSB0aGUgY3VycmVudCBzb2NrZXQuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gU29tZXRpbWVzIG9uIGRpc2Nvbm5lY3QgdGhlIHNlcnZlciB3aWxsIHB1c2ggZG93biBhbiBvbmNsb3NlIGV2ZW50XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdG8gYW4gZXhwaXJlZCBzb2NrZXQuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzID09PSBjb25uZWN0aW9uLnNvY2tldCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3BlbmVkICYmIHR5cGVvZiBldmVudC53YXNDbGVhbiAhPT0gXCJ1bmRlZmluZWRcIiAmJiBldmVudC53YXNDbGVhbiA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIElkZWFsbHkgdGhpcyB3b3VsZCB1c2UgdGhlIHdlYnNvY2tldC5vbmVycm9yIGhhbmRsZXIgKHJhdGhlciB0aGFuIGNoZWNraW5nIHdhc0NsZWFuIGluIG9uY2xvc2UpIGJ1dFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSSBmb3VuZCBpbiBzb21lIGNpcmN1bXN0YW5jZXMgQ2hyb21lIHdvbid0IGNhbGwgb25lcnJvci4gVGhpcyBpbXBsZW1lbnRhdGlvbiBzZWVtcyB0byB3b3JrIG9uIGFsbCBicm93c2Vycy5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yID0gc2lnbmFsUi5fLnRyYW5zcG9ydEVycm9yKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25hbFIucmVzb3VyY2VzLndlYlNvY2tldENsb3NlZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnRyYW5zcG9ydCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5sb2coXCJVbmNsZWFuIGRpc2Nvbm5lY3QgZnJvbSB3ZWJzb2NrZXQ6IFwiICsgKGV2ZW50LnJlYXNvbiB8fCBcIltubyByZWFzb24gZ2l2ZW5dLlwiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmxvZyhcIldlYnNvY2tldCBjbG9zZWQuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW9uRmFpbGVkIHx8ICFvbkZhaWxlZChlcnJvcikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoY29ubmVjdGlvbikudHJpZ2dlckhhbmRsZXIoZXZlbnRzLm9uRXJyb3IsIFtlcnJvcl0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucmVjb25uZWN0KGNvbm5lY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnNvY2tldC5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSA9IGNvbm5lY3Rpb24uX3BhcnNlUmVzcG9uc2UoZXZlbnQuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnRMb2dpYy5oYW5kbGVQYXJzZUZhaWx1cmUoY29ubmVjdGlvbiwgZXZlbnQuZGF0YSwgZXJyb3IsIG9uRmFpbGVkLCBldmVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRhdGEuTSBpcyBQZXJzaXN0ZW50UmVzcG9uc2UuTWVzc2FnZXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQuaXNFbXB0eU9iamVjdChkYXRhKSB8fCBkYXRhLk0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zcG9ydExvZ2ljLnByb2Nlc3NNZXNzYWdlcyhjb25uZWN0aW9uLCBkYXRhLCBvblN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRm9yIHdlYnNvY2tldHMgd2UgbmVlZCB0byB0cmlnZ2VyIG9uUmVjZWl2ZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGZvciBjYWxsYmFja3MgdG8gb3V0Z29pbmcgaHViIGNhbGxzLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNwb3J0TG9naWMudHJpZ2dlclJlY2VpdmVkKGNvbm5lY3Rpb24sIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHJlY29ubmVjdDogZnVuY3Rpb24gKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgdHJhbnNwb3J0TG9naWMucmVjb25uZWN0KGNvbm5lY3Rpb24sIHRoaXMubmFtZSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgbG9zdENvbm5lY3Rpb246IGZ1bmN0aW9uIChjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVjb25uZWN0KGNvbm5lY3Rpb24pO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHN0b3A6IGZ1bmN0aW9uIChjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIC8vIERvbid0IHRyaWdnZXIgYSByZWNvbm5lY3QgYWZ0ZXIgc3RvcHBpbmdcclxuICAgICAgICAgICAgdHJhbnNwb3J0TG9naWMuY2xlYXJSZWNvbm5lY3RUaW1lb3V0KGNvbm5lY3Rpb24pO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNvbm5lY3Rpb24uc29ja2V0KSB7XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmxvZyhcIkNsb3NpbmcgdGhlIFdlYnNvY2tldC5cIik7XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnNvY2tldC5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5zb2NrZXQgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYWJvcnQ6IGZ1bmN0aW9uIChjb25uZWN0aW9uLCBhc3luYykge1xyXG4gICAgICAgICAgICB0cmFuc3BvcnRMb2dpYy5hamF4QWJvcnQoY29ubmVjdGlvbiwgYXN5bmMpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG59KGpRdWVyeVNoaW0sIHdpbmRvdykpO1xyXG4vKiBqcXVlcnkuc2lnbmFsUi50cmFuc3BvcnRzLnNlcnZlclNlbnRFdmVudHMuanMgKi9cclxuLy8gQ29weXJpZ2h0IChjKSAuTkVUIEZvdW5kYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxyXG5cclxuXHJcbi8qZ2xvYmFsIHdpbmRvdzpmYWxzZSAqL1xyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwianF1ZXJ5LnNpZ25hbFIudHJhbnNwb3J0cy5jb21tb24uanNcIiAvPlxyXG5cclxuKGZ1bmN0aW9uICgkLCB3aW5kb3csIHVuZGVmaW5lZCkge1xyXG5cclxuICAgIHZhciBzaWduYWxSID0gJC5zaWduYWxSLFxyXG4gICAgICAgIGV2ZW50cyA9ICQuc2lnbmFsUi5ldmVudHMsXHJcbiAgICAgICAgY2hhbmdlU3RhdGUgPSAkLnNpZ25hbFIuY2hhbmdlU3RhdGUsXHJcbiAgICAgICAgdHJhbnNwb3J0TG9naWMgPSBzaWduYWxSLnRyYW5zcG9ydHMuX2xvZ2ljLFxyXG4gICAgICAgIGNsZWFyUmVjb25uZWN0QXR0ZW1wdFRpbWVvdXQgPSBmdW5jdGlvbiAoY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KGNvbm5lY3Rpb24uXy5yZWNvbm5lY3RBdHRlbXB0VGltZW91dEhhbmRsZSk7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBjb25uZWN0aW9uLl8ucmVjb25uZWN0QXR0ZW1wdFRpbWVvdXRIYW5kbGU7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICBzaWduYWxSLnRyYW5zcG9ydHMuc2VydmVyU2VudEV2ZW50cyA9IHtcclxuICAgICAgICBuYW1lOiBcInNlcnZlclNlbnRFdmVudHNcIixcclxuXHJcbiAgICAgICAgc3VwcG9ydHNLZWVwQWxpdmU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdGltZU91dDogMzAwMCxcclxuXHJcbiAgICAgICAgc3RhcnQ6IGZ1bmN0aW9uIChjb25uZWN0aW9uLCBvblN1Y2Nlc3MsIG9uRmFpbGVkKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcyxcclxuICAgICAgICAgICAgICAgIG9wZW5lZCA9IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgJGNvbm5lY3Rpb24gPSAkKGNvbm5lY3Rpb24pLFxyXG4gICAgICAgICAgICAgICAgcmVjb25uZWN0aW5nID0gIW9uU3VjY2VzcyxcclxuICAgICAgICAgICAgICAgIHVybDtcclxuXHJcbiAgICAgICAgICAgIGlmIChjb25uZWN0aW9uLmV2ZW50U291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmxvZyhcIlRoZSBjb25uZWN0aW9uIGFscmVhZHkgaGFzIGFuIGV2ZW50IHNvdXJjZS4gU3RvcHBpbmcgaXQuXCIpO1xyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5zdG9wKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICghKHdpbmRvdyBhcyBhbnkpLkV2ZW50U291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob25GYWlsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmxvZyhcIlRoaXMgYnJvd3NlciBkb2Vzbid0IHN1cHBvcnQgU1NFLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICBvbkZhaWxlZCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB1cmwgPSB0cmFuc3BvcnRMb2dpYy5nZXRVcmwoY29ubmVjdGlvbiwgdGhpcy5uYW1lLCByZWNvbm5lY3RpbmcpO1xyXG5cclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKFwiQXR0ZW1wdGluZyB0byBjb25uZWN0IHRvIFNTRSBlbmRwb2ludCAnXCIgKyB1cmwgKyBcIicuXCIpO1xyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5ldmVudFNvdXJjZSA9IG5ldyBFdmVudFNvdXJjZSh1cmwsIHsgd2l0aENyZWRlbnRpYWxzOiBjb25uZWN0aW9uLndpdGhDcmVkZW50aWFscyB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5sb2coXCJFdmVudFNvdXJjZSBmYWlsZWQgdHJ5aW5nIHRvIGNvbm5lY3Qgd2l0aCBlcnJvciBcIiArIGUuTWVzc2FnZSArIFwiLlwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChvbkZhaWxlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRoZSBjb25uZWN0aW9uIGZhaWxlZCwgY2FsbCB0aGUgZmFpbGVkIGNhbGxiYWNrXHJcbiAgICAgICAgICAgICAgICAgICAgb25GYWlsZWQoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGNvbm5lY3Rpb24udHJpZ2dlckhhbmRsZXIoZXZlbnRzLm9uRXJyb3IsIFtzaWduYWxSLl8udHJhbnNwb3J0RXJyb3Ioc2lnbmFsUi5yZXNvdXJjZXMuZXZlbnRTb3VyY2VGYWlsZWRUb0Nvbm5lY3QsIGNvbm5lY3Rpb24udHJhbnNwb3J0LCBlKV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZWNvbm5lY3RpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgd2Ugd2VyZSByZWNvbm5lY3RpbmcsIHJhdGhlciB0aGFuIGRvaW5nIGluaXRpYWwgY29ubmVjdCwgdGhlbiB0cnkgcmVjb25uZWN0IGFnYWluXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucmVjb25uZWN0KGNvbm5lY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHJlY29ubmVjdGluZykge1xyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5fLnJlY29ubmVjdEF0dGVtcHRUaW1lb3V0SGFuZGxlID0gd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcGVuZWQgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHdlJ3JlIHJlY29ubmVjdGluZyBhbmQgdGhlIGV2ZW50IHNvdXJjZSBpcyBhdHRlbXB0aW5nIHRvIGNvbm5lY3QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRvbid0IGtlZXAgcmV0cnlpbmcuIFRoaXMgY2F1c2VzIGR1cGxpY2F0ZSBjb25uZWN0aW9ucyB0byBzcGF3bi5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbm5lY3Rpb24uZXZlbnRTb3VyY2UucmVhZHlTdGF0ZSAhPT0gRXZlbnRTb3VyY2UuT1BFTikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgd2Ugd2VyZSByZWNvbm5lY3RpbmcsIHJhdGhlciB0aGFuIGRvaW5nIGluaXRpYWwgY29ubmVjdCwgdGhlbiB0cnkgcmVjb25uZWN0IGFnYWluXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnJlY29ubmVjdChjb25uZWN0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50aW1lT3V0KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29ubmVjdGlvbi5ldmVudFNvdXJjZS5hZGRFdmVudExpc3RlbmVyKFwib3BlblwiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5sb2coXCJFdmVudFNvdXJjZSBjb25uZWN0ZWQuXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNsZWFyUmVjb25uZWN0QXR0ZW1wdFRpbWVvdXQoY29ubmVjdGlvbik7XHJcbiAgICAgICAgICAgICAgICB0cmFuc3BvcnRMb2dpYy5jbGVhclJlY29ubmVjdFRpbWVvdXQoY29ubmVjdGlvbik7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG9wZW5lZCA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBvcGVuZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2hhbmdlU3RhdGUoY29ubmVjdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2lnbmFsUi5jb25uZWN0aW9uU3RhdGUucmVjb25uZWN0aW5nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaWduYWxSLmNvbm5lY3Rpb25TdGF0ZS5jb25uZWN0ZWQpID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRjb25uZWN0aW9uLnRyaWdnZXJIYW5kbGVyKGV2ZW50cy5vblJlY29ubmVjdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICBjb25uZWN0aW9uLmV2ZW50U291cmNlLmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHByb2Nlc3MgbWVzc2FnZXNcclxuICAgICAgICAgICAgICAgIGlmIChlLmRhdGEgPT09IFwiaW5pdGlhbGl6ZWRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcyA9IGNvbm5lY3Rpb24uX3BhcnNlUmVzcG9uc2UoZS5kYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zcG9ydExvZ2ljLmhhbmRsZVBhcnNlRmFpbHVyZShjb25uZWN0aW9uLCBlLmRhdGEsIGVycm9yLCBvbkZhaWxlZCwgZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRyYW5zcG9ydExvZ2ljLnByb2Nlc3NNZXNzYWdlcyhjb25uZWN0aW9uLCByZXMsIG9uU3VjY2Vzcyk7XHJcbiAgICAgICAgICAgIH0sIGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24uZXZlbnRTb3VyY2UuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSBzaWduYWxSLl8udHJhbnNwb3J0RXJyb3IoXHJcbiAgICAgICAgICAgICAgICAgICAgc2lnbmFsUi5yZXNvdXJjZXMuZXZlbnRTb3VyY2VFcnJvcixcclxuICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnRyYW5zcG9ydCxcclxuICAgICAgICAgICAgICAgICAgICBlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBPbmx5IGhhbmRsZSBhbiBlcnJvciBpZiB0aGUgZXJyb3IgaXMgZnJvbSB0aGUgY3VycmVudCBFdmVudCBTb3VyY2UuXHJcbiAgICAgICAgICAgICAgICAvLyBTb21ldGltZXMgb24gZGlzY29ubmVjdCB0aGUgc2VydmVyIHdpbGwgcHVzaCBkb3duIGFuIGVycm9yIGV2ZW50XHJcbiAgICAgICAgICAgICAgICAvLyB0byBhbiBleHBpcmVkIEV2ZW50IFNvdXJjZS5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzICE9PSBjb25uZWN0aW9uLmV2ZW50U291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChvbkZhaWxlZCAmJiBvbkZhaWxlZChlcnJvcikpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5sb2coXCJFdmVudFNvdXJjZSByZWFkeVN0YXRlOiBcIiArIGNvbm5lY3Rpb24uZXZlbnRTb3VyY2UucmVhZHlTdGF0ZSArIFwiLlwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZS5ldmVudFBoYXNlID09PSBFdmVudFNvdXJjZS5DTE9TRUQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBXZSBkb24ndCB1c2UgdGhlIEV2ZW50U291cmNlJ3MgbmF0aXZlIHJlY29ubmVjdCBmdW5jdGlvbiBhcyBpdFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGRvZXNuJ3QgYWxsb3cgdXMgdG8gY2hhbmdlIHRoZSBVUkwgd2hlbiByZWNvbm5lY3RpbmcuIFdlIG5lZWRcclxuICAgICAgICAgICAgICAgICAgICAvLyB0byBjaGFuZ2UgdGhlIFVSTCB0byBub3QgaW5jbHVkZSB0aGUgL2Nvbm5lY3Qgc3VmZml4LCBhbmQgcGFzc1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoZSBsYXN0IG1lc3NhZ2UgaWQgd2UgcmVjZWl2ZWQuXHJcbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5sb2coXCJFdmVudFNvdXJjZSByZWNvbm5lY3RpbmcgZHVlIHRvIHRoZSBzZXJ2ZXIgY29ubmVjdGlvbiBlbmRpbmcuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQucmVjb25uZWN0KGNvbm5lY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25uZWN0aW9uIGVycm9yXHJcbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5sb2coXCJFdmVudFNvdXJjZSBlcnJvci5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgJGNvbm5lY3Rpb24udHJpZ2dlckhhbmRsZXIoZXZlbnRzLm9uRXJyb3IsIFtlcnJvcl0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBmYWxzZSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcmVjb25uZWN0OiBmdW5jdGlvbiAoY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICB0cmFuc3BvcnRMb2dpYy5yZWNvbm5lY3QoY29ubmVjdGlvbiwgdGhpcy5uYW1lKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBsb3N0Q29ubmVjdGlvbjogZnVuY3Rpb24gKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgdGhpcy5yZWNvbm5lY3QoY29ubmVjdGlvbik7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2VuZDogZnVuY3Rpb24gKGNvbm5lY3Rpb24sIGRhdGEpIHtcclxuICAgICAgICAgICAgdHJhbnNwb3J0TG9naWMuYWpheFNlbmQoY29ubmVjdGlvbiwgZGF0YSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc3RvcDogZnVuY3Rpb24gKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgLy8gRG9uJ3QgdHJpZ2dlciBhIHJlY29ubmVjdCBhZnRlciBzdG9wcGluZ1xyXG4gICAgICAgICAgICBjbGVhclJlY29ubmVjdEF0dGVtcHRUaW1lb3V0KGNvbm5lY3Rpb24pO1xyXG4gICAgICAgICAgICB0cmFuc3BvcnRMb2dpYy5jbGVhclJlY29ubmVjdFRpbWVvdXQoY29ubmVjdGlvbik7XHJcblxyXG4gICAgICAgICAgICBpZiAoY29ubmVjdGlvbiAmJiBjb25uZWN0aW9uLmV2ZW50U291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmxvZyhcIkV2ZW50U291cmNlIGNhbGxpbmcgY2xvc2UoKS5cIik7XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmV2ZW50U291cmNlLmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmV2ZW50U291cmNlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBjb25uZWN0aW9uLmV2ZW50U291cmNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYWJvcnQ6IGZ1bmN0aW9uIChjb25uZWN0aW9uLCBhc3luYykge1xyXG4gICAgICAgICAgICB0cmFuc3BvcnRMb2dpYy5hamF4QWJvcnQoY29ubmVjdGlvbiwgYXN5bmMpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG59KGpRdWVyeVNoaW0sIHdpbmRvdykpO1xyXG4vKiBqcXVlcnkuc2lnbmFsUi50cmFuc3BvcnRzLmZvcmV2ZXJGcmFtZS5qcyAqL1xyXG4vLyBDb3B5cmlnaHQgKGMpIC5ORVQgRm91bmRhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXHJcblxyXG5cclxuLypnbG9iYWwgd2luZG93OmZhbHNlICovXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJqcXVlcnkuc2lnbmFsUi50cmFuc3BvcnRzLmNvbW1vbi5qc1wiIC8+XHJcblxyXG4oZnVuY3Rpb24gKCQsIHdpbmRvdywgdW5kZWZpbmVkKSB7XHJcblxyXG4gICAgdmFyIHNpZ25hbFIgPSAkLnNpZ25hbFIsXHJcbiAgICAgICAgZXZlbnRzID0gJC5zaWduYWxSLmV2ZW50cyxcclxuICAgICAgICBjaGFuZ2VTdGF0ZSA9ICQuc2lnbmFsUi5jaGFuZ2VTdGF0ZSxcclxuICAgICAgICB0cmFuc3BvcnRMb2dpYyA9IHNpZ25hbFIudHJhbnNwb3J0cy5fbG9naWMsXHJcbiAgICAgICAgY3JlYXRlRnJhbWUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBmcmFtZSA9IHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaWZyYW1lXCIpO1xyXG4gICAgICAgICAgICBmcmFtZS5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcInBvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDt3aWR0aDowO2hlaWdodDowO3Zpc2liaWxpdHk6aGlkZGVuO1wiKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZyYW1lO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy8gVXNlZCB0byBwcmV2ZW50IGluZmluaXRlIGxvYWRpbmcgaWNvbiBzcGlucyBpbiBvbGRlciB2ZXJzaW9ucyBvZiBpZVxyXG4gICAgICAgIC8vIFdlIGJ1aWxkIHRoaXMgb2JqZWN0IGluc2lkZSBhIGNsb3N1cmUgc28gd2UgZG9uJ3QgcG9sbHV0ZSB0aGUgcmVzdCBvZlxyXG4gICAgICAgIC8vIHRoZSBmb3JldmVyRnJhbWUgdHJhbnNwb3J0IHdpdGggdW5uZWNlc3NhcnkgZnVuY3Rpb25zL3V0aWxpdGllcy5cclxuICAgICAgICBsb2FkUHJldmVudGVyID0gKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGxvYWRpbmdGaXhJbnRlcnZhbElkID0gbnVsbCxcclxuICAgICAgICAgICAgICAgIGxvYWRpbmdGaXhJbnRlcnZhbCA9IDEwMDAsXHJcbiAgICAgICAgICAgICAgICBhdHRhY2hlZFRvID0gMDtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBwcmV2ZW50OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUHJldmVudCBhZGRpdGlvbmFsIGlmcmFtZSByZW1vdmFsIHByb2NlZHVyZXMgZnJvbSBuZXdlciBicm93c2Vyc1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzaWduYWxSLl8uaWVWZXJzaW9uIDw9IDgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2Ugb25seSBldmVyIHdhbnQgdG8gc2V0IHRoZSBpbnRlcnZhbCBvbmUgdGltZSwgc28gb24gdGhlIGZpcnN0IGF0dGFjaGVkVG9cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGF0dGFjaGVkVG8gPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBhbmQgZGVzdHJveSBpZnJhbWUgZXZlcnkgMyBzZWNvbmRzIHRvIHByZXZlbnQgbG9hZGluZyBpY29uLCBzdXBlciBoYWNreVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9hZGluZ0ZpeEludGVydmFsSWQgPSB3aW5kb3cuc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0ZW1wRnJhbWUgPSBjcmVhdGVGcmFtZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0ZW1wRnJhbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5kb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRlbXBGcmFtZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBGcmFtZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBsb2FkaW5nRml4SW50ZXJ2YWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRhY2hlZFRvKys7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGNhbmNlbDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIE9ubHkgY2xlYXIgdGhlIGludGVydmFsIGlmIHRoZXJlJ3Mgb25seSBvbmUgbW9yZSBvYmplY3QgdGhhdCB0aGUgbG9hZFByZXZlbnRlciBpcyBhdHRhY2hlZFRvXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGF0dGFjaGVkVG8gPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmNsZWFySW50ZXJ2YWwobG9hZGluZ0ZpeEludGVydmFsSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGF0dGFjaGVkVG8gPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dGFjaGVkVG8tLTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSkoKTtcclxuXHJcbiAgICBzaWduYWxSLnRyYW5zcG9ydHMuZm9yZXZlckZyYW1lID0ge1xyXG4gICAgICAgIG5hbWU6IFwiZm9yZXZlckZyYW1lXCIsXHJcblxyXG4gICAgICAgIHN1cHBvcnRzS2VlcEFsaXZlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIEFkZGVkIGFzIGEgdmFsdWUgaGVyZSBzbyB3ZSBjYW4gY3JlYXRlIHRlc3RzIHRvIHZlcmlmeSBmdW5jdGlvbmFsaXR5XHJcbiAgICAgICAgaWZyYW1lQ2xlYXJUaHJlc2hvbGQ6IDUwLFxyXG5cclxuICAgICAgICBzdGFydDogZnVuY3Rpb24gKGNvbm5lY3Rpb24sIG9uU3VjY2Vzcywgb25GYWlsZWQpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzLFxyXG4gICAgICAgICAgICAgICAgZnJhbWVJZCA9ICh0cmFuc3BvcnRMb2dpYy5mb3JldmVyRnJhbWUuY291bnQgKz0gMSksXHJcbiAgICAgICAgICAgICAgICB1cmwsXHJcbiAgICAgICAgICAgICAgICBmcmFtZSA9IGNyZWF0ZUZyYW1lKCksXHJcbiAgICAgICAgICAgICAgICBmcmFtZUxvYWRIYW5kbGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKFwiRm9yZXZlciBmcmFtZSBpZnJhbWUgZmluaXNoZWQgbG9hZGluZyBhbmQgaXMgbm8gbG9uZ2VyIHJlY2VpdmluZyBtZXNzYWdlcy5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFvbkZhaWxlZCB8fCAhb25GYWlsZWQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnJlY29ubmVjdChjb25uZWN0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgaWYgKCh3aW5kb3cgYXMgYW55KS5FdmVudFNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIGJyb3dzZXIgc3VwcG9ydHMgU1NFLCBkb24ndCB1c2UgRm9yZXZlciBGcmFtZVxyXG4gICAgICAgICAgICAgICAgaWYgKG9uRmFpbGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5sb2coXCJGb3JldmVyIEZyYW1lIGlzIG5vdCBzdXBwb3J0ZWQgYnkgU2lnbmFsUiBvbiBicm93c2VycyB3aXRoIFNTRSBzdXBwb3J0LlwiKTtcclxuICAgICAgICAgICAgICAgICAgICBvbkZhaWxlZCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmcmFtZS5zZXRBdHRyaWJ1dGUoXCJkYXRhLXNpZ25hbHItY29ubmVjdGlvbi1pZFwiLCBjb25uZWN0aW9uLmlkKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFN0YXJ0IHByZXZlbnRpbmcgbG9hZGluZyBpY29uXHJcbiAgICAgICAgICAgIC8vIFRoaXMgd2lsbCBvbmx5IHBlcmZvcm0gd29yayBpZiB0aGUgbG9hZFByZXZlbnRlciBpcyBub3QgYXR0YWNoZWQgdG8gYW5vdGhlciBjb25uZWN0aW9uLlxyXG4gICAgICAgICAgICBsb2FkUHJldmVudGVyLnByZXZlbnQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEJ1aWxkIHRoZSB1cmxcclxuICAgICAgICAgICAgdXJsID0gdHJhbnNwb3J0TG9naWMuZ2V0VXJsKGNvbm5lY3Rpb24sIHRoaXMubmFtZSk7XHJcbiAgICAgICAgICAgIHVybCArPSBcIiZmcmFtZUlkPVwiICsgZnJhbWVJZDtcclxuXHJcbiAgICAgICAgICAgIC8vIGFkZCBmcmFtZSB0byB0aGUgZG9jdW1lbnQgcHJpb3IgdG8gc2V0dGluZyBVUkwgdG8gYXZvaWQgY2FjaGluZyBpc3N1ZXMuXHJcbiAgICAgICAgICAgIHdpbmRvdy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYXBwZW5kQ2hpbGQoZnJhbWUpO1xyXG5cclxuICAgICAgICAgICAgY29ubmVjdGlvbi5sb2coXCJCaW5kaW5nIHRvIGlmcmFtZSdzIGxvYWQgZXZlbnQuXCIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGZyYW1lLmFkZEV2ZW50TGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgICAgIGZyYW1lLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGZyYW1lTG9hZEhhbmRsZXIsIGZhbHNlKTtcclxuICAgICAgICAgICAgfSBcclxuXHJcbiAgICAgICAgICAgIGZyYW1lLnNyYyA9IHVybDtcclxuICAgICAgICAgICAgdHJhbnNwb3J0TG9naWMuZm9yZXZlckZyYW1lLmNvbm5lY3Rpb25zW2ZyYW1lSWRdID0gY29ubmVjdGlvbjtcclxuXHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24uZnJhbWUgPSBmcmFtZTtcclxuICAgICAgICAgICAgY29ubmVjdGlvbi5mcmFtZUlkID0gZnJhbWVJZDtcclxuXHJcbiAgICAgICAgICAgIGlmIChvblN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ub25TdWNjZXNzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKFwiSWZyYW1lIHRyYW5zcG9ydCBzdGFydGVkLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICBvblN1Y2Nlc3MoKTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICByZWNvbm5lY3Q6IGZ1bmN0aW9uIChjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIE5lZWQgdG8gdmVyaWZ5IGNvbm5lY3Rpb24gc3RhdGUgYW5kIHZlcmlmeSBiZWZvcmUgdGhlIHNldFRpbWVvdXQgb2NjdXJzIGJlY2F1c2UgYW4gYXBwbGljYXRpb24gc2xlZXAgY291bGQgb2NjdXIgZHVyaW5nIHRoZSBzZXRUaW1lb3V0IGR1cmF0aW9uLlxyXG4gICAgICAgICAgICBpZiAodHJhbnNwb3J0TG9naWMuaXNDb25uZWN0ZWRPclJlY29ubmVjdGluZyhjb25uZWN0aW9uKSAmJiB0cmFuc3BvcnRMb2dpYy52ZXJpZnlMYXN0QWN0aXZlKGNvbm5lY3Rpb24pKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVmVyaWZ5IHRoYXQgd2UncmUgb2sgdG8gcmVjb25uZWN0LlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdHJhbnNwb3J0TG9naWMudmVyaWZ5TGFzdEFjdGl2ZShjb25uZWN0aW9uKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoY29ubmVjdGlvbi5mcmFtZSAmJiB0cmFuc3BvcnRMb2dpYy5lbnN1cmVSZWNvbm5lY3RpbmdTdGF0ZShjb25uZWN0aW9uKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZnJhbWUgPSBjb25uZWN0aW9uLmZyYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjID0gdHJhbnNwb3J0TG9naWMuZ2V0VXJsKGNvbm5lY3Rpb24sIHRoYXQubmFtZSwgdHJ1ZSkgKyBcIiZmcmFtZUlkPVwiICsgY29ubmVjdGlvbi5mcmFtZUlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmxvZyhcIlVwZGF0aW5nIGlmcmFtZSBzcmMgdG8gJ1wiICsgc3JjICsgXCInLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnJhbWUuc3JjID0gc3JjO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sIGNvbm5lY3Rpb24ucmVjb25uZWN0RGVsYXkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgbG9zdENvbm5lY3Rpb246IGZ1bmN0aW9uIChjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVjb25uZWN0KGNvbm5lY3Rpb24pO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNlbmQ6IGZ1bmN0aW9uIChjb25uZWN0aW9uLCBkYXRhKSB7XHJcbiAgICAgICAgICAgIHRyYW5zcG9ydExvZ2ljLmFqYXhTZW5kKGNvbm5lY3Rpb24sIGRhdGEpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHJlY2VpdmU6IGZ1bmN0aW9uIChjb25uZWN0aW9uLCBkYXRhKSB7XHJcbiAgICAgICAgICAgIHZhciBjdyxcclxuICAgICAgICAgICAgICAgIGJvZHksXHJcbiAgICAgICAgICAgICAgICByZXNwb25zZTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjb25uZWN0aW9uLmpzb24gIT09IGNvbm5lY3Rpb24uX29yaWdpbmFsSnNvbikge1xyXG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlcmUncyBhIGN1c3RvbSBKU09OIHBhcnNlciBjb25maWd1cmVkIHRoZW4gc2VyaWFsaXplIHRoZSBvYmplY3RcclxuICAgICAgICAgICAgICAgIC8vIHVzaW5nIHRoZSBvcmlnaW5hbCAoYnJvd3NlcikgSlNPTiBwYXJzZXIgYW5kIHRoZW4gZGVzZXJpYWxpemUgaXQgdXNpbmdcclxuICAgICAgICAgICAgICAgIC8vIHRoZSBjdXN0b20gcGFyc2VyIChjb25uZWN0aW9uLl9wYXJzZVJlc3BvbnNlIGRvZXMgdGhhdCkuIFRoaXMgaXMgc28gd2VcclxuICAgICAgICAgICAgICAgIC8vIGNhbiBlYXNpbHkgc2VuZCB0aGUgcmVzcG9uc2UgZnJvbSB0aGUgc2VydmVyIGFzIFwicmF3XCIgSlNPTiBidXQgc3RpbGxcclxuICAgICAgICAgICAgICAgIC8vIHN1cHBvcnQgY3VzdG9tIEpTT04gZGVzZXJpYWxpemF0aW9uIGluIHRoZSBicm93c2VyLlxyXG4gICAgICAgICAgICAgICAgZGF0YSA9IGNvbm5lY3Rpb24uX29yaWdpbmFsSnNvbi5zdHJpbmdpZnkoZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJlc3BvbnNlID0gY29ubmVjdGlvbi5fcGFyc2VSZXNwb25zZShkYXRhKTtcclxuXHJcbiAgICAgICAgICAgIHRyYW5zcG9ydExvZ2ljLnByb2Nlc3NNZXNzYWdlcyhjb25uZWN0aW9uLCByZXNwb25zZSwgY29ubmVjdGlvbi5vblN1Y2Nlc3MpO1xyXG5cclxuICAgICAgICAgICAgLy8gUHJvdGVjdCBhZ2FpbnN0IGNvbm5lY3Rpb24gc3RvcHBpbmcgZnJvbSBhIGNhbGxiYWNrIHRyaWdnZXIgd2l0aGluIHRoZSBwcm9jZXNzTWVzc2FnZXMgYWJvdmUuXHJcbiAgICAgICAgICAgIGlmIChjb25uZWN0aW9uLnN0YXRlID09PSAkLnNpZ25hbFIuY29ubmVjdGlvblN0YXRlLmNvbm5lY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgLy8gRGVsZXRlIHRoZSBzY3JpcHQgJiBkaXYgZWxlbWVudHNcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uZnJhbWVNZXNzYWdlQ291bnQgPSAoY29ubmVjdGlvbi5mcmFtZU1lc3NhZ2VDb3VudCB8fCAwKSArIDE7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29ubmVjdGlvbi5mcmFtZU1lc3NhZ2VDb3VudCA+IHNpZ25hbFIudHJhbnNwb3J0cy5mb3JldmVyRnJhbWUuaWZyYW1lQ2xlYXJUaHJlc2hvbGQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmZyYW1lTWVzc2FnZUNvdW50ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBjdyA9IGNvbm5lY3Rpb24uZnJhbWUuY29udGVudFdpbmRvdyB8fCBjb25uZWN0aW9uLmZyYW1lLmNvbnRlbnREb2N1bWVudDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY3cgJiYgY3cuZG9jdW1lbnQgJiYgY3cuZG9jdW1lbnQuYm9keSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBib2R5ID0gY3cuZG9jdW1lbnQuYm9keTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlbW92ZSBhbGwgdGhlIGNoaWxkIGVsZW1lbnRzIGZyb20gdGhlIGlmcmFtZSdzIGJvZHkgdG8gY29uc2VydmVyIG1lbW9yeVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoYm9keS5maXJzdENoaWxkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib2R5LnJlbW92ZUNoaWxkKGJvZHkuZmlyc3RDaGlsZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzdG9wOiBmdW5jdGlvbiAoY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICB2YXIgY3cgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgLy8gU3RvcCBhdHRlbXB0aW5nIHRvIHByZXZlbnQgbG9hZGluZyBpY29uXHJcbiAgICAgICAgICAgIGxvYWRQcmV2ZW50ZXIuY2FuY2VsKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoY29ubmVjdGlvbi5mcmFtZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbm5lY3Rpb24uZnJhbWUuc3RvcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uZnJhbWUuc3RvcCgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdyA9IGNvbm5lY3Rpb24uZnJhbWUuY29udGVudFdpbmRvdyB8fCBjb25uZWN0aW9uLmZyYW1lLmNvbnRlbnREb2N1bWVudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN3LmRvY3VtZW50ICYmIGN3LmRvY3VtZW50LmV4ZWNDb21tYW5kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdy5kb2N1bWVudC5leGVjQ29tbWFuZChcIlN0b3BcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5sb2coXCJFcnJvciBvY2N1cnJlZCB3aGVuIHN0b3BwaW5nIGZvcmV2ZXJGcmFtZSB0cmFuc3BvcnQuIE1lc3NhZ2UgPSBcIiArIGUubWVzc2FnZSArIFwiLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gRW5zdXJlIHRoZSBpZnJhbWUgaXMgd2hlcmUgd2UgbGVmdCBpdFxyXG4gICAgICAgICAgICAgICAgaWYgKGNvbm5lY3Rpb24uZnJhbWUucGFyZW50Tm9kZSA9PT0gd2luZG93LmRvY3VtZW50LmJvZHkpIHtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChjb25uZWN0aW9uLmZyYW1lKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBkZWxldGUgdHJhbnNwb3J0TG9naWMuZm9yZXZlckZyYW1lLmNvbm5lY3Rpb25zW2Nvbm5lY3Rpb24uZnJhbWVJZF07XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmZyYW1lID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uZnJhbWVJZCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgY29ubmVjdGlvbi5mcmFtZTtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBjb25uZWN0aW9uLmZyYW1lSWQ7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgY29ubmVjdGlvbi5vblN1Y2Nlc3M7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgY29ubmVjdGlvbi5mcmFtZU1lc3NhZ2VDb3VudDtcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKFwiU3RvcHBpbmcgZm9yZXZlciBmcmFtZS5cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBhYm9ydDogZnVuY3Rpb24gKGNvbm5lY3Rpb24sIGFzeW5jKSB7XHJcbiAgICAgICAgICAgIHRyYW5zcG9ydExvZ2ljLmFqYXhBYm9ydChjb25uZWN0aW9uLCBhc3luYyk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZ2V0Q29ubmVjdGlvbjogZnVuY3Rpb24gKGlkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cmFuc3BvcnRMb2dpYy5mb3JldmVyRnJhbWUuY29ubmVjdGlvbnNbaWRdO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHN0YXJ0ZWQ6IGZ1bmN0aW9uIChjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIGlmIChjaGFuZ2VTdGF0ZShjb25uZWN0aW9uLFxyXG4gICAgICAgICAgICAgICAgc2lnbmFsUi5jb25uZWN0aW9uU3RhdGUucmVjb25uZWN0aW5nLFxyXG4gICAgICAgICAgICAgICAgc2lnbmFsUi5jb25uZWN0aW9uU3RhdGUuY29ubmVjdGVkKSA9PT0gdHJ1ZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICQoY29ubmVjdGlvbikudHJpZ2dlckhhbmRsZXIoZXZlbnRzLm9uUmVjb25uZWN0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG59KGpRdWVyeVNoaW0sIHdpbmRvdykpO1xyXG4vKiBqcXVlcnkuc2lnbmFsUi50cmFuc3BvcnRzLmxvbmdQb2xsaW5nLmpzICovXHJcbi8vIENvcHlyaWdodCAoYykgLk5FVCBGb3VuZGF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxuXHJcblxyXG4vKmdsb2JhbCB3aW5kb3c6ZmFsc2UgKi9cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cImpxdWVyeS5zaWduYWxSLnRyYW5zcG9ydHMuY29tbW9uLmpzXCIgLz5cclxuXHJcbihmdW5jdGlvbiAoJCwgd2luZG93LCB1bmRlZmluZWQpIHtcclxuXHJcbiAgICB2YXIgc2lnbmFsUiA9ICQuc2lnbmFsUixcclxuICAgICAgICBldmVudHMgPSAkLnNpZ25hbFIuZXZlbnRzLFxyXG4gICAgICAgIGNoYW5nZVN0YXRlID0gJC5zaWduYWxSLmNoYW5nZVN0YXRlLFxyXG4gICAgICAgIGlzRGlzY29ubmVjdGluZyA9ICQuc2lnbmFsUi5pc0Rpc2Nvbm5lY3RpbmcsXHJcbiAgICAgICAgdHJhbnNwb3J0TG9naWMgPSBzaWduYWxSLnRyYW5zcG9ydHMuX2xvZ2ljO1xyXG5cclxuICAgIHNpZ25hbFIudHJhbnNwb3J0cy5sb25nUG9sbGluZyA9IHtcclxuICAgICAgICBuYW1lOiBcImxvbmdQb2xsaW5nXCIsXHJcblxyXG4gICAgICAgIHN1cHBvcnRzS2VlcEFsaXZlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICByZWNvbm5lY3REZWxheTogMzAwMCxcclxuXHJcbiAgICAgICAgc3RhcnQ6IGZ1bmN0aW9uIChjb25uZWN0aW9uLCBvblN1Y2Nlc3MsIG9uRmFpbGVkKSB7XHJcbiAgICAgICAgICAgIC8vLyA8c3VtbWFyeT5TdGFydHMgdGhlIGxvbmcgcG9sbGluZyBjb25uZWN0aW9uPC9zdW1tYXJ5PlxyXG4gICAgICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJjb25uZWN0aW9uXCIgdHlwZT1cInNpZ25hbFJcIj5UaGUgU2lnbmFsUiBjb25uZWN0aW9uIHRvIHN0YXJ0PC9wYXJhbT5cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzLFxyXG4gICAgICAgICAgICAgICAgZmlyZUNvbm5lY3QgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlyZUNvbm5lY3QgPSAkLm5vb3A7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKFwiTG9uZ1BvbGxpbmcgY29ubmVjdGVkLlwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9uU3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvblN1Y2Nlc3MoKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmxvZyhcIldBUk5JTkchIFRoZSBjbGllbnQgcmVjZWl2ZWQgYW4gaW5pdCBtZXNzYWdlIGFmdGVyIHJlY29ubmVjdGluZy5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHRyeUZhaWxDb25uZWN0ID0gZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9uRmFpbGVkKGVycm9yKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmxvZyhcIkxvbmdQb2xsaW5nIGZhaWxlZCB0byBjb25uZWN0LlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZURhdGEgPSBjb25uZWN0aW9uLl8sXHJcbiAgICAgICAgICAgICAgICByZWNvbm5lY3RFcnJvcnMgPSAwLFxyXG4gICAgICAgICAgICAgICAgZmlyZVJlY29ubmVjdGVkID0gZnVuY3Rpb24gKGluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmNsZWFyVGltZW91dChwcml2YXRlRGF0YS5yZWNvbm5lY3RUaW1lb3V0SWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHByaXZhdGVEYXRhLnJlY29ubmVjdFRpbWVvdXRJZCA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGFuZ2VTdGF0ZShpbnN0YW5jZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2lnbmFsUi5jb25uZWN0aW9uU3RhdGUucmVjb25uZWN0aW5nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaWduYWxSLmNvbm5lY3Rpb25TdGF0ZS5jb25uZWN0ZWQpID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFN1Y2Nlc3NmdWxseSByZWNvbm5lY3RlZCFcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2UubG9nKFwiUmFpc2luZyB0aGUgcmVjb25uZWN0IGV2ZW50XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKGluc3RhbmNlKS50cmlnZ2VySGFuZGxlcihldmVudHMub25SZWNvbm5lY3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAvLyAxIGhvdXJcclxuICAgICAgICAgICAgICAgIG1heEZpcmVSZWNvbm5lY3RlZFRpbWVvdXQgPSAzNjAwMDAwO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNvbm5lY3Rpb24ucG9sbFhocikge1xyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5sb2coXCJQb2xsaW5nIHhociByZXF1ZXN0cyBhbHJlYWR5IGV4aXN0cywgYWJvcnRpbmcuXCIpO1xyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5zdG9wKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ubWVzc2FnZUlkID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIHByaXZhdGVEYXRhLnJlY29ubmVjdFRpbWVvdXRJZCA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICBwcml2YXRlRGF0YS5wb2xsVGltZW91dElkID0gd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgKGZ1bmN0aW9uIHBvbGwoaW5zdGFuY2UsIHJhaXNlUmVjb25uZWN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2VJZCA9IGluc3RhbmNlLm1lc3NhZ2VJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29ubmVjdCA9IChtZXNzYWdlSWQgPT09IG51bGwpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWNvbm5lY3RpbmcgPSAhY29ubmVjdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9sbGluZyA9ICFyYWlzZVJlY29ubmVjdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsID0gdHJhbnNwb3J0TG9naWMuZ2V0VXJsKGluc3RhbmNlLCB0aGF0Lm5hbWUsIHJlY29ubmVjdGluZywgcG9sbGluZywgdHJ1ZSAvKiB1c2UgUG9zdCBmb3IgbG9uZ1BvbGxpbmcgKi8pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3N0RGF0YSA9IHt9IGFzIGFueTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluc3RhbmNlLm1lc3NhZ2VJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3N0RGF0YS5tZXNzYWdlSWQgPSBpbnN0YW5jZS5tZXNzYWdlSWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5zdGFuY2UuZ3JvdXBzVG9rZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zdERhdGEuZ3JvdXBzVG9rZW4gPSBpbnN0YW5jZS5ncm91cHNUb2tlbjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIElmIHdlJ3ZlIGRpc2Nvbm5lY3RlZCBkdXJpbmcgdGhlIHRpbWUgd2UndmUgdHJpZWQgdG8gcmUtaW5zdGFudGlhdGUgdGhlIHBvbGwgdGhlbiBzdG9wLlxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0Rpc2Nvbm5lY3RpbmcoaW5zdGFuY2UpID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKFwiT3BlbmluZyBsb25nIHBvbGxpbmcgcmVxdWVzdCB0byAnXCIgKyB1cmwgKyBcIicuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGluc3RhbmNlLnBvbGxYaHIgPSB0cmFuc3BvcnRMb2dpYy5hamF4KGNvbm5lY3Rpb24sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeGhyRmllbGRzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbnByb2dyZXNzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNwb3J0TG9naWMubWFya0xhc3RNZXNzYWdlKGNvbm5lY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6IHVybCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBzaWduYWxSLl8uZGVmYXVsdENvbnRlbnRUeXBlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBwb3N0RGF0YSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGltZW91dDogY29ubmVjdGlvbi5fLnBvbGxUaW1lb3V0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWluRGF0YSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxheSA9IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG91bGRSZWNvbm5lY3Q7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5sb2coXCJMb25nIHBvbGwgY29tcGxldGUuXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlc2V0IG91ciByZWNvbm5lY3QgZXJyb3JzIHNvIGlmIHdlIHRyYW5zaXRpb24gaW50byBhIHJlY29ubmVjdGluZyBzdGF0ZSBhZ2FpbiB3ZSB0cmlnZ2VyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyByZWNvbm5lY3RlZCBxdWlja2x5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWNvbm5lY3RFcnJvcnMgPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVtb3ZlIGFueSBrZWVwLWFsaXZlcyBmcm9tIHRoZSBiZWdpbm5pbmcgb2YgdGhlIHJlc3VsdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbkRhdGEgPSBjb25uZWN0aW9uLl9wYXJzZVJlc3BvbnNlKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnRMb2dpYy5oYW5kbGVQYXJzZUZhaWx1cmUoaW5zdGFuY2UsIHJlc3VsdCwgZXJyb3IsIHRyeUZhaWxDb25uZWN0LCBpbnN0YW5jZS5wb2xsWGhyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhlcmUncyBjdXJyZW50bHkgYSB0aW1lb3V0IHRvIHRyaWdnZXIgcmVjb25uZWN0LCBmaXJlIGl0IG5vdyBiZWZvcmUgcHJvY2Vzc2luZyBtZXNzYWdlc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByaXZhdGVEYXRhLnJlY29ubmVjdFRpbWVvdXRJZCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcmVSZWNvbm5lY3RlZChpbnN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1pbkRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0gdHJhbnNwb3J0TG9naWMubWF4aW1pemVQZXJzaXN0ZW50UmVzcG9uc2UobWluRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNwb3J0TG9naWMucHJvY2Vzc01lc3NhZ2VzKGluc3RhbmNlLCBtaW5EYXRhLCBmaXJlQ29ubmVjdCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLnR5cGUoZGF0YS5Mb25nUG9sbERlbGF5KSA9PT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGF5ID0gZGF0YS5Mb25nUG9sbERlbGF5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0Rpc2Nvbm5lY3RpbmcoaW5zdGFuY2UpID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3VsZFJlY29ubmVjdCA9IGRhdGEgJiYgZGF0YS5TaG91bGRSZWNvbm5lY3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2hvdWxkUmVjb25uZWN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVHJhbnNpdGlvbiBpbnRvIHRoZSByZWNvbm5lY3Rpbmcgc3RhdGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJZiB0aGlzIGZhaWxzIHRoZW4gdGhhdCBtZWFucyB0aGF0IHRoZSB1c2VyIHRyYW5zaXRpb25lZCB0aGUgY29ubmVjdGlvbiBpbnRvIGEgaW52YWxpZCBzdGF0ZSBpbiBwcm9jZXNzTWVzc2FnZXMuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0cmFuc3BvcnRMb2dpYy5lbnN1cmVSZWNvbm5lY3RpbmdTdGF0ZShpbnN0YW5jZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBXZSBuZXZlciB3YW50IHRvIHBhc3MgYSByYWlzZVJlY29ubmVjdCBmbGFnIGFmdGVyIGEgc3VjY2Vzc2Z1bCBwb2xsLiAgVGhpcyBpcyBoYW5kbGVkIHZpYSB0aGUgZXJyb3IgZnVuY3Rpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZWxheSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcml2YXRlRGF0YS5wb2xsVGltZW91dElkID0gd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2xsKGluc3RhbmNlLCBzaG91bGRSZWNvbm5lY3QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGRlbGF5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9sbChpbnN0YW5jZSwgc2hvdWxkUmVjb25uZWN0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZGF0YSwgdGV4dFN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVycm9yID0gc2lnbmFsUi5fLnRyYW5zcG9ydEVycm9yKHNpZ25hbFIucmVzb3VyY2VzLmxvbmdQb2xsRmFpbGVkLCBjb25uZWN0aW9uLnRyYW5zcG9ydCwgZGF0YSwgaW5zdGFuY2UucG9sbFhocik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU3RvcCB0cnlpbmcgdG8gdHJpZ2dlciByZWNvbm5lY3QsIGNvbm5lY3Rpb24gaXMgaW4gYW4gZXJyb3Igc3RhdGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHdlJ3JlIG5vdCBpbiB0aGUgcmVjb25uZWN0IHN0YXRlIHRoaXMgd2lsbCBub29wXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHByaXZhdGVEYXRhLnJlY29ubmVjdFRpbWVvdXRJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcml2YXRlRGF0YS5yZWNvbm5lY3RUaW1lb3V0SWQgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ZXh0U3RhdHVzID09PSBcImFib3J0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmxvZyhcIkFib3J0ZWQgeGhyIHJlcXVlc3QuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRyeUZhaWxDb25uZWN0KGVycm9yKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJbmNyZW1lbnQgb3VyIHJlY29ubmVjdCBlcnJvcnMsIHdlIGFzc3VtZSBhbGwgZXJyb3JzIHRvIGJlIHJlY29ubmVjdCBlcnJvcnNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJbiB0aGUgY2FzZSB0aGF0IGl0J3Mgb3VyIGZpcnN0IGVycm9yIHRoaXMgd2lsbCBjYXVzZSBSZWNvbm5lY3QgdG8gYmUgZmlyZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBhZnRlciAxIHNlY29uZCBkdWUgdG8gcmVjb25uZWN0RXJyb3JzIGJlaW5nID0gMS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWNvbm5lY3RFcnJvcnMrKztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbm5lY3Rpb24uc3RhdGUgIT09IHNpZ25hbFIuY29ubmVjdGlvblN0YXRlLnJlY29ubmVjdGluZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmxvZyhcIkFuIGVycm9yIG9jY3VycmVkIHVzaW5nIGxvbmdQb2xsaW5nLiBTdGF0dXMgPSBcIiArIHRleHRTdGF0dXMgKyBcIi4gIFJlc3BvbnNlID0gXCIgKyBkYXRhLnJlc3BvbnNlVGV4dCArIFwiLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChpbnN0YW5jZSkudHJpZ2dlckhhbmRsZXIoZXZlbnRzLm9uRXJyb3IsIFtlcnJvcl0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2UgY2hlY2sgdGhlIHN0YXRlIGhlcmUgdG8gdmVyaWZ5IHRoYXQgd2UncmUgbm90IGluIGFuIGludmFsaWQgc3RhdGUgcHJpb3IgdG8gdmVyaWZ5aW5nIFJlY29ubmVjdC5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJZiB3ZSdyZSBub3QgaW4gY29ubmVjdGVkIG9yIHJlY29ubmVjdGluZyB0aGVuIHRoZSBuZXh0IGVuc3VyZVJlY29ubmVjdGluZ1N0YXRlIGNoZWNrIHdpbGwgZmFpbCBhbmQgd2lsbCByZXR1cm4uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhlcmVmb3JlIHdlIGRvbid0IHdhbnQgdG8gY2hhbmdlIHRoYXQgZmFpbHVyZSBjb2RlIHBhdGguXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChjb25uZWN0aW9uLnN0YXRlID09PSBzaWduYWxSLmNvbm5lY3Rpb25TdGF0ZS5jb25uZWN0ZWQgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5zdGF0ZSA9PT0gc2lnbmFsUi5jb25uZWN0aW9uU3RhdGUucmVjb25uZWN0aW5nKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAhdHJhbnNwb3J0TG9naWMudmVyaWZ5TGFzdEFjdGl2ZShjb25uZWN0aW9uKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUcmFuc2l0aW9uIGludG8gdGhlIHJlY29ubmVjdGluZyBzdGF0ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHRoaXMgZmFpbHMgdGhlbiB0aGF0IG1lYW5zIHRoYXQgdGhlIHVzZXIgdHJhbnNpdGlvbmVkIHRoZSBjb25uZWN0aW9uIGludG8gdGhlIGRpc2Nvbm5lY3RlZCBvciBjb25uZWN0aW5nIHN0YXRlIHdpdGhpbiB0aGUgYWJvdmUgZXJyb3IgaGFuZGxlciB0cmlnZ2VyLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdHJhbnNwb3J0TG9naWMuZW5zdXJlUmVjb25uZWN0aW5nU3RhdGUoaW5zdGFuY2UpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIENhbGwgcG9sbCB3aXRoIHRoZSByYWlzZVJlY29ubmVjdCBmbGFnIGFzIHRydWUgYWZ0ZXIgdGhlIHJlY29ubmVjdCBkZWxheVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaXZhdGVEYXRhLnBvbGxUaW1lb3V0SWQgPSB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvbGwoaW5zdGFuY2UsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHRoYXQucmVjb25uZWN0RGVsYXkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRoaXMgd2lsbCBvbmx5IGV2ZXIgcGFzcyBhZnRlciBhbiBlcnJvciBoYXMgb2NjdXJyZWQgdmlhIHRoZSBwb2xsIGFqYXggcHJvY2VkdXJlLlxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZWNvbm5lY3RpbmcgJiYgcmFpc2VSZWNvbm5lY3QgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2Ugd2FpdCB0byByZWNvbm5lY3QgZGVwZW5kaW5nIG9uIGhvdyBtYW55IHRpbWVzIHdlJ3ZlIGZhaWxlZCB0byByZWNvbm5lY3QuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoaXMgaXMgZXNzZW50aWFsbHkgYSBoZXVyaXN0aWMgdGhhdCB3aWxsIGV4cG9uZW50aWFsbHkgaW5jcmVhc2UgaW4gd2FpdCB0aW1lIGJlZm9yZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0cmlnZ2VyaW5nIHJlY29ubmVjdGVkLiAgVGhpcyBkZXBlbmRzIG9uIHRoZSBcImVycm9yXCIgaGFuZGxlciBvZiBQb2xsIHRvIGNhbmNlbCB0aGlzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRpbWVvdXQgaWYgaXQgdHJpZ2dlcnMgYmVmb3JlIHRoZSBSZWNvbm5lY3RlZCBldmVudCBmaXJlcy5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhlIE1hdGgubWluIGF0IHRoZSBlbmQgaXMgdG8gZW5zdXJlIHRoYXQgdGhlIHJlY29ubmVjdCB0aW1lb3V0IGRvZXMgbm90IG92ZXJmbG93LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcml2YXRlRGF0YS5yZWNvbm5lY3RUaW1lb3V0SWQgPSB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7IGZpcmVSZWNvbm5lY3RlZChpbnN0YW5jZSk7IH0sIE1hdGgubWluKDEwMDAgKiAoTWF0aC5wb3coMiwgcmVjb25uZWN0RXJyb3JzKSAtIDEpLCBtYXhGaXJlUmVjb25uZWN0ZWRUaW1lb3V0KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfShjb25uZWN0aW9uKSk7XHJcbiAgICAgICAgICAgIH0sIDI1MCk7IC8vIEhhdmUgdG8gZGVsYXkgaW5pdGlhbCBwb2xsIHNvIENocm9tZSBkb2Vzbid0IHNob3cgbG9hZGVyIHNwaW5uZXIgaW4gdGFiXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgbG9zdENvbm5lY3Rpb246IGZ1bmN0aW9uIChjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIGlmIChjb25uZWN0aW9uLnBvbGxYaHIpIHtcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ucG9sbFhoci5hYm9ydChcImxvc3RDb25uZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2VuZDogZnVuY3Rpb24gKGNvbm5lY3Rpb24sIGRhdGEpIHtcclxuICAgICAgICAgICAgdHJhbnNwb3J0TG9naWMuYWpheFNlbmQoY29ubmVjdGlvbiwgZGF0YSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc3RvcDogZnVuY3Rpb24gKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgLy8vIDxzdW1tYXJ5PlN0b3BzIHRoZSBsb25nIHBvbGxpbmcgY29ubmVjdGlvbjwvc3VtbWFyeT5cclxuICAgICAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiY29ubmVjdGlvblwiIHR5cGU9XCJzaWduYWxSXCI+VGhlIFNpZ25hbFIgY29ubmVjdGlvbiB0byBzdG9wPC9wYXJhbT5cclxuXHJcbiAgICAgICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQoY29ubmVjdGlvbi5fLnBvbGxUaW1lb3V0SWQpO1xyXG4gICAgICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KGNvbm5lY3Rpb24uXy5yZWNvbm5lY3RUaW1lb3V0SWQpO1xyXG5cclxuICAgICAgICAgICAgZGVsZXRlIGNvbm5lY3Rpb24uXy5wb2xsVGltZW91dElkO1xyXG4gICAgICAgICAgICBkZWxldGUgY29ubmVjdGlvbi5fLnJlY29ubmVjdFRpbWVvdXRJZDtcclxuXHJcbiAgICAgICAgICAgIGlmIChjb25uZWN0aW9uLnBvbGxYaHIpIHtcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ucG9sbFhoci5hYm9ydCgpO1xyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5wb2xsWGhyID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBjb25uZWN0aW9uLnBvbGxYaHI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBhYm9ydDogZnVuY3Rpb24gKGNvbm5lY3Rpb24sIGFzeW5jKSB7XHJcbiAgICAgICAgICAgIHRyYW5zcG9ydExvZ2ljLmFqYXhBYm9ydChjb25uZWN0aW9uLCBhc3luYyk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbn0oalF1ZXJ5U2hpbSwgd2luZG93KSk7XHJcbi8qIGpxdWVyeS5zaWduYWxSLmh1YnMuanMgKi9cclxuLy8gQ29weXJpZ2h0IChjKSAuTkVUIEZvdW5kYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxyXG5cclxuLypnbG9iYWwgd2luZG93OmZhbHNlICovXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJqcXVlcnkuc2lnbmFsUi5jb3JlLmpzXCIgLz5cclxuXHJcbihmdW5jdGlvbiAoJCwgd2luZG93LCB1bmRlZmluZWQpIHtcclxuXHJcbiAgICB2YXIgZXZlbnROYW1lc3BhY2UgPSBcIi5odWJQcm94eVwiLFxyXG4gICAgICAgIHNpZ25hbFIgPSAkLnNpZ25hbFI7XHJcblxyXG4gICAgZnVuY3Rpb24gbWFrZUV2ZW50TmFtZShldmVudCkge1xyXG4gICAgICAgIHJldHVybiBldmVudCArIGV2ZW50TmFtZXNwYWNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEVxdWl2YWxlbnQgdG8gQXJyYXkucHJvdG90eXBlLm1hcFxyXG4gICAgZnVuY3Rpb24gbWFwKGFyciwgZnVuLCB0aGlzcD8pIHtcclxuICAgICAgICB2YXIgaSxcclxuICAgICAgICAgICAgbGVuZ3RoID0gYXJyLmxlbmd0aCxcclxuICAgICAgICAgICAgcmVzdWx0ID0gW107XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgICAgICAgIGlmIChhcnIuaGFzT3duUHJvcGVydHkoaSkpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdFtpXSA9IGZ1bi5jYWxsKHRoaXNwLCBhcnJbaV0sIGksIGFycik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRBcmdWYWx1ZShhKSB7XHJcbiAgICAgICAgcmV0dXJuICQuaXNGdW5jdGlvbihhKSA/IG51bGwgOiAoJC50eXBlKGEpID09PSBcInVuZGVmaW5lZFwiID8gbnVsbCA6IGEpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGhhc01lbWJlcnMob2JqKSB7XHJcbiAgICAgICAgZm9yICh2YXIga2V5IGluIG9iaikge1xyXG4gICAgICAgICAgICAvLyBJZiB3ZSBoYXZlIGFueSBwcm9wZXJ0aWVzIGluIG91ciBjYWxsYmFjayBtYXAgdGhlbiB3ZSBoYXZlIGNhbGxiYWNrcyBhbmQgY2FuIGV4aXQgdGhlIGxvb3AgdmlhIHJldHVyblxyXG4gICAgICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2xlYXJJbnZvY2F0aW9uQ2FsbGJhY2tzKGNvbm5lY3Rpb24sIGVycm9yKSB7XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiY29ubmVjdGlvblwiIHR5cGU9XCJodWJDb25uZWN0aW9uXCIgLz5cclxuICAgICAgICB2YXIgY2FsbGJhY2tzID0gY29ubmVjdGlvbi5fLmludm9jYXRpb25DYWxsYmFja3MsXHJcbiAgICAgICAgICAgIGNhbGxiYWNrO1xyXG5cclxuICAgICAgICBpZiAoaGFzTWVtYmVycyhjYWxsYmFja3MpKSB7XHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKFwiQ2xlYXJpbmcgaHViIGludm9jYXRpb24gY2FsbGJhY2tzIHdpdGggZXJyb3I6IFwiICsgZXJyb3IgKyBcIi5cIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSZXNldCB0aGUgY2FsbGJhY2sgY2FjaGUgbm93IGFzIHdlIGhhdmUgYSBsb2NhbCB2YXIgcmVmZXJlbmNpbmcgaXRcclxuICAgICAgICBjb25uZWN0aW9uLl8uaW52b2NhdGlvbkNhbGxiYWNrSWQgPSAwO1xyXG4gICAgICAgIGRlbGV0ZSBjb25uZWN0aW9uLl8uaW52b2NhdGlvbkNhbGxiYWNrcztcclxuICAgICAgICBjb25uZWN0aW9uLl8uaW52b2NhdGlvbkNhbGxiYWNrcyA9IHt9O1xyXG5cclxuICAgICAgICAvLyBMb29wIG92ZXIgdGhlIGNhbGxiYWNrcyBhbmQgaW52b2tlIHRoZW0uXHJcbiAgICAgICAgLy8gV2UgZG8gdGhpcyB1c2luZyBhIGxvY2FsIHZhciByZWZlcmVuY2UgYW5kICphZnRlciogd2UndmUgY2xlYXJlZCB0aGUgY2FjaGVcclxuICAgICAgICAvLyBzbyB0aGF0IGlmIGEgZmFpbCBjYWxsYmFjayBpdHNlbGYgdHJpZXMgdG8gaW52b2tlIGFub3RoZXIgbWV0aG9kIHdlIGRvbid0XHJcbiAgICAgICAgLy8gZW5kIHVwIHdpdGggaXRzIGNhbGxiYWNrIGluIHRoZSBsaXN0IHdlJ3JlIGxvb3Bpbmcgb3Zlci5cclxuICAgICAgICBmb3IgKHZhciBjYWxsYmFja0lkIGluIGNhbGxiYWNrcykge1xyXG4gICAgICAgICAgICBjYWxsYmFjayA9IGNhbGxiYWNrc1tjYWxsYmFja0lkXTtcclxuICAgICAgICAgICAgY2FsbGJhY2subWV0aG9kLmNhbGwoY2FsbGJhY2suc2NvcGUsIHsgRTogZXJyb3IgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGh1YlByb3h5XHJcbiAgICBmdW5jdGlvbiBodWJQcm94eShodWJDb25uZWN0aW9uLCBodWJOYW1lKSB7XHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyAgICAgQ3JlYXRlcyBhIG5ldyBwcm94eSBvYmplY3QgZm9yIHRoZSBnaXZlbiBodWIgY29ubmVjdGlvbiB0aGF0IGNhbiBiZSB1c2VkIHRvIGludm9rZVxyXG4gICAgICAgIC8vLyAgICAgbWV0aG9kcyBvbiBzZXJ2ZXIgaHVicyBhbmQgaGFuZGxlIGNsaWVudCBtZXRob2QgaW52b2NhdGlvbiByZXF1ZXN0cyBmcm9tIHRoZSBzZXJ2ZXIuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICByZXR1cm4gbmV3IGh1YlByb3h5LmZuLmluaXQoaHViQ29ubmVjdGlvbiwgaHViTmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaHViUHJveHkuZm4gPSBodWJQcm94eS5wcm90b3R5cGUgPSB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKGNvbm5lY3Rpb24sIGh1Yk5hbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IHt9O1xyXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb24gPSBjb25uZWN0aW9uO1xyXG4gICAgICAgICAgICB0aGlzLmh1Yk5hbWUgPSBodWJOYW1lO1xyXG4gICAgICAgICAgICB0aGlzLl8gPSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFja01hcDoge31cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcjogaHViUHJveHksXHJcblxyXG4gICAgICAgIGhhc1N1YnNjcmlwdGlvbnM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGhhc01lbWJlcnModGhpcy5fLmNhbGxiYWNrTWFwKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBvbjogZnVuY3Rpb24gKGV2ZW50TmFtZSwgY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgLy8vIDxzdW1tYXJ5PldpcmVzIHVwIGEgY2FsbGJhY2sgdG8gYmUgaW52b2tlZCB3aGVuIGEgaW52b2NhdGlvbiByZXF1ZXN0IGlzIHJlY2VpdmVkIGZyb20gdGhlIHNlcnZlciBodWIuPC9zdW1tYXJ5PlxyXG4gICAgICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJldmVudE5hbWVcIiB0eXBlPVwiU3RyaW5nXCI+VGhlIG5hbWUgb2YgdGhlIGh1YiBldmVudCB0byByZWdpc3RlciB0aGUgY2FsbGJhY2sgZm9yLjwvcGFyYW0+XHJcbiAgICAgICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImNhbGxiYWNrXCIgdHlwZT1cIkZ1bmN0aW9uXCI+VGhlIGNhbGxiYWNrIHRvIGJlIGludm9rZWQuPC9wYXJhbT5cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzLFxyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2tNYXAgPSB0aGF0Ll8uY2FsbGJhY2tNYXA7XHJcblxyXG4gICAgICAgICAgICAvLyBOb3JtYWxpemUgdGhlIGV2ZW50IG5hbWUgdG8gbG93ZXJjYXNlXHJcbiAgICAgICAgICAgIGV2ZW50TmFtZSA9IGV2ZW50TmFtZS50b0xvd2VyQ2FzZSgpO1xyXG5cclxuICAgICAgICAgICAgLy8gSWYgdGhlcmUgaXMgbm90IGFuIGV2ZW50IHJlZ2lzdGVyZWQgZm9yIHRoaXMgY2FsbGJhY2sgeWV0IHdlIHdhbnQgdG8gY3JlYXRlIGl0cyBldmVudCBzcGFjZSBpbiB0aGUgY2FsbGJhY2sgbWFwLlxyXG4gICAgICAgICAgICBpZiAoIWNhbGxiYWNrTWFwW2V2ZW50TmFtZV0pIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrTWFwW2V2ZW50TmFtZV0gPSB7fTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gTWFwIHRoZSBjYWxsYmFjayB0byBvdXIgZW5jb21wYXNzZWQgZnVuY3Rpb25cclxuICAgICAgICAgICAgY2FsbGJhY2tNYXBbZXZlbnROYW1lXVtjYWxsYmFja10gPSBmdW5jdGlvbiAoZSwgZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2suYXBwbHkodGhhdCwgZGF0YSk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAkKHRoYXQpLmJpbmQobWFrZUV2ZW50TmFtZShldmVudE5hbWUpLCBjYWxsYmFja01hcFtldmVudE5hbWVdW2NhbGxiYWNrXSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhhdDtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBvZmY6IGZ1bmN0aW9uIChldmVudE5hbWUsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIC8vLyA8c3VtbWFyeT5SZW1vdmVzIHRoZSBjYWxsYmFjayBpbnZvY2F0aW9uIHJlcXVlc3QgZnJvbSB0aGUgc2VydmVyIGh1YiBmb3IgdGhlIGdpdmVuIGV2ZW50IG5hbWUuPC9zdW1tYXJ5PlxyXG4gICAgICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJldmVudE5hbWVcIiB0eXBlPVwiU3RyaW5nXCI+VGhlIG5hbWUgb2YgdGhlIGh1YiBldmVudCB0byB1bnJlZ2lzdGVyIHRoZSBjYWxsYmFjayBmb3IuPC9wYXJhbT5cclxuICAgICAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiY2FsbGJhY2tcIiB0eXBlPVwiRnVuY3Rpb25cIj5UaGUgY2FsbGJhY2sgdG8gYmUgaW52b2tlZC48L3BhcmFtPlxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXMsXHJcbiAgICAgICAgICAgICAgICBjYWxsYmFja01hcCA9IHRoYXQuXy5jYWxsYmFja01hcCxcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrU3BhY2U7XHJcblxyXG4gICAgICAgICAgICAvLyBOb3JtYWxpemUgdGhlIGV2ZW50IG5hbWUgdG8gbG93ZXJjYXNlXHJcbiAgICAgICAgICAgIGV2ZW50TmFtZSA9IGV2ZW50TmFtZS50b0xvd2VyQ2FzZSgpO1xyXG5cclxuICAgICAgICAgICAgY2FsbGJhY2tTcGFjZSA9IGNhbGxiYWNrTWFwW2V2ZW50TmFtZV07XHJcblxyXG4gICAgICAgICAgICAvLyBWZXJpZnkgdGhhdCB0aGVyZSBpcyBhbiBldmVudCBzcGFjZSB0byB1bmJpbmRcclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrU3BhY2UpIHtcclxuICAgICAgICAgICAgICAgIC8vIE9ubHkgdW5iaW5kIGlmIHRoZXJlJ3MgYW4gZXZlbnQgYm91bmQgd2l0aCBldmVudE5hbWUgYW5kIGEgY2FsbGJhY2sgd2l0aCB0aGUgc3BlY2lmaWVkIGNhbGxiYWNrXHJcbiAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2tTcGFjZVtjYWxsYmFja10pIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoYXQpLnVuYmluZChtYWtlRXZlbnROYW1lKGV2ZW50TmFtZSksIGNhbGxiYWNrU3BhY2VbY2FsbGJhY2tdKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHRoZSBjYWxsYmFjayBmcm9tIHRoZSBjYWxsYmFjayBtYXBcclxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgY2FsbGJhY2tTcGFjZVtjYWxsYmFja107XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIENoZWNrIGlmIHRoZXJlIGFyZSBhbnkgbWVtYmVycyBsZWZ0IG9uIHRoZSBldmVudCwgaWYgbm90IHdlIG5lZWQgdG8gZGVzdHJveSBpdC5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWhhc01lbWJlcnMoY2FsbGJhY2tTcGFjZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGNhbGxiYWNrTWFwW2V2ZW50TmFtZV07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghY2FsbGJhY2spIHsgLy8gQ2hlY2sgaWYgd2UncmUgcmVtb3ZpbmcgdGhlIHdob2xlIGV2ZW50IGFuZCB3ZSBkaWRuJ3QgZXJyb3IgYmVjYXVzZSBvZiBhbiBpbnZhbGlkIGNhbGxiYWNrXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGF0KS51bmJpbmQobWFrZUV2ZW50TmFtZShldmVudE5hbWUpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGNhbGxiYWNrTWFwW2V2ZW50TmFtZV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGF0O1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGludm9rZTogZnVuY3Rpb24gKG1ldGhvZE5hbWUpIHtcclxuICAgICAgICAgICAgLy8vIDxzdW1tYXJ5Pkludm9rZXMgYSBzZXJ2ZXIgaHViIG1ldGhvZCB3aXRoIHRoZSBnaXZlbiBhcmd1bWVudHMuPC9zdW1tYXJ5PlxyXG4gICAgICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJtZXRob2ROYW1lXCIgdHlwZT1cIlN0cmluZ1wiPlRoZSBuYW1lIG9mIHRoZSBzZXJ2ZXIgaHViIG1ldGhvZC48L3BhcmFtPlxyXG5cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzLFxyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbiA9IHRoYXQuY29ubmVjdGlvbixcclxuICAgICAgICAgICAgICAgIGFyZ3MgPSAkLm1ha2VBcnJheShhcmd1bWVudHMpLnNsaWNlKDEpLFxyXG4gICAgICAgICAgICAgICAgYXJnVmFsdWVzID0gbWFwKGFyZ3MsIGdldEFyZ1ZhbHVlKSxcclxuICAgICAgICAgICAgICAgIGRhdGEgPSB7IEg6IHRoYXQuaHViTmFtZSwgTTogbWV0aG9kTmFtZSwgQTogYXJnVmFsdWVzLCBJOiBjb25uZWN0aW9uLl8uaW52b2NhdGlvbkNhbGxiYWNrSWQsIFM6bnVsbCB9LFxyXG4gICAgICAgICAgICAgICAgZCA9ICQuRGVmZXJyZWQoKSxcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrID0gZnVuY3Rpb24gKG1pblJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB0aGF0Ll9tYXhpbWl6ZUh1YlJlc3BvbnNlKG1pblJlc3VsdCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgaHViIHN0YXRlXHJcbiAgICAgICAgICAgICAgICAgICAgJC5leHRlbmQodGhhdC5zdGF0ZSwgcmVzdWx0LlN0YXRlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5Qcm9ncmVzcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZC5ub3RpZnlXaXRoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBQcm9ncmVzcyBpcyBvbmx5IHN1cHBvcnRlZCBpbiBqUXVlcnkgMS43K1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZC5ub3RpZnlXaXRoKHRoYXQsIFtyZXN1bHQuUHJvZ3Jlc3MuRGF0YV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFjb25uZWN0aW9uLl8ucHJvZ3Jlc3NqUXVlcnlWZXJzaW9uTG9nZ2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmxvZyhcIkEgaHViIG1ldGhvZCBpbnZvY2F0aW9uIHByb2dyZXNzIHVwZGF0ZSB3YXMgcmVjZWl2ZWQgYnV0IHRoZSB2ZXJzaW9uIG9mIGpRdWVyeSBpbiB1c2UgKFwiICsgJC5wcm90b3R5cGUuanF1ZXJ5ICsgXCIpIGRvZXMgbm90IHN1cHBvcnQgcHJvZ3Jlc3MgdXBkYXRlcy4gVXBncmFkZSB0byBqUXVlcnkgMS43KyB0byByZWNlaXZlIHByb2dyZXNzIG5vdGlmaWNhdGlvbnMuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5fLnByb2dyZXNzalF1ZXJ5VmVyc2lvbkxvZ2dlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdC5FcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBTZXJ2ZXIgaHViIG1ldGhvZCB0aHJldyBhbiBleGNlcHRpb24sIGxvZyBpdCAmIHJlamVjdCB0aGUgZGVmZXJyZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5TdGFja1RyYWNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmxvZyhyZXN1bHQuRXJyb3IgKyBcIlxcblwiICsgcmVzdWx0LlN0YWNrVHJhY2UgKyBcIi5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJlc3VsdC5FcnJvckRhdGEgaXMgb25seSBzZXQgaWYgYSBIdWJFeGNlcHRpb24gd2FzIHRocm93blxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2UgPSByZXN1bHQuSXNIdWJFeGNlcHRpb24gPyBcIkh1YkV4Y2VwdGlvblwiIDogXCJFeGNlcHRpb25cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IgPSBzaWduYWxSLl8uZXJyb3IocmVzdWx0LkVycm9yLCBzb3VyY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvci5kYXRhID0gcmVzdWx0LkVycm9yRGF0YTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKHRoYXQuaHViTmFtZSArIFwiLlwiICsgbWV0aG9kTmFtZSArIFwiIGZhaWxlZCB0byBleGVjdXRlLiBFcnJvcjogXCIgKyBlcnJvci5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZC5yZWplY3RXaXRoKHRoYXQsIFtlcnJvcl0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNlcnZlciBpbnZvY2F0aW9uIHN1Y2NlZWRlZCwgcmVzb2x2ZSB0aGUgZGVmZXJyZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5sb2coXCJJbnZva2VkIFwiICsgdGhhdC5odWJOYW1lICsgXCIuXCIgKyBtZXRob2ROYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZC5yZXNvbHZlV2l0aCh0aGF0LCBbcmVzdWx0LlJlc3VsdF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBjb25uZWN0aW9uLl8uaW52b2NhdGlvbkNhbGxiYWNrc1tjb25uZWN0aW9uLl8uaW52b2NhdGlvbkNhbGxiYWNrSWQudG9TdHJpbmcoKV0gPSB7IHNjb3BlOiB0aGF0LCBtZXRob2Q6IGNhbGxiYWNrIH07XHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24uXy5pbnZvY2F0aW9uQ2FsbGJhY2tJZCArPSAxO1xyXG5cclxuICAgICAgICAgICAgaWYgKCEkLmlzRW1wdHlPYmplY3QodGhhdC5zdGF0ZSkpIHtcclxuICAgICAgICAgICAgICAgIGRhdGEuUyA9IHRoYXQuc3RhdGU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKFwiSW52b2tpbmcgXCIgKyB0aGF0Lmh1Yk5hbWUgKyBcIi5cIiArIG1ldGhvZE5hbWUpO1xyXG4gICAgICAgICAgICBjb25uZWN0aW9uLnNlbmQoZGF0YSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZC5wcm9taXNlKCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgX21heGltaXplSHViUmVzcG9uc2U6IGZ1bmN0aW9uIChtaW5IdWJSZXNwb25zZSkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgU3RhdGU6IG1pbkh1YlJlc3BvbnNlLlMsXHJcbiAgICAgICAgICAgICAgICBSZXN1bHQ6IG1pbkh1YlJlc3BvbnNlLlIsXHJcbiAgICAgICAgICAgICAgICBQcm9ncmVzczogbWluSHViUmVzcG9uc2UuUCA/IHtcclxuICAgICAgICAgICAgICAgICAgICBJZDogbWluSHViUmVzcG9uc2UuUC5JLFxyXG4gICAgICAgICAgICAgICAgICAgIERhdGE6IG1pbkh1YlJlc3BvbnNlLlAuRFxyXG4gICAgICAgICAgICAgICAgfSA6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBJZDogbWluSHViUmVzcG9uc2UuSSxcclxuICAgICAgICAgICAgICAgIElzSHViRXhjZXB0aW9uOiBtaW5IdWJSZXNwb25zZS5ILFxyXG4gICAgICAgICAgICAgICAgRXJyb3I6IG1pbkh1YlJlc3BvbnNlLkUsXHJcbiAgICAgICAgICAgICAgICBTdGFja1RyYWNlOiBtaW5IdWJSZXNwb25zZS5ULFxyXG4gICAgICAgICAgICAgICAgRXJyb3JEYXRhOiBtaW5IdWJSZXNwb25zZS5EXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBodWJQcm94eS5mbi5pbml0LnByb3RvdHlwZSA9IGh1YlByb3h5LmZuO1xyXG5cclxuICAgIC8vIGh1YkNvbm5lY3Rpb25cclxuICAgIGZ1bmN0aW9uIGh1YkNvbm5lY3Rpb24odXJsLCBvcHRpb25zKSB7XHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PkNyZWF0ZXMgYSBuZXcgaHViIGNvbm5lY3Rpb24uPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInVybFwiIHR5cGU9XCJTdHJpbmdcIj5bT3B0aW9uYWxdIFRoZSBodWIgcm91dGUgdXJsLCBkZWZhdWx0cyB0byBcIi9zaWduYWxyXCIuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJvcHRpb25zXCIgdHlwZT1cIk9iamVjdFwiPltPcHRpb25hbF0gU2V0dGluZ3MgdG8gdXNlIHdoZW4gY3JlYXRpbmcgdGhlIGh1YkNvbm5lY3Rpb24uPC9wYXJhbT5cclxuICAgICAgICB2YXIgc2V0dGluZ3MgPSB7XHJcbiAgICAgICAgICAgIHFzOiBudWxsLFxyXG4gICAgICAgICAgICBsb2dnaW5nOiBmYWxzZSxcclxuICAgICAgICAgICAgdXNlRGVmYXVsdFBhdGg6IHRydWVcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkLmV4dGVuZChzZXR0aW5ncywgb3B0aW9ucyk7XHJcblxyXG4gICAgICAgIGlmICghdXJsIHx8IHNldHRpbmdzLnVzZURlZmF1bHRQYXRoKSB7XHJcbiAgICAgICAgICAgIHVybCA9ICh1cmwgfHwgXCJcIikgKyBcIi9zaWduYWxyXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgaHViQ29ubmVjdGlvbi5mbi5pbml0KHVybCwgc2V0dGluZ3MpO1xyXG4gICAgfVxyXG5cclxuICAgIGh1YkNvbm5lY3Rpb24uZm4gPSBodWJDb25uZWN0aW9uLnByb3RvdHlwZSA9ICQuY29ubmVjdGlvbigpO1xyXG5cclxuICAgIGh1YkNvbm5lY3Rpb24uZm4uaW5pdCA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcclxuICAgICAgICB2YXIgc2V0dGluZ3MgPSB7XHJcbiAgICAgICAgICAgIHFzOiBudWxsLFxyXG4gICAgICAgICAgICBsb2dnaW5nOiBmYWxzZSxcclxuICAgICAgICAgICAgdXNlRGVmYXVsdFBhdGg6IHRydWVcclxuICAgICAgICB9LFxyXG4gICAgICAgICAgICBjb25uZWN0aW9uID0gdGhpcztcclxuXHJcbiAgICAgICAgJC5leHRlbmQoc2V0dGluZ3MsIG9wdGlvbnMpO1xyXG5cclxuICAgICAgICAvLyBDYWxsIHRoZSBiYXNlIGNvbnN0cnVjdG9yXHJcbiAgICAgICAgJC5zaWduYWxSLmZuLmluaXQuY2FsbChjb25uZWN0aW9uLCB1cmwsIHNldHRpbmdzLnFzLCBzZXR0aW5ncy5sb2dnaW5nKTtcclxuXHJcbiAgICAgICAgLy8gT2JqZWN0IHRvIHN0b3JlIGh1YiBwcm94aWVzIGZvciB0aGlzIGNvbm5lY3Rpb25cclxuICAgICAgICBjb25uZWN0aW9uLnByb3hpZXMgPSB7fTtcclxuXHJcbiAgICAgICAgY29ubmVjdGlvbi5fLmludm9jYXRpb25DYWxsYmFja0lkID0gMDtcclxuICAgICAgICBjb25uZWN0aW9uLl8uaW52b2NhdGlvbkNhbGxiYWNrcyA9IHt9O1xyXG5cclxuICAgICAgICAvLyBXaXJlIHVwIHRoZSByZWNlaXZlZCBoYW5kbGVyXHJcbiAgICAgICAgY29ubmVjdGlvbi5yZWNlaXZlZChmdW5jdGlvbiAobWluRGF0YSkge1xyXG4gICAgICAgICAgICB2YXIgZGF0YSwgcHJveHksIGRhdGFDYWxsYmFja0lkLCBjYWxsYmFjaywgaHViTmFtZSwgZXZlbnROYW1lO1xyXG4gICAgICAgICAgICBpZiAoIW1pbkRhdGEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gV2UgaGF2ZSB0byBoYW5kbGUgcHJvZ3Jlc3MgdXBkYXRlcyBmaXJzdCBpbiBvcmRlciB0byBlbnN1cmUgb2xkIGNsaWVudHMgdGhhdCByZWNlaXZlXHJcbiAgICAgICAgICAgIC8vIHByb2dyZXNzIHVwZGF0ZXMgZW50ZXIgdGhlIHJldHVybiB2YWx1ZSBicmFuY2ggYW5kIHRoZW4gbm8tb3Agd2hlbiB0aGV5IGNhbid0IGZpbmRcclxuICAgICAgICAgICAgLy8gdGhlIGNhbGxiYWNrIGluIHRoZSBtYXAgKGJlY2F1c2UgdGhlIG1pbkRhdGEuSSB2YWx1ZSB3aWxsIG5vdCBiZSBhIHZhbGlkIGNhbGxiYWNrIElEKVxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIChtaW5EYXRhLlApICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBQcm9jZXNzIHByb2dyZXNzIG5vdGlmaWNhdGlvblxyXG4gICAgICAgICAgICAgICAgZGF0YUNhbGxiYWNrSWQgPSBtaW5EYXRhLlAuSS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgPSBjb25uZWN0aW9uLl8uaW52b2NhdGlvbkNhbGxiYWNrc1tkYXRhQ2FsbGJhY2tJZF07XHJcbiAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjay5tZXRob2QuY2FsbChjYWxsYmFjay5zY29wZSwgbWluRGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIChtaW5EYXRhLkkpICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBXZSByZWNlaXZlZCB0aGUgcmV0dXJuIHZhbHVlIGZyb20gYSBzZXJ2ZXIgbWV0aG9kIGludm9jYXRpb24sIGxvb2sgdXAgY2FsbGJhY2sgYnkgaWQgYW5kIGNhbGwgaXRcclxuICAgICAgICAgICAgICAgIGRhdGFDYWxsYmFja0lkID0gbWluRGF0YS5JLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayA9IGNvbm5lY3Rpb24uXy5pbnZvY2F0aW9uQ2FsbGJhY2tzW2RhdGFDYWxsYmFja0lkXTtcclxuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIERlbGV0ZSB0aGUgY2FsbGJhY2sgZnJvbSB0aGUgcHJveHlcclxuICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLl8uaW52b2NhdGlvbkNhbGxiYWNrc1tkYXRhQ2FsbGJhY2tJZF0gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBjb25uZWN0aW9uLl8uaW52b2NhdGlvbkNhbGxiYWNrc1tkYXRhQ2FsbGJhY2tJZF07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIEludm9rZSB0aGUgY2FsbGJhY2tcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjay5tZXRob2QuY2FsbChjYWxsYmFjay5zY29wZSwgbWluRGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhID0gdGhpcy5fbWF4aW1pemVDbGllbnRIdWJJbnZvY2F0aW9uKG1pbkRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFdlIHJlY2VpdmVkIGEgY2xpZW50IGludm9jYXRpb24gcmVxdWVzdCwgaS5lLiBicm9hZGNhc3QgZnJvbSBzZXJ2ZXIgaHViXHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmxvZyhcIlRyaWdnZXJpbmcgY2xpZW50IGh1YiBldmVudCAnXCIgKyBkYXRhLk1ldGhvZCArIFwiJyBvbiBodWIgJ1wiICsgZGF0YS5IdWIgKyBcIicuXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIE5vcm1hbGl6ZSB0aGUgbmFtZXMgdG8gbG93ZXJjYXNlXHJcbiAgICAgICAgICAgICAgICBodWJOYW1lID0gZGF0YS5IdWIudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgICAgIGV2ZW50TmFtZSA9IGRhdGEuTWV0aG9kLnRvTG93ZXJDYXNlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gVHJpZ2dlciB0aGUgbG9jYWwgaW52b2NhdGlvbiBldmVudFxyXG4gICAgICAgICAgICAgICAgcHJveHkgPSB0aGlzLnByb3hpZXNbaHViTmFtZV07XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gVXBkYXRlIHRoZSBodWIgc3RhdGVcclxuICAgICAgICAgICAgICAgICQuZXh0ZW5kKHByb3h5LnN0YXRlLCBkYXRhLlN0YXRlKTtcclxuICAgICAgICAgICAgICAgICQocHJveHkpLnRyaWdnZXJIYW5kbGVyKG1ha2VFdmVudE5hbWUoZXZlbnROYW1lKSwgW2RhdGEuQXJnc10pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbm5lY3Rpb24uZXJyb3IoZnVuY3Rpb24gKGVyckRhdGEsIG9yaWdEYXRhKSB7XHJcbiAgICAgICAgICAgIHZhciBjYWxsYmFja0lkLCBjYWxsYmFjaztcclxuXHJcbiAgICAgICAgICAgIGlmICghb3JpZ0RhdGEpIHtcclxuICAgICAgICAgICAgICAgIC8vIE5vIG9yaWdpbmFsIGRhdGEgcGFzc2VkIHNvIHRoaXMgaXMgbm90IGEgc2VuZCBlcnJvclxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjYWxsYmFja0lkID0gb3JpZ0RhdGEuSTtcclxuICAgICAgICAgICAgY2FsbGJhY2sgPSBjb25uZWN0aW9uLl8uaW52b2NhdGlvbkNhbGxiYWNrc1tjYWxsYmFja0lkXTtcclxuXHJcbiAgICAgICAgICAgIC8vIFZlcmlmeSB0aGF0IHRoZXJlIGlzIGEgY2FsbGJhY2sgYm91bmQgKGNvdWxkIGhhdmUgYmVlbiBjbGVhcmVkKVxyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIC8vIERlbGV0ZSB0aGUgY2FsbGJhY2tcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uXy5pbnZvY2F0aW9uQ2FsbGJhY2tzW2NhbGxiYWNrSWRdID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBjb25uZWN0aW9uLl8uaW52b2NhdGlvbkNhbGxiYWNrc1tjYWxsYmFja0lkXTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBJbnZva2UgdGhlIGNhbGxiYWNrIHdpdGggYW4gZXJyb3IgdG8gcmVqZWN0IHRoZSBwcm9taXNlXHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjay5tZXRob2QuY2FsbChjYWxsYmFjay5zY29wZSwgeyBFOiBlcnJEYXRhIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbm5lY3Rpb24ucmVjb25uZWN0aW5nKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKGNvbm5lY3Rpb24udHJhbnNwb3J0ICYmIGNvbm5lY3Rpb24udHJhbnNwb3J0Lm5hbWUgPT09IFwid2ViU29ja2V0c1wiKSB7XHJcbiAgICAgICAgICAgICAgICBjbGVhckludm9jYXRpb25DYWxsYmFja3MoY29ubmVjdGlvbiwgXCJDb25uZWN0aW9uIHN0YXJ0ZWQgcmVjb25uZWN0aW5nIGJlZm9yZSBpbnZvY2F0aW9uIHJlc3VsdCB3YXMgcmVjZWl2ZWQuXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbm5lY3Rpb24uZGlzY29ubmVjdGVkKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY2xlYXJJbnZvY2F0aW9uQ2FsbGJhY2tzKGNvbm5lY3Rpb24sIFwiQ29ubmVjdGlvbiB3YXMgZGlzY29ubmVjdGVkIGJlZm9yZSBpbnZvY2F0aW9uIHJlc3VsdCB3YXMgcmVjZWl2ZWQuXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBodWJDb25uZWN0aW9uLmZuLl9tYXhpbWl6ZUNsaWVudEh1Ykludm9jYXRpb24gPSBmdW5jdGlvbiAobWluQ2xpZW50SHViSW52b2NhdGlvbikge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIEh1YjogbWluQ2xpZW50SHViSW52b2NhdGlvbi5ILFxyXG4gICAgICAgICAgICBNZXRob2Q6IG1pbkNsaWVudEh1Ykludm9jYXRpb24uTSxcclxuICAgICAgICAgICAgQXJnczogbWluQ2xpZW50SHViSW52b2NhdGlvbi5BLFxyXG4gICAgICAgICAgICBTdGF0ZTogbWluQ2xpZW50SHViSW52b2NhdGlvbi5TXHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcblxyXG4gICAgaHViQ29ubmVjdGlvbi5mbi5fcmVnaXN0ZXJTdWJzY3JpYmVkSHVicyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vICAgICBTZXRzIHRoZSBzdGFydGluZyBldmVudCB0byBsb29wIHRocm91Z2ggdGhlIGtub3duIGh1YnMgYW5kIHJlZ2lzdGVyIGFueSBuZXcgaHVic1xyXG4gICAgICAgIC8vLyAgICAgdGhhdCBoYXZlIGJlZW4gYWRkZWQgdG8gdGhlIHByb3h5LlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgdmFyIGNvbm5lY3Rpb24gPSB0aGlzO1xyXG5cclxuICAgICAgICBpZiAoIWNvbm5lY3Rpb24uX3N1YnNjcmliZWRUb0h1YnMpIHtcclxuICAgICAgICAgICAgY29ubmVjdGlvbi5fc3Vic2NyaWJlZFRvSHVicyA9IHRydWU7XHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24uc3RhcnRpbmcoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgLy8gU2V0IHRoZSBjb25uZWN0aW9uJ3MgZGF0YSBvYmplY3Qgd2l0aCBhbGwgdGhlIGh1YiBwcm94aWVzIHdpdGggYWN0aXZlIHN1YnNjcmlwdGlvbnMuXHJcbiAgICAgICAgICAgICAgICAvLyBUaGVzZSBwcm94aWVzIHdpbGwgcmVjZWl2ZSBub3RpZmljYXRpb25zIGZyb20gdGhlIHNlcnZlci5cclxuICAgICAgICAgICAgICAgIHZhciBzdWJzY3JpYmVkSHVicyA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgICQuZWFjaChjb25uZWN0aW9uLnByb3hpZXMsIGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5oYXNTdWJzY3JpcHRpb25zKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlZEh1YnMucHVzaCh7IG5hbWU6IGtleSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5sb2coXCJDbGllbnQgc3Vic2NyaWJlZCB0byBodWIgJ1wiICsga2V5ICsgXCInLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoc3Vic2NyaWJlZEh1YnMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5sb2coXCJObyBodWJzIGhhdmUgYmVlbiBzdWJzY3JpYmVkIHRvLiAgVGhlIGNsaWVudCB3aWxsIG5vdCByZWNlaXZlIGRhdGEgZnJvbSBodWJzLiAgVG8gZml4LCBkZWNsYXJlIGF0IGxlYXN0IG9uZSBjbGllbnQgc2lkZSBmdW5jdGlvbiBwcmlvciB0byBjb25uZWN0aW9uIHN0YXJ0IGZvciBlYWNoIGh1YiB5b3Ugd2lzaCB0byBzdWJzY3JpYmUgdG8uXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uZGF0YSA9IGNvbm5lY3Rpb24uanNvbi5zdHJpbmdpZnkoc3Vic2NyaWJlZEh1YnMpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGh1YkNvbm5lY3Rpb24uZm4uY3JlYXRlSHViUHJveHkgPSBmdW5jdGlvbiAoaHViTmFtZSkge1xyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gICAgIENyZWF0ZXMgYSBuZXcgcHJveHkgb2JqZWN0IGZvciB0aGUgZ2l2ZW4gaHViIGNvbm5lY3Rpb24gdGhhdCBjYW4gYmUgdXNlZCB0byBpbnZva2VcclxuICAgICAgICAvLy8gICAgIG1ldGhvZHMgb24gc2VydmVyIGh1YnMgYW5kIGhhbmRsZSBjbGllbnQgbWV0aG9kIGludm9jYXRpb24gcmVxdWVzdHMgZnJvbSB0aGUgc2VydmVyLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiaHViTmFtZVwiIHR5cGU9XCJTdHJpbmdcIj5cclxuICAgICAgICAvLy8gICAgIFRoZSBuYW1lIG9mIHRoZSBodWIgb24gdGhlIHNlcnZlciB0byBjcmVhdGUgdGhlIHByb3h5IGZvci5cclxuICAgICAgICAvLy8gPC9wYXJhbT5cclxuXHJcbiAgICAgICAgLy8gTm9ybWFsaXplIHRoZSBuYW1lIHRvIGxvd2VyY2FzZVxyXG4gICAgICAgIGh1Yk5hbWUgPSBodWJOYW1lLnRvTG93ZXJDYXNlKCk7XHJcblxyXG4gICAgICAgIHZhciBwcm94eSA9IHRoaXMucHJveGllc1todWJOYW1lXTtcclxuICAgICAgICBpZiAoIXByb3h5KSB7XHJcbiAgICAgICAgICAgIHByb3h5ID0gaHViUHJveHkodGhpcywgaHViTmFtZSk7XHJcbiAgICAgICAgICAgIHRoaXMucHJveGllc1todWJOYW1lXSA9IHByb3h5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fcmVnaXN0ZXJTdWJzY3JpYmVkSHVicygpO1xyXG5cclxuICAgICAgICByZXR1cm4gcHJveHk7XHJcbiAgICB9O1xyXG5cclxuICAgIGh1YkNvbm5lY3Rpb24uZm4uaW5pdC5wcm90b3R5cGUgPSBodWJDb25uZWN0aW9uLmZuO1xyXG5cclxuICAgICQuaHViQ29ubmVjdGlvbiA9IGh1YkNvbm5lY3Rpb247XHJcblxyXG59KGpRdWVyeVNoaW0sIHdpbmRvdykpO1xyXG4vKiBqcXVlcnkuc2lnbmFsUi52ZXJzaW9uLmpzICovXHJcbi8vIENvcHlyaWdodCAoYykgLk5FVCBGb3VuZGF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxuXHJcblxyXG4vKmdsb2JhbCB3aW5kb3c6ZmFsc2UgKi9cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cImpxdWVyeS5zaWduYWxSLmNvcmUuanNcIiAvPlxyXG4oZnVuY3Rpb24gKCQsIHVuZGVmaW5lZCkge1xyXG4gICAgJC5zaWduYWxSLnZlcnNpb24gPSBcIjIuMi4xXCI7XHJcbn0oalF1ZXJ5U2hpbSkpO1xyXG5cclxuZXhwb3J0IGNvbnN0IGh1YkNvbm5lY3Rpb24gPSBqUXVlcnlTaGltLmh1YkNvbm5lY3Rpb247XHJcbmV4cG9ydCBjb25zdCBzaWduYWxSID0galF1ZXJ5U2hpbS5zaWduYWxSO1xyXG4iXX0=