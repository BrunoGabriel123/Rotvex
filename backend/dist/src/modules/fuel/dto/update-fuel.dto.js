"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFuelDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_fuel_dto_1 = require("./create-fuel.dto");
class UpdateFuelDto extends (0, swagger_1.PartialType)(create_fuel_dto_1.CreateFuelDto) {
}
exports.UpdateFuelDto = UpdateFuelDto;
//# sourceMappingURL=update-fuel.dto.js.map