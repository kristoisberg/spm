import React from "react";
import { Form as FormikForm, Formik, FormikValues } from "formik";
import FormProps from "./form-props";
import withInputWrapper from "./with-input-wrapper";
import TextInput, { TextInputProps } from "./text-input";
import SelectInput, { SelectInputProps } from "./select-input";
import SubmitButton, { SubmitButtonProps } from "./submit-button";
import InternalInputProps from "./internal-input-props";

type FormComponents<TValues extends FormikValues> = {
  Form: React.ComponentType<FormProps<TValues>>;
  TextInput: React.ComponentType<Omit<TextInputProps<TValues>, keyof InternalInputProps>>;
  SelectInput: React.ComponentType<Omit<SelectInputProps<TValues>, keyof InternalInputProps>>;
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
    <FormikForm>{children}</FormikForm>
  </Formik>
);

const createForm = <TValues extends FormikValues>(): FormComponents<TValues> => ({
  Form,
  TextInput: withInputWrapper<TValues, TextInputProps<TValues>>(TextInput),
  SelectInput: withInputWrapper<TValues, SelectInputProps<TValues>>(SelectInput),
  SubmitButton,
});

export default createForm;
