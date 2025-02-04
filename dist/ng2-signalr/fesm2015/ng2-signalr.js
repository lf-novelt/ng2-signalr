import { Subject } from 'rxjs';
import { InjectionToken, Injectable, NgZone, Inject, NgModule } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
class BroadcastEventListener extends Subject {
    /**
     * @param {?} event
     */
    constructor(event) {
        super();
        this.event = event;
        if (event == null || event === '') {
            throw new Error('Failed to create BroadcastEventListener. Argument \'event\' can not be empty');
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SignalRConnectionMock {
    /**
     * @param {?} _mockErrors$
     * @param {?} _mockStatus$
     * @param {?} _listeners
     */
    constructor(_mockErrors$, _mockStatus$, _listeners) {
        this._mockErrors$ = _mockErrors$;
        this._mockStatus$ = _mockStatus$;
        this._listeners = _listeners;
    }
    /**
     * @return {?}
     */
    get errors() {
        return this._mockErrors$;
    }
    /**
     * @return {?}
     */
    get status() {
        return this._mockStatus$.asObservable();
    }
    /**
     * @return {?}
     */
    get id() {
        return 'xxxxxxxx-xxxx-xxxx-xxxxxxxxx';
    }
    /**
     * @return {?}
     */
    stop() {
        //
    }
    /**
     * @return {?}
     */
    start() {
        return Promise.resolve(null); // TODO: implement
    }
    /**
     * @param {?} method
     * @param {...?} parameters
     * @return {?}
     */
    invoke(method, ...parameters) {
        return Promise.resolve(null);
    }
    /**
     * @template T
     * @param {?} listener
     * @return {?}
     */
    listen(listener) {
        this._listeners[listener.event] = listener;
    }
    /**
     * @template T
     * @param {?} event
     * @return {?}
     */
    listenFor(event) {
        /** @type {?} */
        const listener = new BroadcastEventListener(event);
        this.listen(listener);
        return listener;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    listenForRaw(event) {
        /** @type {?} */
        const listener = new BroadcastEventListener(event);
        this._listeners[listener.event] = listener;
        return listener;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SignalRConnectionMockManager {
    constructor() {
        this._errors$ = new Subject();
        this._status$ = new Subject();
        this._listeners = {};
        this._object = new SignalRConnectionMock(this._errors$, this._status$, this._listeners);
    }
    /**
     * @return {?}
     */
    get mock() {
        return this._object;
    }
    /**
     * @return {?}
     */
    get errors$() {
        return this._errors$;
    }
    /**
     * @return {?}
     */
    get status$() {
        return this._status$;
    }
    /**
     * @return {?}
     */
    get listeners() {
        return this._listeners;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ConnectionStatus {
    /**
     * @param {?} value
     */
    constructor(value) {
        if (value == null || value < 0) {
            throw new Error('Failed to create ConnectionStatus. Argument \'name\' can not be null or empty.');
        }
        this._value = value;
    }
    /**
     * @return {?}
     */
    get value() {
        return this._value;
    }
    /**
     * @return {?}
     */
    get name() {
        return ConnectionStatus.names[Number(this._value.toString())];
    }
    /**
     * @return {?}
     */
    toString() {
        return this.name;
    }
    /**
     * @param {?} other
     * @return {?}
     */
    equals(other) {
        if (other == null) {
            return false;
        }
        return this._value === other.value;
    }
}
ConnectionStatus.names = ['connecting', 'connected', 'reconnecting', '', 'disconnected'];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// @dynamic
class ConnectionStatuses {
    /**
     * @return {?}
     */
    static get connecting() {
        return ConnectionStatuses.statuses[0];
    }
    /**
     * @return {?}
     */
    static get connected() {
        return ConnectionStatuses.statuses[1];
    }
    /**
     * @return {?}
     */
    static get reconnecting() {
        return ConnectionStatuses.statuses[2];
    }
    /**
     * @return {?}
     */
    static get disconnected() {
        return ConnectionStatuses.statuses[3];
    }
}
ConnectionStatuses.statuses = [
    new ConnectionStatus(0),
    new ConnectionStatus(1),
    new ConnectionStatus(2),
    new ConnectionStatus(4)
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SignalRConnection {
    /**
     * @param {?} jConnection
     * @param {?} jProxy
     * @param {?} zone
     * @param {?} configuration
     */
    constructor(jConnection, jProxy, zone, configuration) {
        this._jProxy = jProxy;
        this._jConnection = jConnection;
        this._zone = zone;
        this._errors = this.wireUpErrorsAsObservable();
        this._status = this.wireUpStatusEventsAsObservable();
        this._configuration = configuration;
        this._listeners = {};
    }
    /**
     * @return {?}
     */
    get errors() {
        return this._errors;
    }
    /**
     * @return {?}
     */
    get status() {
        return this._status;
    }
    /**
     * @return {?}
     */
    start() {
        /** @type {?} */
        const jTransports = this.convertTransports(this._configuration.transport);
        /** @type {?} */
        const $promise = new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            this._jConnection
                .start({
                jsonp: this._configuration.jsonp,
                pingInterval: this._configuration.pingInterval,
                transport: jTransports,
                withCredentials: this._configuration.withCredentials,
            })
                .done((/**
             * @return {?}
             */
            () => {
                console.log('Connection established, ID: ' + this._jConnection.id);
                console.log('Connection established, Transport: ' + this._jConnection.transport.name);
                resolve(this);
            }))
                .fail((/**
             * @param {?} error
             * @return {?}
             */
            (error) => {
                console.log('Could not connect');
                reject('Failed to connect. Error: ' + error.message); // ex: Error during negotiation request.
            }));
        }));
        return $promise;
    }
    /**
     * @return {?}
     */
    stop() {
        this._jConnection.stop();
    }
    /**
     * @return {?}
     */
    get id() {
        return this._jConnection.id;
    }
    /**
     * @param {?} method
     * @param {...?} parameters
     * @return {?}
     */
    invoke(method, ...parameters) {
        if (method == null) {
            throw new Error('SignalRConnection: Failed to invoke. Argument \'method\' can not be null');
        }
        this.log(`SignalRConnection. Start invoking \'${method}\'...`);
        /** @type {?} */
        const $promise = new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            this._jProxy.invoke(method, ...parameters)
                .done((/**
             * @param {?} result
             * @return {?}
             */
            (result) => {
                this.log(`\'${method}\' invoked succesfully. Resolving promise...`);
                resolve(result);
                this.log(`Promise resolved.`);
            }))
                .fail((/**
             * @param {?} err
             * @return {?}
             */
            (err) => {
                console.log(`Invoking \'${method}\' failed. Rejecting promise...`);
                reject(err);
                console.log(`Promise rejected.`);
            }));
        }));
        return $promise;
    }
    /**
     * @template T
     * @param {?} listener
     * @return {?}
     */
    listen(listener) {
        if (listener == null) {
            throw new Error('Failed to listen. Argument \'listener\' can not be null');
        }
        /** @type {?} */
        const callback = (/**
         * @param {...?} args
         * @return {?}
         */
        (...args) => {
            this.run((/**
             * @return {?}
             */
            () => {
                /** @type {?} */
                let casted = null;
                if (args.length > 0) {
                    casted = (/** @type {?} */ (args[0]));
                }
                this.log('SignalRConnection.proxy.on invoked. Calling listener next() ...');
                listener.next(casted);
                this.log('listener next() called.');
            }), this._configuration.executeEventsInZone);
        });
        this.setListener(callback, listener);
    }
    /**
     * @template T
     * @param {?} listener
     * @return {?}
     */
    stopListening(listener) {
        if (listener == null) {
            throw new Error('Failed to listen. Argument \'listener\' can not be null');
        }
        this.log(`SignalRConnection: Stopping listening to server event with name ${listener.event}`);
        if (!this._listeners[listener.event]) {
            this._listeners[listener.event] = [];
        }
        for (const callback of this._listeners[listener.event]) {
            this._jProxy.off(listener.event, callback);
        }
        this._listeners[listener.event] = [];
    }
    /**
     * @template T
     * @param {?} event
     * @return {?}
     */
    listenFor(event) {
        if (event == null || event === '') {
            throw new Error('Failed to listen. Argument \'event\' can not be empty');
        }
        /** @type {?} */
        const listener = new BroadcastEventListener(event);
        this.listen(listener);
        return listener;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    listenForRaw(event) {
        if (event == null || event === '') {
            throw new Error('Failed to listen. Argument \'event\' can not be empty');
        }
        /** @type {?} */
        const listener = new BroadcastEventListener(event);
        /** @type {?} */
        const callback = (/**
         * @param {...?} args
         * @return {?}
         */
        (...args) => {
            this.run((/**
             * @return {?}
             */
            () => {
                if (args.length > 0) ;
                this.log('SignalRConnection.proxy.on invoked. Calling listener next() ...');
                listener.next(args);
                this.log('listener next() called.');
            }), this._configuration.executeEventsInZone);
        });
        this.setListener(callback, listener);
        return listener;
    }
    /**
     * @private
     * @template T
     * @param {?} callback
     * @param {?} listener
     * @return {?}
     */
    setListener(callback, listener) {
        this.log(`SignalRConnection: Starting to listen to server event with name ${listener.event}`);
        this._jProxy.on(listener.event, callback);
        if (this._listeners[listener.event] == null) {
            this._listeners[listener.event] = [];
        }
        this._listeners[listener.event].push(callback);
    }
    /**
     * @private
     * @param {?} transports
     * @return {?}
     */
    convertTransports(transports) {
        if (transports instanceof Array) {
            return transports.map((/**
             * @param {?} t
             * @return {?}
             */
            (t) => t.name));
        }
        return transports.name;
    }
    /**
     * @private
     * @return {?}
     */
    wireUpErrorsAsObservable() {
        /** @type {?} */
        const sError = new Subject();
        this._jConnection.error((/**
         * @param {?} error
         * @return {?}
         */
        (error) => {
            this.run((/**
             * @return {?}
             */
            () => sError.next(error)), this._configuration.executeErrorsInZone);
        }));
        return sError;
    }
    /**
     * @private
     * @return {?}
     */
    wireUpStatusEventsAsObservable() {
        /** @type {?} */
        const sStatus = new Subject();
        // aggregate all signalr connection status handlers into 1 observable.
        // handler wire up, for signalr connection status callback.
        this._jConnection.stateChanged((/**
         * @param {?} change
         * @return {?}
         */
        (change) => {
            this.run((/**
             * @return {?}
             */
            () => sStatus.next(new ConnectionStatus(change.newState))), this._configuration.executeStatusChangeInZone);
        }));
        return sStatus.asObservable();
    }
    /**
     * @private
     * @template T
     * @param {?} listener
     * @param {...?} args
     * @return {?}
     */
    onBroadcastEventReceived(listener, ...args) {
        this.log('SignalRConnection.proxy.on invoked. Calling listener next() ...');
        /** @type {?} */
        let casted = null;
        if (args.length > 0) {
            casted = (/** @type {?} */ (args[0]));
        }
        this.run((/**
         * @return {?}
         */
        () => {
            listener.next(casted);
        }), this._configuration.executeEventsInZone);
        this.log('listener next() called.');
    }
    /**
     * @private
     * @param {...?} args
     * @return {?}
     */
    log(...args) {
        if (this._jConnection.logging === false) {
            return;
        }
        console.log(args.join(', '));
    }
    /**
     * @private
     * @param {?} func
     * @param {?} inZone
     * @return {?}
     */
    run(func, inZone) {
        if (inZone) {
            this._zone.run((/**
             * @return {?}
             */
            () => func()));
        }
        else {
            this._zone.runOutsideAngular((/**
             * @return {?}
             */
            () => func()));
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ConnectionTransport {
    /**
     * @return {?}
     */
    get name() {
        return this._name;
    }
    /**
     * @param {?} name
     */
    constructor(name) {
        if (name == null || name === '') {
            throw new Error('Failed to create ConnectionTransport. Argument \'name\' can not be null or empty.');
        }
        this._name = name;
    }
    /**
     * @return {?}
     */
    toString() {
        return this._name;
    }
    /**
     * @param {?} other
     * @return {?}
     */
    equals(other) {
        if (other == null) {
            return false;
        }
        return this._name === other.name;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// @dynamic
class ConnectionTransports {
    /**
     * @return {?}
     */
    static get foreverFrame() {
        return ConnectionTransports.transports[0];
    }
    /**
     * @return {?}
     */
    static get longPolling() {
        return ConnectionTransports.transports[1];
    }
    /**
     * @return {?}
     */
    static get serverSentEvents() {
        return ConnectionTransports.transports[2];
    }
    /**
     * @return {?}
     */
    static get webSockets() {
        return ConnectionTransports.transports[3];
    }
    /**
     * @return {?}
     */
    static get auto() {
        return ConnectionTransports.transports[4];
    }
}
ConnectionTransports.transports = [
    new ConnectionTransport('foreverFrame'),
    new ConnectionTransport('longPolling'),
    new ConnectionTransport('serverSentEvents'),
    new ConnectionTransport('webSockets'),
    new ConnectionTransport('auto'),
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SignalRConfiguration {
    constructor() {
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
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const SIGNALR_JCONNECTION_TOKEN = new InjectionToken('SIGNALR_JCONNECTION_TOKEN');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SignalR {
    /**
     * @param {?} configuration
     * @param {?} zone
     * @param {?} jHubConnectionFn
     */
    constructor(configuration, zone, jHubConnectionFn /* use type 'any'; Suggested workaround from angular repository: https://github.com/angular/angular/issues/12631 */) {
        this._configuration = configuration;
        this._zone = zone;
        this._jHubConnectionFn = jHubConnectionFn;
    }
    /**
     * @param {?=} options
     * @return {?}
     */
    createConnection(options) {
        /** @type {?} */
        const configuration = this.merge(options ? options : {});
        this.logConfiguration(configuration);
        // create connection object
        /** @type {?} */
        const jConnection = this._jHubConnectionFn(configuration.url);
        jConnection.logging = configuration.logging;
        jConnection.qs = configuration.qs;
        // create a proxy
        /** @type {?} */
        const jProxy = jConnection.createHubProxy(configuration.hubName);
        // !!! important. We need to register at least one function otherwise server callbacks will not work.
        jProxy.on('noOp', (/**
         * @return {?}
         */
        () => { }));
        /** @type {?} */
        const hubConnection = new SignalRConnection(jConnection, jProxy, this._zone, configuration);
        return hubConnection;
    }
    /**
     * @param {?=} options
     * @return {?}
     */
    connect(options) {
        return this.createConnection(options).start();
    }
    /**
     * @private
     * @param {?} configuration
     * @return {?}
     */
    logConfiguration(configuration) {
        try {
            /** @type {?} */
            const serializedQs = JSON.stringify(configuration.qs);
            /** @type {?} */
            const serializedTransport = JSON.stringify(configuration.transport);
            if (configuration.logging) {
                console.log(`Creating connecting with...`);
                console.log(`configuration:[url: '${configuration.url}'] ...`);
                console.log(`configuration:[hubName: '${configuration.hubName}'] ...`);
                console.log(`configuration:[qs: '${serializedQs}'] ...`);
                console.log(`configuration:[transport: '${serializedTransport}'] ...`);
            }
        }
        catch (err) { /* */ }
    }
    /**
     * @private
     * @param {?} overrides
     * @return {?}
     */
    merge(overrides) {
        /** @type {?} */
        const merged = new SignalRConfiguration();
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
    }
}
SignalR.decorators = [
    { type: Injectable }
];
/** @nocollapse */
SignalR.ctorParameters = () => [
    { type: SignalRConfiguration },
    { type: NgZone },
    { type: undefined, decorators: [{ type: Inject, args: [SIGNALR_JCONNECTION_TOKEN,] }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
* jQuery core object.
*
* Worker with jQuery deferred
*
* Code from: https://github.com/jquery/jquery/blob/master/src/core.js
*
*/
/** @type {?} */
var jQuery = {
    type: type,
    isArray: isArray,
    inArray: (/**
     * @param {?} arr
     * @param {?} item
     * @return {?}
     */
    (arr, item) => arr.indexOf(item)),
    isFunction: isFunction,
    isPlainObject: isPlainObject,
    each: each,
    extend: extend,
    noop: (/**
     * @return {?}
     */
    function () { })
};
/** @type {?} */
var toString = Object.prototype.toString;
/** @type {?} */
var class2type = {};
// Populate the class2type map
"Boolean Number String Function Array Date RegExp Object".split(" ").forEach((/**
 * @param {?} name
 * @return {?}
 */
function (name) {
    class2type["[object " + name + "]"] = name.toLowerCase();
}));
/**
 * @param {?} obj
 * @return {?}
 */
function type(obj) {
    return obj == null ?
        String(obj) :
        class2type[toString.call(obj)] || "object";
}
/**
 * @param {?} obj
 * @return {?}
 */
function isFunction(obj) {
    return jQuery.type(obj) === "function";
}
/**
 * @param {?} obj
 * @return {?}
 */
function isArray(obj) {
    return jQuery.type(obj) === "array";
}
/**
 * @param {?} object
 * @param {?} callback
 * @param {?=} args
 * @return {?}
 */
function each(object, callback, args) {
    /** @type {?} */
    var name;
    /** @type {?} */
    var i = 0;
    /** @type {?} */
    var length = object.length;
    /** @type {?} */
    var isObj = length === undefined || isFunction(object);
    if (args) {
        if (isObj) {
            for (name in object) {
                if (callback.apply(object[name], args) === false) {
                    break;
                }
            }
        }
        else {
            for (; i < length;) {
                if (callback.apply(object[i++], args) === false) {
                    break;
                }
            }
        }
        // A special, fast, case for the most common use of each
    }
    else {
        if (isObj) {
            for (name in object) {
                if (callback.call(object[name], name, object[name]) === false) {
                    break;
                }
            }
        }
        else {
            for (; i < length;) {
                if (callback.call(object[i], i, object[i++]) === false) {
                    break;
                }
            }
        }
    }
    return object;
}
/**
 * @param {?} obj
 * @return {?}
 */
function isPlainObject(obj) {
    // Must be an Object.
    if (!obj || jQuery.type(obj) !== "object") {
        return false;
    }
    return true;
}
/**
 * @param {...?} args
 * @return {?}
 */
function extend(...args) {
    /** @type {?} */
    var options;
    /** @type {?} */
    var name;
    /** @type {?} */
    var src;
    /** @type {?} */
    var copy;
    /** @type {?} */
    var copyIsArray;
    /** @type {?} */
    var clone;
    /** @type {?} */
    var target = args[0] || {};
    /** @type {?} */
    var i = 1;
    /** @type {?} */
    var length = args.length;
    /** @type {?} */
    var deep = false;
    // Handle a deep copy situation
    if (typeof target === "boolean") {
        deep = target;
        target = args[1] || {};
        // skip the boolean and the target
        i = 2;
    }
    // Handle case when target is a string or something (possible in deep copy)
    if (typeof target !== "object" && !jQuery.isFunction(target)) {
        target = {};
    }
    // extend jQuery itself if only one argument is passed
    if (length === i) {
        target = this;
        --i;
    }
    for (; i < length; i++) {
        // Only deal with non-null/undefined values
        if ((options = arguments[i]) != null) {
            // Extend the base object
            for (name in options) {
                src = target[name];
                copy = options[name];
                // Prevent never-ending loop
                if (target === copy) {
                    continue;
                }
                // Recurse if we're merging plain objects or arrays
                if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
                    if (copyIsArray) {
                        copyIsArray = false;
                        clone = src && jQuery.isArray(src) ? src : [];
                    }
                    else {
                        clone = src && jQuery.isPlainObject(src) ? src : {};
                    }
                    // Never move original objects, clone them
                    target[name] = jQuery.extend(deep, clone, copy);
                    // Don't bring in undefined values
                }
                else if (copy !== undefined) {
                    target[name] = copy;
                }
            }
        }
    }
    // Return the modified object
    return target;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var jQueryCallBack = Object.assign({}, jQuery, { Callbacks: null });
/** @type {?} */
var core_rspace = /\s+/;
// String to Object options format cache
/**
 * jQuery Callbacks
 *
 * Code from: https://github.com/jquery/jquery/blob/master/src/callbacks.js
 *
 * @type {?}
 */
var optionsCache = {};
// Convert String-formatted options into Object-formatted ones and store in cache
/**
 * @param {?} options
 * @return {?}
 */
function createOptions(options) {
    /** @type {?} */
    var object = optionsCache[options] = {};
    jQuery.each(options.split(core_rspace), (/**
     * @param {?} _
     * @param {?} flag
     * @return {?}
     */
    function (_, flag) {
        object[flag] = true;
    }));
    return object;
}
/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQueryCallBack.Callbacks = (/**
 * @param {?} options
 * @return {?}
 */
function (options) {
    // Convert options from String-formatted to Object-formatted if needed
    // (we check in cache first)
    options = typeof options === "string" ?
        (optionsCache[options] || createOptions(options)) :
        jQuery.extend({}, options);
    /** @type {?} */
    var // Last fire value (for non-forgettable lists)
    memory;
    /** @type {?} */
    var 
    // Flag to know if list was already fired
    fired;
    /** @type {?} */
    var 
    // Flag to know if list is currently firing
    firing;
    /** @type {?} */
    var 
    // First callback to fire (used internally by add and fireWith)
    firingStart;
    /** @type {?} */
    var 
    // End of the loop when firing
    firingLength;
    /** @type {?} */
    var 
    // Index of currently firing callback (modified by remove if needed)
    firingIndex;
    /** @type {?} */
    var 
    // Actual callback list
    list = [];
    /** @type {?} */
    var 
    // Stack of fire calls for repeatable lists
    stack = !options.once && [];
    /** @type {?} */
    var 
    // Fire callbacks
    fire = (/**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        memory = options.memory && data;
        fired = true;
        firingIndex = firingStart || 0;
        firingStart = 0;
        firingLength = list.length;
        firing = true;
        for (; list && firingIndex < firingLength; firingIndex++) {
            if (list[firingIndex].apply(data[0], data[1]) === false && options.stopOnFalse) {
                memory = false; // To prevent further calls using add
                break;
            }
        }
        firing = false;
        if (list) {
            if (stack) {
                if (stack.length) {
                    fire(stack.shift());
                }
            }
            else if (memory) {
                list = [];
            }
            else {
                self.disable();
            }
        }
    });
    /** @type {?} */
    var 
    // Actual Callbacks object
    self = {
        // Add a callback or a collection of callbacks to the list
        add: (/**
         * @return {?}
         */
        function () {
            if (list) {
                // First, we save the current length
                /** @type {?} */
                var start = list.length;
                ((/**
                 * @param {?} args
                 * @return {?}
                 */
                function add(args) {
                    jQuery.each(args, (/**
                     * @param {?} _
                     * @param {?} arg
                     * @return {?}
                     */
                    function (_, arg) {
                        /** @type {?} */
                        var type = jQuery.type(arg);
                        if (type === "function") {
                            if (!options.unique || !self.has(arg)) {
                                list.push(arg);
                            }
                        }
                        else if (arg && arg.length && type !== "string") {
                            // Inspect recursively
                            add(arg);
                        }
                    }));
                }))(arguments);
                // Do we need to add the callbacks to the
                // current firing batch?
                if (firing) {
                    firingLength = list.length;
                    // With memory, if we're not firing then
                    // we should call right away
                }
                else if (memory) {
                    firingStart = start;
                    fire(memory);
                }
            }
            return this;
        }),
        // Remove a callback from the list
        remove: (/**
         * @return {?}
         */
        function () {
            if (list) {
                jQuery.each(arguments, (/**
                 * @param {?} _
                 * @param {?} arg
                 * @return {?}
                 */
                function (_, arg) {
                    /** @type {?} */
                    var index;
                    while ((index = jQuery.inArray(arg, list)) > -1) {
                        list.splice(index, 1);
                        // Handle firing indexes
                        if (firing) {
                            if (index <= firingLength) {
                                firingLength--;
                            }
                            if (index <= firingIndex) {
                                firingIndex--;
                            }
                        }
                    }
                }));
            }
            return this;
        }),
        // Control if a given callback is in the list
        has: (/**
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            return jQuery.inArray(fn, list) > -1;
        }),
        // Remove all callbacks from the list
        empty: (/**
         * @return {?}
         */
        function () {
            list = [];
            return this;
        }),
        // Have the list do nothing anymore
        disable: (/**
         * @return {?}
         */
        function () {
            list = stack = memory = undefined;
            return this;
        }),
        // Is it disabled?
        disabled: (/**
         * @return {?}
         */
        function () {
            return !list;
        }),
        // Lock the list in its current state
        lock: (/**
         * @return {?}
         */
        function () {
            stack = undefined;
            if (!memory) {
                self.disable();
            }
            return this;
        }),
        // Is it locked?
        locked: (/**
         * @return {?}
         */
        function () {
            return !stack;
        }),
        // Call all callbacks with the given context and arguments
        fireWith: (/**
         * @param {?} context
         * @param {?} args
         * @return {?}
         */
        function (context, args) {
            args = args || [];
            args = [context, args.slice ? args.slice() : args];
            if (list && (!fired || stack)) {
                if (firing) {
                    stack.push(args);
                }
                else {
                    fire(args);
                }
            }
            return this;
        }),
        // Call all the callbacks with the given arguments
        fire: (/**
         * @return {?}
         */
        function () {
            self.fireWith(this, arguments);
            return this;
        }),
        // To know if the callbacks have already been called at least once
        fired: (/**
         * @return {?}
         */
        function () {
            return !!fired;
        })
    };
    return self;
});

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var core_slice = Array.prototype.slice;
/**
* jQuery deferred
*
* Code from: https://github.com/jquery/jquery/blob/master/src/deferred.js
* Doc: http://api.jquery.com/category/deferred-object/
*
*/
jQueryCallBack.extend({
    Deferred: (/**
     * @param {?} func
     * @return {?}
     */
    function (func) {
        /** @type {?} */
        var tuples = [
            // action, add listener, listener list, final state
            ["resolve", "done", jQueryCallBack.Callbacks("once memory"), "resolved"],
            ["reject", "fail", jQueryCallBack.Callbacks("once memory"), "rejected"],
            ["notify", "progress", jQueryCallBack.Callbacks("memory")]
        ];
        /** @type {?} */
        var state = "pending";
        /** @type {?} */
        var promise = {
            state: (/**
             * @return {?}
             */
            function () {
                return state;
            }),
            always: (/**
             * @return {?}
             */
            function () {
                deferred.done(arguments).fail(arguments);
                return this;
            }),
            pipe: undefined,
            then: (/**
             * @return {?}
             */
            function ( /* fnDone, fnFail, fnProgress */) {
                /** @type {?} */
                var fns = arguments;
                return this.Deferred((/**
                 * @param {?} newDefer
                 * @return {?}
                 */
                function (newDefer) {
                    jQueryCallBack.each(tuples, (/**
                     * @param {?} i
                     * @param {?} tuple
                     * @return {?}
                     */
                    function (i, tuple) {
                        /** @type {?} */
                        var action = tuple[0];
                        /** @type {?} */
                        var fn = fns[i];
                        // deferred[ done | fail | progress ] for forwarding actions to newDefer
                        deferred[tuple[1]](jQueryCallBack.isFunction(fn) ?
                            (/**
                             * @return {?}
                             */
                            function () {
                                /** @type {?} */
                                var returned = fn.apply(this, arguments);
                                if (returned && jQueryCallBack.isFunction(returned.promise)) {
                                    returned.promise()
                                        .done(newDefer.resolve)
                                        .fail(newDefer.reject)
                                        .progress(newDefer.notify);
                                }
                                else {
                                    newDefer[action + "With"](this === deferred ? newDefer : this, [returned]);
                                }
                            }) :
                            newDefer[action]);
                    }));
                    fns = null;
                })).promise();
            }),
            // Get a promise for this deferred
            // If obj is provided, the promise aspect is added to the object
            promise: (/**
             * @param {?} obj
             * @return {?}
             */
            function (obj) {
                return obj != null ? jQueryCallBack.extend(obj, promise) : promise;
            })
        };
        /** @type {?} */
        var deferred = {
            done: undefined
        };
        // Keep pipe for back-compat
        promise.pipe = promise.then;
        // Add list-specific methods
        jQueryCallBack.each(tuples, (/**
         * @param {?} i
         * @param {?} tuple
         * @return {?}
         */
        function (i, tuple) {
            /** @type {?} */
            var list = tuple[2];
            /** @type {?} */
            var stateString = tuple[3];
            // promise[ done | fail | progress ] = list.add
            promise[tuple[1]] = list.add;
            // Handle state
            if (stateString) {
                list.add((/**
                 * @return {?}
                 */
                function () {
                    // state = [ resolved | rejected ]
                    state = stateString;
                    // [ reject_list | resolve_list ].disable; progress_list.lock
                }), tuples[i ^ 1][2].disable, tuples[2][2].lock);
            }
            // deferred[ resolve | reject | notify ] = list.fire
            deferred[tuple[0]] = list.fire;
            deferred[tuple[0] + "With"] = list.fireWith;
        }));
        // Make the deferred a promise
        promise.promise(deferred);
        // Call given func if any
        if (func) {
            func.call(deferred, deferred);
        }
        // All done!
        return deferred;
    }),
    // Deferred helper
    when: (/**
     * @param {?} subordinate
     * @return {?}
     */
    function (subordinate /* , ..., subordinateN */) {
        /** @type {?} */
        var i = 0;
        /** @type {?} */
        var resolveValues = core_slice.call(arguments);
        /** @type {?} */
        var length = resolveValues.length;
        /** @type {?} */
        var 
        // the count of uncompleted subordinates
        remaining = length !== 1 || (subordinate && jQueryCallBack.isFunction(subordinate.promise)) ? length : 0;
        /** @type {?} */
        var 
        // the master Deferred. If resolveValues consist of only a single Deferred, just use that.
        deferred = remaining === 1 ? subordinate : this.Deferred();
        /** @type {?} */
        var 
        // Update function for both resolve and progress values
        updateFunc = (/**
         * @param {?} i
         * @param {?} contexts
         * @param {?} values
         * @return {?}
         */
        function (i, contexts, values) {
            return (/**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                contexts[i] = this;
                values[i] = arguments.length > 1 ? core_slice.call(arguments) : value;
                if (values === progressValues) {
                    deferred.notifyWith(contexts, values);
                }
                else if (!(--remaining)) {
                    deferred.resolveWith(contexts, values);
                }
            });
        });
        /** @type {?} */
        var progressValues;
        /** @type {?} */
        var progressContexts;
        /** @type {?} */
        var resolveContexts;
        // add listeners to Deferred subordinates; treat others as resolved
        if (length > 1) {
            progressValues = new Array(length);
            progressContexts = new Array(length);
            resolveContexts = new Array(length);
            for (; i < length; i++) {
                if (resolveValues[i] && jQueryCallBack.isFunction(resolveValues[i].promise)) {
                    resolveValues[i].promise()
                        .done(updateFunc(i, resolveContexts, resolveValues))
                        .fail(deferred.reject)
                        .progress(updateFunc(i, progressContexts, progressValues));
                }
                else {
                    --remaining;
                }
            }
        }
        // if we're not waiting on anything, resolve the master
        if (!remaining) {
            deferred.resolveWith(resolveContexts, resolveValues);
        }
        return deferred.promise();
    })
});

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @preserve jquery-param (c) 2015 KNOWLEDGECODE | MIT
 * @type {?}
 */
var param = (/**
 * @param {?} a
 * @return {?}
 */
function (a) {
    /** @type {?} */
    var s = [];
    /** @type {?} */
    var rbracket = /\[\]$/;
    /** @type {?} */
    var isArray = (/**
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    });
    /** @type {?} */
    var add = (/**
     * @param {?} k
     * @param {?} v
     * @return {?}
     */
    function (k, v) {
        v = typeof v === 'function' ? v() : v === null ? '' : v === undefined ? '' : v;
        s[s.length] = encodeURIComponent(k) + '=' + encodeURIComponent(v);
    });
    /** @type {?} */
    var buildParams = (/**
     * @param {?} prefix
     * @param {?} obj
     * @return {?}
     */
    function (prefix, obj) {
        /** @type {?} */
        var i;
        /** @type {?} */
        var len;
        /** @type {?} */
        var key;
        if (prefix) {
            if (isArray(obj)) {
                for (i = 0, len = obj.length; i < len; i++) {
                    if (rbracket.test(prefix)) {
                        add(prefix, obj[i]);
                    }
                    else {
                        buildParams(prefix + '[' + (typeof obj[i] === 'object' ? i : '') + ']', obj[i]);
                    }
                }
            }
            else if (obj && String(obj) === '[object Object]') {
                for (key in obj) {
                    buildParams(prefix + '[' + key + ']', obj[key]);
                }
            }
            else {
                add(prefix, obj);
            }
        }
        else if (isArray(obj)) {
            for (i = 0, len = obj.length; i < len; i++) {
                add(obj[i].name, obj[i].value);
            }
        }
        else {
            for (key in obj) {
                buildParams(key, obj[key]);
            }
        }
        return s;
    });
    return buildParams('', a).join('&').replace(/%20/g, '+');
});

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const jqueryFunction = (/**
 * @param {?} subject
 * @return {?}
 */
function (subject) {
    /** @type {?} */
    let events = subject.events || {};
    if (subject && subject === subject.window)
        return {
            0: subject,
            load: (/**
             * @param {?} handler
             * @return {?}
             */
            (handler) => subject.addEventListener('load', handler, false)),
            bind: (/**
             * @param {?} event
             * @param {?} handler
             * @return {?}
             */
            (event, handler) => subject.addEventListener(event, handler, false)),
            unbind: (/**
             * @param {?} event
             * @param {?} handler
             * @return {?}
             */
            (event, handler) => subject.removeEventListener(event, handler, false))
        };
    return {
        0: subject,
        /**
         * @param {?} event
         * @param {?} handler
         * @return {?}
         */
        unbind(event, handler) {
            /** @type {?} */
            let handlers = events[event] || [];
            if (handler) {
                /** @type {?} */
                let idx = handlers.indexOf(handler);
                if (idx !== -1)
                    handlers.splice(idx, 1);
            }
            else
                handlers = [];
            events[event] = handlers;
            subject.events = events;
        },
        /**
         * @param {?} event
         * @param {?} handler
         * @return {?}
         */
        bind(event, handler) {
            /** @type {?} */
            let current = events[event] || [];
            events[event] = current.concat(handler);
            subject.events = events;
        },
        /**
         * @param {?} event
         * @param {?} args
         * @return {?}
         */
        triggerHandler(event, args) {
            /** @type {?} */
            let handlers = events[event] || [];
            handlers.forEach((/**
             * @param {?} fn
             * @return {?}
             */
            fn => {
                if (args && args[0] && args[0].type === undefined) {
                    args = [{
                            type: event
                        }].concat(args || []);
                }
                else {
                    args = args || [];
                }
                fn.apply(this, args);
            }));
        }
    };
});
/** @type {?} */
const xhr = (/**
 * @return {?}
 */
function () {
    try {
        return new XMLHttpRequest();
    }
    catch (e) { }
});
/** @type {?} */
const ajax = (/**
 * @param {?} options
 * @return {?}
 */
function (options) {
    /** @type {?} */
    const request = xhr();
    request.onreadystatechange = (/**
     * @return {?}
     */
    () => {
        if (request.readyState !== 4) {
            return;
        }
        if (request.status === 200) {
            options.success && options.success(JSON.parse(request.responseText));
        }
        else {
            options.error && options.error(request);
        }
    });
    request.open(options.type, options.url);
    request.setRequestHeader('content-type', options.contentType);
    request.send(options.data.data && `data=${options.data.data}`);
    return {
        abort: (/**
         * @return {?}
         */
        function () {
            return request.abort();
        })
    };
});
var jQueryShim = jQueryCallBack.extend(jqueryFunction, jQueryCallBack, {
    defaultAjaxHeaders: null,
    ajax: ajax,
    trim: (/**
     * @param {?} str
     * @return {?}
     */
    str => str && str.trim()),
    isEmptyObject: (/**
     * @param {?} obj
     * @return {?}
     */
    obj => !obj || Object.keys(obj).length === 0),
    makeArray: (/**
     * @param {?} arr
     * @return {?}
     */
    arr => [].slice.call(arr, 0)),
    param: (/**
     * @param {?} obj
     * @return {?}
     */
    obj => param(obj)),
    support: {
        cors: ((/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            const xhrObj = xhr();
            return !!xhrObj && ("withCredentials" in xhrObj);
        }))()
    }
});

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
function ($, window, undefined$1) {
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
            e.transport = transport ? transport.name : undefined$1;
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
                callback: undefined$1
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
function ($, window, undefined$1) {
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
                    that.transportFailed(transport, undefined$1, onFallback);
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
function ($, window, undefined$1) {
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
function ($, window, undefined$1) {
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
function ($, window, undefined$1) {
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
function ($, window, undefined$1) {
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
function ($, window, undefined$1) {
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
})(jQueryShim));
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
function ($, undefined$1) {
    $.signalR.version = "2.2.1";
})(jQueryShim));
/** @type {?} */
const hubConnection = jQueryShim.hubConnection;
/** @type {?} */
const signalR = jQueryShim.signalR;

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const SIGNALR_CONFIGURATION = new InjectionToken('SIGNALR_CONFIGURATION');
/**
 * @param {?} configuration
 * @param {?} zone
 * @return {?}
 */
function createSignalr(configuration, zone) {
    /** @type {?} */
    const jConnectionFn = getJConnectionFn();
    return new SignalR(configuration, zone, jConnectionFn);
}
/**
 * @return {?}
 */
function getJConnectionFn() {
    /** @type {?} */
    const hubConnectionFn = hubConnection;
    if (hubConnectionFn == null) {
        throw new Error('Signalr failed to initialize. Script \'jquery.signalR.js\' is missing. Please make sure to include \'jquery.signalR.js\' script.');
    }
    return hubConnectionFn;
}
const ɵ0 = SignalR;
class SignalRModule {
    /**
     * @param {?} getSignalRConfiguration
     * @return {?}
     */
    static forRoot(getSignalRConfiguration) {
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
    }
    /**
     * @return {?}
     */
    static forChild() {
        throw new Error('forChild method not implemented');
    }
}
SignalRModule.decorators = [
    { type: NgModule, args: [{
                providers: [{
                        provide: SignalR,
                        useValue: ɵ0
                    }]
            },] }
];

export { BroadcastEventListener, ConnectionStatus, ConnectionStatuses, ConnectionTransport, ConnectionTransports, SignalR, SignalRConfiguration, SignalRConnection, SignalRConnectionMock, SignalRConnectionMockManager, SignalRModule, createSignalr as ɵa, SIGNALR_JCONNECTION_TOKEN as ɵb };
//# sourceMappingURL=ng2-signalr.js.map
