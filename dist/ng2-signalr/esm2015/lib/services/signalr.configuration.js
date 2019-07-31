/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ConnectionTransports } from './connection/connection.transports';
export class SignalRConfiguration {
    constructor() {
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
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmFsci5jb25maWd1cmF0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLXNpZ25hbHIvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvc2lnbmFsci5jb25maWd1cmF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUkxRSxNQUFNLE9BQU8sb0JBQW9CO0lBbUM3QjtRQUNHLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxFQUFFLEdBQUksSUFBSSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO1FBQzdCLElBQUksQ0FBQyxTQUFTLEdBQUcsb0JBQW9CLENBQUMsSUFBSSxDQUFDO1FBQzNDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUM7UUFDaEMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEtBQUssQ0FBQztRQUNqQyxJQUFJLENBQUMseUJBQXlCLEdBQUcsSUFBSSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDO0lBQzlCLENBQUM7Q0FDSjs7Ozs7O0lBN0NHLG1DQUFtQjs7Ozs7SUFHbkIsa0NBQWdCOzs7OztJQUdoQix1Q0FBdUI7Ozs7O0lBR3ZCLHVDQUF3Qjs7Ozs7SUFHeEIscUNBQXNCOzs7OztJQUd0QiwrQ0FBZ0M7Ozs7O0lBR2hDLDRDQUE2Qjs7Ozs7SUFHN0IseUNBQThEOzs7OztJQUc5RCxtREFBcUM7Ozs7O0lBR3JDLG1EQUFxQzs7Ozs7SUFHckMseURBQTJDIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7IENvbm5lY3Rpb25UcmFuc3BvcnRzIH0gZnJvbSAnLi9jb25uZWN0aW9uL2Nvbm5lY3Rpb24udHJhbnNwb3J0cyc7XHJcbmltcG9ydCB7IENvbm5lY3Rpb25UcmFuc3BvcnQgfSBmcm9tICcuL2Nvbm5lY3Rpb24vY29ubmVjdGlvbi50cmFuc3BvcnQnO1xyXG5pbXBvcnQgeyBJQ29ubmVjdGlvbk9wdGlvbnMgfSBmcm9tICcuL2Nvbm5lY3Rpb24vY29ubmVjdGlvbi5vcHRpb25zJztcclxuXHJcbmV4cG9ydCBjbGFzcyBTaWduYWxSQ29uZmlndXJhdGlvbiBpbXBsZW1lbnRzIElDb25uZWN0aW9uT3B0aW9ucyB7XHJcblxyXG4gICAgLyoqIGNvbm5lY3Rpb24gdXJsIHRvIHRoZSBTaWduYWxSIHNlcnZpY2UgKi9cclxuICAgIHB1YmxpYyB1cmw6IHN0cmluZztcclxuXHJcbiAgICAvKiogQWxsb3dzIHlvdSB0byBzcGVjaWZ5IHF1ZXJ5IHN0cmluZyBwYXJhbWV0ZXJzIG9iamVjdCB3aGVuIHRoZSBjbGllbnQgY29ubmVjdHMgKi9cclxuICAgIHB1YmxpYyBxcz86IGFueTtcclxuXHJcbiAgICAvKiogbmFtZSBvZiB0aGUgU2lnbmFsUiBzZXJ2aWNlIGh1YiB0byBjb25uZWN0IHRvICovXHJcbiAgICBwdWJsaWMgaHViTmFtZTogc3RyaW5nO1xyXG5cclxuICAgIC8qKiBkaXNhYmxlL2VuYWJsZXMgY2xpZW50IHNpZGUgbG9nZ2luZy4gRGVmYXVsdHMgdG8gZmFsc2UgKi9cclxuICAgIHB1YmxpYyBsb2dnaW5nOiBib29sZWFuO1xyXG5cclxuICAgIC8qKiBBbGxvd3MganNvbnAuIFRoaXMgZmxhZyBjYW4gYmUgdXNlZCB0byBzdXBwcG9ydCBDT1JTIG9uIG9sZGVyIGJyb3dzZXJzICovXHJcbiAgICBwdWJsaWMganNvbnA6IGJvb2xlYW47XHJcblxyXG4gICAgIC8qKiBBbGxvd3Mgd2l0aENyZWRlbnRpYWxzLiBUaGlzIGZsYWcgY2FuIGJlIHVzZWQgdG8gc3VwcHBvcnQgQ09SUyAqL1xyXG4gICAgcHVibGljIHdpdGhDcmVkZW50aWFsczogYm9vbGVhbjtcclxuXHJcbiAgICAvKiogQWxsb3dzIHBpbmdJbnRlcnZhbCAqL1xyXG4gICAgcHVibGljIHBpbmdJbnRlcnZhbD86IG51bWJlcjtcclxuXHJcbiAgICAvKiogQWxsb3dzIHlvdSB0byBzcGVjaWZ5IHRyYW5zcG9ydC4gWW91IGNhbiBzcGVjaWZ5IGEgZmFsbGJhY2sgb3JkZXIgaWYgeW91IHdhbid0IHRvIHRyeSBzcGVjaWZpYyB0cmFuc3BvcnRzIGluIG9yZGVyLiBCeSBkZWZhdWx0IHNlbGVjdHMgYmVzdCBhdmFsaWFibGUgdHJhbnNwb3J0LiAqL1xyXG4gICAgcHVibGljIHRyYW5zcG9ydDogQ29ubmVjdGlvblRyYW5zcG9ydCB8IENvbm5lY3Rpb25UcmFuc3BvcnRbXTtcclxuXHJcbiAgICAvKiogQWxsb3dzIHlvdSB0byBydW4gdGhlIGV2ZW50IGNhbGxiYWNrIG91dHNpZGUgbmdab25lICovXHJcbiAgICBwdWJsaWMgZXhlY3V0ZUV2ZW50c0luWm9uZT86IGJvb2xlYW47XHJcblxyXG4gICAgLyoqIEFsbG93cyB5b3UgdG8gcnVuIHRoZSBlcnJvcnMgY2FsbGJhY2sgb3V0c2lkZSBuZ1pvbmUgKi9cclxuICAgIHB1YmxpYyBleGVjdXRlRXJyb3JzSW5ab25lPzogYm9vbGVhbjtcclxuXHJcbiAgICAvKiogQWxsb3dzIHlvdSB0byBydW4gdGhlIHN0YXR1cyBjaGFuZ2UgaW4gY2FsbGJhY2sgb3V0c2lkZSBuZ1pvbmUgKi9cclxuICAgIHB1YmxpYyBleGVjdXRlU3RhdHVzQ2hhbmdlSW5ab25lPzogYm9vbGVhbjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgIHRoaXMuaHViTmFtZSA9IG51bGw7XHJcbiAgICAgICB0aGlzLmxvZ2dpbmcgPSBmYWxzZTtcclxuICAgICAgIHRoaXMucXMgID0gbnVsbDtcclxuICAgICAgIHRoaXMudXJsID0gbnVsbDtcclxuICAgICAgIHRoaXMuanNvbnAgPSBmYWxzZTtcclxuICAgICAgIHRoaXMud2l0aENyZWRlbnRpYWxzID0gZmFsc2U7XHJcbiAgICAgICB0aGlzLnRyYW5zcG9ydCA9IENvbm5lY3Rpb25UcmFuc3BvcnRzLmF1dG87XHJcbiAgICAgICB0aGlzLmV4ZWN1dGVFdmVudHNJblpvbmUgPSB0cnVlO1xyXG4gICAgICAgdGhpcy5leGVjdXRlRXJyb3JzSW5ab25lID0gZmFsc2U7XHJcbiAgICAgICB0aGlzLmV4ZWN1dGVTdGF0dXNDaGFuZ2VJblpvbmUgPSB0cnVlO1xyXG4gICAgICAgdGhpcy5waW5nSW50ZXJ2YWwgPSAzMDAwMDA7XHJcbiAgICB9XHJcbn1cclxuIl19