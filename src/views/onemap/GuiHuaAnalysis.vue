<template>
  <el-container v-if="state" class="border">
    <el-main class="inborder">
      <content-title icon="tool-fenxi" title="现状与规划对比达标率分析" @toggle="toggle" @toMini="toMini"  />
      <div class="padding-10">
        <el-form ref="GuiHuaAnalysisForm" :model="form" label-width="104px" style="padding-top: 8px;">
          <el-form-item label="现状数据">
            <el-select size="small" v-model="form.now" placeholder="请选择">
              <el-option
                v-for="item in searchArray.nows"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="规划数据">
            <el-select size="small" v-model="form.guihua" placeholder="请选择">
              <el-option
                v-for="item in searchArray.guihuas"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="btn">
            <el-button type="primary" size="mini" class="btn_ok" @click="analysis('compare')">前后对比</el-button>
            <el-button type="primary" size="mini" class="btn_ok" @click="analysis('change')">逐年变化</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import baseMixin from './baseMixin'
export default {
  name: 'GuiHuaAnalysis',
  mixins: [baseMixin],
  data () {
    return {
      name: 'GuiHuaAnalysis',
      searchArray: {
        nows: [{ label: '2019年', value: '5' },
          { label: '2018年', value: '4' },
          { label: '2017年', value: '3' },
          { label: '2016年', value: '2' },
          { label: '2015年', value: '1' },
          { label: '2014年', value: '0' }],
        guihuas: [{ label: '2013年防汛能力评估', value: '1' }]
      },
      form: {
        now: '5', // 目标图层
        guihua: '1' // 搜索输入框-模糊搜索
      }
    }
  },
  computed: {
  },
  methods: {
    analysis (state) {
      this.$emit('guiHuaAnalysis', state, this.form.now)
    }
  }
}
</script>

<style lang="scss" scoped>
.border{
  box-sizing: border-box;
  // border: 1px solid #2e5c76;
  .inborder{
    border: 1px solid #202340;
    position: relative;
  }
}
$height: 32px;
$activeColor:#0080ff;
$red: #ff6619;
.el-form{ padding-right: 10px;padding-left: 4px; box-sizing: border-box; margin-bottom: 19px;}
/deep/ .el-form-item{height: $height;margin-bottom: 5px;}
/deep/ .el-form-item__label{line-height: $height;color: #000;font-weight: normal;}
/deep/ .el-form-item__error{ padding-top: 0; margin-top: -2px;}
.btn{margin-top: 15px;height: $height;}
.btn_ok{ width: 104px; height: $height;background-color: $activeColor; border-color: $activeColor; }
.btn_cancle{ width: 70px;height: $height;}
/deep/ .el-radio,/deep/ .el-input__inner{color:#000;}
/deep/ .el-button--mini.btn_ok span, /deep/ .el-button--mini.btn_cancle span{font-size: 15px;}
.padding-10{padding: 10px 10px; box-sizing: border-box;}
.tip{
  color: $red;
  height: $height - 8;
  font-size: 13px;
  line-height: 1em;
}
</style>
