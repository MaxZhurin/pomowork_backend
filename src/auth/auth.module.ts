import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TimerModule } from '@/src/timer/timer.module';
import { UsersModule } from '@/src/users/users.module';
import { SettingsModule } from '@/src/settings/settings.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
console.log(jwtConstants.secret)
@Module({
  imports: [
    UsersModule,
    TimerModule,
    SettingsModule,
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
