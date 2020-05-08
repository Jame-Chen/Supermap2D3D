<template>
  <el-container>
    <!-- 左侧图层控制 -->
    <transition name="el-fade-in">
      <el-aside :width="state.BaseToc ? '230px' : '5px'">
        <base-toc ref="baseToc"
                  :show="state.BaseToc"
                  :type="mapType"
                  @toggle="toggle"
                  :baseProps="baseProps"
                  :queryProps="queryProps"
                  @setOperationType="setOperationType"
                  @changeLoading="changeLoading"
                  @openMessage="openMessage"
                  @clearData="clearData"
                  @clearLayer="clearLayer"
                  @clearDataShow="clearDataShow"
                  @clearToggleShow="clearToggleShow"
                  @setLayerStatus="setLayerStatus"
                  @doQueryCompleted="doQueryCompleted"
                  @setGuiHuaPdf="setGuiHuaPdf" />
        <!-- 暴露给其他对象切换的方法 -->
        <!-- <div style="position: fixed; bottom: 0; left: 0;" @click="$refs.baseToc.toggle()">切换</div> -->
      </el-aside>
    </transition>
    <!-- 右侧容器 -->
    <!-- main内容 VR 二三维地图 地图右侧详情和功能模块 -->
    <el-main ref="main">
      <!-- 地图部分 -->
      <div id="box"
           ref="box">
        <div id="onemap"
             ref="onemap"
             class="onemap">
          <img :src="imgCompass"
               id="compass"
               ref="compass"
               class="compass">
          <img :src="imgLegend"
               id="legend"
               ref="legend"
               class="imgLegend">
          <map-legend ref="mapLegend"
                      :show="state.MapLegend" />
        </div>
        <div ref="vrhd"
             v-if="state.VRimg.value && state.VRimg.name!=='' && state.VRimg.name!==undefined"
             class="quanpingvr">
          <srcIframe :src="`${state.VRimg.url}?laber=${state.VRimg.name}`"
                     @closeVr="state.VRimg.value = !state.VRimg.value"
                     width="100%"
                     :height="$store.state.app.heightAppMain+'px'" />
        </div>
        <div ref="vrvideo"
             v-if="state.VRvideo.value && state.VRvideo.time!=='' && state.VRvideo.time!==undefined && state.VRvideo.name!=='' && state.VRvideo.name!==undefined"
             class="quanpingvr">
          <srcIframe :src="`${state.VRvideo.url}${state.VRvideo.name}.html?time=${state.VRvideo.time}`"
                     @closeVr="state.VRvideo.value = !state.VRvideo.value"
                     width="100%"
                     :height="$store.state.app.heightAppMain+'px'" />
        </div>
        <div ref="vrbz"
             v-if="state.VR.value"
             class="quanpingvr">
          <srcIframe :src="state.VR.url"
                     @closeVr="state.VR.value = !state.VR.value"
                     width="100%"
                     :height="$store.state.app.heightAppMain+'px'" />
        </div>
      </div>
      <base-tools-bar ref="baseToolsBar"
                      :type="mapType"
                      :funType="funType"
                      @toolBtn="toolBtn" />
      <!-- 切换2/3D按钮 -->
      <!-- <el-button class="btn" @click="toggleComponent">切换2/3D</el-button>  state.DataTable -->

      <base-maps :baseProps="baseProps"
                 @setMapStatus="setMapStatus" />
      <!-- 地图右侧功能入口 -->
      <advance-tools ref="advanceTools"
                     :type="mapType"
                     @toolBtn="toolBtn" />
      <!-- 地图右侧模块 -->
      <div class="mapRighr"
           :show="mapRighr"
           :style="!state.DataDetails ? 'height:auto' : (state.DataTable) ? 'bottom: 240px' : 'bottom: 0'">
        <div class="maprightContent">
          <!-- 设施详情 -->
          <data-details ref="dataDetails"
                        :show="state.DataDetails"
                        @toggle="toggle"
                        :baseProps="baseProps"
                        :queryProps="queryProps"
                        @monitor="monitor" />

          <!-- 空间查询 -->
          <query-space ref="querySpace"
                       :show="state.QuerySpace"
                       :type="mapType"
                       @toggle="toggle"
                       @toggleRightMiniStatus="toggleRightMiniStatus"
                       :baseProps="baseProps"
                       :queryProps="queryProps"
                       @changeLoading="changeLoading"
                       @setOperationType="setOperationType"
                       @clearData="clearData"
                       @clearLayer="clearLayer"
                       @clearDataShow="clearDataShow"
                       @openMessage="openMessage"
                       @drawGeometry="drawGeometry"
                       @drawBuffer="drawBuffer"
                       @doQueryCompleted="doQueryCompleted" />
          <!-- 网络追溯 -->
          <space-traceability ref="spaceTraceability"
                              :show="state.SpaceTraceability"
                              @toggle="toggle"
                              @toggleRightMiniStatus="toggleRightMiniStatus"
                              :baseProps="baseProps"
                              :queryProps="queryProps"
                              @changeLoading="changeLoading"
                              @clearData="clearData"
                              @clearLayer="clearLayer"
                              @clearEchartsLayer="clearEchartsLayer"
                              @clearDataShow="clearDataShow"
                              @setDrawOnclickFlag="setDrawOnclickFlag"
                              @doQueryCompleted="doQueryCompleted" />
          <!-- 断面分析 -->
          <space-section-analysis ref="spaceSectionAnalysis"
                                  :show="state.SpaceSectionAnalysis"
                                  @toggle="toggle"
                                  @toggleRightMiniStatus="toggleRightMiniStatus"
                                  :baseProps="baseProps"
                                  :queryProps="queryProps"
                                  @changeLoading="changeLoading"
                                  @openMessage="openMessage"
                                  @clearData="clearData"
                                  @clearLayer="clearLayer"
                                  @clearEchartsLayer="clearEchartsLayer"
                                  @clearDataShow="clearDataShow"
                                  @setDrawOnclickFlag="setDrawOnclickFlag"
                                  @doQueryCompleted="doQueryCompleted" />
          <!-- 编辑工具 -->
          <map-edit ref="mapEdit"
                    :show="state.MapEdit"
                    :type="mapType"
                    @toggle="toggle"
                    @toggleRightMiniStatus="toggleRightMiniStatus"
                    @onEdit="onEdit"
                    @mapEditClick="mapEditClick" />

          <!-- 测量 -->
          <space-measure ref="spaceMeasure"
                         :show="state.SpaceMeasure"
                         :type="mapType"
                         @toggle="toggle"
                         @toggleRightMiniStatus="toggleRightMiniStatus"
                         @startMeasure="startMeasure" />
          <!-- 打印 -->
          <map-print ref="mapPrint"
                     :show="state.MapPrint"
                     @toggle="toggle"
                     @toggleRightMiniStatus="toggleRightMiniStatus"
                     @canvas="canvas"
                     @changeControl="changeControl" />
          <!-- 规划分析 -->
          <gui-hua-analysis ref="guiHuaAnalysis"
                            :show="state.GuiHuaAnalysis"
                            @toggle="toggle"
                            @toggleRightMiniStatus="toggleRightMiniStatus"
                            @guiHuaAnalysis="guiHuaAnalysis" />

          <!-- 暴露给其他对象切换的方法 -->
          <!-- <div style="position: fixed; top: 50px; right: 0; background-color:#fff" @click="$refs.querySpace.toggle()">切换</div> -->
        </div>
      </div>
      <div class="footTable"
           ref="footTable"
           v-show="!maximize.map && (state.DataTable || state.GongChengEdit || state.PdfIframe)"
           :style="footerHeight === '100%' ? 'height: 100%' : `height: ${footerHeight}`">
        <data-table ref="dataTable"
                    :show="state.DataTable"
                    @toggle="toggle"
                    @maximize="toMaximize"
                    @toggleOnlyState="toggleOnlyState"
                    :height="footTableHeight"
                    :maximize="maximize.DataTable"
                    :baseProps="baseProps"
                    :queryProps="queryProps"
                    @changeLoading="changeLoading"
                    @openMessage="openMessage"
                    @clearDataShow="clearDataShow"
                    @doDrawChangeResults="doDrawChangeResults"
                    @drawDetails="drawDetails" />
        <!-- 工程管理的编辑页面，底部 -->
        <gong-cheng-edit ref="gongChengEdit"
                         :show="state.GongChengEdit"
                         @toggle="toggle"
                         @maximize="toMaximize"
                         @toggleOnlyState="toggleOnlyState"
                         :height="footTableHeight"
                         :maximize="maximize.DataTable"
                         :baseProps="baseProps"
                         :queryProps="queryProps"
                         @doEditCompleted="doEditCompleted" />
        <!-- 规划PDF查看页面，底部 -->
        <pdf-iframe ref="pdfIframe"
                    :show="state.PdfIframe"
                    @toggle="toggle"
                    @maximize="toMaximize"
                    @toggleOnlyState="toggleOnlyState"
                    :height="(footTableHeight === '240px')?guihuaHeight:footTableHeight"
                    :maximize="maximize.DataTable"
                    :pdf="guiHuaPdf" />
        <!-- 暴露给其他对象切换的方法 -->
        <!-- <div style="position: fixed; bottom: 0; right: 0;" @click="$refs.dataTable.toggle()">切换</div> -->
      </div>
      <div class="footHidden"
           v-show="stateChange.active && !(!maximize.map && (state.DataTable || state.GongChengEdit || state.PdfIframe))"
           @click="toggleOnlyState()"
           style="cursor:pointer;">
        <img src="../../assets/images/hide_btn_t.png"
             alt="展开">
      </div>
      <el-button v-show="rightMiniStatus.show"
                 @click="toggleRightMiniStatus()"
                 type="text"
                 class="rightHidden">
        <img src="../../assets/images/hide_btn_r.png"
             alt="展开">
      </el-button>
      <monitor-pipe v-if="state.MonitorPipe"
                    @toggle="toggle" />
      <monitor-pump v-if="state.MonitorPump"
                    @toggle="toggle" />
    </el-main>
  </el-container>
</template>

<script>
import BaseToc from './BaseToc.vue'
import BaseToolsBar from './BaseToolsBar.vue'
import DataTable from './DataTable.vue'
import DataDetails from './DataDetails.vue'
import QuerySpace from './QuerySpace.vue'
import SpaceTraceability from './SpaceTraceability.vue'
import SpaceSectionAnalysis from './SpaceSectionAnalysis.vue'
import SpaceMeasure from './SpaceMeasure.vue'
import MapPrint from './MapPrint.vue'
import MonitorPipe from './MonitorPipe.vue'
import MonitorPump from './MonitorPump.vue'
import AdvanceTools from './AdvanceTools.vue'
import MapLegend from './MapLegend.vue'
import BaseMaps from './BaseMaps.vue'
import GongChengEdit from './GongChengEdit.vue'
import MapEdit from './MapEdit.vue'
import PdfIframe from './PdfIframe.vue'
import GuiHuaAnalysis from './GuiHuaAnalysis.vue'

