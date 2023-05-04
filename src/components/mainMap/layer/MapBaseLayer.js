/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-30 16:35:53
 * @LastEditTime: 2020-08-06 18:32:14
 * @LastEditors: Please set LastEditors
 */

import { OLLayerUtility } from "../../../utility/ol/OLLayerUtility.js";
import { BaseLayerConfig } from "../../../config/BaseLayerConfig.js";



/**
 * 地图底图
 */
export class MapBaseLayer {

    constructor() {
        this.curMap = null;
    }



    /**
     * 展示可见图层
     * @param {*} baseLayerType  底图类型
     */
    showVisibleLayer(baseLayerType) {
        let layers = this.curMap.getLayers();

        if (baseLayerType === MapBaseLayerType.Image) {

            let imgLayer = this.findBaseLayer(BaseLayerConfig.tdt_layer_img_c);
            if (!imgLayer) {
                imgLayer = BaseLayerConfig.createTdtXYZImg_cLayer(); // MapBaseLayer.createImgLayer();
                imgLayer.onAdd = function(map) {};

                layers.insertAt(0, imgLayer);
            } else {
                imgLayer.setVisible(true);
            }

            let ciaLayer = this.findBaseLayer(BaseLayerConfig.tdt_layer_cia_c);
            if (!ciaLayer) {
                ciaLayer = BaseLayerConfig.createTdtXYZCia_cLayer(); // MapBaseLayer.createCiaLayer();
                ciaLayer.onAdd = function(map) {};

                layers.insertAt(3, ciaLayer);
            } else {
                ciaLayer.setVisible(true);
            }

            this.hiddenLayer(MapBaseLayerType.Vector);
            this.hiddenLayer(MapBaseLayerType.Ter);
        } else if (baseLayerType === MapBaseLayerType.Vector) {

            let vecLayer = this.findBaseLayer(BaseLayerConfig.tdt_layer_vec_c);

            if (!vecLayer) {
                vecLayer = BaseLayerConfig.createTdtXYZVec_cLayer(); // MapBaseLayer.createVecLayer();
                vecLayer.onAdd = function(map) {};
                layers.insertAt(0, vecLayer);
            } else {
                vecLayer.setVisible(true);
            }


            let cvaLayer = this.findBaseLayer(BaseLayerConfig.tdt_layer_cva_c);
            if (!cvaLayer) {
                cvaLayer = BaseLayerConfig.createTdtXYZCva_cLayer(); // MapBaseLayer.createCvaLayer();
                cvaLayer.onAdd = function(map) {};



                layers.insertAt(3, cvaLayer);
            } else {
                cvaLayer.setVisible(true);
            }

            this.hiddenLayer(MapBaseLayerType.Image);
            this.hiddenLayer(MapBaseLayerType.Ter);
        } else if (baseLayerType === MapBaseLayerType.Ter) {

            let terLayer = this.findBaseLayer(BaseLayerConfig.tdt_layer_ter_c);
            if (!terLayer) {
                terLayer = BaseLayerConfig.createTdtXYZTer_cLayer(); //createTdtTer_cLayer
                terLayer.onAdd = function(map) {};

                layers.insertAt(0, terLayer);
            } else {
                terLayer.setVisible(true);
            }


            let ctaLayer = this.findBaseLayer(BaseLayerConfig.tdt_layer_cta_c);
            if (!ctaLayer) {
                ctaLayer = BaseLayerConfig.createTdtXYZCta_cLayer(); //createTdtCta_cLayer
                ctaLayer.onAdd = function(map) {};

                layers.insertAt(1, ctaLayer);
            } else {
                ctaLayer.setVisible(true);
            }

            this.hiddenLayer(MapBaseLayerType.Image);
            this.hiddenLayer(MapBaseLayerType.Vector);
        }

    }

    findBaseLayer(layerName) {
        let findLayer = null;
        let layers = this.curMap.getLayers().getArray();

        let allLayers = OLLayerUtility.getLayers(layers);

        let tempLayer = null;
        let tempName = null;

        for (let tempIndex = 0; tempIndex < allLayers.length; tempIndex++) {

            tempLayer = allLayers[tempIndex];
            tempName = tempLayer.get(BaseLayerConfig.key_layer_name);
            if (tempName && tempName === layerName) {
                findLayer = tempLayer;
                break;
            }
        }

        return findLayer;
    }


    /**
     * 隐藏图层
     * @param {*} layerType 
     */
    hiddenLayer(layerType) {

        let layers = this.curMap.getLayers().getArray();

        let allLayers = OLLayerUtility.getLayers(layers);


        let tempLayer = null;
        let tempName = null;

        for (let tempIndex = 0; tempIndex < allLayers.length; tempIndex++) {

            tempLayer = allLayers[tempIndex];

            tempName = tempLayer.get(BaseLayerConfig.key_layer_name);
            if (tempName) {
                if (layerType === MapBaseLayerType.Image) {
                    if (tempName === BaseLayerConfig.tdt_layer_img_c ||
                        tempName === BaseLayerConfig.tdt_layer_img_w ||
                        tempName === BaseLayerConfig.tdt_layer_cia_c ||
                        tempName === BaseLayerConfig.tdt_layer_cia_w) {
                        tempLayer.setVisible(false);
                    }
                } else if (layerType === MapBaseLayerType.Vector) {
                    if (tempName === BaseLayerConfig.tdt_layer_vec_c ||
                        tempName === BaseLayerConfig.tdt_layer_vec_w ||
                        tempName === BaseLayerConfig.tdt_layer_cva_c ||
                        tempName === BaseLayerConfig.tdt_layer_cva_w) {
                        tempLayer.setVisible(false);
                    }
                } else if (layerType === MapBaseLayerType.Ter) {
                    if (tempName === BaseLayerConfig.tdt_layer_ter_c ||
                        tempName === BaseLayerConfig.tdt_layer_ter_w ||
                        tempName === BaseLayerConfig.tdt_layer_cta_c ||
                        tempName === BaseLayerConfig.tdt_layer_cta_w) {
                        tempLayer.setVisible(false);
                    }
                }
            }

        }
    }

}

export const MapBaseLayerType = {

    Vector: "Vector",

    Image: "Image",

    Ter: "Ter",



}