<script>
    import {ChatViewModel} from "~utils/viewmodel";
    import {chatTypes, modeKeys} from "~utils/constants";

    export let posts;
    const host = "https://web.okjike.com/";

    const debounce = (func, delay) => {
        let debounceTimer;
        return (...args) => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => func(...args), delay);
        };
    };

    const callback = () => {
        let ms = [...vm.messages]
        if (vm.newMessage) {
            ms.push(vm.newMessage);
        }
        summary = ms.slice(1).map(msg => msg.text).join("\n");
    }

    // Debounce the callback function with a 500ms delay
    const debouncedCallback = debounce(callback, 500);

    let summary;
    let vm = new ChatViewModel();
    vm.mode = modeKeys.SUMMARY;
    vm.initListener(debouncedCallback)

    // Create a reactive statement to watch for changes in posts
    $: if (posts) {
        // join posts content into one string by "\n"
        let post_contents = posts.map(post => post.content).join("\n");
        post = posts[0];
        // TODO: shared constant
        vm.renew(chatTypes.ChatGPT);
        vm.sendAuto(post_contents, debouncedCallback);
        summary = ""
    }

    let post = posts[0];

    // TODO: 2 专属模式

</script>



<div class="card card-side bg-base-100 shadow-xl m-4">
    <div class="card-body">
        <div class="flex">
            <div class="w-24 h-24 rounded-full ring ring-offset-base-100 ring-offset-2
                    mr-4">
                <div class="w-24 h-24 mask mask-circle">
                    <img alt={`${post.username}'s avatar`} class="w-24" src={post.user_avatar}/>
                </div>
            </div>
            <div class="overflow-y-auto">
                <p class="font-bold"><a href={`${host}u/${post.user_id}`} target="_blank">
                    {chatTypes.ChatGPT}总结@{post.username}
                </a></p>
                {#if summary}
                    <p>{summary}</p>
                {:else}
                    <p>正在生成总结...</p>
                {/if}
            </div>
        </div>
    </div>
</div>
