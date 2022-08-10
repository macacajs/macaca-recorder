# Macaca UI Recorder

---

[![NPM version][npm-image]][npm-url] [![CI][ci-image]][ci-url] [![Test coverage][codecov-image]][codecov-url] [![node version][node-image]][node-url]

[npm-image]: https://img.shields.io/npm/v/macaca-recorder.svg?logo=npm
[npm-url]: https://npmjs.org/package/macaca-recorder
[ci-image]: https://github.com/macacajs/macaca-recorder/actions/workflows/ci.yml/badge.svg
[ci-url]: https://github.com/macacajs/macaca-recorder/actions/workflows/ci.yml
[codecov-image]: https://img.shields.io/codecov/c/github/macacajs/macaca-recorder.svg?logo=codecov
[codecov-url]: https://codecov.io/gh/macacajs/macaca-recorder
[node-image]: https://img.shields.io/badge/node.js-%3E=_16-green.svg?logo=node.js
[node-url]: http://nodejs.org/download/

通过录制的方式生成 E2E 测试的代码，支持插件，降低 E2E 测试的手动书写难度。

## 整体设计

以 Node.js 作为主流程控制器，用 Playwright 实现页面录制，汇总事件流，通过事件流生成对应的代码。

## 目录

```
src/
├── core // 核心机制，提供插件和注入能力
├── injected // 插入测试页面
│   ├── isomorphic
│   └── lib
├── node // node层逻辑，启动逻辑成功程序入口
│   ├── plugins
│   │   ├── api  // 对外报漏api
│   │   ├── assets-server // 本地文件服务
│   │   ├── browser   // playwright浏览器功能
│   │   ├── event     // 事件
│   │   └── generator // 生成器核心逻辑
│   │       ├── generated
│   │       └── page
├── recorder // 代码编辑器页面
│   └── services
└── utils
```

<!-- GITCONTRIBUTOR_START -->

## Contributors

| [<img src="https://avatars.githubusercontent.com/u/1011681?v=4" width="100px;"/><br/><sub><b>xudafeng</b></sub>](https://github.com/xudafeng)<br/> | [<img src="https://avatars.githubusercontent.com/u/52845048?v=4" width="100px;"/><br/><sub><b>snapre</b></sub>](https://github.com/snapre)<br/> | [<img src="https://avatars.githubusercontent.com/u/12947068?v=4" width="100px;"/><br/><sub><b>ilimei</b></sub>](https://github.com/ilimei)<br/> | [<img src="https://avatars.githubusercontent.com/u/10104168?v=4" width="100px;"/><br/><sub><b>yihuineng</b></sub>](https://github.com/yihuineng)<br/> |
| :-: | :-: | :-: | :-: |

This project follows the git-contributor [spec](https://github.com/xudafeng/git-contributor), auto updated at `Tue Aug 02 2022 10:50:00 GMT+0800`.

<!-- GITCONTRIBUTOR_END -->

## 待完成的任务

- [x] 启动无导航栏窗口
- [x] 支持插件系统
- [ ] 支持浏览器动态引入插件
- [ ] 记录操作
- [ ] 回放操作
