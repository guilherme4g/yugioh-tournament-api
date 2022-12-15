import { Hasher } from '@/application/protocols';

import bcrypt from 'bcrypt';

export class BcryptAdapter implements Hasher {
  hash (plainText: string): string {
    return bcrypt.hashSync(plainText, 8);
  }

  compare (plainText: string, hashText: string): boolean {
    return bcrypt.compareSync(plainText, hashText);
  }
}
