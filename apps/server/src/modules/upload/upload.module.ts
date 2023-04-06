import { StoredFile } from '@libs/entities/entities/StoredFile';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from '@server/modules/upload/upload.controller';

@Module({
  imports: [MikroOrmModule.forFeature([StoredFile])],
  controllers: [UploadController],
  providers: [UploadService],
  exports: [UploadService],
})
export class UploadModule {}
