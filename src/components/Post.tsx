import {
  AppBskyEmbedRecord,
  AppBskyFeedDefs,
  AppBskyFeedPost,
} from "@atproto/api";
import { Embed } from "./Embed";
import { RichestText } from "./RichestText";
import { LockIcon, RepostIcon } from "./Icons";
import { agent } from "../lib/api";
import images from "../data/images.json";

// eslint-disable-next-line react-refresh/only-export-components
export function isRecord(r: unknown): r is AppBskyFeedPost.Record {
  return AppBskyFeedPost.isRecord(r);
}

function isThread(t: unknown): t is AppBskyFeedDefs.ThreadViewPost {
  return AppBskyFeedDefs.isThreadViewPost(t);
}

function isSelfPost(post: AppBskyFeedDefs.PostView) {
  const me = "did:plc:xa4saae66kmkavviy743asmj";
  return post.author.did == me;
}

export const PostHeader = ({
  authorHandle,
  time,
}: {
  authorHandle: string;
  time: string;
}) => (
  <div className="post-info-wrapper">
    <span className="post-author-tag">
      <a
        href={`https://bsky.app/profile/${authorHandle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="non-pink-link"
      >
        {!authorHandle.startsWith('did:') && <span aria-hidden>@</span>}
        {authorHandle}
      </a>
    </span>
    {time && <time>{time}</time>}
  </div>
);

export const PrivatePost = ({
  handle,
  time,
  uri,
  hideAvatar = false,
}: {
  handle: string;
  time: string;
  uri: string;
  hideAvatar?: boolean;
}) => (
  <div className="post-wrapper">
    {!hideAvatar && (
      <div className="profile-pic-wrapper">
        <img className="private-post-avatar" src={images.field} alt="" />
        <RepostIcon />
      </div>
    )}
    <div className="post-wrapper-inner">
      <PostHeader authorHandle={handle} time={time} />
      <div className="post-content-wrapper">
        <div>
          [This account has requested that users sign in to bsky to view their
          profile.]{" "}
        </div>
        <a
          href={`https://bsky.app/profile/${handle}/post/${uri}`}
          className="flat-button"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LockIcon />
          <span> view on bsky</span>
        </a>
      </div>
    </div>
  </div>
);

export const PostContent = ({
  post,
  isReply = false,
}: {
  post: AppBskyFeedDefs.PostView;
  isReply?: boolean;
}) => {
  const { avatar, handle, did } = post.author;
  const name = handle.includes('handle.invalid') ? did : handle;
  const uri = post.uri.split("/").pop();
  const postRecord = post.record;
  let time = "";
  if (isRecord(postRecord)) {
    time = new Date(postRecord.createdAt).toDateString();
  }

  return (
    <div className="post-wrapper">
      <div
        className={`profile-pic-wrapper ${isReply ? "hide-pic-for-reply" : ""}`}
      >
        {!isReply && <img src={avatar} alt="" />}
        {name !== "jen.dev" && <RepostIcon />}
      </div>
      <div className="post-wrapper-inner">
        {!isReply && <PostHeader authorHandle={name} time={time} />}
        <div className="post-content-wrapper">
          <div>
            <RichestText record={postRecord} />
          </div>
          <Embed content={post.embed} uri={uri} />
          {AppBskyFeedDefs.isThreadViewPost(postRecord.threadgate) && (
            <RichestText record={postRecord.threadgate} />
          )}
          {isRecord(postRecord.record) &&
            AppBskyEmbedRecord.isViewRecord(postRecord.record.embed) && (
              <RichestText record={postRecord.record.embed} />
            )}
        </div>
      </div>
    </div>
  );
};

function traverseSelfReplies(
  postAndReplies: AppBskyFeedDefs.ThreadViewPost,
  selfReplies: AppBskyFeedDefs.PostView[] = []
) {
  selfReplies.push(postAndReplies.post);

  const allSelfReplies = (postAndReplies.replies ?? [])
    .filter((reply) => isThread(reply))
    .filter((reply) => isSelfPost(reply.post));

  if (allSelfReplies.length > 0) {
    traverseSelfReplies(allSelfReplies[0], selfReplies);
  }
}

const Post = async ({ post }: { post: AppBskyFeedDefs.PostView }) => {
  const { handle, labels, did } = post.author;
  const name = handle.includes('handle.invalid') ? did : handle;
  const uri = post.uri.split("/").pop();
  const postRecord = post.record;
  let time = "";
  if (isRecord(postRecord)) {
    time = new Date(postRecord.createdAt).toDateString();
  }

  if (labels?.some((label) => label.val === "!no-unauthenticated")) {
    return (
      <li>
        <PrivatePost handle={name} time={time} uri={uri!} />
      </li>
    );
  }

  if (!isSelfPost(post)) {
    return (
      <li>
        <PostContent post={post} />
      </li>
    );
  }

  const postDetails = await agent.app.bsky.feed.getPostThread({
    uri: post.uri,
  });

  const thread = postDetails.data.thread;

  if (!isThread(thread)) {
    // Can happen when post is not found (deleted?) or post
    // was from a blocked user
    return null;
  }

  // Calling traverseSelfReplies() modifies the postAndSelfReplies array
  // in-place.
  const postAndSelfReplies: AppBskyFeedDefs.PostView[] = [];
  traverseSelfReplies(thread, postAndSelfReplies);

  return postAndSelfReplies.map((post, i) => (
    <li key={`item-${post.cid}`}>
      <PostContent post={post} isReply={i > 0} />
    </li>
  ));
};

export default Post;
