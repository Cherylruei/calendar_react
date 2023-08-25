import React from "react";
import {
  getBeginOfMonth,
  getDaysInMonth,
  getfirstOfNextMonth,
} from "../shared/date";

const DateView = ({ currentMonth, currentYear }) => {
  // currentMonth 11 + 1 = 12 (2017.11) => get 12月
  const startDayOfWeek = getBeginOfMonth(currentYear, currentMonth);
  const daysOfMonth = getDaysInMonth(currentYear, currentMonth);
  const leftDays =
    (7 - Number(getfirstOfNextMonth(currentYear, currentMonth))) % 7;

  return (
    <div className="displayDate">
      {/* 填補前面的空格 */}
      {Array.from({ length: startDayOfWeek }).map((_, index) => {
        return <div key={index} className="empty"></div>;
      })}
      {Array.from({ length: daysOfMonth }).map((_, index) => {
        const date = index + 1;
        return (
          <div key={date} className="date">
            {date}
          </div>
        );
      })}
      {/* 填補後面的空格 */}
      {Array.from({ length: leftDays }).map((_, index) => {
        return <div key={index} className="empty"></div>;
      })}
    </div>
  );
};

export default DateView;
