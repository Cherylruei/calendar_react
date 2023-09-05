import { statusOptions } from "../../constants/constants";
import "./DayItem.scss";

function formatePrice(price) {
  const newFormatPrice = String(price).replace(
    /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
    ","
  );
  return newFormatPrice;
}

//  2017/10/1 要取日期 (1)
export function DayItem({ calendarDay, chosenDay, setChosenDay }) {
  function handleChosen(date) {
    setChosenDay(date);
  }

  return (
    <>
      {calendarDay.type === "empty" ? (
        <div className="empty"></div>
      ) : (
        <div
          className={`date ${chosenDay === calendarDay.day ? "chosen" : ""}`}
          onClick={() => handleChosen(calendarDay.day)}
        >
          <div className="day">
            <div> {calendarDay.day}</div>
            {calendarDay.events?.guaranteed && (
              <div className="group">成團</div>
            )}
          </div>
          {calendarDay.multiGroups && (
            <div className="checkMoreGroups">
              <div>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a href="" className="moreGroupsLink">
                  <p className="moreGroups">看更多團</p>
                  <p className="arrow"></p>
                </a>
              </div>
              {calendarDay.multiGroups.lowestPrice && (
                <div className="lowestPrice">
                  <p className="price">
                    ${formatePrice(calendarDay.multiGroups.lowestPrice.price)}
                  </p>
                  <p>起</p>
                </div>
              )}
            </div>
          )}

          {calendarDay.events && !Array.isArray(calendarDay.events) && (
            <div className="event">
              <p
                className={`status ${
                  statusOptions[calendarDay.events.status] ||
                  statusOptions.default
                } `}
              >
                {calendarDay.events.status}
              </p>
              <p className="availableVacancy">
                可賣:{calendarDay.events.available}
              </p>
              <p className="totalVacancy">席次:{calendarDay.events.total}</p>
              <p className="price">${formatePrice(calendarDay.events.price)}</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}
