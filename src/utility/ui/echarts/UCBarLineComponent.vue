/*
   echart barLine组件
   数据类型obj : pieObj = {
         data: [
            { value: 335, name: "直接访问" },
            { value: 310, name: "邮件营销" },
            { value: 234, name: "联盟广告" },
            { value: 135, name: "视频广告" },
            { value: 1548, name: "搜索引擎" }
          ],
          color:['#eb2100', '#eb3600', '#d0570e',......];
      }

 */

<template>
  <div ref="myChart" style="width: 100%;height: 100%"></div>
</template>
<script>
import echarts from "echarts";
import _ from "lodash";
export default {
  name: "UCBarLineComponent",
  data() {
    return {
      charts: ""
    };
  },
  props: {
    barObj: {
      type: Object,
      default: () => {
        return {
          data: [],
          color: [
            "#397BE6 ",
            "#6BB2F4",
            "rgba(54,170,255,0.6)",
            "rgba(54,170,255,0.2)",
            "rgba(54,170,255,1)"
          ]
        };
      }
    }
  },

  methods: {
    initChart(newData, name, toolbox) {
      if (!newData) {
        newData = this.barObj;
      } else {
        newData.color = newData.color.concat(this.barObj.color);
      }
      let data = {};
      let xAxisData = []; // x轴
      let serObj = [];
      let legend = [];

      // 获取legend
      let groupByType = _.groupBy(newData.data, "type");
      _.each(groupByType, (item, key) => {
        legend.push(key);
      });

      let groupByName = _.groupBy(newData.data, "name");
      // 获取数据
      _.each(groupByName, (o, k) => {
        xAxisData.push(k);
        // 缺失数据情况补0
        _.each(legend, (leg, index) => {
          if (!data[leg]) {
            data[leg] = [];
          }
          let keyValue = _.find(o, { type: leg });
          if (keyValue) {
            data[leg].push(keyValue.value);
          } else {
            data[leg].push(0);
          }
        });
      });
      // 获取ser对象
      let idx = 0;
      _.each(data, (p, q) => {
        // 为了翻转正负数
        let data = [];

        _.each(p, (value, valueIndex) => {
          data.push({
            value: value,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color:
                      value > 0
                        ? newData.color[idx * 5]
                        : newData.color[idx * 5 + 1]
                  },
                  {
                    offset: 1,
                    color:
                      value > 0
                        ? newData.color[idx * 5 + 1]
                        : newData.color[idx * 5]
                  }
                ]),
                barBorderRadius: value > 0 ? [30, 30, 0, 0] : [0, 0, 30, 30]
              }
            }
          });
        });

        // 新建柱子 serObj
        serObj.push({
          name: q,
          type: "bar",
          smooth: true,
          symbol: "circle", //标记的图形为实心圆
          symbolSize: 10, //标记的大小
          barMaxWidth: 30,
          label: {
            normal: {
              show: true,
              color: "#323232",
              position: "top"
            }
          },

          data: data
        });

        // 新建折线 serObj
        serObj.push({
          name: q,
          type: "line",
          smooth: true,
          symbol: "circle", //标记的图形为实心圆
          symbolSize: 10, //标记的大小
          lineStyle: {
            normal: {
              width: 2
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: newData.color[5 * idx + 2]
                  },
                  {
                    offset: 0.8,
                    color: newData.color[5 * idx + 3]
                  }
                ],
                false
              )
            }
          },
          itemStyle: {
            normal: {
              color: newData.color[5 * idx + 4]
            }
          },
          data: p
        });

        idx++;
      });
      this.charts = echarts.init(this.$refs.myChart); // 获取echart对象
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          show: false
        },
        toolbox: {},
        grid: {
          left: "20",
          right: "20",
          top: "20",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: xAxisData,
            axisTick: {
              alignWithLabel: true
            },
            boundaryGap: true,

            axisLabel: {
              // rotate:'20',
              color: "#323232",
              interval: 0
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              color: "#323232"
            }
          }
        ],
        series: serObj
      };

      // 工具条
      if (toolbox) {
        option.toolbox = toolbox;
      }
      // 是否增加滚动条
      if (xAxisData.length > 11) {
        option.dataZoom = [
          {
            type: "slider",
            show: true,
            start: 74,
            end: 100,
            handleSize: 8
          },
          {
            type: "inside",
            start: 74,
            end: 100
          }
        ];
      } else {
        option.grid.bottom = "20";
        option.dataZoom = [];
      }

      if (xAxisData.length > 8) {
        option.xAxis[0].axisLabel.rotate = "20";
      }

      // 判断是否有lengend
      if (newData.legend) {
        if (xAxisData.length < 11) {
          option.xAxis[0].axisLabel.rotate = "0";
        }
        option.legend = {
          data: legend
        };
        option.grid.top = 30;
      } else {
        option.legend = {
          show: false
        };
        option.grid.top = 20;
      }

      this.charts.setOption(option);
      window.addEventListener(
        "resize",
        () => {
          this.charts.resize();
        },
        true
      );
    },
    // risize
    resize() {
      setTimeout(this.charts.resize, 1000);
    }
  },
  // 调用
  mounted() {
    // this.initChart(this.barObj);
  }
};
</script>
<style>
.el-row {
  margin-bottom: 0 10px;
}
.panel-title {
  line-height: 24px;
  font-size: 16px;
  padding-left: 16px;
  position: relative;
  color: #323232;
}
.panel-title::before {
  content: "";
  width: 4px;
  height: 16px;
  position: absolute;
  left: 4px;
  top: 2px;
  background: #3072f6;
}
.pub_btn {
  padding: 4px 8px;
  line-height: 16px;
  border-radius: 10px;
  font-size: 12px;
  color: rgb(192, 192, 192);
  text-align: center;
  margin: 0 5px;
  background: rgba(255, 255, 255, 0.3);
}

.btn_active {
  background: #3072f6;
  color: #323232;
}
</style>