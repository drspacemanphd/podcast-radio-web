export interface IQueuePuller<T, U> {
  pull(params: T): U
}