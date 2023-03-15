<script>
    import Collapse from "~components/Collapse.svelte";

    export let title;
    export let default_open = true;
    export let has_collapse = true;
</script>

{#if has_collapse}
    <Collapse {title} bind:default_open={default_open}>
        <slot></slot>
    </Collapse>
{:else}
    <slot></slot>
{/if}
