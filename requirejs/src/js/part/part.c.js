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
