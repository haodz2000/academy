import { IdSubject } from '@libs/constants/abilities';

/**
 * @see https://casl.js.org/v5/en/guide/subject-type-detection#custom-subject-type-detection
 */
export const detectSubjectType = (object: {
  __typename?: string;
}): IdSubject => {
  return (object.__typename as IdSubject) ?? IdSubject.All;
};
