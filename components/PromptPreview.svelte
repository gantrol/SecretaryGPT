<script>
    import {tokenCount} from "~utils/prompt/tokenize";
    import MarkdownToHTML from "~components/MarkdownToHTML.svelte";

    export let preview;
    let isOpen = false;
</script>

<div tabindex="0" class="collapse collapse-{isOpen ? 'open': 'close'} collapse-arrow border bg-base-100">
    <input type="checkbox" bind:checked={isOpen}/>
    <div class="collapse-title font-medium
                flex justify-between items-center">
        <div class="text-xl">预览</div>
        <div>
            <p>token数量：{tokenCount(preview)}</p>
            <p>文字长度：{preview.length}</p>
        </div>
    </div>
    <div class="collapse-content" on:dbclick={() => isOpen = !isOpen}>
        <article class="bg-white-100 pt-6 pb-6 max-h-36 overflow-y-auto">
            <MarkdownToHTML text={preview}/>
        </article>
    </div>
</div>
