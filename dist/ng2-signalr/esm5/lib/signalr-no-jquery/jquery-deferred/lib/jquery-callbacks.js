/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import jQuery from "./jquery-core";
/** @type {?} */
var jQueryCallBack = tslib_1.__assign({}, jQuery, { Callbacks: null });
/** @type {?} */
var core_rspace = /\s+/;
// String to Object options format cache
/**
 * jQuery Callbacks
 *
 * Code from: https://github.com/jquery/jquery/blob/master/src/callbacks.js
 *
 * @type {?}
 */
var optionsCache = {};
// Convert String-formatted options into Object-formatted ones and store in cache
/**
 * @param {?} options
 * @return {?}
 */
function createOptions(options) {
    /** @type {?} */
    var object = optionsCache[options] = {};
    jQuery.each(options.split(core_rspace), (/**
     * @param {?} _
     * @param {?} flag
     * @return {?}
     */
    function (_, flag) {
        object[flag] = true;
    }));
    return object;
}
/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQueryCallBack.Callbacks = (/**
 * @param {?} options
 * @return {?}
 */
function (options) {
    // Convert options from String-formatted to Object-formatted if needed
    // (we check in cache first)
    options = typeof options === "string" ?
        (optionsCache[options] || createOptions(options)) :
        jQuery.extend({}, options);
    /** @type {?} */
    var // Last fire value (for non-forgettable lists)
    memory;
    /** @type {?} */
    var 
    // Flag to know if list was already fired
    fired;
    /** @type {?} */
    var 
    // Flag to know if list is currently firing
    firing;
    /** @type {?} */
    var 
    // First callback to fire (used internally by add and fireWith)
    firingStart;
    /** @type {?} */
    var 
    // End of the loop when firing
    firingLength;
    /** @type {?} */
    var 
    // Index of currently firing callback (modified by remove if needed)
    firingIndex;
    /** @type {?} */
    var 
    // Actual callback list
    list = [];
    /** @type {?} */
    var 
    // Stack of fire calls for repeatable lists
    stack = !options.once && [];
    /** @type {?} */
    var 
    // Fire callbacks
    fire = (/**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        memory = options.memory && data;
        fired = true;
        firingIndex = firingStart || 0;
        firingStart = 0;
        firingLength = list.length;
        firing = true;
        for (; list && firingIndex < firingLength; firingIndex++) {
            if (list[firingIndex].apply(data[0], data[1]) === false && options.stopOnFalse) {
                memory = false; // To prevent further calls using add
                break;
            }
        }
        firing = false;
        if (list) {
            if (stack) {
                if (stack.length) {
                    fire(stack.shift());
                }
            }
            else if (memory) {
                list = [];
            }
            else {
                self.disable();
            }
        }
    });
    /** @type {?} */
    var 
    // Actual Callbacks object
    self = {
        // Add a callback or a collection of callbacks to the list
        add: (/**
         * @return {?}
         */
        function () {
            if (list) {
                // First, we save the current length
                /** @type {?} */
                var start = list.length;
                ((/**
                 * @param {?} args
                 * @return {?}
                 */
                function add(args) {
                    jQuery.each(args, (/**
                     * @param {?} _
                     * @param {?} arg
                     * @return {?}
                     */
                    function (_, arg) {
                        /** @type {?} */
                        var type = jQuery.type(arg);
                        if (type === "function") {
                            if (!options.unique || !self.has(arg)) {
                                list.push(arg);
                            }
                        }
                        else if (arg && arg.length && type !== "string") {
                            // Inspect recursively
                            add(arg);
                        }
                    }));
                }))(arguments);
                // Do we need to add the callbacks to the
                // current firing batch?
                if (firing) {
                    firingLength = list.length;
                    // With memory, if we're not firing then
                    // we should call right away
                }
                else if (memory) {
                    firingStart = start;
                    fire(memory);
                }
            }
            return this;
        }),
        // Remove a callback from the list
        remove: (/**
         * @return {?}
         */
        function () {
            if (list) {
                jQuery.each(arguments, (/**
                 * @param {?} _
                 * @param {?} arg
                 * @return {?}
                 */
                function (_, arg) {
                    /** @type {?} */
                    var index;
                    while ((index = jQuery.inArray(arg, list)) > -1) {
                        list.splice(index, 1);
                        // Handle firing indexes
                        if (firing) {
                            if (index <= firingLength) {
                                firingLength--;
                            }
                            if (index <= firingIndex) {
                                firingIndex--;
                            }
                        }
                    }
                }));
            }
            return this;
        }),
        // Control if a given callback is in the list
        has: (/**
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            return jQuery.inArray(fn, list) > -1;
        }),
        // Remove all callbacks from the list
        empty: (/**
         * @return {?}
         */
        function () {
            list = [];
            return this;
        }),
        // Have the list do nothing anymore
        disable: (/**
         * @return {?}
         */
        function () {
            list = stack = memory = undefined;
            return this;
        }),
        // Is it disabled?
        disabled: (/**
         * @return {?}
         */
        function () {
            return !list;
        }),
        // Lock the list in its current state
        lock: (/**
         * @return {?}
         */
        function () {
            stack = undefined;
            if (!memory) {
                self.disable();
            }
            return this;
        }),
        // Is it locked?
        locked: (/**
         * @return {?}
         */
        function () {
            return !stack;
        }),
        // Call all callbacks with the given context and arguments
        fireWith: (/**
         * @param {?} context
         * @param {?} args
         * @return {?}
         */
        function (context, args) {
            args = args || [];
            args = [context, args.slice ? args.slice() : args];
            if (list && (!fired || stack)) {
                if (firing) {
                    stack.push(args);
                }
                else {
                    fire(args);
                }
            }
            return this;
        }),
        // Call all the callbacks with the given arguments
        fire: (/**
         * @return {?}
         */
        function () {
            self.fireWith(this, arguments);
            return this;
        }),
        // To know if the callbacks have already been called at least once
        fired: (/**
         * @return {?}
         */
        function () {
            return !!fired;
        })
    };
    return self;
});
export default jQueryCallBack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianF1ZXJ5LWNhbGxiYWNrcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1zaWduYWxyLyIsInNvdXJjZXMiOlsibGliL3NpZ25hbHItbm8tanF1ZXJ5L2pxdWVyeS1kZWZlcnJlZC9saWIvanF1ZXJ5LWNhbGxiYWNrcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sTUFBTSxNQUFNLGVBQWUsQ0FBQzs7SUFHL0IsY0FBYyx3QkFBTyxNQUFNLElBQUUsU0FBUyxFQUFFLElBQUksR0FBRTs7SUFBRSxXQUFXLEdBQUcsS0FBSzs7Ozs7Ozs7O0lBVW5FLFlBQVksR0FBRyxFQUFFOzs7Ozs7QUFHckIsU0FBUyxhQUFhLENBQUUsT0FBTzs7UUFDMUIsTUFBTSxHQUFHLFlBQVksQ0FBRSxPQUFPLENBQUUsR0FBRyxFQUFFO0lBQ3pDLE1BQU0sQ0FBQyxJQUFJLENBQUUsT0FBTyxDQUFDLEtBQUssQ0FBRSxXQUFXLENBQUU7Ozs7O0lBQUUsVUFBVSxDQUFDLEVBQUUsSUFBSTtRQUMzRCxNQUFNLENBQUUsSUFBSSxDQUFFLEdBQUcsSUFBSSxDQUFDO0lBQ3ZCLENBQUMsRUFBQyxDQUFDO0lBQ0gsT0FBTyxNQUFNLENBQUM7QUFDZixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdCRCxjQUFjLENBQUMsU0FBUzs7OztBQUFHLFVBQVUsT0FBTztJQUUzQyxzRUFBc0U7SUFDdEUsNEJBQTRCO0lBQzVCLE9BQU8sR0FBRyxPQUFPLE9BQU8sS0FBSyxRQUFRLENBQUMsQ0FBQztRQUN0QyxDQUFFLFlBQVksQ0FBRSxPQUFPLENBQUUsSUFBSSxhQUFhLENBQUUsT0FBTyxDQUFFLENBQUUsQ0FBQyxDQUFDO1FBQ3pELE1BQU0sQ0FBQyxNQUFNLENBQUUsRUFBRSxFQUFFLE9BQU8sQ0FBRSxDQUFDOztRQUUxQiw4Q0FBOEM7SUFDakQsTUFBTTs7O0lBQ04seUNBQXlDO0lBQ3pDLEtBQUs7OztJQUNMLDJDQUEyQztJQUMzQyxNQUFNOzs7SUFDTiwr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QUFDO1FBQ2IsQ0FBQyxDQUFBOztRQUVELE1BQU07OztRQUFFO1lBQ1AsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUNmLENBQUMsQ0FBQTs7UUFFRCxRQUFROzs7OztRQUFFLFVBQVUsT0FBTyxFQUFFLElBQUk7WUFDaEMsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7WUFDbEIsSUFBSSxHQUFHLENBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFFLENBQUM7WUFDckQsSUFBSyxJQUFJLElBQUksQ0FBRSxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUUsRUFBRztnQkFDbEMsSUFBSyxNQUFNLEVBQUc7b0JBQ2IsS0FBSyxDQUFDLElBQUksQ0FBRSxJQUFJLENBQUUsQ0FBQztpQkFDbkI7cUJBQU07b0JBQ04sSUFBSSxDQUFFLElBQUksQ0FBRSxDQUFDO2lCQUNiO2FBQ0Q7WUFDRCxPQUFPLElBQUksQ0FBQztRQUNiLENBQUMsQ0FBQTs7UUFFRCxJQUFJOzs7UUFBRTtZQUNMLElBQUksQ0FBQyxRQUFRLENBQUUsSUFBSSxFQUFFLFNBQVMsQ0FBRSxDQUFDO1lBQ2pDLE9BQU8sSUFBSSxDQUFDO1FBQ2IsQ0FBQyxDQUFBOztRQUVELEtBQUs7OztRQUFFO1lBQ04sT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ2hCLENBQUMsQ0FBQTtLQUNEO0lBRUYsT0FBTyxJQUFJLENBQUM7QUFDYixDQUFDLENBQUEsQ0FBQztBQUdGLGVBQWUsY0FBYyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgalF1ZXJ5IGZyb20gXCIuL2pxdWVyeS1jb3JlXCI7XG5cblxudmFyIGpRdWVyeUNhbGxCYWNrID0gey4uLmpRdWVyeSwgQ2FsbGJhY2tzOiBudWxsIH0sIGNvcmVfcnNwYWNlID0gL1xccysvO1xuLyoqXG4qIGpRdWVyeSBDYWxsYmFja3NcbipcbiogQ29kZSBmcm9tOiBodHRwczovL2dpdGh1Yi5jb20vanF1ZXJ5L2pxdWVyeS9ibG9iL21hc3Rlci9zcmMvY2FsbGJhY2tzLmpzXG4qXG4qL1xuXG5cbi8vIFN0cmluZyB0byBPYmplY3Qgb3B0aW9ucyBmb3JtYXQgY2FjaGVcbnZhciBvcHRpb25zQ2FjaGUgPSB7fTtcblxuLy8gQ29udmVydCBTdHJpbmctZm9ybWF0dGVkIG9wdGlvbnMgaW50byBPYmplY3QtZm9ybWF0dGVkIG9uZXMgYW5kIHN0b3JlIGluIGNhY2hlXG5mdW5jdGlvbiBjcmVhdGVPcHRpb25zKCBvcHRpb25zICkge1xuXHR2YXIgb2JqZWN0ID0gb3B0aW9uc0NhY2hlWyBvcHRpb25zIF0gPSB7fTtcblx0alF1ZXJ5LmVhY2goIG9wdGlvbnMuc3BsaXQoIGNvcmVfcnNwYWNlICksIGZ1bmN0aW9uKCBfLCBmbGFnICkge1xuXHRcdG9iamVjdFsgZmxhZyBdID0gdHJ1ZTtcblx0fSk7XG5cdHJldHVybiBvYmplY3Q7XG59XG5cbi8qXG4gKiBDcmVhdGUgYSBjYWxsYmFjayBsaXN0IHVzaW5nIHRoZSBmb2xsb3dpbmcgcGFyYW1ldGVyczpcbiAqXG4gKlx0b3B0aW9uczogYW4gb3B0aW9uYWwgbGlzdCBvZiBzcGFjZS1zZXBhcmF0ZWQgb3B0aW9ucyB0aGF0IHdpbGwgY2hhbmdlIGhvd1xuICpcdFx0XHR0aGUgY2FsbGJhY2sgbGlzdCBiZWhhdmVzIG9yIGEgbW9yZSB0cmFkaXRpb25hbCBvcHRpb24gb2JqZWN0XG4gKlxuICogQnkgZGVmYXVsdCBhIGNhbGxiYWNrIGxpc3Qgd2lsbCBhY3QgbGlrZSBhbiBldmVudCBjYWxsYmFjayBsaXN0IGFuZCBjYW4gYmVcbiAqIFwiZmlyZWRcIiBtdWx0aXBsZSB0aW1lcy5cbiAqXG4gKiBQb3NzaWJsZSBvcHRpb25zOlxuICpcbiAqXHRvbmNlOlx0XHRcdHdpbGwgZW5zdXJlIHRoZSBjYWxsYmFjayBsaXN0IGNhbiBvbmx5IGJlIGZpcmVkIG9uY2UgKGxpa2UgYSBEZWZlcnJlZClcbiAqXG4gKlx0bWVtb3J5Olx0XHRcdHdpbGwga2VlcCB0cmFjayBvZiBwcmV2aW91cyB2YWx1ZXMgYW5kIHdpbGwgY2FsbCBhbnkgY2FsbGJhY2sgYWRkZWRcbiAqXHRcdFx0XHRcdGFmdGVyIHRoZSBsaXN0IGhhcyBiZWVuIGZpcmVkIHJpZ2h0IGF3YXkgd2l0aCB0aGUgbGF0ZXN0IFwibWVtb3JpemVkXCJcbiAqXHRcdFx0XHRcdHZhbHVlcyAobGlrZSBhIERlZmVycmVkKVxuICpcbiAqXHR1bmlxdWU6XHRcdFx0d2lsbCBlbnN1cmUgYSBjYWxsYmFjayBjYW4gb25seSBiZSBhZGRlZCBvbmNlIChubyBkdXBsaWNhdGUgaW4gdGhlIGxpc3QpXG4gKlxuICpcdHN0b3BPbkZhbHNlOlx0aW50ZXJydXB0IGNhbGxpbmdzIHdoZW4gYSBjYWxsYmFjayByZXR1cm5zIGZhbHNlXG4gKlxuICovXG5qUXVlcnlDYWxsQmFjay5DYWxsYmFja3MgPSBmdW5jdGlvbiggb3B0aW9ucyApIHtcblxuXHQvLyBDb252ZXJ0IG9wdGlvbnMgZnJvbSBTdHJpbmctZm9ybWF0dGVkIHRvIE9iamVjdC1mb3JtYXR0ZWQgaWYgbmVlZGVkXG5cdC8vICh3ZSBjaGVjayBpbiBjYWNoZSBmaXJzdClcblx0b3B0aW9ucyA9IHR5cGVvZiBvcHRpb25zID09PSBcInN0cmluZ1wiID9cblx0XHQoIG9wdGlvbnNDYWNoZVsgb3B0aW9ucyBdIHx8IGNyZWF0ZU9wdGlvbnMoIG9wdGlvbnMgKSApIDpcblx0XHRqUXVlcnkuZXh0ZW5kKCB7fSwgb3B0aW9ucyApO1xuXG5cdHZhciAvLyBMYXN0IGZpcmUgdmFsdWUgKGZvciBub24tZm9yZ2V0dGFibGUgbGlzdHMpXG5cdFx0bWVtb3J5LFxuXHRcdC8vIEZsYWcgdG8ga25vdyBpZiBsaXN0IHdhcyBhbHJlYWR5IGZpcmVkXG5cdFx0ZmlyZWQsXG5cdFx0Ly8gRmxhZyB0byBrbm93IGlmIGxpc3QgaXMgY3VycmVudGx5IGZpcmluZ1xuXHRcdGZpcmluZyxcblx0XHQvLyBGaXJzdCBjYWxsYmFjayB0byBmaXJlICh1c2VkIGludGVybmFsbHkgYnkgYWRkIGFuZCBmaXJlV2l0aClcblx0XHRmaXJpbmdTdGFydCxcblx0XHQvLyBFbmQgb2YgdGhlIGxvb3Agd2hlbiBmaXJpbmdcblx0XHRmaXJpbmdMZW5ndGgsXG5cdFx0Ly8gSW5kZXggb2YgY3VycmVudGx5IGZpcmluZyBjYWxsYmFjayAobW9kaWZpZWQgYnkgcmVtb3ZlIGlmIG5lZWRlZClcblx0XHRmaXJpbmdJbmRleCxcblx0XHQvLyBBY3R1YWwgY2FsbGJhY2sgbGlzdFxuXHRcdGxpc3QgPSBbXSxcblx0XHQvLyBTdGFjayBvZiBmaXJlIGNhbGxzIGZvciByZXBlYXRhYmxlIGxpc3RzXG5cdFx0c3RhY2sgPSAhb3B0aW9ucy5vbmNlICYmIFtdLFxuXHRcdC8vIEZpcmUgY2FsbGJhY2tzXG5cdFx0ZmlyZSA9IGZ1bmN0aW9uKCBkYXRhICkge1xuXHRcdFx0bWVtb3J5ID0gb3B0aW9ucy5tZW1vcnkgJiYgZGF0YTtcblx0XHRcdGZpcmVkID0gdHJ1ZTtcblx0XHRcdGZpcmluZ0luZGV4ID0gZmlyaW5nU3RhcnQgfHwgMDtcblx0XHRcdGZpcmluZ1N0YXJ0ID0gMDtcblx0XHRcdGZpcmluZ0xlbmd0aCA9IGxpc3QubGVuZ3RoO1xuXHRcdFx0ZmlyaW5nID0gdHJ1ZTtcblx0XHRcdGZvciAoIDsgbGlzdCAmJiBmaXJpbmdJbmRleCA8IGZpcmluZ0xlbmd0aDsgZmlyaW5nSW5kZXgrKyApIHtcblx0XHRcdFx0aWYgKCBsaXN0WyBmaXJpbmdJbmRleCBdLmFwcGx5KCBkYXRhWyAwIF0sIGRhdGFbIDEgXSApID09PSBmYWxzZSAmJiBvcHRpb25zLnN0b3BPbkZhbHNlICkge1xuXHRcdFx0XHRcdG1lbW9yeSA9IGZhbHNlOyAvLyBUbyBwcmV2ZW50IGZ1cnRoZXIgY2FsbHMgdXNpbmcgYWRkXG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGZpcmluZyA9IGZhbHNlO1xuXHRcdFx0aWYgKCBsaXN0ICkge1xuXHRcdFx0XHRpZiAoIHN0YWNrICkge1xuXHRcdFx0XHRcdGlmICggc3RhY2subGVuZ3RoICkge1xuXHRcdFx0XHRcdFx0ZmlyZSggc3RhY2suc2hpZnQoKSApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIGlmICggbWVtb3J5ICkge1xuXHRcdFx0XHRcdGxpc3QgPSBbXTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRzZWxmLmRpc2FibGUoKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cdFx0Ly8gQWN0dWFsIENhbGxiYWNrcyBvYmplY3Rcblx0XHRzZWxmID0ge1xuXHRcdFx0Ly8gQWRkIGEgY2FsbGJhY2sgb3IgYSBjb2xsZWN0aW9uIG9mIGNhbGxiYWNrcyB0byB0aGUgbGlzdFxuXHRcdFx0YWRkOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYgKCBsaXN0ICkge1xuXHRcdFx0XHRcdC8vIEZpcnN0LCB3ZSBzYXZlIHRoZSBjdXJyZW50IGxlbmd0aFxuXHRcdFx0XHRcdHZhciBzdGFydCA9IGxpc3QubGVuZ3RoO1xuXHRcdFx0XHRcdChmdW5jdGlvbiBhZGQoIGFyZ3MgKSB7XG5cdFx0XHRcdFx0XHRqUXVlcnkuZWFjaCggYXJncywgZnVuY3Rpb24oIF8sIGFyZyApIHtcblx0XHRcdFx0XHRcdFx0dmFyIHR5cGUgPSBqUXVlcnkudHlwZSggYXJnICk7XG5cdFx0XHRcdFx0XHRcdGlmICggdHlwZSA9PT0gXCJmdW5jdGlvblwiICkge1xuXHRcdFx0XHRcdFx0XHRcdGlmICggIW9wdGlvbnMudW5pcXVlIHx8ICFzZWxmLmhhcyggYXJnICkgKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRsaXN0LnB1c2goIGFyZyApO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmICggYXJnICYmIGFyZy5sZW5ndGggJiYgdHlwZSAhPT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdFx0XHRcdFx0XHQvLyBJbnNwZWN0IHJlY3Vyc2l2ZWx5XG5cdFx0XHRcdFx0XHRcdFx0YWRkKCBhcmcgKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fSkoIGFyZ3VtZW50cyApO1xuXHRcdFx0XHRcdC8vIERvIHdlIG5lZWQgdG8gYWRkIHRoZSBjYWxsYmFja3MgdG8gdGhlXG5cdFx0XHRcdFx0Ly8gY3VycmVudCBmaXJpbmcgYmF0Y2g/XG5cdFx0XHRcdFx0aWYgKCBmaXJpbmcgKSB7XG5cdFx0XHRcdFx0XHRmaXJpbmdMZW5ndGggPSBsaXN0Lmxlbmd0aDtcblx0XHRcdFx0XHQvLyBXaXRoIG1lbW9yeSwgaWYgd2UncmUgbm90IGZpcmluZyB0aGVuXG5cdFx0XHRcdFx0Ly8gd2Ugc2hvdWxkIGNhbGwgcmlnaHQgYXdheVxuXHRcdFx0XHRcdH0gZWxzZSBpZiAoIG1lbW9yeSApIHtcblx0XHRcdFx0XHRcdGZpcmluZ1N0YXJ0ID0gc3RhcnQ7XG5cdFx0XHRcdFx0XHRmaXJlKCBtZW1vcnkgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9LFxuXHRcdFx0Ly8gUmVtb3ZlIGEgY2FsbGJhY2sgZnJvbSB0aGUgbGlzdFxuXHRcdFx0cmVtb3ZlOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYgKCBsaXN0ICkge1xuXHRcdFx0XHRcdGpRdWVyeS5lYWNoKCBhcmd1bWVudHMsIGZ1bmN0aW9uKCBfLCBhcmcgKSB7XG5cdFx0XHRcdFx0XHR2YXIgaW5kZXg7XG5cdFx0XHRcdFx0XHR3aGlsZSggKCBpbmRleCA9IGpRdWVyeS5pbkFycmF5KCBhcmcsIGxpc3QgKSApID4gLTEgKSB7XG5cdFx0XHRcdFx0XHRcdGxpc3Quc3BsaWNlKCBpbmRleCwgMSApO1xuXHRcdFx0XHRcdFx0XHQvLyBIYW5kbGUgZmlyaW5nIGluZGV4ZXNcblx0XHRcdFx0XHRcdFx0aWYgKCBmaXJpbmcgKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKCBpbmRleCA8PSBmaXJpbmdMZW5ndGggKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRmaXJpbmdMZW5ndGgtLTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0aWYgKCBpbmRleCA8PSBmaXJpbmdJbmRleCApIHtcblx0XHRcdFx0XHRcdFx0XHRcdGZpcmluZ0luZGV4LS07XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9LFxuXHRcdFx0Ly8gQ29udHJvbCBpZiBhIGdpdmVuIGNhbGxiYWNrIGlzIGluIHRoZSBsaXN0XG5cdFx0XHRoYXM6IGZ1bmN0aW9uKCBmbiApIHtcblx0XHRcdFx0cmV0dXJuIGpRdWVyeS5pbkFycmF5KCBmbiwgbGlzdCApID4gLTE7XG5cdFx0XHR9LFxuXHRcdFx0Ly8gUmVtb3ZlIGFsbCBjYWxsYmFja3MgZnJvbSB0aGUgbGlzdFxuXHRcdFx0ZW1wdHk6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRsaXN0ID0gW107XG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fSxcblx0XHRcdC8vIEhhdmUgdGhlIGxpc3QgZG8gbm90aGluZyBhbnltb3JlXG5cdFx0XHRkaXNhYmxlOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0bGlzdCA9IHN0YWNrID0gbWVtb3J5ID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH0sXG5cdFx0XHQvLyBJcyBpdCBkaXNhYmxlZD9cblx0XHRcdGRpc2FibGVkOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuICFsaXN0O1xuXHRcdFx0fSxcblx0XHRcdC8vIExvY2sgdGhlIGxpc3QgaW4gaXRzIGN1cnJlbnQgc3RhdGVcblx0XHRcdGxvY2s6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRzdGFjayA9IHVuZGVmaW5lZDtcblx0XHRcdFx0aWYgKCAhbWVtb3J5ICkge1xuXHRcdFx0XHRcdHNlbGYuZGlzYWJsZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fSxcblx0XHRcdC8vIElzIGl0IGxvY2tlZD9cblx0XHRcdGxvY2tlZDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiAhc3RhY2s7XG5cdFx0XHR9LFxuXHRcdFx0Ly8gQ2FsbCBhbGwgY2FsbGJhY2tzIHdpdGggdGhlIGdpdmVuIGNvbnRleHQgYW5kIGFyZ3VtZW50c1xuXHRcdFx0ZmlyZVdpdGg6IGZ1bmN0aW9uKCBjb250ZXh0LCBhcmdzICkge1xuXHRcdFx0XHRhcmdzID0gYXJncyB8fCBbXTtcblx0XHRcdFx0YXJncyA9IFsgY29udGV4dCwgYXJncy5zbGljZSA/IGFyZ3Muc2xpY2UoKSA6IGFyZ3MgXTtcblx0XHRcdFx0aWYgKCBsaXN0ICYmICggIWZpcmVkIHx8IHN0YWNrICkgKSB7XG5cdFx0XHRcdFx0aWYgKCBmaXJpbmcgKSB7XG5cdFx0XHRcdFx0XHRzdGFjay5wdXNoKCBhcmdzICk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGZpcmUoIGFyZ3MgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9LFxuXHRcdFx0Ly8gQ2FsbCBhbGwgdGhlIGNhbGxiYWNrcyB3aXRoIHRoZSBnaXZlbiBhcmd1bWVudHNcblx0XHRcdGZpcmU6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRzZWxmLmZpcmVXaXRoKCB0aGlzLCBhcmd1bWVudHMgKTtcblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9LFxuXHRcdFx0Ly8gVG8ga25vdyBpZiB0aGUgY2FsbGJhY2tzIGhhdmUgYWxyZWFkeSBiZWVuIGNhbGxlZCBhdCBsZWFzdCBvbmNlXG5cdFx0XHRmaXJlZDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiAhIWZpcmVkO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0cmV0dXJuIHNlbGY7XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IGpRdWVyeUNhbGxCYWNrOyJdfQ==