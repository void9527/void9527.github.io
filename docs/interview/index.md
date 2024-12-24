---
outline: deep
---
## 8个移动端适配技巧,兼容性问题减少90%

:::details

1. 使用viewport配置，确保完美视口
    移动端开发首先要设置正确的viewport，这是适配的基础。

    ```html
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
    ```

    关键属性解析：
    - width=device-width：将视口宽度设置为设备宽度
    - initial-scale=1.0：初始缩放比例为1
    - user-scalable=no：禁用用户缩放
    - viewport-fit=cover：适配刘海屏
2. 使用rem单位，确保字体大小适配
    rem是相对于根元素（html）的字体大小的单位，可以实现整体布局的弹性缩放。

    ```js
    (function flexible() {
        const docEl = document.documentElement;
        
        function setRemUnit() {
            const rem = docEl.clientWidth / 10;
            docEl.style.fontSize = rem + 'px';
        }

        setRemUnit();
        window.addEventListener('resize', setRemUnit);
        window.addEventListener('orientationchange', setRemUnit);
    })();
    ```

    配套的CSS使用：

    ```css
    html {
        font-size: 10px;
    }
    .container {
        width: 7.5rem;  /* 750px / 100 */
        height: 1rem;   /* 100px / 100 */
        font-size: 0.28rem; /* 28px / 100 */
    }
    ```

3. 使用媒体查询，确保不同设备适配
   使用媒体查询针对不同屏幕尺寸定制样式。

   ```css
    /* iPhone SE */
    @media screen and (max-width: 374px) {
        .container {
            font-size: 14px;
        }
    }

    /* iPhone 6/7/8/X */
    @media screen and (min-width: 375px) and (max-width: 413px) {
        .container {
            font-size: 16px;
        }
    }

    /* iPhone 6/7/8 Plus */
    @media screen and (min-width: 414px) {
        .container {
            font-size: 18px;
        }
    }
    ```

4. 1px边框问题解决方案

   ```css
   .border-1px {
    position: relative;
    &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 1px;
        background-color: #000;
        transform: scaleY(0.5);
        transform-origin: bottom;
        }
    }

    // 2x屏
    @media (-webkit-min-device-pixel-ratio: 2) {
        .border-1px::after {
            transform: scaleY(0.5);
        }
    }

    // 3x屏
    @media (-webkit-min-device-pixel-ratio: 3) {
        .border-1px::after {
            transform: scaleY(0.33);
        }
    }
   ```

5. 安全区域适配
   适配iPhone X等带有刘海的机型

   ```css
    /* 适配刘海屏 */
    .safe-area-inset {
        padding-top: constant(safe-area-inset-top);
        padding-top: env(safe-area-inset-top);
        padding-bottom: constant(safe-area-inset-bottom);
        padding-bottom: env(safe-area-inset-bottom);
    }

    /* 底部固定导航适配 */
    .fixed-bottom {
        position: fixed;
        bottom: 0;
        bottom: constant(safe-area-inset-bottom);
        bottom: env(safe-area-inset-bottom);
    }
   ```

6. 图片适配方案

    ```html
    <!-- 使用srcset适配不同分辨率 -->
    <img srcset="image-320w.jpg 320w,
                image-480w.jpg 480w,
                image-800w.jpg 800w"
        sizes="(max-width: 320px) 280px,
            (max-width: 480px) 440px,
            800px"
        src="image-800w.jpg" alt="Responsive image"> 
    ```

    配合CSS使用

    ```css
    .responsive-image {
        max-width: 100%;
        height: auto;
        display: block;
    }
    ```

7. 横屏适配处理
   处理横屏模式下的布局适配。

   ```css
   /* 检测横屏 */
    @media screen and (orientation: landscape) {
        .landscape-container {
            display: flex;
            flex-direction: row;
        }
    }

    /* 检测竖屏 */
    @media screen and (orientation: portrait) {
        .portrait-container {
            display: flex;
            flex-direction: column;
        }
    }
   ```

   JavaScript监听屏幕旋转：

   ```js
   window.addEventListener('resize', function() {
       if (window.orientation === 90 || window.orientation === -90) {
           // 横屏
       } else {
           // 竖屏
       }
   });
   ```

8. 软键盘弹出处理
   处理软键盘弹出时的页面适配问题

   ```js
   // 监听软键盘
    const originalHeight = document.documentElement.clientHeight;

    window.addEventListener('resize', () => {
        const currentHeight = document.documentElement.clientHeight;
        const input = document.activeElement;
        
        if (originalHeight > currentHeight) {
            // 软键盘弹出
            if (input.tagName === 'INPUT' || input.tagName === 'TEXTAREA') {
                input.scrollIntoView({ block: 'center' });
            }
        } else {
            // 软键盘收起
            window.scrollTo(0, 0);
        }
    });
   ```

   ```css
   /* 软键盘弹出时，调整页面布局 */
   /* 防止键盘顶起页面 */
    .container {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
    }
   ```

:::

## 前端工程化的理解

::: details
前端工程化是指在前端开发过程中，通过一系列工具、技术和最佳实践来提高开发效率、代码质量和项目可维护性的一种方法论。它涉及到多个方面，包括但不限于以下几个关键点：

1. **模块化**:
   - 将代码拆分成小的、可重用的模块，便于管理和维护。模块化可以通过 ES6 的模块系统、CommonJS、AMD 等方式实现。

