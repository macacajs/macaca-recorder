# Macaca Recorder 浏览器插件

---

[![CI][ci-image]][ci-url]

[ci-image]: https://github.com/macacajs/macaca-recorder/actions/workflows/ci.yml/badge.svg
[ci-url]: https://github.com/macacajs/macaca-recorder/actions/workflows/ci.yml

## 插件说明

- 支持鼠标移动到指定元素获取对应的 xpath 信息
- 支持记录鼠标点击、双击、输入、鼠标悬浮等操作步骤

<p align="left">
  <img
    alt="logo"
    src="./resources/demo.gif"
    width="800"
  />
</p>

## 如何开发

```bash
# 安装 npm 依赖
$ npm install

# 本地打包
$ npm run build
```

## 安装使用

1. 浏览器输入：`chrome://extensions/` 
2. 加载 build 后的产物 dist/* 文件夹

<p align="left">
  <img
    alt="logo"
    src="./resources/dev-1.png"
    width="400"
  />
</p>

3. 插件常驻

<p align="left">
  <img
    alt="logo"
    src="./resources/dev-2.png"
    width="400"
  />
</p>

4. 将插件钉在浏览器右上角（点击插件可开启/关闭插件）
5. 刷新页面，右下角可看到插件图标
6. 快捷键 Option(Mac)、Alt(Win)：
```
(Option/Alt)+Space: 开启、关闭鼠标移动监听
(Option/Alt)+S: 切换元素
(Option/Alt)+C: 点击元素
(Option/Alt)+V: 检查元素
```

<!-- GITCONTRIBUTOR_START -->

## 贡献者

|[<img src="https://avatars.githubusercontent.com/u/12947068?v=4" width="100px;"/><br/><sub><b>ilimei</b></sub>](https://github.com/ilimei)<br/>|[<img src="https://avatars.githubusercontent.com/u/1011681?v=4" width="100px;"/><br/><sub><b>xudafeng</b></sub>](https://github.com/xudafeng)<br/>|[<img src="https://avatars.githubusercontent.com/u/30293087?v=4" width="100px;"/><br/><sub><b>Jodeee</b></sub>](https://github.com/Jodeee)<br/>|[<img src="https://avatars.githubusercontent.com/u/52845048?v=4" width="100px;"/><br/><sub><b>snapre</b></sub>](https://github.com/snapre)<br/>|[<img src="https://avatars.githubusercontent.com/u/10104168?v=4" width="100px;"/><br/><sub><b>yihuineng</b></sub>](https://github.com/yihuineng)<br/>|
| :---: | :---: | :---: | :---: | :---: |


[git-contributor 说明](https://github.com/xudafeng/git-contributor)，自动生成时间：`Tue Sep 12 2023 20:44:30 GMT+0800`。

<!-- GITCONTRIBUTOR_END -->
