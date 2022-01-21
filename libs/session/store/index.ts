import { SessionStore } from "next-session";
import type { SessionData } from "next-session/lib/types";

import { aql } from "arangojs";
import database from "libs/arangodb";
import collection, { SessionDocumentData } from "libs/arangodb/collections/sessions";

const EXPIRE_TIME = 1000 * 60 * 60 * 24 * 14;

async function upsert(sid: string, data: SessionData) {
  const newTTL = (data.cookie.expires?.getTime() || EXPIRE_TIME) + Date.now();
  return await database.query(aql`UPSERT ${{ _key: sid }} INSERT ${{ _key: sid, ttl: newTTL, data: data }} REPLACE ${{ _key: sid, ttl: newTTL, data: data }} IN ${collection}`);
}

class ArangoStore implements SessionStore {
  async get(sid: string): Promise<SessionData | null | undefined> {
    const cursor = await database.query(aql`FOR doc IN ${collection} FILTER doc._key==${sid} LIMIT 1 RETURN doc`);
    if (cursor.hasNext) {
      const session: SessionDocumentData = await cursor.next();
      return session.data;
    }
    return null;
  }

  async touch(sid: string, data: SessionData): Promise<void> {
    await upsert(sid, data);
  }

  async set(sid: string, data: SessionData): Promise<void> {
    await upsert(sid, data);
  }
  async destroy(sid: string): Promise<void> {
    await database.query(aql`REMOVE ${{ _key: sid }} IN ${collection}`);
  }
}

export default ArangoStore;
