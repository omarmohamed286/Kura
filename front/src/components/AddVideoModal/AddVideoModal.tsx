import { Button, TextInput } from "@mantine/core";

import isYoutubeUrl from "@validations/isYoutubeUrl";
import notify from "@utils/notify";
import useGetInfo from "@hooks/useGetInfo";
import useAddDocument from "@hooks/useAddDocument";
import { Video } from "@customTypes/index";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

type AddVideoModalProps = {
  closeModal: () => void;
};

const AddVideoModal = ({ closeModal }: AddVideoModalProps) => {
  const [isUrlError, setIsUrlError] = useState(false);
  const [url, setUrl] = useState("");
  const {
    error: addVideoError,
    isFetching: isAddingVideo,
    refetch: addVideo,
  } = useAddDocument("videos", { url });

  const {
    error: getVideoInfoError,
    data: videoInfo,
    refetch: getVideoInfo,
  } = useGetInfo<Video>("videos", url);

  const queryClient = useQueryClient();

  const handleVideoInfo = () => {
    if (isUrlError) {
      return <p>URL Should Be Valid Youtube URL</p>;
    } else if (videoInfo) {
      return (
        <>
          <img
            src={videoInfo.thumbnail}
            alt={videoInfo.title}
            style={{ width: "100%", marginTop: "0.5rem" }}
          />
          <p>{videoInfo.title}</p>
          <p>{videoInfo.channelName}</p>
        </>
      );
    } else if (getVideoInfoError) {
      return <p>{getVideoInfoError}</p>;
    }
    return null;
  };
  const handleOnSubmit = async () => {
    if (url && !isUrlError) {
      addVideo({ throwOnError: true })
        .then(async () => {
          await queryClient.refetchQueries({ queryKey: ["videos"] });
          notify("Video Added Succesfully", "success");
          closeModal();
        })
        .catch((_) => {
          // err is passed to addVideoError
        });
    }
  };

  return (
    <>
      <TextInput
        label="Video URL"
        onChange={(e) => {
          queryClient.clear();
          if (!e.target.value) {
            setIsUrlError(false);
            setUrl("");
          } else if (isYoutubeUrl(e.target.value.trim())) {
            setUrl(e.target.value.trim());
            setIsUrlError(false);
            getVideoInfo();
          } else {
            setIsUrlError(true);
          }
        }}
        data-autofocus
      />
      {handleVideoInfo()}
      <Button
        fullWidth
        mt="md"
        onClick={handleOnSubmit}
        disabled={addVideoError ? true : false}
        loading={isAddingVideo ? true : false}
        loaderProps={{ type: "dots" }}
      >
        Submit
      </Button>
      {addVideoError ? addVideoError : null}
    </>
  );
};

export default AddVideoModal;
