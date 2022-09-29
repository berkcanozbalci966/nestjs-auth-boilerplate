import React, { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const Dashboard = () => {
  const { auth } = useContext(AuthContext);

  return (
    <>
      <div>Dashboard</div>
      <>
        <p>ID: {auth.userId}</p>
        <p>Name : {auth.name} </p>
      </>
    </>
  );
};

export default Dashboard;
