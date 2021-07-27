# Next.js data fetching day4

`getStaticPaths ` 

---

If a page has dynamic routes which render data from getStaticProps. Then it needs to provide a list of the dynamic paths that should be rendered  to HTML at build time.  

If you export a function `getStaticPaths` from the page then next.js will pre-render all the paths specified by `getStaticPaths`

```jsx
export async function getStaticProps(){
let paths = [{params :{id : "1" }} ,{params :{id:"2" }} , {params :{id:"4"}} ,];
return {
paths :paths // these all path with different params will be pre-rendered at build time.
fallback : true | false ,
}
}
```

`paths` decide which path to be pre-rendered in build time .

` fallback `  

---

1. false :  If `fallback : false` in that case if the path does not exist in pre-rendered list of paths then any invalid request will return to 404 page 
2. true : in case of true  ,  

     1.A fallback page is rendered 

     2. while in the background the [next.](http://next.sj)js generate the HTML and json file for the path and         automatically swapped that with fallback page 

 

**Fallback page** 

 A fallback page is used to show something until the generation happens in the background .

As the generation finished that page will be rendered and become accessible.

Next time on the same path a static page generated page will be displayed.

Lets see all this in action 

`/pages/posts/[id].js`

```jsx
import { useRouter } from "next/router";

const Post = ({ post }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading....</div>; // this will be displayed until the page gets generated.
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
// fallback :true makes all this happen to redirect to fallback rather than to 404
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  
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
    revalidate: 1, // this will regenerate the page after a second
  };
}

export default Post;
```

To test the fallback page we need to it build time because `getStaticProps ` called every time in development mode.

1 . `npm run build`

2 . `npm run start`

`fallback: blocking`

It blocks the page but doesn't show any fallback and  the HTML page  is SSR (server side rendered ) and sends the already generated page in the next request.

### getServerSideProps

It basically pre-render on server side on each request .

Moreover it has some more keys in context object that pass to this function

`like req , res ` 

Will learn about this deep later on ..

### Fetching data from client

If page contains the data that need to be updated very frequently in that case this idea of fetching data on client side work.

Although we can make some part of HTML  from static generation but some part which need updation in that case we can use fetch on client side.

SWR is a special function which let you do that providing extra feature like caching , revalidating , interval refecthing .

Will explore this later too ..