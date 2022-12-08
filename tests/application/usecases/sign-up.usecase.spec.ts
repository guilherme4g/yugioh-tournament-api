import { createMock } from 'ts-auto-mock';

import { UserRepository } from '@/application/repositories';
import { UserAlreadyExists } from '@/application/exceptions';
import { Encrypter } from '@/application/protocols';
import { SingUpUseCase } from '@/application/usecases';

import { dataFakerUser } from '@/tests/domain/user.data-faker';

const makeSut = () => {
  const userRepository = createMock<UserRepository>();
  const getUserByEmailSpy = jest.spyOn(userRepository, 'getUserByEmail').mockReturnValue(null);

  const encrypter = createMock<Encrypter>();
  const encryptSpy = jest.spyOn(encrypter, 'encrypt');

  const sut = new SingUpUseCase(userRepository, encrypter);

  return {
    sut,
    getUserByEmailSpy,
    encryptSpy
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

  test('Should call encrypter correct value', async () => {
    const { sut, getUserByEmailSpy, encryptSpy } = makeSut();

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
    expect(encryptSpy).toBeCalledWith(password);
  });
});
