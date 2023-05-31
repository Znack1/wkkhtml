import {
    CustomArray
} from "../utility/common/CustomArray";
import qs from 'qs';
import {
    GuidUtility
} from "../utility/common/GuidUtility";
import {
    LayerCatalogItems
} from "./LayerCatalogItem";

import { Http } from "../utility/common/HttpUtility"
var httpU = new Http()
/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-13 08:38:53
 * @LastEditTime: 2020-08-13 22:03:16
 * @LastEditors: Please set LastEditors
 */
export class LayerCatalogGroup {
    constructor() {
        this.id = GuidUtility.getGuid();
        this.name = null;
        this.parentId = null;
        this.description = null;
        this.type = null;
        this.layerItems = new LayerCatalogItems();
        this.visible = null; // 是否在菜单中显示
        this.tag = null; // 是否在地图上默认显示
        this.children = new LayerCatalogGroups();

    }

    basicCopy () {
        let groupCopy = new LayerCatalogGroup();
        groupCopy.id = this.id;
        groupCopy.name = this.name;
        groupCopy.type = this.type;
        groupCopy.parentId = this.parentId;
        groupCopy.description = this.description;

        return groupCopy;
    }

    updateBasicInfo (updateGroup) {
        this.id = updateGroup.id;
        this.name = updateGroup.name;
        this.type = updateGroup.type;
        this.description = updateGroup.updateGroup;
        this.parentId = updateGroup.parentId;
    }

