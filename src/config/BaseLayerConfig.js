/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-15 21:12:42
 * @LastEditTime: 2022-11-17 13:55:06
 * @LastEditors: zkc
 */
import { OLWMTSConstants } from "../utility/ol/OLWMTSConstants.js";
import { ServiceUrlConfig } from "./ServiceUrlConfigJs.js";

export class BaseLayerConfig {
    constructor() {

        this.envType = null;
    }

    static getInstance() {
        if (!BaseLayerConfig._instance) {
            BaseLayerConfig._instance = new BaseLayerConfig();
        }

        return BaseLayerConfig._instance;
    }


    init() {
        // 
        BaseLayerConfig.tdt_layer_cia_c = BaseLayerConfig.tdt_layer_public_cia_c;
        BaseLayerConfig.tdt_layer_img_c = BaseLayerConfig.tdt_layer_public_img_c;
        BaseLayerConfig.tdt_layer_cva_c = BaseLayerConfig.tdt_layer_public_cva_c;
        BaseLayerConfig.tdt_layer_vec_c = BaseLayerConfig.tdt_layer_public_vec_c;
        BaseLayerConfig.tdt_layer_ter_c = BaseLayerConfig.tdt_layer_public_ter_c;
        BaseLayerConfig.tdt_layer_cta_c = BaseLayerConfig.tdt_layer_public_cta_c;
        BaseLayerConfig.tdt_layer_cia_w = BaseLayerConfig.tdt_layer_public_cia_w;
        BaseLayerConfig.tdt_layer_img_w = BaseLayerConfig.tdt_layer_public_img_w;
        BaseLayerConfig.tdt_layer_cva_w = BaseLayerConfig.tdt_layer_public_cva_w;
        BaseLayerConfig.tdt_layer_vec_w = BaseLayerConfig.tdt_layer_public_vec_w;
        BaseLayerConfig.tdt_layer_ter_w = BaseLayerConfig.tdt_layer_public_ter_w;
        BaseLayerConfig.tdt_layer_cta_w = BaseLayerConfig.tdt_layer_public_cta_w;

        BaseLayerConfig.tdt_matrixSet_cia_c = BaseLayerConfig.tdt_matrixSet_public_cia_c;
        BaseLayerConfig.tdt_matrixSet_img_c = BaseLayerConfig.tdt_matrixSet_public_img_c;
        BaseLayerConfig.tdt_matrixSet_cva_c = BaseLayerConfig.tdt_matrixSet_public_cva_c;
        BaseLayerConfig.tdt_matrixSet_vec_c = BaseLayerConfig.tdt_matrixSet_public_vec_c;
        BaseLayerConfig.tdt_matrixSet_ter_c = BaseLayerConfig.tdt_matrixSet_public_ter_c;
        BaseLayerConfig.tdt_matrixSet_cta_c = BaseLayerConfig.tdt_matrixSet_public_cta_c;

        BaseLayerConfig.tdt_matrixSet_cia_w = BaseLayerConfig.tdt_matrixSet_public_cia_w;
        BaseLayerConfig.tdt_matrixSet_img_w = BaseLayerConfig.tdt_matrixSet_public_img_w;
        BaseLayerConfig.tdt_matrixSet_cva_w = BaseLayerConfig.tdt_matrixSet_public_cva_w;
        BaseLayerConfig.tdt_matrixSet_vec_w = BaseLayerConfig.tdt_matrixSet_public_vec_w;
        BaseLayerConfig.tdt_matrixSet_ter_w = BaseLayerConfig.tdt_matrixSet_public_ter_w;
        BaseLayerConfig.tdt_matrixSet_cta_w = BaseLayerConfig.tdt_matrixSet_public_cta_w;
        BaseLayerConfig.format_tdt_tiles = BaseLayerConfig.format_tdt_public_tiles;

    }




