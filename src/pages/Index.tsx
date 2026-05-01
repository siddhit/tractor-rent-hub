import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BeforeAfter from "@/components/BeforeAfter";
import PopularImplements from "@/components/PopularImplements";
import Testimonials from "@/components/Testimonials";
import HomePromise from "@/components/HomePromise";
import FaqTeaser from "@/components/FaqTeaser";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <Hero />
        <BeforeAfter />
        <PopularImplements />
        <Testimonials />
        <HomePromise />
        <FaqTeaser />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
