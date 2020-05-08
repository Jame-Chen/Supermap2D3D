<template>
  <div class="moni" :style="`height: ${height - 5}px;`">
    <div class="bgimg">
      <div class="content">
        <div class="dom" v-for="(dom, index) in doms" :key="index" :style="`left:${dom.pointXY[0]}px;top:${dom.pointXY[1]}px;z-index:${index + 11};` + (dom.style.dom || '') ">
          <div v-for="(item, i) in dom.data" :key="i" :style="`${dom.style.base}`" :class="'item ' + (dom.direction === 'ltr' ? 'ltr' : '') + (dom.class ? ` ${dom.class}` : '')" >
            <span class="name" v-if="item.name" :style="dom.style.name ? dom.style.name : ''">{{item.name}}</span>
            <span class="value" v-if="item.value" :style="dom.style.value ? dom.style.value : ''">{{item.value}}</span>
            <span class="danwei" v-if="item.danwei" :style="dom.style.danwei ? dom.style.danwei : ''">{{item.danwei}}</span>
            <img class="img" v-if="item.img" :style="dom.style.img ? dom.style.img : ''" :src="(item.img === 'on') ? bengOn : bengOff" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bengOn from '../../assets/demo/beng_on.gif'
import bengOff from '../../assets/demo/beng_off.png'
export default {
  name: 'MonitorPumpMoni',
  props: {
    height: {
      required: true,
      type: Number
    }
  },
  data () {
    return {
      bengOn: bengOn,
      bengOff: bengOff,
      doms: [
        { pointXY: [310, 10], direction: 'ltr', style: { base: 'font-size: 16px; color:#18284f;line-height:23px;margin-right: 24px;', value: 'font-size: 17px;font-weight: bolder;' }, data: [{ name: '累计雨量：', value: '169.52', danwei: 'mm' }, { name: '日降雨量：', value: '0.00', danwei: 'mm' }, { name: '瞬时雨量：', value: '0.00', danwei: 'mm/h' }] },
        { pointXY: [310, 163], class: 'class01', direction: 'ttb', style: { base: 'font-size: 14px; color:#fff;line-height:21px;margin-bottom: 25px;' }, data: [{ value: 6.04 }, { value: 6.04 }] },
        { pointXY: [435, 163], class: 'class02', direction: 'ttb', style: { base: 'font-size: 13px; color:#18284f;line-height:21px;margin-bottom: 25px;' }, data: [{ value: '1#井口' }, { value: '2#井口' }] },
        { pointXY: [310, 342], class: 'class01', direction: 'ttb', style: { base: 'font-size: 14px; color:#fff;line-height:21px;margin-bottom: 25px;' }, data: [{ value: 6.04 }, { value: 6.04 }] },
        { pointXY: [410, 342], class: 'class02', direction: 'ttb', style: { base: 'font-size: 13px; color:#18284f;line-height:21px;margin-bottom: 25px;' }, data: [{ value: '3#井口' }, { value: '4#井口' }] },
        { pointXY: [310, 440], class: 'class01', direction: 'ttb', style: { base: 'font-size: 14px; color:#fff;line-height:21px;margin-bottom: 11px;' }, data: [{ value: 6.04 }] },
        { pointXY: [392, 443], class: 'class02', direction: 'ttb', style: { base: 'font-size: 11px; color:#18284f;line-height:14px;margin-bottom: 14px;' }, data: [{ value: '1#格栅' }] },
        { pointXY: [80, 450], direction: 'ttb', style: { base: 'font-size: 14px; color:#18284f;line-height:21px;', value: 'color:#0041fa;font-size: 15px;font-weight: bolder;', name: 'text-align: right; padding-right:6px;' }, data: [{ name: 'PH：', value: '6.51' }, { name: 'COD：', value: '17.16' }] },
        { pointXY: [345, 485], class: 'class03', direction: 'ltr', style: { base: 'font-size: 13px; color:#fff;line-height:22px;margin-right: 20px;', dom: 'margin-left: -103.5px' }, data: [{ name: '1#流量', value: 14.04 }, { name: '2#流量', value: 14.04 }] },
        { pointXY: [448, 580], class: 'class02', direction: 'ttb', style: { base: 'font-size: 13px; color:#18284f;line-height:21px;margin-bottom: 25px;' }, data: [{ value: '2#粉碎格栅' }, { value: '3#粉碎格栅' }] },
        { pointXY: [474, 364], class: 'class01', direction: 'ttb', style: { base: 'font-size: 14px; color:#fff;line-height:21px;margin-bottom: 25px;' }, data: [{ value: 6.05 }] },
        { pointXY: [938, 480], class: 'class04', direction: 'ttb', style: { base: 'font-size: 13px; color:#18284f;line-height:20px;margin-bottom: 18px;', value: 'width:67px;display: inline-block;', img: 'margin-left: 4px; vertical-align: middle;' }, data: [{ value: '1#雨水泵', img: 'on' }, { value: '2#雨水泵', img: 'on' }, { value: '3#雨水泵', img: 'on' }, { value: '备用', img: 'on' }] },
        { pointXY: [1010, 643], class: 'class03', direction: 'ltr', style: { base: 'font-size: 13px; color:#fff;line-height:22px;margin-right: 67px;' }, data: [{ name: '污水泵流量', value: 14.04 }] },
        { pointXY: [931, 176], class: 'class04', direction: 'ttb', style: { base: 'font-size: 13px; color:#18284f;line-height:20px;margin-bottom: 18px;', value: 'width:69px;display: inline-block;', img: 'margin-left: 10px; vertical-align: middle;' }, data: [{ value: '1#雨水泵', img: 'off' }, { value: '2#雨水泵', img: 'on' }, { value: '3#雨水泵', img: 'on' }] },
        { pointXY: [931, 309], class: 'class04', direction: 'ttb', style: { base: 'font-size: 13px; color:#18284f;line-height:20px;margin-bottom: 18px;', value: 'width:69px;display: inline-block;', img: 'margin-left: 10px; vertical-align: middle;' }, data: [{ value: '4#雨水泵', img: 'on' }, { value: '5#雨水泵', img: 'on' }, { value: '6#雨水泵', img: 'on' }] },
        { pointXY: [728, 554], class: 'class01', direction: 'ttb', style: { base: 'font-size: 14px; color:#fff;line-height:21px;margin-bottom: 25px;' }, data: [{ value: 6.04 }] },
        { pointXY: [72, 364], direction: 'ltr', style: { base: 'font-size: 16px; color:#18284f;line-height:23px;margin-right: 24px;' }, data: [{ name: '雨水入口' }] },
        { pointXY: [131, 603], direction: 'ltr', style: { base: 'font-size: 16px; color:#18284f;line-height:23px;margin-right: 24px;' }, data: [{ name: '污水入口' }] },
        { pointXY: [1020, 663], direction: 'ltr', style: { base: 'font-size: 16px; color:#18284f;line-height:23px;margin-right: 24px;' }, data: [{ name: '污水出口' }] }
      ]
    }
  },
  mounted () {
    let that = this
    // 设置vr显示区域的高度
    this.timer = setInterval(() => {
    // this.timer = setTimeout(() => {
      that.setTimeData(that)
    }, 1000)
  },
  beforeDestroy () {
    // 清除定时器
    clearInterval(this.timer)
  },
  methods: {
    setTimeData (that) {
      const arr = [
        { index: [1, 3, 5, 10, 15], num: 0.11, max: 6.92, min: 6.04 },
        { index: [8, 12], num: 0.03, max: 15.23, min: 14.04 }
      ]
      for (let i in arr) {
        for (let j in arr[i].index) {
          let n = arr[i].index[j].toString()
          if (this.doms[n].data) {
            this.doms[n].data.forEach(item => {
              let val = item.value
              let max = arr[i].max
              let min = arr[i].min
              if (val >= max) val = min
              else val += arr[i].num
              val = Math.floor(val * 100) / 100
              // console.log(val, max, min, arr[i].num)
              item.value = val
            })
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$h: 700px;
$w: 1200px;
.moni{ width: 100%; text-align: center; overflow: auto; margin-top: -12px;}
.bgimg {position: relative; width: $w; height: $h; margin:0 auto; background: url('../../assets/demo/imgmn.png') no-repeat; background-size: 100% 100%; }
.content{position: absolute; top: 0; left: 0; bottom: 0;right: 0;}
.dom{position:absolute;top:0;left:0;z-index: 1;margin: 0; padding: 0;}
.ltr{display: inline-block;}
.item{color: #000; line-height: 21px; padding-left: 3px; box-sizing: border-box;}
.class01{ background-color:#15254d; color: #fff; padding: 0 5px;border-radius: 2px;}
.class02,.class04 .value { background-color:rgba($color: #a3e8fd, $alpha: 0.8); color: #15254d; padding: 0 4px;border-radius: 0;}
.class03{ background-color:#3863de; color: #fff; padding: 0 4px;border-radius: 0;}
</style>
