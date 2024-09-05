import React from 'react';

import styles from './modal.module.css';

export const Layout = ({ children }: React.PropsWithChildren) => (
  <div className={styles.layoutComponent}>{children}</div>
);
