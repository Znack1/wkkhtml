/*
 * @Author: wutt
 * @Date: 2021-07-05 14:31:24
 * @LastEditors: wutt
 * @LastEditTime: 2021-07-05 15:37:53
 * @Description: 
 * @FilePath: /fmmodulelib/packages/model/TagItemJS.js
 */
/*
 * @Author: your name
 * @Date: 2020-03-08 10:24:32
 * @LastEditTime: 2020-08-04 19:42:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \html\src\model\FieldItemJs.js
 */

import { CustomArray } from "../utility/common/CustomArray.js";

export class TagItem {
    constructor() {
        this.name = null;
        this.value = null;
        this.description =null;      
    }

    static fromJson(jsonObject) {
        let item = null; //
        if (!jsonObject) return item;

        item = new TagItem();

        item.name = jsonObject.name;
        item.value = jsonObject.value;
        item.description = jsonObject.description;       
        return item;
    }

}

export class TagItems extends CustomArray {
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
        let items = new TagItems();
        if (!jsonObjects) return items;

        let tempJsonObject = null;
        let tempItem = null;
        for (let jsonIndex = 0; jsonIndex < jsonObjects.length; jsonIndex++) {
            tempJsonObject = jsonObjects[jsonIndex];
            tempItem = TagItem.fromJson(tempJsonObject);
            if (tempItem) {
                items.push(tempItem);
            }
        }

        return items;
    }

}