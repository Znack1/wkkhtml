/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-17 15:13:50
 * @LastEditTime: 2021-03-26 14:39:57
 * @LastEditors: zkc
 */
export class GeometryUtility {
    /**
     * 
     * @param {*} pointStrings  x,y;x,y;
     */
    static getPointsEx(pointStrings) {
        let pnts = new Array();
        if (!pointStrings) return pnts;

        let pointStringSplits = pointStrings.split(";");


        let tempPntString = null;
        let tempPntStringSplitArray = null;
        let tempPntX = null;
        let tempPntY = null;
        let tempCoordinate = null;
        for (let pntIndex = 0; pntIndex < pointStringSplits.length; pntIndex++) {
            tempPntString = pointStringSplits[pntIndex];
            if (!tempPntString) continue;


            tempPntStringSplitArray = tempPntString.split(",");
            if (!tempPntStringSplitArray || tempPntStringSplitArray.length != 2) continue;
            tempPntX = parseFloat(tempPntStringSplitArray[0]);
            tempPntY = parseFloat(tempPntStringSplitArray[1]);
            tempCoordinate = [tempPntX, tempPntY];
            pnts.push(tempCoordinate);
        }

        return pnts;

    }

    /**
     * 
     * @param {*} pointStrings [[x,y],[x,y]]
     */
    static getPoints(pointStrings) {
        let pnts = new Array();
        if (!pointStrings) return pnts;

        let tempPntString = null;
        let tempPntStringSplitArray = null;
        let tempPntX = null;
        let tempPntY = null;
        let tempCoordinate = null;
        for (let pntIndex = 0; pntIndex < pointStrings.length; pntIndex++) {
            tempPntString = pointStrings[pntIndex];
            if (!tempPntString) continue;


            tempPntStringSplitArray = tempPntString.split(",");
            if (!tempPntStringSplitArray || tempPntStringSplitArray.length != 2) continue;
            tempPntX = parseFloat(tempPntStringSplitArray[0]);
            tempPntY = parseFloat(tempPntStringSplitArray[1]);
            tempCoordinate = [tempPntX, tempPntY];
            pnts.push(tempCoordinate);
        }

        return pnts;
    }


    static getPointsEx2(pointStrings) {
        let pnts = new Array();
        if (!pointStrings) return pnts;

        let pointStringSplits = pointStrings.split(",");

        let tempPntX = null;
        let tempPntY = null;
        let tempCoordinate = null;
        for (let pntIndex = 0; pntIndex < pointStringSplits.length; pntIndex = pntIndex + 2) {

            tempPntX = parseFloat(pointStringSplits[pntIndex]);
            tempPntY = parseFloat(pointStringSplits[pntIndex + 1]);
            tempCoordinate = [tempPntX, tempPntY];
            pnts.push(tempCoordinate);
        }

        return pnts;

    }



    /**
     * 转换坐标系
     * @param {*} oriPnts 
     * @param {*} oriEPSG 
     * @param {*} targetEPSG 
     */
    static transformPoints(oriPnts, oriEPSG, targetEPSG) {
        let targetPnts = new Array();

        if (!oriPnts || !oriEPSG || !targetEPSG) return;

        let tempOriPnt = null;
        let tempTargetPnt = null;
        for (let tempIndex = 0; tempIndex < oriPnts.length; tempIndex++) {
            tempOriPnt = oriPnts[tempIndex];

            tempTargetPnt = ol.proj.transform(
                tempOriPnt,
                oriEPSG,
                targetEPSG
            );

            targetPnts.push(tempTargetPnt);
        }


        return targetPnts;
    }

    static transformPoint(oriPntCoordinates, oriEPSG, targetEPSG) {
        let targetPnt = null;
        if (!oriPntCoordinates || !oriEPSG || !targetEPSG) return targetPnt;
        targetPnt = ol.proj.transform(
            oriPntCoordinates,
            oriEPSG,
            targetEPSG
        );

        return targetPnt;

    }

