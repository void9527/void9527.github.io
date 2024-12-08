import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "西羽某某",
  description: "子标签",
  lastUpdated: true,
  lang: "zh-CN",
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  base: "/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      { text: "字典", link: "/dict/" },
      { text: "代码", link: "/code/node" },
      {
        text: "工程化",
        items: [
          { text: "简介", link: "/engineering/index" },
          { text: "构建系统", link: "/engineering/build" },
          { text: "任务运行器", link: "/engineering/task" },
          { text: "代码检查和格式化", link: "/engineering/lint" },
          { text: "测试框架", link: "/engineering/test" },
          { text: "版本控制系统", link: "/engineering/version" },
          { text: "持续集成和持续部署", link: "/engineering/cicd" },
          { text: "依赖管理", link: "/engineering/dependency" },
          { text: "性能优化", link: "/engineering/performance" },
          { text: "文档生成和管理", link: "/engineering/document" },
        ],
      },
      {
        text: "Vue",
        items: [
          { text: "简介", link: "/vue/index" },
          { text: "配置", link: "/vue/config" },
          { text: "Pinia", link: "/vue/pinia" },
        ],
      },
      {
        text: "React",
        items: [
          { text: "简介", link: "/react/index" },
          { text: "配置", link: "/react/config" },
        ],
      },

      {
        text: "文档",
        items: [
          { text: "工具", link: "/other/index" },
          {
            text: "杂文",
            link: "/other/doc/",
          },
          {
            text: "Typescript",
            link: "/typescript/index",
          },
          {
            text: "Flutter",
            link: "/flutter/index",
          },
        ],
      },
    ],

    sidebar: {
      "/flutter/": [
        {
          text: "快速入门",
          collapsed: false,
          items: [],
        },
      ],
      "/vue/": [
        {
          text: "市场",
          link: "http://vue.easydo.work/",
        },
        {
          text: "集成框架",
          collapsed: false,
          items: [{ text: "VBen Admin", link: "https://doc.vben.pro/" }],
        },
        {
          text: "前后一体",
          collapsed: true,
          items: [{ text: "JeecgBoot", link: "https://help.jeecg.com/" }],
        },
        {
          text: "衍生框架",
          collapsed: true,
          items: [
            { text: "Sli.dev", link: "https://cn.sli.dev/" },
            { text: "VitePress", link: "https://vitepress.dev/zh/" },
            { text: "Shiki", link: "https://shiki.tmrs.site/" },
            { text: "shadcn-vue", link: "https://www.shadcn-vue.com/" },
          ],
        },
        {
          text: "UI",
          collapsed: true,
          items: [
            { text: "市场", link: "https://ui-libs.vercel.app/" },
            {
              text: "shadcn-ui",
              link: "https://www.shadcn.com.cn/",
            },
          ],
        },
        {
          text: "动效",
          collapsed: true,
          items: [
            {
              text: "vue-kinesis",
              link: "https://www.aminerman.com/kinesis/#/",
            },
            {
              text: "GASP",
              link: "https://gsap.com/",
            },
          ],
        },
      ],
      "/react/": [
        {
          text: "集成框架",
          collapsed: false,
          items: [
            { text: "Next.js", link: "https://nextjs.org/" },
            { text: "Astro", link: "https://astro.build/" },
            { text: "Remix", link: "https://remix.run/" },
            { text: "Gatsby", link: "https://www.gatsbyjs.com/" },
          ],
        },
        {
          text: "状态管理",
          collapsed: false,
          items: [
            { text: "Redux", link: "https://redux.js.org/" },
            { text: "Mobx", link: "https://mobx.js.org/" },
            { text: "Recoil", link: "https://recoiljs.org/" },
            { text: "Zustand", link: "https://zustand.docschina.org/" },
          ],
        },
      ],
      "/engineering/": [
        {
          text: "构建系统",
          collapsed: false,
          items: [
            { text: "Vite", link: "https://cn.vite.dev/" },
            { text: "Webpack", link: "https://webpack.docschina.org/" },
            { text: "Rollup", link: "https://rollupjs.org/zh/" },
            { text: "Parcel", link: "https://www.parceljs.org/" },
            { text: "RollDown", link: "https://rolldown.rs/guide/" },
            { text: "esbuild", link: "https://esbuild.github.io/" },
          ],
        },
        {
          text: "任务运行器",
          collapsed: true,
          items: [
            { text: "Gulp", link: "https://gulpjs.com.cn/" },
            { text: "Grunt", link: "https://gruntjs.com/" },
            {
              text: "npm-run-all",
              link: "https://www.npmjs.com/package/npm-run-all",
            },
            { text: "fis3", link: "https://fis.js.org/" },
          ],
        },
        {
          text: "代码检查和格式化",
          collapsed: true,
          items: [
            { text: "ESLint", link: "https://eslint.org/" },
            { text: "Prettier", link: "https://prettier.io/" },
            { text: "Stylelint", link: "https://stylelint.io/" },
            {
              text: "lint-staged",
              link: "https://github.com/okonet/lint-staged",
            },
            { text: "commitlint", link: "https://commitlint.js.org/" },
            { text: "cspell", link: "https://cspell.org/" },
          ],
        },
        {
          text: "体验优化",
          collapsed: true,
          items: [
            {
              text: "新手引导",
              link: "https://github.com/kamranahmedse/driver.js",
            },
          ],
        },
        {
          text: "测试框架",
          collapsed: true,
          items: [{ text: "Vitest", link: "https://cn.vitest.dev/" }],
        },
        {
          text: "版本控制系统",
          collapsed: true,
          items: [
            { text: "git", link: "https://git-scm.com/book/zh/v2" },
            { text: "cz-git", link: "https://cz-git.qbb.sh/zh/" },
          ],
        },
        {
          text: "持续集成和持续部署",
          collapsed: true,
          items: [{ text: "Jenkins", link: "https://www.jenkins.io/" }],
        },
        {
          text: "依赖管理",
          collapsed: true,
          items: [
            { text: "npm", link: "https://docs.npmjs.com/" },
            { text: "pnpm", link: "http://pnpm.io/" },
            { text: "yarn", link: "https://yarnpkg.com/" },
            { text: "bun", link: "https://bun.sh/" },
          ],
        },
        {
          text: "性能优化",
          collapsed: true,
          items: [{ text: "home", link: "/engineering/performance" }],
        },
        {
          text: "文档生成和管理",
          collapsed: true,
          items: [
            { text: "JSDoc", link: "https://www.shouce.ren/api/view/a/13308" },
            { text: "TSDoc", link: "https://typedoc.org/" },
          ],
        },
      ],
      "/typescript/": [
        {
          text: "基础用法",
          collapsed: false,
          items: [
            { text: "类型推导", link: "/typescript/index" },
            { text: "辅助指令", link: "/typescript/func" },
            { text: "配置文件", link: "/typescript/tsconfig" },
            { text: "其他", link: "/typescript/qa" },
          ],
        },
        {
          text: "与Vue3库",
          collapsed: false,
          items: [
            { text: "Vue3", link: "/typescript/vue3" },
            { text: "router", link: "/markdown-examples" },
            { text: "pinia", link: "/markdown-examples" },
          ],
        },
        {
          text: "与其他库",
          collapsed: false,
          items: [{ text: "axios", link: "/markdown-examples" }],
        },
      ],
      "/code/": [
        {
          text: "node",
          collapsed: false,
          items: [{ text: "代码块", link: "/code/node/index" }],
        },
        {
          text: "java",
          collapsed: true,
          items: [{ text: "代码块", link: "/code/java/index" }],
        },
        {
          text: "python",
          collapsed: true,
          items: [{ text: "代码块", link: "/code/python/index" }],
        },
        {
          text: "js",
          collapsed: true,
          items: [{ text: "代码块", link: "/code/js/index" }],
        },
        {
          text: "css",
          collapsed: true,
          items: [{ text: "代码块", link: "/code/css/index" }],
        },
      ],
      "/other/": [
        {
          text: "工具",
          collapsed: false,
          items: [
            { text: "adb", link: "/other/adb" },
            { text: "brew", link: "/other/brew" },
            { text: "git", link: "/other/git" },
            { text: "zx", link: "https://google.github.io/zx/getting-started" },
            {
              text: "Charles",
              link: "https://mp.weixin.qq.com/s/9qRcbhW_lW9CMd0hjaT51A",
            },
          ],
        },
        {
          text: "AI",
          collapsed: true,
          items: [{ text: "UPDF", link: "https://ai.updf.cn/" }],
        },
        {
          text: "浏览器",
          collapsed: true,
          items: [
            {
              text: "Chrome DevTools",
              link: "https://juejin.cn/post/6844903971677536270?utm_source=gold_browser_extension#heading-28",
            },
          ],
        },
        {
          text: "桌面客户端",
          collapsed: true,
          items: [
            {
              text: "【Pake】Rust构建客户端",
              link: "https://github.com/tw93/Pake",
            },
            {
              text: "【Tauri】Rust构建客户端",
              link: "https://tauri.app/",
            },
            {
              text: "【Electron】JS构建客户端",
              link: "https://www.electronjs.org/",
            },
          ],
        },
      ],
      "/other/doc/": [
        {
          text: "杂文",
          collapsed: false,
          items: [
            { text: "前端权限模型", link: "/other/doc/permission" },
            { text: "后端鉴权模型", link: "/other/doc/role" },
            { text: "数据库中间件", link: "/other/doc/data-base" },
            { text: "HTML5 新增API", link: "/other/doc/h5" },
          ],
        },
        {
          text: "服务",
          collapsed: true,
          items: [
            {
              text: "部署方案",
              link: "https://mp.weixin.qq.com/s?__biz=MzI4MTY5NTk4Ng==&mid=2247489100&idx=1&sn=eab291eb345c074114d946b732e037eb&source=41#wechat_redirect",
            },
            {
              text: "开发方案",
              link: "https://www.cnblogs.com/tianguook/p/4004726.html",
            },
            {
              text: "HTTPD",
              link: "https://blog.51cto.com/u_13570193/2112888",
            },
            {
              text: "OAuth2.0",
              link: "/other/doc/oauth",
            },
          ],
        },
        {
          text: "Linux",
          collapsed: true,
          items: [
            {
              text: "目录说明",
              link: "https://www.cnblogs.com/zhuchenglin/p/8686924.html",
            },
            {
              text: "Linux 常用命令",
              link: "https://wangchujiang.com/linux-command/",
            },
          ],
        },
        {
          text: "算法",
          collapsed: true,
          items: [{ text: "Hello 算法", link: "https://www.hello-algo.com/" }],
        },
        {
          text: "工具",
          collapsed: true,
          items: [
            {
              text: "rustdesk 远程桌面",
              link: "https://rustdesk.com/zh-cn/",
            },
            {
              text: "Stirling PDF处理",
              link: "https://www.stirlingpdf.com/",
            },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: "gitee", link: "https://gitee.com/maYun18600917746" },
      { icon: "github", link: "https://github.com/void9527" },
    ],
    search: {
      provider: "local",
    },
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
  },
  markdown: {
    theme: {
      dark: "github-dark",
      light: "github-light",
    },
  },
});
