import { FormBenderMessage } from "./FormBender.message";
const validator = [
  ["-", ".", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  [".", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
];
const invalidValueResponse = { value: "", error: FormBenderMessage.error.invalidValue };
const numPass = ["", "-", "-.", ".-"];
export const expressions = {
  email:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  passwordSecure: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  passwordNumber: /^(?=.*\d)[\d]{1,}$/,
  passwordSymbol: /^(?=.*[@$!%*?&])[@$!%*?&]{1,}$/,
  passwordLetterCase: /^(?=.*[a-z])(?=.*[A-Z])[A-Za-z]{2,}$/,
  userName: /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
};
export const pipe = (value: any) => value;
export const matchStringNumber = (input: string, comma = false, fixed = 0) => {
  let digit = "",
    sign = "",
    i = -1,
    row = 0,
    dec = "";
  while (i < input.length) {
    i++;
    if (validator[0].includes(input[i])) {
      if (input[i] === "-") {
        row = 1;
        sign = "-";
        break;
      } else if (input[i] === ".") {
        row = 2;
        dec = ".";
        break;
      }
      digit += input[i];
      row = 1;
      break;
    }
  }
  if (row === 1) {
    while (i < input.length) {
      i++;
      if (validator[1].includes(input[i])) {
        if (input[i] === ".") {
          row = 2;
          dec = ".";
          break;
        }
        digit += input[i];
      }
    }
  }
  while (i < input.length) {
    i++;
    if (validator[2].includes(input[i])) {
      dec += input[i];
      if (fixed && dec.length > fixed) break;
    }
  }
  if (comma && digit.length > 3) {
    let outputWithComma = "";
    for (let t = digit.length - 1; t > -1; t--) {
      outputWithComma = digit[t] + outputWithComma;
      if (outputWithComma.length % 4 === 3 && t > 0) {
        outputWithComma = "," + outputWithComma;
      }
    }
    digit = outputWithComma;
  }
  digit = sign + digit + dec;
  return { string: digit, number: Number(digit) };
};

/** CHECK FOR VALID INPUT */
const IsValidInput = (value: any) => typeof value === "string" || typeof value === "number";
const pipeStringInput = (value: any) => (typeof value === "string" ? { value: value, error: "" } : invalidValueResponse);

/** INPUT STRATEGY */
export const strategyIn = {
  text: pipeStringInput,
  email: pipeStringInput,
  number: (value: any, withComma = false) =>
    IsValidInput(value) ? { value: matchStringNumber(`${value}`, withComma).string, error: "" } : invalidValueResponse,
  price: (value: any, withComma = false) =>
    IsValidInput(value) ? { value: matchStringNumber(`${value}`, withComma, 2).string, error: "" } : invalidValueResponse,
  username: pipeStringInput,
  password: pipeStringInput,
  any: (value: any) => (IsValidInput(value) ? { value: `${value}`, error: "" } : invalidValueResponse),
};

/** OUTPUT STRATEGY */
export const strategyOut = {
  text: (value: string) => ({ inputValue: value, outputValue: value, error: "" }),
  email: (value: string) => ({
    inputValue: value,
    outputValue: value,
    error: expressions.email.test(value) ? "" : FormBenderMessage.error.invalidEmail,
  }),
  number: (value: string, withComma = false) => {
    if (numPass.includes(value)) return { inputValue: value, outputValue: 0, error: "" };
    const { string, number } = matchStringNumber(value, withComma);
    return { inputValue: string, outputValue: number, error: "" };
  },
  price: (value: string, withComma = false) => {
    if (numPass.includes(value)) return { inputValue: value, outputValue: "0.00", error: "" };
    const { string, number } = matchStringNumber(value, withComma, 2);
    return { inputValue: string, outputValue: number.toFixed(2), error: "" };
  },
  username: (value: string) => ({
    inputValue: value,
    outputValue: value,
    error: expressions.userName.test(value) ? "" : FormBenderMessage.error.invalidUsername,
  }),
  password: (value: string) => ({
    inputValue: value,
    outputValue: value,
    error: expressions.passwordSecure.test(value) ? "" : FormBenderMessage.error.invalidEmail,
  }),
  any: (value: string) => ({ inputValue: value, outputValue: value, error: "" }),
};
