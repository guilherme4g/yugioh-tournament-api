import * as uuid from 'uuid';
import { createMock } from 'ts-auto-mock';

import { User } from '@/domain/user';
import { UserRepository } from '@/application/repositories';
import { UserAlreadyExists } from '@/application/exceptions';
import { Encrypter } from '@/application/protocols';
import { SingUpUseCase } from '@/application/usecases';

import { dataFakerUser } from '@/tests/domain/user.data.faker';
import { throwError } from '@/tests/common/helpers';

const mockUuid: any = uuid;
jest.mock('uuid');

const makeSut = () => {
  const userRepository = createMock<UserRepository>();
  const getUserByEmailSpy = jest.spyOn(userRepository, 'getUserByEmail').mockReturnValue(null);
  const createUserSpy = jest.spyOn(userRepository, 'create').mockReturnValue(null);

  const encrypter = createMock<Encrypter>();
  const encryptSpy = jest.spyOn(encrypter, 'encrypt');

  const sut = new SingUpUseCase(userRepository, encrypter);

  return {
    sut,
    getUserByEmailSpy,
    createUserSpy,
    encryptSpy
  };
};

describe('SignUp Usecase', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  test('Should call getUserByEmailRepository with correct value', async () => {
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

  test('Should throw if getUserByEmailRepository throws', async () => {
    const { sut, getUserByEmailSpy } = makeSut();

    const {
      email,
      name,
      password
    } = dataFakerUser();

    getUserByEmailSpy.mockImplementationOnce(throwError);

    const testScript = async () => sut.execute({
      email,
      name,
      password
    });

    await expect(testScript).rejects.toThrow();

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

  test('Should call encrypter with correct value', async () => {
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

  test('Should throw if getUserRepository throws', async () => {
    const { sut, getUserByEmailSpy, encryptSpy } = makeSut();

    const {
      email,
      name,
      password
    } = dataFakerUser();

    encryptSpy.mockImplementationOnce(throwError);

    const testScript = async () => sut.execute({
      email,
      name,
      password
    });

    await expect(testScript).rejects.toThrow();

    expect(getUserByEmailSpy).toBeCalledTimes(1);
    expect(getUserByEmailSpy).toBeCalledWith(email);
    expect(encryptSpy).toBeCalledWith(password);
  });

  test('Should call createUserRepository with correct value', async () => {
    const { sut, encryptSpy, getUserByEmailSpy, createUserSpy } = makeSut();

    const {
      email,
      name,
      password
    } = dataFakerUser();

    encryptSpy.mockReturnValueOnce('any_hashed_password');
    mockUuid.v4.mockReturnValue('any_id');

    await sut.execute({
      email,
      name,
      password
    });

    expect(getUserByEmailSpy).toBeCalledTimes(1);
    expect(getUserByEmailSpy).toBeCalledWith(email);
    expect(encryptSpy).toBeCalledTimes(1);
    expect(encryptSpy).toBeCalledWith(password);
    expect(createUserSpy).toBeCalledTimes(1);
    expect(createUserSpy).toBeCalledWith(new User({ id: 'any_id', email, name, password: 'any_hashed_password' }));
  });
});
