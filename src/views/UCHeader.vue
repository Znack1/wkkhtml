<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: zkc
 * @Date: 2021-03-23 10:01:24
 * @LastEditors: zkc
 * @LastEditTime: 2023-08-02 16:30:10
 * @input: no param
 * @out: no param
-->
<template>
  <div class="divHeader">
      <div class="divLogoBox">
        <img src="../assets/images/logo.png" />
      </div>
  </div>
</template> 

<script>
import _ from "lodash";
import { ServiceUrlConfig } from "../config/ServiceUrlConfigJs";
export default {
  name: "UCHeader",
  data () {
    return {
    };
  },

  components: {},

  computed: {},

  mounted () {
   
  },

  beforeCreate () {
  },

  methods: {

    init () {
      this._initEvents();
    },

    /**
     * 初始化事件
     */
    _initEvents () { }
  }
};
</script>

<style lang="less" scoped>
.divHeader {
  padding: 0 20px;
  height: 60px;
  width: 100%;
  // background: #075cba;
  background: url("../assets/images/header_bg.png") left center no-repeat;
  background-size: 100%;
  .divLogoBox {
    margin-top: 10px;
    float: left;
    color: white;
    height: 40px;
    // padding-left: 50px;
    // background: url("../assets/images/header_bg.png") left center no-repeat;
    // background-size: auto 50px;
  }
  .divNotice {
    color: white;
    font-size: 16px;
    height: 30px;
    line-height: 30px;
    margin-top: 15px;
    float: right;
    width: 500px;
    overflow: hidden;
    // text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
  }
}
</style>