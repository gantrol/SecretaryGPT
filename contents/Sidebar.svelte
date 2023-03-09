<script context="module">
    import iconBase64 from "~/assets/icon.png"
    import cssText from "data-text:~/contents/sidebar.css"
    import "~/contents/sidebar-base.css"
    import "~/contents/base.css"

    export const config = {
        matches: ["<all_urls>"]
    }

    export const getShadowHostId = () => "sidebar"
    // Inject into the ShadowDOM
    export const getStyle = () => {
        const style = document.createElement("style")
        style.textContent = cssText
        return style
    }
</script>

<script>
    import Chat from "~components/Chat.svelte";

    let isOpen = true;

    let selectedText = "";

    function handleMouseUp() {
        // 在侧边栏选中的文字不算
        if (window.getSelection()?.baseNode?.tagName === 'HTML') {
            return ;
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
        // TODO: newConversation of the chat
    }

    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("keyup", handleMouseUp);
</script>

<div id="sidebar" class='{isOpen ? "open" : "closed"} bg-base-200 h-full'>
    <button class="sidebar-toggle" on:click={openOnClick}>
<!--        TODO: 换成图标？打开就是拉开，合上就是合上-->
        {isOpen ? "" : "🟣 拉开"}
    </button>
    <div class="drawer">
        <input id="chat-drawer" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content">
            <!-- Navbar -->
            <div class="absolute top-0 left-0 w-full navbar bg-base-300 flex flex-row justify-between">
                <div class="flex-none">
                    <label for="chat-drawer" class="btn btn-primary drawer-button btn-ghost">
                        <img src={iconBase64} alt="Extension Icon" width={30} height={30}/>
                    </label>
                </div>
                <h1 class="text-2xl font-bold text-center">Chat Title</h1>
                <button class="btn" on:click={openOnClick}>合上侧边栏</button>
<!--                      TODO:  <li><a on:click={reflesh}>新对话</a></li>-->
<!--                </div>-->
            </div>
            <Chat
                    bind:inputText={selectedText}
            >
            </Chat>

        </div>
        <div class="drawer-side">
            <label for="chat-drawer" class="drawer-overlay"></label>
            <ul class="menu p-4 w-80 bg-base-100">
                <!-- Sidebar content here -->
                <li><a>Sidebar Item 1</a></li>
                <li><a>Sidebar Item 2</a></li>
            </ul>
        </div>
    </div>
</div>

