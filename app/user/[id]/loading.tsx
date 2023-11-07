import styles from "./layout.module.scss";
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

const Loading = () => {
  return (
    <div className={styles.loadingSkeleton}>
      <h1 className={styles.loadingHeader}>Loading...</h1>
    </div>
  );
};

export default Loading;
