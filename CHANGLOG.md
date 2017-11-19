# Miox change logs

> Since the 5.1.11 version, we will provide change logs for each version of the update.

## v5.1.12 - beta

- 删除`src/miox-convert`模块，因为没有历史包袱，我们不需要使用这个模块。
- `webview:beforeEnter`事件，不再对于新创建webview过程而言，而是对于整个过程而言。因为将要展示的webview必定是存在的。但是可能选取的时候是不存在的。