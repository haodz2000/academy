import { TypeLesson } from '@libs/constants/entities/Lesson';
import {
  LessonResponse,
  StoredFileResponse,
} from '@libs/openapi-generator/generated';

export const getLinkLesson = (lesson: LessonResponse): string => {
  if (lesson) {
    if (lesson.type == TypeLesson.YOUTUBE) {
      return lesson.video.path;
    }
  }
  return '';
};

export const getVideoLesson = (lesson: LessonResponse): StoredFileResponse => {
  if (lesson) {
    if (lesson.type == TypeLesson.UPLOAD) {
      return lesson.video;
    }
  }
  return null;
};

export const getTimeVideo = (time: number) => {
  let timeShow = '';
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time - hours * 3600) / 60);
  const seconds = Math.floor(time - hours * 3600 - minutes * 60);
  if (hours > 0) {
    timeShow = timeShow + hours + ':';
  }
  if (minutes > 0) {
    timeShow = timeShow + minutes + ':';
  }
  timeShow = timeShow + seconds + '';
  return timeShow;
};
