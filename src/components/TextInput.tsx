import { FC } from "react";
import { StyledContainer, themeMaker } from "./FormBender.style";
import { TextInputProps } from "./FormBender.types";

export const TextInput: FC<TextInputProps> = ({ onChange, value, error, label, name, prefix, suffix, ...props }) => {
  return (
    <StyledContainer {...themeMaker(props)} $error={!!error}>
      <input {...props} value={value} onChange={(e) => onChange(e.target.value, name)} placeholder={" "} />
      {label && <span className="form-bender-label">{label}</span>}
      {error && <span className="form-bender-error">{error}</span>}
    </StyledContainer>
  );
};
