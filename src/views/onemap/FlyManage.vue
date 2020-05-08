<template>
  <el-container v-if="state" class="border">
    <el-main class="inborder">
      <content-title :icon="icon" :title="title" @toggle="toggle" @toMini="toMini" />
      <el-form label-width="80px">
        <el-form-item class="btn">
          <el-button type="primary" size="mini" class="btn_ok" @click="flyManage('play')" v-if="!isFlySelf">开始</el-button>
          <el-button type="primary" :disabled="disabled" size="mini" class="btn_ok" @click="flyManage('pause')" v-if="!isFlySelf">暂停</el-button>
          <el-button type="primary" :disabled="disabled" size="mini" class="btn_ok" @click="flyManage('stop')" v-if="!isFlySelf">结束</el-button>
          <el-button type="primary" size="mini" class="btn_ok" @click="flyManage('draw')" v-if="isFlySelf">绘制</el-button>
          <el-button type="primary" :disabled="disabled" size="mini" class="btn_ok" @click="flyManage('start')" v-if="isFlySelf">开始</el-button>
          <el-button size="mini" :disabled="disabled" class="btn_cancle" @click="flyManage('clear')" v-if="isFlySelf">清除</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
import baseMixin from './baseMixin'
export default {
  name: 'FlyManage',
  mixins: [baseMixin],
  components: {},
  props: {
  },
  data () {
    return {
      name: 'FlyManage',
      title: '飞行展示',
      icon: 'tool-feixing',
      isFlySelf: false,
      isDisable: true
    }
  },
  computed: {
    disabled () {
      return this.isDisable
    }
  },
  mounted () {
  },
  methods: {
    flyManage (type) {
      if (type === 'play' || type === 'draw') this.isDisable = false
      if (type === 'stop' || type === 'clear') this.isDisable = true
      this.$emit('flyManage', type)
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
  .el-form{
    padding-right: 10px;box-sizing: border-box; margin-bottom: 22px;
    /deep/ .el-input--small{font-size: 14px; color: #000;}
  }
  /deep/ .el-form-item{height: $height;margin-bottom: 5px;}
  /deep/ .el-form-item__label{line-height: $height;color: #000;}
  /deep/ .el-form-item__error{ padding-top: 0; margin-top: -2px;}
  .btn{margin-top: 20px;height: $height;}
  .btn_ok{ width: 64px; height: $height;background-color: $activeColor; border-color: $activeColor; }
  .btn_cancle{ width: 70px;height: $height;}
</style>
