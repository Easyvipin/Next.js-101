const Post = ({ post }) => {
  return (
    <div className="container">
      <h2 className="title">{post.title}</h2>
      <p className="body">{post.body}</p>
    </div>
  );
};
export async function getStaticPaths() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();

  const paths = posts.map((eachPost) => ({
    params: { id: eachPost.id.toString() },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  console.log(params);
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  );
  const post = undefined;

  if (!post) {
    console.log("post invalid");
    return {
      redirect: {
        destination: "/About",
        permanent: false,
      },
    };
  }

  return {
    props: {
      post,
    },
  };
}

export default Post;
