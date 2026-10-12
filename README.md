# my-components

基于 React + TypeScript 的业务组件库，内置可视化文档站点，提供日历、倒计时、富文本编辑器、虚拟滚动列表等常用组件的使用说明、在线演示与 API 参考。

## 技术栈

| 分类 | 技术 |
| --- | --- |
| 框架 | React 18 |
| 语言 | TypeScript 5 |
| 应用脚手架 | Umi 4 |
| UI 组件库 | Ant Design 4（文档站）、Ant Design Mobile 5（移动端场景） |
| 构建工具 | Webpack 5 |
| 其他 | Dayjs、Classnames、React Window、CKEditor 4 |

## 环境要求

- Node.js >= 16（Umi 4 依赖 `Intl.Segmenter`，Node 14 及以下版本无法运行 `umi setup`）
- 推荐使用 Yarn 作为包管理工具

## 快速开始

```bash
# 安装依赖
yarn install

# 启动文档站（本地开发）
yarn dev

# 构建生产包
yarn build
```

启动后访问 `http://localhost:8000` 即可查看组件文档站。

## 目录结构

```
├── config/                 # Umi 主题配置
├── src/
│   ├── components/         # 组件库源码（库的发布内容）
│   │   ├── Calendar/       # 日历组件
│   │   ├── Counter/        # 倒计时组件
│   │   ├── Editor/         # 富文本编辑器组件
│   │   ├── VirtualizedScroll/  # 虚拟滚动列表组件
│   │   └── index.ts        # 组件统一导出
│   ├── index.ts            # 组件库总入口
│   ├── layouts/            # 文档站布局（顶部导航 + 侧边菜单）
│   ├── pages/
│   │   ├── Home/            # 文档站总览页
│   │   ├── components/      # 各组件的文档页（演示 + API）
│   │   ├── VerifyCode/       # 场景示例：验证码输入
│   │   └── InfiniteScroll/   # 场景示例：虚拟滚动手写实现
│   └── styles/              # 全局样式变量
└── .umirc.ts                # 路由与构建配置
```

## 组件列表

| 组件 | 说明 | 文档地址 |
| --- | --- | --- |
| Calendar | 支持月份切换、今日标识与可选范围限制的月历组件 | `/components/calendar` |
| Counter | 基于 `setTimeout` 的倒计时组件，支持步长、间隔、结束回调与 ref 控制 | `/components/counter` |
| Editor | 基于 CKEditor 4 的富文本编辑器，支持自定义工具栏与图片上传 | `/components/editor` |
| VirtualizedScroll | 基于 `react-window` 的长列表虚拟滚动组件，支持头部/尾部占位与触底回调 | `/components/virtualized-scroll` |

## 使用示例

```tsx
import { Calendar, Counter, Editor, VirtualizedScroll } from '@/components';

// 日历
<Calendar
  initValue="2024-01-01"
  handelClickDay={(date) => console.log(date)}
/>

// 倒计时
<Counter start={60} handleFinal={() => console.log('倒计时结束')} />
```

更多用法与完整 API 说明请参考文档站内各组件页面。

## 开发规范

- 组件源码统一存放于 `src/components`，新增组件需在 `src/components/index.ts` 中导出，并补充对应的 TypeScript 类型定义
- 组件文档页统一存放于 `src/pages/components`，复用 `src/pages/components/common.tsx` 提供的 `DocPage` / `DemoCard` / `ApiTable` 结构
- 新增/修改路由需同步更新 `.umirc.ts` 中的 `routes` 配置与左侧导航菜单
