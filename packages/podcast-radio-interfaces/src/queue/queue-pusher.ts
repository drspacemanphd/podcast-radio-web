export interface IQueuePusher<T, U> {
  push(params: T): U
}