import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    const fetchUserInfo = async () => { 
      try {
		const url = `${process.env.REACT_APP_API_URL}/profile`
        const response = await fetch(url, {
          credentials: "include",
        });
        if (!response.ok) {
          return;
        }
        const userInfo = await response.json();
        setUserInfo(userInfo);
      } catch (error) {
        console.error("Fetch user info failed:", error);
      }
    };

    fetchUserInfo();
  }, [setUserInfo]);

  function logout() {
	const url = `${process.env.REACT_APP_API_URL}/logout`
    fetch(url, {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">
        MyBlog
      </Link>
      <nav>
        {username && (
          <>
            <Link to="/create">Create new post</Link>
            <a href="" onClick={logout}>Logout</a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
