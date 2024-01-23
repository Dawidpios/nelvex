import styles from "./layout.module.scss";

const Loading = () => {
  return (
    <div className={styles.loadingSkeleton}>
      <h1 className={styles.loadingHeader}>Loading...</h1>
    </div>
  );
};

export default Loading;
