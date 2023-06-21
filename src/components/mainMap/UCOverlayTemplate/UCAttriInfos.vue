<!--
 * @Author: your name
 * @Date: 2020-03-09 14:31:30
 * @LastEditTime: 2023-06-21 14:46:18
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
        <div class="div-attri-key"  :title="item.key">{{item.key.trim()}}：</div>
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
  padding: 5px 0;
  box-sizing: border-box;
  overflow: hidden;
  font-size: 14px;
  color: #323232;
  .div-attri-key {
    width: 90px;
    font-weight: 300;
    line-height: 14px;
    float: left;
    text-align: left;
    font-size:14px;
    line-height:26px;
  }
  .div-attri-value {
    padding-left: 6px;
    width: calc(100% - 96px);
    float: right;
    text-align: left;
    word-break: break-all;
    font-size: 14px;
    line-height: 26px;
  }
}
</style>
