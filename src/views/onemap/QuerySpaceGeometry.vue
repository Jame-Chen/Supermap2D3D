<template>
  <el-form ref="querySpaceGeometryForm" :model="form" class="padding-10">
    <div class="tip">
      <span v-if="form.type === '0'">请先选择绘制模式</span>
      <span v-if="form.type === '1'">请在地图上点击一个点，开始查询</span>
      <span v-if="form.type === '2'">请在地图上点击多个点，双击开始查询</span>
      <span v-if="form.type === '3'">请在地图上点击后移动鼠标框选，双击开始查询</span>
      <span v-if="form.type === '4'">请在地图上点击多个点，双击开始查询</span>
      <span v-if="form.type === '5'">请在地图上点击后移动鼠标画圆，双击开始查询</span>
    </div>
    <el-form-item>
      <el-radio
       v-model="form.type"
       v-for="(item, index) in searchArray.type"
       :key="index"
       :label="item.radio"
       @change="drawGeometry">
        <svg-icon :iconClass="item.icon" style="margin-right: 4px;color:#0080ff;" />{{item.label}}
      </el-radio>
    </el-form-item>
    <!--
    <el-form-item class="btn">
      <el-button size="mini" class="btn_cancle" @click="restart()">重置</el-button>
    </el-form-item>
    -->
  </el-form>
</template>

<script>
export default {
  name: 'QuerySpaceGeometry',
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
        type: [{ label: '矩形', radio: '3', icon: 'rectangle' }, { label: '多边形', radio: '4', icon: 'polygon' }, { label: '圆', radio: '5', icon: 'circular' }] // 搜索模式-单选数组
      },
      form: {
        type: '0' // 搜索模式-单选数组 ['0', '1', '2', '3']
      },
      geometry: {},
      /** ********************查询属性**********************/
      // 查询图层i|j
      selectedLayerNames: [],
      attributeFilter: [],
      selectedFeatures: [],
      selectedCounts: []
    }
  },
  mounted () {
  },
  methods: {
    clearSpace () {
      this.form = {
        type: '0'
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
      this.initSelected()
    },
    drawGeometry (label) {
      this.$emit('clearData')
      this.$emit('clearLayer')
      this.$emit('clearDataShow')
      this.initSelected()
      this.$emit('drawGeometry', label, 'geometry')
    },
    // 点线面查询
    drawCompleted () {
      for (let i = 0; i < this.queryProps['layerVisible'].length; i++) {
        if (this.queryProps['layerVisible'][i].tabQuery && this.queryProps['layerVisible'][i].visible) {
          let layers = this.queryProps['layerVisible'][i].typeName
          this.selectedLayerNames.push(layers)
          this.attributeFilter.push(this.queryProps[layers].attributeFilter)
        }
      }
      if (this.selectedLayerNames.length > 0) {
        this.$emit('changeLoading', true)
        if (this.form.type === '3' || this.form.type === '5') this.doDrawRectangleQuery(0)
        else this.doDrawQuery(0)
      }
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
        geometry: this.geometry,
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
            this.$emit('doQueryCompleted', this.selectedLayerNames, this.attributeFilter, this.selectedFeatures, this.selectedCounts, undefined, this.geometry, 'draw')
          }
        })
    },
    doDrawRectangleQuery (k) {
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
        bounds: this.geometry,
        fields: fields
      })
      L.supermap
        .featureService(this.baseProps['url_data'])
        .getFeaturesByBounds(getParameters, (serviceResult) => {
          let features = serviceResult.result.features.features
          if (features) {
            this.selectedCounts[k] = features.length
            this.selectedFeatures[k] = features
          }
          if (k < this.selectedLayerNames.length - 1) {
            this.doDrawRectangleQuery(k + 1)
          } else {
            this.$emit('doQueryCompleted', this.selectedLayerNames, this.attributeFilter, this.selectedFeatures, this.selectedCounts, undefined, this.geometry, 'drawRectangle')
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
.el-form{ padding-right: 10px;padding-left: 4px; box-sizing: border-box; margin-bottom: 15px;}
.padding-10{padding: 0 10px; box-sizing: border-box;}
.btn{ margin-left: 104px;margin-top: 15px;height: $height;}
.btn_ok{ width: 104px; height: $height;background-color: $activeColor; border-color: $activeColor; }
.btn_cancle{ width: 70px;height: $height;}
.tip{
  color: $red;
  height: $height - 8;
  font-size: 13px;
  line-height: 1em;
}
/deep/ .el-radio,/deep/ .el-input__inner{color:#000;}
/deep/ .el-form-item{margin-bottom: 5px;}
/deep/ .el-form-item__content{ line-height: $height - 8;}
</style>
