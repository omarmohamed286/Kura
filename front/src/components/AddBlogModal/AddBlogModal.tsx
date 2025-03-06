import { Button, TextInput } from "@mantine/core";

import isUrl from "@validations/isUrl";
import notify from "@utils/notify";
import useGetInfo from "@hooks/useGetInfo";
import useAddDocument from "@hooks/useAddDocument";
import { Blog } from "@customTypes/index";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

type AddBlogModalProps = {
  closeModal: () => void;
};

const AddBlogModal = ({ closeModal }: AddBlogModalProps) => {
  const [isUrlError, setIsUrlError] = useState(false);
  const [url, setUrl] = useState("");
  const {
    error: addBlogError,
    isFetching: isAddingBlog,
    refetch: addBlog,
  } = useAddDocument("blogs", { url });

  const {
    error: getBlogInfoError,
    data: blogInfo,
    refetch: getBlogInfo,
  } = useGetInfo<Blog>("blogs", url);

  const queryClient = useQueryClient();

  const handleBlogInfo = () => {
    if (isUrlError) {
      return <p>URL Should Be Valid</p>;
    } else if (blogInfo) {
      return (
        <>
          <p>{blogInfo.title}</p>
          <p>{blogInfo.description}</p>
        </>
      );
    } else if (getBlogInfoError) {
      return <p>{getBlogInfoError}</p>;
    }
    return null;
  };
  const handleOnSubmit = async () => {
    if (url && !isUrlError) {
      addBlog({ throwOnError: true })
        .then(async () => {
          await queryClient.refetchQueries({ queryKey: ["blogs"] });
          notify("Blog Added Succesfully", "success");
          closeModal();
        })
        .catch((_) => {
          // err is passed to addBlogError
        });
    }
  };

  return (
    <>
      <TextInput
        label="Blog URL"
        onChange={(e) => {
          queryClient.clear();
          if (!e.target.value) {
            setIsUrlError(false);
            setUrl("");
          } else if (isUrl(e.target.value)) {
            setUrl(e.target.value.trim());
            setIsUrlError(false);
            getBlogInfo();
          } else {
            setIsUrlError(true);
          }
        }}
        data-autofocus
      />
      {handleBlogInfo()}
      <Button
        fullWidth
        mt="md"
        onClick={handleOnSubmit}
        disabled={addBlogError ? true : false}
        loading={isAddingBlog ? true : false}
        loaderProps={{ type: "dots" }}
      >
        Submit
      </Button>
      {addBlogError ? addBlogError : null}
    </>
  );
};

export default AddBlogModal;
