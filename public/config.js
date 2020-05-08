var URL_CONFIG = {
  TDT_IMG: 'https://[subdomain].tianditu.com/img_w/wmts', //天地图影像
  TDT_LABEL: 'https://[subdomain].tianditu.com/cia_w/wmts', //天地图文字注记
  BINGMAP: '//dev.virtualearth.net', //bing map影像
  STK: 'https://www.supermapol.com/realspace/services/3D-stk_terrain/rest/realspace/datas/info/data/path', //STK 地形
  ZF_IMG: 'http://www.supermapol.com/realspace/services/3D-dxyx_ios2/rest/realspace/datas/MosaicResult_2@IMAGE_1',
  ZF_TERRAIN: 'http://www.supermapol.com/realspace/services/3D-dxyx_ios2/rest/realspace/datas/DatasetDEM_1@sichuanTer',
  ZF_IMG2: 'http://www.supermapol.com/realspace/services/3D-ZF_normal/rest/realspace/datas/image', //珠峰影像SCI
  ZF_TERRAIN2: 'http://www.supermapol.com/realspace/services/3D-ZF_normal/rest/realspace/datas/srtm_54_07@zhufeng', //珠峰地形SCT
  SiChuan_TERRAIN: 'http://www.supermapol.com/realspace/services/3D-dixingyingxiang/rest/realspace/datas/DatasetDEM', // 四川地形
  SiChuan_IMG: 'http://www.supermapol.com/realspace/services/3D-dixingyingxiang/rest/realspace/datas/MosaicResult', // 四川影像
  TENSE_IMG0: 'http://www.supermapol.com/realspace/services/3D-HuanJingJianCe/rest/realspace/datas/rs0300@%E6%88%BF%E5%B1%B1', //环境监测时态影像SCI（房山）
  TENSE_IMG1: 'http://www.supermapol.com/realspace/services/3D-HuanJingJianCe/rest/realspace/datas/rs0310@%E6%88%BF%E5%B1%B1', //环境监测时态影像SCI（房山）
  TENSE_IMG2: 'http://www.supermapol.com/realspace/services/3D-HuanJingJianCe/rest/realspace/datas/rs0330@%E6%88%BF%E5%B1%B1', //环境监测时态影像SCI（房山）
  TENSE_IMG3: 'http://www.supermapol.com/realspace/services/3D-HuanJingJianCe/rest/realspace/datas/rs0340@%E6%88%BF%E5%B1%B1', //环境监测时态影像SCI（房山）
  TENSE_IMG4: 'http://www.supermapol.com/realspace/services/3D-HuanJingJianCe/rest/realspace/datas/rs0350@%E6%88%BF%E5%B1%B1', //环境监测时态影像SCI（房山）
  TENSE_IMG5: 'http://www.supermapol.com/realspace/services/3D-HuanJingJianCe/rest/realspace/datas/rs0400@%E6%88%BF%E5%B1%B1', //环境监测时态影像SCI（房山）
  TENSE_IMG6: 'http://www.supermapol.com/realspace/services/3D-HuanJingJianCe/rest/realspace/datas/rs0410@%E6%88%BF%E5%B1%B1', //环境监测时态影像SCI（房山）
  TENSE_IMG7: 'http://www.supermapol.com/realspace/services/3D-HuanJingJianCe/rest/realspace/datas/rs0420@%E6%88%BF%E5%B1%B1', //环境监测时态影像SCI（房山）
  TENSE_IMG8: 'http://www.supermapol.com/realspace/services/3D-HuanJingJianCe/rest/realspace/datas/rs0430@%E6%88%BF%E5%B1%B1', //环境监测时态影像SCI（房山）
  TENSE_IMG9: 'http://www.supermapol.com/realspace/services/3D-HuanJingJianCe/rest/realspace/datas/rs0440@%E6%88%BF%E5%B1%B1', //环境监测时态影像SCI（房山）
  TENSE_IMG10: 'http://www.supermapol.com/realspace/services/3D-HuanJingJianCe/rest/realspace/datas/rs0450@%E6%88%BF%E5%B1%B1', //环境监测时态影像SCI（房山）
  SUPERMAP_IMG_WGS: 'http://www.supermapol.com/realspace/services/map-World/rest/maps/World_Google', //经纬度投影地图TILE IMGERY（中国区域）
  SUPERMAP_IMG_MEC: 'http://www.supermapol.com/realspace/services/map-China400/rest/maps/China400', //墨卡托投影地图TILE IMGERY（全球）
  SCP_JINJIANG: 'http://www.supermapol.com/realspace/services/3D-jinjiang/rest/realspace/datas/jinjiang/config', // 晋江倾斜SCP
  SCENE_JINJIANG: 'http://www.supermapol.com/realspace/services/3D-jinjiang/rest/realspace', // 晋江倾斜 场景
  SCP_SUOFEIYA: 'http://www.supermapol.com/realspace/services/3D-suofeiya_church/rest/realspace/datas/Config/config', // 索菲亚大教堂倾斜数据
  SCENE_SUOFEIYA: 'http://www.supermapol.com/realspace/services/3D-suofeiya_church/rest/realspace', // 索菲亚大教堂倾斜数据场景
  SCP_SRSB: 'http://www.supermapol.com/realspace/services/3D-srsb/rest/realspace/datas/srsb/config', //萨尔茨堡SCP
  SCENE_SRSB: 'http://www.supermapol.com/realspace/services/3D-srsb/rest/realspace', // 萨尔茨堡场景
  SCP_SRSB_WATER: 'http://www.supermapol.com/realspace/services/3D-srsb/rest/realspace/datas/%E6%B0%B4%E9%9D%A2@vector/config', //萨尔茨堡水面SCP
  SCP_NIAOCHAO: 'http://www.supermapol.com/realspace/services/3D-niaocao_water/rest/realspace/datas/%E9%B8%9F%E5%B7%A2%E4%BA%94%E6%9C%9F/config', //鸟巢SCP
  SCENE_NIAOCHAO: 'http://www.supermapol.com/realspace/services/3D-niaocao_water/rest/realspace', // 鸟巢 场景
  SCP_NIAOCHAO_WATER: 'http://www.supermapol.com/realspace/services/3D-Olympic/rest/realspace/datas/NewDataset@water-caijian/config', //鸟巢水面SCP
  SCP_CBD_TREE: 'http://www.supermapol.com/realspace/services/3D-WebGLCBD/rest/realspace/datas/Tree@%E6%96%B0CBD/config', //CBD 树SCP
  SCP_CBD_GROUND1: 'http://www.supermapol.com/realspace/services/3D-WebGLCBD/rest/realspace/datas/Ground_1@%E6%96%B0CBD/config', //CBD 地面1 SCP
  SCP_CBD_GROUND2: 'http://www.supermapol.com/realspace/services/3D-WebGLCBD/rest/realspace/datas/Ground_2@%E6%96%B0CBD/config', //CBD 地面2 SCP
  SCP_CBD_BUILD: 'http://www.supermapol.com/realspace/services/3D-WebGLCBD/rest/realspace/datas/Building@%E6%96%B0CBD/config', //CBD 建筑物 SCP
  SCP_BIM: 'https://www.supermapol.com/realspace/services/3D-S3MData/rest/realspace/datas/T8H_NoLod/config', //BIM scp
  SCENE_BIMBUILDING: 'http://www.supermapol.com/realspace/services/3D-BIMbuilding/rest/realspace', // BIM 场景
  SCP_VECTOR_POLYGON: 'http://www.supermapol.com/realspace/services/3D-China/rest/realspace/datas/%E4%B8%93%E9%A2%98%E5%9B%BE/config', //矢量 面 SCP
  SCP_VECTOR_LINE: 'http://www.supermapol.com/realspace/services/3D-China/rest/realspace/datas/Line/config', // 矢量 线 SCP
  SCP_VECTOR_TEXT: 'http://www.supermapol.com/realspace/services/3D-China/rest/realspace/datas/text/config', //矢量 文字 SCP
  SCP_POINTCLOUD: 'http://www.supermapol.com/realspace/services/3D-cloud/rest/realspace/datas/POINTCLOUD23/config', //点云 SCP
  SCENE_POINTCLOUD: 'http://www.supermapol.com/realspace/services/3D-cloud/rest/realspace',
  SCP_SGNS: 'http://www.supermapol.com/realspace/services/3D-SGNS/rest/realspace/datas/siguniang/config', //四姑娘山 SCP
  SCENE_SGNS: 'http://www.supermapol.com/realspace/services/3D-SGNS/rest/realspace', // 四姑娘山 场景
  SCP_OLYMPIC_TREE: 'http://www.supermapol.com/realspace/services/3D-WebGLOlympicGreen/rest/realspace/datas/Tree@OlympicGreen/config', //奥林匹克公园 树 SCP
  SCP_OLYMPIC_BUILD: 'http://www.supermapol.com/realspace/services/3D-WebGLOlympicGreen/rest/realspace/datas/Building@OlympicGreen/config', //奥林匹克公园 建筑物 SCP
  SCP_OLYMPIC_BILLBOARD: 'http://www.supermapol.com/realspace/services/3D-WebGLOlympicGreen/rest/realspace/datas/BillBoard@OlympicGreen/config', //奥林匹克公园 人物 SCP
  SCP_OLYMPIC_GROUND: 'http://www.supermapol.com/realspace/services/3D-WebGLOlympicGreen/rest/realspace/datas/Ground@OlympicGreen/config', //奥林匹克公园 地面 SCP
  SCP_OLYMPIC_WATER: 'http://www.supermapol.com/realspace/services/3D-WebGLOlympicGreen/rest/realspace/datas/Waters@OlympicGreen/config', //奥林匹克公园 水面 SCP
  SCENE_OLYMPIC: 'http://www.supermapol.com/realspace/services/3D-Olympic/rest/realspace',
  SCENE_OLYMPIC_GREEN: 'http://www.supermapol.com/realspace/services/3D-OlympicGreen/rest/realspace',
  SCP_XGPARK: 'http://www.supermapol.com/realspace/services/3D-yanmofenxi/rest/realspace/datas/sci_park/config', // 香港科技园 SCP
  SCENE_XGPARK: 'http://www.supermapol.com/realspace/services/3D-yanmofenxi/rest/realspace', // 香港科技园 场景
  SCP_PIPELINE: 'https://www.supermapol.com/realspace/services/3D-pipeline_s3m/rest/realspace/datas/NetWork@Pipe3D/config', //管线 SCP 失效
  SCP_HISTOGRAM1: 'http://www.supermapol.com/realspace/services/3D-Histogram/rest/realspace/datas/Point2D_3000_5000/config', //
  SCP_HISTOGRAM2: 'http://www.supermapol.com/realspace/services/3D-Histogram/rest/realspace/datas/Point2D_10000_max/config', //
  SCP_HISTOGRAM3: 'http://www.supermapol.com/realspace/services/3D-Histogram/rest/realspace/datas/Point2D_min_1000/config', //
  SCP_HISTOGRAM4: 'http://www.supermapol.com/realspace/services/3D-Histogram/rest/realspace/datas/Point2D_5000_10000/config', //
  SCP_HISTOGRAM5: 'http://www.supermapol.com/realspace/services/3D-Histogram/rest/realspace/datas/Point2D_1000_3000/config', //
  SCENE_HISTOGRAM: 'http://www.supermapol.com/realspace/services/3D-Histogram/rest/realspace',
  SCENE_CBD: 'http://www.supermapol.com/realspace/services/3D-CBD/rest/realspace', // CBD场景
  SCP_FCFH_QX: 'http://www.supermapol.com/realspace/services/3D-FCFH_Shangdong/rest/realspace/datas/config/config', //分层分户倾斜摄影图层
  SCP_FCFH_VECTOR_EXTRUDE: 'http://www.supermapol.com/realspace/services/3D-individualHouse/rest/realspace/datas/%E4%B8%93%E9%A2%98%E6%88%B7%E5%9E%8B%E9%9D%A2_%E6%8B%89%E4%BC%B8/config', // 分层分户侧面拉伸数据
  SCP_FCFH_DATA: 'http://www.supermapol.com/realspace/services/data-FCFH_Shangdong/rest/data', //分层分户数据服务
  SCP_WORLD_COUNTRY_VECTOR: 'http://www.supermapol.com/realspace/services/3D-Countries-World2/rest/realspace/datas/Countries_1@World/config', // 全球国家边界线的矢量
  SCENE_POLYLINEGROW_BUINDINGS: 'http://www.supermapol.com/realspace/services/3D-buildings1122/rest/realspace', // 光晕效果线数据,
  SCENE_TISHUJU: 'http://www.supermapol.com/realspace/services/3D-tishuju/rest/realspace', // 体数据场景
  BING_MAP_KEY: 'AhLx52IuZUuca_C3zK2TzBG2eu1vihUkayqc_e4MISbXZyn5Zw_X--odRqrweVap',
  SCENE_GTC_UINSIDE: 'http://www.supermapol.com/realspace/services/3D-data_all/rest/realspace/datas/%E5%86%85%E9%83%A8%E7%BB%93%E6%9E%84@%E5%AE%A4%E5%86%85/config', //u型BIM室内
  SCENE_GTC_UOUTSIDE: 'http://www.supermapol.com/realspace/services/3D-data_all/rest/realspace/datas/%E5%A4%96%E9%83%A8%E7%BB%93%E6%9E%84@%E5%AE%A4%E5%86%85/config', //u型BIM室外
  SCENE_GTC_UWINDOW: 'http://www.supermapol.com/realspace/services/3D-data_all/rest/realspace/datas/U%E5%9E%8B%E5%BB%BA%E7%AD%91%E7%AA%97@%E5%AE%A4%E5%86%85/config', //u型BIM窗
  SCENE_GTC_WALL9: 'http://www.supermapol.com/realspace/services/3D-data_all/rest/realspace/datas/%E5%90%88%E5%B9%B6%E5%89%8D%E5%A2%99@%E4%B9%9D%E5%8F%B7%E6%A5%BC/config', //九号楼合并前墙
  SCENE_GTC_WINDOW9: 'http://www.supermapol.com/realspace/services/3D-data_all/rest/realspace/datas/%E5%90%88%E5%B9%B6%E5%89%8D%E7%AA%97@%E4%B9%9D%E5%8F%B7%E6%A5%BC/config', //九号楼合并前窗
  SCENE_GTC_WINDOW9: 'http://www.supermapol.com/realspace/services/3D-data_all/rest/realspace/datas/%E5%90%88%E5%B9%B6%E5%89%8D%E7%BB%93%E6%9E%84%E5%9F%BA%E7%A1%80@%E4%B9%9D%E5%8F%B7%E6%A5%BC/config', //九号楼合并前结构
  SCENE_GTC_WINDOW9: 'http://www.supermapol.com/realspace/services/3D-data_all/rest/realspace/datas/%E5%90%88%E5%B9%B6%E5%89%8D%E9%97%A8@%E4%B9%9D%E5%8F%B7%E6%A5%BC/config', //九号楼合并前门
  SCENE_GTC_WINDOW9: 'http://www.supermapol.com/realspace/services/3D-data_all/rest/realspace/datas/%E5%90%88%E5%B9%B6%E5%89%8D%E6%A5%BC%E6%9D%BF@%E4%B9%9D%E5%8F%B7%E6%A5%BC/config', //九号楼合并前楼板
  SCENE_GTC_FLOOR9: 'http://www.supermapol.com/realspace/services/3D-data_all/rest/realspace/datas/%E6%8B%89%E4%BD%8E%E6%A5%BC%E5%B1%82@%E4%B9%9D%E5%8F%B7%E6%A5%BC/config', //九号楼楼层
  SCENE_GTC_LWINDOW9: 'http://www.supermapol.com/realspace/services/3D-data_all/rest/realspace/datas/%E6%8B%89%E4%BD%8E%E7%AA%97@%E4%B9%9D%E5%8F%B7%E6%A5%BC/config', //九号楼拉低窗
  SCENE_GTC_LWALL9: 'http://www.supermapol.com/realspace/services/3D-data_all/rest/realspace/datas/%E6%8B%89%E4%BD%8E%E5%A2%99@%E4%B9%9D%E5%8F%B7%E6%A5%BC/config', //九号楼拉低墙
  SCENE_GTC_LB9: 'http://www.supermapol.com/realspace/services/3D-data_all/rest/realspace/datas/%E6%8B%89%E4%BD%8E%E6%A5%BC%E6%9D%BF@%E4%B9%9D%E5%8F%B7%E6%A5%BC/config', //九号楼拉低楼板
  SCENE_GTC_UNIT9: 'http://www.supermapol.com/realspace/services/3D-data_all/rest/realspace/datas/%E5%90%88%E5%B9%B6%E5%90%8E@%E4%B9%9D%E5%8F%B7%E6%A5%BC/config', //合并九号楼
  SCENE_GTC_BUILDIBG: 'http://www.supermapol.com/realspace/services/3D-data_all/rest/realspace/datas/building_udb@building/config', //building_udb@building
  SCENE_GTC_HILL: 'http://www.supermapol.com/realspace/services/3D-data_all/rest/realspace/datas/%E5%B1%B1/config', //山
  SCENE_GTC_GROUND: 'http://www.supermapol.com/realspace/services/3D-data_all/rest/realspace/datas/%E5%9C%B0%E9%9D%A2/config', //地面
  SCENE_MODELUPDATE: 'http://www.supermapol.com/realspace/services/3D-MoXingGengXin/rest/realspace', //建筑分析区白模数据
  SCENE_CLIP: 'http://www.supermapol.com/realspace/services/3D-clip_fengbian/rest/realspace', //裁剪封边数据
  TOKEN_TIANDITU: '4a00a1dc5387b8ed8adba3374bd87e5e', // 天地图token
  SCENE_FEATUREVALUE: 'http://www.supermapol.com/realspace/services/3D-featureValue_building9/rest/realspace/datas/%E4%B9%9D%E5%8F%B7@%E4%B9%9D%E5%8F%B7%E6%A5%BC/config', //带特征值的九号楼缓存
  SCENE_OLYMPIC_NIGHT: 'http://www.supermapol.com/realspace/services/3D-OlympicGreenNight/rest/realspace', //鸟巢夜景
  SCENE_CHONGQING_TX: 'http://www.supermapol.com/realspace/services/3D-CQmodel_wireframe_2000/rest/realspace', //重庆白模，特效用
  SCENE_VOLUME_NEAREST: 'http://www.supermapol.com/realspace/services/3D-compare/rest/realspace', //临近采样模式白模数据
};

