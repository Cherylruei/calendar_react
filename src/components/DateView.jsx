import React from 'react'
import { getBeginOfMonth, getDaysInMonth, getfirstOfNextMonth } from '../shared/date'

const DateView = ({currentDate}) => {
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()
  const startDayOfWeek = getBeginOfMonth(currentYear, currentMonth)
  const daysOfMonth = getDaysInMonth(currentYear, currentMonth)
  const leftDays = 7 - Number(getfirstOfNextMonth(currentYear, currentMonth) )
  console.log(currentDate)
  console.log(leftDays)
  return (
      <div className='displayDate'>
             {/* 填補前面的空格 */}
            {Array.from({length:startDayOfWeek}).map((_, index) => {
            return(<div key={index} className="date"></div>)})}
            {Array.from({length:daysOfMonth}).map((_, index) => {
            const date = index + 1
            return(<div key={date} className="date">{date}</div>)})}
            {/* 填補後面的空格 */}
            {Array.from({length:leftDays}).map((_, index) => {
            return(<div key={index} className="date"></div>)})}
        </div>
 
  )
}

export default DateView