2. **自动化构建**:
   - 使用构建工具（如 Webpack、Gulp、Grunt 等）来自动化处理任务，如代码编译、压缩、合并、图片优化等。自动化构建可以减少手动操作，提高开发效率。

3. **包管理**:
   - 使用包管理工具（如 npm、Yarn）来管理项目依赖，方便安装、更新和删除第三方库。包管理可以确保项目的依赖关系清晰且易于维护。

4. **代码质量控制**:
   - 通过使用代码检查工具（如 ESLint、Prettier）和测试框架（如 Jest、Mocha）来确保代码质量。代码质量控制可以帮助发现潜在问题，减少 bug 的产生。

5. **版本控制**:
   - 使用版本控制系统（如 Git）来管理代码的版本，方便团队协作和代码回滚。版本控制可以确保代码的历史记录清晰，便于追踪和管理。

6. **持续集成与持续部署（CI/CD）**:
   - 通过自动化测试和部署流程，确保代码在每次提交后都能快速集成和部署。CI/CD 可以提高开发效率，减少发布过程中的错误。

7. **性能优化**:
   - 在开发过程中关注性能，通过代码分割、懒加载、资源压缩等手段来优化页面加载速度和用户体验。

8. **响应式设计与适配**:
   - 采用响应式设计原则，确保应用在不同设备和屏幕尺寸下都能良好展示。使用 CSS 媒体查询、Flexbox、Grid 等技术来实现适配。

9. **文档与规范**:
   - 编写清晰的文档和开发规范，确保团队成员在开发过程中遵循一致的标准。良好的文档可以提高团队协作效率，减少沟通成本。

- 前端工程化通过模块化、自动化构建、包管理、代码质量控制、版本控制、CI/CD、性能优化、响应式设计和文档规范等手段，提高了前端开发的效率和质量。它使得前端开发更加系统化、规范化，适应现代 Web 应用的复杂性和多样性。
:::

## 前端的性能优化都有哪些？

::: details
前端性能优化是提高网页加载速度和用户体验的重要手段。以下是一些常见的前端性能优化策略：

1. **资源压缩与合并**:
   - 压缩 CSS、JavaScript 和图片文件，减少文件大小。
   - 合并多个 CSS 和 JavaScript 文件，减少 HTTP 请求数量。

2. **[使用 CDN](/interview/http.html#使用-cdn-的意义)**:
   - 将静态资源托管在内容分发网络（CDN）上，利用其全球分布的服务器加速资源加载。

3. **懒加载**:
   - 对图片和其他资源使用懒加载技术，只有在用户滚动到可视区域时才加载，减少初始加载时间。

4. **缓存策略**:
   - 使用浏览器缓存和服务器缓存，设置合适的缓存头（如 `Cache-Control` 和 `Expires`），减少重复请求。

5. **减少重排和重绘**:
   - 尽量减少 DOM 操作，批量更新 DOM，避免频繁的重排（Reflow）和重绘（Repaint）。

6. **使用异步加载**:
   - 对 JavaScript 文件使用 `async` 或 `defer` 属性，避免阻塞页面渲染。

7. **优化图片**:
   - 使用适当格式（如 WebP）、尺寸和分辨率的图片，使用 CSS Sprites 合并小图标。

8. **减少 HTTP 请求**:
   - 使用 CSS Sprites、图标字体等技术，减少页面所需的 HTTP 请求数量。

9. **使用服务工作者**:
   - 利用服务工作者实现离线缓存和资源预缓存，提高加载速度和用户体验。

10. **性能监控与分析**:
    - 使用工具（如 Lighthouse、WebPageTest）监控和分析页面性能，识别瓶颈并进行针对性优化。

11. **代码分割**:
    - 使用动态导入和代码分割技术，将 JavaScript 代码拆分成多个小块，按需加载，提高初始加载速度。

12. **优化 CSS 选择器**:
    - 使用高效的 CSS 选择器，避免过于复杂的选择器导致的性能问题。

:::

## AST 是什么？它的作用有哪些？

::: details
AST（抽象语法树，Abstract Syntax Tree）是一种树形数据结构，用于表示源代码的语法结构。它是编译器和解释器在处理源代码时生成的中间表示，能够反映代码的语法和语义。

1. **代码解析**:
   - AST 是源代码解析的结果，编译器和解释器通过将源代码转换为 AST 来理解代码的结构和含义。

2. **语法分析**:
   - AST 使得语法分析变得更加简单和高效。通过树形结构，编译器可以轻松地访问和操作代码的各个部分。

3. **代码转换**:
   - 在代码转换（如从 ES6 转换为 ES5）过程中，AST 可以作为中间表示，便于进行各种转换和优化。

4. **代码优化**:
   - 编译器可以在 AST 层面进行优化，例如消除冗余代码、进行常量折叠等，从而提高生成代码的执行效率。

5. **静态分析**:
   - 工具可以使用 AST 进行静态代码分析，检查代码中的潜在问题、风格不一致或安全漏洞。

6. **代码生成**:
   - 在编译过程中，AST 可以作为生成目标代码的基础。编译器根据 AST 生成机器码或字节码。

7. **代码编辑和重构**:
   - 开发工具（如 IDE 和代码编辑器）可以利用 AST 进行代码重构、自动补全和语法高亮等功能。

- AST（抽象语法树）是表示源代码语法结构的树形数据结构，广泛应用于编译器、解释器和各种开发工具中。它的主要作用包括代码解析、语法分析、代码转换、代码优化、静态分析、代码生成以及代码编辑和重构等。通过使用 AST，开发者可以更高效地处理和分析代码。
:::
