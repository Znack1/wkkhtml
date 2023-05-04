/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-18 16:27:25
 * @LastEditTime: 2019-08-18 16:28:44
 * @LastEditors: Please set LastEditors
 */
export class OLStyleUtility
{   
    constructor()
    {   
        

    }


    static setNullStyleForFeatures(features)
    {   
        if(!features || features.length===0)return;
        
        let tempFeat = null;
        for (let tempFeatIndex = 0; tempFeatIndex < features.length; tempFeatIndex++) {
            tempFeat = features[tempFeatIndex];
            if (tempFeat) {
                tempFeat.setStyle(null);
            }
        }
    }


}