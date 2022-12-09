
import { Controller, HttpResponse, Validation } from '@/interface/protocols';

import { SingUpUseCase } from '@/application/usecases';

export interface ISingUpController extends Controller<ISingUpController.Params> {}

export namespace ISingUpController {
  export type Params = {
    name: string
    email: string
    password: string
  };

  export type Response = void;
}

export class SingUpController implements ISingUpController {
  constructor (private readonly validation: Validation, private readonly singUpUseCase: SingUpUseCase) {}
  async handle (request: ISingUpController.Params): Promise<HttpResponse> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const hasError = this.validation.validate(request);

    try {
      await this.singUpUseCase.execute(request);
    } catch (error) {

    }

    return null;
  }
}
