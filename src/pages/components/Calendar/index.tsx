/*
 * @Author: shiyuan
 * @Date: 2026-10-12 10:00:00
 * @Description: Calendar 日历组件文档页
 */
import { useState } from 'react';
import { message } from 'antd';
import dayjs from 'dayjs';
import { Calendar } from '@/components';
import { ApiTable, DemoCard, DocPage } from '../common';

const apiData = [
  {
    key: '1',
    name: 'handelClickDay',
    description: '点击日期时的回调',
    type: '(date: any) => void',
    defaultValue: '-',
  },
  {
    key: '2',
    name: 'initValue',
    description: '初始选中日期（高亮显示）',
    type: 'string',
    defaultValue: '-',
  },
  {
    key: '3',
    name: 'minDate',
    description: '最小可选日期，早于该日期的日期将被禁用',
    type: 'string',
    defaultValue: '1970-01-01',
  },
  {
    key: '4',
    name: 'maxDate',
    description: '最大可选日期，晚于该日期的日期将被禁用',
    type: 'string',
    defaultValue: '3000-12-31',
  },
];

const CalendarDoc = () => {
  const today = dayjs().format('YYYY-MM-DD');
  const [selected, setSelected] = useState(today);

  return (
    <DocPage
      title="Calendar 日历"
      description="支持月份切换、今日标识与可选范围限制的月历组件。"
    >
      <DemoCard title="基础用法" description="点击日期选择">
        <div className="demo-calendar">
          <Calendar
            initValue={selected}
            handelClickDay={(date) => {
              const value = dayjs(date).format('YYYY-MM-DD');
              setSelected(value);
              message.success(`已选择：${value}`);
            }}
          />
        </div>
      </DemoCard>

      <DemoCard title="限制可选范围" description="通过 minDate / maxDate 禁用范围外的日期">
        <div className="demo-calendar">
          <Calendar
            initValue={today}
            minDate={dayjs().subtract(3, 'day').format('YYYY-MM-DD')}
            maxDate={dayjs().add(7, 'day').format('YYYY-MM-DD')}
            handelClickDay={(date) => {
              message.info(`已选择：${dayjs(date).format('YYYY-MM-DD')}`);
            }}
          />
        </div>
      </DemoCard>

      <ApiTable data={apiData} />
    </DocPage>
  );
};

export default CalendarDoc;
