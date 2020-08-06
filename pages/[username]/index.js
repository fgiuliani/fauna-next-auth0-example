import DataRow from "../../components/data-row";
import Layout from "../../components/layout";
import Link from "next/link";
import useSWR from "swr";
import { useRouter } from "next/router";
import auth0 from "../../lib/auth0";

const fetcher = (url) => fetch(url).then((r) => r.json());

function BookmarkList({ user }) {
  const router = useRouter();
  const { username } = router.query;

  const { data } = useSWR(`/api/${username}`, fetcher);

  return (
    <Layout user={user}>
      <h1>Fauna Next Auth0</h1>

      {user && user.nickname === username ? (
        <Link href="/add">
          <a className="createNew">Add</a>
        </Link>
      ) : (
        <></>
      )}

      <div className="table">
        {data ? (
          data.map((d) =>
            !d.data.isPrivate ||
            (d.data.isPrivate && user && user.nickname === username) ? (
              <DataRow
                key={d.ref["@ref"].id}
                id={d.ref["@ref"].id}
                title={d.data.title}
                user={user}
                username={username}
                slug={d.data.slug}
                url={d.data.url}
                description={d.data.description}
              />
            ) : (
              <></>
            )
          )
        ) : (
          <>
            <DataRow loading />
          </>
        )}
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req, res }) {
  const session = await auth0.getSession(req);

  if (!session || !session.user) {
    return { props: { user: null } };
  }

  return { props: { user: session.user } };
}

export default BookmarkList;
