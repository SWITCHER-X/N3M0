import About from "./_About";
import Contact from "./_Contact";
import Footer from "./Footer";
import Hero from "./Hero";
import Navbar from "./Navbar";
import Projects from "./Projects";

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
    </>
  );
};

export default Page;
