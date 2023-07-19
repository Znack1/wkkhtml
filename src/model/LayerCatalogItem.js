import {
    GuidUtility
} from "../utility/common/GuidUtility";
import {
    CustomArray
} from "../utility/common/CustomArray";
import {
    FieldItems
} from "./FieldItemJs";
import qs from 'qs';
import { RendererSettingItems, RendereConfig } from "./RendererSettingItem";
import { ArrayUtility } from "../utility/common/ArrayUtility";
import { VectorTileUtility } from "../utility/ol/VectorTileUtility.js";
import { OLLayerUtility } from "../utility/ol/OLLayerUtility.js";
import { MapboxStyleJsonRenderer } from "../utility/ol/MapboxStyleJsonRenderer.js";
import { WMTSLayerUtility } from "../utility/ol/WMTSLayerUtilityJs.js";
import { WMSLayerUtility } from "../utility/ol/WMSLayerUtilityJs"
import { Http } from "../utility/common/HttpUtility"
import { TurfUtility } from "../utility/ol/TurfUtility";
import { VectorTileFeatureUtility } from "../utility/ol/VectorTileFeatureUtility";
import _ from 'lodash'
import { TagItems } from "./TagItemJS";
var httpU = new Http();
/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-13 08:38:34
 * @LastEditTime: 2020-09-22 12:37:42
 * @LastEditors: Please set LastEditors
 */
export class LayerCatalogItem {


    constructor() {
        this.id = GuidUtility.getGuid();
        this.name = null;
        this.description = null;
        this.groupId = null;
        this.groupName = null;
        this.type = null;

        this.defaultVisible = true;

        this.token = null; // 认证token

        this.opacity = 1.0;

        //openlayers图层
        this.olLayer = null;

        // ol图层集合
        this.olLayers = null;

        //初始化级别
        this.initLevel = 6;

        //默认最小级别
        this.visibleMinLevel = 0;
        //默认最大级别
        this.visibleMaxLevel = 22;
        //初始化中心点
        this.initCenterPoint = [95.3613237, 38.22402];
        // 范围 
        this.extent = null;
        // 导入数据
        this.importData = null;
        this.sort = null;

        //展示的字段
        this.showFields = new FieldItems();
        // 扩展字段---后台以字符串的形式存储  所以 获取或者存储时都进行一下转换
        this.tag = new TagItems();

        this.tilematrixSuffix = null;

    }

    removeLayers (curMap) {

        if (!curMap) return;

        if (!this.olLayers || this.olLayers.length == 0) return;


        let layerArray = curMap.getLayers();

        let olVtLayer = null;
        let findItem = null;
        for (let tempIndex = 0; tempIndex < this.olLayers.length; tempIndex++) {
            olVtLayer = this.olLayers[tempIndex];
            if (!olVtLayer) continue;
            findItem = OLLayerUtility.findByUID(layerArray.getArray(), olVtLayer.ol_uid);
            if (findItem) {

                if (olVtLayer instanceof ol.layer.VectorTile) {


                    // let fun= olVtLayer.getSource().getTileLoadFunction();



                    //重新设置切片urlfunction，不请求任何切片
                    olVtLayer.getSource().setTileUrlFunction(null);
                    olVtLayer.getSource().setTileUrlFunction(function (tileMarker, pixelRatio, proj) {
                        return;
                    });


                };

                layerArray.remove(olVtLayer);
            }

        }
    }

    getOLExtent () {
        let olExtent = null;
        if (!this.extent) return olExtent;

        let extentCoords = this.extent.split(',');
        if (!extentCoords || extentCoords.length != 4) return olExtent;

        olExtent = new Array();
        olExtent.push(parseFloat(extentCoords[0]));
        olExtent.push(parseFloat(extentCoords[1]));
        olExtent.push(parseFloat(extentCoords[2]));
        olExtent.push(parseFloat(extentCoords[3]));

        return olExtent;
    }



    findOlLayer (layerType, resolution) {
        let findLayer = null;

        let olVtLayer = null;
        for (let tempIndex = 0; tempIndex < this.olLayers.length; tempIndex++) {
            olVtLayer = this.olLayers[tempIndex];
            if (!olVtLayer) continue;

            if (layerType === RendereConfig.renderer_type_wmts) {
                if (olVtLayer instanceof ol.layer.Tile) {
                    if (olVtLayer.getMaxResolution() >= resolution && resolution >= olVtLayer.getMinResolution()) {
                        findLayer = olVtLayer;
                        break;
                    }
                }
            } else if (layerType === RendereConfig.renderer_type_vectorTile) {
                if (olVtLayer instanceof ol.layer.VectorTile) {
                    if (olVtLayer.getMaxResolution() >= resolution && resolution >= olVtLayer.getMinResolution()) {
                        findLayer = olVtLayer;
                        break;
                    }
                }
            }
        }

        return findLayer;
    }


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

