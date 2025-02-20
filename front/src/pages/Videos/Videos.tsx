import { TextInput, Center, Loader } from "@mantine/core";
import { VList } from "virtua";

import { ModalComponent, VideoCard } from "@components/index";
import { AddVideoModal } from "@components/index";

import { useDisclosure } from "@mantine/hooks";
import useGetVideos from "@hooks/useGetVideos";

import styles from "./styles.module.css";
const { addVideoButton } = styles;

const Videos = () => {
  const { isGettingVideos, videos, error } = useGetVideos();
  const [opened, { open, close }] = useDisclosure(false);

  const handleGetVideos = () => {
    if (isGettingVideos) {
      return (
        <Center h={600}>
          <Loader color="cyan"></Loader>
        </Center>
      );
    } else if (videos && videos.length > 0) {
      return (
        <>
          {
            <VList style={{ height: 700 }}>
              {videos.reverse().map((video) => {
                return (
                  <Center key={video._id}>
                    <VideoCard video={video} />
                  </Center>
                );
              })}
            </VList>
          }
        </>
      );
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

  return (
    <div>
      <button className={addVideoButton} onClick={open}>
        +
      </button>
      <Center>
        <TextInput
          placeholder="Search"
          leftSection={<i className="fa-solid fa-magnifying-glass"></i>}
          w="20rem"
          style={{ marginTop: "2rem" }}
        ></TextInput>
      </Center>
      {handleGetVideos()}
      <ModalComponent opened={opened} close={close}>
        <AddVideoModal closeModal={close}></AddVideoModal>
      </ModalComponent>
    </div>
  );
};

export default Videos;
