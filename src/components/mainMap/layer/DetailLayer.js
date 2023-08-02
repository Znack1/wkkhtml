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
 * @LastEditTime: 2022-11-17 14:50:17
 * @LastEditors: zkc
 * @Description: In User Settings Edit
 * @FilePath: /html/src/components/mainMap/layer/DetailLayer.js
 */
export class DetailLayer {

    constructor() {
        this.curMap = null;
        this.layer = null;
    }

 
   

    addFeatures (features) {
        if (!this.layer) {
            this.layer = this._createLayer();
            this.curMap.addLayer(this.layer, true);
            this.layer = this.layer;
        }

        // let fillStyle = new ol.style.Style({

        //     fill: new ol.style.Fill({
        //         color: 'rgba(255,255,255,0)',
        //     }),
        //     stroke: new ol.style.Stroke({
        //         color: '#ff0000',
        //         width: 2,
        //     })
        // })
        // for(let idx = 0;idx <features.length;idx++){
        //     let feature = features[idx];
        //     // feature.setStyle(fillStyle)
        // }

        let allLayers = this.curMap.getLayers();
        OLLayerUtility.ascLayer(allLayers, SystemConfig.sortFieldName);
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


DetailLayer.layer = null;


DetailLayer.field_featTypeName = "featureType";