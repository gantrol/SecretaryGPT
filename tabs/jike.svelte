<script>
    import {onMount} from 'svelte';
    import {JikeFollowDaily} from '~utils/infomation/jike'; // import from the given path
    import '~/base.css';
    import '~/base-var.css';
    import PostGroup from "~components/infomation/PostGroup.svelte";

    let posts = []; // an array to store the posts
    let popularList = [];
    let discussList = [];
    let socialValueList = [];
    let starList = [];
    // TODO: 时间可以控制得精确一些...
    let lastPageEarliestTime = new Date(); // get the current timestamp as the initial value
    let lastReadTime = new Date(lastPageEarliestTime.getFullYear(),
        lastPageEarliestTime.getMonth(),
        lastPageEarliestTime.getDate() - 1); // get the current timestamp as the initial value
    const jikeFollowDaily = new JikeFollowDaily(lastPageEarliestTime, lastReadTime);

    // TODO: 处理边界值
    onMount(async () => {
        await jikeFollowDaily.update();
        posts = jikeFollowDaily.posts;
        popularList = jikeFollowDaily.popularList.slice(0, 3);
        discussList = jikeFollowDaily.discussList.slice(0, 3);
        socialValueList = jikeFollowDaily.socialValueList.slice(0, 3);
        starList = jikeFollowDaily.starList.slice(0, 3);
        userId = starList[0].user_id;
    });

    let activeTab = "popular-tab";

    const tabOnClick = (e) => {
        const activeTabElement = document.querySelector(`#${activeTab}`);
        activeTabElement.classList.remove("tab-active");
        e.target.classList.add("tab-active");
        console.log(e.target.id)
        activeTab = e.target.id;
    };

    let userId;
</script>

<svelte:head>
    <title>即刻-关注日报</title>
</svelte:head>

{#if posts.length === 0}
    <!--TODO: 动画，以及放中间-->
    <progress class="progress w-full"></progress>
{:else }
    <div class="flex">
        <div class="w-1/2">
            <div class="navbar bg-base-100">
                <div class="flex-1">
                    <a class="btn btn-ghost normal-case text-xl">今日明星</a>
                </div>
                <div class="flex-none gap-2">
                    <div class="form-control">
<!--                        TODO search?-->
<!--                        <input type="text" placeholder="Search" class="input input-bordered" />-->
                    </div>
                    <div class="dropdown dropdown-end">
<!--                        TODO: 即刻个人信息?-->
<!--                        <label tabindex="0" class="btn btn-ghost btn-circle avatar">-->
<!--                            <div class="w-10 rounded-full">-->
<!--                                <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />-->
<!--                            </div>-->
<!--                        </label>-->
<!--                        <ul tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">-->
<!--                            <li>-->
<!--                                <a class="justify-between">-->
<!--                                    Profile-->
<!--                                    <span class="badge">New</span>-->
<!--                                </a>-->
<!--                            </li>-->
<!--                            <li><a>Settings</a></li>-->
<!--                            <li><a>Logout</a></li>-->
<!--                        </ul>-->
                    </div>
                </div>
            </div>
            <div class="flex justify-around">
                {#each starList as star}
                    <div class="w-24 rounded-full
                    ring ring-offset-base-100 ring-offset-2 {userId === star.user_id ? 'ring-primary ' : ''}
                    mr-4">
                        <div class="w-24 mask mask-circle "
                             on:click={() => userId = star.user_id}
                        >
                            <img class="w-24" src={star.user_avatar} alt={`${star.user_name}'s avatar`}/>
                        </div>
                    </div>
                {/each}
            </div>
            <PostGroup
                    posts={posts.filter(post => post.user_id === userId)}
            ></PostGroup>
        </div>
        <div class="w-1/2">
            <div class="tabs tabs-boxed" id="tops-post-tabs">
                <a class="tab tab-active" id="popular-tab" on:click={tabOnClick}>最受喜爱</a>
                <a class="tab" id="discuss-tab" on:click={tabOnClick}>最热讨论</a>
                <a class="tab" id="social-tab" on:click={tabOnClick}>很有价值</a>
            </div>
            <PostGroup
                    hidden={activeTab !== "popular-tab"}
                    posts={popularList}
            ></PostGroup>
            <PostGroup
                    hidden={activeTab !== "discuss-tab"}
                    posts={discussList}
            ></PostGroup>
            <PostGroup
                    hidden={activeTab !== "social-tab"}
                    posts={socialValueList}
            ></PostGroup>
        </div>
    </div>


{/if}
