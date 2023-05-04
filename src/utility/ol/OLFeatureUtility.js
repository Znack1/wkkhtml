/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-17 22:03:23
 * @LastEditTime: 2020-10-19 18:55:07
 * @LastEditors: Please set LastEditors
 */
import { CustomArray } from "../common/CustomArray.js"
import { NumberUtility } from "../common/NumberUtility.js";

export class OLFeatureUtility {
    constructor() {

    }

    /**
     * 获取要素中的所有唯一值
     * @param {*} features 
     * @param {*} fieldName 
     */
    static getUniqueValues(features, fieldName) {
        let uniqueValues = new Array();

        if (!features || !fieldName) return uniqueValues;

        let tempFeat = null;
        let tempFeatValue = null;
        for (let tempFeatIndex in features) {
            tempFeat = features[tempFeatIndex];
            if (!tempFeat) continue;

            tempFeatValue = tempFeat.get(fieldName);

            if (tempFeatValue && uniqueValues.indexOf(tempFeatValue)) {
                uniqueValues.push(tempFeatValue);
            }
        }

        return uniqueValues;
    }

    static getStatisticsValue() {
        let statistics = new FeatureStatistics();

        return statistics;
    }


    static getGeometries(featureArray) {
        let geometries = new Array();

        let tempFeature = null;
        let tempGeometry = null;
        for (let tempFeatureIndex = 0; tempFeatureIndex < featureArray.length; tempFeatureIndex++) {
            tempFeature = featureArray[tempFeatureIndex];
            if (tempFeature) {
                tempGeometry = tempFeature.getGeometry();
                if (tempGeometry) {
                    geometries.push(tempGeometry);
                }
            }
        }

        return geometries;
    }

    /**
     * 设置属性
     * @param {*} features 
     * @param {*} propertyKey 
     * @param {*} propertyValue 
     */
    static setProperty(features, propertyKey, propertyValue) {

        let tempFeature = null;
        for (let tempFeatureIndex = 0; tempFeatureIndex < features.length; tempFeatureIndex++) {
            tempFeature = features[tempFeatureIndex];
            if (tempFeature) {
                tempFeature.set(propertyKey, propertyValue);
            }
        }

    }



}

export class FeatureStatistics {
    constructor() {
        this.maxValue = -1.0;
        this.minValue = -1.0;


    }



}



/**
 * 分级要素
 */
export class FeatureClassBreak {
    constructor() {
        this.breakIndex = -1;
        this.startValue = -1.0;
        this.endValue = -1.0;
        this.features = new Array();
    }

    setFeatureStyle(olStyle) {
        if (!olStyle || !this.features) return;

        let tempFeat = null;
        for (let tempFeatIndex = 0; tempFeatIndex < this.features.length; tempFeatIndex++) {
            tempFeat = this.features[tempFeatIndex];
            if (tempFeat) {
                tempFeat.setStyle(olStyle);
            }
        }
    }



    /**
     * 是否包含输入值
     * @param {*} importValue 
     */
    isContainValue(importValue) {
        let isContain = false;

        let isNumber = NumberUtility.isNumber(importValue);
        if (!isNumber) return isContain;

        let importFloat = parseFloat(importValue);
        if (importFloat >= this.startValue && importFloat <= this.endValue) {
            isContain = true;
        }

        return isContain;
    }

}

export class FeatureClassBreaks extends CustomArray {
    constructor() {
        super();
    }

    /**
     * 通过输入值查找
     * @param {*} importValue 
     */
    findByValue(importValue) {
        let findItem = null;


        let tempItem = null;
        let containStatus = false;
        for (let tempIndex = 0; tempIndex < this.objects.length; tempIndex++) {
            tempItem = this.objects[tempIndex];
            containStatus = tempItem.isContainValue(importValue);
            if (containStatus) {
                findItem = tempItem;
                break;
            }
        }

        return findItem;
    }



    /**
     * 对要素进行分级
     * @param {*} features  待分级的要素数组
     * @param {*} fieldName 要素字段名称
     * @param {*} classBreaks 分级段 
     */
    classify(features, fieldName) {

        if (!features || !fieldName) return;

        let tempFeat = null;
        let tempFeatValue = -1.0;
        let tempFindItem = null;
        for (let tempFeatIndex in features) {
            tempFeat = features[tempFeatIndex];
            if (!tempFeat) continue;
            tempFeatValue = tempFeat.get(fieldName);
            tempFindItem = this.findByValue(tempFeatValue);
            if (tempFindItem) {
                tempFindItem.features.push(tempFeat);
            }
        }
    }





}