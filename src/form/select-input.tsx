import React from "react";
import { Select } from "formik-antd";
import InputProps from "./input-props";
import { FormikValues } from "formik";

export type Option = {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
};

export type SelectInputProps<TValues extends FormikValues> = {
  options: Option[];
  mode?: "multiple" | "tags";
  allowClear?: boolean;
} & InputProps<TValues>;

const SelectInput = <TValues extends FormikValues>({
  name,
  id,
  mode,
  allowClear,
  options,
}: SelectInputProps<TValues>) => {
  return (
    <Select name={name} id={id} mode={mode} allowClear={allowClear}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </Select>
  );
};

export default SelectInput;
