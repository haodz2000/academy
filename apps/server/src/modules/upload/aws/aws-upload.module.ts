import { AwsUploadService } from './aws-upload.service';
import { AwsUploadController } from './aws-upload.controller';
import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { StoredFile } from '@libs/entities/entities/StoredFile';

@Module({
  imports: [MikroOrmModule.forFeature([StoredFile])],
  controllers: [AwsUploadController],
  providers: [AwsUploadService],
  exports: [AwsUploadService],
})
export class AwsUploadModule {}
