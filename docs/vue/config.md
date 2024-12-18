---
outline: deep
---

# Vue3 工程化配置

## Package.json

:::details
::: code-group

```json [package.json]
{
  "name": "vue-ts",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "engines": {
    "node": ">=20.14.0",
    "pnpm": ">=9.0.0"
  },
  "scripts": {
    "dev": "vite",
    "dev:dev": "vite --mode dev",
    "build:check": "vite build --mode check",
    "build": "run-p type-check \"build-only {@}\" --",
    "preview": "vite preview",
    "build-only": "vite build",
    "type-check": "vue-tsc --build --force",
    "lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix",
    "lint/stylelint": "stylelint '**/*.{css,scss,vue,html}' --fix",
    "format": "prettier --write src/",
    "prepare": "husky",
    "lint:lint-staged": "lint-staged",
    "commit": "git-cz"
  },
  "dependencies": {
    "element-plus": "^2.7.6",
    "pinia": "^2.1.7",
    "pinia-plugin-persistedstate": "^3.2.1",
    "vue": "^3.4.29",
    "vue-router": "^4.3.3"
  },
  "devDependencies": {
    "@commitlint/cli": "^19.3.0",
    "@commitlint/config-conventional": "^19.2.2",
    "@iconify-json/ep": "^1.1.15",
    "@rushstack/eslint-patch": "^1.8.0",
    "@tsconfig/node20": "^20.1.4",
    "@types/node": "^20.14.5",
    "@unocss/preset-rem-to-px": "^0.61.0",
    "@unocss/transformer-directives": "^0.61.0",
    "@vitejs/plugin-vue": "^5.0.5",
    "@vitejs/plugin-vue-jsx": "^4.0.0",
    "@vue/eslint-config-prettier": "^9.0.0",
    "@vue/eslint-config-typescript": "^13.0.0",
    "@vue/tsconfig": "^0.5.1",
    "autoprefixer": "^10.4.19",
    "commitizen": "^4.3.0",
    "consola": "^3.2.3",
    "cz-git": "^1.9.3",
    "eslint": "^8.57.0",
    "eslint-config-airbnb-base": "^15.0.0",
    "eslint-import-resolver-typescript": "^3.6.1",
    "eslint-plugin-vue": "^9.23.0",
    "husky": "^9.0.11",
    "lint-staged": "^15.2.7",
    "npm-run-all2": "^6.2.0",
    "postcss": "^8.4.39",
    "postcss-html": "^1.7.0",
    "postcss-scss": "^4.0.9",
    "prettier": "^3.2.5",
    "rollup-plugin-visualizer": "^5.12.0",
    "sass": "^1.77.6",
    "stylelint": "^16.6.1",
    "stylelint-config-html": "^1.1.0",
    "stylelint-config-recess-order": "^5.0.1",
    "stylelint-config-recommended-scss": "^14.0.0",
    "stylelint-config-recommended-vue": "^1.5.0",
    "stylelint-config-standard": "^36.0.1",
    "typescript": "~5.4.0",
    "unocss": "^0.61.0",
    "unplugin-auto-import": "^0.17.6",
    "unplugin-vue-components": "^0.27.2",
    "vite": "^5.3.1",
    "vite-plugin-compression": "^0.5.1",
    "vite-plugin-restart": "^0.4.1",
    "vite-plugin-style-import": "^2.0.0",
    "vite-plugin-vue-devtools": "^7.3.1",
    "vue-tsc": "^2.0.21"
  },
  "config": {
    "commitizen": {
      "path": "node_modules/cz-git"
    }
  }
}

```

```yaml [.env]
VITE_APP_TITLE = 环境变量设置title
VITE_APP_BASE_API = /api
VITE_APP_PORT= 3600
VITE_APP_BASE_URL = 变量设置baseUrl
VITE_APP_BASE_URL_PROD = 变量设置baseUrlProd
VITE_APP_GZIP = true
VITE_APP_VISUALIZER = false
```

```yaml [.env.check]
VITE_APP_GZIP = false
VITE_APP_VISUALIZER = true
```

