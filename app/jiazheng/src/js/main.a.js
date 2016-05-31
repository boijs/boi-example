import '../styles/main.a.scss';
import Vue from 'vue';
import a from './part/part.a.js';
import b from './part/part.b.js';

window.onload = function() {
    console.log('main chunk a is loaded');
    a();
    b();
    document.body.onclick = function() {
        // 第三个参数是chunk name，决定编译打包的文件名称
        require.ensure([], (require) => {
            let c = require('./part/part.c');
            c.fn();
        },'asyncC');
    }
};
