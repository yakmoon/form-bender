import { FC } from "react";
import { StyledContainer } from "./FormBender.style";
import { TextInputProps } from "./FormBender.types";

export const TextInput: FC<TextInputProps> = ({
  onChange,
  value,
  error,
  label,
  name,
  labelColor = "#3559E0",
  errorColor = "#F05941",
  borderColor = "#F3F8FF",
  prefix,
  suffix,
  ...props
}) => {
  return (
    <StyledContainer $borderColor={borderColor} $labelColor={labelColor} $errorColor={errorColor} $error={!!error}>
      <input {...props} value={value} onChange={(e) => onChange(e.target.value, name)} placeholder={" "} />
      {label && <span className="form-bender-label">{label}</span>}
      {error && <span className="form-bender-error">{error}</span>}
    </StyledContainer>
  );
};