```yaml [.env.dev]
VITE_APP_TITLE = dev环境
VITE_APP_BASE_API = /api
VITE_APP_BASE_URL = 变量设置baseUrl
VITE_APP_BASE_URL_PROD = 变量设置baseUrlProd

```

```yaml [.env.prod]
VITE_APP_TITLE = prod环境
VITE_APP_BASE_API = /api
VITE_APP_BASE_URL = 变量设置baseUrl
VITE_APP_BASE_URL_PROD = 变量设置baseUrlProd
```

```yaml [.env.test]
VITE_APP_TITLE = test环境
VITE_APP_GZIP = false
VITE_APP_VISUALIZER = true
```

:::

## Vite

:::details

::: code-group

```ts [vite.config.ts]
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'

import { useBuild } from './build/build'
import { usePlugins } from './build/plugins'
import { useServer } from './build/server'
import { wrapperEnv } from './build/utils'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const isBuild = command === 'build'
  const root = process.cwd()
  const env = loadEnv(mode, root)
  const viteEnv = wrapperEnv(env)

  return {
    plugins: usePlugins(isBuild, viteEnv),
    build: useBuild(viteEnv),
    server: useServer(viteEnv),
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    esbuild: {
      pure: viteEnv.VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : []
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "./src/styles/mixin.scss" as *; @use "./src/styles/var.scss" as *;`
        }
      }
    }
  }
})

```

```ts [./build/build.ts]
import type { UserConfig } from 'vite'

// eslint-disable-next-line no-unused-vars
export const useBuild = (viteEnv: ImportMetaEnv) => {
  const config: UserConfig['build'] = {
    // 10kb以下，转Base64
    assetsInlineLimit: 1024 * 10,
    // chunksizewarningLimit:1500,//配置文件大小提醒限制，默认500
    rollupOptions: {
      output: {
        // 每个node_modules模块分成一个js文件
        manualChunks(id: string) {
          if (id.includes('node_modules')) {
            // 把第三方依赖抽离出来 or第三方依赖合并在一起
            return viteEnv.VITE_APP_VISUALIZER
              ? id.toString().split('node_modules/.pnpm/')[1].split('/')[0].toString()
              : 'vendor'
          }
          return undefined
        }, // 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容hash值
        entryFileNames: 'assets/js/[name].[hash].js', // 用于命名代码拆分时创建的共享块的输出命名
        chunkFileNames: 'assets/js/[name].[hash].js', // 用于输出静态资源的命名,[ext]表示文件扩展名
        assetFileNames: 'assets/[ext]/[name].[hash].[ext]'
      }
    }
  }
  return config
}

```

```ts [./build/plugins.ts]
import type { UserConfig } from 'vite'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import { autoImportAndComponents } from './autoImportAndComponents'
import { useCompression } from './compression'
import { useRestart } from './restart'
import { useUnocss } from './unocss'
import { useVisualizer } from './visualizer'
import { useVueDevTools } from './vueDevTools'

export const usePlugins = (isBuild: boolean, viteEnv: ImportMetaEnv) => {
  const plugins: UserConfig['plugins'] = [vue(), vueJsx()]
  plugins.push(...autoImportAndComponents())
  plugins.push(useUnocss())

  // 开发环境
  if (!isBuild) {
    plugins.push(useRestart())
  }

  if (isBuild) {
    viteEnv.VITE_APP_GZIP && plugins.push(useCompression())
    viteEnv.VITE_APP_VISUALIZER && plugins.push(useVisualizer())
  }
  return plugins
}

```

```ts [./build/server.ts]
import type { UserConfig } from 'vite'

export const useServer = (viteEnv: ImportMetaEnv) => {
  const config: UserConfig['server'] = {
    // 监听所有公共ip
    host: '0.0.0.0',
    cors: true,
    port: viteEnv.VITE_APP_PORT,
    proxy: {
      // 前缀
      '/api': {
        target: 'http://www.example.com',
        changeOrigin: true,
        // 前缀重写
        rewrite: (path: string) => path.replace(/^\/api/, '/api')
      }
    }
  }
  return config
}

