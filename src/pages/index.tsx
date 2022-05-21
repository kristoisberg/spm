import { useEffect, useState } from "react";
import useFetch from "../fetch/use-fetch";
import Client from "../types/client";
import Loader from "../components/loader";
import { Link } from "react-router-dom";

const IndexPage = () => {
  const { getJSON } = useFetch();
  const [clients, setClients] = useState<Client[] | null>(null);

  useEffect(() => {
    getJSON<Client[]>("api/clients/user/0").then(setClients);
  }, [getJSON]);

  if (clients === null) {
    return <Loader />;
  }

  return (
    <>
      <div className="py-5 text-center">
        <h2>Clients</h2>
      </div>
      <Link to="clients/add" className="btn btn-primary">
        Add client
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Username</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {clients.map(({ clientId, firstName, lastName, username }) => (
            <tr key={clientId}>
              <th scope="row">{clientId}</th>
              <td>{firstName}</td>
              <td>{lastName}</td>
              <td>{username}</td>
              <td>
                <Link to={`clients/${clientId}`} className="btn btn-primary">
                  Edit client
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default IndexPage;
