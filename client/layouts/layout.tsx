import { ReactNode, useEffect, useState } from "react";
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer";
import useAuth from "../hooks/useAuth";
import TopicContainer from "../components/Topic/TopicContainer";
import CategoryContainer from "../components/Categories/CategoryContainer";
import { CategoryService } from "../services/category.service";
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
