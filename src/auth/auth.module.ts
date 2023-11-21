import { DevicesModule } from '../devices/devices.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
import { UsersModule } from '../users/users.module';
// import { DevicesModule } from '../devices/devices.service';
import { DevicesService } from '../devices/devices.service';

@Module({
  imports: [
    UsersModule,
    DevicesModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
