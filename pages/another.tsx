import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import AnotherPage from "../src/components/AnotherPage";

const Another: NextPage = () => {
  return (
    <div className={styles.container}>
      <AnotherPage />
    </div>
  );
};

export default Another;
