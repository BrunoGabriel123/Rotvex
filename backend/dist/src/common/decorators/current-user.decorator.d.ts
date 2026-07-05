export interface CurrentUserData {
    id: string;
    email: string;
    name: string;
    companyId: string;
    roleId: string;
}
export declare const CurrentUser: (...dataOrPipes: (import("@nestjs/common").PipeTransform<any, any> | keyof CurrentUserData | import("@nestjs/common").Type<import("@nestjs/common").PipeTransform<any, any>> | undefined)[]) => ParameterDecorator;
