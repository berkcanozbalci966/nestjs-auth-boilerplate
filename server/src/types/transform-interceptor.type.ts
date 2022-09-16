export interface Response<T> {
  Header;
  Body: T;
}

export interface Header {
  isSuccess: boolean;
}
