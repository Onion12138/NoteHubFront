import Vue from "vue";
import App from "./App";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import router from "./router";
import ECharts from "echarts";
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import Vue2OrgTree from "vue2-org-tree";
import axios from "axios";
import VueAxios from "vue-axios";
import VueElectron from "vue-electron";

Vue.use(VueElectron);
Vue.use(VueAxios, axios);
// Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(ECharts);
Vue.use(mavonEditor);
Vue.use(Vue2OrgTree);
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  template: "<App/>"
}).$mount("#app");
