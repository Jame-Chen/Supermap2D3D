<template>
  <div class="content-div" v-if="infos.length" :style="contentDivStyles">
    <el-collapse v-model="activeNames">
      <el-collapse-item v-for="(info, index) in infos" :key="index" :name="String(index)">
        <template slot="title">
          <i class="header-icon el-icon-circle-plus-outline margin-10"></i><span class="txt-title">{{info.name}}</span>
        </template>
        <!-- 三列table ==================== -->
        <div v-if="info.data.length && info.type === 'table3'" class="table3">
          <div class="table3-li" v-for="(data, index) in info.data" :key="index">
            <span class="label">{{data.name}}</span>
            <span class="txt">{{data.value}}</span>
          </div>
        </div>
        <!-- el-table ==================== -->
        <div v-if="info.data.length && info.type === 'table'" class="table">
          <el-table :data="info.data[0].tableData" border  size="mini" style="width: 100%">
              <el-table-column v-for="(item, index) in info.data[0].tableCol" :key="index"
                :prop="item.prop"
                :label="item.label"
                :width="item.width"
                header-align="center" align="center" />
              <el-table-column label="图像" header-align="center" align="center">
                <template>
                  <el-button type="text" size="small" @click="videoState = 'jiance'" title="图像"><svg-icon class="color2-svg" icon-class="video" /></el-button>
                </template>
              </el-table-column>
            </el-table>
        </div>
        <!-- 位置示意图 附近标识物 ==================== -->
        <div v-if="info.data.length && info.type === 'img'" class="img">
          <div class="img-li" v-for="(img, index) in info.data" :key="index" :title="img.label" >
            <img :src="img.src" alt="img.label" >
            <div class="label">{{img.label}}</div>
          </div>
        </div>
        <!-- 检测缺陷 ==================== -->
        <div v-if="info.data.length && info.type === 'tableImg'" class="tableImg">
          <div class="tableImgContent" v-for="(item, index) in info.data" :key="index">
            <div class="left">
              <div class="tableImg-li" v-for="(data, index) in item.table" :key="index">
                <span class="label">{{data.name}}</span>
                <span class="txt">{{data.value}}</span>
              </div>
              </div>
            <div class="right">
              <img :src="item.src" >
            </div>
          </div>
        </div>

        <!-- 管道沉积声纳检测断面图 ==================== -->
        <div v-if="info.data.length && info.type === 'tableChart'" class="tableChart">
          <div class="title">检测方向</div>
          <div id="tableChartChart" ref="tableChartChart" style="height: 400px;">暂无数据</div>
          <table class="tableChartTable" border="0" cellpadding="0" cellspacing="0">
            <tr v-for="(item, index) in info.data[0].tableData" :key="index">
              <th>{{item.data[0]}}</th>
              <td v-for="(td, i) in item.data" :key="i" v-show="i"
                :rowspan="(item.fn && item.fn.rowspan && item.fn.rowspan[0] === i) ? item.fn.rowspan[1] : '' "
                :colspan="(item.fn && item.fn.colspan && item.fn.colspan[0] === i) ? item.fn.colspan[1] : '' "
                :class="(item.fn && item.fn.class && item.fn.class[0] === i) ? item.fn.class[1] : '' ">{{td}}</td>
            </tr>
          </table>
        </div>

      </el-collapse-item>
    </el-collapse>
    <!-- 视频播放 ===================== -->
    <div class="video" v-if="videoState" :style="`height: ${height - 14}px;`">
      <div class="video-content" :style="`height: ${height - 14}px;`">
      <video controls autoplay controlBar bigPlayButton id="viodeRef" class="myVideo" ref="viodeRef" :style="`height: ${height - 14}px;`">
        <source :src="Math.random() > 0.5 ? videoArr[0] : videoArr[1]" type="video/mp4">
      </video>
      <div class="closebtn" title="关闭视频" @click="videoState = false" :style="`right:${closeRight}px;`"><svg-icon class="closesvg" icon-class="close" /></div>
      </div>
    </div>
  </div>
  <div class="nodata" v-else :style="`height: ${height - 5}px;`">暂无数据</div>
</template>

