import { Button, TextInput } from "@mantine/core";

import notify from "@utils/notify";
import useAddDocument from "@hooks/useAddDocument";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

type AddBlogModalProps = {
  closeModal: () => void;
};

const AddTopicModal = ({ closeModal }: AddBlogModalProps) => {
  const [isTitleError, setIsTitleError] = useState(false);
  const [title, setTitle] = useState("");
  const {
    error: addTopicError,
    isFetching: isAddingTopic,
    refetch: addTopic,
  } = useAddDocument("topics", { title });

  const queryClient = useQueryClient();

  const handleOnSubmit = async () => {
    if (!title) {
      setIsTitleError(true);
    }
    if (title && !isTitleError) {
      addTopic({ throwOnError: true })
        .then(async () => {
          await queryClient.refetchQueries({ queryKey: ["topics"] });
          notify("Topic Added Succesfully", "success");
          closeModal();
        })
        .catch((_) => {
          // err is passed to addTopicError
        });
    }
  };

  return (
    <>
      <TextInput
        label="Topic Title"
        onChange={(e) => {
          queryClient.clear();
          if (!e.target.value) {
            setIsTitleError(false);
            setTitle("");
          } else if (e.target.value) {
            setTitle(e.target.value.trim());
            setIsTitleError(false);
          } else {
            setIsTitleError(true);
          }
        }}
        data-autofocus
      />
      {isTitleError && "Title is required"}
      <Button
        fullWidth
        mt="md"
        onClick={handleOnSubmit}
        disabled={addTopicError ? true : false}
        loading={isAddingTopic ? true : false}
        loaderProps={{ type: "dots" }}
      >
        Submit
      </Button>
      {addTopicError ? addTopicError : null}
    </>
  );
};

export default AddTopicModal;
