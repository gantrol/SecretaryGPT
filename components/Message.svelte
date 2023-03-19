<script>
    import Collapse from "~components/Collapse.svelte";

    export let message;
    import MarkdownToHTML from "~components/MarkdownToHTML.svelte";

    let userClass;

    if (message.author === "bot") {
        userClass = "bg-gray-100";
    } else {
        userClass = "bg-white-100";
    }
</script>

{#if message && message.text}
    <article class="{userClass} pt-6 pb-6">
        {#if message.author === "bot"}
            <MarkdownToHTML text={message.text}></MarkdownToHTML>
        {:else}
            <Collapse
                    title={message.text.substring(0, 15)}
                    default_open={false}
            >
                <MarkdownToHTML text={message.text}></MarkdownToHTML>
            </Collapse>
        {/if}
    </article>
{/if}
