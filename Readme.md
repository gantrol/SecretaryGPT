# SecretaryGPT Web Extension

[![cn](https://img.shields.io/badge/看我-中文-blue.svg?style=for-the-badge&logo=appveyor)](README.zh_CN.md)

> In very early stage, not ready for use.

1. Chat with ChatGPT in the browser sidebar;
2. Select text on the webpage, and it's ready to be sent to ChatGPT;
3. More to come.


## Goals, Current Status, and Defects

Goal: a plugin that puts various AI chatbots in the browser "sidebar". There are also several prompt paradigms to be launched.

Currently implemented:

- Chat with ChatGPT (currently, each conversation will start a new session, but this will be changed to default to the same session unless cleared)
- Selecting text on current web page will update the input box on the right to this text (without retaining the original text, each window is independent)

![img.png](assets/demo.png)

There may be some bugs:

- The sidebar may not appear on some pages.
- The sidebar may not close properly on some pages.

## Reference

[1] SSE code from [chatgpt-api](https://github.com/transitive-bullshit/chatgpt-api#reverse-proxy)
