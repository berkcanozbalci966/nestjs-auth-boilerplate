import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";

function UserNavCard() {
  const { logOut } = useContext(AuthContext);

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img src="https://placeimg.com/80/80/people" />
        </div>
      </label>
      <ul
        tabIndex={0}
        className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <Link href="/profile">Profile</Link>
        </li>
        <li>
          <Link href="/">Settings</Link>
        </li>
        <li>
          <a onClick={() => logOut()}>Logout</a>
        </li>
      </ul>
    </div>

    // <div className="flex md:order-1 items-center">
    //   <Dropdown
    //     arrowIcon={false}
    //     inline={true}
    //     label={
    //       <Avatar
    //         alt="User settings"
    //         img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
    //         rounded={true}
    //       />
    //     }
    //   >
    //     <Dropdown.Header>
    //       <span className="block text-sm">Bonnie Green</span>
    //       <span className="block truncate text-sm font-medium">
    //         name@flowbite.com
    //       </span>
    //     </Dropdown.Header>
    //     <Dropdown.Item>
    //       <Link href="/">Dashboard</Link>
    //     </Dropdown.Item>
    //     <Dropdown.Item>Settings</Dropdown.Item>
    //     <Dropdown.Item>Earnings</Dropdown.Item>
    //     <Dropdown.Divider />
    //     <Dropdown.Item onClick={() => logOut()}>Sign out</Dropdown.Item>
    //   </Dropdown>
    //   <LanguageSwitcher />
    // </div>
  );
}

export default UserNavCard;
