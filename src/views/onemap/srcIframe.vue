<template>
  <div :style="iframeStyle">
    <div v-if="showClose" class="close" @click="close">
      <i class="el-icon-close"  style="color: #fff; font-size: 24px; line-height:58px;" ></i>
    </div>
    <iframe :src="src" :name="iframeName" frameborder="0" width="100%" height="100%" ></iframe>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      required: true,
      type: String
    },
    iframeName: {
      default: 'srcIframe',
      type: String
    },
    width: {
      required: false,
      type: [String, Number]
    },
    height: {
      required: false,
      type: [String, Number]
    },
    showClose: {
      default: true,
      type: Boolean
    }
  },
  methods: {
    addPx (num) {
      if (typeof num === 'number') {
        num = num + 'px'
      }
      return this
    },
    close () {
      this.$emit('closeVr')
    }
  },
  computed: {
    iframeStyle () {
      this.addPx(this.width).addPx(this.height)
      return `width: ${this.width}; height: ${this.height}`
    }
  }
}
</script>

<style lang="scss" scoped>
.close{
  position: absolute;
  top: 10px;
  right: 10px;
  height: 60px;
  width: 60px;
  background-color: rgba(0, 0, 0, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.65);
  border-radius: 4px;
  text-align: center;
}
</style>
