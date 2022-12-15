import { IUserRepository } from '@/application/repositories';
import { User } from '@/domain/user';

export class UserRepository implements IUserRepository {
  async create (user: User): Promise<void> {
    throw new Error('Not implemented yet');
  };

  async getUserByEmail (email: string): Promise<User> {
    throw new Error('Not implemented yet');
  }
}
