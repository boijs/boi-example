// 使用插件
// 插件比config API有更高的优先级，请谨慎配置
boi.use('boi-plugin-loader-vue');
// boi.use('boi-plugin-loader-vuehtml');

// 配置
boi.spec('basic', {
    // 本地编译目录
    localPath: {
        src: './src/',
        dest: './dest/'
    },
    // cdn url
    cdn: {
        server: 'static.daojia.com',
        path: '/suyun/'
    },

    // 远程部署目录
    deploy: {
        server: '192.168.1.1',
        path: '/suyun/'
    }
});

// 同名配置覆盖父级
boi.spec('js', {
    extType: 'js',
    srcType: ['es2015'],
    files: {
        vendor: ['vue']
    },
    srcDir: 'js',
    destDir: 'js',
    useHash: true,
    mainFilePrefix: 'main',
    deploy: {
        server: '192.168.1.1',
        path: '/suyun/static/js'
    }
});

boi.spec('style', {
    extType: 'scss',
    srcDir: 'style',
    destDir: 'style',
    useHash: true,
    deploy: {
        path: '/suyun/static/style/',
    }
});

boi.spec('html', {
    extType: 'html',
    srcDir: 'views',
    // 部署配置项
    deploy: {
        path: '/suyun/views/'
    }
});

boi.spec('image', {
    extType: ['png', 'jpg'],
    destDir: 'image',
    base64: false,
    base64Limit: 1000,
    loader: null,
    // cdn: 'img.daojia.com',
    deploy: {
        server: '192.168.1.100',
        path: '/res/image/'
    }
});
