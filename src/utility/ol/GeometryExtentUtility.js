/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-17 15:13:50
 * @LastEditTime: 2023-07-28 21:39:49
 * @LastEditors: zkc
 */
import { SystemConfig } from '../../config/SystemConfig'
export class GeometryExtentUtility {
    /**
     * 该方法有错误
     * @param {*} points  点集格式[[x y],[x y]]
     */
    static GetExtent(points) {
        let envelope = new Array();

        let xMax = -1;
        let xMin = -1;
        let yMax = -1;
        let yMin = -1;
        let tempPnt = null;
        for (let pntIndex = 0; pntIndex < points.length; pntIndex++) {
            tempPnt = points[pntIndex];

            if (pntIndex === 0) {
                xMin = tempPnt[0];
                xMax = tempPnt[0];
                yMin = tempPnt[1];
                yMax = tempPnt[1];
            } else {
                if (tempPnt[0] < xMin) {
                    xMin = tempPnt[0];
                }
                if (tempPnt[1] < yMin) {
                    yMin = tempPnt[1];
                }
                if (tempPnt[0] > xMax) {
                    xMax = tempPnt[0];
                }
                if (tempPnt[1] > yMax) {
                    yMax = tempPnt[1];
                }
            }
        }

        envelope.push(xMin);
        envelope.push(yMin);
        envelope.push(xMax);
        envelope.push(yMax);

        return envelope;
    }

    /**
     * 获取所有点的外接矩形 
     * @param {*} points  点集格式[x,y字符串,x,y字符串]
     */
    static GetExtentEx(points) {
        let envelope = new Array();

        let xMax = -1;
        let xMin = -1;
        let yMax = -1;
        let yMin = -1;
        let tempPntString = null;
        let tempPntStringSplitArray = null;
        let tempPntX = null;
        let tempPntY = null;

        for (let pntIndex = 0; pntIndex < points.length; pntIndex++) {
            tempPntString = points[pntIndex];
            if (!tempPntString) continue;


            tempPntStringSplitArray = tempPntString.split(",");
            if (!tempPntStringSplitArray || tempPntStringSplitArray.length != 2) continue;
            tempPntX = parseFloat(tempPntStringSplitArray[0]);
            tempPntY = parseFloat(tempPntStringSplitArray[1]);

            if (pntIndex === 0) {
                xMin = tempPntX;
                xMax = tempPntX;
                yMin = tempPntY;
                yMax = tempPntY;
            } else {
                if (tempPntX < xMin) {
                    xMin = tempPntX;
                }
                if (tempPntY < yMin) {
                    yMin = tempPntY;
                }
                if (tempPntX > xMax) {
                    xMax = tempPntX;
                }
                if (tempPntY > yMax) {
                    yMax = tempPntY;
                }
            }
        }

        envelope.push(xMin);
        envelope.push(yMin);
        envelope.push(xMax);
        envelope.push(yMax);

        return envelope;
    }


    static getOLPointsExtent(olPoints) {
        let envelope = new Array();

        let xMax = -1;
        let xMin = -1;
        let yMax = -1;
        let yMin = -1;
        let tempOLPoint = null;
        let tempOLPointCoordinate = null;
        let tempPntX = null;
        let tempPntY = null;

        for (let pntIndex = 0; pntIndex < olPoints.length; pntIndex++) {
            tempOLPoint = olPoints[pntIndex];
            if (!tempOLPoint) continue;
            tempOLPointCoordinate = tempOLPoint.getCoordinates();
            if (!tempOLPointCoordinate || tempOLPointCoordinate.length != 2) continue;
            tempPntX = tempOLPointCoordinate[0];
            tempPntY = tempOLPointCoordinate[1]

            if (pntIndex === 0) {
                xMin = tempPntX;
                xMax = tempPntX;
                yMin = tempPntY;
                yMax = tempPntY;
            } else {
                if (tempPntX < xMin) {
                    xMin = tempPntX;
                }
                if (tempPntY < yMin) {
                    yMin = tempPntY;
                }
                if (tempPntX > xMax) {
                    xMax = tempPntX;
                }
                if (tempPntY > yMax) {
                    yMax = tempPntY;
                }
            }
        }

        envelope.push(xMin);
        envelope.push(yMin);
        envelope.push(xMax);
        envelope.push(yMax);

        return envelope;



    }

    static getOLGeometrieExtent(olGeometries) {

        let envelope = new Array();

        let xMax = -1;
        let xMin = -1;
        let yMax = -1;
        let yMin = -1;
        let tempOLGeometry = null;
        let tempOLGeometryExtent = null;
        let extentMinX = null;
        let extentMinY = null;
        let extentMaxX = null;
        let extentMaxY = null;


        for (let pntIndex = 0; pntIndex < olGeometries.length; pntIndex++) {
            tempOLGeometry = olGeometries[pntIndex];
            if (!tempOLGeometry) continue;
            tempOLGeometryExtent = tempOLGeometry.getExtent();
            if (!tempOLGeometryExtent) continue;

            extentMinX = tempOLGeometryExtent[0];
            extentMinY = tempOLGeometryExtent[1];
            extentMaxX = tempOLGeometryExtent[2];
            extentMaxY = tempOLGeometryExtent[3];

            if (pntIndex === 0) {
                xMin = extentMinX;
                xMax = extentMaxX;
                yMin = extentMinY;
                yMax = extentMaxY;
            } else {
                if (extentMinX < xMin) {
                    xMin = extentMinX;
                }
                if (extentMinY < yMin) {
                    yMin = extentMinY;
                }
                if (extentMaxX > xMax) {
                    xMax = extentMaxX;
                }
                if (extentMaxY > yMax) {
                    yMax = extentMaxY;
                }
            }
        }

        envelope.push(xMin);
        envelope.push(yMin);
        envelope.push(xMax);
        envelope.push(yMax);

        return envelope;



    }




