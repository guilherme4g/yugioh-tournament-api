import { User } from '@/domain/user';

export interface GetUserByEmailRepository {
  getByEmail: (email: string) => Promise<User | null>
}
