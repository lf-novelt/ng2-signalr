/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { SignalRConfiguration } from './signalr.configuration';
import { SignalRConnection } from './connection/signalr.connection';
import { NgZone, Injectable, Inject } from '@angular/core';
import { SIGNALR_JCONNECTION_TOKEN } from './signalr.module';
export class SignalR {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmFsci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1zaWduYWxyLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3NpZ25hbHIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzRCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUs3RCxNQUFNLE9BQU8sT0FBTzs7Ozs7O0lBS2hCLFlBQ0ksYUFBbUMsRUFDbkMsSUFBWSxFQUN1QixnQkFBcUIsQ0FBQyxtSEFBbUg7UUFFNUssSUFBSSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7UUFDcEMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLGdCQUFnQixDQUFDO0lBQzlDLENBQUM7Ozs7O0lBRU0sZ0JBQWdCLENBQUMsT0FBNEI7O2NBQzFDLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFFeEQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxDQUFDOzs7Y0FHL0IsV0FBVyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDO1FBQzdELFdBQVcsQ0FBQyxPQUFPLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQztRQUM1QyxXQUFXLENBQUMsRUFBRSxHQUFHLGFBQWEsQ0FBQyxFQUFFLENBQUM7OztjQUc1QixNQUFNLEdBQUcsV0FBVyxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDO1FBQ2hF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QkFBeUI7Ozs7Ozs7SUFQckMsaUNBQTZDOzs7OztJQUM3Qyx3QkFBc0I7Ozs7O0lBQ3RCLG9DQUErQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElTaWduYWxSQ29ubmVjdGlvbiB9IGZyb20gJy4vY29ubmVjdGlvbi9pLnNpZ25hbHIuY29ubmVjdGlvbic7XHJcbmltcG9ydCB7IFNpZ25hbFJDb25maWd1cmF0aW9uIH0gZnJvbSAnLi9zaWduYWxyLmNvbmZpZ3VyYXRpb24nO1xyXG5pbXBvcnQgeyBTaWduYWxSQ29ubmVjdGlvbiB9IGZyb20gJy4vY29ubmVjdGlvbi9zaWduYWxyLmNvbm5lY3Rpb24nO1xyXG5pbXBvcnQgeyBOZ1pvbmUsIEluamVjdGFibGUsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBJQ29ubmVjdGlvbk9wdGlvbnMgfSBmcm9tICcuL2Nvbm5lY3Rpb24vY29ubmVjdGlvbi5vcHRpb25zJztcclxuaW1wb3J0IHsgU0lHTkFMUl9KQ09OTkVDVElPTl9UT0tFTiB9IGZyb20gJy4vc2lnbmFsci5tb2R1bGUnO1xyXG5cclxuZGVjbGFyZSB2YXIgalF1ZXJ5OiBhbnk7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBTaWduYWxSIHtcclxuICAgIHByaXZhdGUgX2NvbmZpZ3VyYXRpb246IFNpZ25hbFJDb25maWd1cmF0aW9uO1xyXG4gICAgcHJpdmF0ZSBfem9uZTogTmdab25lO1xyXG4gICAgcHJpdmF0ZSBfakh1YkNvbm5lY3Rpb25GbjogYW55O1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihcclxuICAgICAgICBjb25maWd1cmF0aW9uOiBTaWduYWxSQ29uZmlndXJhdGlvbixcclxuICAgICAgICB6b25lOiBOZ1pvbmUsXHJcbiAgICAgICAgQEluamVjdChTSUdOQUxSX0pDT05ORUNUSU9OX1RPS0VOKSBqSHViQ29ubmVjdGlvbkZuOiBhbnkgLyogdXNlIHR5cGUgJ2FueSc7IFN1Z2dlc3RlZCB3b3JrYXJvdW5kIGZyb20gYW5ndWxhciByZXBvc2l0b3J5OiBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8xMjYzMSAqL1xyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlndXJhdGlvbiA9IGNvbmZpZ3VyYXRpb247XHJcbiAgICAgICAgdGhpcy5fem9uZSA9IHpvbmU7XHJcbiAgICAgICAgdGhpcy5fakh1YkNvbm5lY3Rpb25GbiA9IGpIdWJDb25uZWN0aW9uRm47XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNyZWF0ZUNvbm5lY3Rpb24ob3B0aW9ucz86IElDb25uZWN0aW9uT3B0aW9ucyk6IFNpZ25hbFJDb25uZWN0aW9uIHtcclxuICAgICAgICBjb25zdCBjb25maWd1cmF0aW9uID0gdGhpcy5tZXJnZShvcHRpb25zID8gb3B0aW9ucyA6IHt9KTtcclxuXHJcbiAgICAgICAgdGhpcy5sb2dDb25maWd1cmF0aW9uKGNvbmZpZ3VyYXRpb24pO1xyXG5cclxuICAgICAgICAvLyBjcmVhdGUgY29ubmVjdGlvbiBvYmplY3RcclxuICAgICAgICBjb25zdCBqQ29ubmVjdGlvbiA9IHRoaXMuX2pIdWJDb25uZWN0aW9uRm4oY29uZmlndXJhdGlvbi51cmwpO1xyXG4gICAgICAgIGpDb25uZWN0aW9uLmxvZ2dpbmcgPSBjb25maWd1cmF0aW9uLmxvZ2dpbmc7XHJcbiAgICAgICAgakNvbm5lY3Rpb24ucXMgPSBjb25maWd1cmF0aW9uLnFzO1xyXG5cclxuICAgICAgICAvLyBjcmVhdGUgYSBwcm94eVxyXG4gICAgICAgIGNvbnN0IGpQcm94eSA9IGpDb25uZWN0aW9uLmNyZWF0ZUh1YlByb3h5KGNvbmZpZ3VyYXRpb24uaHViTmFtZSk7XHJcbiAgICAgICAgLy8gISEhIGltcG9ydGFudC4gV2UgbmVlZCB0byByZWdpc3RlciBhdCBsZWFzdCBvbmUgZnVuY3Rpb24gb3RoZXJ3aXNlIHNlcnZlciBjYWxsYmFja3Mgd2lsbCBub3Qgd29yay5cclxuICAgICAgICBqUHJveHkub24oJ25vT3AnLCAoKSA9PiB7IC8qICovIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBodWJDb25uZWN0aW9uID0gbmV3IFNpZ25hbFJDb25uZWN0aW9uKGpDb25uZWN0aW9uLCBqUHJveHksIHRoaXMuX3pvbmUsIGNvbmZpZ3VyYXRpb24pO1xyXG5cclxuICAgICAgICByZXR1cm4gaHViQ29ubmVjdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY29ubmVjdChvcHRpb25zPzogSUNvbm5lY3Rpb25PcHRpb25zKTogUHJvbWlzZTxJU2lnbmFsUkNvbm5lY3Rpb24+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVDb25uZWN0aW9uKG9wdGlvbnMpLnN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBsb2dDb25maWd1cmF0aW9uKGNvbmZpZ3VyYXRpb246IFNpZ25hbFJDb25maWd1cmF0aW9uKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3Qgc2VyaWFsaXplZFFzID0gSlNPTi5zdHJpbmdpZnkoY29uZmlndXJhdGlvbi5xcyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlcmlhbGl6ZWRUcmFuc3BvcnQgPSBKU09OLnN0cmluZ2lmeShjb25maWd1cmF0aW9uLnRyYW5zcG9ydCk7XHJcbiAgICAgICAgICAgIGlmIChjb25maWd1cmF0aW9uLmxvZ2dpbmcpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBDcmVhdGluZyBjb25uZWN0aW5nIHdpdGguLi5gKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBjb25maWd1cmF0aW9uOlt1cmw6ICcke2NvbmZpZ3VyYXRpb24udXJsfSddIC4uLmApO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYGNvbmZpZ3VyYXRpb246W2h1Yk5hbWU6ICcke2NvbmZpZ3VyYXRpb24uaHViTmFtZX0nXSAuLi5gKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBjb25maWd1cmF0aW9uOltxczogJyR7c2VyaWFsaXplZFFzfSddIC4uLmApO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYGNvbmZpZ3VyYXRpb246W3RyYW5zcG9ydDogJyR7c2VyaWFsaXplZFRyYW5zcG9ydH0nXSAuLi5gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2ggKGVycikgeyAvKiAqLyB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBtZXJnZShvdmVycmlkZXM6IElDb25uZWN0aW9uT3B0aW9ucyk6IFNpZ25hbFJDb25maWd1cmF0aW9uIHtcclxuICAgICAgICBjb25zdCBtZXJnZWQ6IFNpZ25hbFJDb25maWd1cmF0aW9uID0gbmV3IFNpZ25hbFJDb25maWd1cmF0aW9uKCk7XHJcbiAgICAgICAgbWVyZ2VkLmh1Yk5hbWUgPSBvdmVycmlkZXMuaHViTmFtZSB8fCB0aGlzLl9jb25maWd1cmF0aW9uLmh1Yk5hbWU7XHJcbiAgICAgICAgbWVyZ2VkLnVybCA9IG92ZXJyaWRlcy51cmwgfHwgdGhpcy5fY29uZmlndXJhdGlvbi51cmw7XHJcbiAgICAgICAgbWVyZ2VkLnFzID0gb3ZlcnJpZGVzLnFzIHx8IHRoaXMuX2NvbmZpZ3VyYXRpb24ucXM7XHJcbiAgICAgICAgbWVyZ2VkLmxvZ2dpbmcgPSB0aGlzLl9jb25maWd1cmF0aW9uLmxvZ2dpbmc7XHJcbiAgICAgICAgbWVyZ2VkLmpzb25wID0gb3ZlcnJpZGVzLmpzb25wIHx8IHRoaXMuX2NvbmZpZ3VyYXRpb24uanNvbnA7XHJcbiAgICAgICAgbWVyZ2VkLndpdGhDcmVkZW50aWFscyA9IG92ZXJyaWRlcy53aXRoQ3JlZGVudGlhbHMgfHwgdGhpcy5fY29uZmlndXJhdGlvbi53aXRoQ3JlZGVudGlhbHM7XHJcbiAgICAgICAgbWVyZ2VkLnRyYW5zcG9ydCA9IG92ZXJyaWRlcy50cmFuc3BvcnQgfHwgdGhpcy5fY29uZmlndXJhdGlvbi50cmFuc3BvcnQ7XHJcbiAgICAgICAgbWVyZ2VkLmV4ZWN1dGVFdmVudHNJblpvbmUgPSBvdmVycmlkZXMuZXhlY3V0ZUV2ZW50c0luWm9uZSB8fCB0aGlzLl9jb25maWd1cmF0aW9uLmV4ZWN1dGVFdmVudHNJblpvbmU7XHJcbiAgICAgICAgbWVyZ2VkLmV4ZWN1dGVFcnJvcnNJblpvbmUgPSBvdmVycmlkZXMuZXhlY3V0ZUVycm9yc0luWm9uZSB8fCB0aGlzLl9jb25maWd1cmF0aW9uLmV4ZWN1dGVFcnJvcnNJblpvbmU7XHJcbiAgICAgICAgbWVyZ2VkLmV4ZWN1dGVTdGF0dXNDaGFuZ2VJblpvbmUgPSBvdmVycmlkZXMuZXhlY3V0ZVN0YXR1c0NoYW5nZUluWm9uZSB8fCB0aGlzLl9jb25maWd1cmF0aW9uLmV4ZWN1dGVTdGF0dXNDaGFuZ2VJblpvbmU7XHJcbiAgICAgICAgbWVyZ2VkLnBpbmdJbnRlcnZhbCA9IG92ZXJyaWRlcy5waW5nSW50ZXJ2YWwgfHwgdGhpcy5fY29uZmlndXJhdGlvbi5waW5nSW50ZXJ2YWw7XHJcbiAgICAgICAgcmV0dXJuIG1lcmdlZDtcclxuICAgIH1cclxuXHJcbn1cclxuIl19