import { StoredFile } from '@libs/entities/entities/StoredFile';
import { StoredFileResponse } from '@server/modules/stored-files/responses/stored-file.response';
import { BaseResponseTransformer } from '@server/transformers/responses/base-response.transformer';
import { UserTransformer } from '@server/modules/users/transformers/user.transformer';
import { IdSubject } from '@libs/constants/abilities';

export class StoredFileTransformer extends BaseResponseTransformer {
  static toBasicStoredFileResponse(storedFile: StoredFile): StoredFileResponse {
    return {
      ...BaseResponseTransformer.transformEntityTimestamps(storedFile),
      __typename: IdSubject.StoredFiles,
      creator: null,
      updater: null,
    };
  }
  static toStoredFileResponse(storedFile: StoredFile): StoredFileResponse {
    return {
      ...BaseResponseTransformer.transformEntityTimestamps(storedFile),
      __typename: IdSubject.StoredFiles,
      creator: storedFile.creator
        ? UserTransformer.toUserBasicResponse(storedFile.creator)
        : null,
      updater: storedFile.updater
        ? UserTransformer.toUserBasicResponse(storedFile.updater)
        : null,
    };
  }
}
