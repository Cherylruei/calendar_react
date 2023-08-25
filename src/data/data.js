import data1 from './data1.json';
import data2 from './data2.json';
import data3 from './data3.json';
import data4 from './data4.json';

//  以 data1 的屬性名稱來做資料整理
const processData2 = data2.map((item) => (
{
    guaranteed: item.certain,
    date: item.date,
    price: item.price,
    available: item.onsell,
    total: item.total,
    status: item.state
})
)

// 建立以日期為鍵的物件
export const processedData = [  data1,
    processData2,
    data3,
    data4].reduce((result, group) => {
        group.forEach((item) => {
          const itemDate = new Date(item.date);
          const dateString = itemDate.toISOString().split("T")[0]; // 轉換成 yyyy-mm-dd 格式
          result[dateString] = item;
        });
        return result;
      }, {});
   

