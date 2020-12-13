import { IQuery } from './query';

export interface IQueryRunner<T, U> {
  run(query: IQuery<U>): T
}