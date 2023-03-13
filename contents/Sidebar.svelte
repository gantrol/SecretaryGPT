<script context="module">
    import icon_closed from "~/assets/icon.png"
    import icon_opened from "~/assets/icon1.png"
    import cssText from "data-text:~/contents/sidebar.css"
    import "~/contents/sidebar-base.css"

    export const config = {
        matches: ["<all_urls>"]
    }

    export const getShadowHostId = () => "secretaire-sidebar"
    // Inject into the ShadowDOM
    export const getStyle = () => {
        const style = document.createElement("style")
        style.textContent = cssText
        return style
    }

</script>

<script>
    import Chat from "~components/Chat.svelte";
    import SimpleSelect from "~components/SimpleSelect.svelte";
    import {chatTypes, Settings} from "~utils/constants";
    import {ChatViewModel} from "~utils/viewmodel";
    import PromiseWaiting from "~components/PromiseWaiting.svelte";
    import {browserSyncStorage} from "~utils/store/browser";
    import Links from "~components/Links.svelte";
    import Icon from "~components/Icon.svelte";

    let isOpen;

    let promises = [
        new Promise(async (resolve) => {
            let test = browserSyncStorage(Settings.alwaysOpen, false);
            console.log("isOpen", test);
            await test.init();
            isOpen = await test.get();
            resolve(isOpen);
        })
    ];

    let selectedText = "";

    let chatType = chatTypes.ChatGPT;

    $: vm = new ChatViewModel(chatType);
    $: vm.typingMessage = selectedText;

    function handleMouseUp() {
        // 在侧边栏选中的文字不算
        if (window.getSelection()?.baseNode?.tagName === 'HTML') {
            return;
        }
        const selection = getSelected();

        if (selection) {
            selectedText = selection;
        }
    }

    function getSelected() {
        const selection = window.getSelection();
        return selection.toString().trim();
    }

    const openOnClick = () => isOpen = !isOpen;

    const newConv = () => {
        selectedText = "";
    }


    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("keyup", handleMouseUp);
</script>

<PromiseWaiting promises={promises}>
    <div id="secretaire-sidebar" class='{isOpen ? "open" : "closed"} h-full'>
        <div class="drawer">
            <input id="chat-drawer" type="checkbox" class="drawer-toggle"/>
            <div class="drawer-content">
                <!-- Navbar -->
                <div class="
  sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 backdrop-blur transition-all duration-100
   text-base-content shadow-sm
  ">
                    <nav class="w-full navbar bg-base-300 flex flex-row justify-between">
                        <div class="flex-none">
                            <label for="chat-drawer" class="btn btn-primary drawer-button btn-ghost">
                                <svg width={30} height={30} xmlns="http://www.w3.org/2000/svg" fill="none"
                                     viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                          d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                            </label>
                        </div>
                        <h1 class="text-2xl font-bold">{chatType}</h1>
                        <div class="dropdown dropdown-bottom dropdown-end">
                            <!--                        three dot, ellipsis-->
                            <label tabindex="0" class="btn btn-ghost">
                                <svg width={30} height={30} focusable="false" xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 24 24">
                                    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
                                </svg>
                            </label>

                            <ul class="dropdown-content menu bg-base-100 w-56 p-2 rounded-box">
                                <li class="menu-title">
                                    <span>插件功能</span>
                                </li>
                                <Links isLink={true}></Links>
                                <li class="menu-title">
                                    <span>聊天后端</span>
                                </li>
                                <SimpleSelect
                                        bind:bind_value={chatType}
                                        keys={chatTypes}
                                        values={chatTypes}
                                />
                            </ul>
                        </div>
                        <!--                                          <li><a on:click={newConv}>新对话</a></li>-->
                    </nav>
                </div>
                <Chat
                        bind:vm={vm}
                >
                </Chat>

            </div>
            <div class="drawer-side">
                <label for="chat-drawer" class="drawer-overlay"></label>
                <ul class="menu p-4 w-80 bg-base-100">
                    <li>施工中pin tab?</li>
                </ul>
            </div>
        </div>
        <div class="btn btn-ghost sidebar-toggle" on:click={openOnClick}>
            <div class="rounded-full {isOpen ? '' : 'ring ring-accent'} ring-offset-base-100 ring-offset-2">
                <Icon src={isOpen ? icon_opened : icon_closed} alt={isOpen ? "打开": "合上"}/>
            </div>
        </div>
    </div>

</PromiseWaiting>
