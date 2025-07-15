import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';  // <-- add
import { JwtStrategy } from './jwt.strategy';  

@Module({
  imports: [
    UsersModule,
    PassportModule,     // <-- add
    JwtModule.register({}),// config hamesha service me pass karenge
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
