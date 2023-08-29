import { composedDateFormat } from "../../shared/date";
import "./CheckTheDate.scss";

function formatePrice(price) {
  const newFormatPrice = String(price).replace(
    /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
    ","
  );
  return newFormatPrice;
}

//  2017/10/1 要取日期 (1)
export function CheckTheDate({
  numberOfDaysInMonth,
  currentYear,
  currentMonth,
  data,
  chosenDay,
  setChosenDay,
}) {
  function handleChosen(date) {
    setChosenDay(date);
  }
  return Array.from({ length: numberOfDaysInMonth }).map((_, index) => {
    const date = index + 1;
    const composedDate = composedDateFormat(currentYear, currentMonth, date);
    let showMoreGroups = null;
    let lowestPriceItem = null;
    let matchingEvents = [];

    if (data[composedDate]) {
      // 如果該日期的資料筆數大於 1 筆，則會顯示看更多團 $2XXX起 (陣列)

      if (Array.isArray(data[composedDate])) {
        // 存多筆資料
        showMoreGroups = data[composedDate];
        lowestPriceItem = showMoreGroups?.reduce((lowest, current) => {
          if (!lowest || current.price < lowest.price) {
            return current;
          }
          return lowest;
        }, undefined);
      } else {
        // 如果只有一筆資料 processedData[composedDate] 為 (物件)
        matchingEvents.push(data[composedDate]);
      }
    }

    matchingEvents = matchingEvents ? matchingEvents[0] : "";
    const newFormatPrice = formatePrice(matchingEvents?.price);
    const newFormatLowestPrice = formatePrice(lowestPriceItem?.price);
    const statusOptions = {
      reserved: "預定",
      unAvailable: "額滿",
      closed: "截止",
      openForSignup: "報名",
      candidacy: "後補",
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
      <div
        key={date}
        className={`date ${chosenDay === date ? "chosen" : ""}`}
        onClick={() => handleChosen(date)}
      >
        <div className="day">
          <div>{date}</div>
          {matchingEvents?.guaranteed && <div className="group">成團</div>}
        </div>
        {showMoreGroups && (
          <div className="checkMoreGroups">
            <div>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="" className="moreGroupsLink">
                <p className="moreGroups">看更多團</p>
                <p className="arrow"></p>
              </a>
            </div>
            {lowestPriceItem && (
              <div className="lowestPrice">
                <p className="price">${newFormatLowestPrice} </p>
                <p>起</p>
              </div>
            )}
          </div>
        )}
        {matchingEvents && (
          <div className="event">
            <p className={`status ${statusStyle} `}>{matchingEvents.status}</p>
            <p className="availableVacancy">可賣:{matchingEvents.available}</p>
            <p className="totalVacancy">席次:{matchingEvents.total}</p>
            <p className="price">${newFormatPrice}</p>
          </div>
        )}
      </div>
    );
  });
}
