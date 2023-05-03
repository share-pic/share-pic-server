import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  GalleryParticipants,
  Status,
} from '../gallery-participants/gallery-participants.entity';
import { User } from '../user/user.entity';
import { CreateGalleryDto } from './dto';
import { InviteParticipantDto } from './dto/invite-participant.dto';
import { JoinGalleryDto } from './dto/join-gallery.dto';
import { Gallery } from './gallery.entity';

@Injectable()
export class GalleryService {
  @InjectRepository(Gallery)
  private readonly galleryRepository: Repository<Gallery>;
  @InjectRepository(GalleryParticipants)
  private readonly galleryParticipantsRepository: Repository<GalleryParticipants>;
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  public async createGallery(body: CreateGalleryDto) {
    const user = await this.userRepository.findOneBy({ id: body.userId });
    const gallery = await this.galleryRepository.create({
      master: user,
      name: body.name,
    });
    await this.galleryRepository.save(gallery);
    this.galleryParticipantsRepository.save({
      gallery,
      user,
    });
    return gallery;
  }

  public checkGalleryByName(name: string) {
    return this.galleryRepository.countBy({ name });
  }
  public checkGalleryById(id: number) {
    return this.galleryRepository.countBy({ id });
  }

  public async getGalleryList(userId: string) {
    const galleryParticipantRows =
      await this.galleryParticipantsRepository.find({
        where: { user: { id: userId } },
        relations: { gallery: true },
      });

    const galleryList = galleryParticipantRows.map(
      galleryParticipant => galleryParticipant.gallery,
    );

    return galleryList;
  }

  public async inviteParticipant(body: InviteParticipantDto) {
    const user = await this.userRepository.findOneBy({ id: body.userId });
    const gallery = await this.galleryRepository.findOneBy({
      id: body.galleryId,
    });
    console.log(user);
    console.log(gallery);
    const galleryParticipants = this.galleryParticipantsRepository.create({
      gallery,
      user,
      status: Status.INVITE,
    });
    this.galleryParticipantsRepository.save(galleryParticipants);
  }

  public async getGalleryParticipants(
    body: InviteParticipantDto,
  ): Promise<GalleryParticipants> {
    const user = await this.userRepository.findOneBy({ id: body.userId });
    const gallery = await this.galleryRepository.findOneBy({
      id: body.galleryId,
    });

    const galleryParticipants =
      await this.galleryParticipantsRepository.findOneBy({
        user,
        gallery,
      });

    return galleryParticipants;
  }

  public async joinGallery(body: JoinGalleryDto) {
    const galleryParticipants =
      await this.galleryParticipantsRepository.findOneBy({
        gallery: { id: body.galleryId },
        user: {
          id: body.userId,
        },
      });
    console.log('galleryParticipants');
    console.log(galleryParticipants);

    galleryParticipants.status = Status.JOIN;
    this.galleryParticipantsRepository.save(galleryParticipants);
    return {};
  }
}
