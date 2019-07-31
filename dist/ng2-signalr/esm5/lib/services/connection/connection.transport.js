/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ConnectionTransport = /** @class */ (function () {
    function ConnectionTransport(name) {
        if (name == null || name === '') {
            throw new Error('Failed to create ConnectionTransport. Argument \'name\' can not be null or empty.');
        }
        this._name = name;
    }
    Object.defineProperty(ConnectionTransport.prototype, "name", {
        get: /**
         * @return {?}
         */
        function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ConnectionTransport.prototype.toString = /**
     * @return {?}
     */
    function () {
        return this._name;
    };
    /**
     * @param {?} other
     * @return {?}
     */
    ConnectionTransport.prototype.equals = /**
     * @param {?} other
     * @return {?}
     */
    function (other) {
        if (other == null) {
            return false;
        }
        return this._name === other.name;
    };
    return ConnectionTransport;
}());
export { ConnectionTransport };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ConnectionTransport.prototype._name;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdGlvbi50cmFuc3BvcnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItc2lnbmFsci8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9jb25uZWN0aW9uL2Nvbm5lY3Rpb24udHJhbnNwb3J0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTtJQVFJLDZCQUFZLElBQVk7UUFDcEIsSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksS0FBSyxFQUFFLEVBQUU7WUFDN0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxtRkFBbUYsQ0FBQyxDQUFDO1NBQ3hHO1FBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDdEIsQ0FBQztJQVRELHNCQUFJLHFDQUFJOzs7O1FBQVI7WUFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDdEIsQ0FBQzs7O09BQUE7Ozs7SUFTTSxzQ0FBUTs7O0lBQWY7UUFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDdEIsQ0FBQzs7Ozs7SUFFTSxvQ0FBTTs7OztJQUFiLFVBQWMsS0FBMEI7UUFDcEMsSUFBSSxLQUFLLElBQUksSUFBSSxFQUFFO1lBQ2YsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFFRCxPQUFPLElBQUksQ0FBQyxLQUFLLEtBQUssS0FBSyxDQUFDLElBQUksQ0FBQztJQUNyQyxDQUFDO0lBQ0wsMEJBQUM7QUFBRCxDQUFDLEFBMUJELElBMEJDOzs7Ozs7O0lBeEJHLG9DQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBDb25uZWN0aW9uVHJhbnNwb3J0IHtcclxuXHJcbiAgICBwcml2YXRlIF9uYW1lOiBzdHJpbmc7XHJcblxyXG4gICAgZ2V0IG5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAobmFtZSA9PSBudWxsIHx8IG5hbWUgPT09ICcnKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIGNyZWF0ZSBDb25uZWN0aW9uVHJhbnNwb3J0LiBBcmd1bWVudCBcXCduYW1lXFwnIGNhbiBub3QgYmUgbnVsbCBvciBlbXB0eS4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbmFtZSA9IG5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHRvU3RyaW5nKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVxdWFscyhvdGhlcjogQ29ubmVjdGlvblRyYW5zcG9ydCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChvdGhlciA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLl9uYW1lID09PSBvdGhlci5uYW1lO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==