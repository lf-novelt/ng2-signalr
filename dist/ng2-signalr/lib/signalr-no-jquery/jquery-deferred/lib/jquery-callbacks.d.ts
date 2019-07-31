declare var jQueryCallBack: {
    Callbacks: any;
    type: (obj: any) => any;
    isArray: (obj: any) => boolean;
    inArray: (arr: any, item: any) => any;
    isFunction: (obj: any) => boolean;
    isPlainObject: (obj: any) => boolean;
    each: (object: any, callback: any, args?: any) => any;
    extend: (...args: any[]) => any;
    noop: () => void;
};
export default jQueryCallBack;
