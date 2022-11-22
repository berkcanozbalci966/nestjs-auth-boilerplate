import Link from "next/link";
import { useTranslate } from "../../hooks/useTranslate";

const SecureNavList = () => {
  const tl = useTranslate("index")
 
  


  return (
    <>
      <li>
        <Link href="/"> {tl("home")} </Link>
      </li>
     <li>
        <Link href="/login"> {tl("login")} </Link>
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
