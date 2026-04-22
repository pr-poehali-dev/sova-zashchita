import { ArrowRight } from "lucide-react"
import { HighlightedText } from "./HighlightedText"

export function CallToAction() {
  return (
    <section id="contact" className="py-32 md:py-29 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 glass-panel-purple" />
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-purple-600/10 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-cyan-400/70 text-sm tracking-[0.3em] uppercase mb-8 font-mono">// start_learning()</p>

          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-8 text-balance text-white">
            Готов сдать экзамен
            <br />
            на <HighlightedText>максимум</HighlightedText>?
          </h2>

          <p className="text-white/50 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto">
            Начни бесплатно уже сегодня. Выбери предмет, пройди первый урок и убедись, что это работает.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#"
              className="inline-flex items-center justify-center gap-3 bg-cyan-400 text-gray-900 px-8 py-4 text-sm font-bold tracking-wide hover:bg-cyan-300 transition-colors duration-300 group rounded-lg neon-pulse"
            >
              Начать бесплатно
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="tel:+74951234567"
              className="inline-flex items-center justify-center gap-2 glass-panel px-8 py-4 text-sm tracking-wide text-white/70 hover:text-white transition-colors duration-300 rounded-lg"
            >
              Записаться на звонок
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
