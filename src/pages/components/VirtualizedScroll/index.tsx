/*
 * @Author: shiyuan
 * @Date: 2026-10-12 10:00:00
 * @Description: VirtualizedScroll 虚拟滚动列表组件文档页
 */
import { useState } from 'react';
import { message } from 'antd';
import { VirtualizedScroll } from '@/components';
import { ApiTable, DemoCard, DocPage } from '../common';
import './index.less';

const apiData = [
  {
    key: '1',
    name: 'height',
    description: '列表可视区域高度',
    type: 'number',
    defaultValue: '-',
  },
  {
    key: '2',
    name: 'headerHeight',
    description: '头部占位高度',
    type: 'number',
    defaultValue: '-',
  },
  {
    key: '3',
    name: 'itemHeight',
    description: '单个列表项高度',
    type: 'number',
    defaultValue: '-',
  },
  {
    key: '4',
    name: 'list',
    description: '列表数据',
    type: 'T[]',
    defaultValue: '-',
  },
  {
    key: '5',
    name: 'renderHeader',
    description: '头部渲染函数',
    type: '(style) => ReactNode',
    defaultValue: '-',
  },
  {
    key: '6',
    name: 'renderFooter',
    description: '尾部渲染函数',
    type: '(style) => ReactNode',
    defaultValue: '-',
  },
  {
    key: '7',
    name: 'renderItem',
    description: '列表项渲染函数',
    type: '(item, style) => ReactNode',
    defaultValue: '-',
  },
  {
    key: '8',
    name: 'onRendered',
    description: '滚动到底部时触发',
    type: '() => void',
    defaultValue: '-',
  },
  {
    key: '9',
    name: 'onScroll',
    description: '列表滚动回调',
    type: '(props) => void',
    defaultValue: '-',
  },
];

const VirtualizedScrollDoc = () => {
  const [list] = useState(() =>
    new Array(200).fill(0).map((_, index) => ({ id: index, name: `item-${index}` })),
  );

  return (
    <DocPage
      title="VirtualizedScroll 虚拟滚动列表"
      description="基于 react-window 的长列表虚拟滚动组件，支持头部/尾部占位与触底回调，适合渲染大数据量列表。"
    >
      <DemoCard title="基础用法" description="渲染 200 条数据，滚动到底部触发回调">
        <div className="vs-demo">
          <VirtualizedScroll
            height={480}
            headerHeight={48}
            itemHeight={56}
            list={list}
            renderHeader={(style) => (
              <div style={style} className="vs-header">
                头部占位（高度 48）
              </div>
            )}
            renderFooter={(style) => (
              <div style={style} className="vs-footer">
                尾部占位（触底提示）
              </div>
            )}
            renderItem={(item, style) => (
              <div style={style} className="vs-item">
                {item.name}
              </div>
            )}
            onRendered={() => message.info('已滚动到底部')}
          />
        </div>
      </DemoCard>

      <ApiTable data={apiData} />
    </DocPage>
  );
};

export default VirtualizedScrollDoc;
