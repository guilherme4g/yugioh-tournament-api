import { User } from '@/domain/user';
import { DefaultException } from '@/common/helpers/error.helper';
import { ExceptionType } from '@/common/helpers/error.contants';

export class UserAlreadyExists extends DefaultException {
  constructor (data: Partial<User>) {
    super({
      type: ExceptionType.USER,
      code: 'EXCEPTION_ALREADY_EXISTS',
      data
    });
  }
}