    /**
     * 创建天地图经纬度矢量图层
     */
    static createTdtVec_cLayer() {
        let srs = ol.proj.get("EPSG:4326");

        let layerSource = new ol.source.WMTS({
            crossOrigin: '*',
            url: ServiceUrlConfig.tdt_vec_c_url,
            layer: BaseLayerConfig.tdt_layer_vec_c,
            matrixSet: BaseLayerConfig.tdt_matrixSet_vec_c,
            format: BaseLayerConfig.format_tdt_tiles,
            projection: srs,
            tileGrid: new ol.tilegrid.WMTS({
                tileSize: OLWMTSConstants.tileSize,
                extent: OLWMTSConstants.geoExtent, //范围
                origin: OLWMTSConstants.epsg4326_origin,
                resolutions: OLWMTSConstants.tdt4326_resolutions,
                matrixIds: OLWMTSConstants.tdt4326_matrixIds
            }),
            style: "default",
            wrapX: true
        });





        let vecLayer = new ol.layer.Tile({
            source: layerSource
        });

        vecLayer.set(BaseLayerConfig.key_layer_name, BaseLayerConfig.tdt_layer_vec_c);

        return vecLayer;
    }


    /**
     * 创建天地图xyz经纬度矢量图层
     */
    static createTdtXYZVec_cLayer() {

        let srs = ol.proj.get("EPSG:4326");


        let layerSource = new ol.source.XYZ({
            crossOrigin: '*',
            projection: srs,
            url: ServiceUrlConfig.tdt_xyz_vec_c_url,
            tileGrid: new ol.tilegrid.WMTS({
                tileSize: OLWMTSConstants.tileSize,
                extent: OLWMTSConstants.geoExtent, //范围
                origin: OLWMTSConstants.epsg4326_origin,
                resolutions: OLWMTSConstants.tdt4326_resolutionsEx,
                matrixIds: OLWMTSConstants.tdt4326_matrixIds
            }),
        });





        let vecLayer = new ol.layer.Tile({
            source: layerSource
        });

        vecLayer.set(BaseLayerConfig.key_layer_name, BaseLayerConfig.tdt_layer_vec_c);

        return vecLayer;
    }


    /**
     * 创建天地图经纬度矢量注记图层
     */
    static createTdtCva_cLayer() {
        let srs = ol.proj.get("EPSG:4326");

        let layerSource = new ol.source.WMTS({
            crossOrigin: '*',
            url: ServiceUrlConfig.tdt_cva_c_url,
            layer: BaseLayerConfig.tdt_layer_cva_c,
            matrixSet: BaseLayerConfig.tdt_matrixSet_cva_c,
            format: BaseLayerConfig.format_tdt_tiles,
            projection: srs,
            tileGrid: new ol.tilegrid.WMTS({
                tileSize: OLWMTSConstants.tileSize,
                extent: OLWMTSConstants.geoExtent, //范围
                origin: OLWMTSConstants.epsg4326_origin,
                resolutions: OLWMTSConstants.tdt4326_resolutions,
                matrixIds: OLWMTSConstants.tdt4326_matrixIds
            }),
            style: "default",
            wrapX: true
        });




        let cvaLayer = new ol.layer.Tile({
            source: layerSource
        });

        cvaLayer.set(BaseLayerConfig.key_layer_name, BaseLayerConfig.tdt_layer_cva_c);

        return cvaLayer;
    }

    /**
     * 创建天地图xyz经纬度矢量注记
     */
    static createTdtXYZCva_cLayer() {

        let srs = ol.proj.get("EPSG:4326");

        let layerSource = new ol.source.XYZ({
            crossOrigin: '*',
            projection: srs,
            url: ServiceUrlConfig.tdt_xyz_cva_c_url,
            tileGrid: new ol.tilegrid.TileGrid({
                tileSize: OLWMTSConstants.tileSize,
                extent: OLWMTSConstants.geoExtent, //范围
                origin: OLWMTSConstants.epsg4326_origin,
                resolutions: OLWMTSConstants.tdt4326_resolutionsEx
            }),
        })



        let cvaLayer = new ol.layer.Tile({
            source: layerSource
        });

        cvaLayer.set(BaseLayerConfig.key_layer_name, BaseLayerConfig.tdt_layer_cva_c);

        return cvaLayer;
    }

