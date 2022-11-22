import Layout from "../layouts/layout";
import { ReactElement, useContext } from "react";
import AuthContext from "../context/AuthProvider";
// import Dashboard from "../components/dashboard";
import Home from "../components/home";



export default function IndexPage() {
  const {
    auth: { isAuth },
  } = useContext(AuthContext);
  return /* isAuth ? <Dashboard /> : */ <Home />;
}



IndexPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
