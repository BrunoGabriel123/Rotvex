"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const http_exception_filter_1 = require("./common/filters/http-exception.filter");
const logging_interceptor_1 = require("./common/interceptors/logging.interceptor");
const transform_interceptor_1 = require("./common/interceptors/transform.interceptor");
const timeout_interceptor_1 = require("./common/interceptors/timeout.interceptor");
const validation_pipe_1 = require("./common/pipes/validation.pipe");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: process.env.FRONTEND_URL || 'http://localhost:3000',
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.useGlobalPipes(new validation_pipe_1.ValidationPipe());
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    app.useGlobalInterceptors(new logging_interceptor_1.LoggingInterceptor(), new transform_interceptor_1.TransformInterceptor(), new timeout_interceptor_1.TimeoutInterceptor());
    const config = new swagger_1.DocumentBuilder()
        .setTitle(process.env.SWAGGER_TITLE || 'Rotvex API')
        .setDescription(process.env.SWAGGER_DESCRIPTION ||
        'Rotvex - SaaS de gerenciamento logístico')
        .setVersion(process.env.SWAGGER_VERSION || '1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    const port = process.env.PORT || 3001;
    await app.listen(port);
    console.log(`Backend is running on port ${port}`);
    console.log(`Swagger documentation available at http://localhost:${port}/api`);
}
void bootstrap();
//# sourceMappingURL=main.js.map