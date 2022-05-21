import { useEffect, useRef, useCallback, useMemo } from "react";
import RequestMethod from "./request-method";

// todo: does not currently support fetch with RequestInfo as the first argument
const useFetch = () => {
  const abortController = useRef(new AbortController());

  useEffect(() => {
    const controller = abortController.current;

    return () => {
      controller.abort();
    };
  }, []);

  const cleanFetch = useCallback((endpoint: string, { headers, ...init }: RequestInit = {}) => {
    return new Promise<Response>((resolve, reject) => {
      const { signal } = abortController.current;
      const requestInit: RequestInit = { ...init, signal, headers };

      fetch(endpoint, requestInit)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }, []);

  const fetchJSON = useCallback(
    <TRequest, TResponse>(method: string, endpoint: string, entity?: TRequest): Promise<TResponse> => {
      return new Promise<TResponse>((resolve, reject) => {
        const requestInit: RequestInit = {
          method,
          cache: "no-cache",
          credentials: "include",
          headers: {
            Accept: "application/json",
            ...(entity && { "Content-Type": "application/json" }),
          },
          ...(entity && { body: JSON.stringify(entity) }),
        };

        cleanFetch(endpoint, requestInit)
          .then((response) => {
            response
              .json()
              .then((json) => {
                if (response.ok) {
                  resolve(json);
                } else {
                  reject(json.message);
                }
              })
              .catch((error) => reject(error));
          })
          .catch((error) => reject(error));
      });
    },
    [cleanFetch]
  );

  const getJSON = useCallback(
    <TResponse>(endpoint: string): Promise<TResponse> => fetchJSON(RequestMethod.GET, endpoint),
    [fetchJSON]
  );

  const postJSON = useCallback(
    <TRequest, TResponse>(endpoint: string, entity?: TRequest): Promise<TResponse> =>
      fetchJSON(RequestMethod.POST, endpoint, entity),
    [fetchJSON]
  );

  const putJSON = useCallback(
    <TRequest, TResponse>(endpoint: string, entity?: TRequest): Promise<TResponse> =>
      fetchJSON(RequestMethod.PUT, endpoint, entity),
    [fetchJSON]
  );

  const deleteJSON = useCallback(
    <TResponse>(endpoint: string): Promise<TResponse> => fetchJSON(RequestMethod.DELETE, endpoint),
    [fetchJSON]
  );

  const result = useMemo(
    () => ({
      fetch: cleanFetch,
      fetchJSON,
      getJSON,
      postJSON,
      putJSON,
      deleteJSON,
    }),
    [cleanFetch, fetchJSON, getJSON, postJSON, putJSON, deleteJSON]
  );

  return result;
};

export default useFetch;
