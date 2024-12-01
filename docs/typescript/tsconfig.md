---
outline: 1
---

# 顶层配置

| 配置名称 | 默认值 | 说明 |
| :-------- | :----- | :--- |
|[files](https://ts.nodejs.cn/tsconfig/#files)|false| 待编译文件列表 |
|[extends](https://ts.nodejs.cn/tsconfig/#extends)|false| 继承配置文件 |
|[include](https://ts.nodejs.cn/tsconfig/#include)|false| 待编译文件 glob 模式列表 |
|[exclude](https://ts.nodejs.cn/tsconfig/#exclude)|false| 排除文件 glob 模式列表 |
|[references](https://ts.nodejs.cn/tsconfig/#references)|false| 引用配置文件列表 |

# 类型检查

| 配置名称                           | 默认值    | 说明                          |
| :--------------------------------- | :-------- | :---------------------------- |
| [allowUnreachableCode](https://ts.nodejs.cn/tsconfig/#allowUnreachableCode) | undefined | 允许代码块内未使用的代码      |
| [allowUnusedLabels](https://ts.nodejs.cn/tsconfig/#allowUnusedLabels) | undefined | 允许未使用的标签              |
| [alwaysStrict](https://ts.nodejs.cn/tsconfig/#alwaysStrict) | undefined | 启用严格模式                  |
| [exactOptionalPropertyTypes](https://ts.nodejs.cn/tsconfig/#exactOptionalPropertyTypes) | undefined | 启用精确可选属性类型          |
| [noFallthroughCasesInSwitch](https://ts.nodejs.cn/tsconfig/#noFallthroughCasesInSwitch) | undefined | 禁止 switch 语句 fallthrough  |
| [noImplicitAny](https://ts.nodejs.cn/tsconfig/#noImplicitAny) | true      | 禁止隐式 any 类型             |
| [noImplicitOverride](https://ts.nodejs.cn/tsconfig/#noImplicitOverride) | undefined | 禁止使用 override 修饰符      |
| [noImplicitReturns](https://ts.nodejs.cn/tsconfig/#noImplicitReturns) | undefined | 禁止隐式返回类型              |
| [noImplicitThis](https://ts.nodejs.cn/tsconfig/#noImplicitThis) | true      | 禁止隐式 this 类型            |
| [noPropertyAccessFromIndexSignature](https://ts.nodejs.cn/tsconfig/#noPropertyAccessFromIndexSignature) | undefined | 禁止通过索引签名访问属性      |
| [noUncheckedIndexedAccess](https://ts.nodejs.cn/tsconfig/#noUncheckedIndexedAccess) | undefined | 禁止使用未检查的索引访问      |
| [noUnusedLocals](https://ts.nodejs.cn/tsconfig/#noUnusedLocals) | undefined | 禁止未使用的局部变量          |
| [noUnusedParameters](https://ts.nodejs.cn/tsconfig/#noUnusedParameters) | undefined | 禁止未使用的参数              |
| [strict](https://ts.nodejs.cn/tsconfig/#strict) | undefined | 启用严格模式                  |
| [strictBindCallApply](https://ts.nodejs.cn/tsconfig/#strictBindCallApply) | true      | 启用严格绑定调用和应用        |
| [strictBuiltinIteratorReturn](https://ts.nodejs.cn/tsconfig/#strictBuiltinIteratorReturn) | false     | 启用严格内置迭代器返回        |
| [strictFunctionTypes](https://ts.nodejs.cn/tsconfig/#strictFunctionTypes) | true      | 启用严格函数类型              |
| [strictNullChecks](https://ts.nodejs.cn/tsconfig/#strictNullChecks) | true      | 启用严格空检查                |
| [strictPropertyInitialization](https://ts.nodejs.cn/tsconfig/#strictPropertyInitialization) | true      | 启用严格属性初始化            |
| [useUnknownInCatchVariables](https://ts.nodejs.cn/tsconfig/#useUnknownInCatchVariables) | true      | 启用未知类型在 catch 块中变量 |

# 模块

| 配置名称                     | 默认值    | 说明                      |
| :--------------------------- | :-------- | :------------------------ |
| [allowArbitraryExtensions](https://ts.nodejs.cn/tsconfig/#allowArbitraryExtensions) | true      | 允许使用任意扩展名        |
| [allowImportingTsExtensions](https://ts.nodejs.cn/tsconfig/#allowImportingTsExtensions) | undefined | 允许导入 .ts 文件         |
| [allowUmdGlobalAccess](https://ts.nodejs.cn/tsconfig/#allowUmdGlobalAccess) | undefined | 允许访问 UMD 全局变量     |
| [baseUrl](https://ts.nodejs.cn/tsconfig/#baseUrl) | undefined | 模块解析的根目录          |
| [customConditions](https://ts.nodejs.cn/tsconfig/#customConditions) | undefined | 自定义条件                |
| [module](https://ts.nodejs.cn/tsconfig/#module) | CommonJS  | 模块类型                  |
| [moduleResolution](https://ts.nodejs.cn/tsconfig/#moduleResolution) | Classic   | 模块解析策略              |
| [moduleSuffixes](https://ts.nodejs.cn/tsconfig/#moduleSuffixes) | undefined | 模块后缀                  |
| [noResolve](https://ts.nodejs.cn/tsconfig/#noResolve) | false     | 禁止解析模块              |
| [noUncheckedSideEffectImports](https://ts.nodejs.cn/tsconfig/#noUncheckedSideEffectImports) | undefined | 禁止未检查的副作用导入    |
| [paths](https://ts.nodejs.cn/tsconfig/#paths) | undefined | 路径映射`覆盖baseUrl`     |
| [resolveJsonModule](https://ts.nodejs.cn/tsconfig/#resolveJsonModule) | undefined | 解析 json 模块            |
| [resolvePackageJsonExports](https://ts.nodejs.cn/tsconfig/#resolvePackageJsonExports) | true      | 解析 package.json exports |
| [resolvePackageJsonImports](https://ts.nodejs.cn/tsconfig/#resolvePackageJsonImports) | true      | 解析 package.json imports |
| [rootDir](https://ts.nodejs.cn/tsconfig/#rootDir) | undefined | 根目录                    |
| [rootDirs](https://ts.nodejs.cn/tsconfig/#rootDirs) | undefined | 根目录列表                |
| [typeRoots](https://ts.nodejs.cn/tsconfig/#typeRoots) | undefined | 类型根目录列表            |
| [types](https://ts.nodejs.cn/tsconfig/#types) | undefined | 类型列表                  |

# 触发

| 配置名称            | 默认值    | 说明                 |
| :------------------ | :-------- | :------------------- |
| [declaration](https://ts.nodejs.cn/tsconfig/#declaration) | true      | 生成声明文件         |
| [declarationDir](https://ts.nodejs.cn/tsconfig/#declarationDir) | undefined | 声明文件输出目录     |
| [declarationMap](https://ts.nodejs.cn/tsconfig/#declarationMap) | undefined | 生成声明文件映射文件 |
| [downlevelIteration](https://ts.nodejs.cn/tsconfig/#downlevelIteration) | undefined | 降级迭代器           |
| [emitBOM](https://ts.nodejs.cn/tsconfig/#emitBOM) | false     | 生成 BOM             |
| [emitDeclarationOnly](https://ts.nodejs.cn/tsconfig/#emitDeclarationOnly) | undefined | 只生成声明文件       |
| [importHelpers](https://ts.nodejs.cn/tsconfig/#importHelpers) | undefined | 导入帮助程序         |
| [inlineSourceMap](https://ts.nodejs.cn/tsconfig/#inlineSourceMap) | undefined | 内联 sourceMap       |
| [inlineSources](https://ts.nodejs.cn/tsconfig/#inlineSources) | undefined | 内联源码             |
| [mapRoot](https://ts.nodejs.cn/tsconfig/#mapRoot) | undefined | sourceMap 根目录     |
| [newLine](https://ts.nodejs.cn/tsconfig/#newLine) | lf        | 换行符               |
| [noEmit](https://ts.nodejs.cn/tsconfig/#noEmit) | undefined | 不生成文件           |
| [noEmitHelpers](https://ts.nodejs.cn/tsconfig/#noEmitHelpers) | undefined | 不生成帮助程序       |
| [noEmitOnError](https://ts.nodejs.cn/tsconfig/#noEmitOnError) | undefined | 编译错误不生成文件   |
| [outDir](https://ts.nodejs.cn/tsconfig/#outDir) | undefined | 输出目录             |
| [outFile](https://ts.nodejs.cn/tsconfig/#outFile) | undefined | 输出文件             |
| [preserveConstEnums](https://ts.nodejs.cn/tsconfig/#preserveConstEnums) | true      | 保留常量枚举         |
| [removeComments](https://ts.nodejs.cn/tsconfig/#removeComments) | false     | 移除注释             |
| [sourceMap](https://ts.nodejs.cn/tsconfig/#sourceMap) | undefined | 生成 sourceMap       |
| [sourceRoot](https://ts.nodejs.cn/tsconfig/#sourceRoot) | undefined | sourceMap 根目录     |
| [stripInternal](https://ts.nodejs.cn/tsconfig/#stripInternal) | undefined | 移除内部             |

# JavaScript 支持

| 配置名称             | 默认值    | 说明                         |
| :------------------- | :-------- | :--------------------------- |
| [allowJs](https://ts.nodejs.cn/tsconfig/#allowJs) | false     | 允许 JavaScript              |
| [checkJs](https://ts.nodejs.cn/tsconfig/#checkJs) | undefined | 检查 JavaScript              |
| [maxNodeModuleJsDepth](https://ts.nodejs.cn/tsconfig/#maxNodeModuleJsDepth) | undefined | Node.js 模块 JavaScript 层数 |

# 编辑器支持

| 配置名称         | 默认值    | 说明         |
| :--------------- | :-------- | :----------- |
| [disableSizeLimit](https://ts.nodejs.cn/tsconfig/#disableSizeLimit) | undefined | 禁用大小限制 |
| [plugins](https://ts.nodejs.cn/tsconfig/#plugins) | undefined | 插件         |

# 互操作约束

| 配置名称                         | 默认值    | 说明                   |
| :------------------------------- | :-------- | :--------------------- |
| [allowSyntheticDefaultImports](https://ts.nodejs.cn/tsconfig/#allowSyntheticDefaultImports) | true      | 允许合成默认导入       |
| [esModuleInterop](https://ts.nodejs.cn/tsconfig/#esModuleInterop) | true      | ES 模块互操作          |
| [forceConsistentCasingInFileNames](https://ts.nodejs.cn/tsconfig/#forceConsistentCasingInFileNames) | true      | 强制文件名大小写一致性 |
| [isolatedModules](https://ts.nodejs.cn/tsconfig/#isolatedModules) | true      | 模块隔离               |
| [preserveSymlinks](https://ts.nodejs.cn/tsconfig/#preserveSymlinks) | undefined | 保留符号链接           |
| [verbatimModuleSyntax](https://ts.nodejs.cn/tsconfig/#verbatimModuleSyntax) | undefined | 模块语法               |

# 语言和环境

| 配置名称                | 默认值    | 说明           |
| :---------------------- | :-------- | :------------- |
| [JSX](https://ts.nodejs.cn/tsconfig/#JSX) | preserve  | 保留 JSX       |
| [jsxFactory](https://ts.nodejs.cn/tsconfig/#jsxFactory) | undefined | JSX 工厂       |
| [jsxFragmentFactory](https://ts.nodejs.cn/tsconfig/#jsxFragmentFactory) | undefined | JSX 片段工厂   |
| [jsxImportSource](https://ts.nodejs.cn/tsconfig/#jsxImportSource) | react     | JSX 导入源     |
| [lib](https://ts.nodejs.cn/tsconfig/#lib) | undefined | 库             |
| [moduleDetection](https://ts.nodejs.cn/tsconfig/#moduleDetection) | auto      | 模块检测       |
| [noLib](https://ts.nodejs.cn/tsconfig/#noLib) | undefined | 不包含库       |
| [reactNamespace](https://ts.nodejs.cn/tsconfig/#reactNamespace) | React     | React 命名空间 |
| [target](https://ts.nodejs.cn/tsconfig/#target) | es5       | 目标           |
| [useDefineForClassFields](https://ts.nodejs.cn/tsconfig/#useDefineForClassFields) | true      | 使用定义类字段 |

# 项目

| 配置名称                                | 默认值       | 说明               |
| :-------------------------------------- | :----------- | :----------------- |
| [composite](https://ts.nodejs.cn/tsconfig/#composite) | undefined    | 组合               |
| [disableReferencedProjectLoad](https://ts.nodejs.cn/tsconfig/#disableReferencedProjectLoad) | undefined    | 禁用引用项目加载   |
| [disableSolutionSearching](https://ts.nodejs.cn/tsconfig/#disableSolutionSearching) | undefined    | 禁用解决方案搜索   |
| [disableSourceOfProjectReferenceRedirect](https://ts.nodejs.cn/tsconfig/#disableSourceOfProjectReferenceRedirect) | undefined    | 禁用项目引用重定向 |
| [incremental](https://ts.nodejs.cn/tsconfig/#incremental) | true         | 增量               |
| [tsBuildInfoFile](https://ts.nodejs.cn/tsconfig/#tsBuildInfoFile) | .tsbuildinfo | ts 构建信息文件    |

# 输出格式

| 配置名称            | 默认值    | 说明         |
| :------------------ | :-------- | :----------- |
| [noErrorTruncation](https://ts.nodejs.cn/tsconfig/#noErrorTruncation) | undefined | 不截断错误   |
| [preserveWatchOutput](https://ts.nodejs.cn/tsconfig/#preserveWatchOutput) | undefined | 保留监视输出 |
| [pretty](https://ts.nodejs.cn/tsconfig/#pretty) | undefined | 代码高亮     |

# 完整性

| 配置名称     | 默认值    | 说明       |
| :----------- | :-------- | :--------- |
| [skipLibCheck](https://ts.nodejs.cn/tsconfig/#skipLibCheck) | undefined | 跳过库检查 |

# 类型获取 typeAcquisition

| 配置名称 | 默认值    | 说明 |
| :------- | :-------- | :--- |
| [enable](https://ts.nodejs.cn/tsconfig/#enable) | undefined | 启用 |
| [include](https://ts.nodejs.cn/tsconfig/#include) | undefined | 包含 |
| [exclude](https://ts.nodejs.cn/tsconfig/#exclude) | undefined | 排除 |
