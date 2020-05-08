<template>
  <div @keyup.enter="msearch()">
    <div class="flyDiv"
         id="flyDiv">
      <el-tooltip content="鼠标右键点击地图显示/隐藏地面。"
                  placement="bottom"
                  effect="light">
        <el-button type="primary"
                   size="small"
                   @click="flyToType('gw')"
                   style="font-size: 15px;padding: 6px 10px;">
          {{flyLabel.gw}}</el-button>
      </el-tooltip>
      <el-button type="primary"
                 size="small"
                 @click="flyToType('bz')"
                 style="font-size: 15px;padding: 6px 10px;">
        {{flyLabel.bz}}</el-button>
      <el-button type="primary"
                 size="small"
                 @click="flyToType('ws')"
                 style="font-size: 15px;padding: 6px 10px;">
        {{flyLabel.ws}}</el-button>
      <el-button type="primary"
                 size="small"
                 @click="flyToType('qx')"
                 style="font-size: 15px;padding: 6px 10px;">
        {{flyLabel.qx}}</el-button>
    </div>
    <div id="cesiumContainer"></div>
    <el-row class="search">
      <el-col :span="24"
              style="position:relative;">
        <el-input style="width:100%;"
                  placeholder="请输入关键字"
                  suffix-icon="el-icon-search"
                  v-model="searchvalue">
        </el-input>
        <div class="m_search"
             @click="msearch()">
          <div><i></i></div>
        </div>
        <div class="sresult">
          <div>搜索结果</div>
          <ul v-for="item in mresult">
            <li @click="getwhere(item.Id,item.W,item.N,item.E,item.S)">{{item.Name}}</li>
          </ul>
        </div>
      </el-col>
    </el-row>
    <!-- <div class="mapbtn">
      <el-row>
        <el-col :span="24">
          <el-tag>移动视角按键W,S,A,D,Q,E</el-tag>&nbsp;&nbsp;
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-switch v-model="Issaom"
                     active-text="开启扫描"
                     inactive-text="关闭扫描"
                     active-color="#13ce66"
                     @change="changesaom()">
          </el-switch>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-button v-loading.fullscreen.lock="loading"
                     type="primary"
                     size="small"
                     plain
                     @click="cz()">重置视角</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-checkbox v-model="ys"
                       @change="changepipe('ys')">雨水管网</el-checkbox>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-checkbox v-model="ws"
                       @change="changepipe('ws')">污水管网</el-checkbox>
        </el-col>
      </el-row>

      <el-row id="toolbar">
        <el-col :span="24">
          <el-button id="excavation"
                     type="primary"
                     size="small"
                     plain
                     title="左键点击绘制,右键绘制完成"
                     @click="kaiw()">倾斜开挖</el-button>
        </el-col>
      </el-row>
      <el-row i>
        <el-col :span="24">
          <el-button type="primary"
                     size="small"
                     plain
                     @click="kaiwReset()">重置开挖</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-button type="primary"
                     size="small"
                     plain
                     @click="flyToInit('longm',10)">龙茗路飞行</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-checkbox v-model="gmcity"
                       @change="gumeiCityVisible()">开启/关闭古美城市模型</el-checkbox>
        </el-col>
      </el-row>
    </div> -->
    <div class="righttool">
      <div>
        <ul :class="tc?'bbrr':''">
          <li @click="xunh()"
              title="可双击执行">
            <div>
              <i :class="xh?'xhcheck':'xh'"></i>
              <span :class="xh?'wcheck':''">巡航</span>
            </div>
          </li>
          <li @click="kaiw()"
              title="使用左键绘制几个开挖点,右键结束">
            <div>
              <i :class="kw?'kwcheck':'kw'"></i>
              <span :class="kw?'wcheck':''">开挖</span>
            </div>
          </li>
          <li @click="gumeiCityVisible()">
            <div>
              <i :class="dx?'dxcheck':'dx'"></i>
              <span :class="dx?'wcheck':''">地下</span>
            </div>
          </li>
          <li @click="changestyle('tc')"
              class="ptc">
            <i :class="tc?'tccheck':'tc'"></i>
            <span :class="tc?'wcheck':''">图层</span>
            <i :class="tc?'sq':'xl'"></i>
          </li>
        </ul>
        <el-button type="primary"
                   @click="cz()">重置视角</el-button>
        <div class="gwlabel"
             v-show="tc">
          <div>
            <el-checkbox v-model="ysgw"
                         @change="gwLayerVisble('ysgw')">雨水管网</el-checkbox>
          </div>
          <div>
            <el-checkbox v-model="wsgw"
                         @change="gwLayerVisble('wsgw')">污水管网</el-checkbox>
          </div>
        </div>
      </div>
      <p>温馨提示：移动视角按键W,S,A,D,Q,E</p>
    </div>
    <!-- 页面底部 -->
    <div class="toolbottom">
      <template v-for="(v,i) in gmLayer">
        <el-checkbox v-model="gmarr['gm'+i]"
                     @change="gumeiVisible(v.name)">{{v.name.substr(0,v.name.indexOf('_')==-1?99:v.name.indexOf('_'))}}</el-checkbox>
      </template>
    </div>
    <!-- 气泡HTML -->
    <div id="bubble"
         class="bubble"
         style="bottom:0;left:82%;display:none;">
      <div id="tools"
           style="text-align : right;position:relative;">
        <span style="color: rgb(95, 74, 121);padding: 5px;position: absolute;    left: 0;
    top: -5px;color: #909399;font-weight: bold;">模型属性</span>
        <i class="el-icon-close"
           @click="close()"></i>
      </div>
      <div id="tableContainer">
        <table id="tab">
          <thead>
            <tr>
              <th>名称</th>
              <th>值</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>经度:</td>
              <td>{{props.lon}}</td>
            </tr>
            <tr>
              <td>纬度:</td>
              <td>{{props.lat}}</td>
            </tr>
            <tr>
              <td>高度:</td>
              <td>{{props.height}}</td>
            </tr>
            <tr>
              <td>名称:</td>
              <td>{{props.name}}</td>
            </tr>
            <tr>
              <td>区域:</td>
              <td>{{props.quyu}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: true,
      ys: true,
      ws: true,
      Issaom: false,
      IsPro: true,//是否显示属性弹窗
      dock: false,//是否停靠
      gmcity: true,
      xh: false,
      kw: false,
      dx: false,
      tc: false,
      ysgw: true,
      wsgw: true,
      viewer: {},
      scene: {},
      camera: {},
      globe: {},
      imageryLayers: [],
      imageryWgs: [],
      gmLayer: [],
      gwLayer: [],
      labelImagery: {},
      overGroundLayer: {},//倾斜开挖图层
      overGroundLayer2: {},//倾斜开挖图层
      overGroundLayer3: {},//倾斜开挖图层
      overGroundLayer4: {},//倾斜开挖图层
      overGroundLayer5: {},//倾斜开挖图层
      overGroundLayer6: {},//倾斜开挖图层
      overGroundLayer7: {},//倾斜开挖图层
      overGroundLayer8: {},//倾斜开挖图层
      handlerPolygon: {},//处理器对象,
      gmarr: [],
      ysgwarr: [],
      wsgwarr: [],
      mresult: [],
      flyLabel: {
        gw: '管  网',
        bz: '泵  站',
        ws: '污水厂',
        qx: '倾斜摄影'
      },
      flags: {
        looking: false,
        moveForward: false,
        moveBackward: false,
        moveUp: false,
        moveDown: false,
        moveLeft: false,
        moveRight: false
      },
      scenePosition: {},
      infoboxContainer: {},
      searchvalue: '',
      props: {
        lon: 0,
        lat: 0,
        height: 0,
        name: '',
        quyu: ''
      }
    }
  },
  methods: {
    onload3D(layerConfig) {
      let _this = this;
      _this.viewer = new Cesium.Viewer('cesiumContainer', {
        'selectionIndicator': false,
        'infoBox': true,
        'showRenderLoopErrors': false
      })
      _this.viewer.enableCursorStyle = false
      _this.viewer._element.style.cursor = ''
      _this.viewer.terrainShadows = Cesium.ShadowMode.DISABLED
      _this.scene = _this.viewer.scene;
      _this.scene.undergroundMode = true;
      _this.scene.terrainProvider.isCreateSkirt = false // 关闭裙边
      _this.camera = _this.scene.camera;
      _this.globe = _this.scene.globe
      _this.globe.globeAlpha = 1
      _this.globe.cullEnabled = false
      _this.globe.showGroundAtmosphere = true
      _this.ellipsoid = _this.scene.globe.ellipsoid
      _this.infoboxContainer = document.getElementById("bubble");
      /** **************************************监听**********************/
      _this.scene.screenSpaceCameraController.minimumZoomDistance = -1000;//相机的高度的最小值
      _this.scene.screenSpaceCameraController.maximumZoomDistance = 22000000;  //相机高度的最大值
      _this.scene.screenSpaceCameraController._minimumZoomRate = 30000; // 设置相机缩小时的速率
      _this.scene.screenSpaceCameraController._maximumZoomRate = 5906376272000    //设置相机放大时的速率
      _this.scene.camera.moveEnd.addEventListener((e) => {
        // var position = _this.scene.pickPosition(e.position);
        // var cartographic = Cesium.Cartographic.fromCartesian(position);
        // var height = cartographic.height;
        // console.log('height', height);
        // console.log('heading', _this.camera.heading);
        // console.log('pitch', _this.camera.pitch);
        // console.log('roll', _this.camera.roll);

      })
      _this.scene.postRender.addEventListener(function () { // 每一帧都去计算弹窗的正确位置
        // if (!_this.checkNullObj(_this.scenePosition) && !_this.dock) {
        //   var canvasHeight = _this.scene.canvas.height;
        //   var windowPosition = new Cesium.Cartesian2();
        //   Cesium.SceneTransforms.wgs84ToWindowCoordinates(_this.scene, _this.scenePosition, windowPosition);
        //   if (!_this.checkNullObj(_this.infoboxContainer)) {
        //     _this.infoboxContainer.style.bottom = (canvasHeight - windowPosition.y + 45) + 'px';
        //     _this.infoboxContainer.style.left = (windowPosition.x - 70) + 'px';
        //     _this.infoboxContainer.style.visibility = "visible";
        //   }
        // }
      });
      let handler = new Cesium.ScreenSpaceEventHandler(_this.scene.canvas)

      //鼠标左击事件
      handler.setInputAction(function (e) {
        // if (!_this.IsPro) {//阻止弹窗
        //   return
        // }
        // // // 获取点击位置笛卡尔坐标
        // var position = _this.scene.pickPosition(e.position);
        // if (!position) {
        //   position = Cesium.Cartesian3.fromDegrees(0, 0, 0);
        // }
        // _this.scenePosition = position; // 气泡相关 2/4
        // // // 从笛卡尔坐标获取经纬度
        // var cartographic = Cesium.Cartographic.fromCartesian(position);
        // var height = cartographic.height;
        // _this.scene.pick(e.position);
        // let selectedLayer = _this.scene.layers._selectedLayer;
        // console.log('selectedLayer', selectedLayer);
        // _this.props.lon = selectedLayer.lon;
        // _this.props.lat = selectedLayer.lat;
        // _this.props.height = height;
        // let smid = selectedLayer.getSelection()[0];
        // _this.query('SMID=' + smid, _this.scene.layers._selectedLayer._name.replace('@BASE', ''));
        // _this.infoboxContainer.style.display = '';
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

      //鼠标双击事件
      handler.setInputAction((e) => {
        // _this.scene.camera.cancelFlight();
        _this.xunh();
      }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

      //鼠标右键事件
      handler.setInputAction((e) => {
        // if (_this.globe.globeAlpha > 0) _this.changeAlpha(0)
        // else _this.changeAlpha(1)
      }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);

      //鼠标滚轮事件
      handler.setInputAction((e) => {
        // var cameraPosiion = _this.camera.position;
        // var cartographic = Cesium.Cartographic.fromCartesian(cameraPosiion);
        // var longitude = Cesium.Math.toDegrees(cartographic.longitude);
        // var latitude = Cesium.Math.toDegrees(cartographic.latitude);
        // var height = cartographic.height;
      }, Cesium.ScreenSpaceEventType.WHEEL);


      // _this.imageryLayers = _this.viewer.imageryLayers;
      // console.log('_this.imageryLayers',_this.imageryLayers);
      // 初始化天地图全球中文注记服务，并添加至影像图层
      // let labelImagery = new Cesium.TiandituImageryProvider({
      //   mapStyle: Cesium.TiandituMapsStyle.CIA_C, // 天地图全球中文注记服务（经纬度投影）
      //   token: '4a00a1dc5387b8ed8adba3374bd87e5e'
      // });
      // _this.labelImagery = _this.imageryLayers.addImageryProvider(labelImagery);
      /** ****************************通过按键控制方向*************************************/
      // 按下
      document.addEventListener('keydown', (e) => {
        let flagName = _this.getFlagForKeyCode(e.keyCode)
        if (typeof flagName !== 'undefined') {
          _this.flags[flagName] = true
        }
      }, false)
      // 抬起
      document.addEventListener('keyup', (e) => {
        let flagName = _this.getFlagForKeyCode(e.keyCode)
        if (typeof flagName !== 'undefined') {
          _this.flags[flagName] = false
        }
      }, false)
      _this.viewer.clock.onTick.addEventListener((clock) => {

        let camera = _this.scene.camera
        // let cameraHeight = _this.ellipsoid.cartesianToCartographic(camera.position).height
        let moveRate = 100 // cameraHeight / 50.0

        if (_this.flags.moveForward) {
          camera.moveForward(moveRate)
        }
        if (_this.flags.moveBackward) {
          camera.moveBackward(moveRate)
        }
        if (_this.flags.moveUp) {
          camera.moveUp(moveRate)
        }
        if (_this.flags.moveDown) {
          camera.moveDown(moveRate)
        }
        if (_this.flags.moveLeft) {
          camera.moveLeft(moveRate)
        }
        if (_this.flags.moveRight) {
          camera.moveRight(moveRate)
        }
      })

      // 首先飞到地图上方位置
      // _this.flyToInit('one', 10);
      //  _this.loading = false;

      let ywps = layerConfig.ywps;
      let promise2 = _this.scene.open(ywps);
      promise2.then((layers) => {
        // 删除地表图层
        // setTimeout(() => {
        //   _this.imageryLayers.remove(_this.labelImagery)
        //   _this.globe.showGroundAtmosphere = true
        // }, 10000)
      })

      let gumei = layerConfig.gumei;
      let promise = _this.scene.open(gumei);

      promise.then((layers) => {
        _this.overGroundLayer = _this.scene.layers.find('道路面_3D@BASE_3D');
        _this.overGroundLayer2 = _this.scene.layers.find('小区道路_3D@BASE_3D');
        _this.overGroundLayer3 = _this.scene.layers.find('道路中心_3D@BASE_3D');
        _this.overGroundLayer4 = _this.scene.layers.find('外侧路_3D@BASE_3D');
        _this.overGroundLayer5 = _this.scene.layers.find('马路牙子_3D@BASE_3D');
        _this.overGroundLayer6 = _this.scene.layers.find('斑马线_H@BASE_3D');
        _this.overGroundLayer7 = _this.scene.layers.find('树_3D@BASE_3D');
        _this.overGroundLayer8 = _this.scene.layers.find('斑马线_S@BASE_3D');
        var viewModel = { //监听滑动条变化，改变alpha的值，设置地表透明度
          overGroundAlpha: 1
        };
        Cesium.knockout.track(viewModel);
        _this.layerVisible();
        _this.cz();

      })

    },
    close() {
      this.infoboxContainer.style.display = 'none';
    },
    // 透明度设置
    changeAlpha(value) {
      let _this = this;
      _this.globe.globeAlpha = value
      let alphaLayers = config.dmSelectAlphaLayers_3d
      for (let i = 0; i < alphaLayers.length; i++) {
        let layer = _this.scene.layers.find(alphaLayers[i])
        if (layer) {
          layer.style3D.fillForeColor.alpha = value
        }
      }
    },
    changeAlpha(alphaLayers, value) {
      let _this = this;
      let layer = _this.scene.layers.find(alphaLayers);
      if (layer) {
        layer.style3D.fillForeColor.alpha = value
      }
    },
    flyToType(type) {
      let _this = this;
      let position
      if (type === 'gw' && _this.flyType === 'gw') {
        if (_this.globe.globeAlpha > 0) _this.changeAlpha(0)
        else _this.changeAlpha(1)
      } else {
        _this.changeAlpha(1)
      }
      if (type === 'gw') position = config.gwPosition
      else if (type === 'bz') position = config.bzPosition
      else if (type === 'ws') position = config.wsPosition
      else if (type === 'qx') position = config.qxPosition
      if (_this.flyType !== type) {
        // 飞到地图上方
        // _this.flyToInit('one', 2)
        // 飞到设施位置
        setTimeout(() => {
          _this.scene.camera.flyTo({
            destination: new Cesium.Cartesian3(position.x, position.y, position.z),
            orientation: {
              heading: position.heading,
              pitch: position.pitch,
              roll: position.roll
            },
            duration: 2
          })

        }, 4000)
      }
      _this.flyType = type
    },
    flyToInit(type, sec) {
      let _this = this;
      let position
      if (type === 'gw') position = config.gwPosition
      else if (type === 'one') position = config.onePosition
      else if (type === 'two') position = config.twoPosition
      else if (type === 'gumei') position = config.gumeiPosition
      else if (type === 'longm') position = config.longmPosition
      if (sec != null) {
        _this.scene.camera.flyTo({
          destination: new Cesium.Cartesian3(position.x, position.y, position.z),
          orientation: {
            heading: position.heading,
            pitch: position.pitch,
            roll: position.roll
          },
          duration: sec
        })
      } else {
        _this.scene.camera.flyTo({
          destination: new Cesium.Cartesian3(position.x, position.y, position.z),
          orientation: {
            heading: position.heading,
            pitch: position.pitch,
            roll: position.roll
          }
        })
      }
    },
    flyToRectangle(W, N, E, S) {
      this.scene.camera.flyTo({
        destination: Cesium.Rectangle.fromDegrees(W, S, E, N),
        orientation: {
          heading: 6.130013382038405,
          pitch: -0.42548166729378534,
          roll: 6.283177659268466
        }
      });
    },
    getFlagForKeyCode(keyCode) {
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
    changesaom() {
      let _this = this;
      _this.scene.scanEffect.show = _this.Issaom;
      //var startPosition = new Cesium.Cartesian3.fromDegrees(121.38757485663356, 31.139046536613076, 2.0);
      let Cartesian2 = new Cesium.Cartesian2(712, 300);
      let centerPosition = _this.scene.pickPosition(Cartesian2);
      _this.scene.scanEffect.centerPostion = centerPosition;
      let initialScanColor = new Cesium.Color(1.0, 1.0, 1.0, 1.0);
      _this.scene.scanEffect.color = initialScanColor;
      _this.scene.scanEffect.period = 3.0;
      _this.scene.scanEffect.mode = Cesium.ScanEffectMode.CIRCLE;
    },
    cz() {
      this.flyToInit('gumei')
    },
    changepipe(flag) {
      let _this = this;
      if (flag == 'ysg') {
        _this.changeAlpha('YSG_3D@DRAIN', _this.ysg ? 1 : 0)
      }
      if (flag == 'ysj')
        _this.changeAlpha('ysj3d_dm@DRAIN', _this.ysj ? 1 : 0)
      if (flag == 'wsg')
        _this.changeAlpha('WSG_3D@DRAIN', _this.wsg ? 1 : 0)
      if (flag == 'wsj')
        _this.changeAlpha('WSJ3D_dm@DRAIN', _this.wsj ? 1 : 0)
    },
    xunh() {
      if (this.xh) {
        this.scene.camera.cancelFlight();
      } else {
        this.flyToInit('longm', 15);
      }
      this.changestyle('xh');
    },
    kaiw() {
      let _this = this;
      _this.changestyle('kw');
      if (!_this.kw) {
        _this.kaiwReset();
        return;
      }

      _this.IsPro = false;
      _this.handlerPolygon = new Cesium.DrawHandler(_this.viewer, Cesium.DrawMode.Polygon);
      _this.handlerPolygon.activeEvt.addEventListener(function (isActive) {
        if (isActive == true) {
          _this.viewer.enableCursorStyle = false;
          _this.viewer._element.style.cursor = '';
          $('body').removeClass('drawCur').addClass('drawCur');
        }
        else {
          _this.IsPro = true;
          _this.viewer.enableCursorStyle = true;
          $('body').removeClass('drawCur');
        }
      });
      _this.handlerPolygon.movingEvt.addEventListener(function (windowPosition) {
      });
      _this.handlerPolygon.drawEvt.addEventListener(function (result) {
        _this.handlerPolygon.polygon.show = false;
        _this.handlerPolygon.polyline.show = false;
        var polygon = result.object;
        var positions = polygon.positions;
        var flatPoints = [];
        for (var i = 0, j = positions.length; i < j; i++) {//获取经纬度和高度
          var position = positions[i];
          var cartographic = Cesium.Cartographic.fromCartesian(position);
          var lon = Cesium.Math.toDegrees(cartographic.longitude);
          var lat = Cesium.Math.toDegrees(cartographic.latitude);
          var height = cartographic.height;
          flatPoints.push(lon);
          flatPoints.push(lat);
          flatPoints.push(height);
        }
        _this.overGroundLayer.addExcavationRegion({//设置倾斜开挖参数
          position: flatPoints,
          name: 'excavation_' + Math.random()
        });
        _this.overGroundLayer2.addExcavationRegion({//设置倾斜开挖参数
          position: flatPoints,
          name: 'excavation_' + Math.random()
        });
        _this.overGroundLayer3.addExcavationRegion({//设置倾斜开挖参数
          position: flatPoints,
          name: 'excavation_' + Math.random()
        });
        _this.overGroundLayer4.addExcavationRegion({//设置倾斜开挖参数
          position: flatPoints,
          name: 'excavation_' + Math.random()
        });
        _this.overGroundLayer5.addExcavationRegion({//设置倾斜开挖参数
          position: flatPoints,
          name: 'excavation_' + Math.random()
        });
        _this.overGroundLayer6.addExcavationRegion({//设置倾斜开挖参数
          position: flatPoints,
          name: 'excavation_' + Math.random()
        });
        _this.overGroundLayer7.addExcavationRegion({//设置倾斜开挖参数
          position: flatPoints,
          name: 'excavation_' + Math.random()
        });
        _this.overGroundLayer8.addExcavationRegion({//设置倾斜开挖参数
          position: flatPoints,
          name: 'excavation_' + Math.random()
        });
        _this.handlerPolygon.deactivate();
      });
      _this.handlerPolygon.activate();
    },
    kaiwReset() {
      let _this = this;
      _this.overGroundLayer.clearModifyRegions();
      _this.overGroundLayer2.clearModifyRegions();
      _this.overGroundLayer3.clearModifyRegions();
      _this.overGroundLayer4.clearModifyRegions();
      _this.overGroundLayer5.clearModifyRegions();
      _this.overGroundLayer6.clearModifyRegions();
      _this.overGroundLayer7.clearModifyRegions();
      _this.overGroundLayer8.clearModifyRegions();
    },
    gumeiVisible(name) {
      let _this = this;
      let index = 0;
      _this.gmLayer.forEach((v, i) => {
        if (v.name.indexOf(name) > -1) {
          index = i;
        }
      })
      _this.changeAlpha(name, _this.gmarr['gm' + index] ? 1 : 0);

    },
    gumeiCityVisible() {
      let _this = this;
      _this.gmcity = !_this.gmcity;
      _this.gmLayer.forEach((v, i) => {
        _this.gmarr['gm' + i] = _this.gmcity;
        _this.changeAlpha(v.name, _this.gmcity ? 1 : 0);
      })
      _this.changestyle('dx');
    },
    gwLayerVisble(flag) {
      let _this = this;
      if (flag == "ysgw") {
        _this.ysgwarr.forEach((v, i) => {
          _this.changeAlpha(v, _this.ysgw ? 1 : 0);
        })
      }
      if (flag == "wsgw") {
        _this.wsgwarr.forEach((v, i) => {
          _this.changeAlpha(v, _this.wsgw ? 1 : 0);
        })
      }
    },
    onQueryComplete(queryEventArgs) {
      // console.log(' queryEventArgs.result.features', queryEventArgs.result.features);
      //let obj = queryEventArgs.result.features[0].attributes;
      // this.props.name = obj.NAME;
      // this.props.quyu = obj.QUXIAN == null ? obj.QUYU : obj.QUXIAN;
      queryEventArgs.result.features.forEach((v, i) => {
        const arr = {
          Id: v.attributes.SMID,
          W: v.attributes.SMSDRIW,
          N: v.attributes.SMSDRIN,
          E: v.attributes.SMSDRIE,
          S: v.attributes.SMSDRIS,
          Name: v.attributes.S_DRAI_PIPE_NAME_ROAD + '(' + v.attributes.S_DRAI_PIPE_BROAD_NAME + '-' + v.attributes.S_DRAI_PIPE_EROAD_NAME + ')'
        }
        this.mresult.push(arr);
      })
    },
    getwhere(Id, W, N, E, S) {
      const layer = this.scene.layers.find('YSG_3D@DRAIN_3D');
      // var color = Cesium.Color.fromRandom({
      //   red: 1.0,
      //   green: 1.0,
      //   alpha: 1.0
      // });
      layer.selectedColor = Cesium.Color.AQUA;
      this.flyToRectangle(W, N, E, S);
      layer.setSelection(Id);
      // var arr = [];
      // arr.push(Id);
      // layer.setObjsColor([Id], color);
    },
    //查询
    query(url, SQL, area) {
      this.mresult = [];
      var getFeatureParam, getFeatureBySQLService, getFeatureBySQLParams;
      getFeatureParam = new SuperMap.REST.FilterParameter({
        attributeFilter: SQL
      });
      getFeatureBySQLParams = new SuperMap.REST.GetFeaturesBySQLParameters({
        queryParameter: getFeatureParam,
        toIndex: 99,//-1返回所有
        datasetNames: [area]
      });

      getFeatureBySQLService = new SuperMap.REST.GetFeaturesBySQLService(url, {
        eventListeners: {
          "processCompleted": this.onQueryComplete,
          "processFailed": this.processFailed
        }
      });
      getFeatureBySQLService.processAsync(getFeatureBySQLParams);
    },
    processFailed(e) {
      alert(e.error.errorMsg);
    },
    changestyle(flag) {
      switch (flag) {
        case 'xh':
          this.xh = !this.xh;
          break;
        case 'kw':
          this.kw = !this.kw;
          break;
        case 'dx':
          this.dx = !this.dx;
          break;
        case 'tc':
          this.tc = !this.tc;
          break;
      }
    },
    msearch() {
      if (this.searchvalue == "") {
        this.mresult = [];
        return;
      }
      const url = layerConfig.gwdata;
      this.query(url, 'S_DRAI_PIPE_NAME_ROAD like \'%' + this.searchvalue + '%\'', 'DRAIN_3D:YSG_3D');
    },
    //设置图层高度显示
    layerVisible() {
      const _this = this;
      const unVisible = ['树_3D@BASE_3D', '植被牙_3D@BASE_3D', '绿植_3D@BASE_3D', '小区道路_3D@BASE_3D'];
      unVisible.forEach((v, i) => {
        const s = _this.scene.layers.find('' + v + '');
        if (s) {
          s.maxVisibleAltitude = 50;
        }
      })
    },
    checkNullObj(obj) {
      return Object.keys(obj).length === 0
    }
  },
  mounted() {
    this.gmLayer = gumeiLayer.layers;
    this.gmLayer.forEach((v, i) => {
      this.$set(this.gmarr, 'gm' + i, true);
    })
    this.gwLayer = gwLayer.layers;
    this.gwLayer.forEach((v, i) => {
      if (v.name.indexOf('YS') > -1 || v.name.indexOf('Drain') > -1 || v.name.indexOf('YBZ') > -1) {
        this.ysgwarr.push(v.name);
      } else {
        this.wsgwarr.push(v.name);
      }
    })
    this.onload3D(layerConfig);
    // let _this = this;
    // let layerConfig = {};
    // if (config.isuser) {
    //   _this.$http.get(config.layer).then((res) => {
    //     let configJson = JSON.parse(res.result.configJson)
    //     if (configJson.hasOwnProperty('layerMap')) layerConfig = configJson
    //     else
    //       layerConfig = window.layerConfig;
    //     _this.onload3D(layerConfig);
    //   })
    // } else {
    //   layerConfig = window.layerConfig;
    // }

  }
}
</script>
<style scoped>
.flyDiv {
  position: absolute;
  left: 50%;
  top: 13px;
  z-index: 9999;
  width: 400px;
  margin-left: -150px;
  height: 54px;
  display: none;
}
.mapbtn {
  position: absolute;
  left: 30px;
  top: 80px;
  z-index: 99999;
  color: #13ce66;
  background-color: #ffffff;
  opacity: 0.8;
  padding: 0 15px;
}
.mapbtn .el-row {
  margin: 15px 0;
}
.bubble {
  font-family: "微软雅黑";
  position: absolute;
  width: auto;
  min-width: 300px;
  height: 200px;
  padding: 15px;
  background-color: #ffffff;
  color: #909399;
  font-size: 14px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  -webkit-box-shadow: 0 0 5px #ccc;
  -moz-box-shadow: 0 0 5px #ccc;
  box-shadow: 0 0 5px #ccc;
}
.bubble table {
  width: 100%;
}
.bubble table td:nth-child(1) {
  width: 40%;
}
.bubble table td:nth-child(2) {
  width: 60%;
}
.bubble table td {
  line-height: 26px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
}
.search {
  position: absolute;
  left: 30px;
  top: 40px;
  width: 320px;
}
.righttool {
  display: inline-block;
  width: 430px;
  height: 40px;
  position: absolute;
  top: 40px;
  right: 140px;
  font-family: "MicrosoftYaHei";
  font-size: 12px;
}
.righttool > div {
  position: relative;
}
.righttool > div button {
  vertical-align: middle;
}
.righttool > div::after {
  content: "";
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}
.righttool ul {
  display: inline-block;
  height: 40px;
  vertical-align: middle;
  margin-right: 10px;
  background-color: #ffffff;
  border-radius: 4px;
}

.righttool ul li {
  float: left;
  width: 75px;
  height: 40px;
  display: inline-block;
  color: #4c4c4c;
  text-align: center;
  cursor: pointer;
}
.righttool ul li:nth-child(4) {
  width: 95px;
}
.righttool ul li:after {
  content: "";
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}
.righttool ul li i {
  display: inline-block;
  width: 24px;
  height: 24px;
  vertical-align: middle;
  margin-right: 5px;
}
.righttool ul li div {
  vertical-align: middle;
  display: inline-block;
  width: 74px;
  border-right: 1px dashed #e0e0e0;
}
.righttool p {
  background-color: #ffffff;
  border-radius: 4px;
  /* box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2); */
  padding: 10px 0;
  text-align: center;
  opacity: 0.6;
  margin-top: 15px;
  color: #282828;
}
.wcheck {
  color: #0096ff;
}
.gwlabel {
  position: absolute;
  top: 40px;
  left: 225px;
  background-color: #ffffff;
  height: 70px;
  width: 95px !important;
  z-index: 99;
  border: 0 !important;
  text-align: center;
}
.gwlabel > div {
  margin-top: 10px;
}
.bbrr {
  border-bottom-right-radius: 0px !important;
}
.sq {
  background: url("/img/3d/icon_3D_sq.png") no-repeat;
}
.xl {
  background: url("/img/3d/icon_3D_xl.png") no-repeat;
}
.xh {
  background: url("/img/3d/icon_3D_xh_normal.png") no-repeat;
}
.xhcheck {
  background: url("/img/3d/icon_3D_xh_active.png") no-repeat;
}
.kw {
  background: url("/img/3d/icon_3D_kw_normal.png") no-repeat;
}
.kwcheck {
  background: url("/img/3d/icon_3D_kw_active.png") no-repeat;
}
.dx {
  background: url("/img/3d/icon_3D_dx_normal.png") no-repeat;
}
.dxcheck {
  background: url("/img/3d/icon_3D_dx_active.png") no-repeat;
}
.tc {
  background: url("/img/3d/icon_3D_tc_normal.png") no-repeat;
}
.tccheck {
  background: url("/img/3d/icon_3D_tc_active.png") no-repeat;
}
.sresult {
  position: absolute;
  top: 50px;
  left: 0;
  background-color: #ffffff;
  width: 280px;
  border-radius: 4px;
  padding: 10px 20px;
  color: #5f5f5f;
  font-size: 14px;
  max-height: 500px;
  overflow: auto;
}
.sresult > div {
  color: #2ba7ff;
  font-size: 12px;
}
.sresult ul li {
  list-style: none;
  margin-top: 10px;
  cursor: pointer;
}
</style>
<style >
.drawCur {
  cursor: url("/img/draw.cur"), auto;
}
.el-input__suffix {
  display: none;
}
.el-input__suffix-inner {
  pointer-events: all;
  height: 40px;
  line-height: 40px;
  border-left: 1px solid #e8e8e8;
  padding-left: 10px;
}
.m_search {
  position: absolute;
  right: 8px;
  top: 8px;
  cursor: pointer;
}
.m_search > div {
  border-left: 1px solid #e8e8e8;
}
.m_search i {
  background: url(/img/3d/icon_3D_search.png) no-repeat;
  height: 100%;
  display: inline-block;
  width: 24px;
  height: 24px;
  vertical-align: middle;
  text-align: center;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  margin-left: 10px;
}

.cesium-viewer-zoomIndicatorContainer {
  display: none;
}
.cesium-credit-logoContainer > div {
  display: none;
}
.toolbottom {
  display: none;
  position: absolute;
  left: 30px;
  right: 30px;
  bottom: 15px;
  background-color: #ffffff;
  opacity: 0.8;
  padding: 15px;
}
.cesium-viewer-bottom {
  display: none;
}
.el-checkbox__label {
  font-size: 12px;
}
.el-button--primary {
  font-size: 12px;
}
</style>