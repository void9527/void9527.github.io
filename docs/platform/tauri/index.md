---
outline: deep
---
# [官网](https://tauri.app/)

## 环境

::: code-group

```sh [rust版本]
rustc --version
```

```sh [cargo版本]
cargo --version
```

:::

## 配置

::: details
::: code-group

```sh [安卓]
# 初始化环境
pnpm tauri android init

# 运行
pnpm tauri android dev
```

:::

## 开发

### 实现多窗口

::: details
::: code-group

```js [调用]
createWin({
    label: 'index',
    title: '首页',
    url: '/index',
    width: 850,
    height: 600,
    minWidth: 500,
    minHeight: 400,
    center: true,
    resizable: true,
    alwaysOnTop: true,
})
```

```js [index]

import { getAllWindows, getCurrentWindow } from '@tauri-apps/api/window'
import { WebviewWindow, getAllWebviewWindows, getCurrentWebviewWindow} from '@tauri-apps/api/webviewWindow'
import { emit, listen } from '@tauri-apps/api/event'

import { setWin } from './actions'

const appWindow = getCurrentWindow()

// 窗口参数
export const windowConfig = {
    label: null,            // 窗口唯一label
    title: '',              // 窗口标题
    url: '',                // 路由地址url
    width: 1000,            // 窗口宽度
    height: 640,            // 窗口高度
    minWidth: null,         // 窗口最小宽度
    minHeight: null,        // 窗口最小高度
    x: null,                // 窗口相对于屏幕左侧坐标
    y: null,                // 窗口相对于屏幕顶端坐标
    center: true,           // 窗口居中显示
    resizable: true,        // 是否支持缩放
    maximized: false,       // 最大化窗口
    decorations: false,     // 窗口是否装饰边框及导航条
    alwaysOnTop: false,     // 置顶窗口
    dragDropEnabled: false, // 禁止系统拖放
    visible: false,         // 隐藏窗口

    // ...
}

class Windows {
    // 创建新窗口
    async createWin(options) {
        const args = Object.assign({}, windowConfig, options)

        // 判断窗口是否存在
        const existWin = await this.getWin(args.label)
        if(existWin) {
            console.log('窗口已存在', existWin)
            // ...
        }
        // 创建窗口对象
        const win = new WebviewWindow(args.label, args)

        // 窗口创建完毕/失败
        win.once('tauri://created', async() => {
            console.log('tauri://created')
            // 是否主窗口
            if(args.label.indexOf('main') > -1) {
                // ...
            }

            // 是否最大化
            if(args.maximized && args.resizable) {
                console.log('is-maximized')
                await win.maximize()
            }
        })

        win.once('tauri://error', async(error) => {
            console.log('window create error!', error)
        })
    }

    // 获取窗口
    async getWin(label) {
        return await WebviewWindow.getByLabel(label)
    }

    // 获取全部窗口
    async getAllWin() {
        //  return getAll()
        return await getAllWindows()
    }

    // 开启主进程监听事件
    async listen() {
        console.log('——+——+——+——+——+开始监听窗口')

        // 创建新窗体
        await listen('win-create', (event) => {
            console.log(event)
            this.createWin(event.payload)
        })

        // 显示窗体
        await listen('win-show', async(event) => {
            if(appWindow.label.indexOf('main') == -1) return
            await appWindow.show()
            await appWindow.unminimize()
            await appWindow.setFocus()
        })

        // 隐藏窗体
        await listen('win-hide', async(event) => {
            if(appWindow.label.indexOf('main') == -1) return
            await appWindow.hide()
        })

        // 关闭窗体
        await listen('win-close', async(event) => {
            await appWindow.close()
        })

        // ...
    }
}
 
export default Windows

```

```js [actions]
import { emit } from '@tauri-apps/api/event'

/**
 * @desc 创建新窗口
 * @param args {object} {label: 'new', url: '/new', width: 500, height: 300, ...}
 */
 export async function createWin(args) {
    await emit('win-create', args)
}


/**
 * @desc 登录窗口
 */
 export async function loginWin() {
    await createWin({
        label: 'main_login',
        title: '登录',
        url: '/login',
        width: 400,
        height: 320,
        resizable: false,
        alwaysOnTop: true
    })
}

export async function mainWin() {
    await createWin({
        label: 'main',
        title: 'TAURI-WINDOWMANAGER',
        url: '/',
        width: 800,
        height: 600,
        minWidth: 500,
        minHeight: 360,
    })
}

export async function aboutWin() {
    await createWin({
        label: 'about',
        title: '关于',
        url: '/about',
        width: 450,
        height: 360,
    })
}

```

