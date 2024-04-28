import { Outlet } from "react-router-dom";
import Footer from "src/components/Footer";
import Navbar from "src/components/Navbar";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="flex justify-center items-center z-10">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
