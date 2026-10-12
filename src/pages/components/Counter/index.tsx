/*
 * @Author: shiyuan
 * @Date: 2026-10-12 10:00:00
 * @Description: Counter 倒计时组件文档页
 */
import { useRef } from 'react';
import { Button, Space, message } from 'antd';
import { Counter } from '@/components';
import type { CounterHandle } from '@/components';
import { ApiTable, DemoCard, DocPage } from '../common';

const apiData = [
  {
    key: '1',
    name: 'start',
    description: '倒计时起始数值',
    type: 'number',
    defaultValue: '60',
  },
  {
    key: '2',
    name: 'end',
    description: '倒计时结束数值',
    type: 'number',
    defaultValue: '0',
  },
  {
    key: '3',
    name: 'step',
    description: '每次递减的步长',
    type: 'number',
    defaultValue: '1',
  },
  {
    key: '4',
    name: 'deration',
    description: '每次递减的间隔时间（毫秒）',
    type: 'number',
    defaultValue: '1000',
  },
  {
    key: '5',
    name: 'handleFinal',
    description: '倒计时结束时的回调',
    type: '() => void',
    defaultValue: '-',
  },
];

const CounterDoc = () => {
  const counterRef = useRef<CounterHandle>(null);

  return (
    <DocPage
      title="Counter 倒计时"
      description="基于 setTimeout 的倒计时组件，支持步长、间隔与结束回调，可通过 ref 控制。"
    >
      <DemoCard title="基础用法" description="默认从 60 开始每秒递减">
        <Counter />
      </DemoCard>

      <DemoCard title="自定义参数" description="从 10 开始、每次减 2、间隔 500ms，结束时触发回调">
        <Counter
          start={10}
          end={0}
          step={2}
          deration={500}
          handleFinal={() => message.info('倒计时结束')}
        />
      </DemoCard>

      <DemoCard title="通过 ref 控制" description="调用 restart 重新开始、isEnd 查询是否结束">
        <Space size="large">
          <span style={{ fontSize: 20 }}>
            <Counter ref={counterRef} start={15} />
          </span>
          <Button onClick={() => counterRef.current?.restart()}>重新开始</Button>
          <Button
            onClick={() =>
              message.info(counterRef.current?.isEnd() ? '已结束' : '进行中')
            }
          >
            查询状态
          </Button>
        </Space>
      </DemoCard>

      <ApiTable data={apiData} />
    </DocPage>
  );
};

export default CounterDoc;
