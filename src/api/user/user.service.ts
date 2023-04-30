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
      id: body.id,
      password: body.password,
    });
  }

  public checkId(body: SignInDto): Promise<number> {
    return this.repository.countBy({
      id: body.id,
    });
  }

  public createUser(body: SignUpDto): Promise<User> {
    const user: User = new User();

    user.id = body.id;
    user.password = body.password;

    return this.repository.save(user);
  }
}
