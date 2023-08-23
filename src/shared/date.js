
export function getBeginOfMonth(year, month){
   // (2023, 8) 會得到 9/1 在星期的哪一天,如果要算 8/1，month 就要輸入 7
   return new Date(year, month -1).getDay()
   // Sunday - Saturday : 0 - 6
}

export function getfirstOfNextMonth(year, month){
  return (new Date(year, month).getDay()) 
  // 會返回 next month 的星期幾 0-6   
  // -1 是拿到前一天的星期幾 (週六會變成 -1) 或是不要相減
}
 

export function getDaysInMonth(year, month){
  return new Date(year, month, 0).getDate()
}


console.log(getDaysInMonth(2023, 8))  //31
console.log(getBeginOfMonth(2023, 8)) 
console.log(getfirstOfNextMonth(2023, 9))
// getDay() 可以從特定日期得到星期幾
// const birthday = new Date('August 19, 2023 23:15:30');
// const day1 = birthday.getDay();
// Sunday - Saturday : 0 - 6
