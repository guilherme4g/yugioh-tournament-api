import { createMock } from 'ts-auto-mock';

import { SingUpController } from '@/interface/controllers';
import { Validation } from '@/interface/protocols';

import { dataFakerUser } from '@/tests/domain/user.data.faker';
import { SingUpUseCase } from '@/application/usecases';
import { throwError, throwKnownError } from '@/tests/common/helpers';

const makeSut = () => {
  const validation = createMock<Validation>();
  const validateSpy = jest.spyOn(validation, 'validate');

  const singUpUseCase = createMock<SingUpUseCase>();
  const singUpUseCaseSpy = jest.spyOn(singUpUseCase, 'execute');

  const sut = new SingUpController(validation, singUpUseCase);

  return {
    sut,
    validateSpy,
    singUpUseCaseSpy
  };
};

describe('SignUp Controller', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  test('Should call validate with correct values', async () => {
    const { sut, validateSpy } = makeSut();

    const { id, ...params } = dataFakerUser();

    await sut.handle({
      email: params.email,
      name: params.name,
      password: params.password
    });

    expect(validateSpy).toBeCalledTimes(1);
    expect(validateSpy).toBeCalledWith(params);
  });

  test('Should return 400 if validation fails', async () => {
    const { sut, validateSpy, singUpUseCaseSpy } = makeSut();

    const { id, ...params } = dataFakerUser();

    validateSpy.mockReturnValueOnce(new Error());

    const result = await sut.handle({
      email: params.email,
      name: params.name,
      password: params.password
    });

    expect(validateSpy).toBeCalledTimes(1);
    expect(validateSpy).toBeCalledWith(params);
    expect(singUpUseCaseSpy).toBeCalledTimes(0);
    expect(result.statusCode).toBe(400);
  });

  test('Should call SingUpUseCase with correct values', async () => {
    const { sut, validateSpy, singUpUseCaseSpy } = makeSut();

    const { id, ...params } = dataFakerUser();

    await sut.handle({
      email: params.email,
      name: params.name,
      password: params.password
    });

    expect(validateSpy).toBeCalledTimes(1);
    expect(validateSpy).toBeCalledWith(params);
    expect(singUpUseCaseSpy).toBeCalledTimes(1);
    expect(singUpUseCaseSpy).toBeCalledWith(params);
  });

  test('Should call SingUpUseCase with correct values', async () => {
    const { sut, validateSpy, singUpUseCaseSpy } = makeSut();

    const { id, ...params } = dataFakerUser();

    await sut.handle({
      email: params.email,
      name: params.name,
      password: params.password
    });

    expect(validateSpy).toBeCalledTimes(1);
    expect(validateSpy).toBeCalledWith(params);
    expect(singUpUseCaseSpy).toBeCalledTimes(1);
    expect(singUpUseCaseSpy).toBeCalledWith(params);
  });

  test('Should return 500 if SingUpUseCase throws', async () => {
    const { sut, validateSpy, singUpUseCaseSpy } = makeSut();

    const { id, ...params } = dataFakerUser();

    singUpUseCaseSpy.mockImplementationOnce(throwError);

    const result = await sut.handle({
      email: params.email,
      name: params.name,
      password: params.password
    });

    expect(validateSpy).toBeCalledTimes(1);
    expect(validateSpy).toBeCalledWith(params);
    expect(singUpUseCaseSpy).toBeCalledTimes(1);
    expect(singUpUseCaseSpy).toBeCalledWith(params);
    expect(result.statusCode).toBe(500);
  });

  test('Should return 400 if SingUpUseCase throws known error', async () => {
    const { sut, validateSpy, singUpUseCaseSpy } = makeSut();

    const { id, ...params } = dataFakerUser();

    singUpUseCaseSpy.mockImplementationOnce(throwKnownError);

    const result = await sut.handle({
      email: params.email,
      name: params.name,
      password: params.password
    });

    expect(validateSpy).toBeCalledTimes(1);
    expect(validateSpy).toBeCalledWith(params);
    expect(singUpUseCaseSpy).toBeCalledTimes(1);
    expect(singUpUseCaseSpy).toBeCalledWith(params);
    expect(result.statusCode).toBe(400);
  });

  test('Should return 201 on sucess', async () => {
    const { sut, validateSpy, singUpUseCaseSpy } = makeSut();

    const { id, ...params } = dataFakerUser();

    const result = await sut.handle({
      email: params.email,
      name: params.name,
      password: params.password
    });

    expect(validateSpy).toBeCalledTimes(1);
    expect(validateSpy).toBeCalledWith(params);
    expect(singUpUseCaseSpy).toBeCalledTimes(1);
    expect(singUpUseCaseSpy).toBeCalledWith(params);
    expect(result.statusCode).toBe(201);
  });
});
