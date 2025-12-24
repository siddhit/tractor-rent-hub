import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PopularImplements from "@/components/PopularImplements";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <PopularImplements />
        <HowItWorks />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
