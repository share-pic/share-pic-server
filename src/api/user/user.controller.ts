import { Body, Controller, Inject, Post } from '@nestjs/common';
import { SignInDto, SignUpDto } from './dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  @Inject(UserService)
  private readonly service: UserService;

  @Post(':signIn')
  public signIn(@Body() body: SignInDto): Promise<User> {
    const result = this.service.getUser(body);

    return result;
  }

  @Post(':signUp')
  public signUp(@Body() body: SignUpDto): Promise<User> {
    const result = this.service.createUser(body);
    return result;
  }
}
