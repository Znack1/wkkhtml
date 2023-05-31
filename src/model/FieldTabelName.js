/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-13 08:38:34
 * @LastEditTime: 2021-10-27 19:27:40
 * @LastEditors: zkc
 */
import {
    CustomArray
} from "../utility/common/CustomArray";
import { FieldItems } from "./FieldItemJs";
import { MetaDataInfo } from "./MetaDataInfo";

import { Http } from "../utility/common/HttpUtility"
var httpU = new Http()
export class FieldTableName {
    
    constructor() {
        this.identifier = null;
        this.name = null;
        this.storeName = null;
        this.fields = null;
        this.dataSourceId = null;
        this.id = null;
        this.metaDataInfo = null;
        this.type = null;
    }

    static fromJson(jsonObject) {
        let fieldTableName = null;
        if (!jsonObject) return fieldTableName;

        fieldTableName = new FieldTableName();
        fieldTableName.identifier = jsonObject.identifier;
        fieldTableName.name = jsonObject.name;
        fieldTableName.storeName = jsonObject.storeName;
        fieldTableName.dataSourceId = jsonObject.dataSourceId;
        fieldTableName.id = jsonObject.id;
        fieldTableName.type = jsonObject.type;
        if (jsonObject.fields) {
            fieldTableName.fields = FieldItems.fromJsons(jsonObject.fields);
        }

        if (jsonObject.metaDataInfo) {
            fieldTableName.metaDataInfo = MetaDataInfo.fromJson(jsonObject.metaDataInfo);
        }

        return fieldTableName;
    }
}





export class FieldTableNames extends CustomArray {
    constructor() {
        super();
    }

    findIndexById(layerId) {

        let findIndex = -1;

        let tempItem = null;
        for (let tempIndex = 0; tempIndex < this.objects.length; tempIndex++) {
            tempItem = this.objects[tempIndex];
            if (!tempItem) continue;

            if (tempItem.id === layerId) {
                findIndex = tempIndex;
                break;
            }
        }

        return findIndex;
    }

    findByName(layerName) {
        let findItem = null;

        let tempItem = null;
        for (let tempIndex = 0; tempIndex < this.objects.length; tempIndex++) {
            tempItem = this.objects[tempIndex];
            if (!tempItem || !tempItem.name) continue;

            if (tempItem.name.toLowerCase() === layerName.toLowerCase()) {
                findItem = tempItem;
                break;
            }
        }

        return findItem;
    }

    findById(layerId) {
        let findItem = null;

        let tempItem = null;
        for (let tempIndex = 0; tempIndex < this.objects.length; tempIndex++) {
            tempItem = this.objects[tempIndex];
            if (tempItem.id === layerId) {
                findItem = tempItem;
                break;
            }
        }

        return findItem;
    }


    /**
     * 通过筛选条件查询
     * @param {*} succeedCallback 
     * @param {*} errorCallback 
     */
    static async selectByFilter(url, succeedCallback, errorCallback) {
        try {
            let response = await httpU.get(url);
            var responseResult = null;
            if (response != null && response.data) {
                responseResult = response.data.data;
            }
            if (succeedCallback) {
                succeedCallback(responseResult);
            }
        } catch (error) {
            if (errorCallback) {
                errorCallback(error);
            }
        }
    }



    static fromJsons(jsonObjects) {
        let fieldTableNames = new FieldTableNames();
        if (!jsonObjects) return fieldTableNames;

        let tempJsonItem = null;
        let tempTableNameItem = null;
        for (let tempIndex = 0; tempIndex < jsonObjects.length; tempIndex++) {
            tempJsonItem = jsonObjects[tempIndex];

            tempTableNameItem = FieldTableName.fromJson(tempJsonItem);

            if (!tempTableNameItem) continue;

            fieldTableNames.push(tempTableNameItem);
        }

        return fieldTableNames;
    }

}

FieldTableNames.fieldTableNames = null;

/**
 * 字段表名称
 */
export class FieldTableNameFilter {
    constructor() {
        this.useId = false;
    }
}