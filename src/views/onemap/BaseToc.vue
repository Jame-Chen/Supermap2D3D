<template>
  <el-container v-if="state" class="border">
    <el-main class="inborder">
      <content-title icon="tuceng" :title="$route.name === 'onemap' ? '图层控制' : '数据目录'" @toggle="toggle" />
      <div class="content"> <!-- :check-strictly="true" -->
        <el-tree
            ref="tree"
            :data="layerData"
            show-checkbox
            node-key='typeName'
            :default-expanded-keys="defaultExpandedKeys"
            :default-checked-keys="defaultCheckedKeys"
            :auto-expand-parent="false"
            :props="defaultProps"
            :expand-on-click-node="false"
            @check="changeChecked">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span class='label' v-if="node.label.length < 8" :title="node.label">{{node.label}}</span>
              <span class='label' v-else :title="node.label">{{node.label.substring(0,8)+'...' }}</span>
              <span class="svg-img">
                <!-- 本地测试是用相对路径 -上面一个可以看到路径是否拼写正确；下面一个只能绑定一个，除非用require和@import -->
                <img v-if="data.icon === 'icon-hlg'" :src="srcArraycl['hlg']">
                <img v-if="data.icon === 'icon-ysbz'" :src="srcArraycl['ysbz']">
                <img v-if="data.icon === 'icon-wsbz'" :src="srcArraycl['wsbz']">
                <img v-if="data.icon === 'icon-hlbz'" :src="srcArraycl['hlbz']">
                <img v-if="data.icon === 'icon-ysj'" :src="srcArraycl['ysj']">
                <img v-if="data.icon === 'icon-wsj'" :src="srcArraycl['wsj']">
                <img v-if="data.icon === 'icon-hlj'" :src="srcArraycl['hlj']">
                <img v-if="data.icon === 'icon-ysg'" :src="srcArraycl['ysg']">
                <img v-if="data.icon === 'icon-wsg'" :src="srcArraycl['wsg']">
                <img v-if="data.icon === 'icon-ysk'" :src="srcArraycl['ysk']">
                <img v-if="data.icon === 'icon-wsc'" :src="srcArraycl['wsc']">
                <img v-if="data.icon === 'icon-pfk'" :src="srcArraycl['pfk']">
                <img v-if="data.icon === 'icon-psxt'" :src="srcArraycl['psxt']">
                <img v-if="data.icon === 'icon-sj'" :src="srcArraycl['sj']">
                <img v-if="data.icon === 'icon-sg'" :src="srcArraycl['sg']">
                <img v-if="data.icon === 'icon-wc'" :src="srcArraycl['wc']">
                <!-- <img src="../../../static/icon/icon-wsclc.png"> -->

                <!-- 线上的资源放在static中，用绝对路径，根据根目录来查找 -->
                <!-- <img v-if="data.icon" :src="`/vue-wavenet-ps/static/icon/${data.icon}.png`"> -->
              </span>
              <div class="right" title="数据表" v-show="data.tabQuery && data.type !== 'guihua'">
                <el-button
                  type="text"
                  size="mini"
                  @click="onclickLayer(node)">
                  <svg-icon style="color:#333;" icon-class="biaoge" />
                </el-button>
              </div>
              <div class="right" title="pdf" v-show="data.tabQuery && data.type === 'guihua'">
                <el-button
                  type="text"
                  size="mini"
                  @click="onclickLayerToPdf(node)">
                  <svg-icon style="color:#333;font-size: 18px;" icon-class="pdf" />
                </el-button>
              </div>
            </span>
          </el-tree>
      </div>
    </el-main>
  </el-container>
  <el-container v-else>
    <el-button  @click="toggle(true)" type="text" class="hideBtnR"><img :src="hideBtnR" alt="展开图层" srcset=""></el-button>
  </el-container>
</template>

