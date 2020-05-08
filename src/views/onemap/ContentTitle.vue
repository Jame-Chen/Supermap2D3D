<template>
  <el-row class="title">
    <div class="titleRight">
      <span class="txt">
        <slot><svg-icon v-if="icon" class="icon" :icon-class="icon"/>{{title}}</slot>
      </span>
      <div class="floatRight">
        <slot name="btn"></slot>
        <el-button type="text" size="small" v-if="showMiniBtn" @click="toMini" ><svg-icon icon-class="mini"/></el-button>
        <el-button type="text" size="small" v-if="showCloseBtn" @click="close"><svg-icon icon-class="iconClose" /></el-button>
      </div>
    </div>
  </el-row>
</template>

<script>
// 支持插槽，和 name=btn  增加自定义按钮
// <content-title icon="tuceng" title="图层控制" @toggle="toggle">
//   我是自定义标题
//   <template v-slot:btn><el-button type="text" @click="doSomeThing">add</el-button></template>
// </content-title>
export default {
  name: 'ContentTitle',
  props: {
    icon: {
      type: String
    },
    showCloseBtn: {
      type: Boolean,
      default: true
    },
    showMiniBtn: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: '未知标题',
      required: true
    }
  },
  methods: {
    close () {
      // console.log('子组件关闭')
      this.$emit('toggle', false)
    },
    toMini () {
      this.$emit('toMini')
    }
  }
}
</script>

<style lang="scss" scoped>
$height: 35px;
$color: #fff;
.title{
  // background: url('../../assets/images/contentTitle.png') repeat-x;
  background: url('../../assets/images/contentTitleR.png') repeat-y;
  background-size: 100% $height;
  height: $height;
}
.titleRight{
  position: relative;
  background: url('../../assets/images/contentTitleLeft.png') no-repeat left;
  background-size: 100px $height;
  height: $height;
}
.txt{
  display: inline-block;
  padding-left: 10px;
  color: $color;
  font-size: 16px;
  line-height: $height;
  font-weight: bolder;
}
.icon{
  margin-right: 10px;
}
.floatRight{
  position: absolute;
  right: 10px;
  top: 0;
  height: $height;
  z-index: 200;
}
/deep/ .el-button--text{
  color: $color;
}
</style>
