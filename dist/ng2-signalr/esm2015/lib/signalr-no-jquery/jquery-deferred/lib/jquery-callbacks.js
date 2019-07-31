/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import jQuery from "./jquery-core";
/** @type {?} */
var jQueryCallBack = Object.assign({}, jQuery, { Callbacks: null });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianF1ZXJ5LWNhbGxiYWNrcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1zaWduYWxyLyIsInNvdXJjZXMiOlsibGliL3NpZ25hbHItbm8tanF1ZXJ5L2pxdWVyeS1kZWZlcnJlZC9saWIvanF1ZXJ5LWNhbGxiYWNrcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxNQUFNLE1BQU0sZUFBZSxDQUFDOztJQUcvQixjQUFjLHFCQUFPLE1BQU0sSUFBRSxTQUFTLEVBQUUsSUFBSSxHQUFFOztJQUFFLFdBQVcsR0FBRyxLQUFLOzs7Ozs7Ozs7SUFVbkUsWUFBWSxHQUFHLEVBQUU7Ozs7OztBQUdyQixTQUFTLGFBQWEsQ0FBRSxPQUFPOztRQUMxQixNQUFNLEdBQUcsWUFBWSxDQUFFLE9BQU8sQ0FBRSxHQUFHLEVBQUU7SUFDekMsTUFBTSxDQUFDLElBQUksQ0FBRSxPQUFPLENBQUMsS0FBSyxDQUFFLFdBQVcsQ0FBRTs7Ozs7SUFBRSxVQUFVLENBQUMsRUFBRSxJQUFJO1FBQzNELE1BQU0sQ0FBRSxJQUFJLENBQUUsR0FBRyxJQUFJLENBQUM7SUFDdkIsQ0FBQyxFQUFDLENBQUM7SUFDSCxPQUFPLE1BQU0sQ0FBQztBQUNmLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBd0JELGNBQWMsQ0FBQyxTQUFTOzs7O0FBQUcsVUFBVSxPQUFPO0lBRTNDLHNFQUFzRTtJQUN0RSw0QkFBNEI7SUFDNUIsT0FBTyxHQUFHLE9BQU8sT0FBTyxLQUFLLFFBQVEsQ0FBQyxDQUFDO1FBQ3RDLENBQUUsWUFBWSxDQUFFLE9BQU8sQ0FBRSxJQUFJLGFBQWEsQ0FBRSxPQUFPLENBQUUsQ0FBRSxDQUFDLENBQUM7UUFDekQsTUFBTSxDQUFDLE1BQU0sQ0FBRSxFQUFFLEVBQUUsT0FBTyxDQUFFLENBQUM7O1FBRTFCLDhDQUE4QztJQUNqRCxNQUFNOzs7SUFDTix5Q0FBeUM7SUFDekMsS0FBSzs7O0lBQ0wsMkNBQTJDO0lBQzNDLE1BQU07OztJQUNOLCtE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QUM7UUFDYixDQUFDLENBQUE7O1FBRUQsTUFBTTs7O1FBQUU7WUFDUCxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQ2YsQ0FBQyxDQUFBOztRQUVELFFBQVE7Ozs7O1FBQUUsVUFBVSxPQUFPLEVBQUUsSUFBSTtZQUNoQyxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUNsQixJQUFJLEdBQUcsQ0FBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUUsQ0FBQztZQUNyRCxJQUFLLElBQUksSUFBSSxDQUFFLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBRSxFQUFHO2dCQUNsQyxJQUFLLE1BQU0sRUFBRztvQkFDYixLQUFLLENBQUMsSUFBSSxDQUFFLElBQUksQ0FBRSxDQUFDO2lCQUNuQjtxQkFBTTtvQkFDTixJQUFJLENBQUUsSUFBSSxDQUFFLENBQUM7aUJBQ2I7YUFDRDtZQUNELE9BQU8sSUFBSSxDQUFDO1FBQ2IsQ0FBQyxDQUFBOztRQUVELElBQUk7OztRQUFFO1lBQ0wsSUFBSSxDQUFDLFFBQVEsQ0FBRSxJQUFJLEVBQUUsU0FBUyxDQUFFLENBQUM7WUFDakMsT0FBTyxJQUFJLENBQUM7UUFDYixDQUFDLENBQUE7O1FBRUQsS0FBSzs7O1FBQUU7WUFDTixPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDaEIsQ0FBQyxDQUFBO0tBQ0Q7SUFFRixPQUFPLElBQUksQ0FBQztBQUNiLENBQUMsQ0FBQSxDQUFDO0FBR0YsZUFBZSxjQUFjLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCBqUXVlcnkgZnJvbSBcIi4vanF1ZXJ5LWNvcmVcIjtcblxuXG52YXIgalF1ZXJ5Q2FsbEJhY2sgPSB7Li4ualF1ZXJ5LCBDYWxsYmFja3M6IG51bGwgfSwgY29yZV9yc3BhY2UgPSAvXFxzKy87XG4vKipcbiogalF1ZXJ5IENhbGxiYWNrc1xuKlxuKiBDb2RlIGZyb206IGh0dHBzOi8vZ2l0aHViLmNvbS9qcXVlcnkvanF1ZXJ5L2Jsb2IvbWFzdGVyL3NyYy9jYWxsYmFja3MuanNcbipcbiovXG5cblxuLy8gU3RyaW5nIHRvIE9iamVjdCBvcHRpb25zIGZvcm1hdCBjYWNoZVxudmFyIG9wdGlvbnNDYWNoZSA9IHt9O1xuXG4vLyBDb252ZXJ0IFN0cmluZy1mb3JtYXR0ZWQgb3B0aW9ucyBpbnRvIE9iamVjdC1mb3JtYXR0ZWQgb25lcyBhbmQgc3RvcmUgaW4gY2FjaGVcbmZ1bmN0aW9uIGNyZWF0ZU9wdGlvbnMoIG9wdGlvbnMgKSB7XG5cdHZhciBvYmplY3QgPSBvcHRpb25zQ2FjaGVbIG9wdGlvbnMgXSA9IHt9O1xuXHRqUXVlcnkuZWFjaCggb3B0aW9ucy5zcGxpdCggY29yZV9yc3BhY2UgKSwgZnVuY3Rpb24oIF8sIGZsYWcgKSB7XG5cdFx0b2JqZWN0WyBmbGFnIF0gPSB0cnVlO1xuXHR9KTtcblx0cmV0dXJuIG9iamVjdDtcbn1cblxuLypcbiAqIENyZWF0ZSBhIGNhbGxiYWNrIGxpc3QgdXNpbmcgdGhlIGZvbGxvd2luZyBwYXJhbWV0ZXJzOlxuICpcbiAqXHRvcHRpb25zOiBhbiBvcHRpb25hbCBsaXN0IG9mIHNwYWNlLXNlcGFyYXRlZCBvcHRpb25zIHRoYXQgd2lsbCBjaGFuZ2UgaG93XG4gKlx0XHRcdHRoZSBjYWxsYmFjayBsaXN0IGJlaGF2ZXMgb3IgYSBtb3JlIHRyYWRpdGlvbmFsIG9wdGlvbiBvYmplY3RcbiAqXG4gKiBCeSBkZWZhdWx0IGEgY2FsbGJhY2sgbGlzdCB3aWxsIGFjdCBsaWtlIGFuIGV2ZW50IGNhbGxiYWNrIGxpc3QgYW5kIGNhbiBiZVxuICogXCJmaXJlZFwiIG11bHRpcGxlIHRpbWVzLlxuICpcbiAqIFBvc3NpYmxlIG9wdGlvbnM6XG4gKlxuICpcdG9uY2U6XHRcdFx0d2lsbCBlbnN1cmUgdGhlIGNhbGxiYWNrIGxpc3QgY2FuIG9ubHkgYmUgZmlyZWQgb25jZSAobGlrZSBhIERlZmVycmVkKVxuICpcbiAqXHRtZW1vcnk6XHRcdFx0d2lsbCBrZWVwIHRyYWNrIG9mIHByZXZpb3VzIHZhbHVlcyBhbmQgd2lsbCBjYWxsIGFueSBjYWxsYmFjayBhZGRlZFxuICpcdFx0XHRcdFx0YWZ0ZXIgdGhlIGxpc3QgaGFzIGJlZW4gZmlyZWQgcmlnaHQgYXdheSB3aXRoIHRoZSBsYXRlc3QgXCJtZW1vcml6ZWRcIlxuICpcdFx0XHRcdFx0dmFsdWVzIChsaWtlIGEgRGVmZXJyZWQpXG4gKlxuICpcdHVuaXF1ZTpcdFx0XHR3aWxsIGVuc3VyZSBhIGNhbGxiYWNrIGNhbiBvbmx5IGJlIGFkZGVkIG9uY2UgKG5vIGR1cGxpY2F0ZSBpbiB0aGUgbGlzdClcbiAqXG4gKlx0c3RvcE9uRmFsc2U6XHRpbnRlcnJ1cHQgY2FsbGluZ3Mgd2hlbiBhIGNhbGxiYWNrIHJldHVybnMgZmFsc2VcbiAqXG4gKi9cbmpRdWVyeUNhbGxCYWNrLkNhbGxiYWNrcyA9IGZ1bmN0aW9uKCBvcHRpb25zICkge1xuXG5cdC8vIENvbnZlcnQgb3B0aW9ucyBmcm9tIFN0cmluZy1mb3JtYXR0ZWQgdG8gT2JqZWN0LWZvcm1hdHRlZCBpZiBuZWVkZWRcblx0Ly8gKHdlIGNoZWNrIGluIGNhY2hlIGZpcnN0KVxuXHRvcHRpb25zID0gdHlwZW9mIG9wdGlvbnMgPT09IFwic3RyaW5nXCIgP1xuXHRcdCggb3B0aW9uc0NhY2hlWyBvcHRpb25zIF0gfHwgY3JlYXRlT3B0aW9ucyggb3B0aW9ucyApICkgOlxuXHRcdGpRdWVyeS5leHRlbmQoIHt9LCBvcHRpb25zICk7XG5cblx0dmFyIC8vIExhc3QgZmlyZSB2YWx1ZSAoZm9yIG5vbi1mb3JnZXR0YWJsZSBsaXN0cylcblx0XHRtZW1vcnksXG5cdFx0Ly8gRmxhZyB0byBrbm93IGlmIGxpc3Qgd2FzIGFscmVhZHkgZmlyZWRcblx0XHRmaXJlZCxcblx0XHQvLyBGbGFnIHRvIGtub3cgaWYgbGlzdCBpcyBjdXJyZW50bHkgZmlyaW5nXG5cdFx0ZmlyaW5nLFxuXHRcdC8vIEZpcnN0IGNhbGxiYWNrIHRvIGZpcmUgKHVzZWQgaW50ZXJuYWxseSBieSBhZGQgYW5kIGZpcmVXaXRoKVxuXHRcdGZpcmluZ1N0YXJ0LFxuXHRcdC8vIEVuZCBvZiB0aGUgbG9vcCB3aGVuIGZpcmluZ1xuXHRcdGZpcmluZ0xlbmd0aCxcblx0XHQvLyBJbmRleCBvZiBjdXJyZW50bHkgZmlyaW5nIGNhbGxiYWNrIChtb2RpZmllZCBieSByZW1vdmUgaWYgbmVlZGVkKVxuXHRcdGZpcmluZ0luZGV4LFxuXHRcdC8vIEFjdHVhbCBjYWxsYmFjayBsaXN0XG5cdFx0bGlzdCA9IFtdLFxuXHRcdC8vIFN0YWNrIG9mIGZpcmUgY2FsbHMgZm9yIHJlcGVhdGFibGUgbGlzdHNcblx0XHRzdGFjayA9ICFvcHRpb25zLm9uY2UgJiYgW10sXG5cdFx0Ly8gRmlyZSBjYWxsYmFja3Ncblx0XHRmaXJlID0gZnVuY3Rpb24oIGRhdGEgKSB7XG5cdFx0XHRtZW1vcnkgPSBvcHRpb25zLm1lbW9yeSAmJiBkYXRhO1xuXHRcdFx0ZmlyZWQgPSB0cnVlO1xuXHRcdFx0ZmlyaW5nSW5kZXggPSBmaXJpbmdTdGFydCB8fCAwO1xuXHRcdFx0ZmlyaW5nU3RhcnQgPSAwO1xuXHRcdFx0ZmlyaW5nTGVuZ3RoID0gbGlzdC5sZW5ndGg7XG5cdFx0XHRmaXJpbmcgPSB0cnVlO1xuXHRcdFx0Zm9yICggOyBsaXN0ICYmIGZpcmluZ0luZGV4IDwgZmlyaW5nTGVuZ3RoOyBmaXJpbmdJbmRleCsrICkge1xuXHRcdFx0XHRpZiAoIGxpc3RbIGZpcmluZ0luZGV4IF0uYXBwbHkoIGRhdGFbIDAgXSwgZGF0YVsgMSBdICkgPT09IGZhbHNlICYmIG9wdGlvbnMuc3RvcE9uRmFsc2UgKSB7XG5cdFx0XHRcdFx0bWVtb3J5ID0gZmFsc2U7IC8vIFRvIHByZXZlbnQgZnVydGhlciBjYWxscyB1c2luZyBhZGRcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZmlyaW5nID0gZmFsc2U7XG5cdFx0XHRpZiAoIGxpc3QgKSB7XG5cdFx0XHRcdGlmICggc3RhY2sgKSB7XG5cdFx0XHRcdFx0aWYgKCBzdGFjay5sZW5ndGggKSB7XG5cdFx0XHRcdFx0XHRmaXJlKCBzdGFjay5zaGlmdCgpICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2UgaWYgKCBtZW1vcnkgKSB7XG5cdFx0XHRcdFx0bGlzdCA9IFtdO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHNlbGYuZGlzYWJsZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblx0XHQvLyBBY3R1YWwgQ2FsbGJhY2tzIG9iamVjdFxuXHRcdHNlbGYgPSB7XG5cdFx0XHQvLyBBZGQgYSBjYWxsYmFjayBvciBhIGNvbGxlY3Rpb24gb2YgY2FsbGJhY2tzIHRvIHRoZSBsaXN0XG5cdFx0XHRhZGQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZiAoIGxpc3QgKSB7XG5cdFx0XHRcdFx0Ly8gRmlyc3QsIHdlIHNhdmUgdGhlIGN1cnJlbnQgbGVuZ3RoXG5cdFx0XHRcdFx0dmFyIHN0YXJ0ID0gbGlzdC5sZW5ndGg7XG5cdFx0XHRcdFx0KGZ1bmN0aW9uIGFkZCggYXJncyApIHtcblx0XHRcdFx0XHRcdGpRdWVyeS5lYWNoKCBhcmdzLCBmdW5jdGlvbiggXywgYXJnICkge1xuXHRcdFx0XHRcdFx0XHR2YXIgdHlwZSA9IGpRdWVyeS50eXBlKCBhcmcgKTtcblx0XHRcdFx0XHRcdFx0aWYgKCB0eXBlID09PSBcImZ1bmN0aW9uXCIgKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKCAhb3B0aW9ucy51bmlxdWUgfHwgIXNlbGYuaGFzKCBhcmcgKSApIHtcblx0XHRcdFx0XHRcdFx0XHRcdGxpc3QucHVzaCggYXJnICk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKCBhcmcgJiYgYXJnLmxlbmd0aCAmJiB0eXBlICE9PSBcInN0cmluZ1wiICkge1xuXHRcdFx0XHRcdFx0XHRcdC8vIEluc3BlY3QgcmVjdXJzaXZlbHlcblx0XHRcdFx0XHRcdFx0XHRhZGQoIGFyZyApO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9KSggYXJndW1lbnRzICk7XG5cdFx0XHRcdFx0Ly8gRG8gd2UgbmVlZCB0byBhZGQgdGhlIGNhbGxiYWNrcyB0byB0aGVcblx0XHRcdFx0XHQvLyBjdXJyZW50IGZpcmluZyBiYXRjaD9cblx0XHRcdFx0XHRpZiAoIGZpcmluZyApIHtcblx0XHRcdFx0XHRcdGZpcmluZ0xlbmd0aCA9IGxpc3QubGVuZ3RoO1xuXHRcdFx0XHRcdC8vIFdpdGggbWVtb3J5LCBpZiB3ZSdyZSBub3QgZmlyaW5nIHRoZW5cblx0XHRcdFx0XHQvLyB3ZSBzaG91bGQgY2FsbCByaWdodCBhd2F5XG5cdFx0XHRcdFx0fSBlbHNlIGlmICggbWVtb3J5ICkge1xuXHRcdFx0XHRcdFx0ZmlyaW5nU3RhcnQgPSBzdGFydDtcblx0XHRcdFx0XHRcdGZpcmUoIG1lbW9yeSApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH0sXG5cdFx0XHQvLyBSZW1vdmUgYSBjYWxsYmFjayBmcm9tIHRoZSBsaXN0XG5cdFx0XHRyZW1vdmU6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZiAoIGxpc3QgKSB7XG5cdFx0XHRcdFx0alF1ZXJ5LmVhY2goIGFyZ3VtZW50cywgZnVuY3Rpb24oIF8sIGFyZyApIHtcblx0XHRcdFx0XHRcdHZhciBpbmRleDtcblx0XHRcdFx0XHRcdHdoaWxlKCAoIGluZGV4ID0galF1ZXJ5LmluQXJyYXkoIGFyZywgbGlzdCApICkgPiAtMSApIHtcblx0XHRcdFx0XHRcdFx0bGlzdC5zcGxpY2UoIGluZGV4LCAxICk7XG5cdFx0XHRcdFx0XHRcdC8vIEhhbmRsZSBmaXJpbmcgaW5kZXhlc1xuXHRcdFx0XHRcdFx0XHRpZiAoIGZpcmluZyApIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoIGluZGV4IDw9IGZpcmluZ0xlbmd0aCApIHtcblx0XHRcdFx0XHRcdFx0XHRcdGZpcmluZ0xlbmd0aC0tO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRpZiAoIGluZGV4IDw9IGZpcmluZ0luZGV4ICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0ZmlyaW5nSW5kZXgtLTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH0sXG5cdFx0XHQvLyBDb250cm9sIGlmIGEgZ2l2ZW4gY2FsbGJhY2sgaXMgaW4gdGhlIGxpc3Rcblx0XHRcdGhhczogZnVuY3Rpb24oIGZuICkge1xuXHRcdFx0XHRyZXR1cm4galF1ZXJ5LmluQXJyYXkoIGZuLCBsaXN0ICkgPiAtMTtcblx0XHRcdH0sXG5cdFx0XHQvLyBSZW1vdmUgYWxsIGNhbGxiYWNrcyBmcm9tIHRoZSBsaXN0XG5cdFx0XHRlbXB0eTogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGxpc3QgPSBbXTtcblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9LFxuXHRcdFx0Ly8gSGF2ZSB0aGUgbGlzdCBkbyBub3RoaW5nIGFueW1vcmVcblx0XHRcdGRpc2FibGU6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRsaXN0ID0gc3RhY2sgPSBtZW1vcnkgPSB1bmRlZmluZWQ7XG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fSxcblx0XHRcdC8vIElzIGl0IGRpc2FibGVkP1xuXHRcdFx0ZGlzYWJsZWQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gIWxpc3Q7XG5cdFx0XHR9LFxuXHRcdFx0Ly8gTG9jayB0aGUgbGlzdCBpbiBpdHMgY3VycmVudCBzdGF0ZVxuXHRcdFx0bG9jazogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHN0YWNrID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRpZiAoICFtZW1vcnkgKSB7XG5cdFx0XHRcdFx0c2VsZi5kaXNhYmxlKCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9LFxuXHRcdFx0Ly8gSXMgaXQgbG9ja2VkP1xuXHRcdFx0bG9ja2VkOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuICFzdGFjaztcblx0XHRcdH0sXG5cdFx0XHQvLyBDYWxsIGFsbCBjYWxsYmFja3Mgd2l0aCB0aGUgZ2l2ZW4gY29udGV4dCBhbmQgYXJndW1lbnRzXG5cdFx0XHRmaXJlV2l0aDogZnVuY3Rpb24oIGNvbnRleHQsIGFyZ3MgKSB7XG5cdFx0XHRcdGFyZ3MgPSBhcmdzIHx8IFtdO1xuXHRcdFx0XHRhcmdzID0gWyBjb250ZXh0LCBhcmdzLnNsaWNlID8gYXJncy5zbGljZSgpIDogYXJncyBdO1xuXHRcdFx0XHRpZiAoIGxpc3QgJiYgKCAhZmlyZWQgfHwgc3RhY2sgKSApIHtcblx0XHRcdFx0XHRpZiAoIGZpcmluZyApIHtcblx0XHRcdFx0XHRcdHN0YWNrLnB1c2goIGFyZ3MgKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0ZmlyZSggYXJncyApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH0sXG5cdFx0XHQvLyBDYWxsIGFsbCB0aGUgY2FsbGJhY2tzIHdpdGggdGhlIGdpdmVuIGFyZ3VtZW50c1xuXHRcdFx0ZmlyZTogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHNlbGYuZmlyZVdpdGgoIHRoaXMsIGFyZ3VtZW50cyApO1xuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH0sXG5cdFx0XHQvLyBUbyBrbm93IGlmIHRoZSBjYWxsYmFja3MgaGF2ZSBhbHJlYWR5IGJlZW4gY2FsbGVkIGF0IGxlYXN0IG9uY2Vcblx0XHRcdGZpcmVkOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuICEhZmlyZWQ7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRyZXR1cm4gc2VsZjtcbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgalF1ZXJ5Q2FsbEJhY2s7Il19