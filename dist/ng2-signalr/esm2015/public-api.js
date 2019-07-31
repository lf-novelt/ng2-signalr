/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Public API Surface of ng2-signalr
 */
export { SignalRConnectionMock } from './lib/services/testing/signalr.connection.mock';
export { SignalRConnectionMockManager } from './lib/services/testing/signalr.connection.mock.manager';
export { ConnectionStatus } from './lib/services/connection/connection.status';
export { ConnectionStatuses } from './lib/services/connection/connection.statuses';
export { BroadcastEventListener } from './lib/services/eventing/broadcast.event.listener';
export { SignalRConnection } from './lib/services/connection/signalr.connection';
export { ConnectionTransport } from './lib/services/connection/connection.transport';
export { ConnectionTransports } from './lib/services/connection/connection.transports';
export { SignalR } from './lib/services/signalr';
export { SignalRConfiguration } from './lib/services/signalr.configuration';
export { SignalRModule } from './lib/modules/signalr-module';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljLWFwaS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1zaWduYWxyLyIsInNvdXJjZXMiOlsicHVibGljLWFwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBS0EsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDdkYsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sd0RBQXdELENBQUM7QUFDdEcsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDL0UsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDbkYsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDMUYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFFakYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDckYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0saURBQWlELENBQUM7QUFDdkYsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQzVFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAqIFB1YmxpYyBBUEkgU3VyZmFjZSBvZiBuZzItc2lnbmFsclxyXG4gKi9cclxuXHJcbmV4cG9ydCB7IElTaWduYWxSQ29ubmVjdGlvbiB9IGZyb20gJy4vbGliL3NlcnZpY2VzL2Nvbm5lY3Rpb24vaS5zaWduYWxyLmNvbm5lY3Rpb24nO1xyXG5leHBvcnQgeyBTaWduYWxSQ29ubmVjdGlvbk1vY2sgfSBmcm9tICcuL2xpYi9zZXJ2aWNlcy90ZXN0aW5nL3NpZ25hbHIuY29ubmVjdGlvbi5tb2NrJztcclxuZXhwb3J0IHsgU2lnbmFsUkNvbm5lY3Rpb25Nb2NrTWFuYWdlciB9IGZyb20gJy4vbGliL3NlcnZpY2VzL3Rlc3Rpbmcvc2lnbmFsci5jb25uZWN0aW9uLm1vY2subWFuYWdlcic7XHJcbmV4cG9ydCB7IENvbm5lY3Rpb25TdGF0dXMgfSBmcm9tICcuL2xpYi9zZXJ2aWNlcy9jb25uZWN0aW9uL2Nvbm5lY3Rpb24uc3RhdHVzJztcclxuZXhwb3J0IHsgQ29ubmVjdGlvblN0YXR1c2VzIH0gZnJvbSAnLi9saWIvc2VydmljZXMvY29ubmVjdGlvbi9jb25uZWN0aW9uLnN0YXR1c2VzJztcclxuZXhwb3J0IHsgQnJvYWRjYXN0RXZlbnRMaXN0ZW5lciB9IGZyb20gJy4vbGliL3NlcnZpY2VzL2V2ZW50aW5nL2Jyb2FkY2FzdC5ldmVudC5saXN0ZW5lcic7XHJcbmV4cG9ydCB7IFNpZ25hbFJDb25uZWN0aW9uIH0gZnJvbSAnLi9saWIvc2VydmljZXMvY29ubmVjdGlvbi9zaWduYWxyLmNvbm5lY3Rpb24nO1xyXG5leHBvcnQgeyBJQ29ubmVjdGlvbk9wdGlvbnMgfSBmcm9tICcuL2xpYi9zZXJ2aWNlcy9jb25uZWN0aW9uL2Nvbm5lY3Rpb24ub3B0aW9ucyc7XHJcbmV4cG9ydCB7IENvbm5lY3Rpb25UcmFuc3BvcnQgfSBmcm9tICcuL2xpYi9zZXJ2aWNlcy9jb25uZWN0aW9uL2Nvbm5lY3Rpb24udHJhbnNwb3J0JztcclxuZXhwb3J0IHsgQ29ubmVjdGlvblRyYW5zcG9ydHMgfSBmcm9tICcuL2xpYi9zZXJ2aWNlcy9jb25uZWN0aW9uL2Nvbm5lY3Rpb24udHJhbnNwb3J0cyc7XHJcbmV4cG9ydCB7IFNpZ25hbFIgfSBmcm9tICcuL2xpYi9zZXJ2aWNlcy9zaWduYWxyJztcclxuZXhwb3J0IHsgU2lnbmFsUkNvbmZpZ3VyYXRpb24gfSBmcm9tICcuL2xpYi9zZXJ2aWNlcy9zaWduYWxyLmNvbmZpZ3VyYXRpb24nO1xyXG5leHBvcnQgeyBTaWduYWxSTW9kdWxlIH0gZnJvbSAnLi9saWIvbW9kdWxlcy9zaWduYWxyLW1vZHVsZSc7XHJcblxyXG4iXX0=