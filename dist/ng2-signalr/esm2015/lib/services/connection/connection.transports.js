/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ConnectionTransport } from './connection.transport';
// @dynamic
export class ConnectionTransports {
    /**
     * @return {?}
     */
    static get foreverFrame() {
        return ConnectionTransports.transports[0];
    }
    /**
     * @return {?}
     */
    static get longPolling() {
        return ConnectionTransports.transports[1];
    }
    /**
     * @return {?}
     */
    static get serverSentEvents() {
        return ConnectionTransports.transports[2];
    }
    /**
     * @return {?}
     */
    static get webSockets() {
        return ConnectionTransports.transports[3];
    }
    /**
     * @return {?}
     */
    static get auto() {
        return ConnectionTransports.transports[4];
    }
}
ConnectionTransports.transports = [
    new ConnectionTransport('foreverFrame'),
    new ConnectionTransport('longPolling'),
    new ConnectionTransport('serverSentEvents'),
    new ConnectionTransport('webSockets'),
    new ConnectionTransport('auto'),
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    ConnectionTransports.transports;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdGlvbi50cmFuc3BvcnRzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLXNpZ25hbHIvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvY29ubmVjdGlvbi9jb25uZWN0aW9uLnRyYW5zcG9ydHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDOztBQUc3RCxNQUFNLE9BQU8sb0JBQW9COzs7O0lBV3RCLE1BQU0sS0FBSyxZQUFZO1FBQzFCLE9BQU8sb0JBQW9CLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlDLENBQUM7Ozs7SUFFTSxNQUFNLEtBQUssV0FBVztRQUN6QixPQUFPLG9CQUFvQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5QyxDQUFDOzs7O0lBRU0sTUFBTSxLQUFLLGdCQUFnQjtRQUM5QixPQUFPLG9CQUFvQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5QyxDQUFDOzs7O0lBRU0sTUFBTSxLQUFLLFVBQVU7UUFDeEIsT0FBTyxvQkFBb0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUMsQ0FBQzs7OztJQUVNLE1BQU0sS0FBSyxJQUFJO1FBQ2xCLE9BQU8sb0JBQW9CLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlDLENBQUM7O0FBM0JjLCtCQUFVLEdBQ3JCO0lBQ0ksSUFBSSxtQkFBbUIsQ0FBQyxjQUFjLENBQUM7SUFDdkMsSUFBSSxtQkFBbUIsQ0FBQyxhQUFhLENBQUM7SUFDdEMsSUFBSSxtQkFBbUIsQ0FBQyxrQkFBa0IsQ0FBQztJQUMzQyxJQUFJLG1CQUFtQixDQUFDLFlBQVksQ0FBQztJQUNyQyxJQUFJLG1CQUFtQixDQUFDLE1BQU0sQ0FBQztDQUNsQyxDQUFDOzs7Ozs7SUFQTixnQ0FPTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbm5lY3Rpb25UcmFuc3BvcnQgfSBmcm9tICcuL2Nvbm5lY3Rpb24udHJhbnNwb3J0JztcclxuXHJcbi8vIEBkeW5hbWljXHJcbmV4cG9ydCBjbGFzcyBDb25uZWN0aW9uVHJhbnNwb3J0cyB7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgdHJhbnNwb3J0czogQ29ubmVjdGlvblRyYW5zcG9ydFtdID1cclxuICAgICAgICBbXHJcbiAgICAgICAgICAgIG5ldyBDb25uZWN0aW9uVHJhbnNwb3J0KCdmb3JldmVyRnJhbWUnKSxcclxuICAgICAgICAgICAgbmV3IENvbm5lY3Rpb25UcmFuc3BvcnQoJ2xvbmdQb2xsaW5nJyksXHJcbiAgICAgICAgICAgIG5ldyBDb25uZWN0aW9uVHJhbnNwb3J0KCdzZXJ2ZXJTZW50RXZlbnRzJyksXHJcbiAgICAgICAgICAgIG5ldyBDb25uZWN0aW9uVHJhbnNwb3J0KCd3ZWJTb2NrZXRzJyksXHJcbiAgICAgICAgICAgIG5ldyBDb25uZWN0aW9uVHJhbnNwb3J0KCdhdXRvJyksXHJcbiAgICAgICAgXTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBmb3JldmVyRnJhbWUoKTogQ29ubmVjdGlvblRyYW5zcG9ydCB7XHJcbiAgICAgICAgcmV0dXJuIENvbm5lY3Rpb25UcmFuc3BvcnRzLnRyYW5zcG9ydHNbMF07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgbG9uZ1BvbGxpbmcoKTogQ29ubmVjdGlvblRyYW5zcG9ydCB7XHJcbiAgICAgICAgcmV0dXJuIENvbm5lY3Rpb25UcmFuc3BvcnRzLnRyYW5zcG9ydHNbMV07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgc2VydmVyU2VudEV2ZW50cygpOiBDb25uZWN0aW9uVHJhbnNwb3J0IHtcclxuICAgICAgICByZXR1cm4gQ29ubmVjdGlvblRyYW5zcG9ydHMudHJhbnNwb3J0c1syXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCB3ZWJTb2NrZXRzKCk6IENvbm5lY3Rpb25UcmFuc3BvcnQge1xyXG4gICAgICAgIHJldHVybiBDb25uZWN0aW9uVHJhbnNwb3J0cy50cmFuc3BvcnRzWzNdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IGF1dG8oKTogQ29ubmVjdGlvblRyYW5zcG9ydCB7XHJcbiAgICAgICAgcmV0dXJuIENvbm5lY3Rpb25UcmFuc3BvcnRzLnRyYW5zcG9ydHNbNF07XHJcbiAgICB9XHJcbn1cclxuIl19