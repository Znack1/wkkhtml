/*
 * @Author: your name
 * @Date: 2020-05-11 09:02:50
 * @LastEditTime: 2020-05-11 15:02:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \html\src\utility\common\UrlParseUtilityJs.js
 */
export class UrlParseUtility {
    constructor() {
        this.params = null;
    }

    /**
     * 解析参数
     */
    parseParams() {

        let params = new Array();
        
        let localUrl =decodeURI(location.href);
        if (!localUrl) return;
        let paramStartIndex = localUrl.indexOf("?");
        
        if (paramStartIndex < 0) return params;
        
        let length = localUrl.length;
        let paramsString = localUrl.substring(paramStartIndex + 1, length);
        paramsString = paramsString.replace(/%20/g, '');
        paramsString = paramsString.replace(/(^\s*)|(\s*$)/g, "");
        let singleParamArray = paramsString.split('&');
        if (!singleParamArray || singleParamArray.length == 0) return params;

        let tempParamString = null;
        let paramKeyValue = null;
        for (let paramIndex = 0; paramIndex < singleParamArray.length; paramIndex++) {
            tempParamString = singleParamArray[paramIndex];
            if (!tempParamString) continue;
            paramKeyValue = tempParamString.split("=");
            params[paramKeyValue[0]] = paramKeyValue[1];
        }

        return params;
    }


    /**
     * 通过名称查找
     * @param {*} paramName 
     */
    getParamValue(paramName) {
        
        if(!this.params)
        {
            this.params=this.parseParams();
        }

        return this.params[paramName];
    }


}