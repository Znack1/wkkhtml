/*
 * @Descripttion:
 * @version: 1.0
 * @Author: zkc
 * @Date: 2022-04-07 15:52:42
 * @LastEditors: zkc
 * @LastEditTime: 2023-08-22 17:09:29
 * @input: no param
 * @out: no param
 */
window.BASE_CONFIG = {
	// 公网
	"spatialdecision_public_base_url": "http://223.71.70.150:9977/qgwkk",
	"layercatalogweb":"http://223.71.70.150:9977/layercatalogweb",
	"flie_base_ip": "http://223.71.70.150:9977",
	"tdt_service_public_base_url": "http://api.tianditu.gov.cn",
	"tdt_xyz_public_base_url": "https://t{0-7}.tianditu.gov.cn/DataServer?",
	"defaultToken": "d3182ea02e2a9c206f78d45793bb11ac",
	"DefaultMapBaseLayerType": "Vector", // 默认加载地图底图类型Image,Vector,Ter
	// "map_view_init_centerPoint": [108.5525, 34.32],
	"map_view_init_centerPoint": [12958207.8873,4826182.4452],
	"map_view_init_initLevel": 4,
	"map_view_maxLevel": 22,
	"map_view_minLevel": 4,
	"canClickMapMinLevel": 7, // 地图要素可以点击的最小级别
	"polygonLayer":{
		"id": "wkkmian",
				"name": "尾矿库面图层",
				"description": null,
				"groupId": "",
				"type": "vectorTile",
				"defaultVisible": "true",
				"opacity": "1.0",
				"visibleMinLevel": "10",
				"visibleMaxLevel": "22",
				"token": null,
				"extent": "",
				"initLevel": "-1",
				"tag": "",
				"sort": "100",
				"edition": null,
				"metaDataItemString": "",
				"serviceUrl": "http://223.71.70.150:9977/mapserviceweb/service/wkkp_3857/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&LAYER=wkkp_3857&TILEMATRIX=EPSG:3857:{z}&TILEMATRIXSET=EPSG:3857&FORMAT=application/x-protobuf;type=mapbox-vector&TILECOL={x}&TILEROW={y}",
				"serviceName": "wkkp_3857",
				"serviceEPSG": "EPSG:3857",
				"styleJsonUrlContent":'{"version":"8","name":"featuremap","sources":{"featuremap":{"url":"../../","type":"vector"}},"layers":[{"source":"featuremap","source-layer":"wkkp_3857","layout":{},"paint":{"fill-color":"rgba(237, 106, 104, 0)","fill-outline-color":"rgba(255,0,0, 1)"},"id":"wwkp//0/0","type":"fill","minzoom":0,"maxzoom":22},{"source":"featuremap","source-layer":"wkkp_3857","layout":{},"paint":{"line-color":"rgba(255,0, 0, 1)","line-width":2},"id":"wkkp//0/1/0","type":"line","minzoom":0,"maxzoom":22}]}',
				"styleJsonUrl": "",
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
	}, // 尾矿库面图层

	"polygonLayer1":{
		"id": "wkkdian",
				"name": "测试点位服务",
				"description": null,
				"groupId": "",
				"type": "vectorTile",
				"defaultVisible": "true",
				"opacity": "1.0",
				"visibleMinLevel": "0",
				"visibleMaxLevel": "22",
				"token": null,
				"extent": "",
				"initLevel": "-1",
				"tag": "",
				"sort": 100000,
				"edition": null,
				"metaDataItemString": "",
				"serviceUrl": "http://223.71.70.150:9977/mapserviceweb/service/wkkd2_3857/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&LAYER=wkkd2_3857&TILEMATRIX=EPSG:3857:{z}&TILEMATRIXSET=EPSG:3857&FORMAT=application/x-protobuf;type=mapbox-vector&TILECOL={x}&TILEROW={y}",
				"serviceName": "wkkd2_3857",
				"serviceEPSG": "EPSG:3857",
				"styleJsonUrlContent":'',
				"styleJsonUrl": "",
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
	}, 


	"statTypes": [
		{
			name: '行政区划', value: 'sheng', defalutHeader: [
				{ name: '区域', props: 'name', width: 120 }
			],
			service: [
				{
					"id": "fb878a57986b480695a121cc2085cf19",
					"parentId": "adef7ca938114b1ebb75c3a909b8ff3d",
					"layerItems": null,
					"name": "省",
					"aliasName": null,
					"nodeType": "item",
					"type": "vectorTile",
					"alpha": 1.0,
					"checked": false,
					"visible": null,
					"minLevel": 0,
					"maxLevel": 22,
					"url": null,
					"layers": null,
					"formatName": null,
					"epsg": null,
					"tag": null,
					"token": null,
					"tags": null,
					"iconUrl": null,
					"groupId": null,
					"groupName": null,
					"opacity": 1.0,
					"initLevel": -1,
					"extent": "",
					"description": null,
					"defaultVisible": true,
					"visibleMinLevel": 0,
					"visibleMaxLevel": 22,
					"filePath": null,
					"geojsonString": null,
					"shapeType": null,
					"maximumLevel": null,
					"styleName": "featuremap",
					"alias": null,
					"queryFilter": null,
					"tileSchemeType": "tdt_4326",
					"tileWidth": 256,
					"tileHeight": 256,
					"style": null,
					"serviceEngineUrl": null,
					"sourceId": null,
					"dataSetId": null,
					"dataSetIdentifier": null,
					"srid": null,
					"fileUrl": null,
					"serviceUrl": "http://223.71.70.150:9977/mapserviceweb/service/sheng_3857/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&LAYER=sheng_3857&TILEMATRIX=EPSG:3857:{z}&TILEMATRIXSET=EPSG:3857&FORMAT=application/x-protobuf;type=mapbox-vector&TILECOL={x}&TILEROW={y}",
					"domainMin": null,
					"domainMax": null,
					"serviceName": "sheng_3857",
					"serviceEPSG": "EPSG:3857",
					"styleJsonUrl": "",
					"styleJsonUrlContent": '{"version":"8","name":"featuremap","sources":{"featuremap":{"url":"../../","type":"vector"}},"layers":[{"source":"featuremap","source-layer":"sheng_3857","layout":{},"paint":{"fill-color":"rgba(255, 170, 62,0.01)"},"id":"省界//0/0","type":"fill","minzoom":0,"maxzoom":20},{"source":"featuremap","source-layer":"sheng_3857","layout":{},"paint":{"line-color":"rgba(200,163,92,1.6)","line-width":1.7},"id":"省界//0/1/0","type":"line","minzoom":0,"maxzoom":20},{"source":"featuremap","source-layer":"shi_3857","layout":{},"paint":{"fill-color":"rgba(255, 170, 62, 0.01)"},"id":"市界//0/0","type":"fill","minzoom":0,"maxzoom":20},{"source":"featuremap","source-layer":"shi_3857","layout":{},"paint":{"line-color":"rgba(255, 170, 62, 1)","line-width":1.2},"id":"市界//0/1/0","type":"line","minzoom":0,"maxzoom":20},{"source":"featuremap","source-layer":"xian_3857","layout":{},"paint":{"fill-color":"rgba(25, 170, 62, 0.01)"},"id":"县界//0/0","type":"fill","minzoom":0,"maxzoom":20},{"source":"featuremap","source-layer":"xian_3857","layout":{},"paint":{"line-color":"rgba(255,239,148,1)","line-width":1.2},"id":"县界//0/1/0","type":"line","minzoom":0,"maxzoom":20}]}',					"sourceName": null,
					"sourceName": null,
					"wmtsUrl": null,
					"matrixSetName": null,
					"tileSize": [
						256,
						256
					],
					"tileSizeString": null,
					"tileGridExtent": null,
					"tileGridExtentString": null,
					"tileGridOrigin": null,
					"tileGridOriginString": null,
					"tileGridResolutions": null,
					"tileGridResolutionsString": null,
					"tileGridMatrixIds": null,
					"tileGridMatrixIdsString": null,
					"featCollJsonObjString": null,
					"width": 0,
					"height": 0,
					"bbox": null,
					"version": "1.3.0",
					"transparent": "true",
					"styles": null,
					"cqlFilter": null,
					"filter": null,
					"condition": null,
					"cqlXmlString": null,
					"layerType": null,
					"requestType": null,
					"databaseType": null,
					"whereClause": null,
					"typeName": null,
					"maxFeatures": null,
					"featureType": null,
					"resultFields": null,
					"featCollJsonObj": null,
					"features": null,
					"records": null,
					"children": null,
					"connectionParams": null,
					"tableName": null,
					"showFieldsJsonString": "",
					"showFields": [],
					"resultFieldsJsonString": null,
					"videoPosition": null,
					"videoRotation": null,
					"near": 0.0,
					"videoFar": null,
					"videoFov": null,
					"videoDebugFrustum": true,
					"aspectRatio": null,
					"videoUrl": null,
					"renderParamsString": "",
					"rendererSettings": [],
					"rendererSettingsString": "",
					"filterName": null,
					"styleJsons": null,
					"sort": 6,
					"tilematrixSuffix": null,
					"fieldItems": null,
					"tilingScheme": null,
					"fields": null,
					"title": null,
					"profile": null,
					"fileType": null,
					"numberFields": null,
					"fileName": null,
					"params": null,
					"sourceType": "",
					"edition": "default",
					"entityTemplateType": null,
					"entityTemplate": null,
					"editionCatalogItems": null,
					"editionGroup": null,
					"metaInfos": null,
					"metaDataItemsString": null,
					"collectStatus": false
				},{
					"id": "eb5f19bbdae942ae9f2834d649bc239b",
					"parentId": "adef7ca938114b1ebb75c3a909b8ff3d",
					"layerItems": null,
					"name": "市",
					"aliasName": null,
					"nodeType": "item",
					"type": "vectorTile",
					"alpha": 1.0,
					"checked": false,
					"visible": null,
					"minLevel": 0,
					"maxLevel": 22,
					"url": null,
					"layers": null,
					"formatName": null,
					"epsg": null,
					"tag": null,
					"token": null,
					"tags": null,
					"iconUrl": null,
					"groupId": null,
					"groupName": null,
					"opacity": 1.0,
					"initLevel": -1,
					"extent": "",
					"description": null,
					"defaultVisible": true,
					"visibleMinLevel": 0,
					"visibleMaxLevel": 22,
					"filePath": null,
					"geojsonString": null,
					"shapeType": null,
					"maximumLevel": null,
					"styleName": "featuremap",
					"alias": null,
					"queryFilter": null,
					"tileSchemeType": "tdt_4326",
					"tileWidth": 256,
					"tileHeight": 256,
					"style": null,
					"serviceEngineUrl": null,
					"sourceId": null,
					"dataSetId": null,
					"dataSetIdentifier": null,
					"srid": null,
					"fileUrl": null,
					"serviceUrl": "http://223.71.70.150:9977/mapserviceweb/service/shi_3857/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&LAYER=shi_3857&TILEMATRIX=EPSG:3857:{z}&TILEMATRIXSET=EPSG:3857&FORMAT=application/x-protobuf;type=mapbox-vector&TILECOL={x}&TILEROW={y}",
					"domainMin": null,
					"domainMax": null,
					"serviceName": "shi_3857",
					"serviceEPSG": "EPSG:3857",
					"styleJsonUrl": "http://223.71.70.150:9977/styles/qgxzq/styles/root.json",
					"styleJsonUrlContent":'{"version":"8","name":"featuremap","sources":{"featuremap":{"url":"../../","type":"vector"}},"layers":[{"source":"featuremap","source-layer":"sheng_3857","layout":{},"paint":{"fill-color":"rgba(255, 170, 62,0.01)"},"id":"省界//0/0","type":"fill","minzoom":0,"maxzoom":20},{"source":"featuremap","source-layer":"sheng_3857","layout":{},"paint":{"line-color":"rgba(200,163,92,1)","line-width":1.7},"id":"省界//0/1/0","type":"line","minzoom":0,"maxzoom":20},{"source":"featuremap","source-layer":"shi_3857","layout":{},"paint":{"fill-color":"rgba(255, 170, 62, 0.01)"},"id":"市界//0/0","type":"fill","minzoom":0,"maxzoom":20},{"source":"featuremap","source-layer":"shi_3857","layout":{},"paint":{"line-color":"rgba(166,171,173,1)","line-width":1.2},"id":"市界//0/1/0","type":"line","minzoom":0,"maxzoom":20},{"source":"featuremap","source-layer":"xian_3857","layout":{},"paint":{"fill-color":"rgba(25, 170, 62, 0.01)"},"id":"县界//0/0","type":"fill","minzoom":0,"maxzoom":20},{"source":"featuremap","source-layer":"xian_3857","layout":{},"paint":{"line-color":"rgba(255,239,148,1)","line-width":1.2},"id":"县界//0/1/0","type":"line","minzoom":0,"maxzoom":20}]}',					"sourceName": null,
					"sourceName": null,
					"wmtsUrl": null,
					"matrixSetName": null,
					"tileSize": [
						256,
						256
					],
					"tileSizeString": null,
					"tileGridExtent": null,
					"tileGridExtentString": null,
					"tileGridOrigin": null,
					"tileGridOriginString": null,
					"tileGridResolutions": null,
					"tileGridResolutionsString": null,
					"tileGridMatrixIds": null,
					"tileGridMatrixIdsString": null,
					"featCollJsonObjString": null,
					"width": 0,
					"height": 0,
					"bbox": null,
					"version": "1.3.0",
					"transparent": "true",
					"styles": null,
					"cqlFilter": null,
					"filter": null,
					"condition": null,
					"cqlXmlString": null,
					"layerType": null,
					"requestType": null,
					"databaseType": null,
					"whereClause": null,
					"typeName": null,
					"maxFeatures": null,
					"featureType": null,
					"resultFields": null,
					"featCollJsonObj": null,
					"features": null,
					"records": null,
					"children": null,
					"connectionParams": null,
					"tableName": null,
					"showFieldsJsonString": "",
					"showFields": [],
					"resultFieldsJsonString": null,
					"videoPosition": null,
					"videoRotation": null,
					"near": 0.0,
					"videoFar": null,
					"videoFov": null,
					"videoDebugFrustum": true,
					"aspectRatio": null,
					"videoUrl": null,
					"renderParamsString": "",
					"rendererSettings": [],
					"rendererSettingsString": "",
					"filterName": null,
					"styleJsons": null,
					"sort": 6,
					"tilematrixSuffix": null,
					"fieldItems": null,
					"tilingScheme": null,
					"fields": null,
					"title": null,
					"profile": null,
					"fileType": null,
					"numberFields": null,
					"fileName": null,
					"params": null,
					"sourceType": "",
					"edition": null,
					"entityTemplateType": null,
					"entityTemplate": null,
					"editionCatalogItems": null,
					"editionGroup": null,
					"metaInfos": null,
					"metaDataItemsString": null,
					"collectStatus": false
				},{
					"id": "bd9978537bc740b1a7b3ab589cb7d17a",
					"parentId": "adef7ca938114b1ebb75c3a909b8ff3d",
					"layerItems": null,
					"name": "县",
					"aliasName": null,
					"nodeType": "item",
					"type": "vectorTile",
					"alpha": 1.0,
					"checked": false,
					"visible": null,
					"minLevel": 0,
					"maxLevel": 22,
					"url": null,
					"layers": null,
					"formatName": null,
					"epsg": null,
					"tag": null,
					"token": null,
					"tags": null,
					"iconUrl": null,
					"groupId": null,
					"groupName": null,
					"opacity": 1.0,
					"initLevel": -1,
					"extent": "",
					"description": null,
					"defaultVisible": true,
					"visibleMinLevel": 0,
					"visibleMaxLevel": 22,
					"filePath": null,
					"geojsonString": null,
					"shapeType": null,
					"maximumLevel": null,
					"styleName": "featuremap",
					"alias": null,
					"queryFilter": null,
					"tileSchemeType": "tdt_4326",
					"tileWidth": 256,
					"tileHeight": 256,
					"style": null,
					"serviceEngineUrl": null,
					"sourceId": null,
					"dataSetId": null,
					"dataSetIdentifier": null,
					"srid": null,
					"fileUrl": null,
					"serviceUrl": "http://223.71.70.150:9977/mapserviceweb/service/xian_3857/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&LAYER=xian_3857&TILEMATRIX=EPSG:3857:{z}&TILEMATRIXSET=EPSG:3857&FORMAT=application/x-protobuf;type=mapbox-vector&TILECOL={x}&TILEROW={y}",
					"domainMin": null,
					"domainMax": null,
					"serviceName": "xian_3857",
					"serviceEPSG": "EPSG:3857",
					"styleJsonUrl": "http://223.71.70.150:9977/styles/qgxzq/styles/root.json",
					"styleJsonUrlContent": '{"version":"8","name":"featuremap","sources":{"featuremap":{"url":"../../","type":"vector"}},"layers":[{"source":"featuremap","source-layer":"sheng_3857","layout":{},"paint":{"fill-color":"rgba(255, 170, 62,0.01)"},"id":"省界//0/0","type":"fill","minzoom":0,"maxzoom":20},{"source":"featuremap","source-layer":"sheng_3857","layout":{},"paint":{"line-color":"rgba(200,163,92,1)","line-width":1.7},"id":"省界//0/1/0","type":"line","minzoom":0,"maxzoom":20},{"source":"featuremap","source-layer":"shi_3857","layout":{},"paint":{"fill-color":"rgba(255, 170, 62, 0.01)"},"id":"市界//0/0","type":"fill","minzoom":0,"maxzoom":20},{"source":"featuremap","source-layer":"shi_3857","layout":{},"paint":{"line-color":"rgba(255, 170, 62, 1)","line-width":1.2},"id":"市界//0/1/0","type":"line","minzoom":0,"maxzoom":20},{"source":"featuremap","source-layer":"xian_3857","layout":{},"paint":{"fill-color":"rgba(25, 170, 62, 0.01)"},"id":"县界//0/0","type":"fill","minzoom":0,"maxzoom":20},{"source":"featuremap","source-layer":"xian_3857","layout":{},"paint":{"line-color":"rgba(166,171,173,1)","line-width":1.2},"id":"县界//0/1/0","type":"line","minzoom":0,"maxzoom":20}]}',					"sourceName": null,
					"wmtsUrl": null,
					"matrixSetName": null,
					"tileSize": [
						256,
						256
					],
					"tileSizeString": null,
					"tileGridExtent": null,
					"tileGridExtentString": null,
					"tileGridOrigin": null,
					"tileGridOriginString": null,
					"tileGridResolutions": null,
					"tileGridResolutionsString": null,
					"tileGridMatrixIds": null,
					"tileGridMatrixIdsString": null,
					"featCollJsonObjString": null,
					"width": 0,
					"height": 0,
					"bbox": null,
					"version": "1.3.0",
					"transparent": "true",
					"styles": null,
					"cqlFilter": null,
					"filter": null,
					"condition": null,
					"cqlXmlString": null,
					"layerType": null,
					"requestType": null,
					"databaseType": null,
					"whereClause": null,
					"typeName": null,
					"maxFeatures": null,
					"featureType": null,
					"resultFields": null,
					"featCollJsonObj": null,
					"features": null,
					"records": null,
					"children": null,
					"connectionParams": null,
					"tableName": null,
					"showFieldsJsonString": "",
					"showFields": [],
					"resultFieldsJsonString": null,
					"videoPosition": null,
					"videoRotation": null,
					"near": 0.0,
					"videoFar": null,
					"videoFov": null,
					"videoDebugFrustum": true,
					"aspectRatio": null,
					"videoUrl": null,
					"renderParamsString": "",
					"rendererSettings": [],
					"rendererSettingsString": "",
					"filterName": null,
					"styleJsons": null,
					"sort": 6,
					"tilematrixSuffix": null,
					"fieldItems": null,
					"tilingScheme": null,
					"fields": null,
					"title": null,
					"profile": null,
					"fileType": null,
					"numberFields": null,
					"fileName": null,
					"params": null,
					"sourceType": "",
					"edition": null,
					"entityTemplateType": null,
					"entityTemplate": null,
					"editionCatalogItems": null,
					"editionGroup": null,
					"metaInfos": null,
					"metaDataItemsString": null,
					"collectStatus": false
				}
			]
		},
		{
			name: '流域统计', value: 'ssly', defalutHeader: [
				{ name: '流域', props: 'name', width: 120 }
			], service: [{
				"id": "sdly",
						"name": "全国河流数据",
						"description": null,
						"groupId": "",
						"type": "vectorTile",
						"defaultVisible": "true",
						"opacity": "1.0",
						"visibleMinLevel": "10",
						"visibleMaxLevel": "22",
						"token": null,
						"extent": "",
						"initLevel": "-1",
						"tag": "",
						"sort": "100",
						"edition": null,
						"metaDataItemString": "",
						"serviceUrl": "http://223.71.70.150:9977/mapserviceweb/service/shidaliuyu_3857/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&LAYER=shidaliuyu_3857&TILEMATRIX=EPSG:3857:{z}&TILEMATRIXSET=EPSG:3857&FORMAT=application/x-protobuf;type=mapbox-vector&TILECOL={x}&TILEROW={y}",
						"serviceName": "shidaliuyu_3857",
						"serviceEPSG": "EPSG:3857",
						"styleJsonUrlContent":'{"version":"8","name":"featuremap","sources":{"featuremap":{"url":"../../","type":"vector"}},"layers":[{"source":"featuremap","source-layer":"shidaliuyu_3857","layout":{},"paint":{"line-color":"rgba(0,240,255,1)","line-width":1.5},"id":"十大流域//1","type":"line","minzoom":1,"maxzoom":22},{"source":"featuremap","source-layer":"shidaliuyu_3857","layout":{},"paint":{"fill-color":"rgba(0,150,255,0.01)"},"id":"十大流域//0/0","type":"fill","minzoom":0,"maxzoom":20}]}',
						"styleJsonUrl": "http://223.71.70.150:9977/styles/shidaliuyu_3857/styles/root.json",
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
			}]
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
	},
	showDistrictLevel:[5,7,7], // 省最大级别，市最大级别，县最小级别
	pointLayerName:"wkkd_3857"  // 点位图层名称
};
