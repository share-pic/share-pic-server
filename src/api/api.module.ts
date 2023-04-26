import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ImageModule } from './image/image.module';
import { GalleryModule } from './gallery/gallery.module';
import { PhotoModule } from './photo/photo.module';
import { GalleryParticipantsModule } from './gallery-participants/gallery-participants.module';

@Module({
  imports: [UserModule, ImageModule, GalleryModule, PhotoModule, GalleryParticipantsModule],
})
export class ApiModule {}
