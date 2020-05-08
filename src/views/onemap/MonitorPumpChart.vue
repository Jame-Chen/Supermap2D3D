<template>
  <div>
    <div class="btn">
      <el-button type="primary" size="mini" class="btn_ok"  @click="prevClick">前一天</el-button>
      <el-date-picker v-model="selectDate" type="date" size="small" placeholder="选择日期" />
      <el-button :disabled="new Date(selectDate).getTime() >= now " type="primary" size="mini" class="btn_ok"  @click="nextClick">后一天</el-button>
    </div>
    <div id="MonitorPumpChart" ref="chart" :style="`height: ${height - 52}px;`">暂无数据</div>
  </div>
</template>

<script>
export default {
  name: 'MonitorPumpChart',
  props: {
    height: {
      required: true,
      type: Number
    }
  },
  data () {
    return {
      now: '',
      selectDate: '',
      e_num: 1,
      click_lth: 3,
      chartOptions: {
        // color:['#C43CFF','#0070C1','#FF0000','#008E40'],  //#008E40绿色
        color: ['#FF0000', '#0070C1', '#FFC125', '#34CF63'],
        tooltip: {
          trigger: 'axis'
          // formatter: '{b}<br/>{a0}:{c0}个<br/>{a1}:{c1}m<br/>{a2}:{c2}m<br/>{a3}:{c3}mm<br/>'
        },
        legend: {
          data: ['开泵数量', '水位', '控制水位', '雨量'],
          bottom: 1,
          padding: [20, 0, 0, 0]
        },
        grid: {
          top: '8%',
          left: '3%',
          right: '4%',
          bottom: '4%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          // boundaryGap: false,
          data: []
        },
        yAxis: [
          {
            type: 'value',
            scale: true,
            name: '数量',
            max: 10,
            min: 0,
            axisLabel: {
              formatter: '{value}'
            }
          },
          {
            type: 'value',
            scale: true,
            name: '水位/雨量',
            max: 50,
            min: 0,
            axisLabel: {
              formatter: '{value}'
            }
          }
        ],
        series: []

      },
      jdata: {
        name: ['08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '00', '01', '02', '03', '04', '05', '06', '07', '08'],
        data: [
          {
            name: '开泵数量',
            type: 'line',
            lineStyle: { width: 4 },
            step: true,
            data: [0, 0, 1, 1, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 5, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: '水位',
            type: 'line',
            lineStyle: { width: 4 },
            smooth: true,
            yAxisIndex: 1,
            data: [8, 8, 12, 12, 12, 18, 18, 18, 18, 24, 24, 24, 24, 28, 28, 28, 28, 10, 10, 10, 10, 10, 10, 10, 10]
          },
          {
            name: '控制水位',
            type: 'line',
            lineStyle: { type: 'dotted', width: 4 },
            yAxisIndex: 1,
            data: [16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16]
          },
          {
            name: '雨量',
            type: 'bar',
            yAxisIndex: 1,
            barWidth: '30px',
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    // {offset: 0, color: '#06B5D7'},                   //柱图渐变色
                    // {offset: 0.5, color: '#44C0C1'},                 //柱图渐变色
                    // {offset: 1, color: '#71C8B1'},                   //柱图渐变色
                    { offset: 0, color: '#3CB371' },
                    { offset: 0.5, color: '#99CC99' },
                    { offset: 1, color: '#99CCCC' }
                  ]
                )
              },
              emphasis: {
                color: new this.$echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    // {offset: 0, color: '#71C8B1'},                  //柱图高亮渐变色
                    // {offset: 0.7, color: '#44C0C1'},                //柱图高亮渐变色
                    // {offset: 1, color: '#06B5D7'}                   //柱图高亮渐变色
                    { offset: 0, color: '#99CCCC' },
                    { offset: 0.7, color: '#99CC99' },
                    { offset: 1, color: '#3CB371' }
                  ]
                )
              }
            },
            data: [8, 15, 25, 15, 18, 20, 5, 30, 30, 30, 30, 35, 39, 38, 39, 40, 10, 12, 15, 10, 0, 5, 3, 2, 8]
          }
        ]
      },
      ajdata: [
        [
          [0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 4, 4, 4, 4, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [5, 5, 8, 8, 12, 12, 12, 12, 15, 15, 22, 22, 27, 27, 27, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
          [18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18],
          [5, 10, 25, 10, 15, 20, 5, 30, 30, 30, 32, 25, 35, 40, 40, 5, 11, 12, 5, 0, 5, 3, 2, 2, 8]
        ],
        [
          [0, 0, 1, 1, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 5, 0, 0, 0, 0, 0, 0, 0],
          [8, 8, 12, 12, 12, 18, 18, 18, 18, 24, 24, 24, 24, 28, 28, 28, 28, 10, 10, 10, 10, 10, 10, 10, 10],
          [16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16],
          [8, 15, 25, 15, 18, 20, 5, 30, 30, 30, 30, 35, 39, 38, 39, 40, 10, 12, 15, 10, 0, 5, 3, 2, 8]
        ],
        [
          [0, 0, 0, 1, 2, 2, 2, 3, 3, 4, 3, 3, 4, 4, 4, 4, 4, 6, 4, 0, 0, 0, 0, 0, 0],
          [10, 10, 10, 15, 20, 20, 16, 16, 16, 24, 24, 24, 25, 25, 30, 28, 28, 25, 25, 25, 12, 12, 12, 12, 12],
          [14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14],
          [10, 20, 25, 10, 18, 18, 5, 30, 30, 30, 30, 35, 39, 38, 35, 35, 35, 12, 15, 10, 8, 5, 10, 15, 5]
        ]
      ]
    }
  },
  mounted () {
    this.drawLineInit()
    this.now = new Date().getTime()
    this.selectDate = new Date(this.now)
  },
  methods: {
    drawLineInit () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('MonitorPumpChart'))
      var options = this.chartOptions
      if (options && typeof options === 'object') {
        options.xAxis.data = this.jdata.name
        options.series = this.jdata.data
        myChart.setOption(options, true)
      }
    },
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('MonitorPumpChart'))
      var options = this.chartOptions
      options.series.forEach((item, index) => {
        var idata = this.ajdata[this.e_num]
        item.data = idata[index]
      })
      myChart.setOption(options, true)
    },
    prevClick () {
      this.selectDate = new Date(this.selectDate.getTime() - 24*60*60*1000); //前一天
      if (this.e_num > 0) {
        this.e_num--
      } else {this.e_num=2}
      this.drawLine()
    },
    nextClick () {
      this.selectDate = new Date(this.selectDate.getTime() + 24*60*60*1000); //后一天
      if ((this.click_lth - 1) > this.e_num) {
        this.e_num++
      } else {this.e_num=0}
      this.drawLine()
    }
  }
}
</script>

<style lang="scss" scoped>
$height: 30px;
$activeColor:#0080ff;
.btn{margin-top: 10px;margin-bottom: 10px; height: $height + 2; text-align: center}
.btn_ok{ min-width: 104px; height: $height;background-color: $activeColor; border-color: $activeColor;}
.btn_cancle{ width: 70px;height: $height;}
.btn /deep/ .el-date-editor{margin: 0 5px;}
</style>
