import {
  getBeginOfMonth,
  getDaysInMonth,
  getfirstOfNextMonth,
} from "../../shared/date";
import "./DateView.scss";
import { CheckTheDate } from "../CheckTheDate/CheckTheDate";

const DateView = ({
  currentMonth,
  currentYear,
  data,
  chosenDay,
  setChosenDay,
}) => {
  // currentMonth 11 + 1 = 12 (2017.11) => get 12月

  const startDayOfWeek = getBeginOfMonth(currentYear, currentMonth);
  const numberOfDaysInMonth = getDaysInMonth(currentYear, currentMonth);
  const leftDays =
    (7 - Number(getfirstOfNextMonth(currentYear, currentMonth))) % 7;

  return (
    <div className="displayDate">
      {/* 填補前面的空格 */}
      {Array.from({ length: startDayOfWeek }).map((_, index) => {
        return <div key={index} className="empty"></div>;
      })}
      <CheckTheDate
        numberOfDaysInMonth={numberOfDaysInMonth}
        currentYear={currentYear}
        currentMonth={currentMonth}
        data={data}
        chosenDay={chosenDay}
        setChosenDay={setChosenDay}
      />
      {/* 填補後面的空格 */}
      {Array.from({ length: leftDays }).map((_, index) => {
        return <div key={index} className="empty"></div>;
      })}
    </div>
  );
};

export default DateView;