import L from 'leaflet'
import '@supermap/iclient-leaflet'
import srcIframe from './srcIframe.vue'
import html2canvas from 'html2canvas'
export default {
  name: 'Index2D',
  mixins: [],
  components: {
    BaseToc,
    BaseToolsBar,
    DataTable,
    DataDetails,
    QuerySpace,
    SpaceTraceability,
    SpaceSectionAnalysis,
    SpaceMeasure,
    MapPrint,
    MonitorPipe,
    MonitorPump,
    MapLegend,
    AdvanceTools,
    BaseMaps,
    GongChengEdit,
    MapEdit,
    PdfIframe,
    GuiHuaAnalysis,
    srcIframe
  },
  props: {
    public: {
      type: Object,
      required: true
    },
    baseProps: {
      type: Object,
      required: true
    },
    queryProps: {
      type: Object,
      required: true
    },
    centerLonLat: {
      type: Object,
      required: true
    },
    zoom: {
      type: Number,
      required: true
    },
    funType: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      state: {
        BaseToc: true, // 左侧图层目录结构
        BaseToolsBar: true, // 工具条
        MapLegend: false, // 图例
        BasePop: false, // 地图气泡
        DataTable: false, // 下方表格
        DataDetails: false, // 设施详情
        QuerySpace: false, // 空间查询
        SpaceTraceability: false, // 网络追溯
        SpaceSectionAnalysis: false, // 断面分析
        SpaceMeasure: false, // 测量
        MapPrint: false, // 打印截图
        Is2D: true, // 2d 为真，3d为假
        VR: { value: false, name: '', url: '' }, // VR 的value值 和 路径/名称
        VRimg: { value: false, name: '', url: '' }, // VR河道 的value值 和 路径/名称
        VRvideo: { value: false, time: '', name: '', url: '' }, // VR河道 的value值 视频名称VID_20190905_111343 和 秒数12
        MonitorPump: false, // 泵站运行
        MonitorPipe: false, // 管网监测
        GongChengEdit: false, // 工程管理的编辑
        MapEdit: false, // 编辑工具
        PdfIframe: false, // PDF显示页面
        GuiHuaAnalysis: false // 规划分析页面
      },
      stateChange: { active: false }, // 存储最小化的改变量
      maximize: {
        DataTable: false,
        GongChengEdit: false,
        PdfIframe: false,
        map: false
      },
      footTableHeight: '240px', // 获取及时的底部footTable值
      guihuaHeight: '240px',
      mapType: '2d',
      mapImgURL: '',
      imgCompass: '../../assets/images/map/compass.png',
      imgLegend: '../../assets/images/map/legend.png',
      editFlag: false,
      /** ********************地图属性****************************/
      map: {},
      mapLayerGroup: [],
      layerGroup: [],
      guiLayerGroup: [],
      scale: {},
      scaleDenominators: [900000, 400000, 200000, 100000, 50000, 20000,
        10000, 5000, 2000, 1000, 500],
      bufferDis: [1000, 500, 300, 200, 100, 2,
        2, 2, 2, 2, 2],
      popup: null,
      drawLayer: {}, // 绘制图层
      buffLayer: {}, // 缓冲区图层
      detailsListLayer: {}, // 高亮显示查询结果图层
      detailsLayer: {}, // 高亮显示详情图层
      echartsLayer: {}, // echarts图层，动画
      vrLayer: {},
      drawType: '', // 几何类型
      measureType: '', // 量算类型
      points: [],
      line: {},
      tempLine: {},
      polygon: {},
      rectangle: {},
      circleCenter: {},
      circle: {},
      drawStyle: {        radius: 1,
        color: '#57fc00',
        fillColor: '#ff6600',
        fillOpacity: 0.5
      },
      geometry: null,
      // 操作flag
      operationType: '',
      sectionStartId: '',
      analysisType: '',
      drawOnclickFlag: true,
      mapData: [],
      oldCheckedKeys: [],
      oldCheckedIDs: [],
      /** ********************查询属性**********************/
      selectedLayerNames: [],
      attributeFilter: [],
      selectedFeatures: [],
      selectedCounts: [],
      /** ***************规划************************/
      guiHuaPdf: {},
      guiHuaTime: null,
      /** **************地图右侧某些模块最小化************************/
      rightMiniStatus: { show: false, names: [] }
    }
  },
  mounted() {
    // 使用nextTick为了保证dom元素都已经渲染完毕
    this.$nextTick(() => {
      this.removeKeyCodeNotify()
      // 初始化地图
      this.createMap()
    })
  },
  computed: {
    footerHeight() {
      if (this.maximize.DataTable || this.maximize.GongChengEdit) return '100%'
      else if (this.maximize.PdfIframe) return '100%'
      else return '240px'
    },
    mapRighr() {
      return this.state.DataDetails || this.state.QuerySpace || this.state.SpaceTraceability || this.state.SpaceSectionAnalysis || this.state.MapEdit
    }
  },
  methods: {
    removeKeyCodeNotify() {
      this.$notify.closeAll()
    },
    // 初始化结果
    initSelected() {
      this.selectedLayerNames = []
      this.attributeFilter = []
      this.selectedFeatures = []
      this.selectedCounts = []
    },
    // 初始化数据
    clearData() {
      this.initSelected()
    },
    // 清除图层标绘
    clearLayer(drawFlag) {
      if (drawFlag === undefined || drawFlag) this.clearFeature(this.drawLayer)
      this.clearFeature(this.buffLayer)
      this.clearFeature(this.detailsLayer)
      this.clearFeature(this.detailsListLayer)
      this.clearGuiHuaMap()
      this.$refs.legend.style.display = 'none'
      if (this.popup !== null) this.popup.remove()
      this.popup = null
    },
    // 清除图层标绘
    clearEchartsLayer() {
      if (this.echartsLayer && this.map.hasLayer(this.echartsLayer)) this.map.removeLayer(this.echartsLayer)
    },
    // 清除查询组件条件
    clearSpace() {
      if (this.state.QuerySpace) this.$refs.querySpace.clearSpace()
      if (this.state.SpaceTraceability) this.$refs.spaceTraceability.clearSpace()
      if (this.state.SpaceSectionAnalysis) this.$refs.spaceSectionAnalysis.clearSpace()
    },
    // 关闭数据显示组件
    clearDataShow(flag) {
      if (flag === undefined || flag) this.$refs.dataTable.toggle(false)
      this.$refs.dataDetails.toggle(false)
    },
    // 关闭所有子组件
    clearToggleShow() {
      this.$refs.querySpace.toggle(false)
      this.$refs.spaceSectionAnalysis.toggle(false)
      this.$refs.spaceTraceability.toggle(false)
      this.$refs.spaceMeasure.toggle(false)
      this.$refs.mapPrint.toggle(false)
      this.$refs.mapEdit.toggle(false)
      this.$refs.guiHuaAnalysis.toggle(false)
      this.clearGuihuaShow()
      this.clearGongChengShow()
    },
    clearGuihuaShow() {
      this.$refs.pdfIframe.toggle(false)
    },
    clearGongChengShow() {
      this.$refs.gongChengEdit.toggle(false)
    },
    // 消息提醒弹窗
    openMessage(message, val) { // success/warning/info/error
      this.$emit('openMessage', message, val)
    },
    changeLoading(flag) {
      this.$emit('changeLoading', flag)
    },
    /** **********************创建地图********************************/
    // 初始化地图
    createMap() {

      let crs = L.Proj.CRS('EPSG:4326', {
        origin: this.baseProps['mapCenter'],
        scaleDenominators: this.scaleDenominators
      })
      let lon = this.baseProps['mapCenter'][1]
      let lat = this.baseProps['mapCenter'][0]
      if (this.centerLonLat.lng !== undefined && this.centerLonLat.lat !== undefined) {
        lon = this.centerLonLat.lng.toFixed(5)
        lat = this.centerLonLat.lat.toFixed(5)
      }
      this.map = L.map('onemap', {
        crs: crs,
        center: [lat, lon],
        zoom: this.zoom,
        minZoom: 0,
        maxZoom: 11,
        zoomControl: false,
        logoControl: false,
        attributionControl: false,
        doubleClickZoom: false,
        closePopupOnClick: false,
        scrollWheelZoom: true,
        dragging: true,
        detectRetina: true,
        enableHighAccuracy: true
      })
      this.map.options.closePopupOnClick = false
      this.map.options.dragging = true
      this.scale = L.control.scale({
        metric: true,
        imperial: false
      })
      this.map.addControl(this.scale)
      this.mapData = this.baseProps['geoMap']
      this.mapLayerGroup = L.layerGroup([])
      this.mapLayerGroup.addTo(this.map)
      this.layerGroup = L.layerGroup([])
      this.layerGroup.addTo(this.map)
      this.guiLayerGroup = L.layerGroup([])
      this.guiLayerGroup.addTo(this.map)
      this.addMapLayer()
      this.addLayer()
      // 添加标记图层
      this.drawLayer = L.featureGroup([])
      this.drawLayer.addTo(this.map)
      this.buffLayer = L.featureGroup([])
      this.buffLayer.addTo(this.map)
      this.detailsListLayer = L.featureGroup([])
      this.detailsListLayer.addTo(this.map)
      this.detailsLayer = L.featureGroup([])
      this.detailsLayer.addTo(this.map)
      this.vrLayer = L.featureGroup([])
      this.vrLayer.addTo(this.map)
      // 鼠标点击事件
      this.map.on('click', (e) => {
        if (this.drawType === '') this.doOnclickQuery(e)
        else if (this.drawType === 'point') this.drawPoint(e)
        else if (this.drawType === 'line') this.drawLineStart(e)
        else if (this.drawType === 'polygon') this.drawPolygonStart(e)
      })
      // 鼠标按下事件
      this.map.on('mousedown', (e) => {
        if (this.drawType === 'rectangle') {
          this.map.dragging.disable()
          this.drawRectangleStart(e)
        } else if (this.drawType === 'circle') {
          this.map.dragging.disable()
          this.drawCircleStart(e)
        }
      })
      // 鼠标移动事件
      this.map.on('mousemove', (e) => {
        if (this.drawType === 'line') this.drawLineProcess(e)
        else if (this.drawType === 'polygon') this.drawPolygonProcess(e)
        else if (this.drawType === 'rectangle') this.drawRectangleProcess(e)
        else if (this.drawType === 'circle') this.drawCircleProcess(e)
      })
      // 鼠标释放事件
      this.map.on('mouseup', (e) => {
        if (this.drawType === 'rectangle') {
          this.drawRectangleEnd(e)
          this.map.dragging.enable()
        } else if (this.drawType === 'circle') {
          this.drawCircleEnd(e)
          this.map.dragging.enable()
        }
      })
      // 鼠标双击事件
      this.map.on('dblclick', (e) => {
        if (this.drawType === 'line') this.drawLineEnd(e)
        else if (this.drawType === 'polygon') this.drawPolygonEnd(e)
      })
      // 打开pop事件
      this.map.on('popupopen', (e) => {
        setTimeout(() => {
          if (document.getElementById('popOpen')) {
            document.getElementById('popOpen').addEventListener('click', (e1) => {
              this.showDetails(document.getElementById('featureId').innerHTML)
            })
          }
          if (document.getElementById('popClose')) {
            document.getElementById('popClose').addEventListener('click', (e1) => {
              e.popup.remove()
              this.$refs.dataDetails.toggle(false)
              this.clearFeature(this.detailsLayer)
              if (this.operationType === '' || this.operationType === 'edit') this.clearData()
            })
          }
        }, 1000)
      })
      // 关闭pop事件
      this.map.on('popupclose', (e) => {
        this.clearFeature(this.detailsLayer)
      })
    },
    addMapLayer() {
      for (let i = 0; i < this.mapData.length; i++) {
        if (this.mapData[i].visible) {
          let mapLayer = L.supermap.tiledMapLayer(this.mapData[i].url_map, {
            maxZoom: 12,
            zoomReverse: true,
            zIndex: 1
          })
          this.mapLayerGroup.addLayer(mapLayer)
          break
        }
      }
      console.log('this.mapLayerGroup', this.mapLayerGroup);
    },
    setMapStatus(mapData, value) {
      this.mapData = mapData
      if (value === 'panorama') { // 实景
        for (let i = 0; i < this.mapData.length; i++) {
          if (this.mapData[i].typeName === value) {
            this.clearFeature(this.vrLayer)
            this.map.closePopup()
            if (this.mapData[i].visible) {
              this.addImgVR()
            }
            break
          }
        }
      } else if (value === 'video') { // 视频
        for (let i = 0; i < this.mapData.length; i++) {
          if (this.mapData[i].typeName === value) {
            this.clearFeature(this.vrLayer)
            this.map.closePopup()
            if (this.mapData[i].visible) {
              this.addVideoVR()
            }
            break
          }
        }
      } else {
        for (let i = 0; i < this.mapData.length; i++) {
          if (this.mapData[i].visible) {
            let mapLayer = L.supermap.tiledMapLayer(this.mapData[i].url_map, {
              maxZoom: 12,
              zoomReverse: true,
              zIndex: 1
            })
            this.mapLayerGroup.addLayer(mapLayer)
            break
          }
        }
      }
    },
    addLayer() {
      this.oldCheckedKeys = []
      this.oldCheckedIDs = []
      let layers = this.queryProps['layerVisible']
      let zIndex = layers.length + 2
      for (let i = 0; i < layers.length; i++) {
        if (layers[i].visible && layers[i].layer !== '') {
          let layer = L.supermap.tiledMapLayer(this.baseProps['url_map'] + layers[i].layer, {
            transparent: true,
            cacheEnabled: false,
            redirect: false,
            maxZoom: 12,
            zoomReverse: true,
            zIndex: zIndex - i
          })
          this.oldCheckedKeys.push(layers[i].typeName)
          this.layerGroup.addLayer(layer)
        }
      }

      this.layerGroup.eachLayer((layer) => {
        this.oldCheckedIDs.push(this.layerGroup.getLayerId(layer))
      })
    },
    // 修改图层显示状态
    setLayerStatus(tempCheckedKeys) {
      let temp = []
      // 删除反选的图层
      for (let i = 0; i < this.oldCheckedKeys.length; i++) {
        if (tempCheckedKeys.indexOf(this.oldCheckedKeys[i]) < 0) {
          let j = this.oldCheckedKeys.indexOf(this.oldCheckedKeys[i])
          this.layerGroup.removeLayer(this.oldCheckedIDs[j])
        } else {
          temp.push(this.oldCheckedKeys[i])
        }
      }
      // 添加新选的图层
      for (let i = 0; i < tempCheckedKeys.length; i++) {
        if (temp.indexOf(tempCheckedKeys[i]) < 0) {
          let layers = this.queryProps['layerVisible']
          let zIndex = layers.length + 2
          for (let j = 0; j < layers.length; j++) {
            if (layers[j].visible && layers[j].layer !== '') {
              if (layers[j].typeName === tempCheckedKeys[i]) {
                let layer = L.supermap.tiledMapLayer(this.baseProps['url_map'] + layers[j].layer, {
                  transparent: true,
                  cacheEnabled: false,
                  redirect: false,
                  maxZoom: 12,
                  zoomReverse: true,
                  zIndex: zIndex - j
                })
                temp.push(tempCheckedKeys[i])
                this.layerGroup.addLayer(layer)
              }
            }
          }
        }
      }
      this.oldCheckedKeys = temp
      this.oldCheckedIDs = []
      this.layerGroup.eachLayer((layer) => {
        this.oldCheckedIDs.push(this.layerGroup.getLayerId(layer))
      })
      this.$emit('setCheckedKeys', tempCheckedKeys, this.queryProps['layerVisible'])
      if (this.operationType === 'query') this.$refs.querySpace.initSelectedLayers()
    },
    /** **********************************添加图层标记**************************************/
    addPointFeature(feature, layer, style, isOpenPop, id) {
      let viewIcon
      let latLng
      if (style === 1) {
        viewIcon = L.icon({
          iconUrl: './2d/img/point_red.png',
          iconSize: [18, 24],
          iconAnchor: [9, 24]
        })
      } else if (style === 2) {
        viewIcon = L.icon({
          iconUrl: './2d/img/point_red.png',
          iconSize: [18, 24],
          iconAnchor: [9, 24]
        })
      } else if (style === 3) {
        viewIcon = L.icon({
          iconUrl: './2d/img/start.png',
          iconSize: [28, 40],
          iconAnchor: [14, 40]
        })
      } else if (style === 4) {
        viewIcon = L.icon({
          iconUrl: './2d/img/end.png',
          iconSize: [28, 40],
          iconAnchor: [14, 40]
        })
      } else if (style === 5) {
        viewIcon = L.icon({
          iconUrl: './2d/img/point_green.png',
          iconSize: [28, 40],
          iconAnchor: [14, 40]
        })
      } else if (style === 6) {
        viewIcon = L.icon({
          iconUrl: './2d/img/icon-sj.png',
          iconSize: [16, 24],
          iconAnchor: [8, 24]
        })
      } else if (style === 7) {
        viewIcon = L.icon({
          iconUrl: './2d/img/icon-sg.png',
          iconSize: [16, 24],
          iconAnchor: [8, 24]
        })
      } else if (style === 8) {
        viewIcon = L.icon({
          iconUrl: './2d/img/icon-wc.png',
          iconSize: [16, 24],
          iconAnchor: [8, 24]
        })
      }
      if (feature.hasOwnProperty('fieldNames')) {
        latLng = [feature.geometry.points[0].y, feature.geometry.points[0].x]
      } else {
        latLng = [feature.geometry.coordinates[1], feature.geometry.coordinates[0]]
      }
      /**
       this.popup = L.popup({
        closeButton: false,
        offset: L.point(0, -5)
      }).setLatLng(latLng).setContent(this.setPopContent(feature, id)).openOn(this.map)
       **/
      let marker = L.marker(latLng, { icon: viewIcon })
      marker.addTo(layer)
      marker.bindPopup(L.popup({
        closeButton: false,
        offset: L.point(0, -15)
      }).setContent(this.setPopContent(feature, id))).addTo(layer)
      if (isOpenPop) marker.openPopup(latLng)
    },
    addLineFeature(feature, layer, style, isOpenPop, id) {
      let viewStyle
      let latLngs = []
      if (style === 1) {
        viewStyle = {
          color: '#ff0900',
          weight: 5,
          fillColor: '#ff0900',
          fillOpacity: '0.8'
        }
      } else if (style === 2) {
        viewStyle = {
          color: '#ff0900',
          weight: 3,
          fillColor: '#ff0900',
          fillOpacity: '0.8'
        }
      }
      if (feature.hasOwnProperty('fieldNames')) {
        let points = feature.geometry.points
        for (let i = 0; i < points.length; i++) {
          latLngs[i] = [points[i].y, points[i].x]
        }
      } else {
        let points = feature.geometry.coordinates
        for (let i = 0; i < points.length; i++) {
          latLngs[i] = [points[i][1], points[i][0]]
        }
      }
      let polyline = L.polyline(latLngs, viewStyle)
      polyline.bindPopup(L.popup({
        closeButton: false,
        offset: L.point(0, -5)
      }).setContent(this.setPopContent(feature, id))).addTo(layer)
      if (isOpenPop) polyline.openPopup(polyline.getCenter())
    },
    addPolygonFeature(feature, layer, style, isOpenPop, id) {
      let viewStyle
      let latLngs = []
      if (style === 1) {
        viewStyle = {
          color: '#ff3300',
          weight: 4,
          fillColor: '#ff3300',
          fillOpacity: '0.6'
        }
      } else if (style === 2) {
        viewStyle = {
          color: '#396121',
          weight: 4,
          fillColor: '#a6c84c',
          fillOpacity: '0.6'
        }
      }
      let points = feature.geometry.coordinates[0][0]
      for (let i = 0; i < points.length; i++) {
        latLngs[i] = [points[i][1], points[i][0]]
      }
      let polygon = L.polygon(latLngs, viewStyle)
      polygon.bindPopup(L.popup({
        closeButton: false,
        offset: L.point(0, -5)
      }).setContent(this.setPopContent(feature, id))).addTo(layer)
      if (isOpenPop) polygon.openPopup(polygon.getCenter())
    },
    setPopContent(feature, id) {
      let temp = id.split('|')
      let typeName = temp[0]
      let i = temp[1]
      let j = temp[2]
      if (this.operationType === 'section' || this.operationType === 'trace') feature = this.selectedFeatures[i][j]
      let fieldNames
      let fieldValues
      if (feature.hasOwnProperty('fieldNames')) {
        fieldNames = feature.fieldNames
        fieldValues = feature.fieldValues
      }
      let label = this.queryProps[typeName].label
      let popTitle
      if (feature.hasOwnProperty('fieldNames')) popTitle = fieldValues[fieldNames.indexOf('POPTITLE')]
      else popTitle = feature.properties['POPTITLE']
      let content = '<div id="pop" class="mapPop">' +
        '<div id="featureId" style="display:none">' + id + '</div>' +
        '<div class="mapPopTitle">' + label + '：' + popTitle +
        '<div class="rightBtn">' +
        '<span class="btn"><img src="./static/icon-info.png" id="popOpen"/></span>' +
        '<span class="btn"><img src="./static/icon-close.png" id="popClose"/></span>' +
        '</div></div>'
      // content 添加table
      content += '<table class="table" border="0" cellpadding="0" cellspacing="0" >'
      for (let h = 0; h < this.queryProps[typeName].simpleList.length; h++) {
        let columnEName = (this.queryProps[typeName].simpleList[h].columnEName).toUpperCase()
        let columnName = this.queryProps[typeName].simpleList[h].columnName
        let columnDisplayType = this.queryProps[typeName].simpleList[h].columnDisplayType
        let columnOptions = this.queryProps[typeName].simpleList[h].columnOptions
        let value
        if (feature.hasOwnProperty('fieldNames')) {
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
        content += '<tr><td style="min-width: 155px;" title="' + columnName + '" >' + columnName + '：</td><td>' + ((value !== undefined && value !== null && value !== 'NULL' && value !== 'null') ? value : '') + '</td></tr>'
      }
      content += '</table></div>'
      return content
    },
    /** *****************************地图控制*******************************/
    // 清除标记图层
    clearFeature(layer) {
      layer.clearLayers()
    },
    // 居中显示
    flyTo(latLng) {
      this.map.panTo(latLng)
    },
    // 刷新地图
    redraw() {
      this.layerGroup.eachLayer((layer) => {
        layer.redraw()
      })
    },
    // 放大
    zoomIn() {
      this.map.zoomIn()
    },
    // 缩小
    zoomOut() {
      this.map.zoomOut()
    },
    // 缩放至
    zoomMin(level) {
      this.map.setZoom(level)
      /**
       let bounds = L.latLngBounds([
       [32, -130],
       [13, -100]
       ])
       //将地图适应到矩形边界
       leafletMap.fitBounds(bounds)
       **/
    },
    /** *****************************点击地图查看属性*******************************/
    doOnclickQuery(e) {
      let lonLat = e.latlng
      this.geometry = L.marker([lonLat.lat, lonLat.lng])
      let dataset = []
      let k = 0
      let buffer = 2
      if (this.operationType !== '' && this.operationType !== 'edit') {
        if (this.drawOnclickFlag) {
          if (this.operationType === 'section') { // 两点连通性分析只查结点要素
            let key = this.$refs.spaceSectionAnalysis.form.key
            if (key.split(',').length === 2) {
              this.clearSpace()
              this.clearData()
              this.clearLayer()
              this.clearDataShow()
            } else {
              this.clearData()
              this.clearLayer(false)
              this.clearDataShow(false)
            }
            for (let i = 0; i < this.baseProps['networkDatasetNames'].node.length; i++) {
              dataset.push(this.baseProps['networkDataSourceName'] + ':' + this.baseProps['networkDatasetNames'].node[i])
              k++
            }
          } else if (this.operationType === 'trace') { // 上下游追踪分析查网络数据集
            this.clearSpace()
            this.clearData()
            this.clearLayer()
            this.clearDataShow()
            for (let i = 0; i < this.baseProps['networkDatasetNames'].node.length; i++) {
              dataset.push(this.baseProps['networkDataSourceName'] + ':' + this.baseProps['networkDatasetNames'].node[i])
              k++
            }
            for (let i = 0; i < this.baseProps['networkDatasetNames'].edge.length; i++) {
              if (this.baseProps['networkDatasetNames'][i] !== '') {
                dataset.push(this.baseProps['networkDataSourceName'] + ':' + this.baseProps['networkDatasetNames'].edge[i])
                k++
              }
            }
          }
        }
      } else {
        this.clearData()
        this.clearLayer()
        this.clearDataShow()
        let layerVisible = this.sort(this.queryProps['layerVisible'], 'sort')
        for (let i = 0; i < layerVisible.length; i++) {
          if (layerVisible[i].tabQuery && layerVisible[i].visible) {
            let layers = layerVisible[i].typeName
            dataset.push(this.queryProps[layers].datasetNames)
            k++
          }
        }
        buffer = this.bufferDis[this.map.getZoom()]
      }
      // console.log(buffer, dataset)
      if (k > 0) {
        this.changeLoading(true)
        let getParameters = new SuperMap.GetFeaturesByBufferParameters({
          bufferDistance: (buffer / (95.615 * 1000)),
          datasetNames: dataset,
          returnContent: true,
          geometry: this.geometry
        })
        let dataUrl = this.baseProps['url_data']
        if (this.operationType === 'section' || this.operationType === 'trace') dataUrl = this.baseProps['url_network_data']
        L.supermap
          .featureService(dataUrl)
          .getFeaturesByBuffer(getParameters, (serviceResult) => {
            // console.log(serviceResult)
            this.changeLoading(false)
            let features = serviceResult.result.features.features
            if (features && features.length > 0) {
              let feature = features[0]
              if (feature.properties.hasOwnProperty('IMG_TY')) { // 实景显示
                this.showImgInfos(feature)
              } else {
                for (let i = 0; i < this.queryProps['layerVisible'].length; i++) {
                  if (this.queryProps['layerVisible'][i].tabQuery && this.queryProps['layerVisible'][i].visible) {
                    let typeKeyWords = this.queryProps['layerVisible'][i].typeKeyWords
                    let value = this.queryProps['layerVisible'][i].typeKeyWordValues
                    if (typeKeyWords !== '' && feature.properties.hasOwnProperty(typeKeyWords)) {
                      let flag = true
                      if (feature.properties.hasOwnProperty('N_ISUSE')) { // 筛选掉N_IsUse=1标记删除的记录
                        if (feature.properties['N_ISUSE'] === '1') flag = true
                        else flag = false
                      }
                      if (feature.properties[typeKeyWords] === value && flag) {
                        this.selectedLayerNames.push(this.queryProps['layerVisible'][i].typeName)
                        let results = []
                        results[0] = feature
                        this.selectedFeatures.push(results)
                        let id = this.queryProps['layerVisible'][i].typeName + '|0|0'
                        if (this.operationType === 'section') { // 两点查询（最近路径分析）
                          let key = this.$refs.spaceSectionAnalysis.form.key
                          if (key === '') {
                            key = feature.properties['SMID']
                            this.sectionStartId = feature.properties['MANHOLE_ID']
                            let label = this.queryProps[this.queryProps['layerVisible'][i].typeName].label
                            this.$refs.spaceSectionAnalysis.form.node1 = label + feature.properties['POPTITLE']
                            this.addPointFeature(feature, this.drawLayer, 3, false, id)
                          } else {
                            key += ',' + feature.properties['SMID']
                            let label = this.queryProps[this.queryProps['layerVisible'][i].typeName].label
                            this.$refs.spaceSectionAnalysis.form.node2 = label + feature.properties['POPTITLE']
                            this.addPointFeature(feature, this.drawLayer, 4, false, id)
                          }
                          this.$refs.spaceSectionAnalysis.form.key = key
                        } else if (this.operationType === 'trace') { // 要素追踪分析
                          this.$refs.spaceTraceability.form.key = feature.properties['SMID']
                          let label = this.queryProps[this.queryProps['layerVisible'][i].typeName].label
                          this.$refs.spaceTraceability.form.node = label + feature.properties['POPTITLE']
                          if (feature.geometry.type === 'Point') {
                            this.$refs.spaceTraceability.form.type = 'nodeID'
                            this.addPointFeature(feature, this.drawLayer, 3, false, id)
                          } else {
                            this.$refs.spaceTraceability.form.type = 'edgeID'
                            this.addLineFeature(feature, this.drawLayer, 1, false, id)
                          }
                        } else {
                          if (feature.geometry.type === 'Point') {
                            this.addPointFeature(feature, this.detailsLayer, 1, true, id)
                          } else if (feature.geometry.type === 'LineString') {
                            this.addLineFeature(feature, this.detailsLayer, 1, true, id)
                          } else if (feature.geometry.type === 'MultiPolygon') {
                            this.addPolygonFeature(feature, this.detailsLayer, 1, true, id)
                          }
                        }
                        break
                      }
                    }
                  }
                }
              }
            }
          })
      }
    },
    setDrawOnclickFlag(flag) {
      this.drawOnclickFlag = flag
    },
    /** *****************************画点线面*******************************/
    drawGeometry(label, operationType) {
      if (label === '1') { // 画点
        this.drawType = 'point'
      } else if (label === '2') { // 画线
        this.drawType = 'line'
        this.points = []
        this.line = L.polyline([], this.drawStyle)
        this.tempLine = L.polyline([], this.drawStyle)
      } else if (label === '3') { // 矩形
        this.drawType = 'rectangle'
        this.points = []
        this.rectangle = null
      } else if (label === '4') { // 多边形
        this.drawType = 'polygon'
        this.points = []
        this.line = L.polyline([], this.drawStyle)
        this.tempLine = L.polyline([], this.drawStyle)
      } else if (label === '5') { // 圆
        this.drawType = 'circle'
        this.circleCenter = null
        this.circle = null
      }
      this.operationType = operationType.toString()
    },
    // 画点
    drawPoint(e) {
      this.drawType = ''
      this.geometry = L.circle(e.latlng, this.drawStyle).addTo(this.drawLayer)
      this.drawCompleted()
    },
    // 画线
    drawLineStart(e) {
      this.points.push([e.latlng.lat, e.latlng.lng])
      this.line.addLatLng(e.latlng)
      this.line.addTo(this.drawLayer)
      L.circle(e.latlng, this.drawStyle).addTo(this.drawLayer)
    },
    drawLineProcess(e) {
      if (this.points.length > 0) {
        let ls = [this.points[this.points.length - 1], [e.latlng.lat, e.latlng.lng]]
        this.tempLine.setLatLngs(ls)
        this.tempLine.addTo(this.drawLayer)
      }
    },
    drawLineEnd(e) {
      if (this.operationType === 'update') this.editFlag = true
      this.drawType = ''
      this.geometry = this.line
      if (this.measureType === '') {
        if (this.operationType === 'add') {
          this.$refs.gongChengEdit.toggle(true)
          this.$refs.mapEdit.disabled = false
        } else if (this.operationType === 'update') {
        } else this.drawCompleted()
      } else if (this.measureType === 'distance') this.measureDistance()
      this.measureType = ''
    },
    // 画面
    drawPolygonStart(e) {
      this.points.push([e.latlng.lat, e.latlng.lng])
      this.line.addLatLng(e.latlng)
      this.tempLine.addTo(this.drawLayer)
      this.line.addTo(this.drawLayer)
      L.circle(e.latlng, this.drawStyle).addTo(this.drawLayer)
    },
    drawPolygonProcess(e) {
      if (this.points.length > 0) {
        let ls = [this.points[this.points.length - 1], [e.latlng.lat, e.latlng.lng], this.points[0]]
        this.tempLine.setLatLngs(ls)
      }
    },
    drawPolygonEnd(e) {
      this.polygon = L.polygon(this.points, this.drawStyle).addTo(this.drawLayer)
      this.drawLayer.removeLayer(this.tempLine)
      this.drawLayer.removeLayer(this.line)
      this.drawType = ''
      this.geometry = this.polygon
      if (this.measureType === '') this.drawCompleted()
      else if (this.measureType === 'area') this.measureArea()
      this.measureType = ''
    },
    // 画矩形
    drawRectangleStart(e) {
      this.points[0] = [e.latlng.lat, e.latlng.lng]
    },
    drawRectangleProcess(e) {
      this.points[1] = [e.latlng.lat, e.latlng.lng]
      if (this.rectangle) {
        this.drawLayer.removeLayer(this.rectangle)
      }
      this.rectangle = L.rectangle(this.points, this.drawStyle).addTo(this.drawLayer)
    },
    drawRectangleEnd(e) {
      this.drawType = ''
      let latLngs = this.rectangle.getLatLngs()
      if (latLngs[0].length > 3) {
        this.geometry = this.rectangle.getBounds()
        this.drawCompleted()
      } else {
        this.clearLayer()
        this.drawGeometry('3', this.operationType)
      }
    },
    // 画圆
    drawCircleStart(e) {
      this.circleCenter = e.latlng
    },
    drawCircleProcess(e) {
      if (this.circle) {
        this.drawLayer.removeLayer(this.circle)
      }
      if (this.circleCenter) {
        let r = L.latLng(e.latlng).distanceTo(this.circleCenter)
        let style = {          radius: r,
          color: '#57fc00',
          fillColor: '#ff6600',
          fillOpacity: 0.5
        }
        this.circle = L.circle(this.circleCenter, style).addTo(this.drawLayer)
      }
    },
    drawCircleEnd(e) {
      this.drawType = ''
      if (this.circle) {
        this.geometry = this.circle.getBounds()
        this.drawCompleted()
      } else {
        this.clearLayer()
        this.drawGeometry('5', this.operationType)
      }
    },
    drawCompleted() {
      this.$refs.querySpace.drawCompleted(this.geometry, this.operationType)
    },
    drawBuffer(geometry) {
      L.geoJSON(geometry, this.drawStyle).addTo(this.buffLayer)
    },
    /** *****************************地图量算*******************************/
    // 初始化量算
    startMeasure(draw) {
      this.clearData()
      this.clearLayer()
      this.clearDataShow()
      if (draw === 'distance') { // 测距
        this.measureType = 'distance'
        this.drawType = 'line'
        this.points = []
        this.line = L.polyline([], this.drawStyle)
        this.tempLine = L.polyline([], this.drawStyle)
      } else if (draw === 'area') { // 测面
        this.measureType = 'area'
        this.drawType = 'polygon'
        this.points = []
        this.line = L.polyline([], this.drawStyle)
        this.tempLine = L.polyline([], this.drawStyle)
      }
    },
    // 距离量算
    measureDistance() {
      let url = ''
      let layers = this.queryProps['layerVisible']
      for (let i = 0; i < layers.length; i++) {
        if (layers[i].visible && layers[i].layer !== '') {
          url = this.baseProps['url_map'] + layers[i].layer
          break
        }
      }
      let measureParam = new SuperMap.MeasureParameters(this.geometry)
      L.supermap
        .measureService(url)
        .measureDistance(measureParam, (serviceResult) => {
          let distance = serviceResult.result.distance.toFixed(3) + ' 米'
          this.$refs.spaceMeasure.spaceMeasureLengthForm.total = distance
          this.$refs.spaceMeasure.control = ''
          this.geometry.bindPopup(L.popup({
            closeButton: false,
            closeOnClick: false
          }).setContent(distance)).openPopup(this.geometry.getCenter())
        })
    },
    // 面积量算
    measureArea() {
      let url = ''
      let layers = this.queryProps['layerVisible']
      for (let i = 0; i < layers.length; i++) {
        if (layers[i].visible && layers[i].layer !== '') {
          url = this.baseProps['url_map'] + layers[i].layer
          break
        }
      }
      let measureParam = new SuperMap.MeasureParameters(this.geometry)
      L.supermap
        .measureService(url)
        .measureArea(measureParam, (serviceResult) => {
          let area = serviceResult.result.area.toFixed(3) + '平方米'
          this.$refs.spaceMeasure.spaceMeasureAreaForm.area = area
          this.$refs.spaceMeasure.control = ''
          this.geometry.bindPopup(L.popup({
            closeButton: false,
            closeOnClick: false
          }).setContent(area)).openPopup(this.geometry.getCenter())
        })
    },
    /** *****************************组件交互功能*******************************/
    // 查询获取数据
    doQueryCompleted(selectedLayerNames, attributeFilter, selectedFeatures, selectedCounts, oldCount, geometry, geoType) {
      for (let i = 0; i < selectedFeatures.length; i++) {
        if (selectedFeatures[i] && selectedFeatures[i].length > 0) {
          this.selectedLayerNames.push(selectedLayerNames[i])
          this.attributeFilter.push(attributeFilter[i])
          this.selectedFeatures.push(selectedFeatures[i])
          this.selectedCounts.push(selectedCounts[i])
        }
      }
      if (oldCount > this.selectedFeatures.length - 1) oldCount = this.selectedFeatures.length - 1
      this.changeLoading(false)
      this.doDrawResults(oldCount)
      if (this.operationType === 'section' || this.operationType === 'trace') this.doDrawAllResults()
      this.$refs.dataTable.toggle(true)
      // 判断是否显示断面图tab
      if (this.operationType === 'section') {
        this.$refs.dataTable.isSectionShow = true
        this.$refs.dataTable.activeName = '0'
      } else {
        this.$refs.dataTable.isSectionShow = false
        this.$refs.dataTable.activeName = '1'
      }
      // 数据赋值
      this.$refs.dataTable.selectedLayerNames = this.selectedLayerNames
      this.$refs.dataTable.attributeFilter = this.attributeFilter
      this.$refs.dataTable.selectedFeatures = this.selectedFeatures
      this.$refs.dataTable.selectedCounts = this.selectedCounts
      // 初始化筛选
      let tempAttributeFilter = []
      let filterColumns = []
      let summaryColumns = []
      for (let i = 0; i < selectedLayerNames.length; i++) {
        tempAttributeFilter[i] = ''
        filterColumns[i] = []
        summaryColumns[i] = []
      }
      this.$refs.dataTable.tempAttributeFilter = tempAttributeFilter
      this.$refs.dataTable.filterColumns = filterColumns
      this.$refs.dataTable.summaryColumns = summaryColumns
      this.$refs.dataTable.summaryResult = []
      this.$refs.dataTable.showSummary = false
      this.$refs.dataTable.num += 1
      this.$refs.dataTable.clearTableFilter()
      this.$refs.dataTable.geometry = geometry
      this.$refs.dataTable.geoType = geoType
      this.$refs.dataTable.pageNum = 1
      // 初始化筛选结束
      if (this.operationType === 'section') {
        if (this.analysisType === 'duanmian') this.$refs.dataTable.isSectionShow = true
        else if (this.analysisType === 'liantong') this.$refs.dataTable.isSectionShow = false
        this.$refs.dataTable.sectionStartId = this.sectionStartId
        this.sectionStartId = ''
      }
      if (this.operationType === 'toc' || this.operationType === 'query') this.$refs.dataTable.showResults(false, true, oldCount)
      else this.$refs.dataTable.showResults(false, false)
    },
    doDrawAllResults() {
      let series = []
      let lineDatas = []
      let latFrom, latTo, lngFrom, lngTo
      for (let i = 0; i < this.selectedFeatures.length; i++) {
        if (this.selectedFeatures[i].length > 0) {
          for (let j = 0; j < this.selectedFeatures[i].length; j++) {
            let feature = this.selectedFeatures[i][j]
            if (feature.geometry.type === 'LineString' || feature.geometry.type === 'LINE') {
              if (feature.hasOwnProperty('fieldNames')) {
                let points = feature.geometry.points
                latFrom = points[0].y
                lngFrom = points[0].x
                latTo = points[points.length - 1].y
                lngTo = points[points.length - 1].x
              } else {
                let points = feature.geometry.coordinates
                latFrom = points[0][1]
                lngFrom = points[0][0]
                latTo = points[points.length - 1][1]
                lngTo = points[points.length - 1][0]
              }
              lineDatas.push(
                {
                  coords: [[lngFrom, latFrom], [lngTo, latTo]]
                }
              )
            }
          }
        }
      }
      let planePath = 'image://2d/img/walk.png'
      series.push({
        type: 'lines',
        coordinateSystem: 'leaflet',
        zlevel: 9999,
        effect: {
          show: true,
          period: 3,
          trailLength: 0,
          symbol: planePath,
          symbolSize: 12,
          color: '#ff0900'
        },
        lineStyle: {
          normal: {
            color: '#57fc00',
            width: 12,
            opacity: 1.0,
            curveness: 0.0
          }
        },
        data: lineDatas
      })
      let option = {
        series: series
      }
      this.echartsLayer = L.supermap.echartsLayer(option, { loadWhileAnimating: true })
      this.echartsLayer.addTo(this.map)
    },
    doDrawResults(oldCount) {
      let count = 0
      if (oldCount === undefined) oldCount = 0
      for (let i = 0; i < this.selectedFeatures.length; i++) {
        if (this.selectedFeatures[i].length > 0) {
          for (let j = 0; j < this.selectedFeatures[i].length; j++) {
            let feature = this.selectedFeatures[i][j]
            let lat = 0
            let lng = 0
            let id = this.selectedLayerNames[i] + '|' + i.toString() + '|' + j.toString()
            if (feature.geometry.type === 'Point' || feature.geometry.type === 'POINT') {
              if (count === oldCount) {
                this.addPointFeature(feature, this.detailsListLayer, 2, false, id)
                if (j === 0) {
                  if (feature.hasOwnProperty('fieldNames')) {
                    lat = feature.geometry.points[0].y
                    lng = feature.geometry.points[0].x
                  } else {
                    lat = feature.geometry.coordinates[1]
                    lng = feature.geometry.coordinates[0]
                  }
                  this.flyTo(L.latLng(lat, lng))
                }
              }
            } else if (feature.geometry.type === 'LineString' || feature.geometry.type === 'LINE') {
              if (count === oldCount) {
                this.addLineFeature(feature, this.detailsListLayer, 2, false, id)
                if (j === 0) {
                  if (feature.hasOwnProperty('fieldNames')) {
                    lat = feature.geometry.points[0].y
                    lng = feature.geometry.points[0].x
                  } else {
                    lat = feature.geometry.coordinates[0][1]
                    lng = feature.geometry.coordinates[0][0]
                  }
                  this.flyTo(L.latLng(lat, lng))
                }
              }
            } else if (feature.geometry.type === 'MultiPolygon') {
              if (count === oldCount) {
                this.addPolygonFeature(feature, this.detailsListLayer, 2, false, id)
                if (j === 0) {
                  lat = feature.geometry.coordinates[0][0][0][1]
                  lng = feature.geometry.coordinates[0][0][0][0]
                  this.flyTo(L.latLng(lat, lng))
                }
              }
            }
          }
          count++
        }
      }
    },
    doDrawChangeResults(features, i) {
      this.$refs.dataDetails.toggle(false)
      this.clearLayer(false)
      if (features.length > 0) {
        for (let j = 0; j < features.length; j++) {
          let feature = features[j]
          let lat = 0
          let lng = 0
          let id = this.selectedLayerNames[i] + '|' + i.toString() + '|' + j.toString()
          if (feature.geometry.type === 'Point' || feature.geometry.type === 'POINT') {
            if (this.operationType === 'toc' || this.operationType === 'query') {
              this.addPointFeature(feature, this.detailsListLayer, 2, false, id)
              if (j === 0) {
                lat = feature.geometry.coordinates[1]
                lng = feature.geometry.coordinates[0]
                this.flyTo(L.latLng(lat, lng))
              }
            } else {
              this.addPointFeature(feature, this.detailsListLayer, 2, false, id)
            }
          } else if (feature.geometry.type === 'LineString' || feature.geometry.type === 'LINE') {
            if (this.operationType === 'toc' || this.operationType === 'query') {
              this.addLineFeature(feature, this.detailsListLayer, 2, false, id)
              if (j === 0) {
                if (feature.hasOwnProperty('fieldNames')) {
                  lat = feature.geometry.points[0].y
                  lng = feature.geometry.points[0].x
                } else {
                  lat = feature.geometry.coordinates[0][1]
                  lng = feature.geometry.coordinates[0][0]
                }
                this.flyTo(L.latLng(lat, lng))
              }
            } else {
              this.addLineFeature(feature, this.detailsListLayer, 2, false, id)
            }
          } else if (feature.geometry.type === 'MultiPolygon') {
            if (this.operationType === 'toc' || this.operationType === 'query') {
              this.addPolygonFeature(feature, this.detailsListLayer, 2, false, id)
              if (j === 0) {
                lat = feature.geometry.coordinates[0][0][0][1]
                lng = feature.geometry.coordinates[0][0][0][0]
                this.flyTo(L.latLng(lat, lng))
              }
            } else {
              this.addPolygonFeature(feature, this.detailsListLayer, 2, false, id)
            }
          }
        }
      }
    },
    drawDetails(feature, id) {
      this.clearFeature(this.detailsLayer)
      this.$refs.dataDetails.toggle(false)
      let lat = 0
      let lng = 0
      if (this.operationType !== 'section' && this.operationType !== 'trace') {
        let temp = id.split('|')
        let typeName = temp[0]
        let layer = this.queryProps[typeName]
        let fields = ['SMID', 'POPTITLE']
        for (let h = 0; h < layer.simpleList.length; h++) {
          let tabFields = layer.simpleList[h]
          let columnEName = (tabFields.columnEName).toUpperCase()
          fields.push(columnEName)
        }
        let getParameters = new SuperMap.GetFeaturesByIDsParameters({
          IDs: [feature.properties['SMID']],
          fields: fields,
          datasetNames: [layer.datasetNames],
          returnContent: true
        })
        L.supermap
          .featureService(this.baseProps['url_data'])
          .getFeaturesByIDs(getParameters, (serviceResult) => {
            let features = serviceResult.result.features.features
            if (features && features.length > 0) {
              feature = features[0]
              if (feature.geometry.type === 'Point' || feature.geometry.type === 'POINT') {
                this.addPointFeature(feature, this.detailsLayer, 1, true, id)
                lat = feature.geometry.coordinates[1]
                lng = feature.geometry.coordinates[0]
              } else if (feature.geometry.type === 'LineString' || feature.geometry.type === 'LINE') {
                this.addLineFeature(feature, this.detailsLayer, 1, true, id)
                lat = feature.geometry.coordinates[0][1]
                lng = feature.geometry.coordinates[0][0]
              } else if (feature.geometry.type === 'MultiPolygon') {
                this.addPolygonFeature(feature, this.detailsLayer, 1, true, id)
                lat = feature.geometry.coordinates[0][0][0][1]
                lng = feature.geometry.coordinates[0][0][0][0]
              }
              this.flyTo(L.latLng(lat, lng))
            }
          })
      } else {
        if (feature.geometry.type === 'Point' || feature.geometry.type === 'POINT') {
          this.addPointFeature(feature, this.detailsLayer, 1, true, id)
          if (feature.hasOwnProperty('fieldNames')) {
            lat = feature.geometry.points[0].y
            lng = feature.geometry.points[0].x
          } else {
            lat = feature.geometry.coordinates[1]
            lng = feature.geometry.coordinates[0]
          }
        } else if (feature.geometry.type === 'LineString' || feature.geometry.type === 'LINE') {
          this.addLineFeature(feature, this.detailsLayer, 1, true, id)
          if (feature.hasOwnProperty('fieldNames')) {
            lat = feature.geometry.points[0].y
            lng = feature.geometry.points[0].x
          } else {
            lat = feature.geometry.coordinates[0][1]
            lng = feature.geometry.coordinates[0][0]
          }
        }
        this.flyTo(L.latLng(lat, lng))
      }
    },
    // 显示详情
    showDetails(id) {
      let temp = id.split('|')
      let typeName = temp[0]
      let i = temp[1]
      let j = temp[2]
      let feature = this.selectedFeatures[i][j]
      if (this.operationType !== 'section' && this.operationType !== 'trace') {
        let layer = this.queryProps[typeName]
        let fields = ['SMID', 'POPTITLE']
        for (let h = 0; h < layer.tabInfoList.length; h++) {
          let tabFields = layer.tabInfoList[h].tabFields
          for (let l = 0; l < tabFields.length; l++) {
            let columnEName = (tabFields[l].columnEName).toUpperCase()
            fields.push(columnEName)
          }
        }
        let getParameters = new SuperMap.GetFeaturesByIDsParameters({
          IDs: [feature.properties['SMID']],
          fields: fields,
          datasetNames: [layer.datasetNames],
          returnContent: true
        })
        L.supermap
          .featureService(this.baseProps['url_data'])
          .getFeaturesByIDs(getParameters, (serviceResult) => {
            let features = serviceResult.result.features.features
            if (features && features.length > 0) {
              feature = features[0]
              this.$refs.dataDetails.toggle(true)
              this.$refs.dataDetails.showDetails(feature, typeName)
            }
          })
      } else {
        this.$refs.dataDetails.toggle(true)
        this.$refs.dataDetails.showDetails(feature, typeName)
      }
    },
    sort(arr, sortBy) {
      let compare = function (prop) {
        return function (obj1, obj2) {
          let val1 = obj1[prop]
          let val2 = obj2[prop]
          if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
            val1 = Number(val1)
            val2 = Number(val2)
          }
          if (val1 < val2) {
            return -1
          } else if (val1 > val2) {
            return 1
          } else {
            return 0
          }
        }
      }
      return arr.sort(compare(sortBy))
    },
    /**
     *打印地图，支持ie9及以上，chrome，firefox等.
     */
    canvas(type, title) {
      if (type === 'print') { // 打印
        let titleDiv = document.createElement('div')
        titleDiv.innerHTML = title
        titleDiv.style.position = 'absolute'
        titleDiv.style.top = '0px'
        titleDiv.style.left = '45%'
        titleDiv.style.zIndex = '9999'
        titleDiv.style.fontSize = '24px'
        this.$refs.onemap.style.top = '28px'
        this.$refs.box.appendChild(titleDiv)
        this.$print(this.$refs.box)
        setTimeout(() => {
          this.$refs.box.removeChild(titleDiv)
          this.$refs.onemap.style.top = '0px'
        }, 1000)
      } else if (type === 'create') { // 截图
        let broz = SuperMap.Browser.name
        if (broz === 'msie' && parseInt(SuperMap.Browser.version) < 9) {
          this.openMessage('当前浏览器不支持打印截图!', 'error')
          return
        }
        this.changeLoading(true)
        let shareContent = document.getElementById('onemap') // 需要绘制的部分的 (原生）dom 对象 ，注意容器的宽度不要使用百分比，使用固定宽度，避免缩放问题
        let width = shareContent.offsetWidth // 获取(原生）dom 宽度
        let height = shareContent.offsetHeight // 获取(原生）dom 高
        let opts = {
          taintTest: true, // 检测每张图片都已经加载完成
          useCORS: true, // 使用跨域
          width: width, // dom 原始宽度
          height: height // dom 原始高度
        }
        html2canvas(shareContent, opts).then(canvas => {
          this.changeLoading(false)
          let mapImgURL = canvas.toDataURL('image/jpeg', 1.0)
          let aLink = document.createElement('a')
          aLink.style.display = 'none'
          aLink.href = mapImgURL
          aLink.download = title + '.jpg'
          // 触发点击-然后移除
          document.body.appendChild(aLink)
          aLink.click()
          document.body.removeChild(aLink)
          // this.draw(canvas)
        })
      }
    },
    draw(canvas) {
      let panel = document.createElement('div')
      panel.style.position = 'absolute'
      panel.style.left = '0px'
      panel.style.top = '0px'
      panel.style.height = '100%'
      panel.style.width = '100%'
      panel.style.background = '#ffffff'
      panel.style.zIndex = '9999'
      this.$refs.box.appendChild(panel)
      let buttonPanel = document.createElement('div')
      buttonPanel.style.position = 'relative'
      panel.appendChild(buttonPanel)
      panel.appendChild(canvas)
      window.setTimeout(() => {
        if (canvas.msToBlob) {
          let button = document.createElement('input')
          buttonPanel.appendChild(button)
          button.type = 'button'
          button.value = '保存'
          button.onclick = () => {
            window.navigator.msSaveBlob(canvas.msToBlob(), 'map.png')
          }
        } else {
          let aa = document.createElement('a')
          buttonPanel.appendChild(aa)
          aa.target = '_blank'
          aa.download = 'map.png'
          aa.href = canvas.toDataURL()
          let button = document.createElement('input')
          aa.appendChild(button)
          button.type = 'button'
          button.value = '保存'
        }
        let button = document.createElement('input')
        buttonPanel.appendChild(button)
        button.type = 'button'
        button.value = '关闭'
        button.onclick = () => {
          this.$refs.box.removeChild(panel)
        }
      }, 1000)
    },
    changeControl(type, flag) {
      if (type === 'scale') {
        if (flag) {
          this.map.removeControl(this.scale)
          this.map.addControl(this.scale)
        } else this.map.removeControl(this.scale)
      }
      if (type === 'compass') {
        if (flag) this.$refs.compass.style.display = 'block'
        else this.$refs.compass.style.display = 'none'
      }
      if (type === 'legend') {
        this.state.BaseLegend = flag
        this.$refs.mapLegend.state = flag
        if (flag) {
          let iconsData = []
          let layers = this.queryProps['layerVisible']
          for (let i = 0; i < layers.length; i++) {
            if (layers[i].visible && layers[i].layer !== '') {
              iconsData.push({
                'icon': layers[i].icon,
                'label': layers[i].label
              })
            }
          }
          if (iconsData.length <= 8) this.$refs.mapLegend.col = 1
          this.$refs.mapLegend.iconsData = iconsData
          this.$refs.mapLegend.activeData()
        }
      }
    },
    getNowFormatDate() {
      let date = new Date()
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      let currentDate = year + month + strDate
      return currentDate
    },
    /** *****************************组件操作公用*******************************/
    // 子组件同步父组件的状态
    toggle(obj) {
      if (typeof obj !== 'object') return false
      // 正常处理
      if (obj.name && (obj.name === 'MonitorPump' || obj.name === 'MonitorPipe')) {
        this.$set(this.state, obj.name, obj.value)
        return false
      }
      // 关闭table的统计组件
      if (obj.name === 'DataTable') this.$refs.dataTable.toggleTableFilter(false)
      if (obj.name !== undefined && obj.name !== 'DataDetails' && obj.name !== 'BaseToc' && !obj.value) {
        // 关闭图层操作下的table,清除图层查询的数据
        if (this.operationType === 'toc' && obj.name === 'DataTable') this.$refs.baseToc.initSelected()
        // 关闭图层操作下的table,清除操作状态
        if (this.operationType === 'toc') this.operationType = ''
        // 关闭非图层操作下的查询组件，清除操作状态（关闭table保留，继续查询）
        if (this.operationType !== 'toc' && obj.name !== 'DataTable') {
          // 量算清除
          if (this.operationType === 'measure') {
            this.measureType = ''
          }
          this.operationType = ''
          this.drawType = ''
        }
        // 关闭打印还原控件显示状态
        if (obj.name === 'MapPrint') {
          this.$refs.mapPrint.clear()
        }
        // 关闭非table的组件，同步关闭table
        if (obj.name !== 'DataTable') this.$set(this.state, 'DataTable', false)
        // 所有关闭同步关闭details
        this.$set(this.state, 'DataDetails', false)
        this.$refs.dataDetails.state = false
        // 关闭组件同步清除图层标绘
        this.clearLayer()
        this.clearEchartsLayer()
      }
      this.$set(this.state, obj.name, obj.value)
    },
    /** *****************************toggleOnlyState*******************************/
    // 关闭footer的最小化
    toggleOnlyState(obj) {
      // 准备缓存，更改高度
      if (typeof obj !== 'undefined') {
        // console.log('toggleOnlyState \t' ,obj)
        this.stateChange.active = true // 激活状态
        this.stateChange.name = obj.name
        this.stateChange.value = obj.value
        this.stateChange.footerHeight = this.footerHeight.toString()
        // this.footerHeight = 'auto'
        this.$set(this.state, obj.name, obj.value)
      } else { // 准备缓存，还原
        if (this.stateChange.active) {
          let name = this.stateChange.name.substr(0, 1).toLocaleLowerCase() + this.stateChange.name.substr(1, this.stateChange.name.length - 1)
          // console.log('最小化还原开始：', this.stateChange)
          this.$set(this.state, this.stateChange.name, !this.stateChange.value)
          this.$refs[name].toggle(!this.stateChange.value)

          this.stateChange.active = false
          delete this.stateChange.name
          delete this.stateChange.value
          delete this.stateChange.footerHeight
          // console.log('最小化还原成功：', this.stateChange)
        } else {
          // console.log('最小化还原失败：', this.stateChange)
        }
      }
      // console.log('toggleOnlyState \t' ,this.stateChange)
    },
    // 子组件同步父组件的最大化状态，同时计算footTable最大高度
    toMaximize(obj) {
      // console.log(obj)
      this.$nextTick(() => {
        let h = ''
        h = this.$refs.footTable.offsetHeight
        this.footTableHeight = (h - 3) + 'px'
      })
      // console.log(this.footTableHeight)
      if (typeof obj !== 'object') return false
      if (obj.name && this.maximize.hasOwnProperty(obj.name) && typeof obj.value === 'boolean') this.maximize[obj.name] = obj.value
    },
    toolBtn(obj) {
      // 让右侧弹窗的最小按钮影藏
      this.rightMiniStatus.show = false
      if (obj.name === 'sousuo') {
        this.clearToggleShow()
        this.$refs.querySpace.toggle(true)
        this.$refs.querySpace.activeName = 'QuerySpaceKey'
        this.clearSpace()
        this.clearData()
        this.clearLayer()
        this.clearEchartsLayer()
        this.clearDataShow()
        this.operationType = 'query'
      }
      if (obj.name === 'duanmian' || obj.name === 'liantong') {
        this.clearToggleShow()
        this.$refs.spaceSectionAnalysis.toggle(true)
        this.clearSpace()
        this.clearData()
        this.clearLayer()
        this.clearEchartsLayer()
        this.clearDataShow()
        this.setDrawOnclickFlag(true)
        this.operationType = 'section'
        if (obj.name === 'duanmian') {
          this.$refs.spaceSectionAnalysis.title = '断面分析'
          this.$refs.spaceSectionAnalysis.icon = 'tool-duanmian'
        }
        if (obj.name === 'liantong') {
          this.$refs.spaceSectionAnalysis.title = '连通分析'
          this.$refs.spaceSectionAnalysis.icon = 'tool-liantong'
        }
        this.$refs.spaceSectionAnalysis.analysisType = obj.name
        this.analysisType = obj.name
      }
      if (obj.name === 'wangluozhuisu') {
        this.clearToggleShow()
        this.$refs.spaceTraceability.toggle(true)
        this.clearSpace()
        this.clearData()
        this.clearLayer()
        this.clearEchartsLayer()
        this.clearDataShow()
        this.setDrawOnclickFlag(true)
        this.operationType = 'trace'
      }
      if (obj.name === 'fangda') {
        this.zoomIn()
      }
      if (obj.name === 'suoxiao') {
        this.zoomOut()
      }
      if (obj.name === 'quanping') {
        this.zoom = 1
        this.zoomMin(this.zoom)
      }
      if (obj.name === 'celiang') {
        this.clearData()
        this.clearLayer()
        this.clearEchartsLayer()
        this.clearDataShow()
        this.clearToggleShow()
        this.$refs.spaceMeasure.toggle(true)
        this.operationType = 'measure'
        this.$refs.spaceMeasure.control = 'distance'
        this.$refs.spaceMeasure.activeName = 'distance'
        this.startMeasure('distance')
      }
      if (obj.name === 'dayin') {
        this.clearLayer(false)
        this.clearEchartsLayer()
        this.clearDataShow(false)
        this.clearToggleShow()
        this.$refs.mapPrint.toggle(true)
      }
      if (obj.name === 'qingchu') {
        // this.clearToggleShow()
        this.clearSpace()
        this.clearData()
        this.clearLayer()
        this.clearEchartsLayer()
        this.clearDataShow()
        if (this.operationType === 'trace' || this.operationType === 'section') this.setDrawOnclickFlag(true)
        if (this.operationType === 'toc') this.$refs.baseToc.initSelected()
      }
      if (obj.name === 'chongzhi') {
        this.changeLoading(false)
        this.clearToggleShow()
        this.clearSpace()
        this.clearData()
        this.clearLayer()
        this.clearEchartsLayer()
        this.clearDataShow()
        // this.redraw()
      }
      if (obj.name === '3d') {
        this.clearToggleShow()
        this.clearSpace()
        this.clearData()
        this.clearLayer()
        this.clearEchartsLayer()
        this.clearDataShow()
        let zoom = this.map.getZoom()
        this.map.remove()
        let lonLat = this.map.layerPointToLatLng(L.point(this.$refs.onemap.offsetWidth / 2, this.$refs.onemap.offsetHeight / 2))
        this.$refs.baseToolsBar.state.is3D = true
        this.$emit('toggleComponent', lonLat, zoom)
      }
      if (obj.name === 'bianji') {
        this.clearToggleShow()
        this.$refs.mapEdit.toggle(true)
        this.clearSpace()
        this.clearData()
        this.clearLayer()
        this.clearEchartsLayer()
        this.clearDataShow()
        this.operationType = 'edit'
      }
      if (obj.name === 'fenxi' && this.funType === 'guihua') {
        this.clearToggleShow()
        this.$refs.guiHuaAnalysis.toggle(true)
        this.$refs.guiHuaAnalysis.form.now = '5'
        this.clearSpace()
        this.clearData()
        this.clearLayer()
        this.clearEchartsLayer()
        this.clearDataShow()
        this.operationType = 'analysis'
      }
    },
    setOperationType(val) {
      this.operationType = val
    },
    // 修改共有属性的信息 传参为{ name, value }
    // <el-button class="btn" @click="setState('bb', 'bhkji')">添加数据</el-button>
    setState(name, value) {
      this.$emit('setState', { name: name, value: value })
    },
    // 泵站运行和管道监测
    monitor(val) {
      // console.log('monitor : ', val, typeof val)
      if (val === 1) this.state.MonitorPump = true
      else if (val === 2) this.state.MonitorPipe = true
    },
    /** *******************************VR 实景部分**************************************/
    addImgVR() {
      let imgVr = this.baseProps['imgVr']
      for (let i = 0; i < imgVr.length; i++) {
        if (imgVr[i].type === 'point') {
          let viewIcon = L.icon({
            iconUrl: './2d/img/map-quanjing.png',
            iconSize: [30, 45],
            iconAnchor: [15, 45]
          })
          let latLng = imgVr[i].latLng
          let marker = L.marker(latLng, { icon: viewIcon })
          marker.on('click', (e) => {
            this.state.VR.name = imgVr[i].name
            this.state.VR.url = imgVr[i].url
            this.state.VR.value = true
          })
          marker.addTo(this.vrLayer)
        } else if (imgVr[i].type === 'line') {
          let queryObj = {
            'getFeatureMode': 'SQL',
            'datasetNames': [this.baseProps['dataSourceName'] + ':' + imgVr[i].datasetNames],
            'hasGeometry': false,
            'queryParameter': {
              fields: imgVr[i].fields
            }
          }
          this.$http.post(this.baseProps['url_data'] + '/featureResults.rjson?returnContent=true&toIndex=-1',
            JSON.stringify(queryObj)).then((res) => {
              let features = res.data.features
              let viewStyle = {
                color: '#1385f1',
                weight: 8,
                opacity: '0.6',
                lineCap: 'round',
                lineJoin: 'inherit',
                fillColor: '#1385f1',
                fillOpacity: '1.0'
              }
              let latLngs = []
              for (let j = 0; j < features.length; j++) {
                latLngs[j] = [features[j].fieldValues[1], features[j].fieldValues[0]]
              }
              let polyline = L.polyline(latLngs, viewStyle)
              polyline.addTo(this.vrLayer)
              for (let j = 0; j < features.length; j++) {
                latLngs[j] = [features[i].fieldValues[1], features[i].fieldValues[0]]
                let src = features[i].fieldValues[2].split('.jpg')[0]
                if (j < features.length - 1) {
                  let latLng = [
                    [features[j].fieldValues[1], features[j].fieldValues[0]],
                    [features[j + 1].fieldValues[1], features[j + 1].fieldValues[0]]
                  ]
                  let polyline = L.polyline(latLng, {
                    weight: 30,
                    opacity: '0.0',
                    fillOpacity: '0.0'
                  })
                  polyline.on('mouseover', (e) => {
                    L.popup({
                      closeButton: false,
                      offset: L.point(0, -5)
                    }).setLatLng(L.latLng(features[j].fieldValues[1], features[j].fieldValues[0]))
                      .setContent('<div align="center"><img src="' + imgVr[i].url + 'panos/' + src + '.tiles/thumb.jpg" width="100" height="100"/><br/>' + imgVr[i].label + '</div>')
                      .openOn(this.map)
                  })
                  polyline.on('mouseout', (e) => {
                    this.map.closePopup()
                  })
                  polyline.on('click', (e) => {
                    this.state.VRimg.value = true
                    this.state.VRimg.name = features[j].fieldValues[2]
                    this.state.VRimg.url = imgVr[i].url
                  })
                  polyline.addTo(this.vrLayer)
                }
              }
            })
        }
      }
    },
    addVideoVR() {
      let videoVr = this.baseProps['videoVr']
      let viewStyle = {
        color: '#1385f1',
        weight: 8,
        opacity: '0.6',
        lineCap: 'round',
        lineJoin: 'inherit',
        fillColor: '#1385f1',
        fillOpacity: '1.0'
      }
      for (let i = 0; i < videoVr.length; i++) {
        let vr = window[videoVr[i].type]
        let latLngs = []
        for (let j = 0; j < vr.length; j++) {
          latLngs[j] = [vr[j].lat, vr[j].lng]
        }
        let polyline = L.polyline(latLngs, viewStyle)
        polyline.addTo(this.vrLayer)
        for (let j = 0; j < vr.length; j++) {
          if (j < vr.length - 1) {
            let latLng = [
              [vr[j].lat, vr[j].lng],
              [vr[j + 1].lat, vr[j + 1].lng]
            ]
            let polyline = L.polyline(latLng, {
              weight: 30,
              opacity: '0.0',
              fillOpacity: '0.0'
            })
            polyline.on('mouseover', (e) => {
              L.popup({
                closeButton: false,
                offset: L.point(0, -5)
              }).setLatLng(L.latLng(vr[j].lat, vr[j].lng))
                .setContent('<div align="center"><img src="' + videoVr[i].url + 'video/' + videoVr[i].name + '/thumb/' + ((vr[j].time % 10) + 1) + '.jpg" width="100" height="100"/><br/>' + videoVr[i].label + '</div>')
                .openOn(this.map)
            })
            polyline.on('mouseout', (e) => {
              this.map.closePopup()
            })
            polyline.on('click', (e) => {
              this.state.VRvideo.value = true
              this.state.VRvideo.name = videoVr[i].name
              this.state.VRvideo.url = videoVr[i].url
              this.state.VRvideo.time = (vr[j].time % 10)
            })
            polyline.addTo(this.vrLayer)
          }
        }
      }
    },
    /** ********************************工程管理功能**************************************/
    // MapEdit编辑窗口的点击事件
    mapEditClick(btn) {
      this.geometry = {}
      this.drawType = ''
      this.editFlag = false
      this.$refs.gongChengEdit.initSelected()
      if (btn === 'add') { // 新增：开始画线
        this.clearGongChengShow()
        this.clearLayer()
        this.drawGeometry('2', btn)
        this.$refs.mapEdit.steps = '1'
      } else if (btn === 'update') { // 编辑：打开编辑窗口
        if (this.selectedFeatures.length > 0 && this.selectedFeatures[0].length > 0) {
          this.clearLayer()
          this.drawGeometry('2', btn)
          this.$refs.gongChengEdit.toggle(true)
          this.$refs.gongChengEdit.goEdit(this.selectedLayerNames[0], this.selectedFeatures[0][0].properties['SMID'])
          this.$refs.mapEdit.disabled = false
          this.$refs.mapEdit.steps = '2'
        } else {
          this.openMessage('请先在地图上选择一个工程！', 'error')
        }
      } else if (btn === 'delete') { // 删除：显示删除提示窗口
        if (this.selectedFeatures.length > 0 && this.selectedFeatures[0].length > 0) {
          this.$refs.gongChengEdit.toggle(true)
          this.$refs.gongChengEdit.goEdit(this.selectedLayerNames[0], this.selectedFeatures[0][0].properties['SMID'])
          this.operationType = btn
          this.$confirm('此操作将删除工程, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.onEdit()
          }).catch(() => {
          })
        } else {
          this.openMessage('请先在地图上选择一个工程！', 'error')
        }
      } else if (btn === 'revoke') { // 撤销：初始化操作，需要重新选择
        this.clearGongChengShow()
        this.clearLayer()
        this.operationType = 'edit'
        this.$refs.mapEdit.steps = '0'
      } else if (btn === 'redo') { // 清除layer，保留状态
        this.clearLayer()
        this.drawGeometry('2', this.operationType)
        this.$refs.mapEdit.steps = '0'
      }
    },
    onEdit() {
      this.changeLoading(true)
      if (this.operationType === 'add') {
        this.$refs.gongChengEdit.onAdd(this.geometry)
      } else if (this.operationType === 'delete') {
        this.$refs.gongChengEdit.onDelete()
      } else if (this.operationType === 'update') {
        this.$refs.gongChengEdit.onUpdate(this.geometry, this.editFlag)
      }
    },
    // GongChengEdit窗口调用方法
    doEditCompleted(flag, message) {
      this.changeLoading(false)
      if (flag) {
        this.$refs.gongChengEdit.toggle(false)
        this.openMessage(message, 'success')
        this.clearLayer()
        this.redraw()
      } else {
        this.openMessage(message, 'error')
      }
      this.operationType = 'edit'
      this.geometry = {}
      this.drawType = ''
      this.editFlag = false
    },
    /** ********************************规划设计功能**************************************/
    setGuiHuaPdf(pdf) {
      this.guiHuaPdf = pdf
      this.$refs.pdfIframe.toggle(true)
      this.guihuaHeight = (this.$refs.onemap.offsetHeight + 240).toString() + 'px'
      // console.log(this.guihuaHeight)
    },
    guiHuaAnalysis(state, year) {
      let guiHuaMap = this.baseProps['guiHuaMap']
      this.$refs.legend.style.display = 'block'
      if (state === 'compare') { // 前后对比
        this.clearGuiHuaMap()
        this.addGuiHuaMapLayer(guiHuaMap[year].url_map)
        this.$refs.guiHuaAnalysis.form.now = year.toString()
      } else if (state === 'change') { // 逐年变化
        this.clearGuiHuaMap()
        this.addGuiHuaMapLayer(guiHuaMap[0].url_map)
        this.$refs.guiHuaAnalysis.form.now = '0'
        let i = 1
        this.guiHuaTime = setInterval(() => {
          this.addGuiHuaMapLayer(guiHuaMap[i].url_map)
          this.$refs.guiHuaAnalysis.form.now = i.toString()
          i++
          if (i === guiHuaMap.length) i = 0
        }, 3000)
      }
    },
    addGuiHuaMapLayer(url) {
      this.guiLayerGroup.clearLayers()
      let guiHuaLayer = L.supermap.tiledMapLayer(url, {
        maxZoom: 12,
        zoomReverse: true,
        zIndex: 100
      })
      this.guiLayerGroup.addLayer(guiHuaLayer)
    },
    clearGuiHuaMap() {
      this.guiLayerGroup.clearLayers()
      if (this.guiHuaTime && this.guiHuaTime !== null) {
        clearInterval(this.guiHuaTime)
        this.guiHuaTime = null
      }
    },
    toggleRightMiniStatus(name) {
      // 子组件最小化，传递name;
      // 点击还原没有name值;
      //    执行 this.$refs[name].toggle();this.rightMiniStatus.names = new Array()
      if (name) {
        this.rightMiniStatus.names.unshift(name)
        if (!this.rightMiniStatus.show) {
          this.rightMiniStatus.show = true
        }
      } else {
        if (!this.rightMiniStatus.names || Object.prototype.toString.call(this.rightMiniStatus.names) !== '[object Array]' || !this.rightMiniStatus.names.length) { return }
        name = this.rightMiniStatus.names.shift()
        this.$refs[name.substr(0, 1).toLowerCase() + name.substr(1)].toggle(true) /* js this.state[name] = true; */
        this.rightMiniStatus.names = []
        this.rightMiniStatus.show = false
        if (this.state.DataDetails) { this.$refs.dataDetails.toggle(false) } // 关闭详情
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$width: 380px;
$index: 1000;
/deep/ .el-main,
/deep/ .el-footer {
  padding: 0;
}
/deep/ .el-main {
  position: relative;
  overflow-y: hidden;
}
.mapRighr {
  box-sizing: border-box;
  padding: 1px 1px 1px 0;
  position: absolute;
  right: 0;
  top: 44px;
  width: $width;
  z-index: $index;
  background: transparent;
}
.maprightContent {
  width: 100%;
  height: 100%;
  background: #fff;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.7);
}
.onemap {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  box-sizing: border-box;
}
.btn {
  position: absolute;
  top: 200px;
  left: 300px;
  width: 100px;
  z-index: 9999;
}
.footTable {
  box-sizing: border-box;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2000;
  background: #fff;
  box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.4);
  border-top: 1px solid #202340;
}
.footHidden {
  box-sizing: border-box;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2000;
  text-align: center;
}
.rightHidden {
  box-sizing: border-box;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 2000;
  width: 5px;
  text-align: center;
}
.compass {
  position: absolute;
  left: 40px;
  top: 10px;
  z-index: 9999;
  width: 53px;
  height: 54px;
  display: none;
}
.imgLegend {
  position: absolute;
  right: 10px;
  bottom: 10px;
  z-index: 9999;
  background: #fff;
  display: none;
}
/deep/ .leaflet-popup .leaflet-popup-content-wrapper {
  border-radius: 0;
}
/deep/ .leaflet-grab {
  cursor: default;
}
/deep/ .leaflet-container {
  background: #fff;
  outline: 0;
}
/deep/ .el-dialog {
  -webkit-box-shadow: -1px 0 13px #888888;
  box-shadow: -1px 0 13px #888888;
  position: absolute;
  left: auto;
  top: 20%;
  bottom: 40%;
  right: 40%;
  height: 200px;
}
@page {
  // size: auto A4 landscape;
  margin: 10mm;
}
.quanpingvr {
  position: fixed;
  top: 78px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  background: #ffffff;
  overflow: hidden;
}
.footTable /deep/ .el-tabs__nav-wrap {
  padding-right: 126px;
}
.footTable /deep/ .el-tabs__nav-next {
  right: 114px;
}
/deep/ .el-dialog {
  width: 450px !important;
  right: 50% !important;
  margin-right: -325px !important;
  height: 200px !important;
}
</style>
