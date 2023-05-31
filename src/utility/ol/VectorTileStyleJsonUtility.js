/*
 * @Author: your name
 * @Date: 2020-08-30 10:33:35
 * @LastEditTime: 2020-12-03 19:59:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \html\src\utility\ol\VectorTileStyleJsonUtility.js
 */
import { ArrayUtility } from "../common/ArrayUtility";
import {
    CustomArray
} from "../common/CustomArray";

export class VectorTileStyleJsonUtility {
    constructor() {

    }

    /**
     * 获取源图层名称
     * @param {*} layers 
     */
    static getSourceLayerNames(layers) {
        let layernames = new Array();
        if (!layers || layers.length == 0) return layernames;

        let tempLayer = null;
        let tempSourceName = null;
        for (let layerIndex = 0; layerIndex < layers.length; layerIndex++) {
            tempLayer = layers[layerIndex];
            if (!tempLayer) continue;

            tempSourceName = tempLayer["source-layer"];
            if (layernames.indexOf(tempSourceName) == -1) {
                layernames.push(tempSourceName);
            }
        }

        return layernames;
    }

    /**
     * 获取筛选图层，同时保留所有未筛选的源图层
     * @param {*} layers 
     * @param {*} filterSourceLayerName 
     * @param {*} filterName 
     * @param {*} filterValues 
     */
    static getFilterLayersRetainNoFilterSourceLayer(layers, filterSourceLayerName, filterName, filterValues) {
        let findLayers = new Array();
        if (!layers || layers.length == 0) return findLayers;

        let tempLayer = null;
        let tempFilters = null;
        let tempFilter = null;
        let tempSourceLayer = null;
        let isFilterLayer = false;
        for (let layerIndex = 0; layerIndex < layers.length; layerIndex++) {
            tempLayer = layers[layerIndex];
            if (!tempLayer) continue;

            tempSourceLayer = tempLayer["source-layer"];
            if (!tempSourceLayer || tempSourceLayer !== filterSourceLayerName) {
                findLayers.push(tempLayer);
                continue;
            }

            tempFilters = tempLayer.filter;
            if (!tempFilters) {
                findLayers.push(tempLayer);
                continue;
            }

            isFilterLayer = false;
            for (let tempFilterIndex = 0; tempFilterIndex < tempFilters.length; tempFilterIndex++) {
                tempFilter = tempFilters[tempFilterIndex];
                if (!tempFilter) continue;
                if (tempFilter !== filterName && filterValues.indexOf(tempFilter) != -1) {
                    isFilterLayer = true;
                    break;
                }
            }

            if (isFilterLayer) {
                findLayers.push(tempLayer);
            }
        }

        return findLayers;
    }



    /**
     * 通过筛选值移除图层
     * @param {*} layers 
     * @param {*} filterSourceLayerName 
     * @param {*} filterName 
     * @param {*} filterValues 
     */
    static removeLayersByFilterValues(layers, filterSourceLayerName, filterName, filterValues) {

        let findLayers = new Array();
        if (!layers || layers.length == 0) return findLayers;

        let tempLayer = null;
        let tempFilters = null;
        let tempFilter = null;
        let tempSourceLayer = null;
        let isFilterLayer = false;
        for (let layerIndex = 0; layerIndex < layers.length; layerIndex++) {
            tempLayer = layers[layerIndex];
            if (!tempLayer) continue;

            tempSourceLayer = tempLayer["source-layer"];
            if (!tempSourceLayer || tempSourceLayer !== filterSourceLayerName) {
                findLayers.push(tempLayer);
                continue;
            }

            tempFilters = tempLayer.filter;
            if (!tempFilters) {
                findLayers.push(tempLayer);
                continue;
            }

            isFilterLayer = false;
            for (let tempFilterIndex = 0; tempFilterIndex < tempFilters.length; tempFilterIndex++) {
                tempFilter = tempFilters[tempFilterIndex];
                if (!tempFilter) continue;

                if (tempFilter instanceof Array) {

                    for (let tempFilterParamIndex = 0; tempFilterParamIndex < tempFilter.length; tempFilterParamIndex++) {
                        if (tempFilter[tempFilterParamIndex] != filterName && filterValues.indexOf(tempFilter[tempFilterParamIndex]) != -1) {
                            isFilterLayer = true;
                            break;
                        }
                    }
                }
            }


            if (!isFilterLayer) {
                findLayers.push(tempLayer);
            }
        }

        return findLayers;
    }