    /**
     * 创建天地图经纬度影像图层
     */
    static createTdtImg_cLayer() {
        let srs = ol.proj.get("EPSG:4326");

        let layerSource = new ol.source.WMTS({
            crossOrigin: '*',
            url: ServiceUrlConfig.tdt_img_c_url,
            layer: BaseLayerConfig.tdt_layer_img_c,
            matrixSet: BaseLayerConfig.tdt_matrixSet_img_c,
            format: BaseLayerConfig.format_tdt_tiles,
            projection: srs,
            tileGrid: new ol.tilegrid.WMTS({
                tileSize: OLWMTSConstants.tileSize,
                extent: OLWMTSConstants.geoExtent, //范围
                origin: OLWMTSConstants.epsg4326_origin,
                resolutions: OLWMTSConstants.tdt4326_resolutions,
                matrixIds: OLWMTSConstants.tdt4326_matrixIds
            }),
            style: "default",
            wrapX: true
        });



        let imgLayer = new ol.layer.Tile({
            source: layerSource
        });

        imgLayer.set(BaseLayerConfig.key_layer_name, BaseLayerConfig.tdt_layer_img_c);

        return imgLayer;
    }

    /**
     * 创建天地图xyz经纬度影像图层
     */
    static createTdtXYZImg_cLayer() {

        let srs = ol.proj.get("EPSG:4326");

        let layerSource = new ol.source.XYZ({
            crossOrigin: '*',
            projection: srs,
            url: ServiceUrlConfig.tdt_xyz_img_c_url,
            tileGrid: new ol.tilegrid.TileGrid({
                tileSize: OLWMTSConstants.tileSize,
                extent: OLWMTSConstants.geoExtent, //范围
                origin: OLWMTSConstants.epsg4326_origin,
                resolutions: OLWMTSConstants.tdt4326_resolutionsEx
            }),
        });



        let imgLayer = new ol.layer.Tile({
            source: layerSource
        });


        imgLayer.set(BaseLayerConfig.key_layer_name, BaseLayerConfig.tdt_layer_img_c);

        return imgLayer;
    }

    /**
     * 创建天地图经纬度影像注记图层
     */
    static createTdtCia_cLayer() {
        let srs = ol.proj.get("EPSG:4326");

        let layerSource = new ol.source.WMTS({
            crossOrigin: '*',
            url: ServiceUrlConfig.tdt_cia_c_url,
            layer: BaseLayerConfig.tdt_layer_cia_c,
            matrixSet: BaseLayerConfig.tdt_matrixSet_cia_c,
            format: BaseLayerConfig.format_tdt_tiles,
            projection: srs,
            tileGrid: new ol.tilegrid.WMTS({
                tileSize: OLWMTSConstants.tileSize,
                extent: OLWMTSConstants.geoExtent, //范围
                origin: OLWMTSConstants.epsg4326_origin,
                resolutions: OLWMTSConstants.tdt4326_resolutions,
                matrixIds: OLWMTSConstants.tdt4326_matrixIds
            }),
            style: "default",
            wrapX: true
        })



        let ciaLayer = new ol.layer.Tile({
            source: layerSource
        });

        ciaLayer.set(BaseLayerConfig.key_layer_name, BaseLayerConfig.tdt_layer_cia_c);

        return ciaLayer;
    }

    /**
     * 创建天地图xyz经纬度影像注记图层
     */
    static createTdtXYZCia_cLayer() {

        let srs = ol.proj.get("EPSG:4326");

        let layerSource = new ol.source.XYZ({
            crossOrigin: '*',
            projection: srs,
            url: ServiceUrlConfig.tdt_xyz_cia_c_url,
            tileGrid: new ol.tilegrid.TileGrid({
                tileSize: OLWMTSConstants.tileSize,
                extent: OLWMTSConstants.geoExtent, //范围
                origin: OLWMTSConstants.epsg4326_origin,
                resolutions: OLWMTSConstants.tdt4326_resolutionsEx
            }),
        });



        let ciaLayer = new ol.layer.Tile({
            source: layerSource
        });

        ciaLayer.set(BaseLayerConfig.key_layer_name, BaseLayerConfig.tdt_layer_cia_c);

        return ciaLayer;
    }

