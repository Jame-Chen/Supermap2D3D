<template>
  <div class="advance-tools">
    <div v-if="!state.close || state.isShow">
      <!-- 有下拉菜单的 -->
      <div v-for="(item, index) in icons" :key="index" class="item">
        <div v-if="item.children && item.children.length">
          <el-dropdown size="small">
            <span class="el-dropdown-link">
              <svg-icon :iconClass="item.icon" class="svg-css" />{{item.title}} <i class="el-icon-arrow-down el-icon--right"></i><b v-if="index !== icons.length - 1" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(child, index) in item.children" :key="index" @click.native="btnClick(child.icon, true)">
                <svg-icon :iconClass="child.icon" class="svg-css" style="margin-right: 8px;" />{{child.title}}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <!-- 没有子集 -->
        <div v-else @click="btnClick(item.icon)">
          <svg-icon :iconClass="item.icon" class="svg-css" />
          {{item.title}}
          <b v-if="index !== icons.length - 1" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdvanceTools',
  props: {
    iconData: {
      type: Array
    },
    type: {
      typeof: String,
      required: true
    }
  },
  data () {
    return {
      name: 'AdvanceTools',
      state: { isShow: true, close: false }, // 此地图工具条是否显示D
      baseIcons: [
        {
          icon: 'tool-sousuo',
          title: '查询'
        }, {
          icon: 'tool-qingchu',
          title: '清除'
        }, {
          icon: 'tool-fenxi',
          title: '分析',
          children:
          [
            { icon: 'tool-duanmian', title: '断面分析' },
            { icon: 'tool-liantong', title: '连通分析' },
            { icon: 'tool-wangluozhuisu', title: '网络追溯' }
          ]
        }, {
          icon: 'tool-gongju',
          title: '工具',
          children:
          [
            { icon: 'tool-celiang', title: '测量计算' },
            { icon: 'tool-dayin', title: '打印制图' }
          ]
        }
      ],
      baseIcons_3d: [
        {
          icon: 'tool-sousuo',
          title: '查询'
        }, {
          icon: 'tool-qingchu',
          title: '清除'
        }, {
          icon: 'tool-feixing',
          title: '飞行',
          children:
            [
              { icon: 'tool-feixinggw', title: '管网' },
              { icon: 'tool-feixingbz', title: '泵站' },
              { icon: 'tool-feixingws', title: '污水处理厂' },
              { icon: 'tool-feixingqx', title: '倾斜摄影' }
            ]
        }, {
          icon: 'tool-gongju',
          title: '工具',
          children:
            [
              { icon: 'tool-kaiwa', title: '开挖' },
              { icon: 'tool-celiang', title: '测量计算' }
            ]
        }
      ],
      // 不同与onemap的数据
      gongCheng: {
        index: 2,
        data: { icon: 'tool-bianji', title: '编辑' }
      },
      guiHua: {
        index: 2,
        data: { icon: 'tool-fenxi', title: '分析' }
      }
    }
  },
  computed: {
    icons () {
      if (this.$route.name === 'onemap') {
        if (this.type === '3d') this.baseIcons = this.baseIcons_3d
      } else if (this.$route.name === 'gongCheng') this.baseIcons[this.gongCheng.index] = JSON.parse(JSON.stringify(this.gongCheng.data))
      else if (this.$route.name === 'guiHua') this.baseIcons[this.guiHua.index] = JSON.parse(JSON.stringify(this.guiHua.data))
      return this.baseIcons // 默认返回 this.$route.name==='onemap' 设施
    }
  },
  methods: {
    toggle (obj, str, val) {
      this.$set(obj, str, !val)
    },
    btnClick (icon, val = null) {
      let obj = { name: icon.split('-')[1] }
      if (typeof val === 'boolean') obj.value = val
      // console.log(obj)
      this.$emit('toolBtn', obj)
    }
  }
}
</script>

<style lang="scss" scoped>
$activeBg: rgba($color: #0c132b, $alpha: 0.2);
$bg: #fff;
$num: 34px;
.advance-tools{
  position: absolute;
  top: 5px;
  right:5px;
  background: $bg;
  box-sizing: border-box;
  line-height: 21px;
  padding-right:12px;
  height: $num;
  box-shadow: 1px 2px 1px rgba(0,0,0,0.15);
  cursor: pointer;
  border-radius: 2px;
  z-index: 1000;
  // border-top: 1px solid rgba(0,0,0,0.1);
  // border-left: 1px solid rgba(0,0,0,0.1);
  .item{
    display: inline-block;
    padding: 6px 0 7px 12px;
    font-size: 12px;
    height: $num;
    color: #333;
    white-space: nowrap;
    .svg-css{
      vertical-align: middle;
      margin-right: 6px;
      color: #666;
    }
    b{
      margin-left: 12px;
      border-right: 1px solid #eee;
      vertical-align: middle;
    }
    .el-dropdown-link{
      color: #333;
      font-size: 12px;
    }
    &:hover{
      color: #0080ff;
      .el-dropdown-link, .svg-css{
        color: #0080ff;
      }
    }
  }
  .el-dropdown-menu--small .el-dropdown-menu__item{
    color: #333;
    font-size: 12px;
    &:hover{
      color: #0080ff;
      font-size: 12px;
    }
  }
}

</style>
