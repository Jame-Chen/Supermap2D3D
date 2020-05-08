<template>
  <div v-show="state"
       class="screen"
       :style="style">
    <div class="filterCont">
      <div class="fiex">
        <div class="mapPopTitle1">
          筛选与统计:
          <div class="floatR">
            <!-- <el-button type="text" size="small" @click="addFilter"><svg-icon class="color-svg" icon-class="add" /></el-button> -->
            <el-button type="text"
                       size="small"
                       @click="toggle(false)">
              <svg-icon class="color-svg"
                        icon-class="iconClose" />
            </el-button>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="header">
          数据筛选：
          <el-button type="text"
                     size="small"
                     @click="addFilter"
                     class="floatR">
            <svg-icon class="color2-svg"
                      icon-class="add" />
          </el-button>
        </div>
        <div class="filterForm"
             v-for="(value, index) in filterValue"
             :key="`filter-${index}`">
          <el-select v-model="value.index"
                     size="mini"
                     placeholder="请选择"
                     style="width: 140px;margin-right:6px;"
                     @change="changeFilter(index, value.index)">
            <!-- // 本地模拟使用 indexSelect, 实际使用的是 indexSelect 传值 -->
            <el-option v-for="item in indexSelect"
                       :key="item.label"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>

          <el-select v-model="value.select"
                     size="mini"
                     placeholder="请选择"
                     style="width: 90px;margin-right:6px;">
            <el-option v-for="item in value.selectArray"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>

          <el-input v-model="value.value"
                    size="mini"
                    placeholder="请输入内容"
                    v-if="!value.selectable"
                    style="width: 180px;margin-right:6px;"></el-input>

          <el-select v-model="value.value"
                     size="mini"
                     placeholder="请选择"
                     v-if="value.selectable"
                     style="width: 180px;margin-right:6px;">
            <el-option v-for="item in value.selectValue"
                       :key="item.optionKey"
                       :label="item.optionValue"
                       :value="item.optionKey">
            </el-option>
          </el-select>

          <el-select v-model="value.logic"
                     size="mini"
                     :disabled="filterValue.length === (index + 1)"
                     placeholder="请选择"
                     style="width: 60px;">
            <el-option v-for="item in filterArray.logic"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
          <el-button type="text"
                     size="small"
                     @click="delFilter(index)"
                     class="floatR">
            <svg-icon class="color2-svg"
                      icon-class="del" />
          </el-button>
        </div>
        <div class="header">
          数据统计：
          <el-button :disabled="summaryValue.length >= indexSummary.length"
                     type="text"
                     size="small"
                     @click="addSummary"
                     class="floatR">
            <svg-icon class="color2-svg"
                      icon-class="add" />
          </el-button>
        </div>
        <div class="filterForm"
             v-for="(value, index) in summaryValue"
             :key="`summary-${index}`">
          <el-select v-model="value.index"
                     size="mini"
                     placeholder="请选择"
                     style="width: 140px;margin-right:6px;"
                     @change="changeSummary(index, value.index)">
            <!-- // 本地模拟使用 indexSelect, 实际使用的是 indexSelect 传值 -->
            <el-option v-for="item in indexSummary"
                       :key="item.label"
                       :label="item.label"
                       :value="item.value"
                       :disabled="disableFn(item, summaryValue)">
            </el-option>
          </el-select>
          <el-select v-model="value.value"
                     size="mini"
                     placeholder="请选择"
                     style="width: 240px;">
            <el-option v-for="item in value.summaryArray"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
          <el-button type="text"
                     size="small"
                     @click="delSummary(index)"
                     class="floatR">
            <svg-icon class="color2-svg"
                      icon-class="del" />
          </el-button>
        </div>
        <div class="pop-btn">
          <el-button size="mini"
                     :disabled="dataIsNull"
                     type="primary"
                     @click="submitTo"
                     class="btn_ok"
                     style="min-width: 104px;">{{ dataIsNull ? '选项不能为空' : '确定'}}</el-button>
          <el-button size="mini"
                     @click="clearFilter"
                     class="btn_cancle">清空</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import { type } from 'os'
