import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormikHelpers } from "formik";
import useFetch from "../fetch/use-fetch";
import ClientForm from "../components/client-form";
import Loader from "../components/loader";
import useCountries from "../hooks/use-countries";
import ClientWritable from "../types/client-writable";
import ErrorContainer from "../components/error-container";

const initialValues: ClientWritable = {
  countryCode: "",
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  address: "",
};

const AddClientPage = () => {
  const countries = useCountries();
  const { postJSON } = useFetch();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  if (countries === null) {
    return <Loader />;
  }

  const onSubmit = (values: ClientWritable, { setSubmitting }: FormikHelpers<ClientWritable>) => {
    postJSON("/api/clients", values)
      .then(() => navigate("/"))
      .catch((message: string) => {
        setSubmitting(false);
        setError(message);
      });
  };

  return (
    <>
      <div className="py-5 text-center">
        <h2>Add Client</h2>
      </div>
      <ErrorContainer error={error} />
      <ClientForm
        initialValues={initialValues}
        countries={countries}
        submitButtonText="Add Client"
        onSubmit={onSubmit}
      />
    </>
  );
};

export default AddClientPage;