    async saveEx (url, controlItem, succeedCallback, errorCallback) {
        try {
            let response = await httpU.post(url, controlItem);
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

    async updateEx (url, controlItem, succeedCallback, errorCallback) {
        try {
            let response = await httpU.put(url, controlItem);
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
     * 从jsonobject对象中获取基类的基本信息
     * @param {*} layerItem 
     * @param {*} jsonObject 
     */
    static getBasicInfofromJson (layerItem, jsonObject) {

        if (!jsonObject) return layerItem;

        layerItem.id = jsonObject.id;
        layerItem.name = jsonObject.name;
        layerItem.description = jsonObject.description;
        layerItem.groupId = jsonObject.groupId;
        layerItem.groupName = jsonObject.groupName;
        layerItem.type = jsonObject.type;
        layerItem.token = jsonObject.token;
        layerItem.tilematrixSuffix = jsonObject.tilematrixSuffix;

        layerItem.sort = jsonObject.sort;
        //初始化级别
        layerItem.initLevel = jsonObject.initLevel;
        // 最小级别
        layerItem.visibleMinLevel = jsonObject.visibleMinLevel;
        //最大级别
        layerItem.visibleMaxLevel = jsonObject.visibleMaxLevel;

        layerItem.extent = jsonObject.extent;
        if (jsonObject.defaultVisible) {
            if (jsonObject.defaultVisible === true || jsonObject.defaultVisible === false) {
                layerItem.defaultVisible = true;
            } else {
                if (jsonObject.defaultVisible.toLowerCase().trim() == "false") {
                    layerItem.defaultVisible = false;
                } else {
                    layerItem.defaultVisible = true;
                }
            }

        } else {
            layerItem.defaultVisible = false;
        }

        layerItem.showFields = FieldItems.fromJsons(jsonObject.showFields);

        let fieldItems = FieldItems.fromJsons(jsonObject.showFields);
        if(fieldItems.objects){
            fieldItems.objects = _.sortBy(fieldItems.objects,(fieldItem)=>{
                return fieldItem.index;
            })
            layerItem.showFields = fieldItems
        }else{
            layerItem.showFields = new FieldItems(); 
        }

        layerItem.opacity = jsonObject.opacity;

        if (jsonObject.tag) {
            layerItem.tag = TagItems.fromJsons(JSON.parse(jsonObject.tag).objects);
        }

        return layerItem;
    }

    /**
     * 设置ollayer是否可见
     * @param {*} visibleStatus 
     */
    setLayersVisible (visibleStatus) {

        if (!this.olLayers || this.olLayers.length == 0) return;

        let olVtLayer = null;
        for (let tempIndex = 0; tempIndex < this.olLayers.length; tempIndex++) {
            olVtLayer = this.olLayers[tempIndex];
            if (!olVtLayer) continue;

            if (typeof (olVtLayer.setVisible) === 'function') {
                olVtLayer.setVisible(visibleStatus);
            }

        }
    }


    async getDetailInfoById (url, succeedCallback, errorCallback) {
        try {
            let response = await httpU.get(url, { "id": this.id });
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

}
LayerCatalogItem.sortFieldName = 'sort';

export class VectorTileLayerItem extends LayerCatalogItem {

    constructor() {
        super();


        this.serviceUrl = null;

        this.serviceName = null;

        this.serviceEPSG = null;

        this.styleJsonUrl = null;

        this.sourceName = null;

        this.renderParamsString = "featuremap"

        this.rendererSettings = new RendererSettingItems();

        this.styleJsonUrlContent = null;




        //选中图层
        this.selectedOLLayer = null;

        this.selectedFeatureIds = new Array();

        this.selectedStyle = null;
    }


    clearSelectedFeatures () {
        this.updateSelectedFeatures(new Array());
    }

    updateSelectedFeatures (featureIds) {
        this.selectedFeatureIds = featureIds;

        if (this.selectedOLLayer) {
            this.selectedOLLayer.changed();
        }
    }

    createOLLayers () {
        let vtUtility = new VectorTileUtility();
        // vtUtility.epsg = this.serviceEPSG || vtUtility.epsg;
        vtUtility.serviceName = this.serviceName;
        vtUtility.wmtsUrl = this.serviceUrl;
        vtUtility.tilematrixSuffix = this.tilematrixSuffix
        if (this.extent) {
            vtUtility.olExtent = this.getOLExtent();
        }

        if (this.rendererSettings) {

            vtUtility.imageLevelRanges = this.rendererSettings.findByRendererType('wmts').objects;
            vtUtility.vtLevelRanges = this.rendererSettings.findByRendererType('vectorTile').objects;
        }

        let olVtLayers = vtUtility.createLayers();

        this.olLayers = olVtLayers;

        let olVtLayer = null;
        for (let tempIndex = 0; tempIndex < this.olLayers.length; tempIndex++) {
            olVtLayer = this.olLayers[tempIndex];

            if (olVtLayer instanceof ol.layer.VectorTile) {

                //进行符号化渲染
                // if (olVtLayer && this.renderParamsString) {

                    // this.styleJsonUrlContent = null;
                    
                    if (this.styleJsonUrlContent) {

                        let mbsJson = new MapboxStyleJsonRenderer();
                        mbsJson.sourceLayerString = this.sourceName;
                        mbsJson.olVTLayer = olVtLayer;
                        // this.styleJsonUrlContent = this.styleJsonUrlContent.replace(/\t/g, "");
                        // this.styleJsonUrlContent = this.styleJsonUrlContent.replace(/\s*/g, "");
                        // this.styleJsonUrlContent = this.styleJsonUrlContent.replace(/'/g, '');
                        mbsJson.rendererEx(JSON.parse(this.styleJsonUrlContent));

                    } else if (this.styleJsonUrl) {
                        // debugger
                        // let mbsJson = new MapboxStyleJsonRenderer();
                        // mbsJson.sourceLayerString = this.sourceName;
                        // mbsJson.olVTLayer = olVtLayer;
                        // mbsJson.renderer(this.styleJsonUrl);


                    }
                    // let jsonToStyle = new EzJson2StyleMapbox(olVtLayer, this.styleJsonUrl, this.renderParamsString);
                // }
            }
        }

        //目录项采用默认样式
        // this.setDefaultStyleForOLLayer();

        //该段代码有问题，没有获取样式渲染后的样式function
        // let olVtLayer = null;
        // for (let tempIndex = 0; tempIndex < this.olLayers.length; tempIndex++) {
        //     olVtLayer = this.olLayers[tempIndex];
        //     if (!olVtLayer) continue;

        //     if (olVtLayer instanceof ol.layer.VectorTile) {
        //         this.curStyleFunction=olVtLayer.getStyleFunction();
        //         break;
        //     }
        // }


        // if (this.styleJsons && this.styleJsons.objects && this.styleJsons.objects.length > 0) {
        //     this.filterOLLayerEx(this.styleJsons.objects[0]);
        // } else {
        //     this.setDefaultStyleForOLLayer();
        // }

        return olVtLayers;
    }

    createSelectedOLLayer (curMap) {
        if (!this.olLayers || this.olLayers.length == 0) return;

        let olVtLayer = null;
        for (let tempIndex = 0; tempIndex < this.olLayers.length; tempIndex++) {
            olVtLayer = this.olLayers[tempIndex];

            if (olVtLayer instanceof ol.layer.VectorTile) {

                let selectedOLVtLayer = new ol.layer.VectorTile({
                    map: curMap,
                    renderMode: 'vector',
                    source: olVtLayer.getSource(),
                    style: this.selectedStyleFunction,
                });

                this.selectedOLLayer = selectedOLVtLayer;
            }
        }
    }


    /**
     * 设置ollayer是否可见
     * @param {*} visibleStatus 
     */
    setLayersVisible (visibleStatus) {

        if (!this.olLayers || this.olLayers.length == 0) return;

        let olVtLayer = null;
        for (let tempIndex = 0; tempIndex < this.olLayers.length; tempIndex++) {
            olVtLayer = this.olLayers[tempIndex];
            if (!olVtLayer) continue;

            if (typeof (olVtLayer.setVisible) === 'function') {
                olVtLayer.setVisible(visibleStatus);
            }

        }
    }



    selectedStyleFunction (feature) {
        if (!feature) return;
        let featureId = feature.getId();
        if (featureId == null || featureId == undefined) return;

        let layerName = null;
        let properties = feature.getProperties();
        if (properties && properties["layer"]) {
            layerName = properties["layer"];
        }

        if (!layerName) return;
        //通过图层名称查找到图层目录项
        let layerCatalogItem = LayerCatalogItems.visibleItems.findBysourceName(layerName);
        if (!layerCatalogItem || !layerCatalogItem.selectedFeatureIds) return;

        if (layerCatalogItem.selectedFeatureIds.indexOf(featureId) != -1) {
            if (!layerCatalogItem.selectedStyle) {
                let geometryType = feature.getGeometry().getType();

                layerCatalogItem.selectedStyle = layerCatalogItem.initSelectedStyleByGeometryType(geometryType);
            }

            return layerCatalogItem.selectedStyle;
        }
    }

    initSelectedStyle (featureType) {
        let selectedStyle = null;

        if (featureType === "Polygon") {
            selectedStyle = new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: 'red',
                    width: 4
                })
            });
        } else if (featureType === "Polyline") {
            selectedStyle = new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: 'red',
                    width: 4
                })
            });
        } else if (featureType === "Point") {
            selectedStyle = new ol.style.Style({

                image: new ol.style.Circle({
                    radius: 4,
                    fill: new ol.style.Fill({
                        color: 'red'
                    })
                })
            });
        }

        return selectedStyle;
    }


    initSelectedStyleByGeometryType (geometryType) {
        let selectedStyles = new Array();
        let selectedStyle = null;


        if (geometryType === "Circle" || geometryType == "LinearRing" || geometryType == "MultiPolygon" || geometryType == "Polygon") {
            // for (let styleIndex = 0; styleIndex < styles.length; styleIndex++) {
            //     let tempStorke = styles[styleIndex].stroke_;
            //     selectedStyle = new ol.style.Style({
            //         stroke: new ol.style.Stroke({
            //             color: tempStorke.color_,
            //             lineCap: tempStorke.lineCap_,
            //             lineDash: tempStorke.lineDash_,
            //             lineJoin: tempStorke.lineJoin_,
            //             miterLimit: tempStorke.miterLimit_,
            //             width: tempStorke.width_
            //         })
            //     });
            //     selectedStyles.push(selectedStyle);
            // }
            selectedStyle = new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: 'red',
                    width: 4
                })
            });
        } else if (geometryType === "LineString" || geometryType == "MultiLineString") {

            // for (let styleIndex = 0; styleIndex < styles.length; styleIndex++) {
            //     let tempStorke = styles[styleIndex].stroke_;
            //     selectedStyle = new ol.style.Style({
            //         stroke: new ol.style.Stroke({
            //             color: tempStorke.color_,
            //             lineCap: tempStorke.lineCap_,
            //             lineDash: tempStorke.lineDash_,
            //             lineJoin: tempStorke.lineJoin_,
            //             miterLimit: tempStorke.miterLimit_,
            //             width: tempStorke.width_
            //         })
            //     });
            //     selectedStyles.push(selectedStyle);
            // }

            selectedStyle = new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: 'red',
                    width: 4
                })
            });
        } else if (geometryType === "Point" || geometryType == "MultiPoint") {
            // selectedStyle = new ol.style.Style({

            //     image: new ol.style.Circle({
            //         radius: 4,
            //         fill: new ol.style.Fill({
            //             color: 'red'
            //         })
            //     })
            // });
            // selectedStyles.push(selectedStyle)
            selectedStyle = new ol.style.Style({

                image: new ol.style.Circle({
                    radius: 10,
                    fill: new ol.style.Fill({
                        color: 'red'
                    })
                })
            });
        }

        // return selectedStyles;
        return selectedStyle;
    }

    getRequestVectorLayer () {
        
        let vectorLayer = new VectorTileLayerItem();
        vectorLayer.id = this.id;
        vectorLayer.name = this.name;
        vectorLayer.description = this.description;
        vectorLayer.groupId = this.groupId;
        vectorLayer.groupName = this.groupName;
        vectorLayer.type = this.type;
        vectorLayer.defaultVisible = this.defaultVisible;
        vectorLayer.opacity = this.opacity;
        vectorLayer.extent = this.extent;
        vectorLayer.tilematrixSuffix = this.tilematrixSuffix
        //初始化级别
        vectorLayer.initLevel = this.initLevel;

        vectorLayer.sort = this.sort;


        vectorLayer.sourceName = this.sourceName;

        vectorLayer.serviceEPSG = this.serviceEpsg;
        vectorLayer.serviceName = this.serviceName;
        vectorLayer.serviceUrl = this.serviceUrl;
        vectorLayer.styleJsonUrl = this.styleJsonUrl;
        vectorLayer.styleJsonUrlContent = this.styleJsonUrlContent;
        if (this.rendererSettings && this.rendererSettings.objects && this.rendererSettings.objects.length > 0) {
            vectorLayer.rendererSettings = this.rendererSettings.objects;
            // 最小级别
            vectorLayer.visibleMaxLevel = this.rendererSettings.getMaxLevel();
            //最大级别
            vectorLayer.visibleMinLevel = this.rendererSettings.getMinLevel();
        } else {
            vectorLayer.rendererSettings = RendereConfig.defaultRendere;
            // 最小级别
            vectorLayer.visibleMaxLevel = vectorLayer.rendererSettings[0].maxLevel;
            //最大级别
            vectorLayer.visibleMinLevel = vectorLayer.rendererSettings[0].minLevel;
        }

        if (this.showFields) {
            vectorLayer.showFields = this.showFields.objects;
        }
        if (this.tag) {
            vectorLayer.tag = JSON.stringify(this.tag);
        }
        vectorLayer.initCenterPoint = this.initCenterPoint;
        vectorLayer.token = this.token;
        return vectorLayer;
    }

    /**
     * 重置矢量切片图层的切片urlfunction
     */
    resetTileUrlFunction () {

        let vtUtility = new VectorTileUtility();
        // vtUtility.epsg = this.serviceEPSG;
        vtUtility.serviceName = this.serviceName;
        vtUtility.wmtsUrl = this.serviceUrl;
        vtUtility.tilematrixSuffix = this.tilematrixSuffix;
        if (this.extent) {
            vtUtility.olExtent = this.getOLExtent();
        }

        if (this.rendererSettings) {
            vtUtility.vtLevelRanges = this.rendererSettings.findByRendererType('vectorTile').objects;
        }

        let curOLVtLayers = vtUtility.createVTLayers();

        let curOLVTLayer = null;
        let olVtLayer = null;
        for (let layerIndex = 0; layerIndex < curOLVtLayers.length; layerIndex++) {
            curOLVTLayer = curOLVtLayers[layerIndex];
            if (!curOLVTLayer) continue;

            for (let tempIndex = 0; tempIndex < this.olLayers.length; tempIndex++) {
                olVtLayer = this.olLayers[tempIndex];
                if (!olVtLayer) continue;

                if (olVtLayer instanceof ol.layer.VectorTile) {
                    if (olVtLayer.getMaxResolution() == curOLVTLayer.getMaxResolution() && olVtLayer.getMinResolution() == curOLVTLayer.getMinResolution()) {

                        olVtLayer.getSource().setTileUrlFunction(curOLVTLayer.getSource().getTileUrlFunction());
                        // olVtLayer.getSource().setTileLoadFunction(null);
                        olVtLayer.getSource().setTileLoadFunction(olVtLayer.getSource().getTileLoadFunction());
                        // 不会重新加载地图切片
                        // olVtLayer.getSource().changed();

                        //清理数据源的所有切片缓存， 会重新加载当前视图的地图切片
                        olVtLayer.getSource().clear();

                        break;
                    }
                }
            }
        }
    }


    /**
   * 通过空间图形筛选
   * @param {*} olIntersectGeometry 
   */
    filterFeatruesByGeometry (olIntersectGeometry) {
        let intersectFeas = new Array();
        if (!this.olLayers || this.olLayers.length == 0) {
            this.olLayers = this.createOLLayers();
        };

        let turfIntersectGeometry = null;
        if (olIntersectGeometry) {
            turfIntersectGeometry = TurfUtility.olgeometryToTurfGeometry(olIntersectGeometry);
        }
        let olVtLayer = null;
        for (let tempIndex = 0; tempIndex < this.olLayers.length; tempIndex++) {
            olVtLayer = this.olLayers[tempIndex];
            if (!olVtLayer) continue;

            if (olVtLayer instanceof ol.layer.VectorTile) {

                let vtSource = olVtLayer.getSource();
                let features = VectorTileFeatureUtility.getFeatures(vtSource)
                for (let feaIdx = 0; feaIdx < features.length; feaIdx++) {
                    let tempFeature = features[feaIdx];
                    let featGeometry = tempFeature.getGeometry();
                    if (TurfUtility.olGeometryIsIntersectEx(turfIntersectGeometry, featGeometry)) {
                        intersectFeas.push(tempFeature);
                    }
                }

            }
        }
        return intersectFeas;
    }

    /**
   * 通过属性筛选
   * @param {*} olIntersectGeometry 
   */
    filterFeatruesByAttr (attrs, relationType) {
        let filterFeas = new Array();
        if (!this.olLayers || this.olLayers.length == 0) {
            this.olLayers = this.createOLLayers();
        };

        let olVtLayer = null;
        for (let tempIndex = 0; tempIndex < this.olLayers.length; tempIndex++) {
            olVtLayer = this.olLayers[tempIndex];
            if (!olVtLayer) continue;

            if (olVtLayer instanceof ol.layer.VectorTile) {
                let vtSource = olVtLayer.getSource();
                let features = VectorTileFeatureUtility.getFeatures(vtSource)
                if (relationType == FieldFilterOperatorType.and) {
                    let curFeatrues = features;
                    for (let attrIdx = 0; attrIdx < attrs.length; attrIdx++) {
                        let tempAttr = attrs[attrIdx];
                        curFeatrues = _.filter(features, (tempFeature) => {
                            let properties = tempFeature.getProperties();
                            let attr = properties[tempAttr.name];
                            if (attr) {
                                switch (tempAttr.relationType) {
                                    case FieldFilterRelationType.number_equal:
                                    case FieldFilterRelationType.string_equal:
                                        return attr == tempAttr.value;
                                        break;
                                    case FieldFilterRelationType.number_unequal:
                                    case FieldFilterRelationType.string_unequal:
                                        return attr != tempAttr.value;
                                        break;
                                    case FieldFilterRelationType.number_greaterThan:
                                        return attr < tempAttr.value;
                                        break;
                                    case FieldFilterRelationType.number_lessThan:
                                        return attr < tempAttr.value;
                                        break;
                                    case FieldFilterRelationType.string_like:
                                        return attr.indexOf(tempAttr.value) >= 0;
                                        break;
                                }
                            }
                            // return true;
                        })
                    }
                    filterFeas = _.concat(filterFeas, curFeatrues);
                } else if (relationType == FieldFilterOperatorType.or) {
                    let curFeatrues = new Array();
                    for (let attrIdx = 0; attrIdx < attrs.length; attrIdx++) {
                        let tempAttr = attrs[attrIdx];
                        curFeatrues = _.filter(features, (tempFeature) => {
                            let properties = tempFeature.getProperties();
                            let attr = properties[tempAttr.name];
                            if (attr) {
                                switch (tempAttr.relationType) {
                                    case FieldFilterRelationType.number_equal:
                                    case FieldFilterRelationType.string_equal:
                                        return attr == tempAttr.value;
                                        break;
                                    case FieldFilterRelationType.number_unequal:
                                    case FieldFilterRelationType.string_unequal:
                                        return attr != tempAttr.value;
                                        break;
                                    case FieldFilterRelationType.number_greaterThan:
                                        return attr < tempAttr.value;
                                        break;
                                    case FieldFilterRelationType.number_lessThan:
                                        return attr < tempAttr.value;
                                        break;
                                    case FieldFilterRelationType.string_like:
                                        return attr.indexOf(tempAttr.value) >= 0;
                                        break;
                                }
                            }
                            // return true;
                        })
                        filterFeas = _.concat(filterFeas, curFeatrues);
                    }
                    _.uniq(filterFeas);
                }

            }
        }
        return filterFeas;
    }


    static fronJson (jsonObject) {
        let layerItem = null;
        if (!jsonObject) return layerItem;
        layerItem = new VectorTileLayerItem();
        layerItem = super.getBasicInfofromJson(layerItem, jsonObject);
        layerItem.renderParamsString = jsonObject.renderParamsString;

        layerItem.rendererSettings = RendererSettingItems.fromJsons(jsonObject.rendererSettings);

        layerItem.serviceUrl = jsonObject.serviceUrl;
        layerItem.serviceName = jsonObject.serviceName;
        layerItem.serviceEPSG = jsonObject.serviceEPSG;
        layerItem.styleJsonUrl = jsonObject.styleJsonUrl;
        layerItem.sourceName = jsonObject.sourceName;
        layerItem.selectedOLLayer = this.selectedOLLayer;
        layerItem.selectedFeatureIds = this.selectedFeatureIds;
        layerItem.selectedStyle = this.selectedStyle;

        layerItem.token = this.token;
        layerItem.styleJsonUrlContent = jsonObject.styleJsonUrlContent;

        //创建ollayer图层
        layerItem.createOLLayers();

        return layerItem;
    }

    static initItem () {
        let layerItem = new VectorTileLayerItem();
    }

}


