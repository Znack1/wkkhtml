/*
 * @Author: your name
 * @Date: 2020-08-10 09:41:03
 * @LastEditTime: 2020-09-17 09:27:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \gngtgh\src\model\RendererSettingItem.js
 */

import {
    CustomArray
} from "../utility/common/CustomArray";
import _ from "lodash"

export class RendererSettingItem {
    constructor() {
        this.minLevel = null;
        this.maxLevel = null;
        this.rendererType = null;
        this.range = null;
        this.typeLabel = null;
    }

    static fromJson(jsonObject) {
        let item = null;
        if (!jsonObject) return item;

        item = new RendererSettingItem();
        item.minLevel = parseFloat(jsonObject.minLevel);
        item.maxLevel = parseFloat(jsonObject.maxLevel);
        item.rendererType = jsonObject.rendererType;
        item.range = jsonObject.minLevel + "~" + jsonObject.maxLevel;
        item.typeLabel = item.getNameByType();

        return item;
    }

    getNameByType() {
        let name = null;
        let item = _.find(RendereConfig.RendererTypesLables, { "value": this.rendererType });
        if (item) {
            name = item.name;
        }
        return name
    }

}

export class RendererSettingItems extends CustomArray {
    constructor() {
        super();
    }


    // 数组获取最大级别
    getMaxLevel() {
        let levels = _.map(this.objects, "maxLevel");
        let maxLevel = _.max(levels);
        if (!maxLevel) {
            maxLevel = 20;
        }
        return maxLevel;
    }

    // 数组获取最小级别
    getMinLevel() {
        let levels = _.map(this.objects, "minLevel");
        let minLevel = _.max(levels);
        if (!minLevel) {
            minLevel = 20;
        }
        return minLevel;
    }
    
    findByLevel(level)
    {   
        let settingItem=null;

        if(level <0)return settingItem;

        let tempItem=null;
        for(let tempIndex=0;tempIndex<this.objects.length;tempIndex++)
        {   
            tempItem=this.objects[tempIndex];
            if(!tempItem)continue;

            if(tempItem.maxLevel>=level && level>=tempItem.minLevel)
            {   
                settingItem=tempItem;
                break;
            }
        }
        
        return settingItem;
    }



    findByRendererType(type) {
        let items = new RendererSettingItems();

        let tempItem = null;
        for (let tempIndex = 0; tempIndex < this.objects.length; tempIndex++) {
            tempItem = this.objects[tempIndex];
            if (!tempItem) continue;
            if (tempItem.rendererType == type) {
                items.push(tempItem);
            }
        }

        return items;
    }


    //

    static fromJsons(jsonObjects) {
        let items = new RendererSettingItems();
        if (!jsonObjects) return items;

        let tempJsonObject = null;
        let tempItem = null;
        for (let jsonIndex = 0; jsonIndex < jsonObjects.length; jsonIndex++) {
            tempJsonObject = jsonObjects[jsonIndex];
            tempItem = RendererSettingItem.fromJson(tempJsonObject);
            if (tempItem) {
                items.push(tempItem);
            }
        }

        return items;
    }

}

export const RendereConfig = {
    renderer_type_vectorTile: 'vectorTile',
    renderer_type_wmts: 'wmts',
    RendererTypesLables: [{
            'name': '矢量切片',
            'value': 'vectorTile'
        },
        {
            'name': '图片',
            'value': 'wmts'
        }
    ],
    defaultRendere: [{
        "minLevel": 0,
        "maxLevel": 20,
        "range": "0~20",
        "rendererType": "vectorTile"
    }]
}