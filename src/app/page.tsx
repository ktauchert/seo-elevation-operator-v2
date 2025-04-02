import Footer from "@/components/landing/Footer";
import HeroSection from "@/components/landing/HeroSection";
import KeyFeatures from "@/components/landing/KeyFeatures";
import Testimonials from "@/components/landing/Testimonials";

export default function Home() {
  return (
    <div className="mb-4">
      <HeroSection />
      <KeyFeatures />
      <Testimonials />
      <Footer />
    </div>
  );
}
