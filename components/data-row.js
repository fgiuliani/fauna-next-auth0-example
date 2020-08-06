import Router from "next/router";

const DataRow = ({
  title,
  user,
  username,
  slug,
  url,
  description,
  loading,
}) => {
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
    <div className="dataRow">
      <p className={loading ? "loading" : ""}>
        <a href={url} target="_blank">
          {title}
        </a>
      </p>
      <p className={loading ? "loading" : ""}>{description}</p>
      {user && user.nickname === username ? (
        <div className={loading ? "loading" : "buttons"}>
          <button onClick={onClick} className="deleteButton">
            Delete
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default DataRow;
