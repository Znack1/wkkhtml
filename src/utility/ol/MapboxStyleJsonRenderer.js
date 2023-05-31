/*
 * @Author: your name
 * @Date: 2020-08-29 22:00:10
 * @LastEditTime: 2021-01-12 09:17:14
 * @LastEditors: wutt
 * @Description: In User Settings Edit
 * @FilePath: /DistributionPortalHtml/src/utility/vectorTile/MapboxStyleJsonRenderer.js
 */
/*
|---------------------------------- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
|
Ez.EzJson2StyleMapbox
|
|@author: lizhiping
|@date: 2019-5-24
|@descript: json转style
|------------------------------------------------------------------------------
*/

import { VectorTileStyleJsonUtility } from "./VectorTileStyleJsonUtility";
import { applyStyle } from "./ApplyMBStyleForOLLayer";
// import MapboxToOpenlayers from "./MapboxToOpenlayers";

/**
 * 样式json
 */
export class MapboxStyleJsonRenderer {


    constructor() {
        this.olVTLayer = null;

        this.filterName = null;

        this.filterValues = new Array();

        this.sourceLayerString = null;

        this.sourceString = 'featuremap';

    }






    /**
     * 渲染
     * @param {*} styleUrl 样式url地址 
     */
    renderer(styleUrl) {

        if (!styleUrl) return;

        let self=this;
        
        VectorTileStyleJsonUtility.requestStyleJson(styleUrl, function (responseJson) {
            if (self.filterName && self.filterValues && self.filterValues.length > 0) {
                if (responseJson.layers && responseJson.layers.length > 0) {
                    responseJson.layers = VectorTileStyleJsonUtility.findLayersByFilterValues(responseJson.layers, self.sourceLayerString, self.filterName, self.filterValues);
                }
            }

            applyStyle(self.olVTLayer, responseJson, self.sourceString, null, self.olVTLayer.getSource().getTileGrid().getResolutions());
        })
        
    }

    /**
     * 渲染
     * @param {*} styleJson 样式json字符串 
     */
    rendererEx(styleJson) {
        if (!styleJson) return;

        let self=this;
        
        if (self.filterName && self.filterValues && self.filterValues.length > 0) {
            if (styleJson.layers && styleJson.layers.length > 0) {
                styleJson.layers = VectorTileStyleJsonUtility.findLayersByFilterValues(styleJson.layers, self.sourceLayerString, self.filterName, self.filterValues);
            }
        }

        applyStyle(self.olVTLayer, styleJson, self.sourceString, null, self.olVTLayer.getSource().getTileGrid().getResolutions());

    }



    /**
     * 切换风格
     * @param {*} styleUrl 
     */
    changeSkill(styleUrl) {
        this.stylePath = styleUrl;
        this.renderer();
    }


    


}