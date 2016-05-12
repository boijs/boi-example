import '../styles/main.a.scss';
import a from './part/part.a.js';
import b from './part/part.b.js';

window.onload = function() {
    console.log('main chunk a is loaded');
    a();
    b();
    require.ensure([], (require) => {
        let c = require('./part/daojia_c');
        c.fn();
    });
    // require.ensure([], function(require) {
    //     require('./main.b.js')
    // })
};
