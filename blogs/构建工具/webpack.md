---
title: webpack
date: 2023/12/5
tags: 
 - webpack
---
### 从头搭建vue webpack配置

1. 搭建基本目录  
执行`npm init`初始化
2. 安装依赖
> yarn add webpack webpack-cli -g  
> yarn add vue@2.6.0
3. 创建webpack.config.js
```javascript
const path = require('path');
module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, './src/main.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js',
    }
}
```
### 打包index.html
1. 根目录创建index.html
2. 安装 `yarn add html-webpack-plugin -D`
3. 在webpack.config.js中使用
```javascript
    plugins:[
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './index.html'),
            title: 'webpack-vue',
            filename: 'index.html'
        })
    ]
```

### 打包vue
1. src下创建app.vue
2. 在main.js中写入
```javascript
import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);
app.mount('#app')
```
3. 安装支持vue的编译插件和依赖
> yarn add vue-loader@next  
> yarn add vue-template-compiler -D  
4. 在webpack.config.js中使用 
```javascript
plugins:[
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './index.html'),
            title: 'webpack-vue',
            filename: 'index.html'
        }),
        new VueLoaderPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: ['vue-loader']
            }
        ]
    }
```
### vue中写css样式
1. 安装依赖
> yarn add css-loader style-loader -D  
2. webpack.config.js使用  
```javascript
module: {
        rules: [
            {
                test: /\.vue$/,
                use: ['vue-loader']
            },
            {
                test: /\.css/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
```
###  配置bable
> 防止 webpack 识别不了高版本的 js 代码  
1. 安装依赖
> yarn add @babel/core @babel/cdpreset-env babel-loader -D  
2. webpack.config.js 添加js规则
```javascript
rules: [
      {
        test: /\.js$/,  //.js后缀的文件
        exclude: /node_modules/, //不包含node_modules
        use: ['babel-loader']
      }
    ]
```
3. 新建 babel.config.js 配置
```javascript
module.exports={
  presets:[
    ['@babel/preset-env',{
      'targets':{
        'browsers':['last 2 versions']
      }
    }]
  ]
}
```
### 配置热重载
1. 安装依赖
> yarn add webpack-dev-server -D  
2. webpack.config.js 中配置
```javascript
devServer: { 
    static:{
      directory: path.resolve(__dirname, './dist')
    },
    port:8080,  //端口
    hot: true, //自动打包
    host:'localhost', 
    open:true //自动跳到浏览器
  }
```

### 打包原理
1. `读取` 入口文件内容(使用fs模块)  
2. `分析` 入口文件, `递归`的方式读取模块所依赖的文件并生成AST语法树  
> 安装@babel/parser转AST树  
3. 根据AST语法树,生成浏览器可运行的代码(遍历AST树)  
> 安装 @babel/traverse 做收集依赖  
> 安装 @babel/core 和 @babel/preset-env 让ES6-> ES5


