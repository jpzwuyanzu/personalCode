import React from 'react';
import styles from './index.less';
interface Props {

}

export default function Page(props: Props) {

  console.log(props)

  return (
    <div>
      <h1 className={styles.title}>轮播图详情</h1>
    </div>
  );
}
