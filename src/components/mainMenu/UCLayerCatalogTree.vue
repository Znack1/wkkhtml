<template>
  <div class="noConfig">
    <vuescroll style="width: 100%; height: 100%">
      <el-tree
        :filter-node-method="filterNode"
        style="width: 100%"
        :show-checkbox="options.showCheckbox"
        :data="treeNodes.objects"
        node-key="id"
        @node-click="_nodeClickHandler"
        :props="defaultProps"
        :render-after-expand="false"
        :expand-on-click-node="true"
        ref="tree"
      >
        <span
          class="custom-tree-node"
          slot-scope="{ node, data }"
          :title="node.label"
        >
          <span
            class="treeName"
            @click="_nodeNameClickHandler(data)"
            @dblclick="_nodeNameDbClickHandler(data)"
            :title="node.label"
            >{{ node.label }}</span
          >
          <div @click.stop="" class="rightSwitch">
            <el-switch
              v-model="node.defaultVisible"
              @change="
                (val) => {
                  _nodeCheckChangeHandler(data, val);
                }
              "
            >
            </el-switch>
          </div>
        </span>
      </el-tree>
    </vuescroll>
  </div>
</template>

<script>
import _ from "lodash";
import { EventManageCode } from "../EventManage.js";
import { UCOperationType } from "../../model/UCComponentJs";
import vuescroll from "vuescroll";

import { ServiceUrlConfig } from "../../config/ServiceUrlConfigJs";
import { LayerCatalogItems } from "../../model/LayerCatalogItem.js";
import AxiosConfig from "@/config/AxiosConfigJs.js";
export default {
  name: "UCLayerCatalogTree",
  data() {
    return {
      treeNodes: new LayerCatalogItems(),
      curTreeNode: null,
      defaultProps: {
        children: "children",
        label: "name",
      },
      treeStyleSet: {
        treeState: UCOperationType,
        operationType: UCOperationType.operation_preview, // 是否是可编辑状态
      },
    };
  },
  components: {
    vuescroll,
  },
  props: {
    options: {
      type: Object,
      default: () => {
        return {
          baseUrl: window.location.protocol + "//" + window.location.host,
          legend: false,
          showCheckbox: true,
          showIcon: false,
          filter: {},
        };
      },
    },
  },
  computed: {},
  mounted() {},
  methods: {
    init(callback) {
      this.reset(callback);
      this._initEvents();
    },

    // 过滤目录树
    filterTreeNode(keyword) {
      this.$refs.tree.filter(keyword);
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    /**
     * @name: zkc
     * @msg: 重新获取数据
     * @param {*}
     * @return {*}
     */
    reset(callback) {
      let self = this;
      this.treeNodes = new LayerCatalogItems();
      AxiosConfig.spatialdecision
        .get(ServiceUrlConfig.nextDir_allInformation)
        .then((resonse) => {
          this.treeNodes = LayerCatalogItems.fromJsons(resonse.data.data);
          //设置图层目录组全局分组
        })
        .catch((error) => {
          console.log(error);
        });
    },

    /**
     * @name: zkc
     * @msg: 设置node选中
     * @param {*} nodeIds
     * @return {*}
     */
    updateChecked(nodeIds) {
      if (nodeIds) {
        this.$refs.tree.setCheckedKeys(nodeIds);
      }
    },
    _initEvents() {
      let self = this;
    },
    _nodeClickHandler(data, nodeData, nodeCompoment) {
      this.$emit(EventManageCode.treeNodeClick, data, nodeData, nodeCompoment);
    },
    _nodeCheckChangeHandler(nodeData, checked, indeterminate) {
      nodeData.defaultVisible = checked;

      let layerItem = nodeData;
      if (!layerItem) return;
      // 组件的visibleItems赋值
      if (layerItem.defaultVisible) {
        let findIndex = LayerCatalogItems.visibleItems.findIndexById(
          layerItem.id
        );
        LayerCatalogItems.visibleItems.removeByIndex(findIndex);
        LayerCatalogItems.visibleItems.push(layerItem);
      } else {
        let findVisibleIndex = LayerCatalogItems.visibleItems.findIndexById(
          layerItem.id
        );
        if (findVisibleIndex != -1) {
          layerItem.defaultVisible = false;
          LayerCatalogItems.visibleItems.removeByIndex(findVisibleIndex);
        }
      }
      this.$emit(
        EventManageCode.treeCheckChange,
        nodeData,
        checked,
        indeterminate
      );
    },
    // 点击节点名称的时候
    _nodeNameClickHandler(treeNode) {
      if (!treeNode) return;
      this.curTreeNode = this.treeNodes.findByTreeNodeId(treeNode.id);
      this.$emit(EventManageCode.treeNodeNameClick, treeNode);
    },

    /**
     * 消息提示
     */
    _messageTip(message) {
      let self = this;
      self.$message({
        showClose: true,
        type: "info",
        message: message,
      });
    },
  },
};
</script>

<style lang="less" scoped >
/** @format */
.noConfig {
  .el-tree {
  background: none;
  // color: rgb(39, 37, 37);
}

/deep/ .el-tree-node {
  line-height: 36px;
  font-size: 18px;
}

/deep/ .el-button--small,
/deep/ .el-button--small.is-round {
  padding: 0 15px;
}
.el-tree-node:focus > .el-tree-node__content {
  background-color: rgba(255, 255, 255, 0.15);
}
&.el-tree-node__content:hover {
  background-color: rgba(255, 255, 255, 0.15);
}
.el-checkbox__inner {
  background: rgba(255, 255, 255, 0.5);
}
.el-tree-node__label {
  font-size: 14px;
}

/deep/ .el-button {
  color: #409eff;
  background: 0 0;
  padding-left: 0;
  background: none;
  padding-right: 0;
}

/deep/ .el-tree-node__content {
  display: flex;
  align-items: center;
  height: 26px;
  cursor: pointer;
}

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

</style>