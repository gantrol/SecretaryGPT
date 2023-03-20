<script>
    import {tokenCount} from "~utils/prompt/tokenize";
    import MarkdownToHTML from "~components/MarkdownToHTML.svelte";

    export let preview;
    let default_open = false;
</script>

<div tabindex="0"
     class="collapse collapse-arrow {default_open? 'collapse-open' : 'collapse-close'} border bg-base-100">
    <input type="checkbox"/>
    <div class="collapse-title text-md font-medium flex justify-between items-center"  on:click={() => default_open = !default_open} >
        <div class="text-xl">预览</div>
        <div>
            <p>token数量：{tokenCount(preview)}</p>
            <p>文字长度：{preview.length}</p>
        </div>
    </div>
    <div class="collapse-content">
        <article class="bg-white-100 pt-6 pb-6 max-h-36 overflow-y-auto">
            <MarkdownToHTML text={preview}/>
        </article>
    </div>
</div>
