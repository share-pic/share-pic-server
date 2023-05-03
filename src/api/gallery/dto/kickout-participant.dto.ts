import { IsNotEmpty, IsString } from 'class-validator';

export class KickoutParticipantDto {
  @IsString()
  @IsNotEmpty()
  public userId: string;

  @IsString()
  @IsNotEmpty()
  public galleryId: string;
}
