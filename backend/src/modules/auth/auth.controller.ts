import { Controller } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  @ApiOperation({ summary: 'Login' })
  // TODO: Implement login endpoint
  login() {
    return {};
  }

  @ApiOperation({ summary: 'Register' })
  // TODO: Implement register endpoint
  register() {
    return {};
  }

  @ApiOperation({ summary: 'Refresh token' })
  // TODO: Implement refresh token endpoint
  refresh() {
    return {};
  }

  @ApiOperation({ summary: 'Logout' })
  // TODO: Implement logout endpoint
  logout() {
    return {};
  }
}
