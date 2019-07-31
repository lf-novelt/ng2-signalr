/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule, NgZone, InjectionToken } from '@angular/core';
import { SignalR } from '../services/signalr';
import { hubConnection } from '../signalr-no-jquery/signalR';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmFsci1tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItc2lnbmFsci8iLCJzb3VyY2VzIjpbImxpYi9tb2R1bGVzL3NpZ25hbHItbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUF1QixNQUFNLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RGLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUU5QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sOEJBQThCLENBQUM7O01BRXZELHFCQUFxQixHQUFHLElBQUksY0FBYyxDQUF1Qix1QkFBdUIsQ0FBQzs7Ozs7O0FBRS9GLE1BQU0sVUFBVSxhQUFhLENBQUMsYUFBbUMsRUFBRSxJQUFZOztVQUVyRSxhQUFhLEdBQUcsZ0JBQWdCLEVBQUU7SUFFeEMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxhQUFhLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxDQUFDO0FBQzNELENBQUM7Ozs7QUFFRCxTQUFTLGdCQUFnQjs7VUFDZixlQUFlLEdBQUcsYUFBYTtJQUNyQyxJQUFJLGVBQWUsSUFBSSxJQUFJLEVBQUU7UUFDekIsTUFBTSxJQUFJLEtBQUssQ0FBQyxrSUFBa0ksQ0FBQyxDQUFDO0tBQ3ZKO0lBQ0QsT0FBTyxlQUFlLENBQUM7QUFDM0IsQ0FBQztXQUlpQixPQUFPO0FBR3pCLE1BQU0sT0FBTyxhQUFhOzs7OztJQUNmLE1BQU0sQ0FBQyxPQUFPLENBQUMsdUJBQW1DO1FBQ3JELE9BQU87WUFDSCxRQUFRLEVBQUUsYUFBYTtZQUN2QixTQUFTLEVBQUU7Z0JBQ1A7b0JBQ0ksT0FBTyxFQUFFLHFCQUFxQjtvQkFDOUIsVUFBVSxFQUFFLHVCQUF1QjtpQkFDdEM7Z0JBQ0Q7b0JBQ0ksSUFBSSxFQUFFLENBQUMscUJBQXFCLEVBQUUsTUFBTSxDQUFDO29CQUNyQyxPQUFPLEVBQUUsT0FBTztvQkFDaEIsVUFBVSxFQUFFLENBQUMsYUFBYSxDQUFDO2lCQUM5QjthQUNKO1NBQ0osQ0FBQztJQUNOLENBQUM7Ozs7SUFDTSxNQUFNLENBQUMsUUFBUTtRQUNsQixNQUFNLElBQUksS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7SUFDdkQsQ0FBQzs7O1lBekJKLFFBQVEsU0FBQztnQkFDTixTQUFTLEVBQUUsQ0FBQzt3QkFDUixPQUFPLEVBQUUsT0FBTzt3QkFDaEIsUUFBUSxJQUFTO3FCQUNwQixDQUFDO2FBQ0wiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdab25lLCBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTaWduYWxSIH0gZnJvbSAnLi4vc2VydmljZXMvc2lnbmFscic7XHJcbmltcG9ydCB7IFNpZ25hbFJDb25maWd1cmF0aW9uIH0gZnJvbSAnLi4vc2VydmljZXMvc2lnbmFsci5jb25maWd1cmF0aW9uJztcclxuaW1wb3J0IHsgaHViQ29ubmVjdGlvbiB9IGZyb20gJy4uL3NpZ25hbHItbm8tanF1ZXJ5L3NpZ25hbFInO1xyXG5cclxuY29uc3QgU0lHTkFMUl9DT05GSUdVUkFUSU9OID0gbmV3IEluamVjdGlvblRva2VuPFNpZ25hbFJDb25maWd1cmF0aW9uPignU0lHTkFMUl9DT05GSUdVUkFUSU9OJyk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2lnbmFscihjb25maWd1cmF0aW9uOiBTaWduYWxSQ29uZmlndXJhdGlvbiwgem9uZTogTmdab25lKSB7XHJcblxyXG4gICAgY29uc3QgakNvbm5lY3Rpb25GbiA9IGdldEpDb25uZWN0aW9uRm4oKTtcclxuXHJcbiAgICByZXR1cm4gbmV3IFNpZ25hbFIoY29uZmlndXJhdGlvbiwgem9uZSwgakNvbm5lY3Rpb25Gbik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldEpDb25uZWN0aW9uRm4oKTogYW55IHtcclxuICAgIGNvbnN0IGh1YkNvbm5lY3Rpb25GbiA9IGh1YkNvbm5lY3Rpb247XHJcbiAgICBpZiAoaHViQ29ubmVjdGlvbkZuID09IG51bGwpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NpZ25hbHIgZmFpbGVkIHRvIGluaXRpYWxpemUuIFNjcmlwdCBcXCdqcXVlcnkuc2lnbmFsUi5qc1xcJyBpcyBtaXNzaW5nLiBQbGVhc2UgbWFrZSBzdXJlIHRvIGluY2x1ZGUgXFwnanF1ZXJ5LnNpZ25hbFIuanNcXCcgc2NyaXB0LicpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGh1YkNvbm5lY3Rpb25GbjtcclxufVxyXG5ATmdNb2R1bGUoe1xyXG4gICAgcHJvdmlkZXJzOiBbe1xyXG4gICAgICAgIHByb3ZpZGU6IFNpZ25hbFIsXHJcbiAgICAgICAgdXNlVmFsdWU6IFNpZ25hbFJcclxuICAgIH1dXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTaWduYWxSTW9kdWxlIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgZm9yUm9vdChnZXRTaWduYWxSQ29uZmlndXJhdGlvbjogKCkgPT4gdm9pZCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG5nTW9kdWxlOiBTaWduYWxSTW9kdWxlLFxyXG4gICAgICAgICAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBwcm92aWRlOiBTSUdOQUxSX0NPTkZJR1VSQVRJT04sXHJcbiAgICAgICAgICAgICAgICAgICAgdXNlRmFjdG9yeTogZ2V0U2lnbmFsUkNvbmZpZ3VyYXRpb25cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVwczogW1NJR05BTFJfQ09ORklHVVJBVElPTiwgTmdab25lXSxcclxuICAgICAgICAgICAgICAgICAgICBwcm92aWRlOiBTaWduYWxSLFxyXG4gICAgICAgICAgICAgICAgICAgIHVzZUZhY3Rvcnk6IChjcmVhdGVTaWduYWxyKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc3RhdGljIGZvckNoaWxkKCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignZm9yQ2hpbGQgbWV0aG9kIG5vdCBpbXBsZW1lbnRlZCcpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==