/*
 * @Author: wutt
 * @Date: 2020-11-30 13:17:07
 * @LastEditors: wutt
 * @LastEditTime: 2020-12-11 09:41:50
 * @Description: 
 * @FilePath: /html/src/utility/common/DateUtility.js
 */
export class DateUtility {
  constructor() {

  }

  //获得guid值-32位
  /**
   * @Author: wutt
   * @Date: 2020-12-11 09:41:14
   * @Description: 返回格式 yyyy-mm-dd hh:mm
   */
  static formate(time) {
    var dateStr = new Date(time);

    let dateTime = dateStr.getFullYear() + '-' + DateUtility._checkTime(dateStr.getMonth() + 1) + '-' + DateUtility._checkTime(dateStr.getDate()) + ' ' + DateUtility._checkTime(dateStr.getHours() + 1) + ':' + DateUtility._checkTime(dateStr.getMinutes() + 1);

    return dateTime;
  }
  /**
   * @Author: wutt
   * @Date: 2020-12-11 09:41:14
   * @Description: 返回格式 yyyy-mm-dd
   */
  static formateEx(time) {
    var dateStr = new Date(time);

    let dateTime = dateStr.getFullYear() + '-' + DateUtility._checkTime(dateStr.getMonth() + 1) + '-' + DateUtility._checkTime(dateStr.getDate());

    return dateTime;
  }
  static _checkTime(i) {
    if (i < 10) {
      i = '0' + i
    }
    return i
  }


}
