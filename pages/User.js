const User = ({ user }) => {
  return <div>{user.name}</div>;
};

export async function getServerSideProps({ params, req }) {
  console.log(params);
  console.log(req);

  const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
  const user = await res.json();

  return {
    props: {
      user,
    },
  };
}
export default User;
