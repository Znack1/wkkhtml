export class NumberUtility
{   
    constructor()
    {   
    }   


    /**
     * 判断字符串是否为数值
     * @param {*} importString 
     */
    static isNumber(importString)
    {   
        let numExpString="^(-?\\d+)(\\.\\d+)?$";

        let regExp=new RegExp(numExpString);
        return regExp.test(importString);
    }




}