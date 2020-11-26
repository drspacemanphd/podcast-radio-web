export default interface IQuery<T> {
  invoke(params: any): T
} 