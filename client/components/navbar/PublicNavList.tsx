import { Navbar, Dropdown, Avatar } from "flowbite-react";
import Link from "next/link";

const PublicNavList = () => {
  return (
    <Navbar.Collapse>
      <Link href="/">Home</Link>
      <Link href="/login">Login</Link>
      <Link href="/register">Register</Link>
      <Link href="/test">Test</Link>
      <Link href="/test">Test</Link>
    </Navbar.Collapse>
  );
};

export default PublicNavList;
