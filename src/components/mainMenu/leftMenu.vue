<!--
 * @Descripttion: 
 * @version: 
 * @Author: zkc
 * @Date: 2023-05-04 16:33:30
 * @LastEditors: zkc
 * @LastEditTime: 2023-08-09 22:29:45
-->
<template>
  <div class="divMenuBox">
    <div class="topContent">
      <UCPanel Title="业务数据图层" style="border-radius: 5px 5px 0 0;" iconClass="icon-zuobiao"></UCPanel>
      <vuescroll style="width: 100%; height: calc(100% - 50px);margin-top:5px">
        <UCLeftPanel ref="ucLeftPanel" ></UCLeftPanel>
      </vuescroll>
      
    </div>
    <div class="bottomContent">
      <UCPanel Title="基础数据图层" style="border-radius: 5px 5px 0 0;" iconClass="icon-gaokong1"></UCPanel>
      <vuescroll style="width: 100%; height: calc(100% - 50px);margin-top:5px">
        <UCLayerCatalogTree class="div_leftTree" :options="treeOption"  ref="ucLayerTree" @node-click="_nodeClickHandler" @check-change="_nodeCheckChangeHandler" @node-name-click="_nodeNameClick" @node-name-db-click="_nodeNameDbClickHandler"></UCLayerCatalogTree>
      </vuescroll>
     
    </div>
  </div>
</template>
<script>
import { EventManageCode } from '../EventManage';
import UCLayerCatalogTree from './UCLayerCatalogTree.vue';
import UCLeftPanel from './UCLeftPanel.vue';
import UCPanel from '../../utility/ui/UCPanel.vue'
import vuescroll from "vuescroll";
export default {
  name: "UCLefuMenu",
  props: {},

  data() {
    return {
      treeOption: {
        'baseUrl': "http://223.71.70.150:8022/spatial-v0.1",
        'showCheckbox': false,
      },
      showCheckbox: true,
    };
  },

  components: {
    UCLayerCatalogTree,
    UCLeftPanel,
    UCPanel,
    vuescroll
  },
  computed: {},

  mounted() {
    this.init();
  },

  methods: {
    init(){
      this.$refs.ucLayerTree.init();
    },
   
    /**
     * @name: zkc
     * @msg: 树节点被点击 共三个参数
     * @param {*} data ：传递给 data 属性的数组中该节点所对应的对象
     * @param {*} nodeData 节点对应的 Node
     * @param {*} nodeCompoment 节点组件本身
     * @return {*}
     */
     _nodeClickHandler (nodeData) {
      console.log(nodeData);
    },


    /**
     * @name: zkc
    * @msg: checkbox 选择事件
     * @param {*} nodeData 树节点
     * @param {*} checked 是否被选中
     * @param {*} indeterminate  节点的子树中是否有被选中的节点
     * @return {*}
     */
    _nodeCheckChangeHandler (nodeData) {
      // if (nodeData.defaultVisible) {
      //   console.log("选中------------" + nodeData.name)
      // } else {
      //   console.log("取消选中------------" + nodeData.name)
      // }
      this.$emit(EventManageCode.letMenuTreeCheckChange,nodeData)
    },
    // 选择监听
    on_nodeCheckChangeHandler(callback){
      if(callback){
        this.$on(EventManageCode.letMenuTreeCheckChange,callback)
      }
    },



    /**
     * @name: zkc
     * @msg: 树节点名称点击
     * @param {*} nodeData 树节点本身
     * @return {*}
     */
    _nodeNameClick (nodeData) {

      console.log("节点名称点击----start");
      console.log(nodeData);
      console.log("节点名称点击----end");

    },

    /**
    * @name: zkc
    * @msg: 树节点名称双击
    * @param {*} nodeData 树节点本身
    * @return {*}
    */
    _nodeNameDbClickHandler (nodeData) {
      console.log("节点名称双击----start");
      console.log(nodeData);
      console.log("节点名称双击----end");
    },

    on_checkLayer(callback){
      if(this.$refs.ucLeftPanel){
        this.$refs.ucLeftPanel.on_checkLayer(callback)
      }
    }
  },
};
</script>
  
  <style lang="less" scoped>
.divMenuBox{
  text-align: left;
    padding:0;
    height: 100%;
   
    .div_leftTree{
      height: 100%;
      width:100%;
      // padding:10px;
      
    }
    .topContent{
      height:60%;
      width:100%;
      background:white;
      border:1px solid #3D81EF;
      border-radius:5px;
    }
    .bottomContent{
      height:calc(40% - 10px);
      width:100%;
      margin-top:10px;
      background:white;
      border-radius:5px;
    }
}
</style>
  