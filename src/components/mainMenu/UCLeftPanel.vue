<!--
 * @Descripttion: 
 * @version: 
 * @Author: zkc
 * @Date: 2023-05-23 20:52:09
 * @LastEditors: zkc
 * @LastEditTime: 2023-06-06 10:29:36
 <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item v-for="item in panelDatas" :key="item.id" :title="item.name" :name="item.id">
        <template slot="title">
            <div class="collTitle">
              <span>{{item.name }}</span>
              <div @click.stop="">
                <el-switch v-model="item.checked"   @change.stop="_change">
              </el-switch>
              </div>
             
            </div>
        </template>
          <div class="liItem"  v-for="child in item.children" :key="child.id" >
             
              <span class="namebox">{{ child.name  }}</span>
              <el-switch v-model="child.checked" class="switchbox" >
            </el-switch>
          </div>
      </el-collapse-item>
      
    </el-collapse>
-->
<template>
  <div class="collapsePanel">
    <div>
      <vuescroll style="width: 100%; height: 100%">
        <el-tree
          style="width: 100%"
          :data="treeNodes"
          node-key="id"
          :props="defaultProps"
          :render-after-expand="false"
          :expand-on-click-node="false"
          accordion
          ref="tree"
        >
          <span
            class="custom-tree-node"
            slot-scope="{ node, data }"
            :title="node.name"
          >
            <!-- <el-button v-show="data.type==nodeType.root && options.showIcon" type="text" size="small" icon="el-icon-catalog-root"></el-button>
            <el-button v-show="data.type==nodeType.group  && options.showIcon" type="text" size="small" icon="iconfont icon-NzmV1nzmGrid"></el-button> -->
            <img
              style="margin-right: 5px"
              v-show="data.type == 'leaf'"
              src="../../assets/images/yiji.png"
              width="24px"
              height="24px"
            />
            <span
              class="treeName"
              :class="{ childName: data.type == 'leaf' }"
              :title="data.name"
              >{{ data.name }}</span
            >
            <div class="rightSwitch" @click.stop="">
              <el-switch
                v-model="data.checked"
                @change="
                  (val) => {
                    _change(val, data);
                  }
                "
              >
              </el-switch>
            </div>
          </span>
        </el-tree>
      </vuescroll>
    </div>
  </div>
</template>

<script>
import vuescroll from "vuescroll";
import _ from "lodash";

import { EventManageCode } from "../EventManage";
import AxiosConfig from '@/config/AxiosConfigJs';
import { ServiceUrlConfig } from '@/config/ServiceUrlConfigJs';

