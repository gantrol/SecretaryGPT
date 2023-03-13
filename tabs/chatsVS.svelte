<script>
    import {ChatViewModel} from "~utils/viewmodel";
    import ChatContent from "~components/ChatContent.svelte";
    import SimpleSelect from "~components/SimpleSelect.svelte";
    import PromptPreview from "~components/PromptPreview.svelte";
    import {chatTypes, languageI18n, modeKeys, modeValues} from "~utils/constants";
    import iconBase64 from "~/assets/icon.png";

    let chatGptVM = new ChatViewModel(chatTypes.ChatGPT);
    let bingVM = new ChatViewModel(chatTypes.Bing);

    let inputText = '';
    let preview;
    let language;
    let mode;
    $: {
        // TODO: make config class
        if (mode) {
            bingVM.mode = mode;
            chatGptVM.mode = mode;
        }
        if (language) {
            bingVM.language = language;
            chatGptVM.language = language;
        }
        bingVM.typingMessage = inputText;
        chatGptVM.typingMessage = inputText;
        preview = bingVM.handleMessage(bingVM.typingMessage);
    }

    const handleKeydown = async (event) => {
        chatGptVM.handleKeydown(event, chatGptCallback);
        bingVM.handleKeydown(event, bingCallback);
    }

    const sendOnclick = async (event) => {
        chatGptVM.sendOnclick(event, chatGptCallback);
        bingVM.sendOnclick(event, bingCallback);
    }

    const check = () => {
        return chatGptVM.isSending || bingVM.isSending;
    }

    const chatGptCallback = () => {
        chatGptVM = chatGptVM;
    };

    const bingCallback = () => {
        bingVM = bingVM;
    };

    chatGptVM.initListener(chatGptCallback);
    bingVM.initListener(bingCallback);

    let isOpen = false;
    const openOnClick = () => isOpen = !isOpen;
</script>

<svelte:head>
    <title>ChatAI VS</title>
</svelte:head>

<style>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

</style>

<div class="drawer">
    <input id="chat-drawer" type="checkbox" class="drawer-toggle"/>
    <div class="drawer-content" style="scroll-behavior: smooth; scroll-padding-top: 5rem;">
        <div class="
  sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 backdrop-blur transition-all duration-100
  bg-base-100 text-base-content shadow-sm
  ">
            <nav class="w-full navbar bg-base-300 flex flex-row justify-between">
                <div class="flex-none">
<!--                    <label for="chat-drawer" class="btn btn-primary drawer-button btn-ghost">-->
                    <label class="btn btn-primary drawer-button btn-ghost">
                        <img src={iconBase64} alt="Extension Icon" width={30} height={30}/>
                    </label>
                </div>
                <h1 class="text-2xl font-bold text-center">ChatGPT</h1>
                <h1 class="text-2xl font-bold text-center">VS</h1>
                <h1 class="text-2xl font-bold text-center">Bing</h1>
                <div></div>
            </nav>
        </div>

        <div class="chat flex flex-col w-full">
            <div class="flex flex-row justify-around">
                <div class="overflow-y-auto h-full mt-0 mb-[0.5em] mx-0 border-t-[#eee] border-t border-solid ">
                    <ChatContent messages={chatGptVM.messages} newMessage={chatGptVM.newMessage}></ChatContent>
                    <div class="w-full h-64 md:h-64 flex-shrink-0"></div>
                </div>
                <div class="overflow-y-auto h-full mt-0 mb-[0.5em] mx-0 border-t-[#eee] border-t border-solid">
                    <ChatContent messages={bingVM.messages} newMessage={bingVM.newMessage}></ChatContent>
                    <div class="w-full h-64 md:h-64 flex-shrink-0"></div>
                </div>
            </div>

            <div class="absolute bottom-0 left-0 w-full bg-base-200">
                {#if inputText}
                    <PromptPreview {preview}></PromptPreview>
                {/if}
                <div class="flex flex-row form-control justify-between">
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
                        <button on:click={sendOnclick} class="btn btn-primary" disabled={check()}>发送</button>
                    </div>
                </div>
                <textarea on:keydown={handleKeydown} bind:value={inputText} placeholder="请输入"
                          id="sidebar-chat-input"
                          class="textarea textarea-bordered textarea-md w-full"></textarea>
                <!--  TODO:  <div>登录状态: {isLogin}</div>-->
                <!--        <div>-->
                <!--            <p>TODO: {ChatID}</p>-->
                <!--        </div>-->
                <div class="drawer-side">
                    <label for="chat-drawer" class="drawer-overlay"></label>

                </div>
            </div>
        </div>
    </div>
</div>
