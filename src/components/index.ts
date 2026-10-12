/*
 * @Author: shiyuan
 * @Date: 2024-07-12 13:19:52
 * @LastEditors: shiyuan
 * @LastEditTime: 2026-10-12 10:00:00
 * @Description: 组件库统一出口
 */
export { default as Counter } from './Counter';
export type { CounterProps, CounterHandle } from './Counter';

export { default as VirtualizedScroll } from './VirtualizedScroll';
export type { VirtualizedScrollProps } from './VirtualizedScroll';

export { default as Calendar } from './Calendar';
export type { CalendarProps } from './Calendar';

export { default as Editor } from './Editor';

export interface EditorProps {
  /** 富文本内容变化回调 */
  onChange?: (content: string) => void;
  /** 初始 HTML 内容 */
  content?: string;
}
