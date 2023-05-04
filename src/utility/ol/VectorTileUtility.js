/*
 * @Author: your name
 * @Date: 2019-11-16 10:50:08
 * @LastEditTime: 2021-01-27 10:57:01
 * @LastEditors: wutt
 * @Description: In User Settings Edit
 * @FilePath: /html/src/utility/ol/VectorTileUtility.js
 */

import { ArrayUtility } from "../common/ArrayUtility";


export class VectorTileUtility {
    constructor() {

        this.currentMapLevel = -1;

        this.wmtsUrl = null;

        this.epsg = "EPSG:4326";

        this.serviceName = null;

        //示例：[{minLevel:1,maxLevel:10},{minLevel:14,maxLevel:16}]
        this.imageLevelRanges = [];

        //示例：[{minLevel:11,maxLevel:13}]
        this.vtLevelRanges = [{ minLevel: 0, maxLevel: 20 }];

        this.olExtent = null;

        this.layers = new Array();
    }

    /**
     * 创建图层
     */
    createLayers() {

        let olLayers = new Array();

        let imgLayers = this.createWMTSLayers();
        let vtLayers = this.createVTLayers();

        ArrayUtility.addTargetToOri(olLayers, imgLayers);

        ArrayUtility.addTargetToOri(olLayers, vtLayers);

        this.layers = olLayers;

        return olLayers;
    }


    createWMTSLayers() {

        let olLayers = new Array();

        if (this.imageLevelRanges && this.imageLevelRanges.length > 0) {
            let tempLevelRange = null;
            let tempImgMinLevel = -1;
            let tempImgMaxLevel = -1;

            for (let tempLevelRangeIndex = 0; tempLevelRangeIndex < this.imageLevelRanges.length; tempLevelRangeIndex++) {
                tempLevelRange = this.imageLevelRanges[tempLevelRangeIndex];
                tempImgMinLevel = tempLevelRange.minLevel;
                tempImgMaxLevel = tempLevelRange.maxLevel;
                if (tempImgMinLevel >= 0 && tempImgMaxLevel >= 0 && tempImgMaxLevel >= tempImgMinLevel) {
                    let imgLayer = this.createImageLayer(tempImgMinLevel, tempImgMaxLevel, this.olExtent);
                    olLayers.push(imgLayer);
                }
            }
        }

        return olLayers;
    }


    createVTLayers() {
        let olLayers = new Array();

        if (this.vtLevelRanges && this.vtLevelRanges.length > 0) {
            let tempLevelRange = null;
            let tempVTMinLevel = -1;
            let tempVTMaxLevel = -1;

            for (let tempLevelRangeIndex = 0; tempLevelRangeIndex < this.vtLevelRanges.length; tempLevelRangeIndex++) {
                tempLevelRange = this.vtLevelRanges[tempLevelRangeIndex];
                tempVTMinLevel = tempLevelRange.minLevel;
                tempVTMaxLevel = tempLevelRange.maxLevel;
                if (tempVTMinLevel >= 0 && tempVTMaxLevel >= 0 && tempVTMaxLevel >= tempVTMinLevel) {
                    let vtLayer = this.createVTLayer(tempVTMinLevel, tempVTMaxLevel, this.olExtent);
                    olLayers.push(vtLayer);
                }
            }
        }

        return olLayers;
    }

    setVisible(visibleStatus) {

        if (!this.layers || this.layers.length == 0) return;

        let tempLayer = null;
        for (let tempIndex = 0; tempIndex < this.layers.length; tempIndex++) {
            tempLayer = this.layers[tempIndex];
            if (!tempLayer) continue;

            tempLayer.setVisible(visibleStatus);
        }
    }


