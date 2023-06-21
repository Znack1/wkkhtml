/*
   echart bar组件
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
  <div ref="myChart" style="width: 100%; height: 100%"></div>
</template>
<script>
import echarts from "echarts";
import _ from "lodash";
export default {
  name: "UCBarXComponent",
  data() {
    return {
      charts: "",
      barObj: {
        data: [],
        color: [
          "#397BE6 ",
          "#6BB2F4",
          "#8bd46e",
          "#09bcb7",
          "#6EDB8F",
          "#FBCD13",
          "#E6965C ",
          "#748BE6 ",
          "#8643E0 ",
          "#A877ED",
        ],
      },
    };
  },
  methods: {
    initChart(newData, name, toolbox) {
      
      if (!newData) {
        newData = this.barObj;
      } else {
        if (!newData.color) {
          newData.color = [];
        }
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
                        ? newData.color[idx * 2]
                        : newData.color[idx * 2 + 1],
                  },
                  {
                    offset: 1,
                    color:
                      value > 0
                        ? newData.color[idx * 2 + 1]
                        : newData.color[idx * 2],
                  },
                ]),
              },
            },
          });
        });

        serObj.push({
          name: q,
          type: "bar",
          smooth: true,
          symbol: "circle", //标记的图形为实心圆
          symbolSize: 10, //标记的大小
          barMaxWidth: 20,
          label: {
            normal: {
              show: true,
              color: "#323232",
              position: "top",
            },
          },
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: newData.color[idx * 2],
                },
                {
                  offset: 1,
                  color: newData.color[idx * 2 + 1],
                },
              ]),
            },
          },
          data: data,
        });
        idx++;
      });
      if (serObj.length == 0) {
        serObj = [
          {
            name: "统计",
            type: "bar",
            smooth: true,
            symbol: "circle", //标记的图形为实心圆
            symbolSize: 10, //标记的大小
            barMaxWidth: 30,
            data: [],
          },
        ];
      }
      this.charts = echarts.init(this.$refs.myChart); // 获取echart对象
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        legend: {
          show: false,
        },
        toolbox: {},
        grid: {
          left: "20",
          right: "20",
          top: "20",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: xAxisData,
            axisTick: {
              alignWithLabel: true,
            },
            boundaryGap: true,

            axisLabel: {
              // rotate:'20',
              color: "#323232",
              interval: 0,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              color: "#323232",
            },
          },
        ],
        series: serObj,
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
            handleSize: 8,
          },
          {
            type: "inside",
            start: 74,
            end: 100,
          },
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
          data: legend,
        };
        option.grid.top = 30;
      } else {
        option.legend = {
          show: false,
        };
        option.grid.top = 20;
      }
      if (this.charts) {
        this.charts.clear()
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
    },
  },
  // 调用
  mounted() {
    // this.initChart(this.barObj);
  },
};
</script>
