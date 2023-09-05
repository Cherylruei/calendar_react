export function MonthsDisplay({
  displayMonth,
  data,
  currentMonth,
  setCurrentMonth,
  setCurrentYear,
  setChosenDay,
}) {
  const handleShowMonth = (year, month) => {
    setCurrentMonth(month);
    setCurrentYear(year);
    setChosenDay(null);
  };

  return displayMonth.map((item) => {
    const hasGroup = hasDataForMonth(data, item.year, item.month);
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
