import { useEffect, useState } from "react";
import Post from "../Post";

export default function IndexPage() {
	const [posts, setPosts] = useState([]);


  useEffect(() => {
	const url = `${process.env.REACT_APP_API_URL}/post`
    fetch(url).then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, []);

  return (
    <>
      {posts.length > 0 && posts.map(post => (
		<Post {...post} />
	  ))}
    </>
  );
}
