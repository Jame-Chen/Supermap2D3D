<template>
  <div class="dataTable" v-if="state">
      <div class="table-context">
        <!-- 右侧按钮 -->
        <div class="right">
          <el-button type="text" size="small" @click="toggleOnlyState(false)" >
            <svg-icon icon-class="mini"/>
          </el-button>
          <el-button type="text" size="small" @click="toMaximize()" >
            <svg-icon v-if="!max" icon-class="iconMax"/>
            <svg-icon v-else icon-class="iconMin"/>
          </el-button>
          <el-button v-if="!max" type="text" size="small" @click="toggle(false)"><svg-icon icon-class="iconClose"/></el-button>
        </div>
        <el-tabs ref="tabs" v-model="activeName">
          <el-tab-pane :label="pdf.label" name="0">
            <iframe :src="pdf.src" frameborder="0" width="100%" :height="height" ></iframe>
          </el-tab-pane>
        </el-tabs>
      </div>
  </div>
</template>
<script>
import baseMixin from './baseMixin'
export default {
  name: 'PdfIframe',
  mixins: [ baseMixin ],
  components: {
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
    pdf: {
      required: true,
      type: Object
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
      name: 'PdfIframe',
      max: this.maximize,
      activeName: '0'
      // src: '/pdfjs-2.1.266-dist/web/viewer.html'
    }
  },
  methods: {
    toMaximize (val) {
      const value = this.formatStringToBoolean(val)
      if (value === undefined) this.max = !this.max
      else this.max = value
      this.$emit('maximize', { name: this.name, value: this.max })
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
