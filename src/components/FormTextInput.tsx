import { FC, useEffect, useMemo, useState } from "react";
import { strategyIn, strategyOut } from "./FormBender.strategy";
import { StyledContainer } from "./FormBender.style";
import { FormTextInputProps, InputHandleChange } from "./FormBender.types";

export const FormTextInput: FC<FormTextInputProps> = ({
  folder,
  name,
  label,
  labelColor = "#3559E0",
  errorColor = "#F05941",
  borderColor = "#F3F8FF",
  strategy = "any",
  prefix,
  suffix,
  withComma,
  onBlur = () => null,
  ...props
}) => {
  const [state, setState] = useState({ value: "", error: "" });
  const [touched, setTouched] = useState(folder.state.touched[name]);
  const handleChange = useMemo<InputHandleChange>(
    () => (e) => {
      const nextValue = strategyOut[strategy](e.target.value, withComma);
      folder.state.values[name] = nextValue.outputValue;
      folder.state.errors[name] = nextValue.error;
      setState({ value: nextValue.inputValue, error: nextValue.error });
    },
    [strategy, name]
  );
  useEffect(() => {
    setState(strategyIn[strategy](folder.state.values[name]));
    setTouched(folder.state.touched[name]);
  }, [folder.state.version]);
  return (
    <StyledContainer $borderColor={borderColor} $labelColor={labelColor} $errorColor={errorColor} $error={touched && !!state.error}>
      <input
        {...props}
        value={state.value}
        placeholder={" "}
        onChange={handleChange}
        onBlur={() => {
          folder.state.touched[name] = true;
          setTouched(true);
          onBlur();
        }}
      />
      {label && <span className="form-bender-label">{label}</span>}
      {touched && state.error && <span className="form-bender-error">{state.error}</span>}
    </StyledContainer>
  );
};
/**
Known issues: you can't input more than 1_000_000_000_000_000
*/
