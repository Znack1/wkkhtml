/*
 * @Author: your name
 * @Date: 2019-06-21 10:57:59
 * @LastEditTime: 2022-11-17 14:29:40
 * @LastEditors: zkc
 * @Description: In User Settings Edit
 * @FilePath: /html/src/components/mainMap/layer/LayerFeatureType.js
 */
import { ArrayUtility } from '../../../utility/common/ArrayUtility.js';

export const LayerFeatureType = {
   

    //标会图层-绘制点
    drawLayer_marker: 'drawLayer_marker',
    //标会图层-绘制线
    drawLayer_polyline: 'drawLayer_polyline',
    //标会图层-绘制面
    drawLayer_polygon: 'drawLayer_polygon',

    drawLayer_savedPolyline: 'drawLayer_savedPolyline',

    drawLayer_savedPolygon: 'drawLayer_savedPolygon',

    select_feature: 'select_feature', // 选中图形

    treeLayerFeature:'treeLayerFeature', // 图层点

    dataCountFeature:'dataCountFeature',// 统计点位

    /**
     * 通过要素类型查找要素
     * @param {*} source 
     * @param {*} featTypeAttriName 
     * @param {*} featType 
     */
    findFeaturesByFeatType (source, featTypeAttriName, featType) {

        let feats = new Array();
        if (!source || !featTypeAttriName || !featType) return feats;

        let features = source.getFeatures();
        if (!features || features.length === 0) return feats;

        let tempFeat = null;
        let tempFeatuTypeValue = null;
        for (let tempFeatIndex in features) {
            tempFeat = features[tempFeatIndex];
            if (!tempFeat) continue;

            tempFeatuTypeValue = tempFeat.get(featTypeAttriName);
            if (tempFeatuTypeValue && tempFeatuTypeValue === featType) {
                feats.push(tempFeat);
            }
        }

        return feats;
    },


    /**
     * 通过多个要素类型查找要素
     * @param {*} source 
     * @param {*} featTypeAttriName 
     * @param {*} featTypes 
     */
    findFeaturesByFeatTypes (source, featTypeAttriName, featTypes) {
        let feats = new Array();
        if (!source || !featTypeAttriName || !featTypes) return feats;

        let tempFeatType = null;
        let tempFeats = null;
        for (let tempIndex = 0; tempIndex < featTypes.length; tempIndex++) {
            tempFeatType = featTypes[tempIndex];
            tempFeats = LayerFeatureType.findFeaturesByFeatType(source, featTypeAttriName, tempFeatType);

            ArrayUtility.addTargetToOri(feats, tempFeats);
        }

        return feats;
    }


}