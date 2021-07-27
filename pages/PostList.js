/* import Link from "next/link";
const PostList = ({ posts }) => {
  return (
    <div className="post container">
      {posts && (
        <div className="post-list">
          {posts.map((eachPost) => {
            return (
              <div className="card-container" key={eachPost.id}>
                <p>{eachPost.body}</p>
                <Link href={`/posts/${eachPost.id}`}>
                  <a>More</a>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export async function getStaticProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();

  return {
    props: {
      posts,
    },
  };
}

export default PostList;
 */

const PostList = () => {
  return <div>Postlist</div>;
};

export default PostList;
