import { ReactNode } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

type Layout = {
  children: ReactNode;
};

const Layout = ({ children }: Layout) => {
  return (
    <div className="flex flex-col" style={{ minHeight: "100vh" }}>
      <Navbar />
      <main className="flex-grow mb-2 container px-5 py-24 mx-auto">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
