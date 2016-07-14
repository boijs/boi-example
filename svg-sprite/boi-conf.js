boi.use('boi-plugin-loader-svgsprite',{
    name: 'svg/svg-sprite.svg',
    inject: false,
    targets: ['index.svgtest.html']
});

// 配置
boi.spec('basic', {
    appName: 'svgtest',
    // 本地编译目录
    localPath: {
        src: './src/',
        dest: './dest/',
        thirdparty: './libs/'
    },
    // cdn url
    // cdn: {
    //     server: 'static.svgtest.com',
    //     path: '/svgtest/'
    // }
});

// 同名配置覆盖父级
boi.spec('js', {
    extType: 'js',
    srcType: ['es2015'],
    srcDir: 'js',
    destDir: 'js',
    useHash: true
});

boi.spec('style', {
    extType: 'scss',
    srcDir: 'style',
    destDir: 'style',
    useHash: true
});

boi.spec('html', {
    extType: 'html',
    srcDir: 'views',
});

boi.spec('image', {
    extType: ['png', 'jpg'],
    destDir: 'image'
});
