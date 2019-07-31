/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Subject } from 'rxjs';
/**
 * @template T
 */
var /**
 * @template T
 */
BroadcastEventListener = /** @class */ (function (_super) {
    tslib_1.__extends(BroadcastEventListener, _super);
    function BroadcastEventListener(event) {
        var _this = _super.call(this) || this;
        _this.event = event;
        if (event == null || event === '') {
            throw new Error('Failed to create BroadcastEventListener. Argument \'event\' can not be empty');
        }
        return _this;
    }
    return BroadcastEventListener;
}(Subject));
/**
 * @template T
 */
export { BroadcastEventListener };
if (false) {
    /** @type {?} */
    BroadcastEventListener.prototype.event;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvYWRjYXN0LmV2ZW50Lmxpc3RlbmVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLXNpZ25hbHIvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvZXZlbnRpbmcvYnJvYWRjYXN0LmV2ZW50Lmxpc3RlbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQzs7OztBQUUvQjs7OztJQUErQyxrREFBVTtJQUVyRCxnQ0FBbUIsS0FBYTtRQUFoQyxZQUNJLGlCQUFPLFNBSVY7UUFMa0IsV0FBSyxHQUFMLEtBQUssQ0FBUTtRQUU1QixJQUFJLEtBQUssSUFBSSxJQUFJLElBQUksS0FBSyxLQUFLLEVBQUUsRUFBRTtZQUMvQixNQUFNLElBQUksS0FBSyxDQUFDLDhFQUE4RSxDQUFDLENBQUM7U0FDbkc7O0lBQ0wsQ0FBQztJQUNMLDZCQUFDO0FBQUQsQ0FBQyxBQVJELENBQStDLE9BQU8sR0FRckQ7Ozs7Ozs7SUFOZSx1Q0FBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgQnJvYWRjYXN0RXZlbnRMaXN0ZW5lcjxUPiBleHRlbmRzIFN1YmplY3Q8VD4ge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBldmVudDogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICBpZiAoZXZlbnQgPT0gbnVsbCB8fCBldmVudCA9PT0gJycpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gY3JlYXRlIEJyb2FkY2FzdEV2ZW50TGlzdGVuZXIuIEFyZ3VtZW50IFxcJ2V2ZW50XFwnIGNhbiBub3QgYmUgZW1wdHknKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19