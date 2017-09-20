# Install

```bash
npm install --save miox-animation
```

## Describe

官方提供的默认动画集合。您可以根据自己的需求，同时根据以下方式定制自己的动画。

```javascript
export default function Animater(name) {
    return (app) => {
        return new Animate(app, name);
    }
}
```

返回的`function`对象必须返回一个带有`enter`与`leave`的**异步**函数，同时每个函数带有一个参数就是节点对象。具体如何发生动画，请您自定义。

## Usage

`Animation` 目前只提供了2种翻页方式： `slide` （默认）和 `push`, `slide` 方式是从右测滑动进入， `push`则是从下往上滑动进入。你可以按照你自己的需求来自由选择翻页方式。`Animation`的使用方法也很简单，如下代码所示：

```javascript
import Animate from 'miox-animation';
const app = new Miox(...options);
app.set('animate', Animate('slide'));
```

## Events

|事件|触发时间点|参数|
| :---- | :------ | :---- |
|animate:leave:before | webview离开之前触发，并且等待事件执行完成之后执行离开动画 | node |
|animate:leave:after | webview离开之后触发 | node |
|animate:enter:before | webview进入之前触发，并且等待事件执行完成之后执行进入动画 | node |
|animate:enter:after | webview进入之前触发 | node |