    /**
     * 通过筛选值查找某个源图层中的layers
     * @param {*} layers 
     * @param {*} sourceLayerName 
     * @param {*} filterName 
     * @param {*} filterValues 
     */
    static findLayersByFilterValues(layers, sourceLayerName, filterName, filterValues) {
        let findLayers = new Array();
        if (!layers || layers.length == 0 || !sourceLayerName
            || !filterName || !filterValues || filterValues.length == 0) return findLayers;

        let tempLayer = null;
        let tempFilters = null;
        let tempFilter = null;
        let tempSourceLayer = null;
        for (let layerIndex = 0; layerIndex < layers.length; layerIndex++) {
            tempLayer = layers[layerIndex];
            if (!tempLayer) continue;

            tempSourceLayer = tempLayer["source-layer"];
            if (!tempSourceLayer || tempSourceLayer.toLowerCase() !== sourceLayerName.toLowerCase()) continue;

            tempFilters = tempLayer.filter;
            if (!tempFilters) continue;

            for (let tempFilterIndex = 0; tempFilterIndex < tempFilters.length; tempFilterIndex++) {
                tempFilter = tempFilters[tempFilterIndex];
                if (!tempFilter) continue;

                if (tempFilter instanceof Array) {

                    for (let tempFilterParamIndex = 0; tempFilterParamIndex < tempFilter.length; tempFilterParamIndex++) {
                        if (tempFilter[tempFilterParamIndex] != filterName && filterValues.indexOf(tempFilter[tempFilterParamIndex]) != -1) {
                            findLayers.push(tempLayer);
                            break;
                        }
                    }
                }
                else {
                    if (filterValues.indexOf(tempFilter) != -1) {
                        findLayers.push(tempLayer);
                        break;
                    }
                }
            }
        }

        return findLayers;
    }

    /**
     * 通过图层id查找图层
     * @param {*} layers 
     * @param {*} layerId 
     */
    static findLayerById(layers,layerId)
    {   
        let findLayer=null;
        
        let tempLayer=null;
        for (let layerIndex = 0; layerIndex < layers.length; layerIndex++) {
            tempLayer = layers[layerIndex];
            if (!tempLayer || !tempLayer.id) continue;
            if(tempLayer.id==layerId)
            {
                findLayer=tempLayer;
                break;
            }
        }
        
        return findLayer;
    }


    /**
     * 请求style样式json文件
     * @param {*} styleUrl 
     * @param {*} succeedCallback 
     */
    static requestStyleJson(styleUrl, succeedCallback) {
        if (!styleUrl) return;

        var request = new XMLHttpRequest();
        request.open("get", styleUrl); /*设置请求方法与路径*/
        request.send(null); /*不发送数据到服务器*/
        request.onload = function () { /*XHR对象获取到返回信息后执行*/
            if (request.status == 200) { /*返回状态为200，即为数据获取成功*/
                var responseJson = JSON.parse(request.responseText);

                succeedCallback(responseJson);
            }
            else {
                succeedCallback({});
            }

        }

    }

}

export class StyleJsonLayerItem {
    constructor() {
        //图层的json对象
        this.layerJson = null;

        //样式筛选
        this.filterItems = null;

        this.id=null;

        this.type=null;
        
        this.sourceLayer = null;

        this.minzoom=-1;

        this.maxZoom=-1;
    }

    getStyleFilters() {
        let filters = new Array();

        if (this.filterItems) {
            filters = this.filterItems.getStyleFilters();
        }

        return filters;
    }

    static fromLayerJson(layerJson) {
        if (!layerJson) return null;
        let layerItem = new StyleJsonLayerItem();
        layerItem.layerJson = layerJson;
        layerItem.id=layerJson.id;
        layerItem.type=layerJson.type;
        layerItem.maxZoom=layerJson.maxzoom;
        layerItem.minzoom=layerJson.minzoom;
        layerItem.sourceLayer = layerJson.sourceLayer;
        layerItem.filterItems = StyleJsonFilterItems.fromFilterJsons(layerJson.filter);
        return layerItem;
    }


}

export class StyleJsonLayerItems extends CustomArray {
    constructor() {
        super();
    }

    getStyleFilters() {
        let filterItems = new Array();
        
        let tempArray = null;
        let tempLayer = null;
        let tempArrayItem = null;
        for (let tempIndex = 0; tempIndex < this.objects.length; tempIndex++) {
            tempLayer = this.objects[tempIndex];
            if (!tempLayer) continue;
            tempArray = tempLayer.getStyleFilters();
            if (!tempArray) continue;

            tempArrayItem = null;
            for (let tempArrayIndex = 0; tempArrayIndex < tempArray.length; tempArrayIndex++) {
                tempArrayItem = tempArray[tempArrayIndex];
                if (filterItems.indexOf(tempArrayItem) == -1) {
                    filterItems.push(tempArrayItem);
                }
            }

        }

        return filterItems;
    }

    static fromLayerJsons(layerJsons) {
        if (!layerJsons) return null;

        let layerItems = new StyleJsonLayerItems();
        let tempJson = null;
        let tempItem = null;
        for (let tempIndex = 0; tempIndex < layerJsons.length; tempIndex++) {
            tempJson = layerJsons[tempIndex];
            if (!tempJson) continue;

            tempItem = StyleJsonLayerItem.fromLayerJson(tempJson);
            if (!tempItem) continue;

            layerItems.push(tempItem);
        }


        return layerItems;
    }

}


