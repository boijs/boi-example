boi.config.spec('basic', {
    // 本地编译目录
    localPath: {
        src: './src/',
        dest: './dest/'
    },
    // 远程部署目录
    deploy: {
        server: '192.168.1.1',
        path: '/suyun/'
    },
    mainFilePrefix: 'main'
});

// 同名配置覆盖父级
boi.config.spec('js', {
    // 源文件扩展名
    extType: 'js',
    // 源文件使用的编码类型，值可以是单个string，也可以是数组
    srcType: ['es2015', 'react'],
    // js文件目录，默认为js
    dirname: 'js',
    // 是够uglify
    uglify: true,
    // 是否compress
    compress: true,
    // 是否使用hash指纹
    useHash: true,

    // 部署配置项，同名配置会覆盖上层配置
    deploy: {
        server: '192.168.1.1',
        path: '/suyun/static/js'
    }
});

boi.config.spec('style', {
    extType: 'scss',
    // 是否uglify
    uglify: true,
    dirname: 'style',
    // 是否compress
    compress: true,
    // 是否使用hash指纹
    useHash: true,
    // 部署配置项
    deploy: {
        path: '/suyun/static/style',
    }
});

boi.config.spec('resource', {
    image: {
        extType: ['png', 'jpg'],
        base64: true,
        base64Limit: 1000,
        loader: null,
        deploy: {
            server: '192.168.1.100',
            path: '/res/image/'
        }
    }
});


// 使用插件
boi.use('boi-plugin-loader-vue');
