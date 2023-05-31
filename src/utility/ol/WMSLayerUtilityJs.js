import { WMSLayerItemAttrbute } from "../../model/LayerCatalogItem";

import $ from 'jquery'
/*
 * @Author: your name
 * @Date: 2020-03-14 10:52:35
 * @LastEditTime: 2021-10-18 17:14:12
 * @LastEditors: zkc
 * @Description: 暂时仅支持单个图层的过滤查询
 * @FilePath: /fmmodulelib/packages/utility/ol/WMSLayerUtilityJs.js
 */
export class WMSLayerUtility {
    constructor() {

        this.url = null;
        this.layers = null;
        this.version = null;
        this.width = null;
        this.height = null;
        this.bbox = null;
        this.epsg = null;
        this.cqlFilter = null;
        this.cqlXmlString = null;
        this.layerType = null;
        this.formatName = null;

        this._params = null;
        // 增加参数
        this.requestType = null;// cql  xml, 逻辑思路 1. cql类型： 需要配置cql 和 style名称  get方式；    2.xml类型: 遍历多个rule，找到每个rule下的filter，如果没有filter，创建filter节点；如果有filter，将我们的filter追加进去   
        this.style = null;// 有cql时  可读取这个样式 ，可为空


    }
    getWmsParams () {
        this._params = {
            'LAYERS': this.layers,
            'VERSION': this.version,
            'CRS': this.epsg
        }
        if (this.width) {
            this._params.WIDTH = this.width;
        }
        if (this.height) {
            this._params.HEIGHT = this.height;
        }
        if (this.bbox) {
            this._params.BBOX = this.bbox;
        }
        if(this.style){
            this._params.STYLES = this.style;
        }
        if(this.cqlFilter){
            this._params.CQL_FILTER = this.cqlFilter;
        }
        if(this.formatName){
            this._params.FORMAT = this.formatName;
        }
    }


    /**
     * 创建wmts图层 切片方式
     */
    createWmsLayer () {
        let layerSource = null;
        console.log(this.requestType == WMSLayerUtilityConstant.RequestType.XML && this.cqlXmlString)
        if (this.requestType == WMSLayerUtilityConstant.RequestType.XML && this.cqlXmlString) {
            layerSource = this.createTileWMSSourceFliterByXml();
        } else  {
            layerSource = this.createTileWMSSource();
        }
        let vecLayer = new ol.layer.Tile({
            source: layerSource
        });

        vecLayer.set("ezname", this.layers);

        return vecLayer;
    }


    /**
     * 创建wmts图层 图像方式
     */
    createWmsLayerEx () {
        let layerSource = null;
        if (this.requestType == WMSLayerUtilityConstant.RequestType.XML && this.cqlXmlString) {
            layerSource = this.createTileWMSSourceFliterByXml();
        } else {
            layerSource = this.createImageWMSSource();
        }

        let wmsLayer = new ol.layer.Image({
            source: layerSource
        });
        wmsLayer.set("ezname", this.serviceName);

        return wmsLayer;
    }

    createTileWMSSource () {
        let source = new ol.source.TileWMS({
            crossOrigin: '*',
            url: this.url,
            params: this._params
        })
        return source;
    }
    // 根据xml过滤条件过滤图层  创建TileWMS 数据源
    createTileWMSSourceFliterByXml () {
        let self = this;
        let wmsSource = new ol.source.TileWMS({
            url: self.url,
            params: self._params,
            tileLoadFunction: function (tile, src) {

                let srcArr = src.split('?');
                let params = {};
                let filters = srcArr[1].split('&');
                _.each(filters, (filter) => {
                    let tempFilters = filter.split('=');
                    if (tempFilters.length > 1) {
                        params[tempFilters[0]] = tempFilters[1]
                    }
                })
                let xmlStr = self._getWmsSLDStr(unescape(params.BBOX));
                console.log(params.BBOX)
                if (!xmlStr) return null;
                $.ajax({
                    url: src,
                    data: xmlStr,
                    headers: {
                        'Content-Type': 'text/xml'  //multipart/form-data;boundary=--xxxxxxx   application/json
                    },

                    xhrFields: { responseType: "arraybuffer" },
                    type: 'POST',
                    success: function (data) {
                        console.log(data)
                        var arrayBufferView = new Uint8Array(data);
                        var blob = new Blob([arrayBufferView], { type: 'image/png' });
                        var urlCreator = window.URL || window.webkitURL;
                        var imageUrl = urlCreator.createObjectURL(blob);
                        tile.getImage().src = imageUrl;
                    }
                });
            }
        });
        return wmsSource;
    }

    // 根据xml过滤条件过滤图层  创建ImageWMS 数据源
    createImageWMSSourceFliterByXml () {
        let self = this;
        let wmsSource = new ol.source.ImageWMS({
            url: self.url,
            params: self._params,
            tileLoadFunction: function (tile, src) {

                let srcArr = src.split('?');
                let params = {};
                let filters = srcArr[1].split('&');
                _.each(filters, (filter) => {
                    let tempFilters = filter.split('=');
                    if (tempFilters.length > 1) {
                        params[tempFilters[0]] = tempFilters[1]
                    }
                })
                let xmlStr = self._getWmsSLDStr(unescape(params.BBOX));
                console.log(params.BBOX)
                if (!xmlStr) return null;
                $.ajax({
                    url: src,
                    data: xmlStr,
                    headers: {
                        'Content-Type': 'text/xml'  //multipart/form-data;boundary=--xxxxxxx   application/json
                    },

                    xhrFields: { responseType: "arraybuffer" },
                    type: 'POST',
                    success: function (data) {
                        console.log(data)
                        var arrayBufferView = new Uint8Array(data);
                        var blob = new Blob([arrayBufferView], { type: 'image/png' });
                        var urlCreator = window.URL || window.webkitURL;
                        var imageUrl = urlCreator.createObjectURL(blob);
                        tile.getImage().src = imageUrl;
                    }
                });
            }
        });
        return wmsSource;
    }


