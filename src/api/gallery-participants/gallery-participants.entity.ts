import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Gallery } from '../gallery/gallery.entity';
import { User } from '../user/user.entity';

@Entity()
export class GalleryParticipants {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(() => Gallery, gallery => gallery.galleryParticipants)
  public gallery: Gallery;

  @ManyToOne(() => User, user => user.galleries)
  public user: User;
}
