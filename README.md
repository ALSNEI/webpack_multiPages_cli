# webpack_multiPages_cli

前端：一个简单的webpack多页项目工程，适用与官网等

## Feature

- 支持 ES6 语法，使用 babel 编译
- html 支持 ejs 语法，使用 underscore-template-loader 和 HtmlWebpackPlugin 编译，详细语法可查看 underscore 或者 lodash _.template 函数部分。另外 underscore-template-loader 提供 Macros (宏) 的特性可自定义静态内容，内置 require 宏可在页面 html 文件内引入公共 html 组件，比如 header、footer 之类多页面公共组件，并且可以提供参数给组件。
- 自动处理浏览器兼容
- 通过采用contenthash优化打包速率
- 无需手动添加入口页面，在对应目录结构下写内容即可

## 目录结构
``` base
  |-- src/                        -- 源文件
  |   |--assets                       --公共静态资源 如img、css、js
  |   |--lib                          --公用组件 如头部、底部html
  |   |-- index.html                  -- 主页面
  |   |-- index/                      -- 主页面资源
  |       |-- index.css
  |       |-- index.js
  |   |-- page1/                     -- page-a 页面
  |       |-- img/                     -- page-a 页面图片文件，目录名不可更改
  |       |-- page1.html
  |       |-- page1.css
  |       |-- page1.js
  |       |-- sub_page_1                 -- page-a 子页面
  |           |-- subPage.html
  |           |-- subpage.css
  |           |-- index.js
  ```
== 每个页面目录的图片文件夹固定为img ==
== 每个页面目录的图片文件夹固定为img ==
== 重要的事情说三遍 ==

## 怎么使用呢？

都在看多页面脚手架了，不会？
You got to be kidding me.