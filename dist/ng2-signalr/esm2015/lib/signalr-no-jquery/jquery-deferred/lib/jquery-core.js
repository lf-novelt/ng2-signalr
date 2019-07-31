/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
* jQuery core object.
*
* Worker with jQuery deferred
*
* Code from: https://github.com/jquery/jquery/blob/master/src/core.js
*
*/
/** @type {?} */
var jQuery = {
    type: type,
    isArray: isArray,
    inArray: (/**
     * @param {?} arr
     * @param {?} item
     * @return {?}
     */
    (arr, item) => arr.indexOf(item)),
    isFunction: isFunction,
    isPlainObject: isPlainObject,
    each: each,
    extend: extend,
    noop: (/**
     * @return {?}
     */
    function () { })
};
/** @type {?} */
var toString = Object.prototype.toString;
/** @type {?} */
var class2type = {};
// Populate the class2type map
"Boolean Number String Function Array Date RegExp Object".split(" ").forEach((/**
 * @param {?} name
 * @return {?}
 */
function (name) {
    class2type["[object " + name + "]"] = name.toLowerCase();
}));
/**
 * @param {?} obj
 * @return {?}
 */
function type(obj) {
    return obj == null ?
        String(obj) :
        class2type[toString.call(obj)] || "object";
}
/**
 * @param {?} obj
 * @return {?}
 */
function isFunction(obj) {
    return jQuery.type(obj) === "function";
}
/**
 * @param {?} obj
 * @return {?}
 */
function isArray(obj) {
    return jQuery.type(obj) === "array";
}
/**
 * @param {?} object
 * @param {?} callback
 * @param {?=} args
 * @return {?}
 */
function each(object, callback, args) {
    /** @type {?} */
    var name;
    /** @type {?} */
    var i = 0;
    /** @type {?} */
    var length = object.length;
    /** @type {?} */
    var isObj = length === undefined || isFunction(object);
    if (args) {
        if (isObj) {
            for (name in object) {
                if (callback.apply(object[name], args) === false) {
                    break;
                }
            }
        }
        else {
            for (; i < length;) {
                if (callback.apply(object[i++], args) === false) {
                    break;
                }
            }
        }
        // A special, fast, case for the most common use of each
    }
    else {
        if (isObj) {
            for (name in object) {
                if (callback.call(object[name], name, object[name]) === false) {
                    break;
                }
            }
        }
        else {
            for (; i < length;) {
                if (callback.call(object[i], i, object[i++]) === false) {
                    break;
                }
            }
        }
    }
    return object;
}
/**
 * @param {?} obj
 * @return {?}
 */
function isPlainObject(obj) {
    // Must be an Object.
    if (!obj || jQuery.type(obj) !== "object") {
        return false;
    }
    return true;
}
/**
 * @param {...?} args
 * @return {?}
 */
