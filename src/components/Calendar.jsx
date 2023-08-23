import {useState} from 'react'
import DateView from './DateView'
import "./Calendar.scss"

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date(2017,5))
    const currentMonth = currentDate.getMonth()
    const currentYear = currentDate.getFullYear()
    // console.log(currentDate)  //(2017,5) => 日期2017/6/1 
    // console.log(currentMonth) // 5
    // console.log(currentYear) // 2017
    const daysOfWeek = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
  return (
    <div className='calendar'>
       <div className='monthPicker'>
        <div className='previous'></div>
        <div className='displayMonth'>
          <div className='month'><p>{currentYear}</p><p>{currentMonth}月</p></div>
          <div className='month'><p>{currentYear}</p><p>{Number(currentMonth) +1}月</p></div>
          <div className='month'><p>{currentYear}</p><p>{Number(currentMonth) +2}月</p></div>
        </div>
        <div className='next'></div>
       </div>
       <div>
        <div className='displayWeek'>
        {daysOfWeek.map((item)=><div className="week">{item}</div>)}
        </div>
        <DateView currentDate={currentDate}/>
       </div>
    </div>
  )
}

export default Calendar