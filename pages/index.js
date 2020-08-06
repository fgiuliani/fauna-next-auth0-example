import auth0 from "../lib/auth0";
import Layout from "../components/layout";

function Profile({ user }) {
  return (
    <Layout user={user}>
      <h1>Profile</h1>

      <div>
        <p>username: {user.nickname}</p>
        <p>name: {user.name}</p>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req, res }) {
  const session = await auth0.getSession(req);

  if (!session || !session.user) {
    res.writeHead(302, {
      Location: "/api/login",
    });
    res.end();
    return;
  }

  return { props: { user: session.user } };
}

export default Profile;
