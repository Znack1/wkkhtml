/*
   echart line组件
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
  name: "UCLineComponent",
  data() {
    return {
      charts: ""
    };
  },
  props: {
    lineObj: {
      type: Object,
      default: () => {
        return {
          data: [
            { value: 33325, name: "2015年" },
            { value: 14110, name: "2016年" },
            { value: 43632, name: "2017年" },
            { value: 23467, name: "2018年" },
            { value: 15789, name: "2019年" }
          ],
          color: [
            "rgba(54,170,255,0.4)",
            "rgba(54,170,255,0.1)",
            "rgba(54,170,255,1)"
          ]
        };
      }
    }
  },

  methods: {
    initChart(newData, name, toolbox) {
      if (!newData) {
        newData = this.lineObj;
      } else {
        newData.color = newData.color.concat(this.lineObj.color);
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
          }else{
            data[leg].push(0);
          }
        });
      });

      // 生成ser对象
      let idx = 0;
      _.each(data, (p, q) => {
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
                    color: newData.color[3 * idx]
                  },
                  {
                    offset: 0.8,
                    color: newData.color[3 * idx + 1]
                  }
                ],
                false
              )
            }
          },
          itemStyle: {
            normal: {
              color: newData.color[3 * idx + 2]
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
            lineStyle: {
              color: "#57617B"
            }
          }
        },
        toolbox: {},
        grid: {
          top: 10,
          left: 30,
          right: 30,
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            axisLine: {
              lineStyle: {
                color: "#57617B"
              }
            },
            axisLabel: {
              textStyle: {
                fontSize: 14,
                color: "#323232"
              },
              interval: 0
            },
            splitLine: {
              lineStyle: {
                color: "#57617B",
                type: "dashed"
              }
            },
            data: xAxisData
          }
        ],
        yAxis: [
          {
            type: "value",
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: "#57617B"
              }
            },
            axisLabel: {
              margin: 10,
              textStyle: {
                fontSize: 14,
                color: "#323232"
              }
            },
            splitLine: {
              show: false
            }
          }
        ],
        series: serObj
      };

      if (toolbox) {
        option.toolbox = toolbox;
      }

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
    // this.initChart(this.lineObj)
  }
};
</script>

