import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGalleryDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public userId: string;
}
