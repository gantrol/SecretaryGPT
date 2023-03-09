<script>
    import MarkdownToHTML from "~components/MarkdownToHTML.svelte";

    export let preview;
    let isOpen = true;
</script>

<div tabindex="0" class="collapse collapse-{isOpen ? 'open': 'close'} collapse-arrow border bg-base-100">
    <input type="checkbox" bind:checked={isOpen}/>
    <div class="collapse-title text-xl font-medium">
        <h3>预览</h3>
    </div>
    <div class="collapse-content" on:dbclick={() => isOpen = !isOpen}>
        <article class="prose bg-white-100 pt-6 pb-6  max-h-96 overflow-y-auto">
            <MarkdownToHTML text={preview}/>
        </article>
    </div>
</div>
