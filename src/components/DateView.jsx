import { useState } from "react";
import {
  getBeginOfMonth,
  getDaysInMonth,
  getfirstOfNextMonth,
} from "../shared/date";
import { processedData } from "../data/data";
import "./DateView.scss";

const DateView = ({ currentMonth, currentYear }) => {
  // currentMonth 11 + 1 = 12 (2017.11) => get 12月
  const [chosenDay, setChosenDay] = useState();
  const startDayOfWeek = getBeginOfMonth(currentYear, currentMonth);
  const daysOfMonth = getDaysInMonth(currentYear, currentMonth);
  const leftDays =
    (7 - Number(getfirstOfNextMonth(currentYear, currentMonth))) % 7;

  function CheckTheDate() {
    return Array.from({ length: daysOfMonth }).map((_, index) => {
      const date = index + 1;
      // 待重構將Fn 放在 date.js 處理，引用該 fn
      const day = new Date(currentYear, currentMonth, date);
      const month = String(currentMonth + 1).padStart(2, "0");
      const daysOfMonth = String(day.getDate()).padStart(2, "0");
      const composedDate = `${String(currentYear)}-${month}-${daysOfMonth}`;

      let matchingEvents;
      if (processedData[composedDate]) {
        matchingEvents = [];
        matchingEvents.push(processedData[composedDate]);
      }
      matchingEvents = matchingEvents ? matchingEvents[0] : "";
      const newFormatPrice = String(matchingEvents.price).replace(
        /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
        ","
      );
      const statusOptions = {
        reserved: "預定",
        unAvailable: "額滿",
        closed: "截止",
        openForSignup: "報名",
        candidacy: "後補",

        // contact: "請洽專員",
      };
      let statusStyle;
      switch (matchingEvents?.status) {
        case statusOptions.reserved:
          statusStyle = "orange";
          break;
        case statusOptions.unAvailable:
          statusStyle = "lightgrey";
          break;
        case statusOptions.closed:
          statusStyle = "lightgrey";
          break;
        case statusOptions.openForSignup:
          statusStyle = "orange";
          break;
        case statusOptions.candidacy:
          statusStyle = "teal";
          break;
        default:
          statusStyle = "blue";
          break;
      }

      return (
        <div key={date} className="date">
          <div className="day">
            <div>{date}</div>
            {matchingEvents?.guaranteed && <div className="group">成團</div>}
          </div>

          {matchingEvents && (
            <div className="event">
              <p className={`status ${statusStyle} `}>
                {matchingEvents.status}
              </p>
              <p className="availableVacancy">
                可賣:{matchingEvents.available}
              </p>
              <p className="totalVacancy">席次:{matchingEvents.total}</p>
              <p className="price">${newFormatPrice}</p>
            </div>
          )}
        </div>
      );
    });
  }

  return (
    <div className="displayDate">
      {/* 填補前面的空格 */}
      {Array.from({ length: startDayOfWeek }).map((_, index) => {
        return <div key={index} className="empty"></div>;
      })}
      <CheckTheDate />
      {/* 填補後面的空格 */}
      {Array.from({ length: leftDays }).map((_, index) => {
        return <div key={index} className="empty"></div>;
      })}
    </div>
  );
};

export default DateView;
