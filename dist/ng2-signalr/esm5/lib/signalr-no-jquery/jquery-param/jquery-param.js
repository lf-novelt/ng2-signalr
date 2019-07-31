/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @preserve jquery-param (c) 2015 KNOWLEDGECODE | MIT
 * @type {?}
 */
var param = (/**
 * @param {?} a
 * @return {?}
 */
function (a) {
    /** @type {?} */
    var s = [];
    /** @type {?} */
    var rbracket = /\[\]$/;
    /** @type {?} */
    var isArray = (/**
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    });
    /** @type {?} */
    var add = (/**
     * @param {?} k
     * @param {?} v
     * @return {?}
     */
    function (k, v) {
        v = typeof v === 'function' ? v() : v === null ? '' : v === undefined ? '' : v;
        s[s.length] = encodeURIComponent(k) + '=' + encodeURIComponent(v);
    });
    /** @type {?} */
    var buildParams = (/**
     * @param {?} prefix
     * @param {?} obj
     * @return {?}
     */
    function (prefix, obj) {
        /** @type {?} */
        var i;
        /** @type {?} */
        var len;
        /** @type {?} */
        var key;
        if (prefix) {
            if (isArray(obj)) {
                for (i = 0, len = obj.length; i < len; i++) {
                    if (rbracket.test(prefix)) {
                        add(prefix, obj[i]);
                    }
                    else {
                        buildParams(prefix + '[' + (typeof obj[i] === 'object' ? i : '') + ']', obj[i]);
                    }
                }
            }
            else if (obj && String(obj) === '[object Object]') {
                for (key in obj) {
                    buildParams(prefix + '[' + key + ']', obj[key]);
                }
            }
            else {
                add(prefix, obj);
            }
        }
        else if (isArray(obj)) {
            for (i = 0, len = obj.length; i < len; i++) {
                add(obj[i].name, obj[i].value);
            }
        }
        else {
            for (key in obj) {
                buildParams(key, obj[key]);
            }
        }
        return s;
    });
    return buildParams('', a).join('&').replace(/%20/g, '+');
});
var ɵ0 = param;
export default param;
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianF1ZXJ5LXBhcmFtLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLXNpZ25hbHIvIiwic291cmNlcyI6WyJsaWIvc2lnbmFsci1uby1qcXVlcnkvanF1ZXJ5LXBhcmFtL2pxdWVyeS1wYXJhbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztJQUdJLEtBQUs7Ozs7QUFBRyxVQUFVLENBQUM7O1FBQ2YsQ0FBQyxHQUFHLEVBQUU7O1FBQUUsUUFBUSxHQUFHLE9BQU87O1FBQzFCLE9BQU87Ozs7SUFBRyxVQUFVLEdBQUc7UUFDbkIsT0FBTyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssZ0JBQWdCLENBQUM7SUFDcEUsQ0FBQyxDQUFBOztRQUFFLEdBQUc7Ozs7O0lBQUcsVUFBVSxDQUFDLEVBQUUsQ0FBQztRQUNuQixDQUFDLEdBQUcsT0FBTyxDQUFDLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0RSxDQUFDLENBQUE7O1FBQUUsV0FBVzs7Ozs7SUFBRyxVQUFVLE1BQU0sRUFBRSxHQUFHOztZQUM5QixDQUFDOztZQUFFLEdBQUc7O1lBQUUsR0FBRztRQUVmLElBQUksTUFBTSxFQUFFO1lBQ1IsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ2QsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQ3hDLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTt3QkFDdkIsR0FBRyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDdkI7eUJBQU07d0JBQ0gsV0FBVyxDQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUNuRjtpQkFDSjthQUNKO2lCQUFNLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxpQkFBaUIsRUFBRTtnQkFDakQsS0FBSyxHQUFHLElBQUksR0FBRyxFQUFFO29CQUNiLFdBQVcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7aUJBQ25EO2FBQ0o7aUJBQU07Z0JBQ0gsR0FBRyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQzthQUNwQjtTQUNKO2FBQU0sSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDckIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3hDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNsQztTQUNKO2FBQU07WUFDSCxLQUFLLEdBQUcsSUFBSSxHQUFHLEVBQUU7Z0JBQ2IsV0FBVyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUM5QjtTQUNKO1FBQ0QsT0FBTyxDQUFDLENBQUM7SUFDYixDQUFDLENBQUE7SUFFTCxPQUFPLFdBQVcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDN0QsQ0FBQyxDQUFBOztBQUVELGVBQWUsS0FBSyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAcHJlc2VydmUganF1ZXJ5LXBhcmFtIChjKSAyMDE1IEtOT1dMRURHRUNPREUgfCBNSVRcbiAqL1xudmFyIHBhcmFtID0gZnVuY3Rpb24gKGEpIHtcbiAgICB2YXIgcyA9IFtdLCByYnJhY2tldCA9IC9cXFtcXF0kLyxcbiAgICAgICAgaXNBcnJheSA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbiAgICAgICAgfSwgYWRkID0gZnVuY3Rpb24gKGssIHYpIHtcbiAgICAgICAgICAgIHYgPSB0eXBlb2YgdiA9PT0gJ2Z1bmN0aW9uJyA/IHYoKSA6IHYgPT09IG51bGwgPyAnJyA6IHYgPT09IHVuZGVmaW5lZCA/ICcnIDogdjtcbiAgICAgICAgICAgIHNbcy5sZW5ndGhdID0gZW5jb2RlVVJJQ29tcG9uZW50KGspICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHYpO1xuICAgICAgICB9LCBidWlsZFBhcmFtcyA9IGZ1bmN0aW9uIChwcmVmaXgsIG9iaikge1xuICAgICAgICAgICAgdmFyIGksIGxlbiwga2V5O1xuXG4gICAgICAgICAgICBpZiAocHJlZml4KSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwLCBsZW4gPSBvYmoubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyYnJhY2tldC50ZXN0KHByZWZpeCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGQocHJlZml4LCBvYmpbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWlsZFBhcmFtcyhwcmVmaXggKyAnWycgKyAodHlwZW9mIG9ialtpXSA9PT0gJ29iamVjdCcgPyBpIDogJycpICsgJ10nLCBvYmpbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChvYmogJiYgU3RyaW5nKG9iaikgPT09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoa2V5IGluIG9iaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnVpbGRQYXJhbXMocHJlZml4ICsgJ1snICsga2V5ICsgJ10nLCBvYmpba2V5XSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhZGQocHJlZml4LCBvYmopO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgICAgICAgICAgICAgZm9yIChpID0gMCwgbGVuID0gb2JqLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGFkZChvYmpbaV0ubmFtZSwgb2JqW2ldLnZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvciAoa2V5IGluIG9iaikge1xuICAgICAgICAgICAgICAgICAgICBidWlsZFBhcmFtcyhrZXksIG9ialtrZXldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcztcbiAgICAgICAgfTtcblxuICAgIHJldHVybiBidWlsZFBhcmFtcygnJywgYSkuam9pbignJicpLnJlcGxhY2UoLyUyMC9nLCAnKycpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgcGFyYW07Il19