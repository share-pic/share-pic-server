import { Module } from '@nestjs/common';
import { GalleryParticipantsController } from './gallery-participants.controller';
import { GalleryParticipantsService } from './gallery-participants.service';

@Module({
  controllers: [GalleryParticipantsController],
  providers: [GalleryParticipantsService]
})
export class GalleryParticipantsModule {}
