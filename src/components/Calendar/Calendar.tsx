import React from 'react';
import moment from 'moment';
import style from './Calendar.module.css';
import { CalendarHeader } from '../CalendarHeader/CalendarHeader';
import { CalendarOptions } from '../CalendarOptions/CalendarOptions';
import { CalendarGrid } from '../CalendarGrid/CalendarGrid';

const Calendar = () => {

  moment.updateLocale('en', {week: {dow: 1}});
  const startDay = moment().startOf('month').startOf('week');
  
  return (
    <div className={style.calendar}>
      <CalendarHeader />
      <CalendarOptions />
      <CalendarGrid startDay={startDay} />      
    </div>
  );
};

export default Calendar;
