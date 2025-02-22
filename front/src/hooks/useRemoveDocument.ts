import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { handleApiError } from "@utils/handleApiError";

const useRemoveDocument = (path: string, id?: string) => {
  const { error, refetch, isFetching } = useQuery({
    enabled: false,
    retry: false,
    gcTime: 0,
    refetchInterval: false,
    queryKey: [`remove${path}`, id],
    queryFn: () => axios.delete(`/${path}/${id}`).then((res) => res.data),
  });

  return {
    isFetching,
    error: error ? handleApiError(error) : null,
    refetch,
  };
};

export default useRemoveDocument;
