import { ReactElement } from "react";
import Layout from "../layouts/layout";
import StepperContainer from "./../components/stepper/container";
import Step from "../components/stepper/step";
export default function TestPage() {
  return (
    <>
      <StepperContainer>
        <Step />
        <Step />
        <Step />
        <Step />
      </StepperContainer>
    </>
  );
}

TestPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
