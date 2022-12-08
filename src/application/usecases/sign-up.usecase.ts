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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const hashPassWord = this.encrypter.encrypt(params.password);
  }
}
