import {
  getBeginOfMonth,
  getDaysInMonth,
  getfirstOfNextMonth,
} from "../../shared/date";
import "./DateView.scss";
import { DayItem } from "../DayItem/DayItem";
import { composedDateFormat } from "../../shared/date";

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

  const renderTheDate = () => {
    const calendarData = [];
    // 填補前面的空格
    calendarData.push(
      ...Array.from({ length: startDayOfWeek }).map((_, index) => ({
        type: "empty",
        key: `empty_${index}`,
      }))
    );
    // 月中
    for (let day = 1; day <= numberOfDaysInMonth; day++) {
      const composedDate = composedDateFormat(currentYear, currentMonth, day);
      // 確認有資料後，判斷是單筆或多筆
      const multiGroups =
        data[composedDate] && hasMultiGroups(data[composedDate]);

      calendarData.push({
        type: "day",
        day,
        key: `day_${day}`,
        events: data[composedDate],
        multiGroups,
      });
    }
    // 填補後面的空格
    calendarData.push(
      ...Array.from({ length: leftDays }).map((_, index) => ({
        type: "empty",
        key: `empey_${index + startDayOfWeek + numberOfDaysInMonth}`,
      }))
    );
    return calendarData.map((item, index) => {
      return (
        <DayItem
          key={`day ${index}`}
          calendarDay={item}
          chosenDay={chosenDay}
          setChosenDay={setChosenDay}
        />
      );
    });
  };

  function hasMultiGroups(events) {
    let showMoreGroups = null;
    let lowestPrice = null;
    // 單筆是物件，多筆是陣列 (顯示看更多團)
    if (Array.isArray(events)) {
      showMoreGroups = events;
      lowestPrice = events.reduce((lowest, current) => {
        if (!lowest || current.price < lowest.price) {
          return current;
        }
        return lowest;
      });
      return { showMoreGroups, lowestPrice };
    } else {
      return false;
    }
  }

  return <div className="displayDate">{renderTheDate()}</div>;
};

export default DateView;
