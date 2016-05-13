import {
    fn as d
}
from './part.d.js';

export const fn = function() {
    console.log('part.c.js');
    d();
    require.ensure([], (require) => {
        let e = require('./part.e');
        e.fn();
    }, 'asyncE');
}

// define('partc', ['./part.d.js', './part.a.js'], function(d, a) {
//     return function() {
//         console.log('part.c.js');
//         d();
//         a();
//     }
// })
