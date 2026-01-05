---
outline: deep
---


 redis-cli -a getcine1511. config get maxclients
 redis-cli -a getcine1511. info stats | grep -E "(total_connections_received|rejected_connections|total_commands_processed)"
 redis-cli -a getcine1511. info memory | grep used_memory_human
 redis-cli -a getcine1511. info memory | grep -E "(used_memory|maxmemory|mem_fragmentation_ratio|evicted_keys|expired_keys)"
 redis-cli -a getcine1511. info clients | grep -E "(connected_clients|blocked_clients)"
 redis-cli -a getcine1511. slowlog get 5


redis-cli -a getcine1511. config set maxmemory-policy noeviction

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
redis-cli -a getcine1511. info memory | grep -E "(maxmemory|maxmemory_policy)"
