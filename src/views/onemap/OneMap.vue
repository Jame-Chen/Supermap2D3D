<template>
  <div class="oneMap">
    <component ref="oneMap" :is="activeName" :public="state" v-if="isVisible"
               :baseProps="baseProps"
               :queryProps="queryProps"
               :centerLonLat="centerLonLat"
               :zoom="zoom"
               :funType="funType"
               @toggleComponent="toggleComponent"
               @setState="setState"
               @changeLoading="changeLoading"
               @openMessage="openMessage"
               @setCheckedKeys="setCheckedKeys"/>
    <!-- <el-button class="btn" @click="toggleComponent">切换</el-button> -->
    <!-- <el-button class="btn" @click="setState({ name: 'aa', value: '12562'})">添加属性 {{state}}</el-button> -->
    <div class="spinner" v-if="loadingFlag">
      <div class="spinner-container container1">
        <div class="circle1"></div>
        <div class="circle2"></div>
        <div class="circle3"></div>
        <div class="circle4"></div>
      </div>
      <div class="spinner-container container2">
        <div class="circle1"></div>
        <div class="circle2"></div>
        <div class="circle3"></div>
        <div class="circle4"></div>
      </div>
      <div class="spinner-container container3">
        <div class="circle1"></div>
        <div class="circle2"></div>
        <div class="circle3"></div>
        <div class="circle4"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Index2D from './Index2D'
import Index3D from './Index3D'

