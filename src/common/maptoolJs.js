/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: zkc
 * @Date: 2021-03-24 17:43:12
 * @LastEditors: zkc
 * @LastEditTime: 2022-11-18 14:37:58
 * @input: no param
 * @out: no param
 */
export const MapTools = {
    mapTools: [
        { name: "放大", icon: 'icon-fangda1111', eventCode: 'zoomIn', active: false, marginTop: 0, show: true },
        { name: "缩小", icon: 'icon-suoxiao1', eventCode: 'zoomOut', active: false, marginTop: 0, show: true },
        { name: "测距", icon: 'icon-ceju', eventCode: 'measureLine', active: false, marginTop: 0, show: true },
        { name: "测面", icon: 'icon-cemian', eventCode: 'measureArea', active: false, marginTop: 0, show: true },
        { name: "编辑点", icon: 'icon-didian', eventCode: 'editPoint', active: false, marginTop: 0, show: true },
        { name: "绘制点", icon: 'icon-didian', eventCode: 'point', active: false, marginTop: 0, show: true },
        { name: "绘制线", icon: 'icon-polyline', eventCode: 'polyline', active: false, marginTop: 0, show: true },
        { name: "绘制矩形", icon: 'icon-checkbox', eventCode: 'rectangle', active: false, marginTop: 0, show: true },
        { name: "绘制多边形", icon: 'icon-duobianxing', eventCode: 'polygon', active: false, marginTop: 0, show: true },
        { name: "复位", icon: 'icon-fuwei', eventCode: 'resetMap', active: false, marginTop: 0, show: true },
        { name: "清除绘制", icon: 'icon-qingchu', eventCode: 'clearMap', active: false, marginTop: 0, show: true },
        { name: "图例", icon: 'icon-guangqi_tuli', eventCode: 'legend', active: false, marginTop: 0, show: true },
        { name: "打印", icon: 'icon-daochu', eventCode: 'prints', active: false, marginTop: 0, show: true },
    ],
    mapEventCode: {
        MeasureLine: "measureLine",
        MeasureArea: 'measureArea',
        ZoomIn: 'zoomIn',
        ZoomOut: 'zoomOut',
        DrawPoint: 'point',
        DrawPolyline:'polyline',
        DrawRect: 'rectangle',
        DrawPolygon: 'polygon',
        ResetMap: 'resetMap',
        ClearMap: 'clearMap',
        legend:'legend',
        prints:'prints',
        editPoint:'editPoint'
    }
}


