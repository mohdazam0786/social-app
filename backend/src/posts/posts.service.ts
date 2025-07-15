import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './schemas/post.schema';
import { Model } from 'mongoose';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  createPost(userId: string, title: string, description: string) {
    return this.postModel.create({ userId, title, description });
  }

  async getTimeline(userId: string, following: string[]) {
    return this.postModel
      .find({ userId: { $in: following }})
      .populate('userId', 'username') 
      .sort({ createdAt: -1 });
  }

}
