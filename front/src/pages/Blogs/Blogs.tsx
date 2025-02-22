import { Center, Loader, TextInput } from "@mantine/core";
import { Toaster } from "react-hot-toast";

import { ModalComponent } from "@components/index";
import { AddBlogModal } from "@components/index";
import { Blog } from "@customTypes/index";

import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import useGetDocuments from "@hooks/useGetDocuments";

import styles from "./styles.module.css";
import {BlogCard} from "@components/index";
const { addBlogButton, blogsContainer } = styles;

const Blogs = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [opened, { open, close }] = useDisclosure(false);
  const {
    error,
    isFetching,
    isPending,
    data: blogs,
    refetch,
  } = useGetDocuments<Blog>("blogs", searchKeyword);

  const handleGetBlogs = () => {
    if (isPending || (isFetching && searchKeyword)) {
      return (
        <Center h={600}>
          <Loader color="cyan"></Loader>
        </Center>
      );
    } else if (blogs && blogs.length > 0) {
      return [...blogs].reverse().map((blog) => {
        return (
          <div className={blogsContainer} key={blog._id}>
            <BlogCard blog={blog}></BlogCard>
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
        <p>No Blogs available</p>
      </Center>
    );
  };

  const handleOnSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
    refetch();
  };

  return (
    <div style={{ marginInline: "1rem" }}>
      <button className={addBlogButton} onClick={open}>
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
      {handleGetBlogs()}
      <ModalComponent opened={opened} close={close} title="Add New Blog">
        <AddBlogModal closeModal={close}></AddBlogModal>
      </ModalComponent>
      <Toaster position="top-right"></Toaster>
    </div>
  );
};

export default Blogs;
