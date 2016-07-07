define('partc', ['./part.d.js'], function(d, a) {
    return function() {
        console.log('part.c.js');
        d();
    }
})
