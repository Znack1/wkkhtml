/*
 * @Author: your name
 * @Date: 2020-03-14 10:52:35
 * @LastEditTime: 2020-05-02 14:14:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \html\src\utility\ol\WMTSLayerUtilityJs.js
 */
export class WMTSLayerUtility {
    constructor() {
        this.epsg = "EPSG:4326";

        this.wmtsUrl = null;

        this.serviceName = null;

        this.matrixSetName = null;

        this.formatName = null;

        this.tileSize = [256, 256];

        this.tileGridExtent = null;

        //epsg3857_origin: [-20037508.342787001, 20037508.342787001],
        //epsg4326_origin: [-180, 90],
        this.tileGridOrigin = null;

        this.tileGridResolutions = null;

        this.tileGridMatrixIds = null;

        this.token = null;
    }


    /**
     * 创建wmts图层
     */
    createWmtsLayer() {
        let srs = ol.proj.get(this.epsg);

        let newUrl = this.wmtsUrl;

        //创建数据源
        if (this.token) {
            if (!newUrl.endsWith("?")) {
                newUrl = newUrl + "?"
            }

            newUrl = newUrl + "tk=" + this.token;
        }
        
        
        let layerSource = new ol.source.WMTS({
            crossOrigin: '*',
            url: newUrl,
            layer: this.serviceName,
            matrixSet: this.matrixSetName,
            format: this.formatName,
            projection: srs,
            tileGrid: new ol.tilegrid.WMTS({
                tileSize: this.tileSize,
                extent: this.tileGridExtent, //范围
                origin: this.tileGridOrigin,
                resolutions: this.tileGridResolutions,
                matrixIds: this.tileGridMatrixIds
            }),
            style: "default",
            wrapX: false
        });

        let vecLayer = new ol.layer.Tile({
            source: layerSource
        });

        vecLayer.set("ezname", this.serviceName);

        return vecLayer;
    }

}