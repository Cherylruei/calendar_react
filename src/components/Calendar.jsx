import React from 'react'
import DateView from './DateView'
import "./Calendar.scss"

const Calendar = () => {
    const daysOfWeek = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
  return (
    <div className='calendar'>
       <div className='monthPicker'>
        <div className='previous'></div>
        <div className='displayMonth'>
          <div className='month'>2017 5</div>
          <div className='month'>2017 6</div>
          <div className='month'>2017 7</div>
        </div>
        <div className='next'></div>
       </div>
       <div>
        <div className='displayWeek'>
            <div className="week">星期日</div>
            <div className="week">星期一</div>
            <div className="week">星期二</div>
            <div className="week">星期三</div>
            <div className="week">星期四</div>
            <div className="week">星期五</div>
            <div className="week">星期六</div>
        </div>
        <DateView/>
       </div>
    </div>
  )
}

export default Calendar