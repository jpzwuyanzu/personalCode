import React from 'react';
import styles from './index.less';
import { Link } from 'umi'

export default function Page() {
  return (
    <div>
      <h1 className={styles.title}>Page banner/index</h1>
      <Link to='/banner/detail/123'>去轮播图详情页面</Link>
    </div>
  );
}
