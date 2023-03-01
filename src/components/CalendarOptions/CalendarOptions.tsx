import React from 'react';
import style from './CalendarOptions.module.css';
import { RxChevronLeft, RxChevronRight } from 'react-icons/rx';

export const CalendarOptions = (props: { today: { format: (arg0: string) => string | number; }; prevHandler: () => void; todayHandler: () => void; nextHandler: () => void; }) => (
  <div className={style.calendarOptions}>
    <div>
      <span className={style.month}>{props.today.format('MMMM')}</span>
      <span className={style.year}>{props.today.format('YYYY')}</span>
    </div>
    <div className={style.buttonWrapper}>
      <button className={style.navButton} onClick={()=>props.prevHandler()}><RxChevronLeft/></button>
      <button className={style.navButton} onClick={()=>props.todayHandler()}>Today</button>
      <button className={style.navButton} onClick={()=>props.nextHandler()}><RxChevronRight/></button>
    </div>
  </div>
);
