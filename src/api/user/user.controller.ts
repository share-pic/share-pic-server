import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { SignInDto, SignUpDto } from './dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  @Inject(UserService)
  private readonly service: UserService;

  @Post(':signin')
  public signIn(@Body() body: SignInDto): Promise<User> {
    const result = this.service.getUser(body);
    console.log(result);

    return result;
  }

  @Post(':signup')
  public signUp(@Body() body: SignUpDto): Promise<User> {
    return this.service.createUser(body);
  }
}
