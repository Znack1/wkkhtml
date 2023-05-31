

<template>
  <div ref="myChart" style="width: 100%;height: 100%"></div>
</template>
<script>
import echarts from "echarts";
import _ from "lodash";
export default {
  name: "UCDoublePie",
  data() {
    return {
      charts: "",
      pieData: {
        data: [],
        color: []
      },
    };
  },

  methods: {
    initChart(newData,name) {
      if (!newData) {
        newData = this.pieData;
      }
      if (newData.data.length < 2) {
        return;
      }
      let total = _.sumBy(newData.data, o => {
        return o.value;
      });
      this.charts = echarts.init(this.$refs.myChart); // 获取echart对象
      let placeHolderStyle = {
        normal: {
          label: {
            show: false
          },
          labelLine: {
            show: false
          },
          color: "rgba(0,0,0,0)",
          borderWidth: 0
        },
        emphasis: {
          color: "rgba(0,0,0,0)",
          borderWidth: 0
        }
      };
      let dataStyle = {
        normal: {
          formatter: function(params) {
            return "{title|" + params.value + "}\n{value|" + params.percent + "%}";
          },

          position: "center",
          show: true,
          textStyle: {
            rich: {
              title: {
                fontSize: 24,
                lineHeight: 30,
                color: "#1C83E3",
                marginRight: "3px",
                align: "center"
              },
              value: {
                fontSize: 16,
                lineHeight: 16,
                color: "#323232",
                align: "center"
              }
            }
          }
        }
      };
      let option = {
        title: [
          {
            text: newData.data[0].name,
            left: "26.8%",
            top: "60%",
            textAlign: "center",
            textStyle: {
              fontWeight: "normal",
              fontSize: "16",
              color: "#323232",
              textAlign: "center",
              fontFamily: 'Agency FB'
            }
          },
          {
            text: newData.data[1].name,
            left: "71.5%",
            top: "60%",
            textAlign: "center",
            textStyle: {
              color: "#323232",
              fontWeight: "normal",
              fontSize: "16",
              textAlign: "center",
              fontFamily: 'Agency FB'
            }
          }
        ],
        toolbox: {},
        series: [
          {
           name:name,
            type: "pie",
            hoverAnimation: false, //鼠标经过的特效
            radius: ["41%", "47%"],
            center: ["26%", "50%"],
            startAngle: 225,
            labelLine: {
              normal: {
                show: false
              }
            },
            label: {
              normal: {
                position: "center"
              }
            },
            data: [
              {
                 name: newData.data[0].alias,
                value: newData.data[0].value,
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: "#99da69"
                      },
                      {
                        offset: 1,
                        color: "#01babc"
                      }
                    ])
                  }
                },
                label: dataStyle
              },
              {
                value: total / 0.75 - newData.data[0].value,
                itemStyle: placeHolderStyle
              }
            ]
          },
          {
           
            type: "pie",
            hoverAnimation: false,
            radius: ["41%", "47%"],
            center: ["72%", "50%"],
            startAngle: 225,
            labelLine: {
              normal: {
                show: false
              }
            },
            label: {
              normal: {
                position: "center"
              }
            },
            data: [
              {
                 name: newData.data[1].alias,
                value: newData.data[1].value,
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: "#9f3edd"
                      },
                      {
                        offset: 1,
                        color: "#4897f6"
                      }
                    ])
                  }
                },
                label: dataStyle
              },
              {
                value: total / 0.75 - newData.data[1].value,
                itemStyle: placeHolderStyle
              }
            ]
          },

          //外圈的边框
          {
            // name: '总人数',
            type: "pie",
            hoverAnimation: false, //鼠标经过的特效
            radius: ["47%", "48%"],
            center: ["26%", "50%"],
            startAngle: 225,
            labelLine: {
              normal: {
                show: false
              }
            },
            label: {
              normal: {
                position: "center"
              }
            },
            data: [
              {
                value: 75,
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: "#01babc"
                      },
                      {
                        offset: 1,
                        color: "#99da69"
                      }
                    ])
                  }
                }
              },
              {
                value: 25,
                itemStyle: placeHolderStyle
              }
            ]
          },
          {
            type: "pie",
            hoverAnimation: false,
            radius: ["47%", "48%"],
            center: ["72%", "50%"],
            startAngle: 225,
            labelLine: {
              normal: {
                show: false
              }
            },
            label: {
              normal: {
                position: "center"
              }
            },
            data: [
              {
                value: 75,
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: "#4897f6"
                      },
                      {
                        offset: 1,
                        color: "#9f3edd"
                      }
                    ])
                  }
                }
              },
              {
                value: 25,
                itemStyle: placeHolderStyle
              }
            ]
          }
        ]
      };
   
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
<style>
.el-row {
  margin-bottom: 10px;
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
