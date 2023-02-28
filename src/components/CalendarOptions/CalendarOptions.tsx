import React from 'react';
import style from './CalendarOptions.module.css';
import { RxChevronLeft, RxChevronRight } from 'react-icons/rx';

export const CalendarOptions = (props: { today: { format: (arg0: string) => string | number; }; }) => (
  <div className={style.calendarOptions}>
    <div>
      <span className={style.month}>{props.today.format('MMMM')}</span>
      <span className={style.year}>{props.today.format('YYYY')}</span>
    </div>
    <div className={style.buttonWrapper}>
      <button className={style.navButton}><RxChevronLeft/></button>
      <button className={style.navButton}>Today</button>
      <button className={style.navButton}><RxChevronRight/></button>
    </div>
  </div>
);
