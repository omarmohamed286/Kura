import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { handleApiError } from "@utils/handleApiError";

const useRemoveVideo = (id?: string) => {
  const { error, refetch, fetchStatus } = useQuery({
    enabled: false,
    retry: false,
    gcTime: 0,
    queryKey: ["removeVideo",id],
    queryFn: () =>
      axios
        .delete(`http://localhost:3005/videos/5`)
        .then((res) => res.data),
  });

  return {
    isRemovingVideo: fetchStatus == "fetching",
    removeVideoError: error ? handleApiError(error) : null,
    removeVideo: refetch,
  };
};

export default useRemoveVideo;
