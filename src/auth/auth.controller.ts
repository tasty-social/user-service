import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginUserDto } from 'src/users/dto/login-user.dto'
import { CreateUserDto } from 'src/users/dto/create-user.dto'
import { ApiBody, ApiTags } from '@nestjs/swagger'

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiBody({ type: LoginUserDto })
  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.authService.validateUser(loginUserDto.email, loginUserDto.password)
    if (!user) {
      throw new HttpException('message', HttpStatus.BAD_REQUEST)
    }

    return this.authService.login(user)
  }

  @Post('register')
  @ApiBody({ type: CreateUserDto })
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.authService.register(createUserDto)
  }
}
