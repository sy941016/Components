import React, {
  useEffect,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';

interface CounterProps {
  start?: number; // 开始
  end?: number; // 结束
  step?: number; // 每次走几个
  deration?: number; // 每次间隔时间
  handleFinal?: () => void; // 结束时回调
}

type Counter = React.FC<Partial<CounterProps>>;

const noop = () => undefined;

const Counter: Counter = forwardRef((props, ref) => {
  const {
    start = 60,
    end = 0,
    step = 1,
    deration = 1000,
    handleFinal = noop,
  } = props || {};
  const [count, setCount] = useState(start);
  const timer = useRef<NodeJS.Timeout | null>(null);

  useImperativeHandle(ref, () => ({
    restart: (newStart?: number) => {
      clearTimeout(timer.current as any);
      setCount(newStart || start);
    },
    isEnd: () => count <= end,
  }));

  useEffect(() => {
    if (count <= end) {
      handleFinal();
      clearTimeout(timer.current as any);
      return;
    }
    timer.current = setTimeout(() => setCount(count - step), deration);
  }, [count]);

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current as any);
        timer.current = null;
      }
    };
  }, []);

  return <span>{`${count}s`}</span>;
});

export default Counter;
