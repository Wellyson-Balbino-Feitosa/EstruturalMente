import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, Info } from 'lucide-react';

interface IntrospectiveAudioFormProps {
  audioSrc: string;
  className?: string;
}

export const IntrospectiveAudioForm: React.FC<IntrospectiveAudioFormProps> = ({ audioSrc, className = '' }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Form State
  const [intensity, setIntensity] = useState('');
  const [duration, setDuration] = useState('');
  const [texture, setTexture] = useState('');
  const [clarity, setClarity] = useState('');
  const [affectiveTone, setAffectiveTone] = useState('');
  const [freeDescription, setFreeDescription] = useState('');
  const [soundSource, setSoundSource] = useState('');

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const currentProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
    setProgress(currentProgress);
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação de campos vazios
    if (!intensity.trim() || !duration.trim() || !texture.trim() || !clarity.trim() || !affectiveTone.trim() || !freeDescription.trim()) {
      setErrorMessage('Por favor, descreva todos os atributos da sua experiência antes de enviar.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    const formData = {
      intensidade: intensity,
      duracao: duration,
      textura: texture,
      clareza: clarity,
      tom_afetivo: affectiveTone,
      descricao_livre: freeDescription
    };

    try {
      const response = await fetch('https://backend-estruturalmente.vercel.app/api/stimulus-2/responses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Falha ao enviar resposta');
      }

      console.log('Experiência Introspectiva Registrada:', formData);
      setIsSubmitted(true);
      
      // Reset form (Limpeza dos campos após envio bem-sucedido)
      setIntensity('');
      setDuration('');
      setTexture('');
      setClarity('');
      setAffectiveTone('');
      setFreeDescription('');
      setSoundSource('');

      // Hide the message after a few seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error('Erro ao enviar estímulo 2:', error);
      setErrorMessage('Ocorreu um erro ao enviar seu relato. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const fields = [
    { id: 'intensity', label: 'Intensidade', placeholder: 'Ex: Variações de volume, força do som...', value: intensity, setter: setIntensity, rows: 2 },
    { id: 'duration', label: 'Duração', placeholder: 'Ex: Percepção temporal, fluidez, pausas...', value: duration, setter: setDuration, rows: 2 },
    { id: 'texture', label: 'Textura', placeholder: 'Ex: Áspero, suave, contínuo, aveludado...', value: texture, setter: setTexture, rows: 2 },
    { id: 'clarity', label: 'Clareza', placeholder: 'Ex: Percepção nítida ou difusa, foco...', value: clarity, setter: setClarity, rows: 2 },
    { id: 'affectiveTone', label: 'Tom Afetivo', placeholder: 'Ex: Agradável, tensão, melancolia...', value: affectiveTone, setter: setAffectiveTone, rows: 2 },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`bg-white text-[#041E3A] p-6 md:p-10 rounded-[2.5rem] shadow-2xl ${className}`}
    >
      {/* Audio Player Header */}
      <div className="bg-[#041E3A]/5 border border-[#041E3A]/10 rounded-3xl p-6 md:p-8 mb-10 flex flex-col items-center shadow-inner relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#041E3A]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#38bdf8]/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>
        
        <Volume2 className="text-[#041E3A]/40 w-10 h-10 mb-4" />
        <h3 className="font-headline text-2xl font-bold tracking-tight mb-2 text-[#041E3A]">Estímulo Auditivo</h3>
        <p className="font-body text-sm text-[#041E3A]/60 text-center max-w-md mb-8">
          Concentre-se exclusivamente nos elementos puros da sua experiência auditiva.
        </p>

        <div className="flex items-center gap-6 w-full max-w-md z-10">
          <button 
            onClick={togglePlayPause}
            className="w-16 h-16 shrink-0 bg-[#041E3A] text-white rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg"
          >
            {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
          </button>
          
          <div className="flex-1">
            <div className="h-2 w-full bg-[#041E3A]/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-[#041E3A]" 
                style={{ width: `${progress}%` }}
                layout
              />
            </div>
            <div className="flex justify-between mt-2">
              <span className="font-label text-[10px] uppercase tracking-widest text-[#041E3A]/40 font-bold">Progresso</span>
              <span className="font-label text-[10px] uppercase tracking-widest text-[#041E3A]/40 font-bold">
                {Math.round(progress)}%
              </span>
            </div>
          </div>
        </div>

        <audio 
          ref={audioRef} 
          src={audioSrc} 
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleAudioEnded}
          preload="metadata"
        />
      </div>

      {/* Instructions */}
      <div className="flex gap-4 items-start mb-10 bg-yellow-50 p-6 rounded-2xl border border-yellow-200/60">
        <Info className="text-yellow-600 shrink-0 mt-1" />
        <div>
          <h4 className="font-label uppercase tracking-widest text-xs font-black text-yellow-800 mb-2">Instrução Essencial</h4>
          <p className="font-body text-sm text-yellow-700/80 leading-relaxed">
            Descreva sua experiência sensorial imediata. Evite identificar o objeto ou gênero musical (<strong>Erro de Estímulo</strong>). Focamos apenas nas <em>sensações</em>, <em>texturas</em> e <em>sentimentos</em> evocados.
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fields.map((field) => (
            <div key={field.id} className="flex flex-col group">
              <label htmlFor={field.id} className="font-label text-xs uppercase tracking-widest text-[#041E3A]/60 block mb-2 font-bold ml-2">
                {field.label}
              </label>
              <textarea
                id={field.id}
                rows={field.rows}
                placeholder={field.placeholder}
                value={field.value}
                onChange={(e) => field.setter(e.target.value)}
                className="w-full bg-[#041E3A]/5 border-2 border-[#041E3A]/10 rounded-2xl focus:border-[#041E3A]/40 focus:bg-white focus:ring-0 px-6 py-4 font-body text-[#041E3A] transition-all placeholder:text-[#041E3A]/30 outline-none resize-none"
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col group mt-8">
          <label htmlFor="freeDescription" className="font-label text-xs uppercase tracking-widest text-[#041E3A]/60 block mb-2 font-bold ml-2">
            Descrição Livre da Experiência
          </label>
          <textarea
            id="freeDescription"
            rows={4}
            placeholder="Descreva livremente o fluxo da sua consciência durante a audição..."
            value={freeDescription}
            onChange={(e) => setFreeDescription(e.target.value)}
            className="w-full bg-[#041E3A]/5 border-2 border-[#041E3A]/10 rounded-2xl focus:border-[#041E3A]/40 focus:bg-white focus:ring-0 px-6 py-4 font-body text-[#041E3A] transition-all placeholder:text-[#041E3A]/30 outline-none resize-none"
          />
        </div>

        <div className="flex flex-col group pt-4 border-t border-[#041E3A]/10 mt-6">
          <label htmlFor="soundSource" className="font-label text-xs uppercase tracking-widest text-[#041E3A]/60 block mb-2 font-bold ml-2">
            Identificou a Fonte? (Opcional)
          </label>
          <textarea
            id="soundSource"
            rows={2}
            placeholder="Se você acha que sabe qual é a fonte do som (instrumento, etc.), descreva aqui."
            value={soundSource}
            onChange={(e) => setSoundSource(e.target.value)}
            className="w-full bg-[#041E3A]/5 border-2 border-[#041E3A]/10 rounded-2xl focus:border-[#041E3A]/40 focus:bg-white focus:ring-0 px-6 py-4 font-body text-[#041E3A] transition-all placeholder:text-[#041E3A]/30 outline-none resize-none"
          />
        </div>

        <div className="pt-8 relative">
          <AnimatePresence>
            {isSubmitted && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute -top-12 left-0 right-0 text-center font-body text-sm font-bold text-green-600 bg-green-50 py-2 rounded-xl border border-green-200"
              >
                Análise Introspectiva registrada com sucesso!
              </motion.div>
            )}
            {errorMessage && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute -top-12 left-0 right-0 text-center font-body text-sm font-bold text-red-600 bg-red-50 py-2 rounded-xl border border-red-200"
              >
                {errorMessage}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button 
            whileHover={!isLoading ? { scale: 1.01 } : {}}
            whileTap={!isLoading ? { scale: 0.99 } : {}}
            type="submit"
            disabled={isLoading}
            className={`w-full bg-[#041E3A] text-white font-label uppercase tracking-[0.2em] text-sm font-black px-12 py-5 rounded-2xl transition-all shadow-xl hover:shadow-2xl hover:bg-[#033574] ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Enviando Relato...' : 'Submeter Relato'}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};
