import { AppBskyFeedDefs, Facet, RichText } from "@atproto/api";

interface IRichestTextProps {
  record: AppBskyFeedDefs.PostView['record'];
}

export const RichestText = ({ record }: IRichestTextProps) => {
  const rt = new RichText({
    text: record.text as string,
    facets: record.facets as Facet[],
  });

  const text = [];

  for (const segment of rt.segments()) {
    if (segment.isMention()) {
      // TODO: fix duplicate key??
      text.push(
        <a
          key={`${record.cid ?? record.createdAt}`}
          href={`/profile/${segment.mention?.did}`}
        >
          {segment.text}
        </a>
      );
    } else if (segment.isLink()) {
      text.push(
        <a
          href={segment.link?.uri}
          key={`${segment.link?.uri}`}
        >
          {segment.text}
        </a>
      );
    } else if (segment.isTag()) {
      const tag = segment.text;
      text.push(<a className="text-blue-500" key={tag} href={`https://bsky.app/hashtag/${tag.substring(1)}`}>{tag}</a>);
    } else {
      text.push(segment.text);
    }
  }

  return text;
};
