import { Center, Loader, TextInput } from "@mantine/core";
import { ModalComponent } from "@components/index";
import { AddTopicModal } from "@components/index";
import { TopicCard } from "@components/index";

import { Topic } from "@customTypes/index";

import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import useGetDocuments from "@hooks/useGetDocuments";

import styles from "./styles.module.css";
import { Toaster } from "react-hot-toast";
const { addTopicButton, topicsContainer } = styles;

const Topics = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [opened, { open, close }] = useDisclosure(false);

  const {
    error,
    isFetching,
    isPending,
    data: topics,
    refetch,
  } = useGetDocuments<Topic>("topics", searchKeyword);

  const handleGetTopics = () => {
    if (isPending || (isFetching && searchKeyword)) {
      return (
        <Center h={600}>
          <Loader color="cyan"></Loader>
        </Center>
      );
    } else if (topics && topics.length > 0) {
      return [...topics].reverse().map((topic) => {
        return (
          <div className={topicsContainer} key={topic._id}>
            <TopicCard topic={topic}></TopicCard>
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
        <p>No Topics available</p>
      </Center>
    );
  };

  const handleOnSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
    refetch();
  };

  return (
    <div style={{ marginInline: "1rem" }}>
      <button className={addTopicButton} onClick={open}>
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
      {handleGetTopics()}
      <ModalComponent
        opened={opened}
        close={close}
        title="Add New Youtube Video"
      >
        <AddTopicModal closeModal={close}></AddTopicModal>
      </ModalComponent>
      <Toaster position="top-right"></Toaster>
    </div>
  );
};

export default Topics;
