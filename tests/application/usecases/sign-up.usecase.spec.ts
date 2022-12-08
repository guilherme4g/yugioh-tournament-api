import { createMock } from 'ts-auto-mock';

import { SingUpUseCase } from '@/application/usecases';
import { GetUserByEmailRepository } from '@/application/repositories';

import { dataFakerUser } from '@/tests/domain/user.data-faker';
import { UserAlreadyExists } from '@/application/exceptions/user-already-exists.exception';

type SutTypes = {
  sut: SingUpUseCase
  getUsersRepository: GetUserByEmailRepository
};

const makeSut = (): SutTypes => {
  const getUsersRepository = createMock<GetUserByEmailRepository>();

  const sut = new SingUpUseCase();

  return {
    sut,
    getUsersRepository
  };
};

describe('SignUp Usecase', () => {
  test('Should throw if email exists', async () => {
    const { sut } = makeSut();

    const {
      email,
      name,
      password
    } = dataFakerUser();

    const testScript = async () => sut.execute({
      email,
      name,
      password
    });

    await expect(testScript).rejects.toThrow(UserAlreadyExists);
  });
});
