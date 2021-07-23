# Navigation with Pages -day2

Routing is already inbuilt in Next.js

Add some new pages to the page directory you're done.

### PRERENDERING

Next.js Pre rerender by default 

Prerender means generating HTML files for each page in advance.

---

### Hydration

Each Page is generated with minimal code of javascript associated with it. When the page gets loaded to the browser then the javascript runs after which site become accessible.

This Process called Hydration

### Types of Pre-rendering

---

> Rendering only differ by when next.js generates HTML for the page

### Static Site Generation

Every HTML file is already generated at build time and reuse on each request.

1.without data

   page is pre-rendered with a single HTML file

2.with data

Some pages require fetching data from an external source in that case , Next.js have two function for different scenarios.

- Your page content depends on external data ` getStaticProps `
- Your page paths depend on external data `getStaticPaths` with `getStaticProps`

`getStaticProps`

This async method runs at build time and return the data as props to the component.

/pages/PostList.js

```jsx
import Link from "next/link";
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
```

`getStaticPaths`

It prerenders the page correspond to list of paths with corresponding dynamic routes params

/pages/posts/[id].js

```jsx
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
  //  list of paths and pre-render the each path at build time
  //paths = [ {params :id } , { params:id } ]
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
  const post = await res.json();

  return {
    props: {
      post,
    },
  };
}

export default Post;
```

When to use Static Generation?

In Static Generation the page was built once and served by CDN Yess much faster then server-side rendering.

Some use cases of static generation

1. Blog Post
2. marketing
3. documentation
4. terms and condition page

> I don't think e-commerce product listings can be count in a static generation, nowadays there's a lot of data that need to be in sync while viewing the product list like sale countdown time and stock status.

To make a Decision between static and server-side rendering?

> You should ask yourself: "Can I pre-render this page ahead of a user's request?" If the answer is yes, then you should choose Static Generation. - Next.js Documentation

And there are some scenarios in which pre-render cannot be done ahead of user Requests.

In that case, Server-side Rendering comes in.

### Server-side Rendering

On Server-side rendering HTML is generated at every request.

`getServerStaticProps` is a async function which is called by server every time a request is made and render the component with latest data.

```jsx
function Page({ data }) {
  // Render data...
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://.../data`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}

export default Page

```

Similar to `getStaticProps` but this function called only one time at build time but this function get called every time on request.