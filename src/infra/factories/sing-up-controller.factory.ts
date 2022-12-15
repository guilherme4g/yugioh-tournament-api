import { SingUpUseCase } from '@/application/usecases';

import { Controller } from '@/interface/protocols';
import { SingUpController } from '@/interface/controllers';

import { UserRepository } from '../repositories';
import { BcryptAdapter } from '../encrypt';
import { SingUpValidator } from '../validators';

export const makeSingUpController = (): Controller => {
  const userRepository = new UserRepository();
  const hasher = new BcryptAdapter();

  const singUpUseCase = new SingUpUseCase(userRepository, hasher);

  const singUpValidator = new SingUpValidator();

  const controller = new SingUpController(singUpValidator, singUpUseCase);
  return controller;
};
