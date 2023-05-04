/*
 * @Author: wutt
 * @Date: 2020-12-20 12:57:01
 * @LastEditors: wutt
 * @LastEditTime: 2020-12-20 13:22:10
 * @Description: 
 * @FilePath: /html/src/utility/common/localStorage.js
 */
export class LocalStorage
{   
    constructor()
    {   
     
    }   


   
    static  set(key,value){
		var curTime = new Date().getTime();
		localStorage.setItem(key,JSON.stringify({data:value,time:curTime}));
    }
    static get(key){
        let retObj = {
            flag:false,
            data:""
        };
        var data = localStorage.getItem(key);
        if(data){
            var dataObj = JSON.parse(data);
            if (new Date().getTime() - dataObj.time>LocalStorage.exp) {
                console.log('已过期');
                retObj.flag = false;
                retObj.data = '';
            }else{
                console.log('未过期');
                var dataObjDatatoJson = dataObj.data;
                retObj.flag = true;
                retObj.data = dataObjDatatoJson;
            }
            
        }else {
            retObj.flag = false;
            retObj.data = '';
        }		
        return retObj;
	}
}
LocalStorage.exp = 1*60*60*1000;// 毫秒  目前设置 1小时过期