const config = window.config
export default {
  name: 'OneMap',
  components: {
    Index2D,
    Index3D
  },
  data () {
    return {
      state: { test: '测试使用' }, //
      activeName: 'Index2D',
      compentsArray: ['Index2D', 'Index3D'],
      loadingFlag: false,
      isVisible: false,
      facilityConfig: [],
      layerConfig: {},
      defaultCheckedKeys: [],
      defaultExpandedKeys: [],
      layerVisible: [],
      baseProps: {},
      queryProps: {},
      centerLonLat: {},
      zoom: 1,
      isInitLayers: true,
      funType: 'sheshi'
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initConfig()
    })
  },
  methods: {
    // 切换2、3D维  组件
    toggleComponent (lonLat, zoom) {
      if (this.activeName === 'Index2D') this.activeName = 'Index3D'
      else this.activeName = 'Index2D'
      if (lonLat !== undefined) this.centerLonLat = lonLat
      if (zoom !== undefined) this.zoom = zoom
    },
    // 修改共有属性的信息 传参为{ name, value }
    setState (obj) {
      this.$set(this.state, obj.name, obj.value)
    },
    initConfig () {
      this.isVisible = false
      this.layerConfig = {}
      if (config.isuser) {
        this.$http.get(config.layer).then((res) => {
          // console.log(res)
          let configJson = JSON.parse(res.data.result.configJson)
          if (configJson.hasOwnProperty('baseMap')) this.layerConfig = configJson
          else this.layerConfig = window.layerConfig
          this.$http.get(config.facility).then((res) => {
            // console.log(res)
            let configJson1 = JSON.parse(res.data.result.configJson)
            if (configJson1.length > 0) this.facilityConfig = configJson1
            else this.facilityConfig = window.facilityConfig
            this.initProps()
          })
        })
      } else {
        this.layerConfig = window.layerConfig
        this.facilityConfig = window.facilityConfig
        this.initProps()
      }
    },
    // 初始化组件参数
    initProps () {
      this.baseProps = this.layerConfig.baseMap
      this.baseProps['dmSelectEnabledLayers_3d'] = config.dmSelectEnabledLayers_3d
      this.baseProps['dmSelectAlphaLayers_3d'] = config.dmSelectAlphaLayers_3d
      this.baseProps['dmUnVisibleLayers_3d'] = config.dmUnVisibleLayers_3d
      this.baseProps['bzSelectEnabledLayers_3d'] = config.bzSelectEnabledLayers_3d
      this.baseProps['wsSelectEnabledLayers_3d'] = config.wsSelectEnabledLayers_3d
      this.baseProps['qxSelectEnabledLayers_3d'] = config.qxSelectEnabledLayers_3d
      this.baseProps['dimianMap_3d'] = config.dimianMap_3d
      this.baseProps['bengzhanMap_3d'] = config.bengzhanMap_3d
      this.baseProps['wushuiMap_3d'] = config.wushuiMap_3d
      this.baseProps['qinxieMap_3d'] = config.qinxieMap_3d
      this.baseProps['bzPosition'] = config.bzPosition
      this.baseProps['wsPosition'] = config.wsPosition
      this.baseProps['qxPosition'] = config.qxPosition
      this.baseProps['twoPosition'] = config.twoPosition
      this.baseProps['bzLayers'] = config.bzLayers
      this.baseProps['bzTreeLayers'] = config.bzTreeLayers
      this.baseProps['flyFiles'] = config.flyFiles
      this.baseProps['imgVr'] = config.imgVr
      this.baseProps['videoVr'] = config.videoVr
      this.baseProps['pageSize'] = 10
      // 设施只取设施图层
      let layers = this.layerConfig.layers
      let tempLayers = []
      for (let i = 0; i < layers.length; i++) {
        if (layers[i].type === 'sheshi') {
          tempLayers = layers[i].children
        }
      }
      this.baseProps['layers'] = tempLayers
      this.initLayers(tempLayers)
      this.initLayers(config.qxLayers)
      this.initLayers(config.bzLayers)
      if (this.isInitLayers) {
        this.initVisibleLayers(tempLayers)
        this.queryProps['layerVisible'] = this.layerVisible
        this.queryProps['defaultCheckedKeys'] = this.defaultCheckedKeys
        this.queryProps['defaultExpandedKeys'] = this.defaultExpandedKeys
      }
      this.baseProps['geoMap'] = this.layerConfig.geoMap // 底图数组
      this.baseProps['geoMap_3d'] = this.layerConfig.geoMap_3d // 3D底图数组
      this.isVisible = true
    },
    // 初始化查询字段
    initLayers (layers, parentLabel) {
      for (let i = 0; i < layers.length; i++) {
        if (layers[i].tabQuery) {
          let layer = {}
          // 图层基本信息
          if (parentLabel !== undefined) layer['label'] = parentLabel + layers[i].label
          else layer['label'] = layers[i].label
          layer['layer'] = layers[i].layer
          layer['layer_3d'] = layers[i].layer_3d
          if (layers[i].datasetNames.indexOf(':') > -1) {
            layer['datasetNames'] = layers[i].datasetNames
            layer['datasetNames3d'] = layers[i].datasetNames
          } else {
            layer['datasetNames'] = this.baseProps['dataSourceName'] + ':' + layers[i].datasetNames
            layer['datasetNames3d'] = this.baseProps['dataSourceName3d'] + ':' + layers[i].datasetNames
          }
          layer['attributeFilter'] = layers[i].attributeFilter
          layer['childNoVisibleAttributeFilter'] = layers[i].childNoVisibleAttributeFilter
          layer['typeKeyWords'] = layers[i].typeKeyWords.keyWords
          // 字段信息
          let columnList = [] // 图层tab字段名称
          let simpleList = [] // 图层POP字段名称
          let tabInfoList = [] // 图层详情字段名称
          let sortList = [] // 图层sort关键字名称
          let sqlKeyWords = [] // 图层SQL查询关键字名称
          let sqlOrders = 'SMID' // 图层SQL查询排序名称
          for (let j = 0; j < this.facilityConfig.length; j++) {
            if (layers[i].typeName.indexOf(this.facilityConfig[j].typeName) > -1) {
              columnList = this.facilityConfig[j].tabColumns
              tabInfoList = this.facilityConfig[j].tabInfo
              simpleList = this.facilityConfig[j].popInfo
            }
          }
          for (let j = 0; j < columnList.length; j++) {
            if (columnList[j].isQuery === '1') {
              sqlKeyWords.push(columnList[j].columnEName)
            }
            if (columnList[j].isSort === '1') {
              sortList.push(columnList[j].columnEName)
            }
          }
          layer['columnList'] = columnList
          layer['simpleList'] = simpleList
          layer['tabInfoList'] = tabInfoList
          layer['sortList'] = sortList
          layer['sqlKeyWords'] = sqlKeyWords
          layer['sqlOrders'] = sqlOrders
          this.queryProps[layers[i].typeName] = layer
        }
        if (layers[i].hasOwnProperty('children') && layers[i].children.length > 0) {
          if (layers[i].typeName.indexOf('gw') > -1) this.initLayers(layers[i].children, layers[i].label.substring(0, 2))
          else this.initLayers(layers[i].children)
        }
      }
    },
    // 初始化查询字段
    initVisibleLayers (layers, parentLabel) {
      for (let i = 0; i < layers.length; i++) {
        let visible = layers[i].visible
        let label = layers[i].label
        if (parentLabel !== undefined) label = parentLabel + layers[i].label
        this.layerVisible.push({
          'sort': layers[i].sort,
          'typeName': layers[i].typeName,
          'type': layers[i].type,
          'visible': visible,
          'layer': layers[i].layer,
          'layer_3d': layers[i].layer_3d,
          'label': label,
          'icon': layers[i].icon,
          'tabQuery': layers[i].tabQuery,
          'typeKeyWords': layers[i].typeKeyWords.keyWords,
          'typeKeyWordValues': layers[i].typeKeyWords.value,
          'datasetNames': layers[i].datasetNames
        })
        if (layers[i].visible) {
          this.defaultCheckedKeys.push(layers[i].typeName)
        }
        this.defaultExpandedKeys.push(layers[i].typeName)
        if (layers[i].hasOwnProperty('children') && layers[i].children.length > 0) {
          if (layers[i].typeName.indexOf('gw') > -1) this.initVisibleLayers(layers[i].children, layers[i].label.substring(0, 2))
          else this.initVisibleLayers(layers[i].children)
        }
      }
    },
    setCheckedKeys (tempCheckedKeys, tempLayerVisible) {
      if (tempCheckedKeys.length > 0) {
        this.queryProps['defaultCheckedKeys'] = tempCheckedKeys
        this.queryProps['layerVisible'] = tempLayerVisible
        this.isInitLayers = false
      } else {
        this.isInitLayers = true
      }
    },
    changeLoading (flag) {
      this.loadingFlag = flag
    },
    openMessage (message, val) { // success/warning/info/error , 绿桔灰红
      if (val === '') val = 'info'
      this.$message({
        message: message,
        type: val,
        center: true,
        duration: 5000,
        showClose: true,
        offset: window.innerHeight / 2
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../styles/loading.css';
.oneMap{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
}
.btn{
  position: absolute;
  top: 200px;
  left: 300px;
  width: 100px;
  z-index: 9999;
}
/deep/ .onemap .leaflet-popup-content{
  margin: 0 0 13px 0;
  .mapPop{
    line-height: 21px;
    font-size: 16px;
    min-width: 250px;
    .table td{
      font-size: 14px;
      color: #000;
      padding: 0 10px;
      line-height: 21px;
    }
    .table td:first-child{
      text-align: left;
      padding-right: 0;
    }
  }
  .mapPopTitle{
    display: block;
    background: url('../../assets/images/contentTitleR.png') repeat-y;
    background-position: right center;
    color: #fff;
    line-height: 32px;
    height: 32px;
    padding: 0 8px;
    position: relative;
    margin-bottom: 10px;
    .rightBtn{
      position: absolute;
      right: 0;
      top: 0;
      height: 32px;
    }
    .btn{
      box-sizing: border-box;
      height: 32px;
      line-height: 32px;
      padding: 0 8px;
      margin-right: 2px;
      &:hover{cursor: pointer;}
    }
  }
}
</style>
