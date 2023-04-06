export interface Scalar {
  uuid: string;
  integer: number;
  smallint: number;
  tinyint: number;
  float: number;
  double: number;
  text: string;
  varchar: string;
  boolean: boolean;
  jsonb: object;
  datetime: Date;
  date: Date;
  timestamp: Date;
}

export type Maybe<T extends keyof Scalar> = Scalar[T] | null;
