import { Facebook, Instagram, Phone } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background/80 py-12 md:py-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <span className="text-secondary-foreground font-serif text-xl">F</span>
              </div>
              <span className="font-serif text-xl text-background">FarmGear</span>
            </div>
            <p className="text-background/60 mb-4 max-w-sm">
              Quality agricultural equipment rentals for regional farmers. 
              Reliable gear, fair prices, and local service you can trust.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg text-background mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#equipment" className="hover:text-background transition-colors">
                  Equipment
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-background transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-background transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg text-background mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-secondary" />
                <a href="tel:1800326743" className="hover:text-background transition-colors">
                  1800 FARMGEAR
                </a>
              </li>
              <li className="text-background/60">
                Regional Victoria & NSW
              </li>
              <li className="text-background/60">
                Mon-Fri: 7am-6pm<br />
                Sat: 8am-12pm
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-background/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-background/50">
          <p>© {currentYear} FarmGear. All rights reserved.</p>
          <p>Australian owned and operated</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
