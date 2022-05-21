import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormikHelpers } from "formik";
import ErrorContainer from "../components/error-container";
import ClientForm from "../components/client-form";
import Loader from "../components/loader";
import useFetch from "../fetch/use-fetch";
import useClientIdParam from "../hooks/use-client-id-param";
import useCountries from "../hooks/use-countries";
import Client from "../types/client";
import ClientWritable from "../types/client-writable";

const EditClientPage = () => {
  const countries = useCountries();
  const clientId = useClientIdParam();
  const [client, setClient] = useState<Client | null>(null);
  const { getJSON, putJSON } = useFetch();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getJSON<Client>(`/api/clients/${clientId}`).then(setClient);
  }, [getJSON, clientId]);

  if (countries === null || client === null) {
    return <Loader />;
  }

  const onSubmit = (values: ClientWritable, { setSubmitting }: FormikHelpers<ClientWritable>) => {
    putJSON(`/api/clients/${clientId}`, values)
      .then(() => navigate("/"))
      .catch((message: string) => {
        setSubmitting(false);
        setError(message);
      });
  };
  return (
    <>
      <div className="py-5 text-center">
        <h2>Edit Client</h2>
      </div>
      <ErrorContainer error={error} />
      <ClientForm initialValues={client} countries={countries} submitButtonText="Edit Client" onSubmit={onSubmit} />
    </>
  );
};

export default EditClientPage;
