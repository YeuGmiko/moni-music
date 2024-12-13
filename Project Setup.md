# MoniMusic[Project Setup]

## 项目启动 setup

### 依赖下载 install

```bash
    pnpm install
```

### 开发 development

```bash
    pnpm run dev
```

### 部署 build

**For windows**

```bash
  pnpm build:win
```

**For macOS**

```bash
  pnpm build:mac
```

**For Linux**

```bash
  pnpm build:linux
```

## 目录说明

```text
├─common 主进程与渲染进程的公共目录
├─main 主进程目录
│  ├─constants 常量
│  ├─ipc 注册的Ipc进程
│  ├─store 访问app数据储存的方法
│  └─service 业务逻辑层
├─preload 预加载进程目录
└─renderer 渲染进程目录
    └─src
        ├─assets 资源
        │  ├─iconfont 图标
        │  └─static 静态资源
        │      └─images 图片
        ├─components 全局组件
        ├─layout Layout组件
        ├─plugins 扩展管理
        ├─router VueRouter管理
        ├─server 封装Axios的Request工具
        ├─store Pinia声明的Store
        └─views 页面
```
