import useRemoveDocument from "@hooks/useRemoveDocument";
import { useQueryClient } from "@tanstack/react-query";
import { Topic } from "src/customTypes";

import notify from "@utils/notify";
import { handleApiError } from "@utils/handleApiError";

import styles from "./styles.module.css";
import { Button } from "@mantine/core";
const { topicCard, topicTitle, wrapper } = styles;

type TopicCardProps = {
  topic: Topic;
};

const TopicCard = ({ topic }: TopicCardProps) => {
  const { isFetching, refetch } = useRemoveDocument("topics", topic._id);

  const queryClient = useQueryClient();

  const handleRemoveTopic = () => {
    refetch({ throwOnError: true })
      .then(() => queryClient.refetchQueries({ queryKey: ["topics"] }))
      .catch((err) => notify(handleApiError(err), "error"));
  };

  return (
    <div className={wrapper}>
      <div className={topicCard}>
        <p className={topicTitle}>{topic.title}</p>
      </div>
      <div>
        <Button
          color="red"
          loading={isFetching ? true : false}
          loaderProps={{ type: "dots" }}
          onClick={handleRemoveTopic}
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

export default TopicCard;
