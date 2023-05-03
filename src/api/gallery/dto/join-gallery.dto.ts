import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class JoinGalleryDto {
  @IsString()
  @IsNotEmpty()
  public userId: string;

  @IsNumber()
  @IsNotEmpty()
  public galleryId: number;
}
