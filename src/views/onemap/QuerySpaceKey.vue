<template>
  <el-form ref="querySpaceKeyForm"
           :model="form"
           label-width="80px">
    <el-form-item label="目标图层">
      <el-select size="small"
                 v-model="form.layers"
                 placeholder="请选择">
        <el-option v-for="item in searchArray.layers"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="关键字">
      <el-input size="small"
                v-model="form.key"
                placeholder="请输入内容-支持模糊搜索"
                clearable />
    </el-form-item>
    <el-form-item class="btn">
      <el-button type="primary"
                 :disabled="disabled"
                 size="mini"
                 class="btn_ok"
                 @click="onSearchQuery()">查询</el-button>
      <el-button size="mini"
                 class="btn_cancle"
                 @click="restart()">重置</el-button>
      <!--<el-button size="mini" class="btn_cancle">取消</el-button>-->
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'QuerySpaceKey',
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
  data() {
    return {
      searchArray: {
        layers: [{ label: '全部图层', value: 'all' }] // 目标图层

      },
      form: {
        layers: 'all', // 目标图层
        key: '' // 搜索输入框-模糊搜索
      },
      selectFlag: false,
      /** ********************查询属性**********************/
      // 查询图层i|j
      selectedLayerNames: [],
      attributeFilter: [],
      selectedFeatures: [],
      selectedCounts: []
    }
  },
  computed: {
    disabled() {
      if (this.form.key !== '') return false
      else return true
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initSelectedLayers()
    })
  },
  methods: {
    clearSpace() {
      this.form = {
        layers: 'all',
        key: ''
      }
    },
    initSelected() {
      this.selectedLayerNames = []
      this.attributeFilter = []
      this.selectedFeatures = []
      this.selectedCounts = []
    },
    initSelectedLayers() {
      this.searchArray.layers = [{ label: '全部图层', value: 'all' }]
      for (let i = 0; i < this.queryProps['layerVisible'].length; i++) {
        if (this.queryProps['layerVisible'][i].tabQuery && this.queryProps['layerVisible'][i].visible) {
          this.searchArray.layers.push({
            label: this.queryProps['layerVisible'][i].label,
            value: this.queryProps['layerVisible'][i].typeName
          })
        }
      }
    },
    restart() {
      this.$emit('clearData')
      this.$emit('clearLayer')
      this.$emit('clearDataShow')
      this.form.key = ''
      this.initSelected()
    },
    onSearchQuery() {
      if (!this.selectFlag) {
        this.$emit('setOperationType', 'query')
        this.$refs.querySpaceKeyForm.validate((valid) => {
          if (valid) {
            this.$emit('clearData')
            this.$emit('clearLayer')
            this.$emit('clearDataShow')
            this.initSelected()
            if (this.form.layers !== 'all') { // 单一图层
              let layers = this.form.layers
              this.selectedLayerNames.push(layers)
              let sql = ''
              for (let k = 0; k < this.queryProps[layers].sqlKeyWords.length; k++) {
                sql += ' or ' + this.queryProps[layers].sqlKeyWords[k] + ' like \'%' + this.form.key + '%\''
              }
              this.attributeFilter.push(this.queryProps[layers].attributeFilter + ' and (' + sql.substring(4) + ')')
            } else { // 图层组
              for (let i = 0; i < this.searchArray.layers.length; i++) {
                let layers = this.searchArray.layers[i].value
                if (layers !== 'all') {
                  this.selectedLayerNames.push(layers)
                  let sql = ''
                  for (let k = 0; k < this.queryProps[layers].sqlKeyWords.length; k++) {
                    sql += ' or ' + this.queryProps[layers].sqlKeyWords[k] + ' like \'%' + this.form.key + '%\''
                  }
                  this.attributeFilter.push(this.queryProps[layers].attributeFilter + ' and (' + sql.substring(4) + ')')
                }
              }
            }
            if (this.selectedLayerNames.length > 0) {
              this.$emit('changeLoading', true)
              this.selectFlag = true
              this.doSQLCountQuery(0)
            }
          } else {
            return false
          }
        })
      }
    },
    doSQLCountQuery(k) {
      let layer = this.queryProps[this.selectedLayerNames[k]]
      let queryObj = {
        'getFeatureMode': 'SQL',
        'datasetNames': [layer.datasetNames],
        'hasGeometry': false,
        'queryParameter': {
          attributeFilter: this.attributeFilter[k],
          fields: ['SMID']
        }
      }
      this.$http.post(this.baseProps['url_data'] + '/featureResults.rjson?returnContent=true&toIndex=-1',
        JSON.stringify(queryObj)).then((res) => {
          this.selectedCounts[k] = res.featureCount
          if (k < this.selectedLayerNames.length - 1) {
            this.doSQLCountQuery(k + 1)
          } else {
            this.doSQLQuery(0)
          }
        })
    },
    doSQLQuery(k) {
      let layer = this.queryProps[this.selectedLayerNames[k]]
      let fields = ['SMID', 'POPTITLE']
      for (let h = 0; h < layer.columnList.length; h++) {
        let tabFields = layer.columnList[h]
        let columnEName = (tabFields.columnEName).toUpperCase()
        fields.push(columnEName)
      }
      let getParameters = new SuperMap.GetFeaturesBySQLParameters({
        queryParameter: {
          attributeFilter: this.attributeFilter[k],
          orderBy: layer.sqlOrders,
          fields: fields
        },
        fromIndex: 0,
        toIndex: this.baseProps['pageSize'] - 1,
        datasetNames: [layer.datasetNames]
      })
      L.supermap
        .featureService(this.baseProps['url_data'])
        .getFeaturesBySQL(getParameters, (serviceResult) => {
          let features = serviceResult.result.features.features
          if (features) {
            this.selectedFeatures[k] = features
          }
          if (k < this.selectedLayerNames.length - 1) {
            this.doSQLQuery(k + 1)
          } else {
            this.selectFlag = false
            this.$emit('doQueryCompleted', this.selectedLayerNames, this.attributeFilter, this.selectedFeatures, this.selectedCounts)
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
$height: 32px;
$activeColor: #0080ff;
.el-form {
  padding-right: 10px;
  padding-left: 4px;
  box-sizing: border-box;
  margin-bottom: 15px;
}
/deep/ .el-form-item {
  height: $height;
  margin-bottom: 5px;
}
/deep/ .el-form-item__label {
  line-height: $height;
  color: #000;
  font-weight: normal;
}
/deep/ .el-form-item__error {
  padding-top: 0;
  margin-top: -2px;
}
.btn {
  margin-top: 15px;
  height: $height;
}
.btn_ok {
  min-width: 104px;
  height: $height;
  background-color: $activeColor;
  border-color: $activeColor;
}
.btn_cancle {
  width: 70px;
  height: $height;
}
/deep/ .el-radio,
/deep/ .el-input__inner {
  color: #000;
}
/deep/ .el-button--mini.btn_ok span,
/deep/ .el-button--mini.btn_cancle span {
  font-size: 15px;
}
</style>
