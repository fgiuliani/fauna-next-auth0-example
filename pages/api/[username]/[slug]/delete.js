import { query as q } from "faunadb";
import { serverClient } from "../../../../lib/fauna-auth";
import auth0 from "../../../../lib/auth0";

export default auth0.requireAuthentication(async function deleteBookmark(
  req,
  res
) {
  const {
    query: { username, slug },
  } = req;

  const { user } = await auth0.getSession(req);

  if (user.nickname != username) {
    res.status(500).json({ error: "Invalid User" });
  }

  try {
    await serverClient.query(
      q.Map(
        q.Paginate(
          q.Match(q.Index("getBookmarkByUsernameAndSlug"), [username, slug]),
          { size: 1 }
        ),
        q.Lambda("X", q.Delete(q.Var("X")))
      )
    );
    res.status(200).end();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
