<template>
  <div class="dataTable" v-if="state">
      <div class="table-context">
        <!-- 右侧按钮 -->
        <div class="right">
          <el-button type="text" size="small" @click="toggleOnlyState(false)" >
            <svg-icon icon-class="mini"/>
          </el-button>
          <el-button type="text" size="small" @click="toMaximize()" >
            <svg-icon v-if="!max" icon-class="iconMax"/>
            <svg-icon v-else icon-class="iconMin"/>
          </el-button>
          <el-button v-if="!max" type="text" size="small" @click="toggle(false)"><svg-icon icon-class="iconClose"/></el-button>
        </div>
        <el-tabs ref="tabs" v-model="activeName">
          <el-tab-pane  v-for="(details, index) in tableData" :key="index" :label="details.label" :name="details.name">
            <div v-if="details.name != fileIndex" :style="`max-height: ${tableHeight}; height: ${tableHeight};`" class="scroll">
              <el-form v-if="details.data || details.data.length" ref="form" :model="tableForm" label-width="140px" size="mini" style="margin:0 30px 0 10px;">
              <el-form-item :label="item.label" v-for="(item, index) in details.data" :key="item.name + index">
                <el-input v-if="item.type === 'input'" :key="item.name" v-model="tableForm[item.name]" :placeholder="item[item.type] || '请输入'" />

                <el-select v-else-if="item.type === 'select'" :key="item.name" v-model="tableForm[item.name]" placeholder="请选择" style="width: 100%;">
                  <el-option v-for="(option, index) in item[item.type]" :key="index" :label="option.optionValue" :value="option.optionKey" />
                </el-select>
                <el-date-picker v-else-if="item.type === 'datetime'" :key="item.name" v-model="tableForm[item.name]" type="date" placeholder="选择日期">
                </el-date-picker>
                <div v-else-if="item.type === 'txt'" :title="item[item.type]">{{tableForm[item.name]}} - {{details.label}}</div> <!-- 自动生成-->
                <div v-else>{{item.type}} 尚未定义，请重新制作</div>

              </el-form-item>
            </el-form>
            </div>
            <!-- 开始提交 details.name=5 -->
            <div v-else :style="`max-height: ${tableHeight}; height: ${tableHeight};`" class="scroll">
            <el-upload
              class="upload-demo"
              :action="baseProps.url_fileUpLoad"
              :on-success="handleSuccess"
              :on-remove="handleRemove"
              :file-list="fileList"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
  </div>
