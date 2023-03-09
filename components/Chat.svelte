<script>
    import {beforeUpdate, afterUpdate} from 'svelte';
    import Message from "~components/Message.svelte";
    import SimpleSelect from "~components/SimpleSelect.svelte";
    import {languageI18n, modeKeys, modeValues} from "~utils/constants";
    import PromptPreview from "~components/PromptPreview.svelte";

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

    let language;
    let mode;

    let preview;
    $: preview = handleMessage(inputText, mode, language);

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

        message = handleMessage(message, mode, language);
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
            // console.log(data);

            ChatID = data.conversationId;
        } else if (request.type === 'end') {
            console.log("end");
            messages = messages.concat(newMessage);
            newMessage = null;
            isSending = false;
        }
    });

    // TODO: preview the message in preview?
    const handleMessage = (message, mode, language) => {
        // mode value
        // TODO: i18n？
        if (mode === modeKeys.EXPLAIN) {
            message = `请根据下面的片段，推断写作者是什么角色。并模仿这类角色做出解释：\n\n${message}`;
        } else if (mode === modeKeys.SUMMARY) {
            message = `请根据下面的片段，总结写作者的观点：\n\n${message}`;
        }

        // language value
        if (language && language !== languageI18n.NONE) {
            message = `${message}, 请用${language}回答`;
        }
        return message;
    }
</script>

<!-- Page content here -->
<div class="chat flex flex-col w-full" id="chat-content">
    <div class="overflow-y-auto h-full mt-0 mb-[0.5em] mx-0 border-t-[#eee] border-t border-solid"
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
        <div class="w-full h-64 md:h-64 flex-shrink-0"></div>
    </div>



    <div class="absolute bottom-0 left-0 w-full bg-base-200">
        {#if inputText}
            <PromptPreview {preview}></PromptPreview>
        {/if}
        <div class="flex flex-row form-control justify-between">
            <button class="btn btn-secondary">
                新对话
            </button>
            <div class="input-group justify-end">
                <!--            preview？-->
                <SimpleSelect
                        bind:bind_value={mode}
                        keys={modeKeys}
                        values={modeValues}>
                </SimpleSelect>
                <SimpleSelect
                        bind:bind_value={language}
                        keys={languageI18n}
                        values={languageI18n}>
                </SimpleSelect>
                <button on:click={sendOnclick} class="btn btn-primary" disabled={isSending}>发送</button>
            </div>
        </div>
        <textarea on:keydown={handleKeydown} bind:value={inputText} placeholder="请输入"
                  id="sidebar-chat-input"
                  class="textarea textarea-bordered textarea-md w-full"></textarea>
        <!--  TODO:  <div>登录状态: {isLogin}</div>-->
<!--        <div>-->
<!--            <p>TODO: {ChatID}</p>-->
<!--        </div>-->
    </div>
</div>
