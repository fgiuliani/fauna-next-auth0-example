import { query as q } from "faunadb";
import { serverClient } from "../../../lib/fauna-auth";
import auth0 from "../../../lib/auth0";

export default auth0.requireAuthentication(async function addBookmark(
  req,
  res
) {
  const { title, slug, url, description, isPrivate } = req.body;
  const { user } = await auth0.getSession(req);

  try {
    await serverClient.query(
      q.Create(q.Collection("Bookmarks"), {
        data: {
          username: user.nickname,
          title,
          slug,
          url,
          description,
          isPrivate,
        },
      })
    );
    res.status(200).end();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
