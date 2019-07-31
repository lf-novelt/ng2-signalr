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
