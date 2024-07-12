import { useState, useRef, useEffect, Key } from 'react';
import cls from 'classnames';
import dayjs, { ManipulateType } from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek.js';
import isBetween from 'dayjs/plugin/isBetween.js';
import Left from './images/left.png';
import Right from './images/right.png';
import './index.less';

dayjs.extend(isoWeek);
dayjs.extend(isBetween);

interface Props {
  handelClickDay: (date: any) => void;
  initValue: string;
  minDate?: string;
  maxDate?: string;
}

const HEAD = ['一', '二', '三', '四', '五', '六', '日'];
const Actions = {
  NEXT: 'NEXT',
  PREV: 'PREV',
};
const TimeUnit: Record<string, ManipulateType> = {
  MONTH: 'month',
  DAY: 'day',
};

const MonthView = (props: Props) => {
  const currentTime = dayjs().format('YYYY-MM-DD');
  const {
    handelClickDay,
    initValue,
    minDate = '1970-01-01',
    maxDate = '3000-12-31',
  } = props;
  const calendarRef = useRef(null);
  const [startDay, setStartDay] = useState<any>(dayjs());
  const [monthDate, setMonthDate] = useState<any>();
  const [hiddenDays, setHiddenDays] = useState<any>();
  const handleMonthToggle = (type: string) => {
    if (type === Actions.NEXT) {
      setStartDay(dayjs(startDay).add(1, TimeUnit.MONTH));
    } else {
      setStartDay(dayjs(startDay).subtract(1, TimeUnit.MONTH));
    }
  };

  const isDisabled = (time: string | number | dayjs.Dayjs | Date | null | undefined) =>
    !dayjs(time).isBetween(minDate, maxDate, 'day', '[]');

  const handelClick = (time: string | number | dayjs.Dayjs | Date | null | undefined) => {
    if (isDisabled(time)) return;
    handelClickDay(time);
  };

  const getMonthDate = () => {
    const currentStart = startDay.startOf(TimeUnit.MONTH);
    const startDayWeek = currentStart.isoWeekday();
    const daysNum = dayjs(currentStart).daysInMonth();
    const monthDate = Array(daysNum)
      .fill(null)
      .map((item, index) => {
        const date = index + 1;
        const formatDate = date < 10 ? `0${date}` : date;
        return {
          time: `${dayjs(startDay).format('YYYY-MM')}-${formatDate}`,
          date,
        };
      });
    setMonthDate(monthDate);
    setHiddenDays(Array(startDayWeek - 1).fill(null));
  };

  const renderMonth = (date: number) => (
    <div className="month">
      {date === 1 && `${dayjs(startDay).month() + 1}月`}
    </div>
  );

  useEffect(() => {
    getMonthDate();
  }, []);

  useEffect(() => {
    getMonthDate();
  }, [startDay]);

  return (
    <div className="calendar">
      <div className="calendar-operate">
        <div className="calendar-operate-content">
          <div
            className="icon left-icon"
            onClick={() => handleMonthToggle(Actions.PREV)}
          >
            <img src={Left} alt="" />
          </div>
          <div className="calendar-time">
            {dayjs(startDay).format('YYYY-MM')}
          </div>
          <div className="icon" onClick={() => handleMonthToggle(Actions.NEXT)}>
            <img src={Right} alt="" />
          </div>
        </div>
      </div>
      <div className="calendar-head">
        {HEAD.map((i, index) => (
          <div className="head-cell" key={index}>
            {i}
          </div>
        ))}
      </div>

      <div className="calendar-body" ref={calendarRef}>
        <>
          {hiddenDays &&
            hiddenDays.map((item: any, index: Key | null | undefined) => (
              <div className="calendar-body-item" key={index} />
            ))}
          {monthDate &&
            monthDate.map((item: { [x: string]: any; time: any; date: any; }) => {
             const { time, date } = item;
             return  <div
                className="calendar-body-item"
                key={time}
                onClick={() => handelClick(time)}
              >
                <div
                  className={cls('calendar-item-content', {
                    'calendar-body-today': time === initValue,
                    'calendar-disabled': isDisabled(time),
                  })}
                >
                  {renderMonth(date)}
                  {time === currentTime ? '今' : date}
                </div>
              </div>
            })}
        </>
      </div>
    </div>
  );
};

export default MonthView;
