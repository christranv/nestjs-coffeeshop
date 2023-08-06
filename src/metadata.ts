/* eslint-disable */
export default async () => {
    const t = {};
    return { "@nestjs/swagger": { "models": [[import("./modules/counter/application/queries/impl/fulfilled-orders.query"), { "GetFulfilledOrdersQuery": {} }], [import("./modules/counter/domain/commands/place-order.command"), { "PlaceOrderCommand": { timeStamp: { required: true, type: () => Date } } }], [import("./modules/user/application/queries/impl/login.query"), { "LoginQuery": { username: { required: true, type: () => String }, password: { required: true, type: () => String } } }]], "controllers": [[import("./health.controller"), { "HealthController": { "check": { type: Object } } }], [import("./modules/barista/api/barista.controller"), { "BaristaController": { "get": {} } }], [import("./modules/counter/api/order.controller"), { "OrderController": { "getFulfilledOrders": { type: Object }, "place": {}, "test": { type: String } } }], [import("./modules/kitchen/api/kitchen.controller"), { "KitchenController": { "get": { type: String } } }], [import("./modules/user/api/auth.controller"), { "AuthController": { "login": {}, "test": { type: String } } }]] } };
};