    // 获取完整的xml  sld信息
    _getWmsSLDStr (bbox) {
        if (!this.layers || !this.epsg || !this.url || !this.cqlXmlString || !this.layerType || !this.bbox) return null;


        let bboxArr = bbox.split(',');
        let xml = '<?xml version="1.0" encoding="utf-8"?>'

            + '<ogc:GetMap xmlns:ogc="http://www.opengis.net/ows" xmlns:gml="http://www.opengis.net/gml" version="1.1.0" service="WMS">'

            + '<StyledLayerDescriptor version="1.0.0">'
            + '<NamedLayer>'
            + '<Name>' + this.layers + '</Name>'
            + '<UserStyle>'
            + '<FeatureTypeStyle>'
            + '<Rule>'
            + '<Filter>'
            + this.cqlXmlString.substring(38)
            + '</Filter>';
        if (this.layerType == WMSLayerItemAttrbute.layerTypeConst.Point) {
            xml += this.getPointSymbolizer();
        } else if (this.layerType == WMSLayerItemAttrbute.layerTypeConst.Line) {
            xml += this.getLineSymbolizer();

        } else if (this.layerType == WMSLayerItemAttrbute.layerTypeConst.Polygon) {
            xml += this.getPolygonSymbolizer();
        }

        xml += ' </Rule>'
            + ' </FeatureTypeStyle>'
            + '</UserStyle>'
            + '</NamedLayer> '
            + '</StyledLayerDescriptor>'
            + '<BoundingBox srsName="http://www.opengis.net/gml/srs/epsg.xml#' + this.epsg.substring(5) + '">'
            + '<gml:coord><gml:X>' + bboxArr[0] + '</gml:X><gml:Y>' + bboxArr[1] + '</gml:Y></gml:coord>'
            + '<gml:coord><gml:X>' + bboxArr[2] + '</gml:X><gml:Y>' + bboxArr[3] + '</gml:Y></gml:coord>'
            + '</BoundingBox>'

            + '<Output>'
            + '<Format>' + this.formatName + '</Format>'
            + '<Transparent>true</Transparent>'
            + '<Size>'
            + '<Width>' + this.width + '</Width>'
            + '<Height>' + this.height + '</Height>'
            + '   </Size>'
            + ' </Output>'
            + ' <Exceptions>application/vnd.ogc.se+xml</Exceptions> '
            + '</ogc:GetMap>';

        return xml;
    }
    getPointSymbolizer () {
        let pointSymbolizer =
            '<PointSymbolizer>'
            + '<Graphic>'
            + ' <Mark>'
            + ' <WellKnownName>square</WellKnownName>'
            + '    <Fill>'
            + '      <CssParameter name="fill">#FF0000</CssParameter>'
            + '     </Fill>'
            + '   </Mark>'
            + ' <Size>6</Size>'
            + ' </Graphic>'
            + ' </PointSymbolizer>';
        return pointSymbolizer;
    }
    getLineSymbolizer () {
        let lineSymbolizer =
            '<LineSymbolizer>'
            + '<Stroke>'
            + ' <CssParameter name="stroke">#0000FF</CssParameter>'
            + '</Stroke>'
            + '</LineSymbolizer>';
        return lineSymbolizer;
    }
    getPolygonSymbolizer () {
        let polygonSymbolizer =
            '<PolygonSymbolizer>'
            + '<Fill>'
            + '<CssParameter name="fill">#AAAAAA</CssParameter>'
            + '</Fill>'
            + '<Stroke>'
            + '<CssParameter name="stroke">#000000</CssParameter>'
            + ' <CssParameter name="stroke-width">1</CssParameter>'
            + ' </Stroke>'
            + '</PolygonSymbolizer>';
        return polygonSymbolizer;
    }
    getPointSymbolizer () {
        let pointSymbolizer =
            '<PointSymbolizer>'
            + '<Graphic>'
            + ' <Mark>'
            + ' <WellKnownName>square</WellKnownName>'
            + '    <Fill>'
            + '      <CssParameter name="fill">#FF0000</CssParameter>'
            + '     </Fill>'
            + '   </Mark>'
            + ' <Size>6</Size>'
            + ' </Graphic>'
            + ' </PointSymbolizer>';
        return pointSymbolizer;
    }
    createImageWMSSource () {
        let source = new ol.source.ImageWMS({
            crossOrigin: '*',
            ratio: 1,
            url: this.url,
            params: this._params
        })

        return source;
    }

}
export const WMSLayerUtilityConstant = {
    RequestType:{
        CQL:'CQL',
        XML:'XML',
        Labels:[
            { 'label': 'cql加载', 'value': 'CQL', id: 1 },
            { 'label': 'xml加载', 'value': 'XML', id: 2 }
        ]
    }
}