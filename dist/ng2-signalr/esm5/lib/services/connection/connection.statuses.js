/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ConnectionStatus } from './connection.status';
// @dynamic
var ConnectionStatuses = /** @class */ (function () {
    function ConnectionStatuses() {
    }
    Object.defineProperty(ConnectionStatuses, "connecting", {
        get: /**
         * @return {?}
         */
        function () {
            return ConnectionStatuses.statuses[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectionStatuses, "connected", {
        get: /**
         * @return {?}
         */
        function () {
            return ConnectionStatuses.statuses[1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectionStatuses, "reconnecting", {
        get: /**
         * @return {?}
         */
        function () {
            return ConnectionStatuses.statuses[2];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectionStatuses, "disconnected", {
        get: /**
         * @return {?}
         */
        function () {
            return ConnectionStatuses.statuses[3];
        },
        enumerable: true,
        configurable: true
    });
    ConnectionStatuses.statuses = [
        new ConnectionStatus(0),
        new ConnectionStatus(1),
        new ConnectionStatus(2),
        new ConnectionStatus(4)
    ];
    return ConnectionStatuses;
}());
export { ConnectionStatuses };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ConnectionStatuses.statuses;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdGlvbi5zdGF0dXNlcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1zaWduYWxyLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2Nvbm5lY3Rpb24vY29ubmVjdGlvbi5zdGF0dXNlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7O0FBR3ZEO0lBQUE7SUF5QkEsQ0FBQztJQWZHLHNCQUFrQixnQ0FBVTs7OztRQUE1QjtZQUNJLE9BQU8sa0JBQWtCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFDLENBQUM7OztPQUFBO0lBRUQsc0JBQWtCLCtCQUFTOzs7O1FBQTNCO1lBQ0ksT0FBTyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUMsQ0FBQzs7O09BQUE7SUFFRCxzQkFBa0Isa0NBQVk7Ozs7UUFBOUI7WUFDSSxPQUFPLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxQyxDQUFDOzs7T0FBQTtJQUVELHNCQUFrQixrQ0FBWTs7OztRQUE5QjtZQUNJLE9BQU8sa0JBQWtCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFDLENBQUM7OztPQUFBO0lBdEJjLDJCQUFRLEdBQ25CO1FBQ0ksSUFBSSxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7UUFDdkIsSUFBSSxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7UUFDdkIsSUFBSSxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7UUFDdkIsSUFBSSxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7S0FDMUIsQ0FBQztJQWlCVix5QkFBQztDQUFBLEFBekJELElBeUJDO1NBekJZLGtCQUFrQjs7Ozs7O0lBRTNCLDRCQU1NIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29ubmVjdGlvblN0YXR1cyB9IGZyb20gJy4vY29ubmVjdGlvbi5zdGF0dXMnO1xyXG5cclxuLy8gQGR5bmFtaWNcclxuZXhwb3J0IGNsYXNzIENvbm5lY3Rpb25TdGF0dXNlcyB7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgc3RhdHVzZXM6IENvbm5lY3Rpb25TdGF0dXNbXSA9XHJcbiAgICAgICAgW1xyXG4gICAgICAgICAgICBuZXcgQ29ubmVjdGlvblN0YXR1cygwKSxcclxuICAgICAgICAgICAgbmV3IENvbm5lY3Rpb25TdGF0dXMoMSksXHJcbiAgICAgICAgICAgIG5ldyBDb25uZWN0aW9uU3RhdHVzKDIpLFxyXG4gICAgICAgICAgICBuZXcgQ29ubmVjdGlvblN0YXR1cyg0KVxyXG4gICAgICAgIF07XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgY29ubmVjdGluZygpOiBDb25uZWN0aW9uU3RhdHVzIHtcclxuICAgICAgICByZXR1cm4gQ29ubmVjdGlvblN0YXR1c2VzLnN0YXR1c2VzWzBdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IGNvbm5lY3RlZCgpOiBDb25uZWN0aW9uU3RhdHVzIHtcclxuICAgICAgICByZXR1cm4gQ29ubmVjdGlvblN0YXR1c2VzLnN0YXR1c2VzWzFdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IHJlY29ubmVjdGluZygpOiBDb25uZWN0aW9uU3RhdHVzIHtcclxuICAgICAgICByZXR1cm4gQ29ubmVjdGlvblN0YXR1c2VzLnN0YXR1c2VzWzJdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IGRpc2Nvbm5lY3RlZCgpOiBDb25uZWN0aW9uU3RhdHVzIHtcclxuICAgICAgICByZXR1cm4gQ29ubmVjdGlvblN0YXR1c2VzLnN0YXR1c2VzWzNdO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==