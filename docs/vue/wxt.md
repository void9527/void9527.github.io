---
outline: deep
---
# [谷歌插件开发文档](https://developer.chrome.com/docs/extensions?hl=zh-cn)

## 权限列表

|关键词|描述|
|----|----|
|accessibilityFeatures.modify|允许修改无障碍功能的状态|
|accessibilityFeatures.read|允许读取无障碍功能的状态|
|[activeTab](https://developer.chrome.com/docs/extensions/develop/concepts/activeTab?hl=zh-cn)|通过用户手势临时访问使用中的标签页|
|[alarms](https://developer.chrome.com/docs/extensions/reference/api/alarms?hl=zh-cn)|代码定期运行或在未来的指定时间运行|
|[audio](https://developer.chrome.com/docs/extensions/reference/api/audio?hl=zh-cn)|系统的音频设备的信息并控制这些设备|
|background|后台操作|
|[bookmarks](https://developer.chrome.com/docs/extensions/reference/api/bookmarks?hl=zh-cn)|书签操作|
|[browsingData](https://developer.chrome.com/docs/extensions/reference/api/browsingData?hl=zh-cn)|用户的本地个人资料中移除浏览数据|
|[certificateProvider](https://developer.chrome.com/docs/extensions/reference/api/certificateProvider?hl=zh-cn)| TLS 身份验证|
|[clipboardRead](https://developer.mozilla.org/docs/Web/API/Clipboard_API)|读取剪贴板|
|[clipboardWrite](https://developer.mozilla.org/docs/Web/API/Clipboard_API)|设置剪贴板|
|[contentSettings](https://developer.chrome.com/docs/extensions/reference/api/contentSettings?hl=zh-cn)|设置|
|[contextMenus](https://developer.chrome.com/docs/extensions/reference/api/contextMenus?hl=zh-cn)|上下文菜单|
|[cookies](https://developer.chrome.com/docs/extensions/reference/api/cookies?hl=zh-cn)||
|[debugger](https://developer.chrome.com/docs/extensions/reference/api/debugger?hl=zh-cn)||
|[declarativeContent](https://developer.chrome.com/docs/extensions/reference/api/declarativeContent?hl=zh-cn)|根据网页内容执行操作，而无需拥有读取网页内容的权限|
|[declarativeNetRequest](https://developer.chrome.com/docs/extensions/reference/api/declarativeNetRequest?hl=zh-cn)|声明式规则来屏蔽或修改网络请求|
|[declarativeNetRequestWithHostAccess](https://developer.chrome.com/docs/extensions/reference/api/declarativeNetRequest?hl=zh-cn)||
|[declarativeNetRequestFeedback](https://developer.chrome.com/docs/extensions/reference/api/declarativeNetRequest?hl=zh-cn)||
|[dns](https://developer.chrome.com/docs/extensions/reference/api/dns?hl=zh-cn)|域名解析|
|[desktopCapture](https://developer.chrome.com/docs/extensions/reference/api/desktopCapture?hl=zh-cn)|截取屏幕|
|[documentScan](https://developer.chrome.com/docs/extensions/reference/api/documentScan?hl=zh-cn)|发现和检索连接的文档扫描器中的图片|
|[downloads](https://developer.chrome.com/docs/extensions/reference/api/downloads?hl=zh-cn)|下载权限|
|[downloads.open](https://developer.chrome.com/docs/extensions/reference/api/downloads?hl=zh-cn#method-open)|向下兼容的下载权限|
|[downloads.ui](https://developer.chrome.com/docs/extensions/reference/api/downloads?hl=zh-cn#method-setUiOptions)|更改与当前浏览器配置文件相关联的每个窗口的下载界面|
|[enterprise.deviceAttributes](https://developer.chrome.com/docs/extensions/reference/api/enterprise/deviceAttributes?hl=zh-cn)|读取设备属性|
|[enterprise.hardwarePlatform](https://developer.chrome.com/docs/extensions/reference/api/enterprise/hardwarePlatform?hl=zh-cn)|获取运行浏览器的硬件平台的制造商和型号|
|[enterprise.networkingAttributes](https://developer.chrome.com/docs/extensions/reference/api/enterprise/networkingAttributes?hl=zh-cn)|读取有关当前网络的信息|
|[enterprise.platformKeys](https://developer.chrome.com/docs/extensions/reference/api/enterprise/platformKeys?hl=zh-cn)|生成密钥并为这些密钥安装证书|
|favicon|读出您所访问的网站的图标|
|[fileBrowserHandler](https://developer.chrome.com/docs/extensions/reference/api/fileBrowserHandler?hl=zh-cn)|实现文件浏览器处理程序|
|[fileSystemProvider]|操作系统的文件管理器访问的文件系统|
|[fontSettings]|设置取决于某些通用字体系列和语言脚本|
|[gcm]|通过 Firebase Cloud Messaging (FCM) 发送和接收消息|
|[geolocation]|定位|
|[history]|浏览记录|
|[identity]|获取 OAuth2 访问令牌|
|[identity.email]|获取 OAuth2 访问令牌注册的邮箱|
|[idle]|检测机器的空闲状态何时发生变化|
|[loginState]|读取和监控登录状态|
|[management]|提供了多种方法来管理已安装的应用和扩展程序|
|[nativeMessaging]|与原生应用交换消息|
|[notifications]|消息通知|
|[offscreen]|创建和管理屏幕外文档|
|[pageCapture]|可将标签页保存为 MHTML|
|[platformKeys]|访问由平台管理的客户端证书|
|[power]|替换系统的电源管理功能|
|[printerProvider]|公开了打印管理器用于查询由扩展程序控制的打印机、查询其功能以及向这些打印机提交打印作业的事件|
|[printing]|将打印任务发送到安装在 Chromebook 上的打印机|
|[printingMetrics]|提取有关打印使用情况的数据。|
|[privacy]|控制 Chrome 中可能会影响用户隐私的功能的使用情况|
|[processes]| 与浏览器的进程进行交互|
|[proxy]|管理 Chrome 的代理设置|
|[readingList]|读取和修改[阅读清单](https://support.google.com/chrome/answer/7343019?hl=zh-cn)中的项|
|[runtime]|检索服务工件、返回清单的详细信息，以及监听和响应扩展程序生命周期中的事件。您还可以使用此 API 将网址的相对路径转换为完全限定网址。|
|[scripting]|在不同上下文中执行脚本|
|[search]|通过默认提供程序进行搜索|
|[sessions]|从浏览会话中查询和恢复标签页及窗口。|
|[sidePanel]|可将浏览器侧边栏中的内容与网页的主要内容一同托管。|
|[storage]| 存储、检索和跟踪用户数据的更改|
|[system.cpu]|查询 CPU 元数据|
|[system.display]|查询展示元数据。|
|[system.memory]|内存信息|
|[system.storage]|查询存储设备信息，并在连接和分离可移动存储设备时收到通知|
|[tabCapture]|与标签页媒体流进行交互|
|[tabGroups]|与浏览器的标签页分组系统进行交互|
|[tabs]|浏览器的标签页系统进行交互。您可以使用此 API 在浏览器中创建、修改和重新排列标签页。|
|[topSites]|访问新标签页上显示的热门网站（即最常访问的网站）。不包括用户自定义的快捷方式|
|[tts]|播放合成的文字转语音 (TTS)|
|[ttsEngine]|通过扩展程序实现文本转语音(TTS) 引擎|
|[unlimitedStorage]||
|[vpnProvider]|实现 VPN 客户端。|
|[wallpaper]|更改 ChromeOS 壁纸。|
|[webAuthenticationProxy]|远程主机上运行的远程桌面软件可以拦截 Web Authentication API (WebAuthn) 请求，以便在本地客户端上处理这些请求。|
|[webNavigation]|接收有关飞行中导航请求状态的通知。|
|[webRequest]| 可观察和分析流量，以及拦截、阻止或修改传输中的请求。|
|[webRequestBlocking]|可观察和分析流量，以及拦截、阻止或修改传输中的请求。|

## 入口类型

|关键词|描述|
|----|----|
|Popup|弹窗|
|Newtab|tab标签|

## 配置文件

:::details manifest.json

```json
{
  "manifest_version": 3,
  "name": "Minimal Manifest",
  "version": "1.0.0",
  "description": "A basic example extension with only required keys",
  "icons": {
    "48": "images/icon-48.png",
    "128": "images/icon-128.png"
  },
  // 注册内容脚本
  "content_scripts": [
    {
      "js": [
        "content-script.js"
      ],
      "matches": [
        "http://*.example.com//"
      ]
    }
  ],
  // 指定包含扩展程序服务工作线程的 JavaScript 文件，该服务工作线程充当事件处理脚本
  "background": {
    "service_worker": "service-worker.js"
  },
  // 定义 Google 工具栏中扩展程序图标的外观和行为
  "action": {
    "default_icon": {
      "16": "images/icon-16.png",
      "32": "images/icon-32.png",
      "48": "images/icon-48.png",
      "128": "images/icon-128.png"
    },
    // 定义弹出框
    "default_popup": "popup.html"
  },
  // 用于标识要在 sidePanel 中显示的 HTML 文件
  "side_panel": {
    "default_path": "sidepanel.html"
  },
  // 列出您的扩展程序可以与之互动的网页，这些网页是使用网址匹配模式定义的
  "host_permissions": [
    "https://*.example.com/"
  ],
  // 权限
  "permissions": ["scripting", "activeTab"],
  // 在扩展程序中定义键盘快捷键
  "commands": {}
}
```

:::
