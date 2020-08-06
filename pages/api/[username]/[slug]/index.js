import { query as q } from "faunadb";
import { serverClient } from "../../../../lib/fauna-auth";

export default async (req, res) => {
  const {
    query: { username, slug },
  } = req;

  try {
    const bookmark = await serverClient.query(
      q.Map(
        q.Paginate(
          q.Match(q.Index("getBookmarkByUsernameAndSlug"), [username, slug]),
          { size: 1 }
        ),
        q.Lambda("X", q.Get(q.Var("X")))
      )
    );

    if (bookmark && bookmark.data[0]) {
      res.status(200).json(bookmark.data[0].data);
    } else {
      res.status(500).json({ error: "Invalid link" });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
