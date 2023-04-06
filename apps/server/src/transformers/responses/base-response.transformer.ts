import { format } from 'date-fns';

interface EntityTimestampWithSoftDelete {
  __visible?: unknown[];
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

interface EntityTimestamp {
  __visible?: unknown[];
  created_at: Date;
  updated_at: Date;
}

interface TransformedResponseTimestamp {
  created_at: string;
  updated_at: string;
}

interface TransformedResponseTimestampWithSoftDelete {
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export class BaseResponseTransformer {
  static isEntityWithSoftDelete(
    entity: EntityTimestampWithSoftDelete | EntityTimestamp
  ): entity is EntityTimestampWithSoftDelete {
    return 'deleted_at' in entity;
  }

  static transformEntityTimestamps<
    U extends EntityTimestampWithSoftDelete | EntityTimestamp
  >(
    entity: U
  ): Omit<U, 'created_at' | 'updated_at' | 'deleted_at'> &
    (U extends EntityTimestampWithSoftDelete
      ? TransformedResponseTimestampWithSoftDelete
      : TransformedResponseTimestamp) {
    const transformedEntity = Object.keys(entity).reduce(
      (previousValue, currentValue) => {
        if (
          entity.__visible?.includes(currentValue) &&
          currentValue !== '__visible'
        ) {
          previousValue[currentValue] = entity[currentValue];
        }
        return previousValue;
      },
      {}
    );
    if (BaseResponseTransformer.isEntityWithSoftDelete(entity)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore;
      return {
        ...transformedEntity,
        created_at: BaseResponseTransformer.transformDateTimeField(
          entity.created_at
        ),
        updated_at: BaseResponseTransformer.transformDateTimeField(
          entity.updated_at
        ),
        deleted_at: BaseResponseTransformer.transformDateTimeField(
          entity.deleted_at
        ),
      };
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return {
        ...transformedEntity,
        created_at: BaseResponseTransformer.transformDateTimeField(
          entity.created_at
        ),
        updated_at: BaseResponseTransformer.transformDateTimeField(
          entity.updated_at
        ),
      };
    }
  }

  static transformDateTimeField(field: string | Date): string {
    if (field instanceof Date) {
      return field.toISOString();
    }
    return field;
  }

  static transformDateField(field: string | Date): string {
    if (field instanceof Date) {
      return format(field, 'yyyy-MM-dd');
    }
    return field;
  }
}
