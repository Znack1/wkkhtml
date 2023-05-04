<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: zkc
 * @Date: 2022-11-17 16:10:33
 * @LastEditors: zkc
 * @LastEditTime: 2022-11-17 16:43:12
 * @input: no param
 * @out: no param
-->
<template>
  <div class="content">
    <div style="width: 100%; height: 60px; display: flex; align-items: center">
      工具
    </div>
    <div class="chexkBox">
      <el-checkbox-group v-model="checkList" @change="checkLayout">
        <el-checkbox
          v-for="(item, index) in data"
          :key="index"
          :label="item.eventCode"
          border
        >{{item.name}}</el-checkbox>
      </el-checkbox-group>
    </div>
  </div>
</template>
    <script>
import { MapTools } from "../../../common/maptoolJs";
export default {
  name: "UCThemeTemplate",

  data() {
    return {
        checkList: [],
      data: [],
    };
  },

  components: {},
  computed: {},

  mounted() {
    this.handleMapTools();
  },

  methods: {
    handleMapTools() {
      this.data = MapTools.mapTools;
    },
    //选中的code
    checkLayout(){
        if(this.checkList.length >5){
           this.checkList.shift()
        }
        this.$emit('checkLayout',this.checkList)
    },
  },
};
</script>
      
      <style lang="less" scoped>
::v-deep .el-checkbox {
  margin: 15px 0 0 0;
  width: 110px;
}
::v-deep .el-checkbox-group {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}
::v-deep .el-checkbox.is-bordered{
    margin-left: 10px;
}
.content {
  width: 98%;
  height: 100%;
  margin-left: 2%;
  display: flex;
  flex-direction: column;

  > .chexkBox {
    width: 98%;
    height: 35vh;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
  }
}
</style>
      