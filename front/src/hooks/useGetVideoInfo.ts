import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Video } from "../types";
import { handleApiError } from "@utils/handleApiError";

const useGetVideoInfo = (url: string) => {
  const { error, data, refetch } = useQuery<Video>({
    enabled: !!url,
    queryKey: ["videoInfo", url],
    gcTime: 0,
    retry: 0,
    queryFn: () =>
      axios
        .post("/videos/info", {
          url,
        })
        .then((res) => res.data),
  });

  return {
    getVideoError: error ? handleApiError(error) : null,
    videoInfo: data,
    getVideoInfo: refetch,
  };
};

export default useGetVideoInfo;
