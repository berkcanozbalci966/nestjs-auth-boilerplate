import React, { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import GeneralContext from "../context/GeneralProvider";
import useTranslate from "../hooks/useTranslate";

const Dashboard = () => {
  const { auth, user } = useContext(AuthContext);
  const { language } = useContext(GeneralContext);
  const tl = useTranslate("index");

  return (
    <>
      <div>Dashboard</div>
      ID: {user.id}
      LANG : {language}
      <br />
      Hello : {tl("hello")}
      <br />
      test : {tl("test")}
    </>
  );
};

export default Dashboard;
