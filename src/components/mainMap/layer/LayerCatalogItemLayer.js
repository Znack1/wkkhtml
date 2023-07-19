import { LayerCatalogItemType, LayerCatalogItem } from "../../../model/LayerCatalogItem";
import { OLLayerUtility } from "../../../utility/ol/OLLayerUtility";
import { WMTSLayerUtility } from "../../../utility/ol/WMTSLayerUtilityJs";


/*
 * @Author: your name
 * @Date: 2020-03-05 17:39:41
 * @LastEditTime: 2023-07-13 10:43:55
 * @LastEditors: zkc
 * @Description: In User Settings Edit
 * @FilePath: /html/src/components/mainMap/layer/LayerCatalogItemLayer.js
 */
export class LayerCatalogItemLayer {

    constructor() {
        this.curMap = null;
    }

    /**
     * 添加图层
     * @param {*} layerItem 
     */
    addLayer(layerItem) {

        if (!layerItem || !layerItem.type) return;
        if (!layerItem.selectedOLLayer && layerItem.type === LayerCatalogItemType.vectorTile) {
            layerItem.createSelectedOLLayer(this.curMap)
        }

        if (layerItem.olLayers && layerItem.olLayers.length > 0) {

            layerItem.setLayersVisible(layerItem.defaultVisible);
            // remove移除图层
            // layerItem.removeLayers(this.curMap);


            //如果可见，将该图层在最前面显示
            if (layerItem.defaultVisible) {

                var layerArray = this.curMap.getLayers();
                if (layerItem.type !== LayerCatalogItemType.custom && layerItem.type !== LayerCatalogItemType.wmts && layerItem.type !== LayerCatalogItemType.spatiadata) {
                    //重置切片url功能
                    layerItem.resetTileUrlFunction();
                }
                let olVtLayers = layerItem.olLayers;

                let olVtLayer = null;

                //添加图层
                for (let tempAddIndex = 0; tempAddIndex < olVtLayers.length; tempAddIndex++) {
                    olVtLayer = olVtLayers[tempAddIndex];
                    if (!olVtLayer) continue;
                    // //设置排序属性项
                    if (layerItem.sort) {
                        olVtLayer.set(LayerCatalogItem.sortFieldName, layerItem.sort);
                    }
                    layerArray.insertAt(layerArray.getArray().length, olVtLayer);
                }

                this.curMap.renderSync();


            }
        } else {
            // else代码没意义
            if (layerItem.type === LayerCatalogItemType.vectorTile) {

                let olVtLayers = layerItem.olLayers;

                let olVtLayer = null;
                for (let tempIndex = 0; tempIndex < olVtLayers.length; tempIndex++) {
                    
                    olVtLayer = olVtLayers[tempIndex];
                    // //设置排序属性项
                    if (layerItem.sort) {
                        olVtLayer.set(LayerCatalogItem.sortFieldName, layerItem.sort);
                    }
                    //追加到最后
                    this.curMap.addLayer(olVtLayer, true);
                }



            } else if (layerItem.type === LayerCatalogItemType.wfs) {


            } else if (layerItem.type === LayerCatalogItemType.wmts) {
                
                let wmtsUtility = new WMTSLayerUtility();
                wmtsUtility.epsg = layerItem.epsg;
                wmtsUtility.formatName = layerItem.formatName;
                wmtsUtility.matrixSetName = layerItem.matrixSetName;
                wmtsUtility.serviceName = layerItem.serviceName;
                wmtsUtility.tileGridExtent = layerItem.tileGridExtent;
                wmtsUtility.tileGridMatrixIds = layerItem.tileGridMatrixIds;
                wmtsUtility.tileGridOrigin = layerItem.tileGridOrigin;
                wmtsUtility.tileGridResolutions = layerItem.tileGridResolutions;
                wmtsUtility.tileSize = layerItem.tileSize;
                wmtsUtility.wmtsUrl = layerItem.wmtsUrl;
                wmtsUtility.token = layerItem.token;

                let wmtsOlVtLayer = wmtsUtility.createWmtsLayer();

                wmtsOlVtLayer.setOpacity(layerItem.opacity);
                wmtsOlVtLayer.setVisible(layerItem.defaultVisible);
                if (layerItem.sort) {
                    wmtsOlVtLayer.set(LayerCatalogItem.sortFieldName, layerItem.sort);
                }
                layerItem.olLayer = wmtsOlVtLayer;

                layerItem.olLayers = new Array();
                layerItem.olLayers.push(layerItem.olLayer);

                //追加到最后
                this.curMap.addLayer(wmtsOlVtLayer, true);
            }
        }

        let allLayers = this.curMap.getLayers();
        OLLayerUtility.ascLayer(allLayers, LayerCatalogItem.sortFieldName);

        // //如果图层可见，初始化级别和中心点
        // if (layerItem.olLayer && layerItem.defaultVisible) {
        //     this.curMap.getView().setZoom( BaseLayerConfig.map_view_init_initLevel);
        //     this.curMap.getView().setCenter(BaseLayerConfig.map_view_init_centerPoint);
        // }

    }




   

}