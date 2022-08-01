# e2e测试生成
通过录制的方式生成e2e测试的代码，支持插件，减少e2e测试的手动书写难度

## 整体思路
以nodejs作为主流程控制器，用playwright实现页面录制，汇总事件流，通过事件流生成对应的代码。

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

## 待完成的任务

- [x] 启动无导航栏窗口
- [x] 支持插件系统
- [ ] 支持浏览器动态引入插件
- [ ] 记录操作
- [ ] 重放操作
