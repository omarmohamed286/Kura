import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Video } from "../types";
import { handleApiError } from "@utils/handleApiError";

const useGetVideos = () => {
  const { isPending, error, data } = useQuery<Video[]>({
    queryKey: ["videos"],
    queryFn: () => axios.get("/videos").then((res) => res.data.data),
  });

  return {
    isGettingVideos: isPending,
    error: error ? handleApiError(error) : null,
    videos: data,
  };
};

export default useGetVideos;
