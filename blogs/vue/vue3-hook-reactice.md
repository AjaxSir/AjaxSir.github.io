---
 title: vue3 Hook Reactive使用
 date: 2023/12/1
 tags: 
 - vue3
---
### 赋值方法
* 错误方法1
```javascript
let student = reactive({
    name: '张三',
    age: 10
})
student = {
    name: '张三1',
    age: 11
} // 界面并没有改变，这是因为写法有问题
```
* 正确方法 - 1
```javascript
let student = reactive({
    name: '张三',
    age: 10
})
// 接口返回数据
const data = {
    name:'张三',
    age: 12
}

for (const key in student) {
    if ( Object.prototype.hasOwnProperty.call(student, key) ) {
        student[key] = data[key]
    }
}

```
* 正确方法 - 2
> 给数据再包一层对象
```javascript
let student = reactive({
    data: {
        name: '张三',
        age: 10
    }
})

// 接口返回数据
const data = {
    name:'张三',
    age: 12
}
student.data = data
```