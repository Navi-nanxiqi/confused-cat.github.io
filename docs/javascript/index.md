# JavaScript 技术文章

JavaScript 是现代 Web 开发的核心语言，从前端到后端都有广泛应用。

## 基础语法

### 变量声明

```javascript
// ES6+ 推荐使用 const 和 let
const PI = 3.14159;
let radius = 5;
var area = PI * radius * radius; // 不推荐使用 var

console.log(`圆的面积: ${area.toFixed(2)}`);
```

### 函数定义

```javascript
// 传统函数
function calculateArea(radius) {
    return Math.PI * radius ** 2;
}

// 箭头函数
const calculateCircumference = (radius) => 2 * Math.PI * radius;

// 使用示例
console.log(`面积: ${calculateArea(5)}`);
console.log(`周长: ${calculateCircumference(5)}`);
```

## ES6+ 特性

### 解构赋值

```javascript
// 数组解构
const [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log(first, second, rest); // 1 2 [3, 4, 5]

// 对象解构
const person = { name: 'Alice', age: 30, city: 'Beijing' };
const { name, age, city = 'Unknown' } = person;
console.log(name, age, city); // Alice 30 Beijing
```

### Promise 和 async/await

```javascript
// Promise
function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('数据获取成功');
        }, 1000);
    });
}

// async/await
async function getData() {
    try {
        const result = await fetchData();
        console.log(result);
    } catch (error) {
        console.error('错误:', error);
    }
}

getData();
```

## DOM 操作

### 元素选择和操作

```javascript
// 选择元素
const button = document.querySelector('#myButton');
const items = document.querySelectorAll('.item');

// 事件监听
button.addEventListener('click', (event) => {
    event.preventDefault();
    console.log('按钮被点击了');
});

// 动态创建元素
const newDiv = document.createElement('div');
newDiv.textContent = '新创建的元素';
newDiv.classList.add('dynamic-element');
document.body.appendChild(newDiv);
```

## 实用工具函数

### 防抖和节流

```javascript
// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 节流函数
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
```

## 最佳实践

!!! success "推荐做法"
    - 使用 `const` 和 `let` 替代 `var`
    - 优先使用箭头函数
    - 使用模板字符串进行字符串拼接
    - 合理使用解构赋值

!!! danger "避免的做法"
    - 全局变量污染
    - 不处理 Promise 的 rejection
    - 过度嵌套的回调函数

## 相关资源

- [MDN JavaScript 文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)
- [ECMAScript 规范](https://tc39.es/ecma262/)
- [JavaScript.info](https://zh.javascript.info/)