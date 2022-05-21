import { FormikValues } from "formik";

type InputProps<TValues extends FormikValues> = {
  name: Extract<keyof TValues, string>;
  label: string;
  id?: string;
  required: boolean;
};

export default InputProps;
