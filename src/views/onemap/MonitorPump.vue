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
          <el-tab-pane label="监测平面图" name="jiance">
            <monitor-pump-moni  v-if="activeName === 'jiance'" :height="contentHeight" />

          </el-tab-pane>
          <el-tab-pane label="运行曲线图" name="run">
              <monitor-pump-chart  v-if="activeName === 'run'" :height="contentHeight" />
          </el-tab-pane>
          <el-tab-pane label="实景VR" name="vr">
            <div ref="vr" v-if="activeName === 'vr'" class="map-container quanpingvr" :style="'height:' +  contentHeight + 'px;'">
              <src-iframe  src="http://47.100.59.129/vr/ghbz/index.html" :showClose="false" width="100%" height="100%" />
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <!-- 底部按钮  =====================  -->
    <!-- <div class="drawer__footer">
      <el-button @click="dialog = false">取 消</el-button>
      <el-button type="primary" @click="$refs.drawer.closeDrawer()" >确 定</el-button>
    </div> -->
  </div>
  </el-drawer>
</template>

<script>
import srcIframe from './srcIframe.vue'
import MonitorPumpChart from './MonitorPumpChart.vue'
import MonitorPumpMoni from './MonitorPumpMoni.vue'
export default {
  name: 'MonitorPump',
  components: {
    srcIframe,
    MonitorPumpChart,
    MonitorPumpMoni
  },
  data () {
    return {
      name: 'MonitorPump',
      state: true,
      direction: 'btt',
      activeName: 'jiance',
      contentHeight: 0
    }
  },
  watch: {
    heightAppMain (newVal, oldVal) {
      this.setHeight()
    }
  },
  computed: {
    heightAppMain () {
      return this.$store.state.app.heightAppMain
    }
  },
  mounted () {
    this.setHeight()
  },
  methods: {
    handleClose (done) {
      this.toggle()
      done()
    },
    toggle () {
      this.$emit('toggle', { name: this.name, value: false })
    },
    setHeight () {
      let that = this
      // 设置vr显示区域的高度
      setTimeout(() => {
        const h = that.$refs.drawer._self.$el.children[0].firstChild.clientHeight - 32
        this.contentHeight = h
      }, 400)
    }
  }
}
</script>

<style lang="scss" scoped>
$height: 30px;
$activeColor:#0080ff;
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
