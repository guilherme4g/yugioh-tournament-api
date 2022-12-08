
import { Controller, HttpResponse, Validation } from '@/interface/protocols';

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
  constructor (private readonly validation: Validation) {}
  async handle (request: ISingUpController.Params): Promise<HttpResponse> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const hasError = this.validation.validate(request);

    return null;
  }
}
