/**
* jQuery core object.
*
* Worker with jQuery deferred
*
* Code from: https://github.com/jquery/jquery/blob/master/src/core.js
*
*/
declare var jQuery: {
    type: typeof type;
    isArray: typeof isArray;
    inArray: (arr: any, item: any) => any;
    isFunction: typeof isFunction;
    isPlainObject: typeof isPlainObject;
    each: typeof each;
    extend: typeof extend;
    noop: () => void;
};
declare function type(obj: any): any;
declare function isFunction(obj: any): boolean;
declare function isArray(obj: any): boolean;
declare function each(object: any, callback: any, args?: any): any;
declare function isPlainObject(obj: any): boolean;
declare function extend(...args: any[]): any;
export default jQuery;
