<script>

    export let url;
    export let text;
    export let type = "inner";
    export let isLink = false;
    const handleClassByType = (type) => {
        if (type === "bing") {
            return "secondary";
        } else if (type === "inner") {
            return "primary";
        } else {
            return "";
        }
    };
</script>

{#if isLink}
    <li>
        <a class="{handleClassByType(type)}"
           href={chrome.runtime.getURL(url)} target="_blank">{text}
        </a>
    </li>
{:else}
    <button class="btn btn-sm btn-{handleClassByType(type)}" on:click={() => {
        chrome.tabs.create({
          url: chrome.runtime.getURL(url)
        })
      }}>
        {text}
    </button>
{/if}
