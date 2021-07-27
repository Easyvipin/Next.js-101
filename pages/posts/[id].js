import { useRouter } from "next/router";

const Post = ({ post }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading....</div>;
  }

  return (
    <div className="container">
      <h2 className="title">{post.title}</h2>
      <p className="body">{post.body}</p>
    </div>
  );
};
export async function getStaticPaths() {
  const paths = [
    {
      params: { id: "1" },
    },
  ];
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  console.log(params);
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  );
  const post = await res.json();

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
    revalidate: 1,
  };
}

export default Post;
