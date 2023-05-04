/*
 * @Author: your name
 * @Date: 2020-05-14 15:53:59
 * @LastEditTime: 2020-10-13 15:33:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \html\src\model\DrawGeometryJs.js
 */

import { GuidUtility } from "../common/GuidUtility.js";
import { GeometryUtility } from "../ol/GeometryUtility.js";
import { CustomArray } from "../common/CustomArray.js";
import { ArrayUtility } from "../common/ArrayUtility.js";


/**
 * 标绘项
 */
export class DrawItem {

    constructor() {

        this.id = GuidUtility.getGuid();

        this.type = null;
        this.name = null;
        //默认点图标
        this.image = null;

        this.coordString = null;

        this.coordinates = null;

        //圆的半径
        this.circleCenter = new Array();

        //圆半径字符串
        this.circleCenterString = null;

        //半径
        this.circleRadius = 0;

        this.crsCode = "EPSG:4326";
    }


    getFeatures() {
        let features = new Array();

        let newFeature = null;

        if (this.type === "point") {

            newFeature = new ol.Feature({
                geometry: new ol.geom.Point(this.coordinates),
                drawGeomPartType: DrawGeometryPartType.point,
                bindingObject: this
            });
            newFeature.setStyle(new ol.style.Style({

                image: new ol.style.Circle({
                    radius: 10,
                    fill: new ol.style.Fill({
                        color: 'red'
                    })
                }),
                text: new ol.style.Text({
                    font: '16px Microsoft YaHei',
                    offsetX: 0,
                    offsetY: -18,
                    text: this.name,
                    fill: new ol.style.Fill({
                        color: '#000'
                    })
                })
            }));
        } else if (this.type === "polyline") {

            let line = new ol.geom.LineString(this.coordinates);
            //线要素
            newFeature = new ol.Feature({
                geometry: line,
                drawGeomPartType: DrawGeometryPartType.polyline,
                bindingObject: this
            });
            newFeature.setStyle(new ol.style.Style({

                stroke: new ol.style.Stroke({
                    color: 'red',
                    width: 4
                }),
                text: new ol.style.Text({
                    font: '16px Microsoft YaHei',
                    offsetX: 0,
                    offsetY: -18,
                    text: this.name,
                    fill: new ol.style.Fill({
                        color: '#000'
                    })
                })
            }));
        } else if (this.type === "polygon" || this.type === "rectangle") {

            let ringArray = new Array();
            ringArray.push(this.coordinates);
            let pyn = new ol.geom.Polygon(ringArray);
            //面要素
            newFeature = new ol.Feature({
                geometry: pyn,
                drawGeomPartType: DrawGeometryPartType.polygon,
                bindingObject: this
            });
            newFeature.setStyle(new ol.style.Style({

                stroke: new ol.style.Stroke({
                    color: 'red',
                    width: 4
                }),
                text: new ol.style.Text({
                    font: '16px Microsoft YaHei',
                    offsetX: 0,
                    offsetY: -18,
                    text: this.name,
                    fill: new ol.style.Fill({
                        color: '#000'
                    })
                })
            }));
        } else if (this.type === "circle") {
            newFeature = new ol.Feature({
                geometry: new ol.geom.Circle(this.circleCenter, this.circleRadius),
                drawGeomPartType: DrawGeometryPartType.circle,
                bindingObject: this
            });
            newFeature.setStyle(new ol.style.Style({

                stroke: new ol.style.Stroke({
                    color: 'red',
                    width: 4
                }),
                text: new ol.style.Text({
                    font: '16px Microsoft YaHei',
                    offsetX: 0,
                    offsetY: -18,
                    text: this.name,
                    fill: new ol.style.Fill({
                        color: '#000'
                    })
                })
            }));
        }

        features.push(newFeature);

        return features;
    }


    getJsonString() {
        let jsonString = JSON.stringify(this);
        return jsonString;
    }

    getLength() {
        let lineLength = 0;

        let prjCoordinates = GeometryUtility.transformPoints(this.coordinates, this.crsCode, "EPSG:3857");
        let line = new ol.geom.LineString(prjCoordinates);
        lineLength = ol.sphere.getLength(line);

        return lineLength;
    }

    parseCoordinate() {

        if (!this.coordString) return;
        if (this.coordinates) return;


        if (this.type === "point" || this.type === "circle") {

            let coordinatesString = this.coordString.split(',');
            let coordinateXString = coordinatesString[0];
            let coordinateYString = coordinatesString[1];
            let coordinateX = parseFloat(coordinateXString);
            let coordinateY = parseFloat(coordinateYString);
            this.coordinates = [coordinateX, coordinateY];
        } else if (this.type === "polyline" ||
            this.type === "polygon" ||
            this.type === "rectangle") {
            let pnts = GeometryUtility.getPointsEx2(this.coordString);
            this.coordinates = pnts;
        } else if (this.type === "circle") {

        }


    }

