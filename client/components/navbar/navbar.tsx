import Image from "next/image";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import UserNavCard from "./UserNavCard";
import SecureNavList from "./SecureNavList";
import PublicNavList from "./PublicNavList";
import LanguageSwitcher from "./LanguageSwitcher";
import Logo from "./Logo";
import MenuButton from "./MenuButton";

const NavbarComponent: React.FC = () => {
  const { auth } = useContext(AuthContext);
  return (
    <div className="navbar bg-base-100 mb-5">
      <div className="navbar-start">
        <div className="dropdown">
          <MenuButton />
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {auth.isAuth ? <SecureNavList /> : <PublicNavList />}
          </ul>
        </div>
        <Logo />
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">
          {auth.isAuth ? <SecureNavList /> : <PublicNavList />}
        </ul>
      </div>
      <div className="navbar-end">{auth.isAuth && <UserNavCard />}</div>
      <LanguageSwitcher />
    </div>
  );
};

export default NavbarComponent;
