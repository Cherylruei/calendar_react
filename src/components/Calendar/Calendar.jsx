import { useState } from "react";
import DateView from "../DateView/DateView";
import "./Calendar.scss";
import { processedData } from "../../data/data";
import { MonthsDisplay } from "../MonthDispay/MonthDisplay";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(9);
  const [currentYear, setCurrentYear] = useState(2017);
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

  function getDataPerMonth(currentYear, currentMonth) {
    // 將陣列轉回物件以 array[0] 為 key
    return Object.fromEntries(
      // 提取 processedData 的 key 值來做比對, 將物件轉成陣列做篩選
      Object.entries(processedData).filter(([key]) => {
        const [yearStr, monthStr] = key.split("/");
        return (
          yearStr === currentYear.toString() &&
          monthStr === (currentMonth + 1).toString().padStart(2, "0")
        );
      })
    );
  }

  function hasDataForMonth(year, month) {
    const targetPrefix = `${year}/${String(month + 1).padStart(2, "0")}`;
    for (const key in processedData) {
      if (key.startsWith(targetPrefix)) {
        return true;
      }
    }
    return false;
  }

  return (
    <div className="calendar">
      <MonthsDisplay
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
        setCurrentYear={setCurrentYear}
        setChosenDay={setChosenDay}
        hasDataForMonth={hasDataForMonth}
      />
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
          data={getDataPerMonth(currentYear, currentMonth)}
          chosenDay={chosenDay}
          setChosenDay={setChosenDay}
        />
      </div>
    </div>
  );
};

export default Calendar;