    createVTLayer(minLevel, maxLevel, layerExtent) {


        let initStyle = new ol.style.Style({
            fill: new ol.style.Fill({
                color: '#12563b'
                    // color: 'rgba(255,255,1,0.5)'
            }),
            stroke: new ol.style.Stroke({
                color: 'blue',
                width: 2
            }),
            image: new ol.style.Circle({
                radius: 4,
                fill: new ol.style.Fill({
                    color: '#ffcc33'
                })
            })
        });


        let matrixIds = null; // OLVectorTileConstants.tdt4326_matrixIds; // ['EPSG:4326:0', 'EPSG:4326:1', 'EPSG:4326:2', 'EPSG:4326:3', 'EPSG:4326:4', 'EPSG:4326:5', 'EPSG:4326:6', 'EPSG:4326:7', 'EPSG:4326:8', 'EPSG:4326:9', 'EPSG:4326:10', 'EPSG:4326:11', 'EPSG:4326:12', 'EPSG:4326:13', 'EPSG:4326:14', 'EPSG:4326:15', 'EPSG:4326:16', 'EPSG:4326:17', 'EPSG:4326:18', 'EPSG:4326:19', 'EPSG:4326:20', 'EPSG:4326:21'];

        let projection = null;

        let resolutions = null;

        let vtOrigin = null;

        if (this.epsg.indexOf("4326") != -1 || this.epsg.indexOf("4490") != -1) {
            vtOrigin = OLVectorTileConstants.epsg4326_origin;
            matrixIds = OLVectorTileConstants.tdt4326_matrixIds;
            resolutions = OLVectorTileConstants.tdt4326_resolutions;
            projection = new ol.proj.Projection({
                code: 'EPSG:4326',
                units: 'degrees',
                axisOrientation: 'neu'
            });
        } else {

            vtOrigin = OLVectorTileConstants.epsg3857_origin;
            matrixIds = OLVectorTileConstants.epsg3857_matrixIds;
            resolutions = OLVectorTileConstants.epsg3857_resolutionsEx;
            projection = new ol.proj.Projection({
                code: 'EPSG:3857',
                units: 'm',
                axisOrientation: 'neu'
            });
        }

        let params = {
            'REQUEST': 'GetTile',
            'SERVICE': 'WMTS',
            'VERSION': '1.0.0',
            'LAYER': this.serviceName,
            'STYLE': 'default',
            'TILEMATRIX': '{z}',
            'TILEMATRIXSET': this.epsg,
            'FORMAT': 'application/x-protobuf;type=mapbox-vector',
            'TILECOL': '{x}',
            'TILEROW': '{y}'
        };

        //创建数据源
        let url = this.wmtsUrl;

        if (!url.endsWith("?")) {
            url = url + "?"
        }

        for (let param in params) {
            url = url + param + '=' + params[param] + '&';
        }

        url = url.slice(0, -1);


        let self = this;

        let olSource = new ol.source.VectorTile({
            crossOrigin: '*',
            url: url,
            format: new ol.format.MVT({ featureClass: ol.Feature }),
            projection: projection,
            tileGrid: new ol.tilegrid.WMTS({
                extent: layerExtent,
                tileSize: 256, //OLVectorTileConstants.tileSize,// [256, 256],
                origin: vtOrigin, // [-180.0, 90.0],
                resolutions: resolutions,
                matrixIds: matrixIds
            }),
            wrapX: false,

            tileUrlFunction: function(tileMarker, pixelRatio, proj) {
                if (!tileMarker) return;

                let tileLevel = tileMarker[0];
                if (tileLevel > maxLevel || tileLevel < minLevel) {
                    return;
                }

                let tileUrl = url.replace('{z}', String(tileLevel))
                    .replace('{x}', String(tileMarker[1]))
                    .replace('{y}', String(tileMarker[2] + 1));

                // //隐藏时间戳
                // tileUrl+='&time=' + Date.now();

                return tileUrl;
            },

            // //切片加载功能： 
            // tileLoadFunction: function (vtTile, src) {
            //     //+ '&time=' + Date.now()

            //     let loader=ol.featureloader.loadFeaturesXhr(src, vtTile.getFormat(), 
            //     vtTile.onLoad.bind(vtTile),                                                 
            //     vtTile.onError.bind(vtTile));

            //     vtTile.setLoader(loader)
            // }

            // //不加载切片： 
            // tileLoadFunction: function (vtTile, src) {
            //     //+ '&time=' + Date.now()

            //     vtTile.setLoader(function () {
            //         vtTile.setProjection(projection);
            //         vtTile.setFeatures([]);
            //       })

            // // 切片 状态，不影响切片是否重新加载
            //     vtTile.setState(ol.TileState.ERROR);

            // }

        });

        let visibleMaxResolution = null;
        if (minLevel > 0) {
            visibleMaxResolution = resolutions[minLevel];
        } else {
            visibleMaxResolution = resolutions[0];
        }

        visibleMaxResolution = visibleMaxResolution * 1.2;

        let visibleMinResolution = null;
        if (maxLevel >= resolutions.length) {
            visibleMinResolution = resolutions[resolutions.length - 1];
        } else {
            visibleMinResolution = resolutions[maxLevel];
        }

        visibleMinResolution = visibleMinResolution * 0.8;


        //创建矢量瓦片图层
        let olLayer = new ol.layer.VectorTile({
            style: initStyle,
            source: olSource,
            minResolution: visibleMinResolution,
            maxResolution: visibleMaxResolution,
        });

        return olLayer;
    }