export class WmtsLayerItem extends LayerCatalogItem {

    constructor() {
        super();

        this.epsg = "EPSG:4326";

        this.wmtsUrl = null;

        this.serviceName = null;

        this.sourceName = null; // 等于服务名称 serviceName

        this.matrixSetName = null;

        this.formatName = null;

        this.tileSize = [256, 256];

        this.tileGridExtent = null;

        this.tileGridOrigin = null;

        this.tileGridResolutions = null;

        this.tileGridMatrixIds = null;
        this.tileSchemeType = null;

    }

    removeLayers (curMap) {
        if (!this.olLayers || this.olLayers.length == 0) return;

        let echartLayer = null;
        for (let tempIndex = 0; tempIndex < this.olLayers.length; tempIndex++) {
            echartLayer = this.olLayers[tempIndex];
            if (!echartLayer) continue;
            echartLayer.remove();
        }
    }

    /**
     * 设置ollayer是否可见
     * @param {*} visibleStatus 
     */
    setLayersVisible (visibleStatus) {

        if (!this.olLayers || this.olLayers.length == 0) return;

        let olVtLayer = null;
        for (let tempIndex = 0; tempIndex < this.olLayers.length; tempIndex++) {
            olVtLayer = this.olLayers[tempIndex];
            if (!olVtLayer) continue;

            if (typeof (olVtLayer.setVisible) === 'function') {
                olVtLayer.setVisible(visibleStatus);
            }

        }
    }

