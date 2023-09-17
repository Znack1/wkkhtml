<!--
 * @Author: your name
 * @Date: 2020-04-12 21:10:29
 * @LastEditTime: 2023-09-17 23:22:32
 * @LastEditors: zkc
 * @Description: In User Settings Edit
 * @FilePath: \html\src\utility\ui\UCPanel.vue
-->
<template>
  <div class="divPanel">
    <el-row type="flex" class="rowBg">
      <el-col :span="21" class="panel-title"><i class="iconfont" :class="iconClass"></i>{{ Title }}</el-col>
      <el-col :span="3" v-if="count !=0">{{ count }}</el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "UCPanel",
  data() {
    return {

    };
  },
  props: ['Title','iconClass',"count"],
  methods: {},
  computed: {
   
  }
};
</script>
<style lang="less" scoped>
.divPanel {
  background: #3D81EF;
  color:white;
}

.divPanel .rowBg{
  padding:8px 5px;
}
.divPanel .iconfont {
 margin-left: 5px;
 margin-right:5px;
}
.divPanel .panel-title {
  line-height: 22px;
  font-size: 18px;
  text-align: left;
  font-weight:bold
}

</style>
