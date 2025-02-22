import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { handleApiError } from "@utils/handleApiError";

const useAddDocument = (path: string, url: string) => {
  const { error, refetch, isFetching } = useQuery({
    enabled: false,
    retry: false,
    gcTime: 0,
    queryKey: [`add${path}`],
    queryFn: () =>
      axios
        .post(`/${path}`, {
          url,
        })
        .then((res) => res.data),
  });

  return {
    isFetching,
    error: error ? handleApiError(error) : null,
    refetch,
  };
};

export default useAddDocument;
