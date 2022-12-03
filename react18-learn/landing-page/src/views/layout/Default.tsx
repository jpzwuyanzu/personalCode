import { Outlet } from "react-router-dom";
import styles from "@/views/layout/Default.module.scss";
export default function DefaultLayout() {
  return (
    <div className={styles.layoutConatiner}>
      <Outlet />
    </div>
  );
}
