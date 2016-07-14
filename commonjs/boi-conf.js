// 配置
boi.spec('basic', {
    appName: 'jiazheng',
    // 本地编译目录
    localPath: {
        src: './src/',
        dest: './dest/',
        thirdparty: './libs/'
    },
    // cdn url
    cdn: {
        server: 'static.daojia.com',
        path: '/jiazheng/'
    }
});

// 同名配置覆盖父级
boi.spec('js', {
    extType: 'js',
    srcType: ['es2015'],
    srcDir: 'js',
    destDir: 'js',
    useHash: false,
    // files:{
    //     main: {
    //         'main.a': 'main.a.js',
    //         'main.b': 'main.b.js'
    //     },
    //     vendor: ['vue']
    // }
    // mutiEntriesVendor: true
});

boi.spec('style', {
    extType: 'scss',
    srcDir: 'styles',
    destDir: 'style',
    useHash: false
});

boi.spec('html', {
    extType: 'html',
    srcDir: 'views',
    staticSrcmap: true
});

boi.spec('image', {
    extType: ['png', 'jpg'],
    destDir: 'image',
    cdn: 'img.daojia.com',
});