export class StyleJsonFilterItem {
    constructor() {
        
        this.fieldName = null;

        //字段查找
        this.fieldLookupType = "get";
        
        this.fieldValue = null;

        this.relationType = null;

        this.fieldType = null;
        
        this.isArray = true;
    }


    getStyleFilter() {
        if (this.isArray) {
            
            let infoArray = new Array();

            //关系类型
            infoArray.push(this.relationType);
            
            let fieldInfos = new Array();
            fieldInfos.push(this.fieldLookupType);
            fieldInfos.push(this.fieldName);
            
            //字段名称
            infoArray.push(fieldInfos);
            
            //字段值
            infoArray.push(this.fieldValue);
            
            return infoArray;
        }
        else {
            // let value = this.fieldValue;
            return new Array();
        }
    }

    getDecision() {

        if(this.isArray==false)
        {
            return this.fieldValue;
        }
        
        return null;
    }




    static fromFilterJson(filterJson) {
        if (!filterJson) return null;

        let filterItem = new StyleJsonFilterItem();


        if (filterJson instanceof Array) {

            filterItem.isArray = true;
            filterItem.relationType = filterJson[0];
            filterItem.fieldName = filterJson[1];
            filterItem.fieldValue = filterJson[2];

        }
        else {
            filterItem.isArray = false;
            filterItem.fieldValue = filterJson;
        }

        return filterItem;
    }


}

export class StyleJsonFilterItems extends CustomArray {
    constructor() {
        super();
    }

    findByFilterFieldName(fieldName) {
        let fieldItems = new StyleJsonFilterItems();

        let tempItem = null;
        for (let tempIndex = 0; tempIndex < this.objects.length; tempIndex++) {
            tempItem = this.objects[tempIndex];
            if (!tempItem || !tempItem.fieldName) continue;

            if (tempItem.fieldName == fieldName) {
                fieldItems.push(tempItem);
            }
        }

        return fieldItems;
    }


    findByFilterFieldValue(fieldValue) {
        let fieldItems = new StyleJsonFilterItems();

        let tempItem = null;
        for (let tempIndex = 0; tempIndex < this.objects.length; tempIndex++) {
            tempItem = this.objects[tempIndex];
            if (!tempItem || !tempItem.fieldValue) continue;

            if (tempItem.fieldValue == fieldValue) {
                fieldItems.push(tempItem);
            }
        }

        return fieldItems;


    }



    getStyleFilters() {
        let filterItems = new Array();

        let tempArray = null;
        let tempFilter = null;
        for (let tempIndex = 0; tempIndex < this.objects.length; tempIndex++) {
            tempFilter = this.objects[tempIndex];
            if (!tempFilter) continue;
            tempArray = tempFilter.getStyleFilter();
            if (!tempArray || tempArray.length == 0) continue;
            
            filterItems.push(tempArray);
        }
        
        return filterItems;
    }

    
    getDecisions()
    {   
        let decisions=new Array();
        
        let tempItem=null;
        let tempDecision=null;
        for(let tempIndex=0;tempIndex<this.objects.length;tempIndex++)
        {   
            tempItem=this.objects[tempIndex];
            if(!tempItem)continue;

            tempDecision=tempItem.getDecision();
            if(!tempDecision)continue;

            if(decisions.indexOf(tempDecision)==-1)
            {
                decisions.push(tempDecision);
            }
        }
        
        return decisions;
    }


    static fromFilterJsons(styleJsons) {
        let styleItems = new StyleJsonFilterItems();
        if (!styleJsons) return styleItems;

        let tempJson = null;
        let tempItem = null;
        for (let tempIndex = 0; tempIndex < styleJsons.length; tempIndex++) {
            tempJson = styleJsons[tempIndex];
            if (!tempJson) continue;

            tempItem = StyleJsonFilterItem.fromFilterJson(tempJson);
            if (!tempItem) continue;

            styleItems.push(tempItem);
        }

        return styleItems;
    }




}

export const StyleJsonFilterDecisionType =
{
    equal: "==",
    unequal: "!=",
    //大于等于
    moreThanOrEqual: ">=",
    negation: "!",
    lessThan: "<",
    lessThanOrEqual: "<=",
    moreThan: ">",
    all: "all",
    any: "any",
    case: "case",
    coalesce: "coalesce",
    match: "match",
    within: "within",
}

export const StyleJsonFieldType =
{
    string: "string",



}

export const StyleJsonLookupType =
{
    at: "at",
    get: "get",
    has: "has",
    in: "in",
    index_of: "index-of",
    length: "length",
    slice: "slice",
}