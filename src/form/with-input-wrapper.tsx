/* eslint-disable react/display-name */
import React from "react";
import { ErrorMessage, FormikValues, useFormikContext } from "formik";
import InputProps from "./input-props";
import { isRequired } from "./utils";
import InternalInputProps from "./internal-input-props";

const withInputWrapper =
  <TValues extends FormikValues, TProps extends InputProps<TValues> & InternalInputProps>(
    Input: React.ComponentType<TProps>
  ): React.ComponentType<Omit<TProps, keyof InternalInputProps>> =>
  (props: Omit<TProps, keyof InternalInputProps>) => {
    const { name, label } = props;
    const { validationSchema } = useFormikContext();
    const required = isRequired(validationSchema, name);

    return (
      <div className="form-group">
        <label htmlFor={name}>
          {label} {!required && <span className="text-muted">(Optional)</span>}
        </label>
        <Input {...({ ...props, required } as TProps)} />
        <ErrorMessage name={name} />
      </div>
    );
  };

export default withInputWrapper;