    static transformGeometry(geometry, oriEPSG, targetEPSG) {
        let targetGeometry = null;

        if (!geometry || !oriEPSG || !targetEPSG) return;

        let geometryType = geometry.getType();


        if (geometryType === "Point") {
            targetGeometry = ol.proj.transform(
                geometry,
                oriEPSG,
                targetEPSG
            );
        } else if (geometryType === "LineString") {
            let coordinates = geometry.getCoordinates();

            let targetPoints = new Array();

            let oriCoordinates = null;
            let targetCoordinates = null;
            for (let tempIndex = 0; tempIndex < coordinates.length; tempIndex++) {
                oriCoordinates = coordinates[tempIndex];

                if (oriCoordinates) {
                    targetCoordinates = GeometryUtility.transformPoint(oriCoordinates, oriEPSG, targetEPSG);
                    if (targetCoordinates) {
                        targetPoints.push(targetCoordinates);
                    }
                }
            }

            targetGeometry = new ol.geom.LineString(targetPoints);

        } else if (geometryType === "MultiLineString") {
            let lineStrings = geometry.getLineStrings();

            let tarLineStrings = new Array();

            let tempOriLineString = null;
            let tempTargetLineString = null;
            for (let lineStringIndex = 0; lineStringIndex < lineStrings.length; lineStringIndex++) {
                tempOriLineString = lineStrings[lineStringIndex];
                if (tempOriLineString) {
                    tempTargetLineString = GeometryUtility.transformGeometry(tempOriLineString, oriEPSG, targetEPSG);
                    if (tempTargetLineString) {
                        tarLineStrings.push(tempTargetLineString);
                    }
                }
            }

            targetGeometry = new ol.geom.MultiLineString(tarLineStrings);

        } else if (geometryType === "LinearRing") {
            let lineRingCoordinates = geometry.getCoordinates();

            let targetRingPoints = new Array();

            let oriRingCoordinates = null;
            let targetRingCoordinates = null;
            for (let tempIndex = 0; tempIndex < lineRingCoordinates.length; tempIndex++) {
                oriRingCoordinates = lineRingCoordinates[tempIndex];

                if (oriRingCoordinates) {
                    targetRingCoordinates = GeometryUtility.transformPoint(oriRingCoordinates, oriEPSG, targetEPSG);
                    if (targetRingCoordinates) {
                        targetRingPoints.push(targetRingCoordinates);
                    }
                }
            }

            targetGeometry = new ol.geom.LinearRing(targetRingPoints);

        } else if (geometryType === "Polygon") {

            let lineRings = geometry.getLinearRings();

            let tempOriLineRing = null;
            let tempTargetLineRing = null;
            for (let lineRingIndex = 0; lineRingIndex < lineRings.length; lineRingIndex++) {
                tempOriLineRing = lineRings[lineRingIndex];
                if (tempOriLineRing) {
                    tempTargetLineRing = GeometryUtility.transformGeometry(tempOriLineRing, oriEPSG, targetEPSG);
                    if (tempTargetLineRing) {

                        if (lineRingIndex === 0) {
                            let targetLineRingCoordinates = tempTargetLineRing.getCoordinates();
                            let pynCoordinatesArray = new Array();
                            pynCoordinatesArray.push(targetLineRingCoordinates);
                            targetGeometry = new ol.geom.Polygon(pynCoordinatesArray);
                        } else {
                            targetGeometry.appendLinearRing(tempTargetLineRing);
                        }
                    }
                }
            }

        } else if (geometryType === "MultiPolygon") {
            let polygons = geometry.getPolygons();

            // let tarPolygons = new Array();

            let tempOriPolygon = null;
            let tempTargetPolygon = null;
            for (let polygonIndex = 0; polygonIndex < polygons.length; polygonIndex++) {
                tempOriPolygon = polygons[polygonIndex];
                if (tempOriPolygon) {
                    tempTargetPolygon = GeometryUtility.transformGeometry(tempOriPolygon, oriEPSG, targetEPSG);
                    if (tempTargetPolygon) {
                        if (polygonIndex === 0) {
                            let pynCoordinates = tempTargetPolygon.getCoordinates();
                            let multiPynCoordinatesArray = new Array();
                            multiPynCoordinatesArray.push(pynCoordinates);
                            targetGeometry = new ol.geom.MultiPolygon(multiPynCoordinatesArray);

                        } else {
                            targetGeometry.appendPolygon(tempTargetPolygon);
                        }
                    }
                }
            }


        }

        return targetGeometry;
    }

