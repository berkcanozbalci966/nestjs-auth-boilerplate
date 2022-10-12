import Link from "next/link";

const PublicNavList = () => {
  return (
    <>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/login">Login</Link>
      </li>
      <li>
        <Link href="/register">Register</Link>
      </li>
    </>

    // <Navbar.Collapse>
    //   <Link href="/">Home</Link>
    //   <Link href="/login">Login</Link>
    //   <Link href="/register">Register</Link>
    //   <Link href="/test">Test</Link>
    //   <Link href="/test">Test</Link>
    // </Navbar.Collapse>
  );
};

export default PublicNavList;
