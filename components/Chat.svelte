<script lang="ts">
    import {beforeUpdate, afterUpdate, onMount} from 'svelte';
    import SimpleSelect from "~components/SimpleSelect.svelte";
    import {languageI18n, messagesInit, modeKeys, modeValues, VideoSites} from "~utils/constants";
    import PromptPreview from "~components/PromptPreview.svelte";
    import ChatContent from "~components/ChatContent.svelte";
    import {ChatViewModel} from "~utils/viewmodel";
    import {log2} from "~utils/log";
    import {isDebugModeSetting} from "~utils/store/stores";
    import Send from "~components/icons/Send.svelte";
    import BiliBiliSubtitleSummary from "~components/video/BiliBiliSubtitleSummary.svelte";
    import MyMediaFooter from "~components/tailwind/MyMediaFooter.svelte";
    import WindowsMouse from "~components/icons/WindowsMouse.svelte";



    export let vm: ChatViewModel;
    export let isOpen: boolean;
    export const getShadowHostId = () => "chat"

    // TODO: fix autoscroll
    let div;
    let autoscroll;
    let textbox;

    let preview;
    const MAX_INPUT_HEIGHT = screen.height / 4;

    let hoverEnabled = false;

    let overlay;
    $: {
        preview = vm.handleMessage(vm.typingMessage);
    }


    beforeUpdate(() => {
        autoscroll = div && (div.offsetHeight + div.scrollTop) > (div.scrollHeight - 500);
    });

    afterUpdate(() => {
        if (autoscroll) div.scrollTo(0, div.scrollHeight);
    });

    const callback = () => {
        vm = vm;
        textbox.style.height = '1em';
    };

    isDebugModeSetting.init().then(() => {
        isDebugModeSetting.get().then((isDebugMode) => {
            if (isDebugMode) {
                vm.messages = messagesInit;
            }
        });
    });

    const handleKeydown = async (event) => {
        if (vm.isSending) {
            return;
        }
        await vm.handleKeydown(event, callback);
    }

    const sendOnclick = async (event) => {
        if (vm.isSending) {
            return;
        }
        await vm.sendOnclick(event, callback);
    }

    vm.initListener(callback)
    const show_more_button = (event) => {
        // TODO: vm.show_more_button();
        toggleHoverState(event)
    }

    const textAreaAdjust = (element, max) => {
        log2(element.scrollHeight);
        element.style.height = 'auto';
        const result = Math.min(max, element.scrollHeight);
        element.style.height = `${result}px`;
    }

    // 1. 如果是 https://*.bilibili.com/video/* 模式，而且视频有字幕，造一个带按钮的消息，问要不要总结字幕
        // 预览那里，增加"action"
    // 2+.如果点击总结，那么就下载字幕，然后由chatGPI处理（其他模式暂不支持）
    // TODO:
    // 2-.如果不需要？稍后在 show_more_button 处可以再次打开？
    // 3. 如果是 https://www.bilibili.com/read/cv* ……后面再说，总结文本会有通用方案。

    const textAreaOnChange = (event) => textAreaAdjust(event.target, MAX_INPUT_HEIGHT)
    const new_conv = () => {
        vm.renew();
        vm = vm;
    }
    const continue_command = () => {
        if (vm.isSending) {
            return;
        }
        vm.sendMsg("incomplete result, continue");
    }

    onMount(() => {
        document.addEventListener('mouseover', e => {
            if (!overlay) return;
            if (hoverEnabled) {
                let elem = e.target as HTMLElement;
                let rect = elem.getBoundingClientRect();
                overlay.style.top = rect.top + 'px';
                overlay.style.left = rect.left + 'px';
                overlay.style.width = rect.width + 'px';
                overlay.style.height = rect.height + 'px';
            } else {
                overlay.style.top = '-9999px';
                overlay.style.left = '-9999px';
                overlay.style.width = '0px';
                overlay.style.height = '0px';
            }
        });

        document.addEventListener('click', e => {
            if (hoverEnabled) {
                e.preventDefault();
                e.stopPropagation();
                let elem = e.target as HTMLElement;
                console.log('Element selected:', elem);
                const selectedText = selectElementText(elem);
                vm.typingMessage = selectedText;
                hoverEnabled = false;
            }
        });
    });

    function selectElementText(element) {
        let selectedText = '';

        if (window.getSelection) {
            const selection = window.getSelection();
            const range = document.createRange();
            range.selectNodeContents(element);
            selection.removeAllRanges();
            selection.addRange(range);
            selectedText = selection.toString();
        }

        return selectedText;
    }



    function toggleHoverState(event) {
        event.stopPropagation(); // Add this line to stop event propagation
        hoverEnabled = !hoverEnabled;
    }


    $: console.log(hoverEnabled);
</script>

<div bind:this={overlay}
     class="fixed z-50 inset-0 bg-blue-400 bg-opacity-30 pointer-events-none transition duration-200"
     id="mouseover_overlay"
     style="top: -9999px; left: -9999px; width: 0; height: 0;">
</div>



<div class="chat flex flex-col w-full bg-base-100 h-full relative" id="chat-content">
    <div class="absolute inset-0 mt-0 mb-[0.5em] mx-0 overflow-y-auto"
         bind:this={div}
    >
        <ChatContent messages={vm.messages} newMessage={vm.newMessage}></ChatContent>
<!--        TODO: 加一个模型选择-->
        <MyMediaFooter/>
    </div>
</div>


<div class="absolute bottom-0 left-0 w-full bg-base-300" aria-labelledby="footer-heading">
<!--    TODO: 暂不抽离-->
<!--    <ActionBar {vm}></ActionBar>-->
    {#if VideoSites.BILIBILI.test(window.location.href)}
        <BiliBiliSubtitleSummary
                {vm}
                bind:isOpen={isOpen}
        ></BiliBiliSubtitleSummary>
    {/if}
    {#if vm.typingMessage}
        <PromptPreview {preview}></PromptPreview>
    {/if}
    <div class="flex flex-row form-control justify-around bg-base-300 p-1">
        <div class="btn btn-warning" on:click={new_conv}>新对话</div>
        <div class="btn btn-info text-base-100" on:click={continue_command}>继续</div>
        <SimpleSelect
                bind:bind_value={vm.mode}
                keys={modeKeys}
                values={modeValues}>
        </SimpleSelect>
        <SimpleSelect
                bind:bind_value={vm.language}
                keys={languageI18n}
                values={languageI18n}>
        </SimpleSelect>
    </div>
    <div class="flex flex-row items-end max-h-1/2 p-1">
        <button class="btn glass p-2 mb-3" on:click={show_more_button}>
            <WindowsMouse/>
        </button>
        <textarea
                bind:this={textbox}
                rows="1"
                on:keydown={handleKeydown}
                on:input={textAreaOnChange}
                on:mousedown={textAreaOnChange}
                bind:value={vm.typingMessage}
                placeholder="Shift+Enter 发送，Enter 换行"
                id="sidebar-chat-input"
                class="textarea textarea-bordered textarea-md
                      overflow-y-auto bg-base-100
                      w-full resize-none mb-2 ml-2 mr-2"
        ></textarea>
        <button class="btn glass p-2 mb-3 mr-1" on:click={sendOnclick}>
            <Send/>
        </button>
    </div>

    <!--  TODO:  <div>登录状态: {isLogin}</div>-->
    <!--        <div>-->
    <!--            <p>TODO: make chat list ? {ChatID}</p>-->
    <!--        </div>-->
</div>
