<script>
    import Post from "~components/infomation/Post.svelte";

    export let hidden;
    export let posts;
</script>

<div hidden={hidden}>
    {#each posts as post}
        <Post {post}></Post>
    {/each}
</div>
