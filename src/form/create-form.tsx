import React from "react";
import { Formik, FormikValues } from "formik";
import { Form as AntdForm } from "formik-antd";
import FormProps from "./form-props";
import withInputWrapper from "./with-input-wrapper";
import TextInput, { TextInputProps } from "./text-input";
import SelectInput, { SelectInputProps } from "./select-input";
import SubmitButton, { SubmitButtonProps } from "./submit-button";

type FormComponents<TValues extends FormikValues> = {
  Form: React.ComponentType<FormProps<TValues>>;
  TextInput: React.ComponentType<TextInputProps<TValues>>;
  SelectInput: React.ComponentType<SelectInputProps<TValues>>;
  SubmitButton: React.ComponentType<SubmitButtonProps>;
};

const Form = <TValues extends FormikValues>({
  children,
  validationSchema,
  initialValues,
  onSubmit,
}: FormProps<TValues>) => (
  <Formik<TValues>
    validationSchema={validationSchema}
    initialValues={initialValues}
    enableReinitialize
    onSubmit={onSubmit}
  >
    <AntdForm layout="vertical">{children}</AntdForm>
  </Formik>
);

const createForm = <TValues extends FormikValues>(): FormComponents<TValues> => ({
  Form,
  TextInput: withInputWrapper<TValues, TextInputProps<TValues>>(TextInput),
  SelectInput: withInputWrapper<TValues, SelectInputProps<TValues>>(SelectInput),
  SubmitButton,
});

export default createForm;
