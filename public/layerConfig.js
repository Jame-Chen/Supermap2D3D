var layerConfig =
  {
    "gumei":"http://172.18.0.86:8090/iserver/services/3D-BASE_gm-BASE_GM/rest/realspace",
    "ywps":"http://172.18.0.86:8090/iserver/services/3D-DRAIN_gm/rest/realspace",
    "gmdata":"http://172.18.0.86:8090/iserver/services/data-BASE_gm-BASE_GM/rest/data",
    "gwdata":"http://172.18.0.86:8090/iserver/services/data-DRAIN_gm/rest/data",
    "baseMap": {
      "url_map": "http://47.103.120.129:8090/iserver/services",
      "mapCenter": [31.16, 121.42],
      "url_data": "http://47.103.120.129:8090/iserver/services/data-shanghainei_Data/rest/data",
      "dataSourceName": "172.19.184.74_shanghaitx_gw",
      "url_spatial_analyst": "http://47.103.120.129:8090/iserver/services/spatialAnalysis-shanghainei_Data/restjsr/spatialanalyst",
      "url_transport_analyst": "http://47.103.120.129:8090/iserver/services/transportationAnalyst-shanghai_network/rest/networkanalyst/network@network",
      "url_transport_analyst_rule": "http://47.103.120.129:8090/iserver/services/transportationAnalyst-shanghai_network/rest/networkanalyst/network@network",
      "url_network_data": "http://47.103.120.129:8090/iserver/services/data-shanghai_network/rest/data",
      "networkDataSourceName": "network",
      "networkDatasetNames": {
        "node": ["network_Node_1"],
        "edge": ["network"]
      },
      "url_map_3d": "http://47.103.120.129:8090/iserver/services/3D-shanghai_3D/rest/realspace",
      "mapCenter_3d": [-2847625.8508019038, 4659589.559632811, 3304675.6919506327, 0.12328245467987209, -1.5141061568716472, 1.935553939347301e-8],
      "url_data3d": "http://47.103.120.129:8090/iserver/services/data-shanghai_3D/rest/data",
      "dataSourceName3d": "shanghai_3D"
    },
    "layers": [{
      "label": "工程管理",
      "sort": 0,
      "typeName": "project",
      "type": "gongcheng",
      "icon": "",
      "visible": false,
      "tabQuery": false,
      "layer": "",
      "layer_3d": "",
      "datasetNames": "",
      "typeKeyWords": "",
      "attributeFilter": "",
      "childNoVisibleAttributeFilter": {},
      "children": [{
        "label": "2020年",
        "sort": 1,
        "typeName": "project2020",
        "type": "gongcheng",
        "icon": "",
        "visible": true,
        "tabQuery": true,
        "layer": "",
        "layer_3d": "",
        "datasetNames": "ShangHaiProject",
        "typeKeyWords": {
          "keyWords": "S_YEARPLAN",
          "value": "2020"
        },
        "attributeFilter": "S_YEARPLAN = '2020' and N_IsUse = 1",
        "childNoVisibleAttributeFilter": {
          "project2020_1": "( N_JINZHAN <> 1  and  N_JINZHAN <> 2  and  N_JINZHAN <> 3  and  N_JINZHAN <> 4 )",
          "project2020_2": "( N_JINZHAN <> 5 )",
          "project2020_3": "( N_JINZHAN <> 6 )"
        },
        "children": [{
          "label": "设计",
          "sort": 1,
          "typeName": "project2020_1",
          "type": "gongcheng",
          "icon": "icon-sj",
          "visible": true,
          "tabQuery": false,
          "layer": "/map-shanghai_pro/rest/maps/ShangHaiProject2020_1",
          "layer_3d": "",
          "datasetNames": "",
          "typeKeyWords": {
            "keyWords": "",
            "value": ""
          },
          "attributeFilter": "",
          "childNoVisibleAttributeFilter": {},
          "children": []
        }, {
          "label": "施工",
          "sort": 1,
          "typeName": "project2020_2",
          "type": "gongcheng",
          "icon": "icon-sg",
          "visible": true,
          "tabQuery": false,
          "layer": "/map-shanghai_pro/rest/maps/ShangHaiProject2020_2",
          "layer_3d": "",
          "datasetNames": "",
          "typeKeyWords": {
            "keyWords": "",
            "value": ""
          },
          "attributeFilter": "",
          "childNoVisibleAttributeFilter": {},
          "children": []
        }, {
          "label": "完成",
          "sort": 1,
          "typeName": "project2020_3",
          "type": "gongcheng",
          "icon": "icon-wc",
          "visible": true,
          "tabQuery": false,
          "layer": "/map-shanghai_pro/rest/maps/ShangHaiProject2020_3",
          "layer_3d": "",
          "datasetNames": "",
          "typeKeyWords": {
            "keyWords": "",
            "value": ""
          },
          "attributeFilter": "",
          "childNoVisibleAttributeFilter": {},
          "children": []
        }]
      },{
        "label": "2019年",
        "sort": 1,
        "typeName": "project2019",
        "type": "gongcheng",
        "icon": "",
        "visible": false,
        "tabQuery": true,
        "layer": "",
        "layer_3d": "",
        "datasetNames": "ShangHaiProject",
        "typeKeyWords": {
          "keyWords": "S_YEARPLAN",
          "value": "2019"
        },
        "attributeFilter": "S_YEARPLAN = '2019' and N_IsUse = 1",
        "childNoVisibleAttributeFilter": {
          "project2019_1": "( N_JINZHAN <> 1  and  N_JINZHAN <> 2  and  N_JINZHAN <> 3  and  N_JINZHAN <> 4 )",
          "project2019_2": "( N_JINZHAN <> 5 )",
          "project2019_3": "( N_JINZHAN <> 6 )"
        },
        "children": [{
          "label": "设计",
          "sort": 1,
          "typeName": "project2019_1",
          "type": "gongcheng",
          "icon": "icon-sj",
          "visible": false,
          "tabQuery": false,
          "layer": "/map-shanghai_pro/rest/maps/ShangHaiProject2019_1",
          "layer_3d": "",
          "datasetNames": "",
          "typeKeyWords": {
            "keyWords": "",
            "value": ""
          },
          "attributeFilter": "",
          "childNoVisibleAttributeFilter": {},
          "children": []
        }, {
          "label": "施工",
          "sort": 1,
          "typeName": "project2019_2",
          "type": "gongcheng",
          "icon": "icon-sg",
          "visible": false,
          "tabQuery": false,
          "layer": "/map-shanghai_pro/rest/maps/ShangHaiProject2019_2",
          "layer_3d": "",
          "datasetNames": "",
          "typeKeyWords": {
            "keyWords": "",
            "value": ""
          },
          "attributeFilter": "",
          "childNoVisibleAttributeFilter": {},
          "children": []
        }, {
          "label": "完成",
          "sort": 1,
          "typeName": "project2019_3",
          "type": "gongcheng",
          "icon": "icon-wc",
          "visible": false,
          "tabQuery": false,
          "layer": "/map-shanghai_pro/rest/maps/ShangHaiProject2019_3",
          "layer_3d": "",
          "datasetNames": "",
          "typeKeyWords": {
            "keyWords": "",
            "value": ""
          },
          "attributeFilter": "",
          "childNoVisibleAttributeFilter": {},
          "children": []
        }]
      },{
        "label": "2018年",
        "sort": 1,
        "typeName": "project2018",
        "type": "gongcheng",
        "icon": "",
        "visible": false,
        "tabQuery": true,
        "layer": "",
        "layer_3d": "",
        "datasetNames": "ShangHaiProject",
        "typeKeyWords": {
          "keyWords": "S_YEARPLAN",
          "value": "2018"
        },
        "attributeFilter": "S_YEARPLAN = '2018' and N_IsUse = 1",
        "childNoVisibleAttributeFilter": {
          "project2018_1": "( N_JINZHAN <> 1  and  N_JINZHAN <> 2  and  N_JINZHAN <> 3  and  N_JINZHAN <> 4 )",
          "project2018_2": "( N_JINZHAN <> 5 )",
          "project2018_3": "( N_JINZHAN <> 6 )"
        },
        "children": [{
          "label": "设计",
          "sort": 1,
          "typeName": "project2018_1",
          "type": "gongcheng",
          "icon": "icon-sj",
          "visible": false,
          "tabQuery": false,
          "layer": "",
          "layer_3d": "",
          "datasetNames": "",
          "typeKeyWords": {
            "keyWords": "",
            "value": ""
          },
          "attributeFilter": "",
          "childNoVisibleAttributeFilter": {},
          "children": []
        }, {
          "label": "施工",
          "sort": 1,
          "typeName": "project2018_2",
          "type": "gongcheng",
          "icon": "icon-sg",
          "visible": false,
          "tabQuery": false,
          "layer": "",
          "layer_3d": "",
          "datasetNames": "",
          "typeKeyWords": {
            "keyWords": "",
            "value": ""
          },
          "attributeFilter": "",
          "childNoVisibleAttributeFilter": {},
          "children": []
        }, {
          "label": "完成",
          "sort": 1,
          "typeName": "project2018_3",
          "type": "gongcheng",
          "icon": "icon-wc",
          "visible": false,
          "tabQuery": false,
          "layer": "",
          "layer_3d": "",
          "datasetNames": "",
          "typeKeyWords": {
            "keyWords": "",
            "value": ""
          },
          "attributeFilter": "",
          "childNoVisibleAttributeFilter": {},
          "children": []
        }]
      },{
        "label": "2017年",
        "sort": 1,
        "typeName": "project2017",
        "type": "gongcheng",
        "icon": "",
        "visible": false,
        "tabQuery": true,
        "layer": "",
        "layer_3d": "",
        "datasetNames": "ShangHaiProject",
        "typeKeyWords": {
          "keyWords": "S_YEARPLAN",
          "value": "2017"
        },
        "attributeFilter": "S_YEARPLAN = '2017' and N_IsUse = 1",
        "childNoVisibleAttributeFilter": {
          "project2017_1": "( N_JINZHAN <> 1  and  N_JINZHAN <> 2  and  N_JINZHAN <> 3  and  N_JINZHAN <> 4 )",
          "project2017_2": "( N_JINZHAN <> 5 )",
          "project2017_3": "( N_JINZHAN <> 6 )"
        },
        "children": [{
          "label": "设计",
          "sort": 1,
          "typeName": "project2017_1",
          "type": "gongcheng",
          "icon": "icon-sj",
          "visible": false,
          "tabQuery": false,
          "layer": "",
          "layer_3d": "",
          "datasetNames": "",
          "typeKeyWords": {
            "keyWords": "",
            "value": ""
          },
          "attributeFilter": "",
          "childNoVisibleAttributeFilter": {},
          "children": []
        }, {
          "label": "施工",
          "sort": 1,
          "typeName": "project2017_2",
          "type": "gongcheng",
          "icon": "icon-sg",
          "visible": false,
          "tabQuery": false,
          "layer": "",
          "layer_3d": "",
          "datasetNames": "",
          "typeKeyWords": {
            "keyWords": "",
            "value": ""
          },
          "attributeFilter": "",
          "childNoVisibleAttributeFilter": {},
          "children": []
        }, {
          "label": "完成",
          "sort": 1,
          "typeName": "project2017_3",
          "type": "gongcheng",
          "icon": "icon-wc",
          "visible": false,
          "tabQuery": false,
          "layer": "",
          "layer_3d": "",
          "datasetNames": "",
          "typeKeyWords": {
            "keyWords": "",
            "value": ""
          },
          "attributeFilter": "",
          "childNoVisibleAttributeFilter": {},
          "children": []
        }]
      }]
    }, {
      "label": "规划设计",
      "sort": 0,
      "typeName": "guihua",
      "type": "guihua",
      "icon": "",
      "visible": false,
      "tabQuery": false,
      "layer": "",
      "layer_3d": "",
      "datasetNames": "",
      "typeKeyWords": "",
      "attributeFilter": "",
      "childNoVisibleAttributeFilter": {},
      "children": [{
        "label": "2013年",
        "sort": 1,
        "typeName": "guihua2013",
        "type": "guihua",
        "icon": "",
        "visible": false,
        "tabQuery": false,
        "layer": "",
        "layer_3d": "",
        "datasetNames": "",
        "typeKeyWords": {
          "keyWords": "",
          "value": ""
        },
        "attributeFilter": "",
        "childNoVisibleAttributeFilter": {},
        "children": [{
          "label": "防汛能力评估",
          "sort": 1,
          "typeName": "guihua2013_1",
          "type": "guihua",
          "icon": "",
          "visible": false,
          "tabQuery": false,
          "layer": "",
          "layer_3d": "",
          "datasetNames": "",
          "typeKeyWords": {
            "keyWords": "",
            "value": ""
          },
          "attributeFilter": "",
          "childNoVisibleAttributeFilter": {},
          "children": [{
            "label": "黄埔区",
            "sort": 1,
            "typeName": "guihua2013_11",
            "type": "guihua",
            "icon": "",
            "visible": false,
            "tabQuery": true,
            "layer": "/map-CADwenjian/rest/maps/CAD_huangpu",
            "layer_3d": "",
            "datasetNames": "",
            "typeKeyWords": {
              "keyWords": "",
              "value": ""
            },
            "attributeFilter": "",
            "childNoVisibleAttributeFilter": {},
            "children": [],
            "src": "http://47.100.59.129/vue-sewerage/pdf/web/viewer.html?file=test.pdf"
          },{
            "label": "静安区",
            "sort": 1,
            "typeName": "guihua2013_12",
            "type": "guihua",
            "icon": "",
            "visible": false,
            "tabQuery": true,
            "layer": "/map-CADwenjian/rest/maps/CAD_jinganqu",
            "layer_3d": "",
            "datasetNames": "",
            "typeKeyWords": {
              "keyWords": "",
              "value": ""
            },
            "attributeFilter": "",
            "childNoVisibleAttributeFilter": {},
            "children": [],
            "src": "http://47.100.59.129/vue-sewerage/pdf/web/viewer.html?file=test.pdf"
          },{
            "label": "嘉定区",
            "sort": 1,
            "typeName": "guihua2013_13",
            "type": "guihua",
            "icon": "",
            "visible": false,
            "tabQuery": false,
            "layer": "",
            "layer_3d": "",
            "datasetNames": "",
            "typeKeyWords": {
              "keyWords": "",
              "value": ""
            },
            "attributeFilter": "",
            "childNoVisibleAttributeFilter": {},
            "children": []
          }]
        },{
          "label": "街镇规划",
          "sort": 1,
          "typeName": "guihua2013_2",
          "type": "guihua",
          "icon": "",
          "visible": false,
          "tabQuery": false,
          "layer": "",
          "layer_3d": "",
          "datasetNames": "",
          "typeKeyWords": {
            "keyWords": "",
            "value": ""
          },
          "attributeFilter": "",
          "childNoVisibleAttributeFilter": {},
          "children": [{
            "label": "浦东曹路唐镇",
            "sort": 1,
            "typeName": "guihua2013_21",
            "type": "guihua",
            "icon": "",
            "visible": false,
            "tabQuery": true,
            "layer": "/map-CADwenjian/rest/maps/CAD_caolu",
            "layer_3d": "",
            "datasetNames": "",
            "typeKeyWords": {
              "keyWords": "",
              "value": ""
            },
            "attributeFilter": "",
            "childNoVisibleAttributeFilter": {},
            "children": [],
            "src": "http://47.100.59.129/vue-sewerage/pdf/web/viewer.html?file=test.pdf"
          }]
        }]
      },{
        "label": "2012年",
        "sort": 1,
        "typeName": "guihua2012",
        "type": "guihua",
        "icon": "",
        "visible": false,
        "tabQuery": false,
        "layer": "",
        "layer_3d": "",
        "datasetNames": "",
        "typeKeyWords": {
          "keyWords": "",
          "value": ""
        },
        "attributeFilter": "",
        "childNoVisibleAttributeFilter": {},
        "children": [{
          "label": "金山东部污水系统调整图",
          "sort": 1,
          "typeName": "guihua2012_1",
          "type": "guihua",
          "icon": "",
          "visible": false,
          "tabQuery": false,
          "layer": "",
          "layer_3d": "",
          "datasetNames": "",
          "typeKeyWords": {
            "keyWords": "",
            "value": ""
          },
          "attributeFilter": "",
          "childNoVisibleAttributeFilter": {},
          "children": []
        },{
          "label": "亭林镇区污水系统原规划图",
          "sort": 1,
          "typeName": "guihua2012_2",
          "type": "guihua",
          "icon": "",
          "visible": false,
          "tabQuery": true,
          "layer": "/map-CADwenjian/rest/maps/CAD_tinglin",
          "layer_3d": "",
          "datasetNames": "",
          "typeKeyWords": {
            "keyWords": "",
            "value": ""
          },
          "attributeFilter": "",
          "childNoVisibleAttributeFilter": {},
          "children": [],
          "src": "http://47.100.59.129/vue-sewerage/pdf/web/viewer.html?file=test.pdf"
        },{
          "label": "亭林大居内部污水规划图",
          "sort": 1,
          "typeName": "guihua2012_3",
          "type": "guihua",
          "icon": "",
          "visible": false,
          "tabQuery": false,
          "layer": "",
          "layer_3d": "",
          "datasetNames": "",
          "typeKeyWords": {
            "keyWords": "",
            "value": ""
          },
          "attributeFilter": "",
          "childNoVisibleAttributeFilter": {},
          "children": []
        }]
      },{
        "label": "2008年",
        "sort": 1,
        "typeName": "guihua2008",
        "type": "guihua",
        "icon": "",
        "visible": false,
        "tabQuery": false,
        "layer": "",
        "layer_3d": "",
        "datasetNames": "",
        "typeKeyWords": {
          "keyWords": "",
          "value": ""
        },
        "attributeFilter": "",
        "childNoVisibleAttributeFilter": {},
        "children": [{
          "label": "浦西雨水管网布置(方案一B)",
          "sort": 1,
          "typeName": "guihua2008_1",
          "type": "guihua",
          "icon": "",
          "visible": false,
          "tabQuery": false,
          "layer": "",
          "layer_3d": "",
          "datasetNames": "",
          "typeKeyWords": {
            "keyWords": "",
            "value": ""
          },
          "attributeFilter": "",
          "childNoVisibleAttributeFilter": {},
          "children": []
        },{
          "label": "金山区污水系统规划",
          "sort": 1,
          "typeName": "guihua2008_2",
          "type": "guihua",
          "icon": "",
          "visible": false,
          "tabQuery": false,
          "layer": "",
          "layer_3d": "",
          "datasetNames": "",
          "typeKeyWords": {
            "keyWords": "",
            "value": ""
          },
          "attributeFilter": "",
          "childNoVisibleAttributeFilter": {},
          "children": []
        }]
      }]
    }, {
      "label": "现状设施",
      "sort": 0,
      "typeName": "sheshi",
      "type": "sheshi",
      "icon": "",
      "visible": false,
      "tabQuery": false,
      "layer": "",
      "layer_3d": "",
      "datasetNames": "",
      "typeKeyWords": "",
      "attributeFilter": "",
      "childNoVisibleAttributeFilter": {},
      "children": [{
        "label": "污水处理厂",
        "sort": 1,
        "typeName": "wushuichang",
        "type": "sheshi",
        "icon": "icon-wsc",
        "visible": true,
        "tabQuery": true,
        "layer": "/map-ShangHaiSewagePlant/rest/maps/ShangHaiSewagePlant",
        "layer_3d": "",
        "datasetNames": "ShangHaiSewagePlant",
        "typeKeyWords": {
          "keyWords": "WS_TY",
          "value": "1"
        },
        "attributeFilter": "WS_TY = 1",
        "childNoVisibleAttributeFilter": {},
        "children": []
      }, {
        "label": "排水泵站",
        "sort": 0,
        "typeName": "bengzhan",
        "type": "sheshi",
        "icon": "",
        "visible": false,
        "tabQuery": false,
        "layer": "",
        "layer_3d": "",
        "datasetNames": "",
        "typeKeyWords": "",
        "attributeFilter": "",
        "childNoVisibleAttributeFilter": {},
        "children": [{
          "label": "雨水泵站",
          "sort": 2,
          "typeName": "bengzhan1",
          "type": "sheshi",
          "icon": "icon-ysbz",
          "visible": false,
          "tabQuery": true,
          "layer": "/map-shanghaiPump/rest/maps/ShangHaiPumpRainwater",
          "layer_3d": "",
          "datasetNames": "ShangHaiPumpRainwater",
          "typeKeyWords": {
            "keyWords": "PU_TY",
            "value": "1"
          },
          "attributeFilter": "PU_TY = 1",
          "childNoVisibleAttributeFilter": {},
          "children": []
        },
          {
            "label": "污水泵站",
            "sort": 3,
            "typeName": "bengzhan2",
            "type": "sheshi",
            "icon": "icon-wsbz",
            "visible": false,
            "tabQuery": true,
            "layer": "/map-shanghaiPump/rest/maps/ShangHaiPumpSewage",
            "layer_3d": "",
            "datasetNames": "ShangHaiPumpSewage",
            "typeKeyWords": {
              "keyWords": "PU_TY",
              "value": "2"
            },
            "attributeFilter": "PU_TY = 2",
            "childNoVisibleAttributeFilter": {},
            "children": []
          },
          {
            "label": "合流泵站",
            "sort": 4,
            "typeName": "bengzhan3",
            "type": "sheshi",
            "icon": "icon-hlbz",
            "visible": false,
            "tabQuery": true,
            "layer": "/map-shanghaiPump/rest/maps/ShangHaiPumpCombined",
            "layer_3d": "",
            "datasetNames": "ShangHaiPumpCombined",
            "typeKeyWords": {
              "keyWords": "PU_TY",
              "value": "3"
            },
            "attributeFilter": "PU_TY = 3",
            "childNoVisibleAttributeFilter": {},
            "children": []
          }
        ]
      }, {
        "label": "雨水管网",
        "sort": 0,
        "typeName": "ysgw",
        "type": "sheshi",
        "icon": "",
        "visible": false,
        "tabQuery": false,
        "layer": "",
        "layer_3d": "",
        "datasetNames": "",
        "typeKeyWords": "",
        "attributeFilter": "",
        "childNoVisibleAttributeFilter": {},
        "children": [{
          "label": "主管",
          "sort": 120,
          "typeName": "guan1",
          "type": "sheshi",
          "icon": "icon-ysg",
          "visible": false,
          "tabQuery": true,
          "layer": "/map-ShangHaiPipeRainwater/rest/maps/ShangHaiPipeRainwaterMain",
          "layer_3d": "ShangHaiPipeRainwater@shanghai_3D#1",
          "datasetNames": "ShangHaiPipeRainwater",
          "typeKeyWords": {
            "keyWords": "PI_TY",
            "value": "1"
          },
          "attributeFilter": "PI_TY = 1",
          "childNoVisibleAttributeFilter": {},
          "children": []
        }, {
          "label": "附管",
          "sort": 119,
          "typeName": "guan1_fg",
          "type": "sheshi",
          "icon": "icon-ysg",
          "visible": false,
          "tabQuery": true,
          "layer": "/map-ShangHaiPipeRainwater/rest/maps/ShangHaiPipeRainwaterSubsidiary",
          "layer_3d": "ShangHaiPipeRainwater@shanghai_3D",
          "datasetNames": "ShangHaiPipeRainwater",
          "typeKeyWords": {
            "keyWords": "PI_TY",
            "value": "11"
          },
          "attributeFilter": "PI_TY = 11",
          "childNoVisibleAttributeFilter": {},
          "children": []
        }, {
          "label": "主井",
          "sort": 20,
          "typeName": "jing1",
          "type": "sheshi",
          "icon": "icon-ysj",
          "visible": false,
          "tabQuery": true,
          "layer": "/map-ShangHaiPipeRainwater/rest/maps/ShangHaiPipeRainwaterPitMain",
          "layer_3d": "ShangHaiPipeRainwaterPit@shanghai_3D",
          "datasetNames": "ShangHaiPipeRainwaterPit",
          "typeKeyWords": {
            "keyWords": "MH_TY",
            "value": "1"
          },
          "attributeFilter": "MH_TY = 1",
          "childNoVisibleAttributeFilter": {},
          "children": []
        }, {
          "label": "附井",
          "sort": 19,
          "typeName": "jing1_fj",
          "type": "sheshi",
          "icon": "icon-ysj",
          "visible": false,
          "tabQuery": true,
          "layer": "/map-ShangHaiPipeRainwater/rest/maps/ShangHaiPipeRainwaterPitSubsidiary",
          "layer_3d": "ShangHaiPipeRainwaterPit@shanghai_3D#1",
          "datasetNames": "ShangHaiPipeRainwaterPit",
          "typeKeyWords": {
            "keyWords": "MH_TY",
            "value": "11"
          },
          "attributeFilter": "MH_TY = 11",
          "childNoVisibleAttributeFilter": {},
          "children": []
        }, {
          "label": "雨水口",
          "sort": 18,
          "typeName": "jing1_ysk",
          "type": "sheshi",
          "icon": "icon-ysk",
          "visible": false,
          "tabQuery": true,
          "layer": "/map-ShangHaiPipeRainwater/rest/maps/ShangHaiPipeRainwaterInExit",
          "layer_3d": "ShangHaiPipeRainwaterInExit@shanghai_3D",
          "datasetNames": "ShangHaiPipeRainwaterInExit",
          "typeKeyWords": {
            "keyWords": "MH_TY",
            "value": "12"
          },
          "attributeFilter": "MH_TY = 12",
          "childNoVisibleAttributeFilter": {},
          "children": []
        }]
      }, {
        "label": "污水管网",
        "sort": 0,
        "typeName": "wsgw",
        "type": "sheshi",
        "icon": "",
        "visible": false,
        "tabQuery": false,
        "layer": "",
        "layer_3d": "",
        "datasetNames": "",
        "typeKeyWords": "",
        "attributeFilter": "",
        "childNoVisibleAttributeFilter": {},
        "children": [{
          "label": "主管",
          "sort": 118,
          "typeName": "guan2",
          "type": "sheshi",
          "icon": "icon-wsg",
          "visible": false,
          "tabQuery": true,
          "layer": "/map-shangHaiPipeSewage/rest/maps/ShangHaiPipeSewageMain",
          "layer_3d": "ShangHaiPipeSewage@shanghai_3D#1",
          "datasetNames": "ShangHaiPipeSewage",
          "typeKeyWords": {
            "keyWords": "PI_TY",
            "value": "2"
          },
          "attributeFilter": "PI_TY = 2",
          "childNoVisibleAttributeFilter": {},
          "children": []
        }, {
          "label": "附管",
          "sort": 117,
          "typeName": "guan2_fg",
          "type": "sheshi",
          "icon": "icon-wsg",
          "visible": false,
          "tabQuery": true,
          "layer": "/map-shangHaiPipeSewage/rest/maps/ShangHaiPipeSewageSubsidiary",
          "layer_3d": "ShangHaiPipeSewage@shanghai_3D",
          "datasetNames": "ShangHaiPipeSewage",
          "typeKeyWords": {
            "keyWords": "PI_TY",
            "value": "21"
          },
          "attributeFilter": "PI_TY = 21",
          "childNoVisibleAttributeFilter": {},
          "children": []
        }, {
          "label": "主井",
          "sort": 17,
          "typeName": "jing2",
          "type": "sheshi",
          "icon": "icon-wsj",
          "visible": false,
          "tabQuery": true,
          "layer": "/map-shangHaiPipeSewage/rest/maps/ShangHaiPipeSewagePitMain",
          "layer_3d": "ShangHaiPipeSewagePit@shanghai_3D",
          "datasetNames": "ShangHaiPipeSewagePit",
          "typeKeyWords": {
            "keyWords": "MH_TY",
            "value": "2"
          },
          "attributeFilter": "MH_TY = 2",
          "childNoVisibleAttributeFilter": {},
          "children": []
        }, {
          "label": "附井",
          "sort": 16,
          "typeName": "jing2_fj",
          "type": "sheshi",
          "icon": "icon-wsj",
          "visible": false,
          "tabQuery": true,
          "layer": "/map-shangHaiPipeSewage/rest/maps/ShangHaiPipeSewagePitSubsidiary",
          "layer_3d": "ShangHaiPipeSewagePit@shanghai_3D#1",
          "datasetNames": "ShangHaiPipeSewagePit",
          "typeKeyWords": {
            "keyWords": "MH_TY",
            "value": "21"
          },
          "attributeFilter": "MH_TY = 21",
          "childNoVisibleAttributeFilter": {},
          "children": []
        }, {
          "label": "雨水口",
          "sort": 15,
          "typeName": "jing2_ysk",
          "type": "sheshi",
          "icon": "icon-ysk",
          "visible": false,
          "tabQuery": true,
          "layer": "/map-shangHaiPipeSewage/rest/maps/ShangHaiPipeSewageInExit",
          "layer_3d": "ShangHaiPipeSewageInExit@shanghai_3D",
          "datasetNames": "ShangHaiPipeSewageInExit",
          "typeKeyWords": {
            "keyWords": "MH_TY",
            "value": "22"
          },
          "attributeFilter": "MH_TY = 22",
          "childNoVisibleAttributeFilter": {},
          "children": []
        }]
      }, {
        "label": "合流管网",
        "sort": 0,
        "typeName": "hlgw",
        "type": "sheshi",
        "icon": "",
        "visible": false,
        "tabQuery": false,
        "layer": "",
        "layer_3d": "",
        "datasetNames": "",
        "typeKeyWords": "",
        "attributeFilter": "",
        "childNoVisibleAttributeFilter": {},
        "children": [{
          "label": "主管",
          "sort": 116,
          "typeName": "guan3",
          "type": "sheshi",
          "icon": "icon-hlg",
          "visible": false,
          "tabQuery": true,
          "layer": "/map-shangHaiPipeCombined/rest/maps/ShangHaiPipeCombinedMain",
          "layer_3d": "ShangHaiPipeCombined@shanghai_3D#1",
          "datasetNames": "ShangHaiPipeCombined",
          "typeKeyWords": {
            "keyWords": "PI_TY",
            "value": "3"
          },
          "attributeFilter": "PI_TY = 3",
          "childNoVisibleAttributeFilter": {},
          "children": []
        }, {
          "sort": 115,
          "label": "附管",
          "typeName": "guan3_fg",
          "type": "sheshi",
          "icon": "icon-hlg",
          "visible": false,
          "tabQuery": true,
          "layer": "/map-shangHaiPipeCombined/rest/maps/ShangHaiPipeCombinedSubsidiary",
          "layer_3d": "ShangHaiPipeCombined@shanghai_3D",
          "datasetNames": "ShangHaiPipeCombined",
          "typeKeyWords": {
            "keyWords": "PI_TY",
            "value": "31"
          },
          "attributeFilter": "PI_TY = 31",
          "childNoVisibleAttributeFilter": {},
          "children": []
        }, {
          "label": "主井",
          "sort": 14,
          "typeName": "jing3",
          "type": "sheshi",
          "icon": "icon-hlj",
          "visible": false,
          "tabQuery": true,
          "layer": "/map-shangHaiPipeCombined/rest/maps/ShangHaiPipeCombinedPitMain",
          "layer_3d": "ShangHaiPipeCombinedPit@shanghai_3D",
          "datasetNames": "ShangHaiPipeCombinedPit",
          "typeKeyWords": {
            "keyWords": "MH_TY",
            "value": "3"
          },
          "attributeFilter": "MH_TY = 3",
          "childNoVisibleAttributeFilter": {},
          "children": []
        }, {
          "label": "附井",
          "sort": 13,
          "typeName": "jing3_fj",
          "type": "sheshi",
          "icon": "icon-hlj",
          "visible": false,
          "tabQuery": true,
          "layer": "/map-shangHaiPipeCombined/rest/maps/ShangHaiPipeCombinedPitSubsidiary",
          "layer_3d": "ShangHaiPipeCombinedPit@shanghai_3D#1",
          "datasetNames": "ShangHaiPipeCombinedPit",
          "typeKeyWords": {
            "keyWords": "MH_TY",
            "value": "31"
          },
          "attributeFilter": "MH_TY = 31",
          "childNoVisibleAttributeFilter": {},
          "children": []
        }, {
          "label": "雨水口",
          "sort": 12,
          "typeName": "jing3_ysk",
          "type": "sheshi",
          "icon": "icon-ysk",
          "visible": false,
          "tabQuery": true,
          "layer": "/map-shangHaiPipeCombined/rest/maps/ShangHaiPipeCombinedInExit",
          "layer_3d": "ShangHaiPipeCombinedInExit@shanghai_3D",
          "datasetNames": "ShangHaiPipeCombinedInExit",
          "typeKeyWords": {
            "keyWords": "MH_TY",
            "value": "32"
          },
          "attributeFilter": "MH_TY = 32",
          "childNoVisibleAttributeFilter": {},
          "children": []
        }]
      }, {
        "label": "排放口",
        "sort": 30,
        "typeName": "paifangkou",
        "type": "sheshi",
        "icon": "icon-pfk",
        "visible": false,
        "tabQuery": true,
        "layer": "/map-ShanghaiDrainExit/rest/maps/ShanghaiDrainExit",
        "layer_3d": "",
        "datasetNames": "ShanghaiDrainExit",
        "typeKeyWords": {
          "keyWords": "PF_TY",
          "value": "1"
        },
        "attributeFilter": "PF_TY = 1",
        "childNoVisibleAttributeFilter": {},
        "children": []
      }, {
        "label": "排水系统",
        "sort": 301,
        "typeName": "paishuixitong",
        "type": "sheshi",
        "icon": "icon-psxt",
        "visible": false,
        "tabQuery": true,
        "layer": "/map-shanghaiPaishuixitong/rest/maps/shanghaiPaishuixitong",
        "layer_3d": "",
        "datasetNames": "paishuixitong",
        "typeKeyWords": {
          "keyWords": "SYS_TY",
          "value": "1"
        },
        "attributeFilter": "SYS_TY = 1",
        "childNoVisibleAttributeFilter": {},
        "children": []
      }]
    }],
    "geoMap": [{
      "label": "标准",
      "typeName": "normal",
      "visible": true,
      "src": "./static/normal.png",
      "url_map": "http://47.103.120.129:8090/iserver/services/map-ugcv5-shanghai2/rest/maps/shanghai"
    },
      {
        "label": "专业",
        "typeName": "professional",
        "visible": false,
        "src": "./static/professional.png",
        "url_map": "http://47.103.120.129:8090/iserver/services/map-Zhuantitu/rest/maps/Zhuantitu"
      },
      {
        "label": "VR实景",
        "typeName": "panorama",
        "visible": false,
        "src": "./static/panorama.png",
        "url_map": ""
      },
      {
        "label": "VR视频",
        "typeName": "video",
        "visible": false,
        "src": "./static/video.png",
        "url_map": ""
      }
    ],
      "geoMap_3d": [{
      "label": "dailu",
      "typeName": "dailu",
      "visible": true,
      "alpha": true,
      "src": "",
      "url_map": "http://47.103.120.129:8090/iserver/services/map-shanghai_dailu/rest/maps/shanghai_dailu"
      }
    ]
  }
