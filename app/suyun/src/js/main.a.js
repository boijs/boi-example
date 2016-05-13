import '../styles/main.a.scss';
import a from './part/part.a.js';
import b from './part/part.b.js';

window.onload = function() {
    console.log('main chunk a is loaded');
    a();
    b();
    // 第三个参数是chunk name，决定编译打包的文件名称
    require.ensure([], (require) => {
        let c = require('./part/part.c');
        c.fn();
    }, 'asyncC');
};

// ADM sample
// require(['./part/part.a.js', './part/part.b.js'], function(a, b) {
//     console.log('main chunk a is loaded');
//     a();
//     b();
//     if (true) {
//         require(['./part/part.c.js'], function(c) {
//             c();
//         });
//     }
// });
