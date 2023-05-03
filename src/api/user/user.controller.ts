import { Body, Controller, Inject, Post } from '@nestjs/common';
import { SignInDto, SignUpDto } from './dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { SignIn, SignUp } from './user.type';

@Controller('user')
export class UserController {
  @Inject(UserService)
  private readonly service: UserService;

  @Post('/signIn')
  public async signIn(@Body() body: SignInDto): Promise<SignIn> {
    console.log('signIn');

    const result = await this.service.getUser(body);
    if (!result) {
      const isIdExist = await this.service.checkId(body.id);
      return {
        id: '',
        isDelete: false,
        code: isIdExist ? 101 : 102,
      };
    } else {
      return {
        id: result.id,
        isDelete: result.isDeleted,
        code: 100,
      };
    }
  }

  @Post('/signUp')
  public async signUp(@Body() body: SignUpDto): Promise<SignUp> {
    const isDuplicate = await this.service.checkId(body.id);
    console.log(isDuplicate);

    if (isDuplicate) {
      return { isCreated: false, code: 111 };
    } else {
      this.service.createUser(body);
      return { isCreated: true, code: 110 };
    }
  }
}
