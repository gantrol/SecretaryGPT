<script lang="ts">
    import {beforeUpdate, afterUpdate} from 'svelte';
    import SimpleSelect from "~components/SimpleSelect.svelte";
    import {languageI18n, messagesInit, modeKeys, modeValues} from "~utils/constants";
    import PromptPreview from "~components/PromptPreview.svelte";
    import ChatContent from "~components/ChatContent.svelte";
    import {ChatViewModel} from "~utils/viewmodel";
    import Icon from "~components/Icon.svelte";

    import send from "~assets/icons/send.svg";
    import plus_circle from "~assets/icons/plus-circle.svg";
    import {log2} from "~utils/log";
    import {isDebugModeSetting} from "~utils/store/stores";



    export let vm: ChatViewModel;

    export const getShadowHostId = () => "chat"

    // TODO: fix autoscroll
    let div;
    let autoscroll;

    let preview;
    const MAX_INPUT_HEIGHT = screen.height / 2;

    $: {
        preview = vm.handleMessage(vm.typingMessage);
    }


    beforeUpdate(() => {
        autoscroll = div && (div.offsetHeight + div.scrollTop) > (div.scrollHeight - 20);
    });

    afterUpdate(() => {
        if (autoscroll) div.scrollTo(0, div.scrollHeight);
    });

    const callback = () => {
        vm = vm;
    };

    isDebugModeSetting.init().then(() => {
        isDebugModeSetting.get().then((isDebugMode) => {
            if (isDebugMode) {
                vm.messages = messagesInit;
            }
        });
    });

    const handleKeydown = async (event) => {
        await vm.handleKeydown(event, callback);
    }

    const sendOnclick = async (event) => {
        await vm.sendOnclick(event, callback);
    }

    vm.initListener(callback)
    let show_more_button = () => {
        // TODO: vm.show_more_button();
    }

    const textAreaAdjust = (element, max) => {
        log2(element.scrollHeight);
        element.style.height = 'auto';
        const result = Math.min(max, element.scrollHeight);
        element.style.height = `${result}px`;
    }

    const textAreaOnChange = (event) => textAreaAdjust(event.target, MAX_INPUT_HEIGHT)
</script>

<!-- Page content here -->

<div class="chat flex flex-col w-full bg-base-100" id="chat-content">
    <div class="overflow-y-auto h-full mt-0 mb-[0.5em] mx-0"
         bind:this={div}
    >
        <ChatContent messages={vm.messages} newMessage={vm.newMessage}></ChatContent>
        <div class="w-full h-64 md:h-64 flex-shrink-0"></div>
    </div>


</div>
<div class="absolute bottom-0 left-0 w-full">
    {#if vm.typingMessage}
        <PromptPreview {preview}></PromptPreview>
    {/if}
    <div class="flex flex-row form-control justify-end">
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
    <div class="flex flex-row items-end max-h-1/2">
        <button class="btn btn-ghost p-2 mb-3" on:click={show_more_button}>
            <Icon src={plus_circle} alt="show more"></Icon>
        </button>
        <!--            TODO: 编辑模式？ 直接改成row等于十?-->
        <textarea
                rows="1"
                on:keydown={handleKeydown}
                on:input={textAreaOnChange}
                on:mousedown={textAreaOnChange}
                bind:value={vm.typingMessage}
                placeholder="Shift+Enter 发送，Enter 换行"
                id="sidebar-chat-input"
                class="textarea textarea-bordered textarea-md
                      overflow-y-auto
                      w-full resize-none mb-2"
        ></textarea>
        <button class="absolute right-0.5 btn btn-ghost p-2 mb-3 mr-2" on:click={sendOnclick} disabled={vm.isSending}>
            <Icon src={send} alt="send"></Icon>
        </button>
    </div>

    <!--  TODO:  <div>登录状态: {isLogin}</div>-->
    <!--        <div>-->
    <!--            <p>TODO: make chat list ? {ChatID}</p>-->
    <!--        </div>-->
</div>
