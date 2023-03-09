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
        const selection = getSelected();

        if (selection) {
            selectedText = selection;
        }
    }

    function getSelected() {
        const selection = window.getSelection();
        return selection.toString().trim();
    }

    const openOnClikc = () => isOpen = !isOpen;

    const reflesh = () => {
        // TODO: refresh the chat
    }

    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("keyup", handleMouseUp);
</script>

<div id="sidebar" class='{isOpen ? "open" : "closed"} bg-base-200'>
    <button class="sidebar-toggle" on:click={openOnClikc}>
        {isOpen ? "" : "🟣 拉开"}
    </button>
    <div class="drawer">
        <input id="chat-drawer" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content flex flex-col">
            <!-- Navbar -->
            <div class="w-full navbar bg-base-300">
                <div class="flex-none">
                    <label for="chat-drawer" class="btn btn-primary drawer-button btn-ghost">
                        <img src={iconBase64} alt="Extension Icon" width={35} height={35}/>
                    </label>
                </div>
                <h1 class="flex-auto text-2xl font-bold text-center">Chat Title</h1>
                <div class="dropdown dropdown-bottom dropdown-end">
                    <label tabindex="0" class="btn m-1">菜单栏</label>
                    <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a on:click={openOnClikc}>合上侧边栏</a></li>
<!--                      TODO:  <li><a on:click={reflesh}>新对话</a></li>-->
                    </ul>
                </div>
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

