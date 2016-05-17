import '../styles/main.a.scss';

// ADM sample
require(['./part/part.a.js', './part/part.b.js'], function(a, b) {
    console.log('main chunk a is loaded');
    a();
    b();
    if (true) {
        require(['./part/part.c.js'], function(c) {
            c();
        });
    }
});
