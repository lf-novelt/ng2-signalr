import { __extends, __spread, __values } from 'tslib';
import { Subject } from 'rxjs';
import { InjectionToken, Injectable, NgZone, Inject, NgModule } from '@angular/core';
import { hubConnection } from 'signalr-no-jquery';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
var  /**
 * @template T
 */
BroadcastEventListener = /** @class */ (function (_super) {
    __extends(BroadcastEventListener, _super);
    function BroadcastEventListener(event) {
        var _this = _super.call(this) || this;
        _this.event = event;
        if (event == null || event === '') {
            throw new Error('Failed to create BroadcastEventListener. Argument \'event\' can not be empty');
        }
        return _this;
    }
    return BroadcastEventListener;
}(Subject));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SignalRConnectionMock = /** @class */ (function () {
    function SignalRConnectionMock(_mockErrors$, _mockStatus$, _listeners) {
        this._mockErrors$ = _mockErrors$;
        this._mockStatus$ = _mockStatus$;
        this._listeners = _listeners;
    }
    Object.defineProperty(SignalRConnectionMock.prototype, "errors", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mockErrors$;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SignalRConnectionMock.prototype, "status", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mockStatus$.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SignalRConnectionMock.prototype, "id", {
        get: /**
         * @return {?}
         */
        function () {
            return 'xxxxxxxx-xxxx-xxxx-xxxxxxxxx';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    SignalRConnectionMock.prototype.stop = /**
     * @return {?}
     */
    function () {
        //
    };
    /**
     * @return {?}
     */
    SignalRConnectionMock.prototype.start = /**
     * @return {?}
     */
    function () {
        return Promise.resolve(null); // TODO: implement
    };
    /**
     * @param {?} method
     * @param {...?} parameters
     * @return {?}
     */
    SignalRConnectionMock.prototype.invoke = /**
     * @param {?} method
     * @param {...?} parameters
     * @return {?}
     */
    function (method) {
        var parameters = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            parameters[_i - 1] = arguments[_i];
        }
        return Promise.resolve(null);
    };
    /**
     * @template T
     * @param {?} listener
     * @return {?}
     */
    SignalRConnectionMock.prototype.listen = /**
     * @template T
     * @param {?} listener
     * @return {?}
     */
    function (listener) {
        this._listeners[listener.event] = listener;
    };
    /**
     * @template T
     * @param {?} event
     * @return {?}
     */
    SignalRConnectionMock.prototype.listenFor = /**
     * @template T
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var listener = new BroadcastEventListener(event);
        this.listen(listener);
        return listener;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SignalRConnectionMock.prototype.listenForRaw = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var listener = new BroadcastEventListener(event);
        this._listeners[listener.event] = listener;
        return listener;
    };
    return SignalRConnectionMock;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SignalRConnectionMockManager = /** @class */ (function () {
    function SignalRConnectionMockManager() {
        this._errors$ = new Subject();
        this._status$ = new Subject();
        this._listeners = {};
        this._object = new SignalRConnectionMock(this._errors$, this._status$, this._listeners);
    }
    Object.defineProperty(SignalRConnectionMockManager.prototype, "mock", {
        get: /**
         * @return {?}
         */
        function () {
            return this._object;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SignalRConnectionMockManager.prototype, "errors$", {
        get: /**
         * @return {?}
         */
        function () {
            return this._errors$;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SignalRConnectionMockManager.prototype, "status$", {
        get: /**
         * @return {?}
         */
        function () {
            return this._status$;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SignalRConnectionMockManager.prototype, "listeners", {
        get: /**
         * @return {?}
         */
        function () {
            return this._listeners;
        },
        enumerable: true,
        configurable: true
    });
    return SignalRConnectionMockManager;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ConnectionStatus = /** @class */ (function () {
    function ConnectionStatus(value) {
        if (value == null || value < 0) {
            throw new Error('Failed to create ConnectionStatus. Argument \'name\' can not be null or empty.');
        }
        this._value = value;
    }
    Object.defineProperty(ConnectionStatus.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            return this._value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectionStatus.prototype, "name", {
        get: /**
         * @return {?}
         */
        function () {
            return ConnectionStatus.names[Number(this._value.toString())];
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ConnectionStatus.prototype.toString = /**
     * @return {?}
     */
    function () {
        return this.name;
    };
    /**
     * @param {?} other
     * @return {?}
     */
    ConnectionStatus.prototype.equals = /**
     * @param {?} other
     * @return {?}
     */
    function (other) {
        if (other == null) {
            return false;
        }
        return this._value === other.value;
    };
    ConnectionStatus.names = ['connecting', 'connected', 'reconnecting', '', 'disconnected'];
    return ConnectionStatus;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// @dynamic
var ConnectionStatuses = /** @class */ (function () {
    function ConnectionStatuses() {
    }
    Object.defineProperty(ConnectionStatuses, "connecting", {
        get: /**
         * @return {?}
         */
        function () {
            return ConnectionStatuses.statuses[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectionStatuses, "connected", {
        get: /**
         * @return {?}
         */
        function () {
            return ConnectionStatuses.statuses[1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectionStatuses, "reconnecting", {
        get: /**
         * @return {?}
         */
        function () {
            return ConnectionStatuses.statuses[2];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectionStatuses, "disconnected", {
        get: /**
         * @return {?}
         */
        function () {
            return ConnectionStatuses.statuses[3];
        },
        enumerable: true,
        configurable: true
    });
    ConnectionStatuses.statuses = [
        new ConnectionStatus(0),
        new ConnectionStatus(1),
        new ConnectionStatus(2),
        new ConnectionStatus(4)
    ];
    return ConnectionStatuses;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SignalRConnection = /** @class */ (function () {
    function SignalRConnection(jConnection, jProxy, zone, configuration) {
        this._jProxy = jProxy;
        this._jConnection = jConnection;
        this._zone = zone;
        this._errors = this.wireUpErrorsAsObservable();
        this._status = this.wireUpStatusEventsAsObservable();
        this._configuration = configuration;
        this._listeners = {};
    }
    Object.defineProperty(SignalRConnection.prototype, "errors", {
        get: /**
         * @return {?}
         */
        function () {
            return this._errors;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SignalRConnection.prototype, "status", {
        get: /**
         * @return {?}
         */
        function () {
            return this._status;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    SignalRConnection.prototype.start = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var jTransports = this.convertTransports(this._configuration.transport);
        /** @type {?} */
        var $promise = new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            _this._jConnection
                .start({
                jsonp: _this._configuration.jsonp,
                pingInterval: _this._configuration.pingInterval,
                transport: jTransports,
                withCredentials: _this._configuration.withCredentials,
            })
                .done((/**
             * @return {?}
             */
            function () {
                console.log('Connection established, ID: ' + _this._jConnection.id);
                console.log('Connection established, Transport: ' + _this._jConnection.transport.name);
                resolve(_this);
            }))
                .fail((/**
             * @param {?} error
             * @return {?}
             */
            function (error) {
                console.log('Could not connect');
                reject('Failed to connect. Error: ' + error.message); // ex: Error during negotiation request.
            }));
        }));
        return $promise;
    };
    /**
     * @return {?}
     */
    SignalRConnection.prototype.stop = /**
     * @return {?}
     */
    function () {
        this._jConnection.stop();
    };
    Object.defineProperty(SignalRConnection.prototype, "id", {
        get: /**
         * @return {?}
         */
        function () {
            return this._jConnection.id;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} method
     * @param {...?} parameters
     * @return {?}
     */
    SignalRConnection.prototype.invoke = /**
     * @param {?} method
     * @param {...?} parameters
     * @return {?}
     */
    function (method) {
        var _this = this;
        var parameters = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            parameters[_i - 1] = arguments[_i];
        }
        if (method == null) {
            throw new Error('SignalRConnection: Failed to invoke. Argument \'method\' can not be null');
        }
        this.log("SignalRConnection. Start invoking '" + method + "'...");
        /** @type {?} */
        var $promise = new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            var _a;
            (_a = _this._jProxy).invoke.apply(_a, __spread([method], parameters)).done((/**
             * @param {?} result
             * @return {?}
             */
            function (result) {
                _this.log("'" + method + "' invoked succesfully. Resolving promise...");
                resolve(result);
                _this.log("Promise resolved.");
            }))
                .fail((/**
             * @param {?} err
             * @return {?}
             */
            function (err) {
                console.log("Invoking '" + method + "' failed. Rejecting promise...");
                reject(err);
                console.log("Promise rejected.");
            }));
        }));
        return $promise;
    };
    /**
     * @template T
     * @param {?} listener
     * @return {?}
     */
    SignalRConnection.prototype.listen = /**
     * @template T
     * @param {?} listener
     * @return {?}
     */
    function (listener) {
        var _this = this;
        if (listener == null) {
            throw new Error('Failed to listen. Argument \'listener\' can not be null');
        }
        /** @type {?} */
        var callback = (/**
         * @param {...?} args
         * @return {?}
         */
        function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            _this.run((/**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var casted = null;
                if (args.length > 0) {
                    casted = (/** @type {?} */ (args[0]));
                }
                _this.log('SignalRConnection.proxy.on invoked. Calling listener next() ...');
                listener.next(casted);
                _this.log('listener next() called.');
            }), _this._configuration.executeEventsInZone);
        });
        this.setListener(callback, listener);
    };
    /**
     * @template T
     * @param {?} listener
     * @return {?}
     */
    SignalRConnection.prototype.stopListening = /**
     * @template T
     * @param {?} listener
     * @return {?}
     */
    function (listener) {
        var e_1, _a;
        if (listener == null) {
            throw new Error('Failed to listen. Argument \'listener\' can not be null');
        }
        this.log("SignalRConnection: Stopping listening to server event with name " + listener.event);
        if (!this._listeners[listener.event]) {
            this._listeners[listener.event] = [];
        }
        try {
            for (var _b = __values(this._listeners[listener.event]), _c = _b.next(); !_c.done; _c = _b.next()) {
                var callback = _c.value;
                this._jProxy.off(listener.event, callback);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this._listeners[listener.event] = [];
    };
    /**
     * @template T
     * @param {?} event
     * @return {?}
     */
    SignalRConnection.prototype.listenFor = /**
     * @template T
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event == null || event === '') {
            throw new Error('Failed to listen. Argument \'event\' can not be empty');
        }
        /** @type {?} */
        var listener = new BroadcastEventListener(event);
        this.listen(listener);
        return listener;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SignalRConnection.prototype.listenForRaw = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        if (event == null || event === '') {
            throw new Error('Failed to listen. Argument \'event\' can not be empty');
        }
        /** @type {?} */
        var listener = new BroadcastEventListener(event);
        /** @type {?} */
        var callback = (/**
         * @param {...?} args
         * @return {?}
         */
        function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            _this.run((/**
             * @return {?}
             */
            function () {
                _this.log('SignalRConnection.proxy.on invoked. Calling listener next() ...');
                listener.next(args);
                _this.log('listener next() called.');
            }), _this._configuration.executeEventsInZone);
        });
        this.setListener(callback, listener);
        return listener;
    };
    /**
     * @private
     * @template T
     * @param {?} callback
     * @param {?} listener
     * @return {?}
     */
    SignalRConnection.prototype.setListener = /**
     * @private
     * @template T
     * @param {?} callback
     * @param {?} listener
     * @return {?}
     */
    function (callback, listener) {
        this.log("SignalRConnection: Starting to listen to server event with name " + listener.event);
        this._jProxy.on(listener.event, callback);
        if (this._listeners[listener.event] == null) {
            this._listeners[listener.event] = [];
        }
        this._listeners[listener.event].push(callback);
    };
    /**
     * @private
     * @param {?} transports
     * @return {?}
     */
    SignalRConnection.prototype.convertTransports = /**
     * @private
     * @param {?} transports
     * @return {?}
     */
    function (transports) {
        if (transports instanceof Array) {
            return transports.map((/**
             * @param {?} t
             * @return {?}
             */
            function (t) { return t.name; }));
        }
        return transports.name;
    };
    /**
     * @private
     * @return {?}
     */
    SignalRConnection.prototype.wireUpErrorsAsObservable = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var sError = new Subject();
        this._jConnection.error((/**
         * @param {?} error
         * @return {?}
         */
        function (error) {
            _this.run((/**
             * @return {?}
             */
            function () { return sError.next(error); }), _this._configuration.executeErrorsInZone);
        }));
        return sError;
    };
    /**
     * @private
     * @return {?}
     */
    SignalRConnection.prototype.wireUpStatusEventsAsObservable = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var sStatus = new Subject();
        // aggregate all signalr connection status handlers into 1 observable.
        // handler wire up, for signalr connection status callback.
        this._jConnection.stateChanged((/**
         * @param {?} change
         * @return {?}
         */
        function (change) {
            _this.run((/**
             * @return {?}
             */
            function () { return sStatus.next(new ConnectionStatus(change.newState)); }), _this._configuration.executeStatusChangeInZone);
        }));
        return sStatus.asObservable();
    };
    /**
     * @private
     * @template T
     * @param {?} listener
     * @param {...?} args
     * @return {?}
     */
    SignalRConnection.prototype.onBroadcastEventReceived = /**
     * @private
     * @template T
     * @param {?} listener
     * @param {...?} args
     * @return {?}
     */
    function (listener) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.log('SignalRConnection.proxy.on invoked. Calling listener next() ...');
        /** @type {?} */
        var casted = null;
        if (args.length > 0) {
            casted = (/** @type {?} */ (args[0]));
        }
        this.run((/**
         * @return {?}
         */
        function () {
            listener.next(casted);
        }), this._configuration.executeEventsInZone);
        this.log('listener next() called.');
    };
    /**
     * @private
     * @param {...?} args
     * @return {?}
     */
    SignalRConnection.prototype.log = /**
     * @private
     * @param {...?} args
     * @return {?}
     */
    function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this._jConnection.logging === false) {
            return;
        }
        console.log(args.join(', '));
    };
    /**
     * @private
     * @param {?} func
     * @param {?} inZone
     * @return {?}
     */
    SignalRConnection.prototype.run = /**
     * @private
     * @param {?} func
     * @param {?} inZone
     * @return {?}
     */
    function (func, inZone) {
        if (inZone) {
            this._zone.run((/**
             * @return {?}
             */
            function () { return func(); }));
        }
        else {
            this._zone.runOutsideAngular((/**
             * @return {?}
             */
            function () { return func(); }));
        }
    };
    return SignalRConnection;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ConnectionTransport = /** @class */ (function () {
    function ConnectionTransport(name) {
        if (name == null || name === '') {
            throw new Error('Failed to create ConnectionTransport. Argument \'name\' can not be null or empty.');
        }
        this._name = name;
    }
    Object.defineProperty(ConnectionTransport.prototype, "name", {
        get: /**
         * @return {?}
         */
        function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ConnectionTransport.prototype.toString = /**
     * @return {?}
     */
    function () {
        return this._name;
    };
    /**
     * @param {?} other
     * @return {?}
     */
    ConnectionTransport.prototype.equals = /**
     * @param {?} other
     * @return {?}
     */
    function (other) {
        if (other == null) {
            return false;
        }
        return this._name === other.name;
    };
    return ConnectionTransport;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// @dynamic
var ConnectionTransports = /** @class */ (function () {
    function ConnectionTransports() {
    }
    Object.defineProperty(ConnectionTransports, "foreverFrame", {
        get: /**
         * @return {?}
         */
        function () {
            return ConnectionTransports.transports[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectionTransports, "longPolling", {
        get: /**
         * @return {?}
         */
        function () {
            return ConnectionTransports.transports[1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectionTransports, "serverSentEvents", {
        get: /**
         * @return {?}
         */
        function () {
            return ConnectionTransports.transports[2];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectionTransports, "webSockets", {
        get: /**
         * @return {?}
         */
        function () {
            return ConnectionTransports.transports[3];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectionTransports, "auto", {
        get: /**
         * @return {?}
         */
        function () {
            return ConnectionTransports.transports[4];
        },
        enumerable: true,
        configurable: true
    });
    ConnectionTransports.transports = [
        new ConnectionTransport('foreverFrame'),
        new ConnectionTransport('longPolling'),
        new ConnectionTransport('serverSentEvents'),
        new ConnectionTransport('webSockets'),
        new ConnectionTransport('auto'),
    ];
    return ConnectionTransports;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SignalRConfiguration = /** @class */ (function () {
    function SignalRConfiguration() {
        this.hubName = null;
        this.logging = false;
        this.qs = null;
        this.url = null;
        this.jsonp = false;
        this.withCredentials = false;
        this.transport = ConnectionTransports.auto;
        this.executeEventsInZone = true;
        this.executeErrorsInZone = false;
        this.executeStatusChangeInZone = true;
        this.pingInterval = 300000;
    }
    return SignalRConfiguration;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var SIGNALR_JCONNECTION_TOKEN = new InjectionToken('SIGNALR_JCONNECTION_TOKEN');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SignalR = /** @class */ (function () {
    function SignalR(configuration, zone, jHubConnectionFn /* use type 'any'; Suggested workaround from angular repository: https://github.com/angular/angular/issues/12631 */) {
        this._configuration = configuration;
        this._zone = zone;
        this._jHubConnectionFn = jHubConnectionFn;
    }
    /**
     * @param {?=} options
     * @return {?}
     */
    SignalR.prototype.createConnection = /**
     * @param {?=} options
     * @return {?}
     */
    function (options) {
        /** @type {?} */
        var configuration = this.merge(options ? options : {});
        this.logConfiguration(configuration);
        // create connection object
        /** @type {?} */
        var jConnection = this._jHubConnectionFn(configuration.url);
        jConnection.logging = configuration.logging;
        jConnection.qs = configuration.qs;
        // create a proxy
        /** @type {?} */
        var jProxy = jConnection.createHubProxy(configuration.hubName);
        // !!! important. We need to register at least one function otherwise server callbacks will not work.
        jProxy.on('noOp', (/**
         * @return {?}
         */
        function () { }));
        /** @type {?} */
        var hubConnection = new SignalRConnection(jConnection, jProxy, this._zone, configuration);
        return hubConnection;
    };
    /**
     * @param {?=} options
     * @return {?}
     */
    SignalR.prototype.connect = /**
     * @param {?=} options
     * @return {?}
     */
    function (options) {
        return this.createConnection(options).start();
    };
    /**
     * @private
     * @param {?} configuration
     * @return {?}
     */
    SignalR.prototype.logConfiguration = /**
     * @private
     * @param {?} configuration
     * @return {?}
     */
    function (configuration) {
        try {
            /** @type {?} */
            var serializedQs = JSON.stringify(configuration.qs);
            /** @type {?} */
            var serializedTransport = JSON.stringify(configuration.transport);
            if (configuration.logging) {
                console.log("Creating connecting with...");
                console.log("configuration:[url: '" + configuration.url + "'] ...");
                console.log("configuration:[hubName: '" + configuration.hubName + "'] ...");
                console.log("configuration:[qs: '" + serializedQs + "'] ...");
                console.log("configuration:[transport: '" + serializedTransport + "'] ...");
            }
        }
        catch (err) { /* */ }
    };
    /**
     * @private
     * @param {?} overrides
     * @return {?}
     */
    SignalR.prototype.merge = /**
     * @private
     * @param {?} overrides
     * @return {?}
     */
    function (overrides) {
        /** @type {?} */
        var merged = new SignalRConfiguration();
        merged.hubName = overrides.hubName || this._configuration.hubName;
        merged.url = overrides.url || this._configuration.url;
        merged.qs = overrides.qs || this._configuration.qs;
        merged.logging = this._configuration.logging;
        merged.jsonp = overrides.jsonp || this._configuration.jsonp;
        merged.withCredentials = overrides.withCredentials || this._configuration.withCredentials;
        merged.transport = overrides.transport || this._configuration.transport;
        merged.executeEventsInZone = overrides.executeEventsInZone || this._configuration.executeEventsInZone;
        merged.executeErrorsInZone = overrides.executeErrorsInZone || this._configuration.executeErrorsInZone;
        merged.executeStatusChangeInZone = overrides.executeStatusChangeInZone || this._configuration.executeStatusChangeInZone;
        merged.pingInterval = overrides.pingInterval || this._configuration.pingInterval;
        return merged;
    };
    SignalR.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    SignalR.ctorParameters = function () { return [
        { type: SignalRConfiguration },
        { type: NgZone },
        { type: undefined, decorators: [{ type: Inject, args: [SIGNALR_JCONNECTION_TOKEN,] }] }
    ]; };
    return SignalR;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var SIGNALR_CONFIGURATION = new InjectionToken('SIGNALR_CONFIGURATION');
/**
 * @param {?} configuration
 * @param {?} zone
 * @return {?}
 */
function createSignalr(configuration, zone) {
    /** @type {?} */
    var jConnectionFn = getJConnectionFn();
    return new SignalR(configuration, zone, jConnectionFn);
}
/**
 * @return {?}
 */
function getJConnectionFn() {
    /** @type {?} */
    var hubConnectionFn = hubConnection;
    if (hubConnectionFn == null) {
        throw new Error('Signalr failed to initialize. Script \'jquery.signalR.js\' is missing. Please make sure to include \'jquery.signalR.js\' script.');
    }
    return hubConnectionFn;
}
var ɵ0 = SignalR;
var SignalRModule = /** @class */ (function () {
    function SignalRModule() {
    }
    /**
     * @param {?} getSignalRConfiguration
     * @return {?}
     */
    SignalRModule.forRoot = /**
     * @param {?} getSignalRConfiguration
     * @return {?}
     */
    function (getSignalRConfiguration) {
        return {
            ngModule: SignalRModule,
            providers: [
                {
                    provide: SIGNALR_CONFIGURATION,
                    useFactory: getSignalRConfiguration
                },
                {
                    deps: [SIGNALR_CONFIGURATION, NgZone],
                    provide: SignalR,
                    useFactory: (createSignalr)
                }
            ],
        };
    };
    /**
     * @return {?}
     */
    SignalRModule.forChild = /**
     * @return {?}
     */
    function () {
        throw new Error('forChild method not implemented');
    };
    SignalRModule.decorators = [
        { type: NgModule, args: [{
                    providers: [{
                            provide: SignalR,
                            useValue: ɵ0
                        }]
                },] }
    ];
    return SignalRModule;
}());

export { BroadcastEventListener, ConnectionStatus, ConnectionStatuses, ConnectionTransport, ConnectionTransports, SignalR, SignalRConfiguration, SignalRConnection, SignalRConnectionMock, SignalRConnectionMockManager, SignalRModule, createSignalr as ɵa, SIGNALR_JCONNECTION_TOKEN as ɵb };
//# sourceMappingURL=ng2-signalr.js.map
