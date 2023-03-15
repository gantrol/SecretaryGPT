// TODO: 貌似需要将 https://web.okjike.com/ 的静态部分合进来
const queryOfBlog = `
query FetchSelfFeeds($loadMoreKey: JSON) {
  viewer {
    followingUpdates(loadMoreKey: $loadMoreKey) {
      ...BasicFeedItem
      __typename
    }
    __typename
  }
}

fragment BasicFeedItem on FeedsConnection {
  pageInfo {
    loadMoreKey
    hasNextPage
    __typename
  }
  nodes {
    ... on ReadSplitBar {
      id
      type
      text
      __typename
    }
    ... on MessageEssential {
      ...FeedMessageFragment
      __typename
    }
    ... on UserAction {
      id
      type
      action
      actionTime
      ... on UserFollowAction {
        users {
          ...TinyUserFragment
          ...TinyUserFragment
          ...TinyUserFragment
          ...TinyUserFragment
          ...TinyUserFragment
          ...TinyUserFragment
          ...TinyUserFragment
          ...TinyUserFragment
          ...TinyUserFragment
          ...TinyUserFragment
          ...TinyUserFragment
          ...TinyUserFragment
          ...TinyUserFragment
          ...TinyUserFragment
          ...TinyUserFragment
          ...TinyUserFragment
          __typename
        }
        allTargetUsers {
          ...TinyUserFragment
          following
          statsCount {
            followedCount
            __typename
          }
          ...TinyUserFragment
          ...TinyUserFragment
          ...TinyUserFragment
          ...TinyUserFragment
          ...TinyUserFragment
          ...TinyUserFragment
          ...TinyUserFragment
          ...TinyUserFragment
          ...TinyUserFragment
          ...TinyUserFragment
          ...TinyUserFragment
          ...TinyUserFragment
          ...TinyUserFragment
          ...TinyUserFragment
          ...TinyUserFragment
          __typename
        }
        __typename
      }
      ... on UserRespectAction {
        users {
          ...TinyUserFragment
          ...TinyUserFragment
          ...TinyUserFragment
          ...TinyUserFragment
          ...TinyUserFragment
          ...TinyUserFragment
          ...TinyUserFragment
          ...TinyUserFragment
          ...TinyUserFragment
          ...TinyUserFragment
          ...TinyUserFragment
          ...TinyUserFragment
          ...TinyUserFragment
          ...TinyUserFragment
          ...TinyUserFragment
          ...TinyUserFragment
          __typename
        }
        targetUsers {
          ...TinyUserFragment
          ...TinyUserFragment
          ...TinyUserFragment
          ...TinyUserFragment
          ...TinyUserFragment
          ...TinyUserFragment
          ...TinyUserFragment
          ...TinyUserFragment
          ...TinyUserFragment
          ...TinyUserFragment
          ...TinyUserFragment
          ...TinyUserFragment
          ...TinyUserFragment
          ...TinyUserFragment
          ...TinyUserFragment
          ...TinyUserFragment
          __typename
        }
        content
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}

fragment FeedMessageFragment on MessageEssential {
  ...EssentialFragment
  ... on OriginalPost {
    ...LikeableFragment
    ...CommentableFragment
    ...RootMessageFragment
    ...UserPostFragment
    ...MessageInfoFragment
    isPrivate
    pinned {
      personalUpdate
      __typename
    }
    __typename
  }
  ... on Repost {
    ...LikeableFragment
    ...CommentableFragment
    ...UserPostFragment
    ...RepostFragment
    isPrivate
    pinned {
      personalUpdate
      __typename
    }
    __typename
  }
  ... on Question {
    ...UserPostFragment
    __typename
  }
  ... on OfficialMessage {
    ...LikeableFragment
    ...CommentableFragment
    ...MessageInfoFragment
    ...RootMessageFragment
    __typename
  }
  __typename
}

fragment EssentialFragment on MessageEssential {
  id
  type
  content
  shareCount
  repostCount
  createdAt
  collected
  pictures {
    format
    watermarkPicUrl
    picUrl
    thumbnailUrl
    smallPicUrl
    width
    height
    __typename
  }
  urlsInText {
    url
    originalUrl
    title
    __typename
  }
  __typename
}

fragment LikeableFragment on LikeableMessage {
  liked
  likeCount
  __typename
}

fragment CommentableFragment on CommentableMessage {
  commentCount
  __typename
}

fragment RootMessageFragment on RootMessage {
  topic {
    id
    content
    __typename
  }
  __typename
}

fragment UserPostFragment on MessageUserPost {
  readTrackInfo
  user {
    ...TinyUserFragment
    __typename
  }
  __typename
}

fragment TinyUserFragment on UserInfo {
  avatarImage {
    thumbnailUrl
    smallPicUrl
    picUrl
    __typename
  }
  isSponsor
  username
  screenName
  briefIntro
  __typename
}

fragment MessageInfoFragment on MessageInfo {
  video {
    title
    type
    image {
      picUrl
      __typename
    }
    __typename
  }
  linkInfo {
    originalLinkUrl
    linkUrl
    title
    pictureUrl
    linkIcon
    audio {
      title
      type
      image {
        thumbnailUrl
        picUrl
        __typename
      }
      author
      __typename
    }
    video {
      title
      type
      image {
        picUrl
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}

fragment RepostFragment on Repost {
  target {
    ...RepostTargetFragment
    __typename
  }
  targetType
  __typename
}

fragment RepostTargetFragment on RepostTarget {
  ... on OriginalPost {
    id
    type
    content
    pictures {
      thumbnailUrl
      __typename
    }
    topic {
      id
      content
      __typename
    }
    user {
      ...TinyUserFragment
      __typename
    }
    __typename
  }
  ... on Repost {
    id
    type
    content
    pictures {
      thumbnailUrl
      __typename
    }
    user {
      ...TinyUserFragment
      __typename
    }
    __typename
  }
  ... on Question {
    id
    type
    content
    pictures {
      thumbnailUrl
      __typename
    }
    user {
      ...TinyUserFragment
      __typename
    }
    __typename
  }
  ... on Answer {
    id
    type
    content
    pictures {
      thumbnailUrl
      __typename
    }
    user {
      ...TinyUserFragment
      __typename
    }
    __typename
  }
  ... on OfficialMessage {
    id
    type
    content
    pictures {
      thumbnailUrl
      __typename
    }
    __typename
  }
  ... on DeletedRepostTarget {
    status
    __typename
  }
  __typename
}
`
const body = (lastPageEarliestTime, lastReadTime) => {
    return {
        "operationName": "FetchSelfFeeds",
        "variables": {
            "loadMoreKey": {
                "session": "PopulatedUpdate",
                "lastPageEarliestTime": lastPageEarliestTime.valueOf(),
                "lastReadTime": lastReadTime.valueOf()
            }
        },
        "query": queryOfBlog,
    }
}

