import Link from "next/link";

function Header({ user, loading }) {
  return (
    <header>
      <nav>
        <ul>
          {!loading &&
            (user ? (
              <>
                <li>
                  <Link href="/">
                    <a>Profile</a>
                  </Link>
                </li>
                <li>
                  <Link href={`/${user.nickname}`}>
                    <a>Bookmarks</a>
                  </Link>
                </li>
                <li>
                  <a href="/api/logout">Logout</a>
                </li>
              </>
            ) : (
              <li>
                <a href="/api/login">Login</a>
              </li>
            ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