function extend(...args) {
    /** @type {?} */
    var options;
    /** @type {?} */
    var name;
    /** @type {?} */
    var src;
    /** @type {?} */
    var copy;
    /** @type {?} */
    var copyIsArray;
    /** @type {?} */
    var clone;
    /** @type {?} */
    var target = args[0] || {};
    /** @type {?} */
    var i = 1;
    /** @type {?} */
    var length = args.length;
    /** @type {?} */
    var deep = false;
    // Handle a deep copy situation
    if (typeof target === "boolean") {
        deep = target;
        target = args[1] || {};
        // skip the boolean and the target
        i = 2;
    }
    // Handle case when target is a string or something (possible in deep copy)
    if (typeof target !== "object" && !jQuery.isFunction(target)) {
        target = {};
    }
    // extend jQuery itself if only one argument is passed
    if (length === i) {
        target = this;
        --i;
    }
    for (; i < length; i++) {
        // Only deal with non-null/undefined values
        if ((options = arguments[i]) != null) {
            // Extend the base object
            for (name in options) {
                src = target[name];
                copy = options[name];
                // Prevent never-ending loop
                if (target === copy) {
                    continue;
                }
                // Recurse if we're merging plain objects or arrays
                if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
                    if (copyIsArray) {
                        copyIsArray = false;
                        clone = src && jQuery.isArray(src) ? src : [];
                    }
                    else {
                        clone = src && jQuery.isPlainObject(src) ? src : {};
                    }
                    // Never move original objects, clone them
                    target[name] = jQuery.extend(deep, clone, copy);
                    // Don't bring in undefined values
                }
                else if (copy !== undefined) {
                    target[name] = copy;
                }
            }
        }
    }
    // Return the modified object
    return target;
}
;
export default jQuery;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianF1ZXJ5LWNvcmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItc2lnbmFsci8iLCJzb3VyY2VzIjpbImxpYi9zaWduYWxyLW5vLWpxdWVyeS9qcXVlcnktZGVmZXJyZWQvbGliL2pxdWVyeS1jb3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7SUFTSSxNQUFNLEdBQUc7SUFDWixJQUFJLEVBQUUsSUFBSTtJQUNSLE9BQU8sRUFBRSxPQUFPO0lBQ2hCLE9BQU87Ozs7O0lBQUUsQ0FBQyxHQUFHLEVBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3hDLFVBQVUsRUFBRSxVQUFVO0lBQ3RCLGFBQWEsRUFBRSxhQUFhO0lBQzVCLElBQUksRUFBRSxJQUFJO0lBQ1YsTUFBTSxFQUFFLE1BQU07SUFDZCxJQUFJOzs7SUFBRSxjQUFZLENBQUMsQ0FBQTtDQUNyQjs7SUFFRyxRQUFRLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFROztJQUVwQyxVQUFVLEdBQUcsRUFBRTs7QUFFbkIseURBQXlELENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU87Ozs7QUFBQyxVQUFTLElBQUk7SUFDekYsVUFBVSxDQUFFLFVBQVUsR0FBRyxJQUFJLEdBQUcsR0FBRyxDQUFFLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQzVELENBQUMsRUFBQyxDQUFDOzs7OztBQUdILFNBQVMsSUFBSSxDQUFFLEdBQUc7SUFDakIsT0FBTyxHQUFHLElBQUksSUFBSSxDQUFDLENBQUM7UUFDbkIsTUFBTSxDQUFFLEdBQUcsQ0FBRSxDQUFDLENBQUM7UUFDZCxVQUFVLENBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBRSxJQUFJLFFBQVEsQ0FBQztBQUNoRCxDQUFDOzs7OztBQUVELFNBQVMsVUFBVSxDQUFFLEdBQUc7SUFDdkIsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLFVBQVUsQ0FBQztBQUN4QyxDQUFDOzs7OztBQUVELFNBQVMsT0FBTyxDQUFFLEdBQUc7SUFDcEIsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLE9BQU8sQ0FBQztBQUNyQyxDQUFDOzs7Ozs7O0FBRUQsU0FBUyxJQUFJLENBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFLOztRQUNqQyxJQUFJOztRQUFFLENBQUMsR0FBRyxDQUFDOztRQUNmLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTTs7UUFDdEIsS0FBSyxHQUFHLE1BQU0sS0FBSyxTQUFTLElBQUksVUFBVSxDQUFFLE1BQU0sQ0FBRTtJQUVwRCxJQUFLLElBQUksRUFBRztRQUNYLElBQUssS0FBSyxFQUFHO1lBQ1osS0FBTSxJQUFJLElBQUksTUFBTSxFQUFHO2dCQUN0QixJQUFLLFFBQVEsQ0FBQyxLQUFLLENBQUUsTUFBTSxDQUFFLElBQUksQ0FBRSxFQUFFLElBQUksQ0FBRSxLQUFLLEtBQUssRUFBRztvQkFDdkQsTUFBTTtpQkFDTjthQUNEO1NBQ0Q7YUFBTTtZQUNOLE9BQVEsQ0FBQyxHQUFHLE1BQU0sR0FBSTtnQkFDckIsSUFBSyxRQUFRLENBQUMsS0FBSyxDQUFFLE1BQU0sQ0FBRSxDQUFDLEVBQUUsQ0FBRSxFQUFFLElBQUksQ0FBRSxLQUFLLEtBQUssRUFBRztvQkFDdEQsTUFBTTtpQkFDTjthQUNEO1NBQ0Q7UUFFRCx3REFBd0Q7S0FDeEQ7U0FBTTtRQUNOLElBQUssS0FBSyxFQUFHO1lBQ1osS0FBTSxJQUFJLElBQUksTUFBTSxFQUFHO2dCQUN0QixJQUFLLFFBQVEsQ0FBQyxJQUFJLENBQUUsTUFBTSxDQUFFLElBQUksQ0FBRSxFQUFFLElBQUksRUFBRSxNQUFNLENBQUUsSUFBSSxDQUFFLENBQUUsS0FBSyxLQUFLLEVBQUc7b0JBQ3RFLE1BQU07aUJBQ047YUFDRDtTQUNEO2FBQU07WUFDTixPQUFRLENBQUMsR0FBRyxNQUFNLEdBQUk7Z0JBQ3JCLElBQUssUUFBUSxDQUFDLElBQUksQ0FBRSxNQUFNLENBQUUsQ0FBQyxDQUFFLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBRSxDQUFDLEVBQUUsQ0FBRSxDQUFFLEtBQUssS0FBSyxFQUFHO29CQUMvRCxNQUFNO2lCQUNOO2FBQ0Q7U0FDRDtLQUNEO0lBRUQsT0FBTyxNQUFNLENBQUM7QUFDZixDQUFDOzs7OztBQUVELFNBQVMsYUFBYSxDQUFFLEdBQUc7SUFDMUIscUJBQXFCO0lBQ3JCLElBQUssQ0FBQyxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxRQUFRLEVBQUc7UUFDNUMsT0FBTyxLQUFLLENBQUM7S0FDYjtJQUNELE9BQU8sSUFBSSxDQUFDO0FBQ2IsQ0FBQzs7Ozs7QUFFRCxTQUFTLE1BQU0sQ0FBQyxHQUFHLElBQVc7O1FBQ3pCLE9BQU87O1FBQUUsSUFBSTs7UUFBRSxHQUFHOztRQUFFLElBQUk7O1FBQUUsV0FBVzs7UUFBRSxLQUFLOztRQUNoRCxNQUFNLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUU7O1FBQ3RCLENBQUMsR0FBRyxDQUFDOztRQUNMLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTTs7UUFDcEIsSUFBSSxHQUFHLEtBQUs7SUFFWiwrQkFBK0I7SUFDL0IsSUFBSyxPQUFPLE1BQU0sS0FBSyxTQUFTLEVBQUc7UUFDbEMsSUFBSSxHQUFHLE1BQU0sQ0FBQztRQUNkLE1BQU0sR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZCLGtDQUFrQztRQUNsQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ047SUFFRCwyRUFBMkU7SUFDM0UsSUFBSyxPQUFPLE1BQU0sS0FBSyxRQUFRLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFHO1FBQy9ELE1BQU0sR0FBRyxFQUFFLENBQUM7S0FDWjtJQUVELHNEQUFzRDtJQUN0RCxJQUFLLE1BQU0sS0FBSyxDQUFDLEVBQUc7UUFDbkIsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNkLEVBQUUsQ0FBQyxDQUFDO0tBQ0o7SUFFRCxPQUFRLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUc7UUFDekIsMkNBQTJDO1FBQzNDLElBQUssQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFFLENBQUMsQ0FBRSxDQUFDLElBQUksSUFBSSxFQUFHO1lBQ3pDLHlCQUF5QjtZQUN6QixLQUFNLElBQUksSUFBSSxPQUFPLEVBQUc7Z0JBQ3ZCLEdBQUcsR0FBRyxNQUFNLENBQUUsSUFBSSxDQUFFLENBQUM7Z0JBQ3JCLElBQUksR0FBRyxPQUFPLENBQUUsSUFBSSxDQUFFLENBQUM7Z0JBRXZCLDRCQUE0QjtnQkFDNUIsSUFBSyxNQUFNLEtBQUssSUFBSSxFQUFHO29CQUN0QixTQUFTO2lCQUNUO2dCQUVELG1EQUFtRDtnQkFDbkQsSUFBSyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUUsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUUsRUFBRztvQkFDN0YsSUFBSyxXQUFXLEVBQUc7d0JBQ2xCLFdBQVcsR0FBRyxLQUFLLENBQUM7d0JBQ3BCLEtBQUssR0FBRyxHQUFHLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7cUJBRTlDO3lCQUFNO3dCQUNOLEtBQUssR0FBRyxHQUFHLElBQUksTUFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7cUJBQ3BEO29CQUVELDBDQUEwQztvQkFDMUMsTUFBTSxDQUFFLElBQUksQ0FBRSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUUsQ0FBQztvQkFFcEQsa0NBQWtDO2lCQUNsQztxQkFBTSxJQUFLLElBQUksS0FBSyxTQUFTLEVBQUc7b0JBQ2hDLE1BQU0sQ0FBRSxJQUFJLENBQUUsR0FBRyxJQUFJLENBQUM7aUJBQ3RCO2FBQ0Q7U0FDRDtLQUNEO0lBRUQsNkJBQTZCO0lBQzdCLE9BQU8sTUFBTSxDQUFDO0FBQ2YsQ0FBQztBQUFBLENBQUM7QUFHRixlQUFlLE1BQU0sQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuKiBqUXVlcnkgY29yZSBvYmplY3QuXG4qXG4qIFdvcmtlciB3aXRoIGpRdWVyeSBkZWZlcnJlZFxuKlxuKiBDb2RlIGZyb206IGh0dHBzOi8vZ2l0aHViLmNvbS9qcXVlcnkvanF1ZXJ5L2Jsb2IvbWFzdGVyL3NyYy9jb3JlLmpzXG4qXG4qL1xuXG52YXIgalF1ZXJ5ID0ge1xuXHR0eXBlOiB0eXBlXG5cdCwgaXNBcnJheTogaXNBcnJheVxuXHQsIGluQXJyYXk6IChhcnIsaXRlbSkgPT4gYXJyLmluZGV4T2YoaXRlbSlcblx0LCBpc0Z1bmN0aW9uOiBpc0Z1bmN0aW9uXG5cdCwgaXNQbGFpbk9iamVjdDogaXNQbGFpbk9iamVjdFxuXHQsIGVhY2g6IGVhY2hcblx0LCBleHRlbmQ6IGV4dGVuZFxuXHQsIG5vb3A6IGZ1bmN0aW9uKCkge31cbn07XG5cbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbnZhciBjbGFzczJ0eXBlID0ge307XG4vLyBQb3B1bGF0ZSB0aGUgY2xhc3MydHlwZSBtYXBcblwiQm9vbGVhbiBOdW1iZXIgU3RyaW5nIEZ1bmN0aW9uIEFycmF5IERhdGUgUmVnRXhwIE9iamVjdFwiLnNwbGl0KFwiIFwiKS5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcblx0Y2xhc3MydHlwZVsgXCJbb2JqZWN0IFwiICsgbmFtZSArIFwiXVwiIF0gPSBuYW1lLnRvTG93ZXJDYXNlKCk7XG59KTtcblxuXG5mdW5jdGlvbiB0eXBlKCBvYmogKSB7XG5cdHJldHVybiBvYmogPT0gbnVsbCA/XG5cdFx0U3RyaW5nKCBvYmogKSA6XG5cdFx0XHRjbGFzczJ0eXBlWyB0b1N0cmluZy5jYWxsKG9iaikgXSB8fCBcIm9iamVjdFwiO1xufVxuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKCBvYmogKSB7XG5cdHJldHVybiBqUXVlcnkudHlwZShvYmopID09PSBcImZ1bmN0aW9uXCI7XG59XG5cbmZ1bmN0aW9uIGlzQXJyYXkoIG9iaiApIHtcblx0cmV0dXJuIGpRdWVyeS50eXBlKG9iaikgPT09IFwiYXJyYXlcIjtcbn1cblxuZnVuY3Rpb24gZWFjaCggb2JqZWN0LCBjYWxsYmFjaywgYXJncz8gKSB7XG5cdHZhciBuYW1lLCBpID0gMCxcblx0bGVuZ3RoID0gb2JqZWN0Lmxlbmd0aCxcblx0aXNPYmogPSBsZW5ndGggPT09IHVuZGVmaW5lZCB8fCBpc0Z1bmN0aW9uKCBvYmplY3QgKTtcblxuXHRpZiAoIGFyZ3MgKSB7XG5cdFx0aWYgKCBpc09iaiApIHtcblx0XHRcdGZvciAoIG5hbWUgaW4gb2JqZWN0ICkge1xuXHRcdFx0XHRpZiAoIGNhbGxiYWNrLmFwcGx5KCBvYmplY3RbIG5hbWUgXSwgYXJncyApID09PSBmYWxzZSApIHtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRmb3IgKCA7IGkgPCBsZW5ndGg7ICkge1xuXHRcdFx0XHRpZiAoIGNhbGxiYWNrLmFwcGx5KCBvYmplY3RbIGkrKyBdLCBhcmdzICkgPT09IGZhbHNlICkge1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gQSBzcGVjaWFsLCBmYXN0LCBjYXNlIGZvciB0aGUgbW9zdCBjb21tb24gdXNlIG9mIGVhY2hcblx0fSBlbHNlIHtcblx0XHRpZiAoIGlzT2JqICkge1xuXHRcdFx0Zm9yICggbmFtZSBpbiBvYmplY3QgKSB7XG5cdFx0XHRcdGlmICggY2FsbGJhY2suY2FsbCggb2JqZWN0WyBuYW1lIF0sIG5hbWUsIG9iamVjdFsgbmFtZSBdICkgPT09IGZhbHNlICkge1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGZvciAoIDsgaSA8IGxlbmd0aDsgKSB7XG5cdFx0XHRcdGlmICggY2FsbGJhY2suY2FsbCggb2JqZWN0WyBpIF0sIGksIG9iamVjdFsgaSsrIF0gKSA9PT0gZmFsc2UgKSB7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gb2JqZWN0O1xufVxuXG5mdW5jdGlvbiBpc1BsYWluT2JqZWN0KCBvYmogKSB7XG5cdC8vIE11c3QgYmUgYW4gT2JqZWN0LlxuXHRpZiAoICFvYmogfHwgalF1ZXJ5LnR5cGUob2JqKSAhPT0gXCJvYmplY3RcIiApIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0cmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGV4dGVuZCguLi5hcmdzOiBhbnlbXSkge1xuXHR2YXIgb3B0aW9ucywgbmFtZSwgc3JjLCBjb3B5LCBjb3B5SXNBcnJheSwgY2xvbmUsXG5cdHRhcmdldCA9IGFyZ3NbMF0gfHwge30sXG5cdGkgPSAxLFxuXHRsZW5ndGggPSBhcmdzLmxlbmd0aCxcblx0ZGVlcCA9IGZhbHNlO1xuXG5cdC8vIEhhbmRsZSBhIGRlZXAgY29weSBzaXR1YXRpb25cblx0aWYgKCB0eXBlb2YgdGFyZ2V0ID09PSBcImJvb2xlYW5cIiApIHtcblx0XHRkZWVwID0gdGFyZ2V0O1xuXHRcdHRhcmdldCA9IGFyZ3NbMV0gfHwge307XG5cdFx0Ly8gc2tpcCB0aGUgYm9vbGVhbiBhbmQgdGhlIHRhcmdldFxuXHRcdGkgPSAyO1xuXHR9XG5cblx0Ly8gSGFuZGxlIGNhc2Ugd2hlbiB0YXJnZXQgaXMgYSBzdHJpbmcgb3Igc29tZXRoaW5nIChwb3NzaWJsZSBpbiBkZWVwIGNvcHkpXG5cdGlmICggdHlwZW9mIHRhcmdldCAhPT0gXCJvYmplY3RcIiAmJiAhalF1ZXJ5LmlzRnVuY3Rpb24odGFyZ2V0KSApIHtcblx0XHR0YXJnZXQgPSB7fTtcblx0fVxuXG5cdC8vIGV4dGVuZCBqUXVlcnkgaXRzZWxmIGlmIG9ubHkgb25lIGFyZ3VtZW50IGlzIHBhc3NlZFxuXHRpZiAoIGxlbmd0aCA9PT0gaSApIHtcblx0XHR0YXJnZXQgPSB0aGlzO1xuXHRcdC0taTtcblx0fVxuXG5cdGZvciAoIDsgaSA8IGxlbmd0aDsgaSsrICkge1xuXHRcdC8vIE9ubHkgZGVhbCB3aXRoIG5vbi1udWxsL3VuZGVmaW5lZCB2YWx1ZXNcblx0XHRpZiAoIChvcHRpb25zID0gYXJndW1lbnRzWyBpIF0pICE9IG51bGwgKSB7XG5cdFx0XHQvLyBFeHRlbmQgdGhlIGJhc2Ugb2JqZWN0XG5cdFx0XHRmb3IgKCBuYW1lIGluIG9wdGlvbnMgKSB7XG5cdFx0XHRcdHNyYyA9IHRhcmdldFsgbmFtZSBdO1xuXHRcdFx0XHRjb3B5ID0gb3B0aW9uc1sgbmFtZSBdO1xuXG5cdFx0XHRcdC8vIFByZXZlbnQgbmV2ZXItZW5kaW5nIGxvb3Bcblx0XHRcdFx0aWYgKCB0YXJnZXQgPT09IGNvcHkgKSB7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBSZWN1cnNlIGlmIHdlJ3JlIG1lcmdpbmcgcGxhaW4gb2JqZWN0cyBvciBhcnJheXNcblx0XHRcdFx0aWYgKCBkZWVwICYmIGNvcHkgJiYgKCBqUXVlcnkuaXNQbGFpbk9iamVjdChjb3B5KSB8fCAoY29weUlzQXJyYXkgPSBqUXVlcnkuaXNBcnJheShjb3B5KSkgKSApIHtcblx0XHRcdFx0XHRpZiAoIGNvcHlJc0FycmF5ICkge1xuXHRcdFx0XHRcdFx0Y29weUlzQXJyYXkgPSBmYWxzZTtcblx0XHRcdFx0XHRcdGNsb25lID0gc3JjICYmIGpRdWVyeS5pc0FycmF5KHNyYykgPyBzcmMgOiBbXTtcblxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRjbG9uZSA9IHNyYyAmJiBqUXVlcnkuaXNQbGFpbk9iamVjdChzcmMpID8gc3JjIDoge307XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gTmV2ZXIgbW92ZSBvcmlnaW5hbCBvYmplY3RzLCBjbG9uZSB0aGVtXG5cdFx0XHRcdFx0dGFyZ2V0WyBuYW1lIF0gPSBqUXVlcnkuZXh0ZW5kKCBkZWVwLCBjbG9uZSwgY29weSApO1xuXG5cdFx0XHRcdFx0Ly8gRG9uJ3QgYnJpbmcgaW4gdW5kZWZpbmVkIHZhbHVlc1xuXHRcdFx0XHR9IGVsc2UgaWYgKCBjb3B5ICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdFx0dGFyZ2V0WyBuYW1lIF0gPSBjb3B5O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly8gUmV0dXJuIHRoZSBtb2RpZmllZCBvYmplY3Rcblx0cmV0dXJuIHRhcmdldDtcbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgalF1ZXJ5OyJdfQ==