import { Body, Controller, Inject, Post } from '@nestjs/common';
import { SignInDto, SignUpDto } from './dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { Message, signIn } from './user.type';

@Controller('user')
export class UserController {
  @Inject(UserService)
  private readonly service: UserService;

  @Post('/signIn')
  public async signIn(@Body() body: SignInDto): Promise<signIn> {
    console.log('signIn');

    const result = await this.service.getUser(body);
    if (!result) {
      const isIdExist = await this.service.checkId(body);
      return {
        id: '',
        isDelete: false,
        message: isIdExist
          ? '패스워드가 틀렸습니다'
          : '존재하지 않는 아이디 입니다',
      };
    } else {
      return {
        id: result.id,
        isDelete: result.isDeleted,
        message: '정상 로그인',
      };
    }
  }

  @Post('/signUp')
  public async signUp(@Body() body: SignUpDto): Promise<Message> {
    const result = this.service.createUser(body);

    return { message: 'as' };
  }
}
