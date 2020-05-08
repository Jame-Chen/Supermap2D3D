<template>
  <div class="baseToolsBar">
    <div class="innerBorder">

      <!-- 这是bar 是否显示 -->
      <div v-if="state.isShow">
        <!-- 显示二三维地图按钮 -->
        <el-tooltip v-if="$route.name === 'onemap'"
                    key="tool-map"
                    effect="dark"
                    :content="!state.is3D ? '3D地图' : '2D地图'"
                    placement="right">
          <div class="tool-btn"
               @click="toggle(state, 'is3D', state.is3D);btnClick('tool-3d', state.is3D)">
            <!-- <svg-icon v-if="!state.is3D" iconClass="tool-3d" />
          <svg-icon v-else iconClass="tool-2d" /> -->
          </div>
        </el-tooltip>

        <!-- 显示的其他按钮组 -->
        <el-tooltip v-for="(item, index) in icons"
                    :key="index"
                    effect="dark"
                    :content="item.title"
                    placement="right">
          <div class="tool-btn"
               @click="btnClick(item.icon)">
            <svg-icon :iconClass="item.icon" />
          </div>
        </el-tooltip>
      </div>

      <!-- 这是收缩按钮，控制是否显示 -->
      <el-tooltip key="tool-show"
                  effect="dark"
                  :content="state.isShow ? '收起' : '展开'"
                  placement="right">
        <div class="tool-btn btn-mini"
             @click="toggle(state, 'isShow', state.isShow);btnClick('tool-isShow', state.isShow)">
          <svg-icon v-if="state.isShow"
                    iconClass="tool-shouqi" />
          <svg-icon v-else
                    iconClass="tool-zhankai" />
        </div>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import svgIcon from '../../components/SvgIcon/index.vue'
export default {
  name: 'BaseToolsBar',
  props: {
    type: {
      typeof: String,
      required: true
    },
    funType: {
      typeof: String,
      required: true
    }
  },
  components: {
    //svgIcon
  },
  data() {
    return {
      // 页面状态控制
      state: {
        is3D: false, // 3D地图是否开启
        isShow: true, // 此地图工具条是否显示D
        openDebugg: false // 页面调试是否开启
      },
      // array: ['tool-feixing', tool-xuanzhuan', 'tool-fangda', 'tool-suoxiao', 'tool-quanping', 'tool-sousuo', 'tool-duanmian', 'tool-wangluozhuisu'],
      icon2d: [
        { icon: 'tool-fangda', title: '放大' },
        { icon: 'tool-suoxiao', title: '缩小' },
        { icon: 'tool-quanping', title: '展示全部' },
        // { icon: 'tool-ceju', title: '测距' },
        // { icon: 'tool-cemian', title: '测面' },
        { icon: 'tool-chongzhi', title: '重置' }
        // 2019-10-22 修改界面
        // { icon: 'tool-qingchu', title: '清除' },
        // { icon: 'tool-sousuo', title: '空间查询' },
        // { icon: 'tool-celiang', title: '测量' },
        // { icon: 'tool-dayin', title: '打印截图' },
        // { icon: 'tool-duanmian', title: '断面分析' },
        // { icon: 'tool-liantong', title: '连通分析' },
        // { icon: 'tool-wangluozhuisu', title: '网络追溯' }
      ],
      icon3d: [
        // { icon: 'tool-tuceng', title: '泵站图层控制' },
        // { icon: 'tool-feixing', title: '飞行展示' },
        // { icon: 'tool-feixingself', title: '自定义飞行' },
        { icon: 'tool-chongzhi', title: '重置' }
        // { icon: 'tool-qingchu', title: '清除' },
        // { icon: 'tool-sousuo', title: '空间查询' },
        // { icon: 'tool-celiang', title: '测量' }
        // { icon: 'tool-ceju', title: '测距' },
        // { icon: 'tool-cemian', title: '测面' },
        // { icon: 'tool-cegao', title: '测高' },

      ]
    }
  },
  mounted() {
    // 使用nextTick为了保证dom元素都已经渲染完毕
    this.$nextTick(() => {
      this.initType()
    })
  },
  methods: {
    toggle(obj, str, val) {
      this.$set(obj, str, !val)
    },
    btnClick(icon, val) {
      let obj = { name: icon.split('-')[1] }
      if (typeof val === 'boolean') {
        obj.value = val
      }
      if (obj.name === 'quanping') {
        obj.value = 'map'
      }
      this.$emit('toolBtn', obj)
    },
    initType() {
      if (this.type === '3d') this.state.is3D = true
      else this.state.is3D = false
    }
  },
  computed: {
    icons() {
      return this.state.is3D ? this.icon3d : this.icon2d
    }
  }
}
</script>

<style lang="scss" scoped>
$activeBg: rgba(
  $color: #0c132b,
  $alpha: 0.2
);
$bg: #fff;
$num: 32px;
.baseToolsBar {
  position: absolute;
  left: 5px;
  top: 10px;
  width: $num;
  background: $bg;
  // border: 1px solid #cce0ff;
  // border-radius: 2px;
  box-sizing: border-box;
  z-index: 1000;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.7);
}
.innerBorder {
  box-sizing: border-box;
  // border: 1px solid #202340;
  padding: 0;
}
.tool-btn {
  position: relative;
  width: $num;
  height: $num;
  font-size: 18px;
  color: #0c132b;
  line-height: $num;
  text-align: center;
  cursor: pointer;
  &:hover {
    background: $activeBg;
  }
  & .active {
    background: $activeBg;
  }
}
.tool-btn.btn-mini {
  font-size: 10px;
  height: 24px;
  line-height: 24px;
}
</style>
