"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFuelDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateFuelDto {
    liters;
    cost;
    fuelType;
    station;
    odometer;
    vehicleId;
}
exports.CreateFuelDto = CreateFuelDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 50 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateFuelDto.prototype, "liters", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 300 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateFuelDto.prototype, "cost", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'gasoline' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateFuelDto.prototype, "fuelType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Shell Station', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateFuelDto.prototype, "station", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 50000, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateFuelDto.prototype, "odometer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'vehicle-id' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateFuelDto.prototype, "vehicleId", void 0);
//# sourceMappingURL=create-fuel.dto.js.map