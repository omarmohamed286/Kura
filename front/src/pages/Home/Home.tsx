import styles from "./styles.module.css";
const { container, mainHeading, pagesSection } = styles;
import { PageByTopic } from "@components/index";

const pages = [
  { id: 1, name: "Videos", icon: "fa-brands fa-youtube" },
  { id: 2, name: "Blogs", icon: "fa-solid fa-blog" },
  { id: 3, name: "Topics", icon: "fa-solid fa-table-list" },
];

const Home = () => {
  return (
    <div className={container}>
      <div>
        <header>
          <h1 className={mainHeading}>Kura</h1>
          <p><span>Store</span> What You Want To Study In The Future</p>
        </header>
        <section className={pagesSection}>
          {pages.map((page) => (
            <PageByTopic
            key={page.id}
              icon={page.icon}
              pageName={page.name}
            ></PageByTopic>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Home;
