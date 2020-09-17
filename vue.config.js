module.exports = {
    outputDir: 'dist',   //build输出目录
    assetsDir: 'assets', //静态资源目录（js, css, img）
    lintOnSave: false, //是否开启eslint
    chainWebpack: (config)=>{
        config.resolve.alias
            .set('vue$', 'vue/dist/vue.esm.js');
    },
    devServer: {
        open: false, //是否自动弹出浏览器页面
        port: '80', 
        https: false,   //是否使用https协议
        hotOnly: true, //是否开启热更新
        proxy: {
            '/jlyw': {
                target: 'http://192.168.0.4/jlyw', //API服务器的地址
                changeOrigin: true,
                pathRewrite: {
                    '^/jlyw': ''
                }
            }  
        },
    }
 }