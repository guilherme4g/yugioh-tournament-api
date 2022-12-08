import { User } from '@/domain/user';

export interface UserRepository {
  create: (user: User) => Promise<void>
  getUserByEmail: (email: string) => Promise<User | null>
}