var config = {
  "layer": "http://47.100.59.129:8081/wavenet-ps/ps/dataconfig/queryById?id=8bb3a57630f57db844c34bc8049235ff",
  "facility": "http://47.100.59.129:8081/wavenet-ps/ps/dataconfig/queryById?id=c48d0ac012bcdd6d15efba8c674f0f04",
  "isuser": true,
  "url_fileUpLoad": "http://47.100.59.129:8081/wavenet-ps/ps/upload/uploadFiles",
  "src_fileUpLoad": "http://47.100.59.129:8081/wavenet-ps",
  "dimianMap_3d": "http://47.103.120.129:8090/iserver/services/3D-shanghai_3Djianzhu/rest/realspace",
  "bengzhanMap_3d": "http://47.103.120.129:8090/iserver/services/3D-bengzhan/rest/realspace",
  "wushuiMap_3d": "http://47.103.120.129:8090/iserver/services/3D-WSC/rest/realspace",
  "qinxieMap_3d": "http://47.103.120.129:8090/iserver/services/3D-qinxie/rest/realspace",
  "imgVr": [{
    "name": "ghbz",
    "label": "",
    "latLng": [31.308740078318706, 121.51780754233457],
    "url": "http://47.100.59.129/vr/ghbz/index.html",
    "type": "point"
  }, {
    "name": "dbsbz",
    "label": "",
    "latLng": [31.296455935657857, 121.49600788728756],
    "url": "http://47.100.59.129/vr/dbsbz/index.html",
    "type": "point"
  }, {
    "label": "川杨河",
    "datasetNames": "imgInfos",
    "fields": ["LNG", "LAT", "IMGNAME"],
    "url": "http://47.100.59.129/vr-hd/",
    "type": "line"
  }],
  "videoVr": [{
    "type": "vr1",
    "label": "川杨河",
    "name": "VID_20190905_111343",
    "url": "http://47.103.120.129:8080/video-vr/",
  }, {
    "type": "vr2",
    "label": "川杨河",
    "name": "VID_20190905_145607",
    "url": "http://47.103.120.129:8080/video-vr/",
  }, {
    "type": "vr3",
    "label": "长兴岛环河",
    "name": "VID_20191120_121552_20191121174056",
    "url": "http://47.103.120.129:8080/video-vr1/",
  }, {
    "type": "vr4",
    "label": "长兴岛环河",
    "name": "VID_20191120_125217_20191121174203",
    "url": "http://47.103.120.129:8080/video-vr1/",
  }, {
    "type": "vr5",
    "label": "崇明海塘",
    "name": "VID_20191120_142803_20191121174423",
    "url": "http://47.103.120.129:8080/video-vr1/",
  }, {
    "type": "vr6",
    "label": "崇明海塘",
    "name": "VID_20191120_144509_20191121174519",
    "url": "http://47.103.120.129:8080/video-vr1/",
  }],
  "layers_3d": [
    "ShangHaiPipeRainwater@shanghai_3D#1",
    "ShangHaiPipeRainwater@shanghai_3D",
    "ShangHaiPipeSewage@shanghai_3D#1",
    "ShangHaiPipeSewage@shanghai_3D",
    "ShangHaiPipeCombined@shanghai_3D",
    "ShangHaiPipeCombined@shanghai_3D#1",
    "ShangHaiPipeCombinedInExit@shanghai_3D",
    "ShangHaiPipeRainwaterInExit@shanghai_3D",
    "ShangHaiPipeSewageInExit@shanghai_3D",
    "ShangHaiPipeRainwaterPit@shanghai_3D",
    "ShangHaiPipeRainwaterPit@shanghai_3D#1",
    "ShangHaiPipeSewagePit@shanghai_3D",
    "ShangHaiPipeSewagePit@shanghai_3D#1",
    "ShangHaiPipeCombinedPit@shanghai_3D",
    "ShangHaiPipeCombinedPit@shanghai_3D#1"
  ],
  "unLayers_3d": [
    "ShanghaiDrainExit@shanghai_3D"
  ],
  "flyFiles": {
    "gw": "./3d/feixing/sanweichangjing.fpf",
    "bz": "",
    "ws": ""
  },
  "onePosition": {
    "x": -2857983.1345620956,
    "y": 4675000.85179975,
    "z": 3311849.168270769,
    "heading": 0.123358108980276,
    "pitch": -1.5142091675310878,
    "roll": 1.9331243272802112e-8
  },
  "twoPosition": {
    "x": -2882927.7931659096,
    "y": 4716922.2930229725,
    "z": 3333640.9259487675,
    "heading": 0.03540374457306328,
    "pitch": -1.5695424514128185,
    "roll": 0
  },
  "gwPosition": {
    "x": -2845824.1054654936,
    "y": 4656084.595046462,
    "z": 3303190.7374760043,
    "heading": 0.03541005808376241,
    "pitch": -0.6413248730577115,
    "roll": 1.0104819025968936e-7
  },
  "bzPosition": {
    "x": -2846907.4598113764,
    "y": 4659660.489801224,
    "z": 3296083.317687233,
    "heading": 4.810496619293568,
    "pitch": -0.6584605746632408,
    "roll": 3.04431857500731e-9
  },
  "wsPosition": {
    "x": -2846631.653867719,
    "y": 4648963.447240246,
    "z": 3311684.056144944,
    "heading": 6.18428387324039,
    "pitch": -0.6781692349409187,
    "roll": 6.283185307179586
  },
  "qxPosition": {
    "x": -2835157.737197551,
    "y": 4677700.613175594,
    "z": 3281732.2295230813,
    "heading": 0.03759503754711968,
    "pitch": -1.2131221388123223,
    "roll": 6.283185303915722
  },
  "gumeiPosition": {
    "x": -2842642.7431824063,
    "y": 4660437.181761873,
    "z": 3298668.46245846,
    "heading":5.973327882825857,
    "pitch": -0.42548166729378867,
    "roll":0.0000011293254642552597
  },
  "longmPosition":{
    "x": -2842085.550907736,
    "y": 4660096.720684291,
    "z": 3299629.4323640554,
    "heading":5.973299605750766,
    "pitch":-0.42548166729378556,
    "roll":0.0000011293254535971187
  },

  "dmSelectEnabledLayers_3d": [
    "LV1@shanghai_3Djianzhu",
    "建筑物@shanghai_3Djianzhu",
    "jiequmian@shanghai_3Djianzhu",
    "renxingdao@shanghai_3Djianzhu",
    "dimian@shanghai_3Djianzhu"
  ],
  "dmSelectAlphaLayers_3d": [],
  "dmUnVisibleLayers_3d": [],
  "bzTreeLayers": [{
      "id": "lvhua@sanwei",
      "label": "绿化",
      "visible": true
    },
    {
      "id": "wuding@sanwei",
      "label": "泵房屋顶",
      "visible": true
    },
    {
      "id": "qiangtiDS@sanwei",
      "label": "泵房墙面",
      "visible": true
    },
    {
      "id": "qiangtiDX@sanwei",
      "label": "地下墙体",
      "visible": true
    },
    {
      "id": "diban@sanwei",
      "label": "泵房内地板",
      "visible": true
    },
    {
      "id": "hualun@sanwei",
      "label": "吊装滑轮",
      "visible": true
    },
    {
      "id": "bengji@sanwei",
      "label": "泵房泵机",
      "visible": true
    },
    {
      "id": "shuizamen@sanwei",
      "label": "水闸门",
      "visible": true
    },
    {
      "id": "geshan@sanwei",
      "label": "格栅",
      "visible": true
    },
    {
      "id": "bangonglou@sanwei",
      "label": "办公楼",
      "visible": true
    },
    {
      "id": "dimian@sanwei",
      "label": "地面",
      "visible": true
    },
    {
      "id": "dianqigui@sanwei",
      "label": "电气柜",
      "visible": true
    },
    {
      "id": "guandao@sanwei",
      "label": "管道",
      "visible": true
    },
    {
      "id": "other@sanwei",
      "label": "其它设施",
      "visible": true
    }
  ],
  "bzSelectEnabledLayers_3d": [
    "lvhua@sanwei",
    "wuding@sanwei",
    "qiangtiDS@sanwei",
    "qiangtiDX@sanwei",
    "diban@sanwei",
    "hualun@sanwei",
    "bangonglou@sanwei",
    "dimian@sanwei",
    "guandao@sanwei",
    "other@sanwei"
  ],
  "bzLayers": [{
    "label": "水闸门",
    "sort": 1,
    "typeName": "shuizamen",
    "type": "bengzhan",
    "icon": "",
    "visible": false,
    "tabQuery": true,
    "layer": "",
    "layer_3d": "shuizamen@sanwei",
    "datasetNames": "shuizamen",
    "typeKeyWords": {
      "keyWords": "SZM_TY",
      "value": "1"
    },
    "attributeFilter": "SZM_TY = 1",
    "childNoVisibleAttributeFilter": {},
    "children": []
  }, {
    "label": "格栅",
    "sort": 1,
    "typeName": "geshan",
    "type": "bengzhan",
    "icon": "",
    "visible": false,
    "tabQuery": true,
    "layer": "",
    "layer_3d": "geshan@sanwei",
    "datasetNames": "geshan",
    "typeKeyWords": {
      "keyWords": "GS_TY",
      "value": "1"
    },
    "attributeFilter": "GS_TY = 1",
    "childNoVisibleAttributeFilter": {},
    "children": []
  }, {
    "label": "泵机",
    "sort": 1,
    "typeName": "bengji",
    "type": "bengzhan",
    "icon": "",
    "visible": false,
    "tabQuery": true,
    "layer": "",
    "layer_3d": "bengji@sanwei",
    "datasetNames": "bengji",
    "typeKeyWords": {
      "keyWords": "BJ_TY",
      "value": "1"
    },
    "attributeFilter": "BJ_TY = 1",
    "childNoVisibleAttributeFilter": {},
    "children": []
  }, {
    "label": "电气柜",
    "sort": 1,
    "typeName": "dianqigui",
    "type": "bengzhan",
    "icon": "",
    "visible": false,
    "tabQuery": true,
    "layer": "",
    "layer_3d": "dianqigui@sanwei",
    "datasetNames": "dianqigui",
    "typeKeyWords": {
      "keyWords": "DQG_TY",
      "value": "1"
    },
    "attributeFilter": "DQG_TY = 1",
    "childNoVisibleAttributeFilter": {},
    "children": []
  }],
  "wsSelectEnabledLayers_3d": [
    "WSC@WSC"
  ],
  "qxSelectEnabledLayers_3d": [
    "Config_7"
  ],
  "qxLayers": [{
    "label": "堤防岸段",
    "sort": 1,
    "typeName": "anduan",
    "type": "qinxie",
    "icon": "",
    "visible": false,
    "tabQuery": true,
    "layer": "",
    "layer_3d": "",
    "datasetNames": "difanganduan",
    "typeKeyWords": {
      "keyWords": "AD_TY",
      "value": "1"
    },
    "attributeFilter": "AD_TY = 1",
    "childNoVisibleAttributeFilter": {},
    "children": []
  }],
  "guiHuaMap": [{
    "typeName": "0",
    "url_map": "http://47.103.120.129:8090/iserver/services/map-GuiHua/rest/maps/2014nian"
  }, {
    "typeName": "1",
    "url_map": "http://47.103.120.129:8090/iserver/services/map-GuiHua/rest/maps/2015nian"
  }, {
    "typeName": "2",
    "url_map": "http://47.103.120.129:8090/iserver/services/map-GuiHua/rest/maps/2016nian"
  }, {
    "typeName": "3",
    "url_map": "http://47.103.120.129:8090/iserver/services/map-GuiHua/rest/maps/2017nian"
  }, {
    "typeName": "4",
    "url_map": "http://47.103.120.129:8090/iserver/services/map-GuiHua/rest/maps/2018nian"
  }, {
    "typeName": "5",
    "url_map": "http://47.103.120.129:8090/iserver/services/map-GuiHua/rest/maps/2019nian"
  }],
  "yunWeiMaps": [{
      "label": "污水厂",
      "type": "wushui",
      "url": "http://47.103.120.129:8090/iserver/services/3D-WSC/rest/realspace",
      "layers": [],
      "basePosition": {
        "x": -2846434.819885614,
        "y": 4649063.862930205,
        "z": 3311745.4379461175,
        "heading": 0.6980992831774211,
        "pitch": -0.7620003959332582,
        "roll": 6.838973831690964e-14,
        "unVisibleLayer": [],
        "type": ""
      },
      "positions": [{
          "x": -2846595.8046374316,
          "y": 4648615.742714026,
          "z": 3312024.9860248608,
          "heading": 3.789091851646031,
          "pitch": -0.5186538558799092,
          "roll": 8.481038094032556e-10,
          "unVisibleLayer": [],
          "type": "wushui",
          "unit": "污水处理厂",
          "entities": []
        },
        {
          "x": -2846547.6286732634,
          "y": 4648638.6162861325,
          "z": 3311824.077939547,
          "heading": 3.6332756985361696,
          "pitch": -0.49150252877294553,
          "roll": 6.28318530670651,
          "unVisibleLayer": [],
          "type": "jinshui",
          "unit": "进水泵房",
          "entities": []
        },
        {
          "x": -2846506.259047445,
          "y": 4648694.031696695,
          "z": 3311810.875487588,
          "heading": 0.9445863262526109,
          "pitch": -0.49150556284240565,
          "roll": 6.283185306706486,
          "unVisibleLayer": [],
          "type": "chensha",
          "unit": "沉砂池",
          "entities": []
        },
        {
          "x": -2846405.9688120224,
          "y": 4648786.414307804,
          "z": 3311887.28331687,
          "heading": 1.9402380865565405,
          "pitch": -1.0904236927423772,
          "roll": 3.1719364912419223e-9,
          "unVisibleLayer": [],
          "type": "erchen",
          "unit": "二沉池",
          "entities": []
        },
        {
          "x": -2846416.7077480815,
          "y": 4648724.089167116,
          "z": 3311848.618926714,
          "heading": 1.8355927488819699,
          "pitch": -0.3600917195108746,
          "roll": 6.283185307179586,
          "unVisibleLayer": [],
          "type": "baoqi",
          "unit": "曝气池",
          "entities": []
        },
        {
          "x": -2846429.116655704,
          "y": 4648788.789950865,
          "z": 3311733.0881434903,
          "heading": 0.006941860451421533,
          "pitch": -0.6257875749726551,
          "roll": 1.0281953066737515e-9,
          "unVisibleLayer": [],
          "type": "wuni",
          "unit": "污泥处置",
          "entities": []
        }
      ]
    },
    {
      "label": "泵站",
      "type": "bengzhan",
      "url": "http://47.103.120.129:8090/iserver/services/3D-bengzhan/rest/realspace",
      "layers": [{
          "id": "lvhua@sanwei",
          "label": "绿化"
        },
        {
          "id": "wuding@sanwei",
          "label": "泵房屋顶"
        },
        {
          "id": "qiangtiDS@sanwei",
          "label": "泵房墙面"
        },
        {
          "id": "qiangtiDX@sanwei",
          "label": "地下墙体"
        },
        {
          "id": "diban@sanwei",
          "label": "泵房内地板"
        },
        {
          "id": "hualun@sanwei",
          "label": "吊装滑轮"
        },
        {
          "id": "bengji@sanwei",
          "label": "泵房泵机"
        },
        {
          "id": "shuizamen@sanwei",
          "label": "水闸门"
        },
        {
          "id": "geshan@sanwei",
          "label": "格栅"
        },
        {
          "id": "bangonglou@sanwei",
          "label": "办公楼"
        },
        {
          "id": "dimian@sanwei",
          "label": "地面"
        },
        {
          "id": "dianqigui@sanwei",
          "label": "电气柜"
        },
        {
          "id": "guandao@sanwei",
          "label": "管道"
        },
        {
          "id": "other@sanwei",
          "label": "其它设施"
        }
      ],
      "basePosition": {
        "x": -2846799.5984715186,
        "y": 4659779.126929408,
        "z": 3296035.517630195,
        "heading": 0.6981180416114139,
        "pitch": -0.7619370992582932,
        "roll": 3.4638958368304884e-14,
        "unVisibleLayer": [],
        "type": ""
      },
      "positions": [{
          "x": -2846817.6243828745,
          "y": 4659736.70107867,
          "z": 3296004.7907145023,
          "heading": 0.3864844581886988,
          "pitch": -0.5506531841211064,
          "roll": 1.3065104553788842e-11,
          "unVisibleLayer": [
            "bengji@sanwei"
          ],
          "type": "bengzhan",
          "unit": "泵站",
          "entities": [{
            "image": "./3d/png/jinshuijinName.png",
            "width": 124,
            "height": 67,
            "x": 121.42272592793586,
            "y": 31.11566903855309,
            "z": -0.03348064006886003
          }, {
            "image": "./3d/png/chushuijinName.png",
            "width": 124,
            "height": 67,
            "x": 121.42263567629072,
            "y": 31.11626076032334,
            "z": 10
          }]
        }, {
          "x": -2846803.523463229,
          "y": 4659669.3778658,
          "z": 3296037.1619387884,
          "heading": 2.457686554182666,
          "pitch": -0.14698019788776007,
          "roll": 3.975816120771469e-9,
          "unVisibleLayer": [
            "qiangtiDS@sanwei",
            "qiangtiDX@sanwei",
            "diban@sanwei",
            "hualun@sanwei",
            "bengji@sanwei",
            "geshan@sanwei",
            "bangonglou@sanwei",
            "dianqigui@sanwei",
            "guandao@sanwei",
            "other@sanwei"
          ],
          "type": "jinshui",
          "unit": "进水闸门",
          "entities": [{
            "image": "./3d/png/jinshuizhamenValueOff.png",
            "width": 124,
            "height": 70,
            "x": 121.42269862539843,
            "y": 31.115810710912196,
            "z": 3.5
          }, {
            "image": "./3d/png/jinshuizhamenValueOn.png",
            "width": 124,
            "height": 70,
            "x": 121.42276205371742,
            "y": 31.11582973039271,
            "z": 3.5
          }, {
            "image": "./3d/png/jinshuizhamenName2.png",
            "width": 81,
            "height": 24,
            "x": 121.42268262600066,
            "y": 31.115809397617504,
            "z": 1.0
          }, {
            "image": "./3d/png/jinshuizhamenName1.png",
            "width": 81,
            "height": 24,
            "x": 121.42273808324273,
            "y": 31.11583281963943,
            "z": 1.0
          }]
        }, {
          "x": -2846809.678988525,
          "y": 4659673.66284633,
          "z": 3296029.328107029,
          "heading": 6.265818009865141,
          "pitch": -0.20066641115243522,
          "roll": 6.283185307169703,
          "unVisibleLayer": [
            "lvhua@sanwei",
            "wuding@sanwei",
            "hualun@sanwei",
            "bengji@sanwei",
            "shuizamen@sanwei",
            "dianqigui@sanwei",
            "guandao@sanwei"
          ],
          "type": "shange",
          "unit": "格栅",
          "entities": [{
            "image": "./3d/png/geshanyeweiValue.png",
            "width": 124,
            "height": 30,
            "x": 121.42264292236955,
            "y": 31.11592101251691,
            "z": 4.0
          }, {
            "image": "./3d/png/geshanyeweiValue.png",
            "width": 124,
            "height": 30,
            "x": 121.42273641622427,
            "y": 31.11593219068511,
            "z": 4.0
          }]
        }, {
          "x": -2846806.7894537663,
          "y": 4659645.828789909,
          "z": 3296044.13404675,
          "heading": 4.921921603926387,
          "pitch": -0.11713253082506436,
          "roll": 6.283185307056229,
          "unVisibleLayer": [
            "lvhua@sanwei",
            "wuding@sanwei",
            "qiangtiDS@sanwei",
            "diban@sanwei",
            "hualun@sanwei",
            "shuizamen@sanwei",
            "geshan@sanwei",
            "bangonglou@sanwei",
            "dimian@sanwei",
            "dianqigui@sanwei",
            "guandao@sanwei",
            "other@sanwei"
          ],
          "type": "bengji",
          "unit": "泵房泵机",
          "entities": [{
            "image": "./3d/png/bengjiValueOff.png",
            "width": 104,
            "height": 126,
            "x": 121.42276012457958,
            "y": 31.116056975424673,
            "z": -8.961065316665043
          }, {
            "image": "./3d/png/bengjiValueOn.png",
            "width": 104,
            "height": 126,
            "x": 121.4227307157858,
            "y": 31.116050305686638,
            "z": -8.861065316665043
          }, {
            "image": "./3d/png/bengjiValueOff.png",
            "width": 104,
            "height": 126,
            "x": 121.4227029245145,
            "y": 31.116042906574368,
            "z": -8.861065316665043
          }, {
            "image": "./3d/png/bengjiValueOn.png",
            "width": 104,
            "height": 126,
            "x": 121.42267368727347,
            "y": 31.11603578697394,
            "z": -8.861065316665043
          }, {
            "image": "./3d/png/bengjiValueOn.png",
            "width": 104,
            "height": 126,
            "x": 121.42264209158776,
            "y": 31.116027586423638,
            "z": -8.861065316665043
          }, {
            "image": "./3d/png/bengjiValueOff.png",
            "width": 104,
            "height": 126,
            "x": 121.42260759300473,
            "y": 31.11601746821481,
            "z": -8.861065316665043
          }, {
            "image": "./3d/png/bengjiValueOff.png",
            "width": 104,
            "height": 126,
            "x": 121.42257659446469,
            "y": 31.116009332736564,
            "z": -8.861065316665043
          }, {
            "image": "./3d/png/bengjiValueOn.png",
            "width": 104,
            "height": 126,
            "x": 121.42254278316226,
            "y": 31.115998877402376,
            "z": -8.861065316665043
          }, {
            "image": "./3d/png/bengjiName8.png",
            "width": 43,
            "height": 23,
            "x": 121.42276485919895,
            "y": 31.116030422983915,
            "z": -11
          }, {
            "image": "./3d/png/bengjiName7.png",
            "width": 43,
            "height": 23,
            "x": 121.42273531437776,
            "y": 31.116022971702616,
            "z": -11.5
          }, {
            "image": "./3d/png/bengjiName6.png",
            "width": 43,
            "height": 23,
            "x": 121.42270649064902,
            "y": 31.11601521474607,
            "z": -11.5
          }, {
            "image": "./3d/png/bengjiName5.png",
            "width": 43,
            "height": 23,
            "x": 121.42267733824055,
            "y": 31.116008453677495,
            "z": -11.5
          }, {
            "image": "./3d/png/bengjiName4.png",
            "width": 43,
            "height": 23,
            "x": 121.42264593405767,
            "y": 31.11600021995538,
            "z": -11.5
          }, {
            "image": "./3d/png/bengjiName3.png",
            "width": 43,
            "height": 23,
            "x": 121.42261168473645,
            "y": 31.115992189591175,
            "z": -11.5
          }, {
            "image": "./3d/png/bengjiName2.png",
            "width": 43,
            "height": 23,
            "x": 121.42258090152889,
            "y": 31.115983904546155,
            "z": -11.5
          }, {
            "image": "./3d/png/bengjiName1.png",
            "width": 43,
            "height": 23,
            "x": 121.42254867282092,
            "y": 31.115974193441904,
            "z": -11.5
          }]
        },
        {
          "x": -2846785.588509999,
          "y": 4659662.487899932,
          "z": 3296067.053716191,
          "heading": 1.0742934918378566,
          "pitch": -0.2217893600749643,
          "roll": 4.000746400834032e-10,
          "unVisibleLayer": [
            "qiangtiDS@sanwei",
            "qiangtiDX@sanwei",
            "diban@sanwei",
            "hualun@sanwei",
            "bengji@sanwei",
            "geshan@sanwei",
            "bangonglou@sanwei",
            "dianqigui@sanwei"
          ],
          "type": "chushui",
          "unit": "出水闸门",
          "entities": [{
            "image": "./3d/png/jinshuizhamenValue.png",
            "width": 124,
            "height": 70,
            "x": 121.422582327745,
            "y": 31.11624065421518,
            "z": 5
          }, {
            "image": "./3d/png/jinshuizhamenValueOn.png",
            "width": 124,
            "height": 70,
            "x": 121.42259386690718,
            "y": 31.116217486793882,
            "z": 5
          }, {
            "image": "./3d/png/chushuizhamenName2.png",
            "width": 81,
            "height": 24,
            "x": 121.42263800466598,
            "y": 31.11622401738218,
            "z": 3
          }, {
            "image": "./3d/png/chushuizhamenName1.png",
            "width": 81,
            "height": 24,
            "x": 121.42262040112433,
            "y": 31.11625434279152,
            "z": 3
          }]
        },
        {
          "x": -2846904.0951219136,
          "y": 4659622.542599948,
          "z": 3296031.104380607,
          "heading": 4.830510667385687,
          "pitch": -0.10020075138657991,
          "roll": 1.6740813180149416e-9,
          "unVisibleLayer": [
            "diban@sanwei",
            "hualun@sanwei",
            "bengji@sanwei",
            "shuizamen@sanwei",
            "geshan@sanwei",
            "dianqigui@sanwei"
          ],
          "type": "guandao",
          "unit": "地下管道",
          "entities": [{
            "image": "./3d/png/chushuiguanValue.png",
            "width": 149,
            "height": 30,
            "x": 121.4235209967004,
            "y": 31.11574225962609,
            "z": 2.027123338722888482
          }, {
            "image": "./3d/png/chushuiguanValue.png",
            "width": 149,
            "height": 30,
            "x": 121.42345274606664,
            "y": 31.115960825228743,
            "z": -0.03643686512514195
          }]
        }
      ]
    }
  ],
  "yunWeiLayers": [{
      "label": "污水处理厂",
      "expanded": true,
      "typeName": "wushui",
      "type": "wushui",
      "visible": false,
      "tabQuery": false,
      "children": [{
          "label": "虹口区",
          "expanded": true,
          "typeName": "wushui1",
          "type": "wushui",
          "visible": false,
          "tabQuery": false,
          "children": [{
            "label": "曲阳污水处理厂",
            "expanded": true,
            "typeName": "wushui11",
            "type": "wushui",
            "visible": true,
            "tabQuery": true,
            "children": []
          }]
        },
        {
          "label": "徐汇区",
          "expanded": true,
          "typeName": "wushui2",
          "type": "wushui",
          "visible": false,
          "tabQuery": false,
          "children": [{
            "label": "龙华水质净化厂",
            "expanded": true,
            "typeName": "wushui21",
            "type": "wushui",
            "visible": false,
            "tabQuery": true,
            "children": []
          }, {
            "label": "长桥水质净化厂",
            "expanded": true,
            "typeName": "wushui22",
            "type": "wushui",
            "visible": false,
            "tabQuery": true,
            "children": []
          }]
        },
        {
          "label": "长宁区",
          "expanded": false,
          "typeName": "wushui3",
          "type": "wushui",
          "visible": false,
          "tabQuery": false,
          "children": [{
            "label": "天山污水处理厂",
            "expanded": false,
            "typeName": "wushui31",
            "type": "wushui",
            "visible": false,
            "tabQuery": true,
            "children": []
          }]
        },
        {
          "label": "普陀区",
          "expanded": false,
          "typeName": "wushui4",
          "type": "wushui",
          "visible": false,
          "tabQuery": false,
          "children": [{
            "label": "曹阳水质净化厂",
            "expanded": false,
            "typeName": "wushui41",
            "type": "wushui",
            "visible": false,
            "tabQuery": true,
            "children": []
          }, {
            "label": "桃浦污水处理厂",
            "expanded": false,
            "typeName": "wushui42",
            "type": "wushui",
            "visible": false,
            "tabQuery": true,
            "children": []
          }]
        },
        {
          "label": "闵行区",
          "expanded": false,
          "typeName": "wushui5",
          "type": "wushui",
          "visible": false,
          "tabQuery": false,
          "children": [{
            "label": "闵行污水处理厂",
            "expanded": false,
            "typeName": "wushui51",
            "type": "wushui",
            "visible": false,
            "tabQuery": true,
            "children": []
          }, {
            "label": "程桥污水处理厂",
            "expanded": false,
            "typeName": "wushui52",
            "type": "wushui",
            "visible": false,
            "tabQuery": true,
            "children": []
          }]
        },
        {
          "label": "浦东新区",
          "expanded": true,
          "typeName": "wushui6",
          "type": "wushui",
          "visible": false,
          "tabQuery": false,
          "children": [{
            "label": "竹园一厂",
            "expanded": true,
            "typeName": "wushui61",
            "type": "wushui",
            "visible": false,
            "tabQuery": true,
            "children": []
          }, {
            "label": "竹园二厂",
            "expanded": true,
            "typeName": "wushui62",
            "type": "wushui",
            "visible": false,
            "tabQuery": true,
            "children": []
          }, {
            "label": "白龙港",
            "expanded": true,
            "typeName": "wushui63",
            "type": "wushui",
            "visible": false,
            "tabQuery": true,
            "children": []
          }, {
            "label": "合流二期",
            "expanded": true,
            "typeName": "wushui64",
            "type": "wushui",
            "visible": false,
            "tabQuery": true,
            "children": []
          }]
        }
      ]
    },
    {
      "label": "排水泵站",
      "expanded": false,
      "typeName": "bengzhan",
      "type": "bengzhan",
      "icon": "",
      "visible": false,
      "tabQuery": false,
      "layer_3d": "",
      "position": [],
      "children": [{
          "label": "黄浦区",
          "expanded": false,
          "typeName": "bengzhan1",
          "type": "bengzhan",
          "visible": false,
          "tabQuery": false,
          "children": [{
            "label": "西藏中",
            "expanded": false,
            "typeName": "bengzhan11",
            "type": "bengzhan",
            "visible": false,
            "tabQuery": true,
            "children": []
          }, {
            "label": "福建北",
            "expanded": false,
            "typeName": "bengzhan12",
            "type": "bengzhan",
            "visible": false,
            "tabQuery": true,
            "children": []
          }, {
            "label": "成都北",
            "expanded": false,
            "typeName": "bengzhan13",
            "type": "bengzhan",
            "visible": false,
            "tabQuery": true,
            "children": []
          }]
        },
        {
          "label": "徐汇区",
          "expanded": false,
          "typeName": "bengzhan2",
          "type": "bengzhan",
          "visible": false,
          "tabQuery": false,
          "children": [{
            "label": "宛平南",
            "expanded": false,
            "typeName": "bengzhan21",
            "type": "bengzhan",
            "visible": false,
            "tabQuery": true,
            "children": []
          }, {
            "label": "龙华西",
            "expanded": false,
            "typeName": "bengzhan22",
            "type": "bengzhan",
            "visible": false,
            "tabQuery": true,
            "children": []
          }, {
            "label": "肇家浜",
            "expanded": false,
            "typeName": "bengzhan23",
            "type": "bengzhan",
            "visible": false,
            "tabQuery": true,
            "children": []
          }]
        },
        {
          "label": "静安区",
          "expanded": true,
          "typeName": "bengzhan3",
          "type": "bengzhan",
          "visible": false,
          "tabQuery": false,
          "children": [{
            "label": "彭越浦",
            "expanded": true,
            "typeName": "bengzhan31",
            "type": "bengzhan",
            "visible": false,
            "tabQuery": true,
            "children": []
          }, {
            "label": "广中西",
            "expanded": true,
            "typeName": "bengzhan32",
            "type": "bengzhan",
            "visible": false,
            "tabQuery": true,
            "children": []
          }]
        },
        {
          "label": "长宁区",
          "expanded": true,
          "typeName": "bengzhan4",
          "type": "bengzhan4",
          "icon": "",
          "visible": false,
          "tabQuery": false,
          "layer_3d": "",
          "position": [],
          "children": [{
            "label": "北虹北",
            "expanded": true,
            "typeName": "bengzhan41",
            "type": "bengzhan",
            "visible": false,
            "tabQuery": true,
            "children": []
          }]
        },
        {
          "label": "杨浦区",
          "expanded": true,
          "typeName": "bengzhan5",
          "type": "bengzhan",
          "visible": false,
          "tabQuery": false,
          "children": [{
            "label": "双阳（雨）",
            "expanded": true,
            "typeName": "bengzhan51",
            "type": "bengzhan",
            "visible": false,
            "tabQuery": true,
            "children": []
          }, {
            "label": "四平",
            "expanded": true,
            "typeName": "bengzhan52",
            "type": "bengzhan",
            "visible": false,
            "tabQuery": true,
            "children": []
          }]
        },
        {
          "label": "闵行区",
          "expanded": false,
          "typeName": "bengzhan6",
          "type": "bengzhan",
          "visible": false,
          "tabQuery": true,
          "children": []
        }
      ]
    },
    {
      "label": "管道检测",
      "expanded": true,
      "typeName": "guandao",
      "type": "bengzhan",
      "visible": false,
      "children": [{
        "label": "2019年",
        "expanded": true,
        "typeName": "guandao1",
        "type": "bengzhan",
        "visible": false,
        "children": []
      }, {
        "label": "2018年",
        "expanded": true,
        "typeName": "guandao2",
        "type": "bengzhan",
        "visible": false,
        "children": []
      }, {
        "label": "2017年",
        "expanded": true,
        "typeName": "guandao3",
        "type": "bengzhan",
        "visible": false,
        "children": []
      }]
    }
  ]
};