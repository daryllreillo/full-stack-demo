// error message should be retrieved if the validate function returns false
// validate function should return true if valid

export type InputRuleReturnType = {
  errorMessage: string | ((fieldName: string) => string);
  validate: (inputStr: string) => boolean | (() => boolean);
};

export type InputRuleType = (...args: any) => InputRuleReturnType;

const inputRuleFactory = (validateFn: (inputStr: string) => boolean): InputRuleType => {
  return (errorMessage: string) => {
    return {
      errorMessage: errorMessage,
      validate: validateFn,
    };
  };
};

export const customRule = (errorMessage: string, validateFn: (inputStr: string) => boolean) => {
  return {
    errorMessage: errorMessage,
    validate: validateFn,
  };
};

export const requiredRule: InputRuleType = (fieldName: string) => {
  return {
    errorMessage: `${fieldName} is required`,
    validate: (inputStr: string) => inputStr.length !== 0,
  };
};

export const minCharsRule: InputRuleType = (minChars: number) => {
  return {
    errorMessage: `Minimum characters: ${minChars}`,
    validate: (inputStr: string) => inputStr.length >= minChars,
  };
};

export const maxCharsRule: InputRuleType = (maxChars: number) => {
  return {
    errorMessage: `Maximum characters: ${maxChars}`,
    validate: (inputStr: string) => inputStr.length <= maxChars,
  };
};

export const validEmailRule: InputRuleType = () => {
  return {
    errorMessage: `Must be a valid email`,
    validate: (inputStr: string) => /.+@.+\..{2,}/.test(inputStr),
  };
};

export const passwordMustHaveDigitsRule: InputRuleType = () => {
  return {
    errorMessage: `Must have number(s)`,
    validate: (inputStr: string) => /(?=.*\d)/.test(inputStr),
  };
};

export const passwordMustHaveUppercaseCharsRule: InputRuleType = () => {
  return {
    errorMessage: `Must have uppercase letter(s)`,
    validate: (inputStr: string) => /(?=.*[A-Z])/.test(inputStr),
  };
};

export const passwordMustHaveLowercaseCharsRule: InputRuleType = () => {
  return {
    errorMessage: `Must have lowercase letter(s) `,
    validate: (inputStr: string) => /(?=.*[a-z])/.test(inputStr),
  };
};

export const repeatPasswordRule: InputRuleType = (errorMessage: string, func: () => string) => {
  return {
    errorMessage,
    validate: (inputStr: string) => inputStr === func(),
  };
};

export const otherFieldFirstRule: InputRuleType = (errorMessage: string, func: () => boolean) => {
  return {
    errorMessage,
    validate: func,
  };
};

export const passwordMustHaveSpecialCharsRule: InputRuleType = () => {
  return {
    errorMessage: `Must have any special character(s) !@#$%^&*`,
    validate: (inputStr: string) => /(?=.*[!@#$%^&*]+)/.test(inputStr),
  };
};

// export const inputRules = {
//   requiredRule:,

// }
