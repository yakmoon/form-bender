import { FC, PropsWithChildren } from "react";
import { StyledTheme, themeMaker } from "./FormBender.style";
import { ThemeColors } from "./FormBender.types";

const FormTheme: FC<PropsWithChildren<ThemeColors>> = ({ children, ...props }) => {
  return <StyledTheme {...themeMaker(props)}>{children}</StyledTheme>;
};

export default FormTheme;
