/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Subject } from 'rxjs';
import { BroadcastEventListener } from '../eventing/broadcast.event.listener';
import { ConnectionStatus } from './connection.status';
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
            (_a = _this._jProxy).invoke.apply(_a, tslib_1.__spread([method], parameters)).done((/**
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
            for (var _b = tslib_1.__values(this._listeners[listener.event]), _c = _b.next(); !_c.done; _c = _b.next()) {
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
                /** @type {?} */
                var casted = [];
                if (args.length > 0) {
                    casted = args;
                }
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
export { SignalRConnection };
if (false) {
    /**
     * @type {?}
     * @private
     */
    SignalRConnection.prototype._status;
    /**
     * @type {?}
     * @private
     */
    SignalRConnection.prototype._errors;
    /**
     * @type {?}
     * @private
     */
    SignalRConnection.prototype._jConnection;
    /**
     * @type {?}
     * @private
     */
    SignalRConnection.prototype._jProxy;
    /**
     * @type {?}
     * @private
     */
    SignalRConnection.prototype._zone;
    /**
     * @type {?}
     * @private
     */
    SignalRConnection.prototype._configuration;
    /**
     * @type {?}
     * @private
     */
    SignalRConnection.prototype._listeners;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmFsci5jb25uZWN0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLXNpZ25hbHIvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvY29ubmVjdGlvbi9zaWduYWxyLmNvbm5lY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQzlFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBT3ZEO0lBU0ksMkJBQVksV0FBZ0IsRUFBRSxNQUFXLEVBQUUsSUFBWSxFQUFFLGFBQW1DO1FBQ3hGLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7UUFDL0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsOEJBQThCLEVBQUUsQ0FBQztRQUNyRCxJQUFJLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztRQUNwQyxJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRUQsc0JBQVcscUNBQU07Ozs7UUFBakI7WUFDSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDeEIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyxxQ0FBTTs7OztRQUFqQjtZQUNJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN4QixDQUFDOzs7T0FBQTs7OztJQUVNLGlDQUFLOzs7SUFBWjtRQUFBLGlCQXVCQzs7WUFyQlMsV0FBVyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQzs7WUFF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Qzs7Ozs7O0lBRU8sK0JBQUc7Ozs7O0lBQVg7UUFBWSxjQUFjO2FBQWQsVUFBYyxFQUFkLHFCQUFjLEVBQWQsSUFBYztZQUFkLHlCQUFjOztRQUN0QixJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxLQUFLLEtBQUssRUFBRTtZQUNyQyxPQUFPO1NBQ1Y7UUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNqQyxDQUFDOzs7Ozs7O0lBRU8sK0JBQUc7Ozs7OztJQUFYLFVBQVksSUFBZ0IsRUFBRSxNQUFlO1FBQ3pDLElBQUksTUFBTSxFQUFFO1lBQ1IsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHOzs7WUFBQyxjQUFNLE9BQUEsSUFBSSxFQUFFLEVBQU4sQ0FBTSxFQUFDLENBQUM7U0FDaEM7YUFBTTtZQUNILElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCOzs7WUFBQyxjQUFNLE9BQUEsSUFBSSxFQUFFLEVBQU4sQ0FBTSxFQUFDLENBQUM7U0FDOUM7SUFDTCxDQUFDO0lBQ0wsd0JBQUM7QUFBRCxDQUFDLEFBN05ELElBNk5DOzs7Ozs7O0lBNU5HLG9DQUE4Qzs7Ozs7SUFDOUMsb0NBQWlDOzs7OztJQUNqQyx5Q0FBMEI7Ozs7O0lBQzFCLG9DQUFxQjs7Ozs7SUFDckIsa0NBQXNCOzs7OztJQUN0QiwyQ0FBNkM7Ozs7O0lBQzdDLHVDQUEwRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElTaWduYWxSQ29ubmVjdGlvbiB9IGZyb20gJy4vaS5zaWduYWxyLmNvbm5lY3Rpb24nO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IEJyb2FkY2FzdEV2ZW50TGlzdGVuZXIgfSBmcm9tICcuLi9ldmVudGluZy9icm9hZGNhc3QuZXZlbnQubGlzdGVuZXInO1xyXG5pbXBvcnQgeyBDb25uZWN0aW9uU3RhdHVzIH0gZnJvbSAnLi9jb25uZWN0aW9uLnN0YXR1cyc7XHJcbmltcG9ydCB7IE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTaWduYWxSQ29uZmlndXJhdGlvbiB9IGZyb20gJy4uL3NpZ25hbHIuY29uZmlndXJhdGlvbic7XHJcbmltcG9ydCB7IENvbm5lY3Rpb25UcmFuc3BvcnQgfSBmcm9tICcuL2Nvbm5lY3Rpb24udHJhbnNwb3J0JztcclxuXHJcbmV4cG9ydCBkZWNsYXJlIHR5cGUgQ2FsbGJhY2tGbiA9ICguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZDtcclxuXHJcbmV4cG9ydCBjbGFzcyBTaWduYWxSQ29ubmVjdGlvbiBpbXBsZW1lbnRzIElTaWduYWxSQ29ubmVjdGlvbiB7XHJcbiAgICBwcml2YXRlIF9zdGF0dXM6IE9ic2VydmFibGU8Q29ubmVjdGlvblN0YXR1cz47XHJcbiAgICBwcml2YXRlIF9lcnJvcnM6IE9ic2VydmFibGU8YW55PjtcclxuICAgIHByaXZhdGUgX2pDb25uZWN0aW9uOiBhbnk7XHJcbiAgICBwcml2YXRlIF9qUHJveHk6IGFueTtcclxuICAgIHByaXZhdGUgX3pvbmU6IE5nWm9uZTtcclxuICAgIHByaXZhdGUgX2NvbmZpZ3VyYXRpb246IFNpZ25hbFJDb25maWd1cmF0aW9uO1xyXG4gICAgcHJpdmF0ZSBfbGlzdGVuZXJzOiB7IFtldmVudE5hbWU6IHN0cmluZ106IENhbGxiYWNrRm5bXSB9O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGpDb25uZWN0aW9uOiBhbnksIGpQcm94eTogYW55LCB6b25lOiBOZ1pvbmUsIGNvbmZpZ3VyYXRpb246IFNpZ25hbFJDb25maWd1cmF0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5falByb3h5ID0galByb3h5O1xyXG4gICAgICAgIHRoaXMuX2pDb25uZWN0aW9uID0gakNvbm5lY3Rpb247XHJcbiAgICAgICAgdGhpcy5fem9uZSA9IHpvbmU7XHJcbiAgICAgICAgdGhpcy5fZXJyb3JzID0gdGhpcy53aXJlVXBFcnJvcnNBc09ic2VydmFibGUoKTtcclxuICAgICAgICB0aGlzLl9zdGF0dXMgPSB0aGlzLndpcmVVcFN0YXR1c0V2ZW50c0FzT2JzZXJ2YWJsZSgpO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZ3VyYXRpb24gPSBjb25maWd1cmF0aW9uO1xyXG4gICAgICAgIHRoaXMuX2xpc3RlbmVycyA9IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgZXJyb3JzKCk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Vycm9ycztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHN0YXR1cygpOiBPYnNlcnZhYmxlPENvbm5lY3Rpb25TdGF0dXM+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc3RhdHVzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGFydCgpOiBQcm9taXNlPElTaWduYWxSQ29ubmVjdGlvbj4ge1xyXG5cclxuICAgICAgICBjb25zdCBqVHJhbnNwb3J0cyA9IHRoaXMuY29udmVydFRyYW5zcG9ydHModGhpcy5fY29uZmlndXJhdGlvbi50cmFuc3BvcnQpO1xyXG5cclxuICAgICAgICBjb25zdCAkcHJvbWlzZSA9IG5ldyBQcm9taXNlPElTaWduYWxSQ29ubmVjdGlvbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9qQ29ubmVjdGlvblxyXG4gICAgICAgICAgICAgICAgLnN0YXJ0KHtcclxuICAgICAgICAgICAgICAgICAgICBqc29ucDogdGhpcy5fY29uZmlndXJhdGlvbi5qc29ucCxcclxuICAgICAgICAgICAgICAgICAgICBwaW5nSW50ZXJ2YWw6IHRoaXMuX2NvbmZpZ3VyYXRpb24ucGluZ0ludGVydmFsLFxyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zcG9ydDogalRyYW5zcG9ydHMsXHJcbiAgICAgICAgICAgICAgICAgICAgd2l0aENyZWRlbnRpYWxzOiB0aGlzLl9jb25maWd1cmF0aW9uLndpdGhDcmVkZW50aWFscyxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0Nvbm5lY3Rpb24gZXN0YWJsaXNoZWQsIElEOiAnICsgdGhpcy5fakNvbm5lY3Rpb24uaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDb25uZWN0aW9uIGVzdGFibGlzaGVkLCBUcmFuc3BvcnQ6ICcgKyB0aGlzLl9qQ29ubmVjdGlvbi50cmFuc3BvcnQubmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZmFpbCgoZXJyb3I6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDb3VsZCBub3QgY29ubmVjdCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCgnRmFpbGVkIHRvIGNvbm5lY3QuIEVycm9yOiAnICsgZXJyb3IubWVzc2FnZSk7IC8vIGV4OiBFcnJvciBkdXJpbmcgbmVnb3RpYXRpb24gcmVxdWVzdC5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiAkcHJvbWlzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RvcCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9qQ29ubmVjdGlvbi5zdG9wKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBpZCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9qQ29ubmVjdGlvbi5pZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW52b2tlKG1ldGhvZDogc3RyaW5nLCAuLi5wYXJhbWV0ZXJzOiBhbnlbXSk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgaWYgKG1ldGhvZCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU2lnbmFsUkNvbm5lY3Rpb246IEZhaWxlZCB0byBpbnZva2UuIEFyZ3VtZW50IFxcJ21ldGhvZFxcJyBjYW4gbm90IGJlIG51bGwnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sb2coYFNpZ25hbFJDb25uZWN0aW9uLiBTdGFydCBpbnZva2luZyBcXCcke21ldGhvZH1cXCcuLi5gKTtcclxuXHJcbiAgICAgICAgY29uc3QgJHByb21pc2UgPSBuZXcgUHJvbWlzZTxhbnk+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5falByb3h5Lmludm9rZShtZXRob2QsIC4uLnBhcmFtZXRlcnMpXHJcbiAgICAgICAgICAgICAgICAuZG9uZSgocmVzdWx0OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZyhgXFwnJHttZXRob2R9XFwnIGludm9rZWQgc3VjY2VzZnVsbHkuIFJlc29sdmluZyBwcm9taXNlLi4uYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKGBQcm9taXNlIHJlc29sdmVkLmApO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5mYWlsKChlcnI6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBJbnZva2luZyBcXCcke21ldGhvZH1cXCcgZmFpbGVkLiBSZWplY3RpbmcgcHJvbWlzZS4uLmApO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBQcm9taXNlIHJlamVjdGVkLmApO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuICRwcm9taXNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsaXN0ZW48VD4obGlzdGVuZXI6IEJyb2FkY2FzdEV2ZW50TGlzdGVuZXI8VD4pOiB2b2lkIHtcclxuICAgICAgICBpZiAobGlzdGVuZXIgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWxlZCB0byBsaXN0ZW4uIEFyZ3VtZW50IFxcJ2xpc3RlbmVyXFwnIGNhbiBub3QgYmUgbnVsbCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgY2FsbGJhY2s6IENhbGxiYWNrRm4gPSAoLi4uYXJnczogYW55W10pID0+IHtcclxuICAgICAgICAgICAgdGhpcy5ydW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNhc3RlZDogVCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJncy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzdGVkID0gYXJnc1swXSBhcyBUO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ1NpZ25hbFJDb25uZWN0aW9uLnByb3h5Lm9uIGludm9rZWQuIENhbGxpbmcgbGlzdGVuZXIgbmV4dCgpIC4uLicpO1xyXG4gICAgICAgICAgICAgICAgbGlzdGVuZXIubmV4dChjYXN0ZWQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ2xpc3RlbmVyIG5leHQoKSBjYWxsZWQuJyk7XHJcbiAgICAgICAgICAgIH0sIHRoaXMuX2NvbmZpZ3VyYXRpb24uZXhlY3V0ZUV2ZW50c0luWm9uZSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRMaXN0ZW5lcihjYWxsYmFjaywgbGlzdGVuZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdG9wTGlzdGVuaW5nPFQ+KGxpc3RlbmVyOiBCcm9hZGNhc3RFdmVudExpc3RlbmVyPFQ+KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGxpc3RlbmVyID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gbGlzdGVuLiBBcmd1bWVudCBcXCdsaXN0ZW5lclxcJyBjYW4gbm90IGJlIG51bGwnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubG9nKGBTaWduYWxSQ29ubmVjdGlvbjogU3RvcHBpbmcgbGlzdGVuaW5nIHRvIHNlcnZlciBldmVudCB3aXRoIG5hbWUgJHtsaXN0ZW5lci5ldmVudH1gKTtcclxuICAgICAgICBpZiAoIXRoaXMuX2xpc3RlbmVyc1tsaXN0ZW5lci5ldmVudF0pIHtcclxuICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJzW2xpc3RlbmVyLmV2ZW50XSA9IFtdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBjYWxsYmFjayBvZiB0aGlzLl9saXN0ZW5lcnNbbGlzdGVuZXIuZXZlbnRdKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2pQcm94eS5vZmYobGlzdGVuZXIuZXZlbnQsIGNhbGxiYWNrKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2xpc3RlbmVyc1tsaXN0ZW5lci5ldmVudF0gPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbGlzdGVuRm9yPFQ+KGV2ZW50OiBzdHJpbmcpOiBCcm9hZGNhc3RFdmVudExpc3RlbmVyPFQ+IHtcclxuICAgICAgICBpZiAoZXZlbnQgPT0gbnVsbCB8fCBldmVudCA9PT0gJycpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gbGlzdGVuLiBBcmd1bWVudCBcXCdldmVudFxcJyBjYW4gbm90IGJlIGVtcHR5Jyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBsaXN0ZW5lciA9IG5ldyBCcm9hZGNhc3RFdmVudExpc3RlbmVyPFQ+KGV2ZW50KTtcclxuXHJcbiAgICAgICAgdGhpcy5saXN0ZW4obGlzdGVuZXIpO1xyXG5cclxuICAgICAgICByZXR1cm4gbGlzdGVuZXI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxpc3RlbkZvclJhdyhldmVudDogc3RyaW5nKTogQnJvYWRjYXN0RXZlbnRMaXN0ZW5lcjxhbnlbXT4ge1xyXG4gICAgICAgIGlmIChldmVudCA9PSBudWxsIHx8IGV2ZW50ID09PSAnJykge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWxlZCB0byBsaXN0ZW4uIEFyZ3VtZW50IFxcJ2V2ZW50XFwnIGNhbiBub3QgYmUgZW1wdHknKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGxpc3RlbmVyID0gbmV3IEJyb2FkY2FzdEV2ZW50TGlzdGVuZXI8YW55W10+KGV2ZW50KTtcclxuXHJcbiAgICAgICAgY29uc3QgY2FsbGJhY2s6IENhbGxiYWNrRm4gPSAoLi4uYXJnczogYW55W10pID0+IHtcclxuICAgICAgICAgICAgdGhpcy5ydW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNhc3RlZDogYW55W10gPSBbXTtcclxuICAgICAgICAgICAgICAgIGlmIChhcmdzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXN0ZWQgPSBhcmdzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ1NpZ25hbFJDb25uZWN0aW9uLnByb3h5Lm9uIGludm9rZWQuIENhbGxpbmcgbGlzdGVuZXIgbmV4dCgpIC4uLicpO1xyXG4gICAgICAgICAgICAgICAgbGlzdGVuZXIubmV4dChhcmdzKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9nKCdsaXN0ZW5lciBuZXh0KCkgY2FsbGVkLicpO1xyXG4gICAgICAgICAgICB9LCB0aGlzLl9jb25maWd1cmF0aW9uLmV4ZWN1dGVFdmVudHNJblpvbmUpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuc2V0TGlzdGVuZXIoY2FsbGJhY2ssIGxpc3RlbmVyKTtcclxuICAgICAgICByZXR1cm4gbGlzdGVuZXI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRMaXN0ZW5lcjxUPihjYWxsYmFjazogQ2FsbGJhY2tGbiwgbGlzdGVuZXI6IEJyb2FkY2FzdEV2ZW50TGlzdGVuZXI8VD4pIHtcclxuICAgICAgICB0aGlzLmxvZyhgU2lnbmFsUkNvbm5lY3Rpb246IFN0YXJ0aW5nIHRvIGxpc3RlbiB0byBzZXJ2ZXIgZXZlbnQgd2l0aCBuYW1lICR7bGlzdGVuZXIuZXZlbnR9YCk7XHJcbiAgICAgICAgdGhpcy5falByb3h5Lm9uKGxpc3RlbmVyLmV2ZW50LCBjYWxsYmFjayk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9saXN0ZW5lcnNbbGlzdGVuZXIuZXZlbnRdID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJzW2xpc3RlbmVyLmV2ZW50XSA9IFtdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fbGlzdGVuZXJzW2xpc3RlbmVyLmV2ZW50XS5wdXNoKGNhbGxiYWNrKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNvbnZlcnRUcmFuc3BvcnRzKHRyYW5zcG9ydHM6IENvbm5lY3Rpb25UcmFuc3BvcnQgfCBDb25uZWN0aW9uVHJhbnNwb3J0W10pOiBhbnkge1xyXG4gICAgICAgIGlmICh0cmFuc3BvcnRzIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRyYW5zcG9ydHMubWFwKCh0OiBDb25uZWN0aW9uVHJhbnNwb3J0KSA9PiB0Lm5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJhbnNwb3J0cy5uYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgd2lyZVVwRXJyb3JzQXNPYnNlcnZhYmxlKCk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICAgICAgY29uc3Qgc0Vycm9yID0gbmV3IFN1YmplY3Q8YW55PigpO1xyXG5cclxuICAgICAgICB0aGlzLl9qQ29ubmVjdGlvbi5lcnJvcigoZXJyb3I6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnJ1bigoKSA9PiBzRXJyb3IubmV4dChlcnJvciksIHRoaXMuX2NvbmZpZ3VyYXRpb24uZXhlY3V0ZUVycm9yc0luWm9uZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHNFcnJvcjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHdpcmVVcFN0YXR1c0V2ZW50c0FzT2JzZXJ2YWJsZSgpOiBPYnNlcnZhYmxlPENvbm5lY3Rpb25TdGF0dXM+IHtcclxuICAgICAgICBjb25zdCBzU3RhdHVzID0gbmV3IFN1YmplY3Q8Q29ubmVjdGlvblN0YXR1cz4oKTtcclxuICAgICAgICAvLyBhZ2dyZWdhdGUgYWxsIHNpZ25hbHIgY29ubmVjdGlvbiBzdGF0dXMgaGFuZGxlcnMgaW50byAxIG9ic2VydmFibGUuXHJcbiAgICAgICAgLy8gaGFuZGxlciB3aXJlIHVwLCBmb3Igc2lnbmFsciBjb25uZWN0aW9uIHN0YXR1cyBjYWxsYmFjay5cclxuICAgICAgICB0aGlzLl9qQ29ubmVjdGlvbi5zdGF0ZUNoYW5nZWQoKGNoYW5nZTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucnVuKCgpID0+IHNTdGF0dXMubmV4dChuZXcgQ29ubmVjdGlvblN0YXR1cyhjaGFuZ2UubmV3U3RhdGUpKSxcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NvbmZpZ3VyYXRpb24uZXhlY3V0ZVN0YXR1c0NoYW5nZUluWm9uZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHNTdGF0dXMuYXNPYnNlcnZhYmxlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkJyb2FkY2FzdEV2ZW50UmVjZWl2ZWQ8VD4obGlzdGVuZXI6IEJyb2FkY2FzdEV2ZW50TGlzdGVuZXI8VD4sIC4uLmFyZ3M6IGFueVtdKSB7XHJcbiAgICAgICAgdGhpcy5sb2coJ1NpZ25hbFJDb25uZWN0aW9uLnByb3h5Lm9uIGludm9rZWQuIENhbGxpbmcgbGlzdGVuZXIgbmV4dCgpIC4uLicpO1xyXG5cclxuICAgICAgICBsZXQgY2FzdGVkOiBUID0gbnVsbDtcclxuICAgICAgICBpZiAoYXJncy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGNhc3RlZCA9IGFyZ3NbMF0gYXMgVDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucnVuKCgpID0+IHtcclxuICAgICAgICAgICAgbGlzdGVuZXIubmV4dChjYXN0ZWQpO1xyXG4gICAgICAgIH0sIHRoaXMuX2NvbmZpZ3VyYXRpb24uZXhlY3V0ZUV2ZW50c0luWm9uZSk7XHJcblxyXG4gICAgICAgIHRoaXMubG9nKCdsaXN0ZW5lciBuZXh0KCkgY2FsbGVkLicpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbG9nKC4uLmFyZ3M6IGFueVtdKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2pDb25uZWN0aW9uLmxvZ2dpbmcgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coYXJncy5qb2luKCcsICcpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJ1bihmdW5jOiAoKSA9PiB2b2lkLCBpblpvbmU6IGJvb2xlYW4pIHtcclxuICAgICAgICBpZiAoaW5ab25lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3pvbmUucnVuKCgpID0+IGZ1bmMoKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiBmdW5jKCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=