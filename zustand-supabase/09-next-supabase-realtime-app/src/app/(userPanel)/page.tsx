import styles from "../page.module.css";

const Home = () => {
  return (
    <main
      className={styles.main}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <h1 className={styles.welcome}>Welcome to Our Website</h1>
    </main>
  );
};

export default Home;