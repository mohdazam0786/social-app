import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsersService } from '../users/users.service';

@Controller('posts')
export class PostsController {
  constructor(
    private postsService: PostsService,
    private usersService: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  create(@Request() req, @Body() body: { title: string; description: string }) {
    return this.postsService.createPost(req.user.userId, body.title, body.description);
  }

  @UseGuards(JwtAuthGuard)
  @Get('timeline')
  async timeline(@Request() req) {
    const user = await this.usersService.findById(req.user.userId);
    if (!user) {
        throw new Error('User not found');
    }
    return this.postsService.getTimeline(user.id, user.following);
  }
}
