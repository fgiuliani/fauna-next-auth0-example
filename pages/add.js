import { useState } from "react";
import Router from "next/router";
import { useForm } from "react-hook-form";
import Layout from "../components/layout";
import auth0 from "../lib/auth0";

function Add({ user }) {
  const [errorMessage, setErrorMessage] = useState("");

  const { handleSubmit, register, errors } = useForm();

  const onSubmit = handleSubmit(async (formData) => {
    if (errorMessage) setErrorMessage("");

    try {
      const res = await fetch(`/api/${user.nickname}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (res.status === 200) {
        Router.push(`/${user.nickname}/`);
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  });

  return (
    <Layout user={user}>
      <h1>Add Bookmark</h1>

      <form onSubmit={onSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            placeholder="Title"
            ref={register({ required: "Title is required" })}
          />
          {errors.title && (
            <span role="alert" className="error">
              {errors.title.message}
            </span>
          )}
        </div>

        <div>
          <label>Slug</label>
          <input
            type="text"
            name="slug"
            placeholder="test-link"
            ref={register({ required: "Slug is required" })}
          />
          {errors.slug && (
            <span role="alert" className="error">
              {errors.slug.message}
            </span>
          )}
        </div>

        <div>
          <label>Url</label>
          <input
            type="text"
            name="url"
            placeholder="e.g. https://www.google.com"
            ref={register({ required: "Url is required" })}
          />
          {errors.url && (
            <span role="alert" className="error">
              {errors.url.message}
            </span>
          )}
        </div>

        <div>
          <label>Description</label>
          <input type="text" name="description" placeholder="" ref={register} />
          {errors.description && (
            <span role="alert" className="error">
              {errors.description.message}
            </span>
          )}
        </div>

        <div>
          <label>Private Bookmark</label>
          <input type="checkbox" name="isPrivate" ref={register} />
          {errors.isPrivate && (
            <span role="alert" className="error">
              {errors.isPrivate.message}
            </span>
          )}
        </div>

        <div className="submit">
          <button type="submit" className="submitButton">
            Add
          </button>
        </div>
      </form>

      {errorMessage && (
        <p role="alert" className="errorMessage">
          {errorMessage}
        </p>
      )}
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

export default Add;
