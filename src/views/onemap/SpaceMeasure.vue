<template>
  <el-container v-if="state" class="border">
    <el-main class="inborder">
      <content-title icon="tool-celiang" title="测量" @toggle="toggle" @toMini="toMini"  />
      <div class="padding-10">
      <el-form ref="spaceMeasureForm" label-width="80px" style="padding-top: 8px;">
        <el-radio-group v-model="control" @change="change()">
          <el-radio label="distance">测距</el-radio>
          <el-radio label="area">测面</el-radio>
          <el-radio label="height" v-if="type === '3d'">测高</el-radio>
        </el-radio-group>
      </el-form>
      </div>
      <div class="padding-10" v-show="activeName === 'distance'">
        <div class="tip" v-if="type !== '3d'">选择测距开始，在地图上单击点选择起点，双击结束</div>
        <div class="tip" v-if="type === '3d'">选择测距开始，在地图上单击点选择起点，右键结束</div>
        <el-form ref="spaceMeasureLengthForm" :model="spaceMeasureLengthForm" label-width="102px" size="mini">
          <el-form-item label="总长度(米)">
            <el-input v-model="spaceMeasureLengthForm.total" disabled />
          </el-form-item>
        </el-form>
      </div>
      <div class="padding-10" v-show="activeName === 'area'">
        <div class="tip" v-if="type !== '3d'">选择测面开始，在地图上单击点选择起点，双击结束</div>
        <div class="tip" v-if="type === '3d'">选择测面开始，在地图上单击点选择起点，右键点击结束</div>
        <el-form ref="spaceMeasureAreaForm" :model="spaceMeasureAreaForm" label-width="102px" size="mini">
          <el-form-item label="面积(平方米)">
            <el-input v-model="spaceMeasureAreaForm.area" disabled />
          </el-form-item>
        </el-form>
      </div>
      <div class="padding-10" v-show="activeName === 'height'">
        <div class="tip">选择测高开始，在地图上单击点选择起点，右键点击结束</div>
        <el-form ref="spaceSpaceMeasureHeightForm" :model="spaceSpaceMeasureHeightForm" label-width="122px" size="mini">
          <el-form-item label="空间距离(米)">
            <el-input v-model="spaceSpaceMeasureHeightForm.disLength" disabled />
          </el-form-item>
          <el-form-item label="垂直高度(平方米)">
            <el-input v-model="spaceSpaceMeasureHeightForm.vLength" disabled />
          </el-form-item>
          <el-form-item label="水平距离(平方米)">
            <el-input v-model="spaceSpaceMeasureHeightForm.hLength" disabled />
          </el-form-item>
        </el-form>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import baseMixin from './baseMixin'
export default {
  name: 'SpaceMeasure',
  mixins: [baseMixin],
  components: {},
  props: {
    type: {
      typeof: String,
      required: true
    }
  },
  data () {
    return {
      name: 'SpaceMeasure',
      activeName: '',
      control: '',
      spaceMeasureLengthForm: {
        total: '',
        last: ''
      },
      spaceMeasureAreaForm: {
        length: '',
        area: ''
      },
      spaceSpaceMeasureHeightForm: {
        disLength: '',
        vLength: '',
        hLength: ''
      }
    }
  },
  mounted () {
    // 设置测量数值
    // this.spaceMeasureLengthForm.last = '125689px'
  },
  methods: {
    change () {
      // console.log(this.control)
      this.activeName = this.control
      if (this.control === 'distance') this.spaceMeasureLengthForm.total = ''
      else if (this.control === 'area') this.spaceMeasureAreaForm.area = ''
      else if (this.control === 'height') {
        this.spaceSpaceMeasureHeightForm.disLength = ''
        this.spaceSpaceMeasureHeightForm.vLength = ''
        this.spaceSpaceMeasureHeightForm.hLength = ''
      }
      this.$emit('startMeasure', this.control)
    }
  }
}
</script>

<style lang="scss" scoped>
$height: 30px;
$activeColor:#0080ff;
$red: #ff6619;
.border{
  box-sizing: border-box;
  // border: 1px solid #2e5c76;
  .inborder{
    border: 1px solid #202340;
    position: relative;
  }
}

.el-form{ padding-right: 10px;padding-left: 4px; box-sizing: border-box; margin-bottom: 15px;}
/deep/ .el-form-item{height: $height;margin-bottom: 5px;}
/deep/ .el-form-item__label{line-height: $height;color: #000;font-weight: normal;}
/deep/ .el-form-item__error{ padding-top: 0; margin-top: -2px;}
.btn{margin-top: 15px;height: $height;}
.btn_ok{ min-width: 104px; height: $height;background-color: $activeColor; border-color: $activeColor; }
.btn_cancle{ width: 70px;height: $height;}
.padding-10{padding: 0 10px; box-sizing: border-box;}
.tip{
  color: $red;
  height: $height - 8;
  font-size: 13px;
  line-height: 1em;
}
/deep/ .el-tabs__item{
  height: $height;
  line-height: $height;
}
/deep/ .el-tabs__header{
  margin: 0 0 11px;
}
/deep/ .el-button--mini.btn_ok span, /deep/ .el-button--mini.btn_cancle span{font-size: 15px;}
/deep/ .el-radio,/deep/ .el-input__inner{color:#000;}
/deep/.el-tabs__item.is-active{ border-bottom: none; background-color: #2562bd; color: #fff;}
/deep/.el-tabs--card>.el-tabs__header .el-tabs__nav{ border-right-width: 1px;border-top-width: 0;border-left-width: 0;border-bottom-width: 0;}
</style>
