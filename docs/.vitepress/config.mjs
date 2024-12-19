import { defineConfig } from "vitepress";
import { vitepressDemoPlugin } from "vitepress-demo-plugin";
import path from "path";
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "西羽某某",
  description: "子标签",
  lastUpdated: true,
  lang: "zh-CN",
  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }],
    [
      "script",
      {
        defer: "",
        dataDomain: "void9527.github.io",
        src: "https://plausible.io/js/script.outbound-links.js",
      },
    ],
  ],
  base: "/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      { text: "环境配置", link: "/other/environment" },
      {
        text: "代码",
        items: [
          {
            text: "node",
            link: "/code/node",
          },
          {
            text: "java",
            link: "/code/java",
          },
          {
            text: "python",
            link: "/code/python",
          },
          {
            text: "js",
            link: "/code/js",
          },
          {
            text: "css",
            link: "/code/css",
          },
        ],
      },
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
          {
            text: "Typescript",
            link: "/typescript/index",
          },
          { text: "工具", link: "/other/index" },
          {
            text: "杂文",
            link: "/other/doc/",
          },
        ],
      },
      {
        text: "跨平台",
        items: [
          {
            text: "移动端",
            link: "/platform",
          },
          {
            text: "桌面端",
            link: "/platform",
          },
        ],
      },
      {
        text: "面试题",
        link: "/interview/index",
      },
    ],

    sidebar: {
      "/interview/": [
        {
          text: "浏览器",
          link: "/interview/browser",
        },
        {
          text: "网络",
          link: "/interview/http",
        },
        {
          text: "JavaScript",
          link: "/interview/javascript",
        },
        {
          text: "Vue",
          link: "/interview/vue",
        },
        {
          text: "React",
          link: "/interview/react",
        },
        {
          text: "代码规范",
          link: "/interview/standard",
        },
        {
          text: "TypeScript",
          link: "/interview/typescript",
        },
        {
          text: "性能",
          link: "/interview/performance",
        },
        {
          text: "服务端",
          link: "/interview/server",
        },
        {
          text: "微前端",
          link: "/interview/micro_front_end",
        },
      ],
      "/platform/": [
        {
          text: "移动端",
          collapsed: false,
          items: [
            {
              text: "Flutter",
              link: "/platform/flutter/index",
            },
          ],
        },
        {
          text: "pc",
          collapsed: false,
          items: [
            {
              text: "Tauri",
              link: "/platform/tauri/index",
              collapsed: true,
              items: [
                {
                  text: "Pake-Tauri的基础封装",
                  link: "https://github.com/tw93/Pake",
                },
              ],
            },

            {
              text: "Electron",
              link: "/platform/electron/index",
            },
          ],
        },
      ],
      "/vue/": [
        {
          text: "市场",
          link: "http://vue.easydo.work/",
        },
        {
          text: "集成框架",
          items: [{ text: "VBen Admin", link: "https://doc.vben.pro/" }],
        },
        {
          text: "前后一体",
          items: [
            { text: "JeecgBoot", link: "https://help.jeecg.com/" },
            {
              text: "BuildAdmin",
              link: "https://www.buildadmin.com/",
            },
            {
              text: "RuoYi",
              link: "https://doc.ruoyi.vip/",
            },
          ],
        },
        {
          text: "衍生框架",
          items: [
            { text: "Sli.dev", link: "https://cn.sli.dev/" },
            { text: "VitePress", link: "https://vitepress.dev/zh/" },
            { text: "Shiki", link: "https://shiki.tmrs.site/" },
            { text: "shadcn-vue", link: "https://www.shadcn-vue.com/" },
          ],
        },
        {
          text: "UI",
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
          items: [
            {
              text: "vue-kinesis",
              link: "https://www.aminerman.com/kinesis/#/",
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
          link: "/engineering/build",
          items: [],
        },
        {
          text: "任务运行器",
          collapsed: true,
          link: "/engineering/task",
          items: [],
        },
        {
          text: "代码检查和格式化",
          collapsed: true,
          link: "/engineering/lint",
          items: [],
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
          link: "/engineering/version",
          items: [],
        },
        {
          text: "持续集成和持续部署",
          collapsed: true,
          link: "/engineering/cicd",
          items: [
            { text: "Jenkins", link: "https://www.jenkins.io/" },
            { text: "Docker", link: "/engineering/docker" },
          ],
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
          items: [
            { text: "代码块", link: "/code/css/index" },
            {
              text: "动效",
              collapsed: true,
              items: [
                {
                  text: "GASP",
                  link: "https://gsap.com/",
                },
                {
                  text: "Lottie",
                  link: "https://lottiefiles.com/",
                },
              ],
            },
            {
              text: "滚动视差",
              collapsed: true,
              items: [
                {
                  text: "ScrollMagic",
                  link: "https://scrollmagic.io/",
                },
                {
                  text: "Locomotive Scroll",
                  link: "https://locomotivemtl.github.io/locomotive-scroll/",
                },
                {
                  text: "Skrollr",
                  link: "http://prinzhorn.github.io/skrollr/",
                },
                {
                  text: "AOS (Animate On Scroll)",
                  link: "https://michalsnik.github.io/aos/",
                },
              ],
            },
          ],
        },
      ],
      "/other/": [
        {
          text: "工具",
          collapsed: false,
          items: [
            { text: "adb", link: "/other/adb" },
            { text: "brew", link: "/other/brew" },
            { text: "cargo", link: "/other/environment.html#rust" },
            { text: "cocoapods", link: "/other/cocoapods" },
            { text: "git", link: "/other/git" },
            { text: "nvm", link: "/other/nvm" },
            { text: "zx", link: "https://google.github.io/zx/getting-started" },
            {
              text: "Charles",
              link: "https://mp.weixin.qq.com/s/9qRcbhW_lW9CMd0hjaT51A",
            },
          ],
        },
        {
          text: "AI",
          collapsed: false,
          items: [{ text: "UPDF", link: "https://ai.updf.cn/" }],
        },
        {
          text: "浏览器",
          collapsed: false,
          items: [
            {
              text: "Chrome DevTools",
              link: "https://juejin.cn/post/6844903971677536270?utm_source=gold_browser_extension#heading-28",
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
            { text: "WebWorker", link: "/other/doc/webworker" },
            { text: "虚拟化", link: "other/doc/virtualization" },
            {
              text: "程序、进程、线程、协程",
              link: "other/doc/processes_threads_coroutines",
            },
            {
              text: "nodejs与iojs",
              link: "other/doc/node_iojs",
            },
          ],
        },
        {
          text: "服务",
          collapsed: false,
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
          collapsed: false,
          items: [
            {
              text: "目录说明",
              link: "/linux/",
            },
            {
              text: "Linux 常用命令",
              link: "https://wangchujiang.com/linux-command/",
            },
          ],
        },
        {
          text: "算法",
          collapsed: false,
          items: [{ text: "Hello 算法", link: "https://www.hello-algo.com/" }],
        },
        {
          text: "工具",
          collapsed: false,
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
    config(md) {
      md.use(vitepressDemoPlugin, {
        demoDir: path.resolve(__dirname, "../demo"),
      });
    },
    theme: {
      dark: "github-dark",
      light: "github-light",
    },
  },
});
