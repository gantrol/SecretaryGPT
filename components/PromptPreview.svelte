<script>
    import {text2tokenAndSplit, tokensList2text} from "~utils/prompt/tokenize";

    export let preview;
    let isOpen = false;
    $: tokensList = text2tokenAndSplit(preview);
</script>

<div tabindex="0" class="collapse collapse-{isOpen ? 'open': 'close'} collapse-arrow border bg-base-100">
    <input type="checkbox" bind:checked={isOpen}/>
    <div class="collapse-title text-lg font-medium">
        <h3>预览</h3>
    </div>
    <div class="collapse-content" on:dbclick={() => isOpen = !isOpen}>
        <article class="prose bg-white-100 pt-6 pb-6">
            <div>
                <!--show tokens count and tokens and token group text...-->
                <div>
<!--                    TODO: 剩余计算，如剩余xxtoken约xx汉字，xx英文-->
                    <div class="text-base font-medium">String Length: {preview.length}</div>
                    <div class="text-base font-medium">Tokens Count: {tokensList.reduce((prev, accu) =>  {
                        return prev + accu.length
                    }, 0)}</div>
                    <div class="text-base font-medium max-h-36 overflow-y-auto">Tokens Group Text: {tokensList2text(tokensList)}</div>
                </div>
            </div>
<!--            <MarkdownToHTML text={preview}/>-->
        </article>
    </div>
</div>
