/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
'use strict';
import jQueryDeferred from './jquery-deferred';
import jQueryParam from './jquery-param/jquery-param';
/** @type {?} */
var jqueryFunction = (/**
 * @param {?} subject
 * @return {?}
 */
function (subject) {
    /** @type {?} */
    var events = subject.events || {};
    if (subject && subject === subject.window)
        return {
            0: subject,
            load: (/**
             * @param {?} handler
             * @return {?}
             */
            function (handler) { return subject.addEventListener('load', handler, false); }),
            bind: (/**
             * @param {?} event
             * @param {?} handler
             * @return {?}
             */
            function (event, handler) { return subject.addEventListener(event, handler, false); }),
            unbind: (/**
             * @param {?} event
             * @param {?} handler
             * @return {?}
             */
            function (event, handler) { return subject.removeEventListener(event, handler, false); })
        };
    return {
        0: subject,
        unbind: /**
         * @param {?} event
         * @param {?} handler
         * @return {?}
         */
        function (event, handler) {
            /** @type {?} */
            var handlers = events[event] || [];
            if (handler) {
                /** @type {?} */
                var idx = handlers.indexOf(handler);
                if (idx !== -1)
                    handlers.splice(idx, 1);
            }
            else
                handlers = [];
            events[event] = handlers;
            subject.events = events;
        },
        bind: /**
         * @param {?} event
         * @param {?} handler
         * @return {?}
         */
        function (event, handler) {
            /** @type {?} */
            var current = events[event] || [];
            events[event] = current.concat(handler);
            subject.events = events;
        },
        triggerHandler: /**
         * @param {?} event
         * @param {?} args
         * @return {?}
         */
        function (event, args) {
            var _this = this;
            /** @type {?} */
            var handlers = events[event] || [];
            handlers.forEach((/**
             * @param {?} fn
             * @return {?}
             */
            function (fn) {
                if (args && args[0] && args[0].type === undefined) {
                    args = [{
                            type: event
                        }].concat(args || []);
                }
                else {
                    args = args || [];
                }
                fn.apply(_this, args);
            }));
        }
    };
});
var ɵ0 = jqueryFunction;
/** @type {?} */
var xhr = (/**
 * @return {?}
 */
function () {
    try {
        return new XMLHttpRequest();
    }
    catch (e) { }
});
var ɵ1 = xhr;
/** @type {?} */
var ajax = (/**
 * @param {?} options
 * @return {?}
 */
function (options) {
    /** @type {?} */
    var request = xhr();
    request.onreadystatechange = (/**
     * @return {?}
     */
    function () {
        if (request.readyState !== 4) {
            return;
        }
        if (request.status === 200) {
            options.success && options.success(JSON.parse(request.responseText));
        }
        else {
            options.error && options.error(request);
        }
    });
    request.open(options.type, options.url);
    request.setRequestHeader('content-type', options.contentType);
    request.send(options.data.data && "data=" + options.data.data);
    return {
        abort: (/**
         * @return {?}
         */
        function () {
            return request.abort();
        })
    };
});
var ɵ2 = ajax;
export default jQueryDeferred.extend(jqueryFunction, jQueryDeferred, {
    defaultAjaxHeaders: null,
    ajax: ajax,
    trim: (/**
     * @param {?} str
     * @return {?}
     */
    function (str) { return str && str.trim(); }),
    isEmptyObject: (/**
     * @param {?} obj
     * @return {?}
     */
    function (obj) { return !obj || Object.keys(obj).length === 0; }),
    makeArray: (/**
     * @param {?} arr
     * @return {?}
     */
    function (arr) { return [].slice.call(arr, 0); }),
    param: (/**
     * @param {?} obj
     * @return {?}
     */
    function (obj) { return jQueryParam(obj); }),
    support: {
        cors: ((/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var xhrObj = xhr();
            return !!xhrObj && ("withCredentials" in xhrObj);
        }))()
    }
});
export { ɵ0, ɵ1, ɵ2 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoialF1ZXJ5U2hpbS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1zaWduYWxyLyIsInNvdXJjZXMiOlsibGliL3NpZ25hbHItbm8tanF1ZXJ5L2pRdWVyeVNoaW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLFlBQVksQ0FBQztBQUViLE9BQU8sY0FBYyxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sV0FBVyxNQUFNLDZCQUE2QixDQUFDOztJQUVoRCxjQUFjOzs7O0FBQUcsVUFBUyxPQUFPOztRQUNqQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSxFQUFFO0lBRWpDLElBQUksT0FBTyxJQUFJLE9BQU8sS0FBSyxPQUFPLENBQUMsTUFBTTtRQUN2QyxPQUFPO1lBQ0wsQ0FBQyxFQUFFLE9BQU87WUFDVixJQUFJOzs7O1lBQUUsVUFBQyxPQUFPLElBQUssT0FBQSxPQUFPLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsRUFBaEQsQ0FBZ0QsQ0FBQTtZQUNuRSxJQUFJOzs7OztZQUFFLFVBQUMsS0FBSyxFQUFFLE9BQU8sSUFBSyxPQUFBLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxFQUEvQyxDQUErQyxDQUFBO1lBQ3pFLE1BQU07Ozs7O1lBQUUsVUFBQyxLQUFLLEVBQUUsT0FBTyxJQUFLLE9BQUEsT0FBTyxDQUFDLG1CQUFtQixDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLEVBQWxELENBQWtELENBQUE7U0FDL0UsQ0FBQztJQUVKLE9BQU87UUFDTCxDQUFDLEVBQUUsT0FBTztRQUVWLE1BQU07Ozs7O2tCQUFDLEtBQUssRUFBRSxPQUFPOztnQkFDZixRQUFRLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUU7WUFFbEMsSUFBSSxPQUFPLEVBQUU7O29CQUNQLEdBQUcsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFD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QUk7SUFDVixJQUFJOzs7O0lBQUUsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksRUFBRSxFQUFqQixDQUFpQixDQUFBO0lBQzlCLGFBQWE7Ozs7SUFBRSxVQUFBLEdBQUcsSUFBSSxPQUFBLENBQUMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBckMsQ0FBcUMsQ0FBQTtJQUMzRCxTQUFTOzs7O0lBQUUsVUFBQSxHQUFHLElBQUksT0FBQSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUMsQ0FBQyxDQUFDLEVBQXBCLENBQW9CLENBQUE7SUFDdEMsS0FBSzs7OztJQUFFLFVBQUEsR0FBRyxJQUFJLE9BQUEsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFoQixDQUFnQixDQUFBO0lBQzlCLE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRTs7O1FBQUM7O2dCQUNDLE1BQU0sR0FBRyxHQUFHLEVBQUU7WUFDcEIsT0FBTyxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsaUJBQWlCLElBQUksTUFBTSxDQUFDLENBQUM7UUFDbkQsQ0FBQyxFQUFDLEVBQUU7S0FDTDtDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCBqUXVlcnlEZWZlcnJlZCBmcm9tICcuL2pxdWVyeS1kZWZlcnJlZCc7XHJcbmltcG9ydCBqUXVlcnlQYXJhbSBmcm9tICcuL2pxdWVyeS1wYXJhbS9qcXVlcnktcGFyYW0nO1xyXG5cclxuY29uc3QganF1ZXJ5RnVuY3Rpb24gPSBmdW5jdGlvbihzdWJqZWN0KSB7XHJcbiAgbGV0IGV2ZW50cyA9IHN1YmplY3QuZXZlbnRzIHx8IHt9O1xyXG5cclxuICBpZiAoc3ViamVjdCAmJiBzdWJqZWN0ID09PSBzdWJqZWN0LndpbmRvdylcclxuICAgIHJldHVybiB7XHJcbiAgICAgIDA6IHN1YmplY3QsXHJcbiAgICAgIGxvYWQ6IChoYW5kbGVyKSA9PiBzdWJqZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBoYW5kbGVyLCBmYWxzZSksXHJcbiAgICAgIGJpbmQ6IChldmVudCwgaGFuZGxlcikgPT4gc3ViamVjdC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyLCBmYWxzZSksXHJcbiAgICAgIHVuYmluZDogKGV2ZW50LCBoYW5kbGVyKSA9PiBzdWJqZWN0LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZXIsIGZhbHNlKVxyXG4gICAgfTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIDA6IHN1YmplY3QsXHJcblxyXG4gICAgdW5iaW5kKGV2ZW50LCBoYW5kbGVyKSB7XHJcbiAgICAgIGxldCBoYW5kbGVycyA9IGV2ZW50c1tldmVudF0gfHwgW107XHJcblxyXG4gICAgICBpZiAoaGFuZGxlcikge1xyXG4gICAgICAgIGxldCBpZHggPSBoYW5kbGVycy5pbmRleE9mKGhhbmRsZXIpO1xyXG4gICAgICAgIGlmIChpZHggIT09IC0xKSBoYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcclxuICAgICAgfSBlbHNlIGhhbmRsZXJzID0gW107XHJcblxyXG4gICAgICBldmVudHNbZXZlbnRdID0gaGFuZGxlcnM7XHJcbiAgICAgIHN1YmplY3QuZXZlbnRzID0gZXZlbnRzO1xyXG5cclxuICAgIH0sXHJcbiAgICBiaW5kKGV2ZW50LCBoYW5kbGVyKSB7XHJcbiAgICAgIGxldCBjdXJyZW50ID0gZXZlbnRzW2V2ZW50XSB8fCBbXTtcclxuICAgICAgZXZlbnRzW2V2ZW50XSA9IGN1cnJlbnQuY29uY2F0KGhhbmRsZXIpO1xyXG4gICAgICBzdWJqZWN0LmV2ZW50cyA9IGV2ZW50cztcclxuICAgIH0sXHJcbiAgICB0cmlnZ2VySGFuZGxlcihldmVudCwgYXJncykge1xyXG4gICAgICBsZXQgaGFuZGxlcnMgPSBldmVudHNbZXZlbnRdIHx8IFtdO1xyXG4gICAgICBoYW5kbGVycy5mb3JFYWNoKGZuID0+IHtcclxuICAgICAgICBpZiAoYXJncyAmJiBhcmdzWzBdICYmIGFyZ3NbMF0udHlwZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICBhcmdzID0gW3tcclxuICAgICAgICAgICAgdHlwZTogZXZlbnRcclxuICAgICAgICAgIH1dLmNvbmNhdChhcmdzIHx8IFtdKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgYXJncyA9IGFyZ3MgfHwgW107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmbi5hcHBseSh0aGlzLCBhcmdzKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxufTtcclxuXHJcbmNvbnN0IHhociA9IGZ1bmN0aW9uKCkge1xyXG4gIHRyeSB7XHJcbiAgICByZXR1cm4gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgfSBjYXRjaCAoZSkge31cclxufTtcclxuXHJcbmNvbnN0IGFqYXggPSBmdW5jdGlvbihvcHRpb25zKSB7XHJcbiAgY29uc3QgcmVxdWVzdCA9IHhocigpO1xyXG4gIHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gKCkgPT4ge1xyXG4gICAgaWYgKHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHJlcXVlc3Quc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgb3B0aW9ucy5zdWNjZXNzICYmIG9wdGlvbnMuc3VjY2VzcyhKU09OLnBhcnNlKHJlcXVlc3QucmVzcG9uc2VUZXh0KSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBvcHRpb25zLmVycm9yICYmIG9wdGlvbnMuZXJyb3IocmVxdWVzdCk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgcmVxdWVzdC5vcGVuKG9wdGlvbnMudHlwZSwgb3B0aW9ucy51cmwpO1xyXG4gIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcignY29udGVudC10eXBlJywgb3B0aW9ucy5jb250ZW50VHlwZSk7XHJcblxyXG4gIHJlcXVlc3Quc2VuZChvcHRpb25zLmRhdGEuZGF0YSAmJiBgZGF0YT0ke29wdGlvbnMuZGF0YS5kYXRhfWApO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgYWJvcnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICByZXR1cm4gcmVxdWVzdC5hYm9ydCgpO1xyXG4gICAgfVxyXG4gIH07XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBqUXVlcnlEZWZlcnJlZC5leHRlbmQoXHJcbiAganF1ZXJ5RnVuY3Rpb24sXHJcbiAgalF1ZXJ5RGVmZXJyZWQsXHJcbiAge1xyXG4gICAgZGVmYXVsdEFqYXhIZWFkZXJzOiBudWxsLFxyXG4gICAgYWpheDogYWpheCxcclxuICAgIHRyaW06IHN0ciA9PiBzdHIgJiYgc3RyLnRyaW0oKSxcclxuICAgIGlzRW1wdHlPYmplY3Q6IG9iaiA9PiAhb2JqIHx8IE9iamVjdC5rZXlzKG9iaikubGVuZ3RoID09PSAwLFxyXG4gICAgbWFrZUFycmF5OiBhcnIgPT4gW10uc2xpY2UuY2FsbChhcnIsMCksXHJcbiAgICBwYXJhbTogb2JqID0+IGpRdWVyeVBhcmFtKG9iaiksXHJcbiAgICBzdXBwb3J0OiB7XHJcbiAgICAgIGNvcnM6IChmdW5jdGlvbigpIHtcclxuICAgICAgICBjb25zdCB4aHJPYmogPSB4aHIoKTtcclxuICAgICAgICByZXR1cm4gISF4aHJPYmogJiYgKFwid2l0aENyZWRlbnRpYWxzXCIgaW4geGhyT2JqKTtcclxuICAgICAgfSkoKVxyXG4gICAgfVxyXG4gIH0pXHJcbiAgIl19