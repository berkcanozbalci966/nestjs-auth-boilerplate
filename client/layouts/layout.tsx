import { ReactNode, useEffect, useState } from "react";
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer";
import AuthService from "../services/auth.service";
import { useProfile } from './../hooks/useProfile';

type Layout = {
  children: ReactNode;
  topics?: any;
};


const authService = new AuthService();

const Layout = ({ children }: Layout) => {
  useProfile()

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <div className="container mx-auto px-4 mb-5">
          <Navbar />
            <main>{children}</main>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
