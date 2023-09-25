/*
We want to use useFormInputs() in a form component
  const { renderInputs, resetInputs, inputsState, inputsAreValid, etc... } = useForm();
*/
'use client';
import { useReducer, useState, useCallback, useMemo, useEffect, createRef, RefObject, ChangeEvent, FocusEvent } from 'react';

import Input from '@/app/_components/UI/Input/Input';
import type { InputRuleReturnType } from '@/app/_validations/inputRuleValidations';

type StateType = {
  value: string;
  wasTouched: boolean;
  isValid: boolean;
  errorMsg: string;
  ref: RefObject<HTMLInputElement> | null;
};

type StatesIType<T> = {
  [Property in keyof T]?: StateType;
};
type StatesType = StatesIType<InputsConfigType>;

type ChangeHandlersIType<T> = {
  [Property in keyof T]?: (event: ChangeEvent<HTMLInputElement>) => void;
};
type ChangeHandlersType = ChangeHandlersIType<InputsConfigType>;

type BlurHandlersIType<T> = {
  [Property in keyof T]?: (event: FocusEvent<HTMLInputElement>) => void;
};
type BlurHandlersType = BlurHandlersIType<InputsConfigType>;

type ActionType = {
  type: string;
  value?: string;
  isValid?: boolean;
  errorMsg?: string;
};

type InputConfigType = {
  id: string;
  label: string;
  inputType: string;
  validations: InputRuleReturnType[];
};

export type InputsConfigType = {
  [key: string]: InputConfigType;
};

let debounceDelay = 200; // 200ms debounce delay

export default function useFormInputs(inputsConfig: InputsConfigType) {
  // initializes inputsState states
  const initInputsState = generateInitStates(inputsConfig);
  // initalizes the Reducer Function
  const inputsReducerFn = generateReducerFunc(inputsConfig);

  const [inputsConfigState] = useState(inputsConfig);
  const [inputsState, dispatchInputAction] = useReducer<React.Reducer<StatesIType<InputConfigType>, ActionType>>(inputsReducerFn, initInputsState);
  const [inputsAreValid, setInputsAreValid] = useState<boolean>(false);

  if (inputsAreValid === true) debounceDelay = 0;
  else debounceDelay = 200;

  const generateChangeHandlers = useCallback((inputsConfigState: InputsConfigType) => {
    let output: ChangeHandlersType = {};
    for (const input of Object.values(inputsConfigState)) {
      const key = input.id as keyof ChangeHandlersType;
      output[key] = event => {
        dispatchInputAction({
          type: `USER_INPUT_${input.id}`.toUpperCase(),
          value: event.target.value,
        });
      };
    }
    return output;
  }, []);

  const generateBlurHandlers = useCallback((inputsConfigState: InputsConfigType) => {
    let output: BlurHandlersType = {};
    for (const input of Object.values(inputsConfigState)) {
      const key = input.id as keyof BlurHandlersType;
      output[key] = event => {
        dispatchInputAction({
          type: `USER_INPUT_${input.id}`.toUpperCase(),
          value: event.target.value.trim(),
        });
      };
    }
    return output;
  }, []);

  // input handlers
  const changeHandlers = useMemo(() => {
    return generateChangeHandlers(inputsConfigState);
  }, [inputsConfigState, generateChangeHandlers]);

  const blurHandlers = useMemo(() => {
    return generateBlurHandlers(inputsConfigState);
  }, [inputsConfigState, generateBlurHandlers]);

  const resetInputs = useCallback(() => {
    setInputsAreValid(false);
    dispatchInputAction({
      type: 'CLEAR_INPUTS',
    });
  }, []);

  const renderInputs = () => {
    return Object.values(inputsConfigState).map(input => {
      const { id, label, inputType } = input;
      const handlersKey = id as keyof InputConfigType;
      const statesKey = id as keyof InputConfigType;
      return (
        <Input
          key={id}
          id={id}
          // ref={inputsState[statesKey]!.ref}
          label={label}
          inputType={inputType}
          value={inputsState[statesKey]!.value}
          wasTouched={inputsState[statesKey]!.wasTouched}
          isValid={inputsState[statesKey]!.isValid}
          errorMsg={inputsState[statesKey]!.errorMsg}
          onChange={changeHandlers[handlersKey]!}
          onBlur={blurHandlers[handlersKey]!}
        />
      );
    });
  };

  const validateAllInputs = () => {
    for (const state of Object.entries(inputsState)) {
      const [stateId, stateObj] = state;
      dispatchInputAction({
        type: `USER_INPUT_${stateId}`.toUpperCase(),
        value: stateObj.value,
      });
    }
  };
  useEffect(() => {
    const timeoutID = setTimeout(() => {
      for (const input of Object.values(inputsState)) {
        if (!input.isValid) {
          setInputsAreValid(false);
          return;
        }
        setInputsAreValid(true);
      }
    }, debounceDelay);
    return () => clearTimeout(timeoutID);
  }, [inputsState]);

  return {
    renderInputs,
    inputsState,
    inputsAreValid,
    resetInputs,
    validateAllInputs,
  };
}

function generateInitStates(inputsConfig: InputsConfigType) {
  let states: StatesType = {};
  for (const input of Object.values(inputsConfig)) {
    const stateKey = input.id as keyof StatesType;
    states[stateKey] = { value: '', wasTouched: false, isValid: false, errorMsg: '', ref: createRef() };
  }
  return states;
}

function validateInput(inputStr: string, inputConfig: InputConfigType) {
  for (const rule of inputConfig.validations) {
    if (!rule.validate(inputStr)) {
      return { errorMsg: rule.errorMessage, isValid: false };
    }
  }
  return { errorMsg: '', isValid: true };
}

function generateReducerFunc(inputsConfig: InputsConfigType) {
  return (state: StatesType, action: ActionType) => {
    for (const input of Object.values(inputsConfig)) {
      if (action.type === `USER_INPUT_${input.id}`.toUpperCase()) {
        const inputStr = action.value;
        const checking = validateInput(inputStr!, input);
        const stateKey = input.id as keyof StatesType;
        return {
          ...state,
          [stateKey]: {
            value: action.value,
            wasTouched: true,
            isValid: checking.isValid,
            errorMsg: checking.errorMsg,
            ref: state[stateKey]!.ref,
          },
        };
      }
    }
    if (action.type === 'CLEAR_INPUTS') {
      return generateInitStates(inputsConfig);
    }
    return { ...state };
  };
}
