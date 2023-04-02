# 小秘书-浏览器插件

[![cn](https://img.shields.io/badge/readme-English-blue.svg?style=for-the-badge&logo=appveyor)](README.EN.md)

你想有一位、甚至多位秘书，帮你刷新闻、为你解释一切吗？

> 非常早期的产品

1. 在浏览器侧边栏跟 ChatGPT 聊天。在网页选择好文字，就准备好发往 ChatGPT 了
2. 内置模式。还能合理处理长文本：
   1. 扮演解释。让 ChatGPT 自行判断对应角色，解释给你听
   2. 编辑微调。想多一位为你“审校”的编辑吗？这个模式可以帮你
   3. 摘要总结。支持超长文本总结，甚至能总结对话
3. 结果存留在 ChatGPT，也可以在当前页面下载回复部分的文本。

![img.png](assets/demo.png)

## 使用说明

### 使用准备

在使用插件的浏览器下，ChatGPT要在https://ai.com上登录

### 下载安装

下载：

1. 去到[发布](https://github.com/gantrol/SecretaryGPT/releases)，
2. 点击最新版本的 `chrome-mv3-prod.zip` ，开始下载
3. 解压缩

安装：
1. 打开 Google Chrome / Edge 浏览器。
2. 点击浏览器右上角的“菜单”按钮（通常是三个竖排的点或线）。
3. 选择“更多工具” > “扩展程序”选项。这将打开 Chrome 的扩展程序页面。
4. 在扩展程序页面，找到并点击页面右上角的“开发者模式”开关按钮。这将启用开发者模式，以便您可以手动加载已解压的扩展程序。
5. 点击页面左上角的“加载已解压的扩展程序”按钮。这将打开一个文件浏览器窗口。
6. 在文件浏览器窗口中，找到您刚刚解压缩的浏览器插件文件夹。选择该文件夹并点击“选择文件夹”按钮。
7. 如果一切正常，该插件应该已经被成功加载到 Chrome 浏览器中。在扩展程序页面中，您应该可以看到该插件的图标，并且可以在浏览器中使用该插件了。

## 介绍

### 侧边栏

![img.png](assets/demo.png)


## 参考

[1] SSE 代码 [chatgpt-api](https://github.com/transitive-bullshit/chatgpt-api#reverse-proxy)
