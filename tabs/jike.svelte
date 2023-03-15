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
    // TODO: 0 发往 open ai

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
<footer class="bg-white">
    <div class="mx-auto max-w-7xl overflow-hidden py-20 px-6 sm:py-24 lg:px-8">
        <nav aria-label="Footer" class="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12">
            <!--            <div class="pb-6">-->
            <!--                <a href="#" class="text-sm leading-6 text-gray-600 hover:text-gray-900">关于</a>-->
            <!--            </div>-->

            <!--            <div class="pb-6">-->
            <!--                <a href="#" class="text-sm leading-6 text-gray-600 hover:text-gray-900">博客</a>-->
            <!--            </div>-->

            <!--            <div class="pb-6">-->
            <!--                <a href="#" class="text-sm leading-6 text-gray-600 hover:text-gray-900">就试一下</a>-->
            <!--            </div>-->

            <!--            <div class="pb-6">-->
            <!--                <a href="#" class="text-sm leading-6 text-gray-600 hover:text-gray-900">Press</a>-->
            <!--            </div>-->

            <!--            <div class="pb-6">-->
            <!--                <a href="#" class="text-sm leading-6 text-gray-600 hover:text-gray-900">Accessibility</a>-->
            <!--            </div>-->

            <!--            <div class="pb-6">-->
            <!--                <a href="#" class="text-sm leading-6 text-gray-600 hover:text-gray-900">Partners</a>-->
            <!--            </div>-->
        </nav>
        <div class="mt-10 flex justify-center space-x-10">
<!--            <a class="text-gray-400 hover:text-gray-500" href="#">-->
<!--                &lt;!&ndash;                TODO: &ndash;&gt;-->
<!--                <span class="sr-only">微博</span>-->
<!--                <svg aria-hidden="true" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">-->
<!--                    <path clip-rule="evenodd"-->
<!--                          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"-->
<!--                          fill-rule="evenodd"/>-->
<!--                </svg>-->
<!--            </a>-->

            <a class="text-gray-400 hover:text-gray-500" href="https://space.bilibili.com/15179632">
                <span class="sr-only">哔哩哔哩</span>
                <!--                TODO：-->
                <svg fill="#6ab2dc" class="h-6 w-6" stroke="#6ab2dc" viewBox="-2.4 -2.4 28.80 28.80"
                     width="180px" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <g>
                            <path d="M7.172 2.757L10.414 6h3.171l3.243-3.242a1 1 0 0 1 1.415 1.415l-1.829 1.827L18.5 6A3.5 3.5 0 0 1 22 9.5v8a3.5 3.5 0 0 1-3.5 3.5h-13A3.5 3.5 0 0 1 2 17.5v-8A3.5 3.5 0 0 1 5.5 6h2.085L5.757 4.171a1 1 0 0 1 1.415-1.415zM18.5 8h-13a1.5 1.5 0 0 0-1.493 1.356L4 9.5v8a1.5 1.5 0 0 0 1.356 1.493L5.5 19h13a1.5 1.5 0 0 0 1.493-1.356L20 17.5v-8A1.5 1.5 0 0 0 18.5 8zM8 11a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1zm8 0a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1z"></path>
                        </g>
                    </g>
                </svg>
            </a>

            <a class="text-gray-400 hover:text-gray-500" href="#">
                <span class="sr-only">Twitter</span>
                <svg aria-hidden="true" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                </svg>
            </a>

            <a class="text-gray-400 hover:text-gray-500" href="https://github.com/gantrol/SecretaryGPT" target="_blank">
                <span class="sr-only">GitHub</span>
                <svg aria-hidden="true" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path clip-rule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                          fill-rule="evenodd"/>
                </svg>
            </a>

            <a class="text-gray-400 hover:text-gray-500" href="#">
                <span class="sr-only">YouTube</span>
                <svg aria-hidden="true" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path clip-rule="evenodd"
                          d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                          fill-rule="evenodd"/>
                </svg>
            </a>
        </div>
        <p class="mt-10 text-center text-xs leading-5 text-gray-500">&copy; 2020 Your Company, Inc. All rights
            reserved.</p>
    </div>
</footer>
