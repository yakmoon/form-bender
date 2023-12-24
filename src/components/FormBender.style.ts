import styled from "styled-components";
import { TextInputStyles } from "./FormBender.types";

export const StyledContainer = styled.div<TextInputStyles>`
  margin: 8px 0;
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  input {
    outline: none;
    border: 1.5px solid ${(props) => (props.$error ? props.$errorColor : props.$borderColor)};
    border-radius: 6px;
    height: 2rem;
    padding: 2px 8px;
    font-size: 16px;
    transition: border-color 0.2s ease-out;
    &:focus,
    &:not(:placeholder-shown) {
      border-color: ${(props) => (props.$error ? props.$errorColor : props.$labelColor)};
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
    color: ${(props) => (props.$error ? props.$errorColor : props.$labelColor)};
    background-color: white;
    padding: 0 3px;
    border-radius: 4px;
    transition: transform 0.2s ease-out;
  }
  span.form-bender-error {
    margin-top: 2px;
    margin-left: 8px;
    font-size: 14px;
    color: ${(props) => props.$errorColor};
  }
`;
