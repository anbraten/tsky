import type {
  AppBskyActorSearchActors,
  AppBskyActorSearchActorsTypeahead,
} from '@atproto/api';
import { Feed } from '~/bsky';
import { Paginator } from './paginator';
import type { Session } from './session';
import { XrpcClient } from './xrpc';

export class TSky {
  xrpc: XrpcClient;

  constructor(session: Session) {
    this.xrpc = new XrpcClient(session);
  }

  /**
   * Get detailed profile view of an actor. Does not require auth, but contains relevant metadata with auth.
   */
  async profile(identifier: string | string[]) {
    const res = await this.xrpc.request('app.bsky.actor.getProfile', 'GET', {
      actor: identifier,
    });

    return res.data;
  }

  get feed() {
    return new Feed(this.xrpc);
  }

  /**
   * Find actor suggestions for a prefix search term. Expected use is for auto-completion during text field entry. Does not require auth.
   */
  async typeahead(
    params: AppBskyActorSearchActorsTypeahead.QueryParams,
    options?: AppBskyActorSearchActorsTypeahead.CallOptions,
  ) {
    const res = await this.instance.actor.searchActorsTypeahead(
      params,
      options,
    );

    return res.data.actors;
  }

  /**
   * Find actors (profiles) matching search criteria. Does not require auth.
   */
  async search(
    params: AppBskyActorSearchActors.QueryParams = {},
    options?: AppBskyActorSearchActors.CallOptions,
  ) {
    return new Paginator(async (cursor) => {
      const res = await this.instance.actor.searchActors(
        {
          cursor,
          ...params,
        },
        options,
      );

      return res.data;
    });
  }
}
