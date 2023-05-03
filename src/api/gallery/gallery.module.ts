import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GalleryParticipants } from '../gallery-participants/gallery-participants.entity';
import { Photo } from '../photo/photo.entity';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { GalleryController } from './gallery.controller';
import { Gallery } from './gallery.entity';
import { GalleryService } from './gallery.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Gallery, User, GalleryParticipants, Photo]),
  ],
  controllers: [GalleryController],
  providers: [GalleryService, UserService],
})
export class GalleryModule {}
