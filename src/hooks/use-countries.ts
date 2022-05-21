import { useEffect, useState } from "react";
import useFetch from "../fetch/use-fetch";
import Country from "../types/country";

const useCountries = (): Country[] | null => {
  const [countries, setCountries] = useState<Country[] | null>(null);
  const { getJSON } = useFetch();

  useEffect(() => {
    getJSON<Country[]>("/api/countries").then(setCountries);
  }, [getJSON]);

  return countries;
};

export default useCountries;
