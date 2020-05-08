<template>
  <el-drawer
    ref="drawer"
    :modal="false"
    :show-close="false"
    :append-to-body="true"
    :visible.sync="state"
    :direction="direction"
    :before-close="handleClose">
    <el-button type="text" size="small" class="close" @click="toggle(false)"><svg-icon class="color-svg" icon-class="iconClose" /></el-button>
    <div class="drawer__content">
      <!-- 开始内容  ===================== -->
      <div class="content">
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="最近检测" name="jiance">
            <monitor-pipe-info  v-if="activeName === 'jiance'" :height="contentHeight" />
          </el-tab-pane>
          <!-- 历史记录 =============== -->
          <el-tab-pane label="历史记录" name="history">
            <div class="padding-10" v-if="activeName === 'history'">
              <div class="btn">
                <el-date-picker v-model="selectDate" type="datetimerange" size="small" placeholder="选择日期" />
                <el-button type="primary" size="mini" class="btn_ok"  @click="/*console.log('查询')*/">查询</el-button>
              </div>
              <el-table :data="tableData" border :max-height="contentHeight - 70" size="mini" style="width: 100%">
                <el-table-column type="index" label="序号" width="60" header-align="center" align="center" />
                <el-table-column v-for="(item, index) in tableHeader" :key="index"
                  :prop="item.prop"
                  :label="item.label"
                  :width="item.width"
                  header-align="center" align="center" />
                <el-table-column label="详情" header-align="center" align="center">
                  <template>
                    <el-button type="text" size="small" @click="activeName = 'jiance'" title="详情"><svg-icon class="color2-svg" icon-class="info" /></el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
  </div>
  </el-drawer>
</template>

<script>
import MonitorPipeInfo from './MonitorPipeInfo.vue'
export default {
  name: 'MonitorPipe',
  components: { MonitorPipeInfo },
  data () {
    return {
      name: 'MonitorPipe',
      state: true,
      direction: 'btt',
      activeName: 'jiance',
      contentHeight: 0,
      selectDate: [],
      tableHeader: [
        { prop: 'renwu', label: '检测任务', width: '360' },
        { prop: 'date', label: '检测时间', width: '140' },
        { prop: 'weituo', label: '委托单位', width: '240' },
        { prop: 'jiance', label: '检测单位', width: '240' },
        { prop: 'fangfa', label: '检测方法', width: '140' },
        { prop: 'fenshu', label: '检测得分', width: '' }
      ],
      tableDataObj: {
        renwu: '2019年8月长宁区排水管道养护电视声纳检测',
        date: '2019-08-06',
        weituo: '长宁区市政工程管理中心',
        jiance: '上海宝乔环境工程有限公司',
        fangfa: '电视/声纳',
        fenshu: 100
      },
      tableData: []
    }
  },
  mounted () {
    // 设施20组默认数据
    for (let i = 0; i < 20; i++) {
      this.tableData.push(this.tableDataObj)
    }
    // 设置默认时间
    let date = new Date()
    date.setTime(date.getTime() - 3600 * 1000 * 24)
    this.selectDate[0] = date
    this.selectDate[1] = new Date()

    // 设置vr显示区域的高度
    let that = this
    setTimeout(() => {
      const h = that.$refs.drawer._self.$el.children[0].firstChild.clientHeight - 32
      this.contentHeight = h
    }, 400)
  },
  methods: {
    handleClose (done) {
      this.toggle()
      done()
    },
    toggle () {
      this.$emit('toggle', { name: this.name, value: false })
    }
  }
}
</script>

<style lang="scss" scoped>
$height: 30px;
$activeColor:#0080ff;
$color: #000;
$borderColor: #d4d4d4;
/deep/ .el-drawer.btt{
  top: 10%;
  bottom: 10%;
  height: 80% !important;
  left: 10%;
  right:10%;
  width: 80%;
}
.drawer__content{
  display: flex;
  flex-direction: column;
  height: 100%;
  .content{
    flex: 1;
  }
}
.el-tabs__content{ height: 100%; position: relative;}
.quanpingvr{
  position: relative;
  top: 1px;
  left: 0;
  right: 0;
  bottom: 0;
  background: #ffffff;
  overflow: hidden;
}
.close{position:absolute; top: 0px; right: 8px;height: 32px; z-index: 10;}
.iconClose{ font-size: 15px; color: $activeColor;}
.drawer__footer{ display: flex;}
/deep/ .el-drawer__header{padding:0;margin-bottom: 0; display: none;}
.padding-10{padding: 0 10px; box-sizing: border-box;}
// /deep/ .el-tabs__item{ height: $height; line-height: $height;}
// /deep/ .el-tabs__header{ margin: 0;}
// /deep/.el-tabs__item.is-active{ border-bottom: none; background-color: #2562bd; color: #fff;}
// /deep/.el-tabs--card>.el-tabs__header .el-tabs__nav{ border-right-width: 1px;border-top-width: 0;border-left-width: 0;border-bottom-width: 0;}
.padding-10{padding: 0 10px; box-sizing: border-box;}
.btn{margin-top: 10px;margin-bottom: 10px; height: $height + 2; text-align: center}
.btn_ok{ min-width: 104px; height: $height;background-color: $activeColor; border-color: $activeColor;}
.btn_cancle{ width: 70px;height: $height;}
.btn /deep/ .el-date-editor{margin: 0 5px;}
/deep/ .el-table__column-filter-trigger{ display: none;}
/deep/ .el-table th{ background-color: #2562bd !important; }
/deep/ .el-table{ font-size: 14px; }
/deep/ .el-table .caret-wrapper{ height: 23px; }
/deep/ .el-table .sort-caret.descending, /deep/ .el-table .sort-caret.descending{ border-top-color: #fff; }

/deep/ .el-table td, /deep/ .el-table th { padding: 2px 0; }
// /deep/ .el-tabs__header{ margin: 0 0 .4em;}
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
.cell .svg-icon, .el-table /deep/ thead{ color: #fff;}
.color2-svg, .cell .svg-icon.color2-svg{color: $activeColor; font-size: 14px;}
.el-tabs__item { font-size: unset; }
/deep/ .el-table td, /deep/ .el-table th { padding: 2px 0; }
/deep/ .el-tabs__header{ margin: 0 0 .4em;}
/deep/ .el-button--text{ padding-left: 5px; padding-right: 5px; color: #000;}
/deep/ .el-button+.el-button{ margin-left: 0; }
/deep/ .el-tabs__header{background:url('../../assets/images/contentTitle.png')}
/deep/ .el-tabs__item.is-active{color: #2562bd;background: #fff;}
/deep/ .el-tabs__item{color: #fff; font-weight: bolder;font-size: 15px; padding-left: 28px !important; padding-right: 28px !important; }
.table-context .right /deep/ .el-button--text span{color: #fff;}
/deep/ .el-tabs__active-bar.is-top{display: none;}
/deep/ .el-tabs__nav.is-top { border: none; border-right:rgba($color: #fff, $alpha: 0.2) 1px solid;}
/deep/ .el-tabs--card>.el-tabs__header .el-tabs__item{ border-left:rgba($color: #fff, $alpha: 0.2) 1px solid;}
.color-svg{color: #fff;}
</style>
