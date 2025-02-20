import { navigate } from "wouter/use-browser-location";

import styles from "./styles.module.css";
const { pageContainer } = styles;

type PageByTopicProps = {
  icon: string;
  pageName: string;
};

const PageByTopic = ({ icon, pageName }: PageByTopicProps) => {
  return (
    <article
      className={pageContainer}
      onClick={() => navigate(pageName.toLowerCase())}
    >
      <i className={`${icon}`}></i>
      <p style={{ fontWeight: "bold" }}>{pageName}</p>
    </article>
  );
};

export default PageByTopic;
