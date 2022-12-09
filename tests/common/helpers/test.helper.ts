import { DefaultException, ExceptionType } from '@/common/helpers';

export const throwError = (): never => {
  throw new Error();
};

export const throwKnownError = (): never => {
  throw new DefaultException({
    code: 'KNOWN_ERROR',
    type: ExceptionType.USER
  });
};
