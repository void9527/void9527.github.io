---
outline: deep
---

## 显示已连接设备列表

```bash
adb devices
```

## 启动设备

```bash
adb start-server
```

## 停止设备

```bash
adb kill-server
```

## 获取设备状态

```bash
adb get-state
```

## 设备信息

```bash
adb shell getprop ro.product.model
```

### 设备版本信息

```bash
adb shell getprop ro.build.version.release
```

### 设备分辨率

```bash
adb shell wm size
```

### 设备屏幕方向

```bash
adb shell wm size
```

### 设备内存信息

```bash
adb shell dumpsys meminfo
```

### 设备屏幕信息

```bash
adb shell dumpsys window
```

### 设备 CPU 信息

```bash
adb shell dumpsys cpuinfo
```

### 设备存储信息

```bash
adb shell dumpsys meminfo
```

### 设备网络信息

```bash
adb shell dumpsys connectivity
```

### 设备电池信息

```bash
adb shell dumpsys battery
```

### 设备安装的应用列表

```bash
adb shell pm list packages
```

### 设备屏幕截图

```bash
adb shell screencap -p /sdcard/screenshot.png
```

### 设备屏幕截图并保存到本地

```bash
adb shell screencap -p /sdcard/screenshot.png
adb pull /sdcard/screenshot.png ./screenshot.png
```

## 获取设备日志信息

```bash
adb logcat 
```
