import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async create(createUserDto: CreateUserDto) {
    const checkExisted = await this.findOne(createUserDto.email);
    if (checkExisted) {
      throw new HttpException('Email already existed', HttpStatus.CONFLICT);
    }

    const hashedPassword = await this.hashPassword(createUserDto.password);
    const createdUser = new this.userModel({
      email: createUserDto.email,
      password: hashedPassword
    });
    console.log("created")
    return await createdUser.save();
  }

  async findOne(email: string) {
    return await this.userModel.findOne({ email }).exec()
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

}