<script>
import img01 from '@/assets/demo/img01.png'
import img02 from '@/assets/demo/img02.png'
import img03 from '@/assets/demo/img03.png'
import img04 from '@/assets/demo/img04.png'
import img05 from '@/assets/demo/img05.png'
import vedio01 from '@/assets/demo/vedio01.mp4'
import vedio02 from '@/assets/demo/vedio02.mp4'
export default {
  name: 'MonitorPipeInfo',
  props: {
    height: {
      required: true,
      type: Number
    }
  },
  data () {
    return {
      videoState: false,
      videoArr: [vedio01, vedio02],
      activeNames: ['0', '1', '2', '3', '4'], // ['0', '1']
      infos: [
        {
          name: '基本信息',
          type: 'table3',
          data: [
            { name: '检测路段', value: '兴义路(万山路—古北路)' },
            { name: '所属区', value: '长宁区' },
            { name: '排水系统', value: '' },
            { name: '检测时间', value: '2019年08月06日' },
            { name: '检测单位', value: '上海宝乔环境工程有限公司' },
            { name: '委托单位', value: '长宁区市政工程管理中心' },
            { name: '检测方法', value: '电视/声纳' },
            { name: '检测设备', value: 'QuickVideo(窥无忧)或CCTV' },
            { name: '检测得分', value: '100分' }
          ]
        },
        {
          name: '检测结果',
          type: 'table',
          data: [
            {
              tableData: [
                { shuxin: '主管', id: 'Y2-Y3', guanjin: '800', length: '38', jini: '0', jinip: '0', fangfa: '电视', manfen: '30', fenshu: '30' },
                { shuxin: '支管', id: 'Y2-Y2-1', guanjin: '300', length: '7', jini: '0', jinip: '0', fangfa: '电视', manfen: '5', fenshu: '5' },
                { shuxin: '支管', id: 'Y2-Y2-2', guanjin: '300', length: '6', jini: '0', jinip: '0', fangfa: '电视', manfen: '5', fenshu: '5' },
                { shuxin: '支管', id: 'Y3-Y3-1', guanjin: '300', length: '7', jini: '0', jinip: '0', fangfa: '电视', manfen: '5', fenshu: '5' },
                { shuxin: '支管', id: 'Y4-Y4-1', guanjin: '300', length: '7', jini: '0', jinip: '0', fangfa: '电视', manfen: '5', fenshu: '5' }
              ],
              tableCol: [
                { prop: 'shuxin', label: '管道属性', width: '' },
                { prop: 'id', label: '管道编号', width: '' },
                { prop: 'guanjin', label: '管径(mm)', width: '' },
                { prop: 'length', label: '长度(m)', width: '' },
                { prop: 'jini', label: '平均积泥(mm)', width: '' },
                { prop: 'jinip', label: '积泥百分比(%)', width: '' },
                { prop: 'fangfa', label: '检测方法', width: '' },
                { prop: 'manfen', label: '满分', width: '' },
                { prop: 'fenshu', label: '检测得分', width: '' }
              ]
            }
          ]
        },
        {
          name: '位置示意图 / 附近标识物',
          type: 'img',
          data: [
            { src: img01, label: '位置示意图' },
            { src: img02, label: '附近标识物' }
          ]
        },
        {
          name: '检测缺陷',
          type: 'tableImg',
          data: [
            {
              table: [
                { name: '管道编号', value: 'Y2-Y2-2' },
                { name: '图    号', value: '06' },
                { name: '缺陷名称', value: 'QR' },
                { name: '缺陷等级', value: '1' },
                { name: '距    离', value: '-' },
                { name: '时钟表示', value: '1002' },
                { name: '缺陷描述', value: '1 级' }
              ],
              src: img03
            },
            {
              table: [
                { name: '管道编号', value: '1Y1-1Y1A' },
                { name: '图    号', value: '02' },
                { name: '缺陷名称', value: 'CW' },
                { name: '缺陷等级', value: '3' },
                { name: '距    离', value: '-' },
                { name: '时钟表示', value: '0903' },
                { name: '缺陷描述', value: '3 级（重度错位）： 错位距离为管壁厚度 1 至 2倍。' }
              ],
              src: img04
            },
            {
              table: [
                { name: '管道编号', value: 'Y1-Y1-1' },
                { name: '图    号', value: '03' },
                { name: '缺陷名称', value: '' },
                { name: '缺陷等级', value: '' },
                { name: '距    离', value: '-' },
                { name: '时钟表示', value: '-' },
                { name: '缺陷描述', value: '管道良好' }
              ],
              src: img05
            }
          ]
        },
        {
          name: '管道沉积声纳检测断面图',
          type: 'tableChart',
          data: [
            {
              tableData: [
                { fn: { class: [21, 'th'] }, data: ['积泥深度(mm)', 69, 60, 72, 60, 75, 74, 60, 69, 70, 56, 60, 45, 60, 71, 68, 75, 79, 82, 70, 77, '平均积泥(mm)：67.6'] },
                { fn: { class: [21, 'th'] }, data: ['占百分比(%)', 4.6, 4, 4.8, 4, 5, 4.93, 4, 4.6, 4.67, 3.73, 4, 4.6, 4.67, 3.73, 4, 3, 4, 4.73, 4.53, 5, '平均百分比(%)：4.5'] },
                { fn: { rowspan: [21, 2] }, data: ['间距(M)', 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, ''] },
                { fn: { colspan: [1, 20] }, data: ['总长(M)', 40, ''] }
              ]
            }
          ]
        }
      ],
      jdata: {
        name: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        j_data: [150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150],
        n_data: [69, 60, 72, 60, 75, 74, 60, 69, 70, 56, 60, 45, 60, 71, 68, 75, 79, 82, 70, 77]
      },
      chartOptions: {
        title: { text: '', x: 'center', y: 'top', textAlign: 'center' },
        color: ['#FF0000', '#1E90FF', '#07C5B6'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' },
          formatter: '{b}<br/>{a0}:{c0}mm<br/>{a1}:{c1}mm<br/>'
        },
        legend: { show: false },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: null,
          axisTick: {
            alignWithLabel: true
          }
        },
        yAxis: {
          type: 'value',
          name: '深度',
          axisLabel: {
            formatter: '{value}mm'
          },
          min: 0,
          max: 1500
        },
        series: [
          {
            name: '积泥预警',
            type: 'line',
            lineStyle: { type: 'dotted' },
            data: null
          },
          {
            name: '积泥深度',
            type: 'line',
            data: null
          },
          {
            type: 'custom',
            renderItem: this.renderArrow,
            encode: {
              x: 0,
              y: 1
            },
            data: [[9, 5, 0]],
            z: 10
          }
        ]
      },
      closeRight: 0
    }
  },
  computed: {
    contentDivStyles () {
      let h = this.height ? this.height - 5 : 400
      let styles = 'height:' + h + 'px; overflow-y:'
      if (this.videoState) styles = styles + 'hidden;'
      else styles = styles + 'scroll;'
      return styles
    }
  },
  mounted () {
    this.drawLine()
    // setTimeout(() => { this.getCloseRight() }, 400)
  },
  watch: {
    videoState (newValue) {
      if (newValue) { this.getCloseRight() }
    }
  },
  methods: {
    // initVideo () {
    //   // 初始化视频方法
    //   this.$video('viodeRef', {
    //     // 确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
    //     // controls: true,
    //     // 自动播放属性,muted:静音播放
    //     // autoplay: true,
    //     // 建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
    //     // preload: 'auto',
    //     // controlBar: true,
    //     // bigPlayButton: true
    //     // 设置视频播放器的显示宽度（以像素为单位）
    //     // width: '800px',
    //     // 设置视频播放器的显示高度（以像素为单位）
    //     // height: '600px'
    //   })
    // },
    getCloseRight () { // 延迟 80 毫秒，持续五十次，否则使用不赋值
      var css,id,H,W,VH,VW,count = 0
      var _this = this
      function func() {
        id = document.getElementById('viodeRef')
        count += 1
        if (id) {
          H = id.clientHeight || 0
          W = id.clientWidth || 0
          VH = id.videoHeight || 0
          VW = id.videoWidth || 0
          if (H && W && VH && VW) { css = (W - Math.round(VW * H / VH)) / 2 }
          // console.log(W,H,VW,VH, css)
        }
        if (css) { _this.closeRight = css}
        else if (count < 50) { setTimeout(() => { func() }, 80) }
      }

      setTimeout(() => { func() }, 80)
    },
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('tableChartChart'))
      var options = this.chartOptions
      if (options && typeof options === 'object') {
        options.xAxis.data = this.jdata.name
        options.series[0].data = this.jdata.j_data
        options.series[1].data = this.jdata.n_data
        myChart.setOption(options, true)
      }
    },
    renderArrow (param, api) {
      let point = api.coord([ api.value(0), 1600 ])
      return {
        type: 'path',
        shape: {
          pathData: 'M0 0 h 30 v -5 l 15 7 l -15 7 v -5 h -30 z'
        },
        rotation: Math.PI / 8 * api.value(2),
        position: point,
        style: api.style({
          stroke: '#000000',
          lineWidth: 0
        })
      }
    }
  },
  beforeDestroy () {
    const videoDom = this.$refs.viodeRef // 不能用document 获取节点
    if (videoDom) this.$video(videoDom).dispose() // 销毁video实例，避免出现节点不存在 但是flash一直在执行，报 this.el.......is not function
  }
}
</script>

