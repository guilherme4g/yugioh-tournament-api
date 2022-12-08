import { ExceptionType } from './error.contants';

interface IException {
  type: ExceptionType
  code: string
  data?: any
}

export class DefaultException extends Error {
  type: ExceptionType;
  code: string;
  data?: string;

  constructor (exception: IException) {
    super();
    this.type = exception.type;
    this.code = exception.code;
    this.data = exception.data;
  }
}
