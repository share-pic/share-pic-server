import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { Status } from '../gallery-participants/gallery-participants.entity';
import { UserService } from '../user/user.service';
import { CreateGalleryDto } from './dto';
import { InviteParticipantDto } from './dto/invite-participant.dto';
import { JoinGalleryDto } from './dto/join-gallery.dto';
import { Gallery } from './gallery.entity';
import { GalleryService } from './gallery.service';
import { Code } from './gallery.type';

@Controller('gallery')
export class GalleryController {
  @Inject(GalleryService)
  private readonly service: GalleryService;
  @Inject(UserService)
  private readonly userService: UserService;

  @Post('/create')
  public async createGallery(
    @Body() body: CreateGalleryDto,
  ): Promise<{ galleryList: Gallery[]; code: number }> {
    const isDuplicate = await this.service.checkGalleryByName(body.name);
    if (isDuplicate) return { galleryList: [], code: 201 }; // 중복된 갤러리 이름
    await this.service.createGallery(body);
    const galleryList = await this.service.getGalleryList(body.userId);
    return { galleryList, code: 200 };
  }

  @Get('/list')
  public async getGalleryList(
    @Query('id') userId: string,
  ): Promise<{ galleryList: Gallery[]; code: number }> {
    const galleryList = await this.service.getGalleryList(userId);
    return { galleryList, code: 220 };
  }

  @Post('/invite')
  public async inviteParticipant(
    @Body() body: InviteParticipantDto,
  ): Promise<any> {
    const user = await this.userService.checkId(body.userId);
    if (!user) return { code: 221 }; // 해당유저 없음
    const gallery = await this.service.checkGalleryById(body.galleryId);
    if (!gallery) return { code: 222 }; // 해당 갤러리가 삭제 됨
    const galleryParticipants = await this.service.getGalleryParticipants(body);

    if (galleryParticipants?.status === Status.JOIN)
      return { code: 223 }; // 이미 참가한 사용자
    else if (galleryParticipants?.status === Status.INVITE)
      return { code: 224 }; // 이미 초대한 사용자
    else {
      this.service.inviteParticipant(body);
      return { code: 220 };
    }
  }

  @Post('join')
  public async joinGallery(@Body() body: JoinGalleryDto): Promise<any> {
    this.service.joinGallery(body);
    return { code: 230 };
  }
}
