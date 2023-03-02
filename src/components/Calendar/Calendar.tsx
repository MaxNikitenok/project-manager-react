import React from 'react';
import moment from 'moment';
import style from './Calendar.module.css';
import { CalendarHeader } from '../CalendarHeader/CalendarHeader';
import { CalendarOptions } from '../CalendarOptions/CalendarOptions';
import { CalendarGrid } from '../CalendarGrid/CalendarGrid';
import { useState } from 'react';

const Calendar = () => {

  moment.updateLocale('en', {week: {dow: 1}});
  const [today, setToday] = useState(moment());
  const startDay = today.clone().startOf('month').startOf('week');

  const prevHandler = () => setToday(prev => prev.clone().subtract(1, 'month'));
  const todayHandler = () => setToday(moment());
  const nextHandler = () => setToday(prev => prev.clone().add(1, 'month'));
  
  return (
    <div className={style.calendar}>
      <CalendarHeader />
      <CalendarOptions today={today} prevHandler={prevHandler} todayHandler={todayHandler} nextHandler={nextHandler} />
      <CalendarGrid startDay={startDay} today={today}/>      
    </div>
  );
};

export default Calendar;
