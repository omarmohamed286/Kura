import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Video } from "../types";
import { handleApiError } from "@utils/handleApiError";

const useGetVideos = (keyword: string) => {
  const { isPending, error, data, refetch, isFetching } = useQuery<Video[]>({
    queryKey: ["videos", keyword],
    queryFn: () =>
      axios.get(`/videos?keyword=${keyword}`).then((res) => res.data.data),
  });

  return {
    isGettingVideos: isPending,
    isSearchingVideos: isFetching,
    error: error ? handleApiError(error) : null,
    videos: data,
    refetchVideos: refetch,
  };
};

export default useGetVideos;
