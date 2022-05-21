import { useNavigate, useParams } from "react-router-dom";

const useClientIdParam = (): number => {
  const { clientId } = useParams();
  const navigate = useNavigate();

  if (clientId === undefined) {
    navigate("/");
  }

  return parseInt(clientId || "", 10);
};

export default useClientIdParam;
