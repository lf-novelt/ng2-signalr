/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ConnectionTransport } from './connection.transport';
// @dynamic
var ConnectionTransports = /** @class */ (function () {
    function ConnectionTransports() {
    }
    Object.defineProperty(ConnectionTransports, "foreverFrame", {
        get: /**
         * @return {?}
         */
        function () {
            return ConnectionTransports.transports[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectionTransports, "longPolling", {
        get: /**
         * @return {?}
         */
        function () {
            return ConnectionTransports.transports[1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectionTransports, "serverSentEvents", {
        get: /**
         * @return {?}
         */
        function () {
            return ConnectionTransports.transports[2];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectionTransports, "webSockets", {
        get: /**
         * @return {?}
         */
        function () {
            return ConnectionTransports.transports[3];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectionTransports, "auto", {
        get: /**
         * @return {?}
         */
        function () {
            return ConnectionTransports.transports[4];
        },
        enumerable: true,
        configurable: true
    });
    ConnectionTransports.transports = [
        new ConnectionTransport('foreverFrame'),
        new ConnectionTransport('longPolling'),
        new ConnectionTransport('serverSentEvents'),
        new ConnectionTransport('webSockets'),
        new ConnectionTransport('auto'),
    ];
    return ConnectionTransports;
}());
export { ConnectionTransports };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ConnectionTransports.transports;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdGlvbi50cmFuc3BvcnRzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLXNpZ25hbHIvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvY29ubmVjdGlvbi9jb25uZWN0aW9uLnRyYW5zcG9ydHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDOztBQUc3RDtJQUFBO0lBOEJBLENBQUM7SUFuQkcsc0JBQWtCLG9DQUFZOzs7O1FBQTlCO1lBQ0ksT0FBTyxvQkFBb0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUMsQ0FBQzs7O09BQUE7SUFFRCxzQkFBa0IsbUNBQVc7Ozs7UUFBN0I7WUFDSSxPQUFPLG9CQUFvQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5QyxDQUFDOzs7T0FBQTtJQUVELHNCQUFrQix3Q0FBZ0I7Ozs7UUFBbEM7WUFDSSxPQUFPLG9CQUFvQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5QyxDQUFDOzs7T0FBQTtJQUVELHNCQUFrQixrQ0FBVTs7OztRQUE1QjtZQUNJLE9BQU8sb0JBQW9CLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlDLENBQUM7OztPQUFBO0lBRUQsc0JBQWtCLDRCQUFJOzs7O1FBQXRCO1lBQ0ksT0FBTyxvQkFBb0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUMsQ0FBQzs7O09BQUE7SUEzQmMsK0JBQVUsR0FDckI7UUFDSSxJQUFJLG1CQUFtQixDQUFDLGNBQWMsQ0FBQztRQUN2QyxJQUFJLG1CQUFtQixDQUFDLGFBQWEsQ0FBQztRQUN0QyxJQUFJLG1CQUFtQixDQUFDLGtCQUFrQixDQUFDO1FBQzNDLElBQUksbUJBQW1CLENBQUMsWUFBWSxDQUFDO1FBQ3JDLElBQUksbUJBQW1CLENBQUMsTUFBTSxDQUFDO0tBQ2xDLENBQUM7SUFxQlYsMkJBQUM7Q0FBQSxBQTlCRCxJQThCQztTQTlCWSxvQkFBb0I7Ozs7OztJQUU3QixnQ0FPTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbm5lY3Rpb25UcmFuc3BvcnQgfSBmcm9tICcuL2Nvbm5lY3Rpb24udHJhbnNwb3J0JztcclxuXHJcbi8vIEBkeW5hbWljXHJcbmV4cG9ydCBjbGFzcyBDb25uZWN0aW9uVHJhbnNwb3J0cyB7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgdHJhbnNwb3J0czogQ29ubmVjdGlvblRyYW5zcG9ydFtdID1cclxuICAgICAgICBbXHJcbiAgICAgICAgICAgIG5ldyBDb25uZWN0aW9uVHJhbnNwb3J0KCdmb3JldmVyRnJhbWUnKSxcclxuICAgICAgICAgICAgbmV3IENvbm5lY3Rpb25UcmFuc3BvcnQoJ2xvbmdQb2xsaW5nJyksXHJcbiAgICAgICAgICAgIG5ldyBDb25uZWN0aW9uVHJhbnNwb3J0KCdzZXJ2ZXJTZW50RXZlbnRzJyksXHJcbiAgICAgICAgICAgIG5ldyBDb25uZWN0aW9uVHJhbnNwb3J0KCd3ZWJTb2NrZXRzJyksXHJcbiAgICAgICAgICAgIG5ldyBDb25uZWN0aW9uVHJhbnNwb3J0KCdhdXRvJyksXHJcbiAgICAgICAgXTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBmb3JldmVyRnJhbWUoKTogQ29ubmVjdGlvblRyYW5zcG9ydCB7XHJcbiAgICAgICAgcmV0dXJuIENvbm5lY3Rpb25UcmFuc3BvcnRzLnRyYW5zcG9ydHNbMF07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgbG9uZ1BvbGxpbmcoKTogQ29ubmVjdGlvblRyYW5zcG9ydCB7XHJcbiAgICAgICAgcmV0dXJuIENvbm5lY3Rpb25UcmFuc3BvcnRzLnRyYW5zcG9ydHNbMV07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgc2VydmVyU2VudEV2ZW50cygpOiBDb25uZWN0aW9uVHJhbnNwb3J0IHtcclxuICAgICAgICByZXR1cm4gQ29ubmVjdGlvblRyYW5zcG9ydHMudHJhbnNwb3J0c1syXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCB3ZWJTb2NrZXRzKCk6IENvbm5lY3Rpb25UcmFuc3BvcnQge1xyXG4gICAgICAgIHJldHVybiBDb25uZWN0aW9uVHJhbnNwb3J0cy50cmFuc3BvcnRzWzNdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IGF1dG8oKTogQ29ubmVjdGlvblRyYW5zcG9ydCB7XHJcbiAgICAgICAgcmV0dXJuIENvbm5lY3Rpb25UcmFuc3BvcnRzLnRyYW5zcG9ydHNbNF07XHJcbiAgICB9XHJcbn1cclxuIl19