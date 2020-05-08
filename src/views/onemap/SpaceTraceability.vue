<template>
  <el-container v-if="state" class="border">
    <el-main class="inborder">
      <content-title icon="tool-wangluozhuisu" title="网络追溯" @toggle="toggle" @toMini="toMini" />
      <div class="padding-10">
        <div class="tip">请在地图上点选设施（井，管）后点击查询</div>
        <el-form ref="spaceTraceabilityForm" :model="form" label-width="80px" style="padding-top: 8px;">
          <el-form-item label="追踪类型">
            <el-radio-group v-model="form.traceType">
              <el-radio v-for="item in searchArray.traceType"
                        :key="item.value"
                        :label="item.value"
                        :value="item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="设施名称">
            <el-input size="small" v-model="form.node" :readonly="readonly" disabled />
          </el-form-item>
          <el-form-item class="btn">
            <el-button type="primary" :disabled="disabled" size="mini" class="btn_ok" @click="onSearchQuery()">查询</el-button>
            <el-button size="mini" class="btn_cancle" @click="restart()">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import baseMixin from './baseMixin'
export default {
  name: 'SpaceTraceability',
  mixins: [baseMixin],
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
      name: 'SpaceTraceability',
      searchArray: {
        traceType: [{ label: '上游追踪', value: 'traceup' }, { label: '下游追踪', value: 'tracedown' }]
      },
      form: {
        key: '',
        node: '', // 搜索输入框-模糊搜索
        traceType: 'traceup',
        type: ''
      },
      readonly: true,
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
      if (this.form.key !== '') return false
      else return true
    }
  },
  methods: {
    initSelected () {
      this.selectedLayerNames = []
      this.attributeFilter = []
      this.selectedFeatures = []
      this.selectedCounts = []
    },
    clearSpace () {
      this.form.key = ''
      this.form.node = ''
      this.form.type = ''
    },
    restart () {
      this.$emit('clearData')
      this.$emit('clearLayer')
      this.$emit('clearEchartsLayer')
      this.$emit('clearDataShow')
      this.$emit('setDrawOnclickFlag', true)
      this.form.key = ''
      this.form.node = ''
      this.initSelected()
    },
    sort (arr, sortBy) {
      let compare = function (prop) {
        return function (obj1, obj2) {
          let val1 = obj1[prop]
          let val2 = obj2[prop]
          if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
            val1 = Number(val1)
            val2 = Number(val2)
          }
          if (val1 < val2) {
            return 1
          } else if (val1 > val2) {
            return -1
          } else {
            return 0
          }
        }
      }
      return arr.sort(compare(sortBy))
    },
    onSearchQuery () {
      this.$refs.spaceTraceabilityForm.validate((valid) => {
        if (valid) {
          this.$emit('clearData')
          this.$emit('clearLayer', false)
          this.$emit('clearEchartsLayer')
          this.$emit('clearDataShow', false)
          this.$emit('setDrawOnclickFlag', false)
          this.initSelected()
          this.$emit('changeLoading', true)
          this.pathAnalystProcess()
        } else {
          // console.log(valid)
          return false
        }
      })
    },
    pathAnalystProcess () {
      let profileUrl = this.baseProps['url_transport_analyst'] + '/'
      profileUrl += this.form.traceType + '.json?isUncertainDirectionValid=true&returnFeatures=true&weightName=SMLENGTH'
      profileUrl += '&' + this.form.type + '=' + this.form.key
      this.$http.get(profileUrl).then((res) => {
        let nodeFeatures = res.data.nodesFeatures
        let edgeFeatures = res.data.edgesFeatures
        let layerVisible = this.sort(this.queryProps['layerVisible'], 'sort')
        for (let i = 0; i < layerVisible.length; i++) {
          if (layerVisible[i].tabQuery && layerVisible[i].visible) {
            this.selectedLayerNames.push(layerVisible[i].typeName)
            this.selectedFeatures.push([])
            this.selectedCounts.push(0)
          }
        }
        for (let k = 0; k < edgeFeatures.length; k++) {
          let feature = edgeFeatures[k]
          for (let i = 0; i < layerVisible.length; i++) {
            if (layerVisible[i].tabQuery && layerVisible[i].visible) {
              let typeKeyWords = layerVisible[i].typeKeyWords
              let value = layerVisible[i].typeKeyWordValues
              if (typeKeyWords !== '' && feature.fieldNames.indexOf(typeKeyWords) >= 0) {
                if (feature.fieldValues[feature.fieldNames.indexOf(typeKeyWords)] === value) {
                  let index = this.selectedLayerNames.indexOf(layerVisible[i].typeName)
                  this.selectedFeatures[index].push(feature)
                  this.selectedCounts[index] += 1
                }
              }
            }
          }
        }
        for (let k = 0; k < nodeFeatures.length; k++) {
          let feature = nodeFeatures[k]
          for (let i = 0; i < layerVisible.length; i++) {
            if (layerVisible[i].tabQuery && layerVisible[i].visible) {
              let typeKeyWords = layerVisible[i].typeKeyWords
              let value = layerVisible[i].typeKeyWordValues
              if (typeKeyWords !== '' && feature.fieldNames.indexOf(typeKeyWords) >= 0) {
                if (feature.fieldValues[feature.fieldNames.indexOf(typeKeyWords)] === value) {
                  let index = this.selectedLayerNames.indexOf(layerVisible[i].typeName)
                  this.selectedFeatures[index].push(feature)
                  this.selectedCounts[index] += 1
                }
              }
            }
          }
        }
        let tempSelectedLayerNames = []
        let tempSelectedFeatures = []
        let tempSelectedCounts = []
        for (let i = 0; i < this.selectedFeatures.length; i++) {
          if (this.selectedFeatures[i].length > 0) {
            tempSelectedLayerNames.push(this.selectedLayerNames[i])
            tempSelectedFeatures.push(this.selectedFeatures[i])
            tempSelectedCounts.push(this.selectedCounts[i])
          }
        }
        this.selectedLayerNames = tempSelectedLayerNames
        this.selectedFeatures = tempSelectedFeatures
        this.selectedCounts = tempSelectedCounts
        this.$emit('doQueryCompleted', this.selectedLayerNames, this.attributeFilter, this.selectedFeatures, this.selectedCounts)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.border{
  box-sizing: border-box;
  // border: 1px solid #2e5c76;
  .inborder{
    border: 1px solid #202340;
    position: relative;
  }
}
$height: 32px;
$activeColor:#0080ff;
$red: #ff6619;
.el-form{ padding-right: 10px;padding-left: 4px; box-sizing: border-box; margin-bottom: 18px;}
/deep/ .el-form-item{height: $height;margin-bottom: 5px;}
/deep/ .el-form-item__label{line-height: $height;color: #000; font-weight: normal;}
/deep/ .el-form-item__error{ padding-top: 0; margin-top: -2px;}
/deep/.el-form-item__content {line-height: $height;position: relative;font-size: 14px;}
.btn{margin-top: 15px;height: $height;}
.btn_ok{ min-width: 104px; height: $height;background-color: $activeColor; border-color: $activeColor; }
.btn_cancle{ width: 70px;height: $height;}
/deep/ .el-radio,/deep/ .el-input__inner{color:#000;}
/deep/ .el-button--mini.btn_ok span, /deep/ .el-button--mini.btn_cancle span{font-size: 15px;}
.padding-10{padding: 10px 10px; box-sizing: border-box;}
.tip{
  color: $red;
  height: $height - 8;
  font-size: 13px;
  line-height: 1em;
}
</style>
