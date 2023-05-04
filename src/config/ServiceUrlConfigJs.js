``;
/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-17 15:07:49
 * @LastEditTime: 2022-11-17 10:38:31
 * @LastEditors: zkc
 */

export class ServiceUrlConfig {
    constructor() {
        this.token = null;
        this.envType = null; // 内网环境还是外网环境
    }

    static getInstance () {
        if (!ServiceUrlConfig._instance) {
            ServiceUrlConfig._instance = new ServiceUrlConfig();
        }

        return ServiceUrlConfig._instance;
    }

    init () {
        ServiceUrlConfig.tdt_xyz_public_vec_c_url = ServiceUrlConfig.tdt_xyz_public_base_url + "T=" + ServiceUrlConfig.tdt_xyz_public_vec_c_name + "&x={x}&y={y}&l={z}";
        ServiceUrlConfig.tdt_xyz_public_cva_c_url = ServiceUrlConfig.tdt_xyz_public_base_url + "T=" + ServiceUrlConfig.tdt_xyz_public_cva_c_name + "&x={x}&y={y}&l={z}";
        ServiceUrlConfig.tdt_xyz_public_img_c_url = ServiceUrlConfig.tdt_xyz_public_base_url + "T=" + ServiceUrlConfig.tdt_xyz_public_img_c_name + "&x={x}&y={y}&l={z}";
        ServiceUrlConfig.tdt_xyz_public_cia_c_url = ServiceUrlConfig.tdt_xyz_public_base_url + "T=" + ServiceUrlConfig.tdt_xyz_public_cia_c_name + "&x={x}&y={y}&l={z}";
        ServiceUrlConfig.tdt_xyz_public_ter_c_url = ServiceUrlConfig.tdt_xyz_public_base_url + "T=" + ServiceUrlConfig.tdt_xyz_public_ter_c_name + "&x={x}&y={y}&l={z}";
        ServiceUrlConfig.tdt_xyz_public_cta_c_url = ServiceUrlConfig.tdt_xyz_public_base_url + "T=" + ServiceUrlConfig.tdt_xyz_public_cta_c_name + "&x={x}&y={y}&l={z}";

        ServiceUrlConfig.tdt_xyz_vec_c_url = ServiceUrlConfig.tdt_xyz_public_vec_c_url + "&tk=" + this.token;
        ServiceUrlConfig.tdt_xyz_cva_c_url = ServiceUrlConfig.tdt_xyz_public_cva_c_url + "&tk=" + this.token;
        ServiceUrlConfig.tdt_xyz_img_c_url = ServiceUrlConfig.tdt_xyz_public_img_c_url + "&tk=" + this.token;
        ServiceUrlConfig.tdt_xyz_cia_c_url = ServiceUrlConfig.tdt_xyz_public_cia_c_url + "&tk=" + this.token;
        ServiceUrlConfig.tdt_xyz_ter_c_url = ServiceUrlConfig.tdt_xyz_public_ter_c_url + "&tk=" + this.token;
        ServiceUrlConfig.tdt_xyz_cta_c_url = ServiceUrlConfig.tdt_xyz_public_cta_c_url + "&tk=" + this.token;

        ServiceUrlConfig.tdt_service_base_url = ServiceUrlConfig.tdt_service_public_base_url;

    }
}

ServiceUrlConfig._instance = null;

ServiceUrlConfig.tdt_xyz_vec_c_url = null;
ServiceUrlConfig.tdt_xyz_cva_c_url = null;
ServiceUrlConfig.tdt_xyz_img_c_url = null;
ServiceUrlConfig.tdt_xyz_cia_c_url = null;
ServiceUrlConfig.tdt_xyz_ter_c_url = null;
ServiceUrlConfig.tdt_xyz_cta_c_url = null;

ServiceUrlConfig.tdt_xyz_public_vec_c_name = "vec_c";
ServiceUrlConfig.tdt_xyz_public_cva_c_name = "cva_c";
ServiceUrlConfig.tdt_xyz_public_img_c_name = "img_c";
ServiceUrlConfig.tdt_xyz_public_cia_c_name = "cia_c";
ServiceUrlConfig.tdt_xyz_public_ter_c_name = "ter_c";
ServiceUrlConfig.tdt_xyz_public_cta_c_name = "cta_c";

ServiceUrlConfig.tdt_service_public_base_url = window.BASE_CONFIG.tdt_service_public_base_url;

ServiceUrlConfig.tdt_xyz_public_base_url = window.BASE_CONFIG.tdt_xyz_public_base_url
ServiceUrlConfig.tdt_xyz_public_vec_c_url = ServiceUrlConfig.tdt_xyz_public_base_url + "T=" + ServiceUrlConfig.tdt_xyz_public_vec_c_name + "&x={x}&y={y}&l={z}";
ServiceUrlConfig.tdt_xyz_public_cva_c_url = ServiceUrlConfig.tdt_xyz_public_base_url + "T=" + ServiceUrlConfig.tdt_xyz_public_cva_c_name + "&x={x}&y={y}&l={z}";
ServiceUrlConfig.tdt_xyz_public_img_c_url = ServiceUrlConfig.tdt_xyz_public_base_url + "T=" + ServiceUrlConfig.tdt_xyz_public_img_c_name + "&x={x}&y={y}&l={z}";
ServiceUrlConfig.tdt_xyz_public_cia_c_url = ServiceUrlConfig.tdt_xyz_public_base_url + "T=" + ServiceUrlConfig.tdt_xyz_public_cia_c_name + "&x={x}&y={y}&l={z}";
ServiceUrlConfig.tdt_xyz_public_ter_c_url = ServiceUrlConfig.tdt_xyz_public_base_url + "T=" + ServiceUrlConfig.tdt_xyz_public_ter_c_name + "&x={x}&y={y}&l={z}";
ServiceUrlConfig.tdt_xyz_public_cta_c_url = ServiceUrlConfig.tdt_xyz_public_base_url + "T=" + ServiceUrlConfig.tdt_xyz_public_cta_c_name + "&x={x}&y={y}&l={z}";

ServiceUrlConfig.spatialDecision_base_url = null;

ServiceUrlConfig.tdt_service_base_url = null;

ServiceUrlConfig.subjectgroup_selectByFilter = null;

ServiceUrlConfig.subject_base_url = null;

ServiceUrlConfig.datasourceinfo_fullparseshapefile = null;

