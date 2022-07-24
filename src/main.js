import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import ElementUI from 'element-ui';
import router from './admin-router';
import '@toast-ui/editor/dist/toastui-editor.css';
// import 'element-ui/lib/theme-chalk/index.css';
import './assets/element-customer.css';
// './assets/element-customer.css';
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$request = axios;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function(config) {
    return config;
});
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        console.log("error");
        console.log(error.response);
        if (error.response.status !== 200) {
            alert("登录超时， 请重新登录");
            router.currentRoute.path !== 'login' &&
                router.replace({
                    path: 'login',
                    query: {
                        redirect: router.currentRoute.path
                    }
                })
        }
        return Promise.reject(error.response.data);
    }
);





new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
