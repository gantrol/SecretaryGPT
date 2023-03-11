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
    import {chatTypeChatGPT} from "~utils/stores";
    import {chatTypes} from "~utils/constants";

    let isOpen = false;

    let selectedText = "";

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


    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("keyup", handleMouseUp);
</script>

<div id="secretaire-sidebar" class='{isOpen ? "open" : "closed"} bg-base-200 h-full'>

    <div class="drawer">
        <input id="chat-drawer" type="checkbox" class="drawer-toggle"/>
        <div class="drawer-content">
            <!-- Navbar -->
            <div class="
  sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 backdrop-blur transition-all duration-100
  bg-base-100 text-base-content shadow-sm
  ">
                <nav class="w-full navbar bg-base-300 flex flex-row justify-between">
                    <div class="flex-none">
                        <label for="chat-drawer" class="btn btn-primary drawer-button btn-ghost">
                            <svg width={30} height={30} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </label>
                    </div>
                    <h1 class="text-2xl font-bold">{$chatTypeChatGPT}</h1>
                    <div class="btn btn-primary btn-ghost">
<!--                        three dot, ellipsis-->
                        <svg width={30} height={30} focusable="false" xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 24 24">
                            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
                        </svg>
                    </div>
                    <!--                      TODO:  <li><a on:click={reflesh}>新对话</a></li>-->
                </nav>
            </div>
            <Chat
                    bind:inputText={selectedText}
                    chatType={chatTypeChatGPT}
            >
            </Chat>

        </div>
        <div class="drawer-side">
            <label for="chat-drawer" class="drawer-overlay"></label>
            <ul class="menu p-4 w-80 bg-base-100">
                <!-- Sidebar content here -->
                <SimpleSelect
                        bind:bind_value={$chatTypeChatGPT}
                        keys={chatTypes}
                        values={chatTypes}
                />
                <!--                TODO: need to reflesh? 做两套？-->
                <!--                <li><a on:click={() => chatType = chatTypes.ChatGPT}>ChatGPT</a></li>-->
                <!--                <li><a on:click={() => chatType = chatTypes.Bing}>Bing</a></li>-->
            </ul>
        </div>
    </div>
    <button class="sidebar-toggle" on:click={openOnClick}>
        <!--        TODO: 换成图标？打开就是拉开，合上就是合上-->
        <img src={isOpen ? icon_opened : icon_closed} alt="Extension Icon" width={30} height={30}/>
    </button>
</div>

