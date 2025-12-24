import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { Calculator, TrendingUp, Clock } from "lucide-react";

const ROICalculator = () => {
  const { t } = useLanguage();
  const [landSize, setLandSize] = useState("");
  const [cropType, setCropType] = useState("");
  const [laborCost, setLaborCost] = useState("400");
  const [result, setResult] = useState<{ savings: number; timeSaved: number } | null>(null);

  const calculate = () => {
    const land = parseFloat(landSize) || 0;
    const labor = parseFloat(laborCost) || 400;
    
    // Sample calculation logic
    const laborDaysManual = land * 8; // 8 days per bigha manually
    const laborDaysMachine = land * 1.5; // 1.5 days with machine
    const timeSaved = laborDaysManual - laborDaysMachine;
    const laborSavings = timeSaved * labor;
    const machineCost = laborDaysMachine * 1500; // avg rental per day
    const netSavings = laborSavings - machineCost;

    setResult({
      savings: Math.max(0, Math.round(netSavings)),
      timeSaved: Math.round(timeSaved),
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 md:pt-24">
        <section className="py-12 md:py-16">
          <div className="container max-w-2xl">
            <div className="text-center mb-10">
              <div className="w-16 h-16 rounded-full gradient-hero flex items-center justify-center mx-auto mb-4">
                <Calculator className="w-8 h-8 text-primary-foreground" />
              </div>
              <h1 className="text-3xl md:text-4xl font-display text-foreground mb-2">
                {t('calc.title')}
              </h1>
              <p className="text-muted-foreground">{t('calc.subtitle')}</p>
            </div>

            <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card">
              <div className="space-y-5">
                <div>
                  <Label htmlFor="land">{t('calc.landSize')}</Label>
                  <Input
                    id="land"
                    type="number"
                    placeholder="5"
                    value={landSize}
                    onChange={(e) => setLandSize(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>{t('calc.cropType')}</Label>
                  <Select value={cropType} onValueChange={setCropType}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder={t('calc.cropType')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="onion">{t('crop.onion')}</SelectItem>
                      <SelectItem value="cotton">{t('crop.cotton')}</SelectItem>
                      <SelectItem value="groundnut">{t('crop.groundnut')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="labor">{t('calc.laborCost')}</Label>
                  <Input
                    id="labor"
                    type="number"
                    placeholder="400"
                    value={laborCost}
                    onChange={(e) => setLaborCost(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <Button onClick={calculate} variant="hero" size="lg" className="w-full">
                  {t('calc.calculate')}
                </Button>
              </div>

              {result && (
                <div className="mt-8 pt-6 border-t border-border grid grid-cols-2 gap-4">
                  <div className="bg-success/10 rounded-xl p-4 text-center">
                    <TrendingUp className="w-8 h-8 text-success mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">{t('calc.savings')}</p>
                    <p className="text-2xl font-display text-success">₹{result.savings.toLocaleString('en-IN')}</p>
                  </div>
                  <div className="bg-primary/10 rounded-xl p-4 text-center">
                    <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">{t('calc.timeSaved')}</p>
                    <p className="text-2xl font-display text-primary">{result.timeSaved} {t('calc.days')}</p>
                  </div>
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

export default ROICalculator;
