import { useState } from "react";
import DateView from "../DateView/DateView";
import "./Calendar.scss";
import { processedData } from "../../data/data";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(9);
  const [currentYear, setCurrentYear] = useState(2017);
  const [displayMonth, setDisplayMonth] = useState([
    { year: 2017, month: 9 },
    { year: 2017, month: 10 },
    { year: 2017, month: 11 },
  ]);
  const [chosenDay, setChosenDay] = useState(null);

  const daysOfWeek = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
  ];

  const handleShowMonth = (month, year) => {
    setCurrentMonth(month);
    setCurrentYear(year);
    setChosenDay(null);
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
    setChosenDay(null);
  };

  const setPreviousMonth = () => {
    const currentPosition = displayMonth.findIndex(
      (item) => item.month === currentMonth
    );
    const updatedMonths = displayMonth.map((item) => ({
      year: item.year + Math.floor((item.month - 1) / 12),
      month: (item.month - 1) % 12 === -1 ? 11 : (item.month - 1) % 12,
    }));
    if (currentPosition === 0) {
      setDisplayMonth(updatedMonths);
      setCurrentMonth(updatedMonths[0].month);
      setCurrentYear(updatedMonths[0].year);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setChosenDay(null);
  };

  function MonthsDisplay() {
    return displayMonth.map((item) => {
      const hasGroup = hasDataForMonth(processedData, item.year, item.month);
      return (
        <div
          className={`shownMonth ${
            currentMonth === item.month ? "selected" : ""
          }`}
          key={item.month}
          onClick={() => handleShowMonth(item.month, item.year)}
        >
          <div className="yearAndMonth">
            <p>{item.year}</p>
            {/* 讓 item.month 的數字只存在於 0-11 */}
            <p>{(item.month + 1) % 12 === 0 ? 12 : (item.month + 1) % 12}月</p>
          </div>
          {!hasGroup && <div className="noGroup">無出發日</div>}
        </div>
      );
    });
  }

  function hasDataForMonth(dataObject, year, month) {
    const targetPrefix = `${year}/${String(month + 1).padStart(2, "0")}`;
    for (const key in dataObject) {
      if (key.startsWith(targetPrefix)) {
        return true;
      }
    }
    return false;
  }

  return (
    <div className="calendar">
      <div className="monthPicker">
        <div className="previous" onClick={setPreviousMonth}></div>
        <div className="months">
          <MonthsDisplay />
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
        <DateView
          currentMonth={currentMonth}
          currentYear={currentYear}
          data={processedData}
          chosenDay={chosenDay}
          setChosenDay={setChosenDay}
        />
      </div>
    </div>
  );
};

export default Calendar;
