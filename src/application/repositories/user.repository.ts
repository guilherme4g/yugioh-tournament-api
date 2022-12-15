import { User } from '@/domain/user';

export interface IUserRepository {
  create: (user: User) => Promise<void>
  getUserByEmail: (email: string) => Promise<User | null>
}
