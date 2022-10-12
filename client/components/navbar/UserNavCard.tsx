import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import Link from "next/link";
import { Navbar, Dropdown, Avatar } from "flowbite-react";
import LanguageSwitcher from "./LanguageSwitcher";

function UserNavCard() {
  const { logOut } = useContext(AuthContext);

  return (
    <div className="flex md:order-1 items-center">
      <Dropdown
        arrowIcon={false}
        inline={true}
        label={
          <Avatar
            alt="User settings"
            img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            rounded={true}
          />
        }
      >
        <Dropdown.Header>
          <span className="block text-sm">Bonnie Green</span>
          <span className="block truncate text-sm font-medium">
            name@flowbite.com
          </span>
        </Dropdown.Header>
        <Dropdown.Item>
          <Link href="/">Dashboard</Link>
        </Dropdown.Item>
        <Dropdown.Item>Settings</Dropdown.Item>
        <Dropdown.Item>Earnings</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={() => logOut()}>Sign out</Dropdown.Item>
      </Dropdown>
      <LanguageSwitcher />
    </div>
  );
}

export default UserNavCard;
