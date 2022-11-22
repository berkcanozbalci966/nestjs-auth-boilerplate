import Link from "next/link";

const SecureNavList = () => {
  return (
    <>
      <li>
        <Link href="/">Home</Link>
      </li>
     <li>
        <Link href="/login">Login</Link>
      </li>
    </>

    // <Navbar.Collapse>
    //   <Link href="/">Home</Link>
    //   <Link href="/test">Test</Link>
    //   <Link href="/test">Test</Link>
    // </Navbar.Collapse>
  );
};

export default SecureNavList;
