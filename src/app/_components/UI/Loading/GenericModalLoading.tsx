import styles from './GenericModalLoading.module.css';

const GenericModalLoading: React.FC = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loaderIcon} />
    </div>
  );
};

export default GenericModalLoading;
