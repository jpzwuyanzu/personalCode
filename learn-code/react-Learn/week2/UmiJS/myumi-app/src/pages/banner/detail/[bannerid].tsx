import React from 'react';
import styles from './index.less';

export default function Page({ match: { params: { bannerid } } }: any) {

  console.log(bannerid)
  return (
    <div>
      <h1 className={styles.title}>Page banner/detail/index-- { bannerid }</h1>
    </div>
  );
}
