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