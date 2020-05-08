<template>
  <div class="dataTable" v-if="state">
      <div class="table-context">
        <!-- 右侧按钮 -->
        <div class="right">
          <el-button type="text" size="small" @click="outExcel()" style="font-size: 14px;">
            <svg-icon icon-class="exportExcel"/>
          </el-button>
          <el-button type="text" size="small" @click="toggleOnlyState(false)" >
            <svg-icon icon-class="mini"/>
          </el-button>
          <el-button type="text" size="small" @click="toMaximize()" >
            <svg-icon v-if="!max" icon-class="iconMax"/>
            <svg-icon v-else icon-class="iconMin"/>
          </el-button>
          <el-button v-if="!max" type="text" size="small" @click="toggle(false)"><svg-icon icon-class="iconClose"/></el-button>
        </div>
        <el-tabs ref="tabs" v-model="activeName" @tab-click="tabClick">
          <el-tab-pane v-if="isSectionShow" label="断面图" name="0">
            <space-section-analysis-chart ref="spaceSectionAnalysisChart" :height="height"
                                          :dataJson="dataJson"
                                          @showSectionDetails="showSectionDetails"/>
          </el-tab-pane>
          <el-tab-pane v-for="(details, index) in tableData" :key="index" :label="details.label" :name="details.name">
              <el-table :ref="'filterTable'-`${index}-${num}`"
                :key="`${index}-${num}`"
                :show-summary="showSummary"
                sum-text="统计"
                :summary-method="getSummaries"
                :data="details.data"
                border
                :height="tableHeight"
                :max-height="tableHeight"
                style="width: 100%"
                size="mini"
                @row-click="rowClick">
                <!-- :sortable="col.sortable" -->
                <template v-for="(col, index) in tableCol">
                  <el-table-column :key="index"
                    :prop="col.prop"
                    :label="col.label"
                    :width="col.width"
                    v-if="!col.filterable || (col.filterable && !pageFlag && geoType === undefined)"
                    :align="col.align"
                    header-align="center"
                    show-overflow-tooltip>
                  </el-table-column>
                  <!-- 筛选所在的位置如下 -->
                  <el-table-column :key="index"
                    :prop="col.prop"
                    :label="col.label"
                    :width="col.width"
                    v-if="col.filterable && (pageFlag || geoType !== undefined)"
                    :align="col.align"
                    header-align="center"
                    show-overflow-tooltip>
                    <template slot="header" slot-scope="scope">
                      {{scope.column.label}}
                      <span class="floatRight" @click="filter($event, scope)" >
                        <svg-icon icon-class="filter" />
                      </span>
                    </template>
                  </el-table-column>
                </template>
              </el-table>
            <el-pagination @current-change="doPageQuery"
                           @size-change="doSizeQuery"
                            ref="ELPagination"
                           :current-page="pageNum"
                           :page-sizes="pageSizes"
                           :page-size="pageSize"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="pageCount">
            </el-pagination>
          </el-tab-pane>
        </el-tabs>
      </div>
      <table-filter ref="TableFilter"
      :show="filterState.show"
      :clickXY="filterState.clickXY"
      :index="filterState.index"
      :columnKey="filterState.columnKey"
      :indexSelect="indexSelect"
      :indexSummary="indexSummary"
      @submit="submit"
      @clearFilter="clearFilter"
      @toggle="toggleFilter" />
  </div>
