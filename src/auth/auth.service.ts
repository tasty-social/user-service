import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOne(email);
    if(user && await bcrypt.compare(password, user.password)) {
      const {password, ...result} = user;

      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {email: user.email, sub: user._id};
    return {
      accessToken: this.jwtService.sign(payload),
    }
  }

  async register(user: CreateUserDto) {
    console.log("dbbbdb");
    return await this.usersService.create(user);
  }
}