    parseCircleCenter() {
        if (!this.circleCenterString) return;

        let coordinatesString = this.circleCenterString.split(',');
        let coordinateXString = coordinatesString[0];
        let coordinateYString = coordinatesString[1];

        let coordinateX = parseFloat(coordinateXString);
        let coordinateY = parseFloat(coordinateYString);
        this.circleCenter = [coordinateX, coordinateY];
    }

    getArea() {
        let pynArea = 0;

        let prjCoordinates = GeometryUtility.transformPoints(this.coordinates, this.crsCode, "EPSG:3857");

        let ringArray = new Array();
        ringArray.push(prjCoordinates);
        let pyn = new ol.geom.Polygon(ringArray);
        if (pyn) {
            pynArea = pyn.getArea();
        }

        return pynArea;
    }

    static getDefaultStyle() {

        let defaultStyle = new ol.style.Style();

        // let defaultPointStyle = new ol.style.Icon(({
        //     anchor: [0.5, 46],
        //     anchorXUnits: 'fraction',
        //     anchorYUnits: 'pixels',
        //     // src: drawGeometry.image
        // }));

        let defaultLineStyle = new ol.style.Stroke({
            color: '#3385ff',
            width: 8,
            lineCap: 'round',
            lineJoin: 'round'
        })

        let defaultFillStyle = new ol.style.Fill({
            color: '#3385ff',
        })

        // defaultStyle.setImage(defaultPointStyle);
        defaultStyle.setStroke(defaultLineStyle);
        defaultStyle.setFill(defaultFillStyle);

        return defaultStyle;
    }



    static formJson(jsonObject) {
        let drawItem = null;
        if (!jsonObject) return drawItem;

        if (!jsonObject.type) return drawItem;

        if (jsonObject.type === "arrow") {
            drawItem = PolylineArrow.formJson(jsonObject);
        } else {
            drawItem = new DrawItem();
            DrawItem.getBasicInfofromJson(drawItem, jsonObject);
        }

        return drawItem;
    }

    static getBasicInfofromJson(drawItem, jsonObject) {

        if (!jsonObject) return layerItem;

        drawItem.id = jsonObject.id;
        drawItem.type = jsonObject.type;
        drawItem.image = jsonObject.image;
        drawItem.coordString = jsonObject.coordString;
        drawItem.circleCenterString = jsonObject.circleCenterString;

        if (drawItem.coordString) {
            drawItem.parseCoordinate();
        }

        if (drawItem.circleCenterString) {
            drawItem.parseCircleCenter();
        }

        drawItem.crsCode = jsonObject.crsCode;
    }

    /**
     * 获取终点
     */
    getEndPoint() {
        let endPoint = null;

        if (!this.coordinates) return endPoint;

        endPoint = this.coordinates[this.coordinates.length - 1];

        return endPoint;
    }


    getEndPointsRotation() {
        let rotate = 0;
        /** 最后两个点 */
        if (!this.coordinates) return rotate;

        let len = this.coordinates.length;
        let startPoint = this.coordinates[len - 2];
        let endPoint = this.coordinates[len - 1];
        let dx = endPoint[0] - startPoint[0];
        let dy = endPoint[1] - startPoint[1];
        rotate = Math.atan2(dy, dx);
        if (rotate > 0) {
            let rad = 360 - (180 * parseFloat(rotate) / Math.PI);
            rotate = rad * Math.PI / 180;
        } else {
            rotate = Math.abs(Number(rotate));
        }

        return rotate;
    }

}

DrawItem.Field_binding_object = "bindingObject";


export class PolylineArrow extends DrawItem {
    constructor() {
        super();

        this.arrowCoordinates = null;
        this.arrowCoordString = null;
        this.arrowRotation = null;
        this.arrowPoints = 3;
        this.radius = 10;
    }


    parseCoordinate() {

        if (!this.coordString) return;
        if (this.coordinates) return;

        let pnts = GeometryUtility.getPointsEx2(this.coordString);
        this.coordinates = pnts;
        this.arrowRotation = this.getEndPointsRotation();
        this.arrowCoordinates = this.getEndPoint();
        if (this.arrowCoordinates) {
            this.arrowCoordString = this.arrowCoordinates[0] + "," + this.arrowCoordinates[1];
        }
    }

    getFeatures() {
        let features = new Array();

        let line = new ol.geom.LineString(this.coordinates);
        //线要素
        let lineFeature = new ol.Feature({
            geometry: line,
            drawGeomPartType: DrawGeometryPartType.arrow_polyline,
            bindingObject: this
        });
        features.push(lineFeature);

        let arrowFeature = new ol.Feature({
            geometry: new ol.geom.Point(this.arrowCoordinates),
            drawGeomPartType: DrawGeometryPartType.arrow_end_point,
            bindingObject: this
        });
        features.push(arrowFeature);

        return features;
    }

    static formJson(jsonObject) {
        let drawItem = null;
        if (!jsonObject) return drawItem;

        drawItem = new PolylineArrow();
        drawItem.arrowRotation = jsonObject.arrowRotation;
        drawItem.arrowPoints = jsonObject.arrowPoints;
        drawItem.radius = jsonObject.radius;
        DrawItem.getBasicInfofromJson(drawItem, jsonObject);


        return drawItem;
    }

}

