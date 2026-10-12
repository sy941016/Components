/*
 * @Author: shiyuan
 * @Date: 2024-07-12 13:19:52
 * @LastEditors: shiyuan
 * @LastEditTime: 2026-10-12 10:00:00
 * @Description: 基于 react-window 的可变高度虚拟滚动列表
 */
import { useCallback, useRef } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { VariableSizeList as List } from 'react-window';

export interface VirtualizedScrollProps<T = any> {
  /** 列表可视区域高度 */
  height: number;
  /** 头部占位高度 */
  headerHeight: number;
  /** 列表项高度 */
  itemHeight: number;
  /** 列表数据 */
  list: T[];
  /** 滚动到底部时触发 */
  onRendered?: () => void;
  /** 头部渲染函数 */
  renderHeader: (style: CSSProperties) => ReactNode;
  /** 尾部渲染函数 */
  renderFooter: (style: CSSProperties) => ReactNode;
  /** 列表项渲染函数 */
  renderItem: (item: T, style: CSSProperties) => ReactNode;
  /** 滚动回调 */
  onScroll?: (props: any) => void;
}

const VirtualizedScroll = ({
  height,
  headerHeight,
  itemHeight,
  list,
  onRendered,
  renderHeader,
  renderFooter,
  renderItem,
  onScroll,
}: VirtualizedScrollProps) => {
  const virtualized = useRef(null);
  // header/footer占位
  const formatList = ['renderHeader', ...list, 'renderFooter'];
  const len = formatList.length;
  const getItemSize = (index: number) => (index === 0 ? headerHeight : itemHeight);

  const Row = useCallback(
    ({ data, index, style }: any) => {
      let renderDom;
      if (index === 0) {
        renderDom = renderHeader(style);
      } else if (index === data.length - 1) {
        renderDom = renderFooter(style);
      } else {
        renderDom = renderItem(data[index], style);
      }
      return renderDom;
    },
    [list.length],
  );

  const handleRendered = (item: { visibleStopIndex: any; overscanStartIndex: any; visibleStartIndex: any; }) => {
    const { visibleStopIndex, overscanStartIndex, visibleStartIndex } = item;
    const length = len - 1;
    const dis = visibleStartIndex - overscanStartIndex;
    if (visibleStopIndex === length && dis === 2) {
      onRendered?.();
    }
  };

  return (
    <List
      width="100%"
      height={height}
      itemCount={len}
      itemSize={getItemSize}
      itemData={formatList}
      className="virtualized-scroll"
      onItemsRendered={handleRendered}
      onScroll={onScroll}
      ref={virtualized}
    >
      {Row}
    </List>
  );
};

export default VirtualizedScroll;
