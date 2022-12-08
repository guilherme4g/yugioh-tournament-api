import { createMock } from 'ts-auto-mock';

import { SingUpController } from '@/interface/controllers';
import { Validation } from '@/interface/protocols';

import { dataFakerUser } from '@/tests/domain/user.data.faker';

const makeSut = () => {
  const validation = createMock<Validation>();
  const validateSpy = jest.spyOn(validation, 'validate');
  ;

  const sut = new SingUpController(validation);

  return {
    sut,
    validateSpy
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
});
