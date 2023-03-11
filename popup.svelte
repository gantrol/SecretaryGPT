<script>

    import LinkButton from "~components/LinkButton.svelte";
    import {LinkType} from "~utils/constants";
    import Collapse from "~components/Collapse.svelte";

    let debug = false;
</script>

<style>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    div.main {
        min-width: 300px;
    }
</style>
<div class="main">
    {#if debug}

    {/if}
    <Collapse title="页面链接">
        <LinkButton
                url="/tabs/chatsVS.html"
                text={"Chat AI VS"}
                type={LinkType.INNER}
        />
        <LinkButton
                url="/tabs/jike.html"
                text={"即刻·关注日报"}
                type={LinkType.INNER}
        />
    </Collapse>
</div>


