import { TextInput, Center, Loader } from "@mantine/core";
import { Toaster } from "react-hot-toast";

import { ModalComponent, VideoCard } from "@components/index";
import { AddVideoModal } from "@components/index";
import { Video } from "@customTypes/index";

import { useDisclosure } from "@mantine/hooks";
import useGetDocuments from "@hooks/useGetDocuments";

import styles from "./styles.module.css";
import { useState } from "react";
const { addVideoButton, videosContainer } = styles;

const Videos = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [opened, { open, close }] = useDisclosure(false);
  const {
    error,
    isFetching,
    isPending,
    data: videos,
    refetch,
  } = useGetDocuments<Video>("videos", searchKeyword);

  const handleGetVideos = () => {
    if (isPending || (isFetching && searchKeyword)) {
      return (
        <Center h={600}>
          <Loader color="cyan"></Loader>
        </Center>
      );
    } else if (videos && videos.length > 0) {
      return [...videos].reverse().map((video) => {
        return (
          <div className={videosContainer} key={video._id}>
            <VideoCard video={video} />
          </div>
        );
      });
    } else if (error) {
      return (
        <Center h={600}>
          <p>{error}</p>
        </Center>
      );
    }
    return (
      <Center h={600}>
        <p>No videos available</p>
      </Center>
    );
  };

  const handleOnSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
    refetch();
  };

  return (
    <div style={{ marginInline: "1rem" }}>
      <button className={addVideoButton} onClick={open}>
        +
      </button>
      <Center>
        <TextInput
          placeholder="Search"
          leftSection={<i className="fa-solid fa-magnifying-glass"></i>}
          w="20rem"
          style={{ marginTop: "2rem" }}
          onChange={handleOnSearch}
        ></TextInput>
      </Center>
      {handleGetVideos()}
      <ModalComponent opened={opened} close={close} title="Add New Youtube Video">
        <AddVideoModal closeModal={close}></AddVideoModal>
      </ModalComponent>
      <Toaster position="top-right"></Toaster>
    </div>
  );
};

export default Videos;