<script>
    export let post;

    import thumbsUp from '~/assets/icons/thumbs-up.svg';
    import sticker from '~/assets/icons/sticker.svg';
    import share from '~/assets/icons/share.svg';

    // TODO: 长文本,对接 chatgpt 处理(如有)

    const host = "https://web.okjike.com/";
</script>

<div class="card card-side bg-base-100 shadow-xl m-4">
    <div class="card-body">
        <div class="flex">
            <div class="w-24 h-24 rounded-full ring ring-offset-base-100 ring-offset-2
                    mr-4">
                <div class="w-24 h-24 mask mask-circle">
                    <img class="w-24" src={post.user_avatar} alt={`${post.username}'s avatar`}/>
                </div>
            </div>
            <div class="overflow-y-auto">
                <p class="font-bold"><a href={`${host}u/${post.user_id}`} target="_blank">
                    @{post.username}
                </a></p>
                <p>{post.content}</p>
            </div>
        </div>
        <div class="card-actions justify-end">
            <div class="badge badge-outline">
                <!-- 点赞                   -->
                <img src={thumbsUp} alt="Extension Icon"/>
                {post.likeCount}
            </div>
            <div class="badge badge-outline">
                <!--                    评论-->
                <img src={sticker} alt="Extension Icon"/>
                {post.commentCount}
            </div>
            <div class="badge badge-outline">
                <!--                    转发\分享数-->
                <img src={share} alt="Extension Icon"/>
                {post.shareCount}
            </div>
            <div class="badge badge-outline">
                <a href={`${host}originalPost/${post.id}`} target="_blank">
                    去看看
                </a>
            </div>
        </div>
    </div>
</div>
