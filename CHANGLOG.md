# Miox change logs

> Since the 5.1.11 version, we will provide change logs for each version of the update.

## v5.1.14

- 修正`dictionary`中key变量全部字符串化的Bug.

## v5.1.13

- 去掉`index.css`中的`padding` `margin`
- 新增`.inactive`class

## v5.1.12

- 删除`src/miox-convert`模块，因为没有历史包袱，我们不需要使用这个模块。
- `webview:beforeEnter`事件，不再对于新创建webview过程而言，而是对于整个过程而言。因为将要展示的webview必定是存在的。但是可能选取的时候是不存在的。
- 在miox页面切换的时候，增加`.inactive`类，与`.active`对应。同时更新animate.js的动画处理逻辑，使其能够更加自如应对各种情况。
- 修改`miox-css`中的`.mx-webview>*`样式，要求是一个全屏容器。