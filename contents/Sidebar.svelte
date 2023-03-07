<script context="module" lang="ts">
    import iconBase64 from "~/assets/icon.png"
    import cssText from "data-text:~/contents/sidebar.css"
    import type {PlasmoCSConfig} from "plasmo"
    import "~/contents/sidebar-base.css"

    export const config: PlasmoCSConfig = {
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
</script>
<style>
    .popup {
        position: absolute;
        background-color: white;
        border: 1px solid black;
        padding: 5px;
        font-size: 12px;
        z-index: 9999;
    }
</style>

<div id="sidebar" class={isOpen ? "open" : "closed"}>
    <button class="sidebar-toggle" on:click={() => isOpen = !isOpen}>
        {isOpen ? "🟡 Close" : "🟣 Open"}
    </button>
    <img src={iconBase64} alt="Extension Icon" width={128} height={128}/>
    <p>Selected Text: {selectedText}</p>
</div>

