import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { handleApiError } from "@utils/handleApiError";

const useAddVideo = (url: string) => {
  const { error, refetch, fetchStatus } = useQuery({
    enabled: false,
    retry: false,
    gcTime: 0,
    queryKey: ["addVideo"],
    queryFn: () =>
      axios
        .post("/videos", {
          url,
        })
        .then((res) => res.data),
  });

  return {
    isAddingVideo: fetchStatus == "fetching",
    addVideoError: error ? handleApiError(error) : null,
    addVideo: refetch,
  };
};

export default useAddVideo;
