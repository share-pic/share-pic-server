import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { GalleryParticipants } from '../gallery-participants/gallery-participants.entity';
import { Gallery } from '../gallery/gallery.entity';
import { Photo } from '../photo/photo.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public index!: number;

  @Column({ type: 'varchar', length: 20 })
  public id: string;

  @Column({ type: 'varchar' })
  public password: string;

  @OneToMany(() => Gallery, gallery => gallery.master)
  public galleries: Gallery[];

  @OneToMany(() => Photo, photo => photo.user)
  public photos: Photo[];

  @OneToMany(
    () => GalleryParticipants,
    galleryParticipants => galleryParticipants.user,
  )
  public galleryParticipants: GalleryParticipants[];

  @Column({ type: 'boolean', default: false })
  public isDeleted: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;
}
