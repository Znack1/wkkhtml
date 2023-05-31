import { GuidUtility } from "../../utility/common/GuidUtility";

/*
 * @Author: your name
 * @Date: 2020-03-07 14:41:35
 * @LastEditTime: 2021-04-02 09:29:15
 * @LastEditors: zkc
 * @Description: In User Settings Edit
 * @FilePath: \html\src\components\mainMap\UCMapOverlayJs.js
 */

import { CustomArray } from "../../utility/common/CustomArray.js";


/**
 * overlay布局信息
 */
export class OverlayLayoutInfo {
    constructor() {
        this.popupId = "id_" + GuidUtility.getGuid();
        this.closeId = "id_" + GuidUtility.getGuid();
        this.contentId = "id_" + GuidUtility.getGuid();

        this.divElement = null;
        this.closeAElement = null;
        this.contentElement = null;
        this.ucOverlay = null;
    }




}

/**
 * 地图overlay信息
 */
export class MapOverlayInfo {
    constructor() {
        this.position = null;
        this.feature = null;
        this.type = null;

        this.showFields = null;

        //行政区划级别
        this.districtLevel = null;

        //图层项名称
        this.layerItemName = null;

        //图层项-数据源名称
        this.layerItemSourceName = null;

        //区域信息 AreaInfo对象
        this.areaInfo = null;

    }
}

/**
 * 地图overlay信息集合
 */
export class MapOverlayInfos extends CustomArray {
    constructor() {
        super();
    }

}

/**
 * 地图overlay类型
 */
export const MapOverlayType = {
    /**
     * 常规要素属性信息
     */
    featureAttriInfo: "featureAttriInfo",


}

export class StatisticsOverlayInfo {
    constructor() {
        this.id = null;
        //overlay标题
        this.title = null;

        //属性数组
        this.attributes = new Array();

        //照片数组
        this.photos = new Array();

        this.videos = new Array();
    }

      /**
     * 获取属性和附件信息
     * @param {*} feature 
     * @param {*} fieldItems 
     * @param {*} sourceName 
     * @param {*} succeedCallback 
     */
      getAttributesAndAttachments(properties, fieldItems) {

      
        let attributes = this._getAttributesEx(properties, fieldItems);

        this.attributes = attributes;

        this.photos = properties.imgPaths;
        this.videos = properties.videoPaths;
    }




        _getAttributes(feature, fieldItems) {
            let attributes = new Array();
            if (!feature || !fieldItems) return attributes;

            let properties = feature.getProperties();

            let attriItem = null;
            _.each(fieldItems, (fieldItem) => {
                if (properties[fieldItem.name]) {
                    attriItem = {};
                    //别名
                    attriItem.key = fieldItem.aliasName;
                    attriItem.value = properties[fieldItem.name];
                    attributes.push(attriItem);
                }
            })

            return attributes
        }



        _getAttributesEx(properties,fieldItems){
            let attributes = new Array();
            if (!properties || !fieldItems) return attributes;


            let attriItem = null;
            _.each(fieldItems, (fieldItem) => {
                if (properties[fieldItem.name]) {
                    attriItem = {};
                    //别名
                    attriItem.key = fieldItem.aliasName;
                    attriItem.value = properties[fieldItem.name];
                    attributes.push(attriItem);
                }
            })

            return attributes;
        }

}