import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PopularImplements from "@/components/PopularImplements";
import HomePromise from "@/components/HomePromise";
import FaqTeaser from "@/components/FaqTeaser";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-dvh bg-background">
      <Header />
      <main className="pt-16">
        <Hero />
        <PopularImplements />
        <HomePromise />
        <FaqTeaser />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
