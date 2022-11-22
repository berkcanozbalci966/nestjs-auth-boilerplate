import { ReactElement, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import Layout from "../layouts/layout";

function Profile() {
  const { user } = useContext(AuthContext);
  return (
    <>
      <div>Profile</div>
      {JSON.stringify(user)}
    </>
  );
}

Profile.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Profile;
