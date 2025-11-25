// src/lib/api.ts
import { AtpAgent } from "@atproto/api";

// For an unauthenticated client
export const agent = new AtpAgent({
  // App View URL
  service: "https://api.bsky.app",
});