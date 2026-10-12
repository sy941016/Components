/*
 * @Author: shiyuan
 * @Date: 2024-07-26 09:48:49
 * @LastEditors: shiyuan
 * @LastEditTime: 2026-10-12 10:00:00
 * @Description: 组件库总览页
 */
import { Card, Col, Row, Tag, Typography } from 'antd';
import { history } from 'umi';

const { Title, Paragraph } = Typography;

const componentList = [
  {
    name: 'Calendar',
    title: '日历',
    desc: '支持月份切换、今日标识与可选范围限制的月历组件。',
    path: '/components/calendar',
  },
  {
    name: 'Counter',
    title: '倒计时',
    desc: '基于 setTimeout 的倒计时组件，支持步长、间隔与结束回调，可通过 ref 控制。',
    path: '/components/counter',
  },
  {
    name: 'Editor',
    title: '富文本编辑器',
    desc: '基于 CKEditor 4 的富文本编辑器，支持自定义工具栏与图片上传。',
    path: '/components/editor',
  },
  {
    name: 'VirtualizedScroll',
    title: '虚拟滚动列表',
    desc: '基于 react-window 的长列表虚拟滚动，支持头部/尾部占位与触底回调。',
    path: '/components/virtualized-scroll',
  },
];

const Home = () => {
  return (
    <div className="home-page">
      <Title level={2}>my-components</Title>
      <Paragraph type="secondary">
        一个基于 React + TypeScript 的业务组件库，包含日历、倒计时、富文本编辑器与虚拟滚动列表等常用组件，
        并提供完整的使用文档与场景示例。
      </Paragraph>

      <Title level={3}>快速上手</Title>
      <pre className="doc-code">
        {`import { Calendar, Counter, Editor, VirtualizedScroll } from 'my-components';`}
      </pre>

      <Title level={3}>组件</Title>
      <Row gutter={[16, 16]}>
        {componentList.map((item) => (
          <Col key={item.name} span={12}>
            <Card
              hoverable
              title={
                <span>
                  {item.title} <Tag color="blue">{item.name}</Tag>
                </span>
              }
              onClick={() => history.push(item.path)}
            >
              {item.desc}
            </Card>
          </Col>
        ))}
      </Row>

      <Title level={3} style={{ marginTop: 32 }}>
        场景示例
      </Title>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card
            hoverable
            title="VerifyCode 验证码"
            onClick={() => history.push('/examples/verify-code')}
          >
            结合 Counter 倒计时组件实现的 4 位短信验证码输入场景。
          </Card>
        </Col>
        <Col span={12}>
          <Card
            hoverable
            title="InfiniteScroll 无限滚动"
            onClick={() => history.push('/examples/infinite-scroll')}
          >
            手写实现的可视区域裁剪长列表滚动示例。
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
