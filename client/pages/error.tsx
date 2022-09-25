import { ReactElement } from "react";
import Layout from "../layouts/layout";

export default function ErrorPage() {
  return (
    <>
      <div>
        <h1>Error</h1>
        <h2>We have some problem here ....</h2>
      </div>
    </>
  );
}

ErrorPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
