/*
 * @Author: shiyuan
 * @Date: 2024-07-26 09:48:49
 * @LastEditors: shiyuan
 * @LastEditTime: 2024-07-26 09:53:47
 * @Description: 
 */
import { history } from 'umi';
import { List } from 'antd-mobile'
import { GlobalOutline } from 'antd-mobile-icons'

const Home = () => {
   return (
    <List header='组件目录'>
        <List.Item prefix={<GlobalOutline />} onClick={() => history.push('/code')}>
            VerifyCode
        </List.Item>
        <List.Item prefix={<GlobalOutline />} onClick={() => history.push('/scroll')}>
            InfiniteScroll
        </List.Item>
    </List>
   )
}

export default Home