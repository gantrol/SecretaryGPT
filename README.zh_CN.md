# 小秘书-浏览器插件

> 非常早期的产品

1. 在浏览器侧边栏跟 ChatGPT 或 Bing 对话, 在网页选择好文字，就准备好发到 ChatGPT 了
2. 比较模式, ChatGPT vs Bing
3. “扮演解释”模式，让ChatGPT自动判定上下文大体是怎样的角色，然后给出解释

![img.png](assets/demo.png)

## 介绍

### 侧边栏

![img.png](assets/demo.png)

### ChatGPT vs Bing

![img.png](assets/chatGPT-vs-Bing.png)

![img.png](assets/chatGPT-vs-Bing1.png)

## 目标，现状与缺陷

一个小目标：一个将各类AI聊天机器人放到浏览器“侧边栏”的插件。还有几个将要推出的prompt范式。

认真地说，目前实现了：

- 跟ChatGPT对话
- 在左侧选择了一段文字，右侧输入框会自动变成这段文字（不保留原来的，各窗口独立）
- 一个模式

很可能有的bug：

- 个别页面这个侧边栏出不来
- 个别页面这个侧边栏合不起来

## 参考

[1] SSE 代码 [chatgpt-api](https://github.com/transitive-bullshit/chatgpt-api#reverse-proxy)
