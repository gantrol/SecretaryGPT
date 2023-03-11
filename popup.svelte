<script>

  import LinkButton from "~components/LinkButton.svelte";
  import {LinkType} from "~utils/constants";

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
  <LinkButton
          url="/tabs/chatsVS.html"
          text={"VS模式"}
          type={LinkType.INNER}
  />
  <LinkButton
          url="/tabs/jike.html"
          text={"即刻·关注日报"}
          type={LinkType.INNER}
  />
</div>


