
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
  async execute (ISingUpUseCase: ISingUpUseCase.Params): Promise<ISingUpUseCase.Response> {
    throw new Error('Email já cadastrado.');
  }
}
