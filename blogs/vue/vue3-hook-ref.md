---
 title: vue3 Hook Ref使用
 date: 2023/12/1
 tags: 
 - vue3
---

### 通过ref直接拿到dom引用
```javascript
<template>
    <div class="demo1-container">
        <p>通过ref直接拿到dom</p>
        <div ref="sectionRef" class="ref-section"></div>
        <button @click="higherAction" class="btn">变高</button>
    </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
const sectionRef = ref()
let height = 100;

const higherAction = () => {
    height += 50;
    sectionRef.value.style = `height: ${height}px`;
}
</script>
```
### 通过:ref将dom引用放到数组中
```javascript
<template>
    <div class="demo2-container">
        <div class="list-section">
            <div :ref="setRefAction" @click="higherAction(index)" class="list-item" v-for="(item, index) in state.list" :key="index">
                <span>{{item}}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const state = reactive({
    list: [1, 2, 3, 4, 5, 6, 7],
    refList: [] as Array<any>
})

const setRefAction = (el: any) => { // ref循环调用setRefAction方法，该方法会默认接收一个el参数，这个参数就是我们需要获取的div元素
    state.refList.push(el); // 通过state.refList[index]的形式获取子元素dom state.refList[index].style = `height: ${height + 20}px`;
}
</script>
```
### 通过子组件emit传递ref
```javascript
// 子组件
<template>
    <div ref="cellRef" @click="cellAction" class="cell-item">
        <span>{{item}}</span>
    </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';

const props = defineProps({
    item: Number
})
const emit = defineEmits(['cellTap']);
const cellRef = ref();
const cellAction = () => {
    emit('cellTap', cellRef.value);
}
</script>
```
```javascript
// 父组件
<template>
    <div class="demo2-container">
        <p>通过子组件emit传递ref</p>
        <div class="list-section">
            <Cell :item="item" @cellTap="cellTapHandler" v-for="(item, index) in state.list" :key="index">
            </Cell>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import Cell from '@/components/Cell.vue'
const state = reactive({
    list: [1, 2, 3, 4, 5, 6, 7],
    refList: [] as Array<any>
})

const cellTapHandler = (el: any) => {
    let height = el.style.height ? el.style.height : '20px';
    height = Number(height.replace('px', ''));
    el.style = `height: ${height + 20}px`;
}
</script>
```
### ref解构使用
```javascript

const obj = {
  foo: ref(0),
  bar: ref(1)
}
 
// 该函数接收一个 ref
// 需要通过 .value 取值
// 但它会保持响应性
callSomeFunction(obj.foo);
 
// 仍然是响应式的
const { foo, bar } = obj;
```

### ref在响应对象中解包
```javascript
import { ref, reactive } from 'vue';
const a = ref(0);
const other = ref(1);
const obj = reactive({
  a
})
// 将一个新的 ref 赋值给一个关联了已有 ref 的属性
obj.a = other;
console.log("obj.a--->", obj.a); // 1
// 原始 ref 现在已经和 obj.a 失去联系
console.log("a.value--->", a.value); // 0
```