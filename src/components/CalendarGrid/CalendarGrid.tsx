import moment from 'moment';
import React from 'react';
import style from './CalendarGrid.module.css';

export const CalendarGrid = (props: { startDay: { clone: () => any } }) => {
  const totalDays = 42;
  const day = props.startDay.clone().subtract(1, 'day');
  const daysArray = [...Array(totalDays)].map(() => day.add(1, 'day').clone());

  return (
    <div className={style.gridWrapper}>
      {daysArray.map((dayItem) => (
        <div
          className={
            dayItem.day() === 6 || dayItem.day() === 0
              ? style.cellWeekEndWrapper
              : style.cellWrapper
          }
          key={dayItem.format('DDMMYYYY')}
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
  );
};