export class JikeFollowDaily {
    get starList(): {
        shareCount: any; user_id: string; user_name: string;
        count: any; likeCount: any; repostCount: any;
        starValue: any; commentCount: any; user_avatar: string}[] {
        return this._starList;
    }
    // TODO: 1 链接、摘要与界面
    //   加链接， https://web.okjike.com/originalPost/${i.id}
    // TODO: 2 分享
    private lastPageEarliestTime: Date;
    private lastReadTime: Date;
    private _popularList;
    private _discussList;
    private _socialValueList;
    private _response;
    // TODO: add summary for long post and
    private _posts;
    private _starList;

    get posts() {
        return this._posts;
    }

    get popularList(): [] {
        return this._popularList;
    }

    get discussList(): [] {
        return this._discussList;
    }

    get socialValueList(): [] {
        return this._socialValueList;
    }

    get response() {
        return this._response;
    }


    constructor(lastPageEarliestTime, lastReadTime) {
        this.lastPageEarliestTime = lastPageEarliestTime;
        this.lastReadTime = lastReadTime;
    }

    async fetchRecent() {
        const body_json = body(this.lastPageEarliestTime, this.lastReadTime);
        const response = await fetch("https://web-api.okjike.com/api/graphql", {
            "headers": {
                "accept": "*/*",
                "content-type": "application/json",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site"
            },
            "referrerPolicy": "no-referrer",
            "body": JSON.stringify(body_json),
            "method": "POST",
            "mode": "cors",
            "credentials": "include"
        });
        return await response.json();
    }

