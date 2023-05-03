import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Gallery } from '../gallery/gallery.entity';
import { User } from '../user/user.entity';

export enum Status {
  INVITE = 'invite',
  KICKOUT = 'kickout',
  JOIN = 'join',
}

@Entity()
export class GalleryParticipants {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'enum', enum: Status, default: Status.JOIN })
  public status: Status;

  @ManyToOne(() => Gallery, gallery => gallery.galleryParticipants)
  public gallery: Gallery;

  @ManyToOne(() => User, user => user.galleryParticipants)
  public user: User;
}
