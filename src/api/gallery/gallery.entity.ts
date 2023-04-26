import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { GalleryParticipants } from '../gallery-participants/gallery-participants.entity';
import { Photo } from '../photo/photo.entity';
import { User } from '../user/user.entity';

@Entity()
export class Gallery {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @ManyToOne(() => User, user => user.galleries)
  public user: User;

  @OneToMany(
    () => GalleryParticipants,
    galleryParticipants => galleryParticipants.gallery,
  )
  public galleryParticipants: GalleryParticipants[];

  @OneToMany(() => Photo, photo => photo.gallery)
  public photos: Photo[];

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;
}
