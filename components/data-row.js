import Router from "next/router";

function DataRow({ title, user, username, slug, url, description }) {
  const onClick = async () => {
    try {
      const res = await fetch(`/api/${username}/${slug}/delete`, {
        method: "DELETE",
      });
      if (res.status === 200) {
        Router.push(`/${username}/`);
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <p>
        <a href={url} target="_blank">
          {title}
        </a>
      </p>
      <p>{description}</p>
      {user && user.nickname === username ? (
        <div>
          <button onClick={onClick}>Delete</button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default DataRow;
