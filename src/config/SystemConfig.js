/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-17 15:07:49
 * @LastEditTime: 2022-07-26 17:37:35
 * @LastEditors: zkc
 */

import AxiosConfig from "./AxiosConfigJs.js";
import { ServiceUrlConfig } from "./ServiceUrlConfigJs";
import { BaseLayerConfig } from "./BaseLayerConfig";
export class SystemConfig {
  constructor() {
    // 滚动条配置

  }

  // //初始化
  init() {
    //初始化axios配置
    AxiosConfig.config();

    let urlConfigInstance = ServiceUrlConfig.getInstance();
    urlConfigInstance.token = SystemConfig.token;
    urlConfigInstance.envType = SystemConfig.deployEnvType;
    urlConfigInstance.init();
    SystemConfig.bodyWidth = document.body.offsetWidth;

    // 初始化地图
    let blConfigInstance = BaseLayerConfig.getInstance();
    blConfigInstance.envType = SystemConfig.deployEnvType;
    blConfigInstance.init();

  }


  static getInstance() {
    if (!SystemConfig._instance) {
      SystemConfig._instance = new SystemConfig();
    }

    return SystemConfig._instance;
  }


}
SystemConfig._instance = null;

//请求时默认的token值
SystemConfig.token = "f6616fa13df718e2cd6280af4c45f5a2";


//网页宽度
SystemConfig.bodyWidth = '';

//网页高度
SystemConfig.bodyWidth = '';
SystemConfig.sortFieldName = "sort";
