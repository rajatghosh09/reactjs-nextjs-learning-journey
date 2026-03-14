import styles from "@/app/page.module.css";

const Dashboard = () => {
  return (
    <div
      className={styles.main}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <h1 className={styles.welcome}>Welcome to Our Website</h1>
    </div>
  )
}

export default Dashboard