    /**
     * @name: zkc
     * @msg: 新建wmts图层
     * @param {*}
     * @return {*}
     */
    createOLLayers () {
        let wmtsUtility = new WMTSLayerUtility();
        wmtsUtility.epsg = this.epsg;
        wmtsUtility.formatName = this.formatName;
        wmtsUtility.matrixSetName = this.matrixSetName;
        wmtsUtility.serviceName = this.serviceName;
        wmtsUtility.tileGridExtent = this.tileGridExtent;
        wmtsUtility.tileGridMatrixIds = this.tileGridMatrixIds;
        wmtsUtility.tileGridOrigin = this.tileGridOrigin;
        wmtsUtility.tileGridResolutions = this.tileGridResolutions;
        wmtsUtility.tileSize = this.tileSize;
        wmtsUtility.wmtsUrl = this.wmtsUrl;
        wmtsUtility.token = this.token;

        let wmtsOlVtLayer = wmtsUtility.createWmtsLayer();

        wmtsOlVtLayer.setOpacity(this.opacity);
        wmtsOlVtLayer.setVisible(this.defaultVisible);
        if (this.sort) {
            wmtsOlVtLayer.set(LayerCatalogItem.sortFieldName, this.sort);
        }
        this.olLayer = wmtsOlVtLayer;

        this.olLayers = new Array();
        this.olLayers.push(this.olLayer);
    }



