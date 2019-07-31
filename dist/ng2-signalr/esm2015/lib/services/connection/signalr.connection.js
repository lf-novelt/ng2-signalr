/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Subject } from 'rxjs';
import { BroadcastEventListener } from '../eventing/broadcast.event.listener';
import { ConnectionStatus } from './connection.status';
export class SignalRConnection {
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
                /** @type {?} */
                let casted = [];
                if (args.length > 0) {
                    casted = args;
                }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmFsci5jb25uZWN0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLXNpZ25hbHIvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvY29ubmVjdGlvbi9zaWduYWxyLmNvbm5lY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDM0MsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDOUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFPdkQsTUFBTSxPQUFPLGlCQUFpQjs7Ozs7OztJQVMxQixZQUFZLFdBQWdCLEVBQUUsTUFBVyxFQUFFLElBQVksRUFBRSxhQUFtQztRQUN4RixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUN0QixJQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQztRQUNoQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1FBQy9DLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLDhCQUE4QixFQUFFLENBQUM7UUFDckQsSUFBSSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7UUFDcEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7SUFDekIsQ0FBQzs7OztJQUVELElBQVcsTUFBTTtRQUNiLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDOzs7O0lBRUQsSUFBVyxNQUFNO1FBQ2IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7Ozs7SUFFTSxLQUFLOztjQUVGLFdBQVcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUM7O2NBRW5FLFFBQVEsR0FBRyxJQUFJLE9BQU87Ozs7O1FB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Q0gsSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUI7OztZQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFDLENBQUM7U0FDOUM7SUFDTCxDQUFDO0NBQ0o7Ozs7OztJQTVORyxvQ0FBOEM7Ozs7O0lBQzlDLG9DQUFpQzs7Ozs7SUFDakMseUNBQTBCOzs7OztJQUMxQixvQ0FBcUI7Ozs7O0lBQ3JCLGtDQUFzQjs7Ozs7SUFDdEIsMkNBQTZDOzs7OztJQUM3Qyx1Q0FBMEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJU2lnbmFsUkNvbm5lY3Rpb24gfSBmcm9tICcuL2kuc2lnbmFsci5jb25uZWN0aW9uJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBCcm9hZGNhc3RFdmVudExpc3RlbmVyIH0gZnJvbSAnLi4vZXZlbnRpbmcvYnJvYWRjYXN0LmV2ZW50Lmxpc3RlbmVyJztcclxuaW1wb3J0IHsgQ29ubmVjdGlvblN0YXR1cyB9IGZyb20gJy4vY29ubmVjdGlvbi5zdGF0dXMnO1xyXG5pbXBvcnQgeyBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU2lnbmFsUkNvbmZpZ3VyYXRpb24gfSBmcm9tICcuLi9zaWduYWxyLmNvbmZpZ3VyYXRpb24nO1xyXG5pbXBvcnQgeyBDb25uZWN0aW9uVHJhbnNwb3J0IH0gZnJvbSAnLi9jb25uZWN0aW9uLnRyYW5zcG9ydCc7XHJcblxyXG5leHBvcnQgZGVjbGFyZSB0eXBlIENhbGxiYWNrRm4gPSAoLi4uYXJnczogYW55W10pID0+IHZvaWQ7XHJcblxyXG5leHBvcnQgY2xhc3MgU2lnbmFsUkNvbm5lY3Rpb24gaW1wbGVtZW50cyBJU2lnbmFsUkNvbm5lY3Rpb24ge1xyXG4gICAgcHJpdmF0ZSBfc3RhdHVzOiBPYnNlcnZhYmxlPENvbm5lY3Rpb25TdGF0dXM+O1xyXG4gICAgcHJpdmF0ZSBfZXJyb3JzOiBPYnNlcnZhYmxlPGFueT47XHJcbiAgICBwcml2YXRlIF9qQ29ubmVjdGlvbjogYW55O1xyXG4gICAgcHJpdmF0ZSBfalByb3h5OiBhbnk7XHJcbiAgICBwcml2YXRlIF96b25lOiBOZ1pvbmU7XHJcbiAgICBwcml2YXRlIF9jb25maWd1cmF0aW9uOiBTaWduYWxSQ29uZmlndXJhdGlvbjtcclxuICAgIHByaXZhdGUgX2xpc3RlbmVyczogeyBbZXZlbnROYW1lOiBzdHJpbmddOiBDYWxsYmFja0ZuW10gfTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihqQ29ubmVjdGlvbjogYW55LCBqUHJveHk6IGFueSwgem9uZTogTmdab25lLCBjb25maWd1cmF0aW9uOiBTaWduYWxSQ29uZmlndXJhdGlvbikge1xyXG4gICAgICAgIHRoaXMuX2pQcm94eSA9IGpQcm94eTtcclxuICAgICAgICB0aGlzLl9qQ29ubmVjdGlvbiA9IGpDb25uZWN0aW9uO1xyXG4gICAgICAgIHRoaXMuX3pvbmUgPSB6b25lO1xyXG4gICAgICAgIHRoaXMuX2Vycm9ycyA9IHRoaXMud2lyZVVwRXJyb3JzQXNPYnNlcnZhYmxlKCk7XHJcbiAgICAgICAgdGhpcy5fc3RhdHVzID0gdGhpcy53aXJlVXBTdGF0dXNFdmVudHNBc09ic2VydmFibGUoKTtcclxuICAgICAgICB0aGlzLl9jb25maWd1cmF0aW9uID0gY29uZmlndXJhdGlvbjtcclxuICAgICAgICB0aGlzLl9saXN0ZW5lcnMgPSB7fTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGVycm9ycygpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9lcnJvcnM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBzdGF0dXMoKTogT2JzZXJ2YWJsZTxDb25uZWN0aW9uU3RhdHVzPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXR1cztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhcnQoKTogUHJvbWlzZTxJU2lnbmFsUkNvbm5lY3Rpb24+IHtcclxuXHJcbiAgICAgICAgY29uc3QgalRyYW5zcG9ydHMgPSB0aGlzLmNvbnZlcnRUcmFuc3BvcnRzKHRoaXMuX2NvbmZpZ3VyYXRpb24udHJhbnNwb3J0KTtcclxuXHJcbiAgICAgICAgY29uc3QgJHByb21pc2UgPSBuZXcgUHJvbWlzZTxJU2lnbmFsUkNvbm5lY3Rpb24+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fakNvbm5lY3Rpb25cclxuICAgICAgICAgICAgICAgIC5zdGFydCh7XHJcbiAgICAgICAgICAgICAgICAgICAganNvbnA6IHRoaXMuX2NvbmZpZ3VyYXRpb24uanNvbnAsXHJcbiAgICAgICAgICAgICAgICAgICAgcGluZ0ludGVydmFsOiB0aGlzLl9jb25maWd1cmF0aW9uLnBpbmdJbnRlcnZhbCxcclxuICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnQ6IGpUcmFuc3BvcnRzLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpdGhDcmVkZW50aWFsczogdGhpcy5fY29uZmlndXJhdGlvbi53aXRoQ3JlZGVudGlhbHMsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDb25uZWN0aW9uIGVzdGFibGlzaGVkLCBJRDogJyArIHRoaXMuX2pDb25uZWN0aW9uLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQ29ubmVjdGlvbiBlc3RhYmxpc2hlZCwgVHJhbnNwb3J0OiAnICsgdGhpcy5fakNvbm5lY3Rpb24udHJhbnNwb3J0Lm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcyk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmZhaWwoKGVycm9yOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQ291bGQgbm90IGNvbm5lY3QnKTtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoJ0ZhaWxlZCB0byBjb25uZWN0LiBFcnJvcjogJyArIGVycm9yLm1lc3NhZ2UpOyAvLyBleDogRXJyb3IgZHVyaW5nIG5lZ290aWF0aW9uIHJlcXVlc3QuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gJHByb21pc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0b3AoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fakNvbm5lY3Rpb24uc3RvcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgaWQoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fakNvbm5lY3Rpb24uaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGludm9rZShtZXRob2Q6IHN0cmluZywgLi4ucGFyYW1ldGVyczogYW55W10pOiBQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIGlmIChtZXRob2QgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NpZ25hbFJDb25uZWN0aW9uOiBGYWlsZWQgdG8gaW52b2tlLiBBcmd1bWVudCBcXCdtZXRob2RcXCcgY2FuIG5vdCBiZSBudWxsJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubG9nKGBTaWduYWxSQ29ubmVjdGlvbi4gU3RhcnQgaW52b2tpbmcgXFwnJHttZXRob2R9XFwnLi4uYCk7XHJcblxyXG4gICAgICAgIGNvbnN0ICRwcm9taXNlID0gbmV3IFByb21pc2U8YW55PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2pQcm94eS5pbnZva2UobWV0aG9kLCAuLi5wYXJhbWV0ZXJzKVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoKHJlc3VsdDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coYFxcJyR7bWV0aG9kfVxcJyBpbnZva2VkIHN1Y2Nlc2Z1bGx5LiBSZXNvbHZpbmcgcHJvbWlzZS4uLmApO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZyhgUHJvbWlzZSByZXNvbHZlZC5gKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZmFpbCgoZXJyOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgSW52b2tpbmcgXFwnJHttZXRob2R9XFwnIGZhaWxlZC4gUmVqZWN0aW5nIHByb21pc2UuLi5gKTtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgUHJvbWlzZSByZWplY3RlZC5gKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiAkcHJvbWlzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbGlzdGVuPFQ+KGxpc3RlbmVyOiBCcm9hZGNhc3RFdmVudExpc3RlbmVyPFQ+KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGxpc3RlbmVyID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gbGlzdGVuLiBBcmd1bWVudCBcXCdsaXN0ZW5lclxcJyBjYW4gbm90IGJlIG51bGwnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGNhbGxiYWNrOiBDYWxsYmFja0ZuID0gKC4uLmFyZ3M6IGFueVtdKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucnVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBjYXN0ZWQ6IFQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFyZ3MubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc3RlZCA9IGFyZ3NbMF0gYXMgVDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMubG9nKCdTaWduYWxSQ29ubmVjdGlvbi5wcm94eS5vbiBpbnZva2VkLiBDYWxsaW5nIGxpc3RlbmVyIG5leHQoKSAuLi4nKTtcclxuICAgICAgICAgICAgICAgIGxpc3RlbmVyLm5leHQoY2FzdGVkKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9nKCdsaXN0ZW5lciBuZXh0KCkgY2FsbGVkLicpO1xyXG4gICAgICAgICAgICB9LCB0aGlzLl9jb25maWd1cmF0aW9uLmV4ZWN1dGVFdmVudHNJblpvbmUpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuc2V0TGlzdGVuZXIoY2FsbGJhY2ssIGxpc3RlbmVyKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RvcExpc3RlbmluZzxUPihsaXN0ZW5lcjogQnJvYWRjYXN0RXZlbnRMaXN0ZW5lcjxUPik6IHZvaWQge1xyXG4gICAgICAgIGlmIChsaXN0ZW5lciA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIGxpc3Rlbi4gQXJndW1lbnQgXFwnbGlzdGVuZXJcXCcgY2FuIG5vdCBiZSBudWxsJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmxvZyhgU2lnbmFsUkNvbm5lY3Rpb246IFN0b3BwaW5nIGxpc3RlbmluZyB0byBzZXJ2ZXIgZXZlbnQgd2l0aCBuYW1lICR7bGlzdGVuZXIuZXZlbnR9YCk7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9saXN0ZW5lcnNbbGlzdGVuZXIuZXZlbnRdKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVyc1tsaXN0ZW5lci5ldmVudF0gPSBbXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAoY29uc3QgY2FsbGJhY2sgb2YgdGhpcy5fbGlzdGVuZXJzW2xpc3RlbmVyLmV2ZW50XSkge1xyXG4gICAgICAgICAgICB0aGlzLl9qUHJveHkub2ZmKGxpc3RlbmVyLmV2ZW50LCBjYWxsYmFjayk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9saXN0ZW5lcnNbbGlzdGVuZXIuZXZlbnRdID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxpc3RlbkZvcjxUPihldmVudDogc3RyaW5nKTogQnJvYWRjYXN0RXZlbnRMaXN0ZW5lcjxUPiB7XHJcbiAgICAgICAgaWYgKGV2ZW50ID09IG51bGwgfHwgZXZlbnQgPT09ICcnKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIGxpc3Rlbi4gQXJndW1lbnQgXFwnZXZlbnRcXCcgY2FuIG5vdCBiZSBlbXB0eScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgbGlzdGVuZXIgPSBuZXcgQnJvYWRjYXN0RXZlbnRMaXN0ZW5lcjxUPihldmVudCk7XHJcblxyXG4gICAgICAgIHRoaXMubGlzdGVuKGxpc3RlbmVyKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGxpc3RlbmVyO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsaXN0ZW5Gb3JSYXcoZXZlbnQ6IHN0cmluZyk6IEJyb2FkY2FzdEV2ZW50TGlzdGVuZXI8YW55W10+IHtcclxuICAgICAgICBpZiAoZXZlbnQgPT0gbnVsbCB8fCBldmVudCA9PT0gJycpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gbGlzdGVuLiBBcmd1bWVudCBcXCdldmVudFxcJyBjYW4gbm90IGJlIGVtcHR5Jyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBsaXN0ZW5lciA9IG5ldyBCcm9hZGNhc3RFdmVudExpc3RlbmVyPGFueVtdPihldmVudCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGNhbGxiYWNrOiBDYWxsYmFja0ZuID0gKC4uLmFyZ3M6IGFueVtdKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucnVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBjYXN0ZWQ6IGFueVtdID0gW107XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJncy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzdGVkID0gYXJncztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMubG9nKCdTaWduYWxSQ29ubmVjdGlvbi5wcm94eS5vbiBpbnZva2VkLiBDYWxsaW5nIGxpc3RlbmVyIG5leHQoKSAuLi4nKTtcclxuICAgICAgICAgICAgICAgIGxpc3RlbmVyLm5leHQoYXJncyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygnbGlzdGVuZXIgbmV4dCgpIGNhbGxlZC4nKTtcclxuICAgICAgICAgICAgfSwgdGhpcy5fY29uZmlndXJhdGlvbi5leGVjdXRlRXZlbnRzSW5ab25lKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLnNldExpc3RlbmVyKGNhbGxiYWNrLCBsaXN0ZW5lcik7XHJcbiAgICAgICAgcmV0dXJuIGxpc3RlbmVyO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0TGlzdGVuZXI8VD4oY2FsbGJhY2s6IENhbGxiYWNrRm4sIGxpc3RlbmVyOiBCcm9hZGNhc3RFdmVudExpc3RlbmVyPFQ+KSB7XHJcbiAgICAgICAgdGhpcy5sb2coYFNpZ25hbFJDb25uZWN0aW9uOiBTdGFydGluZyB0byBsaXN0ZW4gdG8gc2VydmVyIGV2ZW50IHdpdGggbmFtZSAke2xpc3RlbmVyLmV2ZW50fWApO1xyXG4gICAgICAgIHRoaXMuX2pQcm94eS5vbihsaXN0ZW5lci5ldmVudCwgY2FsbGJhY2spO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fbGlzdGVuZXJzW2xpc3RlbmVyLmV2ZW50XSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVyc1tsaXN0ZW5lci5ldmVudF0gPSBbXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2xpc3RlbmVyc1tsaXN0ZW5lci5ldmVudF0ucHVzaChjYWxsYmFjayk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjb252ZXJ0VHJhbnNwb3J0cyh0cmFuc3BvcnRzOiBDb25uZWN0aW9uVHJhbnNwb3J0IHwgQ29ubmVjdGlvblRyYW5zcG9ydFtdKTogYW55IHtcclxuICAgICAgICBpZiAodHJhbnNwb3J0cyBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cmFuc3BvcnRzLm1hcCgodDogQ29ubmVjdGlvblRyYW5zcG9ydCkgPT4gdC5uYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRyYW5zcG9ydHMubmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHdpcmVVcEVycm9yc0FzT2JzZXJ2YWJsZSgpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgICAgIGNvbnN0IHNFcnJvciA9IG5ldyBTdWJqZWN0PGFueT4oKTtcclxuXHJcbiAgICAgICAgdGhpcy5fakNvbm5lY3Rpb24uZXJyb3IoKGVycm9yOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5ydW4oKCkgPT4gc0Vycm9yLm5leHQoZXJyb3IpLCB0aGlzLl9jb25maWd1cmF0aW9uLmV4ZWN1dGVFcnJvcnNJblpvbmUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBzRXJyb3I7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB3aXJlVXBTdGF0dXNFdmVudHNBc09ic2VydmFibGUoKTogT2JzZXJ2YWJsZTxDb25uZWN0aW9uU3RhdHVzPiB7XHJcbiAgICAgICAgY29uc3Qgc1N0YXR1cyA9IG5ldyBTdWJqZWN0PENvbm5lY3Rpb25TdGF0dXM+KCk7XHJcbiAgICAgICAgLy8gYWdncmVnYXRlIGFsbCBzaWduYWxyIGNvbm5lY3Rpb24gc3RhdHVzIGhhbmRsZXJzIGludG8gMSBvYnNlcnZhYmxlLlxyXG4gICAgICAgIC8vIGhhbmRsZXIgd2lyZSB1cCwgZm9yIHNpZ25hbHIgY29ubmVjdGlvbiBzdGF0dXMgY2FsbGJhY2suXHJcbiAgICAgICAgdGhpcy5fakNvbm5lY3Rpb24uc3RhdGVDaGFuZ2VkKChjaGFuZ2U6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnJ1bigoKSA9PiBzU3RhdHVzLm5leHQobmV3IENvbm5lY3Rpb25TdGF0dXMoY2hhbmdlLm5ld1N0YXRlKSksXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jb25maWd1cmF0aW9uLmV4ZWN1dGVTdGF0dXNDaGFuZ2VJblpvbmUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBzU3RhdHVzLmFzT2JzZXJ2YWJsZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25Ccm9hZGNhc3RFdmVudFJlY2VpdmVkPFQ+KGxpc3RlbmVyOiBCcm9hZGNhc3RFdmVudExpc3RlbmVyPFQ+LCAuLi5hcmdzOiBhbnlbXSkge1xyXG4gICAgICAgIHRoaXMubG9nKCdTaWduYWxSQ29ubmVjdGlvbi5wcm94eS5vbiBpbnZva2VkLiBDYWxsaW5nIGxpc3RlbmVyIG5leHQoKSAuLi4nKTtcclxuXHJcbiAgICAgICAgbGV0IGNhc3RlZDogVCA9IG51bGw7XHJcbiAgICAgICAgaWYgKGFyZ3MubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBjYXN0ZWQgPSBhcmdzWzBdIGFzIFQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICAgIGxpc3RlbmVyLm5leHQoY2FzdGVkKTtcclxuICAgICAgICB9LCB0aGlzLl9jb25maWd1cmF0aW9uLmV4ZWN1dGVFdmVudHNJblpvbmUpO1xyXG5cclxuICAgICAgICB0aGlzLmxvZygnbGlzdGVuZXIgbmV4dCgpIGNhbGxlZC4nKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGxvZyguLi5hcmdzOiBhbnlbXSkge1xyXG4gICAgICAgIGlmICh0aGlzLl9qQ29ubmVjdGlvbi5sb2dnaW5nID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKGFyZ3Muam9pbignLCAnKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBydW4oZnVuYzogKCkgPT4gdm9pZCwgaW5ab25lOiBib29sZWFuKSB7XHJcbiAgICAgICAgaWYgKGluWm9uZSkge1xyXG4gICAgICAgICAgICB0aGlzLl96b25lLnJ1bigoKSA9PiBmdW5jKCkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4gZnVuYygpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19