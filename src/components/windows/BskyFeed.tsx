import Post from "../bluesky/Post";
import { agent } from "../../lib/api";
import { LinkIcon } from "../Icons";

const me = 'did:plc:xa4saae66kmkavviy743asmj'

export default async function BskyFeed() {
  const postData = await agent.getAuthorFeed({
    actor: me,
    filter: "posts_no_replies",
    limit: 100,
    includePins: false,
  });

  const posts = postData.data.feed;

  return (
    <ul className="post-list">
      {posts?.map((feedViewPost) => {
        const { post } = feedViewPost;
        if (post.author.did !== me) {
          // only my posts; no reposts
          return null;
        }
        return <Post key={post.cid} post={post} />;
      })}
      <li style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <a
          href="https://bsky.app/profile/jen.dev"
          className="flat-button"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>more on bsky </span>
          <LinkIcon />
        </a>
      </li>
    </ul>
  );
}