    getRequestWmtsLayer () {
        let wmtsLayer = new WmtsLayerItem();
        wmtsLayer.id = this.id;
        wmtsLayer.name = this.name;
        wmtsLayer.description = this.description;
        wmtsLayer.groupId = this.groupId;
        wmtsLayer.groupName = this.groupName;
        wmtsLayer.serviceName = this.serviceName;
        wmtsLayer.type = this.type;
        wmtsLayer.defaultVisible = this.defaultVisible;
        wmtsLayer.opacity = this.opacity;
        //初始化级别
        wmtsLayer.initLevel = this.initLevel;
        // 最小级别
        wmtsLayer.visibleMaxLevel = this.visibleMaxLevel;
        //最大级别
        wmtsLayer.visibleMinLevel = this.visibleMinLevel
        wmtsLayer.showFields = this.showFields.objects;
        if (this.tag) {
            wmtsLayer.tag = JSON.stringify(this.tag);
        }
        wmtsLayer.token = this.token;
        wmtsLayer.sort = this.sort;
        wmtsLayer.epsg = this.epsg;
        wmtsLayer.wmtsUrl = this.wmtsUrl;
        wmtsLayer.matrixSetName = this.matrixSetName;
        wmtsLayer.formatName = this.formatName;
        wmtsLayer.tileSize = this.tileSize;
        wmtsLayer.tileGridExtent = this.tileGridExtent;
        wmtsLayer.tileGridOrigin = this.tileGridOrigin;
        wmtsLayer.tileGridMatrixIds = this.tileGridMatrixIds;
        wmtsLayer.tileGridResolutions = this.tileGridResolutions;
        wmtsLayer.tileSchemeType = this.tileSchemeType;
        return wmtsLayer;
    }

    /**
     *  通过配置设置值
     *@param config 配置参数 
     */
    configToItem (config) {
        if (!config) return;
        this.tileSize = config.size;
        this.tileGridOrigin = config.origin;
        this.tileGridResolutions = config.resolutions;
        this.tileGridMatrixIds = config.matrix_ids;
        this.tileGridExtent = config.gridExtent;

    }

    static fromJson (jsonObject) {
        let layerItem = null;
        if (!jsonObject) return layerItem;

        layerItem = new WmtsLayerItem();
        layerItem = super.getBasicInfofromJson(layerItem, jsonObject);

        layerItem.epsg = jsonObject.epsg;
        layerItem.wmtsUrl = jsonObject.wmtsUrl;
        layerItem.serviceName = jsonObject.serviceName;
        layerItem.sourceName = jsonObject.serviceName; // 等于服务名称 serviceName
        layerItem.matrixSetName = jsonObject.matrixSetName;
        layerItem.formatName = jsonObject.formatName;
        layerItem.tileSize = jsonObject.tileSize;
        layerItem.tileGridExtent = jsonObject.tileGridExtent;
        layerItem.tileGridOrigin = jsonObject.tileGridOrigin;
        layerItem.tileGridResolutions = jsonObject.tileGridResolutions;
        layerItem.tileGridMatrixIds = jsonObject.tileGridMatrixIds;
        layerItem.tileSchemeType = jsonObject.tileSchemeType;
        layerItem.createOLLayers();
        return layerItem;
    }

}
export class WmsLayerItem extends LayerCatalogItem {

