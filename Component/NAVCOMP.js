import Link from "next/link";
const NAVCOMP = () => {
  return (
    <div>
      <Link href="/About">
        <a>About</a>
      </Link>
      <Link href="/PostList">
        <a>Post</a>
      </Link>
      <Link href="/Pokemon">
        <a>Pokemon</a>
      </Link>
    </div>
  );
};

export default NAVCOMP;
