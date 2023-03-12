<script lang="ts">
    import {beforeUpdate, afterUpdate} from 'svelte';
    import SimpleSelect from "~components/SimpleSelect.svelte";
    import {languageI18n, modeKeys, modeValues} from "~utils/constants";
    import PromptPreview from "~components/PromptPreview.svelte";
    import ChatContent from "~components/ChatContent.svelte";
    import {ChatViewModel} from "~utils/viewmodel";

    export let vm: ChatViewModel;

    export const getShadowHostId = () => "chat"

    // TODO: fix autoscroll
    let div;
    let autoscroll;


    let language;
    let mode;

    let preview;
    $: {
        if (mode) {
            vm.mode = mode;
        }
        if (language) {
            vm.language = language;
        }
        preview = vm.handleMessage(vm.typingMessage);
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
            const text =vm.typingMessage;
            if (!text) return;
            vm.messages = vm.messages.concat({
                author: 'user',
                text
            });
            await vm.sendMsg();
            vm.typingMessage = '';
        }
    }

    const sendOnclick = async () => {
        if (!vm.typingMessage || vm.isSending) return;
        vm.messages = vm.messages.concat({
            author: 'user',
            text: vm.typingMessage
        });

        await vm.sendMsg();

        vm.typingMessage = '';
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
        {#if vm.typingMessage}
            <PromptPreview {preview}></PromptPreview>
        {/if}
        <div class="flex flex-row form-control justify-between">

            <!--            <div>{$chatType}</div>-->
            <div class="input-group justify-end">
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
        <div>
            <textarea on:keydown={handleKeydown} bind:value={vm.typingMessage} placeholder="Shift+Enter 发送，Enter 换行"
                      id="sidebar-chat-input"
                      class="textarea textarea-bordered textarea-md w-full"></textarea>
            <button class="absolute p-1 rounded-md text-gray-500 bottom-1.5 right-1 md:bottom-2.5 md:right-2 hover:bg-gray-100 dark:hover:text-gray-400 dark:hover:bg-gray-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent">
                <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round"
                     stroke-linejoin="round" class="h-4 w-4 mr-1" height="1em" width="1em"
                     xmlns="http://www.w3.org/2000/svg">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
            </button>
        </div>

        <!--  TODO:  <div>登录状态: {isLogin}</div>-->
        <!--        <div>-->
        <!--            <p>TODO: make chat list ? {ChatID}</p>-->
        <!--        </div>-->
    </div>
</div>