    async update(lastPageEarliestTime=null, lastReadTime=null) {
        if (lastPageEarliestTime) {
            this.lastPageEarliestTime = lastPageEarliestTime;
        }
        if (lastReadTime) {
            this.lastReadTime = lastReadTime;
        }
        this._response = await this.fetchRecent();
        this.refresh();
    }

    private refresh() {
        // TODO: 提醒登录？
        //  Uncaught (in promise) TypeError: Cannot read properties of null (reading 'nodes')
        const notes = this._response.data.viewer.followingUpdates.nodes
        const result = notes.filter(i => i.isPrivate === false || i.isPrivate === null).map(i => {
            return {
                id: i.id,
                content: i.content,
                user_id: i.user.username,
                user_avatar: i.user.avatarImage.thumbnailUrl,
                username: i.user.screenName,
                likeCount: i.likeCount,
                commentCount: i.commentCount,
                shareCount: i.shareCount,
                // 转发
                repostCount: i.repostCount,
            }
        })
        this._posts = result;

        const getList = (result, value) => {
            return [...result].sort((a, b) => {
                return value(b) - value(a);
            })
        }

        this._popularList = getList(result, (item) => item.likeCount + item.commentCount);
        this._discussList = getList(result, (item) => item.commentCount + item.shareCount + item.repostCount);
        // 找出最具社交价值的文，基础算法是：repostCount + shareCount
        this._socialValueList = getList(result, (item) => item.shareCount + item.repostCount);
        this.getStars(result);
        console.log(this);
    }

    private cal_star_value = (item) => {
        return item.count * 10 + item.likeCount + item.commentCount + item.shareCount + item.repostCount;
    }

    private getStars(result) {
        // 找出今日关注之星，按用户汇总各项指标，算法是：点赞超过2的笔记数量 * 10 + likeCount + commentCount + shareCount + repostCount
        const stars = result.reduce((acc, cur) => {
            if (acc[cur.user_id]) {
                if (cur.likeCount > 2) {
                    acc[cur.user_id].count += 1
                }
                acc[cur.user_id].likeCount += cur.likeCount
                acc[cur.user_id].commentCount += cur.commentCount
                acc[cur.user_id].shareCount += cur.shareCount
                acc[cur.user_id].repostCount += cur.repostCount
                acc[cur.user_id].starValue = this.cal_star_value(acc[cur.user_id])
            } else {
                const init = {
                    starValue: 0,
                    count: 1,
                    username: cur.username,
                    likeCount: cur.likeCount,
                    commentCount: cur.commentCount,
                    shareCount: cur.shareCount,
                    repostCount: cur.repostCount,
                    user_avatar: cur.user_avatar,
                }
                init.starValue = this.cal_star_value(init)
                acc[cur.user_id] = init;
            }
            return acc
        }, {});
// 找出star里面值最大的
        this._starList = Object.keys(stars).sort((a, b) => {
            return stars[b].starValue - stars[a].starValue
        }).map(i => {
            return {
                user_id: i,
                user_name: stars[i].username,
                count: stars[i].count,
                likeCount: stars[i].likeCount,
                commentCount: stars[i].commentCount,
                shareCount: stars[i].shareCount,
                repostCount: stars[i].repostCount,
                starValue: stars[i].starValue,
                user_avatar: stars[i].user_avatar,
            }
        })
    }
}

// 拟弃用
export const fetchJK = async (lastPageEarliestTime, lastReadTime) => {
    return await new JikeFollowDaily(lastPageEarliestTime, lastReadTime).fetchRecent()
}
