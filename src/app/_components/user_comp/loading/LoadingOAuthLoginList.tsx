import { getIcon } from '@/app/_helper-functions/clientHelperFunctions';

import styles from './LoadingOAuthLoginList.module.css';
import { DUMMY_PROVIDERS } from '@/app/_config/dummyProvidersListConfig';

const LoadingOAuthLoginList: React.FC = () => {
  const output = Object.values(DUMMY_PROVIDERS).map(provider => {
    if (!provider || provider.id === 'credentials') return null;
    const icon = getIcon(provider.name);
    return (
      <div key={provider.name} className={styles.oAuthContainer}>
        <button disabled={true}>
          <span className={styles.icon}>{icon}</span>
          <span className={styles.btnText}>Loading...</span>
        </button>
      </div>
    );
  });

  return <>{output}</>;
};

export default LoadingOAuthLoginList;
