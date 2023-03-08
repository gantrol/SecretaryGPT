<script>
    export let message;
    import {marked} from "marked";

    let userClass;

    if (message.author === "bot") {
        userClass = "bg-gray-100";
    } else {
        userClass = "bg-white-100";
    }
</script>

{#if message && message.text}
    <article class="prose {userClass} pt-6 pb-6">
        {@html marked.parse(
            `${message.text}`
        )}
    </article>
{/if}
