<template>
  <el-container v-if="state" class="border">
    <el-main class="inborder">
      <content-title icon="tool-celiang" title="编辑工具" @toggle="toggle" @toMini="toMini"  />
      <div class="padding-10" style="min-height:100px;">
        <el-row>
          <div v-for="(item, index) in data" :key="index" class="item-btn" @click="clickBtn(item.btn)">
            <svg-icon v-if="index===3||index===4" :icon-class="item.icon" class="svg" />
            <i v-else class="svg" :class="item.icon" />
            <br>
            {{item.label}}
          </div>
        </el-row>
        <el-row>
        <div class="tip">
          <span v-if="steps === '1'">先在地图上绘制图形，再编辑属性。</span>
          <span v-if="steps === '2'">如果修改图形，请重新绘制，保存覆盖原图形。</span>
        </div>
        </el-row>
        <el-row style="text-align: center;">
          <el-button type="primary" :disabled="disabled" size="mini" class="btn_ok" style="width: 140px;margin: 12px 0;"  @click="onEdit()">保存</el-button>
          <el-button size="mini" class="btn_cancle" @click="restart()">取消</el-button>
        </el-row>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import baseMixin from './baseMixin'
export default {
  name: 'MapEdit',
  mixins: [baseMixin],
  props: {
    type: {
      typeof: String,
      required: true
    }
  },
  data () {
    return {
      name: 'MapEdit',
      disabled: true,
      data: [
        { label: '新增', icon: 'el-icon-document-add', btn: 'add' },
        { label: '修改', icon: 'el-icon-edit', btn: 'update' },
        { label: '删除', icon: 'el-icon-delete', btn: 'delete' }
        // { label: '撤销', icon: 'el-icon-revoke', btn: 'revoke' },
        // { label: '重做', icon: 'el-icon-redo', btn: 'redo' }
      ],
      steps: '0'
    }
  },
  mounted () {
  },
  methods: {
    clickBtn (btn) {
      // console.log(btn)
      this.$emit('mapEditClick', btn)
    },
    restart () {
      this.$emit('mapEditClick', 'revoke')
    },
    onEdit () {
      // console.log('onEdit')
      this.steps = '0'
      this.$emit('onEdit')
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
  min-height: $height - 8;
  font-size: 13px;
  line-height: 1.2em;
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
.item-btn{
  margin: 6px 0;
  padding: 6px 0;
  height: 56px;
  width: 33%;
  font-size: 13px;
  line-height: 15px;
  text-align: center;
  display: inline-block;
  .svg{
    height: 20px;
    width: 20px;
    font-size: 20px;
    font-weight: bold;
    line-height: 20px;
    margin-bottom: 8px;
    color: $activeColor;
  }
  &:hover{
    background: $activeColor;
    color: #fff;
    border-radius: 3px;
    .svg{
      color: #fff;
    }
  }
}
</style>
