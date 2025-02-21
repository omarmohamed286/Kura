import { Button, TextInput } from "@mantine/core";
import isYoutubeUrl from "@validations/isYoutubeUrl";
import notify from "@utils/notify";
import useGetVideoInfo from "@hooks/useGetVideoInfo";
import useAddVideo from "@hooks/useAddVideo";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

type AddVideoModalProps = {
  closeModal: () => void;
};

const AddVideoModal = ({ closeModal }: AddVideoModalProps) => {
  const [isUrlError, setIsUrlError] = useState(false);
  const [url, setUrl] = useState("");
  const { getVideoError, videoInfo, getVideoInfo } = useGetVideoInfo(url);
  const { addVideoError, isAddingVideo, addVideo } = useAddVideo(url);

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
    } else if (getVideoError) {
      return <p>{getVideoError}</p>;
    }
    return null;
  };
  const handleOnSubmit = async () => {
    if (url && !isUrlError) {
      const promise = await addVideo();
      if (!promise.error) {
        await queryClient.invalidateQueries({ queryKey: ["videos"] });
        closeModal();
      }
      else {
          notify("Video Added Succesfully")
      }
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
          } else if (isYoutubeUrl(e.target.value)) {
            setUrl(e.target.value);
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
