
/*
   echart bar y横向组件
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
  name: "UCBarYComponent",
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
          data: [
            { value: 3353, name: "兰州市", type: "" },
            { value: 3210, name: "嘉峪关市", type: "" },
            { value: 2234, name: "金昌市", type: "" },
            { value: 1135, name: "白银市", type: "" },
            { value: 1548, name: "天水市", type: "" },
            { value: 3355, name: "武威市", type: "" },
            { value: 6310, name: "张掖市", type: "" },
            { value: 3234, name: "平凉市", type: "" },
            { value: 2135, name: "酒泉市", type: "" },
            { value: 1548, name: "庆阳市", type: "" }
          ],
          color: [
            "#1791FF",
            "#66B5FF",
            "#42D9C7",
            "#30C25B",
            "#6EDB8F",
            "#FBCD13",
            "#E6965C ",
            "#748BE6 ",
            "#8643E0 ",
            "#A877ED"
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
      let yAxisData = []; // x轴
      let serObj = [];
      let legend = [];
      
      newData.data = _.sortBy(newData.data,(d)=>{
        return parseFloat(d.value);
      })
      // 获取legend
      let groupByType = _.groupBy(newData.data, "type");
      _.each(groupByType, (item, key) => {
        legend.push(key);
      });

      let groupByName = _.groupBy(newData.data, "name");
      // 获取数据
      _.each(groupByName, (o, k) => {
        yAxisData.push(k);

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
      // 获取ser对象
      let idx = 0;
      _.each(data, (p, q) => {
        serObj.push({
          name: q,
          type: "bar",
          barMaxWidth: "30px",
          label: {
            normal: {
              show: true,
              color: "#323232",
              position: "right"
            }
          },
          itemStyle: {
            normal: {
              color: function(params) {
                return {
                  type: "linear",
                  colorStops: [
                    {
                      offset: 0,
                      color: newData.color[params.seriesIndex * 2]
                    },
                    {
                      offset: 1,
                      color: newData.color[params.seriesIndex * 2 + 1]
                    }
                  ]
                };
              },
              barBorderRadius: [30, 30, 30, 30]
            }
          },
          data: p
        });
      });
      this.charts = echarts.init(this.$refs.myChart); // 获取echart对象
      let option = {
        color: newData.color,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        toolbox: {},
        grid: {
          top: 0,
          left: 16,
          right: 30,
          bottom: 0,
          containLabel: true
        },
        yAxis: [
          {
            type: "category",
            axisTick: {
              show: false,
              color: "#707070"
            },
            axisLabel: {
              textStyle: {
                fontSize: 14,
                color: "#323232"
              }
            },
            axisLine: {
              lineStyle: {
                color: "#707070"
              }
            },
            data: yAxisData
          }
        ],
        xAxis: {
          type: "value",
          nameTextStyle: {
            fontSize: 14,
            color: "#4D4D4D"
          },
          axisLabel: {
            textStyle: {
              fontSize: 12,
              color: "#323232"
            },
            interval: 0
          },
          axisLine: {
            lineStyle: {
              color: "#707070"
            }
          },
          splitLine: {
            show: false
          }
        },
        series: serObj
      };

      // 是否增加滚动条
      // if (yAxisData.length > 11) {
      //   option.dataZoom = [
      //     {
      //       type: "slider",
      //       show: true,
      //       start: 74,
      //       end: 100,
      //       handleSize: 8,
      //       yAxisIndex:0,
      //     },
      //     {
      //       type: "inside",
      //       start: 74,
      //       end: 100,
      //       yAxisIndex:0
      //     }
      //   ];
      // } else {
        option.grid.bottom = "10";
        option.dataZoom = [];
      // }
      // 判断是否有lengend
      if (newData.legend) {
        option.legend = {
          data: legend
        };
        option.grid.top = 20;
      } else {
        option.legend = {
          show: false
        };
        option.grid.top = 10;
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