<style lang="scss" scoped>
$border: 1px solid #d4d4d4;
$activeColor:#0080ff;
$labelWidth: 100px;
$height: 32px;
.content-div{position: relative;}
.padding-10{ padding-left: 10px; padding-right: 10px; box-sizing: border-box;}
.margin-10{margin-left:10px;margin-right:4px;display: inline-block;}
/deep/ .el-collapse-item__header{background-color: #2562bd; line-height: 29px; padding: 0; margin: 0; color: #fff; height: auto; border-bottom: none;}
/deep/ .el-collapse-item__content{padding-bottom: 10px; padding-top: 5px; font-size: 14px; color: #000;}
/deep/ .el-collapse{border: none;}
.nodata{color: #aaa; font-size: 18px; text-align: center; padding-top:30px;}
.table3{box-sizing: border-box; height: auto; border-top: $border; border-left:$border; line-height:  $height - 8; font-size: 14px; color: #000;}
.table3-li{position: relative; display: inline-block; box-sizing: border-box;width: 33.33%; height: $height; padding: 4px 10px 4px 0; border-bottom: $border; border-right: $border;}
.table3-li .label, .tableImg-li .label{ position: absolute;display: inline-block; left: 0; top: 0;bottom: 0; line-height:  $height - 2; width:$labelWidth;text-align: right;  background-color: #2562bd; color: #fff;border-right: $border;  padding-right: 10px; }
.table3-li .txt, .tableImg-li .txt{ padding-left: $labelWidth + 10;}
.table /deep/ .el-table th,.tableChartTable th,.tableChartTable .th{background-color: #2562bd !important; color: #fff; font-weight: normal;}
.color2-svg, .cell .svg-icon.color2-svg{color: $activeColor; font-size: 14px;}
.img{box-sizing: border-box; height: auto; border-top: $border; border-left:$border; }
.img-li{position: relative; display: inline-block; text-align: center; box-sizing: border-box;width: 50%; padding: 4px 10px 4px 0; border-bottom: $border; border-right: $border; overflow-x: hidden;}
.img-li .label{ position: absolute;display: inline-block; left: 0; bottom: 0;right: 0; height: $height - 8;line-height:  $height - 8; background-color:rgba($color: #000, $alpha: 0.65); padding: 0 10px; font-size: 13px; color: #fff;}
.img-li img,.tableImg .img img{ vertical-align: middle;}
.tableImgContent{ display: flex;box-sizing: border-box; height: auto; border-top: $border; border-left:$border; line-height:  $height - 8; font-size: 14px; color: #000;}
.tableImgContent .left, .tableImgContent .right{flex: 1; }
.left{display: flex; flex-direction: column;}
.left .tableImg-li{position: relative; box-sizing: border-box; padding: 4px 10px 4px 0; border-bottom: $border; border-right: $border;}
.left .tableImg-li:last-child{flex:1;}
.tableImgContent .right{ overflow: hidden; text-align: center; border-bottom: $border; border-right: $border;}
.tableChartTable{ width: 100%; border-top: $border; border-left:$border; line-height:  $height - 8; font-size: 14px; color: #000;}
.tableChartTable td, .tableChartTable th{  border-bottom: $border; border-right: $border; padding: 4px 10px 4px 0; }
.tableChartTable td {text-align: center;}
.tableChartTable th,.tableChartTable .th{ padding-left: 15px;text-align: left;}
.video{position:absolute; top: 0; left: 0;right: 0; z-index: 20; background-color: #fff; text-align: center;}
.myVideo{width: 100%;}
.btn{margin-top: 15px;height: $height;}
.btn_ok{ min-width: 104px; height: $height;background-color: $activeColor; border-color: $activeColor; }
/deep/ .el-button--mini.btn_ok span{font-size: 15px;}
.tableChart{position: relative;}
.title{ position: absolute; top: 26px; left: 50%; margin-left: -5.4em;z-index: 999; font-size: 16px; font-weight: bolder;}
/deep/ .el-button--small{padding: 5px 15px;}
.video-content{position: relative;top: 0;left: 0;width: 100%;}
.closebtn{position: absolute;top: 0;right: 0; z-index: 9999;display:block;padding: 10px;background-color: rgba(0, 0, 0, 0.5);cursor: pointer;}
.closesvg{font-size: 22px;color: #fff;}
</style>
