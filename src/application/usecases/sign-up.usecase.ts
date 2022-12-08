import { UserAlreadyExists } from '../exceptions';
import { UserRepository } from '../repositories';

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
  constructor (private readonly userRepository: UserRepository) {}

  async execute (params: ISingUpUseCase.Params): Promise<ISingUpUseCase.Response> {
    const userAlreadyExists = this.userRepository.getUserByEmail(params.email);

    if (userAlreadyExists) {
      throw new UserAlreadyExists({
        email: params.email
      });
    }
  }
}
