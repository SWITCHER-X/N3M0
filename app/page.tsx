import About from "./About";
import Contact from "./_Contact";
import Navbar from "./_Navbar";
import Footer from "./Footer";
import Hero from "./Hero";
import Projects from "./_Projects";
import { ScrollToTop } from "@/components/ScrollToTop";

const Page = () => {
  return (
    <>
      <div className="flex justify-center">
        <Navbar />
      </div>

      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default Page;
