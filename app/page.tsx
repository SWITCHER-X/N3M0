import About from "./_About";
import Contact from "./_Contact";
import Navbar from "./_Navbar";
import Footer from "./Footer";
import Hero from "./Hero";
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
