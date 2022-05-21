import React from "react";
import { FormikValues, useField } from "formik";
import InputProps from "./input-props";
import InternalInputProps from "./internal-input-props";

export type TextInputProps<TValues extends FormikValues> = {
  placeholder?: string;
  type?: string;
} & InputProps<TValues> &
  InternalInputProps;

const TextInput = <TValues extends FormikValues>({ name, label, placeholder, ...props }: TextInputProps<TValues>) => {
  const [fieldProps] = useField(name);
  return <input className="form-control" placeholder={placeholder || label} {...props} {...fieldProps} />;
};

TextInput.defaultProps = {
  type: "text",
};

export default TextInput;
