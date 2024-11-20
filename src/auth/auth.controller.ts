import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  RefreshDTO,
} from './dto/auth.dto';
import { Public } from '@/src/shared/decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('auth-google')
  authWithGoogle(@Body() token) {
    return this.authService.authWithGoogle(token);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  refresh(@Body() refreshDTO: RefreshDTO) {
    return this.authService.refresh(refreshDTO);
  }
}