    createImageLayer(minLevel, maxLevel, layerOlExtent) {

        let matrixIds = OLVectorTileConstants.tdt4326_matrixIds; // ['EPSG:4326:0', 'EPSG:4326:1', 'EPSG:4326:2', 'EPSG:4326:3', 'EPSG:4326:4', 'EPSG:4326:5', 'EPSG:4326:6', 'EPSG:4326:7', 'EPSG:4326:8', 'EPSG:4326:9', 'EPSG:4326:10', 'EPSG:4326:11', 'EPSG:4326:12', 'EPSG:4326:13', 'EPSG:4326:14', 'EPSG:4326:15', 'EPSG:4326:16', 'EPSG:4326:17', 'EPSG:4326:18', 'EPSG:4326:19', 'EPSG:4326:20', 'EPSG:4326:21'];
        let projection = null;
        let resolutions = null;

        if (this.epsg.indexOf("4326") || this.epsg.indexOf("4490")) {
            resolutions = OLVectorTileConstants.tdt4326_resolutions;
            projection = new ol.proj.Projection({
                code: 'EPSG:4326',
                units: 'degrees',
                axisOrientation: 'neu'
            });
        } else {
            resolutions = OLVectorTileConstants.epsg3857_resolutionsEx;
            projection = new ol.proj.Projection({
                code: 'EPSG:3857',
                units: 'm',
                axisOrientation: 'neu'
            });
        }


        let params = {
            'REQUEST': 'GetTile',
            'SERVICE': 'WMTS',
            'VERSION': '1.0.0',
            'LAYER': this.serviceName,
            'STYLE': 'default',
            'TILEMATRIXSET': this.epsg,
            // 'Format': 'image/png',
        };

        //创建数据源
        let url = this.wmtsUrl;

        if (!url.endsWith("?")) {
            url = url + "?"
        }

        for (let param in params) {
            url = url + param + '=' + params[param] + '&';
        }

        url = url.slice(0, -1);

        let wmtsResolutions = resolutions;
        let wmtsMatrixIds = matrixIds;

        let visibleMaxResolution = null;
        if (minLevel > 0) {
            visibleMaxResolution = resolutions[minLevel];
        } else {
            visibleMaxResolution = resolutions[0];
        }

        visibleMaxResolution = visibleMaxResolution * 1.2;

        let visibleMinResolution = null;
        if (maxLevel >= resolutions.length) {
            visibleMinResolution = resolutions[resolutions.length - 1];
        } else {
            visibleMinResolution = resolutions[maxLevel];
        }

        visibleMinResolution = visibleMinResolution * 0.8;

        let olSource = new ol.source.WMTS({
            crossOrigin: '*',
            url: url,
            projection: projection,
            format: 'image/png',
            tileGrid: new ol.tilegrid.WMTS({
                extent: layerOlExtent,
                tileSize: OLVectorTileConstants.tileSize, // [256, 256],
                origin: OLVectorTileConstants.epsg4326_origin, // [-180.0, 90.0],
                resolutions: wmtsResolutions,
                matrixIds: wmtsMatrixIds,
            }),
            wrapX: true //地图缩小后，防止在一个页面出现多个一样的地图
        });

        //创建wmts瓦片图层
        let olLayer = new ol.layer.Tile({
            source: olSource,
            maxResolution: visibleMaxResolution,
            minResolution: visibleMinResolution,
        });

        return olLayer;
    }


    static findFeaturesByLayerProperty(features, layerProperty) {
        let findFeatures = new Array();

        if (!features || !layerProperty) return findFeatures;

        let tempFeature = null;
        for (let tempFeatureIndex = 0; tempFeatureIndex < features.length; tempFeatureIndex++) {
            tempFeature = features[tempFeatureIndex];
            let properties = tempFeature.getProperties();
            if (properties && properties["layer"] &&
                properties["layer"] === layerProperty) {
                findFeatures.push(tempFeature);
            }
        }

        return findFeatures;
    }
}

export const OLVectorTileConstants = {

    /**
     * 天地图4326切片方案矩阵集ids
     */
    tdt4326_matrixIds: [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        // 20
    ],

    epsg3857_matrixIds: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20
    ],

    tdt4326_matrixIdsEx: [
        // 0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20
    ],

    /**
     * 天地图4326分辨率
     */
    tdt4326_resolutions: [
        0.7031249999891485,
        0.35156249999999994,
        0.17578124999999997,
        0.08789062500000014,
        0.04394531250000007,
        0.021972656250000007,
        0.01098632812500002,
        0.00549316406250001,
        0.0027465820312500017,
        0.0013732910156250009,
        0.000686645507812499,
        0.0003433227539062495,
        0.00017166137695312503,
        0.00008583068847656251,
        0.000042915344238281406,
        0.000021457672119140645,
        0.000010728836059570307,
        0.000005364418029785169,
        0.0000026822090148925845,
        0.000001341104532462678
    ],


    epsg3857_resolutionsEx: [
        78271.516963999893,
        39135.758482000099,
        19567.879240999901,
        9783.9396204999593,
        4891.9698102499797,
        2445.9849051249898,
        1222.9924525624899,
        611.49622628138002,
        305.74811314055802,
        152.874056570411,
        76.437028285073197,
        38.218514142536598,
        19.109257071268299,
        9.5546285356341496,
        4.7773142679493699,
        2.38865713397468,
        1.1943285668550501,
        0.59716428355981699,
        0.29858214164761698,
        0.14929107084870338
    ],

    /**
     * 切片尺寸
     */
    tileSize: [256, 256],

    /**
     * 4326切片方案原点
     */
    epsg4326_origin: [-180, 90],

    epsg3857_origin: [-20037508.342787001, 20037508.342787001],
}