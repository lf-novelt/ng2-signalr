/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ConnectionStatus = /** @class */ (function () {
    function ConnectionStatus(value) {
        if (value == null || value < 0) {
            throw new Error('Failed to create ConnectionStatus. Argument \'name\' can not be null or empty.');
        }
        this._value = value;
    }
    Object.defineProperty(ConnectionStatus.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            return this._value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectionStatus.prototype, "name", {
        get: /**
         * @return {?}
         */
        function () {
            return ConnectionStatus.names[Number(this._value.toString())];
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ConnectionStatus.prototype.toString = /**
     * @return {?}
     */
    function () {
        return this.name;
    };
    /**
     * @param {?} other
     * @return {?}
     */
    ConnectionStatus.prototype.equals = /**
     * @param {?} other
     * @return {?}
     */
    function (other) {
        if (other == null) {
            return false;
        }
        return this._value === other.value;
    };
    ConnectionStatus.names = ['connecting', 'connected', 'reconnecting', '', 'disconnected'];
    return ConnectionStatus;
}());
export { ConnectionStatus };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ConnectionStatus.names;
    /**
     * @type {?}
     * @private
     */
    ConnectionStatus.prototype._value;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdGlvbi5zdGF0dXMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItc2lnbmFsci8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9jb25uZWN0aW9uL2Nvbm5lY3Rpb24uc3RhdHVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTtJQWNJLDBCQUFZLEtBQWE7UUFDckIsSUFBSSxLQUFLLElBQUksSUFBSSxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUU7WUFDNUIsTUFBTSxJQUFJLEtBQUssQ0FBQyxnRkFBZ0YsQ0FBQyxDQUFDO1NBQ3JHO1FBQ0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDeEIsQ0FBQztJQWJELHNCQUFJLG1DQUFLOzs7O1FBQVQ7WUFDSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDdkIsQ0FBQzs7O09BQUE7SUFFQSxzQkFBSSxrQ0FBSTs7OztRQUFSO1lBQ0csT0FBTyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2xFLENBQUM7OztPQUFBOzs7O0lBU00sbUNBQVE7OztJQUFmO1FBQ0ksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3JCLENBQUM7Ozs7O0lBRU0saUNBQU07Ozs7SUFBYixVQUFjLEtBQXVCO1FBQ2pDLElBQUksS0FBSyxJQUFJLElBQUksRUFBRTtZQUNmLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBQ0QsT0FBTyxJQUFJLENBQUMsTUFBTSxLQUFLLEtBQUssQ0FBQyxLQUFLLENBQUM7SUFDdkMsQ0FBQztJQTVCYyxzQkFBSyxHQUFhLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxjQUFjLEVBQUUsRUFBRSxFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBNkJyRyx1QkFBQztDQUFBLEFBL0JELElBK0JDO1NBL0JZLGdCQUFnQjs7Ozs7O0lBRXpCLHVCQUFpRzs7Ozs7SUFFakcsa0NBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIENvbm5lY3Rpb25TdGF0dXMge1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIG5hbWVzOiBzdHJpbmdbXSA9IFsnY29ubmVjdGluZycsICdjb25uZWN0ZWQnLCAncmVjb25uZWN0aW5nJywgJycsICdkaXNjb25uZWN0ZWQnXTtcclxuXHJcbiAgICBwcml2YXRlIF92YWx1ZTogbnVtYmVyO1xyXG5cclxuICAgIGdldCB2YWx1ZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAgZ2V0IG5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gQ29ubmVjdGlvblN0YXR1cy5uYW1lc1tOdW1iZXIodGhpcy5fdmFsdWUudG9TdHJpbmcoKSldO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodmFsdWUgPT0gbnVsbCB8fCB2YWx1ZSA8IDApIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gY3JlYXRlIENvbm5lY3Rpb25TdGF0dXMuIEFyZ3VtZW50IFxcJ25hbWVcXCcgY2FuIG5vdCBiZSBudWxsIG9yIGVtcHR5LicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0b1N0cmluZygpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVxdWFscyhvdGhlcjogQ29ubmVjdGlvblN0YXR1cyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChvdGhlciA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlID09PSBvdGhlci52YWx1ZTtcclxuICAgIH1cclxufVxyXG4iXX0=