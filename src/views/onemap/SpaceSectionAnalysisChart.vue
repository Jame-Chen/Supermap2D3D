<template>
  <div class="spaceSectionAnalysisChart">
    <div id="main" style="width: 100%;" :style="{height: setMainHeight}" ref="mian">
    </div>
  </div>
</template>

<script>
export default {
  name: 'SpaceSectionAnalysisChart',
  props: {
    height: {
      type: String,
      required: true
    },
    dataJson: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      name: 'SpaceSectionAnalysisChart',
      redata: {},
      chart: {}
    }
  },
  mounted () {
    this.drawLine()
  },
  watch: {
    dataJson: {
      handler (newValue, oldValue) {
        this.drawLine()
      },
      deep: true
    },
    height: {
      handler (newValue, oldValue) {
        this.chart.dispose()
        this.drawLine()
      },
      deep: true
    }
  },
  computed: {
    setMainHeight: function () {
      let h = parseInt(this.height.replace('px', ''))
      if (h > 240) h = (h - 100)
      else h = 240
      return h + 'px'
    }
  },
  methods: {
    drawLine () {
      require.config({
        baseUrl: './',
        paths: {
          'echarts': 'dist/echarts'
        }
      })
      this.showEcharts(this.dataJson)
    },
    getVSAnalysisData (vsJson) {
      let reData = {}
      // let startId = vsJson.startId // 起始井编号
      let nodeIdsObject = [] // 井编号json ，key是当前井编号，value是下一个井编号
      let nodesObject = {} // 井json，key是当前井编号，value是当前井json

      let edgesFlow = [] // 管道流向

      let nodes = vsJson.nodes

      for (let i = 0, l = nodes.length; i < l; i++) {
        nodeIdsObject[i] = nodes[i]['manhole_id']
        nodesObject[nodes[i]['manhole_id']] = nodes[i]
      }
      let edges = vsJson.edges

      for (let i = 0, l = edges.length; i < l; i++) {
        if (nodeIdsObject[i] === edges[i]['id_begin']) {
          edgesFlow[i] = true
        } else if (nodeIdsObject[i] === edges[i]['id_end']) {
          edgesFlow[i] = false
        }
      }
      // console.log(nodeIdsObject)
      // console.log(edgesFlow)
      let showNodePercent = 100 // 显示图表百分比，5个以下 100%
      showNodePercent = parseInt(800 / nodes.length)
      if (showNodePercent > 100) {
        showNodePercent = 100
      } else if (showNodePercent < 10) {
        showNodePercent = 10
      }
      let heightMax = 0 // 最高点
      let heightMin = 0 // 最低点

      /**
       let tableTitle = nodesObject[nodeIdsObject[0]]['manhole_name'] +
       ' 至 ' +
       nodesObject[nodeIdsObject[nodeIdsObject.length - 1]]['manhole_name']
       **/

      let tableTitle = nodesObject[nodeIdsObject[0]]['manhole_name']

      let dmData = [] // 地面数据
      let jfzData = [] // 井辅助
      let jkData = [] // 井口
      let jdData = [] // 井底
      let jsData = [] // 井深

      for (let i = 0, l = nodeIdsObject.length; i < l; i++) {
        let cNode = nodesObject[nodeIdsObject[i]]
        if (i === 0) {
          dmData[0] = [0, cNode['alt_top']]
          heightMax = cNode['alt_top']
          heightMin = cNode['alt_bottom']
        } else {
          if (cNode != null) {
            dmData[i] = [i * 2, cNode['alt_top']]
            if (heightMax - cNode['alt_top'] < 0) {
              heightMax = cNode['alt_top']
            }
            if (heightMin - cNode['alt_bottom'] > 0) {
              heightMin = cNode['alt_bottom']
            }
          }
        }
        if (cNode['alt_bottom'] > 0) {
          jkData[i] = [i * 2, cNode['alt_bottom'], cNode['manhole_id']]
          jfzData[i] = [i * 2, cNode['alt_top'] - cNode['alt_bottom'], cNode['manhole_id']]
          jdData[i] = [i * 2, '-', cNode['manhole_id']]
          jsData[i] = [i * 2, (((cNode['alt_top'] - 0) + (cNode['alt_bottom'] - 0)) / 2).toFixed(2), ((cNode['alt_top'] - 0) - (cNode['alt_bottom'] - 0)).toFixed(2)]
        } else {
          if (cNode['alt_top'] > 0) {
            jkData[i] = [i * 2, '-', cNode['manhole_id']]
            jfzData[i] = [i * 2, cNode['alt_top'], cNode['manhole_id']]
            jdData[i] = [i * 2, cNode['alt_bottom'], cNode['manhole_id']]
            jsData[i] = [i * 2, (((cNode['alt_top'] - 0) + (cNode['alt_bottom'] - 0)) / 2).toFixed(2), ((cNode['alt_top'] - 0) - (cNode['alt_bottom'] - 0)).toFixed(2)]
          } else {
            jkData[i] = [i * 2, cNode['alt_top'], cNode['manhole_id']]
            jfzData[i] = [i * 2, '-', cNode['manhole_id']]
            jdData[i] = [i * 2, cNode['alt_bottom'] - cNode['alt_top'], cNode['manhole_id']]
            jsData[i] = [i * 2, (((cNode['alt_top'] - 0) + (cNode['alt_bottom'] - 0)) / 2).toFixed(2), ((cNode['alt_top'] - 0) * -1 - (cNode['alt_bottom'] - 0)).toFixed(2)]
          }
        }
      }
      reData['dmData'] = dmData

      let dmdpData = []// 地面图片
      for (let i = 0, l = (dmData.length - 1); i < l; i++) {
        dmdpData[i] = [i * 2 + 1, (((dmData[i][1] - 0) + (dmData[i + 1][1] - 0)) / 2).toFixed(2), 0]
      }
      reData['dmdpData'] = dmdpData

      let gdData = []// 管底数据
      let gdfzData = []// 管道辅助
      let xData = []// x轴数据
      xData[0] = 0
      let lxData = []// 流向数据
      let gjData = []// 管径数据
      let gjIndex

      for (let i = 0, l = edges.length; i < l; i++) {
        let pipe = (edges[i]['pipe'] / 1000).toFixed(2)
        if (edgesFlow[i]) {
          gdData[i * 2 + 1] = [i * 2, edges[i]['alt_begin']]
          gdData[i * 2 + 2] = [i * 2 + 2, edges[i]['alt_end']]
          gdfzData[i * 2 + 1] = [i * 2, ((edges[i]['alt_begin'] - 0) + (pipe - 0)).toFixed(2)]
          gdfzData[i * 2 + 2] = [i * 2 + 2, ((edges[i]['alt_end'] - 0) + (pipe - 0)).toFixed(2)]
          lxData[i] = [i * 2 + 1, 1, 0]
        } else {
          gdData[i * 2 + 1] = [i * 2, edges[i]['alt_end']]
          gdData[i * 2 + 2] = [i * 2 + 2, edges[i]['alt_begin']]
          gdfzData[i * 2 + 1] = [i * 2, ((edges[i]['alt_end'] - 0) + (pipe - 0)).toFixed(2)]
          gdfzData[i * 2 + 2] = [i * 2 + 2, ((edges[i]['alt_begin'] - 0) + (pipe - 0)).toFixed(2)]
          lxData[i] = [i * 2 + 1, 1, 8]
        }
        xData[i * 2 + 2] = (parseFloat(xData[i * 2]) + parseFloat(edges[i]['length'])).toFixed(2)
        xData[i * 2 + 1] = '-' // ((parseFloat(xData[i * 2])+parseFloat(xData[i * 2+2]))/2).toFixed(2);
        gjIndex = (((edges[i]['alt_begin'] - 0) + (edges[i]['alt_end'] - 0)) / 2 + (pipe - 0)).toFixed(2)
        gjData[i] = [i * 2 + 1, gjIndex, edges[i]['pipe'], parseFloat(edges[i]['length']).toFixed(2)]
      }

      reData['gdData'] = gdData // [[0,2.5],[2,2.5],[2,3],[4,2],[4,3],[6,1],[6,3],[8,1]]
      reData['gdfzData'] = gdfzData
      reData['xData'] = xData
      reData['lxData'] = lxData

      reData['heightMax'] = heightMax
      if (heightMin > 1) {
        heightMin = 1 // 图表最小刻度不能大于0
      }
      reData['heightMin'] = heightMin
      reData['showNodePercent'] = showNodePercent
      reData['tableTitle'] = tableTitle
      reData['gjData'] = gjData
      reData['jfzData'] = jfzData // [[0,5], [2,5],[4,5],[6,5],[8,5],[10,5]]
      reData['jkData'] = jkData
      reData['jdData'] = jdData
      reData['jsData'] = jsData

      return reData
    },
    showEcharts (djson) {
      require([
        'echarts'
      ], (echarts) => {
        this.redata = this.getVSAnalysisData(djson)
        this.chart = echarts.init(document.getElementById('main'))
        let imageDom = document.createElement('img') // 支持为 HTMLImageElement, HTMLCanvasElement，不支持路径字符串
        imageDom.src = require('../../assets/xsgd3.png')
        let imageDom2 = document.createElement('img')
        imageDom2.src = require('../../assets/xsgd3.png') 

        // var imageDom = document.createElement("img"); // 支持为 HTMLImageElement, HTMLCanvasElement，不支持路径字符串
        // imageDom.src = "xsgd3.png";
        // var imageDom2 = document.createElement("img");
        // imageDom2.src = "j1px.png";

        let option = {
          // backgroundColor:'rgba(128, 128, 128, 0.5)' ,
          title: {
            left: 'center',
            text: this.redata['tableTitle']
          },
          tooltip: {
            show: false
          },
          toolbox: {
            show: true,
            feature: {
              saveAsImage: {
                show: true,
                excludeComponents: ['toolbox'],
                pixelRatio: 2
              }
            }
          },
          grid: {
            left: '2%',
            right: '3%',
            bottom: '1%',
            top: '25%',
            containLabel: true
          },
          xAxis: [
            {
              show: false,
              name: '距离（米）',
              type: 'category',
              boundaryGap: false,
              axisLine: {
                lineStyle: {
                  color: '#0E2A43'
                }
              },
              axisLabel: {
                margin: 10,
                textStyle: {
                  fontSize: 14,
                  color: '#000'
                }
              },
              axisTick: {
                show: false
              },
              data: this.redata['xData']
            }, {
              name: '距离（米）',

              axisPointer: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  color: '#fff'
                }
              },
              axisTick: {
                show: false
              },
              position: 'bottom',
              offset: 20
            }],
          yAxis: [{
            type: 'value',
            name: '高程（米）',
            nameTextStyle: {
              color: '#000',
              fontSize: 14,
              fontWeight: 'bold',
              fontFamily: 'Microsoft YaHei',
              padding: [0, 60, 0, 0]
            },

            max: parseFloat(this.redata['heightMax'] + 1).toFixed(2), // min: parseFloat(this.redata['heightMin'] - 1).toFixed(2),
            scale: false,
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            },
            axisLabel: {
              margin: 30,
              textStyle: {
                fontSize: 12,
                color: '#000'
              }
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: '#57617B'
              }
            }
          }],
          dataZoom: [
            { // Y轴固定,让内容滚动
              type: 'slider',
              show: false,
              xAxisIndex: [0],
              // start : 1,
              end: this.redata['showNodePercent'], // 设置X轴刻度之间的间隔(根据数据量来调整)
              zoomLock: true // 锁定区域禁止缩放(鼠标滚动会缩放,所以禁止)
            },
            {
              type: 'inside',
              xAxisIndex: [0],
              start: 1,
              end: this.redata['showNodePercent'],
              zoomLock: true // 锁定区域禁止缩放
            }
          ],
          series: [
            {
              name: '地面标高',
              type: 'line',
              smooth: 0,
              symbol: 'circle',
              symbolSize: 1,
              label: {
                show: true,
                position: 'top',
                textStyle: {
                  color: '#000',
                  fontSize: 12,
                  fontWeight: 'bold',
                  fontFamily: 'Microsoft YaHei'
                }
              },
              lineStyle: {
                normal: {
                  width: 3,
                  color: '#000',
                  opacity: 0.9
                }
              },
              areaStyle: {
                normal: {
                  origin: 'start',
                  color: 'rgba(255,255,255, 1)'
                  // color: 'rgba(222,184,135, 1)',
                  // shadowBlur: 10
                }
              },
              data: this.redata['dmData']
            },
            {
              name: '管道辅助',
              type: 'line',
              smooth: 0,
              symbol: 'circle',
              symbolSize: 5,
              showSymbol: false,
              lineStyle: {
                normal: {
                  width: 3,
                  color: '#3A5FCD',
                  opacity: 0.9
                }
              },
              areaStyle: {
                normal: {
                  origin: 'start',
                  color: {
                    image: imageDom, // 支持为 HTMLImageElement, HTMLCanvasElement，不支持路径字符串
                    repeat: 'repeat' // 是否平铺, 可以是 'repeat-x', 'repeat-y', 'no-repeat'
                  }
                  // color:'#13bcf4'
                  // shadowColor: 'rgba(0, 0, 0, 0.1)',
                  // shadowBlur: 10
                }
              },
              data: this.redata['gdfzData']
            },
            {
              name: '管底高程',
              type: 'line',
              smooth: 0,
              symbol: 'circle',
              symbolSize: 5,
              label: {
                show: true,
                position: [5, 20],
                color: '#000',
                fontSize: 12,
                fontWeight: 'bold',
                fontFamily: 'Microsoft YaHei',
                formatter: '{@[1]}'
              },
              lineStyle: {
                normal: {
                  width: 3,
                  color: '#3A5FCD',

                  opacity: 0.9
                }
              },
              areaStyle: {
                normal: {
                  origin: 'start',
                  color: '#fff',
                  opacity: 1
                  // color: 'rgba(222,184,135, 1)',
                  // shadowBlur: 10
                }
              },
              data: this.redata['gdData']
            },
            {
              name: '井口标高',
              type: 'bar',
              stack: '井高程',
              itemStyle: {
                normal: {
                  barBorderColor: 'rgba(0,0,0,0)',
                  color: 'rgba(0,0,0,0)'
                },
                emphasis: {
                  barBorderColor: 'rgba(0,0,0,0)',
                  color: 'rgba(0,0,0,0)'
                }
              },
              data: this.redata['jkData']
            },
            {
              name: '井辅助', // 井水平面以上部分
              type: 'bar',
              stack: '井高程',

              itemStyle: {
                normal: {
                  borderWidth: 1,
                  color: 'rgba(143, 137, 141,0.5)',
                  borderColor: 'rgba(0,0,0,0.1)'
                  // borderColor: '#3A5FCD',
                  // color: {
                  //   image: imageDom2, // 支持为 HTMLImageElement, HTMLCanvasElement，不支持路径字符串
                  //   repeat: 'repeat' // 是否平铺, 可以是 'repeat-x', 'repeat-y', 'no-repeat'
                  // }
                }
              },
              label: { show: false },
              labelLine: { show: false },
              data: this.redata['jfzData']
            },
            {
              name: '井底',
              type: 'bar',
              stack: '井高程',
              barWidth: 20,
              itemStyle: {
                normal: {

                  borderWidth: 1,
                  color: 'rgba( 143, 137 , 141 , 0.5 )',
                  borderColor: 'rgba( 0 , 0 , 0 , 0.1)'
                  // borderColor: '#3A5FCD',
                  // color: {
                  //   image: imageDom2, // 支持为 HTMLImageElement, HTMLCanvasElement，不支持路径字符串
                  //   repeat: 'repeat' // 是否平铺, 可以是 'repeat-x', 'repeat-y', 'no-repeat'
                  /// }
                }
              },
              data: this.redata['jdData']
            },
            {
              name: '管径',
              type: 'scatter',
              symbol: 'circle',
              symbolSize: 1,
              label: {
                show: true,
                formatter: 'Φ{@[2]}-{@[3]}',
                offset: [0, 15],
                textStyle: {
                  color: '#000',
                  fontSize: 12,
                  fontWeight: 'bold',
                  fontFamily: 'Microsoft YaHei'
                }
              },
              data: this.redata['gjData']
            },
            {
              name: '井深',
              type: 'scatter',
              symbol: 'circle',
              symbolSize: 1,
              label: {
                show: true,
                color: '#000',
                fontSize: 13,
                fontWeight: 'bold',
                fontFamily: 'Microsoft YaHei',
                formatter: '{@[2]}'
              },
              data: this.redata['jsData']
            },
            {
              name: '箭头',
              type: 'custom',
              renderItem: this.renderArrow,
              encode: {
                x: 0,
                y: 1
              },
              data: this.redata['lxData'],
              z: 10
            },
            {
              name: '地面',
              type: 'custom',
              renderItem: this.renderRoad,
              encode: {
                x: 0,
                y: 1
              },
              data: this.redata['dmdpData'],
              z: 10
            }
          ]
        }
        this.chart.on('click', (params) => {
          // let name = params.name
          if (params.seriesName === '井辅助') {
            // alert(params.data[2])
            this.showSectionDetails(params.data[2])
          }
          if (params.seriesName === '井底') {
            // alert(params.data[2])
            this.showSectionDetails(params.data[2])
          }
        })
        this.chart.setOption(option)
        window.onresize = this.chart.resize
      })
    },
    renderArrow (param, api) {
      let arrowSize = 30
      let point = api.coord([
        api.value(0),
        parseFloat(this.redata['heightMax']) + 0.5
      ])
      return {
        type: 'path',
        shape: {
          pathData: 'M38.5,21.7L38.5,21.7L38.5,21.7L38.5,21.7v1.5h-1.5v1.5h-1.5v1.5h-1.5v1.5h-1.5v1.5h-1.5v1.5h-1.5l-1.5,1.5v-1.5v-1.5v-1.5v-4.6H0v-6.1h27.7v-4.6V11V9.4V7.9l1.5,1.5h1.5V11h1.5v1.5h1.5V14h1.5v1.5h1.5v1.5h1.5v1.5h0l0,0v0H40v3.1H38.5z',
          x: -arrowSize / 2,
          y: -arrowSize / 2,
          width: arrowSize,
          height: arrowSize
        },
        rotation: Math.PI / 8 * api.value(2),
        position: point,
        style: api.style({
          fill: 'rgb(255,0,0)'
        })
      }
    },
    renderRoad (param, api) {
      let arrowSize = 60
      let point = api.coord([
        api.value(0),
        parseFloat(api.value(1))
      ])
      return {
        type: 'path',
        invisible: false,
        shape: {
          pathData: 'M38.3,30l0.7,0.7L29.4,40l-0.5-0.6L20.1,31l-2.5,2.4l5.9,5.6l-0.7,0.7l-5.9-5.6l-2.3,2.2l2.9,2.8l-0.7,0.7L13.9,37l-2.6,2.5l-0.7-0.7l9.2-8.8l0.3,0.3l0,0l0.4-0.3l4.3,4.1l4.3-4.2l0.7,0.7l-4.3,4.2l1.6,1.6l6.6-6.4l0.7,0.7L27.7,37l1.6,1.6L38.3,30z M5.6,39l9.4-9l0.7,0.7l-9.4,9L5.6,39z M1,39l9.4-9l0.7,0.7l-9.4,9L1,39z',
          x: -arrowSize / 2,
          y: -arrowSize / 2 + 10,
          width: arrowSize,
          height: arrowSize
        },
        rotation: Math.PI / 8 * api.value(2),
        position: point,

        style: api.style({
          fill: 'rgb(0,0,0)'

        })
      }
    },

    showSectionDetails (params) {
      this.$emit('showSectionDetails', params)
    }
  }
}
</script>

