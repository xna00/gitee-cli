# gitee-cli
### 介绍
gitee-cli，一个简单的gitee命令行工具，利用[Gitee API](https://gitee.com/api/v5/swagger)。可以在命令行中列出、创建、删除仓库，启动、更新Gitee Pages。
### 安装
`npm install -g gitee-cli`
### 使用
#### 配置
使用前需设置access_token和username

`ge set -u <username> -t <token>`
#### 仓库
##### 列出所有仓库
`ge repo list`
##### 创建仓库
`ge repo create <repo>`
##### 删除仓库
`ge repo delete <repo>`
#### Pages
使用Gitee API建立Pages会失败，提示： 非付费pages，不允许部署 pages。所以要用gitee-cli更新Pages，需要模拟浏览器请求。
##### 设置cookie和X-CSRF-Token：
`ge set -c <cookie> -x <XCSRFToken>`
##### 启动/更新 Pages
`ge pages build <repo>`