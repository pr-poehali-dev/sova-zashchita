import { ArrowRight } from "lucide-react"
import { HighlightedText } from "./HighlightedText"
import { useState } from "react"

const SEND_LEAD_URL = "https://functions.poehali.dev/27bb4a25-97e9-49cd-8362-8762dd04d4a0"

const subjects = ["Математика", "Информатика", "Физика", "Русский язык", "Английский язык"]

export function CallToAction() {
  const [form, setForm] = useState({ name: "", phone: "", subject: "" })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    try {
      const res = await fetch(SEND_LEAD_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus("success")
        setForm({ name: "", phone: "", subject: "" })
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <section id="contact" className="py-32 md:py-29 relative overflow-hidden">
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
            Оставь заявку — мы свяжемся и поможем выбрать курс под твой уровень.
          </p>

          {status === "success" ? (
            <div className="glass-panel rounded-2xl p-10 max-w-lg mx-auto text-center">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-bold text-white mb-2">Заявка принята!</h3>
              <p className="text-white/50">Мы напишем тебе в ближайшее время.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="glass-panel rounded-2xl p-8 max-w-lg mx-auto text-left space-y-4">
              <div>
                <label className="text-white/60 text-sm font-mono mb-2 block">// имя</label>
                <input
                  type="text"
                  placeholder="Как тебя зовут?"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-cyan-400/50 transition-colors"
                />
              </div>
              <div>
                <label className="text-white/60 text-sm font-mono mb-2 block">// телефон</label>
                <input
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-cyan-400/50 transition-colors"
                />
              </div>
              <div>
                <label className="text-white/60 text-sm font-mono mb-2 block">// предмет</label>
                <select
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400/50 transition-colors appearance-none"
                >
                  <option value="" className="bg-gray-900">Выбери предмет</option>
                  {subjects.map((s) => (
                    <option key={s} value={s} className="bg-gray-900">{s}</option>
                  ))}
                </select>
              </div>
              {status === "error" && (
                <p className="text-red-400 text-sm">Что-то пошло не так. Попробуй ещё раз.</p>
              )}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full flex items-center justify-center gap-3 bg-cyan-400 text-gray-900 px-8 py-4 text-sm font-bold tracking-wide hover:bg-cyan-300 transition-colors duration-300 rounded-lg neon-pulse disabled:opacity-60"
              >
                {status === "loading" ? "Отправляем..." : "Начать бесплатно"}
                {status !== "loading" && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