<script>
import hideBtnR from '@/assets/images/hide_btn_r.png'
import baseMixin from './baseMixin'
export default {
  name: 'BaseToc',
  mixins: [baseMixin],
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
      name: 'BaseToc',
      hideBtnR: hideBtnR,
      /** ********************图层控制属性******************************/
      layerData: [], // 图层控制数据
      layerChecked: [], // 图层控制选中的
      defaultCheckedKeys: [], // 图层控制选中的
      defaultExpandedKeys: [],
      defaultProps: { // 图层控制数据-格式
        children: 'children',
        label: 'label'
      },
      srcArraycl: {
        // <img v-if="data.icon === 'icon-ysbz'" :src="srcArraycl['ysbz']">
        ysbz: require('../../assets/images/map/icon/icon-ysbz.png'),
        wsbz: require('../../assets/images/map/icon/icon-wsbz.png'),
        hlbz: require('../../assets/images/map/icon/icon-hlbz.png'),
        ysj: require('../../assets/images/map/icon/icon-ysj.png'),
        wsj: require('../../assets/images/map/icon/icon-wsj.png'),
        hlj: require('../../assets/images/map/icon/icon-hlj.png'),
        ysg: require('../../assets/images/map/icon/icon-ysg.png'),
        wsg: require('../../assets/images/map/icon/icon-wsg.png'),
        hlg: require('../../assets/images/map/icon/icon-hlg.png'),
        ysk: require('../../assets/images/map/icon/icon-ysk.png'),
        wsc: require('../../assets/images/map/icon/icon-wsc.png'),
        pfk: require('../../assets/images/map/icon/icon-pfk.png'),
        psxt: require('../../assets/images/map/icon/icon-psxt.png'),
        sj: require('../../assets/images/map/icon/icon-sj.png'),
        sg: require('../../assets/images/map/icon/icon-sg.png'),
        wc: require('../../assets/images/map/icon/icon-wc.png')
      },
      /** ********************查询属性**********************/
      selectedLayerNames: [],
      attributeFilter: [],
      selectedFeatures: [],
      selectedCounts: [],
      selectFlag: false,
      oldCount: 0,
      curCount: -1
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initLayers()
    })
  },
  methods: {
    initLayers () {
      this.layerData = this.baseProps['layers']
      this.defaultCheckedKeys = this.queryProps['defaultCheckedKeys']
      this.defaultExpandedKeys = this.queryProps['defaultExpandedKeys']
    },
    initSelected () {
      this.selectedLayerNames = []
      this.attributeFilter = []
      this.selectedFeatures = []
      this.selectedCounts = []
    },
    // 修改图层选择状态
    changeChecked (node, data) {
      // this.$emit('clearData')
      // this.$emit('clearLayer')
      // this.$emit('clearDataShow')
      let tempCheckedKeys = data.checkedKeys
      let halfCheckedKeys = data.halfCheckedKeys
      for (let i = 0; i < this.queryProps['layerVisible'].length; i++) {
        if (tempCheckedKeys.indexOf(this.queryProps['layerVisible'][i].typeName) >= 0 || halfCheckedKeys.indexOf(this.queryProps['layerVisible'][i].typeName) >= 0) this.queryProps['layerVisible'][i].visible = true
        else this.queryProps['layerVisible'][i].visible = false
      }
      this.$emit('setLayerStatus', tempCheckedKeys)
      // 修改tableFeature显示
      if (this.selectedLayerNames.length > 0) {
        let tempSelectedLayerNames = []
        let tempAttributeFilter = []
        let tempSelectedFeatures = []
        let tempSelectedCounts = []
        for (let i = 0; i < this.selectedLayerNames.length; i++) {
          if (tempCheckedKeys.indexOf(this.selectedLayerNames[i]) > -1) {
            tempSelectedLayerNames.push(this.selectedLayerNames[i])
            tempAttributeFilter.push(this.attributeFilter[i])
            tempSelectedFeatures.push(this.selectedFeatures[i])
            tempSelectedCounts.push(this.selectedCounts[i])
          }
        }
        if (tempSelectedLayerNames.length > 0 && tempSelectedLayerNames.length < this.selectedLayerNames.length) {
          this.$emit('clearData')
          this.$emit('clearLayer')
          this.$emit('clearDataShow', false)
          this.initSelected()
          this.selectedLayerNames = tempSelectedLayerNames
          this.attributeFilter = tempAttributeFilter
          this.selectedFeatures = tempSelectedFeatures
          this.selectedCounts = tempSelectedCounts
          this.$emit('doQueryCompleted', this.selectedLayerNames, this.attributeFilter, this.selectedFeatures, this.selectedCounts, this.oldCount - this.selectedLayerNames.length)
        } else if (tempSelectedLayerNames.length === 0) {
          this.$emit('clearData')
          this.$emit('clearLayer')
          this.$emit('clearDataShow', true)
          this.initSelected()
        }
      }
    },
    // 初始化查询字段
    getSelectedLayers (nodes) {
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].data.tabQuery) {
          if (this.selectedLayerNames.indexOf(nodes[i].data.typeName) > -1) { // 包含该元素
            this.curCount = this.selectedLayerNames.indexOf(nodes[i].data.typeName)
          } else {
            this.selectedLayerNames.push(nodes[i].data.typeName)
            let temp = ''
            if (nodes[i].childNodes.length > 0) {
              for (let j = 0; j < nodes[i].childNodes.length; j++) {
                if (!nodes[i].childNodes[j].checked) {
                  temp += ' and ' + nodes[i].data.childNoVisibleAttributeFilter[nodes[i].childNodes[j].data['typeName']]
                }
              }
            }
            this.attributeFilter.push(nodes[i].data.attributeFilter + temp)
          }
        }
        /**
        if (nodes[i].childNodes.length > 0) {
          this.getSelectedLayers(nodes[i].childNodes)
        }**/
      }
    },
    // 点击图层表格图标
    onclickLayer (node) {
      if (!this.selectFlag) {
        let flag = node.checked
        if (!flag) {
          for (let i = 0; i < node.childNodes.length; i++) {
            if (node.childNodes[i].checked) {
              flag = node.childNodes[i].checked
              break
            }
          }
        }
        if (flag) {
          this.$emit('clearData')
          this.$emit('clearLayer')
          this.$emit('clearDataShow', false)
          this.$emit('clearToggleShow')
          this.$emit('setOperationType', 'toc')
          // this.initSelected()
          this.oldCount = this.selectedLayerNames.length
          let nodes = []
          nodes[0] = node
          this.curCount = -1
          this.getSelectedLayers(nodes)
          if (this.selectedLayerNames.length > this.oldCount) {
            this.$emit('changeLoading', true)
            this.selectFlag = true
            this.doSQLCountQuery(this.oldCount)
          } else if (this.selectedLayerNames.length === this.oldCount && this.curCount > -1) {
            this.$emit('changeLoading', true)
            this.$emit('doQueryCompleted', this.selectedLayerNames, this.attributeFilter, this.selectedFeatures, this.selectedCounts, this.curCount)
          }
        } else {
          this.$emit('openMessage', '图层不可见!', 'error')
        }
      }
    },
    // 点击图层查看PDF
    onclickLayerToPdf (node) {
      if (node.checked) {
        this.$emit('clearData')
        this.$emit('clearLayer')
        this.$emit('clearDataShow')
        this.$emit('clearToggleShow')
        this.$emit('setOperationType', 'pdf')
        let pdf = {
          'src': node.data.src,
          'label': node.data.label
        }
        this.$emit('setGuiHuaPdf', pdf)
      } else {
        this.$emit('openMessage', '图层不可见!', 'error')
      }
    },
    doSQLCountQuery (k) {
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
        this.selectedCounts[k] = res.data.featureCount
        if (k < this.selectedLayerNames.length - 1) {
          this.doSQLCountQuery(k + 1)
        } else {
          this.doSQLQuery(this.oldCount)
        }
      })
    },
    doSQLQuery (k) {
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
            this.$emit('doQueryCompleted', this.selectedLayerNames, this.attributeFilter, this.selectedFeatures, this.selectedCounts, this.oldCount)
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
$borderColor: #142666;
.border{
  padding-top: 1px;
  box-sizing: border-box;
  // border-top: 1px solid #2e5c76;
  .inborder{
    border-right: 1px solid #202340;
    position: relative;
  }
}
.hideBtnR{
  height:100%;
  width: 5px;
  border: none;
  overflow: hidden;
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
  padding: 0;
}
/deep/ .el-checkbox:last-of-type{ margin-right: 8px; }
/deep/ .el-tree{padding-top: 12px;}
/deep/ .el-tree-node__content {
  position: relative;
  font-size: 14px;
  height: 30px;
  color: #000;
  align-items: baseline;
  /deep/ .custom-tree-node {
    height: 30px;
    display: block;
  }
}
/deep/ .el-checkbox__inner{ border-color: $borderColor; }
/deep/ .el-checkbox__inner:hover{ border-color: $borderColor; }
/deep/ .el-checkbox__input.is-checked ,/deep/ .el-checkbox__input.is-indeterminate{
  .el-checkbox__inner{
    background-color: transparent; border-color: $borderColor;
    &::after{ border-color: $borderColor; }
    &::before{ background-color: $borderColor; }
  }
}
.svg-img{
  margin-left: 6px;
}
.right{
  position: absolute;
  right: 10px;
  top: 0px;
}
</style>
