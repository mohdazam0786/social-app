import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // .env se config read karega
    MongooseModule.forRoot(process.env.MONGODB_URI!), UsersModule, AuthModule, PostsModule,
  ],
})
export class AppModule {}
