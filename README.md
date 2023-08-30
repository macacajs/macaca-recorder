# macaca-recorder 浏览器插件

---

## 插件说明

- 支持获取指定元素 xpath 路径
- 支持记录点击、双击、输入、鼠标悬浮等操作步骤，生成对应的代码模版

<p align="left">
  <img
    alt="logo"
    src="./resources/demo.gif"
    width="600"
  />
</p>

## 如何开发

```bash
# 安装 npm 依赖
$ npm install

# 本地打包
$ npm run build
```

## 如何安装&使用

1. 浏览器输入：`chrome://extensions/` 
2. 加载 build 后的产物 dist/x.x.x 文件夹

<p align="left">
  <img
    alt="logo"
    src="./resources/dev-1.png"
    width="450"
  />
</p>



3. Pin 住插件

<p align="left">
  <img
    alt="logo"
    src="./resources/dev-2.png"
    width="450"
  />
</p>


4. 通过`Option+Space (MAC) / Alt+Space(WIN)` 可开启、关闭鼠标移动状态监听
5. 点击插件图标可开启(ON)/关闭(OFF)插件