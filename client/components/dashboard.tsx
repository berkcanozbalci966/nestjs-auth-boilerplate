import React, { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const Dashboard = () => {
  const { auth, user } = useContext(AuthContext);

  return (
    <>
      <div>Dashboard</div>
      ID: {user.id}
    </>
  );
};

export default Dashboard;
