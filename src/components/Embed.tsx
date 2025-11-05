import {
  AppBskyEmbedExternal,
  AppBskyEmbedImages,
  AppBskyEmbedRecord,
  AppBskyEmbedRecordWithMedia,
  AppBskyEmbedVideo,
  AppBskyFeedDefs,
  AppBskyFeedPost,
  AppBskyGraphDefs,
} from "@atproto/api";
import React, { Suspense } from "react";
import { ImageEmbed } from "./ImageEmbed";
import { Image } from "./Image";
import { PostHeader, PrivatePost } from "./Post";
import { ToggleVideoPlayer } from "./ToggleVideoPlayer";
import { RichestText } from "./RichestText";

// reference: https://github.com/mozzius/graysky/blob/main/apps/expo/src/components/embed/index.tsx

interface Props {
  uri?: string;
  content: AppBskyFeedDefs.FeedViewPost["post"]["embed"];
}

const ViewRecord = ({ record }: { record: AppBskyEmbedRecord.ViewRecord }) => {
  let time = "";
  const uri = record.uri.split("/").pop();
  const { labels, handle, did } = record.author;
  const name = handle.includes("handle.invalid") ? did : handle;
  if (!uri) {
    return null;
  }

  if (labels?.some((label: { val: string; }) => label.val === "!no-unauthenticated")) {
    return <PrivatePost handle={name} time={time} uri={uri!} hideAvatar />;
  }

  if (AppBskyFeedPost.isRecord(record.value)) {
    time = new Date(record.value.createdAt as Date).toDateString();
  }
  if (record.embeds && record.embeds.length > 0) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return record.embeds?.map((embed: any, i: any) => (
      <div className="link-embed-wrapper" key={record.uri + i}>
        <PostHeader authorHandle={name} time={time} />
        <RichestText record={record.value} />
        <Embed uri={record.uri} content={embed} />
      </div>
    ));
  }
  if (record.value) {
    return (
      <div className="link-embed-wrapper" key={record.uri}>
        <PostHeader authorHandle={name} time={time} />
        <RichestText record={record.value} />
      </div>
    );
  }
};

export const Embed = (props: Props) => {
  const { uri, content } = props;

  if (!content) {
    return null;
  }

  try {
    // Case 1: Image
    if (AppBskyEmbedImages.isView(content)) {
      return (
        <Suspense fallback={<div className="image-loading" />}>
          <ImageEmbed content={content} />
        </Suspense>
      );
    }

    // Case 2: External link
    if (AppBskyEmbedExternal.isView(content)) {
      const { uri, title, description, thumb } = content.external;
      const url = new URL(content.external.uri);

      if (url.pathname.endsWith(".mp4") || url.pathname.endsWith(".gif")) {
        // TODO: support gifs and mp4 in link embeds
        return null;
      }
      return (
        <div className="link-embed-wrapper">
          {thumb && <Image url={thumb} />}
          <a className="text-blue-500" href={uri}>
            {title}
          </a>
          <div>{description}</div>
        </div>
      );
    }

    // Case 3: Record (quote or linked post)
    if (AppBskyEmbedRecord.isView(content)) {
      const record = content.record;

      // Case 3.1: Post
      if (AppBskyEmbedRecord.isViewRecord(record)) {
        return <ViewRecord record={record} />;
      }

      // Case 3.2: List
      if (AppBskyGraphDefs.isListView(record)) {
        // console.log("skipping list view");
        return null;
      }

      // Case 3.3: Feed
      if (AppBskyFeedDefs.isGeneratorView(record)) {
        // console.log("skipping feed view");
        return null;
      }

      // Case 3.4: Post not found
      if (AppBskyEmbedRecord.isViewNotFound(record)) {
        // console.log("skipping because post not found");
        return null;
      }

      // Case 3.5: Post blocked
      if (AppBskyEmbedRecord.isViewBlocked(record)) {
        // console.log("skipping because post is blocked");
        return null;
      }

      throw new Error("Unsupported record type");
    }
    // Case 4: Record with media
    if (AppBskyEmbedRecordWithMedia.isView(content)) {
      const embedWithMedia = content.record.record;
      return (
        <React.Fragment key={uri}>
          <Embed uri={uri} content={content.media} />
          {AppBskyEmbedRecord.isViewRecord(embedWithMedia) && (
            <ViewRecord record={embedWithMedia} />
          )}
        </React.Fragment>
      );
    }

    // Case 5: Video
    if (AppBskyEmbedVideo.isView(content)) {
      const thumbnail = content.thumbnail;
      return (
        <ToggleVideoPlayer
          playlist={content.playlist}
          {...(thumbnail ? { thumbnail: <Image url={thumbnail} /> } : {})}
        />
      );
    }

    throw new Error("Unsupported embed type");
  } catch (err) {
    console.error(
      err instanceof Error ? err.message : "Error rendering embed",
      content
    );
    return null;
  }
};
