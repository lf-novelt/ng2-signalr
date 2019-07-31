/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class ConnectionTransport {
    /**
     * @return {?}
     */
    get name() {
        return this._name;
    }
    /**
     * @param {?} name
     */
    constructor(name) {
        if (name == null || name === '') {
            throw new Error('Failed to create ConnectionTransport. Argument \'name\' can not be null or empty.');
        }
        this._name = name;
    }
    /**
     * @return {?}
     */
    toString() {
        return this._name;
    }
    /**
     * @param {?} other
     * @return {?}
     */
    equals(other) {
        if (other == null) {
            return false;
        }
        return this._name === other.name;
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    ConnectionTransport.prototype._name;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdGlvbi50cmFuc3BvcnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItc2lnbmFsci8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9jb25uZWN0aW9uL2Nvbm5lY3Rpb24udHJhbnNwb3J0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNLE9BQU8sbUJBQW1COzs7O0lBSTVCLElBQUksSUFBSTtRQUNKLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN0QixDQUFDOzs7O0lBRUQsWUFBWSxJQUFZO1FBQ3BCLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLEtBQUssRUFBRSxFQUFFO1lBQzdCLE1BQU0sSUFBSSxLQUFLLENBQUMsbUZBQW1GLENBQUMsQ0FBQztTQUN4RztRQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ3RCLENBQUM7Ozs7SUFFTSxRQUFRO1FBQ1gsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3RCLENBQUM7Ozs7O0lBRU0sTUFBTSxDQUFDLEtBQTBCO1FBQ3BDLElBQUksS0FBSyxJQUFJLElBQUksRUFBRTtZQUNmLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBRUQsT0FBTyxJQUFJLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQyxJQUFJLENBQUM7SUFDckMsQ0FBQztDQUNKOzs7Ozs7SUF4Qkcsb0NBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIENvbm5lY3Rpb25UcmFuc3BvcnQge1xyXG5cclxuICAgIHByaXZhdGUgX25hbWU6IHN0cmluZztcclxuXHJcbiAgICBnZXQgbmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9uYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIGlmIChuYW1lID09IG51bGwgfHwgbmFtZSA9PT0gJycpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gY3JlYXRlIENvbm5lY3Rpb25UcmFuc3BvcnQuIEFyZ3VtZW50IFxcJ25hbWVcXCcgY2FuIG5vdCBiZSBudWxsIG9yIGVtcHR5LicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9uYW1lID0gbmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdG9TdHJpbmcoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZXF1YWxzKG90aGVyOiBDb25uZWN0aW9uVHJhbnNwb3J0KTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKG90aGVyID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hbWUgPT09IG90aGVyLm5hbWU7XHJcbiAgICB9XHJcbn1cclxuIl19