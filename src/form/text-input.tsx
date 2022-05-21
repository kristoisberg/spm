import React from "react";
import { FormikValues } from "formik";
import { Input } from "formik-antd";
import InputProps from "./input-props";

export type TextInputProps<TValues extends FormikValues> = {
  placeholder?: string;
  type?: string;
} & InputProps<TValues>;

const TextInput = <TValues extends FormikValues>({ label, placeholder, ...props }: TextInputProps<TValues>) => (
  <Input placeholder={placeholder || label} {...props} />
);

TextInput.defaultProps = {
  type: "text",
};

export default TextInput;
