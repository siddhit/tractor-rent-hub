import Header from "@/components/Header";
import Hero from "@/components/Hero";
import EquipmentGrid from "@/components/EquipmentGrid";
import HowItWorks from "@/components/HowItWorks";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <EquipmentGrid />
        <HowItWorks />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