<style lang='scss' scoped>
  $color: #000;
  $borderColor: #d4d4d4;
  .el-tabs__item { font-size: unset; }
  /deep/ .el-table td, /deep/ .el-table th { padding: 2px 0; }
  /deep/ .el-tabs__header{ margin: 0 0 .4em;}
  /deep/ .el-button--text{ padding-left: 5px; padding-right: 5px; color: #000;}
  /deep/ .el-button+.el-button{ margin-left: 0; }
  .el-table--border{
    border-color: $borderColor;
    /deep/ td, /deep/ th{border-right-color: $borderColor;border-bottom-color:$borderColor;}
  }
  .el-table {
    color: $color;
    /deep/ td, /deep/ th{ border-right-color: $borderColor;border-bottom-color:$borderColor;}
    /deep/ thead { font-weight: normal; color: $color; }
    .cell{ line-height: 20px;}
  }
  .spaceSectionAnalysisChart {
    box-sizing: border-box;
    padding: 0 .4rem .4rem;
    height: 100%;
  }
  .right{
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2000;
    font-size: 1rem;
    padding: 4px 1rem;
  }
  .hideBtnR{
    height:5px;
    width: 100%;
    padding: 0;
    vertical-align: top;
    box-sizing: border-box;
    text-align: center;
    cursor: pointer;
    img{
      vertical-align: top;
    }
  }
</style>
