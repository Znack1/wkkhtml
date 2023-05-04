/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: zkc
 * @Date: 2021-04-15 11:22:03
 * @LastEditors: zkc
 * @LastEditTime: 2021-04-16 11:37:47
 * @input: no param
 * @out: no param
 */
export class DownLoadUtility {
    /**
         * @Author: wutt
         * @Date: 2021-01-19 10:48:23
         * @Description:  通用后台下载方法
         * @param {*} url
         * @param {*} params
         * @param {*} filename
         */
    static download (url, filename, succeedCallback) {
       
        if ('download' in document.createElement('a')) {
            const elink = document.createElement('a');
            elink.download = filename;
            elink.href = url;
            elink.style.display = 'none';
            document.body.appendChild(elink);
            elink.click();
            document.body.removeChild(elink);
        }
        if (succeedCallback) {
            succeedCallback();
        }
    }
}