/*
 * @Author: shiyuan
 * @Date: 2026-10-12 10:00:00
 * @Description: 组件文档页公共结构（标题 / 演示卡片 / API 表格）
 */
import type { ReactNode } from 'react';
import { Card, Table, Typography } from 'antd';
import './common.less';

const { Title, Paragraph } = Typography;

interface DocPageProps {
  title: string;
  description?: string;
  children?: ReactNode;
}

export const DocPage = ({ title, description, children }: DocPageProps) => (
  <div className="doc-page">
    <Title level={2}>{title}</Title>
    {description && <Paragraph type="secondary">{description}</Paragraph>}
    {children}
  </div>
);

interface DemoCardProps {
  title: string;
  description?: string;
  children?: ReactNode;
}

export const DemoCard = ({ title, description, children }: DemoCardProps) => (
  <Card className="demo-card" title={title} extra={description}>
    <div className="demo-card-body">{children}</div>
  </Card>
);

export interface ApiRow {
  key: string;
  name: string;
  description: string;
  type: string;
  defaultValue: string;
}

export const ApiTable = ({ data }: { data: ApiRow[] }) => (
  <div className="api-table">
    <Title level={3}>API</Title>
    <Table
      columns={[
        {
          title: '属性',
          dataIndex: 'name',
          width: 200,
          render: (value: string) => <code>{value}</code>,
        },
        { title: '说明', dataIndex: 'description' },
        {
          title: '类型',
          dataIndex: 'type',
          width: 280,
          render: (value: string) => <code>{value}</code>,
        },
        {
          title: '默认值',
          dataIndex: 'defaultValue',
          width: 140,
          render: (value: string) => <code>{value}</code>,
        },
      ]}
      dataSource={data}
      pagination={false}
    />
  </div>
);
