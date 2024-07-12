/*
 * @Author: shiyuan
 * @Date: 2024-07-12 13:18:02
 * @LastEditors: shiyuan
 * @LastEditTime: 2024-07-26 09:51:07
 * @Description: 
 */
import { Outlet } from 'umi';
import styles from './index.less';

export default function Layout() {
  return (
    <div className={styles.navs}>
      <Outlet />
    </div>
  );
}
