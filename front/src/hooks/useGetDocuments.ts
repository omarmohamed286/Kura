import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { handleApiError } from "@utils/handleApiError";

const useGetDocuments = <T>(path: string, searchKeyword: string) => {
  const { isPending, error, data, refetch, isFetching } = useQuery<T[]>({
    queryKey: [path, searchKeyword],
    queryFn: () =>
      axios
        .get(`/${path}?keyword=${searchKeyword}`)
        .then((res) => res.data.data),
  });

  console.log(data)

  return {
    isPending,
    isFetching,
    error: error ? handleApiError(error) : null,
    data,
    refetch,
  };
};

export default useGetDocuments;
