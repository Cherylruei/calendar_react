import data1 from './data1.json';
import data2 from './data2.json';
import data3 from './data3.json';
import data4 from './data4.json';

//  以 jquery 列的屬性名稱來做資料整理
const processData1 = data1.map((item) => ({
  guaranteed: item.guaranteed,
  date: item.date,
  price: item.price,
  available: item.availableVancancy,
  total: item.totalVacnacy,
  status: item.status,
}));

const processData2 = data2.map((item) => ({
  guaranteed: item.certain,
  date: item.date,
  price: item.price,
  available: item.onsell,
  total: item.total,
  status: item.state,
}));

const processData3 = data3.map((item) => ({
  guaranteed: item.guaranteed,
  date: item.date,
  price: item.price,
  available: item.availableVancancy,
  total: item.totalVacnacy,
  status: item.status,
}));
const processData4 = data4.map((item) => ({
  guaranteed: item.guaranteed,
  date: item.date,
  price: item.price,
  available: item.availableVancancy,
  total: item.totalVacnacy,
  status: item.status,
}));

// 建立以日期為鍵的物件 修改為("2023/08/29") key 的格式

export const processedData = [
  processData1,
  processData2,
  processData3,
  processData4,
].reduce((result, group) => {
  group.forEach((item) => {
    const dateString = item.date
    // 如果已經有相同日期的資料在物件中，將資料以陣列的形式儲存
    if(result[dateString]){
      // 如果已經有含兩筆以上的資料
      if(Array.isArray(result[dateString])){
        result[dateString].push(item)
      } else {
        // 目前只有單筆資料 (用陣列儲存不同筆資料)
        result[dateString] = [result[dateString], item]
      }
    } else {
    // 轉換成 yyyy/mm/dd 格式 (物件格式)
    result[dateString] = item;
    }
  });
  return result;
}, {});
