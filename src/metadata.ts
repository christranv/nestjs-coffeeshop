/* eslint-disable */
export default async () => {
    const t = {};
    return { "@nestjs/swagger": { "models": [], "controllers": [[import("./health.controller"), { "HealthController": { "check": { type: Object } } }], [import("./modules/barista/api/barista.controller"), { "BaristaController": { "get": {} } }], [import("./modules/counter/api/order.controller"), { "OrderController": { "getFulfilledOrders": { type: Object }, "place": {} } }], [import("./modules/kitchen/api/kitchen.controller"), { "KitchenController": { "get": {} } }], [import("./modules/user/api/auth.controller"), { "AuthController": { "login": {}, "test": { type: String } } }]] } };
};