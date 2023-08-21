/*
 * @Author: your name
 * @Date: 2020-02-28 11:08:06
 * @LastEditTime: 2023-08-19 13:05:44
 * @LastEditors: zkc
 * @Description: In User Settings Edit
 * @FilePath: \html\src\utility\common\CustomArray.js
 */
import { ArrayUtility } from "./ArrayUtility";

export class CustomArray {

    constructor() {

        this.objects = new Array();
        this.length=-1;
    }


    push(item) {
        debugger
        this.objects.push(item);
        this.length=this.objects.length;
    }

    pushMulti(items)
    {   
        if( !items || !(items instanceof Array) || items.length===0)return;

        ArrayUtility.addTargetToOri(this.objects,items);
    }
    
    removeByIndex(index)
    {   
        if(index<0)return;
        
        this.objects.splice(index, 1);
    }


}



// // 定义原型的方法
// const methods = {
//     constructor: CustomArray,

//   }

//   // 数组继承类，解决babel 不能处理es6直接继承原生数组的问题
//   function CustomArray(...param) {
//     const arr = new Array(...param)
//     // 继承数组实例的属性
//     Object.assign(this, arr)
//     Object.defineProperty(this, 'length', {
//       value: arr.length,
//       enumerable: false// 定义length属性为不可枚举
//     })
//   }
//   const prototype = Object.create(Array.prototype)
//   // 定义原型上的方法， 并且不能枚举
//   Object.keys(methods).map(key => {
//     Object.defineProperty(prototype, key, {
//       value: methods[key],
//       enumerable: false// 不可枚举
//     })
//   })
//   // 设定原型
//   CustomArray.prototype = prototype

//   export default CustomArray;
