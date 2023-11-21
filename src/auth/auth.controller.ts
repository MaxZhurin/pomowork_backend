import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginDto,
  RefreshDTO,
  LoginDeviceDTO,
  RefreshDeviceDTO,
} from './dto/auth.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from '@/src/shared/decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    console.log('loginDto', loginDto);
    return this.authService.login(loginDto);
  }

  @Public()
  @Post('login/device')
  loginDevice(@Body() loginDeviceDTO: LoginDeviceDTO) {
    console.log('loginDevice', loginDeviceDTO);
    return this.authService.loginDevice(loginDeviceDTO);
  }

  @Public()
  @Post('refresh/device')
  refreshDevice(@Body() refreshDeviceDTO: RefreshDeviceDTO) {
    // console.log('loginDevice', refreshDeviceDTO);
    return this.authService.refreshDevice(refreshDeviceDTO);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  refresh(@Body() refreshDTO: RefreshDTO) {
    console.log('loginDto', RefreshDTO);
    return this.authService.refresh(refreshDTO);
  }

  @Post('register')
  register(@Body() createUserDto: LoginDto) {
    return this.authService.register(createUserDto);
  }
}
