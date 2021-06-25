import styles from './index.less';
import { history, Link } from 'umi'

export default function IndexPage() {
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <button onClick={ () => history.push('/user/list') }>去用户列表</button>
      <button onClick={ () => history.push('/product/list') }>去产品管理</button>
      <Link to='/banner/list'>去轮播图列表</Link>
    </div>
  );
}