    getRequestObject () {
        let group = new LayerCatalogGroup();
        group.id = this.id;
        group.name = this.name;
        group.parentId = this.parentId;
        group.description = this.description;
        group.type = this.type;
        group.children = null;
        group.layerItems = null;
        return group;
    }
    /**
     * 新增
     * @param {*} succeedCallback 
     * @param {*} errorCallback 
     */
    async save (url, succeedCallback, errorCallback) {
        try {
            let response = await httpU.post(url, this);
            var responseResult = null;
            if (response != null) {
                responseResult = response.data;
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

    /**
     * 更新
     * @param {*} succeedCallback 
     * @param {*} errorCallback 
     */
    async update (url, succeedCallback, errorCallback) {
        try {
            let response = await httpU.put(url, this);
            var responseResult = null;
            if (response != null) {
                responseResult = response.data;
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

    getLayerItemByName (name) {
        let layerItem = null;
        if (this.layerItems && this.layerItems.objects && this.layerItems.objects.length > 0) {
            for (let i = 0; i < this.layerItems.objects.length; i++) {
                layerItem = this.layerItems.objects[i];
                if (layerItem.sourceName == name) {
                    return layerItem;
                }
            }
        };

        if (this.layerItems && this.children.objects && this.children.objects.length > 0) {
            for (let i = 0; i < this.children.objects.length; i++) {
                let group = this.children.objects[i];
                layerItem = group.getLayerItemByName(name);
                if (layerItem) return layerItem;
            }
        }
    }

    // 解析组目录下的叶子节点
    static fromJson (jsonObject) {
        let group = null;
        if (!jsonObject) return group;

        group = new LayerCatalogGroup();
        group.id = jsonObject.id;
        group.name = jsonObject.name;
        group.description = jsonObject.description;
        group.parentId = jsonObject.parentId;
        group.type = jsonObject.type;
        group.layerItems = LayerCatalogItems.fromJsons(jsonObject.layerItems);
        group.children = LayerCatalogGroups.fromJsons(jsonObject.children);
        group.visible = (jsonObject.visible == "true" ? true : false); // 是否在菜单中显示
        group.tag = (jsonObject.tag == "true" ? true : false); // 是否在地图上默认显示
        if (jsonObject.sort) {
            group.sort = parseFloat(jsonObject.sort);
        }
        return group;
    }

    // 解析组目录下的叶子节点
    static fromJsonEx (jsonObject) {
        let group = null;
        if (!jsonObject) return group;

        group = new LayerCatalogGroup();
        group.id = jsonObject.id;
        group.name = jsonObject.name;
        group.description = jsonObject.description;
        group.parentId = jsonObject.parentId;
        group.type = jsonObject.type;
        group.layerItems = LayerCatalogItems.fromJsons(jsonObject.layers);
        group.children = LayerCatalogGroups.fromJsonsEx(jsonObject.children);
        return group;
    }

    static createUserGroup () {
        let userGroup = new LayerCatalogGroup();

        userGroup.id = GuidUtility.getGuid();
        userGroup.name = LayerCatalogGroup.userGroupName;
        userGroup.parentId = null;
        userGroup.description = LayerCatalogGroup.userGroupName;
        userGroup.subjects = new LayerCatalogItems();
        userGroup.children = new LayerCatalogGroups();


        return userGroup;
    }
}
LayerCatalogGroup.userGroupName = "用户图层";


export class LayerCatalogGroups extends CustomArray {
    constructor() {
        super();
    }


    /**
     * 通过图层项查找
     * @param {*} layerItemSourceName 
     */
    findLayerItemBySourceName (layerItemSourceName) {
        let layerItem = null;

        let tempGroup = null;
        let tempChildren = null;
        let tempLayerItem = null;
        for (let tempIndex = 0; tempIndex < this.objects.length; tempIndex++) {
            tempGroup = this.objects[tempIndex];
            if (!tempGroup) continue;
            if (tempGroup.layerItems && tempGroup.layerItems.length > 0) {
                tempLayerItem = tempGroup.layerItems.findBysourceName(layerItemSourceName);
                if (tempLayerItem) {
                    layerItem = tempLayerItem;
                    break;
                }
            }

            tempChildren = tempGroup.children;
            if (tempChildren) {
                tempLayerItem = tempChildren.findLayerItemBySourceName(layerItemSourceName);
                if (tempLayerItem) {
                    layerItem = tempLayerItem;
                    break;
                }
            }
        }

        return layerItem;
    }



    findByName (name) {
        let findItem = null;

        let tempItem = null;
        for (let tempIndex = 0; tempIndex < this.objects.length; tempIndex++) {
            tempItem = this.objects[tempIndex];
            if (tempItem.name === name) {
                findItem = tempItem;
                break;
            }
        }

        return findItem;
    }


    findIndexById (id) {
        let findIndex = -1;
        if (!id) return findIndex;


        let tempItem = null;
        for (let tempIndex = 0; tempIndex < this.objects.length; tempIndex++) {
            tempItem = this.objects[tempIndex];
            if (tempItem.id === id) {
                findIndex = tempIndex;
                break;
            }
        }

        return findIndex;
    }

    /**
   * 通过图层项id查找第一级数组
   * @param {*} layerItemSourceName 
   */
    findGroupByChildId (id) {
        let layerGroup = null;

        let tempGroup = null;
        let tempChildren = null;
        let tempLayerItem = null;
        for (let tempIndex = 0; tempIndex < this.objects.length; tempIndex++) {
            tempGroup = this.objects[tempIndex];
            if (!tempGroup) continue;
            if (tempGroup.layerItems && tempGroup.layerItems.length > 0) {
                tempLayerItem = tempGroup.layerItems.findById(id);
                if (tempLayerItem) {
                    return tempGroup;
                    break;
                }
            }

            tempChildren = tempGroup.children;
            if (tempChildren) {
               let groups = tempChildren.findGroupByChildId(id);
                if (groups) {
                    layerGroup = tempGroup;
                    break;
                }
            }
        }

        return layerGroup;
    }



    findIndexByName (name) {
        let findIndex = -1;
        if (!name) return findIndex;


        let tempItem = null;
        for (let tempIndex = 0; tempIndex < this.objects.length; tempIndex++) {
            tempItem = this.objects[tempIndex];
            if (tempItem.name === name) {
                findIndex = tempIndex;
                break;
            }
        }

        return findIndex;
    }

    /**
     * 通过筛选条件查询 某几个组
     * @param {*} filter 
     * @param {*} succeedCallback 
     * @param {*} errorCallback 
     */
    static async selectByFilter (filter, url, succeedCallback, errorCallback) {
        try{
            let response = await httpU.post(url, filter);
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


    /**
     * 删除多个
     * @param {*} idArray 
     * @param {*} url
     * @param {*} succeedCallback 
     * @param {*} errorCallback 
     */
    static async deleteMulti (idArray, url, succeedCallback, errorCallback) {
        // params = idArray.join(",")
        try {
            let response = await httpU.get(url, { ids: idArray.join(",") });
            var responseResult = null;
            if (response != null && response.data) {
                responseResult = response.data;
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

    /**
   * 获取树结构数据
   * @param {*} succeedCallback 
   * @param {*} errorCallback 
   */
    static async getLayerCatalog (url, succeedCallback, errorCallback) {
        try {
            let response = await httpU.post(url);
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


    static fromJsons (jsonObjects) {
        let groups = new LayerCatalogGroups();
        if (!jsonObjects) return groups;

        let tempJsonItem = null;
        let tempGroupItem = null;
        for (let tempIndex = 0; tempIndex < jsonObjects.length; tempIndex++) {
            tempJsonItem = jsonObjects[tempIndex];
            tempGroupItem = LayerCatalogGroup.fromJson(tempJsonItem);
            if (!tempGroupItem) continue;

            groups.push(tempGroupItem);
        }

        return groups;
    }

    static fromJsonsEx (jsonObjects) {
        let groups = new LayerCatalogGroups();
        if (!jsonObjects) return groups;

        let tempJsonItem = null;
        let tempGroupItem = null;
        for (let tempIndex = 0; tempIndex < jsonObjects.length; tempIndex++) {
            tempJsonItem = jsonObjects[tempIndex];
            tempGroupItem = LayerCatalogGroup.fromJsonEx(tempJsonItem);
            if (!tempGroupItem) continue;

            groups.push(tempGroupItem);
        }

        return groups;
    }

    getLayerItemByName (name) {
        let layerItem = null;
        for (let i = 0; i < this.objects.length; i++) {
            let object = this.objects[i];
            layerItem = object.getLayerItemByName(name)
            if (layerItem) return layerItem;
        }
        return layerItem;
    }


    /**
     * 获取所有的layeritems
     */
    getLayerCatalogItems () {
        let layerItems = new LayerCatalogItems();
        _.each(this.objects, (object) => {
            layerItems.objects = layerItems.objects.concat(object.layerItems.objects);
            if (object.children && object.children.objects && object.children.objects.length > 0) {
                let items = object.children.getLayerCatalogItems();
                layerItems.objects = layerItems.objects.concat(items.layerItems.objects);
            }
        })

        return layerItems;
    }


}

/**
 * 图层组筛选条件
 */
export class LayerCatalogGroupFilter {
    constructor() {
        this.useId = false;
        this.id = null;
        this.useParentId = false;
        this.parentId = null;
        this.useIds = false;
        this.ids = null;

        this.useFuzzyName = false;
        this.fuzzyName = null;

        this.useName = false;
        this.name = null;

        this.useLayerItemFilters = false;
        this.layerItemFilters = null;

        this.usePagination = false;
        this.paginationStart = 0;
        this.paginationCount = 10;
    }
}

//图层目录组
LayerCatalogGroups.groups = new LayerCatalogGroups();