import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Analytics } from "@vercel/analytics/react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring' as const, stiffness: 100 }
  }
};

function App() {
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = "Confira este site sobre Estruturalismo na Psicologia!";
    
    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text + " " + url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'instagram':
        navigator.clipboard.writeText(url).then(() => {
          setCopyFeedback(true);
          setTimeout(() => setCopyFeedback(false), 2000);
        });
        break;
    }
  };


  return (
    <div className="min-h-screen selection:bg-primary-container selection:text-on-primary-container overflow-x-hidden bg-background">
      {/* TopNavBar */}
      <nav className="bg-[#021124] fixed top-0 w-full z-50 shadow-md">
        <div className="flex justify-between items-center w-full px-6 md:px-12 py-4 max-w-[1920px] mx-auto">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="font-headline text-2xl tracking-widest text-white cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            ESTRUTURAL<span className="text-secondary font-light">MENTE</span>
          </motion.div>
          <ul className="hidden md:flex items-center gap-8 font-headline text-lg tracking-tight text-white/80">
            {[
              { name: 'Módulos', id: 'modulos' },
              { name: 'Arquivo', id: 'arquivo' },
              { name: 'Laboratório', id: 'laboratorio' },
              { name: 'Sobre', id: 'sobre' }
            ].map((link, idx) => (
              <motion.li 
                key={link.name}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * idx }}
              >
                <button 
                  onClick={() => scrollToSection(link.id)}
                  className="hover:text-white transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
                </button>
              </motion.li>
            ))}
          </ul>
          <div className="flex items-center gap-4">
            <motion.button 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block bg-background text-[#021124] font-label uppercase tracking-widest text-xs px-6 py-3 rounded-full hover:shadow-lg transition-all font-bold"
            >
              Acesso Analítico
            </motion.button>
            <button 
              className="md:hidden text-white p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="material-symbols-outlined text-3xl">
                {isMobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-[#021124] border-t border-white/10 overflow-hidden"
            >
              <ul className="flex flex-col p-6 gap-6 font-headline text-2xl text-white">
                {[
                  { name: 'Módulos', id: 'modulos' },
                  { name: 'Arquivo', id: 'arquivo' },
                  { name: 'Laboratório', id: 'laboratorio' },
                  { name: 'Sobre', id: 'sobre' }
                ].map((link) => (
                  <li key={link.id}>
                    <button 
                      onClick={() => scrollToSection(link.id)}
                      className="w-full text-left active:text-secondary"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="max-w-[1920px] mx-auto">
        {/* 1. HERO SECTION */}
        {/* 1. HERO SECTION */}
        <section id="home" className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-12 pt-32 pb-20 overflow-hidden bg-background">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="z-10 w-full flex flex-col items-center mt-12 md:mt-0"
          >
            <motion.p variants={itemVariants} className="font-headline text-secondary uppercase tracking-[0.2em] text-sm md:text-xl mb-16 font-semibold">
              Módulo Introdutório — Estruturalismo
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col items-center scale-75 md:scale-100">
              <div className="flex items-center shadow-xl rounded-full overflow-hidden mb-4">
                <div className="bg-primary text-white px-10 md:px-16 py-6 md:py-8 font-headline text-6xl md:text-8xl lg:text-[7rem] rounded-full z-10 leading-none pb-12">
                  De
                </div>
                <div className="bg-white text-primary px-10 md:px-16 py-6 md:py-8 font-headline text-6xl md:text-8xl lg:text-[7rem] rounded-r-full -ml-16 pl-14 z-0 leading-none pb-12">
                  compor.
                </div>
              </div>
              
              <div className="flex flex-col items-center mt-2">
                <h1 className="font-headline text-6xl md:text-8xl lg:text-[7rem] text-primary leading-none">
                  Compreender.
                </h1>
                <div className="w-[105%] h-[4px] md:h-2 bg-primary mt-6"></div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-24 max-w-2xl flex relative z-10 w-full">
              <div className="bg-primary w-12 rounded-l-3xl shadow-lg shrink-0"></div>
              <div className="bg-white rounded-r-3xl rounded-l-2xl -ml-6 py-8 px-10 shadow-xl flex items-center gap-6 z-10 w-full">
                <div className="w-2 h-2 rounded-full bg-primary shrink-0"></div>
                <p className="font-headline text-base md:text-lg text-primary text-left leading-relaxed font-medium">
                  A mente não é um mistério indivisível. É uma estrutura de sensações, imagens e sentimentos que podem ser isolados e estudados.
                </p>
              </div>
            </motion.div>
          </motion.div>

          <div className="mt-20 w-full flex justify-center z-10 relative">
              <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-5xl">
                {['Introspecção', 'Estrutura', 'Consciência', 'Sensação', 'Imagem', 'Estruturalismo', 'Psicologia'].map(tag => (
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    key={tag} 
                    className="bg-[#021124] text-white px-8 md:px-12 py-3 md:py-4 rounded-full text-xs md:text-sm font-label uppercase tracking-widest text-center shadow-[0_5px_20px_-5px_rgba(0,0,0,0.3)] cursor-default transition-all"
                  >
                    {tag}
                  </motion.div>
                ))}
              </div>
          </div>

          <div className="absolute inset-0 pointer-events-none overflow-hidden font-headline text-xl md:text-3xl text-secondary uppercase tracking-[0.1em] opacity-60">
            <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute top-[25%] left-[5%] md:left-[15%]">Sensação</motion.div>
            <motion.div animate={{ y: [0, 15, 0] }} transition={{ duration: 5.5, repeat: Infinity }} className="absolute top-[30%] right-[5%] md:right-[15%]">Sentimento</motion.div>
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 7, repeat: Infinity }} className="absolute bottom-[25%] left-[10%] md:left-[20%]">Consciência</motion.div>
            <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 6.5, repeat: Infinity }} className="absolute bottom-[20%] right-[5%] md:right-[18%]">Introspecção</motion.div>
            <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 6.5, repeat: Infinity }} className="absolute bottom-[20%] left-[30%] md:left-[15%]">Sistema</motion.div>
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 6.5, repeat: Infinity }} className="absolute top-[55%] right-[10%] md:right-[18%]">Estruturalismo</motion.div>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 6.5, repeat: Infinity }} className="absolute bottom-[10%] right-[50%] md:right-[18%]">Psicologia</motion.div>
            <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 6.5, repeat: Infinity }} className="absolute top-[35%] left-[10%] md:left-[8%]">Elementarismo</motion.div>
          </div>
        </section>

        {/* 2. HISTORICAL TIMELINE - Detailed Archive (Arquivos de Leipzig) */}
        {/* 2. HISTORICAL TIMELINE - Detailed Archive (Arquivos de Leipzig) */}
        <section id="arquivo" className="bg-background px-6 md:px-12 py-32 relative">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-32 text-center"
          >
             <h2 className="font-headline text-5xl text-primary mb-4 tracking-tight">Os Arquivos de Leipzig</h2>
             <p className="font-label text-secondary uppercase tracking-widest text-sm">A Origem e a Expansão do Estruturalismo</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 relative px-6 md:px-16 max-w-[1400px] mx-auto">
            {/* Legend 1: Wundt */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center group"
            >
              <div className="relative mb-12 w-full max-w-[340px] aspect-[4/5] z-10 drop-shadow-[0_20px_40px_rgba(4,30,58,0.3)]">
                <div className="absolute inset-[-40px] md:inset-[-60px] z-20 pointer-events-none overflow-hidden scale-[1.15]">
                    <img src="/moldura-nova.png" className="w-full h-full object-contain" alt="frame" />
                </div>
                <div className="relative w-full h-full p-2 bg-white shadow-inner overflow-hidden">
                    <img 
                      src="/Wilhelm-Wundt.jpg" 
                      className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 transition-all duration-1000" 
                      alt="Wilhelm Wundt" 
                    />
                </div>
              </div>
              
              <div className="bg-surface p-10 rounded-[3rem] shadow-2xl border-t-8 border-primary w-full relative -mt-10 pt-12 z-20 hover:-translate-y-2 transition-transform duration-500">
                <div className="flex gap-4 items-start mb-8">
                   <div className="w-2 h-2 mt-2.5 rounded-full bg-primary shrink-0"></div>
                   <p className="font-headline text-lg text-[#033574] text-justify leading-relaxed">
                     <span className="font-bold font-label uppercase tracking-widest text-sm block mb-2 text-[#033574]">Wilhelm Wundt</span>
                     Conhecido como o "Pai da Psicologia Experimental", fundou o primeiro laboratório em Leipzig (1879). Defendia que a psicologia deveria investigar a consciência imediata por meio de métodos experimentais rigorosos, incluindo a introspecção controlada.
                   </p>
                </div>
                <div className="bg-[#e2e2e2] rounded-full py-4 px-6 flex items-center gap-4">
                  <div className="w-4 h-4 rounded-full bg-secondary shrink-0 opacity-80"></div>
                  <p className="font-body text-xs text-primary italic leading-relaxed">
                    Para Wilhelm Wundt, o método experimental de laboratório constitui um instrumento central para o estudo científico da experiência imediata, ao possibilitar controle, repetição e maior precisão na observação dos fenômenos psíquicos.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Legend 2: Titchener */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center lg:mt-32 group"
            >
              <div className="relative mb-12 w-full max-w-[340px] aspect-[4/5] z-10 drop-shadow-[0_20px_40px_rgba(4,30,58,0.3)]">
                <div className="absolute inset-[-40px] md:inset-[-60px] z-20 pointer-events-none overflow-hidden scale-[1.15]">
                    <img src="/moldura-nova.png" className="w-full h-full object-contain" alt="frame" />
                </div>
                <div className="relative w-full h-full p-2 bg-white shadow-inner overflow-hidden">
                    <img 
                      src="/Edward_Bradford_Titchener.jpg" 
                      className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 transition-all duration-1000" 
                      alt="Edward Titchener" 
                    />
                </div>
              </div>
              
              <div className="bg-surface p-10 rounded-[3rem] shadow-2xl border-t-8 border-primary w-full relative -mt-10 pt-12 z-20 hover:-translate-y-2 transition-transform duration-500">
                <div className="flex gap-4 items-start mb-8">
                   <div className="w-2 h-2 mt-2.5 rounded-full bg-primary shrink-0"></div>
                   <p className="font-headline text-lg text-[#033574] text-justify leading-relaxed">
                     <span className="font-bold font-label uppercase tracking-widest text-sm block mb-2 text-[#033574]">Edward Titchener</span>
                     Discípulo de Wundt, principal responsável por divulgar e sistematizar o Estruturalismo nos EUA. Desenvolveu uma forma rigorosa de introspecção experimental para decompor a consciência em elementos fundamentais.
                   </p>
                </div>
                <div className="bg-[#e2e2e2] rounded-full py-4 px-6 flex items-center gap-4">
                  <div className="w-4 h-4 rounded-full bg-secondary shrink-0 opacity-80"></div>
                  <p className="font-body text-xs text-primary italic leading-relaxed">
                    Em síntese, para Edward Bradford Titchener, a psicologia consiste na análise da experiência consciente, concebida como a soma dos conteúdos mentais que podem ser decompostos em elementos básicos.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 3. INTROSPECTION LAB */}
        <section id="laboratorio" className="bg-primary text-white px-6 md:px-12 py-32 rounded-[3.5rem] mx-6 my-20 shadow-2xl shadow-primary/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 to-transparent opacity-50"></div>
          
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-20 gap-8">
              <div className="text-center md:text-left">
                <h2 className="font-headline text-6xl tracking-tighter mb-4">Laboratório<br/>Introspectivo</h2>
                <div className="inline-block px-4 py-1 bg-white/20 rounded-full font-label text-xs uppercase tracking-widest backdrop-blur-sm">Simulação V.1.0 | Exercicio do Método Introspectivo</div>
              </div>
              <p className="md:max-w-md font-body text-lg text-white/80 border-l-2 border-white/30 pl-8">
                Instrução: Evite o "Erro de Estímulo". Descreva apenas as experiências elementares, não o objeto.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="lg:col-span-5 bg-white p-12 rounded-[2.5rem] flex flex-col items-center justify-center shadow-xl text-primary"
              >
                <span className="font-label text-[10px] uppercase tracking-[0.3em] text-secondary mb-10 w-full text-left font-black">Estímulo Físico #01</span>
                <motion.img 
                  animate={{ 
                    filter: ["contrast(1)", "contrast(1.2)", "contrast(1)"],
                    rotate: [0, 2, 0, -2, 0]
                  }}
                  transition={{ duration: 10, repeat: Infinity }}
                  alt="Pedaço de Laranja" 
                  className="w-72 h-72 object-cover mb-10 drop-shadow-2xl rounded-2xl" 
                  src="/Laranja doce molhada.jpg"
                />
                <p className="font-headline text-3xl font-bold tracking-tight">Pedaço de Laranja</p>
              </motion.div>

              <div className="lg:col-span-7">
                <form className="space-y-8">
                  {[
                    { label: 'Sensações Elementares', placeholder: 'Cores, texturas, temperaturas...' },
                    { label: 'Imagens Mentais', placeholder: 'Memórias visuais evocadas...' },
                    { label: 'Afetos (Sentimentos)', placeholder: 'Dimensões de prazer ou tensão...' }
                  ].map((field, idx) => (
                    <motion.div 
                      key={field.label}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="group"
                    >
                      <label className="font-label text-xs uppercase tracking-widest text-white/60 block mb-4 font-bold">{field.label}</label>
                      <input 
                        className="w-full bg-white/5 border-2 border-white/10 rounded-2xl focus:border-white focus:bg-white/10 focus:ring-0 px-8 py-5 font-body text-white transition-all placeholder:text-white/20 outline-none" 
                        placeholder={field.placeholder} 
                        type="text"
                      />
                    </motion.div>
                  ))}
                  <motion.button 
                    whileHover={{ scale: 1.02, backgroundColor: '#fff', color: '#041E3A' }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-white text-primary font-label uppercase tracking-[0.2em] text-sm font-black px-12 py-6 rounded-2xl transition-all shadow-lg"
                    type="button"
                  >
                    Registrar Análise Estrutural
                  </motion.button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* 4. DECOMPOSITION GRID */}
        <section id="modulos" className="bg-background px-6 md:px-12 py-32">
          <div className="max-w-4xl mx-auto text-center mb-24">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="font-headline text-5xl text-primary mb-8 tracking-tighter"
            >
              A Tabela Periódica da Consciência
            </motion.h2>
            <p className="font-body text-xl text-on-surface-variant leading-relaxed">
              Titchener mapeou mais de <strong className="text-secondary">44.000 qualidades elementares</strong>. Uma grade meticulosa onde a psicologia encontrou sua forma atômica.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 auto-rows-[250px]">
            <motion.div 
              whileHover={{ y: -10 }}
              className="md:col-span-2 md:row-span-2 bg-primary/5 border border-primary/10 rounded-[2.5rem] p-10 flex flex-col justify-between"
            >
              <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center">
                <span className="material-symbols-outlined text-4xl">sensors</span>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4 text-primary">
                  <span className="material-symbols-outlined">visibility</span>
                  <span className="material-symbols-outlined">hearing</span>
                </div>
                <h3 className="font-label uppercase tracking-widest text-lg text-primary mb-4 font-black">Sensações</h3>
                <p className="font-body text-on-surface-variant">A matéria-prima do exterior. Cor, som, odor, paladar e pressão cutânea que formam os dados brutos da mente.</p>
              </div>
            </motion.div>

            <motion.div 
              animate={{ rotate: [0, 1, 0, -1, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-primary to-secondary rounded-[3rem] p-12 flex flex-col items-center justify-center text-center text-white shadow-2xl shadow-primary/20"
            >
              <span className="material-symbols-outlined text-8xl mb-10 opacity-40" style={{ fontVariationSettings: "'wght' 100" }}>psychology</span>
              <h3 className="font-headline text-5xl mb-6">44.435</h3>
              <p className="font-label text-xs uppercase tracking-[0.3em] font-bold opacity-80">Elementos da Consciência</p>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="md:col-span-2 bg-secondary/5 border border-secondary/10 rounded-[2.5rem] p-8 flex flex-col justify-center"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-secondary/20 text-secondary rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl">collections</span>
                </div>
                <h3 className="font-label uppercase tracking-widest text-xs text-secondary font-black">Imagens Mentais</h3>
              </div>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">O eco das sensações passadas. A base das nossas ideias e memórias complexas reproduzidas internamente.</p>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="md:col-span-2 bg-primary-container/10 rounded-[2.5rem] p-8 flex border border-primary-container/20 flex-col justify-center"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-primary-container/20 text-primary-container rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl">favorite</span>
                </div>
                <h3 className="font-label uppercase tracking-widest text-xs text-primary-container font-black">Afetos</h3>
              </div>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">A moldura emocional. Prazes e desprazes que tingem a experiência imediata com nuances de sentimento.</p>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Share Toast */}
      <AnimatePresence>
        {copyFeedback && (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] bg-primary text-white px-6 py-2 rounded-full font-label text-[10px] uppercase tracking-widest shadow-2xl"
          >
            Link Copiado para o Instagram!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer id="sobre" className="bg-primary text-white py-20 px-6 md:px-12 mt-20">
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-4xl font-bold tracking-tighter mb-8 font-headline">ESTRUTURAL <span className="opacity-40">MENTE</span></div>
            <p className="font-body opacity-60 max-w-sm mb-12">
              Arquivando a estrutura da consciência desde 1879. Um projeto acadêmico de decomposição analítica feito para a Universidade de Pernambuco campus Garanhuns.
            </p>
            <div className="flex gap-4">
              {[
                { name: 'whatsapp', icon: 'chat' },
                { name: 'twitter', icon: 'share' },
                { name: 'instagram', icon: 'content_copy' }
              ].map(social => (
                <div 
                  key={social.name} 
                  onClick={() => handleShare(social.name)}
                  title={`Compartilhar no ${social.name}`}
                  className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-primary transition-all cursor-pointer group relative"
                >
                  <span className="material-symbols-outlined text-lg">{social.icon}</span>
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-primary text-[8px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {social.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-label uppercase tracking-widest text-xs font-black mb-8 text-white/40">Recursos</h4>
              <ul className="space-y-4 font-body text-sm">
                <li><button onClick={() => scrollToSection('home')} className="hover:text-secondary-fixed transition-colors">Início</button></li>
                <li><button onClick={() => scrollToSection('modulos')} className="hover:text-secondary-fixed transition-colors">Tabela Mental</button></li>
                <li><button onClick={() => scrollToSection('laboratorio')} className="hover:text-secondary-fixed transition-colors">Laboratório</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-label uppercase tracking-widest text-xs font-black mb-8 text-white/40">Arquivo</h4>
              <ul className="space-y-4 font-body text-sm">
                <li><a href="https://www.amazon.com.br/Psicologia-Ci%C3%AAncia-Tecnologia-Edward-Titchener/dp/6589092273/ref=sr_1_1?s=books&sr=1-1" className="hover:text-secondary-fixed transition-colors">Pensamento de Titchener</a></li>
                <li><a className="hover:text-secondary-fixed transition-colors" href="https://pepsic.bvsalud.org/pdf/jp/v53n98/v53n98a25.pdf">Estruturalismo em Lacan</a></li>
                <li><a className="hover:text-secondary-fixed transition-colors" href="https://site.cfp.org.br/wp-content/uploads/2012/07/codigo-de-etica-psicologia-1.pdf">Código de Ética</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-[1920px] mx-auto mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between gap-8 font-mono text-[10px] uppercase tracking-widest opacity-40">
           <span>© 2026 - Todos os direitos reservados.</span>
           <div className="flex gap-8">
             <a href="#">Privacidade</a>
             <a href="#">Termos de Uso</a>
           </div>
        </div>
      </footer>
      <Analytics />
    </div>
  );
}

export default App;
