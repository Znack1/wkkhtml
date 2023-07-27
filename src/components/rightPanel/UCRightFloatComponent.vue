
<template>
  <div class="divRightFloat">
    <div style="height: calc(100% - 0px); box-shadow: 4px 1px 18px 3px #8a8a8a">
        <!-- <el-collapse
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
        </el-collapse> -->
        <div class="topContent echartbox">
          <UCPanel :Title="firstName" iconClass="icon-chart-trend-full"></UCPanel>
          <div style="width: 100%; height: calc(100% - 50px);margin-top:5px">
            <UCBarXComponent ref="ucBarXComponent"></UCBarXComponent>
          </div>
         
        </div>
        <div class="bottomContent tableContent">
          <UCPanel :Title="secondName" iconClass="icon-chart-trend-full"></UCPanel>
          <!-- <vuescroll style="width: 100%; height: calc(100% - 50px);margin-top:5px"> -->
            <UCDistributionTable
            style="width: 100%; height: calc(100% - 50px);"
              ref="ucDistributionTable"
              class="table"
            ></UCDistributionTable>
        <!-- </vuescroll> -->
         
        </div>
    </div>
  </div>
</template>

<script>
import UCBarXComponent from "../../utility/ui/echarts/UCBarXComponent.vue";
import UCDistributionTable from "./UCDistributionTable.vue";
import UCPanel from '../../utility/ui/UCPanel.vue'
import vuescroll from "vuescroll";
import _ from "lodash";
export default {
  name: "UCRightFloatComponent",
  data() {
    return {
      firstName:"监管等级",
      secondName:'数据统计',
      // ucsetting: {
      //   tabelName: "图表统计", // 项目分布表格名称
      //   tableNameYear: "数据统计", // 历年表格名称
      // },
      // activeNames: ["1", "2"],
    };
  },

  components: { UCBarXComponent, UCDistributionTable, vuescroll,UCPanel },

  computed: {},

  mounted() {
    this._initEvents();
  },

  methods: {
    initTitle(curCityInfo){
      this.firstName="监管等级("  + curCityInfo.cityName +")";
      this.secondName="数据统计("  + curCityInfo.cityName +")";
    },

    // 更新数据
    updateChart(datas, curStat){
      debugger
      if(!datas){
        let barObj = {
          data: [],
        };
        this.$refs.ucBarXComponent.initChart(barObj);
        return;
      }
      let barObj = {
          data: [],
          color:['#158DFD','#9BC5F1']
        };
        datas= _.sortBy(datas, (o) => {
          return parseFloat(o.sort);
        });
        _.each(datas, (n, key) => {
          barObj.data.push({
            value: n.value,
            name: n.name,
            type: "统计",
          });
        });
        this.$refs.ucBarXComponent.initChart(barObj);
    },

    // 更新table
    updateTable(datas, curStat){
      if(!datas){
        this.$refs.ucDistributionTable.update([], []);
        return;
      }
      if (datas) {
        let idx = 0;
        let tableDatas = new Array();
        datas = _.sortBy(datas,(o)=>{
          return -parseFloat(o.sort)
        });
        let headers = window.BASE_CONFIG.statTypes[0].defalutHeader || [];
        if (curStat) {
          headers = _.cloneDeep(curStat.defalutHeader);
        }

        // 解析数据
        _.each(datas, (map) => {
          let temp = {
            name: map.name,
          };

          map.list = _.sortBy(map.list,(o)=>{
            return parseFloat(o.id)
        });
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
     
        _.each(tableDatas,(d,index)=>{
          d.idx = (index+1)
        })
        this.$refs.ucDistributionTable.update(tableDatas, headers);
      }
    
    },

    /**
     * 初始化
     */
    updatePanel(data, curStat) {
      
      if(!data){
        let barObj = {
          data: [],
        };
        this.$refs.ucBarXComponent.initChart(barObj);
        this.$refs.ucDistributionTable.update([], []);
        return;
      }
      // echart
      if (data.map) {
        let barObj = {
          data: [],
          color:['#158DFD','#9BC5F1']
        };
        datas= _.sortBy(data.map, (o) => {
          return parseFloat(o.sort);
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
        data.linkedHashMap = _.sortBy(data.linkedHashMap,(o)=>{
          return -parseFloat(o.sort)
        });
        let headers = window.BASE_CONFIG.statTypes[0].defalutHeader || [];
        if (curStat) {
          headers = _.cloneDeep(curStat.defalutHeader);
        }

        // 解析数据
        _.each(data.linkedHashMap, (map) => {
          let temp = {
            name: map.name,
          };

          map.list = _.sortBy(map.list,(o)=>{
            return parseFloat(o.id)
        });
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
        // tableDatas = _.sortBy(tableDatas, (o) => {
        //   return o.prop0;
        // });

        _.each(tableDatas,(d,index)=>{
          d.idx = (index+1)
        })
        this.$refs.ucDistributionTable.update(tableDatas, headers);
      }

     
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
    height: 60%;
    max-height: 350px;
  }
  /deep/ .el-collapse-item__content {
    padding-bottom: 10px;
  }
  .tableContent {
    height: calc(100% - 350px);
    min-height: 40%;
    .el-collapse-item__content {
      height: 100%;
    }
  }
}
</style>