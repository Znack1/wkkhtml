<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-03-30 11:03:20
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-06-10 11:31:27
 * @input:  
   ieObj = {
         data: [
            { value: 335, name: "直接访问" },
            { value: 310, name: "邮件营销" },
            { value: 234, name: "联盟广告" },
            { value: 135, name: "视频广告" },
            { value: 1548, name: "搜索引擎" }
          ],
          color:['#eb2100', '#eb3600', '#d0570e',......];
          legend:boolean  是否显示图例
      }
 * @out: no param
--> 


<template>
  <div ref="myChart" style="width: 100%;height: 100%"></div>
</template>
<script>
import echarts from "echarts";
import _ from "lodash";
export default {
  name: "UCPieComponent",
  data() {
    return {
      charts: "",
      total: 0
    };
  },
  props: {
    pieObj: {
      type: Object,
      default: () => {
        return {
          data: [
            { value: 254489.45, name: "林草覆盖" },
            { value: 101568.03, name: "荒漠与裸露地" },
            { value: 56822.95, name: "种植土地" },
            { value: 3363.84, name: "房屋建筑" },
            { value: 2757.68, name: "构筑物" },
            { value: 2046.18, name: "水域" },
            { value: 1955.4, name: "铁路与道路" },
            { value: 1412.25, name: "人工堆掘地" },
            { value: 119043, name: "人工草地" },
            { value: 813.33, name: "天然草地" }
          ],
          color: [
            "#14FF00",
            "#4E7AFF",
            "#00FE91",
            "#0EE9D9",
            "#36AAFF",
            "#4E7AFF",
            "#00FE91",
            "#0EE9D9",
            "#3B3FFE ",
            "#FBCD13"
          ]
        };
      }
    }
  },

  methods: {
    initChart(newData, name) {
      if (!newData) {
        newData = this.pieData;
      }
      let pieData = [];
      let legend = []; // 图列
      this.total = _.sumBy(newData.data, o => {
        return o.value;
      });

      _.each(newData.data, (o, k) => {
        legend.push(o.name);
        let n = k >= newData.color.length ? k - newData.color.length : k;
        pieData.push({
          value: o.value,
          name: o.name,
          itemStyle: {
            normal: {
              color: newData.color[n]
            }
          }
        });
      });
      this.charts = echarts.init(this.$refs.myChart); // 获取echart对象
      let option = {
        title: {
          text: "总个数(个)",
          subtext: this.total,
          x: "center",
          y: "center",
          itemGap: 5,
          textStyle: {
            fontWeight: "normal",
            color: "#323232",
            fontSize: 16
          },
          subtextStyle: {
            color: "#323232",
            fontSize: 24,
            fontWeight: "normal"
          }
        },
        tooltip: {
          show: false
        },
        legend: {
          show: false
        },
        toolbox: {
          show: false
        },
        series: [
          {
            name: name,
            type: "pie",
            clockWise: false,
            radius: ["40%", "60%"],
            center: ["50%", "50%"],
            hoverAnimation: false,
            labelLine: {
              normal: {
                length: 10,
                length2: 120,
                lineStyle: {
                  type: "solid"
                }
              }
            },
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  padding: [0, -110],
                  height: 70,
                  align: "center",
                  formatter: params => {
                    return (
                      "{title|" +
                      params.data.name +
                      "}\n{value|" +
                      params.data.value +
                      "(" +
                      ((params.data.value * 100) / this.total).toFixed(2) +
                      "%)" +
                      "}"
                    );
                  },
                  textStyle: {
                    rich: {
                      title: {
                        fontSize: 14,
                        lineHeight: 14,
                        color: "rgb(0, 178, 246)",
                        marginBottom: "3px",
                        width: 80,
                        align: "left"
                      },
                      value: {
                        fontSize: 16,
                        lineHeight: 16,
                        color: "#323232",
                        width: 80,
                        align: "left"
                      }
                    }
                  },
                  position: "outside"
                }
              }
            },
            data: pieData
          }
        ]
      };

      // 判断是否有lengend
      if (newData.legend) {
        option.legend = {
          data: legend
        };
      } else {
        option.legend = {
          show: false
        };
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
    // this.initChart(this.pieObj);
  }
};
</script>

