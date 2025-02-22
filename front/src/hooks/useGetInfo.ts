import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { handleApiError } from "@utils/handleApiError";

const useGetInfo = <T>(path: string, url: string) => {
  const { error, data, refetch } = useQuery<T>({
    enabled: !!url,
    queryKey: [`${path}Info`, url],
    gcTime: 0,
    retry: 0,
    queryFn: () =>
      axios
        .post(`/${path}/info`, {
          url,
        })
        .then((res) => res.data),
  });

  return {
    error: error ? handleApiError(error) : null,
    data,
    refetch,
  };
};

export default useGetInfo;
