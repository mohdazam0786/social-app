import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  createUser(username: string, hashedPassword: string) {
    return this.userModel.create({ username, password: hashedPassword });
  }

  findByUsername(username: string) {
    return this.userModel.findOne({ username });
  }

  async findById(userId: string): Promise<UserDocument | null> {
  return this.userModel.findById(userId);
}

  follow(userId: string, targetId: string) {
    return Promise.all([
      this.userModel.findByIdAndUpdate(userId, { $addToSet: { following: targetId } }),
      this.userModel.findByIdAndUpdate(targetId, { $addToSet: { followers: userId } }),
    ]);
  }

  unfollow(userId: string, targetId: string) {
    return Promise.all([
      this.userModel.findByIdAndUpdate(userId, { $pull: { following: targetId } }),
      this.userModel.findByIdAndUpdate(targetId, { $pull: { followers: userId } }),
    ]);
  }

  async findAllExcept(currentUserId: string) {
    const currentUser = await this.userModel.findById(currentUserId).lean();
    const followingIds = currentUser?.following.map((id: any) => id.toString());

    const allUsers = await this.userModel.find({ _id: { $ne: currentUserId } }).lean();

    return allUsers.map(user => ({
      _id: user._id,
      username: user.username,
      isFollowing: followingIds?.includes(user._id.toString()),
    }));
  }
}
