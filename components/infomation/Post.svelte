<script>
    export let post;

    import thumbsUp from '~/assets/icons/thumbs-up.svg';
    import sticker from '~/assets/icons/sticker.svg';
    import exportIcon from '~/assets/icons/share.svg';
    import share from '~/assets/icons/share-2.svg';

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
                <img src={thumbsUp} alt="点赞"/>
                {post.likeCount}
            </div>
            <div class="badge badge-outline">
                <img src={sticker} alt="评论"/>
                {post.commentCount}
            </div>
            <div class="badge badge-outline">
                <img src={exportIcon} alt="转发"/>
                {post.repostCount}
            </div>
            <div class="badge badge-outline">
                <img src={share} alt="分享"/>
                {post.shareCount}
            </div>
            <div class="badge badge-outline">
<!--                TODO: 分成 repost跟originalPost两种……抽象为function-->
                <a href={`${host}originalPost/${post.id}`} target="_blank">
                    去看看
                </a>
            </div>
        </div>
    </div>
</div>
