import type {
  AppBskyFeedGetFeed,
  AppBskyFeedGetTimeline,
} from '@tsky/lexicons';
import type { Client } from '~/tsky/client';
import { Paginator } from '~/tsky/paginator';

export class Feed {
  constructor(private client: Client) {}

  /**
   * Get a hydrated feed from an actor's selected feed generator. Implemented by App View.
   */
  async getFeed(
    params: AppBskyFeedGetFeed.Params,
    options?: AppBskyFeedGetFeed.Input,
  ) {
    return Paginator.init(async (cursor) => {
      const res = await this.client.get('app.bsky.feed.getFeed', {
        params: {
          cursor,
          ...params,
        },
      });

      return res.data;
    });
  }

  /**
   * Get a view of the requesting account's home timeline. This is expected to be some form of reverse-chronological feed.
   */
  timeline(
    params: AppBskyFeedGetTimeline.Params,
    options?: AppBskyFeedGetTimeline.Input,
  ) {
    return Paginator.init(async (cursor) => {
      const res = await this.client.get('app.bsky.feed.getTimeline', {
        ...options,
        params: {
          cursor,
          ...params,
        },
      });

      return res.data;
    });
  }
}
