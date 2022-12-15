import * as uuid from 'uuid';
import { createMock } from 'ts-auto-mock';

import { User } from '@/domain/user';
import { IUserRepository } from '@/application/repositories';
import { UserAlreadyExists } from '@/application/exceptions';
import { Hasher } from '@/application/protocols';
import { SingUpUseCase } from '@/application/usecases';

import { dataFakerUser } from '@/tests/domain/user.data.faker';
import { throwError } from '@/tests/common/helpers';

const mockUuid: any = uuid;
jest.mock('uuid');

const makeSut = () => {
  const userRepository = createMock<IUserRepository>();
  const getUserByEmailSpy = jest.spyOn(userRepository, 'getUserByEmail').mockReturnValue(null);
  const createUserSpy = jest.spyOn(userRepository, 'create').mockReturnValue(null);

  const hasher = createMock<Hasher>();
  const hashSpy = jest.spyOn(hasher, 'hash');

  const sut = new SingUpUseCase(userRepository, hasher);

  return {
    sut,
    getUserByEmailSpy,
    createUserSpy,
    hashSpy
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
    const { sut, getUserByEmailSpy, hashSpy } = makeSut();

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
    expect(hashSpy).toBeCalledWith(password);
  });

  test('Should throw if getUserRepository throws', async () => {
    const { sut, getUserByEmailSpy, hashSpy } = makeSut();

    const {
      email,
      name,
      password
    } = dataFakerUser();

    hashSpy.mockImplementationOnce(throwError);

    const testScript = async () => sut.execute({
      email,
      name,
      password
    });

    await expect(testScript).rejects.toThrow();

    expect(getUserByEmailSpy).toBeCalledTimes(1);
    expect(getUserByEmailSpy).toBeCalledWith(email);
    expect(hashSpy).toBeCalledWith(password);
  });

  test('Should call createUserRepository with correct value', async () => {
    const { sut, hashSpy, getUserByEmailSpy, createUserSpy } = makeSut();

    const {
      email,
      name,
      password
    } = dataFakerUser();

    hashSpy.mockReturnValueOnce('any_hashed_password');
    mockUuid.v4.mockReturnValue('any_id');

    await sut.execute({
      email,
      name,
      password
    });

    expect(getUserByEmailSpy).toBeCalledTimes(1);
    expect(getUserByEmailSpy).toBeCalledWith(email);
    expect(hashSpy).toBeCalledTimes(1);
    expect(hashSpy).toBeCalledWith(password);
    expect(createUserSpy).toBeCalledTimes(1);
    expect(createUserSpy).toBeCalledWith(new User({ id: 'any_id', email, name, password: 'any_hashed_password' }));
  });
});
