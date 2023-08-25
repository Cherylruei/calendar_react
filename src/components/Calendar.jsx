import { useRef, useState } from "react";
import DateView from "./DateView";
import "./Calendar.scss";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(9); // 5月
  const [currentYear, setCurrentYear] = useState(2017);
  const [displayMonth, setDisplayMonth] = useState([
    { year: 2017, month: 9 },
    { year: 2017, month: 10 },
    { year: 2017, month: 11 },
  ]);
  const newDisplayMonthsRef = useRef([]);

  const daysOfWeek = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
  ];

  const handleShowMonth = (month) => {
    setCurrentMonth(month);
  };

  const setNextMonth = () => {
    const currentPosition = displayMonth.findIndex(
      (item) => item.month === currentMonth
    );

    if (currentPosition > 1) {
      const updatedMonths = displayMonth.map((item) => ({
        year: item.year + Math.floor((item.month + 1) / 12),
        month: (item.month + 1) % 12,
      }));

      setDisplayMonth(updatedMonths);
      setCurrentMonth(updatedMonths[2].month);
      setCurrentYear(updatedMonths[2].year);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const setPreviousMonth = () => {
    const currentPosition = displayMonth.indexOf(currentMonth);
    if (currentPosition === 0) {
      const updatedMonths = displayMonth.map((month) => month - 1);
      setDisplayMonth(updatedMonths);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  function UpdatedYear() {
    const newDisplayMonths = [];
    return displayMonth.map((item) => {
      newDisplayMonths.push({
        year: item.year + Math.floor(item.month / 12),
        month: (item.month + 1) % 12,
      });
      newDisplayMonthsRef.current = newDisplayMonths;

      return (
        <div
          className={`shownMonth ${
            currentMonth === item.month ? "selected" : ""
          }`}
          key={item.month}
          onClick={() => handleShowMonth(item.month)}
        >
          <p>{item.year}</p>
          {/* 讓 item.month 的數字只存在於 0-11 */}
          <p>{(item.month + 1) % 12 === 0 ? 12 : (item.month + 1) % 12}月</p>
        </div>
      );
    });
  }

  return (
    <div className="calendar">
      <div className="monthPicker">
        <div className="previous" onClick={setPreviousMonth}></div>
        <div className="months">
          <UpdatedYear />
        </div>
        <div className="next" onClick={setNextMonth}></div>
      </div>
      <div>
        <div className="displayWeek">
          {daysOfWeek.map((item, index) => (
            <div className="week" key={index}>
              {item}
            </div>
          ))}
        </div>
        <DateView currentMonth={currentMonth} currentYear={currentYear} />
      </div>
    </div>
  );
};

export default Calendar;
