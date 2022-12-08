import faker from 'faker';

import { User } from '@/domain/user';

export function dataFakerUser (): User {
  return {
    id: faker.datatype.uuid(),
    email: faker.internet.email(),
    name: faker.name.firstName(),
    password: faker.internet.password()
  };
}
