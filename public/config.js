/*
 * @Descripttion:
 * @version: 1.0
 * @Author: zkc
 * @Date: 2022-04-07 15:52:42
 * @LastEditors: zkc
 * @LastEditTime: 2023-06-25 14:27:29
 * @input: no param
 * @out: no param
 */
window.BASE_CONFIG = {
	// 公网
	"spatialdecision_public_base_url": "http://223.71.70.150:9977/qgwkk",
	"flie_base_ip": "http://223.71.70.150:9977",
	"tdt_service_public_base_url": "http://api.tianditu.gov.cn",
	"tdt_xyz_public_base_url": "https://t{0-7}.tianditu.gov.cn/DataServer?",
	"defaultToken": "d3182ea02e2a9c206f78d45793bb11ac",
	"DefaultMapBaseLayerType": "Image", // 默认加载地图底图类型Image,Vector,Ter
	"map_view_init_centerPoint": [108.5525, 34.32],
	"map_view_init_initLevel": 6,
	"map_view_maxLevel": 23,
	"map_view_minLevel": 2,
	"canClickMapMinLevel": 7, // 地图要素可以点击的最小级别
	"statTypes": [
		{
			name: '行政区划', value: 'sheng', defalutHeader: [
				{ name: '区域', props: 'name', width: 120 }
			],
			service: {
				"id": "8cd57ca1324f4b45b6f1d6309765ec4c",
				"name": "行政区",
				"description": null,
				"groupId": "adef7ca938114b1ebb75c3a909b8ff3d",
				"type": "vectorTile",
				"defaultVisible": "true",
				"opacity": "1.0",
				"visibleMinLevel": "0",
				"visibleMaxLevel": "22",
				"token": null,
				"extent": "",
				"initLevel": "-1",
				"tag": "",
				"sort": "5",
				"edition": null,
				"metaDataItemString": "",
				"serviceUrl": "http://223.71.70.150:9977/mapserviceweb/service/qgxzq/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&LAYER=qgxzq&TILEMATRIX=EPSG:4326:{z}&TILEMATRIXSET=EPSG:4326&FORMAT=application/x-protobuf;type=mapbox-vector&TILECOL={x}&TILEROW={y}",
				"serviceName": "qgxzq",
				"serviceEpsg": "EPSG:4326",
				"styleJsonUrlContent":'{"version":"8","name":"featuremap","sources":{"featuremap":{"url":"../../","type":"vector"}},"layers":[{"source":"featuremap","source-layer":"sheng","layout":{},"paint":{"fill-color":"rgba(255, 170, 62, 0)"},"id":"省界//0/0","type":"fill","minzoom":0,"maxzoom":20},{"source":"featuremap","source-layer":"sheng","layout":{},"paint":{"line-color":"rgba(209,223,186,1)","line-width":1.2},"id":"省界//0/1/0","type":"line","minzoom":0,"maxzoom":20},{"source":"featuremap","source-layer":"shi","layout":{},"paint":{"fill-color":"rgba(255, 170, 62, 0)"},"id":"市界//0/0","type":"fill","minzoom":0,"maxzoom":20},{"source":"featuremap","source-layer":"shi","layout":{},"paint":{"line-color":"rgba(255, 170, 62, 1)","line-width":1.2},"id":"市界//0/1/0","type":"line","minzoom":0,"maxzoom":20},{"source":"featuremap","source-layer":"xian","layout":{},"paint":{"fill-color":"rgba(255, 170, 62, 0)"},"id":"县界//0/0","type":"fill","minzoom":0,"maxzoom":20},{"source":"featuremap","source-layer":"shi","layout":{},"paint":{"line-color":"rgba(255,239,148,1)","line-width":1.2},"id":"县界//0/1/0","type":"line","minzoom":0,"maxzoom":20}]}',
				"styleJsonUrl": "http://223.71.70.150:9977/styles/qgxzq/styles/root.json",
				"sourceName": null,
				"renderParamsString": "",
				"showFieldsJsonString": "",
				"filterName": null,
				"tilematrixSuffix": null,
				"nodeType": "item",
				"createTime": "2023-06-21 14:14:41.625463",
				"alias": null,
				"checked": "false",
				"fields": null,
				"rendererSettingsString": "",
				"styleName": "featuremap",
				"tileSchemeType": "tdt_4326",
				"rendererSettings": null
			}
		},
		{
			name: '流域统计', value: 'ssly', defalutHeader: [
				{ name: '流域', props: 'name', width: 120 }
			], service:  {
				"id": "7f1d3754e13a424cbc5a0b1bbf29727a",
				"name": "十大流域",
				"description": null,
				"groupId": "adef7ca938114b1ebb75c3a909b8ff3d",
				"type": "vectorTile",
				"defaultVisible": "true",
				"opacity": "1.0",
				"visibleMinLevel": "0",
				"visibleMaxLevel": "22",
				"token": null,
				"extent": "",
				"initLevel": "-1",
				"tag": "",
				"sort": "5",
				"edition": null,
				"metaDataItemString": "",
				"serviceUrl": "http://223.71.70.150:9977/mapserviceweb/service/10liuyu/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&LAYER=10liuyu&TILEMATRIX=EPSG:4326:{z}&TILEMATRIXSET=EPSG:4326&FORMAT=application/x-protobuf;type=mapbox-vector&TILECOL={x}&TILEROW={y}",
				"serviceName": "10liuyu",
				"serviceEpsg": "EPSG:4326",
				"styleJsonUrl": "http://223.71.70.150:9977/styles/10liuyu/styles/root.json",
				"sourceName": null,
				"renderParamsString": "",
				"showFieldsJsonString": "",
				"filterName": null,
				"tilematrixSuffix": null,
				"nodeType": "item",
				"createTime": "2023-06-21 14:13:20.780551",
				"alias": null,
				"checked": "false",
				"fields": null,
				"rendererSettingsString": "",
				"styleName": "featuremap",
				"tileSchemeType": "tdt_4326",
				"rendererSettings": null
			}
		},
	],
	"showFields": [
		{name:'sheng',aliasName:'所属省',index:0,value:''},
		{name:'shi',aliasName:'所属市',index:0,value:''},
		{name:'xian',aliasName:'所属县',index:0,value:''},
		{name:'xz',aliasName:'所属乡镇',index:0,value:''},
		{name:'hjjgdj',aliasName:'监管等级',index:0,value:''},
		{name:'wkkdb',aliasName:'尾矿库等别',index:0,value:''},
		{name:'wkkdb',aliasName:'环境敏感度',index:0,value:''},
		{name:'rkxs',aliasName:'入库形式',index:0,value:''},
		{name:'rkxs',aliasName:'主要矿种',index:0,value:''},
		{name:'sczk',aliasName:'生产状况',index:0,value:''}
	],
	useFieldConfig: {
		"监管等级": 'hjjgdj',
		"尾矿库等别": "wkkdb",
		"生产状况": "sczk",
		"主要矿种": "zykz"
	}
};
