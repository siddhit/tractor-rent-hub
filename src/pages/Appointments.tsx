import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { implements_data, getImplementById } from "@/data/implements";
import { CalendarDays, CreditCard, CheckCircle } from "lucide-react";

const Appointments = () => {
  const { language, t } = useLanguage();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const preselectedId = searchParams.get('implement');

  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedImplement, setSelectedImplement] = useState(preselectedId || "");
  const [duration, setDuration] = useState("1");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const implement = getImplementById(selectedImplement);
  const total = implement ? implement.pricePerDay * parseInt(duration || "1") : 0;

  const handlePayment = () => {
    if (!name || !phone || !selectedDate || !selectedImplement) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      return;
    }
    // Simulate UPI payment
    toast({ title: "Redirecting to UPI...", description: "Complete payment in your UPI app" });
    setTimeout(() => setStep(3), 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 md:pt-24">
        <section className="py-12 md:py-16">
          <div className="container max-w-2xl">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-display text-foreground mb-2">
                {t('appt.title')}
              </h1>
            </div>

            {/* Progress Steps */}
            <div className="flex justify-center gap-4 mb-8">
              {[1, 2, 3].map((s) => (
                <div key={s} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= s ? 'gradient-hero text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                  {s}
                </div>
              ))}
            </div>

            <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card">
              {step === 1 && (
                <div className="space-y-5">
                  <div>
                    <Label>{t('appt.selectImplement')}</Label>
                    <Select value={selectedImplement} onValueChange={setSelectedImplement}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder={t('appt.selectImplement')} />
                      </SelectTrigger>
                      <SelectContent>
                        {implements_data.filter(i => i.available).map((impl) => (
                          <SelectItem key={impl.id} value={impl.id}>
                            {impl.name[language]} - ₹{impl.pricePerDay}/day
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>{t('appt.selectDate')}</Label>
                    <div className="mt-2 flex justify-center">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < new Date()}
                        className="rounded-lg border"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>{t('appt.duration')}</Label>
                    <Input
                      type="number"
                      min="1"
                      max="30"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <Button onClick={() => setStep(2)} variant="hero" size="lg" className="w-full" disabled={!selectedImplement || !selectedDate}>
                    Continue
                  </Button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5">
                  <div>
                    <Label>Your Name</Label>
                    <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" className="mt-1" />
                  </div>
                  <div>
                    <Label>Phone Number</Label>
                    <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 43210" className="mt-1" />
                  </div>

                  <div className="bg-muted rounded-xl p-4">
                    <p className="text-sm text-muted-foreground mb-2">{t('appt.total')}</p>
                    <p className="text-3xl font-display text-foreground">₹{total.toLocaleString('en-IN')}</p>
                  </div>

                  <Button onClick={handlePayment} variant="hero" size="lg" className="w-full">
                    <CreditCard className="w-5 h-5 mr-2" />
                    {t('appt.payUpi')}
                  </Button>
                </div>
              )}

              {step === 3 && (
                <div className="text-center py-8">
                  <CheckCircle className="w-20 h-20 text-success mx-auto mb-4" />
                  <h2 className="text-2xl font-display text-foreground mb-2">Booking Confirmed!</h2>
                  <p className="text-muted-foreground">We'll contact you on WhatsApp with delivery details.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Appointments;
