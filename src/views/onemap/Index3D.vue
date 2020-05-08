<template>
  <el-container>
    <!-- 左侧图层控制 -->
    <transition name="el-fade-in">
      <el-aside :width="state.BaseToc ? '230px' : '5px'">
        <base-toc ref="baseToc" :show="state.BaseToc" :type="mapType" @toggle="toggle"
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
                  @setMapStatus="setMapStatus"
                  @doQueryCompleted="doQueryCompleted"/>
        <!-- 暴露给其他对象切换的方法 -->
        <!-- <div style="position: fixed; bottom: 0; left: 0;" @click="$refs.baseToc.toggle()">切换</div> -->
      </el-aside>
    </transition>

    <!-- 右侧容器 -->

    <!-- main内容 VR 二三维地图 地图右侧详情和功能模块 -->
    <el-main ref="main">
      <!-- 地图部分 -->
      <div id="onemap" ref="onemap" class="onemap"></div>
      <div id="bubble" class="bubble" style="bottom:0;left:0;display:none;">
        <div id="pop" class="mapPop"></div>
      </div>
      <div class="rangeStyle" id="rangeStyle">
        <input type="range" ref="range" style="width: 95%" min="0" max="1" step="0.02" :value="alpha" @input="changeAlpha()">
      </div>
      <div class="bzLayerControl" id="bzLayerControl" ref="bzLayerControl">
        <el-tree ref="tree1"
          :data="bzTreeLayers"
          :default-checked-keys="bzDefaultCheckedKeys"
          show-checkbox
          node-key='id'
          :auto-expand-parent="false"
          @check-change="setBzCheckedLayer">
        </el-tree>
      </div>
      <base-tools-bar ref="baseToolsBar" :type="mapType" :funType="funType" @toolBtn="toolBtn" />
      <!-- 地图右侧功能入口-->
      <advance-tools ref="advanceTools" :type="mapType" @toolBtn="toolBtn" />
      <!-- 地图右侧模块 -->
      <div class="mapRighr" :show="mapRighr" :style="!state.DataDetails ? 'height:auto' : (state.DataTable || state.SpaceSectionAnalysisChart) ? 'bottom: 240px' : 'bottom: 0'">
        <div class="maprightContent">
          <!-- 设施详情 -->
          <data-details ref="dataDetails" :show="state.DataDetails" @toggle="toggle"
                        :baseProps="baseProps"
                        :queryProps="queryProps"
                        @monitor="monitor"/>

          <!-- 空间查询 -->
          <query-space ref="querySpace" :show="state.QuerySpace" :type="mapType" @toggle="toggle" @toggleRightMiniStatus="toggleRightMiniStatus"
                       :baseProps="baseProps"
                       :queryProps="queryProps"
                       @changeLoading="changeLoading"
                       @setOperationType="setOperationType"
                       @clearData="clearData"
                       @clearLayer="clearLayer"
                       @clearDataShow="clearDataShow"
                       @drawGeometry="drawGeometry"
                       @drawBuffer="drawBuffer"
                       @doQueryCompleted="doQueryCompleted"/>

          <!-- 测量 -->
          <space-measure ref="spaceMeasure" :show="state.SpaceMeasure" :type="mapType" @toggle="toggle" @toggleRightMiniStatus="toggleRightMiniStatus"
                         @startMeasure="startMeasure"/>
          <!-- 飞行 -->
          <fly-manage ref="flyManage" :show="state.FlyManage" @toggle="toggle"  @toggleRightMiniStatus="toggleRightMiniStatus"
                         @flyManage="flyManage"/>
          <!-- 暴露给其他对象切换的方法 -->
          <!-- <div style="position: fixed; top: 50px; right: 0; background-color:#fff" @click="$refs.querySpace.toggle()">切换</div> -->
        </div>
      </div>
      <div class="footTable" ref="footTable" v-show="!maximize.map && state.DataTable" :style="footerHeight === '100%' ? 'height: 100%' : `height: ${footerHeight}`">
        <data-table ref="dataTable" :show="state.DataTable" @toggle="toggle" @maximize="toMaximize"  @toggleOnlyState="toggleOnlyState"
                    :height="footTableHeight" :maximize="maximize.DataTable"
                    :baseProps="baseProps"
                    :queryProps="queryProps"
                    @changeLoading="changeLoading"
                    @openMessage="openMessage"
                    @doDrawChangeResults="doDrawChangeResults"
                    @drawDetails="drawDetails"/>
        <!-- 暴露给其他对象切换的方法 -->
        <!-- <div style="position: fixed; bottom: 0; right: 0;" @click="$refs.dataTable.toggle()">切换</div> -->
      </div>
      <div class="footHidden" v-show="stateChange.active && !(!maximize.map && state.DataTable)" @click="toggleOnlyState()" style="cursor:pointer;">
        <img src="../../assets/images/hide_btn_t.png" alt="展开" >
      </div>
      <el-button v-show="rightMiniStatus.show"  @click="toggleRightMiniStatus()" type="text" class="rightHidden">
        <img src="../../assets/images/hide_btn_r.png" alt="展开" >
      </el-button>
      <monitor-pipe v-if="state.MonitorPipe" @toggle="toggle" />
      <monitor-pump v-if="state.MonitorPump" @toggle="toggle" />
    </el-main>
  </el-container>
</template>

<script>
import BaseToc from './BaseToc.vue'
import BaseToolsBar from './BaseToolsBar.vue'
import DataTable from './DataTable.vue'
import DataDetails from './DataDetails.vue'
import QuerySpace from './QuerySpace.vue'
import SpaceMeasure from './SpaceMeasure.vue'
import FlyManage from './FlyManage.vue'
import MonitorPipe from './MonitorPipe.vue'
import MonitorPump from './MonitorPump.vue'
import AdvanceTools from './AdvanceTools.vue'

