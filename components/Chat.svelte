<script>
    import {beforeUpdate, afterUpdate} from 'svelte';
    import Message from "~components/Message.svelte";

    // TODO: “new topic”
    export let inputText = '';

    export const getShadowHostId = () => "chat"

    // TODO: fix autoscroll
    let div;
    let autoscroll;

    let isLogin = '';
    let ChatID = '';

    // TODO: in all page?
    let isSending = false;
    let messages = [
    ];

    let newMessage = null;


    beforeUpdate(() => {
        autoscroll = div && (div.offsetHeight + div.scrollTop) > (div.scrollHeight - 20);
    });

    afterUpdate(() => {
        if (autoscroll) div.scrollTo(0, div.scrollHeight);
    });

    function handleKeydown(event) {
        if (event.key === 'Enter' && event.shiftKey && !isSending) {
            event.preventDefault();
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

    const sendOnclick = () => {
        if (!inputText || isSending) return;
        messages = messages.concat({
            author: 'user',
            text: inputText
        });

        sendMsg(inputText);

        inputText = '';
    }

    const sendMsg = async (message) => {
        if (!message || isSending) return;
        isSending = true;
        if (ChatID) {
            chrome.runtime.sendMessage({
                type: 'sendMsg',
                body: {
                    prompt: message,
                    conversation_id: ChatID,
                    parent_message_id: messages[messages.length - 2].id,  // 上一个回复在倒数第二个
                }
            });
        } else {
            chrome.runtime.sendMessage({
                type: 'newCov',
                body: {
                    prompt: message,
                }
            });
        }

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
            isSending = false;
        }
    });
</script>

<div class="chat flex flex-col h-full w-full">
    <slot></slot>
    <div class="flex-auto overflow-y-auto mt-0 mb-[0.5em] mx-0 border-t-[#eee] border-t border-solid"
         bind:this={div}
    >
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
        <button on:click={sendOnclick} class="btn btn-primary" disabled={isSending}>发送</button>
    </div>
<!--  TODO:  <div>登录状态: {isLogin}</div>-->
    <div>ChatID:
        <input type="text" bind:value={ChatID} placeholder="请输入ChatID"
               class="input input-bordered input-md w-full max-w-xs"/>
    </div>
</div>