    static createAPIVec_cLayer() {
        let layer = [
            BaseLayerConfig.tdt_layer_vec_c, ServiceUrlConfig.tdt_vec_c_url,
            {
                type: "wmts",
                crs: OLWMTSConstants.crs_4326,
                wrapX: false,
                layer: BaseLayerConfig.tdt_layer_vec_c,
                matrixSet: BaseLayerConfig.tdt_matrixSet_vec_c,
                format: BaseLayerConfig.format_tdt_tiles,
                style: BaseLayerConfig.style_name_default,
                origin: OLWMTSConstants.epsg4326_origin,
                resolutions: OLWMTSConstants.tdt4326_resolutions,
                matrixIds: OLWMTSConstants.tdt4326_matrixIds
            }
        ];

        return layer;
    }


    /**
     * 创建天地图xyz经纬度矢量图层
     */
    static createAPITdtXYZVec_cLayer() {

        let layer = [
            BaseLayerConfig.tdt_layer_vec_c, ServiceUrlConfig.tdt_xyz_vec_c_url,
            {
                type: "TileLayerXYZ",
                crs: OLWMTSConstants.crs_4326,
                origin: OLWMTSConstants.epsg4326_origin,
                resolutions: OLWMTSConstants.tdt4326_resolutions,
                matrixIds: OLWMTSConstants.tdt4326_matrixIds
            }
        ];

        return layer;
    }

    /**
     * 创建天地图xyz经纬度矢量图层
     */
    static createAPITdtXYZImg_cLayer() {

        let layer = [
            BaseLayerConfig.tdt_layer_img_c, ServiceUrlConfig.tdt_xyz_img_c_url,
            {
                type: "TileLayerXYZ",
                crs: OLWMTSConstants.crs_4326,
                origin: OLWMTSConstants.epsg4326_origin,
                resolutions: OLWMTSConstants.tdt4326_resolutions,
                matrixIds: OLWMTSConstants.tdt4326_matrixIds
            }
        ];

        return layer;
    }


    /**
     * 创建天地图经纬度地形图层
     */
    static createTdtTer_cLayer() {
        let srs = ol.proj.get("EPSG:4326");

        let layerSource = new ol.source.WMTS({
            crossOrigin: '*',
            url: ServiceUrlConfig.tdt_ter_c_url,
            layer: BaseLayerConfig.tdt_layer_ter_c,
            matrixSet: BaseLayerConfig.tdt_matrixSet_ter_c,
            format: BaseLayerConfig.format_tdt_tiles,
            projection: srs,
            tileGrid: new ol.tilegrid.WMTS({
                tileSize: OLWMTSConstants.tileSize,
                extent: OLWMTSConstants.geoExtent, //范围
                origin: OLWMTSConstants.epsg4326_origin,
                resolutions: OLWMTSConstants.tdt4326_resolutions,
                matrixIds: OLWMTSConstants.tdt4326_matrixIds
            }),
            style: "default",
            wrapX: true
        });




        let terLayer = new ol.layer.Tile({
            source: layerSource
        });

        terLayer.set(BaseLayerConfig.key_layer_name, BaseLayerConfig.tdt_layer_ter_c);

        return terLayer;
    }

    /**
     * 创建天地图xyz经纬度地形图层
     */
    static createTdtXYZTer_cLayer() {

        let srs = ol.proj.get("EPSG:4326");

        let layerSource = new ol.source.XYZ({
            crossOrigin: '*',
            projection: srs,
            url: ServiceUrlConfig.tdt_xyz_ter_c_url,
            tileGrid: new ol.tilegrid.TileGrid({
                tileSize: OLWMTSConstants.tileSize,
                extent: OLWMTSConstants.geoExtent, //范围
                origin: OLWMTSConstants.epsg4326_origin,
                resolutions: OLWMTSConstants.tdt4326_resolutionsEx
            }),
        });



        let terLayer = new ol.layer.Tile({
            source: layerSource
        });

        terLayer.set(BaseLayerConfig.key_layer_name, BaseLayerConfig.tdt_layer_ter_c);

        return terLayer;
    }

