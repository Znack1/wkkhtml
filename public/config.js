/*
 * @Descripttion:
 * @version: 1.0
 * @Author: zkc
 * @Date: 2022-04-07 15:52:42
 * @LastEditors: zkc
 * @LastEditTime: 2023-06-13 20:57:24
 * @input: no param
 * @out: no param
 */
window.BASE_CONFIG = {
	// 公网
	"spatialdecision_public_base_url": "http://223.71.70.150:9977/qgwkk",
	"flie_base_ip":"http://223.71.70.150:9977",
	"tdt_service_public_base_url":"http://api.tianditu.gov.cn",
	"tdt_xyz_public_base_url":"https://t{0-7}.tianditu.gov.cn/DataServer?",
	"defaultToken": "d3182ea02e2a9c206f78d45793bb11ac",
	"DefaultMapBaseLayerType": "Image", // 默认加载地图底图类型Image,Vector,Ter
	"map_view_init_centerPoint":[108.5525, 34.32],
	"map_view_init_initLevel":6,
	"map_view_maxLevel":23,
	"map_view_minLevel":2,
	"canClickMapMinLevel":7, // 地图要素可以点击的最小级别
	"statTypes":[
        {name:'行政区划',value:'sheng',defalutHeader:[
			{name:'区域',props:'name',width:120}
		]},
        {name:'流域统计',value:'ssly',defalutHeader:[
			{name:'流域',props:'name',width:120}
		]},
      ],
	  "showFields":[
		{name:'mc',aliasName:'名称',index:0,value:''}
	  ],
	  useFieldConfig:{
		"监管等级":'hjjgdj',
		"尾矿库等别":"wkkdb",
		"生产状况":"sczk",
		"主要矿种":"zykz"
	  }
};
