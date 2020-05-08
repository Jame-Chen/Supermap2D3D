<template>
 <el-container v-if="state" class="border">
    <el-main class="inborder">
      <content-title icon="xiangxixinxi" :showMiniBtn="false" title="设施详情" @toggle="toggle" />
      <div class="content-div" v-if="details.length">
        <el-collapse v-model="activeNames">
          <el-collapse-item v-for="(data, index) in details" :key="index" :name="String(index)">
            <template slot="title">
              <i class="header-icon el-icon-circle-plus-outline margin-10"></i><span class="txt-title">{{data.name}}</span>
            </template>
            <div v-if="index.toString() != fileIndex" class="padding-10">
              <div class="table-tr" v-for="(data, index) in data.data" :key="index">{{data.name}} : {{data.value}}</div>
            </div>
            <div v-else class="demo-image__preview">
              <el-image
                style="width: 100px; height: 100px"
                :src="file"
                :preview-src-list="fileList">
              </el-image>
            </div>
          </el-collapse-item>
        </el-collapse>
        <div v-if="leibie === 1 || leibie === 2" id="el-collapse-head-cl" tabindex="10000" class="el-collapse-item__header" @click="operation(leibie)">
          <i class="header-icon el-icon-circle-plus-outline margin-10"></i>
          <span class="txt-title" v-if="leibie === 1">泵站运行</span>
          <span class="txt-title" v-if="leibie === 2">管道检测</span>
        </div>
      </div>
      <div class="nodata" v-else>暂无数据</div>
    </el-main>
  </el-container>
</template>

<script>
import baseMixin from './baseMixin'
export default {
  name: 'DataDetails',
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
      name: 'DataDetails',
      activeNames: ['0', '1'],
      details: [], // 数据详情
      fileIndex: '',
      fileColumn: '',
      file: '',
      fileList: []
    }
  },
  computed: {
    leibie () {
      const arr = [{ str: '泵站', val: 1 }, { str: '系统', val: 2 }] // 井，排水长 和出水口 不做处理
      let name = null
      if (this.details.length && this.details[0].hasOwnProperty('data') && this.details[0].data.length) name = this.details[0].data[0].name
      if (name) {
        name = name.substring(2, (name.length - 2))
        for (let i in arr) {
          if (name === arr[i].str) {
            name = arr[i].val
            break
          }
        }
        if (typeof name !== 'number') name = false
      }
      return name
    }
  },
  methods: {
    showDetails (feature, typeName) {
      this.details = []
      if (feature) {
        let datas = []
        for (let h = 0; h < this.queryProps[typeName].tabInfoList.length; h++) {
          let tabFields = this.queryProps[typeName].tabInfoList[h].tabFields
          datas = []
          for (let l = 0; l < tabFields.length; l++) {
            let columnName = tabFields[l].columnName
            let columnEName = (tabFields[l].columnEName).toUpperCase()
            let columnDisplayType = tabFields[l].columnDisplayType
            let dataType = tabFields[l].columnDataType // "1,2,3,4,5  文本，数字（整型),数字（双精度）,时间, 文件路径"
            let columnOptions = tabFields[l].columnOptions
            let value
            if (feature.hasOwnProperty('fieldNames')) {
              let fieldNames = feature.fieldNames
              let fieldValues = feature.fieldValues
              for (let s = 0; s < fieldNames.length; s++) {
                if (columnEName === fieldNames[s]) value = fieldValues[s]
              }
            } else {
              value = feature.properties[columnEName]
            }
            if (columnDisplayType === '1') {
              for (let s = 0; s < columnOptions.length; s++) {
                if (value === columnOptions[s].optionKey) {
                  value = columnOptions[s].optionValue
                }
              }
            }
            if (dataType === '5' && value !== '') { // 附件
              this.fileIndex = h.toString()
              this.fileColumn = columnEName
              value = JSON.parse(value)
              if (value.length > 0) {
                this.file = value[0].url
                for (let i = 0; i < value.length; i++) {
                  this.fileList.push(value[i].url)
                }
              }
            }
            datas.push({
              'name': columnName,
              'value': value
            })
          }
          this.details.push({
            'name': this.queryProps[typeName].tabInfoList[h].tabName,
            'data': datas
          })
        }
      }
    },
    operation (val) {
      if (val) this.$emit('monitor', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.border{
  box-sizing: border-box;
  border: 1px solid #2e5c76;
  .inborder{
    border: 1px solid #202340;
    position: relative;
  }
}
.content{
  position: absolute;
  top: 40px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-x: hidden;
  overflow-y: auto;
  box-sizing: border-box;
  padding: 10px 0;
}
.content-div{
  position: absolute;
  top: 35px;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
  .txt-title{
    font-size: 15px;
  }
}
.margin-10{
  margin-left:10px;
  margin-right:4px;
  display: inline-block;
}
.padding-10{
  padding-left: 10px;
  padding-right: 10px;
  box-sizing: border-box;
}
/deep/ .el-collapse-item__header{background-color: #2562bd; line-height: 29px; padding: 0; margin: 0; color: #fff; height: auto; border-bottom: none;}
/deep/ .el-collapse-item__content{padding-bottom: 10px; padding-top: 5px; font-size: 14px; color: #000;}
/deep/ .el-collapse{border: none;}
.nodata{color: #aaa; font-size: 18px; text-align: center; padding-top:30px;}
.table-tr{border-bottom: 1px solid #ddd;line-height: 24px; padding: 6px 0;}
/deep/ .el-image-viewer__close{
  color: #fff;
  top: 100px;
}
</style>
