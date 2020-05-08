import Vue from 'vue';
import SvgIcon from '../components/SvgIcon/index.vue'; // svg组件

// vue组件全局注册
Vue.component('SvgIcon', SvgIcon);

const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context('./svg', false, /\.svg$/);
requireAll(req);