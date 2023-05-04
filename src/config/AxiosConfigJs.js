/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-17 15:07:49
 * @LastEditTime: 2023-05-04 15:41:09
 * @LastEditors: zkc
 */
import axios from 'axios';



let AxiosConfig = {

    spatialdecision: null,
    publicJson:null,
  


    config(timeout) {

        if (!timeout) {
            timeout = 60000;
        }

        let spatialdecision_base_url = window.BASE_CONFIG.spatialdecision_public_base_url;

        AxiosConfig.spatialdecision = axios.create({
            baseURL: spatialdecision_base_url,
            // timeout: timeout
        });
       

        // 本地配置文件
        let path =  process.env.NODE_ENV == 'development' ? '' : '/wkkhtml/'
        let public_json_url = path + "/json/";
        
        AxiosConfig.publicJson = axios.create({
            baseURL:public_json_url,
            // timeout:timeout
        })

     
    }

}

export default AxiosConfig;