    /**
     * 创建天地图经纬度影像注记图层
     */
    static createTdtCta_cLayer() {
        let srs = ol.proj.get("EPSG:4326");

        let layerSource = new ol.source.WMTS({
            crossOrigin: '*',
            url: ServiceUrlConfig.tdt_cta_c_url,
            layer: BaseLayerConfig.tdt_layer_cta_c,
            matrixSet: BaseLayerConfig.tdt_matrixSet_cta_c,
            format: BaseLayerConfig.format_tdt_tiles,
            projection: srs,
            tileGrid: new ol.tilegrid.WMTS({
                tileSize: OLWMTSConstants.tileSize,
                extent: OLWMTSConstants.geoExtent, //范围
                origin: OLWMTSConstants.epsg4326_origin,
                resolutions: OLWMTSConstants.tdt4326_resolutions,
                matrixIds: OLWMTSConstants.tdt4326_matrixIds
            }),
            style: "default",
            wrapX: true
        });




        let ctaLayer = new ol.layer.Tile({
            source: layerSource
        });

        ctaLayer.set(BaseLayerConfig.key_layer_name, BaseLayerConfig.tdt_layer_cta_c);

        return ctaLayer;
    }


    /**
     * 创建天地图xyz经纬度地形注记图层
     */
    static createTdtXYZCta_cLayer() {

        let srs = ol.proj.get("EPSG:4326");

        let layerSource = new ol.source.XYZ({
            crossOrigin: '*',
            projection: srs,
            url: ServiceUrlConfig.tdt_xyz_cta_c_url,
            tileGrid: new ol.tilegrid.TileGrid({
                tileSize: OLWMTSConstants.tileSize,
                extent: OLWMTSConstants.geoExtent, //范围
                origin: OLWMTSConstants.epsg4326_origin,
                resolutions: OLWMTSConstants.tdt4326_resolutionsEx
            }),
        });


        let ctaLayer = new ol.layer.Tile({
            source: layerSource
        });

        ctaLayer.set(BaseLayerConfig.key_layer_name, BaseLayerConfig.tdt_layer_cta_c);

        return ctaLayer;
    }


}

BaseLayerConfig._instance = null;

BaseLayerConfig.map_view_init_centerPoint = [108.5525, 34.32];
BaseLayerConfig.map_view_init_initLevel = 6;
BaseLayerConfig.map_view_maxLevel = 23;
BaseLayerConfig.map_view_minLevel = 2;




BaseLayerConfig.key_layer_name = 'ezname';

/**
 * 影像注记 经纬度
 */
BaseLayerConfig.tdt_layer_cia_c = null;

/**
 * 影像 经纬度
 */
BaseLayerConfig.tdt_layer_img_c = null;

/**
 * 矢量注记 经纬度
 */
BaseLayerConfig.tdt_layer_cva_c = null;

/**
 * 矢量 经纬度
 */
BaseLayerConfig.tdt_layer_vec_c = null;




/**
 * 地形晕眩 经纬度
 */
BaseLayerConfig.tdt_layer_ter_c = null;

/**
 * 地形注记 经纬度
 */
BaseLayerConfig.tdt_layer_cta_c = null;


/**
 * 影像注记 平面
 */
BaseLayerConfig.tdt_layer_cia_w = null;

/**
 * 影像 平面
 */
BaseLayerConfig.tdt_layer_img_w = null;

/**
 * 矢量注记 平面
 */
BaseLayerConfig.tdt_layer_cva_w = null;


/**
 * 矢量 平面
 */
BaseLayerConfig.tdt_layer_vec_w = null;

/**
 * 地形晕眩 平面
 */
BaseLayerConfig.tdt_layer_ter_w = null;

/**
 * 地形注记 平面
 */
BaseLayerConfig.tdt_layer_cta_w = null;


