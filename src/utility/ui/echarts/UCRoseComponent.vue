/*
   echart pie组件
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
  name: "UCRoseComponent",
  data() {
    return {
      charts: "",
      pieObj:{
        data:[],
        color:[]
      },
      total:0
    };
  },

  methods: {
    initChart(newData,name) {
       if(!newData){
        newData = this.pieObj;
      }
      let pieData = [];
      let legData = []; // 图列
      this.total = _.sumBy(newData.data, o => {
        return o.value;
      });
      _.each(newData.data, (o, k) => {
        legData.push(o.name);
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
        tooltip: {
          show: false
        },
        legend: {
          show: false
        },
        toolbox: {
        
        },
        series: [
          {
            name: name,
            type: "pie",
            roseType: 'radius',
            clockWise: false,
            radius: ["25%", "55%"],
            center: ["50%", "50%"],
            labelLine: {
             normal: {
                    length: 10,
                    length2: 120,
                    lineStyle: {
                        color: '#333'
                    }
                }
            },
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  align: "center",
                 formatter: params => {
                        return (
                            '{icon|●}{name|' + params.name + '}{value|' +
                            (params.value) + '}{percent|('+ params.percent.toFixed(1) +'%)}'
                        );
                    },
                    padding: [0, -130, 25, -130],
                    rich: {
                        color: '#333',
                        icon: {
                            fontSize: 14
                        },
                        name: {
                            fontSize: 12,
                            padding: [0, 5, 0, 5],
                            color: '#666666'
                        },
                        percent: {
                            color: '#333',
                            padding: [0, 5, 0, 0],
                        },
                        value: {
                            fontSize: 14,
                            fontWeight: 'bold',
                            color: '#333333'
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
      // if (toolbox) {
      //   option.toolbox = toolbox;
      // }
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

