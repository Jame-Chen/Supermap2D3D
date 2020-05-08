<template>
  <el-form ref="querySpaceBufferForm" :model="form" class="padding-10">
    <div class="tip">
      <span v-if="form.type === '0'">请先选择绘制模式</span>
      <span v-if="form.type === '1'">请在地图上点击一个点</span>
      <span v-if="form.type === '2'">请在地图上点击多个点，双击结束</span>
      <span v-if="form.type === '3'">请在地图上点击后移动鼠标框选，双击结束</span>
      <span v-if="form.type === '4'">请在地图上点击多个点，双击结束</span>
      <span v-if="form.type === '5'">请在地图上点击后移动鼠标画圆，双击结束</span>
    </div>
    <el-form-item name="type">
      <el-radio
       v-model="form.type"
       v-for="(item, index) in searchArray.type"
       :key="index"
       size="small"
       :label="item.radio"
       @change="drawGeometry">
        <svg-icon :iconClass="item.icon" style="margin-right: 4px;color:#0080ff;" />{{item.label}}
      </el-radio>
    </el-form-item>
    <el-form-item name="key" class="itembig">
      <template slot="label">
        <span class="form-item-title">查找范围：</span>
      </template>
      <el-input size="small" v-model="form.key" placeholder="请输入缓冲距离,默认10,单位：米" clearable />
    </el-form-item>
    <el-form-item class="btn">
      <el-button type="primary" :disabled="disabled"  size="mini" class="btn_ok"  @click="onSearchQuery()">查询</el-button>
      <el-button size="mini" class="btn_cancle" @click="restart()">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'QuerySpaceBuffer',
  props: {
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
      searchArray: {
        type: [{ label: '点', radio: '1', icon: 'dot' }, { label: '线', radio: '2', icon: 'line' }, { label: '面', radio: '4', icon: 'noodles' }] // 搜索模式-单选数组
      },
      form: {
        type: '0', // 搜索模式-单选数组 ['0', '1', '2', '3']
        key: '' // 50米
      },
      geometry: {},
      buffGeometry: {},
      /** ********************查询属性**********************/
      // 查询图层i|j
      selectedLayerNames: [],
      attributeFilter: [],
      selectedFeatures: [],
      selectedCounts: []
    }
  },
  computed: {
    disabled () {
      return false
    }
  },
  mounted () {
  },
  methods: {
    clearSpace () {
      this.form = {
        type: '0',
        key: ''
      }
    },
    initSelected () {
      this.selectedLayerNames = []
      this.attributeFilter = []
      this.selectedFeatures = []
      this.selectedCounts = []
    },
    restart () {
      this.$emit('clearData')
      this.$emit('clearLayer')
      this.$emit('clearDataShow')
      this.form.key = ''
      this.initSelected()
    },
    drawGeometry (label) {
      this.$emit('clearData')
      this.$emit('clearLayer')
      this.$emit('clearDataShow')
      this.initSelected()
      this.$emit('drawGeometry', label, 'buffer')
    },
    // 点线面查询
    drawCompleted () {
      this.initSelected()
      for (let i = 0; i < this.queryProps['layerVisible'].length; i++) {
        if (this.queryProps['layerVisible'][i].tabQuery && this.queryProps['layerVisible'][i].visible) {
          let layers = this.queryProps['layerVisible'][i].typeName
          this.selectedLayerNames.push(layers)
          this.attributeFilter.push(this.queryProps[layers].attributeFilter)
        }
      }
    },
    onSearchQuery () {
      if (this.selectedLayerNames.length > 0) {
        this.$emit('changeLoading', true)
        this.$emit('clearData')
        this.$emit('clearLayer', false)
        this.$emit('clearDataShow', false)
        this.bufferAnalystProcess()
      } else {
        this.$emit('openMessage', '请先选择绘制模式，然后在地图上绘制图形', 'error')
      }
    },
    bufferAnalystProcess () {
      if (this.form.key === '') this.form.key = '10'
      let getParameters = new SuperMap.GeometryBufferAnalystParameters({
        sourceGeometry: this.geometry,
        bufferSetting: new SuperMap.BufferSetting({
          endType: SuperMap.BufferEndType.ROUND,
          leftDistance: new SuperMap.BufferDistance({ value: parseInt(this.form.key) / (95.615 * 1000) }),
          rightDistance: new SuperMap.BufferDistance({ value: parseInt(this.form.key) / (95.615 * 1000) }),
          semicircleLineSegment: 10
        })
      })
      L.supermap
        .spatialAnalystService(this.baseProps['url_spatial_analyst'])
        .bufferAnalysis(getParameters, (serviceResult) => {
          this.buffGeometry = serviceResult.result.resultGeometry
          this.$emit('drawBuffer', this.buffGeometry)
          this.doDrawQuery(0)
        })
    },
    doDrawQuery (k) {
      let layer = this.queryProps[this.selectedLayerNames[k]]
      let fields = ['SMID', 'POPTITLE']
      for (let h = 0; h < layer.columnList.length; h++) {
        let tabFields = layer.columnList[h]
        let columnEName = (tabFields.columnEName).toUpperCase()
        fields.push(columnEName)
      }
      let getParameters = new SuperMap.GetFeaturesByGeometryParameters({
        toIndex: -1,
        datasetNames: [layer.datasetNames],
        attributeFilter: this.attributeFilter[k],
        geometry: this.buffGeometry,
        spatialQueryMode: 'INTERSECT',
        fields: fields
      })
      L.supermap
        .featureService(this.baseProps['url_data'])
        .getFeaturesByGeometry(getParameters, (serviceResult) => {
          let features = serviceResult.result.features.features
          if (features) {
            this.selectedCounts[k] = features.length
            this.selectedFeatures[k] = features
          }
          if (k < this.selectedLayerNames.length - 1) {
            this.doDrawQuery(k + 1)
          } else {
            this.$emit('doQueryCompleted', this.selectedLayerNames, this.attributeFilter, this.selectedFeatures, this.selectedCounts, undefined, this.buffGeometry, 'draw')
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
$height: 32px;
$red: #ff6619;
$activeColor:#0080ff;
.el-form{ padding-right: 10px;padding-left: 4px; box-sizing: border-box; margin-bottom: 10px;}
.padding-10{padding: 0 10px; box-sizing: border-box;}
.btn{ margin-left: 104px;margin-top: 15px;height: $height;}
.btn_ok{ width: 104px; height: $height;background-color: $activeColor; border-color: $activeColor; }
.btn_cancle{ width: 70px;height: $height;}
/deep/ .el-form-item__content{
  height: $height;line-height: $height;
  // .el-radio:first-child{margin-left: -70px;}
}
/deep/ .el-form-item{height: $height;margin-bottom: 5px;}
/deep/ .el-form-item__label{line-height: $height;color: #000;}
/deep/ .el-form-item__error{ padding-top: 0;}
.tip{
  color: $red;
  height: $height - 8;
  font-size: 13px;
  line-height: 1em;
}
/deep/ .el-radio,/deep/ .el-input__inner{color:#000;}
.form-item-title{font-size: 14px; color: #000; width: 75px; display: inline-block;font-weight: normal;}
.itembig /deep/ .el-form-item__content{ left: 100px; right: 10px; position: absolute;}
</style>
