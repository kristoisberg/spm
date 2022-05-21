import * as yup from "yup";
import { SchemaOf } from "yup";
import ClientWritable from "../types/client-writable";
import Country from "../types/country";
import createForm from "../form/create-form";
import { Option } from "../form/select-input";
import { useMemo } from "react";
import { FormikHelpers } from "formik";

type ClientFormProps = {
  initialValues: ClientWritable;
  countries: Country[];
  submitButtonText: string;
  // the following type is taken from the source code of Formik
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (values: ClientWritable, formikHelpers: FormikHelpers<ClientWritable>) => void | Promise<any>;
};

const validationSchema: SchemaOf<ClientWritable> = yup.object({
  countryCode: yup.string().required().min(2).max(2),
  firstName: yup.string().required().max(32),
  lastName: yup.string().required().max(32),
  username: yup.string().required().max(32),
  email: yup.string().required().max(128).email(),
  address: yup.string().required().max(128),
});

const { Form, TextInput, SelectInput, SubmitButton } = createForm<ClientWritable>();

const ClientForm = ({ countries, initialValues, submitButtonText, onSubmit }: ClientFormProps) => {
  const countryOptions: Option[] = useMemo(
    () => [{ value: "", name: "Choose..." }, ...countries.map(({ code, name }) => ({ value: code, name }))],
    [countries]
  );

  return (
    <Form initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      <div className="row">
        <div className="col-md-6 mb-3">
          <TextInput name="firstName" label="First name" />
        </div>
        <div className="col-md-6 mb-3">
          <TextInput name="lastName" label="Last name" />
        </div>
      </div>

      <div className="mb-3">
        <TextInput name="username" label="Username" />
      </div>

      <div className="mb-3">
        <TextInput name="email" label="Email" placeholder="you@example.com" />
      </div>

      <div className="mb-3">
        <TextInput name="address" label="Address" placeholder="1234 Main St" />
      </div>

      <div className="mb-3">
        <SelectInput name="countryCode" label="Country" options={countryOptions} />
      </div>

      <hr className="mb-4" />

      <SubmitButton>{submitButtonText}</SubmitButton>
    </Form>
  );
};

export default ClientForm;