:::

### 实现托盘闪烁和右键菜单

::: details
::: code-group

```rs [tray.rs]
use tauri::{
    tray::{MouseButton, TrayIconBuilder, TrayIconEvent}, Emitter, Manager, Runtime
};
use std::thread::{sleep};
use std::time::Duration;

pub fn create_tray<R: Runtime>(app: &tauri::AppHandle<R>) -> tauri::Result<()> {
    let _ = TrayIconBuilder::with_id("tray")
        .tooltip("tauri")
        .icon(app.default_window_icon().unwrap().clone())
        .on_tray_icon_event(|tray, event| match event {
            TrayIconEvent::Click {
                id: _,
                position,
                rect: _,
                button,
                button_state: _,
            } => match button {
                MouseButton::Left {} => {
                    // ...
                }
                MouseButton::Right {} => {
                    tray.app_handle().emit("tray_contextmenu", position).unwrap();
                }
                _ => {}
            },
            TrayIconEvent::Enter {
                id: _,
                position,
                rect: _,
            } => {
                tray.app_handle().emit("tray_mouseenter", position).unwrap();
            }
            TrayIconEvent::Leave {
                id: _,
                position,
                rect: _,
            } => {
                // sleep(Duration::from_millis(500));
                tray.app_handle().emit("tray_mouseleave", position).unwrap();
            }
            _ => {}
        })
        .build(app);
    Ok(())
}

```

```rs [lib.rs]
// ...

mod tray;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        // ...
        .setup(|app| {
            #[cfg(all(desktop))]
            {
                let handle = app.handle();
                tray::create_tray(handle)?;
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

:::

::: details
::: code-group

```js [msg.js]
import { WebviewWindow } from '@tauri-apps/api/webviewWindow'
import { emit, listen } from '@tauri-apps/api/event'
import { LogicalPosition } from '@tauri-apps/api/window'

export let messageBoxWindowWidth = 280
export let messageBoxWindowHeight = 100

export default async function CreateMsgBox() {
    let webview = new WebviewWindow("msgbox", {
        url: "/msg",
        title: "消息通知",
        width: messageBoxWindowWidth,
        height: messageBoxWindowHeight,
        skipTaskbar: true,
        decorations: false,
        center: false,
        resizable: false,
        alwaysOnTop: true,
        focus: true,
        x: window.screen.width + 50,
        y: window.screen.height + 50,
        visible: false
    })

    // 托盘消息事件
    await webview.listen('tauri://window-created', async () => {
        console.log('msgbox create')
    })
    await webview.listen('tauri://blur', async () => {
        console.log('msgbox blur')
        const win = await WebviewWindow.getByLabel('msgbox')
        await win.hide()
    })
    await webview.listen('tauri://error', async(error) => {
        console.log('msgbox error!', error)
    })

    // 监听托盘事件
    let trayEnterListen = listen('tray_mouseenter', async (event) => {
        const win = await WebviewWindow.getByLabel('msgbox')
        if(!win) return

        let position = event.payload
        if(win) {
            await win.setAlwaysOnTop(true)
            await win.setFocus()
            await win.setPosition(new LogicalPosition(position.x - messageBoxWindowWidth / 2, window.screen.availHeight - messageBoxWindowHeight))
            await win.show()
        }
    })
    let trayLeaveListen = listen('tray_mouseleave', async (event) => {
        console.log(event)
        const win = await WebviewWindow.getByLabel('msgbox')
        await win.hide()
    })
}

```

```vue [组件.vue]
<script setup>
    // ...

    const flashTimer = ref(false)
    const flashTray = async(bool) => {
        let flag = true
        if(bool) {
            TrayIcon.getById('tray').then(async(res) => {
                clearInterval(flashTimer.value)
                flashTimer.value = setInterval(() => {
                    if(flag) {
                        res.setIcon(null)
                    }else {
                        // 支持把自定义图标放在默认icons文件夹，通过如下方式设置图标
                        // res.setIcon('icons/msg.png')
                        // 支持把自定义图标放在自定义文件夹tray，需要配置tauri.conf.json参数 "bundle": {"resources": ["tray"]}
                        res.setIcon('tray/msg.png')
                    }
                    flag = !flag
                }, 500)
            })
        }else {
            clearInterval(flashTimer.value)
            let tray = await TrayIcon.getById("tray")
            tray.setIcon('icons/icon.png')
        }
    }
</script>

```

:::

## 打包

- 使用 Github Actions

## 分发
