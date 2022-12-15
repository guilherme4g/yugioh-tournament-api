import { Validation } from '@/interface/protocols';
import joi from 'joi';

const schema = joi.object({
  name: joi.string().alphanum(),
  email: joi.string().email(),
  password: joi.string().min(8)
});

export class SingUpValidator implements Validation {
  validate (input: any) {
    const e = schema.validate(input);
    console.log(e);
  }
}