export default {
  name: 'TableFilter',
  props: {
    show: { type: Boolean, default: false },
    clickXY: { type: Object, required: true },
    index: { type: Number, required: true },
    columnKey: { default: undefined },
    padding: {
      type: Array,
      default() {
        return []
      }
    },
    // 本地模拟使用 indexSelect, 实际使用的是 indexSelect 传值
    indexSelect: {
      type: Array,
      required: true
    },
    indexSummary: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      style: '',
      state: this.show,
      // 本地模拟使用 indexSelect, 实际使用的是 indexSelect 传值
      indexArray: [
        { value: 3, label: '泵站小类' },
        { value: 6, label: '建设年代' }
      ],
      filterArray: {
        logic: [
          { value: 'and', label: '且' },
          { value: 'or', label: '或' }
        ]
      },
      filterValue: [], // { index: this.index, select: null, value: null, logic: null }
      summaryValue: [], // { index: this.index, value: null }
      valueIsNull: null
    }
  },
  methods: {
    // 打开和关闭
    toggle(val = undefined) {
      if (val !== undefined && typeof val === 'boolean') this.state = val
      else this.state = !this.state
      this.$emit('toggle', this.state)
    },
    // 增加新选项，实际上是push新内容 到filterValue
    addFilter() {
      let selectable = false
      let selectArray = []
      let selectValue = []
      let index = ''
      for (let i = 0; i < this.indexSelect.length; i++) {
        if (this.index === this.indexSelect[i].value) {
          index = this.index
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
          break
        }
      }
      let newObj = { index: index, select: selectArray[0].value, value: '', logic: '', selectable: selectable, selectArray: selectArray, selectValue: selectValue }
      this.filterValue.push(newObj)
    },
    changeFilter(i, index) {
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
          break
        }
      }
      this.filterValue[i].select = selectArray[0].value
      this.filterValue[i].selectable = selectable
      this.filterValue[i].selectArray = selectArray
      this.filterValue[i].selectValue = selectValue
    },
    // 删除选项，实际上到filterValue 删除index
    delFilter(index) {
      this.filterValue.splice(index, 1)
    },
    // 增加新选项，实际上是push新内容 到summaryValue
    addSummary() {
      let summaryArray = []
      let index = ''
      for (let i = 0; i < this.indexSummary.length; i++) {
        if (this.index === this.indexSummary[i].value) {
          index = this.index
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
          break
        }
      }
      const newObj = { index: index, value: summaryArray[0].value, summaryArray: summaryArray }
      this.summaryValue.push(newObj)
    },
    changeSummary(i, index) {
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
          break
        }
      }
      this.summaryValue[i].value = summaryArray[0].value
      this.summaryValue[i].summaryArray = summaryArray
    },
    // 删除选项，实际上到summaryValue 删除index
    delSummary(index) {
      this.summaryValue.splice(index, 1)
    },
    // 清空选项
    clearFilter() {
      this.filterValue = []
      this.summaryValue = []
      this.$emit('clearFilter')
    },
    // 提交按钮
    submitTo() {
      // 清理数组的其他格式
      const data = {
        index: this.index,
        columnKey: this.columnKey
      }
      let filterData = this.filtedValue(JSON.parse(JSON.stringify(this.filterValue)))
      let summaryData = this.summaryedValue(JSON.parse(JSON.stringify(this.summaryValue)))
      let indexSelect = JSON.parse(JSON.stringify(this.indexSelect)) // 本地模拟使用 this.indexSelect, 实际使用的是 indexSelect 传值
      let indexSummary = JSON.parse(JSON.stringify(this.indexSummary))
      data.filterValue = filterData
      data.summaryValue = summaryData
      data.indexSelect = indexSelect
      data.indexSummary = indexSummary
      // console.log(data)
      this.$emit('submit', data)
      this.toggle(false)
    },
    // num to px
    numToPx(arg, name) {
      return name + ':' + arg + 'px;'
    },
    // 计算坐标 => style clickXY
    setStyle() {
      const WP2 = 280
      const padTop = this.padding[0] || 26
      const padRight = this.padding[1] || 6
      const padBottom = this.padding[2] || 26
      const padLeft = this.padding[3] || 6
      const pageX = this.mixinWidth
      const pageY = this.mixinHeight
      const left = WP2 + padLeft
      const right = pageX - WP2 - padRight
      let x = (this.clickXY.x < left) ? left : (this.clickXY.x > right) ? right : this.clickXY.x
      x = this.numToPx(x, 'left')
      let y = this.clickXY.y
      if (y <= pageY / 2) {
        y = (y < padTop) ? padTop : y
        y = this.numToPx(y, 'top')
      } else {
        y = pageY - y
        y = (y < padBottom) ? padBottom : (y + padBottom - 13)
        y = this.numToPx(y, 'bottom')
      }
      this.style = x + y
    },
    // 判定对象的 内容不为空
    isNull(obj) {
      let val = true
      let newObj = JSON.parse(JSON.stringify(obj))
      // 删除 index属性
      delete newObj.index
      // 判定 其他属性全部为空 是否
      for (let i in newObj) {
        if (newObj.hasOwnProperty(i)) {
          if (newObj[i] !== null && newObj[i] !== '') { val = false; break }
        }
      }
      return val
    },
    // 将 数据filterValue 为空的清空  { select: '', value: '', logic: '' }
    filtedValue(Arr) {
      let newArr = []
      if (Arr.length !== 0) {
        newArr = Arr.filter(item => {
          return (item['select'] !== null && item['select'] !== '') || (item['value'] !== null && item['value'] !== '') || (item['logic'] !== null && item['logic'] !== '')
        })
      }
      return newArr
    },
    // 将 数据summaryedValue 为空的清空  { value: ''}
    summaryedValue(Arr) {
      let newArr = []
      if (Arr.length !== 0) {
        newArr = Arr.filter(item => {
          return item['value'] !== null && item['value'] !== ''
        })
      }
      return newArr
    },
    disableFn(item, Arr) {
      for (let i in Arr) {
        if (item.value === Arr[i].index) return true
      }
      return false
    }
  },
  computed: {
    ...mapState({
      mixinWidth: state => state.app.widthAppMain,
      mixinHeight: state => state.app.heightAppMain
    }),
    // 计算 页面宽高变化
    widthOrHeight() {
      return [this.mixinWidth, this.mixinHeight]
    },
    // 计算 数据为空
    dataIsNull() {
      const a = this.summaryValue.length === 0
      const b = this.filterValue.length === 0
      let c = true
      if (!b) {
        for (let i = 0; i < this.filterValue.length; i++) {
          c = this.isNull(this.filterValue[i])
          if (!c) break
        }
      }
      let d = true
      if (!a) {
        for (let i = 0; i < this.summaryValue.length; i++) {
          d = this.isNull(this.summaryValue[i])
          if (!d) break
        }
      }
      return (a || d) && (b || c)
    }
  },
  watch: {
    // 监听 显示和影藏
    show(newVal, oldVal) {
      if (typeof newVal === 'boolean') this.state = newVal
      if (newVal && !oldVal) this.setStyle()
    },
    // 监听 页面宽高变化
    widthOrHeight() {
      let that = this
      setTimeout(function () { that.setStyle() }, 400)
    },
    // 监听 点击其他DOM
    index(newVal, oldVal) {
      // this.clearFilter()
      this.setStyle()
    }
  }
}
</script>