import L from 'leaflet'
import '@supermap/iclient-leaflet'
const Cesium = window.Cesium
export default {
  name: 'Index3D',
  components: {
    BaseToc,
    BaseToolsBar,
    DataTable,
    DataDetails,
    QuerySpace,
    SpaceMeasure,
    FlyManage,
    MonitorPipe,
    AdvanceTools,
    MonitorPump
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
  data () {
    return {
      state: {
        BaseToc: true, // 左侧图层目录结构
        BaseToolsBar: true, // 工具条
        BaseLegend: false, // 图例(功能暂未使用)
        BasePop: false, // 地图气泡
        DataTable: false, // 下方表格
        DataDetails: false, // 设施详情
        QuerySpace: false, // 空间查询
        SpaceMeasure: false, // 测量
        FlyManage: false, // 飞行
        Is2D: false, // 2d 为真，3d为假
        VR: { value: false, name: 'ghbz' }, // VR 的value值 和 路径/名称
        MonitorPump: false, // 泵站运行
        MonitorPipe: false // 管网监测
      },
      stateChange: { active: false }, // 存储最小化的改变量
      maximize: {
        DataTable: false,
        map: false
      },
      footTableHeight: '240px', // 获取及时的底部footTable值
      mapType: '3d',
      srcArraycl: {
        info: require('./static/icon-info.png'),
        open: require('./static/icon-close.png')
      },
      /** ********************地图属性****************************/
      viewer: {},
      scene: {},
      globe: {},
      handler: {},
      infoboxContainer: {},
      widget: {},
      handlerDis: {},
      handlerArea: {},
      handlerHeight: {},
      handlerPolygon: null,
      alpha: 1.0,
      tempAlpha: 0,
      flyManager: null,
      flyProps: [],
      flyFlag: false,
      operationType: '',
      scenePosition: null,
      entityIds: [],
      mapData: [],
      imageryWgs: [],
      selectColor: null,
      clickTypeName: null,
      toolTip: null,
      ellipsoid: {},
      flags: {
        looking: false,
        moveForward: false,
        moveBackward: false,
        moveUp: false,
        moveDown: false,
        moveLeft: false,
        moveRight: false
      },
      /** ********************查询属性**********************/
      // 查询图层i|j
      selectedLayerNames: [],
      // 图层查询条件
      attributeFilter: [],
      selectedFeatures: [],
      selectedCounts: [],
      /** ********************泵站控制****************************/
      bzTreeLayers: [],
      bzDefaultCheckedKeys: [],
      /** **************地图右侧某些模块最小化************************/
      rightMiniStatus: { show: false, names: [] }
    }
  },
  mounted () {
    // 使用nextTick为了保证dom元素都已经渲染完毕
    this.$nextTick(() => {
      this.removeKeyCodeNotify()
      // 初始化地图
      this.initMap()
      this.bzTreeLayers = this.baseProps['bzTreeLayers']
      this.bzDefaultCheckedKeys = []
      for (let i = 0; i < this.bzTreeLayers.length; i++) {
        if (this.bzTreeLayers[i].visible) this.bzDefaultCheckedKeys.push(this.bzTreeLayers[i].id)
      }
    })
  },
  computed: {
    footerHeight () {
      // return this.maximize.DataTable || this.maximize.SpaceSectionAnalysisChart ? '100%' : this.state.DataTable || this.state.SpaceSectionAnalysisChart ? '200px' : '5px'
      if (this.maximize.DataTable || this.maximize.SpaceSectionAnalysisChart) return '100%'
      else return '240px'
    },
    mapRighr () {
      return this.state.DataDetails || this.state.QuerySpace || this.state.SpaceTraceability || this.state.SpaceSectionAnalysis
    }
  },
  methods: {
    // 初始化查询属性
    initSelected () {
      this.selectedLayerNames = []
      this.attributeFilter = []
      this.selectedFeatures = []
      this.selectedCounts = []
    },
    // 初始化数据
    clearData () {
      this.initSelected()
    },
    // 清除图层标绘
    clearLayer (bubbleFlag) {
      if (bubbleFlag === undefined || bubbleFlag) this.closeBubble()
      this.viewer.entities.removeAll()
      this.entityIds = []
      this.removeObjsColor()
    },
    // 清除查询组件条件
    clearSpace () {
      if (this.state.QuerySpace) this.$refs.querySpace.clearSpace()
    },
    // 关闭数据显示组件
    clearDataShow (flag) {
      if (flag === undefined || flag) this.$refs.dataTable.toggle(false)
      this.$refs.dataDetails.toggle(false)
    },
    // 关闭所有子组件
    clearToggleShow () {
      this.$refs.querySpace.toggle(false)
      this.$refs.spaceMeasure.toggle(false)
      this.$refs.flyManage.toggle(false)
    },
    // 消息提醒弹窗
    openMessage (message, val) { // success/warning/info/error
      this.$emit('openMessage', message, val)
    },
    changeLoading (flag) {
      this.$emit('changeLoading', flag)
    },
    // 创建地图
    initMap () {
      this.viewer = new Cesium.Viewer('onemap', {
        'selectionIndicator': false,
        'infoBox': false,
        'showRenderLoopErrors': false
        /**
        'imageryProvider': new Cesium.SingleTileImageryProvider({
          url: './static/background.png'
        })
         **/
      })
      this.viewer.customInfobox = null
      this.viewer.enableCursorStyle = false
      this.viewer._element.style.cursor = ''
      this.viewer.terrainShadows = Cesium.ShadowMode.DISABLED
      $('body').removeClass('drawCur').addClass('drawCur')
      this.infoboxContainer = document.getElementById('bubble')
      this.scene = this.viewer.scene
      this.scene.undergroundMode = true
      this.scene.screenSpaceCameraController.minimumZoomDistance = -1000
      this.scene.terrainProvider.isCreateSkirt = false // 关闭裙边
      this.globe = this.scene.globe
      this.globe.globeAlpha = this.alpha
      this.globe.cullEnabled = false
      // this.globe.showGroundAtmosphere = false
      this.handler = new Cesium.ScreenSpaceEventHandler(this.scene.canvas)
      this.widget = this.viewer.cesiumWidget
      this.selectedColor = Cesium.Color.fromCssColorString('rgba(254,223,10,1.0)')
      this.ellipsoid = this.scene.globe.ellipsoid
      /** **************************************添加底图****************************/
      this.mapData = this.baseProps['geoMap_3d']
      let imageryLayers = this.viewer.imageryLayers
      for (let i = 0; i < this.mapData.length; i++) {
        if (this.mapData[i].visible) {
          let providerWgs = new Cesium.SuperMapImageryProvider({
            url: this.mapData[i].url_map
          })
          let wgs = imageryLayers.addImageryProvider(providerWgs)
          // wgs.brightness = 2.0
          if (this.mapData[i].visible) {
            if (this.mapData[i].alpha) wgs.alpha = this.alpha
            else wgs.alpha = 1.0
          }
          this.imageryWgs[this.mapData[i].typeName] = wgs
        }
      }
      /** **************************************添加3D图层****************************/
      let promise = this.scene.open(this.baseProps['url_map_3d'])
      Cesium.when(promise, () => {
        for (let i = 0; i < this.queryProps['layerVisible'].length; i++) {
          if (this.queryProps['layerVisible'][i].layer_3d !== '') {
            let layer = this.scene.layers.find(this.queryProps['layerVisible'][i].layer_3d)
            if (layer) {
              layer.visible = this.queryProps['layerVisible'][i].visible
              layer.selectColorType = 1
              layer.selectedColor = this.selectedColor
              layer.setQueryParameter({
                url: this.baseProps['url_data3d'],
                dataSourceName: this.baseProps['dataSourceName3d'],
                dataSetName: this.queryProps['layerVisible'][i].datasetNames,
                keyWord: 'SMID'
              })
            }
          }
        }
      })
      if (this.baseProps['dimianMap_3d'] !== '') {
        let promise1 = this.scene.open(this.baseProps['dimianMap_3d'])
        Cesium.when(promise1, () => {
          let enabledLayers = this.baseProps['dmSelectEnabledLayers_3d']
          for (let i = 0; i < enabledLayers.length; i++) {
            let layer = this.scene.layers.find(enabledLayers[i])
            if (layer) {
              layer.selectEnabled = false
              layer.style3D.fillForeColor.alpha = 0.95
              // layer.maxVisibleAltitude = 200
              // layer.visibleDistanceMax = 200
            }
          }
          let alphaLayers = this.baseProps['dmSelectAlphaLayers_3d']
          for (let i = 0; i < alphaLayers.length; i++) {
            let layer = this.scene.layers.find(alphaLayers[i])
            if (layer) {
              layer.style3D.fillForeColor.alpha = this.alpha
            }
          }
          let visibleLayers = this.baseProps['dmUnVisibleLayers_3d']
          for (let i = 0; i < visibleLayers.length; i++) {
            let layer = this.scene.layers.find(visibleLayers[i])
            if (layer) {
              layer.visible = false
            }
          }
        })
      }
      if (this.baseProps['bengzhanMap_3d'] !== '') {
        let promise2 = this.scene.open(this.baseProps['bengzhanMap_3d'])
        Cesium.when(promise2, () => {
          let enabledLayers = this.baseProps['bzSelectEnabledLayers_3d']
          for (let i = 0; i < enabledLayers.length; i++) {
            let layer = this.scene.layers.find(enabledLayers[i])
            if (layer) {
              layer.selectEnabled = false
            }
          }
        })
      }
      if (this.baseProps['wushuiMap_3d'] !== '') {
        let promise3 = this.scene.open(this.baseProps['wushuiMap_3d'])
        Cesium.when(promise3, () => {
          let enabledLayers = this.baseProps['wsSelectEnabledLayers_3d']
          for (let i = 0; i < enabledLayers.length; i++) {
            let layer = this.scene.layers.find(enabledLayers[i])
            if (layer) {
              layer.selectEnabled = false
            }
          }
        })
      }
      if (this.baseProps['qinxieMap_3d'] !== '') {
        let promise4 = this.scene.open(this.baseProps['qinxieMap_3d'])
        Cesium.when(promise4, () => {
          let enabledLayers = this.baseProps['qxSelectEnabledLayers_3d']
          for (let i = 0; i < enabledLayers.length; i++) {
            let layer = this.scene.layers.find(enabledLayers[i])
            if (layer) {
              layer.selectEnabled = false
            }
          }
        })
      }
      /** **************************************每一帧都去计算气泡的正确位置*********************************/
      this.scene.postRender.addEventListener(() => {
        if (this.scenePosition !== null) {
          let canvasHeight = this.scene.canvas.height
          let windowPosition = new Cesium.Cartesian2()
          Cesium.SceneTransforms.wgs84ToWindowCoordinates(this.scene, this.scenePosition, windowPosition)
          this.infoboxContainer.style.bottom = (canvasHeight - windowPosition.y + 100) + 'px'
          this.infoboxContainer.style.left = (windowPosition.x - 70) + 'px'
          this.infoboxContainer.style.visibility = 'visible'
        }
      })
      /** **************************************鼠标左键事件监听**********************/
      this.viewer.pickEvent.addEventListener((feature) => {
        let attributeFilter = 'USEADDID = ' + feature.USEADDID
        this.doOnclickQuery(this.clickTypeName, attributeFilter)
      })
      this.handler.setInputAction((e) => {
        let position = this.scene.pickPosition(e.position)
        if (this.operationType === 'flySelf' && this.flyFlag) {
          if (position !== undefined) {
            let camera = this.scene.camera
            let heading = camera.heading
            let pitch = camera.pitch
            this.flyProps.push({
              'position': position,
              'heading': heading,
              'pitch': pitch
            })
            let viewIcon = {
              image: './3d/images/station.png',
              width: 64,
              height: 64
            }
            this.viewer.entities.add({
              position: position,
              billboard: viewIcon
            })
          }
        }
        if (position === undefined) {
          position = Cesium.Cartesian3.fromDegrees(0, 0, 0)
        }
        this.scenePosition = position
        let pick = this.scene.pick(e.position)
        if (this.operationType === '' || this.operationType.indexOf('fly') > -1) {
          // 监听要素选中
          let selectCount = 0
          for (let i = 0; i < this.queryProps['layerVisible'].length; i++) {
            if (this.queryProps['layerVisible'][i].layer_3d !== '') {
              let typeName = this.queryProps['layerVisible'][i].typeName
              let layer = this.scene.layers.find(this.queryProps['layerVisible'][i].layer_3d)
              if (layer) {
                let ids = layer.getSelection()
                if (ids.length > 0) {
                  this.infoboxContainer.style.display = 'none'
                  this.infoboxContainer.style.visibility = 'hidden'
                  this.clickTypeName = typeName
                  selectCount += 1
                  break
                }
              }
            }
          }
          // 泵站图层
          for (let i = 0; i < this.baseProps['bzLayers'].length; i++) {
            if (this.baseProps['bzLayers'][i].layer_3d !== '') {
              let typeName = this.baseProps['bzLayers'][i].typeName
              let layer = this.scene.layers.find(this.baseProps['bzLayers'][i].layer_3d)
              if (layer) {
                let ids = layer.getSelection()
                if (ids.length > 0) {
                  this.infoboxContainer.style.display = 'none'
                  this.infoboxContainer.style.visibility = 'hidden'
                  this.doOnclickQuery(typeName, 'SMID = ' + ids[0])
                  selectCount += 1
                  break
                }
              }
            }
          }
          // 倾斜摄影图层
          // 首先移除之前添加标识实体
          this.viewer.entities.removeById('identify-area')
          // 从笛卡尔坐标获取经纬度
          let cartographic = Cesium.Cartographic.fromCartesian(position)
          let longitude = Cesium.Math.toDegrees(cartographic.longitude)
          let latitude = Cesium.Math.toDegrees(cartographic.latitude)
          this.queryByPoint(longitude, latitude, selectCount)
        } else {
          // 监听标绘选中
          if (Cesium.defined(pick)) {
            if (pick.id !== undefined && pick.id.description !== undefined) {
              document.getElementById('pop').innerHTML = pick.id.description
              this.openBubble()
            }
          } else {
            this.closeBubble()
          }
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
      /** ****************************通过鼠标控制方向*************************************/
      // 按下
      document.addEventListener('keydown', (e) => {
        let flagName = this.getFlagForKeyCode(e.keyCode)
        if (typeof flagName !== 'undefined') {
          this.flags[flagName] = true
        }
      }, false)
      // 抬起
      document.addEventListener('keyup', (e) => {
        let flagName = this.getFlagForKeyCode(e.keyCode)
        if (typeof flagName !== 'undefined') {
          this.flags[flagName] = false
        }
      }, false)
      this.viewer.clock.onTick.addEventListener((clock) => {
        let camera = this.scene.camera
        // let cameraHeight = this.ellipsoid.cartesianToCartographic(camera.position).height
        let moveRate = 100 // cameraHeight / 50.0
        if (this.flags.moveForward) {
          camera.moveForward(moveRate)
        }
        if (this.flags.moveBackward) {
          camera.moveBackward(moveRate)
        }
        if (this.flags.moveUp) {
          camera.moveUp(moveRate)
        }
        if (this.flags.moveDown) {
          camera.moveDown(moveRate)
        }
        if (this.flags.moveLeft) {
          camera.moveLeft(moveRate)
        }
        if (this.flags.moveRight) {
          camera.moveRight(moveRate)
        }
      })
      /** **************************************相机监听**********************/
      /**
      this.scene.camera.moveEnd.addEventListener((e) => {
        let position = this.scene.camera.position
        let cartographic = Cesium.Cartographic.fromCartesian(position)
        let height = cartographic.height
        if (height < 0) {
          this.scene.screenSpaceCameraController.enableRotate = false // 旋转相机
          this.scene.screenSpaceCameraController.enableTranslate = false // 浏览地图
          this.scene.screenSpaceCameraController.enableZoom = false // 放大和缩小
          this.scene.screenSpaceCameraController.enableTilt = false // 倾斜相机
          this.scene.screenSpaceCameraController.enableLook = false
        } else {
          this.scene.screenSpaceCameraController.enableRotate = true
          this.scene.screenSpaceCameraController.enableTranslate = true
          this.scene.screenSpaceCameraController.enableZoom = true
          this.scene.screenSpaceCameraController.enableTilt = true
          this.scene.screenSpaceCameraController.enableLook = true
        }
      })
       **/
      /** **************************************量算**********************/
      let clampMode = 0 // 空间模式
      // 初始化测量距离
      this.handlerDis = new Cesium.MeasureHandler(this.viewer, Cesium.MeasureMode.Distance, clampMode)
      // 注册测距功能事件
      this.handlerDis.measureEvt.addEventListener((result) => {
        let dis = Number(result.distance)
        let distance = dis > 1000 ? (dis / 1000).toFixed(2) + '千米' : dis.toFixed(2) + '米'
        this.$refs.spaceMeasure.spaceMeasureLengthForm.total = distance
        this.$refs.spaceMeasure.control = ''
        this.handlerDis.disLabel.text = distance
      })
      this.handlerDis.activeEvt.addEventListener((isActive) => {
        if (isActive === true) {
          this.viewer.enableCursorStyle = false
          this.viewer._element.style.cursor = ''
          $('body').removeClass('measureCur').addClass('measureCur')
        } else {
          this.viewer.enableCursorStyle = true
          $('body').removeClass('measureCur')
        }
      })
      // 初始化测量面积
      this.handlerArea = new Cesium.MeasureHandler(this.viewer, Cesium.MeasureMode.Area, clampMode)
      this.handlerArea.measureEvt.addEventListener((result) => {
        let mj = Number(result.area)
        let area = mj > 1000000 ? (mj / 1000000).toFixed(2) + '平方千米' : mj.toFixed(2) + '平方米'
        this.$refs.spaceMeasure.spaceMeasureAreaForm.area = area
        this.$refs.spaceMeasure.control = ''
        this.handlerArea.areaLabel.text = area
      })
      this.handlerArea.activeEvt.addEventListener((isActive) => {
        if (isActive === true) {
          this.viewer.enableCursorStyle = false
          this.viewer._element.style.cursor = ''
          $('body').removeClass('measureCur').addClass('measureCur')
        } else {
          this.viewer.enableCursorStyle = true
          $('body').removeClass('measureCur')
        }
      })
      // 初始化测量高度
      this.handlerHeight = new Cesium.MeasureHandler(this.viewer, Cesium.MeasureMode.DVH, clampMode)
      this.handlerHeight.measureEvt.addEventListener((result) => {
        let distance = result.distance > 1000 ? (result.distance / 1000).toFixed(2) + '千米' : result.distance + '米'
        let vHeight = result.verticalHeight > 1000 ? (result.verticalHeight / 1000).toFixed(2) + '千米' : result.verticalHeight + '米'
        let hDistance = result.horizontalDistance > 1000 ? (result.horizontalDistance / 1000).toFixed(2) + '千米' : result.horizontalDistance + '米'
        this.$refs.spaceMeasure.spaceSpaceMeasureHeightForm.disLength = distance
        this.$refs.spaceMeasure.spaceSpaceMeasureHeightForm.vLength = vHeight
        this.$refs.spaceMeasure.spaceSpaceMeasureHeightForm.hLength = hDistance
        this.$refs.spaceMeasure.control = ''
        this.handlerHeight.disLabel.text = distance
        this.handlerHeight.vLabel.text = vHeight
        this.handlerHeight.hLabel.text = hDistance
      })
      this.handlerHeight.activeEvt.addEventListener((isActive) => {
        if (isActive === true) {
          this.viewer.enableCursorStyle = false
          this.viewer._element.style.cursor = ''
          $('body').removeClass('measureCur').addClass('measureCur')
        } else {
          this.viewer.enableCursorStyle = true
          $('body').removeClass('measureCur')
        }
      })
      this.initFlyTo()
      this.addKeyCodeNotify()
    },
    addKeyCodeNotify () {
      this.$notify({
        title: '键盘控制',
        dangerouslyUseHTMLString: true,
        message: '<table>' +
          '<tr><td style="width: 75px;text-align:right;">Q键：</td><td>上移</td>' +
          '<td style="width: 75px;text-align:right;">E键：</td><td>下移</td></tr>' +
          '<tr><td style="width: 75px;text-align:right;">W键：</td><td>前进</td>' +
          '<td style="width: 75px;text-align:right;">S键：</td><td>后退</td></tr>' +
          '<tr><td style="width: 75px;text-align:right;">A键：</td><td>左移</td>' +
          '<td style="width: 75px;text-align:right;">D键：</td><td>右移</td></tr>' +
          ' </table>',
        position: 'bottom-right',
        duration: 10000
      })
    },
    removeKeyCodeNotify () {
      this.$notify.closeAll()
    },
    // 判断 按键 值对应的操作
    getFlagForKeyCode (keyCode) {
      switch (keyCode) {
        case 'W'.charCodeAt(0):
          return 'moveForward' // 前进
        case 'S'.charCodeAt(0):
          return 'moveBackward' // 后退
        case 'Q'.charCodeAt(0):
          return 'moveUp' // 上移
        case 'E'.charCodeAt(0):
          return 'moveDown' // 下移
        case 'D'.charCodeAt(0):
          return 'moveRight' // 右移
        case 'A'.charCodeAt(0):
          return 'moveLeft' // 左移
        default:
          return undefined
      }
    },
    // 透明度设置
    changeAlpha (value) {
      if (value === undefined) {
        let range = this.$refs.range
        this.alpha = range.value
      } else {
        this.alpha = value
      }
      this.globe.globeAlpha = this.alpha
      for (let i = 0; i < this.mapData.length; i++) {
        if (this.mapData[i].visible && this.mapData[i].alpha) {
          this.imageryWgs[this.mapData[i].typeName].alpha = this.alpha
        }
      }
      let alphaLayers = this.baseProps['dmSelectAlphaLayers_3d']
      for (let i = 0; i < alphaLayers.length; i++) {
        let layer = this.scene.layers.find(alphaLayers[i])
        if (layer) layer.style3D.fillForeColor.alpha = this.alpha
      }
    },
    // 点击地图显示
    doOnclickQuery (typeName, attributeFilter) {
      if (this.operationType === '' || this.operationType.indexOf('fly') > -1) {
        let layer = this.queryProps[typeName]
        let fields = ['SMID', 'POPTITLE']
        for (let h = 0; h < layer.simpleList.length; h++) {
          let tabFields = layer.simpleList[h]
          let columnEName = (tabFields.columnEName).toUpperCase()
          fields.push(columnEName)
        }
        let getParameters = new SuperMap.GetFeaturesBySQLParameters({
          queryParameter: {
            attributeFilter: attributeFilter,
            fields: fields
          },
          datasetNames: [layer.datasetNames]
        })
        L.supermap
          .featureService(this.baseProps['url_data'])
          .getFeaturesBySQL(getParameters, (serviceResult) => {
            let features = serviceResult.result.features.features
            if (features && features.length > 0) {
              this.clearData()
              let feature = features[0]
              this.selectedLayerNames.push(typeName)
              let results = []
              results[0] = feature
              this.selectedFeatures.push(results)
              let id = typeName + '|0|0'
              document.getElementById('pop').innerHTML = this.setPopContent(feature, id)
              this.openBubble()
              this.removeObjsColor()
              this.setObjsColor(id)
            }
          })
      }
    },
    // POP内容
    setPopContent (feature, id) {
      let temp = id.split('|')
      let typeName = temp[0]
      // let i = temp[1]
      // let j = temp[2]
      // let feature = this.selectedFeatures[i][j]
      let label = this.queryProps[typeName].label
      let popTitle = feature.properties['POPTITLE']
      let content = '<div id="featureId" style="display:none">' + id + '</div>' +
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
        let value = feature.properties[columnEName]
        if (columnDisplayType === '1') {
          for (let s = 0; s < columnOptions.length; s++) {
            if (value === columnOptions[s].optionKey) {
              value = columnOptions[s].optionValue
            }
          }
        }
        content += '<tr><td style="min-width: 150px;">' + columnName + '：</td><td>' + ((value !== undefined && value !== null && value !== 'NULL' && value !== 'null') ? value : '') + '</td></tr>'
      }
      content += '</table>'
      return content
    },
    openBubble () {
      this.infoboxContainer.style.display = 'block'
      this.infoboxContainer.style.visibility = 'block'
      setTimeout(() => {
        document.getElementById('popOpen').addEventListener('click', (e) => {
          this.showDetails(document.getElementById('featureId').innerHTML)
        })
        document.getElementById('popClose').addEventListener('click', (e) => {
          this.closeBubble()
        })
      }, 1000)
    },
    closeBubble () {
      this.scenePosition = null
      this.infoboxContainer.style.display = 'none'
      this.infoboxContainer.style.visibility = 'hidden'
      this.$refs.dataDetails.toggle(false)
      this.removeObjsColor()
    },
    // 高亮显示
    setObjsColor (id) {
      let temp = id.split('|')
      let typeName = temp[0]
      let i = temp[1]
      let j = temp[2]
      let feature = this.selectedFeatures[i][j]
      let layer = this.scene.layers.find(this.queryProps[typeName].layer_3d)
      if (layer) {
        let ids = []
        ids[0] = feature.properties['SMID']
        layer.setObjsColor(ids, this.selectedColor)
      }
    },
    // 删除高亮显示
    removeObjsColor () {
      for (let i = 0; i < this.queryProps['layerVisible'].length; i++) {
        if (this.queryProps['layerVisible'][i].layer_3d !== '') {
          let layer = this.scene.layers.find(this.queryProps['layerVisible'][i].layer_3d)
          if (layer) {
            // layer.removeAllObjsColor()
            if (layer.getSelection().length > 0) layer.removeObjsColor(layer.getSelection())
          }
        }
      }
      // 泵站图层
      for (let i = 0; i < this.baseProps['bzLayers'].length; i++) {
        if (this.baseProps['bzLayers'][i].layer_3d !== '') {
          let layer = this.scene.layers.find(this.baseProps['bzLayers'][i].layer_3d)
          if (layer) {
            layer.removeAllObjsColor()
          }
        }
      }
    },
    setLayerStatus (tempCheckedKeys) {
      for (let i = 0; i < this.queryProps['layerVisible'].length; i++) {
        if (this.queryProps['layerVisible'][i].layer_3d !== '') {
          let layer = this.scene.layers.find(this.queryProps['layerVisible'][i].layer_3d)
          if (layer) {
            layer.visible = this.queryProps['layerVisible'][i].visible
          }
        }
      }
      this.$emit('setCheckedKeys', tempCheckedKeys, this.queryProps['layerVisible'])
      if (this.operationType === 'query') this.$refs.querySpace.initSelectedLayers()
    },
    setMapStatus (mapData) {
      /**
      this.mapData = mapData
      let range = this.$refs.range
      this.globe.globeAlpha = range.value
      for (let i = 0; i < this.mapData.length; i++) {
        if (this.mapData[i].visible) {
          this.imageryWgs[this.mapData[i].typeName].alpha = range.value
        }
      }
     **/
    },
    // 查询获取数据
    doQueryCompleted (selectedLayerNames, attributeFilter, selectedFeatures, selectedCounts, oldCount, geometry, geoType) {
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
      this.$refs.dataTable.toggle(true)
      this.$refs.dataTable.isSectionShow = false
      this.$refs.dataTable.activeName = '1'
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
      if (this.operationType === 'toc' || this.operationType === 'query') this.$refs.dataTable.showResults(false, true, oldCount)
    },
    doDrawResults (oldCount) {
      let count = 0
      if (oldCount === undefined) oldCount = 0
      for (let i = 0; i < this.selectedFeatures.length; i++) {
        if (this.selectedFeatures[i].length > 0) {
          for (let j = 0; j < this.selectedFeatures[i].length; j++) {
            let feature = this.selectedFeatures[i][j]
            let lat = 0
            let lng = 0
            let z = 0
            if (count === oldCount) {
              let id = this.selectedLayerNames[i] + '|' + i.toString() + '|' + j.toString()
              if (feature.geometry.type === 'Point' || feature.geometry.type === 'POINT') {
                lat = feature.geometry.coordinates[1]
                lng = feature.geometry.coordinates[0]
                if (feature.properties.hasOwnProperty('MANHOLE_TY')) z = 1
                else z = 8
              } else if (feature.geometry.type === 'LineString' || feature.geometry.type === 'LINE') {
                lat = (feature.geometry.coordinates[0][1] + feature.geometry.coordinates[1][1]) / 2
                lng = (feature.geometry.coordinates[0][0] + feature.geometry.coordinates[1][0]) / 2
                z = 1
              }
              this.addPointFeature(feature, lng, lat, z, 1, id)
              if (j === 0) {
                this.flyToLonLat(lng, lat, false)
              }
            } else break
          }
          count++
        }
      }
    },
    doDrawChangeResults (features, i) {
      this.$refs.dataDetails.toggle(false)
      this.clearLayer()
      if (features.length > 0) {
        for (let j = 0; j < features.length; j++) {
          let feature = features[j]
          let lat = 0
          let lng = 0
          let z = 0
          let id = this.selectedLayerNames[i] + '|' + i.toString() + '|' + j.toString()
          if (feature.geometry.type === 'Point' || feature.geometry.type === 'POINT') {
            lat = feature.geometry.coordinates[1]
            lng = feature.geometry.coordinates[0]
            if (feature.properties.hasOwnProperty('MANHOLE_TY')) z = 1
            else z = 8
          } else if (feature.geometry.type === 'LineString' || feature.geometry.type === 'LINE') {
            lat = (feature.geometry.coordinates[0][1] + feature.geometry.coordinates[1][1]) / 2
            lng = (feature.geometry.coordinates[0][0] + feature.geometry.coordinates[1][0]) / 2
            z = 1
          }
          this.addPointFeature(feature, lng, lat, z, 1, id)
          if (j === 0) {
            this.flyToLonLat(lng, lat, false)
            break
          }
        }
      }
    },
    drawDetails (feature, id) {
      this.$refs.dataDetails.toggle(false)
      let lat = 0
      let lng = 0
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
              lat = feature.geometry.coordinates[1]
              lng = feature.geometry.coordinates[0]
            } else if (feature.geometry.type === 'LineString' || feature.geometry.type === 'LINE') {
              lat = (feature.geometry.coordinates[0][1] + feature.geometry.coordinates[1][1]) / 2
              lng = (feature.geometry.coordinates[0][0] + feature.geometry.coordinates[1][0]) / 2
            }
            document.getElementById('pop').innerHTML = this.setPopContent(feature, id)
            this.flyToLonLat(lng, lat, true)
            this.removeObjsColor()
            this.setObjsColor(id)
          }
        })
    },
    // 显示详情
    showDetails (id) {
      let temp = id.split('|')
      let typeName = temp[0]
      let i = temp[1]
      let j = temp[2]
      let feature = this.selectedFeatures[i][j]
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
    },
    /** **********************************添加图层标记**************************************/
    addPointFeature (feature, lng, lat, z, style, id) {
      let viewIcon
      if (style === 1) {
        viewIcon = {
          image: './2d/img/point_blue.png',
          width: 18,
          height: 24
        }
      }
      this.viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(lng, lat, z),
        billboard: viewIcon,
        id: feature.properties['SMID'],
        description: this.setPopContent(feature, id)
      })
      this.entityIds.push(feature.properties['SMID'])
    },
    flyToLonLat (longitude, latitude, isBubbleVisible) {
      let camera = this.scene.camera
      let z = Math.ceil(camera.positionCartographic.height)
      let p = camera._positionCartographic
      let x = this.$refs.onemap.offsetWidth / 2
      let y = this.$refs.onemap.offsetHeight / 2
      let _center = new Cesium.Cartesian2(x, y)
      let __center = this.globe.pick(camera.getPickRay(_center), this.scene)
      let center = this.globe.ellipsoid.cartesianToCartographic(__center)
      let dx = (center.longitude - p.longitude) / Math.PI * 180
      let dy = (center.latitude - p.latitude) / Math.PI * 180
      let heading = camera.heading
      let pitch = camera.pitch
      let position = Cesium.Cartesian3.fromDegrees(longitude - dx, latitude - dy, z)
      camera.flyTo({
        destination: position,
        orientation: {
          heading: heading,
          pitch: pitch
        },
        complete: this.setBubbleVisible(isBubbleVisible, position),
        duration: 2
      })
    },
    setBubbleVisible (isBubbleVisible, position) {
      if (isBubbleVisible) {
        this.closeBubble()
        let canvasHeight = this.scene.canvas.height
        let x = this.$refs.onemap.offsetWidth / 2 - 70
        let y = this.$refs.onemap.offsetHeight / 2 + 100
        let windowPosition = Cesium.SceneTransforms.wgs84ToWindowCoordinates(this.scene, position)
        if (windowPosition !== undefined) {
          x = windowPosition.x - 70
          y = canvasHeight - windowPosition.y + 100
        }
        this.infoboxContainer.style.bottom = y + 'px'
        this.infoboxContainer.style.left = x + 'px'
        this.infoboxContainer.style.visibility = 'visible'
        // this.scenePosition = position
        setTimeout(() => {
          this.openBubble()
        }, 1000)
      }
    },
    initFlyTo (height) {
      if (height === undefined) height = 5000
      let position
      if (this.centerLonLat.lng !== undefined && this.centerLonLat.lat !== undefined) {
        position = Cesium.Cartesian3.fromDegrees(parseFloat(this.centerLonLat.lng.toFixed(5)), parseFloat(this.centerLonLat.lat.toFixed(5)), height)
        this.scene.camera.flyTo({
          destination: position,
          orientation: {
            heading: Cesium.Math.toRadians(0.0),
            pitch: Cesium.Math.toRadians(-90.0),
            roll: 0.0
          },
          duration: 2
        })
      } else {
        position = new Cesium.Cartesian3(this.baseProps['mapCenter_3d'][0], this.baseProps['mapCenter_3d'][1], this.baseProps['mapCenter_3d'][2])
        this.scene.camera.flyTo({
          destination: position,
          orientation: {
            heading: this.baseProps['mapCenter_3d'][3],
            pitch: this.baseProps['mapCenter_3d'][4],
            roll: this.baseProps['mapCenter_3d'][5]
          },
          duration: 2
        })
      }
    },
    initFlyManage () {
      let file = ''
      let i = 0
      if (this.operationType === 'flygw') file = this.baseProps['flyFiles'].gw
      else if (this.operationType === 'flybz') file = this.baseProps['flyFiles'].bz
      else if (this.operationType === 'flyws') file = this.baseProps['flyFiles'].ws
      if (file !== '') {
        let routes = new Cesium.RouteCollection()
        routes.fromFile(file)
        this.flyManager = new Cesium.FlyManager({
          scene: this.scene,
          routes: routes
        })
        this.flyManager.readyPromise.then(() => {
          let currentRoute = this.flyManager.currentRoute
          currentRoute.isLineVisible = false // 飞行路线是否可见
          currentRoute.isStopVisible = false // 站点标志是否可见
          currentRoute.isAlongline = true // 是否沿线飞行
          currentRoute.isFlyLoop = false // 是否循环飞行
          let routeStops = this.flyManager.getAllRouteStops()
          this.flyManager.stopArrived.addEventListener((e) => {
            i++
            if (i === routeStops.length - 1) {
              this.changeAlpha(this.tempAlpha)
            }
          })
          this.flyManager.viewToStop(routeStops[0])
        })
      }
    },
    flyManage (type) {
      if (type === 'play') {
        this.flyPlay()
        this.tempAlpha = this.alpha
        this.changeAlpha(0)
      } else if (type === 'pause') {
        this.flyPause()
      } else if (type === 'stop') {
        this.flyStop()
        this.changeAlpha(this.tempAlpha)
      } else if (type === 'start') {
        this.flySelf()
      } else if (type === 'clear') {
        this.flyProps = []
        this.viewer.entities.removeAll()
        this.flyFlag = false
      } else if (type === 'draw') {
        this.flyProps = []
        this.flyFlag = true
      }
    },
    flyPlay () {
      if (this.flyManager) this.flyManager.play()
    },
    flyPause () {
      if (this.flyManager) this.flyManager.pause()
    },
    flyStop () {
      if (this.flyManager) this.flyManager.stop()
    },
    flySelf () {
      if (this.flyProps.length > 0) {
        for (let i = 0; i < this.flyProps.length; i++) {
          if (i === 0) this.flyTo(i)
          else {
            setTimeout(() => {
              this.flyTo(i)
            }, (5000 * i))
          }
        }
        /**
         let route = new Cesium.Route({
          isStopVisible: false, // 站点标志是否可见
          isFlyLoop: true, // 是否循环飞行
          isLineVisible: false, // 飞行路线是否可见
          routeName: 'myRoute', // 飞行路线名称
          speed: 50, // 飞行速度
          isAlongline: true // 是否沿线飞行
          // totalDuration // 总共的飞行时间
        })
         for (let i = 0; i < this.flyProps.length; i++) {
          let stop = new Cesium.RouteStop({
            duration: 5, // 当前站点到下一站点所持续的时间
            waitTime: 0, // 在本站点停留的时间
            point: this.flyProps[i].position, // 本站点的位置
            heading: this.flyProps[i].heading, // 本站点的方位角，方位角为与正北方向的夹角
            tilt: this.flyProps[i].pitch, // 本站点的俯仰角
            stopName: 'stop' + i, // 站点的名称
            // distanceToNext:100, // 当前站点到下一站点的距离
            speed: 50 // 本站点的飞行速度
          })
          route.addStop(stop)
        }
         let routes = new Cesium.RouteCollection()
         routes.addRoute(route)
         let my = new Cesium.FlyManager({
          scene: this.scene,
          routes: routes
        })
         my.readyPromise.then(function () {
          let currentRoute = my.currentRoute
          currentRoute.isLineVisible = false // 飞行路线是否可见
          currentRoute.isStopVisible = false // 站点标志是否可见
          currentRoute.isAlongline = true // 是否沿线飞行
          currentRoute.isFlyLoop = true // 是否循环飞行
          // console.log(my.currentRoute, my.getAllRouteStops())
          my.play()
        })
         **/
      }
    },
    flyTo (k) {
      let camera = this.scene.camera
      camera.flyTo({
        destination: this.flyProps[k].position,
        orientation: {
          heading: this.flyProps[k].heading,
          pitch: this.flyProps[k].pitch
        },
        duration: 5
      })
    },
    startMeasure (draw) {
      this.clearAll()
      this.deactiveAll()
      if (draw === 'distance') { // 测距
        this.handlerDis.activate()
      } else if (draw === 'area') { // 测面
        this.handlerArea.activate()
      } else if (draw === 'height') { // 测高
        this.handlerHeight.activate()
      }
    },
    clearAll () {
      this.handlerDis.clear()
      this.handlerArea.clear()
      this.handlerHeight.clear()
    },
    deactiveAll () {
      this.handlerDis.deactivate()
      this.handlerArea.deactivate()
      this.handlerHeight.deactivate()
    },
    startWa () {
      this.handlerPolygon = new Cesium.DrawHandler(this.viewer, Cesium.DrawMode.Polygon, 0)
      this.addToolTip('点击绘制开挖区域,<br/>右键单击结束绘制。')
      this.handlerPolygon.activeEvt.addEventListener((isActive) => {
        if (isActive === true) {
          this.viewer.enableCursorStyle = false
          this.viewer._element.style.cursor = ''
          $('body').removeClass('drawCur').addClass('drawCur')
        } else {
          this.viewer.enableCursorStyle = true
          $('body').removeClass('drawCur')
        }
      })
      this.handlerPolygon.movingEvt.addEventListener((windowPosition) => {
        this.setToolTipPosition(windowPosition)
      })
      this.handlerPolygon.drawEvt.addEventListener((result) => {
        this.handlerPolygon.polygon.show = false
        this.handlerPolygon.polyline.show = true
        let polygon = result.object
        let positions = polygon.positions
        let flatPoints = []
        for (let i = 0; i < positions.length; i++) { // 获取经纬度和高度
          let position = positions[i]
          let cartographic = Cesium.Cartographic.fromCartesian(position)
          let lon = Cesium.Math.toDegrees(cartographic.longitude)
          let lat = Cesium.Math.toDegrees(cartographic.latitude)
          let height = cartographic.height
          flatPoints.push(lon)
          flatPoints.push(lat)
          flatPoints.push(height)
        }
        this.globe.addExcavationRegion({ // 设置倾斜开挖参数
          position: flatPoints,
          name: 'excavation',
          height: 20,
          transparent: true
        })
        let alphaLayers = this.baseProps['dmSelectAlphaLayers_3d']
        for (let i = 0; i < alphaLayers.length; i++) {
          let layer = this.scene.layers.find(alphaLayers[i])
          if (layer) {
            layer.addExcavationRegion({ // 设置倾斜开挖参数
              position: flatPoints,
              name: 'excavation' + i,
              height: 20,
              transparent: true
            })
          }
        }
        this.handlerPolygon.deactivate()
        this.removeToolTip()
      })
      this.handlerPolygon.activate()
    },
    removeWa () {
      if (this.handlerPolygon && this.handlerPolygon.polyline) this.handlerPolygon.polyline.show = false
      this.removeToolTip()
      this.globe.removeAllExcavationRegion()
      let alphaLayers = this.baseProps['dmSelectAlphaLayers_3d']
      for (let i = 0; i < alphaLayers.length; i++) {
        let layer = this.scene.layers.find(alphaLayers[i])
        if (layer) {
          layer.removeAllExcavationRegion()
        }
      }
    },
    addToolTip (message) {
      this.toolTip = document.createElement('toolTip')
      this.toolTip.innerHTML = message
      this.toolTip.style.cssText = 'position:absolute;z-index: 9999; background:#fff;padding:6px;font-size:12px;color:#000;border:1px solid #ddd;box-shadow:1px 1px 3px rgba(0,0,0,0.6);'
      document.body.appendChild(this.toolTip)
      // div.style.top='10px';div.style.left='15px'
    },
    setToolTipPosition (windowPosition) {
      // console.log(windowPosition.x, windowPosition.y)
      this.toolTip.style.top = (windowPosition.y + 75) + 'px'
      this.toolTip.style.left = (windowPosition.x + 260) + 'px'
    },
    removeToolTip () {
      if (this.toolTip) document.body.removeChild(this.toolTip)
      this.toolTip = null
    },
    // 通过点击查询用于表示单体化的面要素，添加到场景中高亮显示。
    queryByPoint (lng, lat, selectCount) {
      let typeName = 'anduan'
      let layer = this.queryProps[typeName]
      let fields = ['SMID', 'POPTITLE']
      for (let h = 0; h < layer.columnList.length; h++) {
        let tabFields = layer.columnList[h]
        let columnEName = (tabFields.columnEName).toUpperCase()
        fields.push(columnEName)
      }
      let geometry = L.marker([lat, lng])
      let getParameters = new SuperMap.GetFeaturesByGeometryParameters({
        toIndex: -1,
        datasetNames: [this.queryProps[typeName].datasetNames],
        geometry: geometry,
        spatialQueryMode: 'INTERSECT',
        fields: fields
      })
      L.supermap
        .featureService(this.baseProps['url_data'])
        .getFeaturesByGeometry(getParameters, (serviceResult) => {
          let features = serviceResult.result.features.features
          if (features && features.length > 0) {
            this.clearData()
            selectCount = selectCount + features.length
            let feature = features[0]
            this.selectedLayerNames.push(typeName)
            let results = []
            results[0] = feature
            this.selectedFeatures.push(results)
            let id = typeName + '|0|0'
            this.addClapFeature(features[0])
            document.getElementById('pop').innerHTML = this.setPopContent(feature, id)
            this.openBubble()
          }
          if (selectCount === 0) this.closeBubble()
        })
    },
    // 将数据服务查询到的要素添加到场景中高亮显示，表示选中效果。
    addClapFeature (feature) {
      let lonLatArr = this.getLonLatArray(feature.geometry.coordinates[0][0])
      this.viewer.entities.add({
        id: 'identify-area',
        name: '单体化标识面',
        polygon: {
          hierarchy: Cesium.Cartesian3.fromDegreesArray(lonLatArr),
          material: Cesium.Color.fromCssColorString('rgba(254,223,10,0.4)')
        },
        clampToS3M: true // 贴在S3M模型表面
      })
    },
    // 得到[经度,纬度,经度,纬度...]形式的数组，用于构造面。
    getLonLatArray (points) {
      let point3D = []
      for (let i = 0; i < points.length; i++) {
        point3D.push(points[i][0])
        point3D.push(points[i][1])
      }
      return point3D
    },
    setBzCheckedLayer (node, isChecked) {
      let layer = this.scene.layers.find(node.id)
      if (layer) {
        layer.visible = isChecked
      }
    },
    drawGeometry (label, operationType) {
    },
    drawBuffer (geometry) {
    },
    /** *****************************组件操作公用*******************************/
    // 子组件同步父组件的状态
    toggle (obj) {
      if (typeof obj !== 'object') return false
      // 正常处理
      if (obj.name && (obj.name === 'MonitorPump' || obj.name === 'MonitorPipe')) {
        this.$set(this.state, obj.name, obj.value)
        return false
      }
      // 关闭table的统计组件
      if (obj.name === 'DataTable') this.$refs.dataTable.toggleTableFilter(false)
      if (obj.name !== undefined && obj.name !== 'DataDetails' && obj.name !== 'BaseToc' && !obj.value) {
        if (this.operationType.indexOf('fly') > -1) this.flyStop()
        // 还原右侧方向轮盘
        if (this.operationType !== 'toc' && obj.name !== 'DataTable') {
          let a = document.getElementsByClassName('cesium-viewer-navigationContainer')
          let b = document.getElementsByClassName('rangeStyle')
          b[0].style = 'top:60px !important;'
          a[0].style = 'top:60px !important;'
        }
        // 关闭图层操作下的table,清除图层查询的数据
        if (this.operationType === 'toc' && obj.name === 'DataTable') this.$refs.baseToc.initSelected()
        // 关闭图层操作下的table,清除操作状态
        if (this.operationType === 'toc') this.operationType = ''
        // 关闭非图层操作下的查询组件，清除操作状态（关闭table保留，继续查询）
        if (this.operationType !== 'toc' && obj.name !== 'DataTable') {
          if (this.operationType === 'measure') {
            this.clearAll()
            this.deactiveAll()
          }
          this.operationType = ''
        }
        // 关闭非table的组件，同步关闭table
        if (obj.name !== 'DataTable') this.$set(this.state, 'DataTable', false)
        // 所有关闭同步关闭details
        this.$set(this.state, 'DataDetails', false)
        this.$refs.dataDetails.state = false
        // 关闭组件同步清除图层标绘
        this.clearLayer()
      }
      this.$set(this.state, obj.name, obj.value)
    },
    /** *****************************toggleOnlyState*******************************/
    // 关闭footer的最小化
    toggleOnlyState (obj) {
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
    toMaximize (obj) {
      this.$nextTick(() => {
        let h = ''
        h = this.$refs.footTable.offsetHeight
        this.footTableHeight = (h - 3) + 'px'
      })
      if (typeof obj !== 'object') return false
      if (obj.name && this.maximize.hasOwnProperty(obj.name) && typeof obj.value === 'boolean') this.maximize[obj.name] = obj.value
    },
    toolBtn (obj) {
      // 让右侧弹窗的最小按钮影藏
      this.rightMiniStatus.show = false
      // console.log(obj)
      let a = document.getElementsByClassName('cesium-viewer-navigationContainer')
      let b = document.getElementsByClassName('rangeStyle')
      if (obj.name === 'sousuo') {
        this.clearAll()
        this.$refs.querySpace.toggle(true)
        this.$refs.querySpace.activeName = 'QuerySpaceKey'
        this.$refs.spaceMeasure.toggle(false)
        this.$refs.flyManage.toggle(false)
        this.clearSpace()
        this.clearData()
        this.clearLayer()
        this.clearDataShow()
        this.operationType = 'query'
        b[0].style = 'top:280px !important;'
        a[0].style = 'top:280px !important;'
      }
      this.$refs.bzLayerControl.style.display = 'none'
      if (obj.name === 'feixingbz') {
        setTimeout(() => {
          this.$refs.bzLayerControl.style.display = 'block'
        }, 5000)
      }
      if (obj.name.indexOf('feixing') > -1) {
        this.clearAll()
        this.$refs.querySpace.toggle(false)
        this.$refs.spaceMeasure.toggle(false)
        this.flyManager = null
        if (obj.name === 'feixinggw') {
          this.$refs.flyManage.toggle(true)
          this.$refs.flyManage.isFlySelf = false
          this.$refs.flyManage.title = '管网飞行展示'
          this.$refs.flyManage.icon = 'tool-feixinggw'
          this.operationType = 'flygw'
          b[0].style = 'top:180px !important;'
          a[0].style = 'top:180px !important;'
        } else if (obj.name === 'feixingbz') {
          this.$refs.flyManage.toggle(false)
          this.$refs.flyManage.isFlySelf = false
          this.operationType = 'flybz'
          let position = this.baseProps['twoPosition']
          this.scene.camera.flyTo({
            destination: new Cesium.Cartesian3(position.x, position.y, position.z),
            orientation: {
              heading: position.heading,
              pitch: position.pitch,
              roll: position.roll
            },
            duration: 2
          })
          setTimeout(() => {
            position = this.baseProps['bzPosition']
            this.scene.camera.flyTo({
              destination: new Cesium.Cartesian3(position.x, position.y, position.z),
              orientation: {
                heading: position.heading,
                pitch: position.pitch,
                roll: position.roll
              },
              duration: 2
            })
          }, 2000)
        } else if (obj.name === 'feixingws') {
          this.$refs.flyManage.toggle(false)
          this.$refs.flyManage.isFlySelf = false
          this.operationType = 'flyws'
          let position = this.baseProps['twoPosition']
          this.scene.camera.flyTo({
            destination: new Cesium.Cartesian3(position.x, position.y, position.z),
            orientation: {
              heading: position.heading,
              pitch: position.pitch,
              roll: position.roll
            },
            duration: 2
          })
          setTimeout(() => {
            position = this.baseProps['wsPosition']
            this.scene.camera.flyTo({
              destination: new Cesium.Cartesian3(position.x, position.y, position.z),
              orientation: {
                heading: position.heading,
                pitch: position.pitch,
                roll: position.roll
              },
              duration: 2
            })
          }, 2000)
        } else if (obj.name === 'feixingqx') {
          this.$refs.flyManage.toggle(false)
          this.$refs.flyManage.isFlySelf = false
          this.operationType = 'flyqx'
          let position = this.baseProps['twoPosition']
          this.scene.camera.flyTo({
            destination: new Cesium.Cartesian3(position.x, position.y, position.z),
            orientation: {
              heading: position.heading,
              pitch: position.pitch,
              roll: position.roll
            },
            duration: 2
          })
          setTimeout(() => {
            position = this.baseProps['qxPosition']
            this.scene.camera.flyTo({
              destination: new Cesium.Cartesian3(position.x, position.y, position.z),
              orientation: {
                heading: position.heading,
                pitch: position.pitch,
                roll: position.roll
              },
              duration: 2
            })
          }, 2000)
        } else if (obj.name === 'feixingself') {
          this.$refs.flyManage.toggle(true)
          this.$refs.flyManage.isFlySelf = true
          this.$refs.flyManage.title = '自定义飞行'
          this.$refs.flyManage.icon = 'tool-feixingself'
          this.operationType = 'flySelf'
        }
        this.initFlyManage()
        this.clearSpace()
        this.clearData()
        this.clearLayer()
        this.clearDataShow()
      }
      if (obj.name === 'celiang') {
        this.clearData()
        this.clearLayer()
        this.clearDataShow()
        this.$refs.querySpace.toggle(false)
        this.$refs.spaceMeasure.toggle(true)
        this.$refs.flyManage.toggle(false)
        this.operationType = 'measure'
        this.$refs.spaceMeasure.control = 'distance'
        this.$refs.spaceMeasure.activeName = 'distance'
        this.startMeasure('distance')
        b[0].style = 'top:280px !important;'
        a[0].style = 'top:280px !important;'
      }
      if (obj.name === 'qingchu') {
        this.clearSpace()
        this.clearData()
        this.clearLayer()
        this.clearDataShow()
        this.clearAll()
        this.globe.removeAllExcavationRegion()
        if (this.operationType === 'toc') this.$refs.baseToc.initSelected()
      }
      if (obj.name === 'chongzhi') {
        this.changeLoading(false)
        this.clearToggleShow()
        this.clearSpace()
        this.clearData()
        this.clearLayer()
        this.clearDataShow()
        this.clearAll()
        this.initFlyTo(1000)
        this.globe.removeAllExcavationRegion()
      }
      if (obj.name === 'kaiwa') {
        this.removeWa()
        this.clearData()
        this.clearLayer()
        this.clearDataShow()
        this.$refs.querySpace.toggle(false)
        this.$refs.spaceMeasure.toggle(false)
        this.$refs.flyManage.toggle(false)
        this.operationType = ''
        this.startWa()
      } else {
        this.removeWa()
      }
      if (obj.name === '3d') {
        this.clearToggleShow()
        this.clearSpace()
        this.clearData()
        this.clearLayer()
        this.clearDataShow()
        this.clearAll()
        // this.viewer.destroy()
        let camera = this.scene.camera
        let x = this.$refs.onemap.offsetWidth / 2
        let y = this.$refs.onemap.offsetHeight / 2
        let _center = new Cesium.Cartesian2(x, y)
        let __center = this.globe.pick(camera.getPickRay(_center), this.scene)
        let center = this.globe.ellipsoid.cartesianToCartographic(__center)
        let dx = (center.longitude) / Math.PI * 180
        let dy = (center.latitude) / Math.PI * 180
        let lonLat = {
          lng: dx,
          lat: dy
        }
        this.$refs.baseToolsBar.state.is3D = false
        this.$emit('toggleComponent', lonLat, this.zoom)
      }
    },
    setOperationType (val) {
      this.operationType = val
    },
    // 修改共有属性的信息 传参为{ name, value }
    // <el-button class="btn" @click="setState('bb', 'bhkji')">添加数据</el-button>
    setState (name, value) {
      this.$emit('setState', { name: name, value: value })
    },
    // 泵站运行和管道监测
    monitor (val) {
      // console.log('monitor : ', val, typeof val)
      if (val === 1) this.state.MonitorPump = true
      else if (val === 2) this.state.MonitorPipe = true
    },
    toggleRightMiniStatus (name) {
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
  /deep/ .el-main, /deep/ .el-footer{ padding: 0;}
  /deep/ .el-main{
    position: relative;
    overflow-y: hidden;
  }
  .mapRighr{
    box-sizing: border-box;
    padding: 1px 1px 1px 0;
    position: absolute;
    right: 0;
    top: 44px;
    width: $width;
    z-index: $index;
    background: transparent;
  }
  .maprightContent{
    width: 100%;
    height: 100%;
    background: #fff;
    box-shadow: 0 0 4px rgba(0,0,0,.7);
  }
  .onemap {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    box-sizing: border-box;
  }
  .btn{
    position: absolute;
    top: 200px;
    left: 300px;
    width: 100px;
    z-index: 9999;
  }
  .footTable{
    box-sizing: border-box;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2000;
    background: #FFF;
    box-shadow: 0 -1px 2px rgba(0,0,0,.4);
    border-top: 1px solid #202340;
  }
  /deep/.mapPop{
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
  /deep/.mapPopTitle{
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
  /deep/.cesium-viewer-toolbar {
    display: block;
    position: absolute;
    top: 60px;
    right: 5px;
  }
  /deep/.cesium-viewer-navigationContainer {
    display: block;
    position: absolute;
    top: 60px;
    right: 0;
    padding: 0;
    -moz-box-sizing: content-box;
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
    height: 128px;
    width: 128px;
  }
/deep/ .rangeStyle {
    position: absolute;
    right: 22px;
    top: 60px;
    width: 100px;
    overflow: hidden;
  }
/deep/ .leaflet-popup .leaflet-popup-content-wrapper{
  border-radius: 0;
}
/deep/   .cesium-viewer-bottom {
     display: none;
     position: absolute;
     bottom: 0;
     left: 0;
     right: 0;
     padding-right: 5px;
}
.footHidden{
    box-sizing: border-box;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2000;
    text-align: center;
}
.rightHidden{
  box-sizing: border-box;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 2000;
  width: 5px;
  text-align: center;
}
.bzLayerControl{
  position: absolute;
  z-index: 9999;
  top: 150px;
  left: 4px;
  max-height: 88%;
  overflow-y: auto;
  display: none;
}
/deep/.bzLayerControl .el-tree{
    border: 1px solid #444;
    background-color: rgba(38, 38, 38, 0.75);
    color: #fff;font-size: 12px;
    .el-tree-node__content{padding-right: 8px;}
}
/deep/.bzLayerControl .el-tree-node:hover{
    color: #444;
}
/deep/.bzLayerControl .el-checkbox__input.is-checked ,.item .item .el-checkbox__input.is-indeterminate{
  .el-checkbox__inner{
      background-color: rgba(38, 38, 38, 0.75);
      border-color: #fff;
  }
}
/deep/ .bzLayerControl .el-checkbox__inner{background-color:rgba(38, 38, 38, 0.75);}
/deep/ .bzLayerControl .el-checkbox__input.is-focus .el-checkbox__inner{outline:none; border-color: #fff;}
/deep/ .bzLayerControl .el-tree-node:focus>.el-tree-node__content{background-color:#fff;color:#333;}
.footTable /deep/ .el-tabs__nav-wrap{padding-right:126px;}
.footTable /deep/ .el-tabs__nav-next{right:114px;}
</style>
