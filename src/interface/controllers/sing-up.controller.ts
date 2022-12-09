
import { Controller, HttpResponse, Validation } from '@/interface/protocols';

import { SingUpUseCase } from '@/application/usecases';
import { DefaultException } from '@/common/helpers/error.helper';
import { badRequest, serverError, created } from '@/interface/helpers';

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
    const hasError = this.validation.validate(request);

    if (hasError) {
      return badRequest(hasError);
    }

    try {
      await this.singUpUseCase.execute(request);

      return created();
    } catch (error) {
      if (error instanceof DefaultException) {
        return badRequest(error);
      } else {
        return serverError(error);
      }
    }
  }
}
