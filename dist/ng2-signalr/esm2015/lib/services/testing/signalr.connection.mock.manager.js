/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Subject } from 'rxjs';
import { SignalRConnectionMock } from './signalr.connection.mock';
export class SignalRConnectionMockManager {
    constructor() {
        this._errors$ = new Subject();
        this._status$ = new Subject();
        this._listeners = {};
        this._object = new SignalRConnectionMock(this._errors$, this._status$, this._listeners);
    }
    /**
     * @return {?}
     */
    get mock() {
        return this._object;
    }
    /**
     * @return {?}
     */
    get errors$() {
        return this._errors$;
    }
    /**
     * @return {?}
     */
    get status$() {
        return this._status$;
    }
    /**
     * @return {?}
     */
    get listeners() {
        return this._listeners;
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmFsci5jb25uZWN0aW9uLm1vY2subWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1zaWduYWxyLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3Rlc3Rpbmcvc2lnbmFsci5jb25uZWN0aW9uLm1vY2subWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLE9BQU8sRUFBaUIsTUFBTSxNQUFNLENBQUM7QUFDOUMsT0FBTyxFQUFFLHFCQUFxQixFQUF1QixNQUFNLDJCQUEyQixDQUFDO0FBR3ZGLE1BQU0sT0FBTyw0QkFBNEI7SUFPckM7UUFDSSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksT0FBTyxFQUFPLENBQUM7UUFDbkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBb0IsQ0FBQztRQUNoRCxJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUkscUJBQXFCLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUM1RixDQUFDOzs7O0lBRUQsSUFBSSxJQUFJO1FBQ0osT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7Ozs7SUFFRCxJQUFJLE9BQU87UUFDUCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQzs7OztJQUVELElBQUksT0FBTztRQUNQLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDOzs7O0lBRUQsSUFBSSxTQUFTO1FBQ1QsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQzNCLENBQUM7Q0FDSjs7Ozs7O0lBM0JHLGtEQUF3Qzs7Ozs7SUFDeEMsZ0RBQTRDOzs7OztJQUM1QyxnREFBK0I7Ozs7O0lBQy9CLCtDQUF1QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN1YmplY3QsIFJlcGxheVN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgU2lnbmFsUkNvbm5lY3Rpb25Nb2NrLCBJTGlzdGVuZXJDb2xsZWN0aW9uIH0gZnJvbSAnLi9zaWduYWxyLmNvbm5lY3Rpb24ubW9jayc7XHJcbmltcG9ydCB7IENvbm5lY3Rpb25TdGF0dXMgfSBmcm9tICcuLi9jb25uZWN0aW9uL2Nvbm5lY3Rpb24uc3RhdHVzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBTaWduYWxSQ29ubmVjdGlvbk1vY2tNYW5hZ2VyIHtcclxuXHJcbiAgICBwcml2YXRlIF9saXN0ZW5lcnM6IElMaXN0ZW5lckNvbGxlY3Rpb247XHJcbiAgICBwcml2YXRlIF9zdGF0dXMkOiBTdWJqZWN0PENvbm5lY3Rpb25TdGF0dXM+O1xyXG4gICAgcHJpdmF0ZSBfZXJyb3JzJDogU3ViamVjdDxhbnk+O1xyXG4gICAgcHJpdmF0ZSBfb2JqZWN0OiBTaWduYWxSQ29ubmVjdGlvbk1vY2s7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5fZXJyb3JzJCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcclxuICAgICAgICB0aGlzLl9zdGF0dXMkID0gbmV3IFN1YmplY3Q8Q29ubmVjdGlvblN0YXR1cz4oKTtcclxuICAgICAgICB0aGlzLl9saXN0ZW5lcnMgPSB7fTtcclxuICAgICAgICB0aGlzLl9vYmplY3QgPSBuZXcgU2lnbmFsUkNvbm5lY3Rpb25Nb2NrKHRoaXMuX2Vycm9ycyQsIHRoaXMuX3N0YXR1cyQsIHRoaXMuX2xpc3RlbmVycyk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG1vY2soKTogU2lnbmFsUkNvbm5lY3Rpb25Nb2NrIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fb2JqZWN0O1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBlcnJvcnMkKCk6IFN1YmplY3Q8YW55PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Vycm9ycyQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHN0YXR1cyQoKTogU3ViamVjdDxDb25uZWN0aW9uU3RhdHVzPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXR1cyQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGxpc3RlbmVycygpOiBJTGlzdGVuZXJDb2xsZWN0aW9uIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbGlzdGVuZXJzO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==