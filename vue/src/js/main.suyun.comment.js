// import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue';
import Complaint from './Complaint.vue';

let svgs = require.context("../assets/svg/", false, /\.svg$/);

Vue.use(VueRouter);

// 自定义过滤器，根据评分数值判断是否点亮星星
Vue.filter('isRankme', function(value, input) {
    // `input` === `this.userInput`
    if (parseInt(input) >= parseInt(value)) {
        return 'current'
    } else {
        return ''
    }
});

let router = new VueRouter();

// 空白组件作为路由容器
let outerApp = Vue.extend({});

// 路由配置
router.map({
    '/pj/:orderid': {
        name: 'pj',
        component: App
    },
    '/complaint/:orderid/:car_type/:plate': {
        name: 'complaint',
        component: Complaint
    }
});
// 启动路由器
router.start(outerApp, 'body');

function getQueryString(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

let _orderid = getQueryString('orderId');
router.go({
    name: 'pj',
    params: {
        orderid: _orderid
    }
});
