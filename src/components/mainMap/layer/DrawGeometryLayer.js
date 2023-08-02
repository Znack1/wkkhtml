import { OLMapUtility } from "../../../utility/ol/OLMapUtility";
import { LayerFeatureType } from "./LayerFeatureType";
import { OLSourceUtility } from "../../../utility/ol/OLSourceUtility";
import { DrawGeometryPartType } from '../../../utility/ol/DrawGeometryUtilityJs';
import { GeometryExtentUtility } from "../../../utility/ol/GeometryExtentUtility";
import draw_marker from "../../../assets/images/draw_marker.png";
import { OLLayerUtility } from "../../../utility/ol/OLLayerUtility";
import { SystemConfig } from "../../../config/SystemConfig";
/*
 * @Author: your name
 * @Date: 2019-07-11 11:17:45
 * @LastEditTime: 2023-07-31 17:17:32
 * @LastEditors: zkc
 * @Description: In User Settings Edit
 * @FilePath: /html/src/components/mainMap/layer/DrawGeometryLayer.js
 */
export class DrawGeometryLayer {

    constructor() {
        this.curMap = null;
        this.layer = null;
    }

    saveGeometry (drawGeometry) {
        if (!drawGeometry) return;

        let geometryType = drawGeometry.type;
        if (geometryType === DrawGeometryPartType.point) {
            this.saveDrawPoint(drawGeometry);
        } else if (geometryType === DrawGeometryPartType.polyline) {
            this.saveDrawPolyline(drawGeometry);
        } else if (geometryType === DrawGeometryPartType.polygon) {
            this.saveDrawPolygon(drawGeometry);
        }

    }

    /**
     * 添加绘制点
     * @param {*} drawGeometry 
     */
    addDrawPoint (drawGeometry) {
        let markerFeatures = new Array();


        let mapCRSCode = OLMapUtility.getProjectionCode(this.curMap);


        let iconStyle = null;

        // tempPoiItem = drawGeometry;

        let tempCoordinate = drawGeometry.coordinates; // [tempPoiItem.x, tempPoiItem.y];
        if (mapCRSCode.toLowerCase() !== drawGeometry.crs.properties.name.toLowerCase()) {
            tempCoordinate = ol.proj.transform(
                tempCoordinate,
                drawGeometry.crs.properties.name,
                mapCRSCode
            );
        }

        iconStyle = new ol.style.Style({
            image: new ol.style.Icon(({
                // anchor: [0.5, 46],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                src: draw_marker
            }))
        });
        let tempFeature = new ol.Feature({
            geometry: new ol.geom.Point(tempCoordinate),
            featureType: LayerFeatureType.drawLayer_marker,
            featureTypeIsOverlay: false,
            bindingObject: drawGeometry
        });

        tempFeature.setId(drawGeometry.id);
        tempFeature.setStyle(iconStyle);
        markerFeatures.push(tempFeature);

        if (!this.layer) {
            this.layer = this._createLayer();
            this.layer.set(SystemConfig.sortFieldName, 9998);
            this.curMap.addLayer(this.layer, true);
            this.layer = this.layer;
        }

        this.layer.setVisible(true);
        this.layer.getSource().addFeatures(markerFeatures);
    }

    addFeatures (features) {
        if (!this.layer) {
            this.layer = this._createLayer();
            this.curMap.addLayer(this.layer, true);
            this.layer = this.layer;
        }

        let fillStyle = new ol.style.Style({

            fill: new ol.style.Fill({
                color: 'rgba(255,255,255,0)',
            }),
            stroke: new ol.style.Stroke({
                color: '#ff0000',
                width: 2,
            })
        })
        for(let idx = 0;idx <features.length;idx++){
            let feature = features[idx];
            feature.setStyle(fillStyle)
        }

        let allLayers = this.curMap.getLayers();
        OLLayerUtility.ascLayer(allLayers, SystemConfig.sortFieldName);
        this.layer.getSource().addFeatures(features);
    }




