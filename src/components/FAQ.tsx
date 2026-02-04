import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: 'Vad är skillnaden mellan amningsrum och skötrum?',
    answer: 'Ett amningsrum är ett avskilt utrymme där föräldrar kan amma sitt barn i lugn och ro. Ett skötrum (även kallat skötbord) är ett utrymme med skötbord för att byta blöja. Många platser har båda funktionerna i samma rum.'
  },
  {
    question: 'Hur hittar jag närmaste amningsrum?',
    answer: 'Använd sökfältet för att söka på din stad eller adress, eller klicka på "Nära mig" för att använda din nuvarande position. Kartan visar alla tillgängliga platser i närheten.'
  },
  {
    question: 'Är alla platser gratis att använda?',
    answer: 'De flesta amningsrum och skötrum i offentliga miljöer som köpcentrum, bibliotek och vårdcentraler är gratis att använda. Vissa platser kan kräva att du är kund eller besökare.'
  },
  {
    question: 'Hur ofta uppdateras informationen?',
    answer: 'Vi hämtar data från OpenStreetMap som uppdateras kontinuerligt av frivilliga. Om du hittar felaktig information kan du rapportera det via "Rapportera fel"-knappen på platssidan.'
  },
  {
    question: 'Kan jag lägga till en ny plats?',
    answer: 'Ja! Om du känner till ett amningsrum eller skötrum som saknas kan du lägga till det direkt i OpenStreetMap. Vi hämtar sedan informationen automatiskt.'
  },
  {
    question: 'Vad betyder tillgänglighetsikonen?',
    answer: 'Platser markerade med tillgänglighetsikonen (♿) är anpassade för rullstolsburna och har tillgängliga ingångar, tillräckligt utrymme och eventuellt särskilda faciliteter.'
  },
];

interface FAQItemComponentProps {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

function FAQItemComponent({ item, isOpen, onToggle, index }: FAQItemComponentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="faq-item"
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between p-5 text-left hover:bg-muted/50 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="font-display font-semibold text-foreground pr-4">
          {item.question}
        </span>
        <ChevronDown 
          className={`h-5 w-5 text-muted-foreground transition-transform duration-300 flex-shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-muted-foreground leading-relaxed">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 md:py-24" aria-labelledby="faq-heading">
      <div className="container">
        <div className="text-center mb-12">
          <h2 id="faq-heading" className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Vanliga frågor
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Här hittar du svar på de vanligaste frågorna om amningsrum och skötrum.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-3">
          {faqItems.map((item, index) => (
            <FAQItemComponent
              key={index}
              item={item}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