BaseLayerConfig.tdt_matrixSet_cia_c = null;
BaseLayerConfig.tdt_matrixSet_img_c = null;
BaseLayerConfig.tdt_matrixSet_cva_c = null;
BaseLayerConfig.tdt_matrixSet_vec_c = null;
BaseLayerConfig.tdt_matrixSet_ter_c = null;
BaseLayerConfig.tdt_matrixSet_cta_c = null;

BaseLayerConfig.tdt_matrixSet_cia_w = null;
BaseLayerConfig.tdt_matrixSet_img_w = null;
BaseLayerConfig.tdt_matrixSet_cva_w = null;
BaseLayerConfig.tdt_matrixSet_vec_w = null;
BaseLayerConfig.tdt_matrixSet_ter_w = null;
BaseLayerConfig.tdt_matrixSet_cta_w = null;

BaseLayerConfig.style_name_default = 'default';

BaseLayerConfig.format_tdt_tiles = "tiles";

/**
 * 
 */
BaseLayerConfig.format_png = 'image/png';



/**
 * 影像注记 经纬度
 */
BaseLayerConfig.tdt_layer_public_cia_c = 'cia';

/**
 * 影像 经纬度
 */
BaseLayerConfig.tdt_layer_public_img_c = 'img';

/**
 * 矢量注记 经纬度
 */
BaseLayerConfig.tdt_layer_public_cva_c = 'cva   ';

/**
 * 矢量 经纬度
 */
BaseLayerConfig.tdt_layer_public_vec_c = 'vec';


/**
 * 地形晕眩 经纬度
 */
BaseLayerConfig.tdt_layer_public_ter_c = 'ter';

/**
 * 地形注记 经纬度
 */
BaseLayerConfig.tdt_layer_public_cta_c = 'cta';


/**
 * 影像注记 平面
 */
BaseLayerConfig.tdt_layer_public_cia_w = 'cia';

/**
 * 影像 平面
 */
BaseLayerConfig.tdt_layer_public_img_w = 'img';

/**
 * 矢量注记 平面
 */
BaseLayerConfig.tdt_layer_public_cva_w = 'cva';


/**
 * 矢量 平面
 */
BaseLayerConfig.tdt_layer_public_vec_w = 'vec';

/**
 * 地形晕眩 平面
 */
BaseLayerConfig.tdt_layer_public_ter_w = 'ter';

/**
 * 地形注记 平面
 */
BaseLayerConfig.tdt_layer_public_cta_w = 'cta';

/**
 * 矩阵集名称c
 */
BaseLayerConfig.matrixSet_public_name_c = 'c';

/**
 * 矩阵集名称w
 */
BaseLayerConfig.matrixSet_public_name_w = 'w';


BaseLayerConfig.tdt_matrixSet_public_cia_c = BaseLayerConfig.matrixSet_public_name_c;
BaseLayerConfig.tdt_matrixSet_public_img_c = BaseLayerConfig.matrixSet_public_name_c;
BaseLayerConfig.tdt_matrixSet_public_cva_c = BaseLayerConfig.matrixSet_public_name_c;
BaseLayerConfig.tdt_matrixSet_public_vec_c = BaseLayerConfig.matrixSet_public_name_c;
BaseLayerConfig.tdt_matrixSet_public_ter_c = BaseLayerConfig.matrixSet_public_name_c;
BaseLayerConfig.tdt_matrixSet_public_cta_c = BaseLayerConfig.matrixSet_public_name_c;

BaseLayerConfig.tdt_matrixSet_public_cia_w = BaseLayerConfig.matrixSet_public_name_w;
BaseLayerConfig.tdt_matrixSet_public_img_w = BaseLayerConfig.matrixSet_public_name_w;
BaseLayerConfig.tdt_matrixSet_public_cva_w = BaseLayerConfig.matrixSet_public_name_w;
BaseLayerConfig.tdt_matrixSet_public_vec_w = BaseLayerConfig.matrixSet_public_name_w;
BaseLayerConfig.tdt_matrixSet_public_ter_w = BaseLayerConfig.matrixSet_public_name_w;
BaseLayerConfig.tdt_matrixSet_public_cta_w = BaseLayerConfig.matrixSet_public_name_w;

BaseLayerConfig.format_tdt_public_tiles = 'tiles';