```

```ts [./build/utils.ts]
/* eslint-disable */
/**
 * 封装环境配置信息。
 *
 * 该函数用于处理和转换传入的环境配置对象，将其转换为适合于进程环境变量的形式。
 * 同时，也将处理一些特殊配置项的转换，如端口号的数字转换、代理配置的JSON解析等。
 *
 * @param envConf 环境配置对象，包含需要设置的环境变量及其值。
 * @returns 返回处理后的环境配置对象。
 */
export function wrapperEnv(envConf: any) {
  // 初始化返回的对象，用于存储处理后的环境配置。
  const ret: any = {}

  // 遍历传入的环境配置对象，处理每个环境变量。
  for (const envName of Object.keys(envConf)) {
    // 替换环境变量值中的换行符，并处理布尔值字符串。
    let realName = envConf[envName].replace(/\\n/g, '\n')
    realName = realName === 'true' ? true : realName === 'false' ? false : realName

    // 如果环境变量名为VITE_PORT，将其值转换为数字。
    if (envName === 'VITE_PORT') {
      realName = Number(realName)
    }

    // 如果环境变量名为VITE_PROXY且其值不为空，尝试将其值解析为JSON对象。
    if (envName === 'VITE_PROXY' && realName) {
      try {
        realName = JSON.parse(realName.replace(/'/g, '"'))
      } catch (e) {
        realName = ''
      }
    }

    // 将处理后的环境变量及其值存入返回对象。
    ret[envName] = realName

    // 根据环境变量的值的类型，设置进程环境变量。
    if (typeof realName === 'string') {
      process.env[envName] = realName
    } else if (typeof realName === 'object') {
      process.env[envName] = JSON.stringify(realName)
    }
  }

  // 返回处理后的环境配置对象。
  return ret
}

```

:::
::: details plugins
::: code-group

```ts [./autoImportAndComponents.ts]
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { createStyleImportPlugin, ElementPlusResolve } from 'vite-plugin-style-import'

export const autoImportAndComponents = () => {
  return [
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: ['vue', 'vue-router', 'pinia'],
      dts: './types/auto-imports.d.ts',
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json'
      }
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dts: './types/components.d.ts'
    }),
    createStyleImportPlugin({
      resolves: [ElementPlusResolve()],
      libs: [
        {
          libraryName: 'element-plus',
          esModule: true,
          resolveStyle: (name: string) => {
            return `element-plus/theme-chalk/${name}.css`
          }
        }
      ]
    })
  ]
}

```

```ts [./compression.ts]
import vitepluginCompression from 'vite-plugin-compression'
/**
 * @description 压缩
 */
export const useCompression = () =>
  vitepluginCompression({
    verbose: true, // 默认即可
    disable: false, // 开启压缩(不禁用)，默认即可
    deleteOriginFile: false, // 删除源文件
    threshold: 10240, // 压缩前最小文件大小
    algorithm: 'gzip', // 压缩算法
    ext: '.gz' // 文件类型
  })

```

```ts [./restart.ts]
import viteRestart from 'vite-plugin-restart'

export const useRestart = () =>
  viteRestart({
    restart: ['*.config.[jt]s', '**/config/*.[jt]s', '*.config.cjs', './.eslintrc.cjs']
  })

```

```ts [./unocss.ts]
import Unocss from 'unocss/vite'

export const useUnocss = () => Unocss()

```

```ts [./visualizer.ts]
import { visualizer } from 'rollup-plugin-visualizer'

export const useVisualizer = () =>
  visualizer({
    open: true,
    filename: 'stats.html',
    title: '打包分析',
    template: 'treemap', // sunburst
    gzipSize: true,
    brotliSize: true
  })

```

```ts [./vueDevTools.ts]
import vueDevTools from 'vite-plugin-vue-devtools'

export const useVueDevTools = () => vueDevTools()

