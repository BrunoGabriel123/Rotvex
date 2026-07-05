"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const health_controller_1 = require("./health/health.controller");
const auth_module_1 = require("./modules/auth/auth.module");
const users_module_1 = require("./modules/users/users.module");
const companies_module_1 = require("./modules/companies/companies.module");
const roles_module_1 = require("./modules/roles/roles.module");
const permissions_module_1 = require("./modules/permissions/permissions.module");
const vehicles_module_1 = require("./modules/vehicles/vehicles.module");
const drivers_module_1 = require("./modules/drivers/drivers.module");
const clients_module_1 = require("./modules/clients/clients.module");
const orders_module_1 = require("./modules/orders/orders.module");
const deliveries_module_1 = require("./modules/deliveries/deliveries.module");
const pickups_module_1 = require("./modules/pickups/pickups.module");
const routes_module_1 = require("./modules/routes/routes.module");
const maintenance_module_1 = require("./modules/maintenance/maintenance.module");
const fuel_module_1 = require("./modules/fuel/fuel.module");
const expenses_module_1 = require("./modules/expenses/expenses.module");
const dashboard_module_1 = require("./modules/dashboard/dashboard.module");
const reports_module_1 = require("./modules/reports/reports.module");
const notifications_module_1 = require("./modules/notifications/notifications.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            companies_module_1.CompaniesModule,
            roles_module_1.RolesModule,
            permissions_module_1.PermissionsModule,
            vehicles_module_1.VehiclesModule,
            drivers_module_1.DriversModule,
            clients_module_1.ClientsModule,
            orders_module_1.OrdersModule,
            deliveries_module_1.DeliveriesModule,
            pickups_module_1.PickupsModule,
            routes_module_1.RoutesModule,
            maintenance_module_1.MaintenanceModule,
            fuel_module_1.FuelModule,
            expenses_module_1.ExpensesModule,
            dashboard_module_1.DashboardModule,
            reports_module_1.ReportsModule,
            notifications_module_1.NotificationsModule,
        ],
        controllers: [app_controller_1.AppController, health_controller_1.HealthController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map