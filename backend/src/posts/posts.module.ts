import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Post, PostSchema } from './schemas/post.schema';
import { UsersModule } from '../users/users.module'; // <-- yeh import

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    UsersModule  
  ],
  providers: [PostsService],
  controllers: [PostsController],
  exports: [PostsService] 
})
export class PostsModule {}
