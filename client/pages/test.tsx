import { ReactElement } from "react";
import Layout from "../layouts/layout";

export default function TestPage() {
  return (
    <>
      <div>
        <h1>Error</h1>
        <h2>We have some problem here ....</h2>
      </div>
    </>
  );
}

TestPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
