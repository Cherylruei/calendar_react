import { useState } from "react";

export function MonthsDisplay({
  currentMonth,
  setCurrentMonth,
  setCurrentYear,
  setChosenDay,
  hasDataForMonth,
}) {
  const [displayMonth, setDisplayMonth] = useState([
    { year: 2017, month: 9 },
    { year: 2017, month: 10 },
    { year: 2017, month: 11 },
  ]);

  const handleShowMonth = (year, month) => {
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
    <div className="monthPicker">
      <div onClick={setPreviousMonth} className="buttonWrap">
        <div className="previous"></div>
      </div>
      <div className="months">
        {displayMonth.map((item) => {
          const hasGroup = hasDataForMonth(item.year, item.month);
          return (
            <div
              className={`shownMonth ${
                currentMonth === item.month ? "selected" : ""
              }`}
              key={item.month}
              onClick={() => handleShowMonth(item.year, item.month)}
            >
              <div className="yearAndMonth">
                <p>{item.year}</p>
                {/* 讓 item.month 的數字只存在於 0-11 */}
                <p>
                  {(item.month + 1) % 12 === 0 ? 12 : (item.month + 1) % 12}月
                </p>
              </div>
              {!hasGroup && <div className="noGroup">無出發日</div>}
            </div>
          );
        })}
      </div>
      <div onClick={setNextMonth} className="buttonWrap">
        <div className="next"></div>
      </div>
    </div>
  );
}
