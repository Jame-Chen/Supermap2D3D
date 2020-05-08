<template>
  <div class="indexCss">
    <div class="indexDiv">
      <base-tools-bar @toolBtn="toolBtn" />
    二维主界面
    <slot></slot>
    </div>
  </div>
</template>

<script>
import BaseToolsBar from './BaseToolsBar'
export default {
  name: 'Index',
  components: {
    BaseToolsBar
  },
  props: {
  },
  mounted () {
    this.install()
  },
  data () {
    return {

    }
  },
  methods: {
    install () {
      // 这是地图初始化
      // console.log('这是2D地图初始化')
    },
    toolBtn (obj) {
      // console.log(obj)
    }
  }
}
</script>

<style lang="scss" scoped>
.indexCss{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}
.indexDiv{
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #eee;
}
</style>
