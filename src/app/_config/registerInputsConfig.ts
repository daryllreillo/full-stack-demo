/* 
Configuration object for an Input component
InputsConfig = {
    InputName: {
        id,
        label,
        inputType,
        validations: [...validations]
    }
}
*/
import {
  requiredRule,
  customRule,
  minCharsRule,
  maxCharsRule,
  validEmailRule,
  passwordMustHaveDigitsRule,
  passwordMustHaveLowercaseCharsRule,
  passwordMustHaveUppercaseCharsRule,
  passwordMustHaveSpecialCharsRule,
  repeatPasswordRule,
  otherFieldFirstRule,
} from '@/app/_validations/inputRuleValidations';
import type { InputsConfigType } from '@/app/_hooks/useFormInputsHook';

// configure your inputs here
const registerInputsConfig: InputsConfigType = {
  name: {
    id: 'name',
    label: 'Name',
    inputType: 'name',
    validations: [requiredRule('Name')],
  },
  email: {
    id: 'email',
    label: 'Email',
    inputType: 'email',
    validations: [customRule('Email is required', (inputStr: string) => inputStr.length !== 0), validEmailRule()],
  },
  password: {
    id: 'reg_password',
    label: 'Password',
    inputType: 'password',
    validations: [
      minCharsRule(8),
      passwordMustHaveLowercaseCharsRule(),
      passwordMustHaveUppercaseCharsRule(),
      passwordMustHaveDigitsRule(),
      passwordMustHaveSpecialCharsRule(),
      maxCharsRule(30),
    ],
  },
  repeatPassword: {
    id: 'repeat_password',
    label: 'Repeat Password',
    inputType: 'password',
    validations: [
      otherFieldFirstRule(`Please enter a 'Password' first!`, () => {
        const pwInput: HTMLInputElement = document.querySelector('#reg_password')!;
        return pwInput.value !== '';
      }),
      repeatPasswordRule(`Must be the same as 'Password' `, () => {
        const pwInput: HTMLInputElement = document.querySelector('#reg_password')!;
        return pwInput.value;
      }),
    ],
  },
};

export default registerInputsConfig;
