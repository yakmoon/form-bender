import styled from "styled-components";
import { TextInputStyles, ThemeColors } from "./FormBender.types";
export const themeMaker = (props: ThemeColors) => ({
  $labelColor: props.labelColor,
  $errorColor: props.errorColor,
  $borderColor: props.borderColor,
  $inputColor: props.inputColor,
  $background: props.background,
});
export const StyledContainer = styled.div<TextInputStyles>`
  --fb-error-c: ${(props) => props.$errorColor || "#F05941"};
  --fb-border-c: ${(props) => props.$borderColor || "#F3F8FF"};
  --fb-label-c: ${(props) => props.$labelColor || "#3559E0"};
  --fb-input-c: ${(props) => props.$inputColor || "#000"};
  --fb-input-bg: ${(props) => props.$background || "#fff"};
  margin: 8px 0;
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  input {
    outline: none;
    border: 1.5px solid var(--fb-${(props) => (props.$error ? "error" : "border")}-c);
    border-radius: 6px;
    height: 2rem;
    padding: 2px 8px;
    font-size: 16px;
    transition: border-color 0.2s ease-out;
    &:focus,
    &:not(:placeholder-shown) {
      border-color: var(--fb-${(props) => (props.$error ? "error" : "label")}-c);
      & + span.form-bender-label {
        transform: translate(0, -90%) scale(0.75);
      }
    }
  }
  span.form-bender-label {
    font-size: 16px;
    position: absolute;
    left: 10px;
    top: 10px;
    color: var(--fb-${(props) => (props.$error ? "error" : "label")}-c);
    background-color: var(--fb-input-bg);
    padding: 0 3px;
    border-radius: 4px;
    transition: transform 0.2s ease-out;
  }
  span.form-bender-error {
    margin-top: 2px;
    margin-left: 8px;
    font-size: 14px;
    color: var(--fb-error-c);
  }
`;
export const StyledTheme = styled.div<TextInputStyles>`
  div.form-bender-container {
    --fb-error-c: ${(props) => props.$errorColor || "#F05941"};
    --fb-border-c: ${(props) => props.$borderColor || "#F3F8FF"};
    --fb-label-c: ${(props) => props.$labelColor || "#3559E0"};
    --fb-input-c: ${(props) => props.$inputColor || "#000"};
    --fb-input-bg: ${(props) => props.$background || "#fff"};
  }
`;
