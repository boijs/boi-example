define('partc', ['./part.d.js', './part.a.js'], function(d, a) {
    return function() {
        console.log('part.c.js');
        d();
        a();
    }
})
