<script>
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
        <MarkdownToHTML text={message.text}></MarkdownToHTML>
    </article>
{/if}
