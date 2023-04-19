import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  public getUser(id: number): Promise<User> {
    return this.repository.findOneBy({ id });
  }

  public createUser(body: CreateUserDto): Promise<User> {
    const user: User = new User();

    user.email = body.email;
    user.password = user.password;

    return this.repository.save(user);
  }
}
