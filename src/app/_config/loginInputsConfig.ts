import { requiredRule, validEmailRule } from '@/app/_validations/inputRuleValidations';
import type { InputsConfigType } from '@/app/_hooks/useFormInputsHook';

// configure your inputs here
const inputsConfig: InputsConfigType = {
  email: {
    id: 'email',
    label: 'Email',
    inputType: 'email',
    validations: [requiredRule('Email'), validEmailRule()],
  },
  password: {
    id: 'password',
    label: 'Password',
    inputType: 'password',
    validations: [requiredRule('Password')],
  },
};

export default inputsConfig;
