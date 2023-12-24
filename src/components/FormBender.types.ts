export type TextInputStyles = {
  $labelColor?: string;
  $errorColor?: string;
  $borderColor?: string;
  $error?: boolean;
};
type Payload = string | number;
export type InputStrategy = "text" | "number" | "price" | "email" | "username" | "password" | "any";
type TextInputDefaultProps = {
  name: string;
  error?: string;
  label?: string;
  prefix?: string;
  suffix?: string;
  disabled?: boolean;
  labelColor?: string;
  errorColor?: string;
  borderColor?: string;
  onFocus?: () => void;
  onBlur?: () => void;
};
export type FormTextInputProps = {
  withComma?: boolean;
  strategy?: InputStrategy;
  required?: boolean;
  folder: FormBenderFolder;
} & TextInputDefaultProps;
export type TextInputProps = {
  value: Payload;
  onChange: (value: string, name: string) => void;
} & TextInputDefaultProps;

export type OValue = Record<string, Payload>;
export type FormBenderState = {
  initialValues: OValue;
  values: OValue;
  touched: Record<string, boolean>;
  errors: Record<string, string>;
  dirty: boolean;
  version: string;
};
export type FormBenderFolder = {
  state: FormBenderState;
  action: {
    onChange: (value: Payload, name: string) => void;
    get: (name: string) => {
      name: string;
      errors?: string;
      touched?: boolean;
      value: Payload;
      initialValue: Payload;
    };
    reset: () => void;
    clear: () => void;
    update: (data: OValue) => void;
  };
};
export type InputHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => void;
type O = Record<string, any>;
export type IsObjectEqualType = (A: O, B?: O) => boolean;