export default {
  name: "UCCollapsePanel",
  data() {
    return {
      activeNames: ["1"],
      defaultProps: {
        children: "children",
        label: "name",
      },
      treeNodes: [
        {
          id: 1,
          name: "监管等级",
          type: "group",
          checked: false,
          parentId: 0,
          children: [
            {
              id: 11,
              parentId: 1,
              name: "一级",
              type: "group",
              checked: false,
              children: [
                {
                  id: 131,
                  parentId: 11,
                  name: "三级",
                  type: "leaf",
                  checked: false,
                },
              ],
            },
            {
              id: 12,
              parentId: 1,
              name: "二级",
              type: "leaf",
              checked: false,
            },
            {
              id: 13,
              parentId: 1,
              name: "三级",
              type: "leaf",
              checked: false,
            },
            {
              id: 14,
              parentId: 1,
              name: "暂无",
              type: "leaf",
              checked: false,
            },
          ],
        },
        {
          id: 2,
          parentId: 0,
          name: "尾款库等别",
          type: "group",
          checked: false,
          children: [
            {
              id: 21,
              parentId: 2,
              name: "一级",
              type: "leaf",
              checked: false,
            },
            {
              id: 22,
              parentId: 2,
              name: "二级",
              type: "leaf",
              checked: false,
            },
            {
              id: 23,
              parentId: 2,
              name: "三级",
              type: "leaf",
              checked: false,
            },
            {
              id: 24,
              parentId: 2,
              name: "暂无",
              type: "leaf",
              checked: false,
            },
          ],
        },
      ],
      curCheckedNode: null,
    };
  },
  components: {
    vuescroll,
  },

  mounted(){
    this.getTreeNodes()
  },

  methods: {
    handleChange(val) {
      console.log(val);
    },

    // 改变选中状态
    _change(val, data, checkeds) {
      let isFirst = false;
      this.curCheckedNode = data;
      if (!checkeds) {
        checkeds = [];
        isFirst = true;

        // 如果是选中  则取消其他
        if(val && data.type == "group"){
          this.setUnChecked(this.treeNodes);
        }
      
       
        // 本节点关闭或者展开
        this.$refs.tree.store.nodesMap[data.id].expanded = val;
      
      }

      if (data.type != "group") {
        checkeds.push(data);
      }
      // data.checked = !data.checked;
      if (data.type == "group") {
        _.each(data.children, (child) => {
          child.checked = data.checked;
          if (child.type == "group") {
            if(val){
              this.$refs.tree.store.nodesMap[child.id].expanded = val;
            }
            this._change(data.checked, child, checkeds);
          } else {
            checkeds.push(child);
          }
        });
      }
      if (isFirst) {
        console.log(checkeds);
        this.$emit(EventManageCode.treeCheckChange,checkeds)
        
      }
    },
    // 点击选中节点
    on_checkLayer(callback){
      if(callback){
        this.$on(EventManageCode.treeCheckChange,callback)
      }
    },

    // 设置其他根节点不选中
    setUnChecked(treeNodes) {
      let parentNode = this.curCheckedNode;
      while (this.getParentNode(parentNode.parentId, this.treeNodes)){
          parentNode = this.getParentNode(parentNode.parentId, this.treeNodes)
      }
      _.each(treeNodes,(node) => {
        if (node.id !=parentNode.id ) {
          node.checked = false;
          if (node.type == "group") {
            this.$refs.tree.store.nodesMap[node.id].expanded = false;
            this.setUnChecked(node.children);
          }
        }
       
      });
    },

    // 设置选中展开
    getParentNode(parentId, treeNodes) {
      let node = null;
      for (let idx = 0; idx < treeNodes.length; idx++) {
        if (treeNodes[idx].id == parentId) {
          return treeNodes[idx];
        } else if (
          treeNodes[idx].type == "group" &&
          treeNodes[idx].children.length > 0
        ) {
          node = this.getParentNode(parentId, treeNodes[idx].children);
          if (node) {
            return node;
          }
        }
      }
      return node;
    },

    /**
     * @name: zkc
     * @msg: 设置node选中
     * @param {*} nodeIds
     * @return {*}
     */
    updateChecked(nodeIds, checked) {
      if (nodeIds) {
        this.$refs.tree.setCheckedKeys(nodeIds, checked);
      }
    },

    // 获取目录树数据
    getTreeNodes(){
      AxiosConfig.spatialdecision
      .get(ServiceUrlConfig.firstDir_allDir)
      .then((res)=>{
        if(res.data.code == 200){
         let treeNodes = [];
          this.treeNodes =  this.dealData(res.data.data,treeNodes);

        }
        
      }).catch((error)=>{
        this.$message.warning("获取数据失败")
      })
    },

    // 处理数据
    dealData(datas,treeNodes){
      for(let idx = 0; idx < datas.length; idx++){
      
        let treeNode = _.cloneDeep(datas[idx])
        treeNode.type = treeNode.children.length > 0?'group':'leaf'
        treeNode.checked = false;
        treeNode.children = null;
        if(datas[idx].children.length > 0){
          treeNode.children = [];
          treeNode.children =  this.dealData(datas[idx].children,treeNode.children)
        }
        treeNodes.push(treeNode)
      }
      return treeNodes;
    }
  },
};
</script>
<style lang="less" scoped>


.collapsePanel {
  .custom-tree-node {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .el-tree-node__content {
      margin-bottom: 5px;
    }
    .rightSwitch {
      display: inline-block;
      margin-left: auto;
    }
  }
}
/deep/ .el-tree-node__expand-icon {
  pointer-events: none;
  }
</style>