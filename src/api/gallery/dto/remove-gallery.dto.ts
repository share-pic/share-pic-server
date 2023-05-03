import { IsNotEmpty, IsString } from 'class-validator';

export class RemoveGalleryDto {
  @IsString()
  @IsNotEmpty()
  public userId: string;

  @IsString()
  @IsNotEmpty()
  public galleryId: string;
}
