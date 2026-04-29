import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  isMajor?: boolean;
}

const timelineData: TimelineEvent[] = [
  { year: "1860", title: "Psicofísica", description: "Fechner publica 'Elementos de Psicofísica'." },
  { year: "1879", title: "Psicologia Experimental", description: "Wundt funda o primeiro laboratório em Leipzig.", isMajor: true },
  { year: "1883", title: "Laboratório EUA", description: "G. Stanley Hall funda o lab na Johns Hopkins." },
  { year: "1890", title: "William James", description: "Publicação de 'Princípios de Psicologia'." },
  { year: "1892", title: "Estruturalismo", description: "Titchener leva o estruturalismo para Cornell.", isMajor: true },
  { year: "1896", title: "Clínica", description: "Witmer abre a primeira clínica psicológica." },
  { year: "1900", title: "Psicanálise", description: "Freud publica 'A Interpretação dos Sonhos'." },
  { year: "1913", title: "Behaviorismo", description: "Watson lança o manifesto behaviorista." },
  { year: "1938", title: "B.F. Skinner", description: "Publicação de 'O Comportamento dos Organismos'." },
  { year: "1950", title: "Ciclo Vital", description: "Erikson publica 'Infância e Sociedade'." },
];

export const HeroTimeline: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: scrollRef });
  const scaleX = useSpring(scrollXProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div className="w-full max-w-5xl mt-12 px-4">
      <div className="flex items-center gap-4 mb-4">
        <span className="font-label text-[10px] uppercase tracking-widest text-primary/40 font-bold">Cronologia da Mente</span>
        <div className="h-px flex-1 bg-primary/10"></div>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto pb-8 pt-4 gap-6 snap-x snap-mandatory cursor-grab active:cursor-grabbing hide-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style>{`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
        `}</style>
        {timelineData.map((event, idx) => (
          <motion.div
            key={event.year}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="flex-shrink-0 w-64 snap-start"
          >
            <div className={`relative p-5 rounded-2xl border transition-all duration-300 group ${event.isMajor ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-white border-primary/5 hover:border-primary/20 shadow-sm'}`}>
              <div className="flex items-center justify-between mb-3">
                <span className={`font-label text-[10px] font-bold px-2 py-0.5 rounded-md ${event.isMajor ? 'bg-white/20 text-white' : 'bg-primary/5 text-primary'}`}>
                  {event.year}
                </span>
                {event.isMajor && (
                  <span className="material-symbols-outlined text-[14px] text-secondary">star</span>
                )}
              </div>
              
              <h4 className={`font-headline text-lg mb-2 leading-tight ${event.isMajor ? 'text-white' : 'text-primary'}`}>
                {event.title}
              </h4>
              
              <p className={`font-body text-xs leading-relaxed ${event.isMajor ? 'text-white/70' : 'text-secondary'}`}>
                {event.description}
              </p>
              
              {/* Dot decoration */}
              <div className={`absolute -bottom-6 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full ${event.isMajor ? 'bg-primary scale-125' : 'bg-primary/20 group-hover:bg-primary/40'}`}></div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Progress Bar */}
      <div className="h-0.5 w-full bg-primary/5 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-primary origin-left"
          style={{ scaleX }}
        />
      </div>
    </div>
  );
};
