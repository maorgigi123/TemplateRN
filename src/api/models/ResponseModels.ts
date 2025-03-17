export interface IResponse<T> {
  data: T;
  isError: boolean;
  messageDesc: string;
  messageCode: number;
}
