/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*!
* jquery-deferred
* Copyright(c) 2011 Hidden <zzdhidden@gmail.com>
* MIT Licensed
*/
/**
* Library version.
*/
import jQuery from "./jquery-callbacks";
/** @type {?} */
var core_slice = Array.prototype.slice;
/**
* jQuery deferred
*
* Code from: https://github.com/jquery/jquery/blob/master/src/deferred.js
* Doc: http://api.jquery.com/category/deferred-object/
*
*/
jQuery.extend({
    Deferred: (/**
     * @param {?} func
     * @return {?}
     */
    function (func) {
        /** @type {?} */
        var tuples = [
            // action, add listener, listener list, final state
            ["resolve", "done", jQuery.Callbacks("once memory"), "resolved"],
            ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"],
            ["notify", "progress", jQuery.Callbacks("memory")]
        ];
        /** @type {?} */
        var state = "pending";
        /** @type {?} */
        var promise = {
            state: (/**
             * @return {?}
             */
            function () {
                return state;
            }),
            always: (/**
             * @return {?}
             */
            function () {
                deferred.done(arguments).fail(arguments);
                return this;
            }),
            pipe: undefined,
            then: (/**
             * @return {?}
             */
            function ( /* fnDone, fnFail, fnProgress */) {
                /** @type {?} */
                var fns = arguments;
                return this.Deferred((/**
                 * @param {?} newDefer
                 * @return {?}
                 */
                function (newDefer) {
                    jQuery.each(tuples, (/**
                     * @param {?} i
                     * @param {?} tuple
                     * @return {?}
                     */
                    function (i, tuple) {
                        /** @type {?} */
                        var action = tuple[0];
                        /** @type {?} */
                        var fn = fns[i];
                        // deferred[ done | fail | progress ] for forwarding actions to newDefer
                        deferred[tuple[1]](jQuery.isFunction(fn) ?
                            (/**
                             * @return {?}
                             */
                            function () {
                                /** @type {?} */
                                var returned = fn.apply(this, arguments);
                                if (returned && jQuery.isFunction(returned.promise)) {
                                    returned.promise()
                                        .done(newDefer.resolve)
                                        .fail(newDefer.reject)
                                        .progress(newDefer.notify);
                                }
                                else {
                                    newDefer[action + "With"](this === deferred ? newDefer : this, [returned]);
                                }
                            }) :
                            newDefer[action]);
                    }));
                    fns = null;
                })).promise();
            }),
            // Get a promise for this deferred
            // If obj is provided, the promise aspect is added to the object
            promise: (/**
             * @param {?} obj
             * @return {?}
             */
            function (obj) {
                return obj != null ? jQuery.extend(obj, promise) : promise;
            })
        };
        /** @type {?} */
        var deferred = {
            done: undefined
        };
        // Keep pipe for back-compat
        promise.pipe = promise.then;
        // Add list-specific methods
        jQuery.each(tuples, (/**
         * @param {?} i
         * @param {?} tuple
         * @return {?}
         */
        function (i, tuple) {
            /** @type {?} */
            var list = tuple[2];
            /** @type {?} */
            var stateString = tuple[3];
            // promise[ done | fail | progress ] = list.add
            promise[tuple[1]] = list.add;
            // Handle state
            if (stateString) {
                list.add((/**
                 * @return {?}
                 */
                function () {
                    // state = [ resolved | rejected ]
                    state = stateString;
                    // [ reject_list | resolve_list ].disable; progress_list.lock
                }), tuples[i ^ 1][2].disable, tuples[2][2].lock);
            }
            // deferred[ resolve | reject | notify ] = list.fire
            deferred[tuple[0]] = list.fire;
            deferred[tuple[0] + "With"] = list.fireWith;
        }));
        // Make the deferred a promise
        promise.promise(deferred);
        // Call given func if any
        if (func) {
            func.call(deferred, deferred);
        }
        // All done!
        return deferred;
    }),
    // Deferred helper
    when: (/**
     * @param {?} subordinate
     * @return {?}
     */
    function (subordinate /* , ..., subordinateN */) {
        /** @type {?} */
        var i = 0;
        /** @type {?} */
        var resolveValues = core_slice.call(arguments);
        /** @type {?} */
        var length = resolveValues.length;
        /** @type {?} */
        var 
        // the count of uncompleted subordinates
        remaining = length !== 1 || (subordinate && jQuery.isFunction(subordinate.promise)) ? length : 0;
        /** @type {?} */
        var 
        // the master Deferred. If resolveValues consist of only a single Deferred, just use that.
        deferred = remaining === 1 ? subordinate : this.Deferred();
        /** @type {?} */
        var 
        // Update function for both resolve and progress values
        updateFunc = (/**
         * @param {?} i
         * @param {?} contexts
         * @param {?} values
         * @return {?}
         */
        function (i, contexts, values) {
            return (/**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                contexts[i] = this;
                values[i] = arguments.length > 1 ? core_slice.call(arguments) : value;
                if (values === progressValues) {
                    deferred.notifyWith(contexts, values);
                }
                else if (!(--remaining)) {
                    deferred.resolveWith(contexts, values);
                }
            });
        });
        /** @type {?} */
        var progressValues;
        /** @type {?} */
        var progressContexts;
        /** @type {?} */
        var resolveContexts;
        // add listeners to Deferred subordinates; treat others as resolved
        if (length > 1) {
            progressValues = new Array(length);
            progressContexts = new Array(length);
            resolveContexts = new Array(length);
            for (; i < length; i++) {
                if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) {
                    resolveValues[i].promise()
                        .done(updateFunc(i, resolveContexts, resolveValues))
                        .fail(deferred.reject)
                        .progress(updateFunc(i, progressContexts, progressValues));
                }
                else {
                    --remaining;
                }
            }
        }
        // if we're not waiting on anything, resolve the master
        if (!remaining) {
            deferred.resolveWith(resolveContexts, resolveValues);
        }
        return deferred.promise();
    })
});
export default jQuery;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianF1ZXJ5LWRlZmVycmVkLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLXNpZ25hbHIvIiwic291cmNlcyI6WyJsaWIvc2lnbmFsci1uby1qcXVlcnkvanF1ZXJ5LWRlZmVycmVkL2xpYi9qcXVlcnktZGVmZXJyZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBV0EsT0FBTyxNQUFNLE1BQU0sb0JBQW9CLENBQUM7O0lBQ3BDLFVBQVUsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUs7Ozs7Ozs7O0FBVXRDLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFFYixRQUFROzs7O0lBQUUsVUFBVSxJQUFJOztZQUNuQixNQUFNLEdBQUc7WUFDWCxtREFBbUQ7WUFDbkQsQ0FBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEVBQUUsVUFBVSxDQUFFO1lBQ2xFLENBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxFQUFFLFVBQVUsQ0FBRTtZQUNqRSxDQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBRTtTQUNwRDs7WUFDRCxLQUFLLEdBQUcsU0FBUzs7WUFDakIsT0FBTyxHQUFHO1lBQ1QsS0FBSzs7O1lBQUU7Z0JBQ04sT0FBTyxLQUFLLENBQUM7WUFDZCxDQUFDLENBQUE7WUFDRCxNQUFNOzs7WUFBRTtnQkFDUCxRQUFRLENBQUMsSUFBSSxDQUFFLFNBQVMsQ0FBRSxDQUFDLElBQUksQ0FBRSxTQUFTLENBQUUsQ0FBQztnQkFDN0MsT0FBTyxJQUFJLENBQUM7WUFDYixDQUFDLENBQUE7WUFDRCxJQUFJLEVBQUUsU0FBUztZQUNmLElBQUk7OztZQUFFLFdBQVUsZ0NBQWdDOztvQkFDM0MsR0FBRyxHQUFHLFNBQVM7Z0JBQ25CLE9BQU8sSUFBSSxDQUFDLFFBQVE7Ozs7Z0JBQUMsVUFBVSxRQUFR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dXJjZXNDb250ZW50IjpbIlxuLyohXG4qIGpxdWVyeS1kZWZlcnJlZFxuKiBDb3B5cmlnaHQoYykgMjAxMSBIaWRkZW4gPHp6ZGhpZGRlbkBnbWFpbC5jb20+XG4qIE1JVCBMaWNlbnNlZFxuKi9cblxuLyoqXG4qIExpYnJhcnkgdmVyc2lvbi5cbiovXG5cbmltcG9ydCBqUXVlcnkgZnJvbSBcIi4vanF1ZXJ5LWNhbGxiYWNrc1wiO1xudmFyIGNvcmVfc2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG5cbi8qKlxuKiBqUXVlcnkgZGVmZXJyZWRcbipcbiogQ29kZSBmcm9tOiBodHRwczovL2dpdGh1Yi5jb20vanF1ZXJ5L2pxdWVyeS9ibG9iL21hc3Rlci9zcmMvZGVmZXJyZWQuanNcbiogRG9jOiBodHRwOi8vYXBpLmpxdWVyeS5jb20vY2F0ZWdvcnkvZGVmZXJyZWQtb2JqZWN0L1xuKlxuKi9cblxualF1ZXJ5LmV4dGVuZCh7XG5cblx0RGVmZXJyZWQ6IGZ1bmN0aW9uKCBmdW5jICkge1xuXHRcdHZhciB0dXBsZXMgPSBbXG5cdFx0XHRcdC8vIGFjdGlvbiwgYWRkIGxpc3RlbmVyLCBsaXN0ZW5lciBsaXN0LCBmaW5hbCBzdGF0ZVxuXHRcdFx0XHRbIFwicmVzb2x2ZVwiLCBcImRvbmVcIiwgalF1ZXJ5LkNhbGxiYWNrcyhcIm9uY2UgbWVtb3J5XCIpLCBcInJlc29sdmVkXCIgXSxcblx0XHRcdFx0WyBcInJlamVjdFwiLCBcImZhaWxcIiwgalF1ZXJ5LkNhbGxiYWNrcyhcIm9uY2UgbWVtb3J5XCIpLCBcInJlamVjdGVkXCIgXSxcblx0XHRcdFx0WyBcIm5vdGlmeVwiLCBcInByb2dyZXNzXCIsIGpRdWVyeS5DYWxsYmFja3MoXCJtZW1vcnlcIikgXVxuXHRcdFx0XSxcblx0XHRcdHN0YXRlID0gXCJwZW5kaW5nXCIsXG5cdFx0XHRwcm9taXNlID0ge1xuXHRcdFx0XHRzdGF0ZTogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHN0YXRlO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRhbHdheXM6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdGRlZmVycmVkLmRvbmUoIGFyZ3VtZW50cyApLmZhaWwoIGFyZ3VtZW50cyApO1xuXHRcdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRwaXBlOiB1bmRlZmluZWQsXG5cdFx0XHRcdHRoZW46IGZ1bmN0aW9uKCAvKiBmbkRvbmUsIGZuRmFpbCwgZm5Qcm9ncmVzcyAqLyApIHtcblx0XHRcdFx0XHR2YXIgZm5zID0gYXJndW1lbnRzO1xuXHRcdFx0XHRcdHJldHVybiB0aGlzLkRlZmVycmVkKGZ1bmN0aW9uKCBuZXdEZWZlciApIHtcblx0XHRcdFx0XHRcdGpRdWVyeS5lYWNoKCB0dXBsZXMsIGZ1bmN0aW9uKCBpLCB0dXBsZSApIHtcblx0XHRcdFx0XHRcdFx0dmFyIGFjdGlvbiA9IHR1cGxlWyAwIF0sXG5cdFx0XHRcdFx0XHRcdFx0Zm4gPSBmbnNbIGkgXTtcblx0XHRcdFx0XHRcdFx0Ly8gZGVmZXJyZWRbIGRvbmUgfCBmYWlsIHwgcHJvZ3Jlc3MgXSBmb3IgZm9yd2FyZGluZyBhY3Rpb25zIHRvIG5ld0RlZmVyXG5cdFx0XHRcdFx0XHRcdGRlZmVycmVkWyB0dXBsZVsxXSBdKCBqUXVlcnkuaXNGdW5jdGlvbiggZm4gKSA/XG5cdFx0XHRcdFx0XHRcdFx0ZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHR2YXIgcmV0dXJuZWQgPSBmbi5hcHBseSggdGhpcywgYXJndW1lbnRzICk7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoIHJldHVybmVkICYmIGpRdWVyeS5pc0Z1bmN0aW9uKCByZXR1cm5lZC5wcm9taXNlICkgKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybmVkLnByb21pc2UoKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC5kb25lKCBuZXdEZWZlci5yZXNvbHZlIClcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQuZmFpbCggbmV3RGVmZXIucmVqZWN0IClcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQucHJvZ3Jlc3MoIG5ld0RlZmVyLm5vdGlmeSApO1xuXHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0bmV3RGVmZXJbIGFjdGlvbiArIFwiV2l0aFwiIF0oIHRoaXMgPT09IGRlZmVycmVkID8gbmV3RGVmZXIgOiB0aGlzLCBbIHJldHVybmVkIF0gKTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9IDpcblx0XHRcdFx0XHRcdFx0XHRuZXdEZWZlclsgYWN0aW9uIF1cblx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0Zm5zID0gbnVsbDtcblx0XHRcdFx0XHR9KS5wcm9taXNlKCk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdC8vIEdldCBhIHByb21pc2UgZm9yIHRoaXMgZGVmZXJyZWRcblx0XHRcdFx0Ly8gSWYgb2JqIGlzIHByb3ZpZGVkLCB0aGUgcHJvbWlzZSBhc3BlY3QgaXMgYWRkZWQgdG8gdGhlIG9iamVjdFxuXHRcdFx0XHRwcm9taXNlOiBmdW5jdGlvbiggb2JqICkge1xuXHRcdFx0XHRcdHJldHVybiBvYmogIT0gbnVsbCA/IGpRdWVyeS5leHRlbmQoIG9iaiwgcHJvbWlzZSApIDogcHJvbWlzZTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGRlZmVycmVkID0ge1xuXHRcdFx0XHRkb25lOiB1bmRlZmluZWRcblx0XHRcdH07XG5cblx0XHQvLyBLZWVwIHBpcGUgZm9yIGJhY2stY29tcGF0XG5cdFx0cHJvbWlzZS5waXBlID0gcHJvbWlzZS50aGVuO1xuXG5cdFx0Ly8gQWRkIGxpc3Qtc3BlY2lmaWMgbWV0aG9kc1xuXHRcdGpRdWVyeS5lYWNoKCB0dXBsZXMsIGZ1bmN0aW9uKCBpLCB0dXBsZSApIHtcblx0XHRcdHZhciBsaXN0ID0gdHVwbGVbIDIgXSxcblx0XHRcdFx0c3RhdGVTdHJpbmcgPSB0dXBsZVsgMyBdO1xuXG5cdFx0XHQvLyBwcm9taXNlWyBkb25lIHwgZmFpbCB8IHByb2dyZXNzIF0gPSBsaXN0LmFkZFxuXHRcdFx0cHJvbWlzZVsgdHVwbGVbMV0gXSA9IGxpc3QuYWRkO1xuXG5cdFx0XHQvLyBIYW5kbGUgc3RhdGVcblx0XHRcdGlmICggc3RhdGVTdHJpbmcgKSB7XG5cdFx0XHRcdGxpc3QuYWRkKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdC8vIHN0YXRlID0gWyByZXNvbHZlZCB8IHJlamVjdGVkIF1cblx0XHRcdFx0XHRzdGF0ZSA9IHN0YXRlU3RyaW5nO1xuXG5cdFx0XHRcdC8vIFsgcmVqZWN0X2xpc3QgfCByZXNvbHZlX2xpc3QgXS5kaXNhYmxlOyBwcm9ncmVzc19saXN0LmxvY2tcblx0XHRcdFx0fSwgdHVwbGVzWyBpIF4gMSBdWyAyIF0uZGlzYWJsZSwgdHVwbGVzWyAyIF1bIDIgXS5sb2NrICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIGRlZmVycmVkWyByZXNvbHZlIHwgcmVqZWN0IHwgbm90aWZ5IF0gPSBsaXN0LmZpcmVcblx0XHRcdGRlZmVycmVkWyB0dXBsZVswXSBdID0gbGlzdC5maXJlO1xuXHRcdFx0ZGVmZXJyZWRbIHR1cGxlWzBdICsgXCJXaXRoXCIgXSA9IGxpc3QuZmlyZVdpdGg7XG5cdFx0fSk7XG5cblx0XHQvLyBNYWtlIHRoZSBkZWZlcnJlZCBhIHByb21pc2Vcblx0XHRwcm9taXNlLnByb21pc2UoIGRlZmVycmVkICk7XG5cblx0XHQvLyBDYWxsIGdpdmVuIGZ1bmMgaWYgYW55XG5cdFx0aWYgKCBmdW5jICkge1xuXHRcdFx0ZnVuYy5jYWxsKCBkZWZlcnJlZCwgZGVmZXJyZWQgKTtcblx0XHR9XG5cblx0XHQvLyBBbGwgZG9uZSFcblx0XHRyZXR1cm4gZGVmZXJyZWQ7XG5cdH0sXG5cblx0Ly8gRGVmZXJyZWQgaGVscGVyXG5cdHdoZW46IGZ1bmN0aW9uKCBzdWJvcmRpbmF0ZSAvKiAsIC4uLiwgc3Vib3JkaW5hdGVOICovICkge1xuXHRcdHZhciBpID0gMCxcblx0XHRcdHJlc29sdmVWYWx1ZXMgPSBjb3JlX3NsaWNlLmNhbGwoIGFyZ3VtZW50cyApLFxuXHRcdFx0bGVuZ3RoID0gcmVzb2x2ZVZhbHVlcy5sZW5ndGgsXG5cblx0XHRcdC8vIHRoZSBjb3VudCBvZiB1bmNvbXBsZXRlZCBzdWJvcmRpbmF0ZXNcblx0XHRcdHJlbWFpbmluZyA9IGxlbmd0aCAhPT0gMSB8fCAoIHN1Ym9yZGluYXRlICYmIGpRdWVyeS5pc0Z1bmN0aW9uKCBzdWJvcmRpbmF0ZS5wcm9taXNlICkgKSA/IGxlbmd0aCA6IDAsXG5cblx0XHRcdC8vIHRoZSBtYXN0ZXIgRGVmZXJyZWQuIElmIHJlc29sdmVWYWx1ZXMgY29uc2lzdCBvZiBvbmx5IGEgc2luZ2xlIERlZmVycmVkLCBqdXN0IHVzZSB0aGF0LlxuXHRcdFx0ZGVmZXJyZWQgPSByZW1haW5pbmcgPT09IDEgPyBzdWJvcmRpbmF0ZSA6IHRoaXMuRGVmZXJyZWQoKSxcblxuXHRcdFx0Ly8gVXBkYXRlIGZ1bmN0aW9uIGZvciBib3RoIHJlc29sdmUgYW5kIHByb2dyZXNzIHZhbHVlc1xuXHRcdFx0dXBkYXRlRnVuYyA9IGZ1bmN0aW9uKCBpLCBjb250ZXh0cywgdmFsdWVzICkge1xuXHRcdFx0XHRyZXR1cm4gZnVuY3Rpb24oIHZhbHVlICkge1xuXHRcdFx0XHRcdGNvbnRleHRzWyBpIF0gPSB0aGlzO1xuXHRcdFx0XHRcdHZhbHVlc1sgaSBdID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBjb3JlX3NsaWNlLmNhbGwoIGFyZ3VtZW50cyApIDogdmFsdWU7XG5cdFx0XHRcdFx0aWYoIHZhbHVlcyA9PT0gcHJvZ3Jlc3NWYWx1ZXMgKSB7XG5cdFx0XHRcdFx0XHRkZWZlcnJlZC5ub3RpZnlXaXRoKCBjb250ZXh0cywgdmFsdWVzICk7XG5cdFx0XHRcdFx0fSBlbHNlIGlmICggISggLS1yZW1haW5pbmcgKSApIHtcblx0XHRcdFx0XHRcdGRlZmVycmVkLnJlc29sdmVXaXRoKCBjb250ZXh0cywgdmFsdWVzICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9O1xuXHRcdFx0fSxcblxuXHRcdFx0cHJvZ3Jlc3NWYWx1ZXMsIHByb2dyZXNzQ29udGV4dHMsIHJlc29sdmVDb250ZXh0cztcblxuXHRcdC8vIGFkZCBsaXN0ZW5lcnMgdG8gRGVmZXJyZWQgc3Vib3JkaW5hdGVzOyB0cmVhdCBvdGhlcnMgYXMgcmVzb2x2ZWRcblx0XHRpZiAoIGxlbmd0aCA+IDEgKSB7XG5cdFx0XHRwcm9ncmVzc1ZhbHVlcyA9IG5ldyBBcnJheSggbGVuZ3RoICk7XG5cdFx0XHRwcm9ncmVzc0NvbnRleHRzID0gbmV3IEFycmF5KCBsZW5ndGggKTtcblx0XHRcdHJlc29sdmVDb250ZXh0cyA9IG5ldyBBcnJheSggbGVuZ3RoICk7XG5cdFx0XHRmb3IgKCA7IGkgPCBsZW5ndGg7IGkrKyApIHtcblx0XHRcdFx0aWYgKCByZXNvbHZlVmFsdWVzWyBpIF0gJiYgalF1ZXJ5LmlzRnVuY3Rpb24oIHJlc29sdmVWYWx1ZXNbIGkgXS5wcm9taXNlICkgKSB7XG5cdFx0XHRcdFx0cmVzb2x2ZVZhbHVlc1sgaSBdLnByb21pc2UoKVxuXHRcdFx0XHRcdFx0LmRvbmUoIHVwZGF0ZUZ1bmMoIGksIHJlc29sdmVDb250ZXh0cywgcmVzb2x2ZVZhbHVlcyApIClcblx0XHRcdFx0XHRcdC5mYWlsKCBkZWZlcnJlZC5yZWplY3QgKVxuXHRcdFx0XHRcdFx0LnByb2dyZXNzKCB1cGRhdGVGdW5jKCBpLCBwcm9ncmVzc0NvbnRleHRzLCBwcm9ncmVzc1ZhbHVlcyApICk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0LS1yZW1haW5pbmc7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBpZiB3ZSdyZSBub3Qgd2FpdGluZyBvbiBhbnl0aGluZywgcmVzb2x2ZSB0aGUgbWFzdGVyXG5cdFx0aWYgKCAhcmVtYWluaW5nICkge1xuXHRcdFx0ZGVmZXJyZWQucmVzb2x2ZVdpdGgoIHJlc29sdmVDb250ZXh0cywgcmVzb2x2ZVZhbHVlcyApO1xuXHRcdH1cblxuXHRcdHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG5cdH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBqUXVlcnk7Il19