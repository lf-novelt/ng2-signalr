/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function IConnectionOptions() { }
if (false) {
    /**
     * connection url to the SignalR service.
     * @type {?|undefined}
     */
    IConnectionOptions.prototype.url;
    /**
     * Allows you to specify query string parameters object when the client connects.
     * @type {?|undefined}
     */
    IConnectionOptions.prototype.qs;
    /**
     * name of the SignalR service hub to connect to.
     * @type {?|undefined}
     */
    IConnectionOptions.prototype.hubName;
    /**
     * Allows jsonp
     * @type {?|undefined}
     */
    IConnectionOptions.prototype.jsonp;
    /**
     * Allows withCredentials
     * @type {?|undefined}
     */
    IConnectionOptions.prototype.withCredentials;
    /**
     * Allows pingInterval
     * @type {?|undefined}
     */
    IConnectionOptions.prototype.pingInterval;
    /**
     * Allows you to specify transport. You can specify a fallback order if you wan't to try specific transports in order. By default selects best avaliable transport.
     * @type {?|undefined}
     */
    IConnectionOptions.prototype.transport;
    /**
     * Allows you to run the event callback outside ngZone
     * @type {?|undefined}
     */
    IConnectionOptions.prototype.executeEventsInZone;
    /**
     * Allows you to run the errors callback outside ngZone
     * @type {?|undefined}
     */
    IConnectionOptions.prototype.executeErrorsInZone;
    /**
     * Allows you to run the status change in callback outside ngZone
     * @type {?|undefined}
     */
    IConnectionOptions.prototype.executeStatusChangeInZone;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdGlvbi5vcHRpb25zLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLXNpZ25hbHIvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvY29ubmVjdGlvbi9jb25uZWN0aW9uLm9wdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUVBLHdDQStCQzs7Ozs7O0lBNUJHLGlDQUFhOzs7OztJQUdiLGdDQUFTOzs7OztJQUdULHFDQUFpQjs7Ozs7SUFHakIsbUNBQWdCOzs7OztJQUdoQiw2Q0FBMEI7Ozs7O0lBRzFCLDBDQUFzQjs7Ozs7SUFHdEIsdUNBQXdEOzs7OztJQUd4RCxpREFBOEI7Ozs7O0lBRzlCLGlEQUE4Qjs7Ozs7SUFHOUIsdURBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29ubmVjdGlvblRyYW5zcG9ydCB9IGZyb20gJy4vY29ubmVjdGlvbi50cmFuc3BvcnQnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQ29ubmVjdGlvbk9wdGlvbnMge1xyXG5cclxuICAgIC8qKiBjb25uZWN0aW9uIHVybCB0byB0aGUgU2lnbmFsUiBzZXJ2aWNlLiAqL1xyXG4gICAgdXJsPzogc3RyaW5nO1xyXG5cclxuICAgIC8qKiBBbGxvd3MgeW91IHRvIHNwZWNpZnkgcXVlcnkgc3RyaW5nIHBhcmFtZXRlcnMgb2JqZWN0IHdoZW4gdGhlIGNsaWVudCBjb25uZWN0cy4gKi9cclxuICAgIHFzPzogYW55O1xyXG5cclxuICAgIC8qKiBuYW1lIG9mIHRoZSBTaWduYWxSIHNlcnZpY2UgaHViIHRvIGNvbm5lY3QgdG8uICovXHJcbiAgICBodWJOYW1lPzogc3RyaW5nO1xyXG5cclxuICAgIC8qKiBBbGxvd3MganNvbnAgKi9cclxuICAgIGpzb25wPzogYm9vbGVhbjtcclxuXHJcbiAgICAvKiogQWxsb3dzIHdpdGhDcmVkZW50aWFscyAqL1xyXG4gICAgd2l0aENyZWRlbnRpYWxzPzogYm9vbGVhbjtcclxuXHJcbiAgICAvKiogQWxsb3dzIHBpbmdJbnRlcnZhbCAqL1xyXG4gICAgcGluZ0ludGVydmFsPzogbnVtYmVyO1xyXG5cclxuICAgIC8qKiBBbGxvd3MgeW91IHRvIHNwZWNpZnkgdHJhbnNwb3J0LiBZb3UgY2FuIHNwZWNpZnkgYSBmYWxsYmFjayBvcmRlciBpZiB5b3Ugd2FuJ3QgdG8gdHJ5IHNwZWNpZmljIHRyYW5zcG9ydHMgaW4gb3JkZXIuIEJ5IGRlZmF1bHQgc2VsZWN0cyBiZXN0IGF2YWxpYWJsZSB0cmFuc3BvcnQuICovXHJcbiAgICB0cmFuc3BvcnQ/OiBDb25uZWN0aW9uVHJhbnNwb3J0IHwgQ29ubmVjdGlvblRyYW5zcG9ydFtdO1xyXG5cclxuICAgIC8qKiBBbGxvd3MgeW91IHRvIHJ1biB0aGUgZXZlbnQgY2FsbGJhY2sgb3V0c2lkZSBuZ1pvbmUgKi9cclxuICAgIGV4ZWN1dGVFdmVudHNJblpvbmU/OiBib29sZWFuO1xyXG5cclxuICAgIC8qKiBBbGxvd3MgeW91IHRvIHJ1biB0aGUgZXJyb3JzIGNhbGxiYWNrIG91dHNpZGUgbmdab25lICovXHJcbiAgICBleGVjdXRlRXJyb3JzSW5ab25lPzogYm9vbGVhbjtcclxuXHJcbiAgICAvKiogQWxsb3dzIHlvdSB0byBydW4gdGhlIHN0YXR1cyBjaGFuZ2UgaW4gY2FsbGJhY2sgb3V0c2lkZSBuZ1pvbmUgKi9cclxuICAgIGV4ZWN1dGVTdGF0dXNDaGFuZ2VJblpvbmU/OiBib29sZWFuO1xyXG59XHJcbiJdfQ==