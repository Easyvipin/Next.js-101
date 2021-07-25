# Next.js Data Fetching day3

`getStaticProps` (Static Generation)

---

This async function is called at build time which returns `props` to the page so the fetched data can render on the component.

### Parameters {context}

 We call `getStaticProps` by passing an object which has following keys :

 1. Params : It contains the parameters of routes , this basically works in dynamic routing of page .

    case : We have a page that will have dynamic routing ,  we named that page [id].js  

              Now in that case the params will be { id : something}

   The use of `params` basically required when we work with `getStaticPaths()`

1. preview
2. previewData
3. locales

### Return

> it returns object which have

1. `props`
2. `revalidate` : the time after which existing pre-rendered page regeneration happens .

     **case**: if we have `revalidate:60` then that page will be regenerated after 60 with new data or    updated data.

1. `notfound` :This stores a boolean value to return 404 status.

 **case** : we can use `notfound` to send 404 status code with page when the data  was unable to be        fetched from an API.   

```jsx

export async function getStaticProps({ params }) {
  console.log(params);
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  );
  const post =undefined;

  if (!post) {
    console.log("post invalid");
    return {
      notFound: true, // return and redirect to 404 page 
    };
  }

  return {
    props: {
      post,
    },
  };
}

export default Post;
```

1. `redirect` : Its an object `{destination:string,permanent:boolean}` . It will redirect to the destination. 

```jsx
const post = undefined;

  if (!post) {
    console.log("post invalid");
    return {
      redirect: {
        destination: "/About", //redirect to about page
        permanent: false,
      },
    };
  }
```

> server-side code directly in `getStaticProps()`

There is no need to fetch the API in `getStaticProps` in that case we can just write down the whole API route logic in the function or import the module which contains the logic.

Ummm writing server-side in client-side that will be disaster?

Thats not the case..

> " Imports used in getStaticProps will not be bundled for the client-side." - Next.js Docs

When to use `getStaticProps` ?

1. Data required to render the page is available at build time i.e **ahead of user request**
2. Data from headless cms
3. The data can be publicly cached (not user-specific).
4. For SEO purposes like fast generation of page with caching of cdn.

## Incremental static regeneration

---

Next.js helps us to create or updated existed page after build time that happens through ISR

It can be enabled

 * through `revalidate` property in `getStaticProps`

* through `fallback:"blocking"` property in `getStaticPaths`

When a request is made to an existing page (already pre-rendered page in that case if 

`revalidate : 10`.

1. Exist page is sent on initial request and before 10s  if you refresh, the same cached page will be displayed.
2. After 10s if the request made it will still show the cached page but nextjs regenerate the page with updated data in backround.
3. And next time on request a updated page is rendered . 
4. If the regeneration fails the old page will be cached without any alteration in the data.

 

When a request is made to the unknown path that does not exists in build time 

`falseback:"blocking"` .

This will allow next.js to server render the page for the first time and later request will be on a static page.

### Technical Details

> `getStaticProps` only run at build time and it did not receive the data that only available on request time , ex : query params , headers.

**static generation include HTML and JSON**

When a page is pre-rendered it basically build a Html file and json file to hold the result of `getStaticProps`

As we know `getStaticProps` is not bundled on client-side .

so json hold the data such as the result that was returned.

And when the user navigates to a page the particular JSON is fetched to populate the props for that page. 

That's how client-side work without the use of `getStaticProps` by using Json file.