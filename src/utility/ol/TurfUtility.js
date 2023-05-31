/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-17 22:03:23
 * @LastEditTime: 2020-09-14 18:19:16
 * @LastEditors: Please set LastEditors
 */

import * as turf from "@turf/turf";


export class TurfUtility {
    constructor() {

    }


    /**
     * ol图形转turf图形
     * @param {*} olGeometry 
     */
    static olgeometryToTurfGeometry(olGeometry) {
        let turfGeometry = null;

        if (!olGeometry) return turfGeometry;

        let geometryType = olGeometry.getType();
        if (!geometryType) return turfGeometry;

        let coordinates = null;
        if (geometryType === "Point") {
            coordinates = olGeometry.getCoordinates();
            turfGeometry = turf.point(coordinates);
        } else if (geometryType === "MultiPoint") {
            coordinates = olGeometry.getCoordinates();
            turfGeometry = turf.multiPoint(coordinates);

        } else if (geometryType === "LineString") {
            coordinates = olGeometry.getCoordinates();
            // coordinates= TurfUtility.correctGeometryCoords(coordinates);

            turfGeometry = turf.lineString(coordinates);
        } else if (geometryType === "MultiLineString") {
            coordinates = olGeometry.getCoordinates();
            // coordinates= TurfUtility.correctMultiGeometries(coordinates);
            turfGeometry = turf.multiLineString(coordinates);
        } else if (geometryType === "Polygon") {
            coordinates = olGeometry.getCoordinates();
            // coordinates= TurfUtility.correctGeometryCoords(coordinates);
            turfGeometry = turf.polygon(coordinates);
        } else if (geometryType === "MultiPolygon") {
            coordinates = olGeometry.getCoordinates();
            coordinates = TurfUtility.correctMultiPolygon(coordinates);
            turfGeometry = turf.multiPolygon(coordinates);
        } else if (geometryType === "GeometryCollection") {
            // coordinates=olGeometry.getCoordinates();
            // turfGeometry=turf.point(coordinates);
        }

        return turfGeometry;
    }


    /**
     * 检查turf图形是否相交
     * @param {*} turfOriGeometry 
     * @param {*} turfCompareGeometry 
     */
    static turfGeometryIsIntersect(turfOriGeometry, turfCompareGeometry) {
        let intersectStatus = false;

        if (!turfOriGeometry || !turfCompareGeometry) return intersectStatus;

        let disjoint = turf.booleanDisjoint(turfOriGeometry, turfCompareGeometry);

        intersectStatus = !disjoint;

        return intersectStatus;
    }

    /**
     * 检查ol图形是否相交
     * @param {*} olOriGeometry 
     * @param {*} olCompareGeometry 
     */
    static olGeometryIsIntersect(olOriGeometry, olCompareGeometry) {
        let intersectStatus = false;

        if (!olOriGeometry || !olCompareGeometry) return intersectStatus;

        let turfOriGeometry = TurfUtility.olgeometryToTurfGeometry(olOriGeometry);

        let turfCompareGeometry = TurfUtility.olgeometryToTurfGeometry(olCompareGeometry);

        intersectStatus = TurfUtility.turfGeometryIsIntersect(turfOriGeometry, turfCompareGeometry);

        return intersectStatus;
    }

    static olGeometryIsIntersectEx(turfOriGeometry, olCompareGeometry) {
        let intersectStatus = false;

        if (!turfOriGeometry || !olCompareGeometry) return intersectStatus;

        try {

            let turfCompareGeometry = TurfUtility.olgeometryToTurfGeometry(olCompareGeometry);

            intersectStatus = TurfUtility.turfGeometryIsIntersect(turfOriGeometry, turfCompareGeometry);


        } catch (error) {

            let turfCompareGeometry1 = TurfUtility.olgeometryToTurfGeometry(olCompareGeometry);

            intersectStatus1 = TurfUtility.turfGeometryIsIntersect(turfOriGeometry, turfCompareGeometry1);

        }

        return intersectStatus;
    }


