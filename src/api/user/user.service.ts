import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignInDto, SignUpDto } from './dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  public getUser(body: SignInDto): Promise<User> {
    return this.repository.findOneBy({
      email: body.email,
      password: body.password,
    });
  }

  public createUser(body: SignUpDto): Promise<User> {
    const user: User = new User();

    user.email = body.email;
    user.password = user.password;

    return this.repository.save(user);
  }
}