</template>
<script>
import SpaceSectionAnalysisChart from './SpaceSectionAnalysisChart.vue'
import baseMixin from './baseMixin.js'
import tableFilter from './TableFilter.vue'
const TAFFY = require('taffy/lib/taffy').taffy
export default {
  name: 'DataTable',
  mixins: [ baseMixin ],
  components: {
    SpaceSectionAnalysisChart,
    tableFilter
  },
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
      return h.substring(0, (h.length - 2)) - 50 - 34 + 'px'
    }
  },
  data () {
    return {
      name: 'DataTable',
      max: this.maximize,
      activeName: '1',
      tableData: [], // 数据列表
      tableCol: [], // 信息列名
      isSectionShow: false, // 是否显示断面分析图
      defaultPageSizes: [10, 20, 50, 100],
      pageSizes: [],
      pageSize: 0,
      pageNum: 1,
      pageCount: 0,
      pageFlag: false,
      typeName: '',
      layer_i: 0,
      sectionStartId: '',
      dataJson: {},
      /** *********************筛*****************************/
      indexSelect: [],
      indexSummary: [],
      filterColumns: [],
      summaryColumns: [],
      tempAttributeFilter: [],
      summaryResult: [],
      showSummary: false,
      num: 0,
      geometry: {},
      geoType: '',
      activeCount: '0',
      exportCount: 0,
      /** ********************查询属性**********************/
      // 查询图层i|j
      selectedLayerNames: [],
      attributeFilter: [],
      selectedFeatures: [],
      selectedCounts: [],
      /** ********************筛选的props**********************/
      // 筛选所需要的状态
      filterState: {
        show: false,
        clickXY: { x: 0, y: 0 },
        index: 10000,
        columnKey: ''
      }
    }
  },
  methods: {
    toMaximize (val) {
      const value = this.formatStringToBoolean(val)
      if (value === undefined) this.max = !this.max
      else this.max = value
      this.$emit('maximize', { name: this.name, value: this.max })
    },
    doSQLCountQuery () {
      let i = this.layer_i
      let layer = this.queryProps[this.selectedLayerNames[i]]
      let queryObj = {
        'getFeatureMode': 'SQL',
        'datasetNames': [layer.datasetNames],
        'hasGeometry': false,
        'queryParameter': {
          attributeFilter: this.attributeFilter[i] + this.tempAttributeFilter[i],
          fields: ['SMID']
        }
      }
      this.$http.post(this.baseProps['url_data'] + '/featureResults.rjson?returnContent=true&toIndex=-1',
        JSON.stringify(queryObj)).then((res) => {
        if (res.data.featureCount > 0) {
          this.selectedCounts[i] = res.data.featureCount
          this.pageCount = this.selectedCounts[i]
          this.doPageQuery(1)
        } else {
          this.$emit('openMessage', '暂无结果!', 'error')
        }
      })
    },
    doPageQuery (val) {
      this.pageNum = val
      this.$emit('changeLoading', true)
      let i = this.layer_i
      let layer = this.queryProps[this.selectedLayerNames[i]]
      let fields = ['SMID', 'POPTITLE']
      for (let h = 0; h < layer.columnList.length; h++) {
        let tabFields = layer.columnList[h]
        let columnEName = (tabFields.columnEName).toUpperCase()
        fields.push(columnEName)
      }
      let getParameters = new SuperMap.GetFeaturesBySQLParameters({
        queryParameter: {
          attributeFilter: this.attributeFilter[i] + this.tempAttributeFilter[i],
          orderBy: layer.sqlOrders,
          fields: fields
        },
        fromIndex: (this.pageNum - 1) * this.pageSize,
        toIndex: this.pageNum * this.pageSize - 1,
        datasetNames: [layer.datasetNames]
      })
      L.supermap
        .featureService(this.baseProps['url_data'])
        .getFeaturesBySQL(getParameters, (serviceResult) => {
          let features = serviceResult.result.features.features
          if (features) {
            this.selectedFeatures[i] = features
          }
          this.$emit('changeLoading', false)
          this.$emit('doDrawChangeResults', this.selectedFeatures[i], i)
          this.showResults(true, true, this.activeCount)
        })
    },
    doSizeQuery (val) {
      this.pageSize = val
      this.pageNum = 1
      this.$emit('changeLoading', true)
      let i = this.layer_i
      let layer = this.queryProps[this.selectedLayerNames[i]]
      let fields = ['SMID', 'POPTITLE']
      for (let h = 0; h < layer.columnList.length; h++) {
        let tabFields = layer.columnList[h]
        let columnEName = (tabFields.columnEName).toUpperCase()
        fields.push(columnEName)
      }
      let getParameters = new SuperMap.GetFeaturesBySQLParameters({
        queryParameter: {
          attributeFilter: this.attributeFilter[i] + this.tempAttributeFilter[i],
          orderBy: layer.sqlOrders,
          fields: fields
        },
        fromIndex: (this.pageNum - 1) * this.pageSize,
        toIndex: this.pageNum * this.pageSize - 1,
        datasetNames: [layer.datasetNames]
      })
      L.supermap
        .featureService(this.baseProps['url_data'])
        .getFeaturesBySQL(getParameters, (serviceResult) => {
          let features = serviceResult.result.features.features
          if (features) {
            this.selectedFeatures[i] = features
          }
          this.$emit('changeLoading', false)
          this.$emit('doDrawChangeResults', this.selectedFeatures[i], i)
          this.showResults(true, true, this.activeCount)
        })
    },
    doDrawQuery () {
      this.$emit('changeLoading', true)
      let i = this.layer_i
      let layer = this.queryProps[this.selectedLayerNames[i]]
      let fields = ['SMID', 'POPTITLE']
      for (let h = 0; h < layer.columnList.length; h++) {
        let tabFields = layer.columnList[h]
        let columnEName = (tabFields.columnEName).toUpperCase()
        fields.push(columnEName)
      }
      let getParameters = new SuperMap.GetFeaturesByGeometryParameters({
        toIndex: -1,
        datasetNames: [layer.datasetNames],
        attributeFilter: this.attributeFilter[i] + this.tempAttributeFilter[i],
        geometry: this.geometry,
        spatialQueryMode: 'INTERSECT',
        fields: fields
      })
      L.supermap
        .featureService(this.baseProps['url_data'])
        .getFeaturesByGeometry(getParameters, (serviceResult) => {
          let features = serviceResult.result.features.features
          if (features && features.length > 0) {
            this.selectedCounts[i] = features.length
            this.selectedFeatures[i] = features
            this.$emit('changeLoading', false)
            this.$emit('doDrawChangeResults', this.selectedFeatures[i], i)
            this.showResults(false, false, this.activeCount)
          } else {
            this.$emit('openMessage', '暂无结果!', 'error')
          }
        })
    },
    doDrawRectangleQuery () {
      this.$emit('changeLoading', true)
      let i = this.layer_i
      let layer = this.queryProps[this.selectedLayerNames[i]]
      let fields = ['SMID', 'POPTITLE']
      for (let h = 0; h < layer.columnList.length; h++) {
        let tabFields = layer.columnList[h]
        let columnEName = (tabFields.columnEName).toUpperCase()
        fields.push(columnEName)
      }
      let getParameters = new SuperMap.GetFeaturesByGeometryParameters({
        toIndex: -1,
        datasetNames: [layer.datasetNames],
        attributeFilter: this.attributeFilter[i] + this.tempAttributeFilter[i],
        bounds: this.geometry,
        fields: fields
      })
      L.supermap
        .featureService(this.baseProps['url_data'])
        .getFeaturesByBounds(getParameters, (serviceResult) => {
          let features = serviceResult.result.features.features
          if (features && features.length > 0) {
            this.selectedCounts[i] = features.length
            this.selectedFeatures[i] = features
            this.$emit('changeLoading', false)
            this.$emit('doDrawChangeResults', this.selectedFeatures[i], i)
            this.showResults(false, false, this.activeCount)
          } else {
            this.$emit('openMessage', '暂无结果!', 'error')
          }
        })
    },
    doCountQuery (conditionOr, conditionAnd) {
      let i = this.layer_i
      let properties = []
      for (let j = 0; j < this.selectedFeatures[i].length; j++) {
        properties[j] = this.selectedFeatures[i][j].properties
      }
      let productDb = TAFFY(properties[j])
      if (conditionAnd.length > 0) {
        for (let j = 0; j < conditionAnd.length; j++) {
          let temp = productDb(conditionAnd[j]).get()
          productDb = TAFFY(temp)
        }
      }
      if (conditionOr.length > 0) {
        let temp = productDb(conditionOr).get()
        productDb = TAFFY(temp)
      }
    },
    doSummaryQuery (datas, column) {
      let i = this.layer_i
      if (this.pageFlag) { // 需要分页的做查询
        let layer = this.queryProps[this.selectedLayerNames[i]]
        let queryObj = {
          'getFeatureMode': 'SQL',
          'datasetNames': [layer.datasetNames],
          'hasGeometry': false,
          'queryParameter': {
            attributeFilter: this.attributeFilter[i] + this.tempAttributeFilter[i],
            fields: column
          }
        }
        this.$http.post(this.baseProps['url_data'] + '/featureResults.rjson?returnContent=true&toIndex=-1',
          JSON.stringify(queryObj)).then((res) => {
          for (let k = 0; k < datas.length; k++) {
            let num = 0
            if (datas[k].type === 'count') {
              num = res.data.featureCount
            } else {
              if (datas[k].dataType === '2' || datas[k].dataType === '3') { // 数字
                let features = res.data.features
                for (let j = 0; j < features.length; j++) {
                  num += parseFloat((features[j].fieldValues[k] !== null && features[j].fieldValues[k] !== '') ? features[j].fieldValues[k] : 0)
                }
                if (datas[k].type === 'ave') num = num / features.length
                num = num.toFixed(3)
              }
            }
            datas[k].num = num
          }
        })
      } else { // 不需要分页的直接计算
        for (let k = 0; k < datas.length; k++) {
          let num = 0
          if (datas[k].type === 'count') {
            num = this.selectedFeatures[i].length
          } else {
            if (datas[k].dataType === '2' || datas[k].dataType === '3') { // 数字
              for (let j = 0; j < this.selectedFeatures[i].length; j++) {
                let feature = this.selectedFeatures[i][j]
                if (feature.hasOwnProperty('fieldNames')) {
                  let fieldNames = feature.fieldNames
                  let fieldValues = feature.fieldValues
                  for (let s = 0; s < fieldNames.length; s++) {
                    if (datas[k].column === fieldNames[s]) num += parseFloat((fieldValues[s] !== null && fieldValues[s] !== '') ? fieldValues[s] : 0)
                  }
                } else {
                  num += parseFloat((feature.properties[datas[k].column] !== null && feature.properties[datas[k].column] !== '') ? feature.properties[datas[k].column] : 0)
                }
              }
              if (datas[k].type === 'ave') num = num / this.selectedFeatures[i].length
              num = num.toFixed(3)
            }
          }
          datas[k].num = num
        }
      }
      this.summaryResult = datas
      this.num += 1
      this.showSummary = true
    },
    // 点击数据列表的tab切换
    tabClick (tab) {
      if (this.isSectionShow && tab.index === '0') {
      } else {
        for (let i = 0; i < this.filterColumns.length; i++) {
          this.filterColumns[i] = []
        }
        for (let i = 0; i < this.summaryColumns.length; i++) {
          this.summaryColumns[i] = []
        }
        this.activeCount = tab.index
        let temp = tab.name.split('|')
        let typeName = temp[0]
        let i = temp[1]
        this.pageCount = this.selectedCounts[i]
        if (this.pageFlag) {
          this.pageSize = this.baseProps['pageSize']
          this.pageSizes = this.defaultPageSizes
        } else {
          this.pageSize = this.pageCount
          this.pageSizes = [this.pageSize]
        }
        this.pageNum = 1
        this.layer_i = i
        this.clearFilter()
        this.clearTableFilter()
        this.tableCol = []
        this.tableCol.push({
          'prop': 'num',
          'label': '序号',
          'sortable': false,
          'filterable': false,
          'align': 'center',
          'width': 100
        })
        for (let h = 0; h < this.queryProps[typeName].columnList.length; h++) {
          let columnEName = (this.queryProps[typeName].columnList[h].columnEName).toUpperCase()
          let columnName = this.queryProps[typeName].columnList[h].columnName
          let isSort = this.queryProps[typeName].columnList[h].isSort
          let isFilter = this.queryProps[typeName].columnList[h].isFilter
          let isSummary = this.queryProps[typeName].columnList[h].isTotal
          let dataType = this.queryProps[typeName].columnList[h].columnDataType
          let columnDisplayType = this.queryProps[typeName].columnList[h].columnDisplayType
          let columnOptions = this.queryProps[typeName].columnList[h].columnOptions
          let width = 150
          if (columnName.length > 10) width += 50
          let sortable = false
          let filterable = false
          if (isSort === '1') sortable = true
          if (isFilter === '1') {
            filterable = true
            this.filterColumns[i].push({
              'value': h + 1,
              'label': columnName,
              'eLabel': columnEName,
              'dataType': dataType,
              'columnDisplayType': columnDisplayType,
              'columnOptions': columnOptions
            })
            if (columnName.length > 8) width += 20
          }
          if (isSummary === '1') {
            filterable = true
            this.summaryColumns[i].push({
              'value': h + 1,
              'label': columnName,
              'eLabel': columnEName,
              'dataType': dataType,
              'columnDisplayType': columnDisplayType,
              'columnOptions': columnOptions
            })
            if (columnName.length > 8) width += 20
          }
          let align = 'left'
          if (dataType === '1' || dataType === '4') { // 文本
            align = 'left'
          } else if (dataType === '2' || dataType === '3') { // 数字
            if (columnDisplayType === '1') align = 'left' // 字典
            else align = 'right'
          }
          this.tableCol.push({
            'prop': columnEName,
            'label': columnName,
            'sortable': sortable,
            'filterable': filterable,
            'align': align,
            'width': width
          })
        }
        this.$emit('doDrawChangeResults', this.selectedFeatures[i], i)
      }
    },
    // 点击数据列表的行，切换右侧的信息详情
    rowClick (row) {
      let id = row.typeName.toString() + '|' + row.i.toString() + '|' + row.j.toString()
      this.$emit('drawDetails', this.selectedFeatures[row.i][row.j], id)
    },
    // 显示数据列表
    showResults (isPageResult, isPage, oldCount) { // isPageResult 标识是否分页的结果
      this.tableData = []
      let nodes = []
      let edges = []
      let count = 0
      if (oldCount === undefined) oldCount = 0
      for (let i = 0; i < this.selectedFeatures.length; i++) {
        if (this.selectedFeatures[i].length > 0) {
          let datas = []
          this.typeName = this.selectedLayerNames[i]
          for (let j = 0; j < this.selectedFeatures[i].length; j++) {
            let feature = this.selectedFeatures[i][j]
            let temp = {}
            temp['num'] = j + 1
            for (let h = 0; h < this.queryProps[this.typeName].columnList.length; h++) {
              let columnEName = (this.queryProps[this.typeName].columnList[h].columnEName).toUpperCase()
              let columnDisplayType = this.queryProps[this.typeName].columnList[h].columnDisplayType
              let columnOptions = this.queryProps[this.typeName].columnList[h].columnOptions
              let value
              if (feature.hasOwnProperty('fieldNames')) {
                let fieldNames = feature.fieldNames
                let fieldValues = feature.fieldValues
                for (let s = 0; s < fieldNames.length; s++) {
                  if (columnEName === fieldNames[s])value = fieldValues[s]
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
              temp[columnEName] = value
            }
            temp['typeName'] = this.typeName
            temp['i'] = i
            temp['j'] = j
            datas.push(temp)
            if (this.isSectionShow) { // 显示断面图
              if (feature.geometry.type === 'Point') {
                nodes.push({
                  'id': feature.properties['SMID'],
                  'alt_top': feature.properties['MANHOLE_AL'],
                  'manhole_name': feature.properties['MANHOLE_NA'] + '(' + feature.properties['MANHOLE_BR'] + '-' + feature.properties['MANHOLE_ER'] + ')',
                  'manhole_id': feature.properties['MANHOLE_ID'],
                  'alt_bottom': (parseFloat(feature.properties['MANHOLE_AL']) - parseFloat(feature.properties['MANHOLE_DE'])).toFixed(2),
                  'pipe': feature.properties['MANHOLE_LE']
                })
              } else if (feature.geometry.type === 'LineString') {
                edges.push({
                  'id': feature.properties['SMID'],
                  'alt_begin': parseFloat(feature.properties['DRAI_PI_12']).toFixed(2),
                  'alt_end': parseFloat(feature.properties['DRAI_PI_13']).toFixed(2),
                  'id_begin': feature.properties['B_MANHOLE_'],
                  'id_end': feature.properties['E_MANHOLE_'],
                  'length': feature.properties['DRAI_PIP_8'],
                  'pipe': feature.properties['DRAI_PIP_6']
                })
              }
            }
          }
          this.tableData.push({
            'label': this.queryProps[this.typeName].label + '(' + this.selectedCounts[i] + ')',
            'name': this.typeName + '|' + i.toString(),
            'data': datas
          })
          if (!isPageResult) { // 初始化列名
            if (count === oldCount) {
              this.pageCount = this.selectedCounts[i]
              if (isPage) {
                this.pageSize = this.baseProps['pageSize']
                this.pageSizes = this.defaultPageSizes
              } else {
                this.pageSize = this.pageCount
                this.pageSizes = [this.pageSize]
              }
              this.pageFlag = isPage
              this.layer_i = i
              this.tableCol = []

              this.tableCol.push({
                'prop': 'num',
                'label': '序号',
                'sortable': false,
                'filterable': false,
                'align': 'center',
                'width': 100
              })
              this.filterColumns[i] = []
              this.summaryColumns[i] = []
              for (let h = 0; h < this.queryProps[this.typeName].columnList.length; h++) {
                let columnEName = (this.queryProps[this.typeName].columnList[h].columnEName).toUpperCase()
                let columnName = this.queryProps[this.typeName].columnList[h].columnName
                let isSort = this.queryProps[this.typeName].columnList[h].isSort
                let isFilter = this.queryProps[this.typeName].columnList[h].isFilter
                let isSummary = this.queryProps[this.typeName].columnList[h].isTotal
                let dataType = this.queryProps[this.typeName].columnList[h].columnDataType
                let columnDisplayType = this.queryProps[this.typeName].columnList[h].columnDisplayType
                let columnOptions = this.queryProps[this.typeName].columnList[h].columnOptions
                let sortable = false
                let filterable = false
                let width = 150
                if (columnName.length > 10) width += 50
                if (isSort === '1') sortable = true
                if (isFilter === '1') {
                  filterable = true
                  this.filterColumns[i].push({
                    'value': h + 1,
                    'label': columnName,
                    'eLabel': columnEName,
                    'dataType': dataType,
                    'columnDisplayType': columnDisplayType,
                    'columnOptions': columnOptions
                  })
                  if (columnName.length > 8) width += 20
                }
                if (isSummary === '1') {
                  filterable = true
                  this.summaryColumns[i].push({
                    'value': h + 1,
                    'label': columnName,
                    'eLabel': columnEName,
                    'dataType': dataType,
                    'columnDisplayType': columnDisplayType,
                    'columnOptions': columnOptions
                  })
                  if (columnName.length > 8) width += 20
                }
                let align = 'left'
                if (dataType === '1' || dataType === '4') { // 文本
                  align = 'left'
                } else if (dataType === '2' || dataType === '3') { // 数字
                  if (columnDisplayType === '1') align = 'left' // 字典
                  else align = 'right'
                }
                this.tableCol.push({
                  'prop': columnEName,
                  'label': columnName,
                  'sortable': sortable,
                  'filterable': filterable,
                  'align': align,
                  'width': width
                })
              }
            }
          }
          count++
        }
      }
      if (this.tableData.length > 0) {
        if (this.isSectionShow) { // 显示断面图
          this.activeName = '0'
          this.dataJson = {
            'startId': this.sectionStartId,
            'nodes': nodes,
            'edges': edges
          }
          // console.log(JSON.stringify(this.dataJson))
        } else {
          this.activeName = this.tableData[oldCount].name
          this.activeCount = oldCount
        }
      } else {
        this.$emit('openMessage', '暂无结果!', 'error')
        this.$emit('clearDataShow')
      }
    },
    showSectionDetails (manholeId) {
      if (manholeId !== '') {
        for (let i = 0; i < this.selectedFeatures.length; i++) {
          for (let j = 0; j < this.selectedFeatures[i].length; j++) {
            let feature = this.selectedFeatures[i][j]
            if (feature.properties.hasOwnProperty('MANHOLE_ID') && feature.properties['MANHOLE_ID'] === manholeId) {
              let id = this.selectedLayerNames[i] + '|' + i.toString() + '|' + j.toString()
              this.$emit('drawDetails', feature, id)
              break
            }
          }
        }
      }
    },
    unique (arr) {
      let result = []
      let hash = {}
      for (let i = 0, elem; (elem = arr[i]) != null; i++) {
        if (!hash[elem]) {
          result.push({
            text: elem,
            value: elem
          })
          hash[elem] = true
        }
      }
      return result
    },
    /** ********************筛选的方法**********************/
    // 点击事件
    filter (e, scope) {
      // console.log(e, scope)
      this.indexSelect = this.filterColumns[this.layer_i]
      this.indexSummary = this.summaryColumns[this.layer_i]
      this.filterState.clickXY = { x: e.pageX, y: e.pageY }
      this.filterState.index = scope.$index
      this.filterState.columnKey = scope.column.columnKey || scope.column.label
      this.filterState.show = true
      let j = 0
      for (let i = 0; i < this.indexSelect.length; i++) {
        if (this.indexSelect[i].value === this.filterState.index) {
          j++
        }
      }
      if (j > 0) this.addFilter(this.filterState.index)
      let k = 0
      for (let i = 0; i < this.indexSummary.length; i++) {
        if (this.indexSummary[i].value === this.filterState.index) {
          k++
        }
      }
      if (k > 0) {
        this.$refs.TableFilter.summaryDisabled = false
        if (j === 0) this.addSummary(this.filterState.index)
      }
      // console.log(this.$refs.filterTable)
    },
    toggleTableFilter (val) {
      if (this.filterState.show) this.$refs.TableFilter.toggle(val)
    },
    toggleFilter (val) {
      this.filterState.show = val
    },
    addFilter (index) {
      let filters = this.$refs.TableFilter.filterValue
      let flag = false
      for (let i = 0; i < filters.length; i++) {
        if (filters[i].index === index) {
          flag = true
          break
        }
      }
      if (!flag) {
        let selectable = false
        let selectArray = []
        let selectValue = []
        for (let i = 0; i < this.indexSelect.length; i++) {
          if (index === this.indexSelect[i].value) {
            let dataType = this.indexSelect[i].dataType
            if (dataType === '1' || (dataType === '2' && this.indexSelect[i].columnDisplayType === '1')) { // 文本和数据字典
              selectArray = [
                { value: 'like', label: '包含' },
                { value: 'notlike', label: '不包含' }
                // { value: 'startwith', label: '开始于' },
                // { value: 'endwith', label: '结束于' },
                // { value: 'isnull', label: '为空' },
                // { value: 'isnotnull', label: '不为空' }
              ]
            } else if (dataType === '2' || dataType === '3') { // 数字
              selectArray = [
                { value: '=', label: '=' },
                { value: '<>', label: '!=' },
                { value: '>', label: '>' },
                { value: '<', label: '<' }
              ]
            }
            if (this.indexSelect[i].columnDisplayType === '1') {
              selectable = true
              selectValue = this.indexSelect[i].columnOptions
            }
            const newObj = { index: index, select: selectArray[0].value, value: '', logic: '', selectable: selectable, selectArray: selectArray, selectValue: selectValue }
            this.$refs.TableFilter.filterValue.push(newObj)
            break
          }
        }
      }
    },
    addSummary (index) {
      let filters = this.$refs.TableFilter.summaryValue
      let flag = false
      for (let i = 0; i < filters.length; i++) {
        if (filters[i].index === index) {
          flag = true
          break
        }
      }
      if (!flag) {
        let summaryArray = []
        for (let i = 0; i < this.indexSummary.length; i++) {
          if (index === this.indexSummary[i].value) {
            let dataType = this.indexSummary[i].dataType
            if (dataType === '1' || (dataType === '2' && this.indexSummary[i].columnDisplayType === '1')) { // 文本和数据字典
              summaryArray = [
                { value: 'count', label: '总计' }
              ]
            } else if (dataType === '2' || dataType === '3') { // 数字
              summaryArray = [
                // { value: 'count', label: '总计' },
                { value: 'sum', label: '求和' },
                { value: 'ave', label: '平均值' }
              ]
            }
            const newObj = { index: index, value: summaryArray[0].value, summaryArray: summaryArray }
            this.$refs.TableFilter.summaryValue.push(newObj)
            break
          }
        }
      }
    },
    submit (data) {
      // console.log('submit: ', data)
      let condition = ''
      // let conditionAnd = []
      // let conditionOr = []
      let filterValue = data.filterValue // {index: 3, select: "=", value: "111", logic: ""}
      let indexSelect = data.indexSelect // {value: 3, label: "泵站小类", eLabel: "DRAI_PUM_2"}
      // 筛选
      for (let i = 0; i < filterValue.length; i++) {
        let column = ''
        let dataType = ''
        // let condition1 = {}
        for (let j = 0; j < indexSelect.length; j++) {
          if (filterValue[i].index === indexSelect[j].value) {
            column = indexSelect[j].eLabel
            dataType = indexSelect[j].dataType
          }
        }
        if (column !== '') {
          // if (this.pageFlag) { // 需要分页查询
          if (dataType === '1' || dataType === '4') { // 文本
            if (filterValue[i].select === '' || filterValue[i].select === '=') condition += column + ' = \'' + filterValue[i].value + '\''
            if (filterValue[i].select === '<>') condition += column + ' <> \'' + filterValue[i].value + '\''
            if (filterValue[i].select === '>') condition += column + ' > \'' + filterValue[i].value + '\''
            if (filterValue[i].select === '<') condition += column + ' < \'' + filterValue[i].value + '\''
          } else if (dataType === '2' || dataType === '3') { // 数字
            if (filterValue[i].select === '' || filterValue[i].select === '=') condition += column + ' = ' + filterValue[i].value
            if (filterValue[i].select === '<>') condition += column + ' <> ' + filterValue[i].value
            if (filterValue[i].select === '>') condition += column + ' > ' + filterValue[i].value
            if (filterValue[i].select === '<') condition += column + ' < ' + filterValue[i].value
          }
          if (filterValue[i].select === 'like') condition += column + ' like \'%' + filterValue[i].value + '%\''
          if (filterValue[i].select === 'notlike') condition += column + ' not like \'%' + filterValue[i].value + '%\''
          if (filterValue[i].select === 'startwith') condition += column + ' like \'' + filterValue[i].value + '%\''
          if (filterValue[i].select === 'endwith') condition += column + ' like \'%' + filterValue[i].value + '\''
          if (filterValue[i].select === 'isnull') condition += column + ' is null '
          if (filterValue[i].select === 'isnotnull') condition += column + 'is not null'
          if (i < filterValue.length - 1) {
            if (filterValue[i].logic === 'or') condition += ' or '
            if (filterValue[i].logic === 'and' || filterValue[i].logic === '') condition += ' and '
          }
          /**
          } else { // 不需要分页查询
            if (filterValue[i].select === '' || filterValue[i].select === '=') condition1[column] = { '==': filterValue[i].value + '' }
            if (filterValue[i].select === '<>') condition1[column] = { '!==': filterValue[i].value + '' }
            if (filterValue[i].select === '>') condition1[column] = { 'gt': filterValue[i].value + '' }
            if (filterValue[i].select === '<') condition1[column] = { 'lt': filterValue[i].value + '' }
            if (filterValue[i].select === 'like') condition1[column] = { 'like': filterValue[i].value + '' }
            if (filterValue[i].select === 'notlike') condition1[column] = { '!like': filterValue[i].value + '' }
            if (filterValue[i].select === 'startwith') condition1[column] = { 'left': filterValue[i].value + '' }
            if (filterValue[i].select === 'endwith') condition1[column] = { 'right': filterValue[i].value + '' }
            if (filterValue[i].select === 'isnull') condition1[column] = { 'isNull': true }
            if (filterValue[i].select === 'isnotnull') condition1[column] = { 'isNull': false }
            if (i === 0) {
              conditionAnd.push(condition1)
            } else {
              if (filterValue[i - 1].logic === 'or') conditionOr.push(condition1)
              if (filterValue[i - 1].logic === 'and' || filterValue[i - 1].logic === '') conditionAnd.push(condition1)
            }
          }
             **/
        }
      }
      if (this.pageFlag) { // 需要分页查询
        if (condition !== '') {
          this.tempAttributeFilter[this.layer_i] = ' and (' + condition + ')'
          this.doSQLCountQuery()
        }
      } else { // 不需要分页查询
        /**
        if (conditionOr.length > 0 || conditionAnd.length > 0) {
          this.doCountQuery(conditionOr, conditionAnd)
        }
        **/
        if (condition !== '') {
          this.tempAttributeFilter[this.layer_i] = ' and (' + condition + ')'
          if (this.geoType !== undefined && this.geoType !== '' && this.geoType === 'draw') this.doDrawQuery()
          if (this.geoType !== undefined && this.geoType !== '' && this.geoType === 'drawRectangle') this.doDrawRectangleQuery()
        }
      }
      /** **********************************计算******************************/
      let indexSummary = data.indexSummary
      let summaryValue = data.summaryValue
      let statDatas = []
      let columns = []
      for (let i = 0; i < summaryValue.length; i++) {
        let column = ''
        let dataType = ''
        for (let j = 0; j < indexSummary.length; j++) {
          if (summaryValue[i].index === indexSummary[j].value) {
            column = indexSummary[j].eLabel
            dataType = indexSummary[j].dataType
          }
        }
        if (column !== '') {
          columns.push(column)
          statDatas.push({
            'num': 0,
            'index': summaryValue[i].index,
            'column': column,
            'dataType': dataType,
            'type': summaryValue[i].value
          })
        }
      }
      if (statDatas.length > 0) this.doSummaryQuery(statDatas, columns)
    },
    clearFilter () {
      for (let i = 0; i < this.tempAttributeFilter.length; i++) {
        this.tempAttributeFilter[i] = ''
      }
      this.summaryResult = []
      this.showSummary = false
      if (this.pageFlag) { // 需要分页查询
        this.doSQLCountQuery()
      } else { // 不需要分页查询
        if (this.geoType !== undefined && this.geoType !== '' && this.geoType === 'draw') this.doDrawQuery()
        if (this.geoType !== undefined && this.geoType !== '' && this.geoType === 'drawRectangle') this.doDrawRectangleQuery()
      }
    },
    clearTableFilter () {
      this.$nextTick(() => {
        if (this.$refs.TableFilter) {
          this.$refs.TableFilter.filterValue = []
          this.$refs.TableFilter.summaryValue = []
        }
      })
    },
    getSummaries (param) {
      const columns = param.columns
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '统计'
          return
        }
        sums[index] = '-'
        for (let i = 0; i < this.summaryResult.length; i++) {
          if (column.property === this.summaryResult[i].column) {
            if (this.summaryResult[i].type === 'count') sums[index] = '总计:' + this.summaryResult[i].num
            if (this.summaryResult[i].type === 'sum') sums[index] = '求和:' + this.summaryResult[i].num
            if (this.summaryResult[i].type === 'ave') sums[index] = '平均值:' + this.summaryResult[i].num
          }
        }
      })
      return sums
    },
    outExcel () {
      if (this.isSectionShow) this.exportCount = this.activeCount - 1
      else this.exportCount = this.activeCount
      if (this.exportCount < 0) this.exportCount = 0
      // console.log(this.exportCount, this.selectedFeatures)
      if (this.selectedCounts[this.exportCount] <= 5000) {
        this.$confirm('此操作将导出excel文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          require.ensure([], () => {
            this.$emit('changeLoading', true)
            if (this.pageFlag) { // 分页：根据条件查询详情列表
              this.exportBySql()
            } else {
              if (this.geoType !== undefined) { // 空间查询，不分页：根据IDS查询详情列表
                this.exportByIds()
              } else { // 断面、追踪分析，不用查询
                this.export2Excel(this.selectedFeatures[this.exportCount])
              }
            }
          })
        }).catch(() => {
        })
      } else {
        this.$emit('openMessage', '数据量太大，请筛选后再导出!', 'error')
      }
    },
    export2Excel (features) {
      this.$emit('changeLoading', false)
      let typeName = this.selectedLayerNames[this.exportCount]
      const { export_json_to_excel } = require('../../excel/Export2Excel')
      let tHeader = [] // 导出的表头名
      let datas = []
      for (let j = 0; j < features.length; j++) {
        let data = []
        let feature = features[j]
        for (let h = 0; h < this.queryProps[typeName].tabInfoList.length; h++) {
          let tabFields = this.queryProps[typeName].tabInfoList[h].tabFields
          for (let l = 0; l < tabFields.length; l++) {
            let columnName = tabFields[l].columnName
            let columnEName = (tabFields[l].columnEName).toUpperCase()
            let columnDisplayType = tabFields[l].columnDisplayType
            // let dataType = tabFields[l].columnDataType // "1,2,3,4,5  文本，数字（整型),数字（双精度）,时间, 文件路径"
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
            data.push(value)
            if (j === 0) {
              tHeader.push(columnName)
            }
          }
        }
        datas.push(data)
      }
      export_json_to_excel(tHeader, datas, `${this.queryProps[typeName].label}`)
    },
    exportBySql () {
      let typeName = this.selectedLayerNames[this.exportCount]
      let fields = []
      for (let h = 0; h < this.queryProps[typeName].tabInfoList.length; h++) {
        let tabFields = this.queryProps[typeName].tabInfoList[h].tabFields
        for (let l = 0; l < tabFields.length; l++) {
          let columnEName = (tabFields[l].columnEName).toUpperCase()
          fields.push(columnEName)
        }
      }
      let queryObj = {
        'getFeatureMode': 'SQL',
        'datasetNames': [this.queryProps[typeName].datasetNames],
        'hasGeometry': false,
        'queryParameter': {
          attributeFilter: this.attributeFilter[this.exportCount] + this.tempAttributeFilter[this.exportCount],
          orderBy: this.queryProps[typeName].sqlOrders,
          fields: fields
        }
      }
      this.$http.post(this.baseProps['url_data'] + '/featureResults.rjson?returnContent=true&toIndex=-1',
        JSON.stringify(queryObj)).then((res) => {
        let features = res.data.features
        if (features) {
          this.export2Excel(features)
        }
      })
    },
    exportByIds () {
      let typeName = this.selectedLayerNames[this.exportCount]
      let fields = []
      for (let h = 0; h < this.queryProps[typeName].tabInfoList.length; h++) {
        let tabFields = this.queryProps[typeName].tabInfoList[h].tabFields
        for (let l = 0; l < tabFields.length; l++) {
          let columnEName = (tabFields[l].columnEName).toUpperCase()
          fields.push(columnEName)
        }
      }
      let features = this.selectedFeatures[this.exportCount]
      let ids = []
      for (let i = 0; i < features.length; i++) {
        let id
        if (features[i].hasOwnProperty('fieldNames')) {
          id = features[i].ID
        } else {
          id = features[i].id
        }
        ids.push(id)
      }
      let queryObj = {
        'getFeatureMode': 'ID',
        'datasetNames': [this.queryProps[typeName].datasetNames],
        'hasGeometry': false,
        'ids': ids,
        'queryParameter': {
          attributeFilter: this.attributeFilter[this.exportCount] + this.tempAttributeFilter[this.exportCount],
          orderBy: this.queryProps[typeName].sqlOrders,
          fields: fields
        }
      }
      this.$http.post(this.baseProps['url_data'] + '/featureResults.rjson?returnContent=true&toIndex=-1',
        JSON.stringify(queryObj)).then((res) => {
        let features = res.data.features
        if (features) {
          this.export2Excel(features)
        }
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
</style>