```

:::

## Eslint

::: details Eslint
::: code-group

```js [.eslintrc.cjs]
/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    'airbnb-base',
    '@vue/eslint-config-prettier/skip-formatting',
    './.eslintrc-auto-import.json'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.vue'],
      rules: {
        'no-undef': 'off',
        'no-unused-vars': 'off',
        'no-bitwise': 'off',
        'no-param-reassign': 'off'
      }
    }
  ],
  settings: {
    'import/resolver': {
      typescript: {
        // eslint-import-resolver-typescript 插件解决@别名问题
        project: './tsconfig.*.json'
      }
    }
  },
  rules: {
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'no-console': 'off',
    'no-unused-expressions': 'off',
    // 对后缀的检测
    'import/extensions': [
      'error',
      'ignorePackages',
      { js: 'never', jsx: 'never', ts: 'never', tsx: 'never' }
    ],
    'import/order': [
      'error',
      {
        /**
         * builtin ：内置模块，如 path，fs等 Node.js内置模块。
         * external ：外部模块，如 lodash ，react 等第三方库。
         * internal ：内部模块，如相对路径的模块、包名前缀为 @ 的模块。
         * unknown ：未知模块，如模块名没有指定扩展名或模块路径缺失扩展名。
         * parent ：父级目录的模块。
         * sibling ：同级目录的模块。
         * index ：当前目录的 index 文件。
         * object ：使用ES6 导入的模块。
         * type ：使用 import type 导入的模块。
         * 默认值 ["builtin", "external", "parent", "sibling", "index"]。
         */
        groups: [
          'type',
          ['builtin', 'external'],
          'internal',
          ['parent', 'sibling'],
          'index',
          'object',
          'unknown'
        ],
        pathGroups: [
          {
            pattern: '../**',
            group: 'parent',
            position: 'after'
          },
          {
            pattern: './*.scss',
            group: 'sibling',
            position: 'after'
          }
        ],
        // 不同组之间是否换行。
        'newlines-between': 'always',
        // 根据字母顺序对每组内的引用进行排序。
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        }
      }
    ]
  }
}

```

``` [.eslintignore]
dist
node_modules
public
.husky
.vscode
.idea
*.sh
*.md
.gitignore

index.html

.eslintrc.cjs
.prettierrc.json
.stylelintrc.cjs
commitlint.config.cjs
pnpm-lock.yaml
```

```json [.eslintrc-auto-import.json]
{
  "globals": {
    "Component": true,
    "ComponentPublicInstance": true,
    "ComputedRef": true,
    "EffectScope": true,
    "ExtractDefaultPropTypes": true,
    "ExtractPropTypes": true,
    "ExtractPublicPropTypes": true,
    "InjectionKey": true,
    "PropType": true,
    "Ref": true,
    "VNode": true,
    "WritableComputedRef": true,
    "acceptHMRUpdate": true,
    "computed": true,
    "createApp": true,
    "createPinia": true,
    "customRef": true,
    "defineAsyncComponent": true,
    "defineComponent": true,
    "defineStore": true,
    "effectScope": true,
    "getActivePinia": true,
    "getCurrentInstance": true,
    "getCurrentScope": true,
    "h": true,
    "inject": true,
    "isProxy": true,
    "isReactive": true,
    "isReadonly": true,
    "isRef": true,
    "mapActions": true,
    "mapGetters": true,
    "mapState": true,
    "mapStores": true,
    "mapWritableState": true,
    "markRaw": true,
    "nextTick": true,
    "onActivated": true,
    "onBeforeMount": true,
    "onBeforeRouteLeave": true,
    "onBeforeRouteUpdate": true,
    "onBeforeUnmount": true,
    "onBeforeUpdate": true,
    "onDeactivated": true,
    "onErrorCaptured": true,
    "onMounted": true,
    "onRenderTracked": true,
    "onRenderTriggered": true,
    "onScopeDispose": true,
    "onServerPrefetch": true,
    "onUnmounted": true,
    "onUpdated": true,
    "provide": true,
    "reactive": true,
    "readonly": true,
    "ref": true,
    "resolveComponent": true,
    "setActivePinia": true,
    "setMapStoreSuffix": true,
    "shallowReactive": true,
    "shallowReadonly": true,
    "shallowRef": true,
    "storeToRefs": true,
    "toRaw": true,
    "toRef": true,
    "toRefs": true,
    "toValue": true,
    "triggerRef": true,
    "unref": true,
    "useAttrs": true,
    "useCssModule": true,
    "useCssVars": true,
    "useLink": true,
    "useRoute": true,
    "useRouter": true,
    "useSlots": true,
    "watch": true,
    "watchEffect": true,
    "watchPostEffect": true,
    "watchSyncEffect": true
  }
}

