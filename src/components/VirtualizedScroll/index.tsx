/*
 * @Author: shiyuan
 * @Date: 2024-07-12 13:19:52
 * @LastEditors: shiyuan
 * @LastEditTime: 2024-07-19 11:09:03
 * @Description: 
 */
import { useCallback, useRef } from 'react';
import { VariableSizeList as List } from 'react-window';

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
}: any) => {
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
      onRendered();
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
