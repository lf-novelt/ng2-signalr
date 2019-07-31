/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
'use strict';
import jQueryDeferred from './jquery-deferred';
import jQueryParam from './jquery-param/jquery-param';
/** @type {?} */
const jqueryFunction = (/**
 * @param {?} subject
 * @return {?}
 */
function (subject) {
    /** @type {?} */
    let events = subject.events || {};
    if (subject && subject === subject.window)
        return {
            0: subject,
            load: (/**
             * @param {?} handler
             * @return {?}
             */
            (handler) => subject.addEventListener('load', handler, false)),
            bind: (/**
             * @param {?} event
             * @param {?} handler
             * @return {?}
             */
            (event, handler) => subject.addEventListener(event, handler, false)),
            unbind: (/**
             * @param {?} event
             * @param {?} handler
             * @return {?}
             */
            (event, handler) => subject.removeEventListener(event, handler, false))
        };
    return {
        0: subject,
        /**
         * @param {?} event
         * @param {?} handler
         * @return {?}
         */
        unbind(event, handler) {
            /** @type {?} */
            let handlers = events[event] || [];
            if (handler) {
                /** @type {?} */
                let idx = handlers.indexOf(handler);
                if (idx !== -1)
                    handlers.splice(idx, 1);
            }
            else
                handlers = [];
            events[event] = handlers;
            subject.events = events;
        },
        /**
         * @param {?} event
         * @param {?} handler
         * @return {?}
         */
        bind(event, handler) {
            /** @type {?} */
            let current = events[event] || [];
            events[event] = current.concat(handler);
            subject.events = events;
        },
        /**
         * @param {?} event
         * @param {?} args
         * @return {?}
         */
        triggerHandler(event, args) {
            /** @type {?} */
            let handlers = events[event] || [];
            handlers.forEach((/**
             * @param {?} fn
             * @return {?}
             */
            fn => {
                if (args && args[0] && args[0].type === undefined) {
                    args = [{
                            type: event
                        }].concat(args || []);
                }
                else {
                    args = args || [];
                }
                fn.apply(this, args);
            }));
        }
    };
});
const ɵ0 = jqueryFunction;
/** @type {?} */
const xhr = (/**
 * @return {?}
 */
function () {
    try {
        return new XMLHttpRequest();
    }
    catch (e) { }
});
const ɵ1 = xhr;
/** @type {?} */
const ajax = (/**
 * @param {?} options
 * @return {?}
 */
function (options) {
    /** @type {?} */
    const request = xhr();
    request.onreadystatechange = (/**
     * @return {?}
     */
    () => {
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
    request.send(options.data.data && `data=${options.data.data}`);
    return {
        abort: (/**
         * @return {?}
         */
        function () {
            return request.abort();
        })
    };
});
const ɵ2 = ajax;
export default jQueryDeferred.extend(jqueryFunction, jQueryDeferred, {
    defaultAjaxHeaders: null,
    ajax: ajax,
    trim: (/**
     * @param {?} str
     * @return {?}
     */
    str => str && str.trim()),
    isEmptyObject: (/**
     * @param {?} obj
     * @return {?}
     */
    obj => !obj || Object.keys(obj).length === 0),
    makeArray: (/**
     * @param {?} arr
     * @return {?}
     */
    arr => [].slice.call(arr, 0)),
    param: (/**
     * @param {?} obj
     * @return {?}
     */
    obj => jQueryParam(obj)),
    support: {
        cors: ((/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            const xhrObj = xhr();
            return !!xhrObj && ("withCredentials" in xhrObj);
        }))()
    }
});
export { ɵ0, ɵ1, ɵ2 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoialF1ZXJ5U2hpbS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1zaWduYWxyLyIsInNvdXJjZXMiOlsibGliL3NpZ25hbHItbm8tanF1ZXJ5L2pRdWVyeVNoaW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLFlBQVksQ0FBQztBQUViLE9BQU8sY0FBYyxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sV0FBVyxNQUFNLDZCQUE2QixDQUFDOztNQUVoRCxjQUFjOzs7O0FBQUcsVUFBUyxPQUFPOztRQUNqQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSxFQUFFO0lBRWpDLElBQUksT0FBTyxJQUFJLE9BQU8sS0FBSyxPQUFPLENBQUMsTUFBTTtRQUN2QyxPQUFPO1lBQ0wsQ0FBQyxFQUFFLE9BQU87WUFDVixJQUFJOzs7O1lBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFBO1lBQ25FLElBQUk7Ozs7O1lBQUUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQTtZQUN6RSxNQUFNOzs7OztZQUFFLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUE7U0FDL0UsQ0FBQztJQUVKLE9BQU87UUFDTCxDQUFDLEVBQUUsT0FBTzs7Ozs7O1FBRVYsTUFBTSxDQUFDLEtBQUssRUFBRSxPQUFPOztnQkFDZixRQUFRLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUU7WUFFbEMsSUFBSSxPQUFPLEVBQUU7O29CQUNQLEdBQUcsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztnQkFDbkMsSUFB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Ozs7O0lBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksRUFBRSxDQUFBO0lBQzlCLGFBQWE7Ozs7SUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQTtJQUMzRCxTQUFTOzs7O0lBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUMsQ0FBQyxDQUFDLENBQUE7SUFDdEMsS0FBSzs7OztJQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQzlCLE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRTs7O1FBQUM7O2tCQUNDLE1BQU0sR0FBRyxHQUFHLEVBQUU7WUFDcEIsT0FBTyxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsaUJBQWlCLElBQUksTUFBTSxDQUFDLENBQUM7UUFDbkQsQ0FBQyxFQUFDLEVBQUU7S0FDTDtDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCBqUXVlcnlEZWZlcnJlZCBmcm9tICcuL2pxdWVyeS1kZWZlcnJlZCc7XHJcbmltcG9ydCBqUXVlcnlQYXJhbSBmcm9tICcuL2pxdWVyeS1wYXJhbS9qcXVlcnktcGFyYW0nO1xyXG5cclxuY29uc3QganF1ZXJ5RnVuY3Rpb24gPSBmdW5jdGlvbihzdWJqZWN0KSB7XHJcbiAgbGV0IGV2ZW50cyA9IHN1YmplY3QuZXZlbnRzIHx8IHt9O1xyXG5cclxuICBpZiAoc3ViamVjdCAmJiBzdWJqZWN0ID09PSBzdWJqZWN0LndpbmRvdylcclxuICAgIHJldHVybiB7XHJcbiAgICAgIDA6IHN1YmplY3QsXHJcbiAgICAgIGxvYWQ6IChoYW5kbGVyKSA9PiBzdWJqZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBoYW5kbGVyLCBmYWxzZSksXHJcbiAgICAgIGJpbmQ6IChldmVudCwgaGFuZGxlcikgPT4gc3ViamVjdC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyLCBmYWxzZSksXHJcbiAgICAgIHVuYmluZDogKGV2ZW50LCBoYW5kbGVyKSA9PiBzdWJqZWN0LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZXIsIGZhbHNlKVxyXG4gICAgfTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIDA6IHN1YmplY3QsXHJcblxyXG4gICAgdW5iaW5kKGV2ZW50LCBoYW5kbGVyKSB7XHJcbiAgICAgIGxldCBoYW5kbGVycyA9IGV2ZW50c1tldmVudF0gfHwgW107XHJcblxyXG4gICAgICBpZiAoaGFuZGxlcikge1xyXG4gICAgICAgIGxldCBpZHggPSBoYW5kbGVycy5pbmRleE9mKGhhbmRsZXIpO1xyXG4gICAgICAgIGlmIChpZHggIT09IC0xKSBoYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcclxuICAgICAgfSBlbHNlIGhhbmRsZXJzID0gW107XHJcblxyXG4gICAgICBldmVudHNbZXZlbnRdID0gaGFuZGxlcnM7XHJcbiAgICAgIHN1YmplY3QuZXZlbnRzID0gZXZlbnRzO1xyXG5cclxuICAgIH0sXHJcbiAgICBiaW5kKGV2ZW50LCBoYW5kbGVyKSB7XHJcbiAgICAgIGxldCBjdXJyZW50ID0gZXZlbnRzW2V2ZW50XSB8fCBbXTtcclxuICAgICAgZXZlbnRzW2V2ZW50XSA9IGN1cnJlbnQuY29uY2F0KGhhbmRsZXIpO1xyXG4gICAgICBzdWJqZWN0LmV2ZW50cyA9IGV2ZW50cztcclxuICAgIH0sXHJcbiAgICB0cmlnZ2VySGFuZGxlcihldmVudCwgYXJncykge1xyXG4gICAgICBsZXQgaGFuZGxlcnMgPSBldmVudHNbZXZlbnRdIHx8IFtdO1xyXG4gICAgICBoYW5kbGVycy5mb3JFYWNoKGZuID0+IHtcclxuICAgICAgICBpZiAoYXJncyAmJiBhcmdzWzBdICYmIGFyZ3NbMF0udHlwZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICBhcmdzID0gW3tcclxuICAgICAgICAgICAgdHlwZTogZXZlbnRcclxuICAgICAgICAgIH1dLmNvbmNhdChhcmdzIHx8IFtdKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgYXJncyA9IGFyZ3MgfHwgW107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmbi5hcHBseSh0aGlzLCBhcmdzKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxufTtcclxuXHJcbmNvbnN0IHhociA9IGZ1bmN0aW9uKCkge1xyXG4gIHRyeSB7XHJcbiAgICByZXR1cm4gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgfSBjYXRjaCAoZSkge31cclxufTtcclxuXHJcbmNvbnN0IGFqYXggPSBmdW5jdGlvbihvcHRpb25zKSB7XHJcbiAgY29uc3QgcmVxdWVzdCA9IHhocigpO1xyXG4gIHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gKCkgPT4ge1xyXG4gICAgaWYgKHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHJlcXVlc3Quc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgb3B0aW9ucy5zdWNjZXNzICYmIG9wdGlvbnMuc3VjY2VzcyhKU09OLnBhcnNlKHJlcXVlc3QucmVzcG9uc2VUZXh0KSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBvcHRpb25zLmVycm9yICYmIG9wdGlvbnMuZXJyb3IocmVxdWVzdCk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgcmVxdWVzdC5vcGVuKG9wdGlvbnMudHlwZSwgb3B0aW9ucy51cmwpO1xyXG4gIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcignY29udGVudC10eXBlJywgb3B0aW9ucy5jb250ZW50VHlwZSk7XHJcblxyXG4gIHJlcXVlc3Quc2VuZChvcHRpb25zLmRhdGEuZGF0YSAmJiBgZGF0YT0ke29wdGlvbnMuZGF0YS5kYXRhfWApO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgYWJvcnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICByZXR1cm4gcmVxdWVzdC5hYm9ydCgpO1xyXG4gICAgfVxyXG4gIH07XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBqUXVlcnlEZWZlcnJlZC5leHRlbmQoXHJcbiAganF1ZXJ5RnVuY3Rpb24sXHJcbiAgalF1ZXJ5RGVmZXJyZWQsXHJcbiAge1xyXG4gICAgZGVmYXVsdEFqYXhIZWFkZXJzOiBudWxsLFxyXG4gICAgYWpheDogYWpheCxcclxuICAgIHRyaW06IHN0ciA9PiBzdHIgJiYgc3RyLnRyaW0oKSxcclxuICAgIGlzRW1wdHlPYmplY3Q6IG9iaiA9PiAhb2JqIHx8IE9iamVjdC5rZXlzKG9iaikubGVuZ3RoID09PSAwLFxyXG4gICAgbWFrZUFycmF5OiBhcnIgPT4gW10uc2xpY2UuY2FsbChhcnIsMCksXHJcbiAgICBwYXJhbTogb2JqID0+IGpRdWVyeVBhcmFtKG9iaiksXHJcbiAgICBzdXBwb3J0OiB7XHJcbiAgICAgIGNvcnM6IChmdW5jdGlvbigpIHtcclxuICAgICAgICBjb25zdCB4aHJPYmogPSB4aHIoKTtcclxuICAgICAgICByZXR1cm4gISF4aHJPYmogJiYgKFwid2l0aENyZWRlbnRpYWxzXCIgaW4geGhyT2JqKTtcclxuICAgICAgfSkoKVxyXG4gICAgfVxyXG4gIH0pXHJcbiAgIl19