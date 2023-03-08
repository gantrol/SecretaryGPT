<script>
    import {beforeUpdate, afterUpdate} from 'svelte';
    import Message from "~components/Message.svelte";

    export let inputText = '';

    export const getShadowHostId = () => "chat"
    let div;
    let autoscroll;

    let isLogin = '';
    let ChatID = '';


    beforeUpdate(() => {
        autoscroll = div && (div.offsetHeight + div.scrollTop) > (div.scrollHeight - 20);
    });

    afterUpdate(() => {
        if (autoscroll) div.scrollTo(0, div.scrollHeight);
    });


    let messages = [
        {author: 'user', text: "# test\n\n```python\nprint('hello world')\n```"},
        {
            "text": "Hello! This is ChatGPT, a language model trained by OpenAI. It looks like you have provided a simple Python code snippet to print \"hello world\" to the console. If you run this code, it should output \"hello world\" as expected. \n\nIs there anything else I can help you with?",
            author: "bot",
            "messageId": "31334cd7-bcea-4bd4-a1a3-99a6e710435d",
            "conversationId": "ba71a1ea-b926-4be0-87f1-eb78cb501359"
        },
    ];

    let newMessage = null;

    function handleKeydown(event) {
        if (event.key === 'Enter' && event.shiftKey) {
            const text = event.target.value;
            if (!text) return;
            messages = messages.concat({
                author: 'user',
                text
            });
            event.target.value = '';
            console.log(text)
            sendMsg(text);
        }
    }

    const handleSender = () => {
        messages = messages.concat({
            author: 'user',
            text: inputText
        });

        sendMsg(inputText);

        inputText = '';
    }

    const sendMsg = async (message) => {
        if (!message) return;
        // TODO: 在某处开启界面限制
        chrome.runtime.sendMessage({
            type: 'newCov',
            body: {
                prompt: message,
            }
        });
    }

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.type === 'ans') {
            const data = request.data;
            newMessage = {
                id: data.messageId,
                author: "bot",
                text: data.text,
            }
            console.log(data);

            ChatID = data.conversationId;
        } else if (request.type === 'end') {
            console.log("end");
            messages = messages.concat(newMessage);
            newMessage = null;
            // TODO: done , 取消界面限制
        }
    });
</script>

<div class="chat flex flex-col h-full w-full">
    <slot></slot>
    <div class="flex-auto overflow-y-auto mt-0 mb-[0.5em] mx-0 border-t-[#eee] border-t border-solid" bind:this={div}>
        {#each messages as message}
            <Message {message}></Message>
        {/each}
        {#if newMessage !== undefined && newMessage !== null}
            <article class="prose">
                <Message message={newMessage}></Message>
            </article>
        {/if}
    </div>

    <div class="flex">
        <textarea on:keydown={handleKeydown} bind:value={inputText} placeholder="请输入"
                  class="textarea textarea-bordered textarea-md w-full max-w-xs"></textarea>
        <button on:click={handleSender} class="btn btn-primary">发送</button>
    </div>
<!--  TODO:  <div>登录状态: {isLogin}</div>-->
    <div>ChatID:
        <input type="text" bind:value={ChatID} placeholder="请输入ChatID"
               class="input input-bordered input-md w-full max-w-xs"/>
    </div>
</div>
