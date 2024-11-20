import axios from 'axios';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SettingsService } from './../settings/settings.service';
import { TimerService } from './../timer/timer.service';
import { jwtConstants } from './constants';
import { RefreshDTO } from './dto/auth.dto';
import { UserService } from '@/src/users/users.service';
import { User } from '../database/entities/user.entity';

type GoogleRes = {
  sub: string;
  name: string;
  picture: string;
  email: string;
  email_verified: boolean;
};

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private timerService: TimerService,
    private settingsService: SettingsService,
    private jwtService: JwtService,
  ) {}

  async authWithGoogle({ token }) {
    try {
      const { data } = await axios.get<GoogleRes>(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`,
      );

      let user = await this.usersService.findByLogin(data.email);

      if (!user) {
        const newUser = new User();

        newUser.email = data.email;
        newUser.name = data.name;
        newUser.googleId = data.sub;
        newUser.picture = data.picture;

        user = await this.usersService.create(newUser);
        await this.timerService.create(user.id);
        await this.settingsService.create(user.id);
      }

      const { id, email, picture } = user;

      const tokens = await this._getTokens({
        id,
        email,
      });

      return {
        ...tokens,
        user: {
          id,
          email,
          picture,
        },
      };
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }
  }

  async refresh(refreshDTO: RefreshDTO) {
    try {
      const data = await this.jwtService.verifyAsync(refreshDTO.refreshToken, {
        secret: jwtConstants.secret,
      });

      if (data) {
        const tokens = await this._getTokens({
          id: data.id,
          email: data.email,
        });

        return tokens;
      } else {
        throw new UnauthorizedException();
      }
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }
  }

  async _getTokens(payload) {
    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: '3h',
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
      }),
    };
  }
}
