<template>
  <div v-if="state" class="legend">
    <div v-for="(cols, index) in legendData" :key="index" :style="`width: ${Math.floor(10000 / col) / 100}%`" class="cols">
      <div v-if="typeof cols === 'object' && cols.length" class="cols-div">
        <div v-for="(item, index) in cols" :key="index" class="item">
          <img :src="iconArray[item.icon]">{{item.label}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Legend',
  data () {
    return {
      state: false,
      iconArray: {
        ysbz: require('../../assets/images/map/icon/icon-ysbz.png'),
        wsbz: require('../../assets/images/map/icon/icon-wsbz.png'),
        hlbz: require('../../assets/images/map/icon/icon-hlbz.png'),
        ysj: require('../../assets/images/map/icon/icon-ysj.png'),
        wsj: require('../../assets/images/map/icon/icon-wsj.png'),
        hlj: require('../../assets/images/map/icon/icon-hlj.png'),
        ysg: require('../../assets/images/map/icon/icon-ysg.png'),
        wsg: require('../../assets/images/map/icon/icon-wsg.png'),
        hlg: require('../../assets/images/map/icon/icon-hlg.png'),
        ysk: require('../../assets/images/map/icon/icon-ysk.png'),
        wsc: require('../../assets/images/map/icon/icon-wsc.png'),
        pfk: require('../../assets/images/map/icon/icon-pfk.png'),
        psxt: require('../../assets/images/map/icon/icon-psxt.png')
      },
      name: 'Legend',
      data: [
        { icon: 'icon-ysbz', label: '雨水泵站' },
        { icon: 'icon-wsbz', label: '污水泵站' },
        { icon: 'icon-hlbz', label: '合流泵站' },
        { icon: 'icon-ysg', label: '雨水管' },
        { icon: 'icon-wsg', label: '污水管' },
        { icon: 'icon-hlg', label: '合流管' },
        { icon: 'icon-ysj', label: '雨水井' },
        { icon: 'icon-ysk', label: '雨水口' },
        { icon: 'icon-wsj', label: '污水井' },
        { icon: 'icon-hlj', label: '合流井' },
        { icon: 'icon-wsc', label: '污水处理厂' },
        { icon: 'icon-pfk', label: '排放口' },
        { icon: 'icon-psxt', label: '排水系统' }
      ],
      col: 2,
      iconsData: [],
      legendData: []
    }
  },
  computed: {
  },
  methods: {
    activeData () {
      let data = this.iconsData // || this.data // 采用props或者默认data
      data.forEach(i => {
        i.icon = i.icon.split('-')[1]
      }) // data 的icon 值 去除 'tool-'
      // console.log(11, data)
      let length = data.length
      let row = Math.ceil(length / this.col)
      let Arr = new Array(this.col)
      for (let i = 0; i < this.col; i++) Arr[i] = data.slice(row * i, row * (i + 1))
      this.legendData = Arr
    }
  }
}
</script>

<style lang="scss" scoped>
.legend{
  position: absolute;
  right: 10px;
  bottom: 10px;
  z-index: 9999;
  background: #fff;
  padding: 10px 28px 10px 18px;
  border: 1px solid rgb(1,6,38);
  .cols{
    display: inline-block;
    box-sizing: border-box;
    .cols-div{
      min-width: 106px;
      .item{
        font-size: 12px;
        color: #000;
        line-height: 22px;
        img{
          vertical-align: middle;
          margin-right: 12px;
        }
      }
    }
  }
}
</style>
