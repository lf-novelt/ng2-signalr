/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule, NgZone, InjectionToken } from '@angular/core';
import { SignalR } from '../services/signalr';
import { hubConnection } from 'signalr-no-jquery';
/** @type {?} */
const SIGNALR_CONFIGURATION = new InjectionToken('SIGNALR_CONFIGURATION');
/**
 * @param {?} configuration
 * @param {?} zone
 * @return {?}
 */
export function createSignalr(configuration, zone) {
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
export class SignalRModule {
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
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmFsci1tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItc2lnbmFsci8iLCJzb3VyY2VzIjpbImxpYi9tb2R1bGVzL3NpZ25hbHItbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUF1QixNQUFNLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RGLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUU5QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7O01BRTVDLHFCQUFxQixHQUFHLElBQUksY0FBYyxDQUF1Qix1QkFBdUIsQ0FBQzs7Ozs7O0FBRS9GLE1BQU0sVUFBVSxhQUFhLENBQUMsYUFBbUMsRUFBRSxJQUFZOztVQUVyRSxhQUFhLEdBQUcsZ0JBQWdCLEVBQUU7SUFFeEMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxhQUFhLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxDQUFDO0FBQzNELENBQUM7Ozs7QUFFRCxTQUFTLGdCQUFnQjs7VUFDZixlQUFlLEdBQUcsYUFBYTtJQUNyQyxJQUFJLGVBQWUsSUFBSSxJQUFJLEVBQUU7UUFDekIsTUFBTSxJQUFJLEtBQUssQ0FBQyxrSUFBa0ksQ0FBQyxDQUFDO0tBQ3ZKO0lBQ0QsT0FBTyxlQUFlLENBQUM7QUFDM0IsQ0FBQztXQUlpQixPQUFPO0FBR3pCLE1BQU0sT0FBTyxhQUFhOzs7OztJQUNmLE1BQU0sQ0FBQyxPQUFPLENBQUMsdUJBQW1DO1FBQ3JELE9BQU87WUFDSCxRQUFRLEVBQUUsYUFBYTtZQUN2QixTQUFTLEVBQUU7Z0JBQ1A7b0JBQ0ksT0FBTyxFQUFFLHFCQUFxQjtvQkFDOUIsVUFBVSxFQUFFLHVCQUF1QjtpQkFDdEM7Z0JBQ0Q7b0JBQ0ksSUFBSSxFQUFFLENBQUMscUJBQXFCLEVBQUUsTUFBTSxDQUFDO29CQUNyQyxPQUFPLEVBQUUsT0FBTztvQkFDaEIsVUFBVSxFQUFFLENBQUMsYUFBYSxDQUFDO2lCQUM5QjthQUNKO1NBQ0osQ0FBQztJQUNOLENBQUM7Ozs7SUFDTSxNQUFNLENBQUMsUUFBUTtRQUNsQixNQUFNLElBQUksS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7SUFDdkQsQ0FBQzs7O1lBekJKLFFBQVEsU0FBQztnQkFDTixTQUFTLEVBQUUsQ0FBQzt3QkFDUixPQUFPLEVBQUUsT0FBTzt3QkFDaEIsUUFBUSxJQUFTO3FCQUNwQixDQUFDO2FBQ0wiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdab25lLCBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTaWduYWxSIH0gZnJvbSAnLi4vc2VydmljZXMvc2lnbmFscic7XHJcbmltcG9ydCB7IFNpZ25hbFJDb25maWd1cmF0aW9uIH0gZnJvbSAnLi4vc2VydmljZXMvc2lnbmFsci5jb25maWd1cmF0aW9uJztcclxuaW1wb3J0IHsgaHViQ29ubmVjdGlvbiB9IGZyb20gJ3NpZ25hbHItbm8tanF1ZXJ5JztcclxuXHJcbmNvbnN0IFNJR05BTFJfQ09ORklHVVJBVElPTiA9IG5ldyBJbmplY3Rpb25Ub2tlbjxTaWduYWxSQ29uZmlndXJhdGlvbj4oJ1NJR05BTFJfQ09ORklHVVJBVElPTicpO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNpZ25hbHIoY29uZmlndXJhdGlvbjogU2lnbmFsUkNvbmZpZ3VyYXRpb24sIHpvbmU6IE5nWm9uZSkge1xyXG5cclxuICAgIGNvbnN0IGpDb25uZWN0aW9uRm4gPSBnZXRKQ29ubmVjdGlvbkZuKCk7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBTaWduYWxSKGNvbmZpZ3VyYXRpb24sIHpvbmUsIGpDb25uZWN0aW9uRm4pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRKQ29ubmVjdGlvbkZuKCk6IGFueSB7XHJcbiAgICBjb25zdCBodWJDb25uZWN0aW9uRm4gPSBodWJDb25uZWN0aW9uO1xyXG4gICAgaWYgKGh1YkNvbm5lY3Rpb25GbiA9PSBudWxsKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTaWduYWxyIGZhaWxlZCB0byBpbml0aWFsaXplLiBTY3JpcHQgXFwnanF1ZXJ5LnNpZ25hbFIuanNcXCcgaXMgbWlzc2luZy4gUGxlYXNlIG1ha2Ugc3VyZSB0byBpbmNsdWRlIFxcJ2pxdWVyeS5zaWduYWxSLmpzXFwnIHNjcmlwdC4nKTtcclxuICAgIH1cclxuICAgIHJldHVybiBodWJDb25uZWN0aW9uRm47XHJcbn1cclxuQE5nTW9kdWxlKHtcclxuICAgIHByb3ZpZGVyczogW3tcclxuICAgICAgICBwcm92aWRlOiBTaWduYWxSLFxyXG4gICAgICAgIHVzZVZhbHVlOiBTaWduYWxSXHJcbiAgICB9XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU2lnbmFsUk1vZHVsZSB7XHJcbiAgICBwdWJsaWMgc3RhdGljIGZvclJvb3QoZ2V0U2lnbmFsUkNvbmZpZ3VyYXRpb246ICgpID0+IHZvaWQpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBuZ01vZHVsZTogU2lnbmFsUk1vZHVsZSxcclxuICAgICAgICAgICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvdmlkZTogU0lHTkFMUl9DT05GSUdVUkFUSU9OLFxyXG4gICAgICAgICAgICAgICAgICAgIHVzZUZhY3Rvcnk6IGdldFNpZ25hbFJDb25maWd1cmF0aW9uXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlcHM6IFtTSUdOQUxSX0NPTkZJR1VSQVRJT04sIE5nWm9uZV0sXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvdmlkZTogU2lnbmFsUixcclxuICAgICAgICAgICAgICAgICAgICB1c2VGYWN0b3J5OiAoY3JlYXRlU2lnbmFscilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgcHVibGljIHN0YXRpYyBmb3JDaGlsZCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ZvckNoaWxkIG1ldGhvZCBub3QgaW1wbGVtZW50ZWQnKTtcclxuICAgIH1cclxufVxyXG4iXX0=