    static transformGeometryEx(geometry, oriEPSG, targetEPSG) {
        let targetGeometry = null;

        if (!geometry || !oriEPSG || !targetEPSG) return;

        let transform = ol.proj.getTransform(oriEPSG, targetEPSG);

        targetGeometry = geometry.applyTransform(transform);

        return targetGeometry;
    }

    static transformFeatureGeometry(features, oriEPSG, targetEPSG) {

        if (!features || !oriEPSG || !targetEPSG) return;

        let tempFeature = null;
        let tempOriGeometry = null;
        // let tempTargetGeometry = null;
        let transform = ol.proj.getTransform(oriEPSG, targetEPSG);
        for (let tempFeatureIndex = 0; tempFeatureIndex < features.length; tempFeatureIndex++) {
            tempFeature = features[tempFeatureIndex];
            if (tempFeature) {
                tempOriGeometry = tempFeature.getGeometry();
                //转换方法一
                tempOriGeometry.applyTransform(transform);

                //转换方式二
                // tempTargetGeometry = GeometryUtility.transformGeometry(tempOriGeometry, oriEPSG, targetEPSG);
                // if (tempTargetGeometry) {
                //     tempFeature.setGeometry(tempTargetGeometry);
                // }
            }
        }

    }

    static transformGeometries(geometries, oriEPSG, targetEPSG) {
        let targetGeometries = new Array();

        if (!geometries || !oriEPSG || !targetEPSG) return;

        let tempOriGeometry = null;
        let tempTargetGeometry = null;
        for (let tempIndex = 0; tempIndex < geometries.length; tempIndex++) {
            tempOriGeometry = geometries[tempIndex];
            tempTargetGeometry = GeometryUtility.transformGeometry(tempOriGeometry, oriEPSG, targetEPSG);
            targetGeometries.push(tempTargetGeometry);
        }

        return targetGeometries;
    }

    static getGeometryType(geometry) {

        let geometryType = null;
        if (!geometry) return geometryType;

        if (geometry instanceof ol.geom.GeometryCollection) {
            geometryType = geometry.getType();
        } else if (geometry instanceof ol.geom.SimpleGeometry) {
            if (geometry instanceof ol.geom.Circle) {
                geometryType = geometry.getType();
            } else if (geometry instanceof ol.geom.LinearRing) {
                geometryType = geometry.getType();
            } else if (geometry instanceof ol.geom.LineString) {
                geometryType = geometry.getType();

            } else if (geometry instanceof ol.geom.MultiLineString) {
                geometryType = geometry.getType();

            } else if (geometry instanceof ol.geom.MultiPoint) {
                geometryType = geometry.getType();

            } else if (geometry instanceof ol.geom.MultiPolygon) {
                geometryType = geometry.getType();

            } else if (geometry instanceof ol.geom.Point) {
                geometryType = geometry.getType();

            } else if (geometry instanceof ol.geom.Polygon) {
                geometryType = geometry.getType();

            }
        }

        return geometryType;
    }


    static getPolygonStringByRectString(rectString) {
        let coordinatesString = rectString.split(',');
        let minX = coordinatesString[0];
        let minY = coordinatesString[1];
        let maxX = coordinatesString[2];
        let maxY = coordinatesString[3];

        let pynString = minX + "," + minY + "," +
            minX + "," + maxY + "," +
            maxX + "," + maxY + "," +
            maxX + "," + minY + "," +
            minX + "," + minY

        return pynString;
    }

    static getPolygonArrayByExtend (extent) {
        let minX = extent[0];
        let minY = extent[1];
        let maxX = extent[2];
        let maxY = extent[3];

        let pyn = [];
        pyn.push([minX, minY])
        pyn.push([minX, maxY])
        pyn.push([maxX, maxY])
        pyn.push([maxX, minY])
        pyn.push([minX, minY])

        return pyn;
    }



    static isGeoPoint() {


    }

}