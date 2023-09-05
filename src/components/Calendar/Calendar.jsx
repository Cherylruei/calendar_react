import { useState } from "react";
import DateView from "../DateView/DateView";
import "./Calendar.scss";
import { processedData } from "../../data/data";
import { MonthsDisplay } from "../MonthDispay/MonthDisplay";

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

  const setNextMonth = () => {
    const currentPosition = displayMonth.findIndex(
      (item) => item.month === currentMonth
    );

    if (currentPosition > 1) {
      const updatedMonths = displayMonth.map((item) => ({
        year: item.year + Math.floor((item.month + 1) / 12),
        month: (item.month + 1) % 12,
      }));

      const lastIndex = updatedMonths.length - 1;
      setDisplayMonth(updatedMonths);
      setCurrentMonth(updatedMonths[lastIndex].month);
      setCurrentYear(updatedMonths[lastIndex].year);
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

  return (
    <div className="calendar">
      <div className="monthPicker">
        <div onClick={setPreviousMonth} className="buttonWrap">
          <div className="previous"></div>
        </div>

        <div className="months">
          <MonthsDisplay
            displayMonth={displayMonth}
            data={processedData}
            currentMonth={currentMonth}
            setCurrentMonth={setCurrentMonth}
            setCurrentYear={setCurrentYear}
            setChosenDay={setChosenDay}
          />
        </div>
        <div onClick={setNextMonth} className="buttonWrap">
          <div className="next"></div>
        </div>
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
