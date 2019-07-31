/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { BroadcastEventListener } from '../eventing/broadcast.event.listener';
/**
 * @record
 */
export function IListenerCollection() { }
var SignalRConnectionMock = /** @class */ (function () {
    function SignalRConnectionMock(_mockErrors$, _mockStatus$, _listeners) {
        this._mockErrors$ = _mockErrors$;
        this._mockStatus$ = _mockStatus$;
        this._listeners = _listeners;
    }
    Object.defineProperty(SignalRConnectionMock.prototype, "errors", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mockErrors$;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SignalRConnectionMock.prototype, "status", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mockStatus$.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SignalRConnectionMock.prototype, "id", {
        get: /**
         * @return {?}
         */
        function () {
            return 'xxxxxxxx-xxxx-xxxx-xxxxxxxxx';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    SignalRConnectionMock.prototype.stop = /**
     * @return {?}
     */
    function () {
        //
    };
    /**
     * @return {?}
     */
    SignalRConnectionMock.prototype.start = /**
     * @return {?}
     */
    function () {
        return Promise.resolve(null); // TODO: implement
    };
    /**
     * @param {?} method
     * @param {...?} parameters
     * @return {?}
     */
    SignalRConnectionMock.prototype.invoke = /**
     * @param {?} method
     * @param {...?} parameters
     * @return {?}
     */
    function (method) {
        var parameters = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            parameters[_i - 1] = arguments[_i];
        }
        return Promise.resolve(null);
    };
    /**
     * @template T
     * @param {?} listener
     * @return {?}
     */
    SignalRConnectionMock.prototype.listen = /**
     * @template T
     * @param {?} listener
     * @return {?}
     */
    function (listener) {
        this._listeners[listener.event] = listener;
    };
    /**
     * @template T
     * @param {?} event
     * @return {?}
     */
    SignalRConnectionMock.prototype.listenFor = /**
     * @template T
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var listener = new BroadcastEventListener(event);
        this.listen(listener);
        return listener;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SignalRConnectionMock.prototype.listenForRaw = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var listener = new BroadcastEventListener(event);
        this._listeners[listener.event] = listener;
        return listener;
    };
    return SignalRConnectionMock;
}());
export { SignalRConnectionMock };
if (false) {
    /**
     * @type {?}
     * @private
     */
    SignalRConnectionMock.prototype._mockErrors$;
    /**
     * @type {?}
     * @private
     */
    SignalRConnectionMock.prototype._mockStatus$;
    /**
     * @type {?}
     * @private
     */
    SignalRConnectionMock.prototype._listeners;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmFsci5jb25uZWN0aW9uLm1vY2suanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItc2lnbmFsci8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy90ZXN0aW5nL3NpZ25hbHIuY29ubmVjdGlvbi5tb2NrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQzs7OztBQUk5RSx5Q0FFQztBQUVEO0lBQ0ksK0JBQ1ksWUFBMEIsRUFDMUIsWUFBdUMsRUFDdkMsVUFBK0I7UUFGL0IsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsaUJBQVksR0FBWixZQUFZLENBQTJCO1FBQ3ZDLGVBQVUsR0FBVixVQUFVLENBQXFCO0lBQzNDLENBQUM7SUFFRCxzQkFBSSx5Q0FBTTs7OztRQUFWO1lBQ0ksT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQzdCLENBQUM7OztPQUFBO0lBRUQsc0JBQUkseUNBQU07Ozs7UUFBVjtZQUNJLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUM1QyxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLHFDQUFFOzs7O1FBQU47WUFDSSxPQUFPLDhCQUE4QixDQUFDO1FBQzFDLENBQUM7OztPQUFBOzs7O0lBRU0sb0NBQUk7OztJQUFYO1FBQ0ksRUFBRTtJQUNOLENBQUM7Ozs7SUFFTSxxQ0FBSzs7O0lBQVo7UUFDSSxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxrQkFBa0I7SUFDcEQsQ0FBQzs7Ozs7O0lBRU0sc0NBQU07Ozs7O0lBQWIsVUFBYyxNQUFjO1FBQUUsb0JBQW9CO2FBQXBCLFVBQW9CLEVBQXBCLHFCQUFvQixFQUFwQixJQUFvQjtZQUFwQixtQ0FBb0I7O1FBQzlDLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqQyxDQUFDOzs7Ozs7SUFFTSxzQ0FBTTs7Ozs7SUFBYixVQUFpQixRQUFtQztRQUNoRCxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxRQUFRLENBQUM7SUFDL0MsQ0FBQzs7Ozs7O0lBRU0seUNBQVM7Ozs7O0lBQWhCLFVBQW9CLEtBQWE7O1lBQ3ZCLFFBQVEsR0FBRyxJQUFJLHNCQUFzQixDQUFJLEtBQUssQ0FBQztRQUNyRCxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RCLE9BQU8sUUFBUSxDQUFDO0lBQ3BCLENBQUM7Ozs7O0lBRU0sNENBQVk7Ozs7SUFBbkIsVUFBb0IsS0FBYTs7WUFDdkIsUUFBUSxHQUFHLElBQUksc0JBQXNCLENBQVEsS0FBSyxDQUFDO1FBQ3pELElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLFFBQVEsQ0FBQztRQUMzQyxPQUFPLFFBQVEsQ0FBQztJQUNwQixDQUFDO0lBQ0wsNEJBQUM7QUFBRCxDQUFDLEFBOUNELElBOENDOzs7Ozs7O0lBNUNPLDZDQUFrQzs7Ozs7SUFDbEMsNkNBQStDOzs7OztJQUMvQywyQ0FBdUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlLCBBc3luY1N1YmplY3QsIFJlcGxheVN1YmplY3QsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgU2lnbmFsUkNvbmZpZ3VyYXRpb24gfSBmcm9tICcuLi9zaWduYWxyLmNvbmZpZ3VyYXRpb24nO1xyXG5pbXBvcnQgeyBCcm9hZGNhc3RFdmVudExpc3RlbmVyIH0gZnJvbSAnLi4vZXZlbnRpbmcvYnJvYWRjYXN0LmV2ZW50Lmxpc3RlbmVyJztcclxuaW1wb3J0IHsgQ29ubmVjdGlvblN0YXR1cyB9IGZyb20gJy4uL2Nvbm5lY3Rpb24vY29ubmVjdGlvbi5zdGF0dXMnO1xyXG5pbXBvcnQgeyBJU2lnbmFsUkNvbm5lY3Rpb24gfSBmcm9tICcuLi9jb25uZWN0aW9uL2kuc2lnbmFsci5jb25uZWN0aW9uJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUxpc3RlbmVyQ29sbGVjdGlvbiB7XHJcbiAgICBbbmFtZTogc3RyaW5nXTogQnJvYWRjYXN0RXZlbnRMaXN0ZW5lcjxhbnk+O1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU2lnbmFsUkNvbm5lY3Rpb25Nb2NrIGltcGxlbWVudHMgSVNpZ25hbFJDb25uZWN0aW9uIHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgX21vY2tFcnJvcnMkOiBTdWJqZWN0PGFueT4sXHJcbiAgICAgICAgcHJpdmF0ZSBfbW9ja1N0YXR1cyQ6IFN1YmplY3Q8Q29ubmVjdGlvblN0YXR1cz4sXHJcbiAgICAgICAgcHJpdmF0ZSBfbGlzdGVuZXJzOiBJTGlzdGVuZXJDb2xsZWN0aW9uKSB7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGVycm9ycygpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tb2NrRXJyb3JzJDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgc3RhdHVzKCk6IE9ic2VydmFibGU8Q29ubmVjdGlvblN0YXR1cz4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tb2NrU3RhdHVzJC5hc09ic2VydmFibGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaWQoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gJ3h4eHh4eHh4LXh4eHgteHh4eC14eHh4eHh4eHgnO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdG9wKCk6IHZvaWQge1xyXG4gICAgICAgIC8vXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXJ0KCk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTsgLy8gVE9ETzogaW1wbGVtZW50XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGludm9rZShtZXRob2Q6IHN0cmluZywgLi4ucGFyYW1ldGVyczogYW55W10pOiBQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxpc3RlbjxUPihsaXN0ZW5lcjogQnJvYWRjYXN0RXZlbnRMaXN0ZW5lcjxUPik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2xpc3RlbmVyc1tsaXN0ZW5lci5ldmVudF0gPSBsaXN0ZW5lcjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbGlzdGVuRm9yPFQ+KGV2ZW50OiBzdHJpbmcpOiBCcm9hZGNhc3RFdmVudExpc3RlbmVyPFQ+IHtcclxuICAgICAgICBjb25zdCBsaXN0ZW5lciA9IG5ldyBCcm9hZGNhc3RFdmVudExpc3RlbmVyPFQ+KGV2ZW50KTtcclxuICAgICAgICB0aGlzLmxpc3RlbihsaXN0ZW5lcik7XHJcbiAgICAgICAgcmV0dXJuIGxpc3RlbmVyO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsaXN0ZW5Gb3JSYXcoZXZlbnQ6IHN0cmluZyk6IEJyb2FkY2FzdEV2ZW50TGlzdGVuZXI8YW55W10+IHtcclxuICAgICAgICBjb25zdCBsaXN0ZW5lciA9IG5ldyBCcm9hZGNhc3RFdmVudExpc3RlbmVyPGFueVtdPihldmVudCk7XHJcbiAgICAgICAgdGhpcy5fbGlzdGVuZXJzW2xpc3RlbmVyLmV2ZW50XSA9IGxpc3RlbmVyO1xyXG4gICAgICAgIHJldHVybiBsaXN0ZW5lcjtcclxuICAgIH1cclxufVxyXG4iXX0=