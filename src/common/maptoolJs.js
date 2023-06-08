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
        { name: "行政区划", icon: 'icon-government', eventCode: 'sheng', active: false, marginTop: 0, show: true },
        { name: "河流流域", icon: 'icon-zhengtitubiaosvg_liuyu', eventCode: 'ssly', active: false, marginTop: 0, show: true },
        { name: "绘制多边形", icon: 'icon-duobianxing', eventCode: 'polygon', active: false, marginTop: 0, show: true },
        { name: "坐标定位", icon: 'icon-zuobiao', eventCode: 'location', active: false, marginTop: 0, show: true },
        { name: "测距", icon: 'icon-juliceliang', eventCode: 'measureLine', active: false, marginTop: 0, show: true },
        { name: "测面", icon: 'icon-mianjiceliang', eventCode: 'measureArea', active: false, marginTop: 0, show: true },
        { name: "清除绘制", icon: 'icon-qingchu', eventCode: 'clearMap', active: false, marginTop: 0, show: true },
    ],
    mapEventCode: {
        District:'sheng',
        River:'ssly',
        Location:'location',
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


