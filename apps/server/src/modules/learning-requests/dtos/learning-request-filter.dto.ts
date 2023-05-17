import { StatusLearningRequest } from '@libs/constants/entities/LearningRequest';
import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '@server/validators/base.dto';
import { IsOptional } from 'class-validator';

export class LearningRequestFilterDto extends BaseDto {
  @ApiProperty({ default: StatusLearningRequest.Pending })
  @IsOptional()
  status: number;

  @ApiProperty({ default: 1 })
  @IsOptional()
  page: number;
}