    constructor() {
        super();
        //url地址
        this.url = null;
        //必填，要在地图上显示的图层。值是层名称的逗号分隔列表。
        this.layers = null;
        //必填
        this.epsg = "EPSG:4326";
        //必填，地图输出的宽度（以像素为单位）
        this.width = 0;
        //必填，地图输出的高度，以像素为单位
        this.height = 0;
        //必填，图范围的边界框。格式是 minx,miny,maxx,maxy以SRS 为单位。
        this.bbox = null;
        //非必填，默认值，1.0.0，1.1.0，1.1.1，1.3.0
        this.version = "1.3.0";
        //非必填，地图背景是否应该透明。值是true或false。默认为false
        this.transparent = true;
        //非必填，渲染图层的样式。值是样式名称的逗号分隔列表，如果需要默认样式，则为空
        this.styles = null;
        //非必填，过滤返回的数据，采用ECQL格式
        this.cqlFilter = null;
        // 非必填, 将cql转成xml格式 sld  进行过滤查询--后台将cql转sld存储的
        this.cqlXmlString = null;
        //非必填，格式，默认值
        this.formatName = 'image/png';
        // 图层类型--点 线  面
        this.layerType = null;
        // 样式名
        this.style = null;
        // 加载方式
        this.requestType = null;

    }

    /**
     * 设置ollayer是否可见
     * @param {*} visibleStatus 
     */
    setLayersVisible (visibleStatus) {

        if (!this.olLayers || this.olLayers.length == 0) return;

        let olVtLayer = null;
        for (let tempIndex = 0; tempIndex < this.olLayers.length; tempIndex++) {
            olVtLayer = this.olLayers[tempIndex];
            if (!olVtLayer) continue;

            if (typeof (olVtLayer.setVisible) === 'function') {
                olVtLayer.setVisible(visibleStatus);
            }

        }
    }

    static fromJson (jsonObject) {
        
        let layerItem = null;
        if (!jsonObject) return layerItem;

        layerItem = new WmsLayerItem();
        layerItem = super.getBasicInfofromJson(layerItem, jsonObject);
        layerItem.url = jsonObject.url;

        layerItem.layers = jsonObject.layers;

        layerItem.epsg = jsonObject.epsg;

        layerItem.width = jsonObject.width;

        layerItem.height = jsonObject.height;

        layerItem.bbox = jsonObject.bbox;

        layerItem.version = jsonObject.version;

        layerItem.transparent = jsonObject.transparent;

        layerItem.styles = jsonObject.styles;

        layerItem.cqlFilter = jsonObject.cqlFilter;

        layerItem.cqlXmlString = jsonObject.cqlXmlString;

        layerItem.formatName = jsonObject.formatName;

        layerItem.layerType = jsonObject.layerType;

        layerItem.style = jsonObject.style;
        // 加载方式
        layerItem.requestType = jsonObject.requestType;
        //创建ollayer图层
        layerItem.createOLLayers();
        return layerItem;
    }

    /**
     * @name: zkc
     * @msg: 创建图层
     * @param {*}
     * @return {*}
     */
    createOLLayers () {

        let wmsUtility = new WMSLayerUtility();
        wmsUtility.url = this.url;
        wmsUtility.layers = this.layers;
        wmsUtility.version = this.version;
        wmsUtility.cqlFilter = this.cqlFilter;
        wmsUtility.cqlXmlString = this.cqlXmlString;
        wmsUtility.width = this.width;
        wmsUtility.height = this.height;
        wmsUtility.bbox = this.bbox;
        wmsUtility.epsg = this.epsg;
        wmsUtility.layerType = this.layerType;
        wmsUtility.formatName = this.formatName;
        wmsUtility.style = this.style;
        wmsUtility.requestType = this.requestType;

        wmsUtility.getWmsParams();
        let olVtLayers = wmsUtility.createWmsLayerEx();
        this.olLayers = new Array();
        this.olLayers.push(olVtLayers);
    }

    /**
     * 获取wms项数据
    */
    getRequestWmsLayer () {
        let self = this;
        let wmsLayer = new WmsLayerItem();
        wmsLayer.id = this.id;
        wmsLayer.name = this.name;
        wmsLayer.description = this.description;
        wmsLayer.groupId = this.groupId;
        wmsLayer.groupName = this.groupName;
        wmsLayer.serviceName = this.serviceName;
        wmsLayer.type = this.type;
        wmsLayer.defaultVisible = this.defaultVisible;
        wmsLayer.opacity = this.opacity;
        //初始化级别
        wmsLayer.initLevel = this.initLevel;
        // 最小级别
        wmsLayer.visibleMaxLevel = this.visibleMaxLevel;
        //最大级别
        wmsLayer.visibleMinLevel = this.visibleMinLevel

        wmsLayer.token = this.token;
        wmsLayer.sort = this.sort;
        wmsLayer.epsg = this.epsg;
        wmsLayer.url = this.url;
        wmsLayer.layers = this.layers;
        wmsLayer.version = this.version;
        wmsLayer.cqlFilter = this.cqlFilter;
        wmsLayer.width = this.width;
        wmsLayer.height = this.height;
        wmsLayer.bbox = this.bbox;
        wmsLayer.layerType = this.layerType;
        wmsLayer.showFields = this.showFields.objects;
        if (this.tag) {
            wmsLayer.tag = JSON.stringify(this.tag);
        }

        wmsLayer.style = this.style;
        wmsLayer.requestType = this.requestType;

        return wmsLayer;
    }
}


export class SpatiaDataLayerItem extends LayerCatalogItem {

    constructor() {
        super();

        this.epsg = "EPSG:4326";

        this.serviceUrl = null;
        this.serviceName = null;
        this.sourceName = null;


    }

    /**
     * 设置ollayer是否可见
     * @param {*} visibleStatus 
     */
    setLayersVisible (visibleStatus) {

        if (!this.olLayers || this.olLayers.length == 0) return;

        let olVtLayer = null;
        for (let tempIndex = 0; tempIndex < this.olLayers.length; tempIndex++) {
            olVtLayer = this.olLayers[tempIndex];
            if (!olVtLayer) continue;

            if (typeof (olVtLayer.setVisible) === 'function') {
                olVtLayer.setVisible(visibleStatus);
            }

        }
    }

