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

        //overlay标题
        this.title = null;


        //是否使用统计信息
        this.useStatistics = false;


        //污染源个数
        this.pollutionCount = 0;

        //排污口个数
        this.outfallCount = 0;

        //属性数组
        this.attributes = new Array();

        //照片数组
        this.photos = new Array();

        this.videos = new Array();
    }

}