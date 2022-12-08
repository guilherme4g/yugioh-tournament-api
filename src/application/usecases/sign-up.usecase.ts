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
  async execute (params: ISingUpUseCase.Params): Promise<ISingUpUseCase.Response> {
    throw new UserAlreadyExists({
      email: params.email
    });
  }
}
