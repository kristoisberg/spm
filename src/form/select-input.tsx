import React from "react";
import { FormikValues, useField } from "formik";
import InputProps from "./input-props";
import InternalInputProps from "./internal-input-props";

export type Option = {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
};

export type SelectInputProps<TValues extends FormikValues> = {
  options: Option[];
} & InputProps<TValues> &
  InternalInputProps;

const SelectInput = <TValues extends FormikValues>({ name, options, ...props }: SelectInputProps<TValues>) => {
  const [fieldProps] = useField(name);

  return (
    <select className="form-select" {...props} {...fieldProps}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;
