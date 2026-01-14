---
outline: deep
---

## 检查当前是否有大key导致碎片

```bash
redis-cli --bigkeys
```

## 根据预期使用设置，比如256MB

```bash
redis-cli config set maxmemory 268435456
```

## 持久化配置

```bash
redis-cli config rewrite
```

## 查看当前最大客户端数

:::details

```bash
redis-cli config get maxclients
```
- 作用：查看Redis允许的最大并发连接数
- 默认值：通常为10000
- 输出示例：maxclients\n10000
  :::

## 查看连接和命令统计
:::details
```bash
redis-cli info stats | grep -E "(total_connections_received|rejected_connections|total_commands_processed)"
```

- total_connections_received：服务器启动后接受的连接总数
- rejected_connections：因超过`maxclients`而被拒绝的连接数（重要！）
- total_commands_processed：处理的命令总数
:::
## 查看内存使用（人类可读格式）
:::details
```bash
redis-cli info memory | grep used_memory_human
```

- 以易读格式（KB/MB/GB）显示当前内存使用量
:::
## 查看详细内存信息
:::details
```bash
redis-cli info memory | grep -E "(used_memory|maxmemory|mem_fragmentation_ratio|evicted_keys|expired_keys)"
```

- `used_memory`：Redis使用的内存字节数
- `maxmemory`：配置的最大内存限制（0表示无限制）
- `mem_fragmentation_ratio`：内存碎片率（>1.5需关注）
- `evicted_keys`：因内存不足被驱逐的键数量
- `expired_keys`：过期键数量
:::
## 查看客户端连接状态
:::details
```bash
redis-cli info clients | grep -E "(connected_clients|blocked_clients)"
```

- `connected_clients`：当前活跃连接数
- `blocked_clients`：等待阻塞命令（如`BRPOP`）的客户端数
:::
## 查看慢查询日志
:::details
```bash
redis-cli slowlog get 5
```

- 作用：获取最近5条执行缓慢的命令
- 慢查询默认阈值：10毫秒（可通过`slowlog-log-slower-than`配置）
- 输出包含：命令ID、时间戳、执行时间、命令详情
:::
## 修改内存淘汰策略
:::details
```bash
redis-cli config set maxmemory-policy noeviction
```

- 作用：当内存达到上限时，设置Redis的行为策略
    - `noeviction`策略：返回错误，不淘汰任何键（生产环境常用）
- 其他策略：
    - `allkeys-lru`：从所有键中淘汰最近最少使用的
    - `volatile-lru`：从设置过期时间的键中淘汰LRU
    - `allkeys-random`：随机淘汰任意键
:::
## 场景：排查连接问题

:::details

```bash
# 1. 查看连接统计
redis-cli info stats | grep -E "(rejected_connections|total_connections_received)"

# 2. 如果rejected_connections > 0，检查当前连接数和限制
redis-cli info clients | grep connected_clients
redis-cli config get maxclients

# 3. 查看是否有客户端阻塞
redis-cli info clients | grep blocked_clients
```

:::

## 场景：内存问题分析

:::details

```bash
# 1. 检查内存使用情况
redis-cli info memory | grep -E "(used_memory|maxmemory|mem_fragmentation_ratio)"

# 2. 查看是否发生键驱逐
redis-cli info memory | grep evicted_keys

# 3. 如果evicted_keys > 0，说明内存不足，需要调整策略或扩容
```

:::

## 监控指标健康参考值

:::details
| 指标 | 健康范围|警告阈值|严重阈值|
|------------------|--------|-------|--------|
| connected_clients | < 0.8 × maxclients | > 0.9 × maxclients | = maxclients |
|mem_fragmentation_ratio|1.0 -1.5 |1.5-2.0|>2.0|
|rejected_connections| 0|    > 0 |持续增长|
|blocked_clients |0 |> 0 |> 10|
|evicted_keys |0 |> 0 |持续增长|

:::
