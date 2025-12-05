---
outline: deep
---
# Prettier

## 推荐配置

:::details

```js
/** @type {import('prettier').Config} */
const config = {
  'tabWidth': 2,
  'useTabs': false,
  'semi': true,
  'singleQuote': true,
  'quoteProps': 'as-needed',
  'jsxSingleQuote': false,
  'trailingComma': 'es5',
  'bracketSpacing': true,
  'jsxBracketSameLine': false,
  'arrowParens': 'always',
  'endOfLine': 'auto', 
  'printWidth': 200
};
module.exports = config;
```

:::

## Prettier 3.5.3 配置参数

| 参数 | 默认值 | 描述 |
|------|--------|------|
| arrowParens | "always" | 箭头函数参数周围包含圆括号，可选值："always"、"avoid" |
| bracketSameLine | false | 将多行HTML元素的>放在最后一行的末尾，而不是单独放在下一行 |
| bracketSpacing | true | 在对象字面量的括号之间添加空格 |
| embeddedLanguageFormatting | "auto" | 是否格式化文件中嵌入的代码，可选值："auto"、"off" |
| endOfLine | "lf" | 行尾换行符，可选值："lf"、"crlf"、"cr"、"auto" |
| experimentalTernaries | false | 是否启用实验性的三元表达式格式化 |
| htmlWhitespaceSensitivity | "css" | HTML空白敏感度，可选值："css"、"strict"、"ignore" |
| insertPragma | false | 是否在格式化的文件顶部插入@format标记 |
| jsxSingleQuote | false | 在JSX中使用单引号代替双引号 |
| printWidth | 80 | 指定每行代码的最大字符宽度 |
| proseWrap | "preserve" | 如何处理markdown文本换行，可选值："always"、"never"、"preserve" |
| quoteProps | "as-needed" | 对象属性名称是否使用引号，可选值："as-needed"、"consistent"、"preserve" |
| requirePragma | false | 是否要求文件顶部有特殊注释才格式化 |
| semi | true | 在语句末尾添加分号 |
| singleAttributePerLine | false | 是否强制每行只有一个HTML/JSX属性 |
| singleQuote | false | 使用单引号代替双引号 |
| tabWidth | 2 | 指定每个缩进级别的空格数 |
| trailingComma | "es5" | 多行时尾随逗号的方式，可选值："none"、"es5"、"all" |
| useTabs | false | 使用制表符而不是空格缩进行 |
| vueIndentScriptAndStyle | false | 是否缩进Vue文件中的script和style标签 |

## CLI 参数

| 参数 | 默认值 | 描述 |
|------|--------|------|
| cache | false | 是否启用格式化缓存以提高性能 |
| check | false | 检查文件是否已格式化，而不实际格式化 |
| configPath | null | 指定配置文件的路径 |
| editorconfig | true | 是否读取.editorconfig文件的配置 |
| ignorePath | .prettierignore | 指定忽略文件的配置文件路径 |
| listDifferent | false | 列出需要格式化的文件，而不实际格式化 |
| loglevel | "log" | 日志级别，可选值："error"、"warn"、"log"、"debug"、"silent" |
| overrides | [] | 为特定文件指定不同的格式化规则 |
| plugins | [] | 指定要使用的Prettier插件列表 |
| resolveConfig | true | 是否自动解析配置文件 |
| withNodeModules | false | 是否格式化node_modules目录中的文件 |
| write | false | 是否将格式化结果写入文件 |

## 解析器配置

| 参数 | 默认值 | 描述 |
|------|--------|------|
| parser.angular | null | Angular专用解析器配置 |
| parser.babel | null | Babel专用解析器配置 |
| parser.css | null | CSS专用解析器配置 |
| parser.flow | null | Flow专用解析器配置 |
| parser.graphql | null | GraphQL专用解析器配置 |
| parser.html | null | HTML专用解析器配置 |
| parser.json | null | JSON专用解析器配置 |
| parser.markdown | null | Markdown专用解析器配置 |
| parser.typescript | null | TypeScript专用解析器配置 |
| parser.vue | null | Vue专用解析器配置 |
| parser.yaml | null | YAML专用解析器配置 |
