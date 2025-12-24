import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "919876543210";
const WHATSAPP_MESSAGE = "Hello! I'm interested in renting farm implements from AgriSaathi.";

const WhatsAppButton = () => {
  const handleClick = () => {
    const encodedMessage = encodeURIComponent(WHATSAPP_MESSAGE);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center group"
      aria-label="Chat on WhatsApp"
    >
      {/* Pulse ring animation */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse-ring" />
      
      <MessageCircle className="w-7 h-7 md:w-8 md:h-8 relative z-10" fill="currentColor" />
      
      {/* Tooltip */}
      <span className="absolute right-full mr-3 px-3 py-1.5 bg-foreground text-background text-sm font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Chat with us
      </span>
    </button>
  );
};

export default WhatsAppButton;