</template>
<script>
import baseMixin from './baseMixin'
export default {
  name: 'GongChengEdit',
  mixins: [ baseMixin ],
  props: {
    // 最大化，否为默认状态
    maximize: {
      type: Boolean,
      required: true,
      default: false
    },
    height: {
      type: String,
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
  computed: {
    tableHeight () {
      const h = this.height
      return h.substring(0, (h.length - 2)) - 50 + 'px'
    }
  },
  data () {
    return {
      name: 'PdfIframe',
      max: this.maximize,
      typeName: 'project',
      feature: {},
      tableForm: {},
      activeName: '0',
      tableData: [], // 数据列表
      fileIndex: '',
      fileColumn: '',
      fileList: []
    }
  },
  created () {
  },
  methods: {
    toMaximize (val) {
      const value = this.formatStringToBoolean(val)
      if (value === undefined) this.max = !this.max
      else this.max = value
      this.$emit('maximize', { name: this.name, value: this.max })
    },
    initSelected () {
      this.feature = {}
      this.tableForm = {}
      this.activeName = '0'
      this.tableData = []
      this.fileIndex = ''
      this.fileColumn = ''
      this.fileList = []
      this.initTable()
    },
    initTable () {
      for (let i = 0; i < this.queryProps['layerVisible'].length; i++) {
        if (this.queryProps['layerVisible'][i].tabQuery && this.queryProps['layerVisible'][i].typeName.indexOf('project') > -1) {
          this.typeName = this.queryProps['layerVisible'][i].typeName
          break
        }
      }
      let tabInfoList = this.queryProps[this.typeName].tabInfoList
      for (let i = 0; i < tabInfoList.length; i++) {
        let tableColumns = []
        let tabFields = tabInfoList[i].tabFields
        for (let j = 0; j < tabFields.length; j++) {
          let columnEName = tabFields[j].columnEName.toUpperCase()
          let columnName = tabFields[j].columnName
          let dataType = tabFields[j].columnDataType // "1,2,3,4,5  文本，数字（整型),数字（双精度）,时间, 文件路径"
          let displayType = tabFields[j].columnDisplayType // 0,1  文本类型，字典类型
          let columnOptions = tabFields[j].columnOptions
          if (displayType === '1') { //  字典型
            tableColumns[j] = {
              label: columnName,
              name: columnEName,
              type: 'select',
              select: columnOptions // options
            }
            this.$set(this.tableForm, `${columnEName}`, columnOptions[0].optionKey)
          } else {
            if (dataType === '4') { // 时间
              tableColumns[j] = {
                label: columnName,
                name: columnEName,
                type: 'datetime',
                datetime: '' // 默认日期
              }
              this.$set(this.tableForm, `${columnEName}`, '')
            } else if (dataType === '5') { // 附件
              this.fileIndex = i.toString()
              this.fileColumn = columnEName
            } else { // 文本数字型
              tableColumns[j] = {
                label: columnName,
                name: columnEName,
                type: 'input',
                input: '' // 默认提示词
              }
              this.$set(this.tableForm, `${columnEName}`, '')
            }
          }
        }
        this.tableData[i] = {
          label: tabInfoList[i].tabName,
          name: i.toString(),
          data: tableColumns
        }
      }
    },
    onAdd (geometry) {
      this.$set(this.tableForm, 'N_ISUSE', 1)
      this.$set(this.tableForm, 'POPTITLE', this.tableForm['S_PROJECT_NAME'])
      this.$set(this.tableForm, this.fileColumn, JSON.stringify(this.fileList))
      geometry = geometry.toGeoJSON()
      geometry.properties = this.tableForm
      let layer = this.queryProps[this.typeName]
      let getParameters = new SuperMap.EditFeaturesParameters({
        dataSourceName: layer.datasetNames.split(':')[0],
        dataSetName: layer.datasetNames.split(':')[1],
        features: geometry,
        editType: 'add',
        returnContent: true
      })
      L.supermap
        .featureService(this.baseProps['url_data'])
        .editFeatures(getParameters, (serviceResult) => {
          if (serviceResult.result.succeed) {
            this.$emit('doEditCompleted', true, '保存成功！')
          } else {
            this.$emit('doEditCompleted', false, '保存失败！')
          }
        })
    },
    goEdit (typeName, id) {
      this.activeName = '0'
      this.typeName = typeName
      let layer = this.queryProps[this.typeName]
      let fields = ['SMID']
      for (let h = 0; h < layer.tabInfoList.length; h++) {
        let tabFields = layer.tabInfoList[h].tabFields
        for (let l = 0; l < tabFields.length; l++) {
          let columnEName = (tabFields[l].columnEName).toUpperCase()
          fields.push(columnEName)
        }
      }
      let getParameters = new SuperMap.GetFeaturesByIDsParameters({
        IDs: [id],
        fields: fields,
        datasetNames: [layer.datasetNames],
        returnContent: true
      })
      L.supermap
        .featureService(this.baseProps['url_data'])
        .getFeaturesByIDs(getParameters, (serviceResult) => {
          let features = serviceResult.result.features.features
          if (features && features.length > 0) {
            this.feature = features[0]
            for (let h = 0; h < layer.tabInfoList.length; h++) {
              let tabFields = layer.tabInfoList[h].tabFields
              for (let l = 0; l < tabFields.length; l++) {
                let columnEName = (tabFields[l].columnEName).toUpperCase()
                let dataType = tabFields[l].columnDataType // "1,2,3,4,5  文本，数字（整型),数字（双精度）,时间, 文件路径"
                let value = this.feature.properties[columnEName]
                if (dataType === '5' && value !== '') this.fileList = JSON.parse(value) // 附件
                else this.$set(this.tableForm, columnEName, value)
              }
            }
          }
        })
    },
    onDelete () {
      this.$set(this.feature.properties, 'N_ISUSE', 0)
      let layer = this.queryProps[this.typeName]
      let getParameters = new SuperMap.EditFeaturesParameters({
        dataSourceName: layer.datasetNames.split(':')[0],
        dataSetName: layer.datasetNames.split(':')[1],
        features: this.feature,
        IDs: [this.feature.id],
        editType: 'update',
        returnContent: true
      })
      L.supermap
        .featureService(this.baseProps['url_data'])
        .editFeatures(getParameters, (serviceResult) => {
          if (serviceResult.result.succeed) {
            this.$emit('doEditCompleted', true, '删除成功！')
          } else {
            this.$emit('doEditCompleted', false, '删除失败！')
          }
        })
    },
    onUpdate (geometry, editFlag) {
      this.$set(this.tableForm, 'N_ISUSE', 1)
      this.$set(this.tableForm, 'POPTITLE', this.tableForm['S_PROJECT_NAME'])
      this.$set(this.tableForm, this.fileColumn, JSON.stringify(this.fileList))
      if (editFlag) { // 有重新绘制
        geometry = geometry.toGeoJSON()
        geometry.properties = this.tableForm
        geometry.id = this.feature.id
      } else { // 无重新绘制
        this.feature.properties = this.tableForm
        geometry = this.feature
      }
      let layer = this.queryProps[this.typeName]
      let getParameters = new SuperMap.EditFeaturesParameters({
        dataSourceName: layer.datasetNames.split(':')[0],
        dataSetName: layer.datasetNames.split(':')[1],
        features: geometry,
        IDs: [this.feature.id],
        editType: 'update',
        returnContent: true
      })
      L.supermap
        .featureService(this.baseProps['url_data'])
        .editFeatures(getParameters, (serviceResult) => {
          if (serviceResult.result.succeed) {
            this.$emit('doEditCompleted', true, '修改成功！')
          } else {
            this.$emit('doEditCompleted', false, '修改失败！')
          }
        })
    },
    // 上传的方法
    handleRemove (file, fileList) {
      // console.log(file, fileList)
      this.fileList = []
      for (let i = 0; i < fileList.length; i++) {
        this.fileList.push({
          name: fileList[i].name,
          url: fileList[i].url
        })
      }
    },
    handleSuccess (response, file, fileList) {
      // console.log(response, file, fileList)
      this.fileList.push({
        name: file.name,
        url: this.baseProps.src_fileUpLoad + file.response.result.filePath
      })
    }
  }
}
</script>

<style lang="scss" scoped>
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
.dataTable {
  box-sizing: border-box;
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
.floatRight{
  color: #999;
  &.active{
    color: #409EFF;
  }
}
/deep/ .el-table__column-filter-trigger{
  display: none;
}
/deep/ .el-table th{ background-color: #2562bd !important; }
/deep/ .el-table{ font-size: 14px; }
/deep/ .el-table .caret-wrapper{ height: 23px; }
/deep/ .el-table .sort-caret.descending, /deep/ .el-table .sort-caret.descending{ border-top-color: #fff; }
.cell .svg-icon, .el-table /deep/ thead{ color: #fff;}
/deep/ .el-tabs__header{background:url('../../assets/images/contentTitle.png')}
/deep/ .el-tabs__item.is-active{color: #2562bd;background: #fff;}
/deep/ .el-tabs__item{color: #fff; font-weight: bolder;font-size: 15px; padding-left: 28px !important; padding-right: 28px !important;border-left:rgba($color: #fff, $alpha: 0.2) 1px solid; }
.table-context .right /deep/ .el-button--text span{color: #fff;}
/deep/ .el-tabs__active-bar.is-top{display: none;}
/deep/ .el-tabs__nav.is-top { border: none; border-right:rgba($color: #fff, $alpha: 0.2) 1px solid;}
/deep/ .el-tabs--card>.el-tabs__header .el-tabs__item{ border-left:rgba($color: #fff, $alpha: 0.2) 1px solid;}
.scroll{ overflow: scroll}
.el-form-item--mini.el-form-item{
  margin-bottom: 8px;
  color: #000;
  font-size: 13px;
  /deep/ label.el-form-item__label{
    font-weight: normal !important; color: #000;
  }
}
</style>