    static fromJson (jsonObject) {
        let layerItem = null;
        if (!jsonObject) return layerItem;

        layerItem = new WmtsLayerItem();
        layerItem = super.getBasicInfofromJson(layerItem, jsonObject);

        layerItem.epsg = jsonObject.epsg;
        layerItem.serviceUrl = jsonObject.serviceUrl;
        layerItem.serviceName = jsonObject.serviceName;
        layerItem.sourceName = jsonObject.sourceName;


        return layerItem;
    }
}



export class LayerCatalogItems extends CustomArray {
    constructor() {
        super();
    }

    findIndexById (layerId) {

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

    findByName (layerName) {
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

    findBysourceName (layerSourceName) {
        let findItem = null;

        let tempItem = null;
        for (let tempIndex = 0; tempIndex < this.objects.length; tempIndex++) {
            tempItem = this.objects[tempIndex];
            if (!tempItem || !tempItem.sourceName) continue;

            if (tempItem.sourceName.toLowerCase() === layerSourceName.toLowerCase()) {
                findItem = tempItem;
                break;
            }
        }

        return findItem;
    }


    findById (layerId) {
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
     * 清除选中要素
     */
    clearSelectedFeatures () {
        let tempItem = null;
        for (let tempIndex = 0; tempIndex < this.objects.length; tempIndex++) {
            tempItem = this.objects[tempIndex];
            if (tempItem && tempItem instanceof VectorTileLayerItem) {
                tempItem.clearSelectedFeatures()
            }
        }
    }

    /**
     * 获取ol图层
     */
    getOLLayers () {

        let layers = new Array();

        let tempLayerItem = null;
        let tempOLLayers = null;
        for (let tempIndex = 0; tempIndex < this.objects.length; tempIndex++) {
            tempLayerItem = this.objects[tempIndex];
            if (!tempLayerItem) continue;

            tempOLLayers = tempLayerItem.olLayers;
            if (!tempOLLayers) continue;

            ArrayUtility.addTargetToOri(layers, tempOLLayers);
        }

        return layers;
    }

    /**
     * 通过筛选条件查询
     * @param {*} filter 
     * @param {*} succeedCallback 
     * @param {*} errorCallback 
     */
    static async selectByFilter (filter, url, succeedCallback, errorCallback) {
        try {
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
        try {
            let response = await httpU.get(url, { ids: idArray.join(",") });
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


    static fromJsons (jsonObjects) {
        let layers = new LayerCatalogItems();
        if (!jsonObjects) return layers;
        let tempJsonItem = null;
        let tempLayerItem = null;
        for (let tempIndex = 0; tempIndex < jsonObjects.length; tempIndex++) {
            tempJsonItem = jsonObjects[tempIndex];
            
            if (tempJsonItem.type === LayerCatalogItemType.vectorTile) {
                tempLayerItem = VectorTileLayerItem.fronJson(tempJsonItem);
            } else if (tempJsonItem.type === LayerCatalogItemType.wfs) {
                // tempLayerItem = LayerCatalogItem.fromJson(tempJsonItem);
            } else if (tempJsonItem.type === LayerCatalogItemType.wmts) {
                tempLayerItem = WmtsLayerItem.fromJson(tempJsonItem);
            } else if (tempJsonItem.type === LayerCatalogItemType.wms) {
                tempLayerItem = WmsLayerItem.fromJson(tempJsonItem);
            }

            if (!tempLayerItem) continue;

            layers.push(tempLayerItem);
        }

        return layers;
    }

}

LayerCatalogItems.visibleItems = new LayerCatalogItems();

export class LayerCatalogItemFilterResult {


    constructor() {
        this.subjectCount = -1;
        this.filterSubjectCount = -1;
        this.filterSubjects = null;
    }


    static parseJson (jsonObject) {
        let filterResult = null;
        if (!jsonObject) return filterResult;

        filterResult = new LayerCatalogItemFilterResult();
        filterResult.subjectCount = jsonObject.subjectCount;
        filterResult.filterSubjectCount = jsonObject.filterSubjectCount;
        filterResult.filterSubjects = LayerCatalogItems.fromJsons(jsonObject.filterSubjects);

        return filterResult;
    }


    static mockResult () {

    }



}
/**
 * @Author: wutt
 * @Date: 2021-01-08 16:08:49
 * @Description: 不同图层项筛选查询条件--里面属性值目前只有矢量切片 待完善
 */
export class ControlLayerCatalogItemFilter {

    constructor() {
        this.filterType = null;
        this.catalogItemFilter = new LayerCatalogItemFilter();
        this.vtLayerFilter = new VectorTileLayerItemFilter();
        this.wmtsLayerFilter = new WMTSLayerItemFilter();
        this.wmtLayerFilter = new WMSLayerItemFilter();
    }

}

/**
 * 专题图层筛选条件
 */
export class LayerCatalogItemFilter {
    constructor() {
        this.useId = false;
        this.id = null;
        this.useIds = false;
        this.ids = null;
        this.useGroupId = false;
        this.groupId = null;
        this.useGroupIds = false;
        this.groupIds = null;

        this.useFuzzyName = false;
        this.fuzzyName = null;

        this.useName = false;
        this.name = null;


        this.usePagination = false;
        this.paginationStart = 0;
        this.paginationCount = 10;
    }
}

/**
 * 地图切片图层筛选条件
 */
export class WMTSLayerItemFilter extends LayerCatalogItemFilter {
    constructor() {
        super();
    }
}

/**
 * 矢量切片图层筛选条件
 */
export class VectorTileLayerItemFilter extends LayerCatalogItemFilter {
    constructor() {
        super();
    }
}

/**
 * 要素服务图层筛选条件
 */
export class WFSLayerItemFilter extends LayerCatalogItemFilter {
    constructor() {
        super();
    }
}

/**
 * wms服务图层筛选条件
*/
export class WMSLayerItemFilter extends LayerCatalogItemFilter {
    constructor() {
        super();
    }
}

export const LayerCatalogItemType = {
    vectorTile: "vectorTile",
    wfs: "wfs",
    wmts: "wmts",
    wms: "wms",
    custom: "custom",
    spatiadata: "spatiadata",
    dataLabel: [{
        id: 0,
        label: "矢量切片",
        value: 'vectorTile'
    },
    {
        id: 1,
        label: "地图切片",
        value: 'wmts'
    }
        , {
        id: 3,
        label: "wms服务",
        value: 'wms'
    },
        // , {
        //     id: 2,
        //     label: "要素服务",
        //     value: 'wfs'
        // },
    ],
    epsgLabels: [{
        id: 0,
        label: "EPSG:4326",
        value: "EPSG:4326"
    },
    {
        id: 1,
        label: "EPSG:3857",
        value: "EPSG:3857"
    }, {
        id: 2,
        label: "EPSG:4490",
        value: "EPSG:4490"
    }
    ],

    wfsVersionLabels: [{
        id: 0,
        label: "WFS 1.0.0",
        value: "1.0.0"
    },
    {
        id: 1,
        label: "WFS 1.1.0",
        value: "1.1.0"
    },
    {
        id: 2,
        label: "WFS 2.0.0",
        value: "2.0.0"
    }

    ]
}

// wmts属性集
export const WMTSLayerItemAttrbute = {
    formatLabels: [{
        id: 0,
        label: "png格式",
        value: 'image/png'
    },
    {
        id: 1,
        label: "jpg格式",
        value: 'image/jpg'
    }, {
        id: 2,
        label: "jpeg格式",
        value: 'image/jpeg'
    },
    {
        id: 3,
        label: "gif格式",
        value: 'image/gif'
    },
    {
        id: 4,
        label: "tiles",
        value: 'tiles'
    }
    ],
    tileSizeLabels: [{
        id: 0,
        label: "128",
        value: [128, 128]
    },
    {
        id: 1,
        label: "256",
        value: [256, 256]
    },
    {
        id: 3,
        label: "512",
        value: [512, 512]
    },
    ],
    tileSchemeLabels: [{
        id: 0,
        label: "天地图经纬度",
        value: 'tdt_4326'
    },
    {
        id: 1,
        label: "天地图平面",
        value: 'tdt_3857'
    },
    {
        id: 2,
        label: "谷歌平面",
        value: 'ArcGIS_Online_Bing_Maps_Google_Maps'
    }
    ],
    /**
     *  layerItem.tileGridExtent = jsonObject.tileGridExtent;
        layerItem.tileGridOrigin = jsonObject.tileGridOrigin;
        layerItem.tileGridResolutions = jsonObject.tileGridResolutions;
        layerItem.tileGridMatrixIds = jsonObject.tileGridMatrixIds;
    */
    TileSchemeConfig: [{
        'id': GuidUtility.getGuid(),
        'type': 'tdt_4326',
        'size': [256, 256],
        'origin': [-180, 90],
        'gridExtent': [-180.0, -90.0, 180.0, 90.0],
        'resolutions': [1.406249999978297, 0.7031249999891485, 0.35156249999999994, 0.17578124999999997, 0.08789062500000014, 0.04394531250000007, 0.021972656250000007, 0.01098632812500002, 0.00549316406250001, 0.0027465820312500017, 0.0013732910156250009, 0.000686645507812499, 0.0003433227539062495, 0.00017166137695312503, 0.00008583068847656251, 0.000042915344238281406, 0.000021457672119140645, 0.000010728836059570307, 0.000005364418029785169, 0.0000026822090148925845, 0.000001341104532462678, 0.00000067, 0.00000033, 0.00000016],
        'matrix_ids': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
    }, {
        'id': GuidUtility.getGuid(),
        'type': 'tdt_3857',
        'size': [256, 256],
        'origin': [-20037508.3427892, 20037508.3427892],
        'gridExtent': [-20037508.3427892, -20037508.3427892, 20037508.3427892, 20037508.3427892],
        'resolutions': [78271.516963999893, 39135.758482000099, 19567.879240999901, 9783.9396204999593, 4891.9698102499797, 2445.9849051249898, 1222.9924525624899, 611.49622628138002, 305.74811314055802, 152.874056570411, 76.437028285073197, 38.218514142536598, 19.109257071268299, 9.5546285356341496, 4.7773142679493699, 2.38865713397468, 1.1943285668550501, 0.59716428355981699, 0.29858214164761698],
        'matrix_ids': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
    },
    {
        'id': GuidUtility.getGuid(),
        'type': 'ArcGIS_Online_Bing_Maps_Google_Maps',
        'size': [256, 256],
        'origin': [-20037508.342787, 20037508.342787],
        'gridExtent': [-20037508.342787001, -20037508.342787001, 20037508.342787001, 20037508.342787001],
        'resolutions': [156543.033928, 78271.5169639999, 39135.7584820001, 19567.8792409999, 9783.93962049996, 4891.96981024998, 2445.98490512499, 1222.99245256249, 611.49622628138, 305.748113140558, 152.874056570411, 76.4370282850732, 38.2185141425366, 19.1092570712683, 9.55462853563415, 4.77731426794937, 2.38865713397468, 1.19432856685505, 0.597164283559817, 0.298582141647617],
        'matrix_ids': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]



    }

    ]

}

// wms属性集
export const WMSLayerItemAttrbute = {
    versonLabels: [
        { "label": "WMS 1.0.0", "value": "1.0.0", "id": 1 },
        { "label": "WMS 1.1.0", "value": "1.1.0", "id": 2 },
        { "label": "WMS 1.1.1", "value": "1.1.1", "id": 3 },
        { "label": "WMS 1.3.0", "value": "1.3.0", "id": 4 }
    ],
    formatLabels: [{
        id: 0,
        label: "png格式",
        value: 'image/png'
    },
    {
        id: 1,
        label: "jpg格式",
        value: 'image/jpg'
    }, {
        id: 2,
        label: "jpeg格式",
        value: 'image/jpeg'
    },
    {
        id: 3,
        label: "gif格式",
        value: 'image/gif'
    },
    {
        id: 4,
        label: "tiles",
        value: 'tiles'
    },

    {
        id: 5,
        label: "openlayers格式",
        value: 'application/openlayers'
    }
    ],
    layerTypeLabels: [
        { "label": "点", "value": "Point", "id": 1 },
        { "label": "线", "value": "Line", "id": 2 },
        { "label": "面", "value": "Polygon", "id": 3 }
    ],
    layerTypeConst: {
        'Point': 'Point',
        'Line': 'Line',
        'Polygon': 'Polygon'
    }
}

// 字段筛选运算类型
export const FieldFilterOperatorType = {
    and: 'and',
    or: 'or'
}

// 字段查询关系类型
export const FieldFilterRelationType = {

    /// 数值型-等于
    number_equal: 'number_equal',

    /// 数值型-不等于
    number_unequal: 'number_unequal',

    /// 数值型-大于
    number_greaterThan: 'number_greaterThan',

    /// 数值型-小于
    number_lessThan: 'number_lessThan',

    /// 日期型-起止时间
    date_between: 'date_between',

    /// 字符串-等于
    string_equal: 'string_equal',

    /// 字符串-不等于
    string_unequal: 'string_unequal',

    /// 字符串-模糊匹配
    string_like: 'string_like'

}