    /**
     * 获取相交的olfeatures
     * @param {*} olFeatures 
     * @param {*} calOLGeometry 
     */
    static getIntersectOLFeatures(olFeatures, calOLGeometry) {
        let intersectFeatures = new Array();

        if (!olFeatures || olFeatures.length == 0 || !calOLGeometry) return intersectFeatures;


        let tempFeature = null;
        let tempGeometry = null;
        let tempIntersectStatus = false;
        for (let tempFeatIndex = 0; tempFeatIndex < olFeatures.length; tempFeatIndex++) {
            tempFeature = olFeatures[tempFeatIndex];
            if (!tempFeature) continue;
            tempGeometry = tempFeature.getGeometry();
            if (!tempGeometry) continue;

            tempIntersectStatus = TurfUtility.olGeometryIsIntersect(tempGeometry, calOLGeometry);
            if (tempIntersectStatus) {
                intersectFeatures.push(tempFeature);
            }
        }

        return intersectFeatures;
    }


    static correctMultiPolygon(multiGeometries) {
        let multis = new Array();
        if (!multiGeometries || multiGeometries.length == 0) return multis;


        let tempPartGeometry = null;
        let tempCorrectPartGeometry = null;
        let tempRing = null;
        let tempCorrectRing = null;
        for (let tempMultiIndex = 0; tempMultiIndex < multiGeometries.length; tempMultiIndex++) {
            tempPartGeometry = multiGeometries[tempMultiIndex];
            if (!tempPartGeometry || tempPartGeometry.length == 0) continue;

            tempCorrectPartGeometry = new Array();
            for (let tempPartGeometryIndex = 0; tempPartGeometryIndex < tempPartGeometry.length; tempPartGeometryIndex++) {
                tempRing = tempPartGeometry[tempPartGeometryIndex];
                if (!tempRing || tempRing.length == 0) continue;

                tempCorrectRing = TurfUtility.correctPoints(tempRing);

                if (tempCorrectRing.length > 0) {
                    tempCorrectPartGeometry.push(tempCorrectRing);
                }

            }

            if (tempCorrectPartGeometry.length > 0) {
                multis.push(tempCorrectPartGeometry);
            }
        }

        return multis;
    }

    static correctMultiGeometries(multiGeometries) {
        let multis = new Array();
        if (!multiGeometries || multiGeometries.length == 0) return multis;

        let tempCorrectGeometryCoords = null;

        let tempPartGeometry = null;
        for (let tempMultiIndex = 0; tempMultiIndex < multiGeometries.length; tempMultiIndex++) {
            tempPartGeometry = multiGeometries[tempMultiIndex];
            if (!tempPartGeometry || tempPartGeometry.length == 0) continue;

            tempCorrectGeometryCoords = TurfUtility.correctPoints(tempPartGeometry);

            if (tempCorrectGeometryCoords.length > 0) {
                multis.push(tempCorrectGeometryCoords);
            }
        }

        return multis;
    }



    static correctPoints(oriPoints) {

        let correctPoints = new Array();
        if (!oriPoints || oriPoints.length == 0) return correctPoints;

        let tempCoords = null;
        for (let tempCoordsIndex = 0; tempCoordsIndex < oriPoints.length; tempCoordsIndex++) {
            tempCoords = oriPoints[tempCoordsIndex];
            if (!tempCoords || tempCoords.length == 0) continue;
            correctPoints.push(tempCoords);
        }

        return correctPoints;
    }


}




export const TurfSpatialRelationType = {

    contains: "contains",

    crosses: "crosses",

    disjoint: "disjoint",

    equal: "equal",

    overlap: "overlap",

    pointInPolygon: "pointInPolygon",

    parallel: "parallel",

    pointOnLine: "pointOnLine",

    within: "within",

}