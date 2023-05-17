import { StatusTeachingRequest } from '@libs/constants/entities/TeachingRequest';
import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '@server/validators/base.dto';
import { IsOptional } from 'class-validator';

export class TeachingRequestFilterDto extends BaseDto {
  @ApiProperty({ default: StatusTeachingRequest.Pending })
  @IsOptional()
  status: number;

  @ApiProperty({ default: 1 })
  @IsOptional()
  page: number;
}
