import { useMemo, useState } from "react";
import { FormBenderFolder, FormBenderState, IsObjectEqualType, OValue } from "./FormBender.types";

const isObjectEqual: IsObjectEqualType = (A, B = {}) => {
  for (let key of Object.keys(A)) {
    if (A[key] != B[key]) {
      return false;
    }
  }
  return true;
};
const createState = (form: OValue, clean = false): FormBenderState => {
  const Entries: OValue = {};
  Object.keys(form).map((key) => {
    Entries[key] = clean ? "" : form[key] ?? "";
  });
  return {
    dirty: false,
    initialValues: Entries,
    values: Entries,
    errors: {},
    touched: {},
    version: (Math.random() + 1).toString(36).substring(7),
  };
};
export const useFormManager = (initialState: OValue): FormBenderFolder => {
  const [state, setState] = useState<FormBenderState>(createState(initialState));
  const action = useMemo(
    () => ({
      onChange: (value: string | number, name: string) => {
        if (!name) return;
        state.values[name] = value;
        state.dirty = !isObjectEqual(state.values, state.initialValues);
        setState((prev) => ({ ...prev }));
      },
      reset: () => setState(createState(initialState)),
      clear: () => setState(createState(initialState, true)),
      update: (data: OValue) => setState(createState(data)),
      get: (key: string) => ({
        name: key,
        value: state.values[key],
        touched: state.touched[key],
        errors: state.errors[key],
        initialValue: state.initialValues[key],
      }),
    }),
    []
  );
  return { action, state };
};
