import { NextPage } from "next";
import React, { ReactPropTypes } from "react";
import Layout from "./layout";
import SecureLayout from "./secure";

export default function WithSecureLayout(WrappedComponent: NextPage) {
  return class extends React.Component {
    constructor(props: ReactPropTypes) {
      super(props);
    }

    render(): React.ReactNode {
      return (
        <Layout>
          <SecureLayout>
            <WrappedComponent />
          </SecureLayout>
        </Layout>
      );
    }
  };
}
