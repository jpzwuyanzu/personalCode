import React, { useEffect } from 'react';
import styles from './index.less';
import { history } from 'umi'

export default function Page() {

  useEffect(() => {
    //在这里请求数据
  }, []);

  return (
    <div>
      <h1 className={styles.title}>Page banner/index</h1>
      <button onClick={ () => {
        history.push('/banner/detail/123')
      } }>去轮播图详情</button>
    </div>
  );
}
