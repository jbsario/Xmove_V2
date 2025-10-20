import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import DeliveryForm from "@/components/DeliveryForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <DeliveryForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
