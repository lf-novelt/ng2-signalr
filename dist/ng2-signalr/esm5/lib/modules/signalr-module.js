/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule, NgZone, InjectionToken } from '@angular/core';
import { SignalR } from '../services/signalr';
import { hubConnection } from '../signalr-no-jquery/signalR';
/** @type {?} */
var SIGNALR_CONFIGURATION = new InjectionToken('SIGNALR_CONFIGURATION');
/**
 * @param {?} configuration
 * @param {?} zone
 * @return {?}
 */
export function createSignalr(configuration, zone) {
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
export { SignalRModule };
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmFsci1tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItc2lnbmFsci8iLCJzb3VyY2VzIjpbImxpYi9tb2R1bGVzL3NpZ25hbHItbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUF1QixNQUFNLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RGLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUU5QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sOEJBQThCLENBQUM7O0lBRXZELHFCQUFxQixHQUFHLElBQUksY0FBYyxDQUF1Qix1QkFBdUIsQ0FBQzs7Ozs7O0FBRS9GLE1BQU0sVUFBVSxhQUFhLENBQUMsYUFBbUMsRUFBRSxJQUFZOztRQUVyRSxhQUFhLEdBQUcsZ0JBQWdCLEVBQUU7SUFFeEMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxhQUFhLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxDQUFDO0FBQzNELENBQUM7Ozs7QUFFRCxTQUFTLGdCQUFnQjs7UUFDZixlQUFlLEdBQUcsYUFBYTtJQUNyQyxJQUFJLGVBQWUsSUFBSSxJQUFJLEVBQUU7UUFDekIsTUFBTSxJQUFJLEtBQUssQ0FBQyxrSUFBa0ksQ0FBQyxDQUFDO0tBQ3ZKO0lBQ0QsT0FBTyxlQUFlLENBQUM7QUFDM0IsQ0FBQztTQUlpQixPQUFPO0FBSHpCO0lBQUE7SUEwQkEsQ0FBQzs7Ozs7SUFuQmlCLHFCQUFPOzs7O0lBQXJCLFVBQXNCLHVCQUFtQztRQUNyRCxPQUFPO1lBQ0gsUUFBUSxFQUFFLGFBQWE7WUFDdkIsU0FBUyxFQUFFO2dCQUNQO29CQUNJLE9BQU8sRUFBRSxxQkFBcUI7b0JBQzlCLFVBQVUsRUFBRSx1QkFBdUI7aUJBQ3RDO2dCQUNEO29CQUNJLElBQUksRUFBRSxDQUFDLHFCQUFxQixFQUFFLE1BQU0sQ0FBQztvQkFDckMsT0FBTyxFQUFFLE9BQU87b0JBQ2hCLFVBQVUsRUFBRSxDQUFDLGFBQWEsQ0FBQztpQkFDOUI7YUFDSjtTQUNKLENBQUM7SUFDTixDQUFDOzs7O0lBQ2Esc0JBQVE7OztJQUF0QjtRQUNJLE1BQU0sSUFBSSxLQUFLLENBQUMsaUNBQWlDLENBQUMsQ0FBQztJQUN2RCxDQUFDOztnQkF6QkosUUFBUSxTQUFDO29CQUNOLFNBQVMsRUFBRSxDQUFDOzRCQUNSLE9BQU8sRUFBRSxPQUFPOzRCQUNoQixRQUFRLElBQVM7eUJBQ3BCLENBQUM7aUJBQ0w7O0lBcUJELG9CQUFDO0NBQUEsQUExQkQsSUEwQkM7U0FwQlksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ1pvbmUsIEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFNpZ25hbFIgfSBmcm9tICcuLi9zZXJ2aWNlcy9zaWduYWxyJztcclxuaW1wb3J0IHsgU2lnbmFsUkNvbmZpZ3VyYXRpb24gfSBmcm9tICcuLi9zZXJ2aWNlcy9zaWduYWxyLmNvbmZpZ3VyYXRpb24nO1xyXG5pbXBvcnQgeyBodWJDb25uZWN0aW9uIH0gZnJvbSAnLi4vc2lnbmFsci1uby1qcXVlcnkvc2lnbmFsUic7XHJcblxyXG5jb25zdCBTSUdOQUxSX0NPTkZJR1VSQVRJT04gPSBuZXcgSW5qZWN0aW9uVG9rZW48U2lnbmFsUkNvbmZpZ3VyYXRpb24+KCdTSUdOQUxSX0NPTkZJR1VSQVRJT04nKTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTaWduYWxyKGNvbmZpZ3VyYXRpb246IFNpZ25hbFJDb25maWd1cmF0aW9uLCB6b25lOiBOZ1pvbmUpIHtcclxuXHJcbiAgICBjb25zdCBqQ29ubmVjdGlvbkZuID0gZ2V0SkNvbm5lY3Rpb25GbigpO1xyXG5cclxuICAgIHJldHVybiBuZXcgU2lnbmFsUihjb25maWd1cmF0aW9uLCB6b25lLCBqQ29ubmVjdGlvbkZuKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0SkNvbm5lY3Rpb25GbigpOiBhbnkge1xyXG4gICAgY29uc3QgaHViQ29ubmVjdGlvbkZuID0gaHViQ29ubmVjdGlvbjtcclxuICAgIGlmIChodWJDb25uZWN0aW9uRm4gPT0gbnVsbCkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignU2lnbmFsciBmYWlsZWQgdG8gaW5pdGlhbGl6ZS4gU2NyaXB0IFxcJ2pxdWVyeS5zaWduYWxSLmpzXFwnIGlzIG1pc3NpbmcuIFBsZWFzZSBtYWtlIHN1cmUgdG8gaW5jbHVkZSBcXCdqcXVlcnkuc2lnbmFsUi5qc1xcJyBzY3JpcHQuJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaHViQ29ubmVjdGlvbkZuO1xyXG59XHJcbkBOZ01vZHVsZSh7XHJcbiAgICBwcm92aWRlcnM6IFt7XHJcbiAgICAgICAgcHJvdmlkZTogU2lnbmFsUixcclxuICAgICAgICB1c2VWYWx1ZTogU2lnbmFsUlxyXG4gICAgfV1cclxufSlcclxuZXhwb3J0IGNsYXNzIFNpZ25hbFJNb2R1bGUge1xyXG4gICAgcHVibGljIHN0YXRpYyBmb3JSb290KGdldFNpZ25hbFJDb25maWd1cmF0aW9uOiAoKSA9PiB2b2lkKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbmdNb2R1bGU6IFNpZ25hbFJNb2R1bGUsXHJcbiAgICAgICAgICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHByb3ZpZGU6IFNJR05BTFJfQ09ORklHVVJBVElPTixcclxuICAgICAgICAgICAgICAgICAgICB1c2VGYWN0b3J5OiBnZXRTaWduYWxSQ29uZmlndXJhdGlvblxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBkZXBzOiBbU0lHTkFMUl9DT05GSUdVUkFUSU9OLCBOZ1pvbmVdLFxyXG4gICAgICAgICAgICAgICAgICAgIHByb3ZpZGU6IFNpZ25hbFIsXHJcbiAgICAgICAgICAgICAgICAgICAgdXNlRmFjdG9yeTogKGNyZWF0ZVNpZ25hbHIpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzdGF0aWMgZm9yQ2hpbGQoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdmb3JDaGlsZCBtZXRob2Qgbm90IGltcGxlbWVudGVkJyk7XHJcbiAgICB9XHJcbn1cclxuIl19