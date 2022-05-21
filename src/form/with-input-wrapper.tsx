/* eslint-disable react/display-name */
import React from "react";
import { FormikValues, useFormikContext } from "formik";
import { FormItem } from "formik-antd";
import InputProps from "./input-props";
import { isRequired } from "./utils";

const withInputWrapper =
  <TValues extends FormikValues, TProps extends InputProps<TValues>>(
    Input: React.ComponentType<TProps>
  ): React.ComponentType<TProps> =>
  (props: TProps) => {
    const { name, label } = props;
    const { validationSchema } = useFormikContext();
    const required = isRequired(validationSchema, name);

    return (
      <FormItem name={name} label={label} required={required}>
        <Input {...({ ...props, required } as TProps)} />
      </FormItem>
    );
  };

export default withInputWrapper;