```

:::

## Prettier

:::details Prettier
::: code-group

```json [.prettier.json]
{
  "$schema": "https://json.schemastore.org/prettierrc",
  "semi": false,
  "tabWidth": 2,
  "singleQuote": true,
  "printWidth": 100,
  "trailingComma": "none"
}

```

``` [.prettierignore]
/dist/*
.local
/node_modules/**

**/*.svg
**/*.sh

/public/*

```

:::

## Stylelint

:::details Stylelint
::: code-group

```js [.stylelintrc.cjs]
module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended-scss',
    'stylelint-config-recommended-vue/scss',
    'stylelint-config-html/vue',
    'stylelint-config-recess-order'
  ],
  //指定不同文件对应的解析器
  overrides: [
    { files: ['**/*.{vue,html}'], customSyntax: 'postcss-html' },
    { files: ['**/*.{css,scss}'], customSyntax: 'postcss-scss' }
  ],
  // 自定义规则
  rules: {
    //允许 global、export 、v-deep等伪类
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'export', 'v-deep', 'deep']
      }
    ],
    'selector-class-pattern': null,
    //'selector-no-vendor-prefix': null.
    //'value-no-vendor-prefix': null,
    //'alpha-value-notation': null,
    'color-function-notation': null,
    //'rule-empty-line-before': null
    'no-descending-specificity': null,
    //'number-leading-zero': null,
    //'declaration-block-no-redundant-longhand-properties': null,
    'font-family-no-missing-generic-family-keyword': null
  }
}
```

``` [.stylelintignore]
/dist/*
/public/*
```

:::

## Commitlint

:::details commitlint.config.cjs

```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-case': [0], // subject大小写不做校验
    // 类型枚举，git提交type必须是以下类型
    'type-enum': [
      // 当前验证的错误级别
      2,
      // 在什么情况下进行验证，always表示一直进行验证
      'always',
      [
        'feat', // 新增功能
        'fix', // 修复缺陷
        'docs', // 文档变更
        'style', // 代码格式（不影响功能，例如空格、分号等格式修正）
        'refactor', // 代码重构（不包括 bug 修复、功能新增）
        'perf', // 性能优化
        'test', // 添加疏漏测试或已有测试改动
        'build', // 构建流程、外部依赖变更（如升级 npm 包、修改 webpack 配置等）
        'ci', // 修改 CI 配置、脚本
        'revert', // 回滚 commit
        'chore' // 对构建过程或辅助工具和库的更改（不影响源文件、测试用例）
      ]
    ]
  },
  prompt: {
    useEmoji: true,
    messages: {
      type: '选择你要提交的类型 :',
      scope: '选择一个提交范围（可选）:',
      customScope: '请输入自定义的提交范围 :',
      subject: '填写简短精炼的变更描述 :\n',
      body: '填写更加详细的变更描述（可选）。使用 "|" 换行 :\n',
      breaking: '列举非兼容性重大的变更（可选）。使用 "|" 换行 :\n',
      footerPrefixesSelect: '选择关联issue前缀（可选）:',
      customFooterPrefix: '输入自定义issue前缀 :',
      footer: '列举关联issue (可选) 例如: #31, #I3244 :\n',
      confirmCommit: '是否提交或修改commit ?'
    },
    types: [
      { value: 'feat', name: 'feat:     新增功能 | A new feature', emoji: '✨' },
      { value: 'fix', name: 'fix:      修复缺陷 | A bug fix', emoji: '🐛' },
      { value: 'docs', name: 'docs:     文档更新 | Documentation only changes', emoji: '📝' },
      {
        value: 'style',
        name: 'style:    代码格式 | Changes that do not affect the meaning of the code',
        emoji: '💄'
      },
      {
        value: 'refactor',
        name: 'refactor: 代码重构 | A code change that neither fixes a bug nor adds a feature',
        emoji: '♻️'
      },
      {
        value: 'perf',
        name: 'perf:     性能提升 | A code change that improves performance',
        emoji: '⚡️'
      },
      {
        value: 'test',
        name: 'test:     测试相关 | Adding missing tests or correcting existing tests',
        emoji: '✅'
      },
      {
        value: 'build',
        name: 'build:    构建相关 | Changes that affect the build system or external dependencies',
        emoji: '📦️'
      },
      {
        value: 'ci',
        name: 'ci:       持续集成 | Changes to our CI configuration files and scripts',
        emoji: '🎡'
      },
      { value: 'revert', name: 'revert:   回退代码 | Revert to a commit', emoji: '🔨' },
      {
        value: 'chore',
        name: 'chore:    其他修改 | Other changes that do not modify src or test files',
        emoji: '⏪️'
      }
    ]
  }
}

```

:::

## Lint-staged

:::details lint-staged.config.cjs

```js
module.exports = {
  '*.{js,ts,jsx,tsx}': ['eslint --fix', 'prettier --write'],
  '*.{cjs,json}': ['prettier --write'],
  '!(package)*.json': ['prettier --write--parser json'],
  'package.json': ['prettier --write'],
  '*.{vue,html}': ['eslint --fix', 'prettier --write', 'stylelint --fix --allow-empty-input'],
  '*.{scss,css}': ['stylelint --fix --allow-empty-input', 'prettier --write']
}
```

:::

## Postcss

:::details postcss.config.cjs

```js
module.exports = {
  plugins: {
    autoprefixer: {}
  }
}

```

:::

## Tsconfig

:::details tsconfig
::: code-group

```json [tsconfig.json]
{
  "files": [],
  "references": [
    {
      "path": "./tsconfig.node.json"
    },
    {
      "path": "./tsconfig.app.json"
    }
  ]
}

```json [tsconfig.app.json]
{
  "extends": "@vue/tsconfig/tsconfig.dom.json",
  "include": ["types", "src/**/*", "src/**/*.vue"],
  "exclude": ["src/**/__tests__/*"],
  "compilerOptions": {
    "composite": true,
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",

    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    "types": ["element-plus/global"]
  }
}

