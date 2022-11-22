import Layout from "../layouts/layout";
import { ReactElement, useContext } from "react";
import AuthContext from "../context/AuthProvider";
// import Dashboard from "../components/dashboard";
import Home from "../components/home";
import TopicService from "../services/topic.service";

const topicService = new TopicService();

export default function IndexPage() {
  const {
    auth: { isAuth },
  } = useContext(AuthContext);
  return /* isAuth ? <Dashboard /> : */ <Home />;
}

export async function getServerSideProps() {
  try {
    const topics = await topicService.getTopics();
    return { props: { topics } };
  } catch (error) {
    return { props: { topics: [] } };
  }
}

IndexPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout topics={page.props.topics}>{page}</Layout>;
};
