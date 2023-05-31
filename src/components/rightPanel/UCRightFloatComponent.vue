
<template>
  <div class="divRightFloat">
    <div style="height: calc(100% - 0px); box-shadow: 4px 1px 18px 3px #8a8a8a">
      <vuescroll style="width: 100%; height: 100%">
        <el-collapse
          v-model="activeNames"
          @change="handleChange"
          style="width: 100%; height: 100%"
        >
          <el-collapse-item :title="ucsetting.tabelName" name="1">
            <div class="echartbox">
              <UCBarXComponent ref="ucBarXComponent"></UCBarXComponent>
            </div>
          </el-collapse-item>
          <el-collapse-item
            :title="ucsetting.tableNameYear"
            name="2"
            class="tableContent"
          >
            <UCDistributionTable
              ref="ucDistributionTable"
              class="table"
            ></UCDistributionTable>
          </el-collapse-item>
        </el-collapse>
      </vuescroll>
    </div>
  </div>
</template>

<script>
import UCBarXComponent from "../../utility/ui/echarts/UCBarXComponent.vue";
import UCDistributionTable from "./UCDistributionTable.vue";
import vuescroll from "vuescroll";
import _ from "lodash";
export default {
  name: "UCRightFloatComponent",
  data() {
    return {
      ucsetting: {
        tabelName: "图表统计", // 项目分布表格名称
        tableNameYear: "数据统计", // 历年表格名称
      },
      activeNames: ["1", "2"],
    };
  },

  components: { UCBarXComponent, UCDistributionTable, vuescroll },

  computed: {},

  mounted() {},

  methods: {
    /**
     * 初始化
     */
    updatePanel(data, curStat) {
      // echart
      if (data.map) {
        let barObj = {
          data: [],
        };
        data.map = _.sortBy(data.map, (o) => {
          return o.sort;
        });
        _.each(data.map, (n, key) => {
          barObj.data.push({
            value: n.value,
            name: n.name,
            type: "统计",
          });
        });
        this.$refs.ucBarXComponent.initChart(barObj);
      }
      // table
      if (data.linkedHashMap) {
        let idx = 0;
        let tableDatas = new Array();
        // data.linkedHashMap = _.sortBy(data.linkedHashMap,(o)=>{
        //   return -o.sort
        // });
        let headers = window.BASE_CONFIG.statTypes[0].defalutHeader || [];
        if (curStat) {
          headers = curStat.defalutHeader;
        }

        // 解析数据
        _.each(data.linkedHashMap, (map) => {
          let temp = {
            name: map.name,
          };

          // {name:'区域',props:'area',width:120}
          _.each(map.list, (l, index) => {
            if (idx == 0) {
              headers.push({
                name: l.dengji,
                props: "prop" + index,
              });
            }

            temp["prop" + index] = l.number;
          });
          idx++;

          tableDatas.push(temp);
        });
        tableDatas = _.sortBy(tableDatas, (o) => {
          return o.prop0;
        });

        _.each(tableDatas,(d,index)=>{
          d.idx = (index+1)
        })
        this.$refs.ucDistributionTable.update(tableDatas, headers);
      }

      this._initEvents();
    },

    handleChange(val) {
      console.log(val);
    },

    // 事件初始化
    _initEvents() {},
  },
};
</script>
<style lang="less" scoped >
.divRightFloat {
  height: 100%;
  background: white;
  /deep/ .el-collapse-item__header {
    height: 40px;
    line-height: 40px;
    background-color: #4095ff;
    color: #ffffff;
    border-bottom: 1px solid #ebeef5;
    font-size: 18px;
    padding: 0 15px;
  }
  .echartbox {
    width: 100%;
    height: 300px;
  }
  /deep/ .el-collapse-item__content {
    padding-bottom: 10px;
  }
  .tableContent {
    .el-collapse-item__content {
      height: 100%;
    }
  }
}
</style>