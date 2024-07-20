import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Content from "./components/Content";
import Testimonials from "./components/Testimonials";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <main className="bg-[#F6F6F6] overflow-hidden">
        <HeroSection />
        <Content />
        <Testimonials />
        <Footer />
      </main>
    </div>
  );
};

export default Home;
