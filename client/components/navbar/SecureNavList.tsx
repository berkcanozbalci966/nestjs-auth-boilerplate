import { Navbar, Dropdown, Avatar } from "flowbite-react";
import Link from "next/link";

const SecureNavList = () => {
  return (
    <Navbar.Collapse>
      <Link href="/">Home</Link>
      <Link href="/test">Test</Link>
      <Link href="/test">Test</Link>
    </Navbar.Collapse>
  );
};

export default SecureNavList;
