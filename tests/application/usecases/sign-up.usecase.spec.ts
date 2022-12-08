import { createMock } from 'ts-auto-mock';

import { SingUpUseCase } from '@/application/usecases';
import { UserAlreadyExists } from '@/application/exceptions';
import { UserRepository } from '@/application/repositories';

import { dataFakerUser } from '@/tests/domain/user.data-faker';

const makeSut = () => {
  const userRepository = createMock<UserRepository>();
  const getUserByEmailSpy = jest.spyOn(userRepository, 'getUserByEmail').mockReturnValue(null);

  const sut = new SingUpUseCase(userRepository);

  return {
    sut,
    getUserByEmailSpy
  };
};

describe('SignUp Usecase', () => {
  test('Should call get user repository with correct value', async () => {
    const { sut, getUserByEmailSpy } = makeSut();

    const {
      email,
      name,
      password
    } = dataFakerUser();

    await sut.execute({
      email,
      name,
      password
    });

    expect(getUserByEmailSpy).toBeCalledTimes(1);
    expect(getUserByEmailSpy).toBeCalledWith(email);
  });

  test('Should throw if email exists', async () => {
    const { sut, getUserByEmailSpy } = makeSut();

    const user = dataFakerUser();

    getUserByEmailSpy.mockResolvedValueOnce(user);

    const testScript = async () => sut.execute({
      email: user.email,
      name: user.name,
      password: user.password
    });

    await expect(testScript).rejects.toThrow(UserAlreadyExists);
  });
});
