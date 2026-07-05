import { CreateUserDto } from './create-user.dto';
declare const UpdateUserDto_base: import("@nestjs/common").Type<Partial<Omit<CreateUserDto, "email" | "password" | "companyId">>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
}
export {};
