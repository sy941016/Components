/*
 * @Author: shiyuan
 * @Date: 2024-07-12 13:18:02
 * @LastEditors: shiyuan
 * @LastEditTime: 2026-10-12 10:00:00
 * @Description: 组件库文档站布局（antd 官网风格：顶部导航 + 左侧菜单 + 右侧内容）
 */
import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { Outlet, history, useLocation } from 'umi';
import 'antd/dist/antd.css';
import './index.less';

const { Header, Sider, Content } = Layout;

const menuItems: MenuProps['items'] = [
  {
    key: 'components',
    label: '组件',
    type: 'group',
    children: [
      { key: '/components/calendar', label: 'Calendar 日历' },
      { key: '/components/counter', label: 'Counter 倒计时' },
      { key: '/components/editor', label: 'Editor 富文本编辑器' },
      { key: '/components/virtualized-scroll', label: 'VirtualizedScroll 虚拟滚动列表' },
    ],
  },
  {
    key: 'examples',
    label: '场景示例',
    type: 'group',
    children: [
      { key: '/examples/verify-code', label: 'VerifyCode 验证码' },
      { key: '/examples/infinite-scroll', label: 'InfiniteScroll 无限滚动' },
    ],
  },
];

export default function DocLayout() {
  const location = useLocation();

  return (
    <Layout className="doc-layout">
      <Header className="doc-header">
        <div className="doc-header-inner" onClick={() => history.push('/')}>
          <span className="doc-logo">M</span>
          <span className="doc-name">my-components</span>
        </div>
      </Header>
      <Layout>
        <Sider className="doc-sider" width={240}>
          <Menu
            mode="inline"
            items={menuItems}
            selectedKeys={[location.pathname]}
            onClick={({ key }) => history.push(key)}
          />
        </Sider>
        <Content className="doc-content">
          <div className="doc-content-inner">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
