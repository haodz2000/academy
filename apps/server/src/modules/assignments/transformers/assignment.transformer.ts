import { IdSubject } from '@libs/constants/abilities';
import { BaseResponseTransformer } from '@server/transformers/responses/base-response.transformer';
import { UserTransformer } from '@server/modules/users/transformers/user.transformer';
import { Assignment } from '@libs/entities/entities/Assignment';
import { AssignmentResponse } from '../responses/assignment.response';

export class AssignmentTransformer extends BaseResponseTransformer {
  static toAssignmentResponse(assignment: Assignment): AssignmentResponse {
    return {
      ...BaseResponseTransformer.transformEntityTimestamps(assignment),
      creator: assignment.creator
        ? UserTransformer.toUserResponse(assignment.creator)
        : null,
      updater: null,
      __typename: IdSubject.Assignments,
    };
  }
}
