# 数据库技术文章

数据库是现代应用程序的核心组件，掌握数据库知识对开发者至关重要。

## SQL 基础

### 基本查询

```sql
-- 选择所有列
SELECT * FROM users;

-- 选择特定列
SELECT name, email, created_at FROM users;

-- 条件查询
SELECT * FROM users 
WHERE age >= 18 AND status = 'active';

-- 排序
SELECT * FROM products 
ORDER BY price DESC, name ASC;
```

### 聚合函数

```sql
-- 统计函数
SELECT 
    COUNT(*) as total_users,
    AVG(age) as average_age,
    MAX(created_at) as latest_registration,
    MIN(created_at) as earliest_registration
FROM users;

-- 分组统计
SELECT 
    department,
    COUNT(*) as employee_count,
    AVG(salary) as average_salary
FROM employees
GROUP BY department
HAVING COUNT(*) > 5;
```

## 高级查询

### 连接查询

```sql
-- 内连接
SELECT u.name, p.title, p.created_at
FROM users u
INNER JOIN posts p ON u.id = p.user_id;

-- 左连接
SELECT u.name, COUNT(p.id) as post_count
FROM users u
LEFT JOIN posts p ON u.id = p.user_id
GROUP BY u.id, u.name;

-- 子查询
SELECT name, email
FROM users
WHERE id IN (
    SELECT DISTINCT user_id 
    FROM orders 
    WHERE total_amount > 1000
);
```

### 窗口函数

```sql
-- 排名函数
SELECT 
    name,
    salary,
    RANK() OVER (ORDER BY salary DESC) as salary_rank,
    ROW_NUMBER() OVER (ORDER BY salary DESC) as row_num
FROM employees;

-- 分组窗口函数
SELECT 
    department,
    name,
    salary,
    AVG(salary) OVER (PARTITION BY department) as dept_avg_salary
FROM employees;
```

## 数据库设计

### 表结构设计

```sql
-- 用户表
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_created_at (created_at)
);

-- 文章表
CREATE TABLE posts (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    title VARCHAR(200) NOT NULL,
    content TEXT,
    status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_status (status),
    FULLTEXT INDEX idx_content (title, content)
);
```

## 性能优化

### 索引优化

```sql
-- 创建复合索引
CREATE INDEX idx_user_status_created ON posts(user_id, status, created_at);

-- 分析查询执行计划
EXPLAIN SELECT * FROM posts 
WHERE user_id = 1 AND status = 'published' 
ORDER BY created_at DESC;

-- 查看索引使用情况
SHOW INDEX FROM posts;
```

### 查询优化

!!! tip "查询优化技巧"
    - 避免 SELECT *，只查询需要的列
    - 合理使用索引，避免全表扫描
    - 使用 LIMIT 限制结果集大小
    - 避免在 WHERE 子句中使用函数

!!! warning "性能陷阱"
    - N+1 查询问题
    - 过多的 JOIN 操作
    - 不合理的子查询
    - 缺少必要的索引

## NoSQL 数据库

### MongoDB 示例

```javascript
// 插入文档
db.users.insertOne({
    name: "张三",
    email: "zhangsan@example.com",
    age: 25,
    tags: ["developer", "javascript"],
    address: {
        city: "北京",
        district: "朝阳区"
    }
});

// 查询文档
db.users.find({
    age: { $gte: 18, $lt: 65 },
    "address.city": "北京"
}).sort({ age: -1 });

// 聚合管道
db.users.aggregate([
    { $match: { age: { $gte: 18 } } },
    { $group: { 
        _id: "$address.city", 
        count: { $sum: 1 },
        avgAge: { $avg: "$age" }
    }},
    { $sort: { count: -1 } }
]);
```

## 相关资源

- [MySQL 官方文档](https://dev.mysql.com/doc/)
- [PostgreSQL 文档](https://www.postgresql.org/docs/)
- [MongoDB 文档](https://docs.mongodb.com/)
- [Redis 文档](https://redis.io/documentation)