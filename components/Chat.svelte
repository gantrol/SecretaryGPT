<script lang="ts">
    import {beforeUpdate, afterUpdate} from 'svelte';
    import SimpleSelect from "~components/SimpleSelect.svelte";
    import {languageI18n, messagesInit, modeKeys, modeValues} from "~utils/constants";
    import PromptPreview from "~components/PromptPreview.svelte";
    import ChatContent from "~components/ChatContent.svelte";
    import {ChatViewModel} from "~utils/viewmodel";
    import Icon from "~components/Icon.svelte";
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
<div class="sticky bottom-0 left-0 w-full bg-base-300">
    {#if vm.typingMessage}
        <PromptPreview {preview}></PromptPreview>
    {/if}
    <div class="flex flex-row form-control justify-between bg-base-300 p-1">
        <div class="btn btn-warning">?????????</div>
        <div class="btn btn-info text-base-100">??????</div>
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
            <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="text-info"
            >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
        </button>
        <!--            TODO: ??????????????? ????????????row??????????-->
        <textarea
                rows="1"
                on:keydown={handleKeydown}
                on:input={textAreaOnChange}
                on:mousedown={textAreaOnChange}
                bind:value={vm.typingMessage}
                placeholder="Shift+Enter ?????????Enter ??????"
                id="sidebar-chat-input"
                class="textarea textarea-bordered textarea-md
                      overflow-y-hidden bg-base-100
                      w-full resize-none mb-2 ml-2 mr-2"
        ></textarea>
        <button class="btn glass p-2 mb-3 mr-1" on:click={sendOnclick} disabled={vm.isSending}>
            <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="27"
                    height="27"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="text-info"
            >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
        </button>
    </div>

    <!--  TODO:  <div>????????????: {isLogin}</div>-->
    <!--        <div>-->
    <!--            <p>TODO: make chat list ? {ChatID}</p>-->
    <!--        </div>-->
</div>
