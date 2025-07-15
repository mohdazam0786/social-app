import { Controller, Post, Param, UseGuards, Request, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  getAllUsers(@Request() req) {
    return this.usersService.findAllExcept(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/follow')
  follow(@Param('id') id: string, @Request() req) {
    return this.usersService.follow(req.user.userId, id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/unfollow')
  unfollow(@Param('id') id: string, @Request() req) {
    return this.usersService.unfollow(req.user.userId, id);
  }
}
