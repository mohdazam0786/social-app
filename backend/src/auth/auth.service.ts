import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(username: string, password: string) {
    const hashed = await bcrypt.hash(password, 10);
    const user = await this.usersService.createUser(username, hashed);
    return user;
  }

  async login(username: string, password: string) {
    const user = await this.usersService.findByUsername(username);
    if (!user) throw new UnauthorizedException('User not found');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user._id, username: user.username };
    const access_token = this.jwtService.sign(payload, { secret: process.env.JWT_SECRET, expiresIn: process.env.JWT_EXPIRES_IN });
    const refresh_token = this.jwtService.sign(payload, { secret: process.env.JWT_REFRESH_SECRET, expiresIn: process.env.JWT_REFRESH_EXPIRES_IN });

    return { access_token, refresh_token };
  }
}