    /**
     * 
     * @param {*} points  点集格式[x,y,x,y]
     */
    static getCenterPointEx(points) {
        let centerPnt = new Array();
        let extent = GeometryExtentUtility.GetExtentEx(points);
        let centerX = (extent[0] + extent[2]) / 2.0;
        let centerY = (extent[1] + extent[3]) / 2.0;
        centerPnt.push(centerX);
        centerPnt.push(centerY);
        return centerPnt;
    }

    static isGeoExtent(extent) {
        let isGeo = false;

        let minX = extent[0];
        let minY = extent[1];
        let maxX = extent[2];
        let maxY = extent[3];



        if (Math.abs(minX) <= 180 &&
            Math.abs(maxX) <= 180 &&
            Math.abs(minY) <= 90 &&
            Math.abs(maxY) <= 90
        ) {
            isGeo = true;
        }

        return isGeo;
    }

    /**
     * 扩展范围
     * @param {*} oriExtent 
     * @param {*} expandScale 
     */
    static expandExtent(oriExtent, expandScale) {
        let expandEnvelope = null; //

        if (!oriExtent || !expandScale) return expandEnvelope;

        expandEnvelope = new Array();

        let minX = oriExtent[0];
        let minY = oriExtent[1];
        let oriCenterX = (oriExtent[0] + oriExtent[2]) / 2.0;
        let oriCenterY = (oriExtent[1] + oriExtent[3]) / 2.0;
        let offsetX = (20 / SystemConfig.bodyWidth) * (oriExtent[2] - oriExtent[0]);
        let halfXDistance = oriCenterX - minX;
        let halfYDistance = oriCenterY - minY;
        let expandMinX = oriCenterX - halfXDistance * expandScale - offsetX * expandScale;
        let expandMinY = oriCenterY - halfYDistance * expandScale;
        let expandMaxX = oriCenterX + halfXDistance * expandScale
        let expandMaxY = oriCenterY + halfYDistance * expandScale;

        expandEnvelope.push(expandMinX);
        expandEnvelope.push(expandMinY);
        expandEnvelope.push(expandMaxX);
        expandEnvelope.push(expandMaxY);
        return expandEnvelope;
    }


    /**
     * 是否相交
     * @param {*} extent 
     * @param {*} compareExtent 
     */
    static isIntersect(originalEnv, compareEnv) {
        let intersectStatus = false;

        let originalXMin = originalEnv[0];
        let originalXMax = originalEnv[2];
        let originalYMin = originalEnv[1];
        let originalYMax = originalEnv[3];

        let compareXMin = compareEnv[0];
        let compareXMax = compareEnv[2];
        let compareYMin = compareEnv[1];
        let compareYMax = compareEnv[3];

        let intersectXMin = Math.max(originalXMin, compareXMin);
        let intersectXMax = Math.min(originalXMax, compareXMax);
        let intersectYMin = Math.max(originalYMin, compareYMin);
        let intersectYMax = Math.min(originalYMax, compareYMax);

        //如果相交
        if (intersectXMax >= intersectXMin && intersectYMax >= intersectYMin) {
            intersectStatus = true;
        } else {
            intersectStatus = false;
        }

        return intersectStatus;
    }


    /**
 * @name: zkc
 * @msg: 通过范围获取最大范围
 * @param {*} extents [[x1,y1,x2,y2],[x1,y1,x2,y2]]
 * @return {*}
 * @descripttion:
 */
    static getMaxExtentByExtents (extents) {
        let envelope = new Array()

        let xMax = -1
        let xMin = -1
        let yMax = -1
        let yMin = -1
        let tempExtent = []
        for (let pntIndex = 0; pntIndex < extents.length; pntIndex++) {
            tempExtent = extents[pntIndex]

            if (pntIndex === 0) {
                xMin = tempExtent[0]
                xMax = tempExtent[2]
                yMin = tempExtent[1]
                yMax = tempExtent[3]
            } else {
                if (tempExtent[0] < xMin) {
                    xMin = tempExtent[0]
                }
                if (tempExtent[2] < yMin) {
                    yMin = tempExtent[2]
                }
                if (tempExtent[1] > xMax) {
                    xMax = tempExtent[1]
                }
                if (tempExtent[3] > yMax) {
                    yMax = tempExtent[3]
                }
            }
        }

        envelope.push(xMin)
        envelope.push(yMin)
        envelope.push(xMax)
        envelope.push(yMax)

        return envelope
    }

}