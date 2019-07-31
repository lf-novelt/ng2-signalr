/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ConnectionStatus } from './connection.status';
// @dynamic
export class ConnectionStatuses {
    /**
     * @return {?}
     */
    static get connecting() {
        return ConnectionStatuses.statuses[0];
    }
    /**
     * @return {?}
     */
    static get connected() {
        return ConnectionStatuses.statuses[1];
    }
    /**
     * @return {?}
     */
    static get reconnecting() {
        return ConnectionStatuses.statuses[2];
    }
    /**
     * @return {?}
     */
    static get disconnected() {
        return ConnectionStatuses.statuses[3];
    }
}
ConnectionStatuses.statuses = [
    new ConnectionStatus(0),
    new ConnectionStatus(1),
    new ConnectionStatus(2),
    new ConnectionStatus(4)
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    ConnectionStatuses.statuses;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdGlvbi5zdGF0dXNlcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1zaWduYWxyLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2Nvbm5lY3Rpb24vY29ubmVjdGlvbi5zdGF0dXNlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7O0FBR3ZELE1BQU0sT0FBTyxrQkFBa0I7Ozs7SUFVcEIsTUFBTSxLQUFLLFVBQVU7UUFDeEIsT0FBTyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUMsQ0FBQzs7OztJQUVNLE1BQU0sS0FBSyxTQUFTO1FBQ3ZCLE9BQU8sa0JBQWtCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFDLENBQUM7Ozs7SUFFTSxNQUFNLEtBQUssWUFBWTtRQUMxQixPQUFPLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxQyxDQUFDOzs7O0lBRU0sTUFBTSxLQUFLLFlBQVk7UUFDMUIsT0FBTyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUMsQ0FBQzs7QUF0QmMsMkJBQVEsR0FDbkI7SUFDSSxJQUFJLGdCQUFnQixDQUFDLENBQUMsQ0FBQztJQUN2QixJQUFJLGdCQUFnQixDQUFDLENBQUMsQ0FBQztJQUN2QixJQUFJLGdCQUFnQixDQUFDLENBQUMsQ0FBQztJQUN2QixJQUFJLGdCQUFnQixDQUFDLENBQUMsQ0FBQztDQUMxQixDQUFDOzs7Ozs7SUFOTiw0QkFNTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbm5lY3Rpb25TdGF0dXMgfSBmcm9tICcuL2Nvbm5lY3Rpb24uc3RhdHVzJztcclxuXHJcbi8vIEBkeW5hbWljXHJcbmV4cG9ydCBjbGFzcyBDb25uZWN0aW9uU3RhdHVzZXMge1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIHN0YXR1c2VzOiBDb25uZWN0aW9uU3RhdHVzW10gPVxyXG4gICAgICAgIFtcclxuICAgICAgICAgICAgbmV3IENvbm5lY3Rpb25TdGF0dXMoMCksXHJcbiAgICAgICAgICAgIG5ldyBDb25uZWN0aW9uU3RhdHVzKDEpLFxyXG4gICAgICAgICAgICBuZXcgQ29ubmVjdGlvblN0YXR1cygyKSxcclxuICAgICAgICAgICAgbmV3IENvbm5lY3Rpb25TdGF0dXMoNClcclxuICAgICAgICBdO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IGNvbm5lY3RpbmcoKTogQ29ubmVjdGlvblN0YXR1cyB7XHJcbiAgICAgICAgcmV0dXJuIENvbm5lY3Rpb25TdGF0dXNlcy5zdGF0dXNlc1swXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBjb25uZWN0ZWQoKTogQ29ubmVjdGlvblN0YXR1cyB7XHJcbiAgICAgICAgcmV0dXJuIENvbm5lY3Rpb25TdGF0dXNlcy5zdGF0dXNlc1sxXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCByZWNvbm5lY3RpbmcoKTogQ29ubmVjdGlvblN0YXR1cyB7XHJcbiAgICAgICAgcmV0dXJuIENvbm5lY3Rpb25TdGF0dXNlcy5zdGF0dXNlc1syXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBkaXNjb25uZWN0ZWQoKTogQ29ubmVjdGlvblN0YXR1cyB7XHJcbiAgICAgICAgcmV0dXJuIENvbm5lY3Rpb25TdGF0dXNlcy5zdGF0dXNlc1szXTtcclxuICAgIH1cclxufVxyXG4iXX0=