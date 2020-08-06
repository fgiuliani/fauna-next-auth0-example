function RedirectPage(props) {
  return <h1>{props.error}</h1>;
}

export async function getServerSideProps(context) {
  const { username, slug } = context.query;

  try {
    const res = await fetch(
      `${process.env.SERVER_PATH}/api/${username}/${slug}`,
      {
        method: "GET",
      }
    );
    if (res.status === 200) {
      const bookmark = await res.json();

      context.res.writeHead(303, { Location: bookmark.url });
      context.res.end();
    } else {
      throw new Error(await res.text());
    }
  } catch (error) {
    return {
      props: { error: error.message },
    };
  }
}

export default RedirectPage;
