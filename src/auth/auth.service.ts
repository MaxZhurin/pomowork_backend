import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  LoginDto,
  RefreshDTO,
  LoginDeviceDTO,
  RefreshDeviceDTO,
} from './dto/auth.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from '@/src/users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { DevicesService } from '../devices/devices.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private devicesService: DevicesService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByLogin(loginDto.username);
    console.log(user);
    if (user?.password !== loginDto.password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.login };
    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: '3h',
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
      }),
    };
  }

  async loginDevice(loginDeviceDTO: LoginDeviceDTO) {
    const device = await this.devicesService.findOne(loginDeviceDTO.deviceId);

    const payload = { sub: loginDeviceDTO.deviceId, type: 'DEVICE', ...device };
    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: '3h',
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
      }),
    };
  }

  async refreshDevice(refreshDeviceDTO: RefreshDeviceDTO) {
    const data = await this.jwtService.verifyAsync(
      refreshDeviceDTO.refreshToken,
    );

    return this.loginDevice({ deviceId: data.id });
    console.log('refreshDevice ////////', data);
  }

  async refresh(refreshDTO: RefreshDTO) {
    try {
      console.log('refresh', refreshDTO);
      const data = await this.jwtService.verifyAsync(refreshDTO.refreshToken);
      console.log('refresh0', data);
    } catch (error) {}
  }

  register(createUserDto: LoginDto) {
    return 'This register';
  }
}
