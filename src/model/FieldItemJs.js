/*
 * @Author: your name
 * @Date: 2020-03-08 10:24:32
 * @LastEditTime: 2022-11-18 15:01:23
 * @LastEditors: zkc
 * @Description: In User Settings Edit
 * @FilePath: \html\src\model\FieldItemJs.js
 */

import { CustomArray } from "../utility/common/CustomArray.js";

export class FieldItem {
    constructor() {
        this.name = null;
        this.aliasName = null;
        this.index = -1;
        this.type = null;
        this.length = -1;
        this.allowEmpty = false;
        this.defaultValue = null;
        this.key = false;

    }

    static fromJson(jsonObject) {
        let item = null; //
        if (!jsonObject) return item;

        item = new FieldItem();

        item.name = jsonObject.name;
        item.aliasName = jsonObject.aliasName;
        item.index = jsonObject.index;
        item.type = jsonObject.type;
        item.length = jsonObject.length;
        item.allowEmpty = jsonObject.allowEmpty;
        item.defaultValue = jsonObject.defaultValue;
        item.key = jsonObject.key;

        return item;
    }

}

export class FieldItems extends CustomArray {
    constructor() {
        super();
    }

    findIndexByName(fieldName) {
        let findIndex = -1;

        let tempItem = null;
        for (let tempIndex = 0; tempIndex < this.objects.length; tempIndex++) {
            tempItem = this.objects[tempIndex];
            if (!tempItem || !tempItem.name) continue;

            if (tempItem.name.toLowerCase() === fieldName.toLowerCase()) {
                findIndex = tempIndex;
                break;
            }
        }

        return findIndex;
    }


    findByName(fieldName) {
        let findItem = null;

        let tempItem = null;
        for (let tempIndex = 0; tempIndex < this.objects.length; tempIndex++) {
            tempItem = this.objects[tempIndex];
            if (!tempItem || !tempItem.name) continue;

            if (tempItem.name.toLowerCase() === fieldName.toLowerCase()) {
                findItem = tempItem;
                break;
            }
        }

        return findItem;
    }
    findIndexByFieldIndex(fieldIndex) {
        let index = null;
        if (!fieldIndex) return index;

        let tempItem = null;
        for (let tempIndex = 0; tempIndex < this.objects.length; tempIndex++) {
            tempItem = this.objects[tempIndex];
            if (tempItem.index === fieldIndex) {
                index = tempIndex;
                break;
            }
        }

        return index;


    }

    delete(fieldName) {
        if (!fieldName) return;

        let findIndex = this.findIndexByName(fieldName);
        if (findIndex >= 0) {
            this.objects.splice(findIndex, 1);
        }
    }

    updateItem(fieldItem) {
        if (!fieldItem) return;

        let findIndex = this.findIndexByName(fieldItem.name);

        this.objects[findIndex] = fieldItem;
    }

    static fromJsons(jsonObjects) {
        let items = new FieldItems();
        if (!jsonObjects) return items;

        let tempJsonObject = null;
        let tempItem = null;
        for (let jsonIndex = 0; jsonIndex < jsonObjects.length; jsonIndex++) {
            tempJsonObject = jsonObjects[jsonIndex];
            tempItem = FieldItem.fromJson(tempJsonObject);
            if (tempItem) {
                items.push(tempItem);
            }
        }

        return items;
    }

}