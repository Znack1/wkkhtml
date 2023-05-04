/*
 * @Author: your name
 * @Date: 2020-04-27 17:01:12
 * @LastEditTime: 2020-04-27 17:24:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \html\src\utility\ol\GeojsonUtility.js
 */

 export class GeojsonUtility
 {  
     

    static getGeoPointJson(coordinates)
    {   
        let jsonObject=new Object();
        jsonObject.type="Point";
        jsonObject.coordinates=coordinates;
        
        return jsonObject;
    }


 }