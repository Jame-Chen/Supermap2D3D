<template>
  <div class="base-maps" @mouseover="enterFun" @mouseout="leaveFun">
    <div v-for="(item, i) in mapData" :key="i" class="item" :class="{'active': item.typeName === mapDefaultType }" @click="btn(item.typeName)" v-show="item.typeName === mapDefaultType || isOpen">
      <img :src="item.src">
      <p>{{item.label}}</p>
    </div>
  </div>
</template>

<script>
import normal from './static/normal.png'
import professional from './static/professional.png'
import panorama from './static/panorama.png'
import video from './static/video.png'

export default {
  name: 'BaseMaps',
  props: {
    baseProps: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      name: 'BaseMaps',
      isOpen: false,
      mapData: [], // 图层控制数据
      mapDefaultType: '',
      tempMapDefaultType: 'normal',
      baseMaps: [
        { value: 'normal', label: '标准', src: normal },
        { value: 'professional', label: '专业', src: professional },
        { value: 'panorama', label: 'VR实景', src: panorama },
        { value: 'video', label: 'VR视频', src: video }
      ]
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initMaps()
    })
  },
  methods: {
    initMaps () {
      this.mapData = this.baseProps['geoMap']
      for (let i = 0; i < this.mapData.length; i++) {
        if (this.mapData[i].visible) this.mapDefaultType = this.mapData[i].typeName
      }
    },
    btn (value) {
      if (value === 'panorama') { // 实景
        for (let i = 0; i < this.mapData.length; i++) {
          if (this.mapData[i].typeName === value) {
            this.mapData[i].visible = !this.mapData[i].visible
            if (this.mapData[i].visible) {
              this.mapDefaultType = value
              for (let j = 0; j < this.mapData.length; j++) {
                if (this.mapData[j].typeName === 'video') {
                  this.mapData[j].visible = false
                }
              }
            } else this.mapDefaultType = this.tempMapDefaultType
          }
        }
        this.$emit('setMapStatus', this.mapData, value)
      } else if (value === 'video') { // 视频
        for (let i = 0; i < this.mapData.length; i++) {
          if (this.mapData[i].typeName === value) {
            this.mapData[i].visible = !this.mapData[i].visible
            if (this.mapData[i].visible) {
              this.mapDefaultType = value
              for (let j = 0; j < this.mapData.length; j++) {
                if (this.mapData[j].typeName === 'panorama') {
                  this.mapData[j].visible = false
                }
              }
            } else this.mapDefaultType = this.tempMapDefaultType
          }
        }
        this.$emit('setMapStatus', this.mapData, value)
      } else {
        if (this.mapDefaultType !== value) {
          for (let i = 0; i < this.mapData.length; i++) {
            if (this.mapData[i].typeName === value) {
              this.mapData[i].visible = true
            } else {
              if (this.mapData[i].typeName !== 'panorama' && this.mapData[i].typeName !== 'video') this.mapData[i].visible = false
            }
          }
          this.mapDefaultType = value
          this.tempMapDefaultType = this.mapDefaultType
          this.$emit('setMapStatus', this.mapData, value)
        }
      }
    },
    enterFun () {
      this.isOpen = true
    },
    leaveFun () {
      this.isOpen = false
    }
  }
}
</script>

<style lang="scss" scoped>
$active: #0080ff;
.base-maps{
  position: absolute;
  bottom: 43px;
  left: 3px;
  z-index: 2000;
  padding: 5px;
  background: rgba($color: #fff, $alpha: 0.01);
  &:hover{
    background: #fff;
  }
  .item-father{position: relative;}
  .item{
    box-sizing: border-box;
    display: inline-block;
    position: relative;
    height: 58px;
    width: 84px;
    overflow: hidden;
    margin-right: 10px;
    border: 1px solid rgba($color: $active, $alpha: 0.01);
    cursor: pointer;
    border-radius: 2px;
    &.active, &:hover{
      border: 1px solid $active;
      p{
        background: $active;
      }
    }
    p{
      position: absolute;
      bottom: 0;
      right: 0;
      margin: 0;
      padding: 3px 4px;
      line-height: 13px;
      font-size: 12px;
      color: #fff;
    }
  }
  .item:last-child{
    margin-right: 0;
  }
}
</style>
