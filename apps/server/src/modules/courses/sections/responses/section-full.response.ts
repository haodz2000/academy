import { ApiProperty } from '@nestjs/swagger';
import { SectionRespone } from './section.response';
import { LessonResponse } from '../../lessons/responses/lesson.response';

export class SectionFullResponse extends SectionRespone {
  @ApiProperty({ type: LessonResponse, isArray: true, nullable: true })
  lessons?: LessonResponse[];
}
