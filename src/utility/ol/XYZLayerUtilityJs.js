/*
 * @Author: wutt
 * @Date: 2020-11-19 11:22:20
 * @LastEditors: wutt
 * @LastEditTime: 2020-11-20 11:05:48
 * @Description: 
 * @FilePath: /DianZiDiTu/src/utility/common/XYZLayerUtilityJs.js
 */
export class XYZLayerUtility {
    constructor() {
        this.epsg = "EPSG:4326";

        this.xyzUrl = null;

        this.serviceName = null;

        this.tileSize = [256, 256];

        this.tileGridExtent = null;

        //epsg3857_origin: [-20037508.342787001, 20037508.342787001],
        //epsg4326_origin: [-180, 90],
        this.tileGridOrigin = null;

        this.tileGridResolutions = null;
        this.params_key_layer= null;//服务名称--拼接地址栏
        this.params_value_layer= null;
        this.params_key_x= null;
        this.params_key_y=null;
        this.params_key_l= null;
        this.params_key_token= null;
        this.token = null;


    }
    createXYZSource()
    {   
        let source=null;

        let srs = ol.proj.get(this.epsg);

      //  let newUrl = this.xyzUrl;
      let newUrl =this.joinUrl();
        source = new ol.source.XYZ(
            {   
                projection:srs,
                url:newUrl,
                tileGrid: new ol.tilegrid.TileGrid({
                    tileSize: this.tileSize,
                    extent: this.tileGridExtent, //范围
                    origin: this.tileGridOrigin,
                    resolutions: this.tileGridResolutions
                }),
            }
        );        
        return source;
    }
    /**
     * @Author: wutt
     * @Date: 2020-11-20 10:01:51
     * @Description: 拼接地址
     */
    joinUrl(){
        let newUrl = this.xyzUrl;
        if(this.token && this.params_key_token){
            if (!newUrl.endsWith("?")) {
                newUrl = newUrl + "?"
            }
            newUrl = newUrl + this.params_key_layer + "=" + this.params_value_layer 
            + "&" + this.params_key_x  + "="+ "{x}"
            + "&" + this.params_key_y  + "="+ "{y}"
            + "&" + this.params_key_l  + "="+ "{z}"
            + "&" + this.params_key_token + "=" + this.token;
        }
        return newUrl;
    }


}