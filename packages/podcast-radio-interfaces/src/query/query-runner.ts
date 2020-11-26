import IQuery from './query';

export default interface IQueryRunner<T> {
  run(query: IQuery<T>): T
}