<script context="module">
    import iconBase64 from "~/assets/icon.png"
    import cssText from "data-text:~/contents/sidebar.css"
    import "~/contents/sidebar-base.css"
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

    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("keyup", handleMouseUp);
</script>

<div id="sidebar" class={isOpen ? "open" : "closed"}>
    <button class="sidebar-toggle" on:click={() => isOpen = !isOpen}>
        {isOpen ? "🟡 合上" : "🟣 拉开"}
    </button>
    <Chat
            bind:inputText={selectedText}
    >
        <img src={iconBase64} alt="Extension Icon" width={35} height={35}/>
    </Chat>
</div>