    /**
     * 删除绘制点
     * @param {*} drawGeometry 
     */
    deleteDrawGeometry (drawGeometry) {
        if (!drawGeometry) return;

        let geometryId = drawGeometry.id;

        let findFeature = this._findFeatureById(geometryId);

        if (findFeature) {
            let feats = new Array();
            feats.push(findFeature);

            OLSourceUtility.removeFeatures(this.layer.getSource(), feats);
        }
    }

   
    /**
     * 添加绘制线
     * @param {*} drawGeometry 
     */
    addDrawPolyline (drawGeometry) {
        let lineStyle = new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#ff0000',
                width: 2,
                lineCap: 'round',
                lineJoin: 'round'
            })
        })

        let line = new ol.geom.LineString(drawGeometry.coordinates);
        //线要素
        let lineFeature = new ol.Feature({
            geometry: line,
            featureType: LayerFeatureType.drawLayer_polyline,
            featureTypeIsOverlay: false,
            bindingObject: drawGeometry
        });


        lineFeature.setId(drawGeometry.id);
        lineFeature.setStyle(lineStyle);

        let features = new Array();
        features.push(lineFeature);


        if (!this.layer) {
            this.layer = this._createLayer();
            this.layer.set(SystemConfig.sortFieldName, 10000);
            this.curMap.addLayer(this.layer, true);
            this.layer = this.layer;
        }
        this.layer.setVisible(true);
        this.layer.getSource().addFeatures(features);
    }





    addDrawPolygon (drawGeometry) {
        let fillStyle = new ol.style.Style({

            fill: new ol.style.Fill({
                color: 'rgba(255,255,255,0)',
            }),
            stroke: new ol.style.Stroke({
                color: '#ff0000',
                width: 2,
            })
        })

        let ringArray = new Array();
        ringArray.push(drawGeometry.coordinates);
        let pyn = new ol.geom.Polygon(ringArray);
        //面要素
        let polygonFeature = new ol.Feature({
            geometry: pyn,
            featureType: LayerFeatureType.drawLayer_polygon,
            featureTypeIsOverlay: false,
            bindingObject: drawGeometry
        });


        polygonFeature.setId(drawGeometry.id);
        polygonFeature.setStyle(fillStyle);

        let features = new Array();
        features.push(polygonFeature);


        if (!this.layer) {
            this.layer = this._createLayer();
            this.layer.set(SystemConfig.sortFieldName, 10000);
            this.curMap.addLayer(this.layer, true);
            this.layer = this.layer;
        }
        this.layer.setVisible(true);
        this.layer.getSource().addFeatures(features);
    }

    // 通过点绘制多边形
    addPolygonByPoints(points){
        
        let fillStyle = new ol.style.Style({

            fill: new ol.style.Fill({
                color: 'rgba(255,255,255,0)',
            }),
            stroke: new ol.style.Stroke({
                color: '#ff0000',
                width: 2,
            })
        })
        let pyn = new ol.geom.Polygon([points]);
        //面要素
        let polygonFeature = new ol.Feature({
            geometry: pyn,
            featureType: LayerFeatureType.drawLayer_polygon,
            featureTypeIsOverlay: false,
        });


        polygonFeature.setStyle(fillStyle);

        let features = new Array();
        features.push(polygonFeature);


        if (!this.layer) {
            this.layer = this._createLayer();
            this.layer.set(SystemConfig.sortFieldName, 10000);
            this.curMap.addLayer(this.layer, true);
            this.layer = this.layer;
        }
        // this.layer.setVisible(true);
        this.layer.getSource().addFeatures(features);
        
    }




    /**
     * 创建标记点图层
     */
    _createLayer () {
        let markerSource = new ol.source.Vector({

        });

        //矢量标注图层
        let vectorLayer = new ol.layer.Vector({
            source: markerSource,
            name: 'layer',
            visible: true,
        });
        vectorLayer.set(SystemConfig.sortFieldName, 9999);
        // let markerSource.addFeatures(markerFeatures);
        // let dd=new POIResultItems();

        return vectorLayer;
    }

    /**
     * 通过id查找
     * @param {*} featureId 
     */
    _findFeatureById (featureId) {

        if (!featureId) return;

        let features = this.layer.getSource().getFeatures();

        let tempFeat = null;
        for (let tempFeatIndex in features) {
            tempFeat = features[tempFeatIndex];
            if (tempFeat.getId() === featureId) {
                return tempFeat;
            }
        }

        return null;
    }



    /**
     * 清空图层
     */
    clear () {
        if (this.layer) {
            let features = this.layer.getSource().getFeatures();
            OLSourceUtility.removeFeatures(this.layer.getSource(), features);
        }

        if (this.layer) {
            let features = this.layer.getSource().getFeatures();
            OLSourceUtility.removeFeatures(this.layer.getSource(), features);
        }
    }


    getGeomertry(){
        let features = this.layer.getSource().getFeatures();
        if(features.length > 0){
            let feature = features[0];
            return new ol.format.GeoJSON().writeGeometry(feature.getGeometry())
        }
        return null;
    }

    getFeature () {
        let features = this.layer.getSource().getFeatures();
        if (features.length > 0) {
            let feature = features[0];
            return feature;
        }
        return null;
    }

}


DrawGeometryLayer.layer = null;


DrawGeometryLayer.field_featTypeName = "featureType";