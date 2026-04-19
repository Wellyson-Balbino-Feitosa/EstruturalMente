import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 }
  }
};

function App() {
  const [copyFeedback, setCopyFeedback] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
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

  const timelinePoints = [
    { year: '1860', label: 'G. Fechner', desc: 'Psicofísica', secondary: true },
    { 
      year: '1879', 
      label: 'Wilhelm Wundt', 
      desc: '1º Lab Experimental em Leipzig', 
      highlight: true,
      image: '/Wilhelm-Wundt.jpg'
    },
    { year: '1890', label: 'W. James', desc: 'Funcionalismo', secondary: true },
    { 
      year: '1892', 
      label: 'Edward Titchener', 
      desc: 'Estruturalismo nos EUA', 
      highlight: true,
      image: '/Edward_Bradford_Titchener.jpg'
    },
    { year: '1900', label: 'S. Freud', desc: 'Psicanálise', secondary: true },
    { year: '1913', label: 'J. Watson', desc: 'Behaviorismo', secondary: true },
    { year: '1950', label: 'Rev. Cognitiva', desc: 'Novos rumos', secondary: true },
  ];

  return (
    <div className="min-h-screen selection:bg-primary-container selection:text-on-primary-container overflow-x-hidden bg-[#fafafa]">
      {/* TopNavBar */}
      <nav className="bg-white/80 dark:bg-black/80 backdrop-blur-md fixed top-0 w-full z-50 border-b border-outline-variant/20">
        <div className="flex justify-between items-center w-full px-6 md:px-12 py-4 max-w-[1920px] mx-auto">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="font-mono text-xl font-bold tracking-widest text-primary dark:text-white font-label cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            ESTRUTURAL<span className="text-secondary font-light">MENTE</span>
          </motion.div>
          <ul className="hidden md:flex items-center gap-8 font-headline text-lg tracking-tight">
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
                  className="text-on-surface hover:text-primary transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                </button>
              </motion.li>
            ))}
          </ul>
          <motion.button 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:block bg-primary text-on-primary font-label uppercase tracking-widest text-xs px-6 py-3 rounded-full hover:shadow-lg hover:shadow-primary/20 transition-all font-bold"
          >
            Acesso Analítico
          </motion.button>
        </div>
      </nav>

      <main className="max-w-[1920px] mx-auto">
        {/* 1. HERO SECTION */}
        <section id="home" className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-12 pb-20 overflow-hidden">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] animate-pulse delay-700"></div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="z-10 w-full"
          >
            <div className="text-center mb-16">
              <motion.p variants={itemVariants} className="font-label text-primary uppercase tracking-[0.5em] text-sm mt-12 inline-block">
                Módulo Introdutório — Estruturalismo
              </motion.p>
              <motion.h1 
                variants={itemVariants}
                className="font-headline text-7xl md:text-9xl lg:text-[10rem] text-primary leading-[0.85] tracking-tighter mb-4 drop-shadow-sm"
              >
                Decompor.<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-container to-secondary mr-6">Compreender.</span>
              </motion.h1>
              
              <motion.div variants={itemVariants} className="mt-8 max-w-2xl mx-auto">
                <p className="font-body text-xl text-on-surface-variant leading-relaxed p-6 border-l-4 border-primary bg-white/50 backdrop-blur-xl rounded-r-2xl shadow-xl shadow-primary/5">
                  A mente não é um mistério indivisível. É uma estrutura de sensações, imagens e sentimentos que podem ser isolados e estudados.
                </p>
              </motion.div>
            </div>
            
            {/* TIMELINE SECTION WITH IMAGES ABOVE POINTS */}
            <div className="w-full px-4 md:px-20 mt-12 overflow-x-auto pb-10 scrollbar-hide">
              <div className="min-w-[1200px] relative pt-48 pb-10">
                <div className="absolute top-[236px] left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-outline-variant/30 to-transparent"></div>
                <div className="flex justify-between items-start px-20 relative">
                  {timelinePoints.map((point, i) => (
                    <motion.div 
                      key={i} 
                      className={`relative flex flex-col items-center group ${point.highlight ? 'cursor-pointer' : ''}`}
                      onClick={() => point.highlight && scrollToSection('arquivo')}
                      whileHover={point.highlight ? { y: -5 } : {}}
                    >
                      {/* Floating Image Above Point */}
                      {point.image && (
                        <motion.div 
                          className="absolute -top-40 w-28 h-36 p-1 bg-white shadow-2xl border border-outline-variant/30 overflow-hidden"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                        >
                          <img src={point.image} className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 transition-all duration-500" alt={point.label} />
                        </motion.div>
                      )}

                      <div className={`w-4 h-4 rounded-full mb-4 z-10 transition-all duration-500 shadow-sm border-2 ${
                        point.highlight 
                        ? 'bg-primary border-white ring-4 ring-primary/20 scale-125' 
                        : 'bg-white border-outline-variant scale-100'
                      }`}></div>
                      
                      <span className={`text-[12px] font-bold font-label mb-1 transition-colors ${point.highlight ? 'text-primary' : 'text-secondary/50 group-hover:text-secondary'}`}>
                        {point.year}
                      </span>
                      
                      <div className={`text-center max-w-[150px] transition-all ${point.highlight ? 'opacity-100' : 'opacity-40 group-hover:opacity-100'}`}>
                        <p className={`text-[10px] font-black uppercase tracking-tighter leading-tight ${point.highlight ? 'text-primary' : 'text-on-surface'}`}>
                          {point.label}
                        </p>
                        <p className="text-[9px] font-body text-on-surface-variant leading-tight mt-1 px-2">
                          {point.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-12 flex justify-center">
                <div className="flex flex-wrap justify-center gap-3 max-w-4xl">
                  {['Introspecção', 'Estrutura', 'Consciência', 'Sensaçăo', 'Imagem'].map(tag => (
                    <div key={tag} className="bg-white/80 px-4 py-2 rounded-lg text-[15px] font-label uppercase tracking-widest text-primary text-center border border-primary/10 shadow-sm hover:shadow-md transition-shadow cursor-default">
                      {tag}
                    </div>
                  ))}
                </div>
            </div>
          </motion.div>

          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[
              { text: "Sensação", top: "20%", left: "10%" },
              { text: "Imagem", top: "70%", left: "85%" },
              { text: "Sentimento", top: "15%", left: "80%" },
              { text: "Estrutura", top: "85%", left: "15%" },
              { text: "Introspecção", top: "35%", left: "50%" }
            ].map((node, i) => (
              <motion.div 
                key={i}
                animate={{ y: [0, 15, 0], x: [0, 10, 0] }}
                transition={{ duration: 5 + i, repeat: Infinity }}
                className="absolute font-label text-[15px] uppercase tracking-[0.4em] text-black/60 font-bold opacity-30"
                style={{ top: node.top, left: node.left }}
              >
                {node.text}
              </motion.div>
            ))}
          </div>
        </section>

        {/* 2. HISTORICAL TIMELINE - Detailed Archive (Arquivos de Leipzig) */}
        <section id="arquivo" className="bg-surface-container-low px-6 md:px-12 py-32 relative">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20 text-center"
          >
             <h2 className="font-headline text-5xl text-primary mb-4 tracking-tight">Arquivos de Leipzig</h2>
             <p className="font-label text-secondary uppercase tracking-widest text-sm">A Origem e a Expansão do Estruturalismo</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 relative px-6 md:px-16">
            {/* Legend 1: Wundt */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center group"
            >
              <div className="relative mb-12 w-full max-w-[340px] aspect-[4/5] z-10">
                <div className="absolute inset-[-40px] md:inset-[-60px] z-20 pointer-events-none overflow-hidden scale-110">
                    <img src="/foto de moldura.jpg" className="w-full h-full object-contain mix-blend-multiply opacity-90" alt="frame" />
                </div>
                <div className="relative w-full h-full p-2 bg-white shadow-inner overflow-hidden">
                    <img 
                      src="/Wilhelm-Wundt.jpg" 
                      className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 transition-all duration-1000" 
                      alt="Wilhelm Wundt" 
                    />
                </div>
              </div>
              <div className="bg-white p-12 rounded-[2rem] shadow-xl border border-outline-variant/10 w-full relative -mt-6 pt-16">
                <h3 className="font-label text-3xl uppercase tracking-tighter mb-4 text-primary font-bold text-center">Wilhelm Wundt</h3>
                <div className="w-12 h-1 bg-primary mb-8 mx-auto"></div>
                <p className="font-body text-lg text-on-surface-variant leading-relaxed mb-6">
                  Conhecido como o "Pai da Psicologia Experimental", Wundt fundou o primeiro laboratório em Leipzig (1879). Defendia que a psicologia deveria investigar a consciência imediata por meio de métodos experimentais rigorosos, incluindo a introspecção controlada.
                </p>
                <p className="font-body text-sm text-secondary italic border-l-4 border-secondary/30 pl-4 bg-secondary/5 p-4 rounded-r-lg">
                  Segundo Wundt, o método experimental de laboratório é fundamental para garantir a precisão das observações psicológicas.
                </p>
              </div>
            </motion.div>

            {/* Legend 2: Titchener */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center lg:mt-32 group"
            >
              <div className="relative mb-12 w-full max-w-[340px] aspect-[4/5] z-10">
                <div className="absolute inset-[-40px] md:inset-[-60px] z-20 pointer-events-none overflow-hidden scale-110">
                    <img src="/foto de moldura.jpg" className="w-full h-full object-contain mix-blend-multiply opacity-90" alt="frame" />
                </div>
                <div className="relative w-full h-full p-2 bg-white shadow-inner overflow-hidden">
                    <img 
                      src="/Edward_Bradford_Titchener.jpg" 
                      className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 transition-all duration-1000" 
                      alt="Edward Titchener" 
                    />
                </div>
              </div>
              <div className="bg-white p-12 rounded-[2rem] shadow-xl border border-outline-variant/10 w-full relative -mt-6 pt-16">
                <h3 className="font-label text-3xl uppercase tracking-tighter mb-4 text-secondary font-bold text-center">Edward Titchener</h3>
                <div className="w-12 h-1 bg-secondary mb-8 mx-auto"></div>
                <p className="font-body text-lg text-on-surface-variant leading-relaxed mb-6">
                  Discípulo de Wilhelm Wundt, Edward Bradford Titchener foi o principal responsável por divulgar e sistematizar o Estruturalismo nos Estados Unidos. Desenvolveu uma forma rigorosa de introspecção experimental, buscando decompor a consciência em seus elementos fundamentais.
                </p>
                <p className="font-body text-sm text-secondary italic border-l-4 border-secondary/30 pl-4 bg-secondary/5 p-4 rounded-r-lg">
                  Sintentizando seu pensamento: "A psicologia é a ciência da mente, e a mente é a soma total da experiência humana considerada como dependente da pessoa que a vivencia."
                </p>
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
                    whileHover={{ scale: 1.02, backgroundColor: '#fff', color: '#31516b' }}
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
        <section id="modulos" className="bg-white px-6 md:px-12 py-32">
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
    </div>
  );
}

export default App;
