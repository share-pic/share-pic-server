import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class InviteParticipantDto {
  @IsString()
  @IsNotEmpty()
  public userId: string;

  @IsNumber()
  @IsNotEmpty()
  public galleryId: number;
}
