import IQuery from './query';

export interface IQueryRunner<T> {
  run(query: IQuery<T>): T
}