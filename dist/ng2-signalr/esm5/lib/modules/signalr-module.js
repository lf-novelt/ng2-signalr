/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule, NgZone, InjectionToken } from '@angular/core';
import { SignalR } from '../services/signalr';
import { hubConnection } from 'signalr-no-jquery';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmFsci1tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItc2lnbmFsci8iLCJzb3VyY2VzIjpbImxpYi9tb2R1bGVzL3NpZ25hbHItbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUF1QixNQUFNLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RGLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUU5QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7O0lBRTVDLHFCQUFxQixHQUFHLElBQUksY0FBYyxDQUF1Qix1QkFBdUIsQ0FBQzs7Ozs7O0FBRS9GLE1BQU0sVUFBVSxhQUFhLENBQUMsYUFBbUMsRUFBRSxJQUFZOztRQUVyRSxhQUFhLEdBQUcsZ0JBQWdCLEVBQUU7SUFFeEMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxhQUFhLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxDQUFDO0FBQzNELENBQUM7Ozs7QUFFRCxTQUFTLGdCQUFnQjs7UUFDZixlQUFlLEdBQUcsYUFBYTtJQUNyQyxJQUFJLGVBQWUsSUFBSSxJQUFJLEVBQUU7UUFDekIsTUFBTSxJQUFJLEtBQUssQ0FBQyxrSUFBa0ksQ0FBQyxDQUFDO0tBQ3ZKO0lBQ0QsT0FBTyxlQUFlLENBQUM7QUFDM0IsQ0FBQztTQUlpQixPQUFPO0FBSHpCO0lBQUE7SUEwQkEsQ0FBQzs7Ozs7SUFuQmlCLHFCQUFPOzs7O0lBQXJCLFVBQXNCLHVCQUFtQztRQUNyRCxPQUFPO1lBQ0gsUUFBUSxFQUFFLGFBQWE7WUFDdkIsU0FBUyxFQUFFO2dCQUNQO29CQUNJLE9BQU8sRUFBRSxxQkFBcUI7b0JBQzlCLFVBQVUsRUFBRSx1QkFBdUI7aUJBQ3RDO2dCQUNEO29CQUNJLElBQUksRUFBRSxDQUFDLHFCQUFxQixFQUFFLE1BQU0sQ0FBQztvQkFDckMsT0FBTyxFQUFFLE9BQU87b0JBQ2hCLFVBQVUsRUFBRSxDQUFDLGFBQWEsQ0FBQztpQkFDOUI7YUFDSjtTQUNKLENBQUM7SUFDTixDQUFDOzs7O0lBQ2Esc0JBQVE7OztJQUF0QjtRQUNJLE1BQU0sSUFBSSxLQUFLLENBQUMsaUNBQWlDLENBQUMsQ0FBQztJQUN2RCxDQUFDOztnQkF6QkosUUFBUSxTQUFDO29CQUNOLFNBQVMsRUFBRSxDQUFDOzRCQUNSLE9BQU8sRUFBRSxPQUFPOzRCQUNoQixRQUFRLElBQVM7eUJBQ3BCLENBQUM7aUJBQ0w7O0lBcUJELG9CQUFDO0NBQUEsQUExQkQsSUEwQkM7U0FwQlksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ1pvbmUsIEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFNpZ25hbFIgfSBmcm9tICcuLi9zZXJ2aWNlcy9zaWduYWxyJztcclxuaW1wb3J0IHsgU2lnbmFsUkNvbmZpZ3VyYXRpb24gfSBmcm9tICcuLi9zZXJ2aWNlcy9zaWduYWxyLmNvbmZpZ3VyYXRpb24nO1xyXG5pbXBvcnQgeyBodWJDb25uZWN0aW9uIH0gZnJvbSAnc2lnbmFsci1uby1qcXVlcnknO1xyXG5cclxuY29uc3QgU0lHTkFMUl9DT05GSUdVUkFUSU9OID0gbmV3IEluamVjdGlvblRva2VuPFNpZ25hbFJDb25maWd1cmF0aW9uPignU0lHTkFMUl9DT05GSUdVUkFUSU9OJyk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2lnbmFscihjb25maWd1cmF0aW9uOiBTaWduYWxSQ29uZmlndXJhdGlvbiwgem9uZTogTmdab25lKSB7XHJcblxyXG4gICAgY29uc3QgakNvbm5lY3Rpb25GbiA9IGdldEpDb25uZWN0aW9uRm4oKTtcclxuXHJcbiAgICByZXR1cm4gbmV3IFNpZ25hbFIoY29uZmlndXJhdGlvbiwgem9uZSwgakNvbm5lY3Rpb25Gbik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldEpDb25uZWN0aW9uRm4oKTogYW55IHtcclxuICAgIGNvbnN0IGh1YkNvbm5lY3Rpb25GbiA9IGh1YkNvbm5lY3Rpb247XHJcbiAgICBpZiAoaHViQ29ubmVjdGlvbkZuID09IG51bGwpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NpZ25hbHIgZmFpbGVkIHRvIGluaXRpYWxpemUuIFNjcmlwdCBcXCdqcXVlcnkuc2lnbmFsUi5qc1xcJyBpcyBtaXNzaW5nLiBQbGVhc2UgbWFrZSBzdXJlIHRvIGluY2x1ZGUgXFwnanF1ZXJ5LnNpZ25hbFIuanNcXCcgc2NyaXB0LicpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGh1YkNvbm5lY3Rpb25GbjtcclxufVxyXG5ATmdNb2R1bGUoe1xyXG4gICAgcHJvdmlkZXJzOiBbe1xyXG4gICAgICAgIHByb3ZpZGU6IFNpZ25hbFIsXHJcbiAgICAgICAgdXNlVmFsdWU6IFNpZ25hbFJcclxuICAgIH1dXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTaWduYWxSTW9kdWxlIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgZm9yUm9vdChnZXRTaWduYWxSQ29uZmlndXJhdGlvbjogKCkgPT4gdm9pZCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG5nTW9kdWxlOiBTaWduYWxSTW9kdWxlLFxyXG4gICAgICAgICAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBwcm92aWRlOiBTSUdOQUxSX0NPTkZJR1VSQVRJT04sXHJcbiAgICAgICAgICAgICAgICAgICAgdXNlRmFjdG9yeTogZ2V0U2lnbmFsUkNvbmZpZ3VyYXRpb25cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVwczogW1NJR05BTFJfQ09ORklHVVJBVElPTiwgTmdab25lXSxcclxuICAgICAgICAgICAgICAgICAgICBwcm92aWRlOiBTaWduYWxSLFxyXG4gICAgICAgICAgICAgICAgICAgIHVzZUZhY3Rvcnk6IChjcmVhdGVTaWduYWxyKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc3RhdGljIGZvckNoaWxkKCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignZm9yQ2hpbGQgbWV0aG9kIG5vdCBpbXBsZW1lbnRlZCcpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==