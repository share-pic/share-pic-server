import { IsNotEmpty, IsString } from 'class-validator';

export class GetGalleryListDto {
  @IsString()
  @IsNotEmpty()
  public userId: string;
}
