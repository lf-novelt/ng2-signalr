/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { SignalRConfiguration } from './signalr.configuration';
import { SignalRConnection } from './connection/signalr.connection';
import { NgZone, Injectable, Inject } from '@angular/core';
import { SIGNALR_JCONNECTION_TOKEN } from './signalr.module';
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
export { SignalR };
if (false) {
    /**
     * @type {?}
     * @private
     */
    SignalR.prototype._configuration;
    /**
     * @type {?}
     * @private
     */
    SignalR.prototype._zone;
    /**
     * @type {?}
     * @private
     */
    SignalR.prototype._jHubConnectionFn;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmFsci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1zaWduYWxyLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3NpZ25hbHIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzRCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUk3RDtJQU1JLGlCQUNJLGFBQW1DLEVBQ25DLElBQVksRUFDdUIsZ0JBQXFCLENBQUMsbUhBQW1IO1FBRTVLLElBQUksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxnQkFBZ0IsQ0FBQztJQUM5QyxDQUFDOzs7OztJQUVNLGtDQUFnQjs7OztJQUF2QixVQUF3QixPQUE0Qjs7WUFDMUMsYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUV4RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLENBQUM7OztZQUcvQixXQUFXLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUM7UUFDN0QsV0FBVyxDQUFDLE9BQU8sR0FBRyxhQUFhLENBQUMsT0FBTyxDQUFDO1FBQzVDLFdBQVcsQ0FBQyxFQUFFLEdBQUcsYUFBYSxDQUFDLEVBQUUsQ0FBQzs7O1lBRzVCLE1BQU0sR0FBRyxXQUFXLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUM7UUFDaEUscUdBQXFHO1FB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LE1BQU0sU0FBQyx5QkFBeUI7O0lBNkR6QyxjQUFDO0NBQUEsQUF0RUQsSUFzRUM7U0FyRVksT0FBTzs7Ozs7O0lBQ2hCLGlDQUE2Qzs7Ozs7SUFDN0Msd0JBQXNCOzs7OztJQUN0QixvQ0FBK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJU2lnbmFsUkNvbm5lY3Rpb24gfSBmcm9tICcuL2Nvbm5lY3Rpb24vaS5zaWduYWxyLmNvbm5lY3Rpb24nO1xyXG5pbXBvcnQgeyBTaWduYWxSQ29uZmlndXJhdGlvbiB9IGZyb20gJy4vc2lnbmFsci5jb25maWd1cmF0aW9uJztcclxuaW1wb3J0IHsgU2lnbmFsUkNvbm5lY3Rpb24gfSBmcm9tICcuL2Nvbm5lY3Rpb24vc2lnbmFsci5jb25uZWN0aW9uJztcclxuaW1wb3J0IHsgTmdab25lLCBJbmplY3RhYmxlLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSUNvbm5lY3Rpb25PcHRpb25zIH0gZnJvbSAnLi9jb25uZWN0aW9uL2Nvbm5lY3Rpb24ub3B0aW9ucyc7XHJcbmltcG9ydCB7IFNJR05BTFJfSkNPTk5FQ1RJT05fVE9LRU4gfSBmcm9tICcuL3NpZ25hbHIubW9kdWxlJztcclxuXHJcbmRlY2xhcmUgdmFyIGpRdWVyeTogYW55O1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgU2lnbmFsUiB7XHJcbiAgICBwcml2YXRlIF9jb25maWd1cmF0aW9uOiBTaWduYWxSQ29uZmlndXJhdGlvbjtcclxuICAgIHByaXZhdGUgX3pvbmU6IE5nWm9uZTtcclxuICAgIHByaXZhdGUgX2pIdWJDb25uZWN0aW9uRm46IGFueTtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoXHJcbiAgICAgICAgY29uZmlndXJhdGlvbjogU2lnbmFsUkNvbmZpZ3VyYXRpb24sXHJcbiAgICAgICAgem9uZTogTmdab25lLFxyXG4gICAgICAgIEBJbmplY3QoU0lHTkFMUl9KQ09OTkVDVElPTl9UT0tFTikgakh1YkNvbm5lY3Rpb25GbjogYW55IC8qIHVzZSB0eXBlICdhbnknOyBTdWdnZXN0ZWQgd29ya2Fyb3VuZCBmcm9tIGFuZ3VsYXIgcmVwb3NpdG9yeTogaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMTI2MzEgKi9cclxuICAgICkge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZ3VyYXRpb24gPSBjb25maWd1cmF0aW9uO1xyXG4gICAgICAgIHRoaXMuX3pvbmUgPSB6b25lO1xyXG4gICAgICAgIHRoaXMuX2pIdWJDb25uZWN0aW9uRm4gPSBqSHViQ29ubmVjdGlvbkZuO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjcmVhdGVDb25uZWN0aW9uKG9wdGlvbnM/OiBJQ29ubmVjdGlvbk9wdGlvbnMpOiBTaWduYWxSQ29ubmVjdGlvbiB7XHJcbiAgICAgICAgY29uc3QgY29uZmlndXJhdGlvbiA9IHRoaXMubWVyZ2Uob3B0aW9ucyA/IG9wdGlvbnMgOiB7fSk7XHJcblxyXG4gICAgICAgIHRoaXMubG9nQ29uZmlndXJhdGlvbihjb25maWd1cmF0aW9uKTtcclxuXHJcbiAgICAgICAgLy8gY3JlYXRlIGNvbm5lY3Rpb24gb2JqZWN0XHJcbiAgICAgICAgY29uc3QgakNvbm5lY3Rpb24gPSB0aGlzLl9qSHViQ29ubmVjdGlvbkZuKGNvbmZpZ3VyYXRpb24udXJsKTtcclxuICAgICAgICBqQ29ubmVjdGlvbi5sb2dnaW5nID0gY29uZmlndXJhdGlvbi5sb2dnaW5nO1xyXG4gICAgICAgIGpDb25uZWN0aW9uLnFzID0gY29uZmlndXJhdGlvbi5xcztcclxuXHJcbiAgICAgICAgLy8gY3JlYXRlIGEgcHJveHlcclxuICAgICAgICBjb25zdCBqUHJveHkgPSBqQ29ubmVjdGlvbi5jcmVhdGVIdWJQcm94eShjb25maWd1cmF0aW9uLmh1Yk5hbWUpO1xyXG4gICAgICAgIC8vICEhISBpbXBvcnRhbnQuIFdlIG5lZWQgdG8gcmVnaXN0ZXIgYXQgbGVhc3Qgb25lIGZ1bmN0aW9uIG90aGVyd2lzZSBzZXJ2ZXIgY2FsbGJhY2tzIHdpbGwgbm90IHdvcmsuXHJcbiAgICAgICAgalByb3h5Lm9uKCdub09wJywgKCkgPT4geyAvKiAqLyB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgaHViQ29ubmVjdGlvbiA9IG5ldyBTaWduYWxSQ29ubmVjdGlvbihqQ29ubmVjdGlvbiwgalByb3h5LCB0aGlzLl96b25lLCBjb25maWd1cmF0aW9uKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGh1YkNvbm5lY3Rpb247XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNvbm5lY3Qob3B0aW9ucz86IElDb25uZWN0aW9uT3B0aW9ucyk6IFByb21pc2U8SVNpZ25hbFJDb25uZWN0aW9uPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlQ29ubmVjdGlvbihvcHRpb25zKS5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbG9nQ29uZmlndXJhdGlvbihjb25maWd1cmF0aW9uOiBTaWduYWxSQ29uZmlndXJhdGlvbikge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlcmlhbGl6ZWRRcyA9IEpTT04uc3RyaW5naWZ5KGNvbmZpZ3VyYXRpb24ucXMpO1xyXG4gICAgICAgICAgICBjb25zdCBzZXJpYWxpemVkVHJhbnNwb3J0ID0gSlNPTi5zdHJpbmdpZnkoY29uZmlndXJhdGlvbi50cmFuc3BvcnQpO1xyXG4gICAgICAgICAgICBpZiAoY29uZmlndXJhdGlvbi5sb2dnaW5nKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgQ3JlYXRpbmcgY29ubmVjdGluZyB3aXRoLi4uYCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgY29uZmlndXJhdGlvbjpbdXJsOiAnJHtjb25maWd1cmF0aW9uLnVybH0nXSAuLi5gKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBjb25maWd1cmF0aW9uOltodWJOYW1lOiAnJHtjb25maWd1cmF0aW9uLmh1Yk5hbWV9J10gLi4uYCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgY29uZmlndXJhdGlvbjpbcXM6ICcke3NlcmlhbGl6ZWRRc30nXSAuLi5gKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBjb25maWd1cmF0aW9uOlt0cmFuc3BvcnQ6ICcke3NlcmlhbGl6ZWRUcmFuc3BvcnR9J10gLi4uYCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlcnIpIHsgLyogKi8gfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbWVyZ2Uob3ZlcnJpZGVzOiBJQ29ubmVjdGlvbk9wdGlvbnMpOiBTaWduYWxSQ29uZmlndXJhdGlvbiB7XHJcbiAgICAgICAgY29uc3QgbWVyZ2VkOiBTaWduYWxSQ29uZmlndXJhdGlvbiA9IG5ldyBTaWduYWxSQ29uZmlndXJhdGlvbigpO1xyXG4gICAgICAgIG1lcmdlZC5odWJOYW1lID0gb3ZlcnJpZGVzLmh1Yk5hbWUgfHwgdGhpcy5fY29uZmlndXJhdGlvbi5odWJOYW1lO1xyXG4gICAgICAgIG1lcmdlZC51cmwgPSBvdmVycmlkZXMudXJsIHx8IHRoaXMuX2NvbmZpZ3VyYXRpb24udXJsO1xyXG4gICAgICAgIG1lcmdlZC5xcyA9IG92ZXJyaWRlcy5xcyB8fCB0aGlzLl9jb25maWd1cmF0aW9uLnFzO1xyXG4gICAgICAgIG1lcmdlZC5sb2dnaW5nID0gdGhpcy5fY29uZmlndXJhdGlvbi5sb2dnaW5nO1xyXG4gICAgICAgIG1lcmdlZC5qc29ucCA9IG92ZXJyaWRlcy5qc29ucCB8fCB0aGlzLl9jb25maWd1cmF0aW9uLmpzb25wO1xyXG4gICAgICAgIG1lcmdlZC53aXRoQ3JlZGVudGlhbHMgPSBvdmVycmlkZXMud2l0aENyZWRlbnRpYWxzIHx8IHRoaXMuX2NvbmZpZ3VyYXRpb24ud2l0aENyZWRlbnRpYWxzO1xyXG4gICAgICAgIG1lcmdlZC50cmFuc3BvcnQgPSBvdmVycmlkZXMudHJhbnNwb3J0IHx8IHRoaXMuX2NvbmZpZ3VyYXRpb24udHJhbnNwb3J0O1xyXG4gICAgICAgIG1lcmdlZC5leGVjdXRlRXZlbnRzSW5ab25lID0gb3ZlcnJpZGVzLmV4ZWN1dGVFdmVudHNJblpvbmUgfHwgdGhpcy5fY29uZmlndXJhdGlvbi5leGVjdXRlRXZlbnRzSW5ab25lO1xyXG4gICAgICAgIG1lcmdlZC5leGVjdXRlRXJyb3JzSW5ab25lID0gb3ZlcnJpZGVzLmV4ZWN1dGVFcnJvcnNJblpvbmUgfHwgdGhpcy5fY29uZmlndXJhdGlvbi5leGVjdXRlRXJyb3JzSW5ab25lO1xyXG4gICAgICAgIG1lcmdlZC5leGVjdXRlU3RhdHVzQ2hhbmdlSW5ab25lID0gb3ZlcnJpZGVzLmV4ZWN1dGVTdGF0dXNDaGFuZ2VJblpvbmUgfHwgdGhpcy5fY29uZmlndXJhdGlvbi5leGVjdXRlU3RhdHVzQ2hhbmdlSW5ab25lO1xyXG4gICAgICAgIG1lcmdlZC5waW5nSW50ZXJ2YWwgPSBvdmVycmlkZXMucGluZ0ludGVydmFsIHx8IHRoaXMuX2NvbmZpZ3VyYXRpb24ucGluZ0ludGVydmFsO1xyXG4gICAgICAgIHJldHVybiBtZXJnZWQ7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==