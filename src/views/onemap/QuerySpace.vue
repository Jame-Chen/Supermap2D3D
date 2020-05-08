<template>
  <el-container v-if="state" class="border">
    <el-main class="inborder">
      <content-title icon="iconSearchMultiple" title="空间查询" @toggle="toggle" @toMini="toMini" />

      <!-- 查询的三大分类 -->
      <div class="padding5">
        <el-tabs v-model="activeName" type="card" @tab-click="clearTab">
          <el-tab-pane label="关键字查询" name="QuerySpaceKey">
            <query-space-key ref="querySpaceKey"
                             :baseProps="baseProps"
                             :queryProps="queryProps"
                             @setOperationType="setOperationType"
                             @changeLoading="changeLoading"
                             @clearData="clearData"
                             @clearLayer="clearLayer"
                             @clearDataShow="clearDataShow"
                             @doQueryCompleted="doQueryCompleted">
            </query-space-key>
          </el-tab-pane>
          <el-tab-pane label="绘图查询" name="QuerySpaceGeometry" v-if="type === '2d'">
            <query-space-geometry ref="querySpaceGeometry"
                                  :baseProps="baseProps"
                                  :queryProps="queryProps"
                                  @changeLoading="changeLoading"
                                  @clearData="clearData"
                                  @clearLayer="clearLayer"
                                  @clearDataShow="clearDataShow"
                                  @drawGeometry="drawGeometry"
                                  @doQueryCompleted="doQueryCompleted">
            </query-space-geometry>
          </el-tab-pane>
          <el-tab-pane label="缓冲区查询" name="QuerySpaceBuffer"  v-if="type === '2d'">
            <query-space-buffer ref="querySpaceBuffer"
                                :baseProps="baseProps"
                                :queryProps="queryProps"
                                @changeLoading="changeLoading"
                                @clearData="clearData"
                                @clearLayer="clearLayer"
                                @clearDataShow="clearDataShow"
                                @openMessage="openMessage"
                                @drawGeometry="drawGeometry"
                                @drawBuffer="drawBuffer"
                                @doQueryCompleted="doQueryCompleted">
            </query-space-buffer>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import QuerySpaceKey from './QuerySpaceKey.vue' // 关键字查询
import QuerySpaceGeometry from './QuerySpaceGeometry.vue' // 点线面, 别名：几何查询，绘图查询
import QuerySpaceBuffer from './QuerySpaceBuffer.vue' // 缓冲区查询
import baseMixin from './baseMixin.js'
export default {
  name: 'QuerySpace',
  mixins: [baseMixin],
  components: {
    QuerySpaceKey,
    QuerySpaceGeometry,
    QuerySpaceBuffer
  },
  props: {
    type: {
      typeof: String,
      required: true
    },
    baseProps: {
      type: Object,
      required: true
    },
    queryProps: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      name: 'QuerySpace',
      activeName: 'QuerySpaceKey'
    }
  },
  mounted () {
  },
  methods: {
    clearSpace () {
      this.$nextTick(() => {
        this.$refs.querySpaceKey.clearSpace()
        if (this.type === '2d') {
          this.$refs.querySpaceGeometry.clearSpace()
          this.$refs.querySpaceBuffer.clearSpace()
        }
      })
    },
    clearTab () {
      this.clearSpace()
      this.clearData()
      this.clearLayer()
      this.clearDataShow()
    },
    setOperationType (val) {
      this.$emit('setOperationType', val)
    },
    doQueryCompleted (selectedLayerNames, attributeFilter, selectedFeatures, selectedCounts, oldCount, geometry, geoType) {
      this.$emit('doQueryCompleted', selectedLayerNames, attributeFilter, selectedFeatures, selectedCounts, oldCount, geometry, geoType)
    },
    changeLoading (flag) {
      this.$emit('changeLoading', flag)
    },
    clearData () {
      this.$emit('clearData')
    },
    clearLayer (drawFlag) {
      this.$emit('clearLayer', drawFlag)
    },
    clearDataShow (flag) {
      this.$emit('clearDataShow', flag)
    },
    // 消息提醒弹窗
    openMessage (message, val) { // success/warning/info/error
      this.$emit('openMessage', message, val)
    },
    drawGeometry (label, operationType) {
      this.$emit('drawGeometry', label, operationType)
    },
    drawCompleted (geometry, operationType) {
      if (operationType === 'buffer') {
        this.$refs.querySpaceBuffer.geometry = geometry
        this.$refs.querySpaceBuffer.drawCompleted()
      } else {
        this.$refs.querySpaceGeometry.geometry = geometry
        this.$refs.querySpaceGeometry.drawCompleted()
      }
      this.clearSpace()
    },
    drawBuffer (geometry) {
      this.$emit('drawBuffer', geometry)
    },
    initSelectedLayers () {
      this.$refs.querySpaceKey.initSelectedLayers()
    }
  }
}
</script>

<style lang="scss" scoped>
$activeColor: #2562bd;
$height: 30px;
.border{
  box-sizing: border-box;
  // border: 1px solid #2e5c76;
  .inborder{
    border: 1px solid #202340;
    position: relative;
  }
}
/deep/ .el-tabs__item{
  height: $height;
  line-height: $height;
}
// /deep/ .el-tabs__nav.is-top{
//   border-top: none;
//   border-left: none;
// }
// /deep/ .el-tabs__item.is-active{
//   background-color: $activeColor;
//   color: #fff;
//   border-color: $activeColor;
// }
/deep/ .el-tabs__header{
  margin: 0 0 11px;
}
/deep/ .el-button--mini.btn_ok span, /deep/ .el-button--mini.btn_cancle span{font-size: 15px;}
.padding5{ padding-bottom: 5px; }
/deep/.el-tabs__item.is-active{ border-bottom: none; background-color: #2562bd; color: #fff;}
/deep/.el-tabs--card>.el-tabs__header .el-tabs__nav{ border-right-width: 1px;border-top-width: 0;border-left-width: 0;border-bottom-width: 0;}
</style>
