<template>
  <el-container v-if="state" class="border">
    <el-main class="inborder">
      <content-title icon="tool-dayin" title="打印截图" @toggle="toggle" @toMini="toMini"  />
      <div class="padding-10">
        <el-form ref="printMapForm" :model="printMapForm" label-width="82px" size="mini">
          <el-form-item label="标题名称">
            <el-input size="small" v-model="printMapForm.title" placeholder="请输入标题" clearable/>
          </el-form-item>
          <el-form-item label="控件选择">
            <el-checkbox-group v-model="printMapForm.control" @change="change()">
              <el-checkbox label="scale" name="control">标尺</el-checkbox>
              <el-checkbox label="compass" name="control">指北针</el-checkbox>
              <el-checkbox label="legend" name="control">图例</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item class="btn">
            <el-button type="primary" :disabled="disabled"  size="mini" class="btn_ok"  @click="canvas('print')">打印</el-button>
            <el-button type="primary" :disabled="disabled" size="mini" class="btn_ok"  @click="canvas('create')">截图</el-button>
            <!--<el-button size="mini" class="btn_cancle">取消</el-button>-->
          </el-form-item>
        </el-form>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import baseMixin from './baseMixin'
export default {
  name: 'MapPrint',
  mixins: [baseMixin],
  components: {},
  props: {
  },
  data () {
    return {
      name: 'MapPrint',
      activeName: 'printMap',
      printMapForm: {
        title: '',
        control: ['scale']
      }
    }
  },
  computed: {
    disabled () {
      if (this.printMapForm.title !== '') return false
      else return true
    }
  },
  mounted () {
  },
  methods: {
    canvas (type) {
      this.$emit('canvas', type, this.printMapForm.title)
    },
    change () {
      if (this.printMapForm.control.indexOf('scale') > -1) this.$emit('changeControl', 'scale', true)
      else this.$emit('changeControl', 'scale', false)
      if (this.printMapForm.control.indexOf('compass') > -1) this.$emit('changeControl', 'compass', true)
      else this.$emit('changeControl', 'compass', false)
      if (this.printMapForm.control.indexOf('legend') > -1) this.$emit('changeControl', 'legend', true)
      else this.$emit('changeControl', 'legend', false)
    },
    clear () {
      this.printMapForm.title = ''
      this.printMapForm.control = ['scale']
      this.change()
    },
    getNowFormatDate () {
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
    }
  }
}
</script>

<style lang="scss" scoped>
$red: #ff6619;
$height: 30px;
$activeColor:#0080ff;
.border{
  box-sizing: border-box;
  // border: 1px solid #2e5c76;
  .inborder{
    border: 1px solid #202340;
    position: relative;
  }
}
.el-form{ padding-right: 10px;padding-left: 4px; box-sizing: border-box; margin-bottom: 15px;}
.padding-10{padding: 10px 10px; box-sizing: border-box;}
/deep/ .el-form-item{height: $height;margin-bottom: 5px;}
/deep/ .el-form-item__label{line-height: $height;color: #000;font-weight: normal;}
/deep/ .el-form-item__error{ padding-top: 0; margin-top: -2px;}
.btn{margin-top: 10px;height: $height;}
.btn_ok{ min-width: 104px; height: $height;background-color: $activeColor; border-color: $activeColor; }
.btn_cancle{ width: 70px;height: $height;}
.btn_cancle{ width: 54px;height: $height;font-size: 15px;}
.tip{
  color: $red;
  height: $height - 8;
  font-size: 13px;
  line-height: 2em;
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
