/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class ConnectionStatus {
    /**
     * @param {?} value
     */
    constructor(value) {
        if (value == null || value < 0) {
            throw new Error('Failed to create ConnectionStatus. Argument \'name\' can not be null or empty.');
        }
        this._value = value;
    }
    /**
     * @return {?}
     */
    get value() {
        return this._value;
    }
    /**
     * @return {?}
     */
    get name() {
        return ConnectionStatus.names[Number(this._value.toString())];
    }
    /**
     * @return {?}
     */
    toString() {
        return this.name;
    }
    /**
     * @param {?} other
     * @return {?}
     */
    equals(other) {
        if (other == null) {
            return false;
        }
        return this._value === other.value;
    }
}
ConnectionStatus.names = ['connecting', 'connected', 'reconnecting', '', 'disconnected'];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdGlvbi5zdGF0dXMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItc2lnbmFsci8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9jb25uZWN0aW9uL2Nvbm5lY3Rpb24uc3RhdHVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNLE9BQU8sZ0JBQWdCOzs7O0lBY3pCLFlBQVksS0FBYTtRQUNyQixJQUFJLEtBQUssSUFBSSxJQUFJLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRTtZQUM1QixNQUFNLElBQUksS0FBSyxDQUFDLGdGQUFnRixDQUFDLENBQUM7U0FDckc7UUFDRCxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUN4QixDQUFDOzs7O0lBYkQsSUFBSSxLQUFLO1FBQ0wsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7Ozs7SUFFQSxJQUFJLElBQUk7UUFDTCxPQUFPLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDbEUsQ0FBQzs7OztJQVNNLFFBQVE7UUFDWCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDckIsQ0FBQzs7Ozs7SUFFTSxNQUFNLENBQUMsS0FBdUI7UUFDakMsSUFBSSxLQUFLLElBQUksSUFBSSxFQUFFO1lBQ2YsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFDRCxPQUFPLElBQUksQ0FBQyxNQUFNLEtBQUssS0FBSyxDQUFDLEtBQUssQ0FBQztJQUN2QyxDQUFDOztBQTVCYyxzQkFBSyxHQUFhLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxjQUFjLEVBQUUsRUFBRSxFQUFFLGNBQWMsQ0FBQyxDQUFDOzs7Ozs7SUFBakcsdUJBQWlHOzs7OztJQUVqRyxrQ0FBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgQ29ubmVjdGlvblN0YXR1cyB7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgbmFtZXM6IHN0cmluZ1tdID0gWydjb25uZWN0aW5nJywgJ2Nvbm5lY3RlZCcsICdyZWNvbm5lY3RpbmcnLCAnJywgJ2Rpc2Nvbm5lY3RlZCddO1xyXG5cclxuICAgIHByaXZhdGUgX3ZhbHVlOiBudW1iZXI7XHJcblxyXG4gICAgZ2V0IHZhbHVlKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgICBnZXQgbmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBDb25uZWN0aW9uU3RhdHVzLm5hbWVzW051bWJlcih0aGlzLl92YWx1ZS50b1N0cmluZygpKV07XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIGlmICh2YWx1ZSA9PSBudWxsIHx8IHZhbHVlIDwgMCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWxlZCB0byBjcmVhdGUgQ29ubmVjdGlvblN0YXR1cy4gQXJndW1lbnQgXFwnbmFtZVxcJyBjYW4gbm90IGJlIG51bGwgb3IgZW1wdHkuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHRvU3RyaW5nKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZXF1YWxzKG90aGVyOiBDb25uZWN0aW9uU3RhdHVzKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKG90aGVyID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWUgPT09IG90aGVyLnZhbHVlO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==