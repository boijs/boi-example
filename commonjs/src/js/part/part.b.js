define('partb', ['./part.d.js'], function(d) {
    return function() {
        console.log('part.b.js');
        d();
    }
})
