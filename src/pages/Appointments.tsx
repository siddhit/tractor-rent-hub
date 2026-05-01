import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { implements_data, getImplementById } from "@/data/implements";
import { CreditCard, CheckCircle, AlertTriangle } from "lucide-react";
import { DateRange } from "react-day-picker";

type AreaUnit = 'bigha' | 'acre' | 'hectare';

const convertToBigha = (value: number, unit: AreaUnit): number => {
  switch (unit) {
    case 'acre':
      return value * 1.6; // 1 acre ≈ 1.6 bigha (Gujarat)
    case 'hectare':
      return value * 4; // 1 hectare ≈ 4 bigha (Gujarat)
    default:
      return value;
  }
};

const Appointments = () => {
  const { language, t } = useLanguage();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const preselectedId = searchParams.get('implement');

  const [step, setStep] = useState(1);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [selectedImplement, setSelectedImplement] = useState(preselectedId || "");
  const [farmSize, setFarmSize] = useState("5");
  const [areaUnit, setAreaUnit] = useState<AreaUnit>('bigha');
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  
  // Checklist states
  const [fieldReady, setFieldReady] = useState(false);
  const [irrigationDone, setIrrigationDone] = useState(false);
  const [noObstructions, setNoObstructions] = useState(false);

  const implement = getImplementById(selectedImplement);
  const farmSizeInVigha = convertToBigha(parseFloat(farmSize) || 0, areaUnit);
  const total = implement?.pricePerVigha != null ? implement.pricePerVigha * farmSizeInVigha : 0;

  const isValidPhone = (p: string) => /^[6-9]\d{9}$/.test(p.replace(/\D/g, '').slice(-10));

  const handleContinueToStep2 = () => {
    if (!selectedImplement || !dateRange?.from) {
      toast({ title: "Please select work type and dates", variant: "destructive" });
      return;
    }
    setStep(2);
  };

  const handleContinueToStep3 = () => {
    if (!name.trim() || !phone.trim() || !farmSize) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      return;
    }
    if (!isValidPhone(phone)) {
      toast({ title: "Please enter a valid 10-digit Indian mobile number", variant: "destructive" });
      return;
    }
    setStep(3);
  };

  const handlePayment = () => {
    if (!fieldReady || !irrigationDone || !noObstructions) {
      toast({ title: "Please confirm all checklist items", variant: "destructive" });
      return;
    }
    // Simulate UPI payment
    toast({ title: "Redirecting to UPI...", description: "Complete payment in your UPI app" });
    setTimeout(() => setStep(4), 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <section className="py-12 md:py-16">
          <div className="container max-w-2xl">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-display text-foreground mb-2">
                {t('appt.title')}
              </h1>
            </div>

            {/* Progress Steps */}
            <div className="flex justify-center gap-4 mb-8">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= s ? 'gradient-hero text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                  {s}
                </div>
              ))}
            </div>

            <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card">
              {/* Step 1: Select Work & Date Range */}
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
                            {impl.name[language]}{impl.pricePerVigha ? ` — ₹${impl.pricePerVigha}/${t('common.vigha').toLowerCase()}` : ''}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>{t('appt.selectDate')}</Label>
                    <p className="text-sm text-muted-foreground mb-2">Select a date range for the work</p>
                    <div className="mt-2 flex justify-center">
                      <Calendar
                        mode="range"
                        selected={dateRange}
                        onSelect={setDateRange}
                        disabled={(date) => date < new Date()}
                        className="rounded-lg border"
                        numberOfMonths={1}
                      />
                    </div>
                    {dateRange?.from && (
                      <p className="text-sm text-center mt-2 text-muted-foreground">
                        {dateRange.from.toLocaleDateString()} 
                        {dateRange.to ? ` - ${dateRange.to.toLocaleDateString()}` : ''}
                      </p>
                    )}
                  </div>

                  <Button onClick={handleContinueToStep2} variant="hero" size="lg" className="w-full" disabled={!selectedImplement || !dateRange?.from}>
                    Continue
                  </Button>
                </div>
              )}

              {/* Step 2: Farm Details */}
              {step === 2 && (
                <div className="space-y-5">
                  <div>
                    <Label>Your Name</Label>
                    <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" className="mt-1" />
                  </div>
                  <div>
                    <Label>Phone Number</Label>
                    <Input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/[^\d\s+()-]/g, ''))}
                      placeholder="+91 97230 00299"
                      type="tel"
                      inputMode="numeric"
                      maxLength={15}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label>{t('appt.farmSize')}</Label>
                    <div className="flex gap-2 mt-1">
                      <Input 
                        type="number" 
                        min="1" 
                        max="500"
                        value={farmSize} 
                        onChange={(e) => setFarmSize(e.target.value)} 
                        className="flex-1"
                      />
                      <Select value={areaUnit} onValueChange={(v) => setAreaUnit(v as AreaUnit)}>
                        <SelectTrigger className="w-28">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bigha">{t('common.vigha')}</SelectItem>
                          <SelectItem value="acre">{t('common.acre')}</SelectItem>
                          <SelectItem value="hectare">{t('common.hectare')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {areaUnit !== 'bigha' && (
                      <p className="text-sm text-muted-foreground mt-1">
                        ≈ {farmSizeInVigha.toFixed(1)} {t('common.vigha')}
                      </p>
                    )}
                  </div>

                  <div className="bg-muted rounded-xl p-4">
                    <p className="text-sm text-muted-foreground mb-2">{t('appt.total')}</p>
                    <p className="text-3xl font-display text-foreground">₹{total.toLocaleString('en-IN')}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      ({implement?.name[language]} × {farmSizeInVigha.toFixed(1)} {t('common.vigha').toLowerCase()})
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Button onClick={() => setStep(1)} variant="outline" size="lg" className="flex-1">
                      Back
                    </Button>
                    <Button onClick={handleContinueToStep3} variant="hero" size="lg" className="flex-1">
                      Continue
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Checklist & Payment */}
              {step === 3 && (
                <div className="space-y-5">
                  <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-amber-800 dark:text-amber-200 mb-2">Pre-work Checklist</p>
                        
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <Checkbox 
                              id="fieldReady" 
                              checked={fieldReady} 
                              onCheckedChange={(c) => setFieldReady(c === true)}
                            />
                            <label htmlFor="fieldReady" className="text-sm text-amber-700 dark:text-amber-300 cursor-pointer">
                              {t('appt.fieldReady')}
                            </label>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <Checkbox 
                              id="irrigation" 
                              checked={irrigationDone} 
                              onCheckedChange={(c) => setIrrigationDone(c === true)}
                            />
                            <label htmlFor="irrigation" className="text-sm text-amber-700 dark:text-amber-300 cursor-pointer">
                              {t('appt.irrigationDone')}
                            </label>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <Checkbox 
                              id="obstructions" 
                              checked={noObstructions} 
                              onCheckedChange={(c) => setNoObstructions(c === true)}
                            />
                            <label htmlFor="obstructions" className="text-sm text-amber-700 dark:text-amber-300 cursor-pointer">
                              {t('appt.obstructions')} (No / નહિ)
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted/50 rounded-xl p-4 text-sm text-muted-foreground">
                    {t('appt.disclaimer')}
                  </div>

                  <div className="bg-muted rounded-xl p-4">
                    <p className="text-sm text-muted-foreground mb-2">{t('appt.total')}</p>
                    <p className="text-3xl font-display text-foreground">₹{total.toLocaleString('en-IN')}</p>
                  </div>

                  <div className="flex gap-3">
                    <Button onClick={() => setStep(2)} variant="outline" size="lg" className="flex-1">
                      Back
                    </Button>
                    <Button 
                      onClick={handlePayment} 
                      variant="hero" 
                      size="lg" 
                      className="flex-1"
                      disabled={!fieldReady || !irrigationDone || !noObstructions}
                    >
                      <CreditCard className="w-5 h-5 mr-2" />
                      {t('appt.payUpi')}
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 4: Confirmation */}
              {step === 4 && (
                <div className="text-center py-8">
                  <CheckCircle className="w-20 h-20 text-success mx-auto mb-4" />
                  <h2 className="text-2xl font-display text-foreground mb-2">{t('appt.requestReceived')}</h2>
                  <p className="text-muted-foreground">{t('appt.confirmWhatsApp')}</p>
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