```

```json [tsconfig.node.json]
{
  "extends": "@tsconfig/node20/tsconfig.json",
  "include": [
    "vite.config.*",
    "vitest.config.*",
    "cypress.config.*",
    "nightwatch.conf.*",
    "playwright.config.*",
    "build",
    "types"
  ],
  "compilerOptions": {
    "composite": true,
    "noEmit": true,
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",

    "module": "ESNext",
    "moduleResolution": "Bundler",
    "types": ["node"]
  }
}
```

:::

## UnoCSS

:::details unocss.config.ts

```ts
// 预设rem转px
import presetRemToPx from '@unocss/preset-rem-to-px'
// transformerDirectives 可以使用@apply @screen theme函数
import transformerDirective from '@unocss/transformer-directives'
import {
  defineConfig,
  presetAttributify,
  presetUno,
  transformerVariantGroup,
  presetIcons
} from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetRemToPx({
      baseFontSize: 4
    }),
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle'
      }
    })
  ],
  transformers: [transformerVariantGroup(), transformerDirective()],
  shortcuts: [
    {
      'flex-center': 'flex justify-center items-center',
      'flex-end': 'flex justify-end items-end',
      'flex-between': 'flex justify-between items-center',
      'flex-around': 'flex justify-around items-center',
      'flex-column': 'flex flex-col',
      'flex-column-center': 'flex flex-col justify-center items-center',
      'flex-column-between': 'flex flex-col justify-between items-center',
      'flex-column-around': 'flex flex-col justify-around items-center',
      'flex-column-end': 'flex flex-col justify-end items-end'
    },
    {
      'text-ellipsis': 'overflow-hidden text-ellipsis whitespace-nowrap',
      'text-ellipsis-2': 'overflow-hidden text-ellipsis whitespace-nowrap text-2',
      'text-ellipsis-3': 'overflow-hidden text-ellipsis whitespace-nowrap text-3'
    }
  ]
})

```

:::

## Husky

```bash
npx husky add .husky/commit-msg 'npx commitlint --edit $1'
```

:::details .husky
::: code-group

```js [pre-commit]
npm run lint:lint-staged --allow-empty
```

```js [commit-msg]
npx --no -- commitlint --edit $1
```

:::
