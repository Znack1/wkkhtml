/*
 * @Author: your name
 * @Date: 2020-09-11 11:50:22
 * @LastEditTime: 2021-09-07 14:51:55
 * @LastEditors: zkc
 * @Description: In User Settings Edit
 * @FilePath: \html\src\utility\VectorTileUtility.js
 */
export class VectorTileFeatureUtility {
    constructor() {

    }

    /**
     * 获取切片中的要素
     * @param {*} vtSource 
     */
    static getFeatures(vtSource) {
        let features = new Array();
        if (!vtSource) return features;

        let sourceTiles = vtSource.sourceTiles_;
        
        let featureIds=new Array();

        let tempTile =null;
        let tileFeatures=null;
        let tempTileFeature=null;
        for (var item in sourceTiles) {

            tempTile= sourceTiles[item];
            if(!tempTile)continue;
            
            tileFeatures = tempTile.getFeatures();

            if(!tileFeatures || tileFeatures.length==0)continue;

            for (let tempFeatIndex = 0;tempFeatIndex < tileFeatures.length;tempFeatIndex++) {
                tempTileFeature=tileFeatures[tempFeatIndex];
                if(!tempTileFeature)continue;

                if (featureIds.indexOf(tempTileFeature.getId()) < 0) {
                    featureIds.push(tempTileFeature.getId());
                    features.push(tempTileFeature);
                }
            }
        }
        
        return features;
    }
    

}