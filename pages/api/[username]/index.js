import { query as q } from "faunadb";
import { serverClient } from "../../../lib/fauna-auth";

export default async (req, res) => {
  const {
    query: { username },
  } = req;

  try {
    const bookmarks = await serverClient.query(
      q.Map(
        q.Paginate(q.Match(q.Index("getBookmarksByUsername"), username)),
        q.Lambda("X", q.Get(q.Var("X")))
      )
    );
    res.status(200).json(bookmarks.data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
