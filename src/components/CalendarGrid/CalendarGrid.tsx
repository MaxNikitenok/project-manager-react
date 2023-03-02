import moment, { Moment } from 'moment';
import React from 'react';
import style from './CalendarGrid.module.css';

export const CalendarGrid = (props: { startDay: { clone: () => any }; today: Moment}) => {
  const totalDays = 42;
  const day = props.startDay.clone().subtract(1, 'day');
  const daysArray = [...Array(totalDays)].map(() => day.add(1, 'day').clone());

  return (
    <>
      <div className={style.weekDaysWrapper}>
        {[...Array(7)].map((_, i) => (
          <div
            className={style.weekDay}
            key={moment()
              .day(i + 1)
              .format('ddddd')}
          >
            <div className={style.dayWrapper}>
              {moment()
                .day(i + 1)
                .format('ddd')}
            </div>
          </div>
        ))}
      </div>

      <div className={style.gridWrapper}>
        {daysArray.map((dayItem) => (
          <div
            className={
              props.today.isSame(dayItem, 'month')
                ? dayItem.day() === 6 || dayItem.day() === 0
                  ? style.weekendCellWrapper
                  : style.cellWrapper
                : dayItem.day() === 6 || dayItem.day() === 0
                ? style.weekendCellNotCurrentMonth
                : style.cellNotCurrentMonth
            }
            key={dayItem.unix()}
          >
            <div className={style.rowInCell}>
              <div
                className={
                  moment().isSame(dayItem, 'day')
                    ? style.currentDay
                    : style.dayWrapper
                }
              >
                {dayItem.format('D')}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
