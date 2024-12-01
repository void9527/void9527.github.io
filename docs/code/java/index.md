---
outline: deep
---
# 网络注解

## HTTP 注解

### @RequestMapping

- method - 指定的类型
- value - 指定请求的地址
- produces - 指定响应类型
- comsumes - 指定请求类型
- header - 根据请求中的消息头内容缩小请求映射的范围

```java
@RequestMapping(method = RequestMethod.GET, value = "/demo")
```

## Path 路径参数 @PathVariable

- @PathVariable 接收 动态路由

```java
@GetMapping("/demo/{id}")
public void demo(@PathVariable(name = "id") String id) {
    System.out.print(id); // 123
}
```

## Query 查询参数 @RequestParam

- @RequestParam 接收 查询参数

```java
@GetMapping("/demo")
public void demo(@RequestParam(name = "name") String name) {
    System.out.print(name); // cheng
}
```

## Body 主体参数 @RequestBody

- post application/json 请求

```js
fetch("/demo1/123", {
    method: "POST",
    body: JSON.stringify({ id: 1, name: "测试" })
})
```

### 接收 body

```java
@PostMapping(path = "/demo1")
public void demo1(@RequestBody Person person) {
    System.out.print(person.toString()); // id:1;name=测试;
}
```

```java
@PostMapping(path = "/demo1")
public void demo1(@RequestBody Map<String, String> person) {
    System.out.print(person.get("name")); // 测试
}
```

```java
@PostMapping(path = "/demo1")
public void demo1(@RequestBody List<String> list) {
    System.out.print(list.get(0)); // 测试
}
```

### 接收 文件

```java
@PostMapping(path = "/demo1")
public void demo1(@RequestBody MultipartFile file) {
    System.out.print(file.getOriginalFilename()); // 测试.txt
}
```

### 接收 多文件

```java
@PostMapping(path = "/demo1")
public void demo1(@RequestBody MultipartFile[] files) {
    System.out.print(files[0].getOriginalFilename()); // 测试.txt
}
```

## 请求头

- @RequestHeader 获取 请求头
- @CookieValue 获取 Cookie

```java
@GetMapping("/demo3")
public void demo3(@RequestHeader(name = "myHeader") String myHeader,
        @CookieValue(name = "myCookie") String myCookie) {
    System.out.print("myHeader=" + myHeader);
    System.out.print("myCookie=" + myCookie);
}
```

## 其他注解

### @ResponseBody

- @ResponseBody 注解用于将控制器的方法返回值直接写入HTTP响应体中，而不是返回一个视图。

```java
@GetMapping("/demo4")
@ResponseBody
public String demo4() {
    return "Hello, World!";
}
```

### @RestController

- @RestController 是 @Controller 和 @ResponseBody 的组合注解，适用于RESTful Web服务。

```java
@RestController
@RequestMapping("/api")
public class ApiController {

    @GetMapping("/hello")
    public String hello() {
        return "Hello, API!";
    }
}
```

### @CrossOrigin

- @CrossOrigin 注解用于允许跨域请求。

```java
@CrossOrigin(origins = "http://example.com")
@GetMapping("/demo5")
public String demo5() {
    return "Cross-Origin Request Allowed";
}
```
