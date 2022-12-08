import * as uuid from 'uuid';

import { User } from '@/domain/user';

import { Encrypter } from '../protocols';
import { UserRepository } from '../repositories';
import { UserAlreadyExists } from '../exceptions';

export interface ISingUpUseCase {
  execute: (ISingUpUseCase: ISingUpUseCase.Params) => ISingUpUseCase.Response
}

export namespace ISingUpUseCase {
  export type Params = {
    name: string
    email: string
    password: string
  };

  export type Response = void;
}

export class SingUpUseCase implements ISingUpUseCase {
  constructor (private readonly userRepository: UserRepository, private readonly encrypter: Encrypter) {}

  async execute (params: ISingUpUseCase.Params): Promise<ISingUpUseCase.Response> {
    const userAlreadyExists = this.userRepository.getUserByEmail(params.email);

    if (userAlreadyExists) {
      throw new UserAlreadyExists({
        email: params.email
      });
    }

    const hashPassWord = this.encrypter.encrypt(params.password);

    const user = new User({
      id: uuid.v4(),
      email: params.email,
      name: params.name,
      password: hashPassWord
    });

    await this.userRepository.create(user);
  }
}
