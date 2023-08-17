<!--
 * @Descripttion: 
 * @version: 
 * @Author: zkc
 * @Date: 2023-05-23 20:52:09
 * @LastEditors: zkc
 * @LastEditTime: 2023-08-15 21:35:54
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
          @node-expand="_nodeExpand"
          accordion
          ref="tree"
        >
          <span
            class="custom-tree-node"
            @mouseover="_mouseOver(data)"
            @mouseleave="_mouseLeave(data)"
            slot-scope="{ node, data }"
            :title="node.name"
          >
            <!-- <el-button v-show="data.type==nodeType.root && options.showIcon" type="text" size="small" icon="el-icon-catalog-root"></el-button>
            <el-button v-show="data.type==nodeType.group  && options.showIcon" type="text" size="small" icon="iconfont icon-NzmV1nzmGrid"></el-button> -->
            <img
              style="margin-right: 5px"
              
              :src="data.type == 'group'&& ((curOverNode  && curOverNode.id == data.id)|| (curCheckedNode &&curCheckedNode.id == data.id))?  data.selectImg:data.img"
              width="18px"
              height="18px"
            />
            <span
              class="treeName"
              :class="{ childName: data.type == 'leaf' }"
              :title="data.name"
              >{{ data.name }}</span
            >
            <div class="rightSwitch" @click.stop="">
              <el-switch
                :width="24"
                v-show="data.type == 'leaf'"
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
import AxiosConfig from "@/config/AxiosConfigJs";
import { ServiceUrlConfig } from "@/config/ServiceUrlConfigJs";
import { LayerCatalogItemType, VectorTileLayerItem, WmsLayerItem, WmtsLayerItem } from "@/model/LayerCatalogItem";

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
          name: "尾矿库等别",
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
      curChecked: new Array(),
      curOverNode:null
    };
  },
  components: {
    vuescroll,
  },

  mounted() {
    this.getTreeNodes();
  },

  methods: {
    // 移动上去
    _mouseOver(node){
      this.curOverNode = node;
    },

    _mouseLeave(node){
      if(this.curOverNode == node){
        this.curOverNode = null;
      }
    },

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
        if (val && data.type == "group") {
          this.curChecked = [];
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
            if (val) {
              this.$refs.tree.store.nodesMap[child.id].expanded = val;
            }
            this._change(data.checked, child, checkeds);
          } else {
            checkeds.push(child);
          }
        });
      }
      if (isFirst) {
        if (val) {
          this.curChecked = this.curChecked.concat(checkeds);
        } else {
          _.remove(this.curChecked, (o) => {
            let findItem = _.find(checkeds, { id: o.id });
            return findItem;
          });
        }

        console.log(this.curChecked);
        this.$emit(EventManageCode.treeCheckChange, this.curChecked);
      }
    },
    // 点击选中节点
    on_checkLayer(callback) {
      if (callback) {
        this.$on(EventManageCode.treeCheckChange, callback);
      }
    },

    // 节点展开
    _nodeExpand(data, node) {
      let checkeds = [];
      this.curCheckedNode = data;
      data.checked = true;
      if (data.type == "group") {
        this.curChecked = [];
        this.setUnChecked(this.treeNodes);
        _.each(data.children, (child) => {
          child.checked = data.checked;
          if (child.type == "group") {
            if (data.checked) {
              this.$refs.tree.store.nodesMap[child.id].expanded = val;
            }
            this._change(data.checked, child, checkeds);
          } else {
            checkeds.push(child);
          }
        });
        this.curChecked = this.curChecked.concat(checkeds);
        this.$emit(EventManageCode.treeCheckChange, this.curChecked);
      }
    },

    // 设置其他根节点不选中
    setUnChecked(treeNodes) {
      let parentNode = this.curCheckedNode;
      while (this.getParentNode(parentNode.parentId, this.treeNodes)) {
        parentNode = this.getParentNode(parentNode.parentId, this.treeNodes);
      }
      _.each(treeNodes, (node) => {
        if (node.id != parentNode.id) {
          node.checked = false;
          if (node.type == "group") {
            this.$refs.tree.store.nodesMap[node.id].expanded = false;
            this.setUnChecked(node.children);
          }
        }
      });
    },

    //  设置节点不选中
    setAllUnChecked(treeNodes) {
      treeNodes = treeNodes || this.treeNodes;
      _.each(treeNodes, (node) => {
        node.checked = false;
        if (node.type == "group") {
          this.$refs.tree.store.nodesMap[node.id].expanded = false;
          this.setAllUnChecked(node.children);
        }
      });
    },
    // 设置选中展开
    getParentNode(parentId, treeNodes) {
      treeNodes = treeNodes || this.treeNodes;
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

    // 获取目录树数据
    getTreeNodes() {
      AxiosConfig.spatialdecision
        .get(ServiceUrlConfig.firstDir_allDir)
        .then((res) => {
          if (res.data.code == 200) {
            let treeNodes = [];

            this.treeNodes = this.dealData(res.data.data, treeNodes);
            this.$nextTick(() => {
              let firstNode = this.treeNodes[0] ? this.treeNodes[0] : null;
              if (firstNode) {
                firstNode.checked = true;
                this._change(true, firstNode);
              }
            });
          }
        })
        .catch((error) => {
          this.$message.warning("获取数据失败");
        });
    },

    // 处理数据
    dealData(datas, treeNodes) {
      for (let idx = 0; idx < datas.length; idx++) {
        let treeNode = _.cloneDeep(datas[idx]);
        treeNode.type = treeNode.children.length > 0 ? "group" : "leaf";
        treeNode.checked = false;
        treeNode.children = null;
        if (datas[idx].children.length > 0) {
          treeNode.children = [];
          treeNode.children = this.dealData(
            datas[idx].children,
            treeNode.children
          );
        }

        // 创建图层layer对象
        // let layerItemObj = window.BASE_CONFIG.polygonLayer1;
        // let showTempLayerItem = null;
        // if (idx == 0 && treeNode.type) {
        //   if (layerItemObj.type === LayerCatalogItemType.vectorTile) {
        //     showTempLayerItem = VectorTileLayerItem.fronJson(layerItemObj);
        //   } else if (layerItemObj.type === LayerCatalogItemType.wfs) {
        //   } else if (layerItemObj.type === LayerCatalogItemType.wmts) {
        //     showTempLayerItem = WmtsLayerItem.fromJson(layerItemObj);
        //   } else if (layerItemObj.type === LayerCatalogItemType.wms) {
        //     showTempLayerItem = WmsLayerItem.fromJson(layerItemObj);
        //   }
        //   treeNode.layerItem = showTempLayerItem;
        // }
        treeNodes.push(treeNode);
      }

      return treeNodes;
    },
  },
};
</script>
<style lang="less" scoped>
.collapsePanel {
  .childName{
    font-size:16px;
    font-weight: normal;
  }
  .custom-tree-node {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 5px 0;
  
    .rightSwitch {
      display: inline-block;
      margin-left: auto;
    }
  }
}
/deep/ .el-tree-node__content {
      // margin-bottom: 5px;
      height:32px;
      &:hover{
        background:#d9ecfe;
        .treeName{
          color:  #3d81ef!important;
        }  
      }
    }
  /deep/ .el-switch__core{
    margin: 0;
    position: relative;
    width: 30px;
    height: 12px;
    border: 1px solid #DCDFE6;
    outline: 0;
    border-radius: 10px;
    box-sizing: border-box;
    background: #DCDFE6;
    transition: border-color .3s,background-color .3s;
    vertical-align: middle;
  }
  /deep/ .el-switch__core:after {
    content: "";
    position: absolute;
    top: -1px;
    left: 1px;
    border-radius: 100%;
    transition: all .3s;
    width: 10px;
    height: 10px;
    background-color: #FFF;
}
  /deep/ .el-switch.is-checked .el-switch__core::after {
    left: 100%;
    margin-left: -10px;
}
// /deep/ .el-tree-node__expand-icon {
//   pointer-events: none;
//   }
</style>