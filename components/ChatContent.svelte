<script>
    import Message from "~components/Message.svelte";

    export let messages;
    export let newMessage;
</script>


{#each messages as message}
    <Message {message}></Message>
{/each}
{#if newMessage !== undefined && newMessage !== null}
    <Message message={newMessage}></Message>
{/if}
