/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Subject } from 'rxjs';
import { SignalRConnectionMock } from './signalr.connection.mock';
var SignalRConnectionMockManager = /** @class */ (function () {
    function SignalRConnectionMockManager() {
        this._errors$ = new Subject();
        this._status$ = new Subject();
        this._listeners = {};
        this._object = new SignalRConnectionMock(this._errors$, this._status$, this._listeners);
    }
    Object.defineProperty(SignalRConnectionMockManager.prototype, "mock", {
        get: /**
         * @return {?}
         */
        function () {
            return this._object;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SignalRConnectionMockManager.prototype, "errors$", {
        get: /**
         * @return {?}
         */
        function () {
            return this._errors$;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SignalRConnectionMockManager.prototype, "status$", {
        get: /**
         * @return {?}
         */
        function () {
            return this._status$;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SignalRConnectionMockManager.prototype, "listeners", {
        get: /**
         * @return {?}
         */
        function () {
            return this._listeners;
        },
        enumerable: true,
        configurable: true
    });
    return SignalRConnectionMockManager;
}());
export { SignalRConnectionMockManager };
if (false) {
    /**
     * @type {?}
     * @private
     */
    SignalRConnectionMockManager.prototype._listeners;
    /**
     * @type {?}
     * @private
     */
    SignalRConnectionMockManager.prototype._status$;
    /**
     * @type {?}
     * @private
     */
    SignalRConnectionMockManager.prototype._errors$;
    /**
     * @type {?}
     * @private
     */
    SignalRConnectionMockManager.prototype._object;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmFsci5jb25uZWN0aW9uLm1vY2subWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1zaWduYWxyLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3Rlc3Rpbmcvc2lnbmFsci5jb25uZWN0aW9uLm1vY2subWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLE9BQU8sRUFBaUIsTUFBTSxNQUFNLENBQUM7QUFDOUMsT0FBTyxFQUFFLHFCQUFxQixFQUF1QixNQUFNLDJCQUEyQixDQUFDO0FBR3ZGO0lBT0k7UUFDSSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksT0FBTyxFQUFPLENBQUM7UUFDbkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBb0IsQ0FBQztRQUNoRCxJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUkscUJBQXFCLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUM1RixDQUFDO0lBRUQsc0JBQUksOENBQUk7Ozs7UUFBUjtZQUNJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN4QixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLGlEQUFPOzs7O1FBQVg7WUFDSSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDekIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSxpREFBTzs7OztRQUFYO1lBQ0ksT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3pCLENBQUM7OztPQUFBO0lBRUQsc0JBQUksbURBQVM7Ozs7UUFBYjtZQUNJLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUMzQixDQUFDOzs7T0FBQTtJQUNMLG1DQUFDO0FBQUQsQ0FBQyxBQTdCRCxJQTZCQzs7Ozs7OztJQTNCRyxrREFBd0M7Ozs7O0lBQ3hDLGdEQUE0Qzs7Ozs7SUFDNUMsZ0RBQStCOzs7OztJQUMvQiwrQ0FBdUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdWJqZWN0LCBSZXBsYXlTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IFNpZ25hbFJDb25uZWN0aW9uTW9jaywgSUxpc3RlbmVyQ29sbGVjdGlvbiB9IGZyb20gJy4vc2lnbmFsci5jb25uZWN0aW9uLm1vY2snO1xyXG5pbXBvcnQgeyBDb25uZWN0aW9uU3RhdHVzIH0gZnJvbSAnLi4vY29ubmVjdGlvbi9jb25uZWN0aW9uLnN0YXR1cyc7XHJcblxyXG5leHBvcnQgY2xhc3MgU2lnbmFsUkNvbm5lY3Rpb25Nb2NrTWFuYWdlciB7XHJcblxyXG4gICAgcHJpdmF0ZSBfbGlzdGVuZXJzOiBJTGlzdGVuZXJDb2xsZWN0aW9uO1xyXG4gICAgcHJpdmF0ZSBfc3RhdHVzJDogU3ViamVjdDxDb25uZWN0aW9uU3RhdHVzPjtcclxuICAgIHByaXZhdGUgX2Vycm9ycyQ6IFN1YmplY3Q8YW55PjtcclxuICAgIHByaXZhdGUgX29iamVjdDogU2lnbmFsUkNvbm5lY3Rpb25Nb2NrO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuX2Vycm9ycyQgPSBuZXcgU3ViamVjdDxhbnk+KCk7XHJcbiAgICAgICAgdGhpcy5fc3RhdHVzJCA9IG5ldyBTdWJqZWN0PENvbm5lY3Rpb25TdGF0dXM+KCk7XHJcbiAgICAgICAgdGhpcy5fbGlzdGVuZXJzID0ge307XHJcbiAgICAgICAgdGhpcy5fb2JqZWN0ID0gbmV3IFNpZ25hbFJDb25uZWN0aW9uTW9jayh0aGlzLl9lcnJvcnMkLCB0aGlzLl9zdGF0dXMkLCB0aGlzLl9saXN0ZW5lcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBtb2NrKCk6IFNpZ25hbFJDb25uZWN0aW9uTW9jayB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX29iamVjdDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgZXJyb3JzJCgpOiBTdWJqZWN0PGFueT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9lcnJvcnMkO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBzdGF0dXMkKCk6IFN1YmplY3Q8Q29ubmVjdGlvblN0YXR1cz4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zdGF0dXMkO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBsaXN0ZW5lcnMoKTogSUxpc3RlbmVyQ29sbGVjdGlvbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RlbmVycztcclxuICAgIH1cclxufVxyXG4iXX0=