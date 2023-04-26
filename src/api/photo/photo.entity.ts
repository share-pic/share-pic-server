import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Gallery } from '../gallery/gallery.entity';
import { User } from '../user/user.entity';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  public index!: number;

  @Column({ type: 'varchar' })
  public id: string;

  @Column({ type: 'varchar' })
  public fileName: string;

  @Column({ type: 'varchar' })
  public fileUrl: string;

  @ManyToOne(() => Gallery, gallery => gallery.photos)
  public gallery: Gallery;

  @ManyToOne(() => User, user => user.photos)
  public user: User;

  @Column({ type: 'boolean', default: false })
  public isDeleted: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;
}
