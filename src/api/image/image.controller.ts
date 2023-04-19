import {
  Controller,
  Inject,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/lib/multerOptions';
import { ImageService } from './image.service';

@Controller('image')
export class ImageController {
  @Inject(ImageService)
  private readonly service: ImageService;

  // @UseInterceptors(FileInterceptor('file'))
  @Post('upload')
  @UseInterceptors(FilesInterceptor('file', null, multerOptions))
  async uploadFile(@UploadedFiles() files: Express.Multer.File[]) {
    console.log('111');
    const uploadedFiles: string[] = this.service.uploadFiles(files);
    console.log('222');

    return {
      status: 200,
      message: '파일 업로드를 성공하였습니다.',
      data: {
        files: uploadedFiles,
      },
    };
  }
}
