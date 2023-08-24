import {useState} from 'react'
import DateView from './DateView'
import "./Calendar.scss"

const Calendar = () => {
    const [currentMonth, setCurrentMonth] = useState(4) // 5月
    const [currentYear, setCurrentYear] = useState(2017)
    // const [chosenMonth, setChosenMonth] = useState([true, false, false]) // 被選取的月份位置
    const [displayMonth, setDisplayMonth] = useState([4, 5, 6]) // 被選取的月份
    // const [chosenYear, setChosenYear] = useState(2017)
    // console.log(currentMonth) 0 based 月份 + 1 // 5 
    // console.log(currentYear) // 2017
  console.log(currentMonth,currentYear)
    const daysOfWeek = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
    
    const handleShowMonth = (month) => {
      setCurrentMonth(month)
    };

    function getDate(year, month, date){
      return new Date(year, month, date)
    }

    const setNextMonth = () => {
      const currentPosition = displayMonth.indexOf(currentMonth)
      if(currentPosition > 1){
        const updatedMonths = displayMonth.map(month=> month +1)
        setDisplayMonth(updatedMonths)
      } else {
        setCurrentMonth(currentMonth + 1)
      }
    }
    
    const setPreviousMonth = () =>{
      const currentPosition = displayMonth.indexOf(currentMonth)
      if(currentPosition === 0){
        const updatedMonths = displayMonth.map(month=> month - 1)
        setDisplayMonth(updatedMonths)
      } else {
        setCurrentMonth(currentMonth - 1)
      }
    }
   
   function updatedYear(month){
     const newYear = currentYear + Math.floor((month)/12)
     const newMonth = month % 12 +1
    //  setCurrentMonth(newMonth)
    //  setCurrentYear(newYear)
  console.log("2222",newYear,newMonth)
     return <div className={`shownMonth ${currentMonth === month ? 'selected' : ''}`} key={month} onClick={() => handleShowMonth(month)}>
                <p>{currentYear + Math.floor((month)/12)}</p>
                <p>{month % 12 +1} 月</p>
              </div>
            
          
   }

    return (
    <div className='calendar'>
       <div className='monthPicker'>
        <div className='previous' onClick={setPreviousMonth}></div>
        <div className='months'>
          {displayMonth.map((month)=> 
          // console.log("333")
            updatedYear(month)
          )}
        </div>
        <div className='next' onClick={setNextMonth}></div>
       </div>
       <div>
        <div className='displayWeek'>
        {daysOfWeek.map((item,index)=><div className="week" key={index}>{item}</div>)}
        </div>
        <DateView 
        currentMonth={currentMonth} 
        currentYear={currentYear}/>
       </div>
    </div>
  )
}

export default Calendar