/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-17 15:13:50
 * @LastEditTime: 2023-08-20 21:25:45
 * @LastEditors: zkc
 */
export class OLLayerUtility {
    /**
     * 获取所有图层（包含图层组中的图层）
     * @param {*} mapLayers 
     */
    static getLayers(mapLayers) {
        let layers = new Array();

        let tempMapLayer = null;
        let tempGroupLayers = null;

        for (let tempIndex = 0; tempIndex < mapLayers.length; tempIndex++) {

            tempMapLayer = mapLayers[tempIndex];
            if (tempMapLayer instanceof ol.layer.Group) {
                tempGroupLayers = tempMapLayer.getLayers().getArray();
                for (let tempLayerIndex = 0; tempLayerIndex < tempGroupLayers.length; tempLayerIndex++) {
                    if (tempGroupLayers[tempLayerIndex] &&
                        tempGroupLayers[tempLayerIndex] instanceof ol.layer.Base) {
                        layers.push(tempGroupLayers[tempLayerIndex]);
                    }
                }
            } else if (tempMapLayer instanceof ol.layer.Base) {
                layers.push(tempMapLayer);
            }
        }

        return layers;
    }

    static findByLayerAttribute(mapLayers, layerAttriFieldName, layerAttriFieldValue) {
        let findLayer = null;


        let tempMapLayer = null;
        let tempGroupLayers = null;
        let tempGroupLayer = null;
        let tempLayerAttriValue = null;
        for (let tempIndex = 0; tempIndex < mapLayers.length; tempIndex++) {

            tempMapLayer = mapLayers[tempIndex];
            if (tempMapLayer instanceof ol.layer.Group) {
                tempGroupLayers = tempMapLayer.getLayers().getArray();
                for (let tempLayerIndex = 0; tempLayerIndex < tempGroupLayers.length; tempLayerIndex++) {
                    tempGroupLayer = tempGroupLayers[tempLayerIndex];
                    if (tempGroupLayer &&
                        tempGroupLayer instanceof ol.layer.Base) {
                        tempLayerAttriValue = tempGroupLayer.get(layerAttriFieldName);
                        if (tempLayerAttriValue && tempLayerAttriValue == layerAttriFieldValue) {
                            findLayer = tempGroupLayer;
                            break;
                        }
                    }
                }
            } else if (tempMapLayer instanceof ol.layer.Base) {
                tempLayerAttriValue = tempMapLayer.get(layerAttriFieldName);
                if (tempLayerAttriValue && tempLayerAttriValue == layerAttriFieldValue) {
                    findLayer = tempMapLayer;
                    break;
                }
            }
        }

        return findLayer;
    }

    static findByUID(layers, ol_uid) {
        let findLayer = null;

        if (!layers || !ol_uid) return findLayer;

        let tempLayer = null;
        for (let tempIndex = 0; tempIndex < layers.length; tempIndex++) {

            tempLayer = layers[tempIndex];
            if (tempLayer && tempLayer.ol_uid === ol_uid) {
                findLayer = tempLayer;
                break;
            }
        }

        return findLayer;
    }

    static findIndexByUID(layers, ol_uid) {
        let findIndex = null;

        if (!layers || !ol_uid) return findIndex;

        let tempLayer = null;
        for (let tempIndex = 0; tempIndex < layers.length; tempIndex++) {

            tempLayer = layers[tempIndex];
            if (tempLayer && tempLayer.ol_uid === ol_uid) {
                findIndex = tempIndex;
                break;
            }
        }

        return findIndex;


    }

    static ascLayer(mapLayers, sortfield) {
debugger
        //原始索引-图层-排序序号

        let layerArray = mapLayers.getArray();

        let sortLayers = [];
        for (let layerIndex = 0; layerIndex < layerArray.length; layerIndex++) {
            let tempLayer = layerArray[layerIndex];
            if (!tempLayer) continue;
            let sortValue = tempLayer.get(sortfield);
            if (sortValue) {
                sortLayers.push({
                    sort: sortValue,
                    oriLayer: tempLayer,
                    index: layerIndex
                })
            }
        }
        // 排序
        let curSortLayer = null;
        let nextSortLayer = null;
        let tempCurSortValue = null;
        let tempCurOriLayer = null;
        for (let sortLayerIndex = 0; sortLayerIndex < sortLayers.length - 1; sortLayerIndex++) {

            for (let sortLayerIndex2 = 0; sortLayerIndex2 < sortLayers.length - 1 - sortLayerIndex; sortLayerIndex2++) {
                curSortLayer = sortLayers[sortLayerIndex2];
                nextSortLayer = sortLayers[sortLayerIndex2 + 1];
                if (curSortLayer.sort > nextSortLayer.sort) {
                    tempCurSortValue = curSortLayer.sort;
                    curSortLayer.sort = nextSortLayer.sort;
                    nextSortLayer.sort = tempCurSortValue;

                    tempCurOriLayer = curSortLayer.oriLayer;
                    curSortLayer.oriLayer = nextSortLayer.oriLayer;
                    nextSortLayer.oriLayer = tempCurOriLayer;
                }
            }
        }

        for (let sortLayerIndex = 0; sortLayerIndex < sortLayers.length; sortLayerIndex++) {
            let tempSortLayer = sortLayers[sortLayerIndex];
            mapLayers.remove(tempSortLayer.oriLayer);
        }

        for (let sortLayerIndex = 0; sortLayerIndex < sortLayers.length; sortLayerIndex++) {
            let tempSortLayer = sortLayers[sortLayerIndex];

            if (tempSortLayer.oriLayer) {
                mapLayers.insertAt(mapLayers.getArray().length, tempSortLayer.oriLayer);
            }
        }

        return mapLayers;
    }


}