import React from 'react';
import styles from './index.less';

interface Props {
 match: {
   params?:{}
 }
}

export default function Page( props: Props ) {

  //获取路由参数
  console.log(props.match.params)

  return (
    <div>
      <h1 className={styles.title}>Page banner/detail/index</h1>
    </div>
  );
}
