import { ReactElement, useEffect } from "react";
import Layout from "../layouts/layout";
import { useRouter } from "next/router";

export default function ErrorPage() {
  const { push } = useRouter();
  useEffect(() => {
    setTimeout(() => {
      push("/");
    }, 500);
  }, []);
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
