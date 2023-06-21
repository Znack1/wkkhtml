/*
 * @Descripttion:
 * @version: 1.0
 * @Author: zkc
 * @Date: 2022-04-07 15:52:42
 * @LastEditors: zkc
 * @LastEditTime: 2023-06-21 14:56:27
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
				"sort": "3",
				"edition": null,
				"metaDataItemString": "",
				"serviceUrl": "http://223.71.70.150:9977/mapserviceweb/service/qgxzq/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&LAYER=qgxzq&TILEMATRIX=EPSG:4326:{z}&TILEMATRIXSET=EPSG:4326&FORMAT=application/x-protobuf;type=mapbox-vector&TILECOL={x}&TILEROW={y}",
				"serviceName": "qgxzq",
				"serviceEpsg": "EPSG:4326",
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
				"sort": "2",
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
		{ name: 'mc', aliasName: '名称', index: 0, value: '' }
	],
	useFieldConfig: {
		"监管等级": 'hjjgdj',
		"尾矿库等别": "wkkdb",
		"生产状况": "sczk",
		"主要矿种": "zykz"
	}
};
