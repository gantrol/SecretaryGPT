- 请求的通用事项？
  - 登录提示
    - 有个没author的bug，bing
        - {"type":2,"invocationId":"undefined","item":{"firstNewMessageIndex":null,"conversationId":"1e842157-1a12-40de-9a06-aec2a720c0d5","requestId":"87f87513-57aa-4a29-bdd9-3d98193f23c5","telemetry":{"metrics":null,"startTime":"2023-03-11T06:14:25.9964441Z"},"result":{"value":"UnauthorizedRequest","message":"The conversationSignature is not set and is required to ensure that you have permission to use our APIs. IsAuthenticated=False. App ID=","error":"UnauthorizedRequest","renewCert":true,"serviceVersion":"20230310.57"}}}
        - （本地图片）![img.png](build/img.png)
  - 请求失败（很可能是网络问题）
- ChatGPT 模型选择：GPT4（现在逻辑是选官方推荐的，也就是3.5）
- generate title api
- 自己的链接。。。
- ChatGPT Key
- 回复的复制按钮
- prompt workflow
  - 配置化
  - 编辑微调
    - 迭代？
      - 有没有playground？可以借鉴谁的？
        - 粘贴队列？
    - 处理No changes needed.
  - 重写润色
    - 请你自行判断主题，使内容整合为一篇文章
    - 去掉重复语句、口癖
  - 它来提问
    - 面试官
    - 考试复习
    - 哲理辩论
  - 是非明辨
  - 剪切板 https://chat.openai.com/chat/de34dec0-1d0b-4de1-be4c-98e44b2f2fe0
    - ```js
function copyToClipboard(text) {
navigator.clipboard.writeText(text).then(() => {
console.log('Text copied to clipboard');
}).catch(err => {
console.error('Failed to copy text: ', err);
});
}

function handleClickEvent(event) {
  const targetElement = event.target;
  const text = targetElement.textContent || targetElement.innerText;
  copyToClipboard(text);
}

document.addEventListener('click', handleClickEvent);

```
- 回车后，输入框高度
- ChatGPT获取标题
- 取消按钮
- 下一句的提示？
- 语言列表，输出格式的一部分？
  - 包括编程吗？还是列入结构化？
- 列表页
    - 本地存储
- UI redesign https://docs.plasmo.com/framework/content-scripts-ui/life-cycle#update-position
  - 尤其是更改宽度时，要了命……
  - 界面的小问题
    - 发送文字后，输入框高度不变
    - 发送文字后，到底。
    - 侧边栏要有最小最大宽度？
- ChatGPT聊天置顶？
  - 标题先搞好来
  - 存储？indexDB?
  - 配置？popup？
- /模式，寻址