export class DrawItems extends CustomArray {
    constructor() {
        super();
    }


    getFeatures() {
        let features = new Array();

        let tempDrawItem = null;
        let tempFeatures = null;
        for (let tempIndex = 0; tempIndex < this.objects.length; tempIndex++) {
            tempDrawItem = this.objects[tempIndex];
            if (!tempDrawItem) continue;
            tempFeatures = tempDrawItem.getFeatures();
            ArrayUtility.addTargetToOri(features, tempFeatures);
        }

        return features;
    }


    static formJson(jsonObjects) {

        let drawItems = new DrawItems();

        if (!jsonObjects) return drawItems;

        let tempDrawItem = null;
        for (let tempJsonIndex = 0; tempJsonIndex < jsonObjects.length; tempJsonIndex++) {
            tempDrawItem = DrawItem.formJson(jsonObjects[tempJsonIndex]);
            if (tempDrawItem) {
                drawItems.push(tempDrawItem);
            }
        }

        return drawItems;
    }

    static findFeaturesByGeomPartType(features, geomPartType) {
        let findFeatures = new Array();

        if (!geomPartType) return findFeatures;

        let tempFeature = null;
        for (let tempFeatureIndex = 0; tempFeatureIndex < features.length; tempFeatureIndex++) {
            tempFeature = features[tempFeatureIndex];
            if (tempFeature && tempFeature.get(DrawGeometryPartType.feature_draw_geom_part_Type) === geomPartType) {
                findFeatures.push(tempFeature);
            }
        }

        return findFeatures;
    }

}

export const DrawGeometryPartType = {
    //点
    point: "point",

    //线
    polyline: "polyline",

    //面
    polygon: "polygon",

    //箭头线
    arrow_polyline: "arrow_polyline",

    //箭头终点
    arrow_end_point: "arrow_end_point",

    //圆
    circle: "circle",

    //矩形
    rectangle: "rectangle",

    //标绘
    feature_draw_geom_part_Type: "drawGeomPartType",

}



export class DrawGeometryUtility {
    constructor() {
        this.curMap = null;
    }

    draw(drawType, callback) {
        if (!drawType || !callback) return;
        //后续修改为DrawGeometryType枚举中获取值
        if (drawType === "point") {
            this.curMap.changeDragMode("drawPoint", function(e) {
                let drawGeometry = new DrawItem();
                //针对点的话，7指的是7个像素，不是经纬度
                drawGeometry.circleRadius = 7;
                drawGeometry.type = "point";
                drawGeometry.coordString = e.coordString;
                drawGeometry.parseCoordinate();
                callback(drawGeometry);
            });
        } else if (drawType === "polyline") {
            this.curMap.changeDragMode("drawPolyline", function(e) {

                let drawGeometry = new DrawItem();
                drawGeometry.type = "polyline";
                drawGeometry.coordString = e.coordString;
                drawGeometry.parseCoordinate();
                callback(drawGeometry);
            });
        } else if (drawType === "polygon") {
            this.curMap.changeDragMode("drawPolygon", function(e) {
                let drawGeometry = new DrawItem();
                drawGeometry.type = "polygon";
                drawGeometry.coordString = e.coordString;
                drawGeometry.parseCoordinate();
                callback(drawGeometry);
            });
        } else if (drawType === "arrow") {
            this.curMap.changeDragMode("drawPolyline", function(e) {

                let drawGeometry = new PolylineArrow();
                drawGeometry.type = "arrow";
                drawGeometry.coordString = e.coordString;
                drawGeometry.parseCoordinate();

                callback(drawGeometry);
            });
        } else if (drawType === "circle") {
            this.curMap.changeDragMode("drawCircle", function(e) {

                let drawGeometry = new DrawItem();

                let circleGeometry = e.getGeometry();
                drawGeometry.circleCenter = circleGeometry.getCenter();
                let circleExtent = circleGeometry.getExtent();

                if (circleExtent && circleExtent.length == 4) {
                    drawGeometry.circleRadius = Math.abs((circleExtent[2] - circleExtent[0])) / 2;
                }

                if (drawGeometry.circleCenter) {
                    drawGeometry.circleCenterString = drawGeometry.circleCenter[0] + "," + drawGeometry.circleCenter[1];
                }

                drawGeometry.type = "circle";
                drawGeometry.coordString = e.coordString;
                drawGeometry.parseCoordinate();
                callback(drawGeometry);
            });
        } else if (drawType === "rectangle") {
            this.curMap.changeDragMode("drawRect", function(e) {

                let pynString = GeometryUtility.getPolygonStringByRectString(e.coordString);


                let drawGeometry = new DrawItem();
                drawGeometry.type = "rectangle";
                drawGeometry.coordString = pynString;
                drawGeometry.parseCoordinate();
                callback(drawGeometry);
            });
        }

    }

    clearDragMode() {
        this.curMap.clearDragMode();
    }


}