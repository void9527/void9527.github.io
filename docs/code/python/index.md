---
outline: deep
---

## .env 文件

> 私用 python-dotenv 库

```bash
from dotenv import load_dotenv
```

```python
from dotenv import load_dotenv
import os

# 加载默认 .env 文件到环境变量
load_dotenv()

# 加载指定文件
# load_dotenv(".env.prod")

# 现在可以使用 os.getenv() 读取
db_host = os.getenv("DB_HOST")
api_key = os.getenv("API_KEY")
```
