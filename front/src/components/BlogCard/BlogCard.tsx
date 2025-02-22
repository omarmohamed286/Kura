import useRemoveDocument from "@hooks/useRemoveDocument";
import { useQueryClient } from "@tanstack/react-query";
import { Blog } from "src/customTypes";

import notify from "@utils/notify";
import { handleApiError } from "@utils/handleApiError";

import styles from "./styles.module.css";
import { Button } from "@mantine/core";
const { blogCard, blogTitle, wrapper } = styles;

type BlogCardProps = {
  blog: Blog;
};

const BlogCard = ({ blog }: BlogCardProps) => {
  const { isFetching, refetch } = useRemoveDocument("blogs", blog._id);

  const queryClient = useQueryClient();

  const handleRemoveBlog = () => {
    refetch({ throwOnError: true })
      .then(() => queryClient.refetchQueries({ queryKey: ["blogs"] }))
      .catch((err) => notify(handleApiError(err), "error"));
  };

  return (
    <div className={wrapper}>
      <div className={blogCard}>
        <p className={blogTitle}>{blog.title}</p>
        <p>{blog.description}</p>
        <a href={blog.url} target="_blank">
          Go To Blog
        </a>
      </div>
      <div>
        <Button
          color="red"
          loading={isFetching ? true : false}
          loaderProps={{ type: "dots" }}
          onClick={handleRemoveBlog}
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

export default BlogCard;
