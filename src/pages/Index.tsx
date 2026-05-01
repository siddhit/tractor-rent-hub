import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BeforeAfter from "@/components/BeforeAfter";
import PopularImplements from "@/components/PopularImplements";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
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
        <HowItWorks />
        <Testimonials />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
