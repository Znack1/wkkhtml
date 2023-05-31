import {
    LayerCatalogItemType,
    LayerCatalogItem
} from './LayerCatalogItem'

/*
 * @Descripttion: 
 * @version: 
 * @Author: zkc
 * @Date: 2020-03-28 09:15:57
 * @LastEditors: wutt
 * @LastEditTime: 2021-09-30 10:36:58
 */
export class ControlLayerCatalogItem {

    constructor() {
        this.filterType = null; //数据源类型  
        this.vectorTileLayerItem = null; //矢量切片服务数据项
        this.wmtsLayerItem = null; //wmts服务数据项
        this.wmsLayerItem = null; // wms服务数据
    }

    /**
     * 创建controlLayerCatalogItem对象
     * @param{*} spatialFileData  数据源
     */
    static createControlItem(layerItem) {

        let controlItem = null;
        if (!layerItem) return controlItem;

        controlItem = new ControlLayerCatalogItem();
        controlItem.filterType = layerItem.type;
        // 判断当前类型
        switch (layerItem.type) {
            case LayerCatalogItemType.vectorTile:
                controlItem.vectorTileLayerItem = layerItem.getRequestVectorLayer();
                break;
            case LayerCatalogItemType.wmts:
                controlItem.wmtsLayerItem = layerItem.getRequestWmtsLayer();
                break;
            case LayerCatalogItemType.wms:
                controlItem.wmsLayerItem = layerItem.getRequestWmsLayer();
                break;
        }

        return controlItem;
    }

    // 通过类型获取layerItem对象
    getLayerItemByType() {
        let layerItem = new LayerCatalogItem();
        switch (this.filterType) {
            case LayerCatalogItemType.vectorTile:
                layerItem = this.vectorTileLayerItem;
                break;
            case LayerCatalogItemType.wmts:
                layerItem = this.wmtsLayerItem;
                break;
        }
        return layerItem;

    }
}

export class ControlLayerCatalogItemFilter {

    constructor() {
        this.filterType = null; //数据源类型  

        this.catalogItemFilter = null;
        this.vtLayerFilter = null;
        this.wmtsLayerFilter = null;
        this.wfsLayerFilter = null;
    }

    /**
     * creatControlLayerCatalogItemFilter
     * @param{*} filter  数据源
     * @param{*} type  layerItem 类型
     */
    static creatControlLayerCatalogItemFilter(filter, type) {
        
        let controlLayerCatalogItemFilter = null;
        if (!filter && !type) return controlLayerCatalogItemFilter;

        controlLayerCatalogItemFilter = new ControlLayerCatalogItemFilter();
        controlLayerCatalogItemFilter.filterType = type;
        // 判断当前类型
        switch (type) {
            case LayerCatalogItemType.vectorTile:
                controlLayerCatalogItemFilter.vtLayerFilter = filter;
                break;
            case LayerCatalogItemType.wmts:
                controlLayerCatalogItemFilter.wmtsLayerFilter = filter;
                break;
            case LayerCatalogItemType.wfs:
                controlLayerCatalogItemFilter.wfsLayerFilter = filter;
                break;
            case LayerCatalogItemType.wms:
                controlLayerCatalogItemFilter.wmsLayerFilter = filter;
                break;
            default:
                controlLayerCatalogItemFilter.vtservice = filter;
                break;
        }

        return controlLayerCatalogItemFilter;
    }

}