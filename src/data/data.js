import data1 from './data1.json';
import data2 from './data2.json';
import data3 from './data3.json';
import data4 from './data4.json';

//  以 jquery 列的屬性名稱來做資料整理
const processData1 = data1.map((item) => ({
  ...item,
  available: item.availableVancancy,
  total: item.totalVacnacy,
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
  ...item,
  available: item.availableVancancy,
  total: item.totalVacnacy,
}));
const processData4 = data4.map((item) => ({
  ...item,
  available: item.availableVancancy,
  total: item.totalVacnacy,
}));

// 建立以日期為鍵的物件
export const processedData = [
  processData1,
  processData2,
  processData3,
  processData4,
].reduce((result, group) => {
  group.forEach((item) => {
    const itemDate = new Date(item.date);
    const localDate = new Date(
      itemDate.getTime() - itemDate.getTimezoneOffset() * 60000
    ); // 調整時區偏移量
    const dateString = localDate.toISOString().split('T')[0];

    // console.log('item', item);
    // console.log('localDate');
    // console.log('dateString', dateString);
    // 轉換成 yyyy-mm-dd 格式
    result[dateString] = item;
  });
  return result;
}, {});
