# Python 技术文章

Python 是一门简洁而强大的编程语言，广泛应用于 Web 开发、数据科学、人工智能等领域。

## 基础教程

### 变量和数据类型

```python
# 基本数据类型
name = "Python"
version = 3.12
is_awesome = True

print(f"{name} {version} is awesome: {is_awesome}")
```

### 函数定义

```python
def calculate_area(radius):
    """计算圆的面积"""
    import math
    return math.pi * radius ** 2

# 使用函数
area = calculate_area(5)
print(f"半径为 5 的圆的面积是: {area:.2f}")
```

## 高级特性

### 装饰器

```python
def timer(func):
    """计时装饰器"""
    import time
    from functools import wraps
    
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} 执行时间: {end - start:.4f}s")
        return result
    return wrapper

@timer
def slow_function():
    import time
    time.sleep(1)
    return "完成"
```

### 上下文管理器

```python
class FileManager:
    def __init__(self, filename, mode):
        self.filename = filename
        self.mode = mode
        self.file = None
    
    def __enter__(self):
        self.file = open(self.filename, self.mode)
        return self.file
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.file:
            self.file.close()

# 使用上下文管理器
with FileManager('example.txt', 'w') as f:
    f.write('Hello, Python!')
```

## 实用技巧

!!! tip "性能优化"
    - 使用列表推导式而不是循环
    - 合理使用生成器节省内存
    - 使用 `collections` 模块的数据结构

!!! warning "常见陷阱"
    - 可变默认参数
    - 闭包中的变量绑定
    - 浅拷贝与深拷贝

## 相关资源

- [Python 官方文档](https://docs.python.org/zh-cn/3/)
- [PEP 8 代码风格指南](https://peps.python.org/pep-0008/)
- [Python Package Index (PyPI)](https://pypi.org/)