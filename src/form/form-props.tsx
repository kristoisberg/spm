import { ReactNode } from "react";
import { FormikHelpers, FormikValues } from "formik";
import { SchemaOf } from "yup";

type FormProps<TValues extends FormikValues> = {
  children: ReactNode;
  // the following type is taken from the source code of Formik
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (values: TValues, formikHelpers: FormikHelpers<TValues>) => void | Promise<any>;
  initialValues: TValues;
  validationSchema: SchemaOf<TValues>;
};

export default FormProps;
