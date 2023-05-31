import { LayerFeatureType } from "./LayerFeatureType.js";
import { OLSourceUtility } from "../../../utility/ol/OLSourceUtility.js";

import yiji from "../../../assets/images/yiji1.png";
import draw_marker from "../../../assets/images/draw_marker.png";
/**
 * poi搜索图层
 */
export class POISearchLayer {

    constructor() {
        this.curMap = null;
        this.featTypeName = "featureType";
        this.markerLayer = null;
    }

    /**
     * 添加标记点
     * @param {*} features 
     */
    addMarkers(features) {
        let self = this;
        if (!features) return;

        let markerFeatures = new Array();
        let tempPoiItem = null;
        let tempCoordinate = null;
        let tempFeature = null;


        let iconStyle = null;
        // let pointIsGeo=false;
        for (let tempPoiIndex in features) {
            tempPoiItem = features[tempPoiIndex];
            if (!tempPoiItem) continue;

            tempCoordinate = [tempPoiItem.zxjd, tempPoiItem.zxwd];

            iconStyle = new ol.style.Style({
                image: new ol.style.Icon(({
                    anchor: [0.5, 8],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'pixels',
                    src: yiji
                }))
            });

            tempFeature = new ol.Feature({
                geometry: new ol.geom.Point(tempCoordinate),
                featureType: LayerFeatureType.treeLayerFeature,
                featureTypeIsOverlay: true,
                bindingObject: tempPoiItem
            });

            tempFeature.setId(tempPoiItem.gid);
            tempFeature.setStyle(iconStyle);
            markerFeatures.push(tempFeature);
        }

        if (!this.markerLayer) {
            this.markerLayer = this._createMarkerLayer();
            this.curMap.addLayer(this.markerLayer, true);
        }

        this.markerLayer.getSource().addFeatures(markerFeatures);
    }

    /**
     * 修改当前poi样式
     * @param {*} poiItem 
     */
    changeCurrentPOIStyle(poiItem) {
        let findFeatureItem = this._findFeatureById(poiItem.id);
        if (findFeatureItem) {
            let iconStyle = new ol.style.Style({
                image: new ol.style.Icon(({
                    anchor: [0.5, 46],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'pixels',
                    src: poiItem.image
                }))
            });

            findFeatureItem.setStyle(iconStyle);
        }
    }


    /**
     * 清除
     */
    clear() {
        
        if(this.markerLayer){
            let features = LayerFeatureType.findFeaturesByFeatType(this.markerLayer.getSource(), this.featTypeName, LayerFeatureType.treeLayerFeature);
            OLSourceUtility.removeFeatures(this.markerLayer.getSource(), features);
        }
      
    }


    /**
     * 创建标记点图层
     */
    _createMarkerLayer() {
        let markerSource = new ol.source.Vector({

        });

        //矢量标注图层
        let vectorLayer = new ol.layer.Vector({
            source: markerSource,
            name: 'markerlayer',
            visible: true,
        });
        return vectorLayer;
    }

    /**
     * 通过id查找
     * @param {*} featureId 
     */
    _findFeatureById(featureId) {

        if (!featureId) return;

        let features = POISearchLayer.markerLayer.getSource().getFeatures();

        let tempFeat = null;
        for (let tempFeatIndex in features) {
            tempFeat = features[tempFeatIndex];
            if (tempFeat.getId() === featureId) {
                return tempFeat;
            }
        }

        return null;
    }

}

POISearchLayer.markerLayer = null;

POISearchLayer.field_bindingObject = "bindingObject";