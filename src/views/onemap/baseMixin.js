import ContentTitle from './ContentTitle.vue'
export default {
  components: {
    ContentTitle
  },
  props: {
    show: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data () {
    return {
      state: this.show
    }
  },
  methods: {
    // 将传递的值 'true'或者'false'，转换为boolean
    formatStringToBoolean (arg) {
      if (arg === 'true') return true
      else if (arg === 'false') return false
      else return arg
    },
    toggle (val) {
      // console.log('组件BaseToc - toggle： ', val, typeof val)
      const value = this.formatStringToBoolean(val)
      if (value === undefined) this.state = !this.state
      else this.state = value
      this.$emit('toggle', { name: this.name, value: this.state })
    },
    toggleOnlyState (val) {
      const value = this.formatStringToBoolean(val)
      if (value === undefined) this.state = !this.state
      else this.state = value
      this.$emit('toggleOnlyState', { name: this.name, value: this.state })
    },
    doSomeThing () {
      // console.log('doSomeThing')
    },
    toMini () {
      this.toggle()
      this.$emit('toggleRightMiniStatus', this.name)
    }
  }
}
