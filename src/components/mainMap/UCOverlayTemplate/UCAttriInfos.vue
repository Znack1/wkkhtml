<!--
 * @Author: your name
 * @Date: 2020-03-09 14:31:30
 * @LastEditTime: 2023-08-07 14:54:29
 * @LastEditors: zkc
 * @Description: In User Settings Edit
 * @FilePath: \html\src\components\mainMap\UCOverlayTemplate\UCAttriInfos.vue
 -->
<!--  -->
<template>
  <div>
    <ul class="ul-attrisInfo">
        <li class="li-items" v-for="item in attributes"
        :key="item.key">
        <div class="div-attri-key"  :title="item.key">{{item.key.trim()}}</div>
        <div class="div-attri-value"  :title="item.value">{{item.value}}</div>
        </li>
     
    </ul>

  </div>
</template>

<script>
export default {
  name: "UCAttriInfos",
  data() {
    return {
      attributes: new Array()
    };
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {
    init(attris) {
      this.attributes = attris;
    }
  }
};
</script>

<style lang="less" scoped>
.ul-attrisInfo {
  padding: 0px;
  width: 100%;
  margin: 0;
  padding:0 10px;
  padding-top: 0;
  box-sizing: border-box;
}
.li-items {
  line-height: 14px;
    list-style: none;
    box-sizing: border-box;
    overflow: hidden;
    font-size: 14px;
    color: #323232;
    border: 1px solid #e4e4e4;
    width:50%;
    float: left;
    border-top:none;
    &:nth-of-type(2){
     border-top: 1px solid #e4e4e4;
      // border: 1px solid #e4e4e4;
    }
    &:nth-of-type(1){
      border-top: 1px solid #e4e4e4;
      // border: 1px solid #e4e4e4;
    }
    &:nth-of-type(2n + 1){
      border-right: none;
      // border: 1px solid #e4e4e4;
    }
    &:last-of-type{
      border-right: 1px solid #e4e4e4;
      // border: 1px solid #e4e4e4;
    }
  .div-attri-key {
    width: 110px;
    font-weight: 300;
    line-height: 14px;
    float: left;
    text-align: left;
    font-size:14px;
    line-height:26px;
    border-right:1px solid #e4e4e4;
    background: #f9f9f9;
    padding: 0 8px;
  }
  .div-attri-value {
    padding-left: 6px;
    width: calc(100% - 116px);
    float: right;
    text-align: left;
    word-break: break-all;
    font-size: 14px;
    line-height: 26px;
    padding: 0 8px;
    color:#8397d4;
  }
}
</style>
