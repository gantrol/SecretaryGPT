
- 获取标题
- prompt workflow
  - 扮演解释
    - 开场白：请根据下面的片段，推断写作者是什么角色。并模仿这类角色，并用{{语言}}解释这段话：{{用户选择的文本}}
    - 过程：同开场白
    - 中途追问：{{用户选择的文本}} || continue，用{{语言}}回复
    - 收尾：请用{{语言}}总结以上所有文本
  - 摘录总结
    - 开场白：我将持续摘录{{网站}}的内容，每发一段摘录，请你都用{{语言}}总结这段话：{{用户选择的文本}}
    - 过程：请你用{{语言}}总结这段话：{{用户选择的文本}}
    - 中途追问：{{用户选择的文本}} || continue，用{{语言}}回复
    - 收尾：请用{{语言}}总结以上所有文本
  - 翻译？其实不如deepl
  - 它来提问
  - 是非明辨
- 语言列表，输出格式的一部分？
  - 包括编程吗？还是列入结构化？
- 列表页
    - 本地存储
- UI redesign https://docs.plasmo.com/framework/content-scripts-ui/life-cycle#update-position
- ChatGPT聊天置顶？
  - 标题先搞好来
  - 存储？indexDB?
  - 配置？popup？
- /模式，寻址
- 有个没author的bug，bing
  {"type":2,"invocationId":"undefined","item":{"firstNewMessageIndex":null,"conversationId":"1e842157-1a12-40de-9a06-aec2a720c0d5","requestId":"87f87513-57aa-4a29-bdd9-3d98193f23c5","telemetry":{"metrics":null,"startTime":"2023-03-11T06:14:25.9964441Z"},"result":{"value":"UnauthorizedRequest","message":"The conversationSignature is not set and is required to ensure that you have permission to use our APIs. IsAuthenticated=False. App ID=","error":"UnauthorizedRequest","renewCert":true,"serviceVersion":"20230310.57"}}}
![img.png](build/img.png)

- 今日之星应当引入关注数，不过这样，网络请求会多？
- 本来想做今天全部摘要的，一看好多人关注几百上千……
- 改成区域？
- 微博关注日报
- 在button处看目录……
- tailwindcss 代码显示
- lg的时候，侧边栏直接显示，菜单栏也显示
- 一个显示bug
- links target _blank
