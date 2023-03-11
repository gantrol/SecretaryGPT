<script>
    import {beforeUpdate, afterUpdate} from 'svelte';
    import SimpleSelect from "~components/SimpleSelect.svelte";
    import {languageI18n, LinkType, modeKeys, modeValues} from "~utils/constants";
    import PromptPreview from "~components/PromptPreview.svelte";
    import {chatTypeChatGPT} from "~utils/stores";
    import ChatContent from "~components/ChatContent.svelte";
    import {ChatViewModel} from "~utils/viewmodel";

    export let inputText = '';
    export let chatType = chatTypeChatGPT;

    export const getShadowHostId = () => "chat"

    // TODO: fix autoscroll
    let div;
    let autoscroll;

    const vm = new ChatViewModel(chatType);

    let language;
    let mode;

    let preview;
    $: {
        vm.chatType = $chatType;
        if (mode) {
            vm.mode = mode;
        }
        if (language) {
            vm.language = language;
        }
        preview = vm.handleMessage(inputText);
    }


    beforeUpdate(() => {
        autoscroll = div && (div.offsetHeight + div.scrollTop) > (div.scrollHeight - 20);
    });

    afterUpdate(() => {
        if (autoscroll) div.scrollTo(0, div.scrollHeight);
    });



    const handleKeydown = async (event) => {
        if (event.key === 'Enter' && event.shiftKey && !vm.isSending) {
            event.preventDefault();
            const text = event.target.value;
            if (!text) return;
            vm.messages = vm.messages.concat({
                author: 'user',
                text
            });
            event.target.value = '';
            await vm.sendMsg(text);
        }
    }

    const sendOnclick = async () => {
        if (!inputText || vm.isSending) return;
        vm.messages = vm.messages.concat({
            author: 'user',
            text: inputText
        });

        await vm.sendMsg(inputText);

        inputText = '';
    }

    chrome.runtime.onMessage.addListener((request, _sender, _sendResponse) => {
        if (request.type === 'ans' && request.chatType === vm.chatType) {
            const data = request.data;
            vm.newMessage = {
                id: data.messageId,
                author: "bot",
                text: data.text,
            }
            // console.log(data);

            vm.ChatID = data.conversationId;
        } else if (request.type === 'end' && request.chatType === vm.chatType) {
            console.log("end");
            vm.messages = vm.messages.concat(vm.newMessage);
            vm.newMessage = null;
            vm.isSending = false;
        }
    });


    const newConv = () => {
        // TODO: newConversation of the chat
        vm.renew();
    }
</script>

<!-- Page content here -->
<div class="chat flex flex-col w-full" id="chat-content">
    <div class="overflow-y-auto h-full mt-0 mb-[0.5em] mx-0 border-t-[#eee] border-t border-solid"
         bind:this={div}
    >
        <ChatContent messages={vm.messages} newMessage={vm.newMessage}></ChatContent>
        <div class="w-full h-64 md:h-64 flex-shrink-0"></div>
    </div>

    <div class="absolute bottom-0 left-0 w-full bg-base-200">
        {#if inputText}
            <PromptPreview {preview}></PromptPreview>
        {/if}
        <div class="flex flex-row form-control justify-between">
            <button on:click={newConv} class="btn btn-secondary">
                新对话
            </button>
<!--            <div>{$chatType}</div>-->
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
                <button on:click={sendOnclick} class="btn btn-primary" disabled={vm.isSending}>发送</button>
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