<style lang="scss" scoped>
$height: 30px;
$activeColor: #0080ff;
.screen {
  width: 560px;
  max-height: 210px;
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  margin-left: -280px;
  margin-bottom: 105px;
  background-color: #fff;
  border: 1px solid #0c1230;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  padding-bottom: 15px;
  z-index: 1000;
}
.filterCont {
  border: 1px solid #fff;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}
.content {
  flex-grow: 1;
  box-sizing: border-box;
  padding-top: 32px;
  overflow-x: hidden;
  overflow-y: scroll;
  max-height: 178px;
}
.fiex {
  flex-grow: 0;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 32px;
  z-index: 10;
}
.filterForm {
  padding: 0 10px;
  box-sizing: border-box;
  position: relative;
  margin-top: 5px;
}
.floatR {
  position: absolute;
  right: 15px;
  top: -3px;
}
.screenCont {
  position: relative;
}
.mapPopTitle1 {
  background: url("../../assets/images/contentTitleR.png") repeat-y;
  background-size: 100%;
  background-position: right center;
  color: #fff;
  line-height: 32px;
  height: 32px;
  padding: 0 8px;
  position: relative;
  font-size: 15px;
}
.header {
  margin-top: 8px;
  border-bottom: 1px solid #ccc;
  color: #000;
  font-size: 15px;
  height: 32px;
  line-height: 32px;
  font-weight: bolder;
  padding: 0 10px;
  position: relative;
  &:first-child {
    margin-top: 0;
  }
}
.screenForm {
  padding: 8px 0;
}
.color-svg {
  color: #fff;
  font-size: 14px;
}
.color2-svg {
  color: $activeColor;
  font-size: 14px;
}
.pop-btn {
  padding-top: 15px;
  padding-left: 157px;
  text-align: left;
  /deep/ .el-button + .el-button {
    margin-left: 5px;
  }
}
.blue {
  color: $activeColor;
  /deep/ span {
    color: $activeColor;
  }
}
.btn_ok {
  height: $height;
}
.btn_cancle {
  width: 70px;
  height: $height;
}
/deep/ .el-button--mini.btn_ok span,
/deep/ .el-button--mini.btn_cancle span {
  font-size: 15px;
}
/deep/ .el-button--primary {
  background: $activeColor;
  border-color: $activeColor;
}
/deep/ .el-button--primary.is-disabled,
/deep/ .el-button--primary.is-disabled:hover {
  background: rgba($activeColor, 0.3);
  border-color: rgba($activeColor, 0.3);
}
.floatR .is-disabled,
.floatR.is-disabled {
  color: #999;
  .color2-svg,
  .color-svg {
    color: #999;
  }
}
</style>
