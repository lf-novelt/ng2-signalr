/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ConnectionTransports } from './connection/connection.transports';
var SignalRConfiguration = /** @class */ (function () {
    function SignalRConfiguration() {
        this.hubName = null;
        this.logging = false;
        this.qs = null;
        this.url = null;
        this.jsonp = false;
        this.withCredentials = false;
        this.transport = ConnectionTransports.auto;
        this.executeEventsInZone = true;
        this.executeErrorsInZone = false;
        this.executeStatusChangeInZone = true;
        this.pingInterval = 300000;
    }
    return SignalRConfiguration;
}());
export { SignalRConfiguration };
if (false) {
    /**
     * connection url to the SignalR service
     * @type {?}
     */
    SignalRConfiguration.prototype.url;
    /**
     * Allows you to specify query string parameters object when the client connects
     * @type {?}
     */
    SignalRConfiguration.prototype.qs;
    /**
     * name of the SignalR service hub to connect to
     * @type {?}
     */
    SignalRConfiguration.prototype.hubName;
    /**
     * disable/enables client side logging. Defaults to false
     * @type {?}
     */
    SignalRConfiguration.prototype.logging;
    /**
     * Allows jsonp. This flag can be used to suppport CORS on older browsers
     * @type {?}
     */
    SignalRConfiguration.prototype.jsonp;
    /**
     * Allows withCredentials. This flag can be used to suppport CORS
     * @type {?}
     */
    SignalRConfiguration.prototype.withCredentials;
    /**
     * Allows pingInterval
     * @type {?}
     */
    SignalRConfiguration.prototype.pingInterval;
    /**
     * Allows you to specify transport. You can specify a fallback order if you wan't to try specific transports in order. By default selects best avaliable transport.
     * @type {?}
     */
    SignalRConfiguration.prototype.transport;
    /**
     * Allows you to run the event callback outside ngZone
     * @type {?}
     */
    SignalRConfiguration.prototype.executeEventsInZone;
    /**
     * Allows you to run the errors callback outside ngZone
     * @type {?}
     */
    SignalRConfiguration.prototype.executeErrorsInZone;
    /**
     * Allows you to run the status change in callback outside ngZone
     * @type {?}
     */
    SignalRConfiguration.prototype.executeStatusChangeInZone;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmFsci5jb25maWd1cmF0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLXNpZ25hbHIvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvc2lnbmFsci5jb25maWd1cmF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUkxRTtJQW1DSTtRQUNHLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxFQUFFLEdBQUksSUFBSSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO1FBQzdCLElBQUksQ0FBQyxTQUFTLEdBQUcsb0JBQW9CLENBQUMsSUFBSSxDQUFDO1FBQzNDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUM7UUFDaEMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEtBQUssQ0FBQztRQUNqQyxJQUFJLENBQUMseUJBQXlCLEdBQUcsSUFBSSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDO0lBQzlCLENBQUM7SUFDTCwyQkFBQztBQUFELENBQUMsQUFoREQsSUFnREM7Ozs7Ozs7SUE3Q0csbUNBQW1COzs7OztJQUduQixrQ0FBZ0I7Ozs7O0lBR2hCLHVDQUF1Qjs7Ozs7SUFHdkIsdUNBQXdCOzs7OztJQUd4QixxQ0FBc0I7Ozs7O0lBR3RCLCtDQUFnQzs7Ozs7SUFHaEMsNENBQTZCOzs7OztJQUc3Qix5Q0FBOEQ7Ozs7O0lBRzlELG1EQUFxQzs7Ozs7SUFHckMsbURBQXFDOzs7OztJQUdyQyx5REFBMkMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHsgQ29ubmVjdGlvblRyYW5zcG9ydHMgfSBmcm9tICcuL2Nvbm5lY3Rpb24vY29ubmVjdGlvbi50cmFuc3BvcnRzJztcclxuaW1wb3J0IHsgQ29ubmVjdGlvblRyYW5zcG9ydCB9IGZyb20gJy4vY29ubmVjdGlvbi9jb25uZWN0aW9uLnRyYW5zcG9ydCc7XHJcbmltcG9ydCB7IElDb25uZWN0aW9uT3B0aW9ucyB9IGZyb20gJy4vY29ubmVjdGlvbi9jb25uZWN0aW9uLm9wdGlvbnMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNpZ25hbFJDb25maWd1cmF0aW9uIGltcGxlbWVudHMgSUNvbm5lY3Rpb25PcHRpb25zIHtcclxuXHJcbiAgICAvKiogY29ubmVjdGlvbiB1cmwgdG8gdGhlIFNpZ25hbFIgc2VydmljZSAqL1xyXG4gICAgcHVibGljIHVybDogc3RyaW5nO1xyXG5cclxuICAgIC8qKiBBbGxvd3MgeW91IHRvIHNwZWNpZnkgcXVlcnkgc3RyaW5nIHBhcmFtZXRlcnMgb2JqZWN0IHdoZW4gdGhlIGNsaWVudCBjb25uZWN0cyAqL1xyXG4gICAgcHVibGljIHFzPzogYW55O1xyXG5cclxuICAgIC8qKiBuYW1lIG9mIHRoZSBTaWduYWxSIHNlcnZpY2UgaHViIHRvIGNvbm5lY3QgdG8gKi9cclxuICAgIHB1YmxpYyBodWJOYW1lOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqIGRpc2FibGUvZW5hYmxlcyBjbGllbnQgc2lkZSBsb2dnaW5nLiBEZWZhdWx0cyB0byBmYWxzZSAqL1xyXG4gICAgcHVibGljIGxvZ2dpbmc6IGJvb2xlYW47XHJcblxyXG4gICAgLyoqIEFsbG93cyBqc29ucC4gVGhpcyBmbGFnIGNhbiBiZSB1c2VkIHRvIHN1cHBwb3J0IENPUlMgb24gb2xkZXIgYnJvd3NlcnMgKi9cclxuICAgIHB1YmxpYyBqc29ucDogYm9vbGVhbjtcclxuXHJcbiAgICAgLyoqIEFsbG93cyB3aXRoQ3JlZGVudGlhbHMuIFRoaXMgZmxhZyBjYW4gYmUgdXNlZCB0byBzdXBwcG9ydCBDT1JTICovXHJcbiAgICBwdWJsaWMgd2l0aENyZWRlbnRpYWxzOiBib29sZWFuO1xyXG5cclxuICAgIC8qKiBBbGxvd3MgcGluZ0ludGVydmFsICovXHJcbiAgICBwdWJsaWMgcGluZ0ludGVydmFsPzogbnVtYmVyO1xyXG5cclxuICAgIC8qKiBBbGxvd3MgeW91IHRvIHNwZWNpZnkgdHJhbnNwb3J0LiBZb3UgY2FuIHNwZWNpZnkgYSBmYWxsYmFjayBvcmRlciBpZiB5b3Ugd2FuJ3QgdG8gdHJ5IHNwZWNpZmljIHRyYW5zcG9ydHMgaW4gb3JkZXIuIEJ5IGRlZmF1bHQgc2VsZWN0cyBiZXN0IGF2YWxpYWJsZSB0cmFuc3BvcnQuICovXHJcbiAgICBwdWJsaWMgdHJhbnNwb3J0OiBDb25uZWN0aW9uVHJhbnNwb3J0IHwgQ29ubmVjdGlvblRyYW5zcG9ydFtdO1xyXG5cclxuICAgIC8qKiBBbGxvd3MgeW91IHRvIHJ1biB0aGUgZXZlbnQgY2FsbGJhY2sgb3V0c2lkZSBuZ1pvbmUgKi9cclxuICAgIHB1YmxpYyBleGVjdXRlRXZlbnRzSW5ab25lPzogYm9vbGVhbjtcclxuXHJcbiAgICAvKiogQWxsb3dzIHlvdSB0byBydW4gdGhlIGVycm9ycyBjYWxsYmFjayBvdXRzaWRlIG5nWm9uZSAqL1xyXG4gICAgcHVibGljIGV4ZWN1dGVFcnJvcnNJblpvbmU/OiBib29sZWFuO1xyXG5cclxuICAgIC8qKiBBbGxvd3MgeW91IHRvIHJ1biB0aGUgc3RhdHVzIGNoYW5nZSBpbiBjYWxsYmFjayBvdXRzaWRlIG5nWm9uZSAqL1xyXG4gICAgcHVibGljIGV4ZWN1dGVTdGF0dXNDaGFuZ2VJblpvbmU/OiBib29sZWFuO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgdGhpcy5odWJOYW1lID0gbnVsbDtcclxuICAgICAgIHRoaXMubG9nZ2luZyA9IGZhbHNlO1xyXG4gICAgICAgdGhpcy5xcyAgPSBudWxsO1xyXG4gICAgICAgdGhpcy51cmwgPSBudWxsO1xyXG4gICAgICAgdGhpcy5qc29ucCA9IGZhbHNlO1xyXG4gICAgICAgdGhpcy53aXRoQ3JlZGVudGlhbHMgPSBmYWxzZTtcclxuICAgICAgIHRoaXMudHJhbnNwb3J0ID0gQ29ubmVjdGlvblRyYW5zcG9ydHMuYXV0bztcclxuICAgICAgIHRoaXMuZXhlY3V0ZUV2ZW50c0luWm9uZSA9IHRydWU7XHJcbiAgICAgICB0aGlzLmV4ZWN1dGVFcnJvcnNJblpvbmUgPSBmYWxzZTtcclxuICAgICAgIHRoaXMuZXhlY3V0ZVN0YXR1c0NoYW5nZUluWm9uZSA9IHRydWU7XHJcbiAgICAgICB0aGlzLnBpbmdJbnRlcnZhbCA9IDMwMDAwMDtcclxuICAgIH1cclxufVxyXG4iXX0=