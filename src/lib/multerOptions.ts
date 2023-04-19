import { HttpException } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';

export const multerOptions: MulterOptions = {
  fileFilter: (req, file, callback) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      // 이미지 형식은 jpg, jpeg, png만 허용합니다.
      callback(null, true);
    } else {
      callback(
        new HttpException('지원하지 않는 이미지 형식입니다.', 400),
        false,
      );
    }
  },
  storage: diskStorage({
    destination(req, file, callback) {
      const uploadPath = 'public';
      if (!existsSync(uploadPath)) {
        // public 폴더가 존재하지 않을시, 생성합니다.
        mkdirSync(uploadPath);
      }
      callback(null, uploadPath);
    },
    filename: (request, file, callback) => {
      callback(null, file.originalname);
    },
  }),
};

export const createImageURL = (file): string => {
  // 파일이 저장되는 경로: 서버주소/public 폴더
  // 위의 조건에 따라 파일의 경로를 생성해줍니다.
  return `/var/lib/postgresql/data/public/${file.filename